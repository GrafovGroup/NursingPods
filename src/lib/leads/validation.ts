import { provinces } from "../locations";
export const fieldLimits = {
  name: 120,
  organization: 180,
  email: 254,
  phone: 40,
  city: 120,
  province: 2,
  interest: 180,
  details: 4000,
  timeline: 120,
} as const;
export type LeadFields = keyof typeof fieldLimits;
export type Lead = Record<LeadFields, string> & {
  locale: "en" | "fr";
  consent: true;
  consentVersion: "2026-10-18";
};
export type ValidationResult =
  { ok: true; lead: Lead } | { ok: false; errors: Record<string, string> };
export function validateLead(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { ok: false, errors: { form: "invalid" } };
  const raw = input as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const clean: Partial<Record<LeadFields, string>> = {};
  for (const [field, max] of Object.entries(fieldLimits)) {
    const value = raw[field];
    if (typeof value !== "string") {
      errors[field] = "required";
      continue;
    }
    const text = value.trim();
    clean[field as LeadFields] = text;
    if (
      text.length > max ||
      /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(text)
    )
      errors[field] = "invalid";
    if (field !== "details" && /[\r\n]/.test(text)) errors[field] = "invalid";
  }
  for (const field of [
    "name",
    "organization",
    "email",
    "city",
    "province",
    "details",
  ] as const)
    if (!clean[field]) errors[field] = "required";
  if (clean.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email))
    errors.email = "email";
  if (clean.phone && !/^[+\d\s().x#-]{5,40}$/i.test(clean.phone))
    errors.phone = "invalid";
  if (clean.province && !provinces.some((p) => p[0] === clean.province))
    errors.province = "invalid";
  if (raw.locale !== "en" && raw.locale !== "fr") errors.locale = "invalid";
  if (raw.consent !== true) errors.consent = "consent";
  if (raw.consentVersion !== "2026-10-18") errors.consent = "consent";
  return Object.keys(errors).length
    ? { ok: false, errors }
    : {
        ok: true,
        lead: {
          ...clean,
          locale: raw.locale,
          consent: true,
          consentVersion: "2026-10-18",
        } as Lead,
      };
}
