# Phase 2B — Commercial operations and integrations

Expanded centralized configuration for verified contact details, legal entity, optional mailing address, privacy contact, provider disclosure and retention. Added accurate privacy/website-use pages and internal EN/FR legal-review drafts; no customer-facing legal-review or pre-launch wording is used. Policy approval remains an enablement gate.

Added optional authenticated HTTPS CRM forwarding after email-provider acceptance, with explicit authorization and acknowledgement checks. CRM failure is logged without PII and does not erase mail acceptance or ask the user to resubmit. Tests use injected transports; no live email/CRM messages were sent.

Added process health endpoint, operational-state pruning command, provider setup/environment matrix, maintenance/backup/monitoring instructions, WHC/Node deployment guidance, Dockerfile and example Compose configuration. No hosting/DNS changes were made. Added an editable supplier intake schema, evidence/rights workflow and optional approved imagery rendering slots; no partner, SKU, measurement, certification or photo rights were fabricated.

Files: lead CRM/handler/config, privacy/terms registry and footer, ContentPage imagery slot, health route, environment example, `docs/operations`, `docs/legal`, `docs/suppliers`, Docker/Compose and CRM tests.

Known limits: legal/business/provider facts still require owner approval; external retention deletion is an operational responsibility, not performed by a configuration value. The file limiter is for a persistent shared Node host. Docker deployment and real provider delivery remain unverified until the selected host/account is available and authorized.

Phase-check results are recorded in BUILD_PROGRESS.md. Next: comprehensive route, metadata, interaction, accessibility, security and performance QA plus CI.

Results: clean lint, successful build (117 static outputs and dynamic API/receipt routes), standalone typecheck and 21 passing tests. Docker is not installed on this host, so the container configuration was not executed. The normal Node production server is verified locally.
