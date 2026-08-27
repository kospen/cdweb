import type { Locale, LocaleContent, RouteKey } from "@/content/types";
import { routePaths } from "@/content";
import SiteFrame from "./SiteFrame";
import { AboutSection, CapabilitiesSection, ContactSection, NewsSection, ResearchSection, ProjectsSection } from "./Sections";

type InteriorKey = Exclude<RouteKey, "home">;

const intros: Record<InteriorKey, (copy: LocaleContent) => string> = {
  products: (c) => c.projects.intro,
  work: (c) => c.projects.intro,
  projects: (c) => c.projects.intro,
  research: (c) => c.research.intro,
  capabilities: (c) => c.capabilities.intro,
  news: (c) => c.news.intro,
  about: (c) => c.about.intro,
  contact: (c) => c.contact.intro,
};

export default function ContentPage({ locale, copy, page }: { locale: Locale; copy: LocaleContent; page: InteriorKey }) {
  const intro = intros[page](copy);
  return (
    <SiteFrame locale={locale} copy={copy} route={routePaths[page]}>
      {/* The intro belongs to the page header. The section below must not repeat it. */}
      <header className="interior-hero">
        <div className="site-shell">
          <p className="kicker">{copy.common.index} / {copy.nav[page].toUpperCase()}</p>
          <h1>{copy.nav[page]}</h1>
          <p>{intro}</p>
        </div>
      </header>
      {(page === "products" || page === "work" || page === "projects") && <ProjectsSection locale={locale} copy={copy} full intro=""/>}
      {page === "research" && <ResearchSection locale={locale} copy={copy} full intro=""/>}
      {page === "capabilities" && <CapabilitiesSection locale={locale} copy={copy} full intro=""/>}
      {page === "news" && <NewsSection locale={locale} copy={copy} full intro=""/>}
      {page === "about" && <AboutSection locale={locale} copy={copy} full intro=""/>}
      {page === "contact" && <ContactSection copy={copy} intro=""/>}
    </SiteFrame>
  );
}
