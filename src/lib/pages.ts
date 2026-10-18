import { locationEntries, locationQuality } from "./location-content";
import { industries } from "./industries";
import { business, type Locale } from "./config";
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
      en: `Nursing Pods & Lactation Rooms — ${location.name.en}`,
      fr: `Cabines et salles d’allaitement — ${location.name.fr}`,
    },
    description: {
      en: `Explore nursing pods, workplace lactation rooms and private breastfeeding spaces in ${location.name.en} and surrounding communities. Plan your space and request a quote.`,
      fr: `Explorez les cabines, salles et espaces privés d’allaitement — ${location.name.fr} et les environs. Planifiez votre projet et demandez une soumission.`,
    },
    sections: {
      en: [
        ...location.sections.en,
        {
          title: `Compare nursing pods and lactation rooms in ${location.name.en}`,
          body: `An existing private room can be furnished for breastfeeding or expressing milk, while a freestanding nursing pod creates an enclosed space within a larger interior. For ${location.name.en}, compare the actual room, user route and daily operating needs before choosing either approach. Ask about layout, furniture, privacy, delivery and installation coordination as separate parts of your quote. Availability and site work depend on the project location and requirements.`,
        },
      ],
      fr: [
        ...location.sections.fr,
        {
          title: `Comparer les cabines et salles d’allaitement — ${location.name.fr}`,
          body: `Une pièce privée existante peut être aménagée pour allaiter ou exprimer du lait; une cabine autonome crée un espace fermé dans un intérieur plus vaste. Pour ${location.name.fr}, comparez la pièce, le parcours et les besoins quotidiens avant de choisir. Distinguez l’aménagement, le mobilier, l’intimité, la livraison et la coordination de l’installation dans votre soumission. La disponibilité et les travaux dépendent du lieu et des exigences du projet.`,
        },
      ],
    },
    related: ["freestanding", "rooms", "installation"],
    indexable: locationQuality(location),
  });
}
const contactPage = byId("contact");
if (contactPage)
  contactPage.description = {
    en: "Prepare your questions for NursingPods.ca, organize your project details and use the available contact options for your workplace or public facility.",
    fr: "Préparez vos questions pour NursingPods.ca, rassemblez les détails du projet et utilisez les options de contact pour votre milieu de travail ou lieu public.",
  };
const privacyPage = byId("privacy");
if (privacyPage) {
  if (business.legalName)
    for (const locale of ["en", "fr"] as const)
      privacyPage.sections[locale].push({
        title:
          locale === "en"
            ? "Responsible organization"
            : "Organisation responsable",
        body:
          locale === "en"
            ? `The organization responsible for this website is ${business.legalName}.${business.mailingAddress ? " Mailing address: " + business.mailingAddress : ""}`
            : `L’organisation responsable du site est ${business.legalName}.${business.mailingAddress ? " Adresse postale : " + business.mailingAddress : ""}`,
      });
  if (business.privacyEmail)
    for (const locale of ["en", "fr"] as const)
      privacyPage.sections[locale].push({
        title:
          locale === "en"
            ? "Privacy questions"
            : "Questions de confidentialité",
        body:
          locale === "en"
            ? `For questions about your inquiry information or a request to access, correct or remove it, contact ${business.privacyEmail}. Please provide only what is necessary to identify the inquiry.`
            : `Pour une question sur vos renseignements ou une demande d’accès, de correction ou de suppression, contactez ${business.privacyEmail}. Fournissez uniquement ce qui est nécessaire pour identifier la demande.`,
      });
  if (business.retentionDays && business.deliveryProviderLabel)
    for (const locale of ["en", "fr"] as const)
      privacyPage.sections[locale].push({
        title:
          locale === "en"
            ? "Processing and retention"
            : "Traitement et conservation",
        body:
          locale === "en"
            ? `Inquiry delivery uses ${business.deliveryProviderLabel}. The configured retention period for inquiry records is ${business.retentionDays} days, unless an ongoing project or an applicable obligation requires a different period. Operational rate-limit records use hashed keys and are removed through the maintenance process. No inquiry body is stored in the website application logs.`
            : `La transmission des demandes utilise ${business.deliveryProviderLabel}. La période de conservation configurée est de ${business.retentionDays} jours, sauf si un projet en cours ou une obligation applicable exige une autre durée. Les données de limitation des demandes utilisent des clés hachées et sont retirées lors de l’entretien. Aucun contenu de demande n’est conservé dans les journaux de l’application.`,
      });
}
pages.push({
  id: "terms",
  section: "terms",
  paths: { en: sectionPath("en", "terms"), fr: sectionPath("fr", "terms") },
  title: { en: "Using this website", fr: "Utilisation du site" },
  description: {
    en: "How to use NursingPods.ca planning information, project inquiries and product-category guidance.",
    fr: "Comment utiliser les renseignements de planification, les demandes de projet et les guides de catégories de NursingPods.ca.",
  },
  sections: {
    en: [
      {
        title: "Planning information",
        body: "The pages on this website explain categories and considerations for private nursing spaces. They do not provide product-specific measurements, certifications or engineering approval. Confirm the actual product information and site requirements in a written project scope.",
      },
      {
        title: "Inquiries and proposals",
        body: "Preparing a project brief or submitting an inquiry requests a discussion. It does not reserve equipment, establish availability or create an order. Pricing, supply, installation, warranties and any rental arrangements must be addressed in the applicable written proposal or agreement.",
      },
      {
        title: "Responsible use",
        body: "Provide accurate business contact information and only the project details needed for a response. Do not submit another person’s health information, payment details, harmful material or automated abusive requests. The website may limit requests to protect availability.",
      },
    ],
    fr: [
      {
        title: "Renseignements de planification",
        body: "Les pages présentent des catégories et des éléments à considérer pour les espaces d’allaitement privés. Elles ne fournissent pas de dimensions propres aux produits, de certifications ni d’approbation technique. Confirmez les renseignements réels et les exigences du site dans une portée écrite.",
      },
      {
        title: "Demandes et propositions",
        body: "Préparer un descriptif ou envoyer une demande amorce une discussion. Cela ne réserve pas d’équipement, ne confirme pas sa disponibilité et ne constitue pas une commande. Les prix, la fourniture, l’installation, les garanties et la location doivent être précisés dans la proposition ou l’entente applicable.",
      },
      {
        title: "Utilisation responsable",
        body: "Fournissez des coordonnées professionnelles exactes et uniquement les renseignements nécessaires. N’envoyez pas de données sur la santé d’autrui, de paiement, de contenu nuisible ni de demandes automatisées abusives. Le site peut limiter les demandes pour préserver sa disponibilité.",
      },
    ],
  },
  indexable: true,
});
