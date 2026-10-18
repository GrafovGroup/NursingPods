/* eslint-disable @typescript-eslint/no-require-imports -- Node QA runner. */
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const assert = require("node:assert/strict");
const fs = require("node:fs");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
  const results = [];
  const paths = [
    "/en/",
    "/fr/",
    "/en/products/",
    "/fr/produits/",
    "/en/products/accessible-nursing-pods/",
    "/fr/produits/cabines-allaitement-accessibles/",
    "/en/industries/hospitals/",
    "/fr/secteurs/hopitaux/",
    "/en/locations/ontario/toronto-gta/",
    "/fr/regions/quebec/montreal/",
    "/en/request-a-quote/",
    "/fr/demander-une-soumission/",
  ];
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of paths) {
      await page.goto(base + route, { waitUntil: "networkidle" });
      const scan = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      results.push({
        route,
        width,
        violations: scan.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `overflow ${route} ${width}`,
      );
      console.log(`${route} ${width}: ${scan.violations.length} violations`);
    }
  }
  // Test accessible client validation without transmitting an inquiry.
  await page.route("**/api/inquiries/config", (r) =>
    r.fulfill({ json: { enabled: true, token: "qa-only-not-a-real-token" } }),
  );
  let posts = 0;
  page.on("request", (r) => {
    if (r.method() === "POST") posts++;
  });
  await page.goto(base + "/fr/demander-une-soumission/", {
    waitUntil: "networkidle",
  });
  await page.locator('button[type="submit"]').click();
  await page.locator(".error-summary").waitFor();
  assert.equal(
    await page
      .locator(".error-summary")
      .evaluate((el) => el === document.activeElement),
    true,
  );
  assert.ok(
    (await page.locator(".error-summary").innerText()).includes("Veuillez"),
  );
  assert.equal(posts, 0);
  const invalidScan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  results.push({
    route: "French validation state",
    width: 390,
    violations: invalidScan.violations,
  });
  await page.unroute("**/api/inquiries/config");
  await page.goto(base + "/en/products/freestanding-nursing-pods/");
  if (await page.locator(".menu-toggle").isVisible())
    await page.locator(".menu-toggle").click();
  await page.locator(".language-switch").click();
  assert.ok(page.url().endsWith("/fr/produits/cabines-allaitement-autonomes/"));
  fs.mkdirSync("artifacts", { recursive: true });
  fs.writeFileSync(
    "artifacts/accessibility-results.json",
    JSON.stringify(results, null, 2),
  );
  await browser.close();
  assert.equal(
    results.flatMap((r) => r.violations).length,
    0,
    "See artifacts/accessibility-results.json",
  );
  console.log("Accessibility and equivalent-language checks passed.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
