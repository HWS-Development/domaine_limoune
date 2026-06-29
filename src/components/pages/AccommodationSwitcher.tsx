"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { localizedHref, type Card, type Locale } from "@/lib/content";

function SwitcherMedia({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`limoune-media ${className}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="limoune-media-image" />
      <span className="limoune-media-overlay" aria-hidden="true" />
    </div>
  );
}

export function AccommodationSwitcher({ cards, locale }: { cards: Card[]; locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = cards[activeIndex] ?? cards[0];
  const miniCards = cards.filter((_, index) => index !== activeIndex).slice(0, 3);

  useEffect(() => {
    if (cards.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % cards.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [cards.length]);

  if (!active) return null;

  return (
    <>
      <div className="luxury-accommodation-stage">
        <nav className="accommodation-rail" aria-label="Hébergements signature">
          {cards.map((card, index) => (
            <button
              key={card.title}
              className={`accommodation-rail-link ${index === activeIndex ? "active" : ""}`}
              type="button"
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{card.title}</strong>
              <small>{card.eyebrow}</small>
            </button>
          ))}
        </nav>

        <div className="accommodation-visual cinematic-card" aria-live="polite">
          <SwitcherMedia src={active.image} alt={active.alt} className="accommodation-hero-image" />
          <div className="accommodation-media-badge">
            <span>Lodge signature</span>
            <strong>{active.eyebrow}</strong>
          </div>
        </div>

        <article className="accommodation-story" aria-live="polite">
          <p className="luxury-kicker">Séjour sélectionné</p>
          <h3>{active.title}</h3>
          <p>{active.text}</p>
          {active.meta?.length ? (
            <div className="accommodation-meta">
              {active.meta.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
            </div>
          ) : null}
          <div className="luxury-actions">
            <Link className="luxury-primary-link" href={localizedHref(locale, active.href)}>Découvrir {active.title}</Link>
            <Link className="luxury-secondary-link" href={localizedHref(locale, "/sejours#booking")}>Vérifier les disponibilités</Link>
          </div>
        </article>
      </div>

      <div className="accommodation-mini-grid">
        {miniCards.map((card) => {
          const originalIndex = cards.findIndex((candidate) => candidate.title === card.title);
          return (
            <button key={card.title} type="button" className="accommodation-mini-card cinematic-card" onClick={() => setActiveIndex(originalIndex)}>
              <SwitcherMedia src={card.image} alt={card.alt} className="accommodation-mini-image" />
              <span>
                <small>{card.eyebrow}</small>
                <strong>{card.title}</strong>
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
