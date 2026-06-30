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
import {
  accommodations,
  downloads,
  getCollectionCards,
  heroVideos,
  images,
  localizedHref,
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
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,16,13,0.6),rgba(18,16,13,0.26)_48%,rgba(18,16,13,0.04)_86%)]" />
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

      <nav className="stay-category-nav" aria-label="Catégories d'hébergements">
        <div className="capella-template-wrapper stay-category-nav-inner">
          {categories.map((category) => (
            <a key={category.id} href={`#${category.id}`}>
              <span>{category.nav}</span>
            </a>
          ))}
        </div>
      </nav>

      <StayAccommodationCollection categories={categories} locale={locale} />
      <StayBookStayBand locale={locale} cta={page.primaryCta} />
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

function StayAccommodationCollection({ categories, locale }: { categories: StayCategory[]; locale: Locale }) {
  return (
    <div id="listing-sejours" className="stay-room-sections">
      {categories.map((category) => (
        <section key={category.id} id={category.id} className="stay-room-category stay-listing-category capella-stop-section">
          <div className="capella-template-wrapper">
            <Reveal>
              <div className="stay-listing-category-head">
                <h2>{category.title}</h2>
                <p className="stay-listing-category-subtitle">{category.subtitle}</p>
                <p>{category.copy}</p>
              </div>
            </Reveal>

            <div className="stay-listing-card-grid">
              {category.items.map((item, index) => (
                <Reveal key={item.slug} delay={Math.min(index * 0.04, 0.12)}>
                  <StayListingRoomCard item={item} locale={locale} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function StayListingRoomCard({ item, locale }: { item: Accommodation; locale: Locale }) {
  return (
    <Link href={localizedHref(locale, `/sejours/${item.slug}`)} className="stay-listing-card group">
      <EditorialMedia src={item.image} alt={`${item.name} au Domaine Limoune`} className="stay-listing-card-image" />
      <span className="stay-listing-card-body">
        <span className="stay-listing-card-title">{item.name}</span>
        <span className="stay-listing-card-copy">{item.position}</span>
        <span className="stay-listing-card-link">
          Voir cet hébergement
          <ArrowRight aria-hidden="true" className="size-3 transition group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
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

function StayBookStayBand({ locale, cta }: { locale: Locale; cta: SitePage["primaryCta"] }) {
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
          <ButtonLink cta={cta} locale={locale} />
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

function StayRoomDetailPage({ page, locale, item }: { page: SitePage; locale: Locale; item: Accommodation }) {
  return (
    <>
      <StayDetailGallery item={item} />
      <StayDetailDescription item={item} />
      <StayPracticalInfo item={item} />
      <StayEquipment item={item} />
      <StayIncludedServices item={item} />
      <StayAccessibleExperiences item={item} locale={locale} />
      <StayBookStayBand locale={locale} cta={page.primaryCta} />
      <StayOtherSuggestions item={item} locale={locale} />
      <StayContactBlock locale={locale} />
    </>
  );
}

function StayDetailGallery({ item }: { item: Accommodation }) {
  const gallery = Array.from(new Set([item.image, ...item.gallery])).slice(0, 3);

  return (
    <section className="stay-detail-gallery capella-stop-section">
      <div className="capella-template-wrapper stay-detail-gallery-grid">
        {gallery.map((image, index) => (
          <Reveal key={`${item.slug}-${image}`} delay={Math.min(index * 0.05, 0.12)}>
            <EditorialMedia src={image} alt={`${item.name} visuel ${index + 1}`} className={`stay-detail-gallery-image stay-detail-gallery-image-${index + 1}`} />
          </Reveal>
        ))}
      </div>
    </section>
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
            <h2>{title}</h2>
            <p>Image principale et atmosphères associées pour comprendre la lumière, les matières, la vue et les expériences liées au parcours.</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="innergallery-container inner-page-gallery-stage">
            <EditorialMedia src={main} alt={`${title} image principale`} className="innergallery-panel active" />
            {secondary ? <EditorialMedia src={secondary} alt={`${title} détail éditorial`} className="innergallery-secondary-image" /> : null}
            <div className="innergallery-caption">Galerie immersive, éditoriale et pensée pour rassurer avant la réservation.</div>
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
