import type { MetadataRoute } from "next";
import { business, locales } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${business.url}/${locale}/`,
    alternates: {
      languages: {
        "en-CA": `${business.url}/en/`,
        "fr-CA": `${business.url}/fr/`,
      },
    },
  }));
}
