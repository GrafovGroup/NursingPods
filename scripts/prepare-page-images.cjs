/* eslint-disable @typescript-eslint/no-require-imports -- Node image tooling. */
const fs = require("node:fs");
const path = require("node:path");
const sharp = require(
  require("node:module")
    .createRequire(require.resolve("next/package.json"))
    .resolve("sharp"),
);
async function main() {
  const dir = "public/images/pages";
  const files = fs.readdirSync(dir).filter((n) => n.endsWith(".png"));
  for (const name of files) {
    const src = path.join(dir, name),
      dst = src.replace(/\.png$/, ".webp");
    if (
      !fs.existsSync(dst) ||
      fs.statSync(dst).mtimeMs < fs.statSync(src).mtimeMs
    )
      await sharp(src)
        .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 })
        .toFile(dst);
    if (fs.statSync(dst).size > 1000) fs.unlinkSync(src);
  }
  console.log(`Optimized ${files.length} original page images`);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
