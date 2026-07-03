"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { type KeyboardEvent, type MouseEvent, type PointerEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type ExperienceMediaSlide = {
  src: string;
  alt: string;
  title: string;
  description?: string;
};

type ExperienceMediaCarouselProps = {
  slides: ExperienceMediaSlide[];
  initialIndex?: number;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
};

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

export function ExperienceMediaCarousel({
  slides,
  initialIndex = 0,
  activeIndex,
  onActiveIndexChange,
}: ExperienceMediaCarouselProps) {
  const [uncontrolledIndex, setUncontrolledIndex] = useState(() => (slides.length ? wrapIndex(initialIndex, slides.length) : 0));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(() => (slides.length ? wrapIndex(initialIndex, slides.length) : 0));
  const scrollPositionRef = useRef<{ left: number; top: number } | null>(null);
  const scrollLockCleanupRef = useRef<(() => void) | null>(null);

  if (!slides.length) return null;

  const currentIndex = wrapIndex(activeIndex ?? uncontrolledIndex, slides.length);
  const active = slides[currentIndex];
  const previous = slides[wrapIndex(currentIndex - 1, slides.length)];
  const next = slides[wrapIndex(currentIndex + 1, slides.length)];
  const lightboxSlide = slides[wrapIndex(lightboxIndex, slides.length)];
  const progress = `${currentIndex + 1} / ${slides.length}`;

  useEffect(() => {
    return () => {
      scrollLockCleanupRef.current?.();
    };
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }

      if (event.key === "ArrowLeft") {
        setLightboxIndex((index) => wrapIndex(index - 1, slides.length));
      }

      if (event.key === "ArrowRight") {
        setLightboxIndex((index) => wrapIndex(index + 1, slides.length));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, slides.length]);

  const captureScrollPosition = () => {
    if (typeof window === "undefined") return;
    scrollPositionRef.current = { left: window.scrollX, top: window.scrollY };
  };

  const lockScrollDuringNavigation = () => {
    if (typeof window === "undefined") return;

    scrollLockCleanupRef.current?.();

    const position = { left: window.scrollX, top: window.scrollY };
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    const previousScrollSnapType = root.style.scrollSnapType;
    let restoring = false;

    scrollPositionRef.current = position;
    root.style.scrollBehavior = "auto";
    root.style.scrollSnapType = "none";

    const restore = () => {
      if (restoring) return;

      restoring = true;
      window.scrollTo(position.left, position.top);
      requestAnimationFrame(() => {
        restoring = false;
      });
    };

    const handleScroll = () => {
      requestAnimationFrame(restore);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    restore();

    const timeout = window.setTimeout(() => {
      window.removeEventListener("scroll", handleScroll);
      root.style.scrollBehavior = previousScrollBehavior;
      root.style.scrollSnapType = previousScrollSnapType;
      scrollLockCleanupRef.current = null;
      restore();
    }, 360);

    scrollLockCleanupRef.current = () => {
      window.clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
      root.style.scrollBehavior = previousScrollBehavior;
      root.style.scrollSnapType = previousScrollSnapType;
    };
  };

  const restoreScrollPosition = () => {
    const position = scrollPositionRef.current;

    if (!position || typeof window === "undefined") return;

    requestAnimationFrame(() => {
      window.scrollTo(position.left, position.top);
      requestAnimationFrame(() => {
        window.scrollTo(position.left, position.top);
      });
      window.setTimeout(() => {
        window.scrollTo(position.left, position.top);
        scrollPositionRef.current = null;
      }, 80);
    });
  };

  const preventMouseFocus = (event: MouseEvent<HTMLButtonElement>) => {
    captureScrollPosition();
    event.preventDefault();
  };

  const setActiveSlide = (nextIndex: number) => {
    if (onActiveIndexChange) {
      onActiveIndexChange(nextIndex);
    } else {
      setUncontrolledIndex(nextIndex);
    }

    restoreScrollPosition();
  };

  const navigate = (event: PointerEvent<HTMLSpanElement>, direction: -1 | 1) => {
    lockScrollDuringNavigation();
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.blur();

    setActiveSlide(wrapIndex(currentIndex + direction, slides.length));
  };

  const swallowClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const openLightbox = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.blur();
    setLightboxIndex(currentIndex);
    setLightboxOpen(true);
  };

  const navigateLightbox = (event: PointerEvent<HTMLButtonElement>, direction: -1 | 1) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.blur();
    setLightboxIndex((index) => wrapIndex(index + direction, slides.length));
  };

  const navigateLightboxWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, direction: -1 | 1) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    event.stopPropagation();
    setLightboxIndex((index) => wrapIndex(index + direction, slides.length));
  };

  const closeLightbox = (event?: MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.blur();
    }

    setLightboxOpen(false);
  };

  return (
    <div className="experience-media-carousel" aria-label={`Galerie ${active.title}`}>
      <button
        type="button"
        className="experience-media-main"
        aria-label={`Agrandir l'image : ${active.title}`}
        onMouseDown={preventMouseFocus}
        onClick={openLightbox}
      >
        <Image
          src={active.src}
          alt={active.alt}
          fill
          sizes="(min-width: 1180px) 42vw, (min-width: 760px) 78vw, 100vw"
          className="experience-media-carousel-image"
        />
        <div className="experience-media-carousel-shade" aria-hidden="true" />
        <div className="experience-media-current">
          <span>{progress}</span>
          <strong>{active.title}</strong>
        </div>
        <span className="experience-media-open-label">Voir en plein écran</span>
      </button>

      <div className="experience-media-controls" aria-label="Navigation image">
        <span
          aria-hidden="true"
          onPointerDown={(event) => navigate(event, -1)}
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </span>
        <span
          aria-hidden="true"
          onPointerDown={(event) => navigate(event, 1)}
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </span>
      </div>

      {lightboxOpen && typeof document !== "undefined" ? createPortal(
        <div className="experience-media-lightbox" role="dialog" aria-modal="true" aria-label={`Aperçu plein écran : ${lightboxSlide.title}`}>
          <button
            type="button"
            className="experience-media-lightbox-close"
            aria-label="Fermer l'aperçu plein écran"
            onMouseDown={preventMouseFocus}
            onClick={closeLightbox}
          >
            <X aria-hidden="true" className="size-5" />
          </button>

          <button
            type="button"
            className="experience-media-lightbox-arrow is-previous"
            aria-label="Image précédente"
            onMouseDown={preventMouseFocus}
            onPointerDown={(event) => navigateLightbox(event, -1)}
            onClick={swallowClick}
            onKeyDown={(event) => navigateLightboxWithKeyboard(event, -1)}
          >
            <ChevronLeft aria-hidden="true" className="size-7" />
          </button>

          <div className="experience-media-lightbox-stage">
            <Image src={lightboxSlide.src} alt={lightboxSlide.alt} fill sizes="100vw" className="experience-media-lightbox-image" priority />
            <div className="experience-media-lightbox-caption">
              <span>{wrapIndex(lightboxIndex, slides.length) + 1} / {slides.length}</span>
              <strong>{lightboxSlide.title}</strong>
            </div>
          </div>

          <button
            type="button"
            className="experience-media-lightbox-arrow is-next"
            aria-label="Image suivante"
            onMouseDown={preventMouseFocus}
            onPointerDown={(event) => navigateLightbox(event, 1)}
            onClick={swallowClick}
            onKeyDown={(event) => navigateLightboxWithKeyboard(event, 1)}
          >
            <ChevronRight aria-hidden="true" className="size-7" />
          </button>
        </div>,
        document.body
      ) : null}
    </div>
  );
}
