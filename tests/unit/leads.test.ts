import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { validateLead } from "../../src/lib/leads/validation";
import { leadSettings } from "../../src/lib/leads/settings";
import { signToken, verifyToken } from "../../src/lib/leads/tokens";
import { sendLead, notification } from "../../src/lib/leads/adapter";
import {
  handleInquiry,
  type HandlerDependencies,
} from "../../src/lib/leads/handler";
import { takeRateSlot } from "../../src/lib/leads/rate-limit";
const secret = "unit-test-only-secret-at-least-32-characters";
const settings = leadSettings({
  INQUIRIES_ENABLED: "true",
  OUTBOUND_DELIVERY_AUTHORIZED: "true",
  PRIVACY_POLICY_APPROVED: "true",
  LEAD_PROVIDER: "resend",
  RESEND_API_KEY: "test-only",
  LEAD_FROM_EMAIL: "sender@example.com",
  LEAD_TO_EMAIL: "owner@example.com",
  NEXT_PUBLIC_PRIVACY_EMAIL: "privacy@example.com",
  NEXT_PUBLIC_LEGAL_NAME: "Test organization",
  LEAD_RETENTION_DAYS: "30",
  LEAD_SIGNING_SECRET: secret,
  LEAD_RATE_LIMIT_DIR: "/tmp/test-only",
  NEXT_PUBLIC_SITE_URL: "https://nursingpods.ca",
});
const data = {
  name: "Test User",
  organization: "Test organization",
  email: "user@example.com",
  phone: "",
  city: "Toronto",
  province: "ON",
  interest: "Freestanding",
  details: "An office project for testing.",
  timeline: "Exploring",
  locale: "en",
  consent: true,
  consentVersion: "2026-10-18",
  website: "",
  token: signToken("form", secret, Date.now() - 3000),
};
const request = (value: unknown = data, origin = "https://nursingpods.ca") =>
  new Request("https://nursingpods.ca/api/inquiries", {
    method: "POST",
    headers: { "content-type": "application/json", origin },
    body: JSON.stringify(value),
  });
const deps: HandlerDependencies = {
  settings: () => settings,
  rate: async () => true,
  claim: async () => true,
  send: async () => ({ accepted: true, providerId: "test-id" }),
  log: () => {},
};
test("delivery defaults disabled and requires every authorization gate", () => {
  assert.equal(leadSettings({}).ready, false);
  assert.equal(settings.ready, true);
  assert.equal(leadSettings({ INQUIRIES_ENABLED: "true" }).ready, false);
});
test("validation rejects consent omissions, header injection and invalid provinces", () => {
  assert.equal(validateLead(data).ok, true);
  for (const change of [
    { consent: false },
    { email: "a@example.com\nBcc: x@example.com" },
    { province: "XX" },
    { name: "" },
    { details: "x".repeat(4001) },
  ])
    assert.equal(validateLead({ ...data, ...change }).ok, false);
});
test("signed tokens reject tampering, premature, expired and wrong-purpose tokens", () => {
  assert.ok(verifyToken(data.token, "form", secret));
  assert.equal(verifyToken(data.token + "x", "form", secret), null);
  assert.equal(verifyToken(signToken("form", secret), "form", secret), null);
  assert.equal(
    verifyToken(
      signToken("form", secret, Date.now() - 7200000),
      "form",
      secret,
    ),
    null,
  );
  assert.equal(verifyToken(data.token, "accepted", secret), null);
});
test("handler blocks disabled, cross-origin, malformed, spam and oversized requests", async () => {
  assert.equal(
    (
      await handleInquiry(request(), {
        ...deps,
        settings: () => ({ ...settings, ready: false }),
      })
    ).status,
    503,
  );
  assert.equal(
    (await handleInquiry(request(data, "https://evil.example"), deps)).status,
    403,
  );
  assert.equal(
    (await handleInquiry(request({ ...data, website: "bot" }), deps)).status,
    400,
  );
  assert.equal(
    (await handleInquiry(request({ ...data, consent: false }), deps)).status,
    422,
  );
  assert.equal(
    (
      await handleInquiry(
        request({ ...data, details: "x".repeat(20000) }),
        deps,
      )
    ).status,
    413,
  );
  assert.equal(
    (
      await handleInquiry(
        new Request("https://nursingpods.ca/api/inquiries", {
          method: "POST",
          headers: {
            origin: "https://nursingpods.ca",
            "content-type": "application/json",
          },
          body: "{",
        }),
        deps,
      )
    ).status,
    400,
  );
});
test("handler cannot acknowledge provider failure and logs no contact data", async () => {
  const logs: unknown[] = [];
  const result = await handleInquiry(request(), {
    ...deps,
    send: async () => {
      throw new Error("provider rejected");
    },
    log: (r) => logs.push(r),
  });
  assert.equal(result.status, 502);
  assert.equal(result.headers.get("set-cookie"), null);
  assert.doesNotMatch(JSON.stringify(logs), /user@example|Test User|Toronto/);
});
test("only confirmed provider acceptance grants a short-lived secure receipt", async () => {
  const r = await handleInquiry(request(), deps);
  assert.equal(r.status, 202);
  assert.match(
    r.headers.get("set-cookie") || "",
    /HttpOnly; SameSite=Strict; Secure/,
  );
  assert.equal((await r.json()).redirect, "/en/thank-you/");
  assert.equal(
    (await handleInquiry(request({ ...data, locale: "fr" }), deps)).status,
    202,
  );
});
test("rate and replay checks prevent calling delivery", async () => {
  let calls = 0;
  const base = {
    ...deps,
    send: async () => {
      calls++;
      return { accepted: true as const, providerId: "x" };
    },
  };
  assert.equal(
    (await handleInquiry(request(), { ...base, rate: async () => false }))
      .status,
    429,
  );
  assert.equal(
    (await handleInquiry(request(), { ...base, claim: async () => false }))
      .status,
    409,
  );
  assert.equal(calls, 0);
});
test("mail adapter requires a provider acknowledgement, not just HTTP 200", async () => {
  const valid = validateLead(data);
  if (!valid.ok) throw Error("fixture");
  await assert.rejects(() =>
    sendLead(valid.lead, "id", settings, async () => Response.json({})),
  );
  await assert.rejects(() =>
    sendLead(valid.lead, "id", settings, async () =>
      Response.json({ id: "x" }, { status: 500 }),
    ),
  );
  assert.equal(
    (
      await sendLead(valid.lead, "id", settings, async () =>
        Response.json({ id: "accepted-id" }),
      )
    ).accepted,
    true,
  );
  assert.match(
    notification({ ...valid.lead, locale: "fr" }).subject,
    /Nouvelle demande/,
  );
});
test("filesystem rate limit is atomic under concurrent workers and survives calls", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "np-ratelimit-"));
  try {
    const outcomes = await Promise.all(
      Array.from({ length: 12 }, () => takeRateSlot(dir, "test", secret, 5)),
    );
    assert.equal(outcomes.filter(Boolean).length, 5);
    assert.equal(await takeRateSlot(dir, "test", secret, 5), false);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
