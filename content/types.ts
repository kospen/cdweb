export type Locale = "en";

export type RouteKey = "home" | "products" | "work" | "projects" | "research" | "capabilities" | "news" | "about" | "contact";

export interface ProjectRecord {
  id: string;
  name: string;
  expansion?: string;
  kind: string;
  status: string;
  description: string;
  detail?: string;
  link?: { label: string; href: string };
}

export interface CapabilityRecord {
  id: string;
  name: string;
  description: string;
  signal: string;
}

/**
 * Rich article body. Text supports two inline marks:
 * **bold** and [label](href) — internal hrefs start with "/".
 */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface NewsRecord {
  slug: string;
  /** Publication date of the article on this site (YYYY-MM-DD). */
  date: string;
  category: string;
  title: string;
  summary: string;
  /** Simple articles: plain paragraphs. Ignored when `blocks` is set. */
  paragraphs: string[];
  blocks?: ArticleBlock[];
  related?: string;
  /** Primary external link shown at the top of the article, under the summary. */
  link?: { label: string; href: string };
  /** Overrides for <title> / meta description when they differ from title / summary. */
  seoTitle?: string;
  seoDescription?: string;
  image?: { src: string; srcSet?: string; ogSrc: string; width: number; height: number; alt: string; caption?: string };
}

export interface LocaleContent {
  locale: Locale;
  meta: { siteTitle: string; siteDescription: string };
  nav: Record<RouteKey, string>;
  common: {
    explore: string;
    details: string;
    read: string;
    viewAll: string;
    index: string;
    language: string;
    menuOpen: string;
    menuClose: string;
    skip: string;
    copy: string;
    copied: string;
  };
  hero: {
    eyebrow: string;
    headline: [string, string, string];
    copy: string;
    primary: string;
    secondary: string;
    labels: [string, string, string];
  };
  philosophy: { eyebrow: string; title: string; copy: string; note: string };
  framework: {
    eyebrow: string;
    title: string;
    intro: string;
    axisLabel: string;
    axis: [string, string, string, string, string];
    steps: Array<{ id: string; name: "RETHINK." | "REPLACE." | "REIMAGINE."; lead: string; description: string; signal: string }>;
  };
  projects: { eyebrow: string; title: string; intro: string; records: ProjectRecord[]; note: string };
  research: {
    eyebrow: string;
    title: string;
    intro: string;
    stages: Array<{ id: string; name: string; description: string }>;
    environments: string[];
  };
  capabilities: { eyebrow: string; title: string; intro: string; records: CapabilityRecord[] };
  news: { eyebrow: string; title: string; intro: string; records: NewsRecord[]; empty: string };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    facts: Array<{ label: string; value: string; href?: string }>;
    principles: Array<{ id: string; name: string; description: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    emailLabel: string;
    email: string;
    /** Display form, e.g. "+359 898 686 808". The tel: link strips spaces. Empty = hidden. */
    phone: string;
    routes: Array<{ id: string; name: string; description: string; subject: string }>;
    note: string;
  };
  footer: { statement: string; contactLabel: string; rights: string };
  /** Company registration details shown in the footer. Empty values are not rendered. */
  legal: { label: string; entityName: string; uic: string; vatNumber: string; pic: string; registeredAddress: string };
}
