export const business = {
  name: "NursingPods.ca",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nursingpods.ca",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+18336969996",
  phoneDisplay:
    process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || "(833) 696-9996",
  // No email address or submission endpoint has been supplied. Never invent one.
  phoneVerified: process.env.NEXT_PUBLIC_PHONE_VERIFIED === "true",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || "",
  privacyEmail: process.env.NEXT_PUBLIC_PRIVACY_EMAIL || "",
};
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
