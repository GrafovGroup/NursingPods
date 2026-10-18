import type { MetadataRoute } from "next";
import { business, locales } from "@/lib/config";
import { pages } from "@/lib/pages";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...locales.map((locale) => ({
      url: `${business.url}/${locale}/`,
      alternates: {
        languages: {
          "en-CA": `${business.url}/en/`,
          "fr-CA": `${business.url}/fr/`,
        },
      },
    })),
    ...pages
      .filter((p) => p.indexable)
      .flatMap((p) =>
        locales.map((locale) => ({
          url: `${business.url}${p.paths[locale]}`,
          alternates: {
            languages: {
              "en-CA": `${business.url}${p.paths.en}`,
              "fr-CA": `${business.url}${p.paths.fr}`,
            },
          },
        })),
      ),
  ];
}
