export const locales = ["fr", "en", "ar", "es", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";
export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.domainelimoune.com";

export type Cta = {
  label: string;
  href: string;
  track?: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type Card = {
  title: string;
  href: string;
  eyebrow?: string;
  text: string;
  image: string;
  alt: string;
  cta?: string;
  meta?: string[];
};

export type DetailFact = {
  label: string;
  value: string;
};

export type ContentSection = {
  eyebrow?: string;
  title: string;
  body: string;
  bullets?: string[];
  cards?: Card[];
  facts?: DetailFact[];
  cta?: Cta;
  secondaryCta?: Cta;
};

export type Faq = {
  question: string;
  answer: string;
};

export type CollectionKey =
  | "accommodations"
  | "restaurants"
  | "experiences"
  | "offers"
  | "agenda";

export type FormKey = "contact" | "wedding" | "corporate" | "spa" | "restaurant";

export type PageTemplate =
  | "home"
  | "standard"
  | "collection"
  | "detail"
  | "lead";

export type SitePage = {
  slug: string;
  template: PageTemplate;
  title: string;
  eyebrow: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  primaryCta: Cta;
  secondaryCta?: Cta;
  sections: ContentSection[];
  collection?: CollectionKey;
  form?: FormKey;
  details?: DetailFact[];
  downloads?: string[];
  gallery?: string[];
  faqs?: Faq[];
};

export type Accommodation = {
  slug: string;
  name: string;
  category: string;
  position: string;
  emotionalText: string;
  image: string;
  gallery: string[];
  capacity: string;
  surface: string;
  bed: string;
  view: string;
  meta: string[];
  amenities: string[];
  servicesIncluded: string[];
  childConditions: string;
  checkIn: string;
  checkOut: string;
};

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  ar: "AR",
  es: "ES",
  de: "DE",
};

export const images = {
  hero: "https://capellahotels.com/assets/img/site_images/ubud/ubud-home01.jpg",
  domain: "https://capellahotels.com/assets/img/site_images/ubud/Capella-Ubud-Top-01.jpg",
  stays: "https://capellahotels.com/assets/img/site_images/ubud/Capella_Ubud_One_Bedroom_Keliki_Valley_Tent1.jpg",
  reserve: "https://capellahotels.com/assets/img/site_images/ubud/ubud-accommodation-tent-river-exterior.jpg",
  park: "https://capellahotels.com/assets/img/site_images/ubud/Capella-Ubud-Homepage-Gallery-06.jpg",
  restaurants: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Dining-Brasserie-1930-01a.jpg",
  spa: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Wellness-A-01.jpg",
  summer: "https://capellahotels.com/assets/img/site_images/bangkok/Capella-Bangkok-Homepage-Gallery-04.jpg",
  pool: "https://capellahotels.com/assets/img/site_images/ubud/Capella-Ubud-Homepage-Gallery-06.jpg",
  experiences: "https://capellahotels.com/assets/img/site_images/ubud/Capella-Ubud-Homepage-Gallery-01.jpg",
  weddings: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Private-Dining.jpg",
  corporate: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Gallery-01a.jpg_.jpg",
  offers: "https://capellahotels.com/assets/img/site_images/sydney/Sydney_Escape_Web_Exclusive-01.jpg",
  agenda: "https://capellahotels.com/assets/img/site_images/ubud/Capella-Ubud-Homepage-Gallery-03.jpg",
};

export const heroVideos = {
  capellaDesktop: "https://capellahotels.com/assets/img/site_images/sydney/cpsyd-winter-rituals-2.mp4",
  capellaMobile: "https://capellahotels.com/assets/img/site_images/sydney/cpsyd-winter-rituals-2-Mobile.mp4",
  desktop: "https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4",
  mobile: "https://videos.pexels.com/video-files/3773486/3773486-hd_1920_1080_30fps.mp4",
  poster: images.hero,
};

export const navItems = [
  {
    label: "Le Domaine",
    href: "/le-domaine",
    description: "Histoire, ADN, localisation et vision du Domaine.",
  },
  {
    label: "Séjours",
    href: "/sejours",
    description: "Suites, lodges safari et hébergements familiaux.",
  },
  {
    label: "Réserve Africaine",
    href: "/reserve-africaine",
    description: "L'expérience immersive réservée aux clients des lodges.",
  },
  {
    label: "Parc Animalier",
    href: "/parc-animalier",
    description: "Visite familiale, pédagogique et respectueuse du vivant.",
  },
  {
    label: "Restaurants",
    href: "/restaurants",
    description: "Massa, Aman sous les Orangers, Monkey Beach et Limoune Club.",
  },
  {
    label: "Canopy Spa",
    href: "/canopy-spa",
    description: "Soins, hammams, rituels, piscine chauffée et rituels mariage.",
  },
  {
    label: "Expériences",
    href: "/experiences",
    description: "Safari, plein air, familles, gastronomie et moments signature.",
  },
  {
    label: "Mariages",
    href: "/mariages",
    description: "Cérémonies, dîners, soirée, brunch et hébergement invités.",
  },
  {
    label: "Événements d’entreprise",
    href: "/evenements-entreprise",
    description: "Séminaires, activités d’équipe, réunions et privatisations.",
  },
  {
    label: "Offres",
    href: "/offres",
    description: "Offres saisonnières sans logique de discount agressif.",
  },
  {
    label: "Agenda",
    href: "/agenda",
    description: "Programmation, brunchs, soirées et événements saisonniers.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Demandes segmentées par service.",
  },
];

export const footerLinks = [
  { label: "Agenda", href: "/agenda" },
  { label: "Journal du Domaine", href: "/journal" },
  { label: "Presse", href: "/presse" },
  { label: "Recrutement", href: "/recrutement" },
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/politique-confidentialite" },
  { label: "Conditions générales", href: "/conditions-generales" },
  { label: "Cookies", href: "/politique-cookies" },
];

export const downloads: Record<string, { label: string; href: string }> = {
  factsheet: {
    label: "Fiche Domaine",
    href: "/assets/docs/factsheet-domaine.pdf",
  },
  accommodation: {
    label: "Brochure hébergement",
    href: "/assets/docs/brochure-hebergement.pdf",
  },
  wedding: {
    label: "Brochure mariage",
    href: "/assets/docs/brochure-mariage.pdf",
  },
  corporate: {
    label: "Brochure entreprise",
    href: "/assets/docs/brochure-corporate.pdf",
  },
  restaurants: {
    label: "Carte restaurants",
    href: "/assets/docs/carte-restaurants.pdf",
  },
  spa: {
    label: "Carte spa",
    href: "/assets/docs/carte-spa.pdf",
  },
  map: {
    label: "Plan du Domaine",
    href: "/assets/docs/plan-domaine.pdf",
  },
  press: {
    label: "Dossier presse",
    href: "/assets/docs/dossier-presse.pdf",
  },
};

export const homeStats: DetailFact[] = [
  { label: "Univers", value: "11 pôles" },
  { label: "Espèces", value: "30+" },
  { label: "Position", value: "près d'Agadir" },
  { label: "Parcours", value: "séjour, journée, événements" },
];

export const universeCards: Card[] = [
  {
    title: "Séjours",
    href: "/sejours",
    eyebrow: "Suites et lodges",
    text: "Des hébergements pensés pour les couples, familles et séjours immersifs face à la nature.",
    image: images.stays,
    alt: "Lodges et suites du Domaine Limoune dans une lumière chaude",
    cta: "Réserver un séjour",
  },
  {
    title: "Réserve Africaine",
    href: "/reserve-africaine",
    eyebrow: "Hébergement immersif",
    text: "Un univers réservé aux clients des lodges concernés, entre observation, calme et respect animalier.",
    image: images.reserve,
    alt: "Réserve africaine avec silhouette de zèbres et lodge",
    cta: "Découvrir les lodges safari",
  },
  {
    title: "Parc Animalier",
    href: "/parc-animalier",
    eyebrow: "Visite familiale",
    text: "Plus de 30 espèces à découvrir dans un parcours pédagogique accessible selon conditions.",
    image: images.park,
    alt: "Parc animalier familial avec oiseaux et animaux de savane",
    cta: "Voir les conditions",
  },
  {
    title: "Restaurants",
    href: "/restaurants",
    eyebrow: "Quatre ambiances",
    text: "Massa, Aman sous les Orangers, Monkey Beach et Limoune Club composent un véritable pôle F&B.",
    image: images.restaurants,
    alt: "Table dressée sous les orangers au Domaine Limoune",
    cta: "Réserver une table",
  },
  {
    title: "Canopy Spa",
    href: "/canopy-spa",
    eyebrow: "Bien-être premium",
    text: "Soins, hammams, piscine chauffée, jacuzzis, tisanerie et rituels signature.",
    image: images.spa,
    alt: "Canopy Spa avec lumière douce et matières naturelles",
    cta: "Réserver un soin",
  },
  {
    title: "Mariages",
    href: "/mariages",
    eyebrow: "Mariage destination",
    text: "Cérémonies, dîners, soirée, brunch du lendemain, hébergement et rituels mariage.",
    image: images.weddings,
    alt: "Mariage sous les orangers au Domaine Limoune",
    cta: "Demander un devis mariage",
  },
  {
    title: "Événements d’entreprise",
    href: "/evenements-entreprise",
    eyebrow: "Séminaires nature",
    text: "Séminaires, activités d’équipe, privatisations, restauration et activités de groupe.",
    image: images.corporate,
    alt: "Événement d’entreprise en plein air au Domaine Limoune",
    cta: "Demander un devis",
  },
  {
    title: "Expériences",
    href: "/experiences",
    eyebrow: "Signature Limoune",
    text: "Safari, quad, cheval au coucher du soleil, journée piscine, brunch, club enfants, cinéma sous les étoiles et ateliers.",
    image: images.experiences,
    alt: "Expériences de plein air et familiales au Domaine Limoune",
    cta: "Voir les expériences",
  },
];

const roomImages = {
  deluxe: "https://capellahotels.com/assets/img/site_images/sydney/Deluxe_King_Room-01_1.jpg",
  premier: "https://capellahotels.com/assets/img/site_images/sydney/PREMIER_ROOM_HOMEPAGE_240124.jpg",
  tower: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Accommodation-Tower-Room-01.jpg",
  skyline: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Accommodation-Skyline-Room-01a.jpg",
  accessible: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Accommodation-Premier-Accessible-Room-01.jpg",
  deluxeSuite: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Accommodation-Deluxe-Suite-01.jpg",
  skylineSuite: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Accommodation-Skyline-Suite-01.jpg",
  capellaSuite: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Capella-Suite-07.jpg",
  farrerSuite: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Farrer-Suite-01.jpg",
  libertySuite: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Liberty-Suite-01.jpg",
  macquarieSuite: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Macquarie-Suite-01.jpg",
};

export const accommodations = [
  {
    slug: "suites",
    name: "Suites",
    category: "Suites",
    position: "Des suites ouvertes sur les jardins, pensées pour ralentir, se retrouver et vivre le Domaine avec élégance.",
    emotionalText: "Une respiration douce entre matières naturelles, lumière chaude et confort discret, idéale pour une escapade près d’Agadir.",
    image: roomImages.deluxeSuite,
    gallery: [roomImages.deluxeSuite, roomImages.premier, roomImages.skylineSuite, roomImages.capellaSuite],
    capacity: "2 personnes, selon configuration",
    surface: "Surface selon suite et disponibilité",
    bed: "Lit king ou lits jumeaux selon demande",
    view: "Jardins, Domaine ou espaces paysagers",
    meta: ["Suite", "Couple", "Jardins", "Confort"],
    amenities: ["Salle de bain équipée", "Climatisation", "Wi-Fi", "Salon ou coin détente selon unité", "Rangements", "Produits d’accueil"],
    servicesIncluded: ["Accueil personnalisé", "Petit-déjeuner selon offre", "Accès piscine selon horaires", "Assistance conciergerie", "Stationnement selon disponibilité"],
    childConditions: "Enfant accepté selon configuration de la suite, lit bébé ou couchage additionnel sur demande et selon disponibilité.",
    checkIn: "À partir de 15h00, selon politique opérationnelle",
    checkOut: "Jusqu’à 12h00, départ tardif selon disponibilité",
  },
  {
    slug: "lodge-safari-mezzanine",
    name: "Lodge Safari avec Mezzanine",
    category: "Lodges Safari avec mezzanine",
    position: "Dormir face à la réserve africaine, dans un lodge pensé pour les familles et les séjours immersifs.",
    emotionalText: "Le réveil se fait dans le calme de la réserve, avec une sensation de bout du monde et le confort d’un lodge familial.",
    image: roomImages.tower,
    gallery: [roomImages.tower, roomImages.skyline, roomImages.capellaSuite, roomImages.libertySuite],
    capacity: "Jusqu'à 4 personnes",
    surface: "Surface selon configuration",
    bed: "Lit double et couchages mezzanine",
    view: "Vue réserve africaine",
    meta: ["Famille", "Réserve", "Petit-déjeuner", "Piscine"],
    amenities: ["Mezzanine", "Salle de bain équipée", "Climatisation", "Terrasse ou extérieur selon lodge", "Wi-Fi", "Rangements famille", "Salle de sport selon conditions"],
    servicesIncluded: ["Petit-déjeuner inclus selon offre", "Accès piscine selon horaires", "Accès parc animalier selon conditions", "Kids club selon calendrier", "Activités selon disponibilité", "Assistance conciergerie", "Stationnement selon disponibilité"],
    childConditions: "Adapté aux familles. Surveillance parentale requise sur mezzanine, lit bébé sur demande et activités enfants selon calendrier.",
    checkIn: "À partir de 15h00, selon politique opérationnelle",
    checkOut: "Jusqu’à 12h00, départ tardif selon disponibilité",
  },
  {
    slug: "lodges-cote-piscine-ou-jardin",
    name: "Lodges côté piscine ou jardin",
    category: "Lodges côté piscine ou jardin",
    position: "Des lodges lumineux pour prolonger le séjour autour de la piscine, des jardins et des espaces de détente du Domaine.",
    emotionalText: "Une adresse simple à vivre, proche des lieux de journée, pour alterner baignade, repos et moments sous les orangers.",
    image: roomImages.premier,
    gallery: [roomImages.premier, roomImages.deluxe, roomImages.skyline, roomImages.macquarieSuite],
    capacity: "2 à 3 personnes",
    surface: "Surface selon lodge et disponibilité",
    bed: "Lit double ou lits jumeaux, couchage additionnel selon configuration",
    view: "Piscine ou jardins",
    meta: ["Piscine", "Jardin", "Couple", "Journée"],
    amenities: ["Terrasse ou accès extérieur", "Salle de bain équipée", "Climatisation", "Wi-Fi", "Coin détente", "Produits d’accueil"],
    servicesIncluded: ["Petit-déjeuner selon offre", "Accès piscine selon horaires", "Assistance réservation restaurants", "Stationnement selon disponibilité", "Service conciergerie"],
    childConditions: "Un enfant peut être accueilli selon configuration. Couchage additionnel et équipements bébé sur demande.",
    checkIn: "À partir de 15h00, selon politique opérationnelle",
    checkOut: "Jusqu’à 12h00, départ tardif selon disponibilité",
  },
  {
    slug: "suite-junior",
    name: "Suite Junior",
    category: "Suites Junior",
    position: "Une suite élégante pour les courts séjours, les couples et les escapades près d'Agadir.",
    emotionalText: "Le bon format pour une pause raffinée : une chambre généreuse, une atmosphère calme et un accès fluide aux univers du Domaine.",
    image: roomImages.deluxe,
    gallery: [roomImages.deluxe, roomImages.premier, roomImages.accessible, roomImages.deluxeSuite],
    capacity: "2 personnes",
    surface: "Surface selon unité",
    bed: "Lit king ou lits jumeaux",
    view: "Domaine ou jardins",
    meta: ["Couple", "Confort", "Court séjour"],
    amenities: ["Salon ou coin lecture", "Salle de bain équipée", "Wi-Fi", "Climatisation", "Minibar selon offre", "Produits d’accueil"],
    servicesIncluded: ["Accueil personnalisé", "Petit-déjeuner selon offre", "Accès piscine selon horaires", "Assistance conciergerie", "Réservation prioritaire selon disponibilité"],
    childConditions: "Pensée principalement pour deux personnes. Lit bébé possible sur demande selon disponibilité.",
    checkIn: "À partir de 15h00, selon politique opérationnelle",
    checkOut: "Jusqu’à 12h00, départ tardif selon disponibilité",
  },
  {
    slug: "suite-executive",
    name: "Suite Exécutive",
    category: "Suites exécutives",
    position: "Un espace plus généreux pour les séjours premium, les voyageurs d’affaires et les longues pauses.",
    emotionalText: "Une suite plus ample, pensée pour travailler, recevoir ou prolonger le séjour sans perdre le calme du Domaine.",
    image: roomImages.skyline,
    gallery: [roomImages.skyline, roomImages.tower, roomImages.farrerSuite, roomImages.macquarieSuite],
    capacity: "2 à 3 personnes",
    surface: "Surface selon unité",
    bed: "Lit king, couchage additionnel selon configuration",
    view: "Jardins ou Domaine",
    meta: ["Exécutive", "Prestige", "Long séjour", "Affaires"],
    amenities: ["Coin salon", "Bureau", "Wi-Fi", "Climatisation", "Salle de bain équipée", "Rangements", "Minibar selon offre"],
    servicesIncluded: ["Accueil personnalisé", "Petit-déjeuner selon offre", "Assistance conciergerie", "Accès piscine selon horaires", "Aide organisation réunion ou table selon disponibilité"],
    childConditions: "Enfant accueilli selon configuration. Couchage additionnel sur demande et selon disponibilité.",
    checkIn: "À partir de 15h00, selon politique opérationnelle",
    checkOut: "Jusqu’à 12h00, départ tardif selon disponibilité",
  },
  {
    slug: "suite-familiale",
    name: "Suite Familiale",
    category: "Suites Familiales",
    position: "Une configuration confortable pour les familles qui veulent vivre le Domaine sans compromis.",
    emotionalText: "Chacun trouve son rythme : les enfants explorent, les parents respirent, et la suite devient le point d’ancrage du séjour.",
    image: roomImages.skylineSuite,
    gallery: [roomImages.skylineSuite, roomImages.deluxeSuite, roomImages.premier, roomImages.capellaSuite],
    capacity: "Jusqu'à 5 personnes",
    surface: "Surface selon unité",
    bed: "Lit double et couchages enfants",
    view: "Jardins ou Domaine",
    meta: ["Famille", "Club enfants", "Parc animalier", "Piscine"],
    amenities: ["Espaces séparés selon unité", "Salle de bain équipée", "Climatisation", "Wi-Fi", "Options enfants", "Rangements famille"],
    servicesIncluded: ["Petit-déjeuner selon offre", "Accès piscine selon horaires", "Accès parc animalier selon conditions", "Club enfants selon calendrier", "Assistance activités famille"],
    childConditions: "Pensée pour les familles. Lit bébé, couchage enfant et activités enfants selon âge, calendrier et disponibilité.",
    checkIn: "À partir de 15h00, selon politique opérationnelle",
    checkOut: "Jusqu’à 12h00, départ tardif selon disponibilité",
  },
  {
    slug: "suite-signature",
    name: "Suite Signature",
    category: "Suites Signature",
    position: "La suite de référence pour une expérience plus exclusive, sensorielle et généreuse.",
    emotionalText: "Une adresse plus intime, pensée comme une parenthèse rare avec service attentif, matières chaleureuses et accès privilégié aux rituels du Domaine.",
    image: roomImages.capellaSuite,
    gallery: [roomImages.capellaSuite, roomImages.libertySuite, roomImages.farrerSuite, roomImages.macquarieSuite],
    capacity: "2 personnes",
    surface: "Grande suite selon disponibilité",
    bed: "Lit king",
    view: "Domaine, jardins ou horizon",
    meta: ["Signature", "Couple", "Spa", "Prestige"],
    amenities: ["Salon", "Terrasse selon unité", "Salle de bain équipée", "Climatisation", "Wi-Fi", "Produits d’accueil premium", "Rangements"],
    servicesIncluded: ["Accueil personnalisé", "Petit-déjeuner selon offre", "Assistance conciergerie", "Accès spa selon offre", "Réservation prioritaire selon disponibilité"],
    childConditions: "Format recommandé pour adultes ou couple. Accueil enfant uniquement selon configuration et validation de l’équipe réservation.",
    checkIn: "À partir de 15h00, selon politique opérationnelle",
    checkOut: "Jusqu’à 12h00, départ tardif selon disponibilité",
  },
  {
    slug: "lodges-communicants",
    name: "Lodges Communicants",
    category: "Lodges communicants",
    position: "Une solution pratique et premium pour les familles nombreuses, groupes ou séjours multi-générationnels.",
    emotionalText: "Deux espaces proches, une même expérience : chacun garde son intimité tout en partageant les moments forts du Domaine.",
    image: roomImages.farrerSuite,
    gallery: [roomImages.farrerSuite, roomImages.skylineSuite, roomImages.deluxeSuite, roomImages.premier],
    capacity: "Selon combinaison de lodges",
    surface: "Selon configuration",
    bed: "Plusieurs couchages selon combinaison",
    view: "Jardins, piscine ou réserve selon disponibilité",
    meta: ["Communicant", "Famille", "Groupes", "Flexible"],
    amenities: ["Configurations flexibles", "Salles de bain équipées", "Climatisation", "Wi-Fi", "Espaces extérieurs selon lodges", "Rangements"],
    servicesIncluded: ["Assistance réservation groupe", "Petit-déjeuner selon offre", "Accès piscine selon horaires", "Coordination activités", "Stationnement selon disponibilité"],
    childConditions: "Adapté aux familles nombreuses. Répartition des enfants selon âge, capacité et validation de l’équipe réservation.",
    checkIn: "À partir de 15h00, selon politique opérationnelle",
    checkOut: "Jusqu’à 12h00, départ tardif selon disponibilité",
  },
  {
    slug: "suite-lodge-premium",
    name: "Suite ou lodge premium",
    category: "Suites ou lodges premium",
    position: "Une sélection premium pour les voyageurs qui recherchent plus d’espace, de calme et de personnalisation.",
    emotionalText: "Le séjour devient plus fluide, plus généreux, avec un niveau d’attention adapté aux occasions spéciales et aux longues pauses.",
    image: roomImages.libertySuite,
    gallery: [roomImages.libertySuite, roomImages.capellaSuite, roomImages.macquarieSuite, roomImages.skyline],
    capacity: "2 à 4 personnes selon unité",
    surface: "Grande surface selon suite ou lodge attribué",
    bed: "Lit king, lits jumeaux ou couchages additionnels selon configuration",
    view: "Jardins, Domaine, piscine ou réserve selon disponibilité",
    meta: ["Premium", "Sur mesure", "Occasion", "Long séjour"],
    amenities: ["Espace salon", "Salle de bain équipée", "Climatisation", "Wi-Fi", "Terrasse ou extérieur selon unité", "Produits d’accueil premium"],
    servicesIncluded: ["Accueil personnalisé", "Petit-déjeuner selon offre", "Assistance conciergerie", "Accès piscine selon horaires", "Aide organisation spa, table ou expérience"],
    childConditions: "Conditions enfants selon suite ou lodge attribué. Lit bébé et couchage additionnel sur demande, sous réserve de capacité.",
    checkIn: "À partir de 15h00, selon politique opérationnelle",
    checkOut: "Jusqu’à 12h00, départ tardif selon disponibilité",
  },
] satisfies Accommodation[];

export const restaurants = [
  {
    slug: "massa-restaurant",
    name: "Massa Restaurant",
    position: "Le restaurant signature du Domaine, entre cuisine soignée, service attentif et art de vivre marocain contemporain.",
    image: images.restaurants,
    cuisine: "Cuisine signature et produits de saison",
    hours: "Déjeuner et dîner selon calendrier",
    meta: ["Signature", "Déjeuner", "Dîner privé"],
  },
  {
    slug: "aman-sous-les-orangers",
    name: "Aman sous les Orangers",
    position: "Un lieu de partage pour brunchs, banquets, déjeuners de groupe et événements sous les orangers.",
    image: images.domain,
    cuisine: "Brunchs, banquets et cuisine conviviale",
    hours: "Selon programmation et privatisation",
    meta: ["Brunch", "Groupes", "Orangers"],
  },
  {
    slug: "monkey-beach",
    name: "Monkey Beach",
    position: "L'univers piscine, détente, snacking, pool access et journée famille du Domaine.",
    image: images.offers,
    cuisine: "Food, drinks, pool access et snacking premium",
    hours: "Horaires saisonniers",
    meta: ["Journée piscine", "Famille", "Été"],
  },
  {
    slug: "limoune-club",
    name: "Limoune Club",
    position: "Un espace de soirée, sport, détente, cheminée, diffusions de matchs et événements privés.",
    image: images.agenda,
    cuisine: "Cuisine, boissons, programmation et privatisations",
    hours: "Selon programmation",
    meta: ["Soirée", "Sport", "Privatisation"],
  },
];

export const experiences = [
  ["Safari Limoune", "Observation, nature et immersion face aux animaux du Domaine.", "Familles, couples, clients hébergement"],
  ["Balade à cheval au coucher du soleil", "Une sortie de fin de journée dans la lumière chaude de la région.", "Couples, familles, groupes"],
  ["Quad", "Une activité de plein air encadrée pour découvrir les alentours autrement.", "Adultes, groupes, activités d’équipe"],
  ["Padel et tennis", "Des terrains et moments sportifs à intégrer au séjour ou à la journée.", "Familles, entreprises"],
  ["Club enfants", "Un espace enfants pensé pour rassurer les parents et enrichir la journée.", "Familles"],
  ["Chasse au trésor", "Une chasse au trésor scénarisée pour découvrir le Domaine en équipe.", "Enfants, familles, groupes"],
  ["Pique-nique", "Un panier gourmand dans un décor naturel et calme.", "Couples, familles"],
  ["Barbecue", "Une expérience conviviale de groupe autour du feu et des jardins.", "Groupes, entreprises"],
  ["Dîner sous les étoiles", "Un dîner privatisable dans une atmosphère nocturne élégante.", "Couples, événements"],
  ["Pause thé sous les orangers", "Une pause douce et sensorielle au coeur des plantations.", "Locaux, familles, visiteurs"],
  ["Cinéma familial sous les étoiles", "Une soirée familiale avec projection en plein air.", "Familles, enfants"],
  ["Atelier cuisine", "Atelier autour des saveurs du Domaine et de la cuisine locale.", "Tour-opérateurs, familles"],
  ["Mixologie", "Atelier boissons pour groupes, soirées privées ou événements d’entreprise.", "Adultes, groupes"],
] as const;

export const offers = [
  ["Séjour Été Limoune", "Séjour saisonnier avec expériences famille, piscine et univers animalier.", "Saison été"],
  ["Séjour Famille", "Une offre pensée pour chambres, activités enfants et moments de partage.", "Famille"],
  ["Escapade Canopy Spa", "Séjour ou journée associant calme, soin et rituel bien-être.", "Spa"],
  ["Brunch et parc animalier", "Une journée complète entre table, nature et découverte familiale.", "Restaurant"],
  ["Journée piscine", "Accès piscine, cuisine, boissons et détente autour de Monkey Beach.", "Journée"],
  ["Safari Lodge", "L'offre dédiée aux lodges face à la réserve africaine.", "Séjours"],
  ["Séjour prolongé", "Une proposition premium pour prolonger le séjour sans discours promotionnel agressif.", "Long séjour"],
  ["Offre Résidents Maroc", "Un avantage ponctuel pour la clientèle locale et nationale.", "Résidents"],
] as const;

export const agendaEvents = [
  ["Brunch familial sous les orangers", "Aman sous les Orangers", "Chaque dimanche selon saison"],
  ["Été Limoune", "Monkey Beach et parc animalier", "Activation estivale"],
  ["Diffusions sportives", "Limoune Club", "Selon calendrier"],
  ["Dîners thématiques", "Massa Restaurant", "Programmation mensuelle"],
  ["Événements enfants", "Club enfants", "Vacances et week-ends"],
  ["Ramadan au Domaine", "Restaurants et jardins", "Selon calendrier religieux"],
] as const;

export const departments = [
  "Réservations hébergement",
  "Restaurants",
  "Canopy Spa",
  "Mariages",
  "Événements d’entreprise",
  "Parc animalier",
  "Activités",
  "Presse",
  "Direction commerciale",
  "Informations générales",
];

const sharedFaqs: Faq[] = [
  {
    question: "Le Domaine Limoune est-il adapté aux familles ?",
    answer:
      "Oui. Le Domaine réunit hébergements familiaux, parc animalier, piscine, activités enfants, club enfants et expériences de plein air selon disponibilité.",
  },
  {
    question: "Peut-on venir pour une journée sans dormir sur place ?",
    answer:
      "Oui, selon les univers et conditions d'accès : restaurants, parc animalier, journée piscine, spa et activités peuvent disposer de parcours journée dédiés.",
  },
  {
    question: "La Réserve Africaine est-elle identique au Parc Animalier ?",
    answer:
      "Non. La Réserve Africaine est liée à l'expérience d'hébergement immersive. Le Parc Animalier correspond au parcours de visite familial selon conditions.",
  },
];

const basePages: SitePage[] = [
  {
    slug: "",
    template: "home",
    title: "Domaine Limoune",
    eyebrow: "Destination nature près d'Agadir",
    summary:
      "Un domaine hôtelier expérientiel où hébergements, réserve africaine, parc animalier, restaurants, spa, activités, mariages et événements composent une destination complète.",
    heroImage: images.hero,
    heroAlt: "Vue cinématique du Domaine Limoune avec orangers, lodges et lumière chaude",
    seoTitle: "Domaine Limoune | Hôtel, lodges, parc animalier et spa près d'Agadir",
    seoDescription:
      "Découvrez Domaine Limoune, destination premium près d'Agadir : hébergements, réserve africaine, parc animalier, restaurants, Canopy Spa, mariages, séminaires et expériences.",
    seoKeywords: [
      "hôtel Agadir",
      "lodge safari Maroc",
      "parc animalier Agadir",
      "spa Agadir",
      "mariage Agadir",
      "séminaire Agadir",
    ],
    primaryCta: { label: "Réserver votre séjour", href: "/sejours", track: "book_stay" },
    secondaryCta: { label: "Voir nos expériences", href: "/experiences", variant: "secondary" },
    sections: [],
    gallery: [images.domain, images.reserve, images.restaurants, images.spa],
    faqs: sharedFaqs,
  },
  {
    slug: "le-domaine",
    template: "standard",
    title: "Le Domaine",
    eyebrow: "Adresse expérientielle",
    summary:
      "Domaine Limoune se raconte comme un lieu de vie : nature, hospitalité marocaine contemporaine, orangers, expériences familiales, gastronomie et événements.",
    heroImage: images.domain,
    heroAlt: "Jardins et orangers du Domaine Limoune",
    seoTitle: "Le Domaine Limoune | Nature, hospitalité et expériences près d'Agadir",
    seoDescription:
      "Histoire, ADN, localisation et univers du Domaine Limoune : un domaine hôtelier premium entre Agadir et Taroudant.",
    seoKeywords: ["domaine hôtelier Maroc", "hôtel près d'Agadir", "hôtel Taroudant"],
    primaryCta: { label: "Découvrir les séjours", href: "/sejours" },
    secondaryCta: { label: "Télécharger la fiche Domaine", href: downloads.factsheet.href, variant: "secondary" },
    sections: [
      {
        eyebrow: "Histoire",
        title: "Un domaine vivant, pas un simple hébergement",
        body:
          "Le Domaine Limoune rassemble suites, lodges, réserve africaine, parc animalier, restaurants, spa, jardins et lieux d'événements dans une destination claire, fluide et élégante.",
      },
      {
        eyebrow: "Localisation",
        title: "Entre Agadir, Taroudant et la lumière des orangers",
        body:
          "Les informations d'accès réunissent les distances depuis Agadir, l'aéroport et Taroudant, le plan du Domaine, les contacts par service et les repères pratiques essentiels.",
        facts: [
          { label: "Accès", value: "Région Agadir - Taroudant, repères transmis à la réservation" },
          { label: "Univers", value: "Hébergement, restauration, spa, parc, réserve, événements" },
          { label: "Positionnement", value: "Nature premium et hospitalité marocaine contemporaine" },
        ],
      },
      {
        eyebrow: "Pôles",
        title: "Une destination, plusieurs expériences",
        body:
          "Chaque univers possède son rythme : séjourner face à la nature, déjeuner sous les orangers, se ressourcer au spa, explorer le parc ou réunir ses invités.",
        cards: universeCards.slice(0, 6),
      },
    ],
    downloads: ["factsheet", "map", "press"],
    gallery: [images.domain, images.stays, images.restaurants, images.park],
  },
  {
    slug: "sejours",
    template: "collection",
    collection: "accommodations",
    title: "Séjours",
    eyebrow: "Suites et lodges",
    summary:
      "Des chambres, suites et lodges pensés pour les couples, familles, séjours premium et expériences safari face à la nature.",
    heroImage: roomImages.capellaSuite,
    heroAlt: "Suite élégante avec matières chaudes et lumière naturelle",
    seoTitle: "Séjours au Domaine Limoune | Suites et lodges safari près d'Agadir",
    seoDescription:
      "Réservez suites, lodges safari avec mezzanine, lodges jardin, suites familiales et hébergements premium au Domaine Limoune près d'Agadir.",
    seoKeywords: ["hôtel Agadir", "lodge safari Maroc", "suite familiale Agadir", "hôtel près d'Agadir"],
    primaryCta: { label: "Vérifier les disponibilités", href: "#booking", track: "booking_widget" },
    secondaryCta: { label: "Brochure hébergement", href: downloads.accommodation.href, variant: "secondary" },
    sections: [
      {
        eyebrow: "Choisir",
        title: "Trouver le rythme juste",
        body:
          "Suite dans les jardins, lodge côté piscine, séjour familial ou nuit plus immersive face à la réserve : chaque catégorie répond à une manière différente de vivre le Domaine.",
        bullets: ["Suites Junior, Exécutives, Familiales et Signature", "Lodges Safari avec mezzanine", "Lodges côté piscine, jardin ou communicants"],
      },
      {
        eyebrow: "Avant le séjour",
        title: "Services, vues et conditions claires",
        body:
          "Capacité, couchage, vue, équipements, horaires d’arrivée, services inclus et accueil des enfants sont indiqués pour comparer sans hésitation.",
        bullets: ["Petit-déjeuner selon offre réservée", "Accès piscine selon horaires", "Restaurants, spa et activités sur demande", "Assistance réservation avant l’arrivée"],
      },
      {
        eyebrow: "Familles et groupes",
        title: "Des configurations pensées pour partager",
        body:
          "Les suites familiales, lodges communicants et hébergements premium permettent de réunir plusieurs générations tout en gardant le calme de chaque espace.",
        cta: { label: "Demander conseil", href: "/contact?type=sejour", variant: "secondary" },
      },
    ],
    downloads: ["accommodation"],
    gallery: [roomImages.capellaSuite, roomImages.deluxeSuite, roomImages.skylineSuite, roomImages.premier, roomImages.tower, roomImages.libertySuite],
    faqs: sharedFaqs,
  },
  {
    slug: "reserve-africaine",
    template: "standard",
    title: "Réserve Africaine",
    eyebrow: "Séjour immersif",
    summary:
      "La Réserve Africaine n'est pas une simple visite. C'est une expérience d'hébergement immersive, pensée autour de la nature, de l'observation et du respect animalier.",
    heroImage: images.reserve,
    heroAlt: "Réserve africaine du Domaine Limoune face aux lodges safari",
    seoTitle: "Réserve Africaine Domaine Limoune | Lodge safari Maroc près d'Agadir",
    seoDescription:
      "Vivez l'expérience réserve africaine du Domaine Limoune : lodges safari, observation, nature et hébergement immersif près d'Agadir.",
    seoKeywords: ["lodge safari Maroc", "réserve africaine Agadir", "hébergement immersif Maroc"],
    primaryCta: { label: "Découvrir les lodges safari", href: "/sejours/lodge-safari-mezzanine" },
    secondaryCta: { label: "Réserver un séjour", href: "/sejours", variant: "secondary" },
    sections: [
      {
        title: "Une réserve liée à l'hébergement",
        body:
          "La réserve se comprend comme un univers de séjour réservé aux clients des lodges concernés. Elle installe un rapport calme à l'animal, à l'observation et au temps long.",
      },
      {
        title: "Règles de respect animalier",
        body:
          "L'expérience repose sur des règles simples : garder les distances, ne pas nourrir les animaux, préserver le calme et suivre les consignes de l'équipe.",
        bullets: ["Non-nourrissage des animaux", "Observation silencieuse", "Respect des zones et horaires", "Accompagnement selon les consignes de l’équipe"],
      },
      {
        title: "Lodges concernés",
        body: "Les lodges safari avec mezzanine et configurations premium sont les points d'entrée naturels vers cet univers.",
        cards: accommodations.slice(0, 2).map(accommodationToCard),
      },
    ],
    gallery: [images.reserve, images.stays, images.park, images.domain],
    faqs: [sharedFaqs[2], sharedFaqs[0]],
  },
  {
    slug: "parc-animalier",
    template: "standard",
    title: "Parc Animalier",
    eyebrow: "Visite familiale et pédagogique",
    summary:
      "Un parcours accessible selon conditions, orienté découverte, pédagogie, conservation et bien-être animal.",
    heroImage: images.park,
    heroAlt: "Parc animalier du Domaine Limoune avec familles et animaux",
    seoTitle: "Parc animalier Agadir | Domaine Limoune",
    seoDescription:
      "Découvrez le parc animalier du Domaine Limoune près d'Agadir : plus de 30 espèces, visite familiale, horaires, tarifs et règles de bien-être animal.",
    seoKeywords: ["parc animalier Agadir", "activités famille Agadir", "zèbres Agadir", "sortie famille Agadir"],
    primaryCta: { label: "Réserver ou contacter", href: "/contact" },
    secondaryCta: { label: "Voir les offres famille", href: "/offres", variant: "secondary" },
    sections: [
      {
        title: "Plus de 30 espèces à découvrir",
        body:
          "Le parcours permet de découvrir zèbres, autruches, antilopes, gazelles, flamants, maki catta, suricates, perroquets, lamas et d'autres espèces selon la présence confirmée sur place.",
      },
      {
        title: "Horaires, tarifs et conditions",
        body:
          "Les informations pratiques présentent les tarifs adultes et enfants, horaires, conditions d'accès, formats de visite et offres famille selon la saison.",
        facts: [
          { label: "Tarifs", value: "Adultes et enfants selon saison" },
          { label: "Accès", value: "Selon calendrier, capacité et conditions du jour" },
          { label: "Règle clé", value: "Ne pas nourrir les animaux" },
        ],
      },
      {
        title: "Une visite douce pour les familles",
        body:
          "Le parcours privilégie la découverte, les pauses, les explications simples et les règles de calme pour que petits et grands profitent du vivant avec attention.",
        bullets: ["Parcours famille", "Temps de visite selon saison", "Offres brunch ou journée selon programmation", "Contact conseillé avant déplacement"],
      },
    ],
    gallery: [images.park, images.domain, images.experiences, images.restaurants],
    faqs: sharedFaqs,
  },
  {
    slug: "restaurants",
    template: "collection",
    collection: "restaurants",
    title: "Restaurants",
    eyebrow: "Un pôle gastronomique complet",
    summary:
      "La restauration du Domaine se présente comme un ensemble d'univers indépendants, chacun avec son ambiance, ses horaires, son menu et son parcours de réservation.",
    heroImage: images.restaurants,
    heroAlt: "Tables et cuisine du Domaine Limoune",
    seoTitle: "Restaurants Domaine Limoune | Brunch, journée piscine et table signature près d'Agadir",
    seoDescription:
      "Découvrez Massa Restaurant, Aman sous les Orangers, Monkey Beach et Limoune Club au Domaine Limoune près d'Agadir.",
    seoKeywords: ["restaurant Agadir nature", "brunch Agadir", "journée piscine Agadir", "restaurant famille Agadir"],
    primaryCta: { label: "Réserver une table", href: "/contact?type=restaurant", track: "restaurant_booking" },
    secondaryCta: { label: "Télécharger les menus", href: downloads.restaurants.href, variant: "secondary" },
    sections: [
      {
        title: "Quatre adresses, quatre moments",
        body:
          "Massa Restaurant, Aman sous les Orangers, Monkey Beach et Limoune Club composent une restauration de séjour, de journée et d’événement.",
        bullets: ["Table signature", "Brunchs et banquets sous les orangers", "Journée piscine et snacking premium", "Soirées, sport et privatisations"],
      },
      {
        title: "Réservations, groupes et privatisations",
        body:
          "Les tables du Domaine peuvent accueillir un déjeuner à deux, un brunch familial, un dîner privé, un banquet, une soirée ou un événement d’entreprise selon disponibilité.",
        cta: { label: "Réserver une table", href: "/contact?type=restaurant" },
        secondaryCta: { label: "Voir les expériences", href: "/experiences", variant: "secondary" },
      },
    ],
    downloads: ["restaurants"],
    gallery: [images.restaurants, images.domain, images.pool, images.agenda],
  },
  {
    slug: "canopy-spa",
    template: "lead",
    form: "spa",
    title: "Canopy Spa",
    eyebrow: "Refuge bien-être premium",
    summary:
      "Canopy Spa est un refuge de lumière et de calme, pensé pour prolonger l'expérience du Domaine à travers soins, hammams, rituels et espaces bien-être.",
    heroImage: images.spa,
    heroAlt: "Canopy Spa avec piscine chauffée, hammam et lumière douce",
    seoTitle: "Spa Agadir | Canopy Spa Domaine Limoune",
    seoDescription:
      "Réservez un soin au Canopy Spa du Domaine Limoune : hammams, cabines, cabine duo, piscine chauffée, jacuzzis, rituels signature et rituels mariage.",
    seoKeywords: ["spa Agadir", "hammam Agadir", "week-end spa près d'Agadir", "spa mariage Agadir"],
    primaryCta: { label: "Réserver un soin", href: "#lead-form", track: "spa_booking" },
    secondaryCta: { label: "Télécharger la carte spa", href: downloads.spa.href, variant: "secondary" },
    sections: [
      {
        eyebrow: "Installations",
        title: "Installations et rituels",
        body:
          "Hammams, cabines, cabine duo, piscine chauffée, jacuzzis, salle de sport, manucure, pédicure, coiffure homme et femme, tisanerie et rituels signature composent le parcours.",
        bullets: ["Horaires soins : 10h - 19h selon calendrier", "Rituels mariage", "Journée Canopy Spa", "Carte spa téléchargeable"],
      },
      {
        eyebrow: "Parcours",
        title: "Une pause seule, en duo ou avant une célébration",
        body:
          "Un soin court, un rituel complet, une cabine duo ou une préparation mariage permettent d’intégrer le spa dans un séjour, une journée ou un événement.",
        facts: [
          { label: "Formats", value: "Soin, hammam, rituel, duo" },
          { label: "Ambiance", value: "Calme, lumière, tisanerie" },
          { label: "Réservation", value: "Créneau conseillé à l’avance" },
        ],
      },
      {
        eyebrow: "Invitation",
        title: "Prolonger le soin par une table ou une nuit",
        body:
          "Canopy Spa dialogue naturellement avec les suites, les restaurants et les offres saisonnières pour composer une parenthèse complète.",
        cta: { label: "Réserver un soin", href: "#lead-form" },
        secondaryCta: { label: "Voir les offres spa", href: "/offres", variant: "secondary" },
      },
    ],
    downloads: ["spa"],
    gallery: [images.spa, images.domain, images.pool, images.weddings],
  },
  {
    slug: "experiences",
    template: "collection",
    collection: "experiences",
    title: "Expériences",
    eyebrow: "Signature Limoune",
    summary:
      "Des moments à composer selon l’âge, la saison et l’envie : plein air, famille, gastronomie, sport, calme ou soirée sous les étoiles.",
    heroImage: images.experiences,
    heroAlt: "Activités de plein air et expériences signature au Domaine Limoune",
    seoTitle: "Activités famille Agadir | Expériences Domaine Limoune",
    seoDescription:
      "Safari Limoune, parc animalier, cheval au coucher du soleil, quad, padel, club enfants, pique-nique, barbecue, dîner sous les étoiles et expériences famille près d'Agadir.",
    seoKeywords: ["activités famille Agadir", "activité équipe Agadir", "quad Agadir", "brunch Agadir"],
    primaryCta: { label: "Réserver une expérience", href: "/contact?type=activites" },
    secondaryCta: { label: "Voir l'agenda", href: "/agenda", variant: "secondary" },
    sections: [
      {
        eyebrow: "Composer",
        title: "Des formats pour chaque public",
        body:
          "Familles, couples, groupes et entreprises peuvent choisir une expérience douce, sportive, gourmande ou nocturne selon la saison et les disponibilités.",
        bullets: ["Safari Limoune et parc animalier", "Cheval au coucher du soleil, quad, padel et tennis", "Club enfants, chasse au trésor et cinéma familial", "Pique-nique, barbecue, dîner sous les étoiles, atelier cuisine et mixologie"],
      },
      {
        eyebrow: "Conseil",
        title: "Réserver le bon moment",
        body:
          "Certaines expériences dépendent de la météo, de l’âge des participants, de l’encadrement et du calendrier. L’équipe confirme le meilleur créneau avant votre venue.",
        cta: { label: "Réserver une expérience", href: "/contact?type=activites" },
        secondaryCta: { label: "Voir l'agenda", href: "/agenda", variant: "secondary" },
      },
    ],
    gallery: [images.experiences, images.park, images.pool, images.agenda],
  },
  {
    slug: "mariages",
    template: "lead",
    form: "wedding",
    title: "Mariages",
    eyebrow: "Mariage destination",
    summary:
      "Une célébration pensée dans le détail : cérémonie, dîner, soirée, brunch, spa, hébergement des invités et coordination sur mesure.",
    heroImage: images.weddings,
    heroAlt: "Mariage premium sous les orangers au Domaine Limoune",
    seoTitle: "Mariage Agadir | Domaine Limoune",
    seoDescription:
      "Organisez votre mariage près d'Agadir au Domaine Limoune : lieux, cérémonie, dîner, soirée, brunch, rituel spa mariage, hébergement invités et devis personnalisé.",
    seoKeywords: ["mariage Agadir", "lieu mariage Maroc", "mariage destination Agadir", "mariage sous les orangers"],
    primaryCta: { label: "Demander un devis mariage", href: "#lead-form", track: "wedding_lead" },
    secondaryCta: { label: "Télécharger la brochure", href: downloads.wedding.href, variant: "secondary" },
    sections: [
      {
        eyebrow: "Célébration",
        title: "Un parcours complet pour les futurs mariés",
        body:
          "Cérémonie, dîner, soirée, brunch du lendemain, rituels mariage et hébergement des invités se composent autour de votre nombre d’invités et de l’atmosphère souhaitée.",
        bullets: ["Choix date souhaitée et alternative", "Nombre d'invités", "Budget indicatif", "Document d'inspiration ou plan d'intention"],
      },
      {
        eyebrow: "Moments",
        title: "Des lieux pour chaque temps fort",
        body:
          "Les jardins, les orangers, les restaurants, les espaces de soirée et les hébergements permettent de construire une célébration fluide, de l’arrivée des invités au lendemain.",
        facts: [
          { label: "Cérémonie", value: "Jardins et espaces extérieurs" },
          { label: "Réception", value: "Dîner, soirée, brunch" },
          { label: "Invités", value: "Hébergement selon disponibilité" },
        ],
      },
      {
        eyebrow: "Bien-être",
        title: "Rituels mariage et préparation",
        body:
          "Canopy Spa accompagne la préparation des mariés et des proches avec soins, coiffure, manucure, cabine duo et rituels dédiés.",
        cta: { label: "Demander un devis mariage", href: "#lead-form" },
        secondaryCta: { label: "Voir Canopy Spa", href: "/canopy-spa", variant: "secondary" },
      },
    ],
    downloads: ["wedding"],
    gallery: [images.weddings, images.domain, images.restaurants, images.spa],
  },
  {
    slug: "evenements-entreprise",
    template: "lead",
    form: "corporate",
    title: "Événements d’entreprise",
    eyebrow: "Séminaires nature",
    summary:
      "Une destination complète pour séminaires, activités d’équipe, réunions, déjeuners, dîners d’entreprise, privatisations et activités de groupe.",
    heroImage: images.corporate,
    heroAlt: "Séminaire et événement d’entreprise au Domaine Limoune",
    seoTitle: "Séminaire Agadir | Événements d’entreprise Domaine Limoune",
    seoDescription:
      "Organisez séminaire, activité d’équipe, réunion, déjeuner d’entreprise ou privatisation au Domaine Limoune près d'Agadir.",
    seoKeywords: ["séminaire Agadir", "activité équipe Agadir", "événement entreprise Maroc", "privatisation Agadir"],
    primaryCta: { label: "Demander un devis entreprise", href: "#lead-form", track: "corporate_rfp" },
    secondaryCta: { label: "Brochure entreprise", href: downloads.corporate.href, variant: "secondary" },
    sections: [
      {
        eyebrow: "Formats",
        title: "Une journée de travail qui respire",
        body:
          "Réunion, séminaire, déjeuner, dîner, activité d’équipe ou privatisation peuvent s’organiser dans un cadre naturel qui alterne concentration, respiration et partage.",
        facts: [
          { label: "Formats", value: "Séminaire, réunion, banquet, cocktail, activité d’équipe" },
          { label: "Besoins", value: "Technique, restauration, hébergement, activités" },
          { label: "Demande", value: "Accompagnement par l’équipe événements" },
        ],
      },
      {
        eyebrow: "Équipe",
        title: "Activités, table et hébergement au même endroit",
        body:
          "Après une session de travail, les équipes peuvent prolonger la journée avec un déjeuner, une activité de plein air, une visite, un dîner ou une nuit sur place.",
        bullets: ["Activités d’équipe et plein air", "Restaurants et pauses gourmandes", "Hébergement selon disponibilité", "Privatisation sur demande"],
        cta: { label: "Demander un devis entreprise", href: "#lead-form" },
      },
    ],
    downloads: ["corporate"],
    gallery: [images.corporate, images.domain, images.restaurants, images.experiences],
  },
  {
    slug: "offres",
    template: "collection",
    collection: "offers",
    title: "Offres",
    eyebrow: "Saisons et rituels",
    summary:
      "Des offres saisonnières claires, désirables et segmentées, sans logique de discount agressif.",
    heroImage: images.offers,
    heroAlt: "Offres saisonnières du Domaine Limoune",
    seoTitle: "Offres Domaine Limoune | Séjours, spa, famille et journée piscine près d'Agadir",
    seoDescription:
      "Découvrez les offres du Domaine Limoune : Séjour Été Limoune, Séjour Famille, Canopy Spa, Brunch et parc animalier, Journée piscine et Safari Lodge.",
    seoKeywords: ["offre hôtel Agadir", "journée piscine Agadir", "séjour famille Agadir", "offre spa Agadir"],
    primaryCta: { label: "Découvrir les offres", href: "#collection" },
    secondaryCta: { label: "Contacter l'équipe", href: "/contact", variant: "secondary" },
    sections: [
      {
        eyebrow: "Choisir",
        title: "Séjour, journée ou rituel de saison",
        body:
          "Chaque offre met en avant un moment précis : dormir au Domaine, venir en famille, profiter du spa, déjeuner sous les orangers ou vivre une journée piscine.",
      },
      {
        eyebrow: "Conditions",
        title: "Une proposition claire avant de réserver",
        body:
          "Les dates, services inclus, conditions enfants, modalités de réservation et possibilités de prolonger l’expérience sont indiqués pour choisir sereinement.",
        cta: { label: "Découvrir les offres", href: "#collection" },
        secondaryCta: { label: "Demander conseil", href: "/contact", variant: "secondary" },
      },
    ],
    gallery: [images.offers, images.pool, images.stays, images.spa],
  },
  {
    slug: "agenda",
    template: "collection",
    collection: "agenda",
    title: "Agenda",
    eyebrow: "Programmation du Domaine",
    summary:
      "Brunchs, soirées, diffusions sportives, activations été, événements enfants, Ramadan, Été Limoune, dîners thématiques, concerts et soirées musicales.",
    heroImage: images.agenda,
    heroAlt: "Programmation et événements saisonniers au Domaine Limoune",
    seoTitle: "Agenda Domaine Limoune | Brunchs, soirées et événements près d'Agadir",
    seoDescription:
      "Consultez la programmation du Domaine Limoune : brunchs, soirées, diffusions sportives, événements enfants, Ramadan, Été Limoune et dîners thématiques.",
    seoKeywords: ["brunch Agadir", "soirée Agadir", "agenda Agadir", "événements famille Agadir"],
    primaryCta: { label: "Réserver un événement", href: "/contact?type=agenda" },
    secondaryCta: { label: "Voir les offres", href: "/offres", variant: "secondary" },
    sections: [
      {
        eyebrow: "Rendez-vous",
        title: "Choisir une date par univers",
        body:
          "L’agenda rassemble les temps forts par saison et par ambiance : brunchs, soirées, enfants, sport, dîners thématiques et activations spéciales.",
        bullets: ["Brunchs et déjeuners sous les orangers", "Soirées et dîners thématiques", "Événements enfants et vacances", "Diffusions sportives et rendez-vous saisonniers"],
        cta: { label: "Réserver un événement", href: "/contact?type=agenda" },
      },
    ],
    gallery: [images.agenda, images.restaurants, images.pool, images.domain],
  },
  {
    slug: "contact",
    template: "lead",
    form: "contact",
    title: "Contact",
    eyebrow: "Une demande, le bon service",
    summary:
      "Chaque demande est orientée vers le bon service : séjour, restaurant, spa, mariage, entreprise, parc animalier, activités, presse ou informations générales.",
    heroImage: images.domain,
    heroAlt: "Accueil et contact Domaine Limoune",
    seoTitle: "Contact Domaine Limoune | Réservations, spa, restaurants, mariages et événements",
    seoDescription:
      "Contactez le Domaine Limoune par service : hébergement, restaurants, Canopy Spa, mariages, entreprise, parc animalier, activités, presse et informations générales.",
    seoKeywords: ["contact Domaine Limoune", "réservation Domaine Limoune", "restaurant Agadir réservation"],
    primaryCta: { label: "Choisir votre demande", href: "#lead-form" },
    secondaryCta: { label: "Télécharger la fiche Domaine", href: downloads.factsheet.href, variant: "secondary" },
    sections: [
      {
        eyebrow: "Orientation",
        title: "Choisir le bon interlocuteur",
        body:
          "Séjour, restaurant, spa, mariage, entreprise, activités, parc animalier, presse ou informations générales : votre demande arrive directement à l’équipe concernée.",
        bullets: departments,
      },
      {
        eyebrow: "Avant d’écrire",
        title: "Les informations utiles à transmettre",
        body:
          "Une date, le nombre de personnes, le type de moment souhaité et vos coordonnées permettent à l’équipe de répondre plus vite et plus précisément.",
        facts: [
          { label: "Séjour", value: "Dates, adultes, enfants, catégorie souhaitée" },
          { label: "Table ou spa", value: "Date, horaire, nombre de personnes" },
          { label: "Événement", value: "Format, invités, budget indicatif" },
        ],
      },
    ],
    downloads: ["factsheet", "map"],
    gallery: [images.domain, images.stays, images.restaurants, images.spa],
  },
  {
    slug: "journal",
    template: "standard",
    title: "Journal du Domaine",
    eyebrow: "Carnets et inspirations",
    summary:
      "Une rubrique éditoriale pour raconter les saisons, les coulisses, les animaux, les recettes, les expériences famille, les mariages, le bien-être et la presse.",
    heroImage: images.agenda,
    heroAlt: "Carnets éditoriaux du Domaine Limoune",
    seoTitle: "Journal du Domaine Limoune | Guides, nouveautés et expériences près d'Agadir",
    seoDescription:
      "Carnets, guides et inspirations : que faire en famille près d'Agadir, mariage, safari, brunch, séminaire nature et week-end spa.",
    seoKeywords: ["que faire en famille Agadir", "week-end spa Agadir", "brunch sous les orangers"],
    primaryCta: { label: "Voir les expériences", href: "/experiences" },
    sections: [
      {
        title: "Articles prioritaires",
        body:
          "Les premiers contenus recommandés : Que faire en famille près d'Agadir, Où organiser un mariage près d'Agadir, Expérience safari au Domaine Limoune, Brunch sous les orangers, Séminaire nature au Maroc.",
      },
    ],
  },
  {
    slug: "presse",
    template: "standard",
    title: "Espace Presse",
    eyebrow: "Médias et relations presse",
    summary:
      "Un espace pour présenter le Domaine, ses communiqués, photos officielles, dossier presse, logos, contacts médias, articles parus et distinctions.",
    heroImage: images.corporate,
    heroAlt: "Espace presse Domaine Limoune",
    seoTitle: "Presse Domaine Limoune | Dossier presse et contacts médias",
    seoDescription:
      "Téléchargez le dossier presse du Domaine Limoune et accédez aux contacts médias, photos officielles, communiqués et informations institutionnelles.",
    seoKeywords: ["presse Domaine Limoune", "dossier presse hôtel Maroc", "photos officielles Domaine Limoune"],
    primaryCta: { label: "Télécharger le dossier presse", href: downloads.press.href },
    sections: [
      {
        title: "Kit presse",
        body:
          "Le kit presse réunit une présentation courte, communiqués, photos officielles, logos, contacts presse, articles parus et distinctions.",
      },
    ],
    downloads: ["press", "factsheet"],
  },
];

const legalPages: SitePage[] = [
  ["mentions-legales", "Mentions légales"],
  ["politique-confidentialite", "Politique de confidentialité"],
  ["conditions-generales", "Conditions générales de vente"],
  ["conditions-reservation", "Conditions de réservation"],
  ["politique-annulation", "Politique d'annulation"],
  ["politique-cookies", "Politique cookies"],
  ["recrutement", "Recrutement"],
].map(([slug, title]) => ({
  slug,
  template: "standard" as const,
  title,
  eyebrow: "Institutionnel",
  summary:
    "Retrouvez les informations légales et institutionnelles du Domaine Limoune.",
  heroImage: images.domain,
  heroAlt: `${title} Domaine Limoune`,
  seoTitle: `${title} | Domaine Limoune`,
  seoDescription: `${title} du site officiel du Domaine Limoune.`,
  seoKeywords: [title, "Domaine Limoune"],
  primaryCta: { label: "Contacter l'équipe", href: "/contact" },
  sections: [
    {
      title: "Informations institutionnelles",
      body:
        "Les informations officielles, documents, coordonnées et dates de mise à jour sont présentés pour une consultation claire.",
    },
  ],
}));

function accommodationToCard(item: (typeof accommodations)[number]): Card {
  return {
    title: item.name,
    href: `/sejours/${item.slug}`,
    eyebrow: item.category,
    text: item.emotionalText,
    image: item.image,
    alt: `${item.name} au Domaine Limoune`,
    cta: "Voir la fiche",
    meta: item.meta,
  };
}

function restaurantToCard(item: (typeof restaurants)[number]): Card {
  return {
    title: item.name,
    href: `/restaurants/${item.slug}`,
    eyebrow: item.cuisine,
    text: item.position,
    image: item.image,
    alt: `${item.name} au Domaine Limoune`,
    cta: "Voir le restaurant",
    meta: item.meta,
  };
}

function tupleToCard(
  item: readonly [string, string, string],
  index: number,
  parent: string,
  image: string,
): Card {
  return {
    title: item[0],
    href: parent,
    eyebrow: item[2],
    text: item[1],
    image,
    alt: `${item[0]} au Domaine Limoune`,
    cta: "Contacter l'équipe",
    meta: [`Durée selon saison`, `Réservation conseillée`, `Moment ${index + 1}`],
  };
}

const accommodationPages: SitePage[] = accommodations.map((item) => ({
  slug: `sejours/${item.slug}`,
  template: "detail" as const,
  title: item.name,
  eyebrow: item.category,
  summary: item.position,
  heroImage: item.image,
  heroAlt: `${item.name} au Domaine Limoune`,
  seoTitle: `${item.name} | Hébergement Domaine Limoune près d'Agadir`,
  seoDescription: `${item.position} Galerie, capacité, surface, couchages, vue, équipements, services inclus, conditions enfants et réservation.`,
  seoKeywords: [item.name, item.category, "hébergement Domaine Limoune", "hôtel Agadir", "lodge safari Maroc"],
  primaryCta: { label: "Réserver", href: "/sejours#booking", track: "room_booking" },
  secondaryCta: { label: "Demander plus d'informations", href: "/contact?type=sejour", variant: "secondary" },
  gallery: item.gallery,
  details: [
    { label: "Catégorie", value: item.category },
    { label: "Capacité", value: item.capacity },
    { label: "Surface", value: item.surface },
    { label: "Couchage", value: item.bed },
    { label: "Vue", value: item.view },
    { label: "Check-in", value: item.checkIn },
    { label: "Check-out", value: item.checkOut },
  ],
  sections: [
    {
      title: "Description complète",
      body: item.emotionalText,
    },
    {
      title: "Informations pratiques",
      body: "Les informations essentielles sont regroupées pour comparer rapidement les configurations et préparer la réservation.",
      facts: [
        { label: "Capacité", value: item.capacity },
        { label: "Surface", value: item.surface },
        { label: "Type de lit", value: item.bed },
        { label: "Vue", value: item.view },
        { label: "Check-in", value: item.checkIn },
        { label: "Check-out", value: item.checkOut },
      ],
    },
    {
      title: "Équipements",
      body: "Chaque fiche détaille les équipements disponibles ou confirmables selon l’unité attribuée.",
      bullets: item.amenities,
    },
    {
      title: "Services inclus",
      body: "Les services inclus peuvent varier selon l’offre, la saison et la configuration réservée.",
      bullets: item.servicesIncluded,
    },
    {
      title: "Conditions enfants",
      body: item.childConditions,
    },
    {
      title: "Expériences accessibles pendant le séjour",
      body:
        "Selon disponibilité : parc animalier, piscine, restaurants, Canopy Spa, club enfants, salle de sport, activités de plein air et expériences saisonnières.",
      cards: universeCards.slice(1, 5),
    },
    {
      title: "Réserver cet hébergement",
      body: "Choisissez vos dates ou demandez plus d’informations à l’équipe réservation pour confirmer la meilleure configuration disponible.",
      cta: { label: "Réserver", href: "/sejours#booking", track: "room_booking_section" },
      secondaryCta: { label: "Demander plus d'informations", href: "/contact?type=sejour", variant: "secondary" },
    },
    {
      title: "Suggestions liées et hébergements similaires",
      body: "Découvrez d'autres hébergements proches pour choisir le séjour qui correspond le mieux à votre rythme.",
      cards: accommodations.filter((candidate) => candidate.slug !== item.slug).slice(0, 3).map(accommodationToCard),
    },
  ],
  downloads: ["accommodation"],
}));

const restaurantPages: SitePage[] = restaurants.map((item) => ({
  slug: `restaurants/${item.slug}`,
  template: "lead" as const,
  form: "restaurant" as const,
  title: item.name,
  eyebrow: "Restaurant du Domaine",
  summary: item.position,
  heroImage: item.image,
  heroAlt: `${item.name} au Domaine Limoune`,
  seoTitle: `${item.name} | Restaurant Domaine Limoune près d'Agadir`,
  seoDescription: `${item.position} Ambiance, cuisine, horaires, menus, réservation et privatisation possible.`,
  seoKeywords: [item.name, "restaurant Agadir nature", "brunch Agadir", "Domaine Limoune"],
  primaryCta: { label: "Réserver une table", href: "#lead-form", track: "restaurant_detail_booking" },
  secondaryCta: { label: "Télécharger le menu", href: downloads.restaurants.href, variant: "secondary" },
  details: [
    { label: "Cuisine", value: item.cuisine },
    { label: "Horaires", value: item.hours },
    { label: "Privatisation", value: "Possible selon disponibilité" },
  ],
  sections: [
    {
      title: "Ambiance et positionnement",
      body: item.position,
      bullets: item.meta,
    },
    {
      title: "Expériences liées",
      body:
        "Déjeuner, dîner, brunch, journée piscine, dîner privé, groupe ou événement saisonnier peuvent être rattachés au parcours de réservation.",
      cards: universeCards.filter((card) => ["Expériences", "Mariages", "Événements d’entreprise"].includes(card.title)),
    },
  ],
  downloads: ["restaurants"],
}));

export const allPages: SitePage[] = [
  ...basePages,
  ...accommodationPages,
  ...restaurantPages,
  ...legalPages,
];

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && (locales as readonly string[]).includes(value));
}

export function normalizeLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function splitSlug(path: string): string[] {
  return path ? path.split("/").filter(Boolean) : [];
}

export function slugToPath(slug: string[] | undefined): string {
  return (slug ?? []).filter(Boolean).join("/");
}

export function localizedHref(locale: Locale, href: string): string {
  if (href.startsWith("http") || href.startsWith("#") || href.startsWith("/assets")) {
    return href;
  }

  if (href === "/") {
    return `/${locale}`;
  }

  return `/${locale}${href}`;
}

export function getPageBySlug(locale: Locale, slug: string[] | undefined): SitePage | null {
  void locale;
  const path = slugToPath(slug);
  return allPages.find((page) => page.slug === path) ?? null;
}

export function getCollectionCards(collection: CollectionKey): Card[] {
  if (collection === "accommodations") {
    return accommodations.map(accommodationToCard);
  }

  if (collection === "restaurants") {
    return restaurants.map(restaurantToCard);
  }

  if (collection === "experiences") {
    return experiences.map((item, index) => tupleToCard(item, index, "/experiences", images.experiences));
  }

  if (collection === "offers") {
    return offers.map((item, index) => tupleToCard(item, index, "/offres", images.offers));
  }

  return agendaEvents.map((item, index) => tupleToCard(item, index, "/agenda", images.agenda));
}

export function getStaticPageParams(): { locale: Locale; slug: string[] }[] {
  return locales.flatMap((locale) =>
    allPages.map((page) => ({ locale, slug: splitSlug(page.slug) })),
  );
}

export function getPageUrl(locale: Locale, page: SitePage): string {
  const slug = page.slug ? `/${page.slug}` : "";
  return `${baseUrl}/${locale}${slug}`;
}

export function getAlternateLanguages(page: SitePage): Record<string, string> {
  return Object.fromEntries(locales.map((locale) => [locale, getPageUrl(locale, page)]));
}

export function getBreadcrumbs(locale: Locale, page: SitePage) {
  const parts = splitSlug(page.slug);
  const items = [{ name: "Accueil", url: `${baseUrl}/${locale}` }];
  let current = "";

  for (const part of parts) {
    current = current ? `${current}/${part}` : part;
    const found = allPages.find((candidate) => candidate.slug === current);
    items.push({
      name: found?.title ?? part.replace(/-/g, " "),
      url: `${baseUrl}/${locale}/${current}`,
    });
  }

  return items;
}

function absoluteImageUrl(src: string) {
  return src.startsWith("http") ? src : `${baseUrl}${src}`;
}

export function buildStructuredData(locale: Locale, page: SitePage) {
  const pageUrl = getPageUrl(locale, page);
  const breadcrumbs = getBreadcrumbs(locale, page);

  const baseGraph: Record<string, unknown>[] = [
    {
      "@type": "Hotel",
      "@id": `${baseUrl}/#hotel`,
      name: "Domaine Limoune",
      url: `${baseUrl}/${locale}`,
      image: absoluteImageUrl(images.hero),
      description:
        "Domaine hôtelier expérientiel près d'Agadir réunissant hébergement, réserve africaine, parc animalier, restaurants, Canopy Spa, mariages, événements et activités.",
      amenityFeature: [
        "Hébergement",
        "Réserve africaine",
        "Parc animalier",
        "Restaurants",
        "Spa",
        "Mariages",
        "Séminaires",
      ].map((name) => ({ "@type": "LocationFeatureSpecification", name })),
      address: {
        "@type": "PostalAddress",
        addressCountry: "MA",
        addressRegion: "Souss-Massa",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.seoTitle,
      description: page.seoDescription,
      inLanguage: locale,
      isPartOf: { "@id": `${baseUrl}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  ];

  if (page.collection === "agenda") {
    baseGraph.push({
      "@type": "EventSeries",
      "@id": `${pageUrl}#agenda`,
      name: "Agenda Domaine Limoune",
      url: pageUrl,
      description: page.summary,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": baseGraph,
  };
}
