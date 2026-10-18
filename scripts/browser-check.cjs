/* eslint-disable @typescript-eslint/no-require-imports -- Node QA runner. */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();
  const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
  const exceptions = [],
    failures = [],
    posts = [],
    checks = [],
    performanceResults = [];
  page.on("pageerror", (e) => exceptions.push(e.message));
  page.on("response", (r) => {
    if (
      r.status() >= 400 &&
      !r.url().includes("unknown-page") &&
      !r.url().includes("page-inconnue") &&
      !r.url().endsWith("/de/")
    )
      failures.push(`${r.status()} ${r.url()}`);
  });
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  fs.mkdirSync("artifacts", { recursive: true });
  for (const locale of ["en", "fr"]) {
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`${base}/${locale}/`, { waitUntil: "networkidle" });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      assert.equal(
        await page.locator("html").getAttribute("lang"),
        `${locale}-CA`,
      );
      assert.equal(
        await page
          .locator(".hero-image img")
          .evaluate((el) => el.complete && el.naturalWidth > 0),
        true,
      );
      if (width === 1440 || width === 390)
        await page.screenshot({
          path: `artifacts/${locale}-${width}.png`,
          fullPage: true,
        });
      if (width === 1440)
        performanceResults.push({
          locale,
          ...(await page.evaluate(() => ({
            navigationMs:
              performance.getEntriesByType("navigation")[0].duration,
            transferBytes: performance
              .getEntriesByType("resource")
              .reduce((sum, r) => sum + r.transferSize, 0),
            thirdParty: performance
              .getEntriesByType("resource")
              .filter((r) => new URL(r.name).origin !== location.origin)
              .map((r) => r.name),
          }))),
        });
      if (width < 1050) {
        const menu = page.locator(".menu-toggle");
        await menu.click();
        assert.equal(await menu.getAttribute("aria-expanded"), "true");
        await page.keyboard.press("Escape");
        assert.equal(await menu.getAttribute("aria-expanded"), "false");
        assert.equal(
          await menu.evaluate((el) => el === document.activeElement),
          true,
        );
      }
      for (let i = 0; i < 5; i++) {
        await page.locator(".product-card .text-link").nth(i).click();
        assert.ok(
          await page.locator("#interest").inputValue(),
          "preselection must not be empty",
        );
      }
      for (let i = 0; i < 5; i++) {
        await page.locator(".solution-list .text-link").nth(i).click();
        assert.ok(await page.locator("#interest").inputValue());
      }
      assert.equal(
        await page.locator('button[type="submit"]').isDisabled(),
        true,
      );
      await page.locator("#name").fill("Local QA");
      await page.locator("#details").fill("Local project-brief download test.");
      const downloadPromise = page.waitForEvent("download");
      await page.locator('.form-actions button[type="button"]').click();
      const download = await downloadPromise;
      const file = await download.path();
      assert.ok(
        fs
          .readFileSync(file, "utf8")
          .includes("Local project-brief download test."),
      );
      assert.equal(posts.length, 0);
      const faq = page.locator("details").first();
      await faq.locator("summary").click();
      assert.equal(await faq.getAttribute("open"), "");
      checks.push({ locale, width, status: "passed" });
    }
    const quote =
      locale === "en" ? "/en/request-a-quote/" : "/fr/demander-une-soumission/";
    await page.goto(base + quote + "?interest=accessible&city=Laval", {
      waitUntil: "networkidle",
    });
    assert.equal(await page.locator("#city").inputValue(), "Laval");
    assert.ok(
      (await page.locator("#interest").inputValue())
        .toLowerCase()
        .includes("accessib"),
    );
  }
  for (const path of ["/fr/page-inconnue/", "/en/unknown-page/", "/de/"]) {
    const r = await page.goto(base + path, { waitUntil: "networkidle" });
    assert.equal(r.status(), 404);
    assert.ok(
      await page.locator("html").getAttribute("lang"),
      `lang missing on ${path}`,
    );
    if (path.startsWith("/fr"))
      assert.ok((await page.locator("h1").innerText()).includes("introuvable"));
  }
  assert.deepEqual(exceptions, []);
  assert.deepEqual(failures, []);
  assert.equal(posts.length, 0);
  assert.ok(performanceResults.every((p) => p.thirdParty.length === 0));
  const result = {
    checks,
    exceptions,
    failures,
    posts,
    performance: performanceResults,
  };
  fs.writeFileSync(
    "artifacts/browser-results.json",
    JSON.stringify(result, null, 2),
  );
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
