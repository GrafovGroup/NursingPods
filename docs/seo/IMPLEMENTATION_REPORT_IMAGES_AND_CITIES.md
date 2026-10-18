# Image and national city coverage update

## Implementation

- Expanded the location catalogue to 47 metro/capital entries and all 13 provinces/territories, yielding 180 standard bilingual pages including the two homepages.
- Coverage baseline includes all 41 CMAs in the 2021 Statistics Canada classification plus Charlottetown and the three territorial capitals. Existing Laval and Longueuil pages remain separate.
- Added distinct bilingual planning scenarios, surrounding-community links, location search titles and descriptions, parent/related links, canonical URLs, hreflang and sitemap entries.
- Surrounding-community links prefill the quote form rather than creating repeated thin municipality pages. No local offices, inventory, installations or service guarantees were invented.
- Added a unique hero image to each content page, separate English/French assets, and unique thank-you/404 visuals. Homepages retain their existing distinct images.
- Added asset registration, file-hash and visual-similarity tooling, plus tests that reject missing, reused or unregistered page images.
- Generated five logo options and a comparison board under `design/logo-options`. The current public logo remains unchanged pending owner selection.
- Per owner instruction, full-size generated originals are removed only after their optimized copies fully decode and reproduce byte-for-byte. Historical original paths remain in internal provenance records.

## Validation completed

- Production build: passed; 189 static outputs plus dynamic application/API routes.
- TypeScript: passed.
- ESLint: passed after formatting.
- Location coverage tests: 5 passed.
- Catalogue, localization and inquiry-safety tests: 18 passed.
- Desktop product-page visual check: image loaded, no horizontal overflow at 1440px.
- French mobile product-page visual check: image loaded, correct fr-CA document language, no horizontal overflow at 375px; mobile menu opens and exposes localized navigation.
- French city-to-quote flow: Whitby community link populates the Ville field correctly.

## Final release validation

- All 183 new page/system images are complete; 185 website images total including the existing homepages.
- All 25 unit tests pass, including full asset registration and uniqueness coverage.
- Exact-hash and perceptual-hash audit: 185 current images versus 1,280 accessible prior-project images; zero exact duplicates, zero close visual candidates, zero unreadable assets. No claim is made for inaccessible or remote-only inventories.
- Contact sheets visually reviewed for all new images.
- Production HTTP crawl: 180 bilingual routes and 6,072 internal links; zero errors. Every route image returned HTTP 200; canonical/hreflang, sitemap, robots, JSON-LD, security headers, 404s and disabled-delivery behavior passed.
- City-page desktop imagery loads correctly without overflow. Local production server was restarted after all public assets were present to refresh its static-file inventory.
- Five logo concepts are ready for owner review.

## Deployment

The tested build archive has been uploaded to the existing WHC application. Its SHA-256 matches locally and remotely. A rollback snapshot of the previous build/assets is retained at `nursingpods-release-backups/pre-cities-20261018.tar.gz` outside the public document root. Activation is complete at source commit `91b12d5`, build `WiamoEPI4iqqDT9-vQzzk`. Initial live checks passed (Regina HTTP 200; French Oshawa/Durham page and image rendered). Subsequent TCP timeouts affecting the public website and cPanel prevented completion of the full live crawl. Cause remains unconfirmed. The 180-route crawl above was against the local production build. See `docs/operations/HOSTING_WHC.md` for recovery details.

## Owner-only inputs

See `TOMORROW_OWNER_CHECKLIST.md` for contact details, inquiry provider credentials and authorization, business/supplier confirmations, final copy review and logo selection. Inquiry delivery remains disabled; downloading a project brief remains available.
