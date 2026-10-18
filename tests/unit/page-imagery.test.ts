import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { pages } from "../../src/lib/pages";
import { pageImagery } from "../../src/lib/page-imagery";
test("every content page has an existing uniquely registered image", () => {
  const register = JSON.parse(
    readFileSync("docs/asset-register.json", "utf8"),
  ) as { asset: string; page: string; sha256: string }[];
  const used = new Set<string>();
  const hashes = new Set<string>();
  for (const page of pages)
    for (const locale of ["en", "fr"] as const) {
      const image = pageImagery(page, locale),
        file = "public" + image.src;
      assert.ok(existsSync(file), `${page.paths[locale]}: ${file}`);
      assert.ok(!used.has(image.src), `Reused placement: ${image.src}`);
      used.add(image.src);
      const hash = createHash("sha256")
        .update(readFileSync(file))
        .digest("hex");
      assert.ok(
        !hashes.has(hash),
        `Duplicate source pixels/file: ${image.src}`,
      );
      hashes.add(hash);
      assert.ok(
        register.some(
          (r) =>
            r.asset === file &&
            r.page === page.paths[locale] &&
            r.sha256 === hash,
        ),
        `Missing/current asset provenance: ${file}`,
      );
    }
});

test("homepage and system visuals are present and unique across the full register", () => {
  const register = JSON.parse(
    readFileSync("docs/asset-register.json", "utf8"),
  ) as { asset: string; sha256: string }[];
  const expected = [
    "public/images/hero-en.webp",
    "public/images/hero-fr.webp",
    "public/images/pages/global-not-found-neutral.webp",
    ...["en", "fr"].flatMap((locale) =>
      ["not-found", "thank-you"].map(
        (id) => `public/images/pages/${id}-${locale}.webp`,
      ),
    ),
  ];
  for (const asset of expected) {
    assert.ok(existsSync(asset), `Missing system/home image: ${asset}`);
    assert.ok(
      register.some((r) => r.asset === asset),
      `Unregistered system/home image: ${asset}`,
    );
  }
  const hashes = new Set<string>();
  for (const r of register) {
    const hash = createHash("sha256")
      .update(readFileSync(r.asset))
      .digest("hex");
    assert.equal(hash, r.sha256, `Stale register: ${r.asset}`);
    assert.ok(!hashes.has(hash), `Duplicate image in register: ${r.asset}`);
    hashes.add(hash);
  }
});
