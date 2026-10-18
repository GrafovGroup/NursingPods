// Retained lightweight HTTP smoke checks. The full route crawl is `pnpm test:http`.
import test from "node:test";
import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
for (const locale of ["en", "fr"])
  test(`${locale} homepage and disabled form`, async () => {
    const r = await fetch(`${base}/${locale}/`);
    assert.equal(r.status, 200);
    const html = await r.text();
    assert.match(html, new RegExp(`<html lang="${locale}-CA"`));
    assert.match(html, /type="submit"[^>]*disabled/);
  });
test("inquiry API cannot acknowledge when disabled", async () => {
  assert.equal(
    (
      await fetch(base + "/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      })
    ).status,
    503,
  );
});
