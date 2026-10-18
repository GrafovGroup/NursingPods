import type { Localized } from "./catalogue/types";
export type Industry = {
  id: string;
  slugs: Localized<string>;
  title: Localized<string>;
  summary: Localized<string>;
  needs: Localized<[string, string, string]>;
  questions: Localized<string[]>;
  related: string[];
};
export const industries: Industry[] = [
  {
    id: "airports",
    slugs: { en: "airports", fr: "aeroports" },
    title: {
      en: "Nursing spaces for airports",
      fr: "Espaces d’allaitement dans les aéroports",
    },
    summary: {
      en: "Plan privacy around passenger journeys, terminal access and facilities operations.",
      fr: "Planifiez l’intimité selon les parcours des passagers, l’accès aux aérogares et l’exploitation.",
    },
    needs: {
      en: [
        "Identify whether the space serves passengers before security, after security or airport employees. These are separate access and operating scenarios; document the intended users before selecting a location.",
        "Review routes for travellers with strollers, carry-on bags or mobility devices. Discuss wayfinding, occupancy information and the ability to find the space without assistance from a staff member.",
        "Coordinate delivery permissions, working windows and cleaning with the terminal operator. Confirm who responds to access issues and how the space is returned to service after cleaning.",
      ],
      fr: [
        "Déterminez si l’espace sert les passagers avant ou après le contrôle de sûreté, ou le personnel. Ces situations ont des modalités d’accès différentes; précisez les usagers avant de choisir l’emplacement.",
        "Examinez les parcours avec poussettes, bagages ou aides à la mobilité. Discutez de la signalisation, de l’occupation et de la possibilité de repérer l’espace sans aide du personnel.",
        "Coordonnez les autorisations de livraison, les heures de travail et le nettoyage avec l’exploitant. Confirmez qui gère les problèmes d’accès et la remise en service après l’entretien.",
      ],
    },
    questions: {
      en: [
        "Which side of security?",
        "Passenger use, employee use or both?",
        "Who controls access and cleaning?",
      ],
      fr: [
        "De quel côté du contrôle de sûreté?",
        "Pour les passagers, le personnel ou les deux?",
        "Qui gère l’accès et le nettoyage?",
      ],
    },
    related: ["freestanding", "accessible", "installation"],
  },
  {
    id: "universities",
    slugs: { en: "universities", fr: "universites" },
    title: {
      en: "Nursing spaces for universities",
      fr: "Espaces d’allaitement dans les universités",
    },
    summary: {
      en: "Consider students, staff and visitors across teaching buildings and campus schedules.",
      fr: "Pensez aux étudiants, au personnel et aux visiteurs selon les pavillons et les horaires.",
    },
    needs: {
      en: [
        "Map who needs access and where they spend their day. A room in one faculty building may be difficult to reach between classes elsewhere; compare distributed rooms with a central facility.",
        "Discuss access outside standard office hours, student and employee eligibility, and how visitors find the space. Keep any access process clear without requesting personal health details.",
        "Coordinate semester breaks, building work and furniture procurement. Assign room ownership so cleaning and access do not fall between academic and facilities teams.",
      ],
      fr: [
        "Repérez les usagers et leurs déplacements quotidiens. Une salle dans un pavillon peut être difficile à atteindre entre des cours ailleurs; comparez des espaces répartis à un local central.",
        "Discutez de l’accès hors des heures de bureau, de l’admissibilité des étudiants et employés et de l’orientation des visiteurs. Gardez le processus clair sans demander de données sur la santé.",
        "Coordonnez les pauses du calendrier scolaire, les travaux et l’achat du mobilier. Désignez une équipe responsable pour que l’entretien et l’accès ne soient pas oubliés.",
      ],
    },
    questions: {
      en: [
        "Single building or several campuses?",
        "Evening or weekend access?",
        "Who maintains room information?",
      ],
      fr: [
        "Un pavillon ou plusieurs campus?",
        "Accès le soir ou la fin de semaine?",
        "Qui tient l’information à jour?",
      ],
    },
    related: ["rooms", "modular", "furniture"],
  },
  {
    id: "hospitals",
    slugs: { en: "hospitals", fr: "hopitaux" },
    title: {
      en: "Nursing spaces for hospitals",
      fr: "Espaces d’allaitement dans les hôpitaux",
    },
    summary: {
      en: "Separate staff and visitor requirements and involve the hospital’s facilities and infection-prevention teams.",
      fr: "Distinguez les besoins du personnel et des visiteurs avec les équipes des installations et de prévention des infections.",
    },
    needs: {
      en: [
        "Define whether the project supports staff during shifts, visitors or a particular department. This is space planning, not a clinical service or a substitute for patient-care facilities.",
        "Have proposed finishes and cleaning methods reviewed by the hospital team. No infection-control rating, clinical suitability or product certification should be assumed from this category page.",
        "Plan installation around sensitive departments, permitted work windows and site procedures. Confirm responsibilities for commissioning, ongoing cleaning and keeping access instructions current.",
      ],
      fr: [
        "Précisez si le projet vise le personnel pendant ses quarts, les visiteurs ou un service particulier. Il s’agit d’aménagement, non d’un service clinique ni d’un remplacement des installations de soins.",
        "Faites examiner les finis et les méthodes de nettoyage par l’équipe hospitalière. Aucune cote de prévention des infections, aptitude clinique ou certification ne doit être présumée à partir de cette page.",
        "Planifiez l’installation selon les services sensibles, les heures autorisées et les procédures du site. Confirmez la mise en service, le nettoyage et la mise à jour des consignes d’accès.",
      ],
    },
    questions: {
      en: [
        "Staff or visitor space?",
        "Which internal reviewers must approve materials?",
        "What are the work-area restrictions?",
      ],
      fr: [
        "Pour le personnel ou les visiteurs?",
        "Qui doit approuver les matériaux?",
        "Quelles restrictions encadrent les travaux?",
      ],
    },
    related: ["rooms", "design", "accessible"],
  },
  {
    id: "offices",
    slugs: { en: "corporate-offices", fr: "bureaux-entreprise" },
    title: {
      en: "Nursing spaces for corporate offices",
      fr: "Espaces d’allaitement dans les bureaux",
    },
    summary: {
      en: "Make private nursing space part of a practical workplace plan, from one floor to multiple offices.",
      fr: "Intégrez l’allaitement privé à un aménagement de travail pratique, sur un étage ou dans plusieurs bureaux.",
    },
    needs: {
      en: [
        "Review whether an existing room can serve the need reliably or whether a dedicated enclosure is more appropriate. Consider hybrid schedules, visitor access and how the space is shared without being routinely displaced.",
        "Bring facilities and workplace teams into the same brief. Agree on room access, cleaning, furniture, power and the handling of requests without collecting unnecessary personal information.",
        "For several offices, define common planning principles while assessing each building separately. A layout that fits one floor may not work with another building’s access or services.",
      ],
      fr: [
        "Évaluez si une pièce existante peut répondre au besoin de façon fiable ou si une enceinte dédiée convient mieux. Tenez compte des horaires hybrides, des visiteurs et du partage de l’espace.",
        "Réunissez les équipes des installations et du milieu de travail autour du même brief. Convenez de l’accès, du nettoyage, du mobilier, de l’alimentation et du traitement des demandes en limitant les renseignements personnels.",
        "Pour plusieurs bureaux, établissez des principes communs tout en évaluant chaque bâtiment. Une disposition adaptée à un étage peut ne pas convenir à l’accès ou aux services d’un autre.",
      ],
    },
    questions: {
      en: [
        "Existing room or new enclosure?",
        "How will access be communicated?",
        "Does the project cover several offices?",
      ],
      fr: [
        "Pièce existante ou nouvelle enceinte?",
        "Comment communiquer les modalités d’accès?",
        "Le projet couvre-t-il plusieurs bureaux?",
      ],
    },
    related: ["freestanding", "rooms", "custom"],
  },
  {
    id: "malls",
    slugs: { en: "shopping-centres", fr: "centres-commerciaux" },
    title: {
      en: "Nursing spaces for shopping centres",
      fr: "Espaces d’allaitement dans les centres commerciaux",
    },
    summary: {
      en: "Plan a welcoming family amenity alongside customer circulation and centre operations.",
      fr: "Planifiez un espace accueillant en tenant compte de la circulation et de l’exploitation du centre.",
    },
    needs: {
      en: [
        "Compare potential locations with customer-service and facilities staff. Consider stroller routes, proximity to useful amenities and whether people can find the space without entering a tenant’s premises.",
        "Define how visitors know the space is occupied and how assistance is requested. Discuss cleaning frequency and inspection responsibilities as part of the operating plan, not as an afterthought.",
        "Coordinate delivery through centre loading areas and permitted work hours. If the space is in a common area, confirm landlord approvals and how changes affect circulation.",
      ],
      fr: [
        "Comparez les emplacements avec le service à la clientèle et les installations. Pensez aux poussettes, aux commodités utiles et au repérage sans devoir entrer chez un locataire.",
        "Définissez comment les visiteurs connaissent l’occupation et demandent de l’aide. Intégrez la fréquence de nettoyage et les inspections au plan d’exploitation dès le début.",
        "Coordonnez la livraison par les accès du centre et les heures de travail autorisées. Dans une aire commune, confirmez les approbations du propriétaire et les effets sur la circulation.",
      ],
    },
    questions: {
      en: [
        "Common-area or tenant-managed space?",
        "How will visitors locate it?",
        "Who checks it during opening hours?",
      ],
      fr: [
        "Aire commune ou espace géré par un locataire?",
        "Comment les visiteurs le trouveront-ils?",
        "Qui le vérifie pendant les heures d’ouverture?",
      ],
    },
    related: ["freestanding", "accessible", "furniture"],
  },
  {
    id: "government",
    slugs: { en: "government-buildings", fr: "edifices-gouvernementaux" },
    title: {
      en: "Nursing spaces for government buildings",
      fr: "Espaces d’allaitement dans les édifices gouvernementaux",
    },
    summary: {
      en: "Prepare a clear project scope for staff facilities, public access and procurement review.",
      fr: "Préparez une portée claire pour les installations du personnel, l’accès public et l’approvisionnement.",
    },
    needs: {
      en: [
        "Separate public-facing and employee-only requirements. Security, access hours and visitor assistance may differ, even where the same building contains both uses.",
        "Document the procurement and approval process before seeking a proposal. Identify required submissions and internal reviewers without assuming any certification or purchasing qualification.",
        "Confirm how room signage, access instructions and maintenance information will be managed. If several buildings are involved, record each site’s delivery and installation constraints separately.",
      ],
      fr: [
        "Distinguez les besoins du public et du personnel. La sécurité, les heures d’accès et l’aide aux visiteurs peuvent différer dans un même bâtiment.",
        "Documentez l’approvisionnement et les approbations avant de demander une proposition. Identifiez les pièces à fournir et les personnes responsables, sans présumer de certification ni d’admissibilité aux achats.",
        "Confirmez la gestion de la signalisation, des consignes d’accès et de l’entretien. Pour plusieurs bâtiments, consignez séparément les contraintes de livraison et d’installation.",
      ],
    },
    questions: {
      en: [
        "Public or restricted access?",
        "What procurement documents are required?",
        "Which site approvals apply?",
      ],
      fr: [
        "Accès public ou restreint?",
        "Quels documents d’approvisionnement sont requis?",
        "Quelles approbations s’appliquent au site?",
      ],
    },
    related: ["modular", "accessible", "design"],
  },
  {
    id: "events",
    slugs: { en: "event-venues", fr: "lieux-evenements" },
    title: {
      en: "Nursing spaces for event venues",
      fr: "Espaces d’allaitement pour les événements",
    },
    summary: {
      en: "Consider changing audiences, temporary layouts and the full setup-to-collection schedule.",
      fr: "Tenez compte des publics changeants, des aménagements temporaires et de l’horaire complet.",
    },
    needs: {
      en: [
        "Describe whether the need is permanent within the venue or temporary for a specific event. Record expected opening hours and the spaces attendees can reach without an additional access credential.",
        "Coordinate placement with the event floor plan, crowd routes and operational teams. Temporary arrangements still need privacy, clear access and someone responsible for upkeep.",
        "Include move-in, setup, dismantling and collection dates in the brief. Rental availability, transport and installation must be confirmed for the location and event window.",
      ],
      fr: [
        "Précisez si le besoin est permanent dans le lieu ou temporaire pour un événement. Indiquez les heures d’ouverture et les zones accessibles sans autorisation supplémentaire.",
        "Coordonnez l’emplacement avec le plan de l’événement, les parcours du public et les équipes. Une installation temporaire exige aussi de l’intimité, un accès clair et un responsable de l’entretien.",
        "Incluez l’arrivée, l’installation, le démontage et la reprise dans le brief. La location, le transport et l’installation doivent être confirmés selon le lieu et les dates.",
      ],
    },
    questions: {
      en: [
        "Permanent room or temporary option?",
        "What are setup and collection dates?",
        "Who is the on-site contact?",
      ],
      fr: [
        "Salle permanente ou option temporaire?",
        "Quelles sont les dates d’installation et de reprise?",
        "Qui est le contact sur place?",
      ],
    },
    related: ["portable", "rentals", "installation"],
  },
  {
    id: "industrial",
    slugs: { en: "industrial-facilities", fr: "installations-industrielles" },
    title: {
      en: "Nursing spaces for industrial workplaces",
      fr: "Espaces d’allaitement en milieu industriel",
    },
    summary: {
      en: "Plan a private space with attention to shifts, access routes and separation from production activities.",
      fr: "Planifiez un espace privé selon les quarts de travail, les accès et la séparation des activités de production.",
    },
    needs: {
      en: [
        "Review possible locations with site facilities and safety teams. A production setting may have site-specific noise, environmental or access restrictions; do not assume a standard enclosure addresses them.",
        "Consider shift changes and how employees reach the space from different work areas. Discuss access arrangements that remain usable when administrative offices are closed.",
        "Confirm delivery rules, contractor induction and any permits needed for site work. Assign cleaning, maintenance and inspection responsibilities to the appropriate operational team.",
      ],
      fr: [
        "Évaluez les emplacements avec les équipes des installations et de sécurité. Le site peut avoir des contraintes de bruit, d’environnement ou d’accès; une enceinte standard ne les règle pas nécessairement.",
        "Pensez aux changements de quart et aux parcours depuis les différentes zones. Prévoyez un accès utilisable même lorsque les bureaux administratifs sont fermés.",
        "Confirmez les règles de livraison, l’accueil des entrepreneurs et les permis de travail requis. Attribuez le nettoyage, l’entretien et les inspections à l’équipe appropriée.",
      ],
    },
    questions: {
      en: [
        "Which shifts need access?",
        "Is the proposed area suitable for this use?",
        "What contractor procedures apply?",
      ],
      fr: [
        "Quels quarts ont besoin d’un accès?",
        "La zone proposée convient-elle à cet usage?",
        "Quelles procédures encadrent les entrepreneurs?",
      ],
    },
    related: ["rooms", "custom", "installation"],
  },
  {
    id: "hospitality",
    slugs: { en: "hotels-hospitality", fr: "hotels-accueil" },
    title: {
      en: "Nursing spaces for hotels & hospitality",
      fr: "Espaces d’allaitement dans les hôtels",
    },
    summary: {
      en: "Consider guests, conference attendees and staff as separate groups with different access needs.",
      fr: "Considérez les clients, les participants aux congrès et le personnel selon leurs besoins d’accès.",
    },
    needs: {
      en: [
        "Clarify whether the space serves hotel guests, event attendees or employees. A guestroom arrangement, public amenity and staff facility each require a different access and operating plan.",
        "Coordinate the design with housekeeping and facilities so finishes, furnishings and inspection responsibilities are practical. Discuss how assistance is requested without compromising privacy.",
        "For conference use, align placement and opening hours with event routes and schedules. If temporary options are considered, confirm delivery and collection outside guest circulation where required.",
      ],
      fr: [
        "Précisez si l’espace sert les clients de l’hôtel, les participants ou le personnel. Une chambre, une commodité publique et une installation pour employés demandent des modalités différentes.",
        "Coordonnez la conception avec l’entretien ménager et les installations pour des finis, du mobilier et des inspections pratiques. Discutez de l’aide disponible sans compromettre l’intimité.",
        "Pour les congrès, adaptez l’emplacement et les heures aux parcours et horaires. Pour une option temporaire, confirmez la livraison et la reprise en tenant compte des déplacements des clients.",
      ],
    },
    questions: {
      en: [
        "Guests, attendees or employees?",
        "Who handles access requests?",
        "Is the need permanent or event-specific?",
      ],
      fr: [
        "Clients, participants ou employés?",
        "Qui répond aux demandes d’accès?",
        "Besoin permanent ou lié à un événement?",
      ],
    },
    related: ["rooms", "furniture", "rentals"],
  },
  {
    id: "transit",
    slugs: { en: "transit-facilities", fr: "installations-transport" },
    title: {
      en: "Nursing spaces for transit facilities",
      fr: "Espaces d’allaitement dans les installations de transport",
    },
    summary: {
      en: "Explore privacy within station operations, passenger circulation and staff facilities.",
      fr: "Explorez l’intimité selon l’exploitation des stations, la circulation et les installations du personnel.",
    },
    needs: {
      en: [
        "Identify whether the proposed space is in a public concourse, a controlled-access area or an employee facility. Confirm operating hours and how users find assistance.",
        "Review circulation with the operator, including stroller and mobility-device routes. A location must be assessed against the station’s access and egress requirements before a pod is selected.",
        "Discuss delivery access, working hours and cleaning arrangements. Document how the space can be inspected and maintained without making access unpredictable for users.",
      ],
      fr: [
        "Déterminez si l’espace est dans un hall public, une zone contrôlée ou une installation pour employés. Confirmez les heures et la façon de demander de l’aide.",
        "Examinez la circulation avec l’exploitant, notamment avec poussettes et aides à la mobilité. Évaluez les exigences d’accès et d’évacuation avant de choisir une cabine.",
        "Discutez de la livraison, des heures de travaux et du nettoyage. Documentez l’inspection et l’entretien pour maintenir un accès prévisible.",
      ],
    },
    questions: {
      en: [
        "Which station area?",
        "What hours must it serve?",
        "Who is the operating contact?",
      ],
      fr: [
        "Dans quelle zone de la station?",
        "Quelles heures doit-il couvrir?",
        "Qui est le responsable de l’exploitation?",
      ],
    },
    related: ["freestanding", "accessible", "installation"],
  },
];
