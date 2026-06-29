"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles, X } from "lucide-react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { defaultLocale, heroVideos, locales, type Locale } from "@/lib/content";

const OFFER_STORAGE_KEY = "limoune-offer-dismissed";

type OfferCopy = {
  ariaLabel: string;
  closeLabel: string;
  eyebrow: string;
  badge: string;
  title: string;
  lead: string;
  features: string[];
  statLabel: string;
  statValue: string;
  primary: string;
  secondary: string;
};

const offerCopy: Record<Locale, OfferCopy> = {
  fr: {
    ariaLabel: "Offre saisonnière Domaine Limoune",
    closeLabel: "Fermer l'offre",
    eyebrow: "Invitation de saison",
    badge: "Ouvert cette semaine",
    title: "Été Limoune",
    lead: "Piscine, brunch sous les orangers, parc animalier et rituel Canopy Spa composés en une échappée lumineuse.",
    features: ["Journée piscine", "Brunch orangers", "Parc animalier", "Rituel spa"],
    statLabel: "Parcours conseillé",
    statValue: "1 journée ou 1 nuit",
    primary: "Voir les offres",
    secondary: "Réserver un séjour",
  },
  en: {
    ariaLabel: "Domaine Limoune seasonal offer",
    closeLabel: "Close offer",
    eyebrow: "Seasonal invitation",
    badge: "Open this week",
    title: "Limoune Summer",
    lead: "Pool time, brunch under the orange trees, wildlife park and Canopy Spa ritual in one luminous escape.",
    features: ["Pool day", "Orange grove brunch", "Wildlife park", "Spa ritual"],
    statLabel: "Suggested path",
    statValue: "1 day or 1 night",
    primary: "View offers",
    secondary: "Book a stay",
  },
  ar: {
    ariaLabel: "عرض موسمي من دومين ليمون",
    closeLabel: "إغلاق العرض",
    eyebrow: "دعوة موسمية",
    badge: "متاح هذا الأسبوع",
    title: "صيف ليمون",
    lead: "مسبح، فطور متأخر بين أشجار البرتقال، حديقة حيوانات وطقس كانوبي سبا في تجربة مضيئة واحدة.",
    features: ["يوم مسبح", "فطور بين البرتقال", "حديقة الحيوانات", "طقس سبا"],
    statLabel: "المسار المقترح",
    statValue: "يوم واحد أو ليلة واحدة",
    primary: "مشاهدة العروض",
    secondary: "حجز إقامة",
  },
  es: {
    ariaLabel: "Oferta de temporada Domaine Limoune",
    closeLabel: "Cerrar la oferta",
    eyebrow: "Invitación de temporada",
    badge: "Disponible esta semana",
    title: "Verano Limoune",
    lead: "Piscina, brunch bajo los naranjos, parque animal y ritual Canopy Spa en una escapada luminosa.",
    features: ["Día de piscina", "Brunch en naranjos", "Parque animal", "Ritual spa"],
    statLabel: "Recorrido sugerido",
    statValue: "1 día o 1 noche",
    primary: "Ver ofertas",
    secondary: "Reservar estancia",
  },
  de: {
    ariaLabel: "Saisonangebot Domaine Limoune",
    closeLabel: "Angebot schließen",
    eyebrow: "Saisonale Einladung",
    badge: "Diese Woche verfügbar",
    title: "Limoune Sommer",
    lead: "Poolzeit, Brunch unter Orangenbäumen, Tierpark und Canopy-Spa-Ritual als leuchtende Auszeit.",
    features: ["Pooltag", "Brunch im Hain", "Tierpark", "Spa-Ritual"],
    statLabel: "Empfohlener Ablauf",
    statValue: "1 Tag oder 1 Nacht",
    primary: "Angebote ansehen",
    secondary: "Aufenthalt buchen",
  },
};

function getPathLocale(pathname: string | null): Locale {
  const segment = pathname?.split("/").filter(Boolean)[0];
  return locales.find((locale) => locale === segment) ?? defaultLocale;
}

function localizedHref(locale: Locale, href: string) {
  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

export function CinematicRuntime() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const [offerOpen, setOfferOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const locale = getPathLocale(pathname);
  const offer = offerCopy[locale];
  const offerEntrance = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 34, scale: 0.94, filter: "blur(14px)" };
  const offerAnimate = reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };
  const offerExit = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98, filter: "blur(8px)" };

  useEffect(() => {
    document.body.classList.add("is-cinematic-ready");

    const timer = window.setTimeout(() => {
      if (window.localStorage.getItem(OFFER_STORAGE_KEY) !== "true") {
        setOfferOpen(true);
      }
    }, 1800);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const root = document.documentElement;
    let frame = 0;

    const updateScroll = () => {
      frame = 0;
      const progress = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      root.style.setProperty("--cinematic-scroll", progress.toFixed(4));
      root.style.setProperty("--cinematic-y", String(Math.round(window.scrollY)));
    };

    const requestScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", requestScroll, { passive: true });
    window.addEventListener("resize", requestScroll);

    return () => {
      window.removeEventListener("scroll", requestScroll);
      window.removeEventListener("resize", requestScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!offerOpen) return;

    const closeOnScroll = () => {
      if (window.scrollY > window.innerHeight * 0.75) setOfferOpen(false);
    };

    closeOnScroll();
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, [offerOpen]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("[data-video-trigger]")) {
        setVideoOpen(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { rootMargin: "-8% 0px -12%", threshold: 0.16 },
    );

    const elements = Array.from(document.querySelectorAll<HTMLElement>(".cinematic-reveal, .limoune-media, .cinematic-card"));
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".cinematic-card, .booking-card, .capella-detail-card"));

    const cleanups = cards.map((card) => {
      const handleMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--tilt-x", `${(-y * 7).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
        card.style.setProperty("--spot-x", `${((x + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty("--spot-y", `${((y + 0.5) * 100).toFixed(1)}%`);
      };

      const handleLeave = () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      };

      card.addEventListener("pointermove", handleMove);
      card.addEventListener("pointerleave", handleLeave);

      return () => {
        card.removeEventListener("pointermove", handleMove);
        card.removeEventListener("pointerleave", handleLeave);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const render = () => {
      frame = 0;
      spotlight.style.setProperty("--mx", `${x}px`);
      spotlight.style.setProperty("--my", `${y}px`);
    };

    const handleMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  const closeOffer = () => {
    window.localStorage.setItem(OFFER_STORAGE_KEY, "true");
    setOfferOpen(false);
  };

  return (
    <>
      <div ref={spotlightRef} className="cinematic-spotlight" aria-hidden="true" />
      <div className="cinematic-vignette" aria-hidden="true" />
      <AnimatePresence>
        {videoOpen ? (
          <motion.div
            className="video-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Film Domaine Limoune"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <button className="video-modal-close" type="button" aria-label="Fermer la vidéo" onClick={() => setVideoOpen(false)}>
              <X aria-hidden="true" className="size-5" />
            </button>
            <motion.div
              className="video-modal-frame"
              initial={{ y: 28, scale: 0.96, filter: "blur(12px)" }}
              animate={{ y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ y: 18, scale: 0.97, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <video controls autoPlay playsInline poster={heroVideos.poster}>
                <source src={heroVideos.desktop} type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        ) : null}
        {offerOpen ? (
          <motion.aside
            aria-live="polite"
            aria-label={offer.ariaLabel}
            className={`offer-popover${locale === "ar" ? " is-rtl" : ""}`}
            dir={locale === "ar" ? "rtl" : undefined}
            initial={offerEntrance}
            animate={offerAnimate}
            exit={offerExit}
            transition={reduceMotion ? { duration: 0.01 } : { duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="offer-popover-ambient" aria-hidden="true" />
            <button className="offer-popover-close" type="button" aria-label={offer.closeLabel} onClick={closeOffer}>
              <X aria-hidden="true" className="size-4" />
            </button>
            <div className="offer-popover-topline">
              <p className="offer-popover-kicker">{offer.eyebrow}</p>
              <span className="offer-popover-live"><i aria-hidden="true" />{offer.badge}</span>
            </div>
            <div className="offer-popover-hero">
              <motion.span
                className="offer-popover-seal"
                aria-hidden="true"
                animate={reduceMotion ? undefined : { rotate: [0, 4, -3, 0], scale: [1, 1.04, 1] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="size-5" />
              </motion.span>
              <div>
                <h2>{offer.title}</h2>
                <p>{offer.lead}</p>
              </div>
            </div>
            <div className="offer-popover-itinerary">
              {offer.features.map((feature, index) => (
                <span key={feature} style={{ "--offer-delay": `${index * 70}ms` } as CSSProperties}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {feature}
                </span>
              ))}
            </div>
            <div className="offer-popover-proof">
              <span>{offer.statLabel}</span>
              <strong>{offer.statValue}</strong>
            </div>
            <div className="offer-popover-actions">
              <Link className="offer-popover-link is-primary" href={localizedHref(locale, "/offres")} onClick={closeOffer}>
                {offer.primary} <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
              <Link className="offer-popover-link is-secondary" href={localizedHref(locale, "/sejours#booking")} onClick={closeOffer}>
                {offer.secondary}
              </Link>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
