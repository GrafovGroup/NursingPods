import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business, isLocale, locales } from "@/lib/config";
import { content } from "@/lib/content";
import "../globals.css";
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = content[locale];
  return {
    metadataBase: new URL(business.url),
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: `/${locale}/`,
      languages: { "en-CA": "/en/", "fr-CA": "/fr/", "x-default": "/en/" },
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `/${locale}/`,
      siteName: business.name,
      type: "website",
      locale: locale === "en" ? "en_CA" : "fr_CA",
      alternateLocale: locale === "en" ? "fr_CA" : "en_CA",
    },
    twitter: {
      card: "summary",
      title: c.metaTitle,
      description: c.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale === "en" ? "en-CA" : "fr-CA"}>
      <body>{children}</body>
    </html>
  );
}
