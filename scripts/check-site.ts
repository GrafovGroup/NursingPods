import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { pages } from "../src/lib/pages";
import { business } from "../src/lib/config";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const routes = [
  ...(["en", "fr"] as const).map((locale) => ({
    path: `/${locale}/`,
    locale,
    en: "/en/",
    fr: "/fr/",
  })),
  ...pages.flatMap((p) =>
    (["en", "fr"] as const).map((locale) => ({
      path: p.paths[locale],
      locale,
      en: p.paths.en,
      fr: p.paths.fr,
    })),
  ),
];
const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const htmls = new Map<string, string>();
let checkedLinks = 0;
const errors: string[] = [];
async function inspect(route: (typeof routes)[number]) {
  try {
    const response = await fetch(base + route.path);
    assert.equal(response.status, 200, route.path);
    const html = await response.text();
    htmls.set(route.path, html);
    assert.match(html, new RegExp(`<html lang="${route.locale}-CA"`));
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, "exactly one H1");
    assert.ok(
      html.includes(`rel="canonical" href="${business.url}${route.path}"`),
      "canonical",
    );
    for (const [locale, path] of [
      ["en-CA", route.en],
      ["fr-CA", route.fr],
    ])
      assert.ok(
        html
          .toLowerCase()
          .includes(
            `hreflang="${locale}" href="${business.url}${path}"`.toLowerCase(),
          ),
        "hreflang",
      );
    assert.match(html, /property="og:title"/);
    assert.match(html, /name="description"/);
    for (const [, json] of html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ))
      JSON.parse(json);
    assert.doesNotMatch(
      html,
      /coming soon|pre-launch|not-yet-connected|legal-review-before-launch/i,
    );
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  } catch (error) {
    errors.push(`${route.path}: ${String(error)}`);
  }
}
async function main() {
  for (let i = 0; i < routes.length; i += 6)
    await Promise.all(routes.slice(i, i + 6).map(inspect));
  const routePaths = new Set(routes.map((r) => r.path));
  for (const [path, html] of htmls) {
    for (const [, raw] of html.matchAll(/<a\b[^>]*href="([^"]*)"/g)) {
      const href = decode(raw);
      if (!href || href.startsWith("tel:") || href.startsWith("mailto:"))
        continue;
      const target = new URL(href, base + path);
      if (target.origin !== new URL(base).origin) continue;
      checkedLinks++;
      if (!routePaths.has(target.pathname)) {
        errors.push(`Unknown internal link ${path} → ${target.pathname}`);
        continue;
      }
      if (target.hash) {
        const body = htmls.get(target.pathname) || "";
        if (!body.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`))
          errors.push(
            `Missing anchor ${path} → ${target.pathname}${target.hash}`,
          );
      }
    }
  }
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  assert.equal(
    (sitemap.match(/<loc>/g) || []).length,
    2 + pages.filter((p) => p.indexable).length * 2,
  );
  for (const route of routes)
    assert.ok(sitemap.includes(`${business.url}${route.path}`), route.path);
  assert.doesNotMatch(sitemap, /\/(?:thank-you|merci|api)\//);
  assert.match(await (await fetch(base + "/robots.txt")).text(), /Sitemap:/);
  assert.equal(
    (await fetch(base, { redirect: "manual" })).headers.get("location"),
    "/en/",
  );
  for (const path of ["/en/unknown-page/", "/fr/page-inconnue/", "/de/"])
    assert.equal((await fetch(base + path)).status, 404, path);
  const cfg = await (await fetch(base + "/api/inquiries/config")).json();
  assert.equal(cfg.enabled, false, "QA runs with delivery disabled");
  assert.equal(cfg.token, null);
  assert.equal(
    (
      await fetch(base + "/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{}",
      })
    ).status,
    503,
  );
  for (const path of ["/en/thank-you/", "/fr/merci/"]) {
    const r = await fetch(base + path, { redirect: "manual" });
    assert.ok([303, 307].includes(r.status));
    assert.ok(
      r.headers
        .get("location")
        ?.includes(
          path.startsWith("/fr")
            ? "demander-une-soumission"
            : "request-a-quote",
        ),
    );
  }
  assert.equal((await fetch(base + "/api/health")).status, 200);
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    "artifacts/http-results.json",
    JSON.stringify({ routes: routes.length, checkedLinks, errors }, null, 2),
  );
  console.log(
    JSON.stringify({ routes: routes.length, checkedLinks, errors }, null, 2),
  );
  assert.deepEqual(errors, []);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
