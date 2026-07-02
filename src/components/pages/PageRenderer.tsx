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
import { StayCatalog } from "@/components/pages/StayCatalog";
import { StayDetailGallery } from "@/components/pages/StayDetailGallery";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  accommodations,
  downloads,
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

const homeStories: StorySection[] = [
  {
    eyebrow: "Séjours",
    title: "Suites et lodges ouverts sur la nature",
    text: "Des hébergements pensés pour les escapades en couple, les séjours en famille et les nuits plus immersives face à la réserve.",
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
    eyebrow: "Réserve Africaine",
    title: "Dormir face à la réserve",
    text: "Une expérience d’hébergement calme et attentive, réservée aux clients des lodges concernés, autour de l’observation et du respect animalier.",
    image: images.reserve,
    alt: "Réserve africaine du Domaine Limoune",
    href: "/reserve-africaine",
    cta: "Voir l’expérience safari",
    facts: [
      { label: "Accès", value: "Clients hébergement" },
      { label: "Esprit", value: "Observation et silence" },
      { label: "Lien", value: "Lodges safari" },
    ],
  },
  {
    eyebrow: "Parc Animalier",
    title: "Une sortie familiale au contact du vivant",
    text: "Un parcours pédagogique pour découvrir plus de trente espèces dans un cadre encadré, accessible selon horaires et conditions.",
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
    title: "Quatre lieux de vie, quatre atmosphères",
    text: "Massa Restaurant, Aman sous les Orangers, Monkey Beach et Limoune Club composent une restauration pensée pour le séjour, la journée et l’événement.",
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
    title: "Un refuge de lumière et de calme",
    text: "Soins, hammams, rituels, piscine chauffée, jacuzzis, tisanerie et espaces bien-être prolongent l’expérience du Domaine.",
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
    eyebrow: "Expériences",
    title: "Des moments signature à composer",
    text: "Safari Limoune, balade à cheval au coucher du soleil, quad, padel, tennis, club enfants, chasse au trésor, pique-nique, barbecue et dîner sous les étoiles.",
    image: images.experiences,
    alt: "Expériences et activités au Domaine Limoune",
    href: "/experiences",
    cta: "Voir les expériences",
    facts: [
      { label: "Famille", value: "Club enfants, chasse" },
      { label: "Plein air", value: "Cheval, quad, sports" },
      { label: "Signature", value: "Dîner, pique-nique, barbecue" },
    ],
  },
  {
    eyebrow: "Mariages",
    title: "Célébrer sous les orangers",
    text: "Cérémonie, dîner, soirée, brunch du lendemain, rituels mariage et hébergement invités se composent dans un décor naturel et élégant.",
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
    title: "Réunir vos équipes dans un domaine vivant",
    text: "Séminaires, réunions, déjeuners, dîners d’entreprise, privatisations et activités d’équipe associent espaces, restauration, hébergement et activités.",
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
];

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

  const stayItem = getStayItemFromPage(page);

  if (page.slug === "sejours") {
    return <StayListingHero page={page} locale={locale} />;
  }

  if (stayItem) {
    return <StayDetailHero page={page} locale={locale} item={stayItem} />;
  }

  return (
    <section className="bleed-hero inner-hero cinematic-hero relative isolate grid min-h-[68dvh] overflow-hidden bg-[var(--limoune-black)] pt-24 text-[var(--limoune-ivory)]">
      <EditorialMedia src={page.heroImage} alt={page.heroAlt} variant="hero" className="cinematic-hero-media absolute inset-0 rounded-none" />
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
              <span className="grid size-12 place-items-center rounded-full border border-white/25 bg-white/10 transition group-hover:bg-white group-hover:text-[var(--limoune-brown)]">
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

function HomeMasthead({ page, locale }: PageRendererProps) {
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
          <div className="masthead-hero-copy" aria-label="Domaine Limoune destination premium">
            <h1 className="masthead-main-title">Domaine Limoune</h1>
            <p className="masthead-cinematic-quote">« Là où les orangers respirent, chaque séjour devient un rituel de lumière. »</p>
          </div>
          <p className="masthead-bottomtext">Destination nature près d’Agadir<br />Séjours, réserve, table et bien-être</p>
          <a className="masthead-downarrow" href="#domaine-limoune-story" aria-label="Descendre vers le Domaine" />
        </div>
        <button className="hp-popup-button" type="button" data-video-trigger aria-label="Voir la vidéo du Domaine">
          <Play aria-hidden="true" className="size-4 fill-current" />
          <span>voir le film</span>
        </button>
        <Link className="masthead-book-link" href={localizedHref(locale, "/sejours#booking")}>Réserver votre séjour</Link>
      </div>
    </section>
  );
}

function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <CapellaCloneIntro locale={locale} />
      <CapellaCloneStory />
      <CapellaCloneGallery />
      <CapellaCloneUniverses locale={locale} />
      <CapellaCloneAccommodation locale={locale} />
      <CapellaCloneRituals locale={locale} />
      <CapellaCloneAvailable locale={locale} />
      <CapellaCloneOffers locale={locale} />
      <CapellaCloneAgenda locale={locale} />
      <CapellaCloneAwards />
      <CapellaCloneBookBanner locale={locale} />
      <CapellaClonePrefooter locale={locale} />
    </>
  );
}

function CapellaCloneIntro({ locale }: { locale: Locale }) {
  return (
    <section id="domaine-limoune-story" className="capella-award-intro capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <h2 className="capella-award-title">Le Domaine où la nature devient séjour</h2>
        </Reveal>
        <div className="capella-award-layout">
          <Reveal>
            <div className="capella-award-left">
              <p className="capella-award-subtitle">Une retraite d’orangers, de lodges et d’hospitalité marocaine contemporaine près d’Agadir</p>
              <EditorialMedia src={images.restaurants} alt="Détail chaleureux du Domaine Limoune" className="capella-award-small-image" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="capella-award-main">
              <EditorialMedia src={images.domain} alt="Jardins, orangers et lieux de vie du Domaine Limoune" className="capella-award-main-image" />
              <div className="capella-award-copy">
                <p>Au cœur d’un paysage de jardins et de lumière, Domaine Limoune réunit séjour, table, réserve africaine, parc animalier, spa et célébrations dans une seule adresse.</p>
                <Link className="text-button capella-template-link" href={localizedHref(locale, "/le-domaine")}>Découvrir le Domaine</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CapellaCloneStory() {
  return (
    <section className="section-titlesypnosis capella-stop-section">
      <div className="capella-template-wrapper">
        <div className="inner-wrapper clear-end">
          <Reveal>
            <div className="section-title srv story-title-stack">
              <h2>Un domaine vivant, réimaginé</h2>
              <EditorialMedia src={images.restaurants} alt="Lieux de vie et hospitalité du Domaine Limoune" className="story-side-visual" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="section-synopsis srv indent">
              <p>La journée commence dans la douceur des orangers, se prolonge au parc animalier ou au bord de l’eau, puis glisse vers un dîner, un soin ou un moment sous les étoiles.</p>
              <p>L’expérience n’est pas une collection de services : c’est une destination complète, construite pour les familles, les couples, les entreprises et les célébrations.</p>
              <EditorialMedia src={images.reserve} alt="Réserve africaine et nature du Domaine Limoune" className="synopsis-visual" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CapellaCloneUniverses({ locale }: { locale: Locale }) {
  const universes = homeStories;

  return (
    <section className="section-scrollgrid section-universes capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="section_title split-title">
            <h2>Une destination, plusieurs expériences</h2>
            <p>Chaque univers possède son rythme, son public et son appel à l’action : séjourner, explorer, déjeuner, se ressourcer, célébrer, réunir.</p>
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

function CapellaCloneGallery() {
  return (
    <section className="section-innergallery capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="innergallery-container">
            <EditorialMedia src={images.domain} alt="Jardins, lumière chaude et matières naturelles du Domaine Limoune" className="innergallery-panel active" />
            <div className="innergallery-caption">Lumière chaude, jardins, matières naturelles et rituels de séjour.</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CapellaCloneAccommodation({ locale }: { locale: Locale }) {
  const cards = getCollectionCards("accommodations").slice(0, 4);

  if (!cards.length) return null;

  return (
    <section id="section_accommodation" className="limoune-accommodation capella-stop-section">
      <div className="capella-template-wrapper luxury-stay-wrapper">
        <div className="luxury-section-head accommodation-head">
          <Reveal>
            <div>
              <p className="luxury-kicker">Séjours privés</p>
              <h2>Séjours</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="luxury-section-copy">Choisissez votre rythme : lodge safari face à la réserve, suite dans les jardins ou séjour famille. Chaque hébergement ouvre sur un autre visage du Domaine.</p>
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
                    Découvrir
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
  const rituals = ["Journée piscine", "Brunch sous les orangers", "Pause thé", "Événements enfants", "Dîner à ciel ouvert"];

  return (
    <section className="limoune-wild-summer capella-stop-section">
      <div className="wild-summer-glow" aria-hidden="true" />
      <div className="capella-template-wrapper wild-summer-wrapper">
        <Reveal>
          <div className="wild-summer-copy">
            <p className="luxury-kicker">Rituel de saison</p>
            <h2>Été Limoune</h2>
            <p>Une saison solaire pensée comme une parenthèse de domaine : piscine, brunch familial, pause thé, événements enfants et dîners sous les étoiles.</p>
            <div className="wild-ritual-list">
              {rituals.map((ritual) => <span key={ritual}>{ritual}</span>)}
            </div>
            <Link className="luxury-primary-link" href={localizedHref(locale, "/offres")}>Découvrir les rituels</Link>
          </div>
        </Reveal>

        <div className="wild-summer-gallery">
          <Reveal delay={0.08}>
            <div className="wild-main-card cinematic-card">
              <EditorialMedia src={images.summer} alt="Été Limoune au Domaine Limoune" className="wild-main-image" />
              <div className="wild-main-caption">
                <span>Du midi à la nuit</span>
                <strong>Piscine, table, jardins et ciel ouvert</strong>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="wild-side-stack">
              <EditorialMedia src={images.pool} alt="Journée piscine premium au Domaine Limoune" className="wild-side-image" />
              <div className="wild-side-note">
                <span>Offre Été Limoune</span>
                <p>Séjour saisonnier avec expériences famille, piscine et univers animalier.</p>
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
  const agenda = getCollectionCards("agenda").slice(0, 4).map((item, index) => ({
    ...item,
    image: agendaVisuals[index] ?? item.image,
  }));
  const featured = agenda[1] ?? agenda[0];

  if (!featured) return null;

  return (
    <section className="limoune-agenda-premium capella-stop-section">
      <div className="capella-template-wrapper agenda-premium-wrapper">
        <div className="agenda-premium-head">
          <Reveal>
            <div>
              <p className="luxury-kicker">Programmation</p>
              <h2>Agenda du Domaine</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="agenda-premium-copy">
              <p>Brunchs sous les orangers, Été Limoune, événements enfants, soirées, dîners thématiques et moments spéciaux : chaque date devient une raison de revenir.</p>
              <div className="luxury-actions">
                <Link className="luxury-primary-link" href={localizedHref(locale, "/agenda")}>Voir toute la programmation</Link>
                <Link className="luxury-secondary-link" href={localizedHref(locale, "/contact?type=agenda")}>Réserver une date</Link>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="agenda-premium-stage">
          <Reveal>
            <article className="agenda-featured-card cinematic-card">
              <EditorialMedia src={featured.image} alt={featured.alt} className="agenda-featured-image" />
              <div className="agenda-featured-copy">
                <span>{featured.eyebrow}</span>
                <h3>{featured.title}</h3>
                <p>{featured.text}</p>
                <Link className="luxury-primary-link" href={localizedHref(locale, featured.href)}>Réserver ce moment</Link>
              </div>
            </article>
          </Reveal>
          <div className="agenda-schedule-panel">
            <Reveal delay={0.08}>
              <div className="agenda-filter-row" aria-label="Univers agenda">
                {['Brunchs', 'Soirées', 'Enfants', 'Sport', 'Saison'].map((item) => <span key={item}>{item}</span>)}
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

function CapellaCloneAwards() {
  const signatures = [
    ["Presse", "Fiche Domaine, dossier presse et contacts médias pour raconter le Domaine avec précision.", images.corporate, "Presse et communication Domaine Limoune"],
    ["Destination", "Séjour, table, spa, réserve, parc animalier et événements dans une même adresse.", images.domain, "Destination Domaine Limoune"],
    ["Confiance", "Une plateforme claire pour rassurer, orienter et transformer chaque demande en lead qualifié.", images.restaurants, "Hospitalité Domaine Limoune"],
  ];

  return (
    <section className="section-basetemplate awards-grid capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal><div className="section_title"><h2>Presse & distinctions</h2></div></Reveal>
        <div className="scroll-grid"><div className="scroll-grid-container"><div className="scroll-grid-scroll">
          {signatures.map(([title, text, image, alt], index) => (
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
  const bookingPaths = [
    { title: "Séjour", text: "Suites, lodges safari, familles et escapades près d’Agadir.", href: "/sejours#booking", cta: "Vérifier" },
    { title: "Table", text: "Massa, Aman sous les Orangers, Monkey Beach et Limoune Club.", href: "/restaurants", cta: "Réserver" },
    { title: "Spa", text: "Soins Canopy, hammam, rituels duo et mariage.", href: "/canopy-spa", cta: "Choisir" },
    { title: "Événements", text: "Mariages, séminaires, privatisations et activités d’équipe.", href: "/evenements-entreprise", cta: "Demander" },
  ];

  return (
    <section className="limoune-booking-atelier capella-stop-section">
      <div className="capella-template-wrapper booking-atelier-wrapper">
        <Reveal>
          <div className="booking-atelier-media cinematic-card">
            <EditorialMedia src={images.stays} alt="Séjour premium au Domaine Limoune" className="booking-atelier-image" />
            <div className="booking-atelier-badge">
              <span>Réservation directe</span>
              <strong>Le meilleur parcours commence ici.</strong>
            </div>
          </div>
        </Reveal>
        <div className="booking-atelier-content">
          <Reveal>
            <p className="luxury-kicker">Réservation & demandes</p>
            <h2>Composez votre moment au Domaine.</h2>
            <p>Une nuit face à la nature, une table sous les orangers, un soin Canopy ou un événement à privatiser : choisissez le bon parcours, nous orientons votre demande vers le bon service.</p>
            <div className="luxury-actions">
              <Link className="luxury-primary-link" href={localizedHref(locale, "/sejours#booking")}>Réserver votre séjour</Link>
              <Link className="luxury-secondary-link" href={localizedHref(locale, "/contact")}>Demande sur mesure</Link>
            </div>
          </Reveal>
          <div className="booking-path-grid">
            {bookingPaths.map((item, index) => (
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
  const offers = getCollectionCards("offers").slice(0, 3);

  return (
    <section className="section-scrollgrid limoune-offers-section capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal><div className="section_title"><h2>Offres</h2></div></Reveal>
        <div className="scroll-grid"><div className="scroll-grid-container"><div className="scroll-grid-scroll limoune-offers-grid">
          {offers.map((offer, index) => (
            <Reveal key={offer.title} delay={index * 0.05}>
              <Link href={localizedHref(locale, offer.href)} className="scroll-grid-panel active ani cinematic-card offer-equal-card">
                <EditorialMedia src={offer.image} alt={offer.alt} className="section-grid-img" />
                <div className="section-grid-title"><h4>{offer.title}</h4></div>
                <div className="section-grid-synopsis"><p>{offer.text}</p></div>
                <div className="section-grid-link"><span className="text-button">Découvrir</span></div>
              </Link>
            </Reveal>
          ))}
        </div></div></div>
      </div>
    </section>
  );
}

function CapellaCloneAvailable({ locale }: { locale: Locale }) {
  const available = [
    { title: "Canopy Spa", text: "Soin, hammam, tisanerie et piscine chauffée.", cta: "Réserver un soin", href: "/canopy-spa", image: images.spa, alt: "Canopy Spa Domaine Limoune" },
    { title: "Table au Domaine", text: "Déjeuner sous les orangers ou dîner signature.", cta: "Réserver une table", href: "/restaurants", image: images.restaurants, alt: "Restaurants Domaine Limoune" },
    { title: "Parc animalier", text: "Visite familiale, nature et découverte du vivant.", cta: "Préparer la visite", href: "/parc-animalier", image: images.park, alt: "Parc animalier Domaine Limoune" },
    { title: "Journée piscine", text: "Une journée solaire autour de Monkey Beach.", cta: "Voir l’offre", href: "/offres", image: images.pool, alt: "Journée piscine Domaine Limoune" },
  ];

  return (
    <section className="limoune-available-now capella-stop-section">
      <div className="available-now-grain" aria-hidden="true" />
      <div className="capella-template-wrapper available-now-wrapper">
        <div className="available-editorial-grid">
          <Reveal>
            <div className="available-now-copy">
              <p className="luxury-kicker">Expériences journée</p>
              <h2>À vivre maintenant</h2>
              <p className="available-lead">Une parenthèse à vivre sans séjour : spa, table, piscine, parc animalier ou dîner sous les étoiles. Une journée simple à réserver, précise dans son parcours, mémorable dans son ressenti.</p>
              <div className="luxury-actions">
                <Link className="luxury-primary-link" href={localizedHref(locale, "/experiences")}>Composer ma journée</Link>
                <Link className="luxury-secondary-link" href={localizedHref(locale, "/contact")}>Contacter la conciergerie</Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="available-showcase cinematic-card">
              <EditorialMedia src={images.pool} alt="Journée premium au Domaine Limoune" className="available-showcase-image" />
              <div className="available-reservation-card">
                <span>Parcours du jour</span>
                <strong>Spa, table, parc ou piscine</strong>
                <p>Un parcours journée pour transformer une visite en expérience Domaine Limoune.</p>
                <Link href={localizedHref(locale, "/experiences")}>Voir les expériences</Link>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="available-service-grid">
          {available.map((item, index) => (
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
  const contacts = [
    { title: "Séjours", text: "Suites, lodges, offres et disponibilités.", href: "/sejours#booking", cta: "Réserver" },
    { title: "Restaurants", text: "Table, groupe, brunch ou dîner privé.", href: "/restaurants", cta: "Réserver une table" },
    { title: "Canopy Spa", text: "Soin, hammam, rituel duo ou mariage.", href: "/canopy-spa", cta: "Réserver un soin" },
    { title: "Mariages", text: "Cérémonie, dîner, brunch et hébergement invités.", href: "/mariages", cta: "Demander un devis" },
    { title: "Entreprises", text: "Séminaire, demande entreprise, activité d’équipe et privatisation.", href: "/evenements-entreprise", cta: "Demander un devis" },
    { title: "Parc et activités", text: "Parc animalier, enfants, plein air et journées famille.", href: "/experiences", cta: "Préparer la visite" },
  ];

  return (
    <section className="limoune-contact-hub capella-stop-section">
      <div className="capella-template-wrapper contact-hub-wrapper">
        <div className="contact-hub-head">
          <Reveal>
            <div>
              <p className="luxury-kicker">Contact rapide</p>
              <h2>Une demande, le bon service.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p>Séjour, restaurant, spa, mariage, entreprise, parc animalier, activités ou presse : chaque intention est orientée vers un parcours clair pour accélérer la réponse et qualifier la demande.</p>
          </Reveal>
        </div>

        <div className="contact-hub-stage">
          <Reveal>
            <article className="contact-concierge-card cinematic-card">
              <EditorialMedia src={images.domain} alt="Conciergerie Domaine Limoune" className="contact-hub-image" />
              <div className="contact-concierge-copy">
                <span>Domaine Limoune</span>
                <strong>Région Agadir - Taroudant</strong>
                <p>Notre équipe vous guide vers le séjour, la table, le soin ou l’événement qui correspond à votre moment.</p>
                <div className="contact-concierge-actions">
                  <Link href={localizedHref(locale, "/contact")}>Formulaire contact</Link>
                  <a href="https://wa.me/212000000000" data-track="whatsapp_click">WhatsApp Business</a>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="contact-route-grid">
            {contacts.map((item, index) => (
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
              <span>Réponse par service</span>
              <span>Demandes segmentées</span>
              <span>Brochures & PDF</span>
              <span>Presse & événements</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InnerPage({ page, locale }: PageRendererProps) {
  const collectionCards = page.collection ? getCollectionCards(page.collection) : [];
  const collectionIntro = getCollectionIntro(page);
  const contentSections = page.sections;
  const hasServiceBlock = Boolean(page.downloads?.length || page.form || page.faqs?.length);
  const showCollectionFirst = page.template === "collection";

  if (page.slug === "sejours") {
    return <StayLandingPage page={page} locale={locale} />;
  }

  const stayItem = getStayItemFromPage(page);

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

      <AwardsAndContact locale={locale} page={page} />
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
  return (
    <section className="stay-capella-hero stay-capella-hero-listing capella-stop-section">
      <div className="capella-template-wrapper stay-capella-hero-inner">
        <Reveal>
          <div className="stay-capella-hero-copy stay-capella-hero-copy-grid">
            <div>
              <h1>{page.title}</h1>
              <p className="stay-capella-subtitle">Suites et lodges au cœur du Domaine Limoune</p>
              <p>
                Séjourner au Domaine Limoune, c’est choisir une adresse où nature, hospitalité marocaine contemporaine et expériences familiales se rencontrent à quelques minutes d’Agadir.
              </p>
              <p>
                Suites dans les jardins, lodges côté piscine, hébergements familiaux ou nuit face à la réserve : chaque catégorie répond à une manière différente de vivre le Domaine.
              </p>
              <div className="stay-hero-actions">
                <ButtonLink cta={page.primaryCta} locale={locale} />
                {page.secondaryCta ? <ButtonLink cta={page.secondaryCta} locale={locale} /> : null}
              </div>
            </div>
            <EditorialMedia src={page.heroImage} alt={page.heroAlt} className="stay-capella-hero-image" />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <nav className="stay-capella-breadcrumb" aria-label="Fil d'Ariane">
            <Link href={localizedHref(locale, "/")}>Domaine Limoune</Link>
            <span>{page.title}</span>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}

function StayDetailHero({ page, locale, item }: { page: SitePage; locale: Locale; item: Accommodation }) {
  return (
    <section className="stay-capella-hero stay-capella-hero-detail capella-stop-section">
      <div className="capella-template-wrapper stay-capella-hero-inner">
        <Reveal>
          <div className="stay-capella-hero-copy stay-capella-hero-copy-grid">
            <div>
              <h1>{page.title}</h1>
              <p className="stay-capella-subtitle">{item.position}</p>
              <p>{item.emotionalText}</p>
              <p>
                Cette fiche réunit la galerie, la description complète, les informations pratiques, les équipements, les services inclus et les expériences accessibles pendant le séjour.
              </p>
              <div className="stay-hero-actions">
                <ButtonLink cta={page.primaryCta} locale={locale} />
                {page.secondaryCta ? <ButtonLink cta={page.secondaryCta} locale={locale} /> : null}
              </div>
            </div>
            <EditorialMedia src={item.image} alt={page.heroAlt} className="stay-capella-hero-image" />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <nav className="stay-capella-breadcrumb" aria-label="Fil d'Ariane">
            <Link href={localizedHref(locale, "/")}>Domaine Limoune</Link>
            <Link href={localizedHref(locale, "/sejours")}>Séjours</Link>
            <span>{item.name.toUpperCase()}</span>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}

function StayLandingPage({ page, locale }: { page: SitePage; locale: Locale }) {
  const categories = getStayCategories();

  return (
    <>
      <StayEmotionalIntro />
      <StayCategoryOverview categories={categories} />
      <StayCatalog categories={categories} locale={locale} />
      <StayBookStayBand locale={locale} cta={page.primaryCta} secondaryCta={page.secondaryCta} />
      <StayGuestServices />
      <StayConditions />
      <StayRelatedOffers locale={locale} />
      <StayContactBlock locale={locale} />
    </>
  );
}

function StayEmotionalIntro() {
  return (
    <section className="stay-pdf-section stay-emotional-intro capella-stop-section">
      <div className="capella-template-wrapper stay-pdf-two-col">
        <Reveal>
          <div>
            <p className="section-kicker">Introduction émotionnelle</p>
            <h2>Séjours au Domaine.</h2>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="stay-pdf-copy">
            <p>Le Domaine Limoune réunit hébergement, réserve africaine, parc animalier, restaurants, spa, activités et lieux de vie dans une destination complète.</p>
            <p>La page Séjours doit aider chaque visiteur à comprendre rapidement quelle catégorie correspond à son rythme : couple, famille, séjour piscine, lodge face à la réserve ou suite plus exclusive.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StayCategoryOverview({ categories }: { categories: StayCategory[] }) {
  return (
    <section className="stay-pdf-section stay-category-overview capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="stay-pdf-head">
            <p className="section-kicker">Présentation des grandes catégories</p>
            <h2>Choisir par ambiance, besoin et moment du séjour.</h2>
          </div>
        </Reveal>
        <div className="stay-category-overview-grid">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={Math.min(index * 0.04, 0.12)}>
              <a href={`#${category.id}`} className="stay-category-overview-card group">
                {category.items[0] ? <EditorialMedia src={category.items[0].image} alt={`${category.title} au Domaine Limoune`} className="stay-category-overview-image" /> : null}
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{category.title}</strong>
                <span>{category.subtitle}</span>
                <em>
                  Découvrir
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

function StayGuestServices() {
  const services = [
    "Wi-Fi haut débit dans les espaces prévus du Domaine",
    "Accueil personnalisé selon la catégorie réservée",
    "Petit-déjeuner selon l’offre confirmée à la réservation",
    "Accès piscine selon horaires, saison et conditions opérationnelles",
    "Assistance conciergerie avant et pendant le séjour",
    "Réservation des restaurants, du Canopy Spa et des activités sur demande",
    "Stationnement selon disponibilité",
    "Lit bébé et équipements famille sur demande",
    "Accès au parc animalier selon conditions et offre réservée",
    "Accès à certaines expériences saisonnières selon disponibilité",
    "Transferts privés disponibles sur demande",
    "Accompagnement pour occasions spéciales, familles et longs séjours",
  ];

  return (
    <section className="stay-guest-services capella-stop-section">
      <div className="capella-template-wrapper stay-guest-services-inner">
        <Reveal>
          <h2>Services inclus</h2>
        </Reveal>
        <div className="stay-guest-services-list">
          {services.map((service, index) => (
            <Reveal key={service} delay={Math.min(index * 0.018, 0.12)}>
              <p>{service}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StayConditions() {
  const conditions = [
    ["Arrivée et départ", "Check-in à partir de 15h00 et check-out jusqu’à 12h00, avec ajustements possibles selon disponibilité et politique opérationnelle."],
    ["Capacités", "Les capacités indiquées dépendent de la configuration attribuée. Tout couchage additionnel doit être confirmé par l’équipe réservation."],
    ["Enfants", "Lit bébé, couchage enfant et équipements famille sont proposés sur demande, selon âge, catégorie et disponibilité."],
    ["Accès aux univers", "Piscine, parc animalier, réserve, spa, restaurants et activités peuvent être soumis à horaires, saison, conditions d’accès ou réservation préalable."],
  ];

  return (
    <section className="stay-conditions-section capella-stop-section">
      <div className="capella-template-wrapper stay-pdf-two-col">
        <Reveal>
          <div>
            <p className="section-kicker">Conditions générales</p>
            <h2>Des informations claires avant de confirmer.</h2>
          </div>
        </Reveal>
        <div className="stay-conditions-list">
          {conditions.map(([title, text], index) => (
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
  const offers = [
    ["Séjour Famille", "Une proposition pensée pour les familles, les couchages adaptés et les expériences enfants selon calendrier."],
    ["Escapade Canopy Spa", "Un séjour ou une journée associant hébergement, calme, soin et rituels bien-être."],
    ["Safari Lodge Experience", "Une invitation à choisir un lodge lié à la réserve pour une expérience plus immersive."],
  ];

  return (
    <section className="stay-related-offers capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="stay-pdf-head">
            <p className="section-kicker">Offres liées</p>
            <h2>Des séjours à composer selon la saison.</h2>
          </div>
        </Reveal>
        <div className="stay-related-offers-grid">
          {offers.map(([title, text], index) => (
            <Reveal key={title} delay={Math.min(index * 0.04, 0.12)}>
              <Link href={localizedHref(locale, "/offres")} className="stay-related-offer-card group">
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{title}</strong>
                <span>{text}</span>
                <em>
                  Voir les offres
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
  return (
    <section id="booking" className="stay-book-band capella-stop-section">
      <div className="capella-template-wrapper stay-book-band-inner">
        <Reveal>
          <div>
            <h2>Réserver votre séjour</h2>
            <p>Choisissez vos dates ou demandez conseil à l’équipe réservation pour confirmer la meilleure catégorie selon votre rythme, votre vue souhaitée et la composition du séjour.</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="stay-booking-panel">
            <div className="booking-card stay-booking-card">
              <div className="booking-card-head">
                <div>
                  <p className="section-kicker">Module de réservation hébergement</p>
                  <h3 className="booking-title">Vérifier les disponibilités</h3>
                </div>
                <Link href={localizedHref(locale, "/contact?type=modification")} className="booking-modify">
                  Modifier ma réservation
                </Link>
              </div>
              <form className="booking-grid" action={localizedHref(locale, "/contact")} method="get">
                <input type="hidden" name="type" value="sejour" />
                <BookingField label="Date d’arrivée" name="arrival" type="date" />
                <BookingField label="Date de départ" name="departure" type="date" />
                <BookingField label="Chambres" name="rooms" type="number" min="1" />
                <BookingField label="Adultes" name="adults" type="number" min="1" />
                <BookingField label="Enfants" name="children" type="number" min="0" />
                <BookingField label="Code promotionnel" name="promo" type="text" />
                <button type="submit" data-track={cta.track} className="booking-submit">
                  {cta.label}
                </button>
              </form>
            </div>
            <div className="stay-booking-secondary-actions">
              {secondaryCta ? <ButtonLink cta={secondaryCta} locale={locale} /> : null}
              {secondaryCta?.label.toLowerCase().includes("demander plus") ? null : (
                <ButtonLink cta={{ label: "Demander plus d'informations", href: "/contact?type=sejour", variant: "secondary" }} locale={locale} />
              )}
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
              { label: "Accès", value: "Libre ou encadré selon politique opérationnelle" },
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
              <a href="https://wa.me/212000000000" data-track="whatsapp_click">WhatsApp Business</a>
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
  return (
    <section className="stay-capella-contact capella-stop-section">
      <div className="capella-template-wrapper stay-capella-contact-grid">
        <Reveal>
          <div className="stay-capella-contact-address">
            <p>Contact</p>
            <h2>Domaine Limoune</h2>
            <address>
              Région Agadir - Taroudant<br />
              Maroc
            </address>
            <a href={downloads.factsheet.href} data-track="download_factsheet">Voir la fiche Domaine</a>
            <a href={downloads.accommodation.href} data-track="download_accommodation_pdf">Voir la brochure hébergement</a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="stay-capella-contact-list">
            <h3>Nous contacter</h3>
            {[
              ["Informations générales", "Contact", "/contact"],
              ["Réservations hébergement", "Séjour", "/contact?type=sejour"],
              ["Restaurants", "Tables du Domaine", "/restaurants"],
              ["Canopy Spa", "Soins et rituels", "/canopy-spa"],
              ["Mariages et événements", "Demandes privées et corporate", "/contact?type=evenement"],
              ["Presse", "Demandes médias", "/presse"],
            ].map(([label, text, href]) => (
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
              <span><MapPinned aria-hidden="true" className="size-4" /> Domaine Limoune</span>
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

function StayRoomDetailPage({ page, locale, item }: { page: SitePage; locale: Locale; item: Accommodation }) {
  return (
    <>
      <StayDetailGallery item={item} />
      <StayDetailDescription item={item} />
      <StayPracticalInfo item={item} />
      <StayEquipment item={item} />
      <StayIncludedServices item={item} />
      <StayAccessibleExperiences item={item} locale={locale} />
      <StayBookStayBand locale={locale} cta={page.primaryCta} secondaryCta={page.secondaryCta} />
      <StayOtherSuggestions item={item} locale={locale} />
      <StayContactBlock locale={locale} />
    </>
  );
}

function StayDetailDescription({ item }: { item: Accommodation }) {
  return (
    <section className="stay-detail-description capella-stop-section">
      <div className="capella-template-wrapper stay-pdf-two-col">
        <Reveal>
          <div>
            <p className="section-kicker">Description complète</p>
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

function StayPracticalInfo({ item }: { item: Accommodation }) {
  const facts = [
    ["Capacité", item.capacity],
    ["Surface", item.surface],
    ["Type de lit", item.bed],
    ["Vue", item.view],
    ["Arrivée", item.checkIn],
    ["Départ", item.checkOut],
    ["Conditions enfants", item.childConditions],
  ];

  return (
    <section className="stay-detail-amenities stay-practical-info capella-stop-section">
      <div className="capella-template-wrapper stay-detail-amenities-grid">
        <Reveal>
          <h2>Informations pratiques</h2>
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
              <h3>Brochure</h3>
              <a href={downloads.accommodation.href}>Voir la brochure hébergement</a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="stay-detail-practical-note">
            <p>Les surfaces, couchages et vues peuvent varier selon l’unité attribuée et la disponibilité. L’équipe réservation confirme la configuration la plus adaptée avant votre arrivée.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StayEquipment({ item }: { item: Accommodation }) {
  return (
    <section className="stay-detail-list-section capella-stop-section">
      <div className="capella-template-wrapper stay-detail-list-grid">
        <Reveal>
          <h2>Équipements</h2>
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

function StayIncludedServices({ item }: { item: Accommodation }) {
  return (
    <section className="stay-detail-list-section stay-included-services capella-stop-section">
      <div className="capella-template-wrapper stay-detail-list-grid">
        <Reveal>
          <h2>Services inclus</h2>
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
  const experiences = getStayExperiences(item);

  return (
    <section className="stay-detail-experiences capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <div className="stay-pdf-head">
            <p className="section-kicker">Expériences accessibles pendant le séjour</p>
            <h2>Prolonger la chambre par les univers du Domaine.</h2>
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
                  Découvrir
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
  const suggestions = getStaySuggestions(item);

  if (!suggestions.length) return null;

  return (
    <section className="stay-other-suggestions capella-stop-section">
      <div className="capella-template-wrapper">
        <Reveal>
          <h2>Hébergements similaires</h2>
        </Reveal>
        <div className="stay-other-suggestions-grid">
          {suggestions.map((suggestion, index) => (
            <Reveal key={suggestion.slug} delay={Math.min(index * 0.05, 0.1)}>
              <Link href={localizedHref(locale, `/sejours/${suggestion.slug}`)} className="stay-suggestion-card group">
                <strong>{suggestion.name}</strong>
                <span>{suggestion.position}</span>
                <em>
                  Voir cet hébergement
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

function getStayItemFromPage(page: SitePage) {
  if (!page.slug.startsWith("sejours/")) return null;

  const slug = page.slug.replace("sejours/", "");
  return accommodations.find((item) => item.slug === slug) ?? null;
}

function getStayCategories(): StayCategory[] {
  return [
    {
      id: "rooms",
      nav: "Chambres",
      title: "Chambres et lodges jardin",
      subtitle: "Un confort calme au cœur du Domaine Limoune",
      copy: "Les suites junior, suites exécutives et lodges côté piscine ou jardin offrent un point d’ancrage élégant pour alterner repos, table, piscine et découverte du Domaine.",
      items: getAccommodationsBySlug(["suite-junior", "suite-executive", "lodges-cote-piscine-ou-jardin"]),
    },
    {
      id: "accessible-rooms",
      nav: "Familles",
      title: "Familles et lodges communicants",
      subtitle: "Des configurations pensées pour partager sans perdre en confort",
      copy: "Suites familiales et lodges communicants facilitent les séjours avec enfants, familles nombreuses ou groupes qui souhaitent garder de l’intimité.",
      items: getAccommodationsBySlug(["suite-familiale", "lodges-communicants"]),
    },
    {
      id: "suites",
      nav: "Suites",
      title: "Suites",
      subtitle: "Des suites et lodges pour vivre le Domaine avec plus d’espace",
      copy: "Les suites et le lodge safari avec mezzanine répondent aux séjours qui demandent plus de générosité, de calme ou une relation plus directe avec la réserve.",
      items: getAccommodationsBySlug(["suites", "lodge-safari-mezzanine"]),
    },
    {
      id: "prestige-suites",
      nav: "Prestige",
      title: "Séjours prestige",
      subtitle: "Les hébergements les plus généreux pour les occasions spéciales",
      copy: "Suites signature, suites ou lodges premium permettent de construire un séjour plus exclusif, plus spacieux et plus personnalisé.",
      items: getAccommodationsBySlug(["suite-signature", "suite-lodge-premium"]),
    },
  ];
}

function getAccommodationsBySlug(slugs: string[]) {
  return slugs
    .map((slug) => accommodations.find((item) => item.slug === slug))
    .filter((item): item is Accommodation => Boolean(item));
}

function getStaySuggestions(item: Accommodation) {
  const sameCategory = accommodations.filter((candidate) => candidate.slug !== item.slug && candidate.category === item.category);
  const fallback = accommodations.filter((candidate) => candidate.slug !== item.slug && candidate.category !== item.category);
  return [...sameCategory, ...fallback].slice(0, 2);
}

function getStayExperiences(item: Accommodation): [string, string, string][] {
  const base: [string, string, string][] = [
    ["Restaurants du Domaine", "Massa, Aman sous les Orangers, Monkey Beach et Limoune Club prolongent le séjour par plusieurs atmosphères de table.", "/restaurants"],
    ["Canopy Spa", "Soins, hammams, piscine chauffée, jacuzzis et rituels bien-être peuvent compléter la pause.", "/canopy-spa"],
    ["Expériences en plein air", "Balade à cheval, quad, padel, tennis, pique-nique ou dîner sous les étoiles selon saison et disponibilité.", "/experiences"],
  ];

  if (item.meta.some((meta) => ["Réserve", "Famille", "Parc animalier"].includes(meta))) {
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
      title: "Une demande, le bon service.",
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
            <p className="text-xs font-bold tracking-[0.3em] text-[var(--limoune-orange)] uppercase">Presse & distinctions</p>
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
              <a href="https://wa.me/212000000000" data-track="whatsapp_click" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--limoune-brown)]/18 bg-white px-5 py-3 text-sm font-bold tracking-[0.16em] text-[var(--limoune-brown)] uppercase transition hover:border-[var(--limoune-orange)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--limoune-orange)]">
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
          <span className="grid size-10 place-items-center rounded-full bg-[var(--limoune-brown)] text-[var(--limoune-ivory)]">
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
  if (src.includes("offres")) return "tone-offers";
  if (src.includes("agenda")) return "tone-agenda";
  return "tone-domain";
}
