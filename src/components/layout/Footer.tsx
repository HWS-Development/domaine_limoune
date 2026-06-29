import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import {
  departments,
  downloads,
  footerLinks,
  localizedHref,
  navItems,
  type Locale,
} from "@/lib/content";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="cinematic-footer relative overflow-hidden bg-[var(--limoune-brown)] text-[var(--limoune-ivory)]">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_10%,rgba(216,118,62,0.8),transparent_24%),radial-gradient(circle_at_88%_30%,rgba(255,248,238,0.42),transparent_20%)]" />
      <div className="relative mx-auto grid max-w-[1480px] gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1fr] lg:py-24">
        <div>
          <Link href={`/${locale}`} className="inline-flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-full bg-[var(--limoune-ivory)] text-[var(--limoune-brown)]">
              <span className="font-serif text-xl">DL</span>
            </span>
            <span>
              <span className="block font-serif text-3xl tracking-[0.14em] uppercase">Domaine Limoune</span>
              <span className="text-xs font-bold tracking-[0.32em] text-white/55 uppercase">Destination expérientielle</span>
            </span>
          </Link>
          <p className="mt-8 max-w-sm text-base leading-8 text-white/70">
            {"Un domaine hôtelier premium près d'Agadir réunissant séjours, réserve africaine, parc animalier, restaurants, Canopy Spa, expériences, mariages et événements."}
          </p>
          <div className="mt-8 grid gap-4 text-sm text-white/75">
            <span className="inline-flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-4 text-[var(--limoune-orange)]" />
              Adresse Domaine Limoune, région Agadir - Taroudant, Maroc
            </span>
            <a className="inline-flex items-center gap-3 hover:text-white" href="tel:+212000000000" data-track="footer_phone">
              <Phone aria-hidden="true" className="size-4 text-[var(--limoune-orange)]" />
              +212 000 000 000
            </a>
            <a className="inline-flex items-center gap-3 hover:text-white" href="mailto:contact@domainelimoune.com" data-track="footer_email">
              <Mail aria-hidden="true" className="size-4 text-[var(--limoune-orange)]" />
              contact@domainelimoune.com
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl">Univers</h2>
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
          <h2 className="font-serif text-2xl">Services directs</h2>
          <div className="mt-6 grid gap-3 text-sm text-white/68">
            {departments.slice(0, 9).map((department) => (
              <span key={department}>{department}</span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl">Documents et lettre d’information</h2>
          <div className="mt-6 grid gap-3">
            {Object.values(downloads).slice(0, 6).map((download) => (
              <a key={download.href} href={download.href} className="group inline-flex items-center justify-between gap-3 text-sm text-white/68 transition hover:text-white" data-track="download_footer">
                {download.label}
                <ArrowUpRight aria-hidden="true" className="size-3 opacity-0 transition group-hover:opacity-100" />
              </a>
            ))}
          </div>
          <form className="cinematic-card mt-8 rounded-[1.5rem] border border-white/12 bg-white/8 p-3" action="/" aria-label="Lettre d’information Domaine Limoune">
            <label className="sr-only" htmlFor="newsletter-email">Email lettre d’information</label>
            <div className="flex gap-2">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                aria-label="Votre email"
                className="min-h-12 min-w-0 flex-1 rounded-full border border-white/12 bg-white/12 px-4 text-sm text-white focus:outline-2 focus:outline-offset-2 focus:outline-[var(--limoune-orange)]"
              />
              <button className="min-h-12 cursor-pointer rounded-full bg-[var(--limoune-orange)] px-4 text-xs font-bold tracking-[0.16em] uppercase text-white transition hover:bg-white hover:text-[var(--limoune-brown)]" type="submit" data-track="newsletter_submit">
                OK
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="relative border-t border-white/10 px-5 py-6 md:px-8">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-4 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Domaine Limoune. Tous droits réservés.</span>
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
