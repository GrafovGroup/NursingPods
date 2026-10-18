import test from "node:test";
import assert from "node:assert/strict";
import { pages, entries } from "../../src/lib/pages";
import { leadOptions } from "../../src/lib/lead-options";
import { pageMetadata } from "../../src/lib/seo";
import { leadMessages } from "../../src/lib/leads/messages";
test("compact client choices exactly match bilingual catalogue labels", () => {
  for (const e of entries) {
    const option = leadOptions.find((o) => o.id === e.id);
    assert.ok(option);
    for (const locale of ["en", "fr"] as const)
      assert.equal(option.title[locale], e.copy[locale].title);
  }
});
test("all routes have distinct French copy and complete reciprocal metadata", () => {
  for (const p of pages) {
    assert.ok(p.title.fr.length > 4);
    assert.notEqual(p.description.en, p.description.fr);
    for (const locale of ["en", "fr"] as const) {
      const meta = pageMetadata(p, locale);
      assert.equal(meta.alternates?.canonical, p.paths[locale]);
      assert.deepEqual(meta.alternates?.languages, {
        "en-CA": p.paths.en,
        "fr-CA": p.paths.fr,
        "x-default": p.paths.en,
      });
    }
  }
});
test("French lead feedback covers every English state", () => {
  assert.deepEqual(
    Object.keys(leadMessages.fr).sort(),
    Object.keys(leadMessages.en).sort(),
  );
  for (const value of Object.values(leadMessages.fr))
    assert.ok(value.length > 0);
});
test('page titles and descriptions are unique within each language',()=>{for(const locale of ['en','fr'] as const){assert.equal(new Set(pages.map(p=>p.title[locale])).size,pages.length);assert.equal(new Set(pages.map(p=>p.description[locale])).size,pages.length);}});
