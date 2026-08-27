import type { Locale, LocaleContent } from "@/content/types";
import Hero from "./HeroRouted";
import Header from "./Header";
import Footer from "./Footer";
import TransformationFramework from "./TransformationFramework";
import { AboutSection, CapabilitiesSection, ContactSection, PhilosophySection, ProjectsSection, ResearchSection } from "./Sections";

/**
 * Eight sections, alternating surface on every boundary — each one on the
 * surface its own styling was built for:
 *   hero (dark) · idea (paper) · model (dark) · projects & products (paper) ·
 *   capabilities (dark) · R&D (paper) · about (dark) · contact (raised dark)
 *
 * News is not a homepage section; it lives at /news/ until there is enough of
 * it to earn a place on the front page.
 */
export default function HomePage({ locale, copy }: { locale: Locale; copy: LocaleContent }) {
  return (
    <>
      <a className="skip-link" href="#main-content">{copy.common.skip}</a>
      <div className="home-mobile-header"><Header locale={locale} copy={copy} route=""/></div>
      <main id="main-content">
        <Hero locale={locale} copy={copy}/>
        <PhilosophySection copy={copy}/>
        <TransformationFramework copy={copy}/>
        <ProjectsSection locale={locale} copy={copy}/>
        <CapabilitiesSection locale={locale} copy={copy}/>
        <ResearchSection locale={locale} copy={copy}/>
        <AboutSection locale={locale} copy={copy}/>
        <ContactSection copy={copy}/>
      </main>
      <Footer locale={locale} copy={copy} route=""/>
    </>
  );
}
