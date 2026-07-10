import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import {
  getDepartments,
  getFooterLinks,
  getNavItems,
  localizedHref,
  type Locale,
} from "@/lib/content";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const navItems = getNavItems(locale);
  const footerLinks = getFooterLinks(locale);
  const departments = getDepartments(locale);
  const copy = locale === "en"
    ? {
        homeLabel: "Le Domaine Limoune home",
        baseline: "Safari Experience · Lodges · Wildlife Park · Spa · Restaurants",
        description: "Le Domaine Limoune is a nature destination near Agadir, bringing together lodges, African reserve, wildlife park, restaurants, Canopy Spa, experiences, weddings and events.",
        address: "Le Domaine Limoune\nAgadir - Taroudant, Morocco",
        universes: "Worlds",
        directServices: "Direct services",
        newsletter: "Newsletter",
        newsletterText: "Receive offers and news from the Domaine.",
        newsletterLabel: "Le Domaine Limoune newsletter",
        emailLabel: "Your email",
        emailPlaceholder: "Your email",
        submit: "Sign up",
        rights: "All rights reserved.",
      }
    : {
        homeLabel: "Le Domaine Limoune accueil",
        baseline: "Safari Experience · Lodges · Parc Animalier · Spa · Restaurants",
        description: "Le Domaine Limoune est une destination nature près d’Agadir, réunissant lodges, réserve africaine, parc animalier, restaurants, Canopy Spa, expériences, mariages et événements.",
        address: "Le Domaine Limoune\nAgadir - Taroudant, Maroc",
        universes: "Univers",
        directServices: "Services directs",
        newsletter: "Lettre d’information",
        newsletterText: "Recevoir les offres et actualités du Domaine.",
        newsletterLabel: "Lettre d’information Le Domaine Limoune",
        emailLabel: "Votre email",
        emailPlaceholder: "Votre email",
        submit: "S’inscrire",
        rights: "Tous droits réservés.",
      };

  return (
    <footer className="cinematic-footer relative overflow-hidden bg-[var(--limoune-brown)] text-[var(--limoune-ivory)]">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_10%,rgba(216,118,62,0.8),transparent_24%),radial-gradient(circle_at_88%_30%,rgba(255,248,238,0.42),transparent_20%)]" />
      <div className="relative mx-auto grid max-w-[1480px] gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1fr] lg:py-24">
        <div>
          <Link href={`/${locale}`} className="inline-flex items-center gap-3" aria-label={copy.homeLabel}>
            <span>
              <span className="block font-serif text-3xl tracking-[0.14em] uppercase">Le Domaine Limoune</span>
              <span className="text-xs font-bold tracking-[0.32em] text-white/55 uppercase">{copy.baseline}</span>
            </span>
          </Link>
          <p className="mt-8 max-w-sm text-base leading-8 text-white/70">
            {copy.description}
          </p>
          <div className="mt-8 grid gap-4 text-sm text-white/75">
            <span className="inline-flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-4 text-[var(--limoune-orange)]" />
              {copy.address.split("\n").map((line, index) => (
                index === 0 ? line : <span key={line}><br />{line}</span>
              ))}
            </span>
            <a className="inline-flex items-center gap-3 hover:text-white" href="tel:+212528526964" data-track="footer_phone">
              <Phone aria-hidden="true" className="size-4 text-[var(--limoune-orange)]" />
              +212 5285-26964
            </a>
            <a className="inline-flex items-center gap-3 hover:text-white" href="mailto:contact@domainelimoune.com" data-track="footer_email">
              <Mail aria-hidden="true" className="size-4 text-[var(--limoune-orange)]" />
              contact@domainelimoune.com
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl">{copy.universes}</h2>
          <div className="mt-6 grid gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={localizedHref(locale, item.href)} className="group inline-flex items-center justify-between gap-3 text-sm text-white/68 transition hover:text-white">
                {item.label}
                <ArrowUpRight aria-hidden="true" className="size-3 opacity-0 transition group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl">{copy.directServices}</h2>
          <div className="mt-6 grid gap-3 text-sm text-white/68">
            {departments.slice(0, 9).map((department) => (
              <span key={department}>{department}</span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl">{copy.newsletter}</h2>
          <p className="mt-6 text-sm leading-7 text-white/68">{copy.newsletterText}</p>
          <form className="cinematic-card mt-8 border border-white/12 bg-white/8 p-3" action="/" aria-label={copy.newsletterLabel}>
            <label className="sr-only" htmlFor="newsletter-email">{copy.emailLabel}</label>
            <div className="flex gap-2">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                aria-label={copy.emailLabel}
                placeholder={copy.emailPlaceholder}
                className="min-h-12 min-w-0 flex-1 border border-white/12 bg-white/12 px-4 text-sm text-white focus:outline-2 focus:outline-offset-2 focus:outline-[var(--limoune-orange)]"
              />
              <button className="min-h-12 cursor-pointer bg-[var(--limoune-orange)] px-4 text-xs font-bold tracking-[0.16em] uppercase text-white transition hover:bg-white hover:text-[var(--limoune-brown)]" type="submit" data-track="newsletter_submit">
                {copy.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="relative border-t border-white/10 px-5 py-6 md:px-8">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-4 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Le Domaine Limoune. {copy.rights}</span>
          <div className="flex flex-wrap gap-4">
            {footerLinks.map((item) => (
              <Link key={item.href} href={localizedHref(locale, item.href)} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
