/* eslint-disable @typescript-eslint/no-require-imports -- Node image tooling. */
const fs = require("node:fs");
const sharp = require(
  require("node:module")
    .createRequire(require.resolve("next/package.json"))
    .resolve("sharp"),
);
const [source, id, locale] = process.argv.slice(2);
if (!source || !id || !locale) throw Error("Usage: source id locale");
const asset = `public/images/pages/${id}-${locale}.webp`;
sharp(source)
  .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
  .webp({ quality: 82, effort: 5 })
  .toFile(asset)
  .then(async () => {
    fs.appendFileSync(
      ".runtime/page-image-sources.jsonl",
      JSON.stringify({ source, id, locale, asset }) + "\n",
    );
    await sharp(asset, { failOn: "warning" }).raw().toBuffer();
    const expected = await sharp(source)
      .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toBuffer();
    if (!expected.equals(fs.readFileSync(asset)))
      throw Error("Optimized verification failed");
    if (process.argv.includes("--remove-verified-original")) {
      if (
        !source.startsWith("/Users/grafov/.codex/generated_images/") ||
        !source.endsWith(".png")
      )
        throw Error("Unexpected source location");
      fs.appendFileSync(
        ".runtime/removed-generated-originals.jsonl",
        JSON.stringify({
          source,
          asset,
          bytes: fs.statSync(source).size,
          removedAt: new Date().toISOString(),
          verification: "Complete decode and byte-identical optimized export",
        }) + "\n",
      );
      fs.unlinkSync(source);
    }
    console.log(asset);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
