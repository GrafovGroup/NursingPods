# WHC deployment

Deployed on 2026-10-18 with the owner's authorization to connect the existing WHC domain and hosting. No hosting purchase or nameserver migration was needed.

## Current configuration

- Canonical URL: https://nursingpods.ca (root redirects to `/en/`).
- Existing WHC Web Hosting Pro account; Node.js 24.21.0 in production mode under CloudLinux Passenger.
- Application directory: `nursingpods-live`; separate document root: `nursingpods.ca`.
- Startup file: `server.cjs`. Passenger manages the process; standalone execution binds only to loopback.
- `next.config.mjs` avoids runtime TypeScript/SWC compilation on the host's older glibc.
- Root A record: `51.161.57.68`, TTL 300; `www` remains a CNAME to `nursingpods.ca`.
- Nameservers remain `parking1.whc.ca` and `parking2.whc.ca`. Existing email forwarding A, MX and SPF records were preserved.
- Let’s Encrypt requested through cPanel's SSL/TLS Certificates wizard; valid TLS verified for apex and www.
- Document-root `.htaccess` preserves the generated Passenger configuration and redirects HTTP and www to canonical HTTPS, retaining path/query. ACME challenge paths are exempt.

## Release procedure

The shared account could not complete a full development dependency installation within its memory limit. Build and test on the development machine with the lockfile, then transfer `.next` (excluding cache/dev), `server.cjs`, `next.config.mjs`, source and `public` assets through cPanel File Manager. Install only production runtime dependencies on WHC. The first release used `npm install --omit=dev --ignore-scripts --no-audit --no-fund --legacy-peer-deps`; verify installed versions against the tested build for each release rather than allowing dependency drift.

Activate the app's Node virtual environment using the command displayed in cPanel's Node.js application editor. Restart only NursingPods using its Restart button or the application's `tmp/restart.txt`. Never restart unrelated hosted applications. Keep the previous build outside the document root for rollback. Public environment changes require rebuilding.

DNS and document-root configuration backups are retained privately outside the public document root. The previous root A value was `149.56.225.6` (WHC parking). Restoring that value returns visitors to parking; restoring the previous tested build is preferred for application regressions.

## Verification and remaining configuration

Live HTTPS checks passed for 108 bilingual routes and 3,484 internal links, sitemap/robots, canonical metadata, API health and security headers. HTTP/www redirects preserve paths and queries. Protected dotfile requests return 403. The English hero image loaded in the live browser.

Inquiry delivery remains disabled. Complete `TOMORROW_OWNER_CHECKLIST.md` before configuring contacts, privacy approval, provider credentials, persistent rate-limit storage and an authorized internal delivery test. Email DNS preservation does not mean a receiving inbox or inquiry provider has been configured. Docker is an alternative deployment format and is not used on WHC.
