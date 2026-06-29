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
import { ButtonLink } from "@/components/ui/ButtonLink";
import { AccommodationSwitcher } from "./AccommodationSwitcher";
import {
  downloads,
  getCollectionCards,
  heroVideos,
  images,
  localizedHref,
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
    href: "/corporate-events",
    cta: "Demander un devis",
    facts: [
      { label: "Formats", value: "Réunion, banquet, cocktail" },
      { label: "Activités", value: "Équipe" },
      { label: "Support", value: "Brochure entreprise" },
    ],
  },
];

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

  return (
    <section className="bleed-hero cinematic-hero relative isolate grid min-h-[62dvh] overflow-hidden bg-[var(--limoune-black)] pt-24 text-[var(--limoune-ivory)]">
      <EditorialMedia src={page.heroImage} alt={page.heroAlt} variant="hero" className="cinematic-hero-media absolute inset-0 rounded-none" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,16,13,0.78),rgba(18,16,13,0.38)_45%,rgba(18,16,13,0.08)_80%)]" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(0deg,var(--limoune-bg),transparent)]" />
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
          <aside className="border border-white/16 bg-white/[0.07] p-5 backdrop-blur-2xl lg:p-6">
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

        <Reveal delay={0.08}>
          <AccommodationSwitcher cards={cards} locale={locale} />
        </Reveal>
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
    { title: "Événements", text: "Mariages, séminaires, privatisations et activités d’équipe.", href: "/corporate-events", cta: "Demander" },
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
    { title: "Entreprises", text: "Séminaire, demande entreprise, activité d’équipe et privatisation.", href: "/corporate-events", cta: "Demander un devis" },
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

function StoryPanel({ story, locale, reverse = false }: { story: StorySection; locale: Locale; reverse?: boolean }) {
  return (
    <section className="px-4 py-14 md:px-6 lg:py-20">
      <div className={`mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <Reveal>
          <EditorialMedia src={story.image} alt={story.alt} className="min-h-[380px] lg:min-h-[520px]" />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="max-w-xl">
            <p className="section-kicker">{story.eyebrow}</p>
            <h2 className="mt-4 font-serif text-[clamp(2.45rem,5vw,5.2rem)] font-medium leading-[0.9] tracking-[-0.055em] text-[var(--limoune-brown)]">
              {story.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--limoune-muted)]">{story.text}</p>
            {story.facts ? <div className="mt-8"><FactGrid facts={story.facts} /></div> : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink cta={{ label: story.cta, href: story.href }} locale={locale} />
              <ButtonLink cta={{ label: "Découvrir", href: story.href, variant: "ghost" }} locale={locale} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InnerPage({ page, locale }: PageRendererProps) {
  const collectionCards = page.collection ? getCollectionCards(page.collection) : [];
  const sections = getVisitorSections(page);
  const contentSections = page.slug.startsWith("sejours/") ? page.sections : [];

  return (
    <>
      {page.slug === "sejours" ? <BookingWidget locale={locale} /> : null}
      <section className="section-titlesypnosis capella-stop-section">
        <div className="capella-template-wrapper">
          <div className="inner-wrapper clear-end">
            <Reveal>
              <div className="section-title srv">
                <p className="section-kicker">{page.eyebrow}</p>
                <h2>{page.title}</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="section-synopsis srv indent">
                <p>{page.summary}</p>
                {page.details ? <div className="mt-8"><FactGrid facts={page.details} /></div> : null}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink cta={page.primaryCta} locale={locale} />
                  {page.secondaryCta ? <ButtonLink cta={page.secondaryCta} locale={locale} /> : null}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {page.gallery?.length ? <PageGallery title={page.title} imagesList={page.gallery} /> : null}

      {contentSections.length > 0 ? <ContentSections sections={contentSections} locale={locale} /> : null}

      {sections.length > 0 ? <VisitorSections sections={sections} locale={locale} /> : null}

      {collectionCards.length > 0 ? (
        <section id="collection" className="bg-[var(--limoune-ivory)] px-4 py-16 md:px-6 lg:py-24">
          <div className="mx-auto max-w-[1240px]">
            <Reveal>
              <div className="grid gap-5 md:grid-cols-[0.74fr_1fr] md:items-end">
                <div>
                  <p className="section-kicker">Collection</p>
                  <h2 className="section-title">Choisir son expérience</h2>
                </div>
                <p className="max-w-2xl text-base leading-8 text-[var(--limoune-muted)]">
                  {"Des fiches claires pour comparer, comprendre les conditions et réserver le bon service."}
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {collectionCards.map((card, index) => (
                <Reveal key={`${card.title}-${index}`} delay={Math.min(index * 0.035, 0.18)}>
                  <PremiumCard card={card} locale={locale} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

       <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-14 md:px-6 lg:py-20">
        {page.downloads ? <DownloadBlock keysList={page.downloads} /> : null}
        {page.form ? <LeadForm type={page.form} /> : null}
        {page.faqs ? <FaqBlock faqs={page.faqs} /> : null}
      </div>

      <AwardsAndContact locale={locale} page={page} />
    </>
  );
}

function PageGallery({ title, imagesList }: { title: string; imagesList: string[] }) {
  const [main, ...rest] = imagesList;

  if (!main) return null;

  return (
    <section className="accommodation-detail-gallery bg-[var(--limoune-ivory)] px-4 py-14 md:px-6 lg:py-20">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="mb-10 grid gap-5 md:grid-cols-[0.72fr_1fr] md:items-end">
            <div>
              <p className="section-kicker">Galerie immersive</p>
              <h2 className="section-title">{title} en images</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[var(--limoune-muted)]">
              Image principale et atmosphères associées pour comprendre la vue, la lumière, les matières et les expériences liées au séjour.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <EditorialMedia src={main} alt={`${title} image principale`} className="detail-gallery-main" />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {rest.slice(0, 3).map((image, index) => (
              <Reveal key={`${image}-${index}`} delay={0.06 + index * 0.035}>
                <EditorialMedia src={image} alt={`${title} galerie ${index + 1}`} className="detail-gallery-thumb" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContentSections({ sections, locale }: { sections: ContentSection[]; locale: Locale }) {
  return (
    <section className="bg-[var(--limoune-bg)] px-4 py-14 md:px-6 lg:py-20">
      <div className="mx-auto grid max-w-[1240px] gap-8">
        {sections.map((section, index) => (
          <Reveal key={`${section.title}-${index}`} delay={Math.min(index * 0.035, 0.16)}>
            <article className="content-section-card cinematic-card border border-[var(--limoune-brown)]/12 bg-[var(--limoune-ivory)]/70 p-5 md:p-8">
              {section.eyebrow ? <p className="section-kicker">{section.eyebrow}</p> : null}
              <div className="grid gap-7 lg:grid-cols-[0.68fr_1fr]">
                <div>
                  <h2 className="section-title">{section.title}</h2>
                </div>
                <div>
                  <p className="text-base leading-8 text-[var(--limoune-muted)]">{section.body}</p>
                  {section.facts ? <div className="mt-7"><FactGrid facts={section.facts} /></div> : null}
                  {section.bullets ? (
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="border-t border-[var(--limoune-brown)]/12 pt-3 text-base leading-7 text-[var(--limoune-brown)]">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.cards ? (
                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                      {section.cards.map((card) => <PremiumCard key={card.title} card={card} locale={locale} />)}
                    </div>
                  ) : null}
                  {section.cta ? (
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <ButtonLink cta={section.cta} locale={locale} />
                      {section.secondaryCta ? <ButtonLink cta={section.secondaryCta} locale={locale} /> : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function VisitorSections({ sections, locale }: { sections: StorySection[]; locale: Locale }) {
  return (
    <>
      {sections.map((section, index) => (
        <StoryPanel key={section.title} story={section} locale={locale} reverse={index % 2 === 1} />
      ))}
    </>
  );
}

function getVisitorSections(page: SitePage): StorySection[] {
  if (page.slug.startsWith("sejours/")) {
    return [];
  }

  if (page.slug.startsWith("restaurants/")) {
    return [
      {
        eyebrow: "Restaurant",
        title: "Ambiance, cuisine et moments à partager",
        text: "Découvrez l’esprit du lieu, les horaires, les menus, les expériences associées et les possibilités de privatisation pour un déjeuner, un dîner ou un événement privé.",
        image: page.heroImage,
        alt: page.heroAlt,
        href: "#lead-form",
        cta: "Réserver une table",
        facts: page.details,
      },
    ];
  }

  const map: Record<string, StorySection[]> = {
    "le-domaine": [
      {
        eyebrow: "Histoire",
        title: "Un domaine vivant entre orangers, hospitalité et nature",
        text: "Domaine Limoune rassemble des jardins, des hébergements, des lieux de restauration, un spa, une réserve, un parc animalier et des espaces d’événements dans un même parcours de destination.",
        image: images.domain,
        alt: "Jardins du Domaine Limoune",
        href: "/sejours",
        cta: "Découvrir les séjours",
        facts: [
          { label: "Situation", value: "Région Agadir - Taroudant" },
          { label: "Univers", value: "Séjour, journée, événements" },
          { label: "Ambiance", value: "Nature premium" },
        ],
      },
      {
        eyebrow: "Accès",
        title: "Une adresse pensée pour recevoir",
        text: "La page réunit les informations pratiques, le plan du Domaine, les distances depuis Agadir, l’aéroport et Taroudant, ainsi que les contacts par service.",
        image: images.corporate,
        alt: "Accès au Domaine Limoune",
        href: downloads.map.href,
        cta: "Télécharger le plan",
      },
    ],
    sejours: [homeStories[0]],
    "reserve-africaine": [homeStories[1]],
    "parc-animalier": [homeStories[2]],
    restaurants: [homeStories[3]],
    "canopy-spa": [homeStories[4]],
    experiences: [
      {
        eyebrow: "Expériences",
        title: "Des moments signature à vivre sur place",
        text: "Safari Limoune, balade à cheval au coucher du soleil, quad, padel, tennis, club enfants, chasse au trésor, pique-nique, barbecue, dîner sous les étoiles, pause thé, brunch familial, atelier cuisine et mixologie.",
        image: images.experiences,
        alt: "Expériences au Domaine Limoune",
        href: "/contact?type=activites",
        cta: "Réserver une expérience",
        facts: [
          { label: "Plein air", value: "Quad, cheval, sports" },
          { label: "Famille", value: "Club enfants, chasse" },
          { label: "Gastronomie", value: "Pique-nique, barbecue, atelier" },
        ],
      },
    ],
    mariages: [
      {
        eyebrow: "Mariages",
        title: "Une célébration sous les orangers",
        text: "Cérémonie, dîner, soirée, brunch du lendemain, rituels mariage, hébergement invités et coordination se construisent autour de votre rythme et de votre nombre d’invités.",
        image: images.weddings,
        alt: "Mariage au Domaine Limoune",
        href: "#lead-form",
        cta: "Demander un devis mariage",
        facts: [
          { label: "Moments", value: "Cérémonie, dîner, brunch" },
          { label: "Bien-être", value: "Rituels mariage" },
          { label: "Invités", value: "Hébergement possible" },
        ],
      },
    ],
    "corporate-events": [
      {
        eyebrow: "Événements d’entreprise",
        title: "Réunir vos équipes dans un cadre naturel",
        text: "Séminaires, réunions, activités d’équipe, déjeuners, dîners d’entreprise et privatisations peuvent associer espaces, restauration, hébergement et activités de groupe.",
        image: images.corporate,
        alt: "Événement d’entreprise au Domaine Limoune",
        href: "#lead-form",
        cta: "Demander un devis",
        facts: [
          { label: "Formats", value: "Réunion, banquet, cocktail" },
          { label: "Activités", value: "Équipe" },
          { label: "Support", value: "Brochure entreprise" },
        ],
      },
    ],
    offres: [
      {
        eyebrow: "Offres",
        title: "Des invitations saisonnières à vivre le Domaine",
        text: "Séjours, famille, spa, restaurants, journées piscine, parc animalier et expériences safari se déclinent en offres ponctuelles sans perdre l’esprit premium du lieu.",
        image: images.offers,
        alt: "Offres Domaine Limoune",
        href: "/contact",
        cta: "Contacter l’équipe",
      },
    ],
    agenda: [
      {
        eyebrow: "Agenda",
        title: "Brunchs, soirées et temps forts du Domaine",
        text: "La programmation rassemble brunchs, soirées, diffusions sportives, activations été, événements enfants, Ramadan, Été Limoune et dîners thématiques.",
        image: images.agenda,
        alt: "Agenda Domaine Limoune",
        href: "/contact?type=agenda",
        cta: "Réserver un événement",
      },
    ],
    contact: [
      {
        eyebrow: "Contact",
        title: "Une demande, le bon service",
        text: "Séjour, restaurant, spa, mariage, entreprise, activités, parc animalier, presse ou informations générales : chaque demande est orientée vers l’équipe concernée.",
        image: images.domain,
        alt: "Contact Domaine Limoune",
        href: "#lead-form",
        cta: "Choisir votre demande",
      },
    ],
  };

  return map[page.slug] ?? [];
}

function PremiumCard({ card, locale }: { card: Card; locale: Locale }) {
  return (
    <Link href={localizedHref(locale, card.href)} className="cinematic-card group block h-full border border-[var(--limoune-brown)]/12 bg-white/58 transition duration-300 hover:-translate-y-1 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--limoune-orange)]">
      <EditorialMedia src={card.image} alt={card.alt} className="min-h-64 rounded-none" />
      <span className="grid gap-4 p-5">
        {card.eyebrow ? <span className="text-xs font-bold tracking-[0.24em] text-[var(--limoune-orange)] uppercase">{card.eyebrow}</span> : null}
        <span className="font-serif text-3xl leading-none tracking-[-0.03em] text-[var(--limoune-brown)]">{card.title}</span>
        <span className="text-sm leading-7 text-[var(--limoune-muted)]">{card.text}</span>
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-[var(--limoune-brown)] uppercase">
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

function BookingWidget({ locale }: { locale: Locale }) {
  return (
    <section id="booking" className="booking-section">
      <div className="booking-card">
        <div className="booking-card-head">
          <div>
            <p className="section-kicker">Réserver votre séjour</p>
            <h2 className="booking-title">Réserver votre séjour</h2>
          </div>
          <Link href={localizedHref(locale, "/contact?type=modification")} className="booking-modify">
            Modifier ma réservation
          </Link>
        </div>
        <form className="booking-grid" action={localizedHref(locale, "/sejours")}>
          <BookingField label="Arrivée" name="arrival" type="date" />
          <BookingField label="Départ" name="departure" type="date" />
          <BookingField label="Chambres" name="rooms" type="number" min="1" />
          <BookingField label="Adultes" name="adults" type="number" min="1" />
          <BookingField label="Enfants" name="children" type="number" min="0" />
          <BookingField label="Code promo" name="promo" type="text" />
          <button type="submit" data-track="availability_check" className="booking-submit">
            Vérifier
          </button>
        </form>
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

function compactHeroSummary(summary: string) {
  const sentence = summary.split(/[.!?]/)[0]?.trim() || summary;
  return sentence.length > 118 ? `${sentence.slice(0, 115).trim()}...` : sentence;
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
      <section className="border-t border-[var(--limoune-brown)]/16 pt-10">
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
      <section className="grid gap-6 border-t border-[var(--limoune-brown)]/16 pt-10 lg:grid-cols-[0.75fr_1.25fr]">
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
