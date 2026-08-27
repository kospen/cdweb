"use client";

import { useEffect, useState } from "react";
import type { Locale, LocaleContent, RouteKey } from "@/content/types";
import { localeHref, routePaths } from "@/content";
import BrandMark from "./BrandMark";

const navOrder: RouteKey[] = ["projects", "research", "capabilities", "news", "about"];

export default function Header({ locale, copy, route }: { locale: Locale; copy: LocaleContent; route: string }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  const isCurrent = (key: RouteKey) => {
    const path = routePaths[key];
    return key === "home" ? route === "" || route === "/" : route === path || route.startsWith(`${path}/`);
  };

  return <header className="site-header"><div className="site-shell site-header__inner"><a className="brand-link" href="/" aria-label="Creative Destruction — Home" aria-current={isCurrent("home") ? "page" : undefined}><span className="brand-lockup"><BrandMark className="brand-logo"/><span>Creative Destruction</span></span><i aria-hidden="true">+</i></a><nav className="desktop-nav" aria-label="Primary navigation">{navOrder.map((key) => <a key={key} href={localeHref(locale, routePaths[key])} aria-current={isCurrent(key) ? "page" : undefined}>{copy.nav[key]}</a>)}<span className="nav-divider" aria-hidden="true"/><a className="nav-contact" href={localeHref(locale, routePaths.contact)} aria-current={isCurrent("contact") ? "page" : undefined}>{copy.nav.contact}</a></nav><button className="menu-toggle" type="button" aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? copy.common.menuClose : copy.common.menuOpen} onClick={() => setIsOpen((value) => !value)}><span aria-hidden="true"/><span aria-hidden="true"/></button></div><div className="mobile-nav" id="mobile-navigation" hidden={!isOpen}><nav className="site-shell" aria-label="Mobile navigation">{[...navOrder, "contact" as const].map((key,index) => <a key={key} href={localeHref(locale, routePaths[key])} aria-current={isCurrent(key) ? "page" : undefined} onClick={() => setIsOpen(false)}><span>{String(index+1).padStart(2,"0")}</span>{copy.nav[key]}</a>)}</nav></div></header>;
}
