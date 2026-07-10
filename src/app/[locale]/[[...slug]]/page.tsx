import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageRenderer } from "@/components/pages/PageRenderer";
import {
  buildStructuredData,
  getAlternateLanguages,
  getPageBySlug,
  getPageUrl,
  getStaticPageParams,
  normalizeLocale,
  type Locale,
} from "@/lib/content";

type RouteParams = {
  locale: string;
  slug?: string[];
};

type RouteProps = {
  params: Promise<RouteParams>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticPageParams();
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  const page = getPageBySlug(locale, slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: page.seoKeywords,
    alternates: {
      canonical: getPageUrl(locale, page),
      languages: getAlternateLanguages(page),
    },
    openGraph: {
      type: "website",
      locale,
      title: page.seoTitle,
      description: page.seoDescription,
      url: getPageUrl(locale, page),
      siteName: "Le Domaine Limoune",
      images: [
        {
          url: page.heroImage,
          width: 1600,
          height: 1000,
          alt: page.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.seoDescription,
      images: [page.heroImage],
    },
  };
}

export default async function LocalizedPage({ params }: RouteProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = normalizeLocale(rawLocale);
  const page = getPageBySlug(locale, slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData(locale, page)) }}
      />
      <PageRenderer page={page} locale={locale} />
    </>
  );
}
