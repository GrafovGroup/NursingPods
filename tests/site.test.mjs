import test from "node:test";
import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
for (const locale of ["en", "fr"]) {
  test(`${locale}: language, metadata, inquiry safety and navigation`, async () => {
    const res = await fetch(`${base}/${locale}/`);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.match(html, new RegExp(`<html lang="${locale}-CA"`));
    assert.match(
      html,
      new RegExp(`rel="canonical" href="https://nursingpods.ca/${locale}/"`),
    );
    assert.match(html, /hrefLang="en-CA"/i);
    assert.match(html, /hrefLang="fr-CA"/i);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
    assert.match(html, /type="submit"[^>]*disabled/);
    assert.match(html, /href="tel:\+18336969996"/);
    assert.match(html, /application\/ld\+json/);
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    for (const [, id] of html.matchAll(/href="#([^"]+)"/g))
      assert.ok(ids.has(id), `missing anchor ${id}`);
    for (const field of [
      "name",
      "organization",
      "email",
      "phone",
      "city",
      "province",
      "interest",
      "details",
      "timeline",
    ])
      assert.ok(ids.has(field), `missing field ${field}`);
    assert.doesNotMatch(
      html,
      /coming soon|pre-launch|prototype|not-yet-connected/i,
    );
  });
}
test("root redirects to English", async () => {
  const res = await fetch(base, { redirect: "manual" });
  assert.equal(res.status, 307);
  assert.equal(res.headers.get("location"), "/en/");
});
test("only actual locale pages are in sitemap", async () => {
  const res = await fetch(`${base}/sitemap.xml`);
  assert.equal(res.status, 200);
  const xml = await res.text();
  assert.equal((xml.match(/<loc>/g) || []).length, 2);
  assert.match(xml, /https:\/\/nursingpods.ca\/fr\//);
});
test("robots advertises sitemap", async () => {
  const res = await fetch(`${base}/robots.txt`);
  assert.equal(res.status, 200);
  assert.match(
    await res.text(),
    /Sitemap: https:\/\/nursingpods.ca\/sitemap.xml/,
  );
});
test("unknown language is not published", async () => {
  const res = await fetch(`${base}/de/`);
  assert.equal(res.status, 404);
});
test("distinct locale image assets are served", async () => {
  const en = await fetch(`${base}/images/hero-en.webp`);
  const fr = await fetch(`${base}/images/hero-fr.webp`);
  assert.equal(en.status, 200);
  assert.equal(fr.status, 200);
  assert.notDeepEqual(
    Buffer.from(await en.arrayBuffer()),
    Buffer.from(await fr.arrayBuffer()),
  );
});
