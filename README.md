# NursingPods.ca

Bilingual Canadian B2B nursing-pod and lactation-space website implemented from the GitHub phase runbook. Includes product and solution guides, industries, Canadian location guides, inquiry intake, privacy and terms pages.

## Run locally

Use Node 24 and pnpm 11.25.0:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Visit `/en/` or `/fr/`. For production checks:

```sh
pnpm check
pnpm start
# In another terminal, with inquiry delivery disabled:
pnpm exec playwright install chromium
pnpm test:http
pnpm test:browser
pnpm test:a11y
node scripts/verify-delivery.mjs
```

Set `TEST_BASE_URL` to override the test origin. Browser evidence is saved under ignored `artifacts/`.

## Configuration

Copy `.env.example` to `.env.local` for local settings. Public values require rebuilding. Keep secrets out of Git. Read `docs/operations/ENVIRONMENT.md`, `INQUIRY_DELIVERY.md`, `HOSTING_WHC.md` and `LAUNCH_VERIFICATION.md` before enabling intake or deploying. Docker configuration is supplied but was not executed locally because Docker is unavailable.

Inquiry delivery defaults off. Visitors can download their project brief locally; submission becomes available only after the server validates explicit authorization, provider credentials and required business/privacy settings. Success requires provider acceptance. No external messages have been sent during implementation. Phone and email links require verification flags.

## Content and operations

The typed page registry is `src/lib/pages.ts`; catalogue, industries and geographic guides live in `src/lib/`. Routes have translated slugs, canonical URLs and reciprocal language alternates. Location publication is subject to a content-quality gate. Supplier claims require evidence; intake instructions are in `docs/suppliers/`.

Two distinct original hero images occupy separate EN/FR placements. Provenance and uniqueness evidence are internal in `docs/asset-register.json` and `docs/image-uniqueness-check.json`. No completed-project claim is implied. Additional photography requires a new unique asset per placement.

Start with `TOMORROW_OWNER_CHECKLIST.md` for pending decisions and `FINAL_IMPLEMENTATION_REPORT.md` for phase status and verification limits. No public deployment or DNS change has been performed.
