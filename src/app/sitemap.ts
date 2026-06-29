import type { MetadataRoute } from "next";
import { allPages, baseUrl, getPageUrl, locales } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    allPages.map((page) => ({
      url: getPageUrl(locale, page),
      lastModified: now,
      changeFrequency: page.slug === "" ? "weekly" : "monthly",
      priority: page.slug === "" ? 1 : 0.72,
      alternates: {
        languages: Object.fromEntries(locales.map((item) => [item, getPageUrl(item, page)])),
      },
    })),
  );

  return entries.concat({
    url: baseUrl,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
  });
}
