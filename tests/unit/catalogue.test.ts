import test from "node:test";
import assert from "node:assert/strict";
import { entries, pages, byId, findPage } from "../../src/lib/pages";
test("catalogue has five products and five distinct solutions", () => {
  assert.equal(entries.filter((e) => e.kind === "products").length, 5);
  assert.equal(entries.filter((e) => e.kind === "solutions").length, 5);
  assert.equal(new Set(entries.map((e) => e.id)).size, 10);
});
test("every catalogue page resolves in both languages with helpful content and valid related links", () => {
  for (const entry of entries) {
    const p = byId(entry.id)!;
    for (const locale of ["en", "fr"] as const) {
      assert.equal(findPage(locale, p.paths[locale])?.id, entry.id);
      assert.ok(entry.copy[locale].sections.length >= 3);
      assert.ok(entry.copy[locale].sections.every((s) => s.body.length > 100));
    }
    for (const id of entry.related) assert.ok(byId(id), id);
  }
  assert.equal(new Set(pages.map((p) => p.paths.en)).size, pages.length);
});
