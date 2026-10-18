import type { Locale } from "./config";
export const routeSegments = {
  en: {
    products: "products",
    solutions: "solutions",
    industries: "industries",
    locations: "locations",
    about: "about",
    contact: "contact",
    quote: "request-a-quote",
    privacy: "privacy",
    terms: "terms",
  },
  fr: {
    products: "produits",
    solutions: "solutions",
    industries: "secteurs",
    locations: "regions",
    about: "a-propos",
    contact: "contact",
    quote: "demander-une-soumission",
    privacy: "confidentialite",
    terms: "conditions",
  },
} as const;
export type Section = keyof typeof routeSegments.en;
export function sectionPath(locale: Locale, section: Section) {
  return `/${locale}/${routeSegments[locale][section]}/`;
}
export function itemPath(locale: Locale, section: Section, slug: string) {
  return `${sectionPath(locale, section)}${slug}/`;
}
