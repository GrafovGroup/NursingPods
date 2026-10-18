import type { Locale } from "../config";
export type Localized<T> = Record<Locale, T>;
export type ContentSection = {
  title: string;
  body: string;
  bullets?: string[];
};
export type DetailCopy = {
  title: string;
  summary: string;
  sections: ContentSection[];
  faq: [string, string][];
};
export type CatalogueEntry = {
  id: string;
  kind: "products" | "solutions";
  slugs: Localized<string>;
  copy: Localized<DetailCopy>;
  useCase: Localized<string>;
  considerations: Localized<string[]>;
  related: string[];
  // Only add a unique, licensed/approved placement after updating the asset register.
  imagery?: Partial<
    Record<Locale, { src: string; alt: string; provenanceId: string }>
  >;
};
