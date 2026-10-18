import type { CatalogueEntry } from "./types";
export const solutions: CatalogueEntry[] = [
  {
    id: "rooms",
    kind: "solutions",
    slugs: {
      en: "workplace-lactation-rooms",
      fr: "salles-allaitement-au-travail",
    },
    useCase: {
      en: "Make a dedicated room work for daily use",
      fr: "Aménager une pièce dédiée pour un usage quotidien",
    },
    considerations: {
      en: [
        "Review room suitability and competing uses.",
        "Define access, cleaning and booking arrangements.",
        "Coordinate furniture, power and environmental comfort.",
      ],
      fr: [
        "Évaluez la pièce et ses autres utilisations.",
        "Précisez l’accès, le nettoyage et les réservations.",
        "Coordonnez le mobilier, l’alimentation et le confort.",
      ],
    },
    related: ["design", "furniture", "accessible"],
    copy: {
      en: {
        title: "Workplace lactation rooms",
        summary:
          "An existing room can be the starting point for a private, comfortable space to nurse or pump during the workday.",
        sections: [
          {
            title: "Choose a room with purpose",
            body: "Review convenience, privacy and how the room is reached during different shifts. A room that is routinely repurposed may be difficult to rely on, so agree on its primary use and access arrangements.",
          },
          {
            title: "Plan the everyday details",
            body: "Discuss seating, a suitable surface, electrical access, lighting, ventilation and cleaning responsibilities. Confirm which items are included in the project and which remain with the facilities team.",
          },
          {
            title: "Make use straightforward",
            body: "A simple occupancy or booking approach can help people understand when the room is available. Keep any booking information minimal and avoid recording health details.",
          },
        ],
        faq: [
          [
            "Does the room need a booking system?",
            "That depends on demand and access arrangements. A simple occupancy approach may be sufficient; assess the needs of the workplace before adding software.",
          ],
        ],
      },
      fr: {
        title: "Salles d’allaitement au travail",
        summary:
          "Une pièce existante peut devenir un espace privé et confortable pour allaiter ou tirer son lait pendant la journée de travail.",
        sections: [
          {
            title: "Choisissez une pièce avec soin",
            body: "Examinez la proximité, l’intimité et l’accès pendant les différents quarts de travail. Une pièce souvent réaffectée peut être difficile à utiliser de façon fiable; convenez de sa fonction principale et des modalités d’accès.",
          },
          {
            title: "Pensez au quotidien",
            body: "Discutez des sièges, d’une surface appropriée, des prises, de l’éclairage, de la ventilation et du nettoyage. Confirmez ce qui fait partie du projet et ce qui relève de l’équipe des installations.",
          },
          {
            title: "Simplifiez l’utilisation",
            body: "Un indicateur d’occupation ou un mode de réservation simple aide à connaître la disponibilité. Limitez les renseignements recueillis et évitez les données sur la santé.",
          },
        ],
        faq: [
          [
            "Faut-il un système de réservation?",
            "Cela dépend de la demande et des modalités d’accès. Un indicateur d’occupation peut suffire; évaluez les besoins avant d’ajouter un logiciel.",
          ],
        ],
      },
    },
  },
  {
    id: "design",
    kind: "solutions",
    slugs: {
      en: "nursing-room-design-fit-out",
      fr: "conception-amenagement-salles-allaitement",
    },
    useCase: {
      en: "Bring layout and fit-out decisions together",
      fr: "Coordonner la disposition et l’aménagement",
    },
    considerations: {
      en: [
        "Document room conditions and user needs.",
        "Agree on design and approval responsibilities.",
        "Separate furniture supply from regulated building work.",
      ],
      fr: [
        "Documentez les lieux et les besoins.",
        "Définissez les responsabilités de conception et d’approbation.",
        "Distinguez le mobilier des travaux réglementés.",
      ],
    },
    related: ["rooms", "custom", "installation"],
    copy: {
      en: {
        title: "Nursing room design & fit-out",
        summary:
          "Turn a broad idea into a coordinated brief covering layout, finishes, furniture and the practical requirements of the space.",
        sections: [
          {
            title: "Begin with a site review",
            body: "Gather room dimensions, existing services, access constraints and the intended use. Identify any building changes that need qualified design or trade input before finalizing a fit-out scope.",
          },
          {
            title: "Balance comfort and maintenance",
            body: "Discuss the feeling of the space alongside cleaning, durability and replacement needs. Evaluate materials and furnishings using verified product information rather than appearance alone.",
          },
          {
            title: "Set approval milestones",
            body: "Agree who signs off on the layout, selections and any work affecting the building. The project scope should make professional reviews, site work and purchasing responsibilities clear.",
          },
        ],
        faq: [
          [
            "Does a fit-out include electrical or mechanical work?",
            "Only if explicitly included in the confirmed scope and carried out by appropriately qualified parties. Do not assume these services are part of a furniture or enclosure proposal.",
          ],
        ],
      },
      fr: {
        title: "Conception et aménagement de salles d’allaitement",
        summary:
          "Transformez une idée en un brief coordonné pour la disposition, les finis, le mobilier et les exigences pratiques.",
        sections: [
          {
            title: "Commencez par l’état des lieux",
            body: "Rassemblez les dimensions, les services existants, les contraintes d’accès et les usages prévus. Repérez les modifications nécessitant une conception ou des travaux spécialisés avant de finaliser la portée.",
          },
          {
            title: "Équilibrez confort et entretien",
            body: "Discutez de l’ambiance, du nettoyage, de la durabilité et du remplacement. Évaluez les matériaux et le mobilier à partir de renseignements vérifiés, pas uniquement de leur apparence.",
          },
          {
            title: "Prévoyez les approbations",
            body: "Déterminez qui approuve la disposition, les sélections et les interventions sur le bâtiment. La portée doit préciser les responsabilités professionnelles, les travaux et les achats.",
          },
        ],
        faq: [
          [
            "L’aménagement comprend-il les travaux électriques ou mécaniques?",
            "Seulement s’ils sont expressément inclus dans la portée confirmée et réalisés par les personnes qualifiées. Ne présumez pas qu’ils accompagnent le mobilier ou l’enceinte.",
          ],
        ],
      },
    },
  },
  {
    id: "installation",
    kind: "solutions",
    slugs: { en: "installation-coordination", fr: "coordination-installation" },
    useCase: {
      en: "Coordinate delivery, site readiness and installation",
      fr: "Coordonner la livraison, les lieux et l’installation",
    },
    considerations: {
      en: [
        "Confirm loading and building access.",
        "Identify trades and site responsibilities.",
        "Plan inspection, handover and maintenance information.",
      ],
      fr: [
        "Confirmez la livraison et l’accès au bâtiment.",
        "Identifiez les métiers et responsabilités sur place.",
        "Prévoyez l’inspection, la remise et les consignes d’entretien.",
      ],
    },
    related: ["freestanding", "modular", "design"],
    copy: {
      en: {
        title: "Installation coordination",
        summary:
          "Bring delivery and on-site requirements into the conversation early, before a product or room layout is finalized.",
        sections: [
          {
            title: "Map the delivery route",
            body: "Discuss loading arrangements, lift access, doorways and permitted working hours with the building team. Share restrictions early so the proposed delivery method can be checked.",
          },
          {
            title: "Assign the on-site work",
            body: "Confirm who handles assembly, any electrical or mechanical work, protection of existing finishes and waste removal. Installation availability and trade requirements vary by location and project.",
          },
          {
            title: "Prepare the handover",
            body: "Agree on inspection, operating instructions, cleaning information and who receives any product documentation. Resolve outstanding items before treating the space as ready for use.",
          },
        ],
        faq: [
          [
            "Is installation available everywhere in Canada?",
            "No blanket availability is guaranteed. The proposed location, equipment, required trades and logistics must be reviewed for each project.",
          ],
        ],
      },
      fr: {
        title: "Coordination de l’installation",
        summary:
          "Abordez tôt les exigences de livraison et de chantier, avant de finaliser un produit ou l’aménagement d’une pièce.",
        sections: [
          {
            title: "Tracez le parcours de livraison",
            body: "Discutez des zones de chargement, ascenseurs, portes et heures de travail autorisées avec l’équipe du bâtiment. Communiquez les restrictions pour vérifier la méthode proposée.",
          },
          {
            title: "Répartissez le travail sur place",
            body: "Confirmez qui s’occupe de l’assemblage, des travaux électriques ou mécaniques, de la protection des finis et des déchets. Les services et métiers requis varient selon le projet et la région.",
          },
          {
            title: "Préparez la remise",
            body: "Convenez de l’inspection, des consignes d’utilisation, de l’entretien et du destinataire de la documentation. Réglez les éléments en suspens avant de mettre l’espace en service.",
          },
        ],
        faq: [
          [
            "L’installation est-elle offerte partout au Canada?",
            "Aucune disponibilité générale n’est garantie. L’emplacement, l’équipement, les métiers requis et la logistique doivent être évalués pour chaque projet.",
          ],
        ],
      },
    },
  },
  {
    id: "rentals",
    kind: "solutions",
    slugs: { en: "nursing-pod-rentals", fr: "location-cabines-allaitement" },
    useCase: {
      en: "Temporary needs with a defined period",
      fr: "Besoins temporaires pour une période définie",
    },
    considerations: {
      en: [
        "Provide dates and the full event or occupancy schedule.",
        "Confirm availability and location-specific logistics.",
        "Define setup, cleaning, collection and damage responsibilities.",
      ],
      fr: [
        "Précisez les dates et l’horaire complet.",
        "Confirmez la disponibilité et la logistique régionale.",
        "Définissez l’installation, le nettoyage, la reprise et les responsabilités.",
      ],
    },
    related: ["portable", "installation", "furniture"],
    copy: {
      en: {
        title: "Nursing pod rental inquiries",
        summary:
          "Discuss a temporary nursing space for an event, seasonal need or period of building work. Rental options are subject to availability and location.",
        sections: [
          {
            title: "Start with the dates",
            body: "Provide the dates for delivery, setup, use and collection, not just the public event dates. Include venue restrictions and the period during which the space must be accessible.",
          },
          {
            title: "Clarify what is included",
            body: "Ask whether transport, installation, furniture, cleaning and collection are part of the proposed arrangement. No rental inventory or booking availability is implied by this page.",
          },
          {
            title: "Prepare an operating contact",
            body: "Name a venue contact responsible for access, upkeep and issue reporting during the rental. Agree on return condition and responsibilities in the actual rental terms.",
          },
        ],
        faq: [
          [
            "Can I reserve a unit online?",
            "No online bookings or payments are taken here. Availability and terms must be confirmed in a project-specific proposal.",
          ],
        ],
      },
      fr: {
        title: "Demandes de location de cabines d’allaitement",
        summary:
          "Discutez d’un espace temporaire pour un événement, un besoin saisonnier ou des travaux. Les options dépendent de la disponibilité et de l’emplacement.",
        sections: [
          {
            title: "Commencez par les dates",
            body: "Indiquez les dates de livraison, d’installation, d’utilisation et de reprise, pas seulement celles de l’événement. Précisez les restrictions du lieu et les heures d’accès requises.",
          },
          {
            title: "Précisez ce qui est compris",
            body: "Vérifiez si le transport, l’installation, le mobilier, le nettoyage et la reprise font partie de la proposition. Cette page ne confirme aucun inventaire ni aucune disponibilité.",
          },
          {
            title: "Désignez une personne sur place",
            body: "Prévoyez un contact responsable de l’accès, de l’entretien et du signalement des problèmes. Les conditions de retour et les responsabilités doivent figurer dans l’entente de location.",
          },
        ],
        faq: [
          [
            "Peut-on réserver une cabine en ligne?",
            "Aucune réservation ni aucun paiement en ligne n’est accepté ici. La disponibilité et les conditions doivent être confirmées dans une proposition adaptée au projet.",
          ],
        ],
      },
    },
  },
  {
    id: "furniture",
    kind: "solutions",
    slugs: { en: "furniture-accessories", fr: "mobilier-accessoires" },
    useCase: {
      en: "Complete a room or enclosure with practical furnishings",
      fr: "Compléter une pièce ou une cabine avec du mobilier pratique",
    },
    considerations: {
      en: [
        "Review seating and usable surfaces.",
        "Check fit, cleaning guidance and power access.",
        "Confirm individual product information before selection.",
      ],
      fr: [
        "Évaluez les sièges et les surfaces utiles.",
        "Vérifiez l’encombrement, le nettoyage et les prises.",
        "Confirmez les renseignements de chaque produit avant de choisir.",
      ],
    },
    related: ["rooms", "design", "accessible"],
    copy: {
      en: {
        title: "Nursing room furniture & accessories",
        summary:
          "Consider the everyday details that make a private nursing space easier to use, maintain and manage.",
        sections: [
          {
            title: "Select for the intended use",
            body: "Discuss supportive seating, a practical surface and the placement of personal belongings. Avoid choosing furnishings solely by appearance; review usable space and maintenance information.",
          },
          {
            title: "Coordinate with the room",
            body: "The arrangement should preserve the access and manoeuvring areas identified in the project. Check how lighting, outlets and any proposed accessories relate to the furniture layout.",
          },
          {
            title: "Verify before ordering",
            body: "Confirm dimensions, materials, cleaning guidance and any product-specific limitations in the supplier information. This page is a planning category, not a catalogue of verified items.",
          },
        ],
        faq: [
          [
            "Are all accessories included with a pod?",
            "Inclusions vary by proposal. Review the itemized scope so furniture and accessories are not assumed to be included.",
          ],
        ],
      },
      fr: {
        title: "Mobilier et accessoires pour salles d’allaitement",
        summary:
          "Pensez aux détails qui facilitent l’utilisation, l’entretien et la gestion d’un espace d’allaitement privé.",
        sections: [
          {
            title: "Choisissez selon l’usage",
            body: "Discutez de sièges confortables, d’une surface pratique et d’un endroit pour les effets personnels. Ne choisissez pas uniquement selon l’apparence; examinez l’espace utile et l’entretien.",
          },
          {
            title: "Coordonnez avec la pièce",
            body: "La disposition doit préserver les zones d’accès et de manœuvre prévues. Vérifiez la relation entre le mobilier, l’éclairage, les prises et les accessoires proposés.",
          },
          {
            title: "Vérifiez avant de commander",
            body: "Confirmez les dimensions, matériaux, consignes de nettoyage et limites dans la documentation du fournisseur. Cette page est une catégorie de planification, pas un catalogue d’articles vérifiés.",
          },
        ],
        faq: [
          [
            "Les accessoires sont-ils tous compris avec une cabine?",
            "Les inclusions varient selon la proposition. Consultez la portée détaillée pour éviter de présumer que le mobilier et les accessoires sont inclus.",
          ],
        ],
      },
    },
  },
];
