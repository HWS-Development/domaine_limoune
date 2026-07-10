"use client";

import { startTransition, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { localizedHref, type Accommodation, type Locale } from "@/lib/content";

type StayCatalogCategory = {
  id: string;
  title: string;
  subtitle: string;
  copy: string;
  items: Accommodation[];
};

type StayFilterId = "all" | "safari" | "famille" | "couple" | "piscine-jardin" | "suites" | "prestige";

type StayFilter = {
  id: StayFilterId;
  label: string;
  description: string;
  terms: string[];
};

type StayImagePreview = {
  src: string;
  alt: string;
};

type StayRoomContent = {
  title: string;
  hook: string;
  description: string;
  details: { label: string; value: string }[];
  filterTerms: string[];
};

const catalogCopy = {
  fr: {
    introKicker: "Tous les hébergements",
    introTitle: "Trouver la bonne catégorie",
    introBody: "Filtrez les hébergements selon votre besoin : séjour en couple, famille, Safari Experience, piscine, jardin ou prestige.",
    filtersLabel: "Filtres hébergements",
    resultsText: "Les hébergements correspondants apparaissent ci-dessous.",
    empty: "Aucun hébergement ne correspond à ce filtre pour le moment.",
    enlarge: "Agrandir",
    atDomain: "au Domaine Limoune",
    gallery: "Galerie",
    galleryItem: "galerie",
    closePreview: "Fermer l'aperçu",
    book: "Réserver",
    askInfo: "Demander plus d'informations",
    fallback: {
      capacity: "Capacité",
      ideal: "Idéal pour",
      view: "Vue",
      amenities: "Équipements",
      included: "Services inclus",
    },
  },
  en: {
    introKicker: "All accommodation",
    introTitle: "Find the right category",
    introBody: "Filter accommodation according to your need: couple stay, family stay, Safari Experience, pool, garden or prestige.",
    filtersLabel: "Accommodation filters",
    resultsText: "Matching accommodation appears below.",
    empty: "No accommodation matches this filter for now.",
    enlarge: "Enlarge",
    atDomain: "at Le Domaine Limoune",
    gallery: "Gallery",
    galleryItem: "gallery",
    closePreview: "Close preview",
    book: "Book",
    askInfo: "Request more information",
    fallback: {
      capacity: "Capacity",
      ideal: "Ideal for",
      view: "View",
      amenities: "Amenities",
      included: "Included services",
    },
  },
} as const;

function getCatalogCopy(locale: Locale) {
  return locale === "en" ? catalogCopy.en : catalogCopy.fr;
}

const stayFilters: StayFilter[] = [
  {
    id: "all",
    label: "Tous",
    description: "Tous les hébergements proposés sur cette page.",
    terms: [],
  },
  {
    id: "safari",
    label: "Safari Experience",
    description: "Hébergements face à la réserve africaine pour vivre l’expérience signature du Domaine.",
    terms: ["safari", "reserve", "lodge communicant", "lodge signature", "mezzanine"],
  },
  {
    id: "famille",
    label: "Famille",
    description: "Hébergements adaptés aux enfants, aux familles et aux configurations avec couchages additionnels.",
    terms: ["famille", "familiale", "enfant", "parents", "sejour avec enfants"],
  },
  {
    id: "couple",
    label: "Couple",
    description: "Suites et lodges pour deux personnes, escapades calmes et séjours plus intimes.",
    terms: ["couple", "2 personnes", "escapade", "junior", "prestige"],
  },
  {
    id: "piscine-jardin",
    label: "Piscine & Jardin",
    description: "Catégories proches de la piscine, des jardins et des espaces de détente.",
    terms: ["piscine", "jardin", "detente", "terrasse"],
  },
  {
    id: "suites",
    label: "Suites",
    description: "Suites et chambres confortables pour une escapade au calme.",
    terms: ["suite", "suites", "chambre"],
  },
  {
    id: "prestige",
    label: "Prestige",
    description: "Hébergements plus généreux pour les occasions spéciales et les séjours premium.",
    terms: ["prestige", "occasion", "premium", "exception"],
  },
];

const stayFiltersEn: StayFilter[] = [
  {
    id: "all",
    label: "All",
    description: "All accommodation featured on this page.",
    terms: [],
  },
  {
    id: "safari",
    label: "Safari Experience",
    description: "Accommodation facing the African reserve to live the Domaine's signature experience.",
    terms: ["safari", "reserve", "connecting lodge", "signature lodge", "mezzanine"],
  },
  {
    id: "famille",
    label: "Family",
    description: "Accommodation suited to children, families and layouts with additional bedding.",
    terms: ["family", "children", "parents", "stay with children"],
  },
  {
    id: "couple",
    label: "Couple",
    description: "Suites and lodges for two guests, quiet escapes and more intimate stays.",
    terms: ["couple", "2 guests", "escape", "junior", "prestige"],
  },
  {
    id: "piscine-jardin",
    label: "Pool & Garden",
    description: "Categories close to the pool, gardens and relaxation spaces.",
    terms: ["pool", "garden", "relaxation", "terrace"],
  },
  {
    id: "suites",
    label: "Suites",
    description: "Comfortable suites and rooms for a peaceful escape.",
    terms: ["suite", "suites", "room"],
  },
  {
    id: "prestige",
    label: "Prestige",
    description: "More generous accommodation for special occasions and premium stays.",
    terms: ["prestige", "occasion", "premium", "exception"],
  },
];

function getStayFilters(locale: Locale) {
  return locale === "en" ? stayFiltersEn : stayFilters;
}

const stayRoomContent: Record<string, StayRoomContent> = {
  "suite-junior": {
    title: "Suite Junior",
    hook: "Le format idéal pour une escapade au Domaine",
    description: "La Suite Junior offre un espace confortable pour un séjour en couple ou une courte pause près d’Agadir. Elle permet de profiter facilement des restaurants, du spa, de la piscine et des différents univers du Domaine.",
    details: [
      { label: "Capacité", value: "2 personnes" },
      { label: "Idéal pour", value: "Couple, court séjour, escapade détente" },
      { label: "Vue", value: "Jardins ou Domaine selon disponibilité" },
      { label: "Équipements", value: "Chambre confortable, salle de bain équipée, climatisation, Wi-Fi" },
      { label: "Services inclus", value: "Petit-déjeuner selon l’offre confirmée, accès aux espaces du Domaine selon conditions de séjour" },
    ],
    filterTerms: ["suite", "chambre", "couple", "2 personnes", "escapade", "detente"],
  },
  "suite-executive": {
    title: "Suite Exécutive",
    hook: "Plus d’espace pour un séjour plus confortable",
    description: "La Suite Exécutive propose un espace plus généreux, adapté aux séjours premium, aux voyageurs d’affaires ou aux pauses prolongées. Elle offre un cadre calme, élégant et pratique pour vivre Le Domaine Limoune avec plus de confort.",
    details: [
      { label: "Capacité", value: "2 à 3 personnes selon configuration" },
      { label: "Idéal pour", value: "Séjour premium, couple, voyage d’affaires, long séjour" },
      { label: "Vue", value: "Jardins ou Domaine selon disponibilité" },
      { label: "Équipements", value: "Coin salon, bureau, salle de bain équipée, climatisation, Wi-Fi" },
      { label: "Services inclus", value: "Petit-déjeuner selon l’offre confirmée, assistance réservation restaurants et activités" },
    ],
    filterTerms: ["suite", "chambre", "couple", "premium", "prestige", "long sejour"],
  },
  "lodges-cote-piscine-ou-jardin": {
    title: "Lodges côté piscine ou jardin",
    hook: "Un séjour simple à vivre, proche des espaces de détente",
    description: "Ces lodges permettent de profiter pleinement de l’ambiance du Domaine : piscine, jardins, restaurants, détente et moments en famille. Ils sont adaptés aux visiteurs qui recherchent un hébergement pratique, confortable et proche des lieux de vie.",
    details: [
      { label: "Capacité", value: "2 à 3 personnes selon configuration" },
      { label: "Idéal pour", value: "Couple, petite famille, séjour piscine, détente" },
      { label: "Vue", value: "Piscine ou jardins selon disponibilité" },
      { label: "Équipements", value: "Terrasse ou accès extérieur, salle de bain équipée, climatisation, Wi-Fi" },
      { label: "Services inclus", value: "Petit-déjeuner selon l’offre confirmée, accès aux espaces du Domaine selon conditions de séjour" },
    ],
    filterTerms: ["lodge", "piscine", "jardin", "couple", "famille", "detente", "terrasse"],
  },
  "suite-familiale": {
    title: "Suite Familiale",
    hook: "Le confort pensé pour les familles",
    description: "La Suite Familiale permet de séjourner au Domaine avec plus d’espace et de confort. Elle est idéale pour les familles qui souhaitent profiter des activités, du parc animalier, de la piscine et des restaurants tout en gardant un véritable point d’ancrage pour se reposer.",
    details: [
      { label: "Capacité", value: "Jusqu’à 5 personnes selon configuration" },
      { label: "Idéal pour", value: "Famille, séjour avec enfants, vacances au Domaine" },
      { label: "Vue", value: "Jardins ou Domaine selon disponibilité" },
      { label: "Équipements", value: "Espaces séparés selon unité, salle de bain équipée, climatisation, Wi-Fi" },
      { label: "Services inclus", value: "Petit-déjeuner selon l’offre confirmée, accès aux espaces du Domaine selon conditions de séjour" },
      { label: "Enfants", value: "Lit bébé, couchage enfant et équipements famille sur demande selon disponibilité" },
    ],
    filterTerms: ["famille", "familiale", "enfants", "5 personnes", "vacances"],
  },
  "lodge-safari-mezzanine": {
    title: "Lodge Safari avec mezzanine",
    hook: "L’expérience signature du Domaine Limoune",
    description: "Le Lodge Safari avec mezzanine est pensé pour les familles et les séjours immersifs. Depuis le lodge, l’expérience se vit face à la réserve africaine, dans une atmosphère calme, naturelle et dépaysante.",
    details: [
      { label: "Capacité", value: "Jusqu’à 4 personnes" },
      { label: "Idéal pour", value: "Famille, Safari Experience, séjour immersif" },
      { label: "Vue", value: "Réserve africaine" },
      { label: "Équipements", value: "Mezzanine, salle de bain équipée, climatisation, Wi-Fi" },
      { label: "Services inclus", value: "Petit-déjeuner selon l’offre confirmée, accès aux espaces du Domaine selon conditions de séjour" },
      { label: "Enfants", value: "Adapté aux familles, surveillance parentale recommandée sur la mezzanine" },
    ],
    filterTerms: ["safari", "reserve", "famille", "mezzanine", "immersif", "4 personnes"],
  },
  "lodges-communicants": {
    title: "Lodge communicant",
    hook: "Le confort d’un séjour à plusieurs",
    description: "Le Lodge communicant est idéal pour les familles, les groupes ou les séjours multi-générationnels. Il permet de partager l’expérience Safari Experience tout en conservant des espaces séparés et confortables.",
    details: [
      { label: "Capacité", value: "Selon configuration confirmée par l’équipe réservation" },
      { label: "Idéal pour", value: "Famille nombreuse, groupe, séjour avec enfants" },
      { label: "Vue", value: "Réserve africaine ou espaces naturels selon disponibilité" },
      { label: "Équipements", value: "Espaces communicants, salles de bain équipées, climatisation, Wi-Fi" },
      { label: "Services inclus", value: "Petit-déjeuner selon l’offre confirmée, accès aux espaces du Domaine selon conditions de séjour" },
      { label: "Enfants", value: "Répartition à valider avec l’équipe réservation selon âge et capacité" },
    ],
    filterTerms: ["safari", "reserve", "communicant", "famille", "groupe", "enfants"],
  },
  "suite-lodge-premium": {
    title: "Lodge Signature",
    hook: "Une expérience safari plus exclusive",
    description: "Le Lodge Signature propose une expérience plus exclusive au cœur de l’univers safari du Domaine Limoune. Il s’adresse aux clients qui recherchent plus de confort, d’intimité et une immersion privilégiée face à la réserve africaine.",
    details: [
      { label: "Capacité", value: "Selon configuration" },
      { label: "Idéal pour", value: "Couple, famille, séjour premium, occasion spéciale" },
      { label: "Vue", value: "Réserve africaine" },
      { label: "Équipements", value: "Espaces généreux, salle de bain équipée, climatisation, Wi-Fi" },
      { label: "Services inclus", value: "Petit-déjeuner selon l’offre confirmée, accompagnement réservation restaurants, spa et activités" },
      { label: "Expérience", value: "Hébergement signature au plus près de la réserve africaine" },
    ],
    filterTerms: ["safari", "reserve", "signature", "prestige", "premium", "occasion", "couple", "famille"],
  },
  "suite-signature": {
    title: "Suite Prestige",
    hook: "Une suite plus exclusive pour les séjours d’exception",
    description: "La Suite Prestige est pensée pour les clients qui recherchent plus d’espace, de confort et d’intimité. Elle convient aux occasions spéciales, aux séjours premium et aux moments à célébrer au Domaine.",
    details: [
      { label: "Capacité", value: "Selon configuration" },
      { label: "Idéal pour", value: "Couple, occasion spéciale, séjour premium" },
      { label: "Vue", value: "Domaine, jardins ou horizon selon disponibilité" },
      { label: "Équipements", value: "Salon, terrasse selon unité, salle de bain équipée, climatisation, Wi-Fi" },
      { label: "Services inclus", value: "Accueil personnalisé, petit-déjeuner selon l’offre confirmée, assistance réservation restaurants et activités" },
    ],
    filterTerms: ["suite", "prestige", "occasion", "premium", "couple", "exception"],
  },
};

const stayRoomContentEn: Record<string, StayRoomContent> = {
  "suite-junior": {
    title: "Junior Suite",
    hook: "The ideal format for an escape at the Domaine",
    description: "The Junior Suite offers a comfortable space for a couple's stay or a short pause near Agadir. It makes it easy to enjoy the restaurants, spa, pool and the different worlds of the Domaine.",
    details: [
      { label: "Capacity", value: "2 guests" },
      { label: "Ideal for", value: "Couple, short stay, relaxing escape" },
      { label: "View", value: "Gardens or Domaine depending on availability" },
      { label: "Amenities", value: "Comfortable room, equipped bathroom, air conditioning, Wi-Fi" },
      { label: "Included services", value: "Breakfast according to the confirmed offer, access to Domaine spaces according to stay conditions" },
    ],
    filterTerms: ["suite", "room", "couple", "2 guests", "escape", "relaxation"],
  },
  "suite-executive": {
    title: "Executive Suite",
    hook: "More space for a more comfortable stay",
    description: "The Executive Suite offers a more generous space suited to premium stays, business travellers or longer pauses. It provides a calm, elegant and practical setting to experience Le Domaine Limoune with more comfort.",
    details: [
      { label: "Capacity", value: "2 to 3 guests depending on configuration" },
      { label: "Ideal for", value: "Premium stay, couple, business trip, long stay" },
      { label: "View", value: "Gardens or Domaine depending on availability" },
      { label: "Amenities", value: "Lounge area, desk, equipped bathroom, air conditioning, Wi-Fi" },
      { label: "Included services", value: "Breakfast according to the confirmed offer, assistance booking restaurants and activities" },
    ],
    filterTerms: ["suite", "room", "couple", "premium", "prestige", "long stay"],
  },
  "lodges-cote-piscine-ou-jardin": {
    title: "Poolside or garden lodges",
    hook: "An easy-to-live stay close to relaxation spaces",
    description: "These lodges allow you to fully enjoy the Domaine atmosphere: pool, gardens, restaurants, relaxation and family moments. They suit guests looking for practical, comfortable accommodation close to the living spaces.",
    details: [
      { label: "Capacity", value: "2 to 3 guests depending on configuration" },
      { label: "Ideal for", value: "Couple, small family, pool stay, relaxation" },
      { label: "View", value: "Pool or gardens depending on availability" },
      { label: "Amenities", value: "Terrace or outdoor access, equipped bathroom, air conditioning, Wi-Fi" },
      { label: "Included services", value: "Breakfast according to the confirmed offer, access to Domaine spaces according to stay conditions" },
    ],
    filterTerms: ["lodge", "pool", "garden", "couple", "family", "relaxation", "terrace"],
  },
  "suite-familiale": {
    title: "Family Suite",
    hook: "Comfort designed for families",
    description: "The Family Suite lets you stay at the Domaine with more space and comfort. It is ideal for families who want to enjoy activities, the wildlife park, pool and restaurants while keeping a true anchor point for rest.",
    details: [
      { label: "Capacity", value: "Up to 5 guests depending on configuration" },
      { label: "Ideal for", value: "Family, stay with children, holidays at the Domaine" },
      { label: "View", value: "Gardens or Domaine depending on availability" },
      { label: "Amenities", value: "Separate spaces depending on unit, equipped bathroom, air conditioning, Wi-Fi" },
      { label: "Included services", value: "Breakfast according to the confirmed offer, access to Domaine spaces according to stay conditions" },
      { label: "Children", value: "Baby cot, child bedding and family equipment on request depending on availability" },
    ],
    filterTerms: ["family", "children", "5 guests", "holiday"],
  },
  "lodge-safari-mezzanine": {
    title: "Safari Lodge with mezzanine",
    hook: "The signature experience of Le Domaine Limoune",
    description: "The Safari Lodge with mezzanine is designed for families and immersive stays. From the lodge, the experience unfolds facing the African reserve, in a calm, natural and disorienting atmosphere.",
    details: [
      { label: "Capacity", value: "Up to 4 guests" },
      { label: "Ideal for", value: "Family, Safari Experience, immersive stay" },
      { label: "View", value: "African reserve" },
      { label: "Amenities", value: "Mezzanine, equipped bathroom, air conditioning, Wi-Fi" },
      { label: "Included services", value: "Breakfast according to the confirmed offer, access to Domaine spaces according to stay conditions" },
      { label: "Children", value: "Adapted to families, parental supervision recommended on the mezzanine" },
    ],
    filterTerms: ["safari", "reserve", "family", "mezzanine", "immersive", "4 guests"],
  },
  "lodges-communicants": {
    title: "Connecting Lodge",
    hook: "Comfort for staying together",
    description: "The Connecting Lodge is ideal for families, groups or multi-generational stays. It lets guests share the Safari Experience while keeping separate and comfortable spaces.",
    details: [
      { label: "Capacity", value: "According to the configuration confirmed by the reservations team" },
      { label: "Ideal for", value: "Large family, group, stay with children" },
      { label: "View", value: "African reserve or natural spaces depending on availability" },
      { label: "Amenities", value: "Connecting spaces, equipped bathrooms, air conditioning, Wi-Fi" },
      { label: "Included services", value: "Breakfast according to the confirmed offer, access to Domaine spaces according to stay conditions" },
      { label: "Children", value: "Distribution to be validated with the reservations team according to age and capacity" },
    ],
    filterTerms: ["safari", "reserve", "connecting", "family", "group", "children"],
  },
  "suite-lodge-premium": {
    title: "Signature Lodge",
    hook: "A more exclusive safari experience",
    description: "The Signature Lodge offers a more exclusive experience at the heart of the Domaine Limoune safari world. It is designed for guests seeking more comfort, privacy and privileged immersion facing the African reserve.",
    details: [
      { label: "Capacity", value: "According to configuration" },
      { label: "Ideal for", value: "Couple, family, premium stay, special occasion" },
      { label: "View", value: "African reserve" },
      { label: "Amenities", value: "Generous spaces, equipped bathroom, air conditioning, Wi-Fi" },
      { label: "Included services", value: "Breakfast according to the confirmed offer, assistance booking restaurants, spa and activities" },
      { label: "Experience", value: "Signature accommodation as close as possible to the African reserve" },
    ],
    filterTerms: ["safari", "reserve", "signature", "prestige", "premium", "occasion", "couple", "family"],
  },
  "suite-signature": {
    title: "Prestige Suite",
    hook: "A more exclusive suite for exceptional stays",
    description: "The Prestige Suite is designed for guests seeking more space, comfort and privacy. It suits special occasions, premium stays and moments to celebrate at the Domaine.",
    details: [
      { label: "Capacity", value: "According to configuration" },
      { label: "Ideal for", value: "Couple, special occasion, premium stay" },
      { label: "View", value: "Domaine, gardens or horizon depending on availability" },
      { label: "Amenities", value: "Lounge, terrace depending on unit, equipped bathroom, air conditioning, Wi-Fi" },
      { label: "Included services", value: "Personalised welcome, breakfast according to the confirmed offer, assistance booking restaurants and activities" },
    ],
    filterTerms: ["suite", "prestige", "occasion", "premium", "couple", "exception"],
  },
};

export function StayCatalog({ categories, locale }: { categories: StayCatalogCategory[]; locale: Locale }) {
  const [activeFilter, setActiveFilter] = useState<StayFilterId>("all");
  const [preview, setPreview] = useState<StayImagePreview | null>(null);
  const filters = getStayFilters(locale);
  const copy = getCatalogCopy(locale);
  const activeFilterData = filters.find((filter) => filter.id === activeFilter) ?? filters[0];
  const activeItems = filterItems(categories.flatMap((category) => category.items), activeFilter, locale, filters);
  const visibleCategories = activeFilter === "all" ? categories : [];

  useEffect(() => {
    if (!preview) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [preview]);

  const selectFilter = (filterId: StayFilterId) => {
    startTransition(() => setActiveFilter(filterId));
  };

  return (
    <div id="listing-sejours" className="stay-catalog capella-stop-section">
      <div className="capella-template-wrapper stay-catalog-shell">
        <Reveal>
          <div className="stay-catalog-intro">
            <p className="section-kicker">{copy.introKicker}</p>
            <h2>{copy.introTitle}</h2>
            <p>{copy.introBody}</p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="stay-filter-bar" role="group" aria-label={copy.filtersLabel}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`stay-filter-pill${activeFilter === filter.id ? " is-active" : ""}`}
                aria-pressed={activeFilter === filter.id}
                onClick={() => selectFilter(filter.id)}
              >
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="stay-room-sections" aria-live="polite">
        {visibleCategories.map((category) => (
          <StayCategorySection key={category.id} category={category} locale={locale} onPreview={setPreview} />
        ))}

        {activeFilter !== "all" ? (
          <section id={`filtre-${activeFilter}`} className="stay-room-category stay-listing-category stay-filter-results capella-stop-section">
            <div className="capella-template-wrapper">
              <Reveal>
                <div className="stay-listing-category-head">
                  <h2>{activeFilterData.label}</h2>
                  <p className="stay-listing-category-subtitle">{activeFilterData.description}</p>
                  <p>{copy.resultsText}</p>
                </div>
              </Reveal>

              {activeItems.length > 0 ? (
                <StayCardGrid items={activeItems} locale={locale} onPreview={setPreview} />
              ) : (
                <p className="stay-filter-empty">{copy.empty}</p>
              )}
            </div>
          </section>
        ) : null}
      </div>

      {preview ? <StayImageLightbox preview={preview} locale={locale} onClose={() => setPreview(null)} /> : null}
    </div>
  );
}

function StayCategorySection({ category, locale, onPreview }: { category: StayCatalogCategory; locale: Locale; onPreview: (preview: StayImagePreview) => void }) {
  return (
    <section id={category.id} className="stay-room-category stay-listing-category capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="stay-listing-category-head">
            <h2>{category.title}</h2>
            <p className="stay-listing-category-subtitle">{category.subtitle}</p>
            <p>{category.copy}</p>
          </div>
        </Reveal>

        <StayCardGrid items={category.items} locale={locale} onPreview={onPreview} />
      </div>
    </section>
  );
}

function StayCardGrid({ items, locale, onPreview }: { items: Accommodation[]; locale: Locale; onPreview: (preview: StayImagePreview) => void }) {
  return (
    <div className="stay-listing-card-grid">
      {items.map((item, index) => (
        <Reveal key={item.slug} delay={Math.min(index * 0.04, 0.12)}>
          <StayListingRoomCard item={item} locale={locale} onPreview={onPreview} />
        </Reveal>
      ))}
    </div>
  );
}

function StayListingRoomCard({ item, locale, onPreview }: { item: Accommodation; locale: Locale; onPreview: (preview: StayImagePreview) => void }) {
  const content = getStayRoomContent(item, locale);
  const copy = getCatalogCopy(locale);
  const gallery = Array.from(new Set([item.image, ...item.gallery])).slice(0, 5);
  const thumbnails = gallery.slice(1);

  return (
    <article className="stay-listing-card group">
      <div className="stay-listing-card-media-stack">
        <button type="button" className="stay-listing-card-media-button" aria-label={`${copy.enlarge} ${content.title}`} onClick={() => onPreview({ src: item.image, alt: `${content.title} ${copy.atDomain}` })}>
          <EditorialMedia src={item.image} alt={`${content.title} ${copy.atDomain}`} className="stay-listing-card-image" />
        </button>
        {thumbnails.length > 0 ? (
          <div className="stay-listing-mini-gallery" aria-label={`${copy.gallery} ${content.title}`}>
            {thumbnails.map((image, index) => (
              <button key={`${item.slug}-mini-${image}`} type="button" className="stay-listing-mini-button" aria-label={`${copy.enlarge} ${content.title} ${copy.galleryItem} ${index + 2}`} onClick={() => onPreview({ src: image, alt: `${content.title} ${copy.galleryItem} ${index + 2}` })}>
                <EditorialMedia src={image} alt={`${content.title} ${copy.galleryItem} ${index + 2}`} className="stay-listing-mini-image" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="stay-listing-card-body">
        <span className="stay-listing-card-title">{content.title}</span>
        <span className="stay-listing-card-copy">{content.hook}</span>
        <span className="stay-listing-card-emotion">{content.description}</span>
        <div className="stay-listing-card-details">
          {content.details.map((detail) => (
            <div key={detail.label}><small>{detail.label}</small>{detail.value}</div>
          ))}
        </div>
        <div className="stay-listing-card-actions">
          <a href={localizedHref(locale, "/sejours#booking")} data-track="room_card_booking">{copy.book}</a>
          <Link href={localizedHref(locale, "/contact?type=sejour")}>{copy.askInfo}</Link>
        </div>
      </div>
    </article>
  );
}

function StayImageLightbox({ preview, locale, onClose }: { preview: StayImagePreview; locale: Locale; onClose: () => void }) {
  const copy = getCatalogCopy(locale);

  return (
    <div className="stay-image-lightbox" role="dialog" aria-modal="true" aria-label={preview.alt} onClick={onClose}>
      <button type="button" className="stay-image-lightbox-close" aria-label={copy.closePreview} onClick={onClose}>
        X
      </button>
      <figure className="stay-image-lightbox-frame" onClick={(event) => event.stopPropagation()}>
        <Image src={preview.src} alt={preview.alt} fill sizes="100vw" quality={95} />
        <figcaption>{preview.alt}</figcaption>
      </figure>
    </div>
  );
}

function filterItems(items: Accommodation[], filterId: StayFilterId, locale: Locale, filters: StayFilter[]) {
  if (filterId === "all") return items;
  const filter = filters.find((item) => item.id === filterId);
  if (!filter) return items;

  return items.filter((item) => {
    const content = getStayRoomContent(item, locale);
    const text = normalize([item.name, item.category, item.position, item.emotionalText, item.view, ...item.meta, content.title, content.hook, content.description, ...content.filterTerms].join(" "));
    return filter.terms.some((term) => text.includes(normalize(term)));
  });
}

function getStayRoomContent(item: Accommodation, locale: Locale): StayRoomContent {
  const copy = getCatalogCopy(locale);
  const rooms = locale === "en" ? stayRoomContentEn : stayRoomContent;

  return rooms[item.slug] ?? {
    title: item.name,
    hook: item.position,
    description: item.emotionalText,
    details: [
      { label: copy.fallback.capacity, value: item.capacity },
      { label: copy.fallback.ideal, value: item.meta.slice(0, 3).join(", ") },
      { label: copy.fallback.view, value: item.view },
      { label: copy.fallback.amenities, value: item.amenities.slice(0, 4).join(", ") },
      { label: copy.fallback.included, value: item.servicesIncluded.slice(0, 3).join(", ") },
    ],
    filterTerms: item.meta,
  };
}

function EditorialMedia({ src, alt, variant = "default", className = "" }: { src: string; alt: string; variant?: "hero" | "default"; className?: string }) {
  return (
    <div role="img" aria-label={alt} className={`limoune-media ${toneFromSrc(src)} ${variant === "hero" ? "limoune-media-hero" : ""} ${className}`}>
      <Image className="limoune-media-image" src={src} alt="" fill sizes={variant === "hero" ? "100vw" : "(min-width: 1180px) 560px, (min-width: 768px) 46vw, 100vw"} quality={90} />
      <span className="limoune-media-depth" aria-hidden="true" />
      <span className="limoune-media-sheen" aria-hidden="true" />
      <span className="limoune-media-grain" aria-hidden="true" />
    </div>
  );
}

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function toneFromSrc(src: string) {
  if (src.includes("sejours")) return "tone-stays";
  if (src.includes("reserve")) return "tone-reserve";
  if (src.includes("parc")) return "tone-park";
  if (src.includes("restaurants")) return "tone-restaurants";
  if (src.includes("spa")) return "tone-spa";
  if (src.includes("mariages")) return "tone-weddings";
  if (src.includes("corporate")) return "tone-corporate";
  if (src.includes("offres")) return "tone-offers";
  if (src.includes("agenda")) return "tone-agenda";
  return "tone-domain";
}
