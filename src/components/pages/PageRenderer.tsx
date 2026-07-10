import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Clock,
  Download,
  FileText,
  MapPinned,
  Play,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LeadForm } from "@/components/forms/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import { ExperienceShowcaseCard } from "@/components/pages/ExperienceShowcaseCard";
import { StayCatalog } from "@/components/pages/StayCatalog";
import { StayDetailGallery } from "@/components/pages/StayDetailGallery";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  accommodations,
  departments,
  downloads,
  getAccommodationBySlug,
  getCollectionCards,
  heroVideos,
  images,
  localizedHref,
  restaurants,
  type Accommodation,
  type Card,
  type ContentSection,
  type DetailFact,
  type Locale,
  type SitePage,
} from "@/lib/content";

type PageRendererProps = {
  page: SitePage;
  locale: Locale;
};

type StorySection = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  href: string;
  cta: string;
  facts?: DetailFact[];
};

const homeStoriesByLocale: Record<"fr" | "en", StorySection[]> = {
  fr: [
    {
      eyebrow: "Séjours & Lodges",
      title: "Dormir au cœur de la nature",
      text: "Suites et lodges pour les couples, les familles et les séjours face à la réserve africaine.",
      image: images.stays,
      alt: "Suites et lodges du Domaine Limoune",
      href: "/sejours",
      cta: "Découvrir les séjours",
      facts: [
        { label: "Ambiance", value: "Suites, lodges, jardins" },
        { label: "Pour", value: "Couples, familles, groupes" },
        { label: "CTA", value: "Réserver un séjour" },
      ],
    },
    {
      eyebrow: "Safari Experience",
      title: "Dormir face à la réserve africaine",
      text: "Une immersion privilégiée dans les lodges safari, au plus près de la nature et de l’univers animalier.",
      image: images.reserve,
      alt: "Réserve africaine du Domaine Limoune",
      href: "/reserve-africaine",
      cta: "Découvrir Safari Experience",
      facts: [
        { label: "Accès", value: "Clients hébergement" },
        { label: "Esprit", value: "Observation et silence" },
        { label: "Lien", value: "Lodges safari" },
      ],
    },
    {
      eyebrow: "Parc Animalier",
      title: "Explorer le parc animalier",
      text: "Une sortie familiale et pédagogique pour découvrir plus de trente espèces dans un cadre naturel.",
      image: images.park,
      alt: "Parc animalier familial du Domaine Limoune",
      href: "/parc-animalier",
      cta: "Préparer la visite",
      facts: [
        { label: "Espèces", value: "30+" },
        { label: "Public", value: "Familles et enfants" },
        { label: "Règle", value: "Ne pas nourrir" },
      ],
    },
    {
      eyebrow: "Restaurants",
      title: "Goûter les saveurs du Domaine",
      text: "Massa, Aman sous les Orangers, Monkey Beach et Limoune Club : quatre ambiances pour déjeuner, dîner, partager ou célébrer.",
      image: images.restaurants,
      alt: "Restaurants du Domaine Limoune",
      href: "/restaurants",
      cta: "Réserver une table",
      facts: [
        { label: "Signature", value: "Massa" },
        { label: "Orangers", value: "Aman" },
        { label: "Piscine", value: "Monkey Beach" },
      ],
    },
    {
      eyebrow: "Canopy Spa",
      title: "Se ressourcer au Canopy Spa",
      text: "Hammam, soins, rituels, piscine chauffée, jacuzzis et espaces de détente pour prolonger l’expérience du Domaine.",
      image: images.spa,
      alt: "Canopy Spa du Domaine Limoune",
      href: "/canopy-spa",
      cta: "Réserver un soin",
      facts: [
        { label: "Soins", value: "10h - 19h" },
        { label: "Rituels", value: "Signature et duo" },
        { label: "Mariage", value: "Rituels dédiés" },
      ],
    },
    {
      eyebrow: "Activités & Loisirs",
      title: "Composer sa journée",
      text: "Quad, équitation, padel, tennis, kids club, chasse au trésor, pique-nique, barbecue et dîners sous les étoiles.",
      image: images.experiences,
      alt: "Expériences et activités au Domaine Limoune",
      href: "/experiences",
      cta: "Voir les activités",
      facts: [
        { label: "Famille", value: "Club enfants, chasse" },
        { label: "Plein air", value: "Cheval, quad, sports" },
        { label: "Signature", value: "Dîner, pique-nique, barbecue" },
      ],
    },
    {
      eyebrow: "Mariages",
      title: "Célébrer dans un décor naturel",
      text: "Cérémonie, dîner, soirée, brunch du lendemain et hébergement invités : Le Domaine Limoune accompagne chaque moment de votre célébration.",
      image: images.weddings,
      alt: "Mariage au Domaine Limoune",
      href: "/mariages",
      cta: "Imaginer votre mariage",
      facts: [
        { label: "Mariages", value: "Cérémonie, dîner, brunch" },
        { label: "Spa", value: "Rituels mariage" },
        { label: "Invités", value: "Hébergement possible" },
      ],
    },
    {
      eyebrow: "Événements d’entreprise",
      title: "Réunir vos équipes autrement",
      text: "Séminaires, déjeuners, dîners, privatisations et activités de cohésion dans un cadre naturel près d’Agadir.",
      image: images.corporate,
      alt: "Séminaire et événement d’entreprise au Domaine Limoune",
      href: "/evenements-entreprise",
      cta: "Demander un devis",
      facts: [
        { label: "Formats", value: "Réunion, banquet, cocktail" },
        { label: "Activités", value: "Équipe" },
        { label: "Support", value: "Brochure entreprise" },
      ],
    },
  ],
  en: [
    {
      eyebrow: "Stays & Lodges",
      title: "Sleep at the heart of nature",
      text: "Suites and lodges for couples, families and stays facing the African reserve.",
      image: images.stays,
      alt: "Suites and lodges at Le Domaine Limoune",
      href: "/sejours",
      cta: "Discover the stays",
      facts: [
        { label: "Mood", value: "Suites, lodges, gardens" },
        { label: "For", value: "Couples, families, groups" },
        { label: "CTA", value: "Book a stay" },
      ],
    },
    {
      eyebrow: "Safari Experience",
      title: "Sleep facing the African reserve",
      text: "A privileged immersion in safari lodges, close to nature and the wildlife world.",
      image: images.reserve,
      alt: "African reserve at Le Domaine Limoune",
      href: "/reserve-africaine",
      cta: "Discover Safari Experience",
      facts: [
        { label: "Access", value: "Resident guests" },
        { label: "Spirit", value: "Observation and silence" },
        { label: "Link", value: "Safari lodges" },
      ],
    },
    {
      eyebrow: "Wildlife Park",
      title: "Explore the wildlife park",
      text: "A family-friendly and educational outing to discover more than thirty species in a natural setting.",
      image: images.park,
      alt: "Family wildlife park at Le Domaine Limoune",
      href: "/parc-animalier",
      cta: "Prepare the visit",
      facts: [
        { label: "Species", value: "30+" },
        { label: "Guests", value: "Families and children" },
        { label: "Rule", value: "Do not feed" },
      ],
    },
    {
      eyebrow: "Restaurants",
      title: "Taste the Domaine's flavours",
      text: "Massa, Aman sous les Orangers, Monkey Beach and Limoune Club: four atmospheres to lunch, dine, share or celebrate.",
      image: images.restaurants,
      alt: "Restaurants at Le Domaine Limoune",
      href: "/restaurants",
      cta: "Book a table",
      facts: [
        { label: "Signature", value: "Massa" },
        { label: "Orange trees", value: "Aman" },
        { label: "Pool", value: "Monkey Beach" },
      ],
    },
    {
      eyebrow: "Canopy Spa",
      title: "Recharge at Canopy Spa",
      text: "Hammam, treatments, rituals, heated pool, jacuzzis and relaxation spaces to extend the Domaine experience.",
      image: images.spa,
      alt: "Canopy Spa at Le Domaine Limoune",
      href: "/canopy-spa",
      cta: "Book a treatment",
      facts: [
        { label: "Treatments", value: "10am - 7pm" },
        { label: "Rituals", value: "Signature and duo" },
        { label: "Wedding", value: "Dedicated rituals" },
      ],
    },
    {
      eyebrow: "Activities & Leisure",
      title: "Shape your day",
      text: "Quad biking, horse riding, padel, tennis, kids club, treasure hunt, picnic, barbecue and dinners under the stars.",
      image: images.experiences,
      alt: "Experiences and activities at Le Domaine Limoune",
      href: "/experiences",
      cta: "View activities",
      facts: [
        { label: "Family", value: "Kids club, hunt" },
        { label: "Outdoor", value: "Horse, quad, sports" },
        { label: "Signature", value: "Dinner, picnic, barbecue" },
      ],
    },
    {
      eyebrow: "Weddings",
      title: "Celebrate in a natural setting",
      text: "Ceremony, dinner, party, next-day brunch and guest accommodation: Le Domaine Limoune accompanies every moment of your celebration.",
      image: images.weddings,
      alt: "Wedding at Le Domaine Limoune",
      href: "/mariages",
      cta: "Imagine your wedding",
      facts: [
        { label: "Weddings", value: "Ceremony, dinner, brunch" },
        { label: "Spa", value: "Wedding rituals" },
        { label: "Guests", value: "Accommodation possible" },
      ],
    },
    {
      eyebrow: "Corporate Events",
      title: "Bring your teams together differently",
      text: "Seminars, lunches, dinners, private events and team-building activities in a natural setting near Agadir.",
      image: images.corporate,
      alt: "Corporate seminar and event at Le Domaine Limoune",
      href: "/evenements-entreprise",
      cta: "Request a quote",
      facts: [
        { label: "Formats", value: "Meeting, banquet, cocktail" },
        { label: "Activities", value: "Team" },
        { label: "Support", value: "Corporate brochure" },
      ],
    },
  ],
};

function homeStories(locale: Locale) {
  return locale === "en" ? homeStoriesByLocale.en : homeStoriesByLocale.fr;
}

const homeCopy = {
  fr: {
    masthead: {
      ariaLabel: "Le Domaine Limoune Safari Experience",
      eyebrow: "Le Domaine Limoune",
      title: "SAFARI EXPERIENCE",
      quote: "Aux portes d’Agadir, Le Domaine Limoune réunit lodges safari, réserve africaine, parc animalier, restaurants, spa et expériences en pleine nature.",
      shortline: "Séjourner. Explorer. Se ressourcer. Célébrer.",
      bottomText: "Safari · Lodges · Réserve · Nature",
      downLabel: "Descendre vers le Domaine",
      actionsLabel: "Actions principales",
      book: "Réserver votre séjour",
      safari: "Découvrir Safari Experience",
      videoLabel: "Voir la vidéo du Domaine",
      film: "Voir le film",
    },
    intro: {
      kicker: "Le Domaine Limoune",
      title: "Une destination nature aux portes d’Agadir",
      subtitle: "Vergers, jardins, lodges et espaces de vie près d’Agadir.",
      smallAlt: "Détail chaleureux du Domaine Limoune",
      mainAlt: "Jardins, orangers et lieux de vie du Domaine Limoune",
      body: "Entre vergers, jardins, lodges et espaces de vie, Le Domaine Limoune propose une expérience complète : dormir face à la réserve, visiter le parc animalier, déjeuner sous les orangers, profiter du spa ou organiser un événement dans un cadre naturel unique.",
      cta: "Découvrir Le Domaine",
    },
    story: {
      title: "Une journée au Domaine Limoune",
      visualAlt: "Lieux de vie et hospitalité du Domaine Limoune",
      paragraphs: [
        "Le matin, on se réveille en lodge ou en suite. La journée continue entre parc animalier, piscine, activités en plein air et moments en famille. Le soir, place au dîner, au coucher de soleil et aux instants sous les étoiles.",
        "Le Domaine Limoune n’est pas seulement un hôtel : c’est une destination vivante, pensée pour les familles, les couples, les entreprises et les célébrations.",
      ],
      synopsisAlt: "Réserve africaine et nature du Domaine Limoune",
    },
    universes: {
      title: "Les univers du Domaine Limoune",
      body: "Chaque visite peut se vivre à sa manière : séjourner, explorer, déjeuner, se détendre, célébrer ou réunir ses équipes.",
    },
    gallery: {
      alt: "Jardins, lumière chaude et matières naturelles du Domaine Limoune",
      caption: "Nature, lodges, animaux, restaurants, spa et moments partagés.",
    },
    accommodation: {
      kicker: "Séjours & Lodges",
      title: "Dormir au Domaine Limoune",
      body: "Suites, lodges côté jardin, lodges piscine ou lodges safari : chaque hébergement offre une manière différente de vivre Le Domaine Limoune, entre confort, nature et esprit d’évasion.",
      discover: "Découvrir",
    },
    rituals: {
      items: ["Piscine", "Brunch", "Kids Club", "Parc Animalier", "Dîners d’été"],
      kicker: "Saison",
      title: "Été au Domaine Limoune",
      body: "Piscine, brunch familial, pause thé, activités enfants, parc animalier et dîners sous les étoiles : l’été au Domaine Limoune se vit du matin jusqu’au soir.",
      cta: "Découvrir l’offre été",
      mainAlt: "Été au Domaine Limoune",
      captionLead: "Du midi à la nuit :",
      captionStrong: "piscine, restaurants, jardins et ciel ouvert.",
      poolAlt: "Journée piscine premium au Domaine Limoune",
      noteTitle: "Offre Été Limoune",
      noteBody: "Un séjour pensé pour les familles, avec hébergement, piscine, expériences et univers animalier.",
    },
    agenda: {
      kicker: "Programmation",
      title: "Ce qui se vit au Domaine Limoune",
      body: "Brunchs, soirées, diffusions sportives, activités enfants, dîners thématiques et événements de saison : l’agenda donne chaque semaine une nouvelle raison de venir.",
      primary: "Voir l’agenda",
      secondary: "Réserver une expérience",
      featuredLabel: "À vivre cette saison",
      featuredTitle: "Été au Domaine Limoune",
      featuredBody: "Monkey Beach, parc animalier, kids club, restaurants et moments en plein air.",
      featuredCta: "Réserver ce moment",
      filters: ["Brunchs", "Soirées", "Enfants", "Sport", "Saison"],
      filtersLabel: "Univers agenda",
    },
    awards: {
      title: "Le Domaine Limoune dans les médias",
      signatures: [
        ["Presse", "Dossier presse, visuels et informations officielles pour présenter Le Domaine Limoune.", images.corporate, "Presse et communication Domaine Limoune"],
        ["Destination", "Une adresse unique près d’Agadir réunissant hébergement, nature, restauration, spa et événements.", images.domain, "Destination Domaine Limoune"],
        ["Informations officielles", "Des contenus clairs pour les journalistes, partenaires et professionnels.", images.restaurants, "Informations officielles Domaine Limoune"],
      ],
    },
    bookBanner: {
      paths: [
        { title: "Séjour", text: "Suites, lodges, offres et disponibilités.", href: "/sejours#booking", cta: "Vérifier les disponibilités" },
        { title: "Restaurants", text: "Massa, Aman sous les Orangers, Monkey Beach et Limoune Club.", href: "/restaurants", cta: "Réserver une table" },
        { title: "Canopy Spa", text: "Soins, hammam, rituels duo et espaces bien-être.", href: "/canopy-spa", cta: "Réserver un soin" },
        { title: "Événements", text: "Mariages, séminaires, privatisations et activités de cohésion.", href: "/evenements-entreprise", cta: "Demander un devis" },
      ],
      mediaAlt: "Séjour premium au Domaine Limoune",
      badge: "Réservation directe",
      kicker: "Réservation & demandes",
      title: "Préparer votre venue au Domaine Limoune",
      body: "Séjour, restaurant, spa, mariage, événement d’entreprise ou journée en famille : choisissez votre demande, notre équipe vous oriente vers le bon service.",
      primary: "Réserver votre séjour",
      secondary: "Demande sur mesure",
    },
    offers: {
      title: "Offres du Domaine Limoune",
      body: "Séjour en famille, escapade bien-être ou parenthèse estivale : découvrez les offres pensées pour vivre Le Domaine Limoune autrement.",
      firstCta: "Découvrir l’offre",
      cta: "Découvrir",
    },
    available: {
      items: [
        { title: "Canopy Spa", text: "Soin, hammam, tisanerie, piscine chauffée et espaces de détente.", cta: "Réserver un soin", href: "/canopy-spa", image: images.spa, alt: "Canopy Spa Domaine Limoune" },
        { title: "Table au Domaine", text: "Déjeuner sous les orangers, dîner au Massa ou moment convivial au Limoune Club.", cta: "Réserver une table", href: "/restaurants", image: images.restaurants, alt: "Restaurants Domaine Limoune" },
        { title: "Parc animalier", text: "Une visite familiale pour découvrir les animaux et partager un moment en pleine nature.", cta: "Préparer la visite", href: "/parc-animalier", image: images.park, alt: "Parc animalier Domaine Limoune" },
        { title: "Journée piscine", text: "Une journée autour de Monkey Beach entre baignade, détente et restauration.", cta: "Voir l’offre", href: "/offres", image: images.pool, alt: "Journée piscine Domaine Limoune" },
      ],
      kicker: "Expériences à la journée",
      title: "Vivre Le Domaine Limoune sans séjourner",
      body: "Une journée au Domaine peut se vivre autour d’un déjeuner, d’un accès piscine, d’une visite du parc animalier, d’un soin au Canopy Spa ou d’une activité en plein air.",
      primary: "Composer ma journée",
      secondary: "Nous contacter sur WhatsApp",
      showcaseAlt: "Journée premium au Domaine Limoune",
      cardLabel: "Votre parcours au Domaine",
      cardTitle: "Spa, table, parc animalier, piscine ou activité.",
      cardBody: "Choisissez votre moment et notre équipe vous oriente vers l’expérience la plus adaptée.",
      cardCta: "Voir les expériences",
    },
    prefooter: {
      contacts: [
        { title: "Séjours", text: "Suites, lodges, offres et disponibilités.", href: "/sejours#booking", cta: "Réserver" },
        { title: "Restaurants", text: "Table, groupe, brunch ou dîner privé.", href: "/restaurants", cta: "Réserver une table" },
        { title: "Canopy Spa", text: "Soin, hammam, rituel duo ou moment bien-être.", href: "/canopy-spa", cta: "Réserver un soin" },
        { title: "Mariages", text: "Cérémonie, dîner, brunch et hébergement invités.", href: "/mariages", cta: "Demander un devis" },
        { title: "Entreprises", text: "Séminaire, activité de cohésion, déjeuner, dîner ou privatisation.", href: "/evenements-entreprise", cta: "Demander un devis" },
        { title: "Parc et activités", text: "Parc animalier, enfants, plein air et journées famille.", href: "/experiences", cta: "Préparer la visite" },
      ],
      kicker: "Contact rapide",
      title: "Contacter Le Domaine Limoune",
      body: "Pour un séjour, une table, un soin, un mariage, un événement d’entreprise ou une sortie en famille, notre équipe vous accompagne avec les bonnes informations.",
      mediaAlt: "Conciergerie Domaine Limoune",
      location: "Région Agadir - Taroudant, Maroc",
      cardBody: "À proximité d’Agadir et de l’aéroport, Le Domaine Limoune vous accueille pour séjourner, explorer, vous détendre ou célébrer.",
      contactForm: "Formulaire contact",
      whatsapp: "WhatsApp Business",
      proof: ["Réservations", "Restaurants", "Spa", "Mariages", "Entreprises", "Parc & activités"],
    },
  },
  en: {
    masthead: {
      ariaLabel: "Le Domaine Limoune Safari Experience",
      eyebrow: "Le Domaine Limoune",
      title: "SAFARI EXPERIENCE",
      quote: "At the gates of Agadir, Le Domaine Limoune brings together safari lodges, an African reserve, wildlife park, restaurants, spa and nature experiences.",
      shortline: "Stay. Explore. Recharge. Celebrate.",
      bottomText: "Safari · Lodges · Reserve · Nature",
      downLabel: "Scroll to the Domaine",
      actionsLabel: "Main actions",
      book: "Book your stay",
      safari: "Discover Safari Experience",
      videoLabel: "Watch the Domaine video",
      film: "Watch the film",
    },
    intro: {
      kicker: "Le Domaine Limoune",
      title: "A nature destination at the gates of Agadir",
      subtitle: "Orchards, gardens, lodges and living spaces near Agadir.",
      smallAlt: "Warm detail of Le Domaine Limoune",
      mainAlt: "Gardens, orange trees and living spaces at Le Domaine Limoune",
      body: "Between orchards, gardens, lodges and living spaces, Le Domaine Limoune offers a complete experience: sleep facing the reserve, visit the wildlife park, lunch under the orange trees, enjoy the spa or host an event in a unique natural setting.",
      cta: "Discover the Domaine",
    },
    story: {
      title: "A day at Le Domaine Limoune",
      visualAlt: "Living spaces and hospitality at Le Domaine Limoune",
      paragraphs: [
        "In the morning, you wake up in a lodge or suite. The day continues between the wildlife park, pool, outdoor activities and family moments. In the evening, it is time for dinner, sunset and moments under the stars.",
        "Le Domaine Limoune is not only a hotel: it is a living destination designed for families, couples, companies and celebrations.",
      ],
      synopsisAlt: "African reserve and nature at Le Domaine Limoune",
    },
    universes: {
      title: "The worlds of Le Domaine Limoune",
      body: "Each visit can be lived in your own way: stay, explore, lunch, unwind, celebrate or bring your teams together.",
    },
    gallery: {
      alt: "Gardens, warm light and natural materials at Le Domaine Limoune",
      caption: "Nature, lodges, animals, restaurants, spa and shared moments.",
    },
    accommodation: {
      kicker: "Stays & Lodges",
      title: "Stay at Le Domaine Limoune",
      body: "Suites, garden-side lodges, pool lodges or safari lodges: each accommodation offers a different way to experience Le Domaine Limoune, between comfort, nature and a spirit of escape.",
      discover: "Discover",
    },
    rituals: {
      items: ["Pool", "Brunch", "Kids Club", "Wildlife Park", "Summer dinners"],
      kicker: "Season",
      title: "Summer at Le Domaine Limoune",
      body: "Pool, family brunch, tea break, children's activities, wildlife park and dinners under the stars: summer at Le Domaine Limoune is lived from morning to evening.",
      cta: "Discover the summer offer",
      mainAlt: "Summer at Le Domaine Limoune",
      captionLead: "From midday to night:",
      captionStrong: "pool, restaurants, gardens and open sky.",
      poolAlt: "Premium pool day at Le Domaine Limoune",
      noteTitle: "Limoune Summer Offer",
      noteBody: "A stay designed for families, with accommodation, pool, experiences and wildlife world.",
    },
    agenda: {
      kicker: "Programme",
      title: "What happens at Le Domaine Limoune",
      body: "Brunches, evenings, sports screenings, children's activities, themed dinners and seasonal events: the agenda gives you a new reason to come every week.",
      primary: "View the agenda",
      secondary: "Book an experience",
      featuredLabel: "To experience this season",
      featuredTitle: "Summer at Le Domaine Limoune",
      featuredBody: "Monkey Beach, wildlife park, kids club, restaurants and outdoor moments.",
      featuredCta: "Book this moment",
      filters: ["Brunches", "Evenings", "Children", "Sport", "Season"],
      filtersLabel: "Agenda worlds",
    },
    awards: {
      title: "Le Domaine Limoune in the media",
      signatures: [
        ["Press", "Press kit, visuals and official information to present Le Domaine Limoune.", images.corporate, "Press and communications Le Domaine Limoune"],
        ["Destination", "A unique address near Agadir bringing together accommodation, nature, dining, spa and events.", images.domain, "Le Domaine Limoune destination"],
        ["Official information", "Clear content for journalists, partners and professionals.", images.restaurants, "Official information Le Domaine Limoune"],
      ],
    },
    bookBanner: {
      paths: [
        { title: "Stay", text: "Suites, lodges, offers and availability.", href: "/sejours#booking", cta: "Check availability" },
        { title: "Restaurants", text: "Massa, Aman sous les Orangers, Monkey Beach and Limoune Club.", href: "/restaurants", cta: "Book a table" },
        { title: "Canopy Spa", text: "Treatments, hammam, duo rituals and wellness spaces.", href: "/canopy-spa", cta: "Book a treatment" },
        { title: "Events", text: "Weddings, seminars, private events and team-building activities.", href: "/evenements-entreprise", cta: "Request a quote" },
      ],
      mediaAlt: "Premium stay at Le Domaine Limoune",
      badge: "Direct booking",
      kicker: "Booking & requests",
      title: "Prepare your visit to Le Domaine Limoune",
      body: "Stay, restaurant, spa, wedding, corporate event or family day: choose your request and our team will guide you to the right department.",
      primary: "Book your stay",
      secondary: "Tailored request",
    },
    offers: {
      title: "Offers at Le Domaine Limoune",
      body: "Family stay, wellness escape or summer interlude: discover offers designed to experience Le Domaine Limoune differently.",
      firstCta: "Discover the offer",
      cta: "Discover",
    },
    available: {
      items: [
        { title: "Canopy Spa", text: "Treatment, hammam, herbal tea room, heated pool and relaxation spaces.", cta: "Book a treatment", href: "/canopy-spa", image: images.spa, alt: "Canopy Spa Le Domaine Limoune" },
        { title: "Table at the Domaine", text: "Lunch under the orange trees, dinner at Massa or a convivial moment at Limoune Club.", cta: "Book a table", href: "/restaurants", image: images.restaurants, alt: "Restaurants Le Domaine Limoune" },
        { title: "Wildlife park", text: "A family visit to discover the animals and share a moment in nature.", cta: "Prepare the visit", href: "/parc-animalier", image: images.park, alt: "Wildlife park Le Domaine Limoune" },
        { title: "Pool day", text: "A day around Monkey Beach between swimming, relaxation and dining.", cta: "View the offer", href: "/offres", image: images.pool, alt: "Pool day Le Domaine Limoune" },
      ],
      kicker: "Day experiences",
      title: "Experience Le Domaine Limoune without staying overnight",
      body: "A day at the Domaine can revolve around lunch, pool access, a wildlife park visit, a treatment at Canopy Spa or an outdoor activity.",
      primary: "Shape my day",
      secondary: "Contact us on WhatsApp",
      showcaseAlt: "Premium day at Le Domaine Limoune",
      cardLabel: "Your route at the Domaine",
      cardTitle: "Spa, dining, wildlife park, pool or activity.",
      cardBody: "Choose your moment and our team will guide you to the experience best suited to you.",
      cardCta: "View the experiences",
    },
    prefooter: {
      contacts: [
        { title: "Stays", text: "Suites, lodges, offers and availability.", href: "/sejours#booking", cta: "Book" },
        { title: "Restaurants", text: "Table, group, brunch or private dinner.", href: "/restaurants", cta: "Book a table" },
        { title: "Canopy Spa", text: "Treatment, hammam, duo ritual or wellness moment.", href: "/canopy-spa", cta: "Book a treatment" },
        { title: "Weddings", text: "Ceremony, dinner, brunch and guest accommodation.", href: "/mariages", cta: "Request a quote" },
        { title: "Companies", text: "Seminar, team-building activity, lunch, dinner or private event.", href: "/evenements-entreprise", cta: "Request a quote" },
        { title: "Park and activities", text: "Wildlife park, children, outdoor moments and family days.", href: "/experiences", cta: "Prepare the visit" },
      ],
      kicker: "Quick contact",
      title: "Contact Le Domaine Limoune",
      body: "For a stay, table, treatment, wedding, corporate event or family outing, our team helps you with the right information.",
      mediaAlt: "Concierge Le Domaine Limoune",
      location: "Agadir - Taroudant region, Morocco",
      cardBody: "Close to Agadir and the airport, Le Domaine Limoune welcomes you to stay, explore, unwind or celebrate.",
      contactForm: "Contact form",
      whatsapp: "WhatsApp Business",
      proof: ["Reservations", "Restaurants", "Spa", "Weddings", "Companies", "Park & activities"],
    },
  },
} as const;

function getHomeCopy(locale: Locale) {
  return locale === "en" ? homeCopy.en : homeCopy.fr;
}

const stayCopy = {
  fr: {
    hero: {
      kicker: "Séjours & Lodges",
      subtitle: "Suites, lodges et hébergements safari aux portes d’Agadir.",
      paragraphs: [
        "Séjourner au Domaine Limoune, c’est vivre une parenthèse en pleine nature, entre jardins, réserve africaine, parc animalier, restaurants, spa et activités en famille.",
        "Suite élégante, lodge côté piscine, séjour en famille ou nuit face à la réserve : chaque hébergement offre une manière différente de vivre l’expérience du Domaine.",
      ],
      breadcrumbLabel: "Fil d'Ariane",
      home: "Le Domaine Limoune",
    },
    intro: {
      kicker: "L’expérience séjour",
      title: "Une destination complète, pas seulement un hébergement",
      paragraphs: [
        "Au Domaine Limoune, le séjour ne se limite pas à la chambre. Il se prolonge au parc animalier, au bord de la piscine, au Canopy Spa, dans les restaurants du Domaine et à travers les activités proposées sur place.",
        "Chaque catégorie d’hébergement répond à un besoin clair : une escapade en couple, un séjour famille, une immersion safari, une pause piscine ou une occasion spéciale.",
      ],
    },
    overview: {
      kicker: "Choisir son hébergement",
      title: "Quelle expérience souhaitez-vous vivre ?",
      body: "Pour faciliter votre choix, les hébergements sont organisés par ambiance de séjour : safari, famille, piscine, jardin ou prestige.",
      cta: "Découvrir",
      cards: [
        { href: "#safari-experience", title: "Safari Experience", text: "Pour dormir face à la réserve africaine et vivre l’expérience signature du Domaine.", image: images.reserveLodge },
        { href: "#sejours-famille", title: "Séjours Famille", text: "Pour profiter d’espaces adaptés aux parents, aux enfants et aux séjours à plusieurs.", image: images.experienceFamily },
        { href: "#suites-chambres-lodges-jardin", title: "Suites & Chambres", text: "Pour une escapade confortable au calme, au cœur des jardins du Domaine.", image: images.stays },
        { href: "#suites-chambres-lodges-jardin", title: "Lodges Piscine & Jardin", text: "Pour un séjour simple à vivre, proche des espaces de détente, de restauration et de piscine.", image: images.pool },
        { href: "#prestige-occasions-speciales", title: "Prestige & Occasions spéciales", text: "Pour les séjours plus exclusifs, les longues pauses ou les moments à célébrer.", image: images.stays },
      ],
    },
    services: {
      title: "Pendant votre séjour",
      body: "Selon l’offre réservée, votre séjour peut inclure plusieurs accès et services pour profiter pleinement du Domaine.",
      items: [
        "Petit-déjeuner selon l’offre confirmée",
        "Accès aux espaces du Domaine selon conditions de séjour",
        "Accès au parc animalier selon l’offre réservée",
        "Accès piscine selon horaires et saison",
        "Accès au Kids Club selon âge, horaires et disponibilité",
        "Accès à la salle de sport selon horaires",
        "Wi-Fi dans les espaces prévus",
        "Stationnement selon disponibilité",
        "Assistance pour réserver restaurants, spa et activités",
        "Lit bébé et équipements famille sur demande",
        "Transferts privés disponibles sur demande",
        "Accompagnement pour occasions spéciales, familles et longs séjours",
      ],
    },
    conditions: {
      kicker: "Avant de réserver",
      title: "Informations utiles avant de réserver",
      items: [
        ["Arrivée et départ", "Check-in à partir de 15h00 et check-out jusqu’à 12h00. Un départ tardif peut être proposé selon disponibilité."],
        ["Capacités", "Les capacités varient selon la catégorie et la configuration attribuée. Tout couchage additionnel doit être confirmé par l’équipe réservation."],
        ["Séjour avec enfants", "Lit bébé, couchage enfant et équipements famille sont proposés sur demande, selon l’âge, la catégorie réservée et la disponibilité."],
        ["Accès aux expériences", "Piscine, parc animalier, spa, restaurants, Kids Club et activités peuvent être soumis à des horaires, à la saison, à la disponibilité ou à une réservation préalable."],
        ["Conditions de réservation", "Les conditions d’annulation, de modification et de paiement dépendent de l’offre confirmée au moment de la réservation."],
      ],
    },
    relatedOffers: {
      kicker: "Offres liées",
      title: "Prolonger l’expérience du séjour",
      body: "Découvrez les offres associées aux séjours du Domaine Limoune : famille, bien-être, safari ou saison estivale.",
      cta: "Voir l’offre",
      items: [
        ["Séjour Famille", "Une offre pensée pour les parents et les enfants, avec hébergement adapté, activités et moments de partage au Domaine."],
        ["Escapade Canopy Spa", "Une parenthèse bien-être autour de l’hébergement, du hammam, des soins et des espaces de détente du Canopy Spa."],
        ["Safari Lodge Experience", "Une invitation à choisir un lodge face à la réserve africaine pour vivre l’expérience signature du Domaine."],
        ["Offre Été Limoune", "Un séjour saisonnier pour profiter de la piscine, du parc animalier, des restaurants et des expériences famille."],
      ],
    },
    booking: {
      title: "Réserver votre séjour",
      body: "Indiquez vos dates, le nombre de personnes et vos préférences. Notre équipe peut également vous accompagner pour choisir la catégorie la plus adaptée à votre séjour.",
      moduleKicker: "Module de réservation hébergement",
      moduleTitle: "Vérifier les disponibilités",
      fields: [
        { label: "Date d’arrivée", name: "arrival", type: "date" },
        { label: "Date de départ", name: "departure", type: "date" },
        { label: "Chambres", name: "rooms", type: "number", min: "1" },
        { label: "Adultes", name: "adults", type: "number", min: "1" },
        { label: "Enfants", name: "children", type: "number", min: "0" },
        { label: "Code promotionnel", name: "promo", type: "text" },
      ],
      adviceCta: "Demander conseil à l’équipe réservation",
    },
    categories: [
      { id: "safari-experience", nav: "Safari", title: "Safari Experience", subtitle: "Dormir face à la réserve africaine", copy: "Le Safari Experience est l’expérience signature du Domaine Limoune. Les lodges safari permettent de séjourner au plus près de la réserve africaine, dans un cadre naturel, calme et immersif.", slugs: ["lodge-safari-mezzanine", "lodges-communicants", "suite-lodge-premium"] },
      { id: "sejours-famille", nav: "Famille", title: "Séjours famille", subtitle: "Des hébergements pensés pour les parents et les enfants", copy: "Le Domaine Limoune accueille les familles avec des hébergements adaptés, des espaces de vie confortables et un accès simple aux activités, au parc animalier, aux restaurants, à la piscine et au Kids Club selon horaires et disponibilité.", slugs: ["suite-familiale"] },
      { id: "suites-chambres-lodges-jardin", nav: "Jardin", title: "Suites, chambres & lodges côté jardin", subtitle: "Le confort au calme, au cœur du Domaine", copy: "Ces hébergements sont pensés pour les couples, les courts séjours et les escapades près d’Agadir. Ils permettent de profiter facilement des jardins, des restaurants, de la piscine, du spa et des expériences du Domaine.", slugs: ["suite-junior", "suite-executive", "lodges-cote-piscine-ou-jardin"] },
      { id: "prestige-occasions-speciales", nav: "Prestige", title: "Prestige & occasions spéciales", subtitle: "Des hébergements plus généreux pour les moments importants", copy: "Pour une occasion spéciale, un séjour plus exclusif ou une longue pause au Domaine, certaines suites offrent plus d’espace, plus de confort et une expérience plus personnalisée.", slugs: ["suite-signature"] },
    ],
    detail: {
      heroSummary: "Cette fiche réunit la galerie, la description complète, les informations pratiques, les équipements, les services inclus et les expériences accessibles pendant le séjour.",
      breadcrumbLabel: "Fil d'Ariane",
      home: "Le Domaine Limoune",
      stays: "Séjours",
      descriptionKicker: "Description complète",
      practicalTitle: "Informations pratiques",
      facts: {
        capacity: "Capacité",
        surface: "Surface",
        bed: "Type de lit",
        view: "Vue",
        arrival: "Arrivée",
        departure: "Départ",
        children: "Conditions enfants",
        brochure: "Brochure",
        brochureCta: "Voir la brochure hébergement",
      },
      practicalNote: "Les surfaces, couchages et vues peuvent varier selon l’unité attribuée et la disponibilité. L’équipe réservation confirme la configuration la plus adaptée avant votre arrivée.",
      equipmentTitle: "Équipements",
      includedTitle: "Services inclus",
      experiencesKicker: "Expériences accessibles pendant le séjour",
      experiencesTitle: "Prolonger la chambre par les univers du Domaine.",
      discover: "Découvrir",
      similarTitle: "Hébergements similaires",
      viewStay: "Voir cet hébergement",
    },
    contact: {
      label: "Contact",
      title: "Le Domaine Limoune",
      address: "Région Agadir - Taroudant, Maroc",
      body: "Notre équipe vous accompagne pour choisir l’hébergement le plus adapté à votre séjour : couple, famille, Safari Experience, piscine, jardin ou occasion spéciale.",
      booking: "Réserver un séjour",
      brochure: "Voir la brochure hébergement",
      usefulLinks: "Liens utiles",
      links: [
        ["Contact général", "Écrire à l’équipe", "/contact"],
        ["Restaurants", "Réserver une table", "/restaurants"],
        ["Canopy Spa", "Réserver un soin", "/canopy-spa"],
        ["Mariages & événements", "Demander un devis", "/mariages"],
        ["Activités & parc animalier", "Préparer la visite", "/experiences"],
      ],
    },
  },
  en: {
    hero: {
      kicker: "Stays & Lodges",
      subtitle: "Suites, lodges and safari accommodation at the gates of Agadir.",
      paragraphs: [
        "Staying at Le Domaine Limoune means living a nature-filled interlude between gardens, African reserve, wildlife park, restaurants, spa and family activities.",
        "Elegant suite, poolside lodge, family stay or night facing the reserve: each accommodation offers a different way to experience the Domaine.",
      ],
      breadcrumbLabel: "Breadcrumb",
      home: "Le Domaine Limoune",
    },
    intro: {
      kicker: "The stay experience",
      title: "A complete destination, not just accommodation",
      paragraphs: [
        "At Le Domaine Limoune, the stay does not stop at the room. It continues at the wildlife park, by the pool, at Canopy Spa, in the Domaine restaurants and through the activities available on site.",
        "Each accommodation category responds to a clear need: a couple's escape, a family stay, a safari immersion, a pool pause or a special occasion.",
      ],
    },
    overview: {
      kicker: "Choose your accommodation",
      title: "Which experience would you like to live?",
      body: "To make your choice easier, accommodation is organised by stay atmosphere: safari, family, pool, garden or prestige.",
      cta: "Discover",
      cards: [
        { href: "#safari-experience", title: "Safari Experience", text: "To sleep facing the African reserve and live the Domaine's signature experience.", image: images.reserveLodge },
        { href: "#sejours-famille", title: "Family Stays", text: "To enjoy spaces suited to parents, children and stays with several guests.", image: images.experienceFamily },
        { href: "#suites-chambres-lodges-jardin", title: "Suites & Rooms", text: "For a comfortable and peaceful escape in the heart of the Domaine gardens.", image: images.stays },
        { href: "#suites-chambres-lodges-jardin", title: "Pool & Garden Lodges", text: "For an easy-to-live stay close to relaxation, dining and pool spaces.", image: images.pool },
        { href: "#prestige-occasions-speciales", title: "Prestige & Special Occasions", text: "For more exclusive stays, longer pauses or moments to celebrate.", image: images.stays },
      ],
    },
    services: {
      title: "During your stay",
      body: "Depending on the booked offer, your stay may include several accesses and services to fully enjoy the Domaine.",
      items: [
        "Breakfast according to the confirmed offer",
        "Access to Domaine spaces according to stay conditions",
        "Access to the wildlife park according to the booked offer",
        "Pool access according to opening hours and season",
        "Kids Club access according to age, schedule and availability",
        "Fitness room access according to opening hours",
        "Wi-Fi in designated areas",
        "Parking subject to availability",
        "Assistance booking restaurants, spa and activities",
        "Baby cot and family equipment on request",
        "Private transfers available on request",
        "Support for special occasions, families and long stays",
      ],
    },
    conditions: {
      kicker: "Before booking",
      title: "Useful information before booking",
      items: [
        ["Arrival and departure", "Check-in from 3:00 pm and check-out until 12:00 pm. Late departure may be offered subject to availability."],
        ["Capacities", "Capacities vary according to the category and assigned configuration. Any additional bedding must be confirmed by the reservations team."],
        ["Stays with children", "Baby cots, children's bedding and family equipment are available on request, depending on age, booked category and availability."],
        ["Access to experiences", "Pool, wildlife park, spa, restaurants, Kids Club and activities may be subject to opening hours, season, availability or prior booking."],
        ["Booking conditions", "Cancellation, modification and payment conditions depend on the offer confirmed at the time of booking."],
      ],
    },
    relatedOffers: {
      kicker: "Related offers",
      title: "Extend the stay experience",
      body: "Discover offers associated with stays at Le Domaine Limoune: family, wellness, safari or summer season.",
      cta: "View the offer",
      items: [
        ["Family Stay", "An offer designed for parents and children, with suitable accommodation, activities and shared moments at the Domaine."],
        ["Canopy Spa Escape", "A wellness interlude around accommodation, hammam, treatments and Canopy Spa relaxation spaces."],
        ["Safari Lodge Experience", "An invitation to choose a lodge facing the African reserve and live the Domaine's signature experience."],
        ["Limoune Summer Offer", "A seasonal stay to enjoy the pool, wildlife park, restaurants and family experiences."],
      ],
    },
    booking: {
      title: "Book your stay",
      body: "Enter your dates, number of guests and preferences. Our team can also help you choose the category best suited to your stay.",
      moduleKicker: "Accommodation booking module",
      moduleTitle: "Check availability",
      fields: [
        { label: "Arrival date", name: "arrival", type: "date" },
        { label: "Departure date", name: "departure", type: "date" },
        { label: "Rooms", name: "rooms", type: "number", min: "1" },
        { label: "Adults", name: "adults", type: "number", min: "1" },
        { label: "Children", name: "children", type: "number", min: "0" },
        { label: "Promotional code", name: "promo", type: "text" },
      ],
      adviceCta: "Ask the reservations team for advice",
    },
    categories: [
      { id: "safari-experience", nav: "Safari", title: "Safari Experience", subtitle: "Sleep facing the African reserve", copy: "The Safari Experience is the signature experience of Le Domaine Limoune. Safari lodges allow you to stay close to the African reserve in a natural, calm and immersive setting.", slugs: ["lodge-safari-mezzanine", "lodges-communicants", "suite-lodge-premium"] },
      { id: "sejours-famille", nav: "Family", title: "Family stays", subtitle: "Accommodation designed for parents and children", copy: "Le Domaine Limoune welcomes families with suitable accommodation, comfortable living spaces and easy access to activities, the wildlife park, restaurants, pool and Kids Club according to opening hours and availability.", slugs: ["suite-familiale"] },
      { id: "suites-chambres-lodges-jardin", nav: "Garden", title: "Suites, rooms & garden-side lodges", subtitle: "Quiet comfort at the heart of the Domaine", copy: "These accommodations are designed for couples, short stays and escapes near Agadir. They make it easy to enjoy the gardens, restaurants, pool, spa and Domaine experiences.", slugs: ["suite-junior", "suite-executive", "lodges-cote-piscine-ou-jardin"] },
      { id: "prestige-occasions-speciales", nav: "Prestige", title: "Prestige & special occasions", subtitle: "More generous accommodation for important moments", copy: "For a special occasion, a more exclusive stay or a long pause at the Domaine, selected suites offer more space, more comfort and a more personalised experience.", slugs: ["suite-signature"] },
    ],
    detail: {
      heroSummary: "This page brings together the gallery, full description, practical information, amenities, included services and experiences available during the stay.",
      breadcrumbLabel: "Breadcrumb",
      home: "Le Domaine Limoune",
      stays: "Stays",
      descriptionKicker: "Full description",
      practicalTitle: "Practical information",
      facts: {
        capacity: "Capacity",
        surface: "Surface area",
        bed: "Bedding",
        view: "View",
        arrival: "Arrival",
        departure: "Departure",
        children: "Children's conditions",
        brochure: "Brochure",
        brochureCta: "View accommodation brochure",
      },
      practicalNote: "Surface areas, bedding and views may vary depending on the assigned unit and availability. The reservations team confirms the most suitable configuration before your arrival.",
      equipmentTitle: "Amenities",
      includedTitle: "Included services",
      experiencesKicker: "Experiences available during the stay",
      experiencesTitle: "Extend the room through the Domaine's worlds.",
      discover: "Discover",
      similarTitle: "Similar accommodation",
      viewStay: "View this accommodation",
    },
    contact: {
      label: "Contact",
      title: "Le Domaine Limoune",
      address: "Agadir - Taroudant region, Morocco",
      body: "Our team helps you choose the accommodation best suited to your stay: couple, family, Safari Experience, pool, garden or special occasion.",
      booking: "Book a stay",
      brochure: "View accommodation brochure",
      usefulLinks: "Useful links",
      links: [
        ["General contact", "Write to the team", "/contact"],
        ["Restaurants", "Book a table", "/restaurants"],
        ["Canopy Spa", "Book a treatment", "/canopy-spa"],
        ["Weddings & events", "Request a quote", "/mariages"],
        ["Activities & wildlife park", "Prepare the visit", "/experiences"],
      ],
    },
  },
} as const;

function getStayCopy(locale: Locale) {
  return locale === "en" ? stayCopy.en : stayCopy.fr;
}

const diningVenueProfiles = [
  {
    slug: "massa-restaurant",
    nav: "Massa",
    name: "Massa Restaurant",
    kicker: "Restaurant signature",
    image: images.restaurantMassa,
    alt: "Table signature Massa Restaurant au Domaine Limoune",
    cuisine: "Cuisine signature et produits de saison",
    hours: "Déjeuner et dîner selon calendrier",
    lead: "La table qui installe le Domaine dans une vraie adresse gastronomique : précise, chaude, élégante, adaptée au déjeuner, au dîner et aux moments privés.",
    atmosphere: "Service attentif, assiettes travaillées, lumière du soir et argument parfait pour transformer un séjour ou une journée en expérience complète.",
    menu: "Menu signature, menu découverte, déjeuner ou dîner privé selon disponibilité.",
    privateUse: "Déjeuner de direction, dîner privé, groupe ou célébration intimiste.",
    details: ["Signature", "Déjeuner", "Dîner privé", "Groupes"],
  },
  {
    slug: "aman-sous-les-orangers",
    nav: "Aman",
    name: "Aman sous les Orangers",
    kicker: "Sous les orangers",
    image: images.restaurantAman,
    alt: "Déjeuner sous les orangers au Domaine Limoune",
    cuisine: "Brunchs, banquets et cuisine conviviale",
    hours: "Selon programmation et privatisation",
    lead: "Le lieu de partage du Domaine : brunchs, déjeuners de groupe, banquets, tea time et événements privés dans une atmosphère naturelle et généreuse.",
    atmosphere: "Une scène plus ouverte, plus familiale, où l’ombre des orangers, les grandes tablées et la lumière chaude portent la mémoire du lieu.",
    menu: "Brunch, banquet, déjeuner de groupe et propositions événementielles.",
    privateUse: "Mariages, lendemains de fête, familles, agences et groupes corporate.",
    details: ["Brunch", "Groupes", "Orangers", "Banquets"],
  },
  {
    slug: "monkey-beach",
    nav: "Monkey Beach",
    name: "Monkey Beach",
    kicker: "Pool day",
    image: images.restaurantMonkey,
    alt: "Monkey Beach, piscine et snacking premium au Domaine Limoune",
    cuisine: "Food, drinks, pool access et snacking premium",
    hours: "Horaires saisonniers",
    lead: "L’univers piscine, détente et journée famille : une offre claire pour les visiteurs journée, les résidents et les activations d’été.",
    atmosphere: "Carte food & drinks, accès piscine selon conditions, rythme solaire et moments simples à réserver avant de venir.",
    menu: "Carte food & drinks, snacking premium, offres été et formules pool access.",
    privateUse: "Anniversaires, journées familles, summer events et activations saisonnières.",
    details: ["Piscine", "Famille", "Été", "Pool access"],
  },
  {
    slug: "limoune-club",
    nav: "Limoune Club",
    name: "Limoune Club",
    kicker: "Soirée et sport",
    image: images.restaurantClub,
    alt: "Limoune Club, cheminée, sport et soirées au Domaine Limoune",
    cuisine: "Cuisine, boissons, programmation et privatisations",
    hours: "Selon programmation",
    lead: "Le lieu qui prolonge la journée : chill-out, cheminée, diffusions sportives, offres food & drinks et événements privés.",
    atmosphere: "Plus nocturne, plus vivant, pensé pour les matchs, les groupes, les soirées et les moments qui donnent envie de revenir au Domaine.",
    menu: "Offres food & drinks, programmation sportive, soirées privées et formats groupe.",
    privateUse: "Diffusions, afterworks, anniversaires, team moments et privatisations.",
    details: ["Soirée", "Sport", "Cheminée", "Privatisation"],
  },
] as const;

const diningMoments = [
  ["Déjeuner signature", "Massa Restaurant pour un déjeuner ou dîner qui positionne le Domaine comme adresse de table."],
  ["Brunch sous les orangers", "Aman sous les Orangers pour les familles, groupes, lendemains de mariage et événements."],
  ["Pool day", "Monkey Beach pour l’accès piscine, la détente, la carte food & drinks et les offres été."],
  ["Soirée et match", "Limoune Club pour les diffusions sportives, la cheminée, le chill-out et les privatisations."],
] as const;

const spaJourneySteps = [
  ["Accueil", "Choisir le bon rythme : soin, hammam, duo, journée spa ou rituel mariage."],
  ["Chaleur", "Hammam, vapeur, préparation du corps et ralentissement du temps."],
  ["Soin", "Cabine solo ou duo, massage, rituel signature, beauté des mains ou coiffure."],
  ["Eau", "Piscine chauffée, jacuzzis et pause calme pour prolonger le bénéfice."],
  ["Tisanerie", "Une sortie douce, claire, avec conseil et prochaine réservation possible."],
] as const;

const spaInstallations = [
  ["Hammams", "Chaleur, vapeur et préparation du corps avant un soin ou un rituel complet."],
  ["Cabines", "Espaces de soin solo, calmes et précis, à réserver selon disponibilité."],
  ["Cabine duo", "Un format couple, anniversaire, séjour ou moment partagé avant une célébration."],
  ["Piscine chauffée", "Une parenthèse d’eau pour prolonger le soin et donner de la valeur à la journée spa."],
  ["Jacuzzis", "Détente, récupération et pause lente dans le parcours wellness."],
  ["Salle de sport", "Un appui fitness pour les clients hébergement et les séjours plus actifs."],
  ["Manucure / pédicure", "Beauté des mains et des pieds pour séjour, mariage ou pause journée."],
  ["Coiffure", "Coiffure homme et femme, préparation avant événement ou rituel bridal."],
  ["Tisanerie", "Un moment final qui imprime le calme du Canopy Spa dans la mémoire du visiteur."],
] as const;

const spaRituals = [
  {
    title: "Rituel Canopy Signature",
    meta: "Soin complet",
    copy: "Un parcours lent qui associe chaleur, soin, eau et tisanerie pour transformer une simple pause en rituel mémorable.",
  },
  {
    title: "Hammam & massage",
    meta: "Solo ou duo",
    copy: "Le format lisible pour les clients journée, les couples et les séjours qui veulent un bénéfice immédiat.",
  },
  {
    title: "Canopy Spa Day",
    meta: "Journée bien-être",
    copy: "Une offre à composer avec piscine chauffée, jacuzzis, soin et table du Domaine selon calendrier.",
  },
  {
    title: "Bridal Rituals",
    meta: "Mariage",
    copy: "Préparation mariée, duo, beauté, coiffure et rituels avant cérémonie ou brunch du lendemain.",
  },
] as const;

const spaConditions = [
  ["Horaires soins", "10h - 19h selon calendrier et confirmation opérationnelle."],
  ["Réservation", "Créneau conseillé à l’avance, surtout pour duo, bridal rituals et week-ends."],
  ["Accès", "Selon offre, disponibilité, capacité spa et conditions du jour."],
  ["Documents", "Carte spa téléchargeable et demande personnalisée via formulaire dédié."],
] as const;

const referenceHeroConfigs = {
  experiences: {
    subtitle: "Des moments signature à composer selon l’âge, la saison et l’envie.",
    copy: "Safari, parc animalier, cheval sunset, quad, sport, Kids Club, pique-nique, barbecue, dîner sous les étoiles, ateliers et journée spa structurent une page expérientielle claire et premium.",
    badge: "19 expériences",
    meta: "Familles, couples, groupes, clients journée",
    anchors: [
      ["#experience-filters", "All Curates", "Filtres par univers"],
      ["#experience-list", "Experiences", "Fiches détaillées"],
      ["#experience-signature", "Signature", "Moments forts"],
      ["#experience-booking", "Booking", "Réserver"],
    ],
  },
  "evenements-entreprise": {
    subtitle: "Séminaires, réunions, team buildings et privatisations dans un domaine vivant.",
    copy: "Le Domaine réunit espaces, restauration, hébergement, parc, spa et activités de groupe pour générer des demandes MICE qualifiées avec un parcours RFP clair.",
    badge: "RFP corporate",
    meta: "Réunion, banquet, cocktail, activité d’équipe",
    anchors: [
      ["#corporate-spaces", "Spaces", "Espaces disponibles"],
      ["#corporate-capacities", "Capacities", "Formats et données"],
      ["#corporate-programmes", "Programmes", "Team buildings"],
      ["#lead-form", "Proposal", "Formulaire RFP"],
    ],
  },
  offres: {
    subtitle: "Des offres commerciales désirables, structurées sans logique de discount agressif.",
    copy: "Séjours, famille, spa, restaurants, journée, événements et saisons sont présentés avec inclusions, validité, conditions et CTA de réservation ou contact.",
    badge: "11 offres",
    meta: "Séjours, famille, spa, journée, saison",
    anchors: [
      ["#offers-filters", "All Offers", "Filtres commerciaux"],
      ["#offers-list", "Packages", "Offres détaillées"],
      ["#offers-conditions", "Conditions", "Avant de réserver"],
      ["#offers-contact", "Contact", "Conseil"],
    ],
  },
  agenda: {
    subtitle: "Brunchs, soirées, enfants, sport, saisons et dîners thématiques au bon moment.",
    copy: "Une page agenda doit donner envie de revenir : elle filtre par date et par univers, met en avant les temps forts et oriente vers la réservation ou l’ajout au calendrier.",
    badge: "Programmation",
    meta: "Brunchs, soirées, famille, saison",
    anchors: [
      ["#agenda-featured", "Featured", "Temps fort"],
      ["#agenda-programme", "Agenda", "Dates et univers"],
      ["#agenda-season", "Saison", "Moments à venir"],
      ["#agenda-booking", "Booking", "Réserver"],
    ],
  },
  contact: {
    subtitle: "Chaque demande arrive au bon service, sans formulaire générique ni perte de temps.",
    copy: "Séjour, table, spa, mariage, corporate, parc, activités ou presse : le parcours contact qualifie la demande et accélère la réponse de l’équipe concernée.",
    badge: "Contact dédié",
    meta: "Séjour, table, spa, événements, presse",
    anchors: [
      ["#contact-services", "Services", "Orienter"],
      ["#contact-concierge", "Concierge", "Préparer"],
      ["#lead-form", "Formulaire", "Demande"],
      ["#contact-access", "Accès", "Venir"],
    ],
  },
} as const;

const agendaFilters = ["Tous", "Date", "Brunchs", "Soirées", "Sport", "Famille", "Saison", "Restaurants", "Concerts"] as const;

function calendarHref(title: string, details: string) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details,
    location: "Domaine Limoune, région Agadir - Taroudant",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const agendaProgrammes = [
  {
    slug: "brunch-familial-orangers",
    title: "Brunch familial",
    category: "Brunchs",
    date: "Chaque dimanche selon saison",
    place: "Aman sous les Orangers",
    image: images.restaurantAman,
    description: "Un rendez-vous familial sous les orangers, pensé pour les groupes, les enfants et les visiteurs journée avec réservation recommandée.",
  },
  {
    slug: "soirees-limoune-club",
    title: "Soirées Limoune Club",
    category: "Soirées",
    date: "Selon programmation",
    place: "Limoune Club",
    image: images.restaurantClub,
    description: "Un format de soirée avec ambiance lounge, cheminée, food and drinks, musique et privatisation possible selon calendrier.",
  },
  {
    slug: "diffusions-sportives",
    title: "Diffusions sportives",
    category: "Sport",
    date: "Selon calendrier sportif",
    place: "Limoune Club",
    image: images.corporateSpaces,
    description: "Matchs, temps forts sportifs et soirées de groupe dans un espace pensé pour se retrouver autour d’une programmation claire.",
  },
  {
    slug: "activations-ete",
    title: "Été au Domaine Limoune",
    category: "Saison",
    date: "Pendant l’été",
    place: "Piscine, parc animalier et activités",
    image: images.pool,
    description: "Monkey Beach, parc animalier, kids club, restaurants et moments en plein air.",
  },
  {
    slug: "kids-events",
    title: "Kids events",
    category: "Famille",
    date: "Vacances et week-ends",
    place: "Kids Club et jardins",
    image: images.experienceFamily,
    description: "Événements enfants, club enfants, chasse au trésor et formats famille selon âge, capacité et encadrement confirmé.",
  },
  {
    slug: "evenements-speciaux",
    title: "Événements spéciaux",
    category: "Saison",
    date: "Temps forts du Domaine",
    place: "Domaine Limoune",
    image: images.domain,
    description: "Moments exceptionnels, activations privées, rendez-vous saisonniers et événements signature à annoncer selon calendrier opérationnel.",
  },
  {
    slug: "ramadan-au-domaine",
    title: "Ramadan au Domaine",
    category: "Saison",
    date: "Selon calendrier religieux",
    place: "Restaurants et jardins",
    image: images.restaurants,
    description: "Une programmation Ramadan dédiée aux tables, familles et moments de partage, avec horaires et menus confirmés au lancement.",
  },
  {
    slug: "wild-summer",
    title: "Été au Domaine Limoune",
    category: "Saison",
    date: "Pendant l’été",
    place: "Piscine, parc animalier et activités",
    image: images.offers,
    description: "Piscine, brunch familial, kids club, parc animalier et dîners d’été à vivre du matin jusqu’au soir.",
  },
  {
    slug: "coupe-du-monde",
    title: "Coupe du Monde",
    category: "Sport",
    date: "Selon calendrier compétition",
    place: "Limoune Club",
    image: images.agenda,
    description: "Diffusions, offres food and drinks, groupes et moments de soirée à confirmer autour des matchs majeurs.",
  },
  {
    slug: "diners-thematiques",
    title: "Dîners thématiques",
    category: "Restaurants",
    date: "Programmation mensuelle",
    place: "Massa Restaurant",
    image: images.restaurantMassa,
    description: "Menus dédiés, cuisine signature, dîners découverte et formats privés pour positionner la table comme moment fort du Domaine.",
  },
  {
    slug: "concerts",
    title: "Concerts",
    category: "Concerts",
    date: "Selon agenda musical",
    place: "Jardins ou Limoune Club",
    image: images.corporateDinner,
    description: "Concerts et rendez-vous musicaux, selon saison, capacité, horaires et conditions techniques confirmées par l’équipe.",
  },
  {
    slug: "dj-sets",
    title: "DJ sets",
    category: "Soirées",
    date: "Selon programmation soirée",
    place: "Limoune Club ou espaces extérieurs",
    image: images.restaurantClub,
    description: "DJ sets, moments festifs et formats afterwork ou privés, avec réservation conseillée selon la programmation.",
  },
].map((event) => ({
  ...event,
  calendarHref: calendarHref(event.title, `${event.description} Lieu : ${event.place}. Date : ${event.date}.`),
}));

const contactServiceRoutes = [
  { title: "Réservations hébergement", text: "Dates, chambres, adultes, enfants, catégorie souhaitée et demande de modification.", href: "/contact?type=sejour", image: images.stays, cta: "Réserver un séjour" },
  { title: "Restaurants", text: "Table, brunch, groupe, menu, privatisation ou moment sous les orangers.", href: "/contact?type=restaurant", image: images.restaurants, cta: "Réserver une table" },
  { title: "Canopy Spa", text: "Soin, hammam, rituel duo, beauté, coiffure ou journée spa.", href: "/contact?type=spa", image: images.spa, cta: "Réserver un soin" },
  { title: "Mariages", text: "Date souhaitée, invités, cérémonie, dîner, after party, brunch et hébergement.", href: "/mariages#lead-form", image: images.weddings, cta: "Demander un devis" },
  { title: "Corporate & Events", text: "RFP, séminaire, réunion, team building, restauration, technique et budget.", href: "/evenements-entreprise#lead-form", image: images.corporate, cta: "Envoyer un brief" },
  { title: "Parc animalier", text: "Horaires, tarifs adultes/enfants, conditions d’accès, visite et règles de bien-être animal.", href: "/contact?type=parc-animalier", image: images.park, cta: "Préparer la visite" },
  { title: "Activités", text: "Safari Experience, quad, cheval, padel, tennis, kids club, picnic, BBQ et ateliers.", href: "/contact?type=activites", image: images.experiences, cta: "Réserver une activité" },
  { title: "Presse", text: "Dossier presse, visuels officiels, demandes médias, interviews et informations institutionnelles.", href: "/presse", image: images.agenda, cta: "Accéder presse" },
  { title: "Direction commerciale", text: "Demandes partenariats, agences, groupes, tour-opérateurs et opportunités commerciales.", href: "/contact?type=commercial", image: images.corporateMeeting, cta: "Contacter" },
  { title: "Informations générales", text: "Question pratique, orientation, accès, horaires ou demande non rattachée à un service précis.", href: "/contact?type=general", image: images.domain, cta: "Écrire" },
] as const;

const weddingHeroAnchors = [
  ["#wedding-promise", "Promesse", "Une célébration complète"],
  ["#wedding-venues", "Lieux", "Jardins, orangers, tables"],
  ["#wedding-journey", "Moments", "Cérémonie, dîner, after party"],
  ["#lead-form", "Devis", "Brief, date et invités"],
] as const;

const weddingVenues = [
  {
    title: "Jardins et orangers",
    eyebrow: "Cérémonie",
    image: images.weddings,
    text: "Un décor naturel pour installer l’arrivée des invités, la cérémonie et les premiers instants de réception dans une atmosphère lumineuse.",
    meta: ["Extérieur", "Cérémonie", "Cocktail"],
  },
  {
    title: "Aman sous les Orangers",
    eyebrow: "Dîner & brunch",
    image: images.restaurantAman,
    text: "Un lieu de partage pour les grandes tables, les brunchs du lendemain et les moments familiaux sous les orangers.",
    meta: ["Banquet", "Brunch", "Familles"],
  },
  {
    title: "Massa Restaurant",
    eyebrow: "Table signature",
    image: images.restaurantMassa,
    text: "Une adresse plus gastronomique pour un dîner précis, élégant et adapté aux formats privés ou aux réceptions plus structurées.",
    meta: ["Dîner", "Privé", "Signature"],
  },
  {
    title: "Limoune Club",
    eyebrow: "After party",
    image: images.restaurantClub,
    text: "Un univers de soirée pour prolonger la fête avec ambiance lounge, musique, diffusion et privatisation selon le format souhaité.",
    meta: ["Soirée", "Lounge", "Privatisation"],
  },
] as const;

const weddingJourney = [
  ["Cérémonie", "Choix du lieu, arrivée des invités, orientation du décor, rythme de la cérémonie et besoins techniques à confirmer avec l’équipe."],
  ["Dîner", "Menu, format de table, service, boissons, scénographie et coordination avec les restaurants du Domaine selon nombre d’invités."],
  ["After party", "Lieu de soirée, musique, horaires, circulation des invités, sécurité et prolongation festive selon conditions opérationnelles."],
  ["Brunch du lendemain", "Un retour doux sous les orangers pour réunir les familles, prolonger le week-end et clôturer la célébration."],
] as const;

const weddingBridalRituals = [
  ["Préparation mariée", "Soins, coiffure, beauté des mains et accompagnement calme avant la cérémonie."],
  ["Cabine duo", "Un rituel partagé pour les mariés ou les proches, à réserver selon disponibilité."],
  ["Lendemain de fête", "Soin, hammam, piscine chauffée, jacuzzis et tisanerie pour récupérer en douceur."],
] as const;

const weddingPlanningNeeds = [
  ["Hébergement invités", "Suites, lodges et catégories familiales selon disponibilité, composition du groupe et durée du séjour."],
  ["Prestataires", "Coordination avec wedding planners, décorateurs, photographie, animation, technique et fournisseurs validés."],
  ["Brief & moodboard", "Upload d’un document d’inspiration, budget indicatif, date souhaitée et date alternative pour préciser la demande."],
  ["Restauration", "Cérémonie, cocktail, dîner, after party et brunch du lendemain reliés aux tables et équipes du Domaine."],
] as const;

const experienceFilters = ["Toutes les expériences", "Explore", "Sport", "Famille", "Savour", "Wellness", "Soirée"] as const;

const signatureExperiences = [
  {
    name: "Safari Experience",
    category: "Explore",
    image: images.experienceSafari,
    description: "Observation, nature et immersion face aux animaux du Domaine, avec un rythme calme et respectueux.",
    duration: "Selon format confirmé",
    audience: "Familles, couples, clients hébergement",
    rate: "Sur demande",
    conditions: "Réservation conseillée, respect des consignes et disponibilité selon calendrier.",
    associated: ["Réserve Africaine", "Lodges Safari", "Parc Animalier"],
  },
  {
    name: "Parc animalier",
    category: "Famille",
    image: images.experienceSafari,
    description: "Une visite familiale et pédagogique pour découvrir plus de 30 espèces selon conditions d’accès.",
    duration: "Temps de visite selon saison",
    audience: "Familles, enfants, visiteurs journée",
    rate: "Tarifs adultes / enfants selon saison",
    conditions: "Ne pas nourrir les animaux, suivre le parcours et contacter l’équipe avant déplacement.",
    associated: ["Brunch familial", "Offres famille", "Agenda"],
  },
  {
    name: "Balade à cheval sunset",
    category: "Explore",
    image: images.experienceSunsetRide,
    description: "Une sortie de fin de journée dans la lumière chaude de la région, pensée comme un moment lent.",
    duration: "Créneau sunset",
    audience: "Couples, familles, groupes",
    rate: "Sur demande",
    conditions: "Âge, météo, encadrement et disponibilité à confirmer.",
    associated: ["Picnic Experience", "Dîner sous les étoiles"],
  },
  {
    name: "Quad",
    category: "Sport",
    image: images.experienceSport,
    description: "Une activité de plein air encadrée pour découvrir les alentours autrement.",
    duration: "Selon parcours",
    audience: "Adultes, groupes, activités d’équipe",
    rate: "Sur demande",
    conditions: "Encadrement obligatoire, âge minimum et conditions météo à confirmer.",
    associated: ["Team building", "Séminaires", "Offres groupe"],
  },
  {
    name: "Padel",
    category: "Sport",
    image: images.experienceSport,
    description: "Un moment sportif facile à intégrer au séjour, à la journée ou au team building.",
    duration: "Créneau réservé",
    audience: "Familles, entreprises, clients hébergement",
    rate: "Selon disponibilité",
    conditions: "Réservation du terrain recommandée.",
    associated: ["Tennis", "Team building", "Pool Day"],
  },
  {
    name: "Tennis",
    category: "Sport",
    image: images.experienceSport,
    description: "Un format actif pour couples, familles, groupes et clients hébergement.",
    duration: "Créneau réservé",
    audience: "Familles, clients séjour, groupes",
    rate: "Selon disponibilité",
    conditions: "Réservation du terrain recommandée.",
    associated: ["Padel", "Pool Day"],
  },
  {
    name: "Kids Club",
    category: "Famille",
    image: images.experienceFamily,
    description: "Un espace enfants pensé pour rassurer les parents et enrichir la journée au Domaine.",
    duration: "Selon programmation",
    audience: "Familles, enfants",
    rate: "Selon offre",
    conditions: "Âge, horaires et capacité à confirmer.",
    associated: ["Treasure Hunt", "Activités enfants", "Family Cinema"],
  },
  {
    name: "Treasure Hunt",
    category: "Famille",
    image: images.experienceFamily,
    description: "Une chasse au trésor scénarisée pour découvrir le Domaine en équipe.",
    duration: "Selon scénario",
    audience: "Enfants, familles, groupes",
    rate: "Sur demande",
    conditions: "Encadrement et âge des participants à confirmer.",
    associated: ["Kids Club", "Activités enfants"],
  },
  {
    name: "Picnic Experience",
    category: "Savour",
    image: images.experienceDiningStars,
    description: "Un panier gourmand dans un décor naturel et calme, à composer selon la saison.",
    duration: "Moment déjeuner ou sunset",
    audience: "Couples, familles",
    rate: "Sur demande",
    conditions: "Réservation préalable et lieu selon conditions du jour.",
    associated: ["Tea Time", "Balade sunset"],
  },
  {
    name: "BBQ Experience",
    category: "Savour",
    image: images.experienceDiningStars,
    description: "Une expérience conviviale de groupe autour du feu, des jardins et d’une table généreuse.",
    duration: "Déjeuner ou dîner",
    audience: "Groupes, entreprises, familles",
    rate: "Sur demande",
    conditions: "Nombre de personnes et lieu à confirmer.",
    associated: ["Événements d’entreprise", "Privatisation"],
  },
  {
    name: "Dîner sous les étoiles",
    category: "Soirée",
    image: images.experienceDiningStars,
    description: "Un dîner privatisable dans une atmosphère nocturne élégante.",
    duration: "Soirée",
    audience: "Couples, événements privés",
    rate: "Sur demande",
    conditions: "Météo, date, menu et lieu à confirmer.",
    associated: ["Massa Restaurant", "Mariages", "Offres saison"],
  },
  {
    name: "Tea Time sous les orangers",
    category: "Savour",
    image: images.experienceDiningStars,
    description: "Une pause douce et sensorielle au coeur des plantations.",
    duration: "Après-midi",
    audience: "Locaux, familles, visiteurs",
    rate: "Selon offre",
    conditions: "Selon programmation et disponibilité.",
    associated: ["Aman sous les Orangers", "Brunch familial"],
  },
  {
    name: "Brunch familial",
    category: "Savour",
    image: images.offerBrunch,
    description: "Une table généreuse sous les orangers pour familles, groupes et visiteurs journée.",
    duration: "Selon calendrier",
    audience: "Familles, groupes, visiteurs journée",
    rate: "Selon menu",
    conditions: "Réservation recommandée.",
    associated: ["Parc animalier", "Agenda", "Offres famille"],
  },
  {
    name: "Pool Day",
    category: "Famille",
    image: images.offerPool,
    description: "Une journée piscine, food and drinks et détente autour de Monkey Beach.",
    duration: "Journée",
    audience: "Familles, clients journée, résidents",
    rate: "Selon saison",
    conditions: "Accès soumis aux capacités, horaires et conditions du jour.",
    associated: ["Monkey Beach", "Offres été"],
  },
  {
    name: "Canopy Spa Day",
    category: "Wellness",
    image: images.experienceSpaDay,
    description: "Une journée wellness associant soin, eau, hammam et calme.",
    duration: "Demi-journée ou journée",
    audience: "Couples, spa, séjour, visiteurs journée",
    rate: "Selon carte spa",
    conditions: "Réservation du soin et du créneau obligatoire.",
    associated: ["Canopy Spa", "Escapade spa"],
  },
  {
    name: "Family Cinema Under the Stars",
    category: "Soirée",
    image: images.experienceFamily,
    description: "Une soirée familiale avec projection en plein air, à activer selon programmation.",
    duration: "Soirée",
    audience: "Familles, enfants",
    rate: "Selon agenda",
    conditions: "Programmation, météo et capacité à confirmer.",
    associated: ["Agenda", "Kids Club"],
  },
  {
    name: "Cooking class",
    category: "Savour",
    image: images.experienceDiningStars,
    description: "Atelier autour des saveurs du Domaine et de la cuisine locale.",
    duration: "Atelier",
    audience: "Tour-opérateurs, familles, groupes",
    rate: "Sur demande",
    conditions: "Nombre de participants et date à confirmer.",
    associated: ["Massa Restaurant", "Groupes"],
  },
  {
    name: "Mixologie",
    category: "Savour",
    image: images.experienceDiningStars,
    description: "Atelier boissons pour groupes, soirées privées ou événements d’entreprise.",
    duration: "Atelier",
    audience: "Adultes, groupes",
    rate: "Sur demande",
    conditions: "Réservé aux adultes, date et format à confirmer.",
    associated: ["Limoune Club", "Corporate & Events"],
  },
  {
    name: "Activités enfants",
    category: "Famille",
    image: images.experienceFamily,
    description: "Des activités adaptées à l’âge, au calendrier et aux conditions du jour.",
    duration: "Selon programmation",
    audience: "Enfants, familles",
    rate: "Selon offre",
    conditions: "Âge, encadrement et capacité à confirmer.",
    associated: ["Kids Club", "Treasure Hunt", "Agenda"],
  },
] as const;

type SignatureExperience = (typeof signatureExperiences)[number];
type SignatureExperienceName = SignatureExperience["name"];

const experiencePhoto = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;

const experienceMediaImageSets = {
  "Safari Experience": [images.experienceSafari, experiencePhoto("10714622"), experiencePhoto("11753049")],
  "Parc animalier": [images.park, experiencePhoto("15171578"), experiencePhoto("18189294")],
  "Balade à cheval sunset": [images.experienceSunsetRide, experiencePhoto("3859349"), experiencePhoto("3854868")],
  Quad: [experiencePhoto("26568791"), experiencePhoto("29862470"), images.experiences],
  Padel: [experiencePhoto("31012869"), experiencePhoto("35248469"), experiencePhoto("28625142")],
  Tennis: [experiencePhoto("28625142"), experiencePhoto("35214667"), experiencePhoto("31012869")],
  "Kids Club": [images.experienceFamily, experiencePhoto("33738065"), experiencePhoto("19230221")],
  "Treasure Hunt": [experiencePhoto("8083375"), experiencePhoto("8083360"), experiencePhoto("5274605")],
  "Picnic Experience": [experiencePhoto("5050188"), experiencePhoto("7669127"), images.experienceDiningStars],
  "BBQ Experience": [experiencePhoto("20200267"), experiencePhoto("8523514"), images.corporateDinner],
  "Dîner sous les étoiles": [images.experienceDiningStars, experiencePhoto("18314765"), experiencePhoto("37958130")],
  "Tea Time sous les orangers": [experiencePhoto("9588429"), experiencePhoto("33588095"), images.restaurantAman],
  "Brunch familial": [images.offerBrunch, experiencePhoto("18908093"), experiencePhoto("5865690")],
  "Pool Day": [images.offerPool, experiencePhoto("10039270"), experiencePhoto("2540726")],
  "Canopy Spa Day": [images.experienceSpaDay, experiencePhoto("19641818"), experiencePhoto("19695981")],
  "Family Cinema Under the Stars": [experiencePhoto("34786572"), experiencePhoto("6521575"), images.experienceFamily],
  "Cooking class": [experiencePhoto("5643191"), experiencePhoto("8511864"), images.restaurantMassa],
  Mixologie: [experiencePhoto("31893699"), experiencePhoto("34575937"), images.restaurantClub],
  "Activités enfants": [experiencePhoto("5274605"), experiencePhoto("27788079"), experiencePhoto("33738065")],
} satisfies Record<SignatureExperienceName, readonly string[]>;

const experienceSlideAngles = [
  { label: "Signature", phrase: "la promesse signature" },
  { label: "Ambiance", phrase: "l'ambiance" },
  { label: "Détail", phrase: "le détail" },
] as const;

function getExperienceMediaSlides(experience: SignatureExperience) {
  return experienceMediaImageSets[experience.name].map((src, index) => {
    const angle = experienceSlideAngles[index] ?? { label: `Vue ${index + 1}`, phrase: "une autre facette" };

    return {
      src,
      alt: `${experience.name} au Domaine Limoune - ${angle.label.toLowerCase()}`,
      title: index === 0 ? experience.name : `${experience.name} - ${angle.label}`,
      description:
        index === 0
          ? experience.description
          : `${experience.description} Cette vue met en avant ${angle.phrase} de l'expérience, avec un format confirmé par l'équipe selon calendrier et conditions du jour.`,
    };
  });
}

const corporateSpaces = [
  {
    name: "Orangerie Limoune",
    image: images.corporateMeeting,
    surface: "Surface à confirmer",
    theatre: "Capacité théâtre à confirmer",
    banquet: "Capacité banquet à confirmer",
    cocktail: "Capacité cocktail à confirmer",
    meeting: "Capacité réunion à confirmer",
    equipment: "Écran, sonorisation, Wi-Fi, micro et audiovisuel selon demande.",
    food: "Pauses, déjeuner, dîner ou cocktail possible.",
    activities: "Team building, parc animalier, sports ou expériences outdoor possible.",
    text: "Un espace modulable pour réunions, présentations, séminaires et journées d’équipe dans une atmosphère naturelle.",
  },
  {
    name: "Aman sous les Orangers",
    image: images.corporateDinner,
    surface: "Surface à confirmer",
    theatre: "Selon configuration",
    banquet: "Banquet et grande tablée possibles",
    cocktail: "Cocktail selon privatisation",
    meeting: "Réunion informelle ou atelier",
    equipment: "Mobilier, lumière naturelle, setup restauration et technique sur demande.",
    food: "Brunch, déjeuner de groupe, banquet ou dîner corporate.",
    activities: "Activités de groupe et moments sous les orangers.",
    text: "Le lieu de partage pour déjeuners, dîners, brunchs corporate et moments de cohésion sous les orangers.",
  },
  {
    name: "Monkey Beach",
    image: images.offerPool,
    surface: "Surface à confirmer",
    theatre: "Non prioritaire",
    banquet: "Format cocktail ou food stations",
    cocktail: "Cocktail et activation été possibles",
    meeting: "Brief informel ou journée incentive",
    equipment: "Son, signalétique, service food and drinks selon saison.",
    food: "Pool day, snacking premium, boissons et activation estivale.",
    activities: "Piscine, jeux d’équipe, chill-out et journée incentive.",
    text: "Un univers piscine et détente pour incentive, journée collaborateurs, lancement informel ou activation saisonnière.",
  },
  {
    name: "Limoune Club",
    image: images.corporateSpaces,
    surface: "Surface à confirmer",
    theatre: "Selon configuration",
    banquet: "Dîner ou cocktail possible",
    cocktail: "Cocktail, afterwork ou soirée",
    meeting: "Réunion lounge ou présentation privée",
    equipment: "Diffusion sportive, son, écran et setup événementiel selon besoin.",
    food: "Offres food and drinks, afterwork, dîner et privatisation.",
    activities: "Diffusions, soirée d’équipe, club privé et after party.",
    text: "Un espace de soirée, sport, cheminée et privatisation pour prolonger le séminaire après la journée de travail.",
  },
  {
    name: "Jardins et espaces outdoor",
    image: images.corporateTeam,
    surface: "Surface à confirmer",
    theatre: "Atelier plein air selon météo",
    banquet: "Déjeuner ou dîner extérieur possible",
    cocktail: "Cocktail de bienvenue ou pause réseau",
    meeting: "Breakout, atelier ou respiration d’équipe",
    equipment: "Mobilier, signalétique, ombrage et technique selon météo.",
    food: "Pauses, pique-nique, BBQ ou dîner sous les étoiles.",
    activities: "Quad, padel, tennis, Treasure Hunt, parc animalier et safari selon conditions.",
    text: "Les espaces extérieurs donnent au séminaire sa différence : respirer, marcher, se retrouver et créer des souvenirs d’équipe.",
  },
] as const;

const corporateProgrammes = [
  ["Séminaires", "Réunion, ateliers, pauses, déjeuner, dîner et hébergement selon disponibilité."],
  ["Team buildings", "Quad, padel, tennis, Treasure Hunt, parc animalier, safari et expériences outdoor selon conditions."],
  ["Déjeuners / dîners corporate", "Massa, Aman sous les Orangers, Monkey Beach ou Limoune Club selon le ton souhaité."],
  ["Privatisations", "Espaces, restauration, activités et hébergement composés autour d’un brief RFP."],
] as const;

const offerFilters = ["Toutes les offres", "Séjours", "Famille", "Spa", "Restaurants", "Journée", "Événements", "Saison"] as const;

const limouneOffers = [
  {
    name: "Offre Été Limoune",
    category: "Saison",
    image: images.offers,
    description: "Une offre saisonnière pour profiter des lodges, de la piscine, du parc animalier et des expériences famille.",
    inclusions: ["Hébergement selon catégorie", "Piscine selon conditions", "Expériences famille selon calendrier", "Accès aux univers du Domaine selon offre"],
    validity: "Saison été, selon calendrier commercial",
    conditions: "Sous réserve de disponibilité, dates éligibles et conditions de réservation confirmées par l’équipe.",
  },
  {
    name: "Offre Famille",
    category: "Famille",
    image: images.offerFamily,
    description: "Un séjour pensé pour les parents et les enfants, avec hébergement confortable, activités et moments de partage.",
    inclusions: ["Hébergement familial", "Activités enfants selon programmation", "Conseil avant arrivée", "Options parc animalier ou piscine"],
    validity: "Selon périodes famille et vacances",
    conditions: "Capacité, âge des enfants, couchages et activités à confirmer avant réservation.",
  },
  {
    name: "Escapade Canopy Spa",
    category: "Spa",
    image: images.offerSpa,
    description: "Une parenthèse bien-être autour du spa, du hammam, des soins et des espaces de détente du Canopy.",
    inclusions: ["Soin ou rituel selon carte spa", "Accès wellness selon offre", "Créneau conseillé", "Option table ou séjour"],
    validity: "Selon disponibilités spa",
    conditions: "Réservation du soin obligatoire, horaires soins 10h - 19h selon calendrier.",
  },
  {
    name: "Brunch & Parc Animalier",
    category: "Restaurants",
    image: images.offerBrunch,
    description: "Une journée complète entre table, nature et découverte familiale.",
    inclusions: ["Brunch sous les orangers", "Parcours parc animalier selon conditions", "Moment famille", "Réservation restaurant"],
    validity: "Selon agenda brunch et ouverture du parc",
    conditions: "Accès parc, horaires, tarifs adultes / enfants et capacité à confirmer.",
  },
  {
    name: "Pool Day",
    category: "Journée",
    image: images.offerPool,
    description: "Accès piscine, cuisine, boissons et détente autour de Monkey Beach.",
    inclusions: ["Accès piscine selon conditions", "Food and drinks", "Transat selon disponibilité", "Ambiance journée famille"],
    validity: "Saison piscine",
    conditions: "Accès soumis aux horaires, à la capacité du jour et aux conditions de séjour.",
  },
  {
    name: "Safari Lodge Experience",
    category: "Séjours",
    image: images.offerSafari,
    description: "L’offre dédiée aux lodges face à la réserve africaine.",
    inclusions: ["Lodge safari selon disponibilité", "Observation depuis l’univers de séjour", "Petit-déjeuner selon offre", "Accès aux expériences selon conditions"],
    validity: "Toute l’année selon disponibilité",
    conditions: "La Réserve Africaine est liée à l’hébergement et ne constitue pas une simple visite indépendante.",
  },
  {
    name: "Stay Longer",
    category: "Séjours",
    image: images.offerStay,
    description: "Une proposition premium pour prolonger le séjour sans discours promotionnel agressif.",
    inclusions: ["Nuits consécutives", "Conseil expériences", "Options restaurants et spa", "Parcours de séjour personnalisé"],
    validity: "Selon calendrier et durée minimale confirmée",
    conditions: "Conditions de durée, annulation et disponibilité à confirmer par l’équipe réservation.",
  },
  {
    name: "Offre Résidents Maroc",
    category: "Séjours",
    image: images.offerStay,
    description: "Un avantage ponctuel pour la clientèle locale et nationale.",
    inclusions: ["Conditions dédiées résidents", "Séjour ou journée selon période", "Options restaurants, piscine ou spa", "Réservation directe"],
    validity: "Selon calendrier commercial",
    conditions: "Justificatif, dates éligibles et services inclus à confirmer.",
  },
  {
    name: "Offre Juin",
    category: "Saison",
    image: images.offers,
    description: "Un temps fort saisonnier à activer selon calendrier commercial.",
    inclusions: ["Séjour ou journée selon campagne", "Expériences saisonnières", "Restaurants ou piscine selon offre", "Contact dédié"],
    validity: "Mois de juin selon calendrier validé",
    conditions: "Offre soumise à disponibilité et validation opérationnelle.",
  },
  {
    name: "Offre Ramadan",
    category: "Saison",
    image: images.offerBrunch,
    description: "Une proposition dédiée aux tables, séjours et moments familiaux du Ramadan.",
    inclusions: ["Moments de table selon programmation", "Séjour ou dîner selon offre", "Familles et groupes", "Réservation dédiée"],
    validity: "Période Ramadan selon calendrier religieux",
    conditions: "Menus, horaires et modalités confirmés au lancement de la programmation.",
  },
  {
    name: "Offre Fin d’année",
    category: "Événements",
    image: images.experienceDiningStars,
    description: "Une offre événementielle pour séjours, dîners et célébrations de fin d’année.",
    inclusions: ["Dîner ou séjour selon programmation", "Expérience festive", "Privatisation possible", "Contact événementiel"],
    validity: "Fin d’année selon agenda",
    conditions: "Programmation, menus, horaires et capacités à confirmer.",
  },
] as const;

export function PageRenderer({ page, locale }: PageRendererProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-[var(--limoune-bg)] text-[var(--limoune-brown)]">
        <Hero page={page} locale={locale} />
        {page.template === "home" ? <HomePage locale={locale} /> : <InnerPage page={page} locale={locale} />}
      </main>
      <Footer locale={locale} />
    </>
  );
}

function Hero({ page, locale }: PageRendererProps) {
  const isHome = page.template === "home";
  const heroCopy = isHome
    ? "Séjours, table, spa et expériences au cœur des orangers."
    : compactHeroSummary(page.summary);

  if (isHome) {
    return <HomeMasthead page={page} locale={locale} />;
  }

  if (["reserve-africaine", "parc-animalier"].includes(page.slug)) {
    return <WildlifeImmersiveHero page={page} locale={locale} />;
  }

  if (page.slug === "restaurants") {
    return <DiningImmersiveHero page={page} locale={locale} />;
  }

  if (page.slug === "canopy-spa") {
    return <CanopySpaImmersiveHero page={page} locale={locale} />;
  }

  if (["experiences", "evenements-entreprise", "offres", "agenda", "contact"].includes(page.slug)) {
    return <ReferenceInspiredHero page={page} locale={locale} />;
  }

  if (page.slug === "mariages") {
    return <WeddingLuxuryHero page={page} locale={locale} />;
  }

  const stayItem = getStayItemFromPage(page, locale);

  if (page.slug === "sejours") {
    return <StayListingHero page={page} locale={locale} />;
  }

  if (stayItem) {
    return <StayDetailHero page={page} locale={locale} item={stayItem} />;
  }

  return (
    <section className="bleed-hero inner-hero cinematic-hero relative isolate grid min-h-[68dvh] overflow-hidden bg-[var(--limoune-black)] pt-24 text-[var(--limoune-ivory)]">
      <EditorialMedia src={page.heroImage} alt={page.heroAlt} variant="hero" className="cinematic-hero-media absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,36,58,0.6),rgba(16,36,58,0.26)_48%,rgba(16,36,58,0.04)_86%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,var(--limoune-bg),transparent)]" />
      <span className="cinematic-orbit cinematic-orbit-one" aria-hidden="true" />
      <span className="cinematic-orbit cinematic-orbit-two" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid w-full max-w-[1240px] content-end gap-8 px-4 pb-9 md:px-6 md:pb-12 lg:grid-cols-[1fr_380px] lg:items-end">
        <Reveal>
          <p className="text-[0.68rem] font-bold tracking-[0.34em] text-[var(--limoune-orange)] uppercase">{page.eyebrow}</p>
          <h1 className="cinematic-title mt-4 max-w-5xl font-serif text-[clamp(2.8rem,5.8vw,5.8rem)] font-medium leading-[0.9] tracking-[-0.058em]">
            {page.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/76 md:text-lg md:leading-8">{heroCopy}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink cta={page.primaryCta} locale={locale} />
            {page.secondaryCta ? <ButtonLink cta={page.secondaryCta} locale={locale} /> : null}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <aside className="inner-hero-card border border-white/16 bg-white/[0.07] p-5 backdrop-blur-2xl lg:p-6">
            <button className="group flex min-h-12 items-center gap-3 text-left text-white" type="button" aria-label="Voir la vidéo du Domaine" data-video-trigger>
              <span className="grid size-12 place-items-center border border-white/25 bg-white/10 transition group-hover:bg-white group-hover:text-[var(--limoune-brown)]">
                <Play aria-hidden="true" className="size-4 fill-current" />
              </span>
              <span>
                <span className="block text-xs font-bold tracking-[0.3em] text-[var(--limoune-orange)] uppercase">Voir le film</span>
                <span className="mt-1 block font-serif text-2xl">L’esprit du Domaine</span>
              </span>
            </button>
            <div className="mt-6 grid divide-y divide-white/12">
              {[
                ["Séjour", "Suites, lodges, réserve"],
                ["Journée", "Restaurants, spa, parc, piscine"],
                ["Événement", "Mariage, entreprise, privatisation"],
              ].map(([label, text]) => (
                <div key={label} className="grid grid-cols-[5.2rem_1fr] gap-3 py-3 text-sm">
                  <span className="font-serif text-xl text-white">{label}</span>
                  <span className="leading-6 text-white/62">{text}</span>
                </div>
              ))}
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function WildlifeImmersiveHero({ page, locale }: PageRendererProps) {
  const isReserve = page.slug === "reserve-africaine";
  const subtitle = isReserve
    ? "Là où le silence des lodges laisse venir le vivant."
    : "Un parcours doux pour apprendre à regarder le vivant.";
  const copy = isReserve
    ? "Une expérience d’hébergement immersive, lente et attentive, pensée autour de l’observation."
    : "Une visite familiale, pédagogique et respectueuse, accessible selon conditions.";
  const heroAnchors = isReserve
    ? [
        ["#reserve-concept", "Concept", "Hébergement immersif"],
        ["#reserve-lodges", "Lodges", "Safari et réserve"],
        ["#reserve-rules", "Règles", "Respect animalier"],
        ["#reserve-contact", "Contact", "Réserver le bon séjour"],
      ]
    : [
        ["#park-concept", "Concept", "Visite familiale"],
        ["#park-species", "Espèces", "Plus de 30 espèces"],
        ["#park-rules", "Règles", "Bien-être animal"],
        ["#park-contact", "Contact", "Préparer la visite"],
      ];

  return (
    <section className={`dining-hero wildlife-dining-hero ${isReserve ? "is-reserve" : "is-park"} capella-stop-section`} aria-label={page.title}>
      <EditorialMedia src={page.heroImage} alt={page.heroAlt} variant="hero" className="dining-hero-media wildlife-dining-hero-media" />
      <div className="dining-hero-shade wildlife-dining-hero-shade" aria-hidden="true" />
      <div className="dining-hero-line" aria-hidden="true" />
      <div className="capella-template-wrapper dining-hero-inner">
        <Reveal>
          <div className="dining-hero-copy">
            <p className="dining-hero-kicker">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="dining-hero-subtitle">{subtitle}</p>
            <p>{copy}</p>
            <div className="dining-hero-actions">
              <ButtonLink cta={page.primaryCta} locale={locale} />
              {page.secondaryCta ? <ButtonLink cta={page.secondaryCta} locale={locale} /> : null}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <nav className="dining-hero-anchors" aria-label={`Parcours ${page.title}`}>
            {heroAnchors.map(([href, title, label], index) => (
              <a key={href} href={href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <small>{label}</small>
              </a>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}

function DiningImmersiveHero({ page, locale }: PageRendererProps) {
  return (
    <section className="dining-hero capella-stop-section" aria-label={page.title}>
      <EditorialMedia src={page.heroImage} alt={page.heroAlt} variant="hero" className="dining-hero-media" />
      <div className="dining-hero-shade" aria-hidden="true" />
      <div className="dining-hero-line" aria-hidden="true" />
      <div className="capella-template-wrapper dining-hero-inner">
        <Reveal>
          <div className="dining-hero-copy">
            <p className="dining-hero-kicker">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="dining-hero-subtitle">Quatre lieux de vie, quatre manières de goûter le Domaine.</p>
            <p>
              Massa Restaurant, Aman sous les Orangers, Monkey Beach et Limoune Club composent une restauration de séjour, de journée, de groupe et d’événement.
            </p>
            <div className="dining-hero-actions">
              <ButtonLink cta={{ ...page.primaryCta, href: "#restaurants-reservation" }} locale={locale} />
              {page.secondaryCta ? <ButtonLink cta={page.secondaryCta} locale={locale} /> : null}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <nav className="dining-hero-anchors" aria-label="Restaurants du Domaine">
            {diningVenueProfiles.map((venue, index) => (
              <a key={venue.slug} href={`#${venue.slug}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{venue.nav}</strong>
                <small>{venue.kicker}</small>
              </a>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}

function CanopySpaImmersiveHero({ page, locale }: PageRendererProps) {
  return (
    <section className="spa-hero capella-stop-section" aria-label={page.title}>
      <EditorialMedia src={page.heroImage} alt={page.heroAlt} variant="hero" className="spa-hero-media" />
      <div className="spa-hero-shade" aria-hidden="true" />
      <span className="spa-breathe-orb spa-breathe-orb-one" aria-hidden="true" />
      <span className="spa-breathe-orb spa-breathe-orb-two" aria-hidden="true" />
      <div className="capella-template-wrapper spa-hero-inner">
        <Reveal>
          <div className="spa-hero-copy">
            <p className="spa-hero-kicker">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="spa-hero-subtitle">Un refuge de lumière, de chaleur et d’eau au cœur du Domaine.</p>
            <p>
              Soins, hammams, cabines, cabine duo, piscine chauffée, jacuzzis, salle de sport, beauté, coiffure et tisanerie composent un parcours wellness clair et désirable.
            </p>
            <div className="spa-hero-actions">
              <ButtonLink cta={page.primaryCta} locale={locale} />
              {page.secondaryCta ? <ButtonLink cta={page.secondaryCta} locale={locale} /> : null}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <aside className="spa-hero-card cinematic-card" aria-label="Points clés Canopy Spa">
            <span>Horaires soins</span>
            <strong>10h - 19h</strong>
            <p>Rituels signature, hammams, duo, bridal rituals et journée spa selon disponibilité.</p>
            <div>
              {['Hammams', 'Cabine duo', 'Piscine chauffée'].map((item) => <small key={item}>{item}</small>)}
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function ReferenceInspiredHero({ page, locale }: PageRendererProps) {
  const config = referenceHeroConfigs[page.slug as keyof typeof referenceHeroConfigs];

  if (!config) return null;

  return (
    <section className={`reference-hero reference-hero-${page.slug} capella-stop-section`} aria-label={page.title}>
      <EditorialMedia src={page.heroImage} alt={page.heroAlt} variant="hero" className="reference-hero-media" />
      <div className="reference-hero-shade" aria-hidden="true" />
      <span className="reference-hero-orbit reference-hero-orbit-one" aria-hidden="true" />
      <span className="reference-hero-orbit reference-hero-orbit-two" aria-hidden="true" />
      <div className="capella-template-wrapper reference-hero-inner">
        <Reveal>
          <div className="reference-hero-copy">
            <p className="reference-hero-kicker">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="reference-hero-subtitle">{config.subtitle}</p>
            <p>{config.copy}</p>
            <div className="reference-hero-actions">
              <ButtonLink cta={page.primaryCta} locale={locale} />
              {page.secondaryCta ? <ButtonLink cta={page.secondaryCta} locale={locale} /> : null}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <aside className="reference-hero-card cinematic-card" aria-label={`Points clés ${page.title}`}>
            <div>
              <span>{config.badge}</span>
              <strong>{config.meta}</strong>
            </div>
            <nav className="reference-hero-anchors" aria-label={`Navigation ${page.title}`}>
              {config.anchors.map(([href, title, label], index) => (
                <a key={href} href={href}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <b>{title}</b>
                  <em>{label}</em>
                </a>
              ))}
            </nav>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function WeddingLuxuryHero({ page, locale }: PageRendererProps) {
  return (
    <section className="wedding-luxury-hero capella-stop-section" aria-label={page.title}>
      <EditorialMedia src={page.heroImage} alt={page.heroAlt} variant="hero" className="wedding-luxury-hero-media" />
      <div className="wedding-luxury-hero-shade" aria-hidden="true" />
      <div className="capella-template-wrapper wedding-luxury-hero-inner">
        <Reveal>
          <div className="wedding-luxury-copy">
            <p className="wedding-luxury-kicker">{page.eyebrow}</p>
            <h1>Un mariage sous les orangers</h1>
            <p className="wedding-luxury-subtitle">Cérémonie, dîner, after party, brunch, spa et hébergement invités dans une destination nature près d’Agadir.</p>
            <div className="wedding-luxury-actions">
              <ButtonLink cta={page.primaryCta} locale={locale} />
              {page.secondaryCta ? <ButtonLink cta={page.secondaryCta} locale={locale} /> : null}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <nav className="wedding-luxury-anchor-card" aria-label="Parcours mariage">
            {weddingHeroAnchors.map(([href, title, label], index) => (
              <a key={href} href={href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <small>{label}</small>
              </a>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}

function HomeMasthead({ page, locale }: PageRendererProps) {
  const copy = getHomeCopy(locale).masthead;

  return (
    <section className="masthead-capella capella-stop-section" aria-label={page.title}>
      <div className="masthead-panel">
        <EditorialMedia src={page.heroImage} alt={page.heroAlt} variant="hero" className="masthead-poster" />
        <video className="masthead-video" poster={heroVideos.poster} autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src={heroVideos.mobile} media="(max-width: 768px)" type="video/mp4" />
          <source src={heroVideos.desktop} type="video/mp4" />
        </video>
        <div className="masthead-shade" />
        <div className="masthead-textpanel">
          <div className="masthead-hero-copy" aria-label={copy.ariaLabel}>
            <p className="masthead-eyebrow">{copy.eyebrow}</p>
            <h1 className="masthead-main-title">{copy.title}</h1>
            <p className="masthead-cinematic-quote">{copy.quote}</p>
            <p className="masthead-shortline">{copy.shortline}</p>
          </div>
          <p className="masthead-bottomtext">{copy.bottomText}</p>
          <a className="masthead-downarrow" href="#domaine-limoune-story" aria-label={copy.downLabel} />
        </div>
        <div className="masthead-actionbar" aria-label={copy.actionsLabel}>
          <Link className="masthead-book-link" href={localizedHref(locale, "/sejours#booking")}>{copy.book}</Link>
          <Link className="masthead-safari-link" href={localizedHref(locale, "/reserve-africaine")}>{copy.safari}</Link>
          <button className="hp-popup-button" type="button" data-video-trigger aria-label={copy.videoLabel}>
            <Play aria-hidden="true" className="size-4 fill-current" />
            <span>{copy.film}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <CapellaCloneIntro locale={locale} />
      <CapellaCloneStory locale={locale} />
      <CapellaCloneGallery locale={locale} />
      <CapellaCloneUniverses locale={locale} />
      <CapellaCloneAccommodation locale={locale} />
      <CapellaCloneRituals locale={locale} />
      <CapellaCloneAvailable locale={locale} />
      <CapellaCloneOffers locale={locale} />
      <CapellaCloneAgenda locale={locale} />
      <CapellaCloneAwards locale={locale} />
      <CapellaCloneBookBanner locale={locale} />
      <CapellaClonePrefooter locale={locale} />
    </>
  );
}

function CapellaCloneIntro({ locale }: { locale: Locale }) {
  const copy = getHomeCopy(locale).intro;

  return (
    <section id="domaine-limoune-story" className="capella-award-intro capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <p className="luxury-kicker text-center">{copy.kicker}</p>
          <h2 className="capella-award-title">{copy.title}</h2>
        </Reveal>
        <div className="capella-award-layout">
          <Reveal>
            <div className="capella-award-left">
              <p className="capella-award-subtitle">{copy.subtitle}</p>
              <EditorialMedia src={images.restaurants} alt={copy.smallAlt} className="capella-award-small-image" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="capella-award-main">
              <EditorialMedia src={images.domain} alt={copy.mainAlt} className="capella-award-main-image" />
              <div className="capella-award-copy">
                <p>{copy.body}</p>
                <Link className="luxury-primary-link" href={localizedHref(locale, "/le-domaine")}>{copy.cta}</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CapellaCloneStory({ locale }: { locale: Locale }) {
  const copy = getHomeCopy(locale).story;

  return (
    <section className="section-titlesypnosis capella-stop-section">
      <div className="capella-template-wrapper">
        <div className="inner-wrapper clear-end">
          <Reveal>
            <div className="section-title srv story-title-stack">
              <h2>{copy.title}</h2>
              <EditorialMedia src={images.restaurants} alt={copy.visualAlt} className="story-side-visual" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="section-synopsis srv indent">
              {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <EditorialMedia src={images.reserve} alt={copy.synopsisAlt} className="synopsis-visual" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CapellaCloneUniverses({ locale }: { locale: Locale }) {
  const universes = homeStories(locale);
  const copy = getHomeCopy(locale).universes;

  return (
    <section className="section-scrollgrid section-universes capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="section_title split-title">
            <h2>{copy.title}</h2>
            <p>{copy.body}</p>
          </div>
        </Reveal>
        <div className="scroll-grid"><div className="scroll-grid-container"><div className="scroll-grid-scroll universe-grid">
          {universes.map((universe, index) => (
            <Reveal key={universe.title} delay={index * 0.04}>
              <Link href={localizedHref(locale, universe.href)} className="scroll-grid-panel active ani cinematic-card universe-card">
                <EditorialMedia src={universe.image} alt={universe.alt} className="section-grid-img" />
                <div className="section-grid-kicker">{String(index + 1).padStart(2, "0")} / {universe.eyebrow}</div>
                <div className="section-grid-title"><h4>{universe.title}</h4></div>
                <div className="section-grid-synopsis"><p>{universe.text}</p></div>
                <div className="section-grid-link"><span className="text-button">{universe.cta}</span></div>
              </Link>
            </Reveal>
          ))}
        </div></div></div>
      </div>
    </section>
  );
}

function CapellaCloneGallery({ locale }: { locale: Locale }) {
  const copy = getHomeCopy(locale).gallery;

  return (
    <section className="section-innergallery capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="innergallery-container">
            <EditorialMedia src={images.domain} alt={copy.alt} className="innergallery-panel active" />
            <div className="innergallery-caption">{copy.caption}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CapellaCloneAccommodation({ locale }: { locale: Locale }) {
  const cards = getCollectionCards("accommodations", locale).slice(0, 4);
  const copy = getHomeCopy(locale).accommodation;

  if (!cards.length) return null;

  return (
    <section id="section_accommodation" className="limoune-accommodation capella-stop-section">
      <div className="capella-template-wrapper luxury-stay-wrapper">
        <div className="luxury-section-head accommodation-head">
          <Reveal>
            <div>
              <p className="luxury-kicker">{copy.kicker}</p>
              <h2>{copy.title}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="luxury-section-copy">{copy.body}</p>
          </Reveal>
        </div>

        <div className="home-stay-card-grid">
          {cards.map((card, index) => (
            <Reveal key={`${card.title}-${index}`} delay={Math.min(index * 0.04, 0.12)}>
              <Link href={localizedHref(locale, card.href)} className="home-stay-card group">
                <EditorialMedia src={card.image} alt={card.alt} className="home-stay-card-image" />
                <span className="home-stay-card-body">
                  <span className="home-stay-card-kicker">{card.eyebrow}</span>
                  <span className="home-stay-card-title">{card.title}</span>
                  <span className="home-stay-card-text">{card.text}</span>
                  {card.meta?.length ? (
                    <span className="home-stay-card-meta">
                      {card.meta.slice(0, 3).map((meta) => <small key={meta}>{meta}</small>)}
                    </span>
                  ) : null}
                  <span className="home-stay-card-cta">
                    {copy.discover}
                    <ArrowRight aria-hidden="true" className="size-3 transition group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapellaCloneRituals({ locale }: { locale: Locale }) {
  const copy = getHomeCopy(locale).rituals;

  return (
    <section className="limoune-wild-summer capella-stop-section">
      <div className="wild-summer-glow" aria-hidden="true" />
      <div className="capella-template-wrapper wild-summer-wrapper">
        <Reveal>
          <div className="wild-summer-copy">
            <p className="luxury-kicker">{copy.kicker}</p>
            <h2>{copy.title}</h2>
            <p>{copy.body}</p>
            <div className="wild-ritual-list">
              {copy.items.map((ritual) => <span key={ritual}>{ritual}</span>)}
            </div>
            <Link className="luxury-primary-link" href={localizedHref(locale, "/offres")}>{copy.cta}</Link>
          </div>
        </Reveal>

        <div className="wild-summer-gallery">
          <Reveal delay={0.08}>
            <div className="wild-main-card cinematic-card">
              <EditorialMedia src={images.summer} alt={copy.mainAlt} className="wild-main-image" />
              <div className="wild-main-caption">
                <span>{copy.captionLead}</span>
                <strong>{copy.captionStrong}</strong>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="wild-side-stack">
              <EditorialMedia src={images.pool} alt={copy.poolAlt} className="wild-side-image" />
              <div className="wild-side-note">
                <span>{copy.noteTitle}</span>
                <p>{copy.noteBody}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CapellaCloneAgenda({ locale }: { locale: Locale }) {
  const agendaVisuals = [images.domain, images.pool, images.agenda, images.restaurants];
  const agenda = getCollectionCards("agenda", locale).slice(0, 4).map((item, index) => ({
    ...item,
    image: agendaVisuals[index] ?? item.image,
  }));
  const featured = agenda[1] ?? agenda[0];
  const copy = getHomeCopy(locale).agenda;

  if (!featured) return null;

  return (
    <section className="limoune-agenda-premium capella-stop-section">
      <div className="capella-template-wrapper agenda-premium-wrapper">
        <div className="agenda-premium-head">
          <Reveal>
            <div>
              <p className="luxury-kicker">{copy.kicker}</p>
              <h2>{copy.title}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="agenda-premium-copy">
              <p>{copy.body}</p>
              <div className="luxury-actions">
                <Link className="luxury-primary-link" href={localizedHref(locale, "/agenda")}>{copy.primary}</Link>
                <Link className="luxury-secondary-link" href={localizedHref(locale, "/contact?type=agenda")}>{copy.secondary}</Link>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="agenda-premium-stage">
          <Reveal>
            <article className="agenda-featured-card cinematic-card">
              <EditorialMedia src={featured.image} alt={featured.alt} className="agenda-featured-image" />
              <div className="agenda-featured-copy">
                <span>{copy.featuredLabel}</span>
                <h3>{copy.featuredTitle}</h3>
                <p>{copy.featuredBody}</p>
                <Link className="luxury-primary-link" href={localizedHref(locale, featured.href)}>{copy.featuredCta}</Link>
              </div>
            </article>
          </Reveal>
          <div className="agenda-schedule-panel">
            <Reveal delay={0.08}>
              <div className="agenda-filter-row" aria-label={copy.filtersLabel}>
                {copy.filters.map((item) => <span key={item}>{item}</span>)}
              </div>
            </Reveal>
            {agenda.map((item, index) => (
              <Reveal key={item.title} delay={0.1 + index * 0.04}>
                <Link href={localizedHref(locale, item.href)} className="agenda-schedule-card cinematic-card">
                  <EditorialMedia src={item.image} alt={item.alt} className="agenda-schedule-image" />
                  <span>
                    <small>{item.eyebrow}</small>
                    <strong>{item.title}</strong>
                    <em>{item.text}</em>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CapellaCloneAwards({ locale }: { locale: Locale }) {
  const copy = getHomeCopy(locale).awards;

  return (
    <section className="section-basetemplate awards-grid capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal><div className="section_title"><h2>{copy.title}</h2></div></Reveal>
        <div className="scroll-grid"><div className="scroll-grid-container"><div className="scroll-grid-scroll">
          {copy.signatures.map(([title, text, image, alt], index) => (
            <Reveal key={title} delay={index * 0.05}>
              <div className="scroll-grid-panel active ani cinematic-card">
                <EditorialMedia src={image} alt={alt} className="section-grid-img award-image" />
                <div className="section-grid-title"><h4>{title}</h4></div>
                <div className="section-grid-synopsis"><p>{text}</p></div>
              </div>
            </Reveal>
          ))}
        </div></div></div>
      </div>
    </section>
  );
}

function CapellaCloneBookBanner({ locale }: { locale: Locale }) {
  const copy = getHomeCopy(locale).bookBanner;

  return (
    <section className="limoune-booking-atelier capella-stop-section">
      <div className="capella-template-wrapper booking-atelier-wrapper">
        <Reveal>
          <div className="booking-atelier-media cinematic-card">
            <EditorialMedia src={images.stays} alt={copy.mediaAlt} className="booking-atelier-image" />
            <div className="booking-atelier-badge">
              <span>{copy.badge}</span>
            </div>
          </div>
        </Reveal>
        <div className="booking-atelier-content">
          <Reveal>
            <p className="luxury-kicker">{copy.kicker}</p>
            <h2>{copy.title}</h2>
            <p>{copy.body}</p>
            <div className="luxury-actions">
              <Link className="luxury-primary-link" href={localizedHref(locale, "/sejours#booking")}>{copy.primary}</Link>
              <Link className="luxury-secondary-link" href={localizedHref(locale, "/contact")}>{copy.secondary}</Link>
            </div>
          </Reveal>
          <div className="booking-path-grid">
            {copy.paths.map((item, index) => (
              <Reveal key={item.title} delay={0.08 + index * 0.035}>
                <Link className="booking-path-card cinematic-card" href={localizedHref(locale, item.href)}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                  <b>{item.cta}</b>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CapellaCloneOffers({ locale }: { locale: Locale }) {
  const offers = getCollectionCards("offers", locale).slice(0, 3);
  const copy = getHomeCopy(locale).offers;

  return (
    <section className="section-scrollgrid limoune-offers-section capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="section_title split-title">
            <h2>{copy.title}</h2>
            <p>{copy.body}</p>
          </div>
        </Reveal>
        <div className="scroll-grid"><div className="scroll-grid-container"><div className="scroll-grid-scroll limoune-offers-grid">
          {offers.map((offer, index) => (
            <Reveal key={offer.title} delay={index * 0.05}>
              <Link href={localizedHref(locale, offer.href)} className="scroll-grid-panel active ani cinematic-card offer-equal-card">
                <EditorialMedia src={offer.image} alt={offer.alt} className="section-grid-img" />
                <div className="section-grid-title"><h4>{offer.title}</h4></div>
                <div className="section-grid-synopsis"><p>{offer.text}</p></div>
                <div className="section-grid-link"><span className="text-button">{index === 0 ? copy.firstCta : copy.cta}</span></div>
              </Link>
            </Reveal>
          ))}
        </div></div></div>
      </div>
    </section>
  );
}

function CapellaCloneAvailable({ locale }: { locale: Locale }) {
  const copy = getHomeCopy(locale).available;

  return (
    <section className="limoune-available-now capella-stop-section">
      <div className="available-now-grain" aria-hidden="true" />
      <div className="capella-template-wrapper available-now-wrapper">
        <div className="available-editorial-grid">
          <Reveal>
            <div className="available-now-copy">
              <p className="luxury-kicker">{copy.kicker}</p>
              <h2>{copy.title}</h2>
              <p className="available-lead">{copy.body}</p>
              <div className="luxury-actions">
                <Link className="luxury-primary-link" href={localizedHref(locale, "/experiences")}>{copy.primary}</Link>
                <a className="luxury-secondary-link" href="https://wa.me/212667796817" data-track="whatsapp_click">{copy.secondary}</a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="available-showcase cinematic-card">
              <EditorialMedia src={images.pool} alt={copy.showcaseAlt} className="available-showcase-image" />
              <div className="available-reservation-card">
                <span>{copy.cardLabel}</span>
                <strong>{copy.cardTitle}</strong>
                <p>{copy.cardBody}</p>
                <Link href={localizedHref(locale, "/experiences")}>{copy.cardCta}</Link>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="available-service-grid">
          {copy.items.map((item, index) => (
            <Reveal key={item.title} delay={0.08 + index * 0.04}>
              <Link href={localizedHref(locale, item.href)} className="available-service-card cinematic-card">
                <EditorialMedia src={item.image} alt={item.alt} className="available-service-image" />
                <span className="available-card-copy">
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{item.title}</strong>
                  <em>{item.text}</em>
                  <b>{item.cta}</b>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapellaClonePrefooter({ locale }: { locale: Locale }) {
  const copy = getHomeCopy(locale).prefooter;

  return (
    <section className="limoune-contact-hub capella-stop-section">
      <div className="capella-template-wrapper contact-hub-wrapper">
        <div className="contact-hub-head">
          <Reveal>
            <div>
              <p className="luxury-kicker">{copy.kicker}</p>
              <h2>{copy.title}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p>{copy.body}</p>
          </Reveal>
        </div>

        <div className="contact-hub-stage">
          <Reveal>
            <article className="contact-concierge-card cinematic-card">
              <EditorialMedia src={images.domain} alt={copy.mediaAlt} className="contact-hub-image" />
              <div className="contact-concierge-copy">
                <span>Le Domaine Limoune</span>
                <strong>{copy.location}</strong>
                <p>{copy.cardBody}</p>
                <div className="contact-concierge-actions">
                  <Link href={localizedHref(locale, "/contact")}>{copy.contactForm}</Link>
                  <a href="https://wa.me/212667796817" data-track="whatsapp_click">{copy.whatsapp}</a>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="contact-route-grid">
            {copy.contacts.map((item, index) => (
              <Reveal key={item.title} delay={0.08 + index * 0.035}>
                <Link className="contact-route-card cinematic-card" href={localizedHref(locale, item.href)}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                  <b>{item.cta}</b>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="contact-proof-strip-wrap" delay={0.16}>
            <div className="contact-proof-strip">
              {copy.proof.map((item) => <span key={item}>{item}</span>)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InnerPage({ page, locale }: PageRendererProps) {
  const collectionCards = page.collection ? getCollectionCards(page.collection, locale) : [];
  const collectionIntro = getCollectionIntro(page);
  const contentSections = page.sections;
  const hasServiceBlock = Boolean(page.downloads?.length || page.form || page.faqs?.length);
  const showCollectionFirst = page.template === "collection";

  if (page.slug === "sejours") {
    return <StayLandingPage page={page} locale={locale} />;
  }

  const stayItem = getStayItemFromPage(page, locale);

  if (stayItem) {
    return <StayRoomDetailPage page={page} locale={locale} item={stayItem} />;
  }

  if (page.slug === "reserve-africaine") {
    return <ReserveAfricainePage page={page} locale={locale} />;
  }

  if (page.slug === "parc-animalier") {
    return <ParcAnimalierPage page={page} locale={locale} />;
  }

  if (page.slug === "restaurants") {
    return <RestaurantsLandingPage page={page} locale={locale} />;
  }

  if (page.slug === "canopy-spa") {
    return <CanopySpaLandingPage page={page} locale={locale} />;
  }

  if (page.slug === "experiences") {
    return <ExperiencesLandingPage page={page} locale={locale} />;
  }

  if (page.slug === "mariages") {
    return <WeddingLuxuryPage page={page} locale={locale} />;
  }

  if (page.slug === "evenements-entreprise") {
    return <CorporateEventsLandingPage page={page} locale={locale} />;
  }

  if (page.slug === "offres") {
    return <OffersLandingPage page={page} locale={locale} />;
  }

  if (page.slug === "agenda") {
    return <AgendaLandingPage page={page} locale={locale} />;
  }

  if (page.slug === "contact") {
    return <ContactLandingPage page={page} locale={locale} />;
  }

  return (
    <>
      <InnerEditorialIntro page={page} locale={locale} />

      {showCollectionFirst && collectionCards.length > 0 ? (
        <CollectionSection intro={collectionIntro} page={page} cards={collectionCards} locale={locale} />
      ) : null}

      {contentSections.length > 0 ? <ContentSections page={page} sections={contentSections} locale={locale} /> : null}

      {!showCollectionFirst && collectionCards.length > 0 ? (
        <CollectionSection intro={collectionIntro} page={page} cards={collectionCards} locale={locale} />
      ) : null}

      {page.gallery?.length ? <PageGallery title={`${page.title} en images`} imagesList={page.gallery} /> : null}

      {hasServiceBlock ? <InnerServiceBlock page={page} /> : null}

      <WildlifeContactBlock locale={locale} page={page} />
    </>
  );
}

type StayCategory = {
  id: string;
  nav: string;
  title: string;
  subtitle: string;
  copy: string;
  items: Accommodation[];
};

function StayListingHero({ page, locale }: PageRendererProps) {
  const copy = getStayCopy(locale).hero;

  return (
    <section className="stay-capella-hero stay-capella-hero-listing capella-stop-section">
      <div className="capella-template-wrapper stay-capella-hero-inner">
        <Reveal>
          <div className="stay-capella-hero-copy stay-capella-hero-copy-grid">
            <div>
              <p className="section-kicker">{copy.kicker}</p>
              <h1>{page.title}</h1>
              <p className="stay-capella-subtitle">{copy.subtitle}</p>
              {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className="stay-hero-actions">
                <ButtonLink cta={page.primaryCta} locale={locale} />
                {page.secondaryCta ? <ButtonLink cta={page.secondaryCta} locale={locale} /> : null}
              </div>
            </div>
            <EditorialMedia src={page.heroImage} alt={page.heroAlt} className="stay-capella-hero-image" />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <nav className="stay-capella-breadcrumb" aria-label={copy.breadcrumbLabel}>
            <Link href={localizedHref(locale, "/")}>{copy.home}</Link>
            <span>{page.title}</span>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}

function StayDetailHero({ page, locale, item }: { page: SitePage; locale: Locale; item: Accommodation }) {
  const copy = getStayCopy(locale).detail;

  return (
    <section className="stay-capella-hero stay-capella-hero-detail capella-stop-section">
      <div className="capella-template-wrapper stay-capella-hero-inner">
        <Reveal>
          <div className="stay-capella-hero-copy stay-capella-hero-copy-grid">
            <div>
              <h1>{page.title}</h1>
              <p className="stay-capella-subtitle">{item.position}</p>
              <p>{item.emotionalText}</p>
              <p>{copy.heroSummary}</p>
              <div className="stay-hero-actions">
                <ButtonLink cta={page.primaryCta} locale={locale} />
                {page.secondaryCta ? <ButtonLink cta={page.secondaryCta} locale={locale} /> : null}
              </div>
            </div>
            <EditorialMedia src={item.image} alt={page.heroAlt} className="stay-capella-hero-image" />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <nav className="stay-capella-breadcrumb" aria-label={copy.breadcrumbLabel}>
            <Link href={localizedHref(locale, "/")}>{copy.home}</Link>
            <Link href={localizedHref(locale, "/sejours")}>{copy.stays}</Link>
            <span>{item.name.toUpperCase()}</span>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}

function StayLandingPage({ page, locale }: { page: SitePage; locale: Locale }) {
  const categories = getStayCategories(locale);

  return (
    <>
      <StayEmotionalIntro locale={locale} />
      <StayCategoryOverview locale={locale} />
      <StayCatalog categories={categories} locale={locale} />
      <StayBookStayBand locale={locale} cta={page.primaryCta} secondaryCta={page.secondaryCta} />
      <StayGuestServices locale={locale} />
      <StayConditions locale={locale} />
      <StayRelatedOffers locale={locale} />
      <StayContactBlock locale={locale} />
    </>
  );
}

function StayEmotionalIntro({ locale }: { locale: Locale }) {
  const copy = getStayCopy(locale).intro;

  return (
    <section className="stay-pdf-section stay-emotional-intro capella-stop-section">
      <div className="capella-template-wrapper stay-pdf-two-col">
        <Reveal>
          <div>
            <p className="section-kicker">{copy.kicker}</p>
            <h2>{copy.title}</h2>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="stay-pdf-copy">
            {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StayCategoryOverview({ locale }: { locale: Locale }) {
  const copy = getStayCopy(locale).overview;

  return (
    <section className="stay-pdf-section stay-category-overview capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="stay-pdf-head">
            <p className="section-kicker">{copy.kicker}</p>
            <h2>{copy.title}</h2>
            <p>{copy.body}</p>
          </div>
        </Reveal>
        <div className="stay-category-overview-grid">
          {copy.cards.map((card, index) => (
            <Reveal key={card.title} delay={Math.min(index * 0.04, 0.12)}>
              <a href={card.href} className="stay-category-overview-card group">
                <EditorialMedia src={card.image} alt={locale === "en" ? `${card.title} at Le Domaine Limoune` : `${card.title} au Domaine Limoune`} className="stay-category-overview-image" />
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{card.title}</strong>
                <span>{card.text}</span>
                <em>
                  {copy.cta}
                  <ArrowRight aria-hidden="true" className="size-3 transition group-hover:translate-x-1" />
                </em>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StayGuestServices({ locale }: { locale: Locale }) {
  const copy = getStayCopy(locale).services;

  return (
    <section className="stay-guest-services capella-stop-section">
      <div className="capella-template-wrapper stay-guest-services-inner">
        <Reveal>
          <div>
            <h2>{copy.title}</h2>
            <p>{copy.body}</p>
          </div>
        </Reveal>
        <div className="stay-guest-services-list">
          {copy.items.map((service, index) => (
            <Reveal key={service} delay={Math.min(index * 0.018, 0.12)}>
              <p>{service}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StayConditions({ locale }: { locale: Locale }) {
  const copy = getStayCopy(locale).conditions;

  return (
    <section className="stay-conditions-section capella-stop-section">
      <div className="capella-template-wrapper stay-pdf-two-col">
        <Reveal>
          <div>
            <p className="section-kicker">{copy.kicker}</p>
            <h2>{copy.title}</h2>
          </div>
        </Reveal>
        <div className="stay-conditions-list">
          {copy.items.map(([title, text], index) => (
            <Reveal key={title} delay={Math.min(index * 0.04, 0.12)}>
              <article>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StayRelatedOffers({ locale }: { locale: Locale }) {
  const copy = getStayCopy(locale).relatedOffers;

  return (
    <section className="stay-related-offers capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="stay-pdf-head">
            <p className="section-kicker">{copy.kicker}</p>
            <h2>{copy.title}</h2>
            <p>{copy.body}</p>
          </div>
        </Reveal>
        <div className="stay-related-offers-grid">
          {copy.items.map(([title, text], index) => (
            <Reveal key={title} delay={Math.min(index * 0.04, 0.12)}>
              <Link href={localizedHref(locale, "/offres")} className="stay-related-offer-card group">
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{title}</strong>
                <span>{text}</span>
                <em>
                  {copy.cta}
                  <ArrowRight aria-hidden="true" className="size-3 transition group-hover:translate-x-1" />
                </em>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StayBookStayBand({ locale, cta, secondaryCta }: { locale: Locale; cta: SitePage["primaryCta"]; secondaryCta?: SitePage["secondaryCta"] }) {
  const copy = getStayCopy(locale).booking;

  return (
    <section id="booking" className="stay-book-band capella-stop-section">
      <div className="capella-template-wrapper stay-book-band-inner">
        <Reveal>
          <div>
            <h2>{copy.title}</h2>
            <p>{copy.body}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="stay-booking-panel">
            <div className="booking-card stay-booking-card">
              <div className="booking-card-head">
                <div>
                  <p className="section-kicker">{copy.moduleKicker}</p>
                  <h3 className="booking-title">{copy.moduleTitle}</h3>
                </div>
              </div>
              <form className="booking-grid" action={localizedHref(locale, "/contact")} method="get">
                <input type="hidden" name="type" value="sejour" />
                {copy.fields.map((field) => <BookingField key={field.name} {...field} />)}
                <button type="submit" data-track={cta.track} className="booking-submit">
                  {cta.label}
                </button>
              </form>
            </div>
            <div className="stay-booking-secondary-actions">
              <ButtonLink cta={{ label: copy.adviceCta, href: "/contact?type=sejour", variant: "secondary" }} locale={locale} />
              {secondaryCta ? <ButtonLink cta={secondaryCta} locale={locale} /> : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BookingField({ label, name, type, min }: { label: string; name: string; type: string; min?: string }) {
  return (
    <label className="booking-field">
      {label}
      <input name={name} type={type} min={min} />
    </label>
  );
}

function ReserveAfricainePage({ page, locale }: { page: SitePage; locale: Locale }) {
  const lodgeCards = accommodations
    .filter((item) => item.meta.some((meta) => ["Réserve", "Safari"].includes(meta)) || item.slug.includes("safari"))
    .slice(0, 3);
  const featuredLodge = lodgeCards[0];

  return (
    <>
      <section id="reserve-concept" className="wildlife-intro reserve-intro capella-stop-section">
        <div className="capella-template-wrapper wildlife-intro-grid">
          <Reveal>
            <div>
              <p className="section-kicker">Concept réserve</p>
              <h2>Une nuit, pas une simple visite.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="wildlife-intro-copy">
              <p>La Réserve Africaine est un univers d’hébergement immersif. Elle s’adresse aux clients qui séjournent dans les lodges concernés et souhaitent vivre le Domaine dans un rapport plus lent, plus silencieux et plus attentif au vivant.</p>
              <p>Le message est volontairement clair : le Parc Animalier se visite selon conditions ; la Réserve Africaine se vit depuis le séjour, face aux animaux, avec une logique d’observation et de respect.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <WildlifeRequirementStrip
        kicker="Clarification essentielle"
        title="La réserve est liée à l’hébergement."
        copy="Cette page doit lever toute ambiguïté : la Réserve Africaine n’est pas une visite indépendante. Elle appartient au séjour dans les lodges concernés."
        items={[
          ["Accès", "Clients séjournant dans les lodges safari ou hébergements validés par l’équipe."],
          ["Expérience", "Observation calme depuis l’univers de séjour, sans nourrissage ni intervention."],
          ["Conversion", "Le parcours naturel mène vers le lodge safari et la réservation hébergement."],
        ]}
      />

      <WildlifeCinematicSection
        variant="reserve"
        title="Le safari se vit dans les détails."
        kicker="Scène immersive"
        quote="Le matin appartient au silence ; la réserve avance, et le séjour trouve son rythme."
        copy="Images larges, matières naturelles, présence animale et lignes de fuite composent une page plus sensible, plus premium et plus désirable avant la réservation."
        imagesList={[images.reserveLodge, images.reserveCanopy, images.reserveLandscape]}
      />

      <section className="ritual-editorial reserve-rituals capella-stop-section">
        <div className="capella-template-wrapper ritual-editorial-grid">
          <Reveal>
            <EditorialMedia src={images.reserveCanopy} alt="Lodge safari enveloppé par la végétation" className="ritual-editorial-main-image" />
          </Reveal>
          <Reveal delay={0.08}>
            <article className="ritual-editorial-copy">
              <p className="section-kicker">Séjour face aux animaux</p>
              <h2>Observer sans presser le rythme.</h2>
              <p>Depuis les lodges safari, la journée s’organise autour de la lumière, des mouvements de la réserve et des temps calmes. L’expérience privilégie la distance juste, le silence et les consignes de l’équipe.</p>
              <blockquote>« Ici, l’animal n’est pas un décor. Il impose le rythme du séjour. »</blockquote>
              <Link className="luxury-primary-link" href={localizedHref(locale, "/sejours/lodge-safari-mezzanine")}>Voir le lodge safari</Link>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="wildlife-moments capella-stop-section">
        <div className="capella-template-wrapper">
          <Reveal>
            <div className="section_title split-title wildlife-section-head">
              <h2>L’expérience réserve</h2>
              <p>Une lecture simple du parcours demandé dans le cahier des charges : hébergement, observation, lodges concernés, images, règles et CTA vers le séjour safari.</p>
            </div>
          </Reveal>
          <div className="wildlife-moment-grid">
            {[
              ["Hébergement", "Accès réservé aux clients des lodges concernés, avec une expérience pensée depuis la chambre et ses vues."],
              ["Observation", "Moments calmes, distances respectées, consignes de l’équipe et rythme naturel des animaux."],
              ["Immersion", "Un séjour plus rare, adapté aux familles ou couples qui souhaitent dormir au plus près de l’univers safari."],
            ].map(([title, copy], index) => (
              <Reveal key={title} delay={Math.min(index * 0.04, 0.12)}>
                <article className="wildlife-moment-card">
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {featuredLodge ? <WildlifeLodgeFeature id="reserve-lodges" item={featuredLodge} locale={locale} /> : null}

      <WildlifeMediaBlock
        title="Photos et vidéos de la réserve"
        copy="Un module média dédié réunit les visuels de séjour, les ambiances de réserve et une vidéo immersive en attendant l’intégration de films officiels du Domaine Limoune."
        image={images.reserveLandscape}
        alt="Paysage naturel de la réserve et atmosphère safari"
      />

      <WildlifeRules
        id="reserve-rules"
        kicker="Respect animalier"
        title="Les règles font partie de l’expérience."
        intro="La réserve repose sur une relation calme au vivant. Ces règles doivent être comprises avant le séjour et rappelées sur place."
        rules={["Ne pas nourrir les animaux", "Garder les distances", "Préserver le silence", "Respecter zones, horaires et consignes", "Privilégier l’observation sans intervention"]}
      />

      <PageGallery title="Réserve Africaine en images" imagesList={page.gallery ?? []} />
      <WildlifeCta page={page} locale={locale} title="Préparer votre séjour face à la réserve" copy="Choisissez le lodge adapté, confirmez les conditions d’accès et laissez l’équipe réservation orienter votre séjour selon les disponibilités." />
      {page.faqs?.length ? <InnerServiceBlock page={page} /> : null}
      <WildlifeContactBlock locale={locale} page={page} />
    </>
  );
}

function ParcAnimalierPage({ page, locale }: { page: SitePage; locale: Locale }) {
  const species = ["Zèbres", "Autruches", "Antilopes", "Gazelles", "Flamants", "Maki catta", "Suricates", "Perroquets", "Lamas"];

  return (
    <>
      <section id="park-concept" className="wildlife-intro park-intro capella-stop-section">
        <div className="capella-template-wrapper wildlife-intro-grid">
          <Reveal>
            <div>
              <p className="section-kicker">Parcours famille</p>
              <h2>Découvrir le vivant avec calme.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="wildlife-intro-copy">
              <p>Le Parc Animalier est l’expérience de visite accessible selon conditions. Il s’adresse aux familles, clients journée et visiteurs qui souhaitent découvrir les animaux dans un cadre pédagogique, lisible et respectueux.</p>
              <p>La page doit rassurer : espèces présentes, parcours, horaires, tarifs, conditions d’accès, règles de bien-être animal et contact avant déplacement.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <WildlifeCinematicSection
        variant="park"
        title="Une promenade qui garde le regard éveillé."
        kicker="Parcours vivant"
        quote="Chaque halte devient une petite leçon de calme, de curiosité et d’attention."
        copy="La visite gagne en charme avec des cadrages généreux, des pauses visuelles et une narration moins administrative, plus proche d’un carnet de voyage familial."
        imagesList={[images.parkScenic, images.parkWalk, images.domain]}
      />

      <section id="park-species" className="park-species capella-stop-section">
        <div className="capella-template-wrapper park-species-grid">
          <div className="park-species-showcase">
            <Reveal>
              <EditorialMedia src={images.park} alt="Parc animalier familial du Domaine Limoune" className="park-species-image" />
            </Reveal>
            <Reveal delay={0.08}>
              <div className="park-species-copy">
                <p className="section-kicker">Plus de 30 espèces</p>
                <h2>Une visite claire, familiale et pédagogique.</h2>
                <div className="wildlife-poetic-quote compact">
                  <blockquote>Regarder, ralentir, nommer les espèces : la visite devient un souvenir partagé.</blockquote>
                </div>
                <p>Le parcours permet de rencontrer plusieurs espèces selon la présence confirmée sur place et les conditions opérationnelles du jour.</p>
                <div className="park-species-list">
                  {species.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="wildlife-moments park-journey capella-stop-section">
        <div className="capella-template-wrapper">
          <Reveal>
            <div className="section_title split-title wildlife-section-head">
              <h2>Parcours de visite</h2>
              <p>Une expérience progressive : arrivée, découverte, pauses, règles, éventuelles offres famille et contact avant venue.</p>
            </div>
          </Reveal>
          <div className="wildlife-moment-grid">
            {[
              ["Arriver", "Vérifier horaires, conditions d’accès, tarifs adultes/enfants et disponibilité du jour avant déplacement."],
              ["Découvrir", "Observer les espèces, suivre les indications et garder un rythme adapté aux enfants."],
              ["Prolonger", "Associer la visite à une offre brunch, journée piscine ou expérience famille selon programmation."],
            ].map(([title, copy], index) => (
              <Reveal key={title} delay={Math.min(index * 0.04, 0.12)}>
                <article className="wildlife-moment-card">
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="park-practical capella-stop-section">
        <div className="capella-template-wrapper park-practical-grid">
          <Reveal>
            <div className="park-practical-head">
              <p className="section-kicker">Informations pratiques</p>
              <h2>Tarifs, horaires et conditions.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <FactGrid facts={[
              { label: "Tarif adulte", value: "À confirmer selon saison" },
              { label: "Tarif enfant", value: "À confirmer selon âge et saison" },
              { label: "Horaires", value: "Calendrier d’ouverture à confirmer" },
              { label: "Accès", value: "Selon horaires, capacité et conditions de visite" },
              { label: "Règle clé", value: "Non-nourrissage des animaux" },
              { label: "Public", value: "Familles, enfants, clients journée et groupes" },
              { label: "Durée", value: "Temps de visite à confirmer" },
              { label: "Conseil", value: "Contact recommandé avant déplacement" },
            ]} />
          </Reveal>
        </div>
      </section>

      <ParkFamilyOffers locale={locale} />

      <WildlifeRules
        id="park-rules"
        kicker="Bien-être animal"
        title="Une visite respectueuse avant tout."
        intro="Le parc doit rester une expérience pédagogique et maîtrisée. Les règles protègent les animaux, les visiteurs et la qualité du parcours."
        rules={["Ne pas nourrir les animaux", "Ne pas crier près des enclos", "Suivre les zones autorisées", "Respecter les consignes de l’équipe", "Surveiller les enfants pendant toute la visite"]}
      />

      <WildlifeMediaBlock
        title="Photos et vidéos du parc"
        copy="Le parcours animalier doit donner à voir les espèces, les haltes familiales, les règles de visite et les ambiances naturelles avant le contact ou la réservation."
        image={images.parkWalk}
        alt="Parcours familial et nature du Parc Animalier"
      />

      <PageGallery title="Parc Animalier en images" imagesList={page.gallery ?? []} />
      <WildlifeCta page={page} locale={locale} title="Préparer votre visite en famille" copy="Contactez l’équipe pour confirmer horaires, tarifs, conditions d’accès et offres famille disponibles à la date souhaitée." />
      {page.faqs?.length ? <InnerServiceBlock page={page} /> : null}
      <WildlifeContactBlock locale={locale} page={page} />
    </>
  );
}

function WildlifeCinematicSection({ variant, kicker, title, quote, copy, imagesList }: { variant: "reserve" | "park"; kicker: string; title: string; quote: string; copy: string; imagesList: string[] }) {
  const [main, portrait, detail] = imagesList;

  return (
    <section className={`wildlife-cinematic-section is-${variant} capella-stop-section`}>
      <div className="capella-template-wrapper wildlife-cinematic-grid">
        <Reveal>
          <article className="wildlife-cinematic-copy">
            <p className="section-kicker">{kicker}</p>
            <h2>{title}</h2>
            <div className="wildlife-poetic-quote">
              <blockquote>{quote}</blockquote>
            </div>
            <p>{copy}</p>
          </article>
        </Reveal>

        <div className="wildlife-cinematic-gallery">
          <Reveal>
            <EditorialMedia src={main} alt={`${title} image principale`} className="wildlife-cinematic-main-image" />
          </Reveal>
          <div className="wildlife-cinematic-duo">
            <Reveal delay={0.08}>
              <EditorialMedia src={portrait} alt={`${title} détail vertical`} className="wildlife-cinematic-portrait-image" />
            </Reveal>
            <Reveal delay={0.14}>
              <EditorialMedia src={detail} alt={`${title} atmosphère`} className="wildlife-cinematic-detail-image" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function WildlifeRequirementStrip({ kicker, title, copy, items }: { kicker: string; title: string; copy: string; items: string[][] }) {
  return (
    <section className="wildlife-requirement-strip capella-stop-section">
      <div className="capella-template-wrapper wildlife-requirement-grid">
        <Reveal>
          <div className="wildlife-requirement-copy">
            <p className="section-kicker">{kicker}</p>
            <h2>{title}</h2>
            <p>{copy}</p>
          </div>
        </Reveal>
        <div className="wildlife-requirement-list">
          {items.map(([label, text], index) => (
            <Reveal key={label} delay={Math.min(index * 0.04, 0.12)}>
              <article>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{label}</strong>
                <p>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WildlifeMediaBlock({ title, copy, image, alt }: { title: string; copy: string; image: string; alt: string }) {
  return (
    <section className="wildlife-media-block capella-stop-section">
      <div className="capella-template-wrapper wildlife-media-grid">
        <Reveal>
          <div className="wildlife-media-copy">
            <p className="section-kicker">Photos et vidéos</p>
            <h2>{title}</h2>
            <p>{copy}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="wildlife-video-stage">
            <EditorialMedia src={image} alt={alt} className="wildlife-video-poster" />
            <video className="wildlife-video" poster={image} autoPlay muted loop playsInline preload="metadata" aria-label={title}>
              <source src={heroVideos.mobile} media="(max-width: 768px)" type="video/mp4" />
              <source src={heroVideos.desktop} type="video/mp4" />
            </video>
            <div className="wildlife-video-caption">
              <Play aria-hidden="true" className="size-4 fill-current" />
              <span>Film immersif</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ParkFamilyOffers({ locale }: { locale: Locale }) {
  const offers = [
    ["Brunch & Parc Animalier", "Associer la visite à un moment de table selon programmation."],
    ["Journée famille", "Parcours animalier, pause, piscine ou activités selon saison."],
    ["Groupe enfants", "Demande dédiée pour écoles, anniversaires ou sorties encadrées."],
  ];

  return (
    <section className="park-family-offers capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="section_title split-title wildlife-section-head">
            <h2>Offres famille</h2>
            <p>Le cahier des charges demande un bloc dédié aux offres famille : cette section oriente vers les formats journée, brunch, groupe et contact.</p>
          </div>
        </Reveal>
        <div className="park-family-offer-grid">
          {offers.map(([title, copy], index) => (
            <Reveal key={title} delay={Math.min(index * 0.04, 0.12)}>
              <article className="park-family-offer-card cinematic-card">
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{title}</strong>
                <p>{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.14}>
          <div className="park-family-offer-actions">
            <ButtonLink cta={{ label: "Voir les offres famille", href: "/offres", variant: "secondary" }} locale={locale} />
            <ButtonLink cta={{ label: "Contacter l’équipe", href: "/contact?type=parc-animalier" }} locale={locale} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WildlifeLodgeFeature({ id, item, locale }: { id?: string; item: Accommodation; locale: Locale }) {
  return (
    <section id={id} className="wildlife-lodge-feature-section capella-stop-section">
      <div className="capella-template-wrapper wildlife-lodge-feature-wrapper">
        <Reveal>
          <div className="section_title split-title wildlife-section-head">
            <h2>Lodges concernés</h2>
            <p>Une image large pour installer le séjour dans son décor : le lodge, la réserve, la lumière et le prochain geste de réservation.</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Link href={localizedHref(locale, `/sejours/${item.slug}`)} className="wildlife-lodge-feature group">
            <EditorialMedia src={item.image} alt={`${item.name} face à la réserve`} className="wildlife-lodge-feature-image" />
            <span className="wildlife-lodge-feature-frame" aria-hidden="true" />
            <span className="wildlife-lodge-feature-panel">
              <small>{item.capacity}</small>
              <strong>{item.name}</strong>
              <em>{item.position}</em>
              <span className="wildlife-lodge-feature-cta">
                Découvrir le lodge
                <ArrowRight aria-hidden="true" className="size-4" />
              </span>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function WildlifeRules({ id, kicker, title, intro, rules }: { id?: string; kicker: string; title: string; intro: string; rules: string[] }) {
  return (
    <section id={id} className="wildlife-rules capella-stop-section">
      <div className="capella-template-wrapper wildlife-rules-grid">
        <Reveal>
          <div>
            <p className="section-kicker">{kicker}</p>
            <h2>{title}</h2>
            <p>{intro}</p>
          </div>
        </Reveal>
        <div className="wildlife-rule-list">
          {rules.map((rule, index) => (
            <Reveal key={rule} delay={Math.min(index * 0.035, 0.14)}>
              <article>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <span>{rule}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WildlifeCta({ page, locale, title, copy }: { page: SitePage; locale: Locale; title: string; copy: string }) {
  return (
    <section className="wildlife-cta capella-stop-section">
      <div className="capella-template-wrapper wildlife-cta-inner">
        <Reveal>
          <div>
            <p className="section-kicker">Prochain geste</p>
            <h2>{title}</h2>
            <p>{copy}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="wildlife-cta-actions">
            <ButtonLink cta={page.primaryCta} locale={locale} />
            {page.secondaryCta ? <ButtonLink cta={page.secondaryCta} locale={locale} /> : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WildlifeContactBlock({ locale, page }: { locale: Locale; page: SitePage }) {
  const contactMap: Record<string, { id: string; image: string; title: string; quote: string }> = {
    "reserve-africaine": {
      id: "reserve-contact",
      image: images.reserveLodge,
      title: "Composer votre nuit face à la réserve.",
      quote: "Un échange suffit parfois à choisir le bon lodge, le bon rythme, la bonne lumière.",
    },
    "parc-animalier": {
      id: "park-contact",
      image: images.parkScenic,
      title: "Préparer une visite qui se déroule sans hasard.",
      quote: "Avant de venir, confirmez le moment juste, les conditions et les attentions utiles aux familles.",
    },
    restaurants: {
      id: "restaurants-contact",
      image: images.restaurantContact,
      title: "Réserver la bonne table ou imaginer une privatisation.",
      quote: "Un déjeuner, un brunch, une soirée ou un groupe se prépare mieux quand la demande arrive directement au bon service.",
    },
    "canopy-spa": {
      id: "spa-contact",
      image: images.spaContact,
      title: "Choisir le soin, le créneau et le rituel juste.",
      quote: "Un échange suffit à transformer une intention de pause en rituel clair, fluide et parfaitement réservé.",
    },
    experiences: {
      id: "experience-contact",
      image: images.experienceSunsetRide,
      title: "Choisir l’expérience qui donnera le bon rythme à votre venue.",
      quote: "Une journée réussie commence par le bon créneau, le bon public et la bonne promesse.",
    },
    "evenements-entreprise": {
      id: "corporate-contact",
      image: images.corporateMeeting,
      title: "Préparer une proposition corporate claire et qualifiée.",
      quote: "Un brief précis permet de composer les bons espaces, la bonne table et les bonnes activités.",
    },
    offres: {
      id: "offers-contact",
      image: images.offerPool,
      title: "Choisir l’offre qui correspond vraiment à votre moment.",
      quote: "Séjour, famille, spa, table ou journée piscine : l’équipe confirme les conditions avant réservation.",
    },
  };
  const content = contactMap[page.slug] ?? {
    id: `${page.slug || "domaine"}-contact`,
    image: page.gallery?.[0] ?? page.heroImage,
    title: "Choisir le bon interlocuteur.",
    quote: "Notre équipe oriente chaque demande vers le service le plus adapté.",
  };

  return (
    <section id={content.id} className="wildlife-contact-section capella-stop-section">
      <div className="capella-template-wrapper wildlife-contact-grid">
        <Reveal>
          <div className="wildlife-contact-media-card">
            <EditorialMedia src={content.image} alt={`${page.title} contact visuel`} className="wildlife-contact-image" />
            <div className="wildlife-contact-caption">
              <span>Contact dédié</span>
              <strong>{page.title}</strong>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="wildlife-contact-card cinematic-card">
            <p className="section-kicker">Contact</p>
            <h2>{content.title}</h2>
            <div className="wildlife-poetic-quote compact">
              <blockquote>{content.quote}</blockquote>
            </div>
            <p>Notre équipe vous oriente vers le bon service, les disponibilités, les conditions d’accès et les prochaines étapes.</p>
            <div className="wildlife-contact-actions">
              <ButtonLink cta={page.primaryCta} locale={locale} />
              <ButtonLink cta={{ label: "Contact", href: "/contact", variant: "secondary", track: "quick_contact" }} locale={locale} />
              <a href="https://wa.me/212667796817" data-track="whatsapp_click">WhatsApp Business</a>
            </div>
            <div className="wildlife-contact-meta">
              <span><Clock aria-hidden="true" className="size-4" /> Réponse par service</span>
              <span><MapPinned aria-hidden="true" className="size-4" /> Région Agadir - Taroudant</span>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function StayContactBlock({ locale }: { locale: Locale }) {
  const copy = getStayCopy(locale).contact;

  return (
    <section className="stay-capella-contact capella-stop-section">
      <div className="capella-template-wrapper stay-capella-contact-grid">
        <Reveal>
          <div className="stay-capella-contact-address">
            <p>{copy.label}</p>
            <h2>{copy.title}</h2>
            <address>
              {copy.address}
            </address>
            <p className="stay-contact-copy">{copy.body}</p>
            <Link href={localizedHref(locale, "/sejours#booking")} data-track="stay_contact_booking">{copy.booking}</Link>
            <a href={downloads.accommodation.href} data-track="download_accommodation_pdf">{copy.brochure}</a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="stay-capella-contact-list">
            <h3>{copy.usefulLinks}</h3>
            {copy.links.map(([label, text, href]) => (
              <Link key={label} href={localizedHref(locale, href)}>
                <strong>{label}</strong>
                <span>{text}</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RestaurantsLandingPage({ page, locale }: { page: SitePage; locale: Locale }) {
  return (
    <>
      <DiningEditorialIntro />
      <DiningStickyNav />
      <DiningVenueShowcase locale={locale} />
      <DiningHoursAndMenus locale={locale} />
      <DiningPrivateEvents locale={locale} />
      {page.gallery?.length ? <PageGallery title="Restaurants du Domaine en images" imagesList={page.gallery} /> : null}
      <DiningReservationBlock page={page} locale={locale} />
      <WildlifeContactBlock locale={locale} page={page} />
    </>
  );
}

function DiningEditorialIntro() {
  return (
    <section className="dining-page-section dining-intro-section capella-stop-section">
      <div className="capella-template-wrapper dining-intro-grid">
        <Reveal>
          <div className="dining-intro-title">
            <p className="section-kicker">Introduction</p>
            <h2>Une table pour chaque moment du Domaine.</h2>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="dining-intro-copy">
            <p>La page Restaurants doit présenter la restauration comme un pôle majeur, pas comme une simple liste de points de vente.</p>
            <p>Chaque adresse possède son rôle : Massa pour la signature, Aman pour les orangers et les groupes, Monkey Beach pour la piscine, Limoune Club pour le soir, le sport et les privatisations.</p>
            <div className="dining-moment-chips" aria-label="Moments de restauration">
              {diningMoments.map(([title]) => <span key={title}>{title}</span>)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DiningStickyNav() {
  return (
    <nav className="dining-sticky-nav" aria-label="Accès rapide restaurants">
      <div className="capella-template-wrapper dining-sticky-nav-inner">
        <a href="#dining-venues">Restaurants</a>
        <a href="#dining-hours">Horaires et menus</a>
        <a href="#dining-private-events">F&B events</a>
        <a href="#restaurants-reservation">Réservation</a>
      </div>
    </nav>
  );
}

function DiningVenueShowcase({ locale }: { locale: Locale }) {
  return (
    <section id="dining-venues" className="dining-page-section dining-venues-section capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="section_title split-title dining-section-head">
            <div>
              <p className="section-kicker">Listing des restaurants</p>
              <h2>Quatre univers indépendants.</h2>
            </div>
            <p>Une structure inspirée des grands sites hôteliers : chaque restaurant raconte son ambiance, sa cuisine, ses horaires, son menu, sa réservation et sa possibilité de privatisation.</p>
          </div>
        </Reveal>

        <div className="dining-venue-list">
          {diningVenueProfiles.map((venue, index) => (
            <Reveal key={venue.slug} delay={Math.min(index * 0.05, 0.16)}>
              <article id={venue.slug} className={`dining-venue-row${index % 2 ? " is-reverse" : ""}`}>
                <div className="dining-venue-media-wrap cinematic-card">
                  <EditorialMedia src={venue.image} alt={venue.alt} className="dining-venue-image" />
                  <div className="dining-venue-badge">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{venue.kicker}</strong>
                  </div>
                </div>
                <div className="dining-venue-copy">
                  <p className="section-kicker">{venue.kicker}</p>
                  <h3>{venue.name}</h3>
                  <p className="dining-venue-lead">{venue.lead}</p>
                  <p>{venue.atmosphere}</p>
                  <div className="dining-venue-tags" aria-label={`${venue.name} points forts`}>
                    {venue.details.map((detail) => <span key={detail}>{detail}</span>)}
                  </div>
                  <div className="dining-venue-facts">
                    <div><small>Cuisine</small><strong>{venue.cuisine}</strong></div>
                    <div><small>Horaires</small><strong>{venue.hours}</strong></div>
                    <div><small>Menus</small><strong>{venue.menu}</strong></div>
                    <div><small>Privatisation</small><strong>{venue.privateUse}</strong></div>
                  </div>
                  <div className="dining-venue-actions">
                    <ButtonLink cta={{ label: "Réserver cette table", href: "#restaurants-reservation", track: `restaurant_${venue.slug}` }} locale={locale} />
                    <ButtonLink cta={{ label: "Télécharger le menu", href: downloads.restaurants.href, variant: "secondary" }} locale={locale} />
                    <Link className="dining-detail-link" href={localizedHref(locale, `/restaurants/${venue.slug}`)}>
                      Page dédiée
                      <ArrowRight aria-hidden="true" className="size-3" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DiningHoursAndMenus({ locale }: { locale: Locale }) {
  return (
    <section id="dining-hours" className="dining-page-section dining-hours-section capella-stop-section">
      <div className="capella-template-wrapper dining-hours-grid">
        <Reveal>
          <div className="dining-hours-title">
            <p className="section-kicker">Horaires, menus, réservation</p>
            <h2>Tout ce qui rassure avant de réserver.</h2>
            <p>Les horaires exacts restent confirmés selon saison et programmation. La page doit néanmoins clarifier le type d’expérience, le menu disponible et le bon prochain geste.</p>
            <div className="dining-hours-actions">
              <ButtonLink cta={{ label: "Réserver une table", href: "#restaurants-reservation", track: "restaurant_hours_booking" }} locale={locale} />
              <ButtonLink cta={{ label: "Voir les expériences", href: "/experiences", variant: "secondary" }} locale={locale} />
            </div>
          </div>
        </Reveal>
        <div className="dining-hours-board">
          {restaurants.map((item, index) => {
            const profile = diningVenueProfiles.find((venue) => venue.slug === item.slug);
            return (
              <Reveal key={item.slug} delay={Math.min(index * 0.04, 0.14)}>
                <article className="dining-hour-card cinematic-card">
                  <small>{profile?.nav ?? item.name}</small>
                  <h3>{item.name}</h3>
                  <p>{item.hours}</p>
                  <span>{item.cuisine}</span>
                  <div>
                    <a href={downloads.restaurants.href}>Menu PDF</a>
                    <a href="#restaurants-reservation">Réserver</a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DiningPrivateEvents({ locale }: { locale: Locale }) {
  const cards = [
    ["Offres et événements F&B", "Brunchs, dîners thématiques, activations été, diffusions sportives et programmations saisonnières donnent des raisons concrètes de revenir."],
    ["Privatisations", "Déjeuner de groupe, dîner privé, banquet, événement d’entreprise, anniversaire ou lendemain de mariage : la demande doit être orientée vers le bon service."],
    ["Safari Stop Experience", "Safari Stop Experience ou Giraffe Café peuvent être présentés comme touchpoints F&B à valider, sans les confondre avec les restaurants principaux."],
  ];

  return (
    <section id="dining-private-events" className="dining-private-events capella-stop-section">
      <div className="capella-template-wrapper dining-private-grid">
        <Reveal>
          <div className="dining-private-media cinematic-card">
            <EditorialMedia src={images.restaurantPrivate} alt="Table privée et événement sous les orangers" className="dining-private-image" />
            <div className="dining-private-caption">
              <span>Privatisations</span>
              <strong>Déjeuner, dîner, brunch ou événement complet</strong>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="dining-private-copy">
            <p className="section-kicker">Offres et événements F&B</p>
            <h2>La restauration devient un moteur de leads.</h2>
            <p>Le parcours doit convertir autant les couples et familles que les groupes, wedding planners, agences événementielles et clients corporate.</p>
            <div className="dining-private-card-list">
              {cards.map(([title, copy], index) => (
                <article key={title}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
            <div className="dining-private-actions">
              <ButtonLink cta={{ label: "Demander une privatisation", href: "/contact?type=restaurant", track: "restaurant_private_event" }} locale={locale} />
              <ButtonLink cta={{ label: "Voir l’agenda", href: "/agenda", variant: "secondary" }} locale={locale} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DiningReservationBlock({ page, locale }: { page: SitePage; locale: Locale }) {
  return (
    <section id="restaurants-reservation" className="dining-reservation-section capella-stop-section">
      <div className="capella-template-wrapper dining-reservation-grid">
        <Reveal>
          <aside className="dining-reservation-note cinematic-card">
            <p className="section-kicker">Réservation restaurants</p>
            <h2>Une table, un groupe ou une privatisation.</h2>
            <p>Le formulaire collecte le restaurant, la date, l’heure, le nombre de personnes et l’intention de privatisation pour éviter un contact générique.</p>
            <div className="dining-reservation-proof">
              <span><Clock aria-hidden="true" className="size-4" /> Réponse par service</span>
              <span><Download aria-hidden="true" className="size-4" /> Carte restaurants</span>
              <span><MapPinned aria-hidden="true" className="size-4" /> Le Domaine Limoune</span>
            </div>
          </aside>
        </Reveal>
        <div className="dining-reservation-stack">
          <LeadForm type="restaurant" />
          <DownloadBlock keysList={page.downloads ?? ["restaurants"]} />
        </div>
      </div>
    </section>
  );
}

function CanopySpaLandingPage({ page, locale }: { page: SitePage; locale: Locale }) {
  return (
    <>
      <SpaConceptIntro />
      <SpaJourneySection />
      <SpaInstallationsSection />
      <SpaRitualsSection locale={locale} />
      <SpaBridalSection locale={locale} />
      <SpaConditionsSection locale={locale} />
      {page.gallery?.length ? <PageGallery title="Canopy Spa en images" imagesList={page.gallery} /> : null}
      <SpaReservationBlock page={page} />
      <WildlifeContactBlock locale={locale} page={page} />
    </>
  );
}

function SpaConceptIntro() {
  return (
    <section className="spa-page-section spa-concept-section capella-stop-section">
      <div className="capella-template-wrapper spa-concept-grid">
        <Reveal>
          <div className="spa-concept-copy">
            <p className="section-kicker">Concept Canopy</p>
            <h2>Un spa pensé comme un refuge, pas comme une liste de soins.</h2>
            <p>Canopy Spa prolonge l’expérience du Domaine par la chaleur, l’eau, le silence, les soins et les rituels. La promesse reste claire : réserver une pause wellness premium, seule, en duo, en journée ou avant une célébration.</p>
            <blockquote>« Entrer, ralentir, ressortir avec le Domaine imprimé dans le corps. »</blockquote>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="spa-concept-panel cinematic-card">
            <EditorialMedia src={images.spaConcept} alt="Canopy Spa, lumière douce et bassin chauffé" className="spa-concept-image" />
            <div className="spa-concept-proof">
              {spaRituals.map((ritual) => <span key={ritual.title}>{ritual.meta}</span>)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SpaJourneySection() {
  return (
    <section className="spa-journey-section capella-stop-section">
      <div className="capella-template-wrapper spa-journey-grid">
        <Reveal>
          <div className="spa-journey-media cinematic-card">
            <EditorialMedia src={images.spaJourney} alt="Eau, calme et prolongement du soin au Canopy Spa" className="spa-journey-image" />
            <div className="spa-journey-caption">
              <span>Parcours wellness</span>
              <strong>Chaleur, soin, eau, tisanerie</strong>
            </div>
          </div>
        </Reveal>
        <div className="spa-journey-copy">
          <Reveal>
            <div>
              <p className="section-kicker">Micro-parcours</p>
              <h2>Un rituel en cinq gestes.</h2>
              <p>La page doit arrêter le scroll par une lecture simple : le visiteur se projette dans le parcours avant même de choisir son soin.</p>
            </div>
          </Reveal>
          <div className="spa-journey-steps">
            {spaJourneySteps.map(([title, copy], index) => (
              <Reveal key={title} delay={Math.min(index * 0.035, 0.14)}>
                <article>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpaInstallationsSection() {
  return (
    <section className="spa-page-section spa-installations-section capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="section_title split-title spa-section-head">
            <div>
              <p className="section-kicker">Installations</p>
              <h2>Tout le parcours wellness en une page.</h2>
            </div>
            <p>Les informations demandées par le cahier des charges sont rendues visibles, utiles et désirables : hammams, cabines, duo, piscine chauffée, jacuzzis, salle de sport, beauté, coiffure et tisanerie.</p>
          </div>
        </Reveal>
        <div className="spa-installations-grid">
          {spaInstallations.map(([title, copy], index) => (
            <Reveal key={title} delay={Math.min(index * 0.025, 0.14)}>
              <article className="spa-installation-card cinematic-card">
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{title}</strong>
                <p>{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpaRitualsSection({ locale }: { locale: Locale }) {
  return (
    <section className="spa-rituals-section capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="spa-rituals-head">
            <p className="section-kicker">Soins, hammams et rituels</p>
            <h2>Choisir un bénéfice, pas seulement un soin.</h2>
            <p>Chaque rituel est présenté comme un produit clair : cible, contexte, sensation attendue et prochain geste de réservation.</p>
          </div>
        </Reveal>
        <div className="spa-ritual-grid">
          {spaRituals.map((ritual, index) => (
            <Reveal key={ritual.title} delay={Math.min(index * 0.04, 0.14)}>
              <article className="spa-ritual-card cinematic-card">
                <span>{ritual.meta}</span>
                <h3>{ritual.title}</h3>
                <p>{ritual.copy}</p>
                <a href="#lead-form">
                  Réserver ce rituel
                  <ArrowRight aria-hidden="true" className="size-3" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.14}>
          <div className="spa-ritual-actions">
            <ButtonLink cta={{ label: "Télécharger la carte spa", href: downloads.spa.href, variant: "secondary" }} locale={locale} />
            <ButtonLink cta={{ label: "Voir les offres spa", href: "/offres", variant: "secondary" }} locale={locale} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SpaBridalSection({ locale }: { locale: Locale }) {
  return (
    <section className="spa-bridal-section capella-stop-section">
      <div className="capella-template-wrapper spa-bridal-grid">
        <Reveal>
          <div className="spa-bridal-copy">
            <p className="section-kicker">Bridal rituals</p>
            <h2>Préparer la célébration par le calme.</h2>
            <p>Canopy Spa doit être relié aux mariages : préparation mariée, cabine duo, beauté, coiffure, manucure, pédicure, pause tisanerie et lendemain de fête.</p>
            <div className="spa-bridal-list">
              {['Préparation mariée', 'Duo avant cérémonie', 'Beauté et coiffure', 'Brunch du lendemain'].map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="spa-bridal-actions">
              <ButtonLink cta={{ label: "Découvrir les rituels mariage", href: "/mariages", track: "spa_bridal_rituals" }} locale={locale} />
              <ButtonLink cta={{ label: "Contacter le spa", href: "#lead-form", variant: "secondary" }} locale={locale} />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="spa-bridal-media cinematic-card">
            <EditorialMedia src={images.spaBridal} alt="Rituels mariage et préparation au Domaine Limoune" className="spa-bridal-image" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SpaConditionsSection({ locale }: { locale: Locale }) {
  return (
    <section className="spa-conditions-section capella-stop-section">
      <div className="capella-template-wrapper spa-conditions-grid">
        <Reveal>
          <div>
            <p className="section-kicker">Horaires et conditions</p>
            <h2>Réserver sans friction.</h2>
            <p>Les informations pratiques rassurent avant le formulaire : horaires, accès, créneaux, documents et conditions opérationnelles.</p>
          </div>
        </Reveal>
        <div className="spa-condition-list">
          {spaConditions.map(([title, copy], index) => (
            <Reveal key={title} delay={Math.min(index * 0.04, 0.14)}>
              <article>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{title}</strong>
                <p>{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <div className="spa-condition-actions">
            <ButtonLink cta={{ label: "Réserver un soin", href: "#lead-form", track: "spa_conditions_booking" }} locale={locale} />
            <ButtonLink cta={{ label: "Carte spa", href: downloads.spa.href, variant: "secondary" }} locale={locale} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SpaReservationBlock({ page }: { page: SitePage }) {
  return (
    <section className="spa-reservation-section capella-stop-section">
      <div className="capella-template-wrapper spa-reservation-grid">
        <Reveal>
          <aside className="spa-reservation-note cinematic-card">
            <p className="section-kicker">Réservation spa</p>
            <h2>Choisir une catégorie, une date, un créneau.</h2>
            <p>Le formulaire respecte le cahier des charges : catégorie de soin, date souhaitée, créneau, nombre de personnes et commentaire.</p>
            <div className="spa-reservation-proof">
              <span><Clock aria-hidden="true" className="size-4" /> Soins 10h - 19h</span>
              <span><Download aria-hidden="true" className="size-4" /> Carte spa</span>
              <span><MapPinned aria-hidden="true" className="size-4" /> Canopy Spa</span>
            </div>
          </aside>
        </Reveal>
        <div className="spa-reservation-stack">
          <LeadForm type="spa" />
          <DownloadBlock keysList={page.downloads ?? ["spa"]} />
        </div>
      </div>
    </section>
  );
}

function FilterStrip({ id, label, filters }: { id: string; label: string; filters: readonly string[] }) {
  return (
    <section id={id} className="reference-filter-strip capella-stop-section" aria-label={label}>
      <div className="capella-template-wrapper reference-filter-inner">
        {filters.map((filter, index) => (
          <a key={filter} href={index === 0 ? `#${id}` : `#${filter.toLowerCase().replace(/\s+/g, "-")}`}>
            {filter}
          </a>
        ))}
      </div>
    </section>
  );
}

function ExperiencesLandingPage({ page, locale }: { page: SitePage; locale: Locale }) {
  return (
    <>
      <section className="reference-intro-section capella-stop-section">
        <div className="capella-template-wrapper reference-intro-grid">
          <Reveal>
            <div>
              <p className="section-kicker">Capella Curates adapté Limoune</p>
              <h2>Des expériences traitées comme des produits à part entière.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="reference-intro-copy">
              <p>La page ne liste pas seulement des activités. Elle raconte comment chaque moment se réserve, pour qui il est pensé, quelles conditions s’appliquent et avec quelles expériences il peut être associé.</p>
              <p>Familles, couples, groupes, clients hébergement, visiteurs journée et entreprises peuvent choisir rapidement un parcours clair : plein air, famille, sport, table, wellness ou soirée.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <FilterStrip id="experience-filters" label="Filtres expériences" filters={experienceFilters} />

      <section id="experience-list" className="reference-cards-section reference-experiences-section capella-stop-section">
        <div className="capella-template-wrapper">
          <Reveal>
            <div className="reference-section-head">
              <p className="section-kicker">Toutes les expériences</p>
              <h2>Explorer, savourer, bouger, ralentir.</h2>
              <p>Chaque fiche inclut nom, image, description, durée, public cible, tarif si applicable, conditions, réservation et expériences associées.</p>
            </div>
          </Reveal>
          <div className="reference-experience-grid">
            {signatureExperiences.map((experience, index) => (
              <Reveal key={experience.name} delay={Math.min(index * 0.018, 0.18)}>
                <ExperienceShowcaseCard
                  experience={experience}
                  index={index}
                  slides={getExperienceMediaSlides(experience)}
                  bookingHref={localizedHref(locale, "/contact?type=activites")}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="experience-signature" className="reference-split-section capella-stop-section">
        <div className="capella-template-wrapper reference-split-grid">
          <Reveal>
            <div className="reference-split-media cinematic-card">
              <EditorialMedia src={images.experienceDiningStars} alt="Dîner sous les étoiles au Domaine Limoune" className="reference-split-image" />
              <div className="reference-split-caption">
                <span>Signature Limoune</span>
                <strong>Dîner, picnic, BBQ, tea time et ciel ouvert.</strong>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="reference-split-copy">
              <p className="section-kicker">Promesse</p>
              <h2>Composer un moment, pas cocher une activité.</h2>
              <p>Le cahier des charges demande une page capable de présenter les expériences signature comme des produits. Cette version donne à chaque expérience une lecture commerciale claire sans perdre le ton premium : public, durée, tarif, conditions et prochain geste.</p>
              <blockquote>« Le visiteur comprend ce qu’il peut vivre, quand le vivre, pour qui c’est adapté et comment réserver. »</blockquote>
              <div className="reference-split-actions">
                <ButtonLink cta={page.primaryCta} locale={locale} />
                <ButtonLink cta={{ label: "Voir l’agenda", href: "/agenda", variant: "secondary" }} locale={locale} />
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {page.gallery?.length ? <PageGallery title="Expériences en images" imagesList={page.gallery} /> : null}
      <section id="experience-booking" className="reference-final-cta capella-stop-section">
        <div className="capella-template-wrapper reference-final-inner">
          <Reveal>
            <div>
              <p className="section-kicker">Réservation</p>
              <h2>Confirmer la bonne expérience avant votre venue.</h2>
              <p>Certaines expériences dépendent de la météo, de l’âge des participants, de la capacité, de l’encadrement et du calendrier. L’équipe confirme le bon créneau avant réservation.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="reference-final-actions">
              <ButtonLink cta={page.primaryCta} locale={locale} />
              <ButtonLink cta={{ label: "Contacter l’équipe", href: "/contact?type=activites", variant: "secondary" }} locale={locale} />
            </div>
          </Reveal>
        </div>
      </section>
      <WildlifeContactBlock locale={locale} page={page} />
    </>
  );
}

function WeddingLuxuryPage({ page, locale }: { page: SitePage; locale: Locale }) {
  return (
    <>
      <section id="wedding-promise" className="wedding-promise-section capella-stop-section">
        <div className="capella-template-wrapper wedding-promise-grid">
          <Reveal>
            <div className="wedding-promise-media-wrap">
              <EditorialMedia src={images.weddings} alt="Célébration mariage au Domaine Limoune" className="wedding-promise-media" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="wedding-promise-copy">
              <p className="section-kicker">Promesse émotionnelle</p>
              <h2>Une célébration pensée dans le détail.</h2>
              <p>
                Le Domaine Limoune accueille les futurs mariés dans une logique de parcours complet : cérémonie, dîner, after party, brunch du lendemain, rituels spa, hébergement invités et coordination personnalisée.
              </p>
              <p>
                L’objectif est simple : transformer une demande mariage en projet clair, qualifié et rassurant, avec les bonnes informations dès le premier échange.
              </p>
              <div className="wedding-promise-proof">
                {['Date souhaitée', 'Nombre d’invités', 'Budget indicatif', 'Moodboard'].map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section id="wedding-venues" className="wedding-venues-section capella-stop-section">
        <div className="capella-template-wrapper">
          <Reveal>
            <div className="wedding-section-head">
              <p className="section-kicker">Les lieux disponibles</p>
              <h2>Chaque espace porte un moment de la célébration.</h2>
              <p>La page doit donner une lecture immédiate des lieux : cérémonie, dîner, after party, brunch, spa et hébergement invités.</p>
            </div>
          </Reveal>
          <div className="wedding-venue-grid">
            {weddingVenues.map((venue, index) => (
              <Reveal key={venue.title} delay={Math.min(index * 0.04, 0.14)}>
                <article className="wedding-venue-card cinematic-card">
                  <EditorialMedia src={venue.image} alt={`${venue.title} au Domaine Limoune`} className="wedding-venue-image" />
                  <div className="wedding-venue-body">
                    <span>{String(index + 1).padStart(2, "0")} / {venue.eyebrow}</span>
                    <h3>{venue.title}</h3>
                    <p>{venue.text}</p>
                    <div>
                      {venue.meta.map((item) => <small key={item}>{item}</small>)}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="wedding-journey" className="wedding-journey-section capella-stop-section">
        <div className="capella-template-wrapper wedding-journey-grid">
          <Reveal>
            <aside className="wedding-journey-sticky">
              <p className="section-kicker">Cérémonie, dîner, soirée, brunch</p>
              <h2>Un déroulé fluide, du premier accueil au lendemain.</h2>
              <p>Chaque temps fort doit être lisible pour les mariés, les familles, les wedding planners et l’équipe commerciale.</p>
              <ButtonLink cta={page.primaryCta} locale={locale} />
            </aside>
          </Reveal>
          <div className="wedding-journey-list">
            {weddingJourney.map(([title, text], index) => (
              <Reveal key={title} delay={Math.min(index * 0.04, 0.16)}>
                <article>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="wedding-bridal" className="wedding-bridal-section capella-stop-section">
        <div className="capella-template-wrapper wedding-bridal-grid">
          <Reveal>
            <article className="wedding-bridal-copy">
              <p className="section-kicker">Spa bridal rituals</p>
              <h2>Canopy Spa accompagne l’avant et l’après.</h2>
              <p>La préparation mariage ne se limite pas à la cérémonie. Canopy Spa prolonge l’expérience avec soins, hammams, cabine duo, coiffure, manucure, pédicure, piscine chauffée, jacuzzis et tisanerie.</p>
              <div className="wedding-bridal-list">
                {weddingBridalRituals.map(([title, text]) => (
                  <div key={title}>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <ButtonLink cta={{ label: "Découvrir Canopy Spa", href: "/canopy-spa", variant: "secondary" }} locale={locale} />
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <EditorialMedia src={images.spaBridal} alt="Rituels mariage au Canopy Spa" className="wedding-bridal-media" />
          </Reveal>
        </div>
      </section>

      <section id="wedding-guests" className="wedding-planning-section capella-stop-section">
        <div className="capella-template-wrapper">
          <Reveal>
            <div className="wedding-section-head is-centered">
              <p className="section-kicker">Hébergement invités & coordination</p>
              <h2>Qualifier le projet avant le devis.</h2>
              <p>Le formulaire doit orienter les demandes vers les bons besoins : hébergement, restauration, spa, technique, budget, date, document d’inspiration et nombre d’invités.</p>
            </div>
          </Reveal>
          <div className="wedding-planning-grid">
            {weddingPlanningNeeds.map(([title, text], index) => (
              <Reveal key={title} delay={Math.min(index * 0.04, 0.14)}>
                <article>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {page.gallery?.length ? <PageGallery title="Mariages en images" imagesList={page.gallery} /> : null}

      <section id="wedding-brochure" className="wedding-lead-section capella-stop-section">
        <div className="capella-template-wrapper wedding-lead-grid">
          <Reveal>
            <aside className="wedding-lead-card cinematic-card">
              <p className="section-kicker">Formulaire demande devis</p>
              <h2>Construire une proposition mariage.</h2>
              <p>La demande rassemble nom, prénom, email, téléphone, date souhaitée, date alternative, nombre d’invités, type de cérémonie, besoins hébergement, restauration, spa, technique, budget, message et document d’inspiration.</p>
              <a href={downloads.wedding.href} data-track="download_pdf">Télécharger la brochure mariage</a>
              <div>
                {['Brochure téléchargeable', 'Upload brief ou moodboard', 'Date alternative', 'Budget indicatif'].map((item) => <span key={item}>{item}</span>)}
              </div>
            </aside>
          </Reveal>
          <Reveal delay={0.08}>
            <LeadForm type="wedding" />
          </Reveal>
        </div>
      </section>

      <WildlifeContactBlock locale={locale} page={page} />
    </>
  );
}

function CorporateEventsLandingPage({ page, locale }: { page: SitePage; locale: Locale }) {
  return (
    <>
      <section className="reference-intro-section corporate-intro-section capella-stop-section">
        <div className="capella-template-wrapper reference-intro-grid">
          <Reveal>
            <div>
              <p className="section-kicker">MICE destination</p>
              <h2>Travailler, respirer, partager au même endroit.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="reference-intro-copy">
              <p>La page Corporate & Events doit générer des demandes qualifiées pour séminaires, réunions, team buildings, déjeuners, dîners corporate, privatisations et activités de groupe.</p>
              <p>Chaque espace présente les données demandées : surface, capacités, équipements techniques, restauration, activités, image et possibilité de plan à intégrer dès disponibilité.</p>
              <div className="reference-inline-actions">
                <ButtonLink cta={page.primaryCta} locale={locale} />
                <ButtonLink cta={page.secondaryCta ?? { label: "Brochure corporate", href: downloads.corporate.href, variant: "secondary" }} locale={locale} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="reference-filter-strip capella-stop-section" aria-label="Navigation corporate">
        <div className="capella-template-wrapper reference-filter-inner">
          {["Espaces", "Capacités", "Team buildings", "Privatisations", "RFP"].map((item, index) => (
            <a key={item} href={["#corporate-spaces", "#corporate-capacities", "#corporate-programmes", "#corporate-private", "#lead-form"][index]}>{item}</a>
          ))}
        </div>
      </section>

      <section id="corporate-spaces" className="reference-venues-section capella-stop-section">
        <div className="capella-template-wrapper">
          <Reveal>
            <div className="reference-section-head">
              <p className="section-kicker">Espaces disponibles</p>
              <h2>Des lieux pour chaque format d’entreprise.</h2>
              <p>Réunion, théâtre, banquet, cocktail, déjeuner, dîner, activité de groupe ou privatisation : chaque espace est présenté avec les informations pratiques nécessaires à une demande RFP.</p>
            </div>
          </Reveal>
          <div className="reference-venue-list">
            {corporateSpaces.map((space, index) => (
              <Reveal key={space.name} delay={Math.min(index * 0.04, 0.16)}>
                <article className={`reference-venue-row ${index % 2 ? "is-reverse" : ""}`}>
                  <div className="reference-venue-media cinematic-card">
                    <EditorialMedia src={space.image} alt={`${space.name} Domaine Limoune`} className="reference-venue-image" />
                  </div>
                  <div className="reference-venue-copy">
                    <p className="section-kicker">{String(index + 1).padStart(2, "0")}</p>
                    <h3>{space.name}</h3>
                    <p>{space.text}</p>
                    <dl className="reference-capacity-list">
                      <div><dt>Surface</dt><dd>{space.surface}</dd></div>
                      <div><dt>Théâtre</dt><dd>{space.theatre}</dd></div>
                      <div><dt>Banquet</dt><dd>{space.banquet}</dd></div>
                      <div><dt>Cocktail</dt><dd>{space.cocktail}</dd></div>
                      <div><dt>Réunion</dt><dd>{space.meeting}</dd></div>
                      <div><dt>Technique</dt><dd>{space.equipment}</dd></div>
                      <div><dt>Plan</dt><dd>À intégrer dès disponibilité.</dd></div>
                      <div><dt>Restauration</dt><dd>{space.food}</dd></div>
                      <div><dt>Activités</dt><dd>{space.activities}</dd></div>
                    </dl>
                    <a className="reference-card-link" href="#lead-form">
                      Demander un plan ou un devis
                      <ArrowRight aria-hidden="true" className="size-3" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="corporate-capacities" className="reference-capacity-section capella-stop-section">
        <div className="capella-template-wrapper reference-capacity-grid">
          <Reveal>
            <div>
              <p className="section-kicker">Capacités</p>
              <h2>Les champs RFP attendus sont visibles.</h2>
              <p>Surface, théâtre, banquet, cocktail, réunion, technique, restauration, activités et photos sont structurés espace par espace. Les plans peuvent être ajoutés dès validation opérationnelle.</p>
            </div>
          </Reveal>
          <div className="reference-capacity-table">
            {corporateSpaces.map((space) => (
              <Reveal key={space.name} delay={0.04}>
                <article>
                  <strong>{space.name}</strong>
                  <span>{space.surface}</span>
                  <span>{space.theatre}</span>
                  <span>{space.banquet}</span>
                  <span>{space.cocktail}</span>
                  <span>{space.meeting}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="corporate-programmes" className="reference-programmes-section capella-stop-section">
        <div className="capella-template-wrapper reference-programmes-grid">
          <Reveal>
            <div className="reference-split-media cinematic-card">
              <EditorialMedia src={images.corporateTeam} alt="Team building au Domaine Limoune" className="reference-split-image" />
              <div className="reference-split-caption">
                <span>Activités groupe</span>
                <strong>Travail, respiration, table et cohésion.</strong>
              </div>
            </div>
          </Reveal>
          <div className="reference-programmes-copy">
            <Reveal>
              <p className="section-kicker">Programmes</p>
              <h2>Séminaires, team buildings et privatisations.</h2>
              <p>Le Domaine permet d’enchaîner réunion, pause, déjeuner, activité d’équipe, dîner, hébergement ou soirée privée sans disperser les participants.</p>
            </Reveal>
            <div className="reference-programme-list">
              {corporateProgrammes.map(([title, copy], index) => (
                <Reveal key={title} delay={Math.min(index * 0.04, 0.14)}>
                  <article>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="corporate-private" className="reference-split-section corporate-private-section capella-stop-section">
        <div className="capella-template-wrapper reference-split-grid">
          <Reveal>
            <article className="reference-split-copy">
              <p className="section-kicker">Déjeuners, dîners et privatisations</p>
              <h2>Un événement d’entreprise peut devenir une vraie expérience de Domaine.</h2>
              <p>Massa Restaurant, Aman sous les Orangers, Monkey Beach et Limoune Club prolongent la journée corporate : déjeuner, dîner, cocktail, afterwork, diffusion sportive, soirée privée ou activation saisonnière.</p>
              <div className="reference-split-actions">
                <ButtonLink cta={{ label: "Voir les restaurants", href: "/restaurants", variant: "secondary" }} locale={locale} />
                <ButtonLink cta={{ label: "Voir les expériences", href: "/experiences", variant: "secondary" }} locale={locale} />
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="reference-split-media cinematic-card">
              <EditorialMedia src={images.corporateDinner} alt="Dîner corporate sous les orangers au Domaine Limoune" className="reference-split-image" />
              <div className="reference-split-caption">
                <span>Hospitalité corporate</span>
                <strong>Restauration, activités et hébergement en un parcours.</strong>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {page.gallery?.length ? <PageGallery title="Corporate & Events en images" imagesList={page.gallery} /> : null}

      <section className="reference-rfp-section capella-stop-section">
        <div className="capella-template-wrapper reference-rfp-grid">
          <Reveal>
            <aside className="reference-rfp-note cinematic-card">
              <p className="section-kicker">Book An Event</p>
              <h2>Demander une proposition corporate.</h2>
              <p>Le formulaire reprend les champs du cahier des charges : société, nom, email professionnel, téléphone, type d’événement, date, participants, format, besoins réunion, restauration, hébergement, activités, budget et message.</p>
              <div className="reference-rfp-proof">
                <span><Download aria-hidden="true" className="size-4" /> Brochure corporate</span>
                <span><Clock aria-hidden="true" className="size-4" /> Réponse par service</span>
                <span><MapPinned aria-hidden="true" className="size-4" /> Région Agadir - Taroudant</span>
              </div>
            </aside>
          </Reveal>
          <div className="reference-rfp-stack">
            <LeadForm type="corporate" />
            <DownloadBlock keysList={page.downloads ?? ["corporate"]} />
          </div>
        </div>
      </section>
      <WildlifeContactBlock locale={locale} page={page} />
    </>
  );
}

function OffersLandingPage({ page, locale }: { page: SitePage; locale: Locale }) {
  return (
    <>
      <section className="reference-intro-section offers-intro-section capella-stop-section">
        <div className="capella-template-wrapper reference-intro-grid">
          <Reveal>
            <div>
              <p className="section-kicker">Commercial premium</p>
              <h2>Des offres désirables, jamais agressives.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="reference-intro-copy">
              <p>La page Offres doit guider rapidement le visiteur vers le bon moment : séjour, famille, spa, restaurants, journée, événements ou saison.</p>
              <p>Chaque offre affiche le nom, le visuel, la description, les inclusions, la période de validité, les conditions, un CTA réservation et un CTA contact.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <FilterStrip id="offers-filters" label="Filtres offres" filters={offerFilters} />

      <section id="offers-list" className="reference-offers-section capella-stop-section">
        <div className="capella-template-wrapper">
          <Reveal>
            <div className="reference-section-head">
              <p className="section-kicker">All Offers</p>
              <h2>Séjours, journée, spa, table et saisons.</h2>
              <p>Les offres sont structurées pour convertir sans paraître discount : bénéfice clair, conditions visibles, réservation directe ou contact dédié.</p>
            </div>
          </Reveal>
          <div className="reference-offer-grid">
            {limouneOffers.map((offer, index) => (
              <Reveal key={offer.name} delay={Math.min(index * 0.026, 0.18)}>
                <article id={offer.category.toLowerCase().replace(/\s+/g, "-")} className="reference-offer-card cinematic-card">
                  <EditorialMedia src={offer.image} alt={`${offer.name} au Domaine Limoune`} className="reference-offer-image" />
                  <div className="reference-offer-body">
                    <div className="reference-card-topline">
                      <span>{offer.category}</span>
                      <small>{String(index + 1).padStart(2, "0")}</small>
                    </div>
                    <h3>{offer.name}</h3>
                    <p>{offer.description}</p>
                    <div className="reference-offer-inclusions">
                      <strong>Inclusions</strong>
                      {offer.inclusions.map((item) => <span key={item}>{item}</span>)}
                    </div>
                    <dl className="reference-card-facts reference-offer-facts">
                      <div><dt>Validité</dt><dd>{offer.validity}</dd></div>
                      <div><dt>Conditions</dt><dd>{offer.conditions}</dd></div>
                    </dl>
                    <div className="reference-offer-actions">
                      <Link href={localizedHref(locale, "/sejours#booking")}>Réserver</Link>
                      <Link href={localizedHref(locale, "/contact?type=offre")}>Contacter l’équipe</Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="offers-conditions" className="reference-split-section offers-conditions-section capella-stop-section">
        <div className="capella-template-wrapper reference-split-grid">
          <Reveal>
            <div className="reference-split-media cinematic-card">
              <EditorialMedia src={images.offerSafari} alt="Safari Lodge Experience au Domaine Limoune" className="reference-split-image" />
              <div className="reference-split-caption">
                <span>Conditions visibles</span>
                <strong>Validité, inclusions, saison et réservation.</strong>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="reference-split-copy">
              <p className="section-kicker">Avant de réserver</p>
              <h2>Clarté commerciale, ton premium.</h2>
              <p>Les offres ne promettent pas au-delà de l’opérationnel. Dates, services inclus, conditions enfants, accès aux univers, horaires, capacités et disponibilité sont renvoyés vers l’équipe concernée.</p>
              <blockquote>« Une offre Limoune vend un moment complet : séjour, table, parc, piscine, spa ou saison. »</blockquote>
              <div className="reference-split-actions">
                <ButtonLink cta={page.primaryCta} locale={locale} />
                <ButtonLink cta={page.secondaryCta ?? { label: "Contacter l’équipe", href: "/contact", variant: "secondary" }} locale={locale} />
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {page.gallery?.length ? <PageGallery title="Offres en images" imagesList={page.gallery} /> : null}

      <section id="offers-contact" className="reference-final-cta offers-final-cta capella-stop-section">
        <div className="capella-template-wrapper reference-final-inner">
          <Reveal>
            <div>
              <p className="section-kicker">Conseil</p>
              <h2>Choisir l’offre adaptée à votre rythme.</h2>
              <p>Pour un séjour, une journée, un spa day, un brunch ou une activation de saison, l’équipe oriente la demande vers le bon service et confirme les conditions exactes.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="reference-final-actions">
              <ButtonLink cta={{ label: "Réserver un séjour", href: "/sejours#booking", track: "offers_book_stay" }} locale={locale} />
              <ButtonLink cta={{ label: "Contacter l’équipe", href: "/contact?type=offre", variant: "secondary" }} locale={locale} />
            </div>
          </Reveal>
        </div>
      </section>
      <WildlifeContactBlock locale={locale} page={page} />
    </>
  );
}

function AgendaLandingPage({ page, locale }: { page: SitePage; locale: Locale }) {
  const featured = agendaProgrammes[0];

  return (
    <>
      <section className="agenda-luxury-intro reference-intro-section capella-stop-section">
        <div className="capella-template-wrapper reference-intro-grid">
          <Reveal>
            <div>
              <p className="section-kicker">Objectif agenda</p>
              <h2>Présenter la programmation du Domaine.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="reference-intro-copy">
              <p>La page Agenda rassemble les brunchs, soirées, diffusions sportives, activations été, kids events, événements spéciaux, Ramadan, Wild Summer, Coupe du Monde, dîners thématiques, concerts et DJ sets.</p>
              <p>Chaque rendez-vous précise son univers, son rythme, son lieu, son mode de réservation et propose un ajout au calendrier pour renforcer la conversion.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <FilterStrip id="agenda-filters" label="Filtres agenda" filters={agendaFilters} />

      <section id="agenda-featured" className="agenda-featured-section capella-stop-section">
        <div className="capella-template-wrapper agenda-featured-grid">
          <Reveal>
            <div className="agenda-featured-media cinematic-card">
              <EditorialMedia src={featured.image} alt={`${featured.title} au Domaine Limoune`} className="agenda-featured-main-image" />
              <div className="agenda-featured-badge">
                <span>{featured.category}</span>
                <strong>{featured.date}</strong>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="agenda-featured-copy-block">
              <p className="section-kicker">Temps fort</p>
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
              <dl className="agenda-event-facts">
                <div><dt>Univers</dt><dd>{featured.category}</dd></div>
                <div><dt>Date</dt><dd>{featured.date}</dd></div>
                <div><dt>Lieu</dt><dd>{featured.place}</dd></div>
              </dl>
              <div className="agenda-event-actions">
                <Link href={localizedHref(locale, "/contact?type=agenda")}>Réserver</Link>
                <a href={featured.calendarHref} target="_blank" rel="noreferrer">Ajouter au calendrier</a>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section id="agenda-programme" className="agenda-programme-section capella-stop-section">
        <div className="capella-template-wrapper">
          <Reveal>
            <div className="reference-section-head">
              <p className="section-kicker">Page détail événement</p>
              <h2>Une programmation lisible par date et par univers.</h2>
              <p>Chaque bloc agit comme une fiche événement : nom, visuel, univers, date, lieu, description, bouton réserver et bouton ajouter au calendrier.</p>
            </div>
          </Reveal>
          <div className="agenda-programme-grid">
            {agendaProgrammes.map((event, index) => (
              <Reveal key={event.slug} delay={Math.min(index * 0.025, 0.18)}>
                <article id={`event-${event.slug}`} className="agenda-event-card cinematic-card">
                  <EditorialMedia src={event.image} alt={`${event.title} au Domaine Limoune`} className="agenda-event-image" />
                  <div className="agenda-event-body">
                    <div className="reference-card-topline">
                      <span>{event.category}</span>
                      <small>{String(index + 1).padStart(2, "0")}</small>
                    </div>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <dl className="agenda-event-facts">
                      <div><dt>Date</dt><dd>{event.date}</dd></div>
                      <div><dt>Lieu</dt><dd>{event.place}</dd></div>
                    </dl>
                    <div className="agenda-event-actions">
                      <Link href={localizedHref(locale, `/contact?type=agenda&event=${event.slug}`)}>Réserver</Link>
                      <a href={event.calendarHref} target="_blank" rel="noreferrer">Ajouter au calendrier</a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda-season" className="agenda-season-section reference-split-section capella-stop-section">
        <div className="capella-template-wrapper reference-split-grid">
          <Reveal>
            <article className="reference-split-copy">
              <p className="section-kicker">Filtres et saisonnalité</p>
              <h2>Filtrer par date, univers et intention de visite.</h2>
              <p>Le cahier des charges demande une page capable de filtrer par date et par univers. La structure prépare ces entrées éditoriales : famille, table, sport, soirée, saison, concerts et événements spéciaux.</p>
              <blockquote>« L’agenda donne une raison claire de venir ou de revenir au Domaine Limoune au bon moment. »</blockquote>
              <div className="reference-split-actions">
                <ButtonLink cta={page.primaryCta} locale={locale} />
                <ButtonLink cta={{ label: "Voir les offres saisonnières", href: "/offres", variant: "secondary" }} locale={locale} />
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="reference-split-media cinematic-card">
              <EditorialMedia src={images.agenda} alt="Programmation saisonnière au Domaine Limoune" className="reference-split-image" />
              <div className="reference-split-caption">
                <span>Programmation</span>
                <strong>Brunchs, soirées, sport, enfants, concerts et saisons.</strong>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {page.gallery?.length ? <PageGallery title="Agenda en images" imagesList={page.gallery} /> : null}

      <section id="agenda-booking" className="reference-final-cta agenda-final-cta capella-stop-section">
        <div className="capella-template-wrapper reference-final-inner">
          <Reveal>
            <div>
              <p className="section-kicker">Réservation agenda</p>
              <h2>Confirmer la date, le format et les conditions.</h2>
              <p>Les rendez-vous peuvent dépendre de la saison, de la météo, des capacités, des menus, des horaires ou d’une programmation confirmée. L’équipe valide le bon créneau avant réservation.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="reference-final-actions">
              <ButtonLink cta={page.primaryCta} locale={locale} />
              <ButtonLink cta={{ label: "Contacter l’équipe", href: "/contact?type=agenda", variant: "secondary" }} locale={locale} />
            </div>
          </Reveal>
        </div>
      </section>
      <WildlifeContactBlock locale={locale} page={page} />
    </>
  );
}

function ContactLandingPage({ page, locale }: { page: SitePage; locale: Locale }) {
  return (
    <>
      <section className="contact-luxury-intro reference-intro-section capella-stop-section">
        <div className="capella-template-wrapper reference-intro-grid">
          <Reveal>
            <div>
              <p className="section-kicker">Objectif contact</p>
              <h2>Éviter le contact générique unique.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="reference-intro-copy">
              <p>La page Contact oriente chaque demande vers le bon service : réservations hébergement, restaurants, Canopy Spa, mariages, Corporate & Events, parc animalier, activités, presse, direction commerciale et informations générales.</p>
              <p>Le formulaire propose un type de demande et adapte les champs selon le choix pour accélérer la réponse et qualifier les demandes commerciales.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact-services" className="contact-services-section capella-stop-section">
        <div className="capella-template-wrapper">
          <Reveal>
            <div className="reference-section-head">
              <p className="section-kicker">Contacts à segmenter</p>
              <h2>Un parcours clair pour chaque service.</h2>
              <p>Chaque carte correspond aux services explicitement demandés dans le cahier des charges et renvoie vers le parcours le plus adapté.</p>
            </div>
          </Reveal>
          <div className="contact-service-grid">
            {contactServiceRoutes.map((service, index) => (
              <Reveal key={service.title} delay={Math.min(index * 0.025, 0.18)}>
                <Link className="contact-service-card cinematic-card" href={localizedHref(locale, service.href)}>
                  <EditorialMedia src={service.image} alt={`${service.title} Domaine Limoune`} className="contact-service-image" />
                  <span className="contact-service-body">
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <strong>{service.title}</strong>
                    <em>{service.text}</em>
                    <b>{service.cta}</b>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-concierge" className="contact-concierge-section capella-stop-section">
        <div className="capella-template-wrapper contact-concierge-grid">
          <Reveal>
            <div className="reference-split-media cinematic-card">
              <EditorialMedia src={images.domain} alt="Accueil Domaine Limoune" className="contact-concierge-image" />
              <div className="reference-split-caption">
                <span>Le Domaine Limoune</span>
                <strong>Une demande, le bon interlocuteur.</strong>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="contact-concierge-copy-panel">
              <p className="section-kicker">Avant d’écrire</p>
              <h2>Les informations utiles à transmettre.</h2>
              <p>Une date, le nombre de personnes, le type de moment souhaité et vos coordonnées permettent à l’équipe concernée de répondre plus vite et plus précisément.</p>
              <div className="contact-info-grid">
                <div><strong>Séjour</strong><span>Dates, adultes, enfants, chambres, catégorie souhaitée, code promotionnel si applicable.</span></div>
                <div><strong>Table ou spa</strong><span>Date, horaire, nombre de personnes, restaurant ou catégorie de soin.</span></div>
                <div><strong>Événement</strong><span>Format, invités, budget indicatif, besoin technique, restauration et hébergement.</span></div>
              </div>
              <div className="contact-department-strip">
                {departments.map((department) => <span key={department}>{department}</span>)}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section id="contact-form-section" className="contact-form-section capella-stop-section">
        <div className="capella-template-wrapper contact-form-grid">
          <Reveal>
            <aside className="contact-form-note cinematic-card">
              <p className="section-kicker">Formulaire dynamique</p>
              <h2>Le choix de demande adapte les champs.</h2>
              <p>Le formulaire propose Séjour, Restaurant, Spa, Mariage, Événement corporate, Activités, Parc animalier, Presse ou Autre. Selon le choix, les champs utiles apparaissent pour préciser la demande.</p>
              <div>
                <span>Réponse par service</span>
                <span>Suivi formulaires</span>
                <span>WhatsApp Business</span>
                <span>Téléchargements PDF</span>
              </div>
            </aside>
          </Reveal>
          <div className="contact-form-stack">
            <LeadForm type="contact" />
            <DownloadBlock keysList={page.downloads ?? ["factsheet", "map"]} />
          </div>
        </div>
      </section>

      <section id="contact-access" className="contact-access-section reference-final-cta capella-stop-section">
        <div className="capella-template-wrapper reference-final-inner">
          <Reveal>
            <div>
              <p className="section-kicker">Accès et contact spécifique</p>
              <h2>Préparer votre venue dans la région Agadir - Taroudant.</h2>
              <p>La page Contact doit rassurer, orienter et convertir. Les informations de distance depuis Agadir, l’aéroport et Taroudant peuvent être enrichies dès validation opérationnelle.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="contact-access-actions">
              <a href="https://wa.me/212667796817" data-track="whatsapp_click">WhatsApp Business</a>
              <a href="tel:+212528526964" data-track="phone_click">Appeler le Domaine</a>
              <ButtonLink cta={{ label: "Télécharger la fiche Domaine", href: downloads.factsheet.href, variant: "secondary" }} locale={locale} />
            </div>
          </Reveal>
        </div>
      </section>

      {page.gallery?.length ? <PageGallery title="Contact en images" imagesList={page.gallery} /> : null}
    </>
  );
}

function StayRoomDetailPage({ page, locale, item }: { page: SitePage; locale: Locale; item: Accommodation }) {
  return (
    <>
      <StayDetailGallery item={item} locale={locale} />
      <StayDetailDescription item={item} locale={locale} />
      <StayPracticalInfo item={item} locale={locale} />
      <StayEquipment item={item} locale={locale} />
      <StayIncludedServices item={item} locale={locale} />
      <StayAccessibleExperiences item={item} locale={locale} />
      <StayBookStayBand locale={locale} cta={page.primaryCta} secondaryCta={page.secondaryCta} />
      <StayOtherSuggestions item={item} locale={locale} />
      <StayContactBlock locale={locale} />
    </>
  );
}

function StayDetailDescription({ item, locale }: { item: Accommodation; locale: Locale }) {
  const copy = getStayCopy(locale).detail;

  return (
    <section className="stay-detail-description capella-stop-section">
      <div className="capella-template-wrapper stay-pdf-two-col">
        <Reveal>
          <div>
            <p className="section-kicker">{copy.descriptionKicker}</p>
            <h2>{item.name}</h2>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="stay-pdf-copy">
            <p>{item.position}</p>
            <p>{item.emotionalText}</p>
            <p>{item.childConditions}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StayPracticalInfo({ item, locale }: { item: Accommodation; locale: Locale }) {
  const copy = getStayCopy(locale).detail;
  const facts = [
    [copy.facts.capacity, item.capacity],
    [copy.facts.surface, item.surface],
    [copy.facts.bed, item.bed],
    [copy.facts.view, item.view],
    [copy.facts.arrival, item.checkIn],
    [copy.facts.departure, item.checkOut],
    [copy.facts.children, item.childConditions],
  ];

  return (
    <section className="stay-detail-amenities stay-practical-info capella-stop-section">
      <div className="capella-template-wrapper stay-detail-amenities-grid">
        <Reveal>
          <h2>{copy.practicalTitle}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="stay-detail-facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <h3>{label}</h3>
                <p>{value}</p>
              </div>
            ))}
            <div>
              <h3>{copy.facts.brochure}</h3>
              <a href={downloads.accommodation.href}>{copy.facts.brochureCta}</a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="stay-detail-practical-note">
            <p>{copy.practicalNote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StayEquipment({ item, locale }: { item: Accommodation; locale: Locale }) {
  const copy = getStayCopy(locale).detail;

  return (
    <section className="stay-detail-list-section capella-stop-section">
      <div className="capella-template-wrapper stay-detail-list-grid">
        <Reveal>
          <h2>{copy.equipmentTitle}</h2>
        </Reveal>
        <div className="stay-detail-amenity-list">
          {item.amenities.map((amenity, index) => (
            <Reveal key={amenity} delay={Math.min(index * 0.012, 0.14)}>
              <p>{amenity}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StayIncludedServices({ item, locale }: { item: Accommodation; locale: Locale }) {
  const copy = getStayCopy(locale).detail;

  return (
    <section className="stay-detail-list-section stay-included-services capella-stop-section">
      <div className="capella-template-wrapper stay-detail-list-grid">
        <Reveal>
          <h2>{copy.includedTitle}</h2>
        </Reveal>
        <div className="stay-detail-amenity-list">
          {item.servicesIncluded.map((service, index) => (
            <Reveal key={service} delay={Math.min(index * 0.012, 0.14)}>
              <p>{service}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StayAccessibleExperiences({ item, locale }: { item: Accommodation; locale: Locale }) {
  const experiences = getStayExperiences(item, locale);
  const copy = getStayCopy(locale).detail;

  return (
    <section className="stay-detail-experiences capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="stay-pdf-head">
            <p className="section-kicker">{copy.experiencesKicker}</p>
            <h2>{copy.experiencesTitle}</h2>
          </div>
        </Reveal>
        <div className="stay-detail-experience-grid">
          {experiences.map(([title, text, href], index) => (
            <Reveal key={title} delay={Math.min(index * 0.04, 0.12)}>
              <Link href={localizedHref(locale, href)} className="stay-detail-experience-card group">
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{title}</strong>
                <span>{text}</span>
                <em>
                  {copy.discover}
                  <ArrowRight aria-hidden="true" className="size-3 transition group-hover:translate-x-1" />
                </em>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StayOtherSuggestions({ item, locale }: { item: Accommodation; locale: Locale }) {
  const suggestions = getStaySuggestions(item, locale);
  const copy = getStayCopy(locale).detail;

  if (!suggestions.length) return null;

  return (
    <section className="stay-other-suggestions capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <h2>{copy.similarTitle}</h2>
        </Reveal>
        <div className="stay-other-suggestions-grid">
          {suggestions.map((suggestion, index) => (
            <Reveal key={suggestion.slug} delay={Math.min(index * 0.05, 0.1)}>
              <Link href={localizedHref(locale, `/sejours/${suggestion.slug}`)} className="stay-suggestion-card group">
                <strong>{suggestion.name}</strong>
                <span>{suggestion.position}</span>
                <em>
                  {copy.viewStay}
                  <ArrowRight aria-hidden="true" className="size-3 transition group-hover:translate-x-1" />
                </em>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function getStayItemFromPage(page: SitePage, locale: Locale) {
  if (!page.slug.startsWith("sejours/")) return null;

  const slug = page.slug.replace("sejours/", "");
  return getAccommodationBySlug(locale, slug);
}

function getStayCategories(locale: Locale): StayCategory[] {
  return getStayCopy(locale).categories.map((category) => ({
    id: category.id,
    nav: category.nav,
    title: category.title,
    subtitle: category.subtitle,
    copy: category.copy,
    items: getAccommodationsBySlug([...category.slugs], locale),
  }));
}

function getAccommodationsBySlug(slugs: string[], locale: Locale) {
  return slugs
    .map((slug) => getAccommodationBySlug(locale, slug))
    .filter((item): item is Accommodation => Boolean(item));
}

function getStaySuggestions(item: Accommodation, locale: Locale) {
  const localized = accommodations
    .map((candidate) => getAccommodationBySlug(locale, candidate.slug))
    .filter((candidate): candidate is Accommodation => candidate !== null && candidate.slug !== item.slug);
  const sameCategory = localized.filter((candidate) => candidate.category === item.category);
  const fallback = localized.filter((candidate) => candidate.category !== item.category);
  return [...sameCategory, ...fallback].slice(0, 2);
}

function getStayExperiences(item: Accommodation, locale: Locale): [string, string, string][] {
  const base: [string, string, string][] = locale === "en"
    ? [
        ["Domaine restaurants", "Massa, Aman sous les Orangers, Monkey Beach and Limoune Club extend the stay through several dining atmospheres.", "/restaurants"],
        ["Canopy Spa", "Treatments, hammams, heated pool, jacuzzis and wellness rituals can complete the pause.", "/canopy-spa"],
        ["Outdoor experiences", "Horse riding, quad biking, padel, tennis, picnic or dinner under the stars depending on season and availability.", "/experiences"],
      ]
    : [
        ["Restaurants du Domaine", "Massa, Aman sous les Orangers, Monkey Beach et Limoune Club prolongent le séjour par plusieurs atmosphères de table.", "/restaurants"],
        ["Canopy Spa", "Soins, hammams, piscine chauffée, jacuzzis et rituels bien-être peuvent compléter la pause.", "/canopy-spa"],
        ["Expériences en plein air", "Balade à cheval, quad, padel, tennis, pique-nique ou dîner sous les étoiles selon saison et disponibilité.", "/experiences"],
      ];
  const featuredTerms = locale === "en" ? ["Reserve", "Family", "Wildlife park"] : ["Réserve", "Famille", "Parc animalier"];

  if (item.meta.some((meta) => featuredTerms.includes(meta))) {
    if (locale === "en") {
      return [
        ["African Reserve", "An immersive accommodation experience built around observation, calm and respect for wildlife.", "/reserve-africaine"],
        ["Wildlife park", "A family-friendly educational route to discover the Domaine animals subject to access conditions.", "/parc-animalier"],
        ...base.slice(0, 2),
      ];
    }

    return [
      ["Réserve africaine", "Une expérience d’hébergement immersive autour de l’observation, du calme et du respect animalier.", "/reserve-africaine"],
      ["Parc animalier", "Un parcours familial et pédagogique pour découvrir les animaux du Domaine selon conditions d’accès.", "/parc-animalier"],
      ...base.slice(0, 2),
    ];
  }

  return base;
}

function InnerEditorialIntro({ page, locale }: PageRendererProps) {
  const gallery = page.gallery ?? [];
  const sideImage = gallery[1] ?? gallery[0] ?? page.heroImage;
  const intro = getInnerIntro(page);

  return (
    <section className="section-titlesypnosis inner-capella-intro capella-stop-section">
      <div className="capella-template-wrapper">
        <div className="inner-wrapper clear-end">
          <Reveal>
            <div className="section-title srv inner-intro-title">
              <p className="section-kicker">{page.eyebrow}</p>
              <h2>{intro.title}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="section-synopsis srv indent inner-intro-copy">
              <p>{intro.copy}</p>
              {page.details ? <div className="inner-intro-facts"><FactGrid facts={page.details} /></div> : null}
              <div className="luxury-actions">
                <ButtonLink cta={page.primaryCta} locale={locale} />
                {page.secondaryCta ? <ButtonLink cta={page.secondaryCta} locale={locale} /> : null}
              </div>
              <EditorialMedia src={sideImage} alt={`${page.title} - atmosphère Domaine Limoune`} className="synopsis-visual inner-intro-visual" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function getInnerIntro(page: SitePage) {
  const map: Record<string, { title: string; copy: string }> = {
    "le-domaine": {
      title: "Une destination, plusieurs expériences.",
      copy: "Le Domaine se découvre comme un lieu de vie complet : jardins, orangers, séjours, table, spa, parc animalier, réserve et événements réunis dans un parcours clair.",
    },
    "reserve-africaine": {
      title: "Dormir face à la réserve.",
      copy: "La Réserve Africaine n’est pas une visite isolée : elle appartient à l’expérience d’hébergement, dans un rapport calme à l’observation et au respect animalier.",
    },
    "parc-animalier": {
      title: "Découvrir le vivant en famille.",
      copy: "Le parc animalier est pensé comme une sortie douce et pédagogique, avec conditions d’accès, horaires, tarifs et règles de bien-être animal clairement présentés.",
    },
    restaurants: {
      title: "Quatre tables, quatre atmosphères.",
      copy: "Massa Restaurant, Aman sous les Orangers, Monkey Beach et Limoune Club répondent à des moments différents : séjour, brunch, piscine, soirée ou privatisation.",
    },
    "canopy-spa": {
      title: "Un refuge de lumière et de calme.",
      copy: "Canopy Spa prolonge l’expérience du Domaine avec soins, hammams, rituels, piscine chauffée, jacuzzis, tisanerie et formats dédiés aux mariages.",
    },
    experiences: {
      title: "Composer un moment signature.",
      copy: "Familles, couples, groupes et entreprises peuvent choisir une expérience outdoor, sportive, gourmande, nocturne ou bien-être selon la saison.",
    },
    mariages: {
      title: "Célébrer sous les orangers.",
      copy: "La page mariage doit guider les futurs mariés depuis la première intention jusqu’à la demande de devis : lieux, dîner, soirée, brunch, spa et hébergement invités.",
    },
    "evenements-entreprise": {
      title: "Réunir vos équipes dans un domaine vivant.",
      copy: "Séminaires, réunions, activités d’équipe, repas d’entreprise et privatisations peuvent associer espaces, restauration, hébergement et expériences de groupe.",
    },
    offres: {
      title: "Des invitations saisonnières.",
      copy: "Les offres valorisent des moments précis sans logique de discount agressif : séjour, famille, spa, brunch, piscine, réserve ou saison.",
    },
    agenda: {
      title: "Les temps forts du Domaine.",
      copy: "Brunchs, soirées, événements enfants, dîners thématiques, diffusions sportives et activations saisonnières donnent une raison de revenir au bon moment.",
    },
    contact: {
      title: "Contacter Le Domaine Limoune.",
      copy: "Le contact n’est pas un formulaire générique : chaque demande doit être orientée vers l’équipe concernée pour accélérer la réponse.",
    },
    journal: {
      title: "Carnets, saisons et inspirations.",
      copy: "Le Journal sert le référencement et l’image de destination en racontant les saisons, les expériences famille, les animaux, les recettes, le spa et les événements.",
    },
    presse: {
      title: "Raconter le Domaine avec précision.",
      copy: "L’espace presse rassemble dossier, factsheet, contacts médias, éléments institutionnels et contenus officiels pour faciliter la prise de parole.",
    },
  };

  return map[page.slug] ?? { title: page.title, copy: page.summary };
}

function getCollectionIntro(page: SitePage) {
  const fallback = {
    kicker: "Collection",
    title: "Choisir son expérience",
    copy: "Des fiches claires pour comparer, comprendre les conditions et réserver le bon service.",
  };

  if (page.slug === "sejours") {
    return {
      kicker: "Hébergements",
      title: "Suites, lodges et séjours signature",
      copy: "Comparez les catégories, les ambiances, les vues et les configurations pour choisir le séjour adapté à votre rythme.",
    };
  }

  if (page.slug === "restaurants") {
    return {
      kicker: "Tables du Domaine",
      title: "Choisir son restaurant",
      copy: "Chaque adresse possède son atmosphère, sa cuisine, ses horaires et son parcours de réservation ou de privatisation.",
    };
  }

  if (page.slug === "experiences") {
    return {
      kicker: "Moments signature",
      title: "Composer son expérience",
      copy: "Famille, couple, groupe ou entreprise : chaque moment précise son esprit, son public et son mode de réservation.",
    };
  }

  if (page.slug === "offres") {
    return {
      kicker: "Offres du moment",
      title: "Séjours, journées et rituels",
      copy: "Des invitations saisonnières qui valorisent l’expérience sans basculer dans une logique promotionnelle agressive.",
    };
  }

  if (page.slug === "agenda") {
    return {
      kicker: "Programmation",
      title: "Les prochains rendez-vous",
      copy: "Brunchs, soirées, événements enfants, activations saisonnières et dîners thématiques pour revenir au Domaine au bon moment.",
    };
  }

  return fallback;
}

function PageGallery({ title, imagesList }: { title: string; imagesList: string[] }) {
  const [main, secondary, ...rest] = imagesList;

  if (!main) return null;

  return (
    <section className="section-innergallery inner-page-gallery capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="section_title split-title inner-gallery-head">
            <div>
              <p className="section-kicker">Galerie</p>
              <h2>{title}</h2>
            </div>
            <p>Des cadrages larges, des détails de lumière et des atmosphères naturelles pour donner envie d’entrer dans l’expérience.</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="innergallery-container inner-page-gallery-stage">
            <EditorialMedia src={main} alt={`${title} image principale`} className="innergallery-panel active" />
            {secondary ? <EditorialMedia src={secondary} alt={`${title} détail éditorial`} className="innergallery-secondary-image" /> : null}
            <div className="innergallery-caption">Une invitation visuelle avant la visite.</div>
          </div>
        </Reveal>

        {rest.length ? (
          <div className="inner-gallery-thumbs">
            {rest.slice(0, 3).map((image, index) => (
              <Reveal key={`${image}-${index}`} delay={0.08 + index * 0.04}>
                <EditorialMedia src={image} alt={`${title} galerie ${index + 2}`} className="detail-gallery-thumb inner-gallery-thumb" />
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ContentSections({ page, sections, locale }: { page: SitePage; sections: ContentSection[]; locale: Locale }) {
  return (
    <section className="limoune-inner-chapters capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="section_title split-title inner-chapters-head">
            <h2>Parcours {page.title}</h2>
            <p>Chaque chapitre précise l’expérience, les conditions, les moments associés et les prochains gestes pour préparer votre venue.</p>
          </div>
        </Reveal>

        <div className="inner-chapter-list">
          {sections.map((section, index) => (
            <Reveal key={`${section.title}-${index}`} delay={Math.min(index * 0.035, 0.16)}>
              <article className="inner-chapter-card cinematic-card">
                <div className="inner-chapter-index">{String(index + 1).padStart(2, "0")}</div>
                <div className="inner-chapter-title">
                  <p className="section-kicker">{section.eyebrow ?? page.eyebrow}</p>
                  <h2>{section.title}</h2>
                </div>
                <div className="inner-chapter-body">
                  <p>{section.body}</p>
                  {section.facts ? <div className="inner-chapter-facts"><FactGrid facts={section.facts} /></div> : null}
                  {section.bullets ? (
                    <ul className="inner-chapter-bullets">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.cards ? (
                    <div className="inner-chapter-cards scroll-grid-scroll">
                      {section.cards.map((card, cardIndex) => <PremiumCard key={`${card.title}-${cardIndex}`} card={card} locale={locale} />)}
                    </div>
                  ) : null}
                  {section.cta ? (
                    <div className="luxury-actions">
                      <ButtonLink cta={section.cta} locale={locale} />
                      {section.secondaryCta ? <ButtonLink cta={section.secondaryCta} locale={locale} /> : null}
                    </div>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionSection({ intro, page, cards, locale }: { intro: ReturnType<typeof getCollectionIntro>; page: SitePage; cards: Card[]; locale: Locale }) {
  return (
    <section id="collection" className="section-scrollgrid inner-collection-section capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="section_title split-title">
            <div>
              <p className="section-kicker">{intro.kicker}</p>
              <h2>{intro.title}</h2>
            </div>
            <p>{intro.copy}</p>
          </div>
        </Reveal>
        <div className="scroll-grid">
          <div className="scroll-grid-container">
            <div className="scroll-grid-scroll inner-collection-grid">
              {cards.map((card, index) => (
                <Reveal key={`${page.slug}-${card.title}-${index}`} delay={Math.min(index * 0.035, 0.18)}>
                  <PremiumCard card={card} locale={locale} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InnerServiceBlock({ page }: { page: SitePage }) {
  return (
    <section className="limoune-inner-service capella-stop-section">
      <div className="capella-template-wrapper inner-service-wrapper">
        <Reveal>
          <div className="inner-service-head">
            <p className="luxury-kicker">Votre demande</p>
            <h2>Réserver, télécharger, demander.</h2>
            <p>Les documents, questions clés et demandes personnalisées sont réunis pour préparer votre séjour, votre table, votre soin ou votre événement.</p>
          </div>
        </Reveal>
        <div className="inner-service-grid">
          {page.downloads ? <DownloadBlock keysList={page.downloads} /> : null}
          {page.form ? <LeadForm type={page.form} /> : null}
          {page.faqs ? <FaqBlock faqs={page.faqs} /> : null}
        </div>
      </div>
    </section>
  );
}

function PremiumCard({ card, locale }: { card: Card; locale: Locale }) {
  return (
    <Link href={localizedHref(locale, card.href)} className="scroll-grid-panel active ani cinematic-card inner-premium-card group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--limoune-orange)]">
      <EditorialMedia src={card.image} alt={card.alt} className="section-grid-img" />
      {card.eyebrow ? <span className="section-grid-kicker">{card.eyebrow}</span> : null}
      <span className="section-grid-title"><h4>{card.title}</h4></span>
      <span className="section-grid-synopsis"><p>{card.text}</p></span>
      {card.meta?.length ? (
        <span className="inner-card-meta">
          {card.meta.slice(0, 3).map((item) => <small key={item}>{item}</small>)}
        </span>
      ) : null}
      <span className="section-grid-link">
        <span className="text-button">
          {card.cta ?? "Découvrir"}
          <ArrowRight aria-hidden="true" className="size-3 text-[var(--limoune-orange)] transition group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
}

function AwardsAndContact({ locale, page }: { locale: Locale; page?: SitePage }) {
  return (
    <section className="capella-section bg-[var(--limoune-bg)]">
      <div className="capella-wrapper capella-contact-grid">
        <Reveal>
          <div className="grid content-start gap-3">
            <p className="section-kicker">Contact</p>
            <h2 className="font-serif text-4xl leading-[0.92] tracking-[-0.05em] text-[var(--limoune-brown)]">Nous écrire</h2>
          </div>
        </Reveal>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <Reveal>
          <article className="cinematic-card h-full bg-[var(--limoune-brown)] p-6 text-[var(--limoune-ivory)] md:p-8">
            <p className="text-xs font-bold tracking-[0.3em] text-[var(--limoune-orange)] uppercase">Le Domaine Limoune dans les médias</p>
            <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.045em] text-white md:text-5xl">Une adresse à raconter</h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/62">
              {"Dossier presse, fiche Domaine, visuels officiels, contacts médias et actualités accompagnent l’image du Domaine comme destination vivante."}
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                ["Fiche Domaine", "Informations clés"],
                ["Presse", "Contacts médias"],
                ["Journal", "Saisons et nouveautés"],
              ].map(([label, text]) => (
                <div key={label} className="border-t border-white/16 pt-4">
                  <span className="block font-serif text-2xl">{label}</span>
                  <span className="mt-2 block text-sm leading-6 text-white/58">{text}</span>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.1}>
          <article className="cinematic-card grid h-full content-between gap-8 border border-[var(--limoune-brown)]/12 bg-white/62 p-6 md:p-8">
            <div>
              <p className="section-kicker">Contact rapide</p>
              <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.045em] text-[var(--limoune-brown)]">Choisir le bon interlocuteur.</h2>
              <p className="mt-6 text-base leading-8 text-[var(--limoune-muted)]">
                {"Réservations, restaurants, Canopy Spa, mariages, entreprise, parc animalier, activités et presse disposent d’un parcours dédié."}
              </p>
            </div>
            <div className="grid gap-3">
              <ButtonLink cta={page?.primaryCta ?? { label: "Contacter l’équipe", href: "/contact" }} locale={locale} />
              <ButtonLink cta={{ label: "Contact", href: "/contact", variant: "secondary", track: "quick_contact" }} locale={locale} />
              <a href="https://wa.me/212667796817" data-track="whatsapp_click" className="inline-flex min-h-11 items-center justify-center border border-[var(--limoune-brown)]/18 bg-white px-5 py-3 text-sm font-bold tracking-[0.16em] text-[var(--limoune-brown)] uppercase transition hover:border-[var(--limoune-orange)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--limoune-orange)]">
                WhatsApp Business
              </a>
            </div>
            <div className="grid gap-3 text-sm text-[var(--limoune-muted)] sm:grid-cols-2">
              <span className="inline-flex items-center gap-2"><Clock aria-hidden="true" className="size-4 text-[var(--limoune-orange)]" /> Réponse par service</span>
              <span className="inline-flex items-center gap-2"><MapPinned aria-hidden="true" className="size-4 text-[var(--limoune-orange)]" /> Région Agadir - Taroudant</span>
            </div>
          </article>
        </Reveal>
        </div>
      </div>
    </section>
  );
}

function compactHeroSummary(summary: string) {
  const sentence = summary.split(/[.!?]/)[0]?.trim() || summary;
  return sentence.length > 168 ? `${sentence.slice(0, 165).trim()}...` : sentence;
}

function FactGrid({ facts }: { facts?: DetailFact[] }) {
  if (!facts?.length) return null;

  return (
    <div className="grid gap-px overflow-hidden border border-[var(--limoune-brown)]/12 bg-[var(--limoune-brown)]/12 sm:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.label} className="bg-[var(--limoune-ivory)] p-4">
          <span className="block text-xs font-bold tracking-[0.22em] text-[var(--limoune-orange)] uppercase">{fact.label}</span>
          <span className="mt-2 block text-base font-semibold leading-7 text-[var(--limoune-brown)]">{fact.value}</span>
        </div>
      ))}
    </div>
  );
}

function DownloadBlock({ keysList }: { keysList: string[] }) {
  const docs = keysList.map((key) => downloads[key]).filter((doc): doc is { label: string; href: string } => Boolean(doc));

  if (docs.length === 0) return null;

  return (
    <Reveal>
      <section className="inner-download-block border-t border-[var(--limoune-brown)]/16 pt-10">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-10 place-items-center bg-[var(--limoune-brown)] text-[var(--limoune-ivory)]">
            <Download aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="section-kicker">Documents</p>
            <h2 className="font-serif text-4xl leading-none tracking-[-0.04em] text-[var(--limoune-brown)]">À télécharger</h2>
          </div>
        </div>
        <div className="grid gap-px overflow-hidden border border-[var(--limoune-brown)]/12 bg-[var(--limoune-brown)]/12 md:grid-cols-2 lg:grid-cols-4">
          {docs.map((doc) => (
            <a key={doc.href} href={doc.href} data-track="download_pdf" className="group flex min-h-24 items-center justify-between gap-4 bg-[var(--limoune-ivory)] p-4 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--limoune-orange)]">
              <span className="flex items-center gap-3">
                <FileText aria-hidden="true" className="size-5 text-[var(--limoune-orange)]" />
                <span className="font-semibold text-[var(--limoune-brown)]">{doc.label}</span>
              </span>
              <ArrowRight aria-hidden="true" className="size-4 text-[var(--limoune-orange)] transition group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function FaqBlock({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <Reveal>
      <section className="inner-faq-block grid gap-6 border-t border-[var(--limoune-brown)]/16 pt-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="section-kicker">FAQ</p>
          <h2 className="font-serif text-5xl leading-none tracking-[-0.05em] text-[var(--limoune-brown)]">Questions clés</h2>
        </div>
        <div className="grid divide-y divide-[var(--limoune-brown)]/12 border-y border-[var(--limoune-brown)]/12">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold text-[var(--limoune-brown)]">
                {faq.question}
                <span className="text-[var(--limoune-orange)] transition group-open:rotate-90">+</span>
              </summary>
              <p className="mt-3 text-base leading-7 text-[var(--limoune-muted)]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function EditorialMedia({ src, alt, variant = "default", className = "" }: { src: string; alt: string; variant?: "hero" | "default"; className?: string }) {
  return (
    <div role="img" aria-label={alt} className={`limoune-media ${toneFromSrc(src)} ${variant === "hero" ? "limoune-media-hero" : ""} ${className}`}>
      <Image className="limoune-media-image" src={src} alt="" fill sizes={variant === "hero" ? "100vw" : "(min-width: 1024px) 48vw, 100vw"} priority={variant === "hero"} quality={90} />
      <span className="limoune-media-depth" aria-hidden="true" />
      <span className="limoune-media-sheen" aria-hidden="true" />
      <span className="limoune-media-grain" aria-hidden="true" />
    </div>
  );
}

function toneFromSrc(src: string) {
  if (src === images.reserve) return "tone-reserve";
  if (src === images.park) return "tone-park";
  if (src.includes("sejours")) return "tone-stays";
  if (src.includes("reserve")) return "tone-reserve";
  if (src.includes("parc")) return "tone-park";
  if (src.includes("restaurants")) return "tone-restaurants";
  if (src.includes("spa")) return "tone-spa";
  if (src.includes("mariages")) return "tone-weddings";
  if (src.includes("corporate")) return "tone-corporate";
  if (src.includes("offres") || src.includes("offer")) return "tone-offers";
  if (src.includes("experience")) return "tone-experiences";
  if (src.includes("agenda")) return "tone-agenda";
  return "tone-domain";
}
