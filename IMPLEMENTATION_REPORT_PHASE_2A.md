# Phase 2A — Québec French and accessibility

Audited localized navigation, product/solution/industry/location copy, form labels, consent, validation, feedback, metadata and route equivalents. Added parity tests for every route's canonical/hreflang and French content, and for every lead feedback state. The compact client option registry is tested against catalogue labels to prevent translation drift.

Improved full breadcrumb ancestry, equivalent language paths for receipt pages, locale-aware not-found content, practical target sizes, contrast for secondary numbers and unique contact metadata. Removed the upstream JSX non-null-expression diagnostic. Shared form options no longer pull the entire page registry into the client bundle.

Keyboard/accessibility features include visible focus, mobile Escape/focus return, associated errors and focusable summaries, semantic landmarks/headings, native FAQ disclosure, descriptive image alt text and reduced-motion styling. `scripts/accessibility-check.cjs` audits representative pages and French validation state; `docs/qa/ACCESSIBILITY.md` records the manual assistive-technology checks still required.

Build/lint/typecheck and 18 unit/security/content/localization tests passed. Browser accessibility results are appended after scan completion. A native Québec French editorial review and real assistive-technology testing remain human verification tasks, not assertions of certification.

Next: operations configuration, legal drafts, supplier workflow and deployment guidance.

Results: 25 axe scans passed with zero violations; equivalent language navigation and French validation focus passed. Final unit total: 19. Missing-page views render in the correct language; a Next.js error-boundary document-language workaround was added and must be rechecked in final production QA. The global fallback uses Next.js’s supported experimental globalNotFound option, appropriate for a dynamic root locale layout.
