// Read-only readiness probe. Real delivery tests are performed deliberately in the browser.
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const health = await fetch(new URL("/api/health", base));
const response = await fetch(new URL("/api/inquiries/config", base));
const config = await response.json();
console.log(
  JSON.stringify(
    {
      origin: base,
      health: health.status,
      configuration: response.status,
      inquiriesEnabled: config.enabled === true,
      externalMessagesSent: 0,
    },
    null,
    2,
  ),
);
if (!health.ok || !response.ok) process.exitCode = 1;
