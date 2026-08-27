import type { Metadata } from "next";
import type { Locale, RouteKey } from "./types";
import { getContent, routePaths } from "./index";

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
  const siteBase = configuredSiteBase();
  const path = canonicalPath ?? (routePaths[page] || "/");
  const canonical = siteBase ? new URL(path.startsWith("/") ? path : "/" + path, siteBase).toString() : undefined;

  return {
    title: pageTitle,
    description: pageDescription,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      locale: "en_US",
      siteName: "Creative Destruction",
      ...(canonical ? { url: canonical } : {}),
    },
    twitter: {
      card: "summary",
      title: pageTitle,
      description: pageDescription,
    },
  };
}
