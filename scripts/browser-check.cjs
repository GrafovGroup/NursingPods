/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS QA runner. */
// Run with Playwright available (or NODE_PATH pointing to a shared installation).
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  const failedResponses = [];
  const writes = [];
  const checks = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) failedResponses.push(`${r.status()} ${r.url()}`);
  });
  page.on("request", (r) => {
    if (!["GET", "HEAD"].includes(r.method())) writes.push(r.url());
  });
  for (const locale of ["en", "fr"]) {
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(
        `${process.env.TEST_BASE_URL || "http://127.0.0.1:3000"}/${locale}/`,
        { waitUntil: "networkidle" },
      );
      assert.equal(
        await page.locator("html").getAttribute("lang"),
        `${locale}-CA`,
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${locale} overflow at ${width}`,
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
      if (width < 1050) {
        const menu = page.locator(".menu-toggle");
        await menu.click();
        assert.equal(await menu.getAttribute("aria-expanded"), "true");
        await page.keyboard.press("Escape");
        assert.equal(await menu.getAttribute("aria-expanded"), "false");
        assert.equal(
          await menu.evaluate((el) => document.activeElement === el),
          true,
        );
        await menu.click();
        await page.locator('#main-nav a[href="#products"]').click();
        assert.equal(await menu.getAttribute("aria-expanded"), "false");
      }
      await page.locator(".product-card .text-link").first().click();
      assert.equal(
        await page.locator("#interest").inputValue(),
        locale === "en"
          ? "Freestanding nursing pods"
          : "Cabines d’allaitement autonomes",
      );
      assert.equal(
        await page.locator('button[type="submit"]').isDisabled(),
        true,
      );
      await page.locator("#name").fill("QA check");
      await page.locator("#email").fill("qa@example.com");
      await page.locator("#details").fill("Browser check; not submitted.");
      await page.locator("#details").press("Enter");
      assert.equal(writes.length, 0, "form must never send requests");
      const faq = page.locator("details").first();
      await faq.locator("summary").click();
      assert.equal(await faq.getAttribute("open"), "");
      checks.push({ locale, width, status: "passed" });
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.locator(".language-switch").click();
    assert.ok(page.url().includes(locale === "en" ? "/fr/" : "/en/"));
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(failedResponses, []);
  fs.writeFileSync(
    "artifacts/browser-results.json",
    JSON.stringify(
      { checks, errors, failedResponses, writeRequests: writes },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify(
      { checks, errors, failedResponses, writeRequests: writes },
      null,
      2,
    ),
  );
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
