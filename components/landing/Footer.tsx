import type { Locale, LocaleContent, RouteKey } from "@/content/types";
import { localeHref, routePaths } from "@/content";

const links: RouteKey[] = ["projects", "research", "capabilities", "news", "about", "contact"];

export default function Footer({ locale, copy, route }: { locale: Locale; copy: LocaleContent; route: string }) {
  const isCurrent = (key: RouteKey) => {
    const path = routePaths[key];
    return route === path || route.startsWith(`${path}/`);
  };

  const { legal } = copy;
  const legalItems = ([
    ["Company", legal.entityName],
    ["Company Registration Number (UIC)", legal.uic],
    ["VAT No.", legal.vatNumber],
    ["EU PIC", legal.pic],
    ["Registered office", legal.registeredAddress],
    ["Phone", copy.contact.phone, `tel:${copy.contact.phone.replace(/\s+/g, "")}`]
  ] as Array<[string, string, string?]>).filter(([, value]) => value.trim() !== "");

  return <footer className="site-footer"><div className="site-shell footer-grid"><div className="footer-brand"><a href="/" aria-current={route === "" || route === "/" ? "page" : undefined}>Creative Destruction</a><p>{copy.footer.statement}</p></div><nav aria-label="Footer navigation">{links.map((key) => <a key={key} href={localeHref(locale, routePaths[key])} aria-current={isCurrent(key) ? "page" : undefined}>{copy.nav[key]}</a>)}</nav><div className="footer-contact">{copy.contact.email && <><p className="kicker">{copy.footer.contactLabel}</p><a href={`mailto:${copy.contact.email}`}>{copy.contact.email}</a></>}</div></div>{legalItems.length > 0 && <div className="site-shell footer-legal"><p className="kicker">{legal.label}</p><dl>{legalItems.map(([label, value, href]) => <div key={label}><dt>{label}</dt><dd>{href ? <a href={href}>{value}</a> : value}</dd></div>)}</dl></div>}<div className="site-shell footer-base"><span>© {new Date().getFullYear()} {copy.footer.rights}</span><span>SYSTEM / CD-01</span></div></footer>;
}
