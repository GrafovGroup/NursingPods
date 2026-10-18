import { locationEntries, locationQuality } from "./location-content";
import { industries } from "./industries";
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
// Industry scenarios are planning guidance, not claims of completed client work.
for (const industry of industries)
  pages.push({
    id: industry.id,
    section: "industries",
    parentId: "industries",
    paths: {
      en: itemPath("en", "industries", industry.slugs.en),
      fr: itemPath("fr", "industries", industry.slugs.fr),
    },
    title: industry.title,
    description: industry.summary,
    sections: {
      en: industry.needs.en.map((body, i) => ({
        title: [
          "Define who the space serves",
          "Plan daily use",
          "Coordinate the site",
        ][i],
        body,
        ...(i === 2 ? { bullets: industry.questions.en } : {}),
      })),
      fr: industry.needs.fr.map((body, i) => ({
        title: [
          "Précisez les usagers",
          "Planifiez l’utilisation quotidienne",
          "Coordonnez les lieux",
        ][i],
        body,
        ...(i === 2 ? { bullets: industry.questions.fr } : {}),
      })),
    },
    related: industry.related,
    indexable: true,
  });
pages.push({
  id: "industries",
  section: "industries",
  paths: {
    en: sectionPath("en", "industries"),
    fr: sectionPath("fr", "industries"),
  },
  title: {
    en: "Nursing spaces for every setting",
    fr: "Des espaces d’allaitement pour chaque milieu",
  },
  description: {
    en: "Explore project considerations for workplaces, campuses and public facilities. Each setting has its own access, operating and purchasing needs.",
    fr: "Explorez les éléments à considérer pour les milieux de travail, campus et lieux publics. Chaque secteur a ses propres besoins d’accès, d’exploitation et d’achat.",
  },
  sections: { en: [], fr: [] },
  indexable: true,
});
for (const entry of entries) {
  const page = byId(entry.id)!;
  page.related = [
    ...(page.related || []),
    ...industries
      .filter((i) => i.related.includes(entry.id))
      .slice(0, 2)
      .map((i) => i.id),
  ];
}
pages.push({
  id: "privacy",
  section: "privacy",
  paths: { en: sectionPath("en", "privacy"), fr: sectionPath("fr", "privacy") },
  title: {
    en: "Privacy and project information",
    fr: "Confidentialité et renseignements sur les projets",
  },
  description: {
    en: "Understand the difference between preparing a local project brief and sending an inquiry.",
    fr: "Comprenez la différence entre préparer un descriptif local et envoyer une demande.",
  },
  sections: {
    en: [
      {
        title: "Preparing a project brief",
        body: "Typing in the form keeps the information in the current browser tab. Downloading a project brief creates a text file on your device; it does not send an inquiry. You control where that downloaded file is stored and who receives it.",
      },
      {
        title: "Sending an inquiry",
        body: "When the send function is available, an inquiry uses your business contact details and project requirements to request a response. Consent is separate from marketing. Do not include personal health information, payment details or information about another person.",
      },
      {
        title: "Site technology",
        body: "The site uses no advertising trackers or analytics scripts. Hosting infrastructure may retain operational request logs. A short-lived, secure confirmation cookie is used only after the delivery service accepts an inquiry; it contains no contact details.",
      },
    ],
    fr: [
      {
        title: "Préparer un descriptif de projet",
        body: "Les renseignements saisis restent dans l’onglet courant. Le téléchargement crée un fichier texte sur votre appareil; il n’envoie pas de demande. Vous décidez où conserver ce fichier et à qui le transmettre.",
      },
      {
        title: "Envoyer une demande",
        body: "Lorsque la fonction d’envoi est disponible, la demande utilise vos coordonnées professionnelles et vos besoins pour obtenir une réponse. Le consentement est distinct du marketing. N’incluez pas de données sur la santé, de paiement ou sur une autre personne.",
      },
      {
        title: "Technologie du site",
        body: "Le site n’utilise aucun traceur publicitaire ni script d’analyse. L’hébergement peut conserver des journaux techniques. Un témoin sécurisé de courte durée est utilisé seulement après l’acceptation d’une demande par le service de transmission; il ne contient pas de coordonnées.",
      },
    ],
  },
  indexable: true,
});
pages.push({
  id: "locations",
  section: "locations",
  paths: {
    en: sectionPath("en", "locations"),
    fr: sectionPath("fr", "locations"),
  },
  title: {
    en: "Plan a nursing-space project in Canada",
    fr: "Planifiez un espace d’allaitement au Canada",
  },
  description: {
    en: "Prepare a location-specific project brief for any province or territory. Explore regional planning considerations and major markets without assuming local inventory or installation availability.",
    fr: "Préparez un brief adapté à votre province ou territoire. Explorez les éléments régionaux et les principaux marchés sans présumer de stock local ni de disponibilité d’installation.",
  },
  sections: {
    en: [
      {
        title: "National inquiry, site-specific scope",
        body: "The location directory helps organize project questions across Canada. It does not represent a network of offices or a promise of local fulfillment. Identify the building, receiving contact, access requirements and timing so supply and installation can be assessed for the actual destination.",
      },
    ],
    fr: [
      {
        title: "Une demande nationale, une portée locale",
        body: "Le répertoire aide à organiser les questions de projet au Canada. Il ne représente pas un réseau de bureaux ni une promesse de service local. Indiquez le bâtiment, le contact, les accès et l’échéancier pour évaluer la fourniture et l’installation selon la destination réelle.",
      },
    ],
  },
  indexable: true,
});
for (const location of locationEntries) {
  const parent = locationEntries.find((l) => l.id === location.parentId);
  const path = (locale: Locale) =>
    `${sectionPath(locale, "locations")}${parent ? parent.slugs[locale] + "/" : ""}${location.slugs[locale]}/`;
  pages.push({
    id: location.id,
    section: "locations",
    parentId: location.parentId,
    paths: { en: path("en"), fr: path("fr") },
    title: {
      en: `Nursing-space planning — ${location.name.en}`,
      fr: `Planification d’espaces d’allaitement — ${location.name.fr}`,
    },
    description: {
      en: `Prepare a project in ${location.name.en}: review building access, intended users, receiving arrangements and the responsibilities to confirm in a proposal.`,
      fr: `Préparez un projet — ${location.name.fr} : examinez l’accès, les usagers, la réception et les responsabilités à confirmer dans une proposition.`,
    },
    sections: location.sections,
    related: ["freestanding", "rooms", "installation"],
    indexable: locationQuality(location),
  });
}
