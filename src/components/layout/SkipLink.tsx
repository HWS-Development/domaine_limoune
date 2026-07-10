"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/lib/content";

function localeFromPath(pathname: string | null): Locale {
  const segment = pathname?.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : defaultLocale;
}

export function SkipLink() {
  const locale = localeFromPath(usePathname());
  const label = locale === "en" ? "Skip to main content" : "Aller au contenu principal";

  return (
    <a className="skip-link" href="#main-content">
      {label}
    </a>
  );
}
