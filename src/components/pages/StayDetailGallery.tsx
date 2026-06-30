"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { Accommodation } from "@/lib/content";

type StayImagePreview = {
  src: string;
  alt: string;
};

export function StayDetailGallery({ item }: { item: Accommodation }) {
  const [preview, setPreview] = useState<StayImagePreview | null>(null);
  const gallery = Array.from(new Set([item.image, ...item.gallery])).slice(0, 4);

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

  return (
    <section className="stay-detail-gallery capella-stop-section">
      <div className="capella-template-wrapper stay-detail-gallery-grid">
        {gallery.map((image, index) => (
          <Reveal key={`${item.slug}-${image}`} delay={Math.min(index * 0.05, 0.12)}>
            <button type="button" className="stay-detail-gallery-button" aria-label={`Agrandir ${item.name} visuel ${index + 1}`} onClick={() => setPreview({ src: image, alt: `${item.name} visuel ${index + 1}` })}>
              <EditorialMedia src={image} alt={`${item.name} visuel ${index + 1}`} className={`stay-detail-gallery-image stay-detail-gallery-image-${index + 1}`} />
            </button>
          </Reveal>
        ))}
      </div>

      {preview ? <StayImageLightbox preview={preview} onClose={() => setPreview(null)} /> : null}
    </section>
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

function EditorialMedia({ src, alt, variant = "default", className = "" }: { src: string; alt: string; variant?: "hero" | "default"; className?: string }) {
  return (
    <div role="img" aria-label={alt} className={`limoune-media ${toneFromSrc(src)} ${variant === "hero" ? "limoune-media-hero" : ""} ${className}`}>
      <Image className="limoune-media-image" src={src} alt="" fill sizes={variant === "hero" ? "100vw" : "(min-width: 1024px) 48vw, 100vw"} quality={90} />
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
