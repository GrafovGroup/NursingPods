import { pageImagery } from "./page-imagery";
import type { Metadata } from "next";
import { business, type Locale } from "./config";
import type { PageRecord } from "./pages";
export function pageMetadata(page: PageRecord, locale: Locale): Metadata {
  return {
    title: `${page.title[locale]} | NursingPods.ca`,
    description: page.description[locale],
    alternates: {
      canonical: page.paths[locale],
      languages: {
        "en-CA": page.paths.en,
        "fr-CA": page.paths.fr,
        "x-default": page.paths.en,
      },
    },
    openGraph: {
      title: `${page.title[locale]} | NursingPods.ca`,
      description: page.description[locale],
      url: page.paths[locale],
      siteName: business.name,
      images: [
        {
          url: pageImagery(page, locale).src,
          width: 1200,
          height: 800,
          alt: pageImagery(page, locale).alt,
        },
      ],
      type: "website",
      locale: locale === "en" ? "en_CA" : "fr_CA",
      alternateLocale: locale === "en" ? "fr_CA" : "en_CA",
    },
    twitter: {
      card: "summary",
      title: page.title[locale],
      description: page.description[locale],
    },
    robots: { index: page.indexable, follow: true },
  };
}
