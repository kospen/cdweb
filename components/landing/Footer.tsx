import type { Locale, LocaleContent, RouteKey } from "@/content/types";
import { localeHref, routePaths } from "@/content";

const links: RouteKey[] = ["projects", "research", "capabilities", "news", "about", "contact"];

export default function Footer({ locale, copy, route }: { locale: Locale; copy: LocaleContent; route: string }) {
  const isCurrent = (key: RouteKey) => {
    const path = routePaths[key];
    return route === path || route.startsWith(`${path}/`);
  };

  return <footer className="site-footer"><div className="site-shell footer-grid"><div className="footer-brand"><a href="/" aria-current={route === "" || route === "/" ? "page" : undefined}>Creative Destruction</a><p>{copy.footer.statement}</p></div><nav aria-label="Footer navigation">{links.map((key) => <a key={key} href={localeHref(locale, routePaths[key])} aria-current={isCurrent(key) ? "page" : undefined}>{copy.nav[key]}</a>)}</nav>{copy.contact.email ? <div className="footer-contact"><p className="kicker">{copy.footer.contactLabel}</p><a href={`mailto:${copy.contact.email}`}>{copy.contact.email}</a></div> : <div className="footer-contact"/>}</div><div className="site-shell footer-base"><span>© {new Date().getFullYear()} {copy.footer.rights}</span><span>SYSTEM / CD-01</span></div></footer>;
}
