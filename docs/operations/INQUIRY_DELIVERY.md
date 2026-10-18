# Inquiry delivery setup

No external messages have been sent during development. Unit tests inject an in-memory transport. Production delivery is gated on both configuration and explicit authorization.

## Supported adapters

`sendLead` is the common server-side interface. The Resend adapter uses the official send-email endpoint, authenticated with a secret API key and a verified `LEAD_FROM_EMAIL`; success requires an ID in a successful response. Reference: [Resend Send Email API](https://resend.com/docs/api-reference/emails/send-email), reviewed 2026-10-18. Provider acceptance is not proof of inbox delivery.

An alternative authenticated HTTPS mail webhook accepts JSON with `schemaVersion`, `requestId`, `from`, `to`, `replyTo`, `subject`, `text` and `lead`. Authenticate the `Authorization: Bearer ...` header and honor `Idempotency-Key`. Return a 2xx JSON response `{ "accepted": true, "id": "your-queue-id" }` only after durable acceptance. Empty responses, non-2xx responses, redirects and missing acceptance IDs fail closed. The webhook receiver is owner-provided; it is not implemented or claimed to exist here.

Neither adapter sends a customer autoresponder. The only destination is the configured internal recipient. The customer's address is the reply-to value. Text-only message bodies avoid HTML injection.

## Enablement gates

Set all required variables from `.env.example` using the hosting secret store. Do not commit values. `INQUIRIES_ENABLED`, `OUTBOUND_DELIVERY_AUTHORIZED` and `PRIVACY_POLICY_APPROVED` must explicitly be `true`. Supply a minimum 32-character random signing secret, sender/recipient/privacy email, legal entity, retention period and an absolute persistent filesystem path for rate-limit state. The canonical origin must be HTTPS and match the browser origin.

The form gets only an enabled boolean and a signed token from `/api/inquiries/config`; no provider configuration or credentials are exposed. Tokens are valid after two seconds and expire after one hour. Receipt cookies expire after ten minutes.

## Abuse and retry behavior

The endpoint accepts same-origin JSON only, caps actual streamed body bytes at 16 KiB, validates every field, requires consent and an empty honeypot, and enforces global and per-client hourly quotas. Client keys are HMAC hashes, not logged raw IP addresses. Without an explicitly trusted reverse-proxy header, all callers share one conservative client quota. Configure a header only when the host overwrites/removes spoofed incoming values.

The filesystem limiter uses exclusive file creation and supports multiple workers sharing the same persistent filesystem. Do not deploy this adapter to independent serverless instances or multiple hosts without replacing it with a shared atomic store. A missing/unwritable store fails closed. Fixed hourly windows may allow a burst across a boundary; retain edge-level request limits as well.

A nonce can attempt delivery once. Repeated submissions return 409; failures and timeouts never show success. A timeout can have an uncertain provider outcome—check the provider before asking a person to submit again. Do not silently retry with a fresh ID. Provider errors are not exposed to users or logged with personal data.

## Owner-authorized acceptance test

1. Review privacy/retention, verify the sender and internal recipient, and authorize one test.
2. Configure the production-equivalent host and persistent limiter volume.
3. Use a clearly identified synthetic business inquiry, with no customer or health data.
4. Confirm the provider accepted it, the internal inbox received it, the reply-to is correct, French text is intact, and no customer autoresponder was sent.
5. Verify repeated/invalid/cross-origin requests do not trigger additional mail.
6. Remove the synthetic inquiry from provider/inbox records according to the approved retention practice.

Do not claim live delivery until these steps have been performed with explicit authorization.
