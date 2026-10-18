# Hosting and WHC deployment guidance

No hosting, subscription, DNS or certificate changes have been made. Obtain owner authorization before applying this guide.

## Runtime requirement

This is a Next.js Node application with server-side inquiry routes, not an HTML-only export. It requires a maintained Node 24 runtime, an HTTPS reverse proxy, a persistent writable limiter directory and a process supervisor. Do not assume a PHP/shared-hosting plan supports those requirements. Confirm the actual account's capabilities with the host before deployment.

WHC lists a self-managed Linux VPS with root access and Linux OS choices. That can provide control to install an appropriate runtime, but application administration remains a separate responsibility; no existing account or plan has been verified. [WHC self-managed VPS](https://whc.ca/self-managed-virtual-private-servers/).

Next.js supports self-hosting and recommends placing a reverse proxy in front of the application. The repository's configuration must still be validated on the chosen host. [Next.js self-hosting guide](https://nextjs.org/docs/app/guides/self-hosting).

## Deployment choices prepared

- Normal Node process: `pnpm install --frozen-lockfile`, configure public build values, `pnpm build`, then run `pnpm start` under a process supervisor as a non-root application user.
- Container: `Dockerfile` builds and prunes development dependencies. `deploy/compose.example.yaml` binds the app to loopback and preserves `/app/runtime` in a volume. Fill all approved public build arguments and runtime secrets before building. Docker configuration is supplied but has not been executed if Docker is unavailable locally.

Use a separate private staging release first. Keep it authenticated or noindex at the host; the application defaults to production canonical URLs. Never point the real domain at a staging build merely to test it.

## Reverse proxy and filesystem

Terminate HTTPS at the host/proxy. Forward the correct Host and protocol information; overwrite any trusted client-IP header rather than passing through user-supplied values. Limit request size and request rates at the edge. Keep the Node port private. Use one persistent shared filesystem for all workers of this deployment; independent serverless instances require a distributed limiter replacement.

Give the application user access only to its runtime/cache directories and deployment files. Do not place the rate-limit directory in `public/`, a static web root or Git. Schedule `node scripts/prune-operational-data.mjs` with the same runtime directory after reviewing the maintenance instructions.

## DNS and redirects — owner action

1. Confirm `nursingpods.ca` as the canonical domain and whether `www` should redirect to it.
2. Obtain the exact A/AAAA/CNAME targets from the chosen host. No IP or DNS target is invented here.
3. Inventory existing records and preserve email MX/TXT records. Back up the DNS zone before changes.
4. Configure host-level HTTP→HTTPS and www→canonical redirects, preserving the path/query and avoiding loops. The application already redirects `/` to `/en/`.
5. Provision and verify the certificate before cutover. Check both languages, sitemap, robots, canonical URLs, and image delivery on the final host.
6. Enable inquiries only after the authorized delivery test and policy/config review. Keep a rollback release and prior DNS values available.
