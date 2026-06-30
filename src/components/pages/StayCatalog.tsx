"use client";

import { startTransition, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { localizedHref, type Accommodation, type Locale } from "@/lib/content";

type StayCatalogCategory = {
  id: string;
  title: string;
  subtitle: string;
  copy: string;
  items: Accommodation[];
};

type StayFilterId = "all" | "famille" | "couple" | "reserve" | "piscine" | "suites";

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

const stayFilters: StayFilter[] = [
  {
    id: "all",
    label: "Tous",
    description: "Toutes les suites et lodges disponibles au Domaine Limoune.",
    terms: [],
  },
  {
    id: "famille",
    label: "Famille",
    description: "Hébergements adaptés aux enfants, aux familles et aux configurations avec couchages additionnels.",
    terms: ["famille", "familiale", "enfant", "communicant", "mezzanine"],
  },
  {
    id: "couple",
    label: "Couple",
    description: "Suites et lodges pour deux personnes, escapades calmes et séjours plus intimes.",
    terms: ["couple", "2 personnes", "signature", "junior"],
  },
  {
    id: "reserve",
    label: "Réserve",
    description: "Hébergements tournés vers l'expérience safari et la vue sur la réserve africaine.",
    terms: ["reserve", "safari", "immersif"],
  },
  {
    id: "piscine",
    label: "Piscine",
    description: "Catégories proches des piscines, des jardins et des moments de journée du Domaine.",
    terms: ["piscine", "journee", "jardin"],
  },
  {
    id: "suites",
    label: "Suites",
    description: "Toutes les suites du Domaine, de la Junior à la Signature et aux configurations premium.",
    terms: ["suite", "suites"],
  },
];

export function StayCatalog({ categories, locale }: { categories: StayCatalogCategory[]; locale: Locale }) {
  const [activeFilter, setActiveFilter] = useState<StayFilterId>("all");
  const [preview, setPreview] = useState<StayImagePreview | null>(null);
  const activeFilterData = stayFilters.find((filter) => filter.id === activeFilter) ?? stayFilters[0];
  const activeItems = filterItems(categories.flatMap((category) => category.items), activeFilter);
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
            <p className="section-kicker">Filtrer les hébergements</p>
            <h2>Trouver la bonne suite ou le bon lodge.</h2>
            <p>Choisissez un besoin : la grille affiche immédiatement les hébergements correspondants, sans détour ni bloc décoratif inutile.</p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="stay-filter-bar" role="group" aria-label="Filtres hébergements">
            {stayFilters.map((filter) => {
              const count = filterItems(categories.flatMap((category) => category.items), filter.id).length;
              return (
                <button
                  key={filter.id}
                  type="button"
                  className={`stay-filter-pill${activeFilter === filter.id ? " is-active" : ""}`}
                  aria-pressed={activeFilter === filter.id}
                  onClick={() => selectFilter(filter.id)}
                >
                  <span>{filter.label}</span>
                  <small>{count}</small>
                </button>
              );
            })}
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
                  <p>{activeItems.length} hébergement{activeItems.length > 1 ? "s" : ""} correspondent à ce filtre.</p>
                </div>
              </Reveal>

              {activeItems.length > 0 ? (
                <StayCardGrid items={activeItems} locale={locale} onPreview={setPreview} />
              ) : (
                <p className="stay-filter-empty">Aucun hébergement ne correspond à ce filtre pour le moment.</p>
              )}
            </div>
          </section>
        ) : null}
      </div>

      {preview ? <StayImageLightbox preview={preview} onClose={() => setPreview(null)} /> : null}
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
  const gallery = Array.from(new Set([item.image, ...item.gallery])).slice(0, 5);
  const thumbnails = gallery.slice(1);
  const specs = [
    ["Capacité", item.capacity],
    ["Surface", item.surface],
    ["Lit", item.bed],
    ["Vue", item.view],
  ];

  return (
    <article className="stay-listing-card group">
      <div className="stay-listing-card-media-stack">
        <button type="button" className="stay-listing-card-media-button" aria-label={`Agrandir ${item.name}`} onClick={() => onPreview({ src: item.image, alt: `${item.name} au Domaine Limoune` })}>
          <EditorialMedia src={item.image} alt={`${item.name} au Domaine Limoune`} className="stay-listing-card-image" />
        </button>
        {thumbnails.length > 0 ? (
          <div className="stay-listing-mini-gallery" aria-label={`Galerie ${item.name}`}>
            {thumbnails.map((image, index) => (
              <button key={`${item.slug}-mini-${image}`} type="button" className="stay-listing-mini-button" aria-label={`Agrandir ${item.name} galerie ${index + 2}`} onClick={() => onPreview({ src: image, alt: `${item.name} galerie ${index + 2}` })}>
                <EditorialMedia src={image} alt={`${item.name} galerie ${index + 2}`} className="stay-listing-mini-image" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="stay-listing-card-body">
        <span className="stay-listing-card-title">{item.name}</span>
        <span className="stay-listing-card-copy">{item.position}</span>
        <span className="stay-listing-card-emotion">{item.emotionalText}</span>
        <div className="stay-listing-card-specs">
          {specs.map(([label, value]) => (
            <div key={label}>
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="stay-listing-card-details">
          <div><small>Équipements</small>{item.amenities.slice(0, 3).join(" · ")}</div>
          <div><small>Services inclus</small>{item.servicesIncluded.slice(0, 3).join(" · ")}</div>
          <div><small>Conditions enfants</small>{item.childConditions}</div>
          <div><small>Arrivée / départ</small>{item.checkIn} · {item.checkOut}</div>
        </div>
        <div className="stay-listing-card-actions">
          <a href={localizedHref(locale, "/sejours#booking")} data-track="room_card_booking">Réserver</a>
          <Link href={localizedHref(locale, "/contact?type=sejour")}>Demander plus d&apos;informations</Link>
          <Link href={localizedHref(locale, `/sejours/${item.slug}`)}>
            Voir la fiche complète
            <ArrowRight aria-hidden="true" className="size-3 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function StayImageLightbox({ preview, onClose }: { preview: StayImagePreview; onClose: () => void }) {
  return (
    <div className="stay-image-lightbox" role="dialog" aria-modal="true" aria-label={preview.alt} onClick={onClose}>
      <button type="button" className="stay-image-lightbox-close" aria-label="Fermer l'aperçu" onClick={onClose}>
        X
      </button>
      <figure className="stay-image-lightbox-frame" onClick={(event) => event.stopPropagation()}>
        <Image src={preview.src} alt={preview.alt} fill sizes="100vw" quality={95} />
        <figcaption>{preview.alt}</figcaption>
      </figure>
    </div>
  );
}

function filterItems(items: Accommodation[], filterId: StayFilterId) {
  if (filterId === "all") return items;
  const filter = stayFilters.find((item) => item.id === filterId);
  if (!filter) return items;

  return items.filter((item) => {
    const text = normalize([item.name, item.category, item.position, item.emotionalText, item.view, ...item.meta].join(" "));
    return filter.terms.some((term) => text.includes(normalize(term)));
  });
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
