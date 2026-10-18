import { imageAlt } from "./image-alt";
import type { Locale } from "./config";
import type { PageRecord } from "./pages";
export function pageImagery(page: PageRecord, locale: Locale) {
  return {
    src: `/images/pages/${page.id}-${locale}.webp`,
    alt:
      imageAlt[page.id]?.[locale] ??
      (locale === "en"
        ? `${page.title.en}: a private nursing space in a commercial interior.`
        : `${page.title.fr} : un espace d’allaitement privé dans un intérieur commercial.`),
    width: 1200,
    height: 800,
  };
}
