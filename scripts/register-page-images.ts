import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  existsSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { join } from "node:path";
import { pages } from "../src/lib/pages";
const require = createRequire(import.meta.url);
const sharp = require(
  createRequire(require.resolve("next/package.json")).resolve("sharp"),
);
const hash = (b: Buffer) => createHash("sha256").update(b).digest("hex");
const dir =
  "/Users/grafov/.codex/generated_images/01a14db5-e5a8-7530-9b2a-dd9b7c5eadae";
const cachePath = ".runtime/source-export-index.json";
const cache: Record<string, { mtime: number; hash: string }> = existsSync(
  cachePath,
)
  ? JSON.parse(readFileSync(cachePath, "utf8"))
  : {};
const known: Record<string, string> = {};
for (const row of JSON.parse(readFileSync("docs/asset-register.json", "utf8")))
  known[row.asset] = row.source;
if (existsSync(".runtime/page-image-sources.jsonl"))
  for (const line of readFileSync(".runtime/page-image-sources.jsonl", "utf8")
    .trim()
    .split("\n")) {
    const r = JSON.parse(line);
    known[r.asset] = r.source;
  }
async function main() {
  const assets = readdirSync("public/images/pages").filter((n) =>
    n.endsWith(".webp"),
  );
  const missing = assets.filter((n) => !known["public/images/pages/" + n]);
  if (missing.length) {
    for (const name of readdirSync(dir).filter((n) => n.endsWith(".png"))) {
      const source = join(dir, name),
        mtime = statSync(source).mtimeMs;
      if (cache[source]?.mtime === mtime) continue;
      try {
        const buffer = await sharp(source)
          .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 82, effort: 5 })
          .toBuffer();
        cache[source] = { mtime, hash: hash(buffer) };
      } catch {
        /* incomplete generation is not a usable source */
      }
    }
    writeFileSync(cachePath, JSON.stringify(cache));
    for (const name of missing) {
      const asset = "public/images/pages/" + name,
        h = hash(readFileSync(asset));
      const source = Object.entries(cache).find(([, v]) => v.hash === h)?.[0];
      if (source) known[asset] = source;
    }
  }
  const old = JSON.parse(
    readFileSync("docs/asset-register.json", "utf8"),
  ).filter(
    (r: { asset: string }) => !r.asset.startsWith("public/images/pages/"),
  );
  for (const name of assets) {
    const asset = "public/images/pages/" + name,
      m = name.match(/^(.*)-(en|fr|neutral)\.webp$/)!;
    const [, id, locale] = m;
    const p = pages.find((p) => p.id === id);
    const route = p
      ? p.paths[locale as "en" | "fr"]
      : id === "global-not-found"
        ? "/404/"
        : id === "thank-you"
          ? locale === "en"
            ? "/en/thank-you/"
            : "/fr/merci/"
          : `/${locale}/404/`;
    if (!known[asset]) throw Error("Missing original source: " + asset);
    old.push({
      source: known[asset],
      asset,
      website: "NursingPods.ca",
      page: route,
      placement: p ? "detail page hero" : "system page visual",
      type: "Original architectural visualization; not a supplier product photograph or a completed installation",
      tool: "built-in image_gen",
      sha256: hash(readFileSync(asset)),
    });
  }
  writeFileSync(
    "docs/asset-register.json",
    JSON.stringify(old, null, 2) + "\n",
  );
  console.log(
    `Registered ${assets.length} page images plus existing homepage images`,
  );
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
