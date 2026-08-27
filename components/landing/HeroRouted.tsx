import type { Locale, LocaleContent, RouteKey } from "@/content/types";
import { localeHref, routePaths } from "@/content";
import BrandMark from "./BrandMark";
import HeroField from "./HeroField";

const heroNav: RouteKey[] = ["projects", "research", "capabilities", "news", "about"];

/**
 * The plate is the approved artwork with the fragment field removed — the
 * fragments are drawn by HeroField instead, which is what lets them move.
 */
function CleanHeroArtwork({ mobile = false }: { mobile?: boolean }) {
  return (
    <picture>
      <source media="(max-width: 30rem)" srcSet="/images/hero-field-plate-768.webp" type="image/webp" />
      <source media="(min-width: 80rem)" srcSet="/images/hero-field-plate-1672.webp" type="image/webp" />
      <source srcSet="/images/hero-field-plate-1280.webp" type="image/webp" />
      <img
        className={mobile ? "mobile-system-image" : undefined}
        src="/images/hero-field-plate-1280.webp"
        alt=""
        width="1672"
        height="941"
        fetchPriority="high"
      />
    </picture>
  );
}

export default function HeroRouted({ locale, copy }: { locale: Locale; copy: LocaleContent }) {
  return (
    <section className="reference-hero hero-experiment hero-routed-experiment" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">Challenge. Destroy. Create.</h1>
      <p className="sr-only">{copy.hero.copy}</p>

      <div className="reference-desktop">
        <div className="reference-canvas">
          <CleanHeroArtwork />
          <HeroField />
          <div className="hero-statement" aria-hidden="true">
            <span>Challenge.</span>
            <span>Destroy.</span>
            <span>Create.</span>
          </div>

          <a
            className="reference-hotspot brand-ref"
            href={localeHref(locale)}
            aria-current="page"
            aria-label="Creative Destruction — Home"
          >
            <span className="hero-brand-lockup">
              <BrandMark className="hero-brand-logo" />
              <span className="hero-brand-name">Creative Destruction</span>
            </span>
            <i className="hero-brand-mark" aria-hidden="true">+</i>
          </a>

          <nav className="reference-nav-overlay" aria-label="Primary navigation">
            {heroNav.map((key) => (
              <a key={key} href={localeHref(locale, routePaths[key])}>{copy.nav[key]}</a>
            ))}
            <span aria-hidden="true" />
            <a href={localeHref(locale, routePaths.contact)}>{copy.nav.contact}</a>
          </nav>

          <a className="reference-hotspot cta-work" href="#projects">
            <span className="sr-only">{copy.hero.primary}</span>
          </a>
          <a className="reference-hotspot cta-capabilities" href={localeHref(locale, routePaths.capabilities)}>
            <span className="sr-only">{copy.hero.secondary}</span>
          </a>
        </div>
      </div>

      <div className="reference-mobile">
        <CleanHeroArtwork mobile />
        <HeroField className="mobile-motion-layer" />
        <div className="site-shell mobile-hero-content">
          <p className="hero-eyebrow">{copy.hero.eyebrow}</p>
          <h2 aria-hidden="true">
            <span>Challenge.</span>
            <span>Destroy.</span>
            <span>Create.</span>
          </h2>
          <p>{copy.hero.copy}</p>
          <div className="hero-actions">
            <a className="terminal-button primary" href="#projects">› {copy.hero.primary}</a>
            <a className="terminal-button" href={localeHref(locale, routePaths.capabilities)}>› {copy.hero.secondary}</a>
          </div>
          <div className="mobile-narrative" aria-hidden="true">
            <span>{copy.hero.labels[0]}</span>
            <span>{copy.hero.labels[1]}</span>
            <span>{copy.hero.labels[2]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
