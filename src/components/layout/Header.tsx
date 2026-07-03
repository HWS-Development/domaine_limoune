"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  defaultLocale,
  isLocale,
  localeLabels,
  locales,
  localizedHref,
  navItems,
  type Locale,
} from "@/lib/content";

function localeFromPath(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : defaultLocale;
}

export function Header() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const [open, setOpen] = useState(false);

  return (
    <header className="capella-header">
      <div className="capella-topbar">
        <div className="capella-topbar-inner">
          <div className="capella-top-left" />

          <Link className="capella-mark" href={`/${locale}`} aria-label="Domaine Limoune accueil">
            <span>Domaine</span>
            <span>Limoune</span>
          </Link>

          <div className="capella-top-right">
            <Link className="capella-top-link capella-line" href={localizedHref(locale, "/experiences")}>
              Expériences
            </Link>
            <Link className="capella-top-link" href={localizedHref(locale, "/sejours#booking")} data-track="top_book_stay">
              Réserver <ChevronDown aria-hidden="true" className="size-3" />
            </Link>
            <button
              className="capella-mobile-menu"
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="capella-hotelnav">
        <div className="capella-hotelnav-inner">
          <nav className="capella-hotel-links" aria-label="Navigation Domaine Limoune">
            {navItems.map((item) => (
              <Link key={item.href} className="capella-hotel-link" href={localizedHref(locale, item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="capella-languages" aria-label="Langues">
            {locales.slice(0, 2).map((item) => (
              <Link key={item} className={locale === item ? "active" : ""} href={`/${item}`}>
                {localeLabels[item]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {open ? (
        <div className="capella-mobile-panel">
          {navItems.map((item) => (
            <Link key={item.href} href={localizedHref(locale, item.href)} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href={localizedHref(locale, "/sejours#booking")} onClick={() => setOpen(false)}>
            Réserver
          </Link>
        </div>
      ) : null}
    </header>
  );
}
