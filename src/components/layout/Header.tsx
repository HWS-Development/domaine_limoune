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
  getNavItems,
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
  const navItems = getNavItems(locale);
  const copy = locale === "en"
    ? {
        homeLabel: "Le Domaine Limoune home",
        book: "Book",
        closeMenu: "Close menu",
        openMenu: "Open menu",
        navLabel: "Le Domaine Limoune navigation",
        languagesLabel: "Languages",
      }
    : {
        homeLabel: "Le Domaine Limoune accueil",
        book: "Réserver",
        closeMenu: "Fermer le menu",
        openMenu: "Ouvrir le menu",
        navLabel: "Navigation Le Domaine Limoune",
        languagesLabel: "Langues",
      };

  const localeHref = (targetLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (isLocale(segments[0])) segments[0] = targetLocale;
    else segments.unshift(targetLocale);
    return `/${segments.join("/")}`;
  };

  return (
    <header className="capella-header">
      <div className="capella-topbar">
        <div className="capella-topbar-inner">
          <div className="capella-top-left" />

          <Link className="capella-mark" href={`/${locale}`} aria-label={copy.homeLabel}>
            <span>Le Domaine</span>
            <span>Limoune</span>
          </Link>

          <div className="capella-top-right">
            <Link className="capella-top-link" href={localizedHref(locale, "/sejours#booking")} data-track="top_book_stay">
              {copy.book} <ChevronDown aria-hidden="true" className="size-3" />
            </Link>
            <button
              className="capella-mobile-menu"
              type="button"
              aria-label={open ? copy.closeMenu : copy.openMenu}
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
          <nav className="capella-hotel-links" aria-label={copy.navLabel}>
            {navItems.map((item) => (
              <Link key={item.href} className="capella-hotel-link" href={localizedHref(locale, item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="capella-languages" aria-label={copy.languagesLabel}>
            {locales.slice(0, 2).map((item) => (
              <Link key={item} className={locale === item ? "active" : ""} href={localeHref(item)}>
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
            {copy.book}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
