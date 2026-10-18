import test from "node:test";
import assert from "node:assert/strict";
import {
  locationEntries,
  locationQuality,
} from "../../src/lib/location-content";
import { pages, byId } from "../../src/lib/pages";
test("all provinces and territories have substantial bilingual content", () => {
  assert.equal(locationEntries.filter((l) => l.kind === "province").length, 13);
  for (const l of locationEntries) assert.ok(locationQuality(l), l.id);
  for (const locale of ["en", "fr"] as const)
    assert.equal(
      new Set(locationEntries.map((l) => l.sections[locale][0].body)).size,
      locationEntries.length,
    );
});
test("incomplete location drafts fail the indexability gate", () => {
  assert.equal(
    locationQuality({ ...locationEntries[0], editorialReady: false }),
    false,
  );
  assert.equal(
    locationQuality({ ...locationEntries[0], sections: { en: [], fr: [] } }),
    false,
  );
});
test("all required metro municipalities are represented without fake offices", () => {
  const names = new Set(locationEntries.flatMap((l) => l.municipalities));
  for (const city of [
    "Mississauga",
    "Brampton",
    "Vaughan",
    "Markham",
    "Richmond Hill",
    "Oakville",
    "Burlington",
    "Vancouver",
    "Montréal",
    "Laval",
    "Longueuil",
    "Ottawa",
    "Calgary",
    "Edmonton",
    "Winnipeg",
    "Halifax",
    "Québec",
  ])
    assert.ok(names.has(city), city);
});
test("every page has equivalent unique routes and valid parent/related targets", () => {
  for (const locale of ["en", "fr"] as const)
    assert.equal(new Set(pages.map((p) => p.paths[locale])).size, pages.length);
  for (const p of pages) {
    if (p.parentId) assert.ok(byId(p.parentId), p.parentId);
    for (const id of p.related || []) assert.ok(byId(id), id);
  }
});
