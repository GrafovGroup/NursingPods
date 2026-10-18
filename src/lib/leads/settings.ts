// Server-only module: never import into client components.
export function leadSettings(
  env: Record<string, string | undefined> = process.env,
) {
  const settings = {
    enabled: env.INQUIRIES_ENABLED === "true",
    authorized: env.OUTBOUND_DELIVERY_AUTHORIZED === "true",
    provider: env.LEAD_PROVIDER || "disabled",
    apiKey: env.RESEND_API_KEY || "",
    webhookUrl: env.MAIL_WEBHOOK_URL || "",
    webhookSecret: env.MAIL_WEBHOOK_SECRET || "",
    from: env.LEAD_FROM_EMAIL || "",
    to: env.LEAD_TO_EMAIL || "",
    secret: env.LEAD_SIGNING_SECRET || "",
    rateDir: env.LEAD_RATE_LIMIT_DIR || "",
    origin: env.NEXT_PUBLIC_SITE_URL || "https://nursingpods.ca",
    privacyApproved: env.PRIVACY_POLICY_APPROVED === "true",
    privacyEmail: env.NEXT_PUBLIC_PRIVACY_EMAIL || "",
    legalName: env.NEXT_PUBLIC_LEGAL_NAME || "",
    retentionDays: Number(env.LEAD_RETENTION_DAYS || 0),
    proxyHeader: env.TRUSTED_PROXY_HEADER || "",
  };
  const email = (v: string) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(v);
  let safeOrigin = false;
  let safeWebhook = false;
  try {
    const url = new URL(settings.origin);
    safeOrigin =
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      url.pathname === "/";
  } catch {}
  try {
    const url = new URL(settings.webhookUrl);
    safeWebhook = url.protocol === "https:" && !url.username && !url.password;
  } catch {}
  const providerReady =
    settings.provider === "resend"
      ? !!settings.apiKey
      : settings.provider === "webhook"
        ? safeWebhook && settings.webhookSecret.length >= 32
        : false;
  const ready =
    settings.enabled &&
    settings.authorized &&
    settings.privacyApproved &&
    settings.secret.length >= 32 &&
    settings.rateDir.startsWith("/") &&
    safeOrigin &&
    email(settings.from) &&
    email(settings.to) &&
    email(settings.privacyEmail) &&
    !!settings.legalName &&
    Number.isInteger(settings.retentionDays) &&
    settings.retentionDays >= 1 &&
    settings.retentionDays <= 3650 &&
    providerReady;
  return { ...settings, ready };
}
export type LeadSettings = ReturnType<typeof leadSettings>;
