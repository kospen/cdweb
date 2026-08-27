import { en } from "./en";
import type { Locale, RouteKey } from "./types";

export const locales: Locale[] = ["en"];
export const content = { en } as const;
export const routePaths: Record<RouteKey, string> = { home: "", products: "/products", work: "/work", projects: "/projects", research: "/research", capabilities: "/capabilities", news: "/news", about: "/about", contact: "/contact" };
export function isLocale(value: string): value is Locale { return value === "en"; }
export function localeHref(_locale: Locale, path = "") { const clean = path === "/" ? "" : path.replace(/\/$/, ""); return clean ? `${clean}/` : "/"; }
export function getContent(_locale: Locale = "en") { return en; }
