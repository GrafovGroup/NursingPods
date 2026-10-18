# Production environment matrix

Keep secret values in the host's secret environment store. Never paste credentials into Git or a public Page. Public `NEXT_PUBLIC_*` settings are embedded at build time: rebuild after changing them, and keep runtime values consistent with the same release.

| Variable | Where / purpose | Required before |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Build + runtime; approved HTTPS canonical origin, no trailing path | Public deployment |
| `NEXT_PUBLIC_BUSINESS_PHONE`, `NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY` | Build; owner-confirmed telephone and display text | Call buttons |
| `NEXT_PUBLIC_PHONE_VERIFIED` | Build; true only after owner verifies the number | Call buttons |
| `NEXT_PUBLIC_BUSINESS_EMAIL`, `NEXT_PUBLIC_EMAIL_VERIFIED` | Build; monitored public contact, no invented address | Public email link |
| `NEXT_PUBLIC_LEGAL_NAME` | Build + runtime; actual responsible entity | Lead sending |
| `NEXT_PUBLIC_PRIVACY_EMAIL` | Build + runtime; monitored privacy contact | Lead sending |
| `NEXT_PUBLIC_MAILING_ADDRESS` | Build; optional verified mailing address, not an invented office | Address display |
| `NEXT_PUBLIC_RETENTION_DAYS`, `LEAD_RETENTION_DAYS` | Build + runtime / runtime; same owner-approved duration | Lead sending |
| `NEXT_PUBLIC_DELIVERY_PROVIDER_LABEL` | Build + runtime; accurate provider/CRM disclosure | Lead sending |
| `INQUIRIES_ENABLED` | Runtime; default false | Lead sending |
| `OUTBOUND_DELIVERY_AUTHORIZED` | Runtime; explicit owner authorization, default false | Any outbound adapter |
| `PRIVACY_POLICY_APPROVED` | Runtime; owner/reviewer approval, default false | Lead sending |
| `LEAD_PROVIDER` | Runtime; `resend`, `webhook` or `disabled` | Lead sending |
| `LEAD_FROM_EMAIL`, `LEAD_TO_EMAIL` | Runtime; verified sender and internal recipient | Lead sending |
| `RESEND_API_KEY` | Secret runtime; only for Resend adapter | Resend sending |
| `MAIL_WEBHOOK_URL`, `MAIL_WEBHOOK_SECRET` | HTTPS endpoint and 32+ character bearer secret; only for webhook adapter | Webhook sending |
| `LEAD_SIGNING_SECRET` | Secret runtime; generate 32+ random characters locally | Signed form/receipt tokens |
| `LEAD_RATE_LIMIT_DIR` | Runtime; absolute dedicated writable persistent directory | Lead sending |
| `TRUSTED_PROXY_HEADER` | Runtime; empty by default; set only for a header the proxy overwrites | Per-client rate limiting |
| `CRM_WEBHOOK_ENABLED`, `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_SECRET` | Runtime; optional, false/empty by default | Optional CRM forwarding |

Generate a signing secret locally with `openssl rand -hex 32`, then enter it directly into the host's secret field. Do not commit the output. Rotate the secret if exposed; rotation invalidates outstanding form and receipt tokens.

Default state: no phone/email asserted verified, no sending, no CRM, no analytics. Project-brief downloads are local and usable without credentials. There is no real lead database to configure.

The retention variables describe the owner's policy; they do not automatically delete records held by an inbox, provider, CRM or backup service. Configure and verify deletion in those systems. Operational hash buckets can be pruned with the maintenance script.
