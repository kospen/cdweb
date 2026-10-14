import type { Metadata } from "next";
import type { Locale, RouteKey } from "./types";
import { getContent, routePaths } from "./index";

/** Production origin. Used for URLs that must be absolute (article canonical, og:image, JSON-LD). */
export const PRODUCTION_SITE_URL = "https://www.creative-destruction.eu";

export function absoluteUrl(path: string): string {
  return new URL(path, configuredSiteBase() ?? PRODUCTION_SITE_URL).toString();
}

function configuredSiteBase(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;

  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

export function pageMetadata(
  locale: Locale,
  page: RouteKey,
  title?: string,
  description?: string,
  canonicalPath?: string,
  article?: { publishedTime: string; image?: { src: string; width: number; height: number; alt: string } },
): Metadata {
  const copy = getContent(locale);
  const intros: Record<RouteKey, string> = {
    home: copy.meta.siteDescription,
    products: copy.projects.intro,
    work: copy.projects.intro,
    projects: copy.projects.intro,
    research: copy.research.intro,
    capabilities: copy.capabilities.intro,
    news: copy.news.intro,
    about: copy.about.intro,
    contact: copy.contact.intro,
  };
  const pageTitle = title ?? (page === "home" ? copy.meta.siteTitle : copy.nav[page] + " — Creative Destruction");
  const pageDescription = description ?? intros[page];
  // Articles always get an absolute canonical; other pages keep the env-gated behaviour.
  const siteBase = configuredSiteBase() ?? (article ? new URL(PRODUCTION_SITE_URL) : undefined);
  const path = canonicalPath ?? (routePaths[page] || "/");
  const canonical = siteBase ? new URL(path.startsWith("/") ? path : "/" + path, siteBase).toString() : undefined;

  return {
    title: pageTitle,
    description: pageDescription,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: article ? "article" : "website",
      locale: "en_US",
      siteName: "Creative Destruction",
      ...(canonical ? { url: canonical } : {}),
      ...(article ? { publishedTime: article.publishedTime } : {}),
      ...(article?.image ? { images: [{ url: absoluteUrl(article.image.src), width: article.image.width, height: article.image.height, alt: article.image.alt }] } : {}),
    },
    twitter: {
      card: article?.image ? "summary_large_image" : "summary",
      title: pageTitle,
      description: pageDescription,
      ...(article?.image ? { images: [absoluteUrl(article.image.src)] } : {}),
    },
  };
}
