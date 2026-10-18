import type { Localized, ContentSection } from "./catalogue/types";
export type LocationEntry = {
  id: string;
  parentId: string;
  slugs: Localized<string>;
  name: Localized<string>;
  kind: "province" | "metro";
  municipalities: string[];
  sections: Localized<ContentSection[]>;
  editorialReady: boolean;
};
type ProvinceBrief = {
  code: string;
  slug: Localized<string>;
  name: Localized<string>;
  places: string[];
  focus: Localized<string>;
  questions: Localized<string[]>;
};
const briefs: ProvinceBrief[] = [
  {
    code: "ON",
    slug: { en: "ontario", fr: "ontario" },
    name: { en: "Ontario", fr: "Ontario" },
    places: [
      "Toronto",
      "Mississauga",
      "Brampton",
      "Vaughan",
      "Markham",
      "Richmond Hill",
      "Oakville",
      "Burlington",
      "Ottawa",
      "Hamilton",
      "London",
      "Kitchener",
      "Waterloo",
    ],
    focus: {
      en: "For an Ontario project spanning several municipalities, separate the needs of each building before seeking a common proposal. A downtown office, a campus building and an industrial site may have different routes, access hours and approval contacts. Record the actual municipality and building for each proposed space rather than using a broad regional address. If a shared purchasing team is coordinating the work, identify which decisions are common and which must be confirmed locally.",
      fr: "Pour un projet ontarien réparti dans plusieurs municipalités, distinguez les besoins de chaque bâtiment avant de demander une proposition commune. Un bureau au centre-ville, un pavillon et un site industriel peuvent avoir des accès, des horaires et des responsables différents. Indiquez la municipalité et le bâtiment précis plutôt qu’une adresse régionale générale. Si une équipe d’approvisionnement coordonne le projet, séparez les décisions communes des confirmations propres à chaque site.",
    },
    questions: {
      en: [
        "Which municipality and building is each space in?",
        "Are approvals centralized or site-specific?",
        "Do deliveries need separate booking windows?",
      ],
      fr: [
        "Dans quelle municipalité et quel bâtiment se trouve chaque espace?",
        "Les approbations sont-elles centralisées ou locales?",
        "Faut-il des plages de livraison distinctes?",
      ],
    },
  },
  {
    code: "QC",
    slug: { en: "quebec", fr: "quebec" },
    name: { en: "Québec", fr: "Québec" },
    places: [
      "Montréal",
      "Laval",
      "Longueuil",
      "Québec",
      "Gatineau",
      "Sherbrooke",
      "Trois-Rivières",
    ],
    focus: {
      en: "For a Québec project, establish the language required for the brief, proposal, room instructions and handover documents. If sites include Montréal, Laval or Longueuil, list each municipality and building contact separately so delivery and access arrangements are not conflated. A project in Québec City or another market should have its own site review even when furnishings are selected centrally. Confirm the selected product information and the responsibilities for any building work with the appropriate project reviewers.",
      fr: "Pour un projet au Québec, précisez la langue du brief, de la proposition, des consignes et des documents de remise. Si les sites comprennent Montréal, Laval ou Longueuil, indiquez chaque municipalité et son contact afin de distinguer la livraison et l’accès. Un projet à Québec ou ailleurs doit faire l’objet de sa propre évaluation, même si le mobilier est choisi de façon centralisée. Confirmez les renseignements sur le produit et les responsabilités des travaux avec les personnes compétentes.",
    },
    questions: {
      en: [
        "Which documents are needed in French?",
        "Are Montréal, Laval and Longueuil separate project sites?",
        "Who reviews building modifications?",
      ],
      fr: [
        "Quels documents doivent être en français?",
        "Montréal, Laval et Longueuil sont-ils des sites distincts?",
        "Qui examine les modifications au bâtiment?",
      ],
    },
  },
  {
    code: "BC",
    slug: { en: "british-columbia", fr: "colombie-britannique" },
    name: { en: "British Columbia", fr: "Colombie-Britannique" },
    places: [
      "Vancouver",
      "Burnaby",
      "Surrey",
      "Richmond",
      "Victoria",
      "Kelowna",
      "Nanaimo",
    ],
    focus: {
      en: "For British Columbia, include the complete delivery destination rather than assuming a Metro Vancouver routing applies to every site. If the project involves an island, an interior community or several separate buildings, ask for the transport and handover scope for each location. The same product category can involve different handling arrangements depending on the actual access route. Document whether the receiving team can store equipment and whether installation must be coordinated with a particular building work window.",
      fr: "En Colombie-Britannique, fournissez la destination complète sans présumer qu’un trajet dans le Grand Vancouver convient à tous les sites. Pour une île, une communauté intérieure ou plusieurs bâtiments, demandez une portée de transport et de remise propre à chaque lieu. Une même catégorie de produit peut exiger une manutention différente selon l’accès réel. Précisez si l’équipe peut entreposer l’équipement et si l’installation doit respecter une période de travaux particulière.",
    },
    questions: {
      en: [
        "Is the destination on the mainland, an island or inland?",
        "Who receives and stores equipment?",
        "Is each location’s transport scope confirmed?",
      ],
      fr: [
        "La destination est-elle sur le continent, une île ou à l’intérieur?",
        "Qui reçoit et entrepose l’équipement?",
        "Le transport de chaque site est-il confirmé?",
      ],
    },
  },
  {
    code: "AB",
    slug: { en: "alberta", fr: "alberta" },
    name: { en: "Alberta", fr: "Alberta" },
    places: ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "Fort McMurray"],
    focus: {
      en: "For an Alberta brief, distinguish a city office from a campus, industrial facility or remote work location. The purchasing contact may be different from the person who can authorize access to the proposed room. If Calgary and Edmonton are part of one program, provide separate delivery and site-readiness details rather than treating the project as a single stop. Describe shift access and any contractor procedures early so they can be considered alongside the enclosure or room design.",
      fr: "Pour un projet en Alberta, distinguez un bureau urbain, un campus, une installation industrielle et un lieu de travail éloigné. Le contact aux achats peut différer de la personne qui autorise l’accès à la pièce. Si Calgary et Edmonton font partie du même programme, précisez séparément la livraison et la préparation des sites. Décrivez tôt l’accès par quart et les procédures des entrepreneurs afin de les intégrer au choix de la cabine ou à l’aménagement.",
    },
    questions: {
      en: [
        "Office, campus or controlled industrial site?",
        "Which shifts need access?",
        "Are Calgary and Edmonton separate delivery scopes?",
      ],
      fr: [
        "Bureau, campus ou site industriel contrôlé?",
        "Quels quarts ont besoin d’accès?",
        "Calgary et Edmonton nécessitent-ils des livraisons distinctes?",
      ],
    },
  },
  {
    code: "MB",
    slug: { en: "manitoba", fr: "manitoba" },
    name: { en: "Manitoba", fr: "Manitoba" },
    places: ["Winnipeg", "Brandon", "Thompson"],
    focus: {
      en: "For Manitoba, separate the proposed room’s requirements from the logistics of reaching the building. A Winnipeg facility and a project in another community may need different receiving contacts and transport arrangements. If the project is part of a multi-site workplace program, record how each space will be operated when administrative staff are not present. Include storage, assembly access and maintenance responsibilities in the brief so the proposal addresses the full lifecycle of the space.",
      fr: "Au Manitoba, distinguez les besoins de la pièce de la logistique pour atteindre le bâtiment. Un établissement de Winnipeg et un projet dans une autre communauté peuvent nécessiter des contacts et des transports différents. Pour un programme multisite, indiquez comment les espaces seront gérés en l’absence du personnel administratif. Incluez l’entreposage, l’accès pour l’assemblage et l’entretien afin que la proposition couvre toute l’utilisation de l’espace.",
    },
    questions: {
      en: [
        "Who receives deliveries at each site?",
        "Is storage available before setup?",
        "Who manages access outside office hours?",
      ],
      fr: [
        "Qui reçoit les livraisons à chaque site?",
        "Un entreposage est-il disponible avant l’installation?",
        "Qui gère l’accès hors des heures de bureau?",
      ],
    },
  },
  {
    code: "SK",
    slug: { en: "saskatchewan", fr: "saskatchewan" },
    name: { en: "Saskatchewan", fr: "Saskatchewan" },
    places: ["Saskatoon", "Regina", "Prince Albert"],
    focus: {
      en: "For Saskatchewan projects, describe whether the space is for one building or a program across several communities. A shared product preference does not remove the need to check the route, services and operating team at each location. If a site has restricted contractor access or shift-based use, include those details before a layout is selected. Ask for delivery, assembly and any locally arranged work to be separated in the proposal so responsibilities remain clear.",
      fr: "Pour les projets en Saskatchewan, précisez s’il s’agit d’un bâtiment ou d’un programme dans plusieurs communautés. Une préférence commune de produit ne remplace pas la vérification de l’accès, des services et de l’équipe de chaque lieu. Si l’accès des entrepreneurs est contrôlé ou si l’utilisation suit les quarts, indiquez-le avant de choisir la disposition. Demandez de distinguer la livraison, l’assemblage et les travaux locaux dans la proposition.",
    },
    questions: {
      en: [
        "One building or several communities?",
        "Are contractor access procedures required?",
        "Which work must be arranged locally?",
      ],
      fr: [
        "Un bâtiment ou plusieurs communautés?",
        "Des procédures d’accès sont-elles requises?",
        "Quels travaux doivent être organisés localement?",
      ],
    },
  },
  {
    code: "NS",
    slug: { en: "nova-scotia", fr: "nouvelle-ecosse" },
    name: { en: "Nova Scotia", fr: "Nouvelle-Écosse" },
    places: ["Halifax", "Dartmouth", "Sydney", "Truro"],
    focus: {
      en: "For Nova Scotia, identify the actual building and receiving location, especially where the project spans several facilities. A Halifax or Dartmouth brief can include office, campus, visitor or event uses, each with different opening and cleaning arrangements. For projects elsewhere in the province, request a location-specific logistics review rather than assuming the same delivery scope. If the room must serve both staff and visitors, document how access and assistance will work for each group.",
      fr: "En Nouvelle-Écosse, identifiez le bâtiment et le lieu de réception, surtout pour un projet réparti entre plusieurs établissements. À Halifax ou Dartmouth, un brief peut viser des bureaux, un campus, des visiteurs ou des événements, avec des horaires et un entretien différents. Ailleurs dans la province, demandez une évaluation logistique propre au lieu. Si la salle sert le personnel et les visiteurs, décrivez séparément l’accès et l’assistance de chaque groupe.",
    },
    questions: {
      en: [
        "Which facility receives the delivery?",
        "Staff, visitors or event attendees?",
        "Is each municipality’s logistics scope confirmed?",
      ],
      fr: [
        "Quel établissement reçoit la livraison?",
        "Personnel, visiteurs ou participants?",
        "La logistique de chaque municipalité est-elle confirmée?",
      ],
    },
  },
  {
    code: "NB",
    slug: { en: "new-brunswick", fr: "nouveau-brunswick" },
    name: { en: "New Brunswick", fr: "Nouveau-Brunswick" },
    places: ["Fredericton", "Moncton", "Saint John"],
    focus: {
      en: "For a New Brunswick project, record the preferred languages for the proposal, signs and operating instructions along with the site details. If facilities in Fredericton, Moncton or Saint John share a purchasing process, keep room dimensions and delivery arrangements separate. Identify who can approve materials and who will manage the room after handover. These details help distinguish a consistent project approach from assumptions that every building can use the same layout.",
      fr: "Pour un projet au Nouveau-Brunswick, indiquez les langues souhaitées pour la proposition, les affiches et les consignes en plus des détails du site. Si des installations à Fredericton, Moncton ou Saint John partagent les achats, distinguez les dimensions et les livraisons. Identifiez la personne qui approuve les matériaux et celle qui gérera la salle. Ces précisions permettent une approche cohérente sans présumer que tous les bâtiments conviennent au même aménagement.",
    },
    questions: {
      en: [
        "Which languages are needed for signs and instructions?",
        "Who approves the material selections?",
        "Are site dimensions documented separately?",
      ],
      fr: [
        "Quelles langues sont nécessaires pour les affiches et consignes?",
        "Qui approuve les matériaux?",
        "Les dimensions de chaque site sont-elles distinctes?",
      ],
    },
  },
  {
    code: "NL",
    slug: { en: "newfoundland-labrador", fr: "terre-neuve-labrador" },
    name: { en: "Newfoundland and Labrador", fr: "Terre-Neuve-et-Labrador" },
    places: ["St. John’s", "Corner Brook", "Happy Valley-Goose Bay"],
    focus: {
      en: "For Newfoundland and Labrador, give the complete community and delivery address at the start of the brief. Do not treat a project in St. John’s and a project in Labrador as the same logistics scenario. Ask how equipment reaches the site, who receives it and what work remains after delivery. If the project has a fixed opening date, distinguish the desired date from a confirmed schedule and include time for reviewing the actual transport and installation proposal.",
      fr: "À Terre-Neuve-et-Labrador, fournissez la communauté et l’adresse complètes dès le début. Un projet à St. John’s et un projet au Labrador ne représentent pas le même scénario logistique. Demandez comment l’équipement arrive, qui le reçoit et quels travaux restent après la livraison. Si une date d’ouverture est visée, distinguez-la d’un échéancier confirmé et prévoyez l’examen de la proposition réelle de transport et d’installation.",
    },
    questions: {
      en: [
        "What is the full destination?",
        "Who handles the final receiving stage?",
        "Is the requested date flexible?",
      ],
      fr: [
        "Quelle est la destination complète?",
        "Qui assure la réception finale?",
        "La date souhaitée est-elle flexible?",
      ],
    },
  },
  {
    code: "PE",
    slug: { en: "prince-edward-island", fr: "ile-du-prince-edouard" },
    name: { en: "Prince Edward Island", fr: "Île-du-Prince-Édouard" },
    places: ["Charlottetown", "Summerside"],
    focus: {
      en: "For Prince Edward Island, start with the building’s intended use and the period in which the space needs to operate. A permanent workplace room and a temporary visitor amenity call for different maintenance and access arrangements. Include the full delivery location and confirm whether the receiving team can store equipment before setup. Where work is linked to an event or seasonal program, document setup and removal windows separately from the dates of public use.",
      fr: "À l’Île-du-Prince-Édouard, commencez par l’usage du bâtiment et la période d’exploitation de l’espace. Une salle permanente au travail et une commodité temporaire pour visiteurs demandent des modalités différentes. Incluez le lieu complet de livraison et vérifiez l’entreposage avant l’installation. Pour un événement ou un programme saisonnier, distinguez les plages d’installation et de retrait des dates d’utilisation publique.",
    },
    questions: {
      en: [
        "Permanent use or a defined season?",
        "Can equipment be stored before setup?",
        "What are the installation and removal windows?",
      ],
      fr: [
        "Usage permanent ou saison définie?",
        "Peut-on entreposer l’équipement avant l’installation?",
        "Quelles sont les périodes d’installation et de retrait?",
      ],
    },
  },
  {
    code: "YT",
    slug: { en: "yukon", fr: "yukon" },
    name: { en: "Yukon", fr: "Yukon" },
    places: ["Whitehorse", "Dawson City"],
    focus: {
      en: "For a Yukon inquiry, provide the destination community, site contact and receiving arrangements before comparing enclosure options. A project in Whitehorse and a project in another community require their own logistics assessment. Ask which installation tasks can be supported at the destination and which must be arranged separately. Consider the ability to obtain replacement components and maintenance information as part of the selection process, without assuming local stock or service coverage.",
      fr: "Pour une demande au Yukon, fournissez la communauté, le contact et les modalités de réception avant de comparer les cabines. Un projet à Whitehorse et un projet ailleurs demandent chacun une évaluation logistique. Vérifiez quelles tâches d’installation peuvent être soutenues à destination et lesquelles doivent être organisées séparément. Pensez aux pièces de remplacement et aux consignes d’entretien sans présumer de stock ni de service local.",
    },
    questions: {
      en: [
        "Who can receive and inspect the shipment?",
        "Which installation tasks can be arranged locally?",
        "How will maintenance and replacement needs be handled?",
      ],
      fr: [
        "Qui peut recevoir et inspecter l’envoi?",
        "Quelles tâches peuvent être organisées localement?",
        "Comment gérer l’entretien et les remplacements?",
      ],
    },
  },
  {
    code: "NT",
    slug: { en: "northwest-territories", fr: "territoires-nord-ouest" },
    name: { en: "Northwest Territories", fr: "Territoires du Nord-Ouest" },
    places: ["Yellowknife", "Hay River", "Inuvik"],
    focus: {
      en: "For the Northwest Territories, identify the community and the entire receiving plan rather than relying on a territory-wide delivery assumption. A proposal needs to distinguish equipment supply, transport, on-site handling and any work performed by local parties. If the facility has limited storage or restricted access, document that before a unit is selected. Ask how the space will be maintained and who will hold operating information after handover.",
      fr: "Pour les Territoires du Nord-Ouest, précisez la communauté et le plan complet de réception plutôt que de présumer une livraison uniforme. La proposition doit distinguer la fourniture, le transport, la manutention et les travaux locaux. Si l’établissement a peu d’entreposage ou un accès restreint, indiquez-le avant la sélection. Vérifiez comment l’espace sera entretenu et qui conservera les renseignements d’exploitation après la remise.",
    },
    questions: {
      en: [
        "What is the community-specific receiving plan?",
        "Is storage or handling space limited?",
        "Who retains maintenance documentation?",
      ],
      fr: [
        "Quel est le plan de réception propre à la communauté?",
        "L’entreposage ou la manutention sont-ils limités?",
        "Qui conserve les documents d’entretien?",
      ],
    },
  },
  {
    code: "NU",
    slug: { en: "nunavut", fr: "nunavut" },
    name: { en: "Nunavut", fr: "Nunavut" },
    places: ["Iqaluit", "Rankin Inlet", "Cambridge Bay"],
    focus: {
      en: "For Nunavut, begin with the destination community and a discussion of feasible supply and installation arrangements. Do not assume that an enclosure shown on a planning page can be shipped or installed at a particular site. Request a project-specific review of handling, receiving, local work and ongoing upkeep. If a building already has a suitable room, compare a room fit-out with a freestanding option while considering the practical scope that can actually be supported.",
      fr: "Pour le Nunavut, commencez par la communauté et les possibilités de fourniture et d’installation. Ne présumez pas qu’une cabine présentée sur une page de planification peut être expédiée ou installée à un site donné. Demandez une évaluation de la manutention, de la réception, des travaux locaux et de l’entretien. Si une pièce existe déjà, comparez son aménagement à une cabine autonome selon la portée réellement possible.",
    },
    questions: {
      en: [
        "Which supply and handling arrangements are feasible?",
        "Is there an existing room to assess?",
        "Who supports ongoing upkeep?",
      ],
      fr: [
        "Quelles modalités de fourniture et de manutention sont possibles?",
        "Y a-t-il une pièce existante à évaluer?",
        "Qui assure l’entretien courant?",
      ],
    },
  },
];
export const locationEntries: LocationEntry[] = briefs.map((b) => ({
  id: `region-${b.code.toLowerCase()}`,
  parentId: "locations",
  slugs: b.slug,
  name: b.name,
  kind: "province",
  municipalities: b.places,
  editorialReady: true,
  sections: {
    en: [
      {
        title: `Prepare a ${b.name.en} project brief`,
        body: b.focus.en,
        bullets: b.questions.en,
      },
      {
        title: "Confirm the proposed scope for your site",
        body: "Share the intended users, room or enclosure preference, access route and target timing. Ask for supply, transport, assembly and any building work to be identified separately. The location list supports project inquiries; it does not establish a local office, inventory or installation guarantee. Availability and practical responsibilities must be confirmed for the specific site before an order or rental arrangement.",
      },
    ],
    fr: [
      {
        title: `Préparer un projet — ${b.name.fr}`,
        body: b.focus.fr,
        bullets: b.questions.fr,
      },
      {
        title: "Confirmez la portée propre à votre site",
        body: "Présentez les usagers, le choix entre pièce et cabine, le parcours d’accès et l’échéancier souhaité. Demandez de distinguer la fourniture, le transport, l’assemblage et les travaux. La liste des lieux sert aux demandes de projet; elle ne confirme ni bureau local, ni stock, ni installation garantie. La disponibilité et les responsabilités doivent être confirmées pour le site avant une commande ou une location.",
      },
    ],
  },
}));
type MetroBrief = {
  id: string;
  province: string;
  slugs: Localized<string>;
  name: Localized<string>;
  places: string[];
  focus: Localized<string>;
  questions: Localized<string[]>;
};
const metros: MetroBrief[] = [
  {
    id: "toronto-gta",
    province: "on",
    slugs: { en: "toronto-gta", fr: "toronto-grand-toronto" },
    name: { en: "Toronto & the GTA", fr: "Toronto et le Grand Toronto" },
    places: [
      "Toronto",
      "Mississauga",
      "Brampton",
      "Vaughan",
      "Markham",
      "Richmond Hill",
      "Oakville",
      "Burlington",
      "Pickering",
      "Ajax",
      "Whitby",
      "Oshawa",
    ],
    focus: {
      en: "For a Toronto and GTA program, separate municipal addresses from the shared purchasing brief. An office in Toronto, a workplace in Mississauga and a facility in Vaughan can have different loading access, lift bookings and management contacts. For Brampton, Markham, Richmond Hill, Oakville or Burlington, confirm the same site details rather than assuming a single regional delivery plan. If one team is coordinating several spaces, maintain a location worksheet for each building and name the person authorized to approve access.",
      fr: "Pour un programme à Toronto et dans le Grand Toronto, distinguez les adresses municipales du brief d’approvisionnement commun. Un bureau à Toronto, un milieu de travail à Mississauga et un établissement à Vaughan peuvent avoir des accès de livraison, des réservations d’ascenseur et des responsables différents. Pour Brampton, Markham, Richmond Hill, Oakville ou Burlington, confirmez aussi ces détails plutôt que de présumer un seul plan régional. Conservez une fiche par bâtiment et désignez la personne qui autorise l’accès.",
    },
    questions: {
      en: [
        "Toronto: are lift and loading bookings needed?",
        "Mississauga/Brampton: is the space office-based or within a controlled site?",
        "Vaughan/Markham/Richmond Hill: who manages each building’s access?",
        "Oakville/Burlington: is the proposal for one facility or several?",
      ],
      fr: [
        "Toronto : faut-il réserver l’ascenseur et la livraison?",
        "Mississauga/Brampton : bureau ou site à accès contrôlé?",
        "Vaughan/Markham/Richmond Hill : qui gère chaque accès?",
        "Oakville/Burlington : un établissement ou plusieurs?",
      ],
    },
  },
  {
    id: "vancouver",
    province: "bc",
    slugs: { en: "vancouver-metro", fr: "grand-vancouver" },
    name: {
      en: "Vancouver & Metro Vancouver",
      fr: "Vancouver et le Grand Vancouver",
    },
    places: [
      "Vancouver",
      "Burnaby",
      "Surrey",
      "Richmond",
      "Coquitlam",
      "North Vancouver",
    ],
    focus: {
      en: "For Metro Vancouver, identify the actual municipality and building rather than using Vancouver as a catch-all delivery location. A project involving Burnaby, Surrey or Richmond should record each receiving point and the facilities contact who can review placement. If a workplace has multiple floors or shared public areas, compare the user route with the equipment delivery route. Ask whether the proposed installation scope covers every listed building and which preparations remain the responsibility of the site team.",
      fr: "Dans le Grand Vancouver, indiquez la municipalité et le bâtiment réels plutôt que d’utiliser Vancouver comme destination générale. Pour Burnaby, Surrey ou Richmond, consignez chaque point de réception et le contact qui peut examiner l’emplacement. Si le lieu comprend plusieurs étages ou des aires publiques communes, comparez le parcours des usagers à celui de la livraison. Vérifiez si la portée d’installation couvre tous les bâtiments et quelles préparations relèvent de l’équipe sur place.",
    },
    questions: {
      en: [
        "Which municipality receives each unit?",
        "Are public and employee spaces separate?",
        "Does the proposal cover all buildings?",
      ],
      fr: [
        "Quelle municipalité reçoit chaque cabine?",
        "Les espaces publics et du personnel sont-ils distincts?",
        "La proposition couvre-t-elle tous les bâtiments?",
      ],
    },
  },
  {
    id: "montreal",
    province: "qc",
    slugs: { en: "montreal", fr: "montreal" },
    name: { en: "Montréal", fr: "Montréal" },
    places: ["Montréal", "Saint-Laurent", "Dorval", "Pointe-Claire"],
    focus: {
      en: "For Montréal, identify the building entrance used for deliveries and the team responsible for access. If the proposed space is in a multi-tenant property, clarify which decisions belong to the tenant and which require the building operator. Prepare French instructions and handover requirements as part of the project brief rather than adding them after selection. A campus, terminal or office scenario should also identify its own users and operating hours so the room can be assessed in context.",
      fr: "À Montréal, précisez l’entrée utilisée pour les livraisons et l’équipe responsable de l’accès. Dans un immeuble à plusieurs locataires, distinguez les décisions du locataire de celles de l’exploitant. Intégrez les consignes et documents de remise en français au brief plutôt que de les ajouter après la sélection. Pour un campus, une aérogare ou un bureau, indiquez aussi les usagers et les heures d’exploitation afin d’évaluer la salle dans son contexte.",
    },
    questions: {
      en: [
        "Tenant or building-operator approval?",
        "Which delivery entrance and working hours?",
        "Are French operating documents included?",
      ],
      fr: [
        "Approbation du locataire ou de l’exploitant?",
        "Quelle entrée et quelles heures de livraison?",
        "Les documents d’exploitation en français sont-ils inclus?",
      ],
    },
  },
  {
    id: "laval",
    province: "qc",
    slugs: { en: "laval", fr: "laval" },
    name: { en: "Laval", fr: "Laval" },
    places: ["Laval"],
    focus: {
      en: "For Laval, keep the project’s site address and operating contact distinct from any Montréal-based purchasing office. If the brief concerns a shopping centre, campus or workplace, specify whether the space is for staff, visitors or both. Record who can approve a common-area placement and how cleaning and assistance will be handled during opening hours. A room conversion and a freestanding enclosure should be compared against the same access and day-to-day management requirements before choosing a direction.",
      fr: "À Laval, distinguez l’adresse du site et son responsable d’un éventuel bureau d’achat à Montréal. Pour un centre commercial, un campus ou un milieu de travail, précisez si l’espace sert le personnel, les visiteurs ou les deux. Indiquez qui approuve un emplacement dans une aire commune et qui gère le nettoyage et l’assistance. Comparez l’aménagement d’une pièce et une cabine autonome selon les mêmes besoins d’accès et de gestion quotidienne.",
    },
    questions: {
      en: [
        "Is the purchasing address different from the site?",
        "Who approves common-area placement?",
        "Are staff and visitor access needs different?",
      ],
      fr: [
        "L’adresse des achats diffère-t-elle du site?",
        "Qui approuve l’aire commune?",
        "L’accès du personnel et des visiteurs diffère-t-il?",
      ],
    },
  },
  {
    id: "longueuil",
    province: "qc",
    slugs: { en: "longueuil-south-shore", fr: "longueuil-rive-sud" },
    name: { en: "Longueuil & the South Shore", fr: "Longueuil et la Rive-Sud" },
    places: ["Longueuil", "Brossard", "Boucherville", "Saint-Lambert"],
    focus: {
      en: "For Longueuil and surrounding South Shore projects, list each municipality and the actual building receiving the equipment. If a regional organization is coordinating several sites, separate room requirements, access permissions and installation windows for Longueuil, Brossard or Boucherville. Consider whether the same furniture plan is suitable in each room rather than replicating it automatically. The brief should also identify the local person who will receive instructions and take responsibility for upkeep after handover.",
      fr: "Pour Longueuil et les projets de la Rive-Sud, indiquez chaque municipalité et le bâtiment qui reçoit l’équipement. Si une organisation coordonne plusieurs lieux, distinguez les besoins des pièces, les permissions et les périodes d’installation à Longueuil, Brossard ou Boucherville. Vérifiez si le mobilier convient à chaque salle plutôt que de le reproduire automatiquement. Le brief doit aussi désigner la personne qui reçoit les consignes et assure l’entretien après la remise.",
    },
    questions: {
      en: [
        "Which South Shore municipality is the destination?",
        "Are layouts assessed separately?",
        "Who takes responsibility after handover?",
      ],
      fr: [
        "Quelle municipalité de la Rive-Sud est la destination?",
        "Les dispositions sont-elles évaluées séparément?",
        "Qui est responsable après la remise?",
      ],
    },
  },
  {
    id: "ottawa",
    province: "on",
    slugs: { en: "ottawa-gatineau", fr: "ottawa-gatineau" },
    name: { en: "Ottawa–Gatineau", fr: "Ottawa–Gatineau" },
    places: ["Ottawa", "Gatineau"],
    focus: {
      en: "For an Ottawa–Gatineau program, record the province and full address of every site. A shared administrative team does not mean the same building approvals, trade arrangements or procurement process apply to both destinations. Identify language needs for signs and operating instructions, and distinguish public access from employee-only facilities. For a multi-building project, create a separate delivery and handover checklist for each location while keeping common design priorities in the overall brief.",
      fr: "Pour un programme à Ottawa–Gatineau, indiquez la province et l’adresse complète de chaque site. Une équipe administrative commune ne signifie pas que les approbations, les métiers ou l’approvisionnement sont identiques. Précisez les langues des affiches et des consignes, puis distinguez les installations publiques de celles du personnel. Pour plusieurs bâtiments, préparez une liste de livraison et de remise par lieu, tout en conservant les priorités communes dans le brief général.",
    },
    questions: {
      en: [
        "Ontario or Québec for each site?",
        "Which language versions are required?",
        "Are approval responsibilities different across sites?",
      ],
      fr: [
        "Ontario ou Québec pour chaque site?",
        "Quelles versions linguistiques sont requises?",
        "Les responsabilités d’approbation diffèrent-elles?",
      ],
    },
  },
  {
    id: "calgary",
    province: "ab",
    slugs: { en: "calgary", fr: "calgary" },
    name: { en: "Calgary", fr: "Calgary" },
    places: ["Calgary", "Airdrie"],
    focus: {
      en: "For a Calgary office project, compare the intended user route with loading and lift access before selecting a pod. If the space is in a leased office, identify the landlord’s role in approving placement and any work affecting building services. For a campus or event facility, replace office assumptions with the actual opening hours and visitor flow. A clear brief should separate the privacy-space requirement from any furniture, electrical or installation work that needs its own scope.",
      fr: "Pour un bureau à Calgary, comparez le trajet des usagers avec l’accès de livraison et d’ascenseur avant de choisir une cabine. Dans des locaux loués, précisez le rôle du propriétaire pour l’emplacement et les services du bâtiment. Pour un campus ou un lieu d’événement, utilisez les heures et parcours réels plutôt que les hypothèses d’un bureau. Distinguez le besoin d’espace privé du mobilier et des travaux électriques ou d’installation qui exigent leur propre portée.",
    },
    questions: {
      en: [
        "Does the landlord need to approve the location?",
        "Are loading and lift windows available?",
        "Which work is outside the enclosure supply?",
      ],
      fr: [
        "Le propriétaire doit-il approuver l’emplacement?",
        "Quelles plages de livraison et d’ascenseur sont disponibles?",
        "Quels travaux sont hors de la fourniture de la cabine?",
      ],
    },
  },
  {
    id: "edmonton",
    province: "ab",
    slugs: { en: "edmonton", fr: "edmonton" },
    name: { en: "Edmonton", fr: "Edmonton" },
    places: ["Edmonton", "St. Albert", "Sherwood Park"],
    focus: {
      en: "For Edmonton-area facilities, identify whether the room is in an office, public building or controlled operational site. The access process and maintenance owner may differ even within the same organization. If the space must support several shifts, confirm how people reach it when reception or administrative areas are closed. Where the brief includes St. Albert or Sherwood Park, record those destinations explicitly and confirm the delivery and installation arrangements for each site rather than one regional assumption.",
      fr: "Pour les établissements de la région d’Edmonton, précisez s’il s’agit d’un bureau, d’un bâtiment public ou d’un site opérationnel contrôlé. L’accès et l’entretien peuvent varier au sein d’une même organisation. Si l’espace sert plusieurs quarts, confirmez le parcours lorsque la réception ou les bureaux sont fermés. Pour St. Albert ou Sherwood Park, indiquez explicitement la destination et confirmez la livraison et l’installation de chaque site.",
    },
    questions: {
      en: [
        "Are access procedures different by shift?",
        "Who maintains the space?",
        "Are surrounding-community destinations listed separately?",
      ],
      fr: [
        "L’accès varie-t-il selon le quart?",
        "Qui entretient l’espace?",
        "Les communautés voisines sont-elles indiquées séparément?",
      ],
    },
  },
  {
    id: "winnipeg",
    province: "mb",
    slugs: { en: "winnipeg", fr: "winnipeg" },
    name: { en: "Winnipeg", fr: "Winnipeg" },
    places: ["Winnipeg"],
    focus: {
      en: "For a Winnipeg multi-building workplace, begin by mapping where users spend their day and which rooms are realistically available. A central room may be convenient for one group but difficult for another to reach during a break. Review whether distributed rooms or a dedicated enclosure would better match the operating pattern. Ask the facilities team to confirm power, access and cleaning responsibilities, and identify who can receive a shipment if delivery occurs before the room is prepared.",
      fr: "Pour un milieu de travail à plusieurs bâtiments à Winnipeg, repérez les déplacements quotidiens et les pièces réellement disponibles. Une salle centrale peut convenir à un groupe et être difficile à atteindre pour un autre pendant une pause. Comparez des salles réparties à une enceinte dédiée selon le fonctionnement réel. Faites confirmer l’alimentation, l’accès et le nettoyage par les installations, puis désignez la personne qui reçoit l’équipement si la pièce n’est pas prête.",
    },
    questions: {
      en: [
        "Can all intended users reach the space conveniently?",
        "One central room or several locations?",
        "Who receives equipment before setup?",
      ],
      fr: [
        "Tous les usagers peuvent-ils accéder facilement à l’espace?",
        "Une salle centrale ou plusieurs lieux?",
        "Qui reçoit l’équipement avant l’installation?",
      ],
    },
  },
  {
    id: "halifax",
    province: "ns",
    slugs: { en: "halifax-dartmouth", fr: "halifax-dartmouth" },
    name: { en: "Halifax & Dartmouth", fr: "Halifax et Dartmouth" },
    places: ["Halifax", "Dartmouth", "Bedford"],
    focus: {
      en: "For Halifax and Dartmouth, distinguish the site’s year-round needs from event or visitor peaks when describing the intended use. A workplace room, campus amenity and public visitor space need different access and assistance arrangements. If several buildings are included, identify the receiving entrance and operations contact for each. Ask whether a permanent fit-out or a temporary arrangement is being proposed and confirm the responsibilities for setup, routine cleaning and any later removal.",
      fr: "Pour Halifax et Dartmouth, distinguez les besoins réguliers des périodes d’événements ou d’achalandage dans votre description. Une salle au travail, sur un campus ou pour visiteurs exige des modalités d’accès et d’aide différentes. Pour plusieurs bâtiments, indiquez l’entrée de livraison et le contact de chacun. Vérifiez si la proposition vise un aménagement permanent ou temporaire, puis confirmez l’installation, le nettoyage courant et un éventuel retrait.",
    },
    questions: {
      en: [
        "Year-round use or event-related demand?",
        "Which building receives the equipment?",
        "Permanent fit-out or temporary arrangement?",
      ],
      fr: [
        "Usage annuel ou lié aux événements?",
        "Quel bâtiment reçoit l’équipement?",
        "Aménagement permanent ou temporaire?",
      ],
    },
  },
  {
    id: "quebec-city",
    province: "qc",
    slugs: { en: "quebec-city", fr: "ville-de-quebec" },
    name: { en: "Québec City", fr: "Ville de Québec" },
    places: ["Québec", "Lévis"],
    focus: {
      en: "For Québec City, prepare the intended room use and French operating information together so both can be reviewed before selection. If the project also includes Lévis, keep the site addresses and delivery requirements separate. For an existing building, ask the responsible team to assess the actual route, room services and any restrictions before assuming a particular enclosure fits. Identify the people who will approve the proposal, oversee work on site and manage the space after handover.",
      fr: "À Québec, préparez ensemble l’usage prévu et les consignes en français pour les examiner avant la sélection. Si le projet comprend Lévis, distinguez les adresses et les exigences de livraison. Dans un bâtiment existant, faites évaluer le parcours, les services de la pièce et les restrictions avant de présumer qu’une cabine convient. Identifiez les personnes qui approuvent la proposition, supervisent les travaux et gèrent l’espace après la remise.",
    },
    questions: {
      en: [
        "Are French handover documents specified?",
        "Does the project also include Lévis?",
        "Who approves the existing room’s suitability?",
      ],
      fr: [
        "Les documents de remise en français sont-ils précisés?",
        "Le projet comprend-il aussi Lévis?",
        "Qui approuve la pertinence de la pièce existante?",
      ],
    },
  },
];
for (const m of metros)
  locationEntries.push({
    id: `metro-${m.id}`,
    parentId: `region-${m.province}`,
    slugs: m.slugs,
    name: m.name,
    kind: "metro",
    municipalities: m.places,
    editorialReady: true,
    sections: {
      en: [
        {
          title: "Build a useful local project brief",
          body: m.focus.en,
          bullets: m.questions.en,
        },
        {
          title: "Turn the brief into a scope",
          body: "Provide the intended use, approximate room layout, access requirements and target dates. Keep required features separate from preferences so the proposed options can be evaluated fairly. Delivery, installation, local trade work and ongoing maintenance should each have an identified responsible party. A geographic inquiry is not confirmation of local stock, an office or fulfillment; request those details in the actual proposal.",
        },
      ],
      fr: [
        {
          title: "Préparez un brief utile pour votre site",
          body: m.focus.fr,
          bullets: m.questions.fr,
        },
        {
          title: "Du brief à la portée du projet",
          body: "Présentez l’usage, la disposition approximative, l’accès et les dates souhaitées. Séparez les exigences des préférences pour comparer les options. La livraison, l’installation, les travaux locaux et l’entretien doivent avoir des responsables désignés. Une demande géographique ne confirme ni stock local, ni bureau, ni exécution; demandez ces précisions dans la proposition réelle.",
        },
      ],
    },
  });
export function locationQuality(entry: LocationEntry) {
  return (
    entry.editorialReady &&
    (["en", "fr"] as const).every(
      (locale) =>
        entry.sections[locale].length >= 2 &&
        entry.sections[locale][0].body.length >= 350 &&
        entry.sections[locale]
          .map((s) => s.body)
          .join(" ")
          .split(/\s+/).length >= 100,
    )
  );
}
