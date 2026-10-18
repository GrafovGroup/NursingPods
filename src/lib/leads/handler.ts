import { isIP } from "node:net";
import { randomUUID } from "node:crypto";
import { leadSettings, type LeadSettings } from "./settings";
import { verifyToken, signToken } from "./tokens";
import { takeRateSlot, claimSubmission } from "./rate-limit";
import { validateLead } from "./validation";
import { sendLead } from "./adapter";
export type HandlerDependencies = {
  settings: () => LeadSettings;
  rate: typeof takeRateSlot;
  claim: typeof claimSubmission;
  send: typeof sendLead;
  log: (record: { event: string; requestId: string }) => void;
};
const defaults: HandlerDependencies = {
  settings: leadSettings,
  rate: takeRateSlot,
  claim: claimSubmission,
  send: sendLead,
  log: (record) => console.info(JSON.stringify(record)),
};
function reply(
  status: number,
  code: string,
  extra: Record<string, unknown> = {},
) {
  return Response.json(
    { code, ...extra },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}
export async function handleInquiry(
  request: Request,
  deps: HandlerDependencies = defaults,
) {
  const requestId = randomUUID();
  const s = deps.settings();
  if (!s.ready) return reply(503, "unavailable");
  if (
    request.headers.get("origin") !== new URL(s.origin).origin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  )
    return reply(403, "origin");
  if (
    !/^application\/json(?:;|$)/i.test(
      request.headers.get("content-type") || "",
    )
  )
    return reply(415, "contentType");
  if (Number(request.headers.get("content-length")) > 16384)
    return reply(413, "tooLarge");
  let input: unknown;
  try {
    // Never trust Content-Length: bound the bytes actually read.
    const reader = request.body?.getReader();
    if (!reader) return reply(400, "invalid");
    let bytes = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      bytes += part.value.byteLength;
      if (bytes > 16384) {
        await reader.cancel();
        return reply(413, "tooLarge");
      }
      chunks.push(part.value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply(400, "invalid");
  }
  if (!input || typeof input !== "object" || Array.isArray(input))
    return reply(400, "invalid");
  const raw = input as Record<string, unknown>;
  if (raw.website !== "" || typeof raw.website !== "string")
    return reply(400, "invalid");
  const token = verifyToken(raw.token, "form", s.secret);
  if (!token) return reply(400, "expired");
  const validation = validateLead(raw);
  if (!validation.ok)
    return reply(422, "validation", { errors: validation.errors });
  // Without a deliberately trusted reverse proxy, share one conservative bucket.
  const candidate = s.proxyHeader
    ? request.headers.get(s.proxyHeader) || ""
    : "";
  const ip = isIP(candidate) ? candidate : "unresolved";
  try {
    if (
      !(await deps.rate(s.rateDir, "global", s.secret, 100)) ||
      !(await deps.rate(s.rateDir, `client:${ip}`, s.secret, 5))
    )
      return reply(429, "rate");
    if (!(await deps.claim(s.rateDir, token.nonce)))
      return reply(409, "duplicate");
    await deps.send(validation.lead, token.nonce, s);
    deps.log({ event: "inquiry_provider_accepted", requestId });
    const res = reply(202, "accepted", {
      redirect:
        validation.lead.locale === "fr" ? "/fr/merci/" : "/en/thank-you/",
    });
    res.headers.set(
      "Set-Cookie",
      `np_accepted=${signToken("accepted", s.secret)}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=600`,
    );
    return res;
  } catch {
    deps.log({ event: "inquiry_processing_failed", requestId });
    return reply(502, "delivery");
  }
}
