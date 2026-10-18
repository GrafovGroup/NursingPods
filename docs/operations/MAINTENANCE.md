# Maintenance, backups and monitoring

## What the application stores

No lead bodies are persisted locally. The internal recipient/provider and optional CRM are the business records and must follow the approved retention process. Local operational state consists of HMAC client-rate keys and one-time submission nonce files in hourly buckets. No raw IP, email, project body or token secret is written to application logs.

Run `node scripts/prune-operational-data.mjs` with `LEAD_RATE_LIMIT_DIR` set to the dedicated state directory. It deletes only numeric hourly bucket directories older than the retained recent window under `rates/` and `submissions/`. Schedule this on the host after authorization; no machine scheduler has been installed by this task.

## Backups

- Keep code/lockfiles in Git and a known-good release artifact.
- Store secrets in an encrypted secret manager with controlled recovery access; never in a Git backup.
- Back up relevant provider/inbox/CRM records only under the approved retention policy. Do not keep indefinite copies by default.
- Preserve operational limiter state across application restarts and deployments. A restore must not accidentally make a used submission nonce reusable inside its validity window.
- Test restoring a release in a private environment. Verify that sending is disabled during restore testing.

## Monitoring

`GET /api/health` is process health only. It does not test mail, CRM, DNS, supplier availability or inbox delivery. Monitor HTTPS availability, EN/FR pages, certificate expiry, disk space and writable state storage. Review aggregate `inquiry_provider_accepted`, `inquiry_processing_failed` and `inquiry_crm_forward_failed` events; they contain request IDs, not PII. Hosting access logs may contain request information and need their own privacy/retention settings.

CRM forwarding is optional and best-effort after verified email acceptance. A CRM failure does not ask the user to send again and does not erase the accepted email. There is no background retry queue; reconcile from the internal inbox/provider record, with appropriate authorization.

Regularly review dependency updates, content links, accessibility, provider sender verification and supplier evidence. Re-run tests before releases. Do not send recurring test emails without explicit authorization. No uptime or delivery guarantee is claimed.
