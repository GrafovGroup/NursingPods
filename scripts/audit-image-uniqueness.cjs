/* eslint-disable @typescript-eslint/no-require-imports -- Node image audit tooling. */
const fs = require("node:fs"),
  path = require("node:path"),
  crypto = require("node:crypto");
const sharp = require(
  require("node:module")
    .createRequire(require.resolve("next/package.json"))
    .resolve("sharp"),
);
const root = "/Users/grafov/Documents/ChatGPT";
const here = process.cwd();
const ignored = new Set([
  "node_modules",
  ".next",
  ".git",
  ".runtime",
  ".cache",
  "dist",
  "artifacts",
  "output",
]);
function walk(dir, inAssets = false, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory())
      walk(
        p,
        inAssets || ["public", "assets", "static", "images"].includes(e.name),
        out,
      );
    else if (inAssets && /\.(webp|png|jpe?g)$/i.test(e.name)) out.push(p);
  }
  return out;
}
function distance(a, b) {
  let x = BigInt("0x" + a) ^ BigInt("0x" + b),
    n = 0;
  while (x) {
    x &= x - 1n;
    n++;
  }
  return n;
}
async function fingerprint(file) {
  const pixels = await sharp(file)
    .resize(32, 32, { fit: "fill" })
    .greyscale()
    .raw()
    .toBuffer();
  const coeff = [];
  for (let u = 0; u < 8; u++)
    for (let v = 0; v < 8; v++) {
      let sum = 0;
      for (let x = 0; x < 32; x++)
        for (let y = 0; y < 32; y++)
          sum +=
            pixels[y * 32 + x] *
            Math.cos(((2 * x + 1) * u * Math.PI) / 64) *
            Math.cos(((2 * y + 1) * v * Math.PI) / 64);
      coeff.push(sum);
    }
  const median = [...coeff.slice(1)].sort((a, b) => a - b)[31];
  let bits = 0n;
  coeff.forEach((c, i) => {
    if (c > median) bits |= 1n << BigInt(i);
  });
  return {
    file,
    sha: crypto
      .createHash("sha256")
      .update(fs.readFileSync(file))
      .digest("hex"),
    phash: bits.toString(16).padStart(16, "0"),
  };
}
async function main() {
  const files = walk(root);
  const cachePath = ".runtime/visual-fingerprints.json",
    cache = fs.existsSync(cachePath)
      ? JSON.parse(fs.readFileSync(cachePath, "utf8"))
      : {};
  const records = [],
    unreadable = [];
  for (const file of files) {
    try {
      const mtime = fs.statSync(file).mtimeMs;
      if (cache[file]?.mtime !== mtime)
        cache[file] = { mtime, ...(await fingerprint(file)) };
      records.push(cache[file]);
    } catch {
      unreadable.push(file);
    }
  }
  fs.writeFileSync(cachePath, JSON.stringify(cache));
  const own = records.filter((r) =>
      r.file.startsWith(here + "/public/images/"),
    ),
    seen = new Set(),
    exact = [],
    similar = [];
  for (const a of own)
    for (const b of records) {
      if (a.file === b.file) continue;
      const key = [a.file, b.file].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      if (a.sha === b.sha) exact.push([a.file, b.file]);
      else {
        const d = distance(a.phash, b.phash);
        if (d <= 6) similar.push({ a: a.file, b: b.file, distance: d });
      }
    }
  const report = {
    date: new Date().toISOString(),
    scope:
      "Current NursingPods assets and accessible public/assets/static/images directories under the shared ChatGPT workspace; no claim for inaccessible or remote-only inventories.",
    currentImages: own.length,
    otherImages: records.length - own.length,
    exact,
    similar,
    unreadable,
  };
  fs.writeFileSync(
    "docs/image-uniqueness-check.json",
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(
    JSON.stringify({
      currentImages: own.length,
      otherImages: report.otherImages,
      exact: exact.length,
      similar: similar.length,
      unreadable: unreadable.length,
    }),
  );
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
