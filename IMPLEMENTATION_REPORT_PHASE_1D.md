# Phase 1D — Canadian location architecture and SEO

Implemented a bilingual location index, all 13 province/territory guides and 11 metro guides. Regional copy focuses on useful project planning, access, receiving, responsibility and language questions; no office, stock, shipping or installation guarantee is asserted.

Toronto/GTA includes Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, Burlington and eastern GTA municipalities. Other guides cover Metro Vancouver, Montréal, Laval, Longueuil/Rive-Sud, Ottawa–Gatineau, Calgary, Edmonton, Winnipeg, Halifax/Dartmouth and Québec/Lévis. Province-level directories include additional major communities and northern destinations.

Municipality links prefill the project brief rather than publishing thin near-duplicate city pages. The architecture supports future city pages when original, useful local information is available. `locationQuality` requires bilingual substantive sections and editorial readiness; failed drafts are noindex and excluded from the sitemap. Every current location guide passes the content gate.

Added location records and quality tests, region-to-metro hierarchy, cross-links, municipality inquiry links and all actual indexable pages in the bilingual sitemap. Existing canonical/hreflang, metadata and breadcrumb templates apply to every route. Corrected homepage inquiry preselection to use the catalogue labels consistently.

Files: `src/lib/location-content.ts`, page registry, ContentPage location sections, sitemap, navigation/home links and location unit tests.

Verification: phase check results recorded in BUILD_PROGRESS.md. Manual local fulfillment verification remains owner-dependent; geographic coverage here means inquiry planning, not guaranteed service. Next: French editorial, accessibility and navigation audit.

Results: build passed (115 static outputs), TypeScript passed, all 15 unit/security/content tests passed. ESLint exited 0; its JSX utility emitted a non-null-expression diagnostic, scheduled for cleanup in the accessibility/navigation pass.
