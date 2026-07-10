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

const pexels = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;

export const images = {
  hero: "https://capellahotels.com/assets/img/site_images/ubud/ubud-home01.jpg",
  domain: "https://capellahotels.com/assets/img/site_images/ubud/Capella-Ubud-Top-01.jpg",
  stays: "https://capellahotels.com/assets/img/site_images/ubud/Capella_Ubud_One_Bedroom_Keliki_Valley_Tent1.jpg",
  reserve: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=2400",
  reserveLodge: "https://capellahotels.com/assets/img/site_images/ubud/ubud-accommodation-tent-river-exterior.jpg",
  reserveCanopy: "https://images.pexels.com/photos/59989/pexels-photo-59989.jpeg?auto=compress&cs=tinysrgb&w=2400",
  reserveLandscape: "https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg?auto=compress&cs=tinysrgb&w=2400",
  park: "https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&w=2400",
  parkScenic: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=2400",
  parkWalk: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=2400",
  restaurants: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Dining-Brasserie-1930-01a.jpg",
  restaurantMassa: "https://capellahotels.com/assets/img/site_images/sydney/brasserie-1930-sydney-cbd-restaurant.jpg",
  restaurantAman: "https://capellahotels.com/assets/img/site_images/sydney/Aperture_6599_740x1080.jpg",
  restaurantMonkey: "https://capellahotels.com/assets/img/site_images/sydney/Pool_6720_LR.jpg",
  restaurantClub: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Mcrae-Bar-01.jpg",
  restaurantPrivate: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Brasserie-1930-2024-01a.jpg",
  restaurantContact: "https://capellahotels.com/assets/img/site_images/sydney/group-dining-911x1366.jpg",
  restaurantGalleryOne: "https://capellahotels.com/assets/img/site_images/sydney/Brasserie_8012026_2.jpg",
  restaurantGalleryTwo: "https://capellahotels.com/assets/img/site_images/sydney/Alicia_Taylor_Aperture_Seafood_3.jpg",
  restaurantGalleryThree: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Mcrae-Bar-g04.jpg",
  restaurantGalleryFour: "https://capellahotels.com/assets/img/site_images/ubud/CPUBU_ROMANTIC_DINNER_000-14_V2l.jpg",
  restaurantGalleryFive: "https://capellahotels.com/assets/img/site_images/sydney/Brasserie-1930-Alla_Chitarra.jpg",
  spa: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Wellness-A-01.jpg",
  spaConcept: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Wellness-Right-02.jpg",
  spaJourney: "https://capellahotels.com/assets/img/site_images/sydney/Auriga_7412_LR.jpg",
  spaRitual: "https://capellahotels.com/assets/img/site_images/bangkok/Capella-Bangkok-Wellness-02b.jpg",
  spaBridal: "https://capellahotels.com/assets/img/site_images/ubud/ubud-wellness-auriga-treatmentroom-01.jpg",
  spaContact: "https://capellahotels.com/assets/img/site_images/bangkok/Capella-Bangkok-Wellness-01a.jpg",
  spaGalleryOne: "https://capellahotels.com/assets/img/site_images/ubud/Capella_Ubud-Bali_by_Georg-Roske__11751_LowRes.jpg",
  spaGalleryTwo: "https://capellahotels.com/assets/img/site_images/ubud/ubud_wellness_soulreborn.jpg",
  spaGalleryThree: "https://capellahotels.com/assets/img/site_images/bangkok/Capella-Bangkok-Wellness-03b.jpg",
  spaGalleryFour: "https://capellahotels.com/assets/img/site_images/ubud/Capella_Ubud-Bali_by_Georg-Roske__455_LowRes.jpg",
  spaGalleryFive: "https://capellahotels.com/assets/img/site_images/ubud/ubud-wellness-auriga-treatmentroom-02.jpg",
  summer: "https://capellahotels.com/assets/img/site_images/bangkok/Capella-Bangkok-Homepage-Gallery-04.jpg",
  pool: "https://capellahotels.com/assets/img/site_images/ubud/Capella-Ubud-Homepage-Gallery-06.jpg",
  experiences: pexels("1268855"),
  experienceSafari: pexels("247431"),
  experienceSunsetRide: pexels("1631665"),
  experienceSport: pexels("3768916"),
  experienceFamily: pexels("4252137"),
  experienceDiningStars: pexels("1267320"),
  experienceSpaDay: pexels("3757957"),
  weddings: "https://capellahotels.com/assets/img/site_images/sydney/Capella-Sydney-Private-Dining.jpg",
  corporate: pexels("3184291"),
  corporateMeeting: pexels("3184431"),
  corporateTeam: pexels("3184465"),
  corporateDinner: pexels("1833336"),
  corporateSpaces: pexels("3184360"),
  offers: pexels("346885"),
  offerStay: pexels("2608517"),
  offerFamily: pexels("1024960"),
  offerSpa: pexels("3757657"),
  offerPool: pexels("3997983"),
  offerBrunch: pexels("70497"),
  offerSafari: pexels("667205"),
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
    href: "/",
    description: "Destination nature aux portes d'Agadir.",
  },
  {
    label: "Séjours & Lodges",
    href: "/sejours",
    description: "Suites, lodges safari et hébergements familiaux.",
  },
  {
    label: "Safari Experience",
    href: "/reserve-africaine",
    description: "Lodges safari face à la réserve africaine.",
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
    description: "Soins, hammams, piscine chauffée et espaces détente.",
  },
  {
    label: "Mariages & Événements",
    href: "/mariages",
    description: "Mariages, séminaires, privatisations et célébrations.",
  },
  {
    label: "Offres",
    href: "/offres",
    description: "Offres saisonnières sans logique de discount agressif.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Contacter le bon service.",
  },
];

const navItemsEn: typeof navItems = [
  {
    label: "The Domaine",
    href: "/",
    description: "A nature destination at the gates of Agadir.",
  },
  {
    label: "Stays & Lodges",
    href: "/sejours",
    description: "Suites, safari lodges and family accommodation.",
  },
  {
    label: "Safari Experience",
    href: "/reserve-africaine",
    description: "Safari lodges facing the African reserve.",
  },
  {
    label: "Wildlife Park",
    href: "/parc-animalier",
    description: "A family-friendly, educational visit that respects living nature.",
  },
  {
    label: "Restaurants",
    href: "/restaurants",
    description: "Massa, Aman sous les Orangers, Monkey Beach and Limoune Club.",
  },
  {
    label: "Canopy Spa",
    href: "/canopy-spa",
    description: "Treatments, hammams, heated pool and relaxation spaces.",
  },
  {
    label: "Weddings & Events",
    href: "/mariages",
    description: "Weddings, seminars, private events and celebrations.",
  },
  {
    label: "Offers",
    href: "/offres",
    description: "Seasonal offers without aggressive discount language.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Contact the right department.",
  },
];

export function getNavItems(locale: Locale) {
  return locale === "en" ? navItemsEn : navItems;
}

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

const footerLinksEn: typeof footerLinks = [
  { label: "Agenda", href: "/agenda" },
  { label: "Domaine Journal", href: "/journal" },
  { label: "Press", href: "/presse" },
  { label: "Careers", href: "/recrutement" },
  { label: "Legal notice", href: "/mentions-legales" },
  { label: "Privacy", href: "/politique-confidentialite" },
  { label: "Terms & conditions", href: "/conditions-generales" },
  { label: "Cookies", href: "/politique-cookies" },
];

export function getFooterLinks(locale: Locale) {
  return locale === "en" ? footerLinksEn : footerLinks;
}

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
    category: "Une pause élégante dans les jardins",
    position: "Des suites confortables pour vivre Le Domaine Limoune en couple, en famille ou lors d’une escapade près d’Agadir.",
    emotionalText: "Des suites confortables pour vivre Le Domaine Limoune en couple, en famille ou lors d’une escapade près d’Agadir.",
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
    checkIn: "À partir de 15h00",
    checkOut: "Jusqu’à 12h00",
  },
  {
    slug: "lodge-safari-mezzanine",
    name: "Lodges Safari avec mezzanine",
    category: "L’expérience signature",
    position: "Des lodges familiaux face à la réserve africaine, pensés pour vivre l’esprit Safari Experience avec confort et immersion.",
    emotionalText: "Des lodges familiaux face à la réserve africaine, pensés pour vivre l’esprit Safari Experience avec confort et immersion.",
    image: images.reserveLodge,
    gallery: [images.reserveLodge, images.reserveCanopy, roomImages.capellaSuite, roomImages.libertySuite],
    capacity: "Jusqu'à 4 personnes",
    surface: "Surface selon configuration",
    bed: "Lit double et couchages mezzanine",
    view: "Vue réserve africaine",
    meta: ["Famille", "Réserve", "Petit-déjeuner", "Piscine"],
    amenities: ["Mezzanine", "Salle de bain équipée", "Climatisation", "Terrasse ou extérieur selon lodge", "Wi-Fi", "Rangements famille", "Salle de sport selon conditions"],
    servicesIncluded: ["Petit-déjeuner inclus selon offre", "Accès piscine selon horaires", "Accès parc animalier selon conditions", "Kids club selon calendrier", "Activités selon disponibilité", "Assistance conciergerie", "Stationnement selon disponibilité"],
    childConditions: "Adapté aux familles. Surveillance parentale requise sur mezzanine, lit bébé sur demande et activités enfants selon calendrier.",
    checkIn: "À partir de 15h00",
    checkOut: "Jusqu’à 12h00",
  },
  {
    slug: "lodges-cote-piscine-ou-jardin",
    name: "Lodges côté piscine ou jardin",
    category: "Le séjour facile à vivre",
    position: "Des lodges proches des espaces de journée pour alterner piscine, repos, restaurants et moments en famille.",
    emotionalText: "Des lodges proches des espaces de journée pour alterner piscine, repos, restaurants et moments en famille.",
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
    checkIn: "À partir de 15h00",
    checkOut: "Jusqu’à 12h00",
  },
  {
    slug: "suite-junior",
    name: "Suite Junior",
    category: "Le format idéal pour une escapade",
    position: "Une chambre généreuse, une atmosphère calme et un accès simple aux différents univers du Domaine.",
    emotionalText: "Une chambre généreuse, une atmosphère calme et un accès simple aux différents univers du Domaine.",
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
    checkIn: "À partir de 15h00",
    checkOut: "Jusqu’à 12h00",
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
    checkIn: "À partir de 15h00",
    checkOut: "Jusqu’à 12h00",
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
    checkIn: "À partir de 15h00",
    checkOut: "Jusqu’à 12h00",
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
    checkIn: "À partir de 15h00",
    checkOut: "Jusqu’à 12h00",
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
    checkIn: "À partir de 15h00",
    checkOut: "Jusqu’à 12h00",
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
    checkIn: "À partir de 15h00",
    checkOut: "Jusqu’à 12h00",
  },
] satisfies Accommodation[];

const accommodationsEn: Record<string, Omit<Accommodation, "slug" | "image" | "gallery">> = {
  suites: {
    name: "Suites",
    category: "An elegant pause in the gardens",
    position: "Comfortable suites for experiencing Le Domaine Limoune as a couple, as a family or on an escape near Agadir.",
    emotionalText: "Comfortable suites for experiencing Le Domaine Limoune as a couple, as a family or on an escape near Agadir.",
    capacity: "2 guests, depending on configuration",
    surface: "Surface area depending on suite and availability",
    bed: "King bed or twin beds on request",
    view: "Gardens, Domaine or landscaped areas",
    meta: ["Suite", "Couple", "Gardens", "Comfort"],
    amenities: ["Equipped bathroom", "Air conditioning", "Wi-Fi", "Lounge or relaxation corner depending on unit", "Storage", "Welcome amenities"],
    servicesIncluded: ["Personalised welcome", "Breakfast according to the offer", "Pool access according to opening hours", "Concierge assistance", "Parking subject to availability"],
    childConditions: "Children accepted depending on suite configuration. Baby cot or additional bedding available on request and subject to availability.",
    checkIn: "From 3:00 pm",
    checkOut: "Until 12:00 pm",
  },
  "lodge-safari-mezzanine": {
    name: "Safari Lodges with mezzanine",
    category: "The signature experience",
    position: "Family lodges facing the African reserve, designed to live the Safari Experience with comfort and immersion.",
    emotionalText: "Family lodges facing the African reserve, designed to live the Safari Experience with comfort and immersion.",
    capacity: "Up to 4 guests",
    surface: "Surface area depending on configuration",
    bed: "Double bed and mezzanine bedding",
    view: "African reserve view",
    meta: ["Family", "Reserve", "Breakfast", "Pool"],
    amenities: ["Mezzanine", "Equipped bathroom", "Air conditioning", "Terrace or outdoor area depending on lodge", "Wi-Fi", "Family storage", "Fitness room subject to conditions"],
    servicesIncluded: ["Breakfast included according to the offer", "Pool access according to opening hours", "Wildlife park access subject to conditions", "Kids club according to schedule", "Activities subject to availability", "Concierge assistance", "Parking subject to availability"],
    childConditions: "Suited to families. Parental supervision required on the mezzanine, baby cot on request and children's activities according to schedule.",
    checkIn: "From 3:00 pm",
    checkOut: "Until 12:00 pm",
  },
  "lodges-cote-piscine-ou-jardin": {
    name: "Poolside or garden lodges",
    category: "An easy-to-live stay",
    position: "Lodges close to the daytime spaces, alternating pool time, rest, restaurants and family moments.",
    emotionalText: "Lodges close to the daytime spaces, alternating pool time, rest, restaurants and family moments.",
    capacity: "2 to 3 guests",
    surface: "Surface area depending on lodge and availability",
    bed: "Double bed or twin beds, additional bedding depending on configuration",
    view: "Pool or gardens",
    meta: ["Pool", "Garden", "Couple", "Daytime"],
    amenities: ["Terrace or outdoor access", "Equipped bathroom", "Air conditioning", "Wi-Fi", "Relaxation corner", "Welcome amenities"],
    servicesIncluded: ["Breakfast according to the offer", "Pool access according to opening hours", "Restaurant booking assistance", "Parking subject to availability", "Concierge service"],
    childConditions: "One child may be accommodated depending on configuration. Additional bedding and baby equipment available on request.",
    checkIn: "From 3:00 pm",
    checkOut: "Until 12:00 pm",
  },
  "suite-junior": {
    name: "Junior Suite",
    category: "The ideal escape format",
    position: "A generous room, a calm atmosphere and easy access to the different worlds of the Domaine.",
    emotionalText: "A generous room, a calm atmosphere and easy access to the different worlds of the Domaine.",
    capacity: "2 guests",
    surface: "Surface area depending on unit",
    bed: "King bed or twin beds",
    view: "Domaine or gardens",
    meta: ["Couple", "Comfort", "Short stay"],
    amenities: ["Lounge or reading corner", "Equipped bathroom", "Wi-Fi", "Air conditioning", "Minibar according to offer", "Welcome amenities"],
    servicesIncluded: ["Personalised welcome", "Breakfast according to the offer", "Pool access according to opening hours", "Concierge assistance", "Priority booking subject to availability"],
    childConditions: "Mainly designed for two guests. Baby cot available on request subject to availability.",
    checkIn: "From 3:00 pm",
    checkOut: "Until 12:00 pm",
  },
  "suite-executive": {
    name: "Executive Suite",
    category: "Executive suites",
    position: "A more spacious suite designed for work, hosting or extending the stay without losing the Domaine's calm.",
    emotionalText: "A more spacious suite designed for work, hosting or extending the stay without losing the Domaine's calm.",
    capacity: "2 to 3 guests",
    surface: "Surface area depending on unit",
    bed: "King bed, additional bedding depending on configuration",
    view: "Gardens or Domaine",
    meta: ["Executive", "Prestige", "Long stay", "Business"],
    amenities: ["Lounge area", "Desk", "Wi-Fi", "Air conditioning", "Equipped bathroom", "Storage", "Minibar according to offer"],
    servicesIncluded: ["Personalised welcome", "Breakfast according to the offer", "Concierge assistance", "Pool access according to opening hours", "Support organising a meeting or table subject to availability"],
    childConditions: "Children welcomed depending on configuration. Additional bedding available on request and subject to availability.",
    checkIn: "From 3:00 pm",
    checkOut: "Until 12:00 pm",
  },
  "suite-familiale": {
    name: "Family Suite",
    category: "Family suites",
    position: "A comfortable layout for families who want to experience the Domaine without compromise.",
    emotionalText: "Everyone finds their rhythm: children explore, parents breathe, and the suite becomes the anchor point of the stay.",
    capacity: "Up to 5 guests",
    surface: "Surface area depending on unit",
    bed: "Double bed and children's bedding",
    view: "Gardens or Domaine",
    meta: ["Family", "Kids club", "Wildlife park", "Pool"],
    amenities: ["Separate spaces depending on unit", "Equipped bathroom", "Air conditioning", "Wi-Fi", "Children's options", "Family storage"],
    servicesIncluded: ["Breakfast according to the offer", "Pool access according to opening hours", "Wildlife park access subject to conditions", "Kids club according to schedule", "Family activity assistance"],
    childConditions: "Designed for families. Baby cot, children's bedding and children's activities according to age, schedule and availability.",
    checkIn: "From 3:00 pm",
    checkOut: "Until 12:00 pm",
  },
  "suite-signature": {
    name: "Signature Suite",
    category: "Signature suites",
    position: "The reference suite for a more exclusive, sensory and generous experience.",
    emotionalText: "A more intimate address, conceived as a rare interlude with attentive service, warm materials and privileged access to the Domaine rituals.",
    capacity: "2 guests",
    surface: "Large suite subject to availability",
    bed: "King bed",
    view: "Domaine, gardens or horizon",
    meta: ["Signature", "Couple", "Spa", "Prestige"],
    amenities: ["Lounge", "Terrace depending on unit", "Equipped bathroom", "Air conditioning", "Wi-Fi", "Premium welcome amenities", "Storage"],
    servicesIncluded: ["Personalised welcome", "Breakfast according to the offer", "Concierge assistance", "Spa access according to offer", "Priority booking subject to availability"],
    childConditions: "Recommended for adults or couples. Children welcomed only depending on configuration and validation by the reservations team.",
    checkIn: "From 3:00 pm",
    checkOut: "Until 12:00 pm",
  },
  "lodges-communicants": {
    name: "Connecting Lodges",
    category: "Connecting lodges",
    position: "A practical premium solution for large families, groups or multi-generational stays.",
    emotionalText: "Two nearby spaces, one shared experience: everyone keeps their privacy while enjoying the Domaine's key moments together.",
    capacity: "Depending on lodge combination",
    surface: "Depending on configuration",
    bed: "Several bedding options depending on combination",
    view: "Gardens, pool or reserve depending on availability",
    meta: ["Connecting", "Family", "Groups", "Flexible"],
    amenities: ["Flexible configurations", "Equipped bathrooms", "Air conditioning", "Wi-Fi", "Outdoor spaces depending on lodges", "Storage"],
    servicesIncluded: ["Group booking assistance", "Breakfast according to the offer", "Pool access according to opening hours", "Activity coordination", "Parking subject to availability"],
    childConditions: "Suited to large families. Children's allocation depends on age, capacity and validation by the reservations team.",
    checkIn: "From 3:00 pm",
    checkOut: "Until 12:00 pm",
  },
  "suite-lodge-premium": {
    name: "Premium suite or lodge",
    category: "Premium suites or lodges",
    position: "A premium selection for travellers seeking more space, calm and personalisation.",
    emotionalText: "The stay becomes smoother and more generous, with a level of attention suited to special occasions and longer pauses.",
    capacity: "2 to 4 guests depending on unit",
    surface: "Large surface area depending on assigned suite or lodge",
    bed: "King bed, twin beds or additional bedding depending on configuration",
    view: "Gardens, Domaine, pool or reserve depending on availability",
    meta: ["Premium", "Tailored", "Occasion", "Long stay"],
    amenities: ["Lounge space", "Equipped bathroom", "Air conditioning", "Wi-Fi", "Terrace or outdoor area depending on unit", "Premium welcome amenities"],
    servicesIncluded: ["Personalised welcome", "Breakfast according to the offer", "Concierge assistance", "Pool access according to opening hours", "Support organising spa, dining or experiences"],
    childConditions: "Children's conditions depend on the assigned suite or lodge. Baby cot and additional bedding available on request, subject to capacity.",
    checkIn: "From 3:00 pm",
    checkOut: "Until 12:00 pm",
  },
};

export function localizeAccommodation(item: Accommodation, locale: Locale): Accommodation {
  if (locale !== "en") return item;

  const copy = accommodationsEn[item.slug];
  return copy ? { ...item, ...copy } : item;
}

export function getAccommodationBySlug(locale: Locale, slug: string): Accommodation | null {
  const item = accommodations.find((candidate) => candidate.slug === slug) ?? null;
  return item ? localizeAccommodation(item, locale) : null;
}

export const restaurants = [
  {
    slug: "massa-restaurant",
    name: "Massa Restaurant",
    position: "Le restaurant signature du Domaine, entre cuisine soignée, service attentif et art de vivre marocain contemporain.",
    image: images.restaurantMassa,
    cuisine: "Cuisine signature et produits de saison",
    hours: "Déjeuner et dîner selon calendrier",
    meta: ["Signature", "Déjeuner", "Dîner privé"],
  },
  {
    slug: "aman-sous-les-orangers",
    name: "Aman sous les Orangers",
    position: "Un lieu de partage pour brunchs, banquets, déjeuners de groupe et événements sous les orangers.",
    image: images.restaurantAman,
    cuisine: "Brunchs, banquets et cuisine conviviale",
    hours: "Selon programmation et privatisation",
    meta: ["Brunch", "Groupes", "Orangers"],
  },
  {
    slug: "monkey-beach",
    name: "Monkey Beach",
    position: "L'univers piscine, détente, snacking, pool access et journée famille du Domaine.",
    image: images.restaurantMonkey,
    cuisine: "Food, drinks, pool access et snacking premium",
    hours: "Horaires saisonniers",
    meta: ["Journée piscine", "Famille", "Été"],
  },
  {
    slug: "limoune-club",
    name: "Limoune Club",
    position: "Un espace de soirée, sport, détente, cheminée, diffusions de matchs et événements privés.",
    image: images.restaurantClub,
    cuisine: "Cuisine, boissons, programmation et privatisations",
    hours: "Selon programmation",
    meta: ["Soirée", "Sport", "Privatisation"],
  },
];

export const experiences = [
  ["Safari Experience", "Observation, nature et immersion face aux animaux du Domaine.", "Familles, couples, clients hébergement"],
  ["Parc animalier", "Un parcours familial et pédagogique autour de plus de 30 espèces selon conditions.", "Familles, visiteurs journée"],
  ["Balade à cheval sunset", "Une sortie de fin de journée dans la lumière chaude de la région.", "Couples, familles, groupes"],
  ["Quad", "Une activité de plein air encadrée pour découvrir les alentours autrement.", "Adultes, groupes, activités d’équipe"],
  ["Padel", "Un moment sportif facile à intégrer au séjour, à la journée ou au team building.", "Familles, entreprises"],
  ["Tennis", "Un format actif pour couples, familles, groupes et clients hébergement.", "Familles, clients séjour"],
  ["Kids Club", "Un espace enfants pensé pour rassurer les parents et enrichir la journée.", "Familles"],
  ["Treasure Hunt", "Une chasse au trésor scénarisée pour découvrir le Domaine en équipe.", "Enfants, familles, groupes"],
  ["Picnic Experience", "Un panier gourmand dans un décor naturel et calme.", "Couples, familles"],
  ["BBQ Experience", "Une expérience conviviale de groupe autour du feu et des jardins.", "Groupes, entreprises"],
  ["Dîner sous les étoiles", "Un dîner privatisable dans une atmosphère nocturne élégante.", "Couples, événements"],
  ["Tea Time sous les orangers", "Une pause douce et sensorielle au coeur des plantations.", "Locaux, familles, visiteurs"],
  ["Brunch familial", "Une table généreuse sous les orangers pour familles, groupes et visiteurs journée.", "Familles, groupes"],
  ["Pool Day", "Une journée piscine, food and drinks et détente autour de Monkey Beach.", "Familles, clients journée"],
  ["Canopy Spa Day", "Une journée wellness associant soin, eau, hammam et calme.", "Couples, spa, séjour"],
  ["Family Cinema Under the Stars", "Une soirée familiale avec projection en plein air.", "Familles, enfants"],
  ["Cooking class", "Atelier autour des saveurs du Domaine et de la cuisine locale.", "Tour-opérateurs, familles"],
  ["Mixologie", "Atelier boissons pour groupes, soirées privées ou événements d’entreprise.", "Adultes, groupes"],
  ["Activités enfants", "Des activités adaptées à l’âge, au calendrier et aux conditions du jour.", "Enfants, familles"],
] as const;

export const offers = [
  ["Offre Été Limoune", "Une offre saisonnière pour profiter des lodges, de la piscine, du parc animalier et des expériences famille.", "Saison été"],
  ["Offre Famille", "Un séjour pensé pour les parents et les enfants, avec hébergement confortable, activités et moments de partage.", "Famille"],
  ["Escapade Canopy Spa", "Une parenthèse bien-être autour du spa, du hammam, des soins et des espaces de détente du Canopy.", "Spa"],
  ["Brunch & Parc Animalier", "Une journée complète entre table, nature et découverte familiale.", "Restaurant"],
  ["Pool Day", "Accès piscine, cuisine, boissons et détente autour de Monkey Beach.", "Journée"],
  ["Safari Lodge Experience", "L'offre dédiée aux lodges face à la réserve africaine.", "Séjours"],
  ["Stay Longer", "Une proposition premium pour prolonger le séjour sans discours promotionnel agressif.", "Long séjour"],
  ["Offre Résidents Maroc", "Un avantage ponctuel pour la clientèle locale et nationale.", "Résidents"],
  ["Offre Juin", "Un temps fort saisonnier à activer selon calendrier commercial.", "Saison"],
  ["Offre Ramadan", "Une proposition dédiée aux tables, séjours et moments familiaux du Ramadan.", "Saison"],
  ["Offre Fin d’année", "Une offre événementielle pour séjours, dîners et célébrations de fin d’année.", "Saison"],
] as const;

const offersEn = [
  ["Limoune Summer Offer", "A seasonal offer to enjoy the lodges, pool, wildlife park and family experiences.", "Summer season"],
  ["Family Offer", "A stay designed for parents and children, with comfortable accommodation, activities and shared moments.", "Family"],
  ["Canopy Spa Escape", "A wellness break around the spa, hammam, treatments and Canopy relaxation spaces.", "Spa"],
  ["Brunch & Wildlife Park", "A full day between dining, nature and family discovery.", "Restaurant"],
  ["Pool Day", "Pool access, food, drinks and relaxation around Monkey Beach.", "Day experience"],
  ["Safari Lodge Experience", "The offer dedicated to lodges facing the African reserve.", "Stays"],
  ["Stay Longer", "A premium invitation to extend your stay without aggressive promotional wording.", "Long stay"],
  ["Morocco Residents Offer", "A limited advantage for local and national guests.", "Residents"],
  ["June Offer", "A seasonal highlight activated according to the commercial calendar.", "Season"],
  ["Ramadan Offer", "A proposal dedicated to dining, stays and family moments during Ramadan.", "Season"],
  ["Year-End Offer", "An event-led offer for stays, dinners and year-end celebrations.", "Season"],
] as const;

export const agendaEvents = [
  ["Brunch familial", "Aman sous les Orangers", "Chaque dimanche selon saison"],
  ["Été au Domaine Limoune", "Piscine, parc animalier et activités", "Pendant l’été"],
  ["Diffusions sportives", "Limoune Club", "Selon calendrier"],
  ["Dîners thématiques", "Massa Restaurant", "Programmation mensuelle"],
  ["Événements enfants", "Club enfants", "Vacances et week-ends"],
  ["Ramadan au Domaine", "Restaurants et jardins", "Selon calendrier religieux"],
] as const;

const agendaEventsEn = [
  ["Family brunch", "Aman sous les Orangers", "Every Sunday depending on the season"],
  ["Summer at Le Domaine Limoune", "Pool, wildlife park and activities", "During summer"],
  ["Sports screenings", "Limoune Club", "According to schedule"],
  ["Themed dinners", "Massa Restaurant", "Monthly programme"],
  ["Children's events", "Kids Club", "Holidays and weekends"],
  ["Ramadan at the Domaine", "Restaurants and gardens", "According to the religious calendar"],
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

const departmentsEn: typeof departments = [
  "Accommodation reservations",
  "Restaurants",
  "Canopy Spa",
  "Weddings",
  "Corporate events",
  "Wildlife park",
  "Activities",
  "Press",
  "Sales department",
  "General information",
];

export function getDepartments(locale: Locale) {
  return locale === "en" ? departmentsEn : departments;
}

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

const sharedFaqsEn: Faq[] = [
  {
    question: "Is Le Domaine Limoune suitable for families?",
    answer:
      "Yes. The Domaine brings together family accommodation, the wildlife park, pool, children's activities, kids club and outdoor experiences depending on availability.",
  },
  {
    question: "Can I visit for the day without staying overnight?",
    answer:
      "Yes, depending on each area and access conditions: restaurants, wildlife park, pool day, spa and activities may offer dedicated day experiences.",
  },
  {
    question: "Is the African Reserve the same as the Wildlife Park?",
    answer:
      "No. The African Reserve is linked to the immersive accommodation experience. The Wildlife Park is the family visit route available under specific conditions.",
  },
];

const basePages: SitePage[] = [
  {
    slug: "",
    template: "home",
    title: "Le Domaine Limoune",
    eyebrow: "Le Domaine Limoune",
    summary:
      "Aux portes d’Agadir, Le Domaine Limoune réunit lodges safari, réserve africaine, parc animalier, restaurants, spa et expériences en pleine nature.",
    heroImage: images.hero,
    heroAlt: "Lodges safari, réserve et nature au Domaine Limoune",
    seoTitle: "Safari Experience près d’Agadir | Le Domaine Limoune",
    seoDescription:
      "Vivez Le Domaine Limoune près d’Agadir : lodges safari, réserve africaine, parc animalier, restaurants, Canopy Spa, activités, mariages et événements.",
    seoKeywords: [
      "hôtel Agadir",
      "lodge safari Maroc",
      "parc animalier Agadir",
      "spa Agadir",
      "mariage Agadir",
      "séminaire Agadir",
    ],
    primaryCta: { label: "Réserver votre séjour", href: "/sejours", track: "book_stay" },
    secondaryCta: { label: "Découvrir Safari Experience", href: "/reserve-africaine", variant: "secondary" },
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
      "Le Domaine Limoune se raconte comme un lieu de vie : nature, hospitalité marocaine contemporaine, orangers, expériences familiales, gastronomie et événements.",
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
    title: "Dormir au Domaine Limoune",
    eyebrow: "Séjours & Lodges",
    summary:
      "Suites, lodges et hébergements safari aux portes d’Agadir.",
    heroImage: roomImages.capellaSuite,
    heroAlt: "Suite élégante avec matières chaudes et lumière naturelle",
    seoTitle: "Séjours & lodges près d’Agadir | Le Domaine Limoune",
    seoDescription:
      "Séjournez au Domaine Limoune près d’Agadir : suites, lodges safari, hébergements famille, réserve africaine, parc animalier, restaurants, spa et expériences nature.",
    seoKeywords: ["séjour près d’Agadir", "lodge safari Maroc", "lodge avec réserve africaine", "hôtel nature Agadir", "séjour famille Agadir", "parc animalier Agadir", "spa et hébergement Agadir", "Le Domaine Limoune"],
    primaryCta: { label: "Vérifier les disponibilités", href: "#booking", track: "booking_widget" },
    secondaryCta: { label: "Voir la brochure hébergement", href: downloads.accommodation.href, variant: "secondary" },
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
    heroAlt: "Zèbres dans une réserve verdoyante, ambiance safari immersive",
    seoTitle: "Réserve Africaine | Le Domaine Limoune près d'Agadir",
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
        cards: accommodations.slice(0, 2).map((item) => accommodationToCard(item)),
      },
    ],
    gallery: [images.reserveLodge, images.reserveCanopy, images.reserveLandscape, images.park],
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
    heroAlt: "Girafes dans un paysage naturel, parcours animalier familial",
    seoTitle: "Parc animalier Agadir | Le Domaine Limoune",
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
    gallery: [images.parkScenic, images.parkWalk, images.domain, images.experiences],
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
    seoTitle: "Restaurants | Le Domaine Limoune près d'Agadir",
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
    gallery: [images.restaurantGalleryOne, images.restaurantGalleryTwo, images.restaurantGalleryThree, images.restaurantGalleryFour, images.restaurantGalleryFive],
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
    seoTitle: "Spa Agadir | Canopy Spa du Domaine Limoune",
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
    gallery: [images.spaGalleryOne, images.spaGalleryTwo, images.spaGalleryThree, images.spaGalleryFour, images.spaGalleryFive],
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
    seoTitle: "Activités famille Agadir | Le Domaine Limoune",
    seoDescription:
      "Safari Experience, parc animalier, équitation, quad, padel, kids club, pique-nique, barbecue, dîner sous les étoiles et activités famille près d'Agadir.",
    seoKeywords: ["activités famille Agadir", "activité équipe Agadir", "quad Agadir", "brunch Agadir"],
    primaryCta: { label: "Réserver une expérience", href: "/contact?type=activites" },
    secondaryCta: { label: "Voir l'agenda", href: "/agenda", variant: "secondary" },
    sections: [
      {
        eyebrow: "Composer",
        title: "Des formats pour chaque public",
        body:
          "Familles, couples, groupes et entreprises peuvent choisir une expérience douce, sportive, gourmande ou nocturne selon la saison et les disponibilités.",
        bullets: ["Safari Experience et parc animalier", "Équitation, quad, padel et tennis", "Kids club, chasse au trésor et cinéma familial", "Pique-nique, barbecue, dîner sous les étoiles, atelier cuisine et mixologie"],
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
    gallery: [images.experienceSafari, images.experienceSunsetRide, images.experienceSport, images.experienceFamily, images.experienceDiningStars, images.experienceSpaDay],
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
    seoTitle: "Mariage Agadir | Le Domaine Limoune",
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
    seoTitle: "Séminaire Agadir | Événements d’entreprise au Domaine Limoune",
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
    gallery: [images.corporateMeeting, images.corporateTeam, images.corporateDinner, images.corporateSpaces],
  },
  {
    slug: "offres",
    template: "collection",
    collection: "offers",
    title: "Offres",
    eyebrow: "Saisons et offres",
    summary:
      "Des offres saisonnières claires et désirables, sans logique de discount agressif.",
    heroImage: images.offers,
    heroAlt: "Offres saisonnières du Domaine Limoune",
    seoTitle: "Offres du Domaine Limoune | Séjours, spa et famille près d'Agadir",
    seoDescription:
      "Découvrez les offres du Domaine Limoune : Offre Été Limoune, Offre Famille, Escapade Canopy Spa, brunch, parc animalier, journée piscine et lodges safari.",
    seoKeywords: ["offre hôtel Agadir", "journée piscine Agadir", "séjour famille Agadir", "offre spa Agadir"],
    primaryCta: { label: "Découvrir les offres", href: "#collection" },
    secondaryCta: { label: "Contacter l'équipe", href: "/contact", variant: "secondary" },
    sections: [
      {
        eyebrow: "Choisir",
        title: "Séjour, journée ou offre de saison",
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
    gallery: [images.offerStay, images.offerFamily, images.offerSpa, images.offerPool, images.offerBrunch, images.offerSafari],
  },
  {
    slug: "agenda",
    template: "collection",
    collection: "agenda",
    title: "Agenda",
    eyebrow: "Programmation du Domaine",
    summary:
      "Brunchs, soirées, diffusions sportives, activités enfants, Ramadan, Été au Domaine Limoune, dîners thématiques, concerts et soirées musicales.",
    heroImage: images.agenda,
    heroAlt: "Programmation et événements saisonniers au Domaine Limoune",
    seoTitle: "Agenda du Domaine Limoune | Brunchs et soirées près d'Agadir",
    seoDescription:
      "Consultez la programmation du Domaine Limoune : brunchs, soirées, diffusions sportives, activités enfants, Ramadan, Été au Domaine Limoune et dîners thématiques.",
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
    eyebrow: "Contact rapide",
    summary:
      "Chaque demande est orientée vers le bon service : séjour, restaurant, spa, mariage, entreprise, parc animalier, activités, presse ou informations générales.",
    heroImage: images.domain,
    heroAlt: "Accueil et contact Le Domaine Limoune",
    seoTitle: "Contact Le Domaine Limoune | Réservations, spa et restaurants",
    seoDescription:
      "Contactez le Domaine Limoune par service : hébergement, restaurants, Canopy Spa, mariages, entreprise, parc animalier, activités, presse et informations générales.",
    seoKeywords: ["contact Le Domaine Limoune", "réservation Le Domaine Limoune", "restaurant Agadir réservation"],
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
    seoTitle: "Presse | Le Domaine Limoune",
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

const pageCopyEn: Record<string, Partial<SitePage>> = {
  "": {
    title: "Le Domaine Limoune",
    eyebrow: "Le Domaine Limoune",
    summary:
      "At the gates of Agadir, Le Domaine Limoune brings together safari lodges, an African reserve, wildlife park, restaurants, spa and nature experiences.",
    heroAlt: "Safari lodges, reserve and nature at Le Domaine Limoune",
    seoTitle: "Safari Experience near Agadir | Le Domaine Limoune",
    seoDescription:
      "Experience Le Domaine Limoune near Agadir: safari lodges, African reserve, wildlife park, restaurants, Canopy Spa, activities, weddings and events.",
    seoKeywords: [
      "hotel Agadir",
      "safari lodge Morocco",
      "wildlife park Agadir",
      "spa Agadir",
      "wedding Agadir",
      "seminar Agadir",
    ],
    primaryCta: { label: "Book your stay", href: "/sejours", track: "book_stay" },
    secondaryCta: { label: "Discover Safari Experience", href: "/reserve-africaine", variant: "secondary" },
    faqs: sharedFaqsEn,
  },
  sejours: {
    title: "Stay at Le Domaine Limoune",
    eyebrow: "Stays & Lodges",
    summary:
      "Suites, lodges and safari accommodation at the gates of Agadir.",
    heroAlt: "Elegant suite with warm materials and natural light",
    seoTitle: "Stays & lodges near Agadir | Le Domaine Limoune",
    seoDescription:
      "Stay at Le Domaine Limoune near Agadir: suites, safari lodges, family accommodation, African reserve, wildlife park, restaurants, spa and nature experiences.",
    seoKeywords: ["stay near Agadir", "safari lodge Morocco", "lodge with African reserve", "nature hotel Agadir", "family stay Agadir", "wildlife park Agadir", "spa and accommodation Agadir", "Le Domaine Limoune"],
    primaryCta: { label: "Check availability", href: "#booking", track: "booking_widget" },
    secondaryCta: { label: "View accommodation brochure", href: downloads.accommodation.href, variant: "secondary" },
    sections: [
      {
        eyebrow: "Choose",
        title: "Find the right rhythm",
        body:
          "A garden suite, a poolside lodge, a family stay or a more immersive night facing the reserve: each category responds to a different way of experiencing the Domaine.",
        bullets: ["Junior, Executive, Family and Signature Suites", "Safari Lodges with mezzanine", "Poolside, garden or connecting lodges"],
      },
      {
        eyebrow: "Before the stay",
        title: "Clear services, views and conditions",
        body:
          "Capacity, bedding, view, amenities, arrival times, included services and children's conditions are shown so you can compare without hesitation.",
        bullets: ["Breakfast according to the booked offer", "Pool access according to opening hours", "Restaurants, spa and activities on request", "Reservation assistance before arrival"],
      },
      {
        eyebrow: "Families and groups",
        title: "Configurations designed for sharing",
        body:
          "Family suites, connecting lodges and premium accommodation make it possible to bring several generations together while preserving the calm of each space.",
        cta: { label: "Ask for advice", href: "/contact?type=sejour", variant: "secondary" },
      },
    ],
    faqs: sharedFaqsEn,
  },
};

function localizeAccommodationPage(page: SitePage, locale: Locale): SitePage {
  const slug = page.slug.replace("sejours/", "");
  const item = getAccommodationBySlug(locale, slug);

  if (!item) return page;

  const practicalFacts = [
    { label: "Capacity", value: item.capacity },
    { label: "Surface area", value: item.surface },
    { label: "Bedding", value: item.bed },
    { label: "View", value: item.view },
    { label: "Check-in", value: item.checkIn },
    { label: "Check-out", value: item.checkOut },
  ];

  return {
    ...page,
    title: item.name,
    eyebrow: item.category,
    summary: item.position,
    heroAlt: `${item.name} at Le Domaine Limoune`,
    seoTitle: `${item.name} | Accommodation at Le Domaine Limoune near Agadir`,
    seoDescription: `${item.position} Gallery, capacity, surface area, bedding, view, amenities, included services, children's conditions and booking.`,
    seoKeywords: [item.name, item.category, "Le Domaine Limoune accommodation", "hotel Agadir", "safari lodge Morocco"],
    primaryCta: { label: "Book", href: "/sejours#booking", track: "room_booking" },
    secondaryCta: { label: "Request more information", href: "/contact?type=sejour", variant: "secondary" },
    details: [
      { label: "Category", value: item.category },
      ...practicalFacts,
    ],
    sections: [
      {
        title: "Full description",
        body: item.emotionalText,
      },
      {
        title: "Practical information",
        body: "Essential information is grouped together so you can compare configurations quickly and prepare your booking.",
        facts: practicalFacts,
      },
      {
        title: "Amenities",
        body: "Each page details the amenities available or confirmable depending on the assigned unit.",
        bullets: item.amenities,
      },
      {
        title: "Included services",
        body: "Included services may vary depending on the offer, season and booked configuration.",
        bullets: item.servicesIncluded,
      },
      {
        title: "Children's conditions",
        body: item.childConditions,
      },
      {
        title: "Experiences available during the stay",
        body: "Subject to availability: wildlife park, pool, restaurants, Canopy Spa, kids club, fitness room, outdoor activities and seasonal experiences.",
      },
      {
        title: "Book this accommodation",
        body: "Choose your dates or request more information from the reservations team to confirm the best available configuration.",
        cta: { label: "Book", href: "/sejours#booking", track: "room_booking_section" },
        secondaryCta: { label: "Request more information", href: "/contact?type=sejour", variant: "secondary" },
      },
      {
        title: "Related suggestions and similar accommodation",
        body: "Discover other nearby accommodation options to choose the stay that best matches your rhythm.",
        cards: accommodations.filter((candidate) => candidate.slug !== item.slug).slice(0, 3).map((candidate) => accommodationToCard(candidate, locale)),
      },
    ],
  };
}

function localizePage(page: SitePage, locale: Locale): SitePage {
  if (locale !== "en") return page;

  if (page.slug.startsWith("sejours/")) return localizeAccommodationPage(page, locale);

  const copy = pageCopyEn[page.slug];
  return copy ? { ...page, ...copy } : page;
}

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
  seoTitle: `${title} | Le Domaine Limoune`,
  seoDescription: `${title} du site officiel du Domaine Limoune.`,
  seoKeywords: [title, "Le Domaine Limoune"],
  primaryCta: { label: "Contacter l'équipe", href: "/contact" },
  sections: [
    {
      title: "Informations institutionnelles",
      body:
        "Les informations officielles, documents, coordonnées et dates de mise à jour sont présentés pour une consultation claire.",
    },
  ],
}));

type AccommodationCardCopy = {
  name: string;
  category: string;
  emotionalText: string;
  meta: string[];
};

function getAccommodationCardCopy(item: (typeof accommodations)[number], locale: Locale): AccommodationCardCopy {
  const copy = localizeAccommodation(item, locale);

  return {
    name: copy.name,
    category: copy.category,
    emotionalText: copy.emotionalText,
    meta: copy.meta,
  };
}

function accommodationToCard(item: (typeof accommodations)[number], locale: Locale = defaultLocale): Card {
  const copy = getAccommodationCardCopy(item, locale);

  return {
    title: copy.name,
    href: `/sejours/${item.slug}`,
    eyebrow: copy.category,
    text: copy.emotionalText,
    image: item.image,
    alt: locale === "en" ? `${copy.name} at Le Domaine Limoune` : `${copy.name} au Domaine Limoune`,
    cta: locale === "en" ? "View details" : "Voir la fiche",
    meta: copy.meta,
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
  locale: Locale = defaultLocale,
): Card {
  const isEn = locale === "en";

  return {
    title: item[0],
    href: parent,
    eyebrow: item[2],
    text: item[1],
    image,
    alt: isEn ? `${item[0]} at Le Domaine Limoune` : `${item[0]} au Domaine Limoune`,
    cta: isEn ? "Contact the team" : "Contacter l'équipe",
    meta: isEn ? ["Duration by season", "Booking recommended", `Moment ${index + 1}`] : [`Durée selon saison`, `Réservation conseillée`, `Moment ${index + 1}`],
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
      cards: accommodations.filter((candidate) => candidate.slug !== item.slug).slice(0, 3).map((item) => accommodationToCard(item)),
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
  const path = slugToPath(slug);
  const page = allPages.find((candidate) => candidate.slug === path) ?? null;
  return page ? localizePage(page, locale) : null;
}

export function getCollectionCards(collection: CollectionKey, locale: Locale = defaultLocale): Card[] {
  const experienceImages = [
    images.experienceSafari,
    images.experienceSunsetRide,
    images.experienceSport,
    images.experienceFamily,
    images.experienceDiningStars,
    images.experienceSpaDay,
  ];
  const offerImages = [
    images.offerStay,
    images.offerFamily,
    images.offerSpa,
    images.offerBrunch,
    images.offerPool,
    images.offerSafari,
  ];

  if (collection === "accommodations") {
    return accommodations.map((item) => accommodationToCard(item, locale));
  }

  if (collection === "restaurants") {
    return restaurants.map(restaurantToCard);
  }

  if (collection === "experiences") {
    return experiences.map((item, index) => tupleToCard(item, index, "/experiences", experienceImages[index % experienceImages.length], locale));
  }

  if (collection === "offers") {
    const source = locale === "en" ? offersEn : offers;
    return source.map((item, index) => tupleToCard(item, index, "/offres", offerImages[index % offerImages.length], locale));
  }

  const source = locale === "en" ? agendaEventsEn : agendaEvents;
  return source.map((item, index) => tupleToCard(item, index, "/agenda", images.agenda, locale));
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
  const items = [{ name: locale === "en" ? "Home" : "Accueil", url: `${baseUrl}/${locale}` }];
  let current = "";

  for (const part of parts) {
    current = current ? `${current}/${part}` : part;
    const found = getPageBySlug(locale, splitSlug(current));
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
  const hotelDescription = locale === "en"
    ? "Nature destination near Agadir bringing together lodges, African reserve, wildlife park, restaurants, Canopy Spa, weddings, events and activities."
    : "Destination nature près d'Agadir réunissant lodges, réserve africaine, parc animalier, restaurants, Canopy Spa, mariages, événements et activités.";
  const amenityFeature = locale === "en"
    ? ["Accommodation", "African reserve", "Wildlife park", "Restaurants", "Spa", "Weddings", "Seminars"]
    : ["Hébergement", "Réserve africaine", "Parc animalier", "Restaurants", "Spa", "Mariages", "Séminaires"];

  const baseGraph: Record<string, unknown>[] = [
    {
      "@type": "Hotel",
      "@id": `${baseUrl}/#hotel`,
      name: "Le Domaine Limoune",
      url: `${baseUrl}/${locale}`,
      image: absoluteImageUrl(images.hero),
      description: hotelDescription,
      amenityFeature: amenityFeature.map((name) => ({ "@type": "LocationFeatureSpecification", name })),
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
      name: "Agenda Le Domaine Limoune",
      url: pageUrl,
      description: page.summary,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": baseGraph,
  };
}
