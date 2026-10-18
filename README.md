# NursingPods.ca

Bilingual Canadian B2B nursing-pod and lactation-space website. Phase 1A implements the brief in `PHASE_1A_CODEX_MASTER_PROMPT.md`.

## Local development

Use Node.js 22 LTS or newer and pnpm 11.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000/en/ or http://localhost:3000/fr/.

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm start
pnpm test
pnpm test:browser
```

For browser checks, install Chromium once with `pnpm exec playwright install chromium`.

The HTTP smoke tests expect a running production server on port 3000; override with `TEST_BASE_URL` if needed.

## Configuration and deployment

Copy `.env.example` to `.env.local` if overrides are needed. The default canonical origin is `https://nursingpods.ca`; configure `NEXT_PUBLIC_SITE_URL` for a different production domain. The phone default is supplied by the owner. No email address has been invented.

Deploy on a Next.js-compatible Node host using `pnpm build` and `pnpm start`, or import this repository into a compatible managed host. DNS and hosting are not provisioned by this source code. Keep previews private or configure host-level noindex headers. There are no secrets in this repository.

The root redirects to `/en/`; `/en/` and `/fr/` are statically generated. Content is centralized in `src/lib/content.ts`, business settings in `src/lib/config.ts`, and geographic planning data in `src/lib/locations.ts`. Tailwind CSS 4 is available alongside the custom design system in `src/app/globals.css`.

## Inquiry behavior

The form is a reusable UI with product preselection and localized labels. It never transmits, persists, or reports success. Submission is disabled; visible phone links are the active contact method. Do not set `inquiriesEnabled` to true without implementing and testing a real submission endpoint, server-side validation, spam controls, consent/privacy handling, delivery errors and confirmed delivery. No fake endpoint or mail destination exists.

## Imagery

Two distinct original architectural visualizations are used in separate locale hero placements. They are not verified supplier products or completed installations. See `docs/asset-register.json`, `docs/image-prompts.md` and `docs/image-uniqueness-check.json`. No product inventory, supplier relationship, specification or completed-project claim is implied. The owner requires provenance to remain in internal documentation.

## Expansion

Product, solution and industry sections link to the inquiry UI. No empty catalogue or location routes are published. Add substantial, verified content before introducing additional URLs. The location registry contains all provinces and territories plus metro/municipality foundations; these are geographic planning records, not office or fulfillment claims.
