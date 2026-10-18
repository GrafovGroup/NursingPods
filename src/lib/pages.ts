import type { Locale } from "./config";
import { catalogue } from "./catalogue/data";
import { solutions } from "./catalogue/solutions";
import { sectionPath, itemPath, type Section } from "./paths";
import type { ContentSection, Localized } from "./catalogue/types";
export type PageRecord = {
  id: string;
  section: Section;
  paths: Localized<string>;
  title: Localized<string>;
  description: Localized<string>;
  sections: Localized<ContentSection[]>;
  faq?: Localized<[string, string][]>;
  related?: string[];
  entryId?: string;
  indexable: boolean;
  parentId?: string;
};
export const entries = [...catalogue, ...solutions];
export const sectionNames = {
  en: {
    products: "Nursing pods",
    solutions: "Nursing space solutions",
    industries: "Industries",
    locations: "Canadian project locations",
    about: "Our approach",
    contact: "Contact",
    quote: "Request a quote",
    privacy: "Privacy",
    terms: "Website terms",
  },
  fr: {
    products: "Cabines d’allaitement",
    solutions: "Solutions d’allaitement",
    industries: "Secteurs",
    locations: "Projets au Canada",
    about: "Notre approche",
    contact: "Contact",
    quote: "Demander une soumission",
    privacy: "Confidentialité",
    terms: "Conditions du site",
  },
};
export const pages: PageRecord[] = (["products", "solutions"] as const).map(
  (section) => ({
    id: section,
    section,
    paths: { en: sectionPath("en", section), fr: sectionPath("fr", section) },
    title: { en: sectionNames.en[section], fr: sectionNames.fr[section] },
    description:
      section === "products"
        ? {
            en: "Compare private nursing space approaches by intended use, layout and access requirements. Start with a category, then refine the project brief.",
            fr: "Comparez les espaces d’allaitement selon l’usage, l’aménagement et l’accès. Choisissez une catégorie, puis précisez votre projet.",
          }
        : {
            en: "Explore room planning, fit-out, installation coordination, temporary options and furniture for a private nursing space.",
            fr: "Explorez la planification, l’aménagement, la coordination de l’installation, les options temporaires et le mobilier.",
          },
    sections: { en: [], fr: [] },
    indexable: true,
  }),
);
for (const e of entries)
  pages.push({
    id: e.id,
    section: e.kind,
    parentId: e.kind,
    paths: {
      en: itemPath("en", e.kind, e.slugs.en),
      fr: itemPath("fr", e.kind, e.slugs.fr),
    },
    title: { en: e.copy.en.title, fr: e.copy.fr.title },
    description: { en: e.copy.en.summary, fr: e.copy.fr.summary },
    sections: { en: e.copy.en.sections, fr: e.copy.fr.sections },
    faq: { en: e.copy.en.faq, fr: e.copy.fr.faq },
    related: e.related,
    entryId: e.id,
    indexable: true,
  });
export function findPage(locale: Locale, path: string) {
  return pages.find((p) => p.paths[locale] === path);
}
export function byId(id: string) {
  return pages.find((p) => p.id === id);
}
for (const section of ["about", "contact", "quote"] as const)
  pages.push({
    id: section,
    section,
    paths: { en: sectionPath("en", section), fr: sectionPath("fr", section) },
    title: { en: sectionNames.en[section], fr: sectionNames.fr[section] },
    description:
      section === "about"
        ? {
            en: "Plan a private nursing space around the people who use it, the building it belongs in and the responsibilities needed to keep it working.",
            fr: "Planifiez un espace d’allaitement privé selon les personnes qui l’utilisent, le bâtiment et les responsabilités nécessaires à son bon fonctionnement.",
          }
        : {
            en: "Describe your location, intended use and timing to prepare a project-specific discussion about a private nursing space.",
            fr: "Décrivez l’emplacement, l’usage prévu et l’échéancier pour préparer une discussion adaptée à votre espace d’allaitement.",
          },
    sections:
      section === "about"
        ? {
            en: [
              {
                title: "A clear starting point",
                body: "NursingPods.ca brings product categories, room planning and practical questions together for Canadian workplaces and public facilities. Start by identifying who needs the space, how it will be accessed and who will manage it.",
              },
              {
                title: "Project-specific decisions",
                body: "Product selection, delivery and installation need a confirmed scope. We do not present unverified specifications, certifications or local office claims. Use these planning pages to prepare the details that a proposal will need.",
              },
            ],
            fr: [
              {
                title: "Un point de départ clair",
                body: "NursingPods.ca réunit les catégories de produits, la planification de pièces et les questions pratiques pour les milieux de travail et les lieux publics au Canada. Identifiez les usagers, l’accès et la personne responsable de l’espace.",
              },
              {
                title: "Des décisions propres au projet",
                body: "Le choix du produit, la livraison et l’installation exigent une portée confirmée. Nous ne présentons pas de caractéristiques, de certifications ni de bureaux locaux non vérifiés. Ces pages vous aident à préparer une proposition.",
              },
            ],
          }
        : { en: [], fr: [] },
    indexable: true,
  });
