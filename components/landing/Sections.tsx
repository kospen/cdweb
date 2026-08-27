import type { Locale, LocaleContent } from "@/content/types";
import { localeHref, routePaths } from "@/content";

function SectionHead({ eyebrow, title, intro, light = false }: { eyebrow: string; title: string; intro: string; light?: boolean }) {
  return <header className="section-head"><p className="kicker">{eyebrow}</p><h2>{title}</h2>{intro ? <p className={light ? "ink-muted" : "text-muted"}>{intro}</p> : null}</header>;
}

export function PhilosophySection({ copy }: { copy: LocaleContent }) {
  return <section className="paper-section philosophy" aria-labelledby="philosophy-title"><div className="site-shell philosophy-grid"><div><p className="kicker">{copy.philosophy.eyebrow}</p><h2 id="philosophy-title">{copy.philosophy.title}</h2></div><div className="philosophy-copy"><p>{copy.philosophy.copy}</p><p>{copy.philosophy.note}</p><div className="paper-axis" aria-hidden="true"><span>INHERITED</span><i/><span>CHALLENGED</span><i/><span>NEW VALUE</span></div></div></div></section>
}

/** Projects and Products in one index. One record per system — no entry appears twice. */
export function ProjectsSection({ locale, copy, full = false, intro }: { locale: Locale; copy: LocaleContent; full?: boolean; intro?: string }) {
  return (
    <section className="paper-section records-section" id="projects" aria-labelledby="projects-title">
      <div className="site-shell">
        <SectionHead eyebrow={copy.projects.eyebrow} title={copy.projects.title} intro={intro ?? copy.projects.intro} light/>
        <div className="work-index">
          {copy.projects.records.map((item) => (
            <article key={item.id}>
              <div className="work-code">
                <span>{item.id}</span>
                <i aria-hidden="true"/>
                <em>{item.status}</em>
              </div>
              <div>
                <p className="record-meta">{item.kind}</p>
                <h3>{item.name}</h3>
                {item.expansion && <p className="work-expansion">{item.expansion}</p>}
                <p>{item.description}</p>
                {full && item.detail && <p className="work-detail">{item.detail}</p>}
                {item.link && (
                  <a className="work-link" href={item.link.href} rel="noreferrer noopener" target="_blank">
                    {item.link.label} ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        {(copy.projects.note || !full) && (
          <div className="paper-note">
            {copy.projects.note ? <p>{copy.projects.note}</p> : <span/>}
            {!full && <a href={localeHref(locale, routePaths.projects)}>{copy.common.viewAll} →</a>}
          </div>
        )}
      </div>
    </section>
  );
}

export function ResearchSection({ locale, copy, full = false, intro }: { locale: Locale; copy: LocaleContent; full?: boolean; intro?: string }) {
  return <section className="paper-section research-section" id="research" aria-labelledby="research-title"><div className="site-shell"><SectionHead eyebrow={copy.research.eyebrow} title={copy.research.title} intro={intro ?? copy.research.intro} light/><div className="research-path">{copy.research.stages.map((stage) => <article key={stage.id}><span>{stage.id}</span><h3>{stage.name}</h3><p>{stage.description}</p></article>)}</div>{full && <div className="research-environments"><p className="kicker">WORKING ENVIRONMENTS</p><ul>{copy.research.environments.map((item) => <li key={item}>{item}</li>)}</ul></div>}{!full && <a className="text-link" href={localeHref(locale, routePaths.research)}>{copy.common.viewAll} →</a>}</div></section>;
}

export function CapabilitiesSection({ locale, copy, full = false, intro }: { locale: Locale; copy: LocaleContent; full?: boolean; intro?: string }) {
  const records = full ? copy.capabilities.records : copy.capabilities.records.slice(0, 5);
  return (
    <section className="dark-section capability-section" id="capabilities" aria-labelledby="capabilities-title">
      <div className="site-shell">
        <div className="capability-layout">
          <SectionHead eyebrow={copy.capabilities.eyebrow} title={copy.capabilities.title} intro={intro ?? copy.capabilities.intro}/>
          <div className="capability-index">
            {records.map((item) => (
              <article key={item.id}>
                <span>{item.id}</span>
                <div><h3>{item.name}</h3><p>{item.description}</p><em>{item.signal}</em></div>
              </article>
            ))}
            {!full && <a className="text-link light-link" href={localeHref(locale, routePaths.capabilities)}>{copy.common.viewAll} →</a>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsSection({ locale, copy, full = false, intro }: { locale: Locale; copy: LocaleContent; full?: boolean; intro?: string }) {
  const records = full ? copy.news.records : copy.news.records.slice(0, 3);
  return <section className="paper-section news-section" id="news" aria-labelledby="news-title"><div className="site-shell"><SectionHead eyebrow={copy.news.eyebrow} title={copy.news.title} intro={intro ?? copy.news.intro} light/><div className="news-index">{records.map((item) => <article key={item.slug}><div className="news-meta"><time dateTime={item.date}>{item.date}</time><span>{item.category}</span></div><div><h3>{item.title}</h3><p>{item.summary}</p><a href={localeHref(locale, `/news/${item.slug}`)}>{copy.common.read} →</a></div></article>)}</div></div></section>;
}

export function AboutSection({ locale, copy, full = false, intro }: { locale: Locale; copy: LocaleContent; full?: boolean; intro?: string }) {
  return (
    <section className="dark-section about-section" id="about" aria-labelledby="about-title">
      <div className="site-shell about-grid">
        <SectionHead eyebrow={copy.about.eyebrow} title={copy.about.title} intro={intro ?? copy.about.intro}/>
        <div>
          <dl className="fact-list">
            {copy.about.facts.map((fact) => (
              <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
            ))}
          </dl>
          <div className="principle-list">
            {copy.about.principles.map((item) => (
              <article key={item.id}><span>{item.id}</span><h3>{item.name}</h3><p>{item.description}</p></article>
            ))}
          </div>
          {!full && <a className="text-link light-link" href={localeHref(locale, routePaths.about)}>{copy.common.details} →</a>}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ copy, intro }: { copy: LocaleContent; intro?: string }) {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="site-shell">
        <p className="kicker">{copy.contact.eyebrow}</p>
        <h2 id="contact-title">{copy.contact.title}</h2>
        <p className="contact-intro">{intro ?? copy.contact.intro}</p>
        <div className="contact-routes">
          {copy.contact.routes.map((item) => (
            <article key={item.id}>
              <span>{item.id}</span>
              <div><h3>{item.name}</h3><p>{item.description}</p></div>
              {copy.contact.email
                ? <a href={`mailto:${copy.contact.email}?subject=${encodeURIComponent(item.subject)}`}>EMAIL ↗</a>
                : <span/>}
            </article>
          ))}
        </div>
        {(copy.contact.email || copy.contact.note) && (
          <div className="contact-direct">
            {copy.contact.email
              ? <a className="contact-address" href={`mailto:${copy.contact.email}`}>{copy.contact.email}</a>
              : null}
            {copy.contact.note ? <p>{copy.contact.note}</p> : null}
          </div>
        )}
      </div>
    </section>
  );
}
