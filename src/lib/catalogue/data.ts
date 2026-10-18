import type { CatalogueEntry } from "./types";
// Category-level planning content. No SKUs, measurements, certification or inventory claims.
export const catalogue: CatalogueEntry[] = [
  {
    id: "freestanding",
    kind: "products",
    slugs: {
      en: "freestanding-nursing-pods",
      fr: "cabines-allaitement-autonomes",
    },
    useCase: {
      en: "A dedicated space inside an existing floor plan",
      fr: "Un espace dédié dans un aménagement existant",
    },
    considerations: {
      en: [
        "Reserve a footprint and an unobstructed approach route.",
        "Review enclosure privacy and door positioning.",
        "Check power, ventilation and building approvals.",
      ],
      fr: [
        "Prévoyez une surface et un accès dégagé.",
        "Examinez l’intimité de l’enveloppe et la position de la porte.",
        "Vérifiez l’alimentation, la ventilation et les autorisations du bâtiment.",
      ],
    },
    related: ["modular", "installation", "furniture"],
    copy: {
      en: {
        title: "Freestanding nursing pods",
        summary:
          "Create a dedicated place to nurse or pump within an existing office, campus or public interior, without assuming that a full room conversion is the right fit.",
        sections: [
          {
            title: "Start with the setting",
            body: "A freestanding enclosure can be considered when a building needs a clearly identifiable private space. Compare potential positions with facilities staff before choosing a layout. A quiet corner may be convenient, but it still needs a suitable route and operational oversight.",
          },
          {
            title: "Privacy is part of the plan",
            body: "Discuss sightlines, door operation, occupancy indicators and access arrangements. An enclosure should be assessed as a complete proposal; do not infer acoustic performance or privacy features from a rendering.",
          },
          {
            title: "Prepare a useful project brief",
            body: "Share a floor plan, intended users, nearby power and any restrictions on bringing equipment into the building. Confirm the proposed footprint, clearances, finishes and maintenance requirements before an order.",
          },
        ],
        faq: [
          [
            "Does freestanding mean no installation work?",
            "No. Delivery, assembly, electrical needs and building approvals depend on the selected system and site. Confirm the complete scope in the proposal.",
          ],
          [
            "Can a pod go in a corridor?",
            "Placement needs review for circulation, egress and access. A corridor is not automatically a suitable location.",
          ],
        ],
      },
      fr: {
        title: "Cabines d’allaitement autonomes",
        summary:
          "Prévoyez un lieu dédié pour allaiter ou tirer son lait dans un bureau, un campus ou un lieu public, en évaluant si une cabine convient mieux qu’une pièce existante.",
        sections: [
          {
            title: "Commencez par les lieux",
            body: "Une enceinte autonome peut convenir lorsqu’un bâtiment a besoin d’un espace privé facile à repérer. Comparez les emplacements avec l’équipe des installations. Un coin tranquille doit aussi offrir un accès approprié et une gestion claire.",
          },
          {
            title: "Planifiez l’intimité",
            body: "Discutez des lignes de vue, de la porte, des indicateurs d’occupation et des modalités d’accès. Évaluez la proposition dans son ensemble; une image ne confirme ni la performance acoustique ni les caractéristiques d’intimité.",
          },
          {
            title: "Préparez un brief utile",
            body: "Fournissez un plan, les usages prévus, les prises à proximité et les contraintes de livraison. Confirmez les dimensions proposées, les dégagements, les finis et l’entretien avant de commander.",
          },
        ],
        faq: [
          [
            "Autonome veut-il dire sans travaux?",
            "Non. La livraison, l’assemblage, les besoins électriques et les autorisations dépendent du système et du bâtiment. Confirmez la portée complète dans la proposition.",
          ],
          [
            "Peut-on placer une cabine dans un corridor?",
            "L’emplacement doit être évalué selon la circulation, l’évacuation et l’accès. Un corridor n’est pas nécessairement approprié.",
          ],
        ],
      },
    },
  },
  {
    id: "modular",
    kind: "products",
    slugs: {
      en: "modular-lactation-pods",
      fr: "cabines-allaitement-modulaires",
    },
    useCase: {
      en: "A planned enclosure with configurable layout needs",
      fr: "Une enceinte dont l’aménagement doit être configurable",
    },
    considerations: {
      en: [
        "Review available configurations rather than assumed expandability.",
        "Plan assembly access and future building changes.",
        "Confirm how joints, doors and services are integrated.",
      ],
      fr: [
        "Examinez les configurations offertes sans présumer qu’elles sont extensibles.",
        "Planifiez l’accès pour l’assemblage et les changements futurs.",
        "Confirmez l’intégration des joints, des portes et des services.",
      ],
    },
    related: ["custom", "design", "installation"],
    copy: {
      en: {
        title: "Modular lactation pods",
        summary:
          "Explore a configurable approach when your building layout, assembly access or longer-term space planning calls for flexibility.",
        sections: [
          {
            title: "Configuration begins with constraints",
            body: "Describe the usable area, ceiling conditions and approach routes before discussing module combinations. A modular design does not mean every dimension or feature can be changed.",
          },
          {
            title: "Plan assembly and future changes",
            body: "Ask how sections enter the building, what work happens on site and whether future disassembly is supported. Confirm what is included in any relocation or reconfiguration scope.",
          },
          {
            title: "Review the whole enclosure",
            body: "Look beyond individual panels. Door clearances, ventilation, connections, finishes and cleaning access need to work together in the final layout.",
          },
        ],
        faq: [
          [
            "Can a modular pod be expanded later?",
            "That depends on the actual system. Expansion or reconfiguration must be confirmed in the supplier documentation and project scope.",
          ],
        ],
      },
      fr: {
        title: "Cabines d’allaitement modulaires",
        summary:
          "Explorez une approche configurable lorsque l’aménagement, l’accès pour l’assemblage ou la planification à long terme exigent de la souplesse.",
        sections: [
          {
            title: "Les contraintes orientent la configuration",
            body: "Décrivez la surface utile, le plafond et les voies d’accès avant de discuter des modules. Une conception modulaire ne signifie pas que toutes les dimensions ou options sont modifiables.",
          },
          {
            title: "Prévoyez l’assemblage et les changements",
            body: "Demandez comment les éléments entrent dans le bâtiment, quels travaux se font sur place et si le démontage est prévu. Confirmez la portée de tout déplacement ou réaménagement.",
          },
          {
            title: "Évaluez l’ensemble",
            body: "Au-delà des panneaux, les dégagements, la ventilation, les raccordements, les finis et l’accès pour le nettoyage doivent fonctionner ensemble.",
          },
        ],
        faq: [
          [
            "Peut-on agrandir une cabine modulaire plus tard?",
            "Cela dépend du système retenu. L’agrandissement ou la reconfiguration doit être confirmé dans la documentation du fournisseur et la portée du projet.",
          ],
        ],
      },
    },
  },
  {
    id: "portable",
    kind: "products",
    slugs: { en: "portable-nursing-pods", fr: "cabines-allaitement-mobiles" },
    useCase: {
      en: "Changing layouts or temporary placement",
      fr: "Aménagements évolutifs ou emplacement temporaire",
    },
    considerations: {
      en: [
        "Confirm the actual method and limits of relocation.",
        "Check floor surfaces, doorways and storage arrangements.",
        "Plan setup, cleaning and handover for each use.",
      ],
      fr: [
        "Confirmez la méthode et les limites de déplacement.",
        "Vérifiez les planchers, les portes et l’entreposage.",
        "Prévoyez l’installation, le nettoyage et la remise en service.",
      ],
    },
    related: ["rentals", "installation", "accessible"],
    copy: {
      en: {
        title: "Portable nursing pods",
        summary:
          "Discuss movable privacy-space options for facilities whose layout or use changes over time.",
        sections: [
          {
            title: "Define what portable means for you",
            body: "Moving between rooms, relocating between buildings and transporting to an event are different needs. Describe how often the space will move and who will be responsible.",
          },
          {
            title: "Assess the route, not just the destination",
            body: "Doorways, lifts, loading areas and floor conditions can affect a move. Ask for the selected equipment’s handling instructions and confirm whether specialist support is needed.",
          },
          {
            title: "Keep the operating plan practical",
            body: "Temporary positioning still requires privacy, access, cleaning and a way to manage use. Identify where the unit will be stored when it is not in service.",
          },
        ],
        faq: [
          [
            "Can staff move the unit themselves?",
            "Do not assume this. Handling requirements depend on the selected unit and the site. Confirm safe movement procedures before relocation.",
          ],
        ],
      },
      fr: {
        title: "Cabines d’allaitement mobiles",
        summary:
          "Discutez d’options déplaçables pour les établissements dont l’aménagement ou l’utilisation évolue.",
        sections: [
          {
            title: "Précisez ce que mobile signifie pour vous",
            body: "Passer d’une pièce à une autre, changer de bâtiment et transporter une cabine à un événement sont des besoins différents. Indiquez la fréquence des déplacements et la personne responsable.",
          },
          {
            title: "Évaluez le trajet complet",
            body: "Les portes, ascenseurs, zones de livraison et planchers peuvent influencer le déplacement. Demandez les consignes de manutention du modèle retenu et vérifiez si une équipe spécialisée est nécessaire.",
          },
          {
            title: "Prévoyez l’exploitation",
            body: "Un emplacement temporaire exige aussi de l’intimité, un accès approprié, du nettoyage et une gestion de l’utilisation. Déterminez où entreposer la cabine entre les utilisations.",
          },
        ],
        faq: [
          [
            "Le personnel peut-il déplacer la cabine?",
            "Il ne faut pas le présumer. Les exigences dépendent de la cabine et des lieux. Confirmez les procédures de déplacement avant toute relocalisation.",
          ],
        ],
      },
    },
  },
  {
    id: "accessible",
    kind: "products",
    slugs: {
      en: "accessible-nursing-pods",
      fr: "cabines-allaitement-accessibles",
    },
    useCase: {
      en: "Projects with specific access and manoeuvring requirements",
      fr: "Projets avec des besoins précis d’accès et de manœuvre",
    },
    considerations: {
      en: [
        "Review the complete route and entrance.",
        "Confirm interior turning, seating and transfer needs.",
        "Have applicable requirements assessed for the actual product and site.",
      ],
      fr: [
        "Examinez le trajet complet et l’entrée.",
        "Confirmez les besoins de rotation, d’assise et de transfert.",
        "Faites évaluer les exigences applicables au produit et au site.",
      ],
    },
    related: ["custom", "design", "rooms"],
    copy: {
      en: {
        title: "Accessible nursing pod planning",
        summary:
          "Build accessibility into the project brief from the beginning, including the route to the space and the experience inside it.",
        sections: [
          {
            title: "Look beyond the doorway",
            body: "Consider approach routes, thresholds, opening forces, hardware, controls and manoeuvring space. The surrounding building can affect access even when an enclosure is spacious.",
          },
          {
            title: "Discuss the people using the space",
            body: "Ask about seating preferences, mobility devices, caregivers and reach needs without collecting personal health information. A project can have several access requirements that need to be considered together.",
          },
          {
            title: "Verify the selected proposal",
            body: "Accessibility depends on actual dimensions, features, installation and applicable requirements. Obtain a product-specific assessment from the appropriate qualified reviewers. This category is not a certification or a claim of ADA or CSA compliance.",
          },
        ],
        faq: [
          [
            "Are all pods in this category certified accessible?",
            "No certification is asserted here. Product-specific features and applicable site requirements must be verified before selection.",
          ],
        ],
      },
      fr: {
        title: "Planifier une cabine d’allaitement accessible",
        summary:
          "Intégrez l’accessibilité au brief dès le départ, du trajet vers la cabine à l’expérience à l’intérieur.",
        sections: [
          {
            title: "Au-delà de la porte",
            body: "Pensez aux voies d’accès, aux seuils, à la force d’ouverture, à la quincaillerie, aux commandes et à l’espace de manœuvre. Le bâtiment peut limiter l’accès même si l’enceinte est spacieuse.",
          },
          {
            title: "Considérez les personnes qui l’utiliseront",
            body: "Discutez des sièges, des aides à la mobilité, de l’accompagnement et de la portée des commandes sans recueillir de renseignements personnels sur la santé. Plusieurs besoins peuvent devoir être pris en compte ensemble.",
          },
          {
            title: "Vérifiez la proposition retenue",
            body: "L’accessibilité dépend des dimensions, des caractéristiques, de l’installation et des exigences applicables. Obtenez une évaluation du produit et du site par les personnes qualifiées. Cette catégorie ne constitue pas une certification ni une déclaration de conformité ADA ou CSA.",
          },
        ],
        faq: [
          [
            "Toutes les cabines de cette catégorie sont-elles certifiées accessibles?",
            "Aucune certification n’est déclarée ici. Les caractéristiques du produit et les exigences du site doivent être vérifiées avant la sélection.",
          ],
        ],
      },
    },
  },
  {
    id: "custom",
    kind: "products",
    slugs: { en: "custom-nursing-pods", fr: "cabines-allaitement-sur-mesure" },
    useCase: {
      en: "A project with particular layout or finish priorities",
      fr: "Un projet avec des besoins particuliers de disposition ou de finis",
    },
    considerations: {
      en: [
        "Separate essential requirements from preferences.",
        "Review drawings, materials and samples before approval.",
        "Confirm feasibility, lead time and responsibilities in writing.",
      ],
      fr: [
        "Distinguez les exigences des préférences.",
        "Examinez les plans, matériaux et échantillons avant l’approbation.",
        "Confirmez la faisabilité, les délais et les responsabilités par écrit.",
      ],
    },
    related: ["design", "modular", "furniture"],
    copy: {
      en: {
        title: "Custom nursing pods",
        summary:
          "Bring your project’s layout, material and operational priorities into a tailored discussion about a private nursing space.",
        sections: [
          {
            title: "Make the brief specific",
            body: "Document what must be achieved and what would be nice to have. Include building constraints, desired finishes, privacy needs and intended use. Custom work should begin with a feasibility review.",
          },
          {
            title: "Review before committing",
            body: "Request the relevant drawings, material information and proposed scope. Decide who will approve changes and how those changes affect the schedule and installation requirements.",
          },
          {
            title: "Coordinate the interfaces",
            body: "Furniture, power, lighting, ventilation and enclosure details may involve different responsibilities. A coordinated scope helps avoid gaps between supply and work on site.",
          },
        ],
        faq: [
          [
            "Can you match our branding or finishes?",
            "Share your preferences for assessment. Material matching, branding and custom details depend on feasibility and the confirmed supplier scope.",
          ],
        ],
      },
      fr: {
        title: "Cabines d’allaitement sur mesure",
        summary:
          "Intégrez vos priorités d’aménagement, de matériaux et d’exploitation à une discussion adaptée à votre espace d’allaitement.",
        sections: [
          {
            title: "Précisez le brief",
            body: "Documentez les exigences et les préférences. Incluez les contraintes du bâtiment, les finis souhaités, l’intimité et l’usage prévu. Un projet sur mesure commence par une évaluation de faisabilité.",
          },
          {
            title: "Examinez avant de vous engager",
            body: "Demandez les plans pertinents, l’information sur les matériaux et la portée proposée. Désignez la personne qui approuve les changements et évaluez leurs effets sur l’échéancier et l’installation.",
          },
          {
            title: "Coordonnez les interfaces",
            body: "Le mobilier, l’alimentation, l’éclairage, la ventilation et l’enceinte peuvent relever de différentes équipes. Une portée coordonnée réduit les écarts entre la fourniture et les travaux sur place.",
          },
        ],
        faq: [
          [
            "Peut-on harmoniser les finis avec notre image de marque?",
            "Présentez vos préférences pour évaluation. Les matériaux, le marquage et les détails sur mesure dépendent de la faisabilité et de la portée confirmée avec le fournisseur.",
          ],
        ],
      },
    },
  },
];
