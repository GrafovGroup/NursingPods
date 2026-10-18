# Page imagery prompts and provenance

Generated with the built-in image_gen tool, one separate generation per image placement. The scene for each route and language is recorded in `docs/page-image-plan.json`; published image paths, checksums and historical original source paths are in `docs/asset-register.json`.

Shared prompt: “Use case: stylized-concept. Original premium architectural image for NursingPods.ca. [scene]. Landscape 3:2 editorial architectural photography-style visualization, realistic ivory, teal, sage and natural wood. Coherent private nursing room arrangement with comfortable seating. No people, text, signage, logos, watermarks or captions. Fully opaque privacy walls and door. Genuinely distinct composition and architecture; do not repeat previous compositions.”

The images are architectural visualizations, not evidence of installations, local offices, supplier products or certified specifications. This provenance is internal; customer-facing alt text describes the visual neutrally.

## Original-file retention

The owner explicitly authorized removal of full-size generated originals after verifying optimized website copies. Each newly optimized image is fully decoded and reproduced from the source to verify a byte-identical export before its original is removed. Historical source paths remain provenance records, not runtime dependencies. Initial cleanup is recorded in `GENERATED_ORIGINALS_CLEANUP.json`; subsequent removals are recorded locally in `.runtime/removed-generated-originals.jsonl` and summarized at release.

## Uniqueness review scope

Check exact file hashes and visual similarity across current site assets and accessible prior-site image directories under the shared ChatGPT workspace. Inspect contact sheets for repeated scenes or compositions and review flagged similarities. Remote-only or inaccessible prior-site inventories cannot be verified by this audit; do not claim portfolio-wide verification.
