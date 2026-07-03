"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { ExperienceMediaCarousel, type ExperienceMediaSlide } from "@/components/pages/ExperienceMediaCarousel";

type ExperienceCardData = {
  name: string;
  category: string;
  description: string;
  duration: string;
  audience: string;
  rate: string;
  conditions: string;
  associated: readonly string[];
};

type ExperienceShowcaseCardProps = {
  experience: ExperienceCardData;
  index: number;
  slides: ExperienceMediaSlide[];
  bookingHref: string;
};

export function ExperienceShowcaseCard({ experience, index, slides, bookingHref }: ExperienceShowcaseCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <article id={experience.category.toLowerCase().replace(/\s+/g, "-")} className="reference-experience-card cinematic-card">
      <ExperienceMediaCarousel slides={slides} activeIndex={activeIndex} onActiveIndexChange={setActiveIndex} />
      <div className="reference-card-body">
        <div className="reference-card-topline">
          <span>{experience.category}</span>
          <small>{String(index + 1).padStart(2, "0")}</small>
        </div>
        <h3>{experience.name}</h3>
        <p>{experience.description}</p>
        <dl className="reference-card-facts">
          <div><dt>Durée</dt><dd>{experience.duration}</dd></div>
          <div><dt>Public</dt><dd>{experience.audience}</dd></div>
          <div><dt>Tarif</dt><dd>{experience.rate}</dd></div>
          <div><dt>Conditions</dt><dd>{experience.conditions}</dd></div>
        </dl>
        <div className="reference-card-tags">
          {experience.associated.map((item) => <span key={item}>{item}</span>)}
        </div>
        <Link className="reference-card-link" href={bookingHref}>
          Réserver cette expérience
          <ArrowRight aria-hidden="true" className="size-3" />
        </Link>
      </div>
    </article>
  );
}
