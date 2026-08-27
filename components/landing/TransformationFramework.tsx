import type { LocaleContent } from "@/content/types";

export default function TransformationFramework({ copy }: { copy: LocaleContent }) {
  return (
    <section className="framework-section" aria-labelledby="framework-title">
      <div className="site-shell">
        <header className="framework-head">
          <p className="kicker">{copy.framework.eyebrow}</p>
          <div>
            <h2 id="framework-title">{copy.framework.title}</h2>
            <p>{copy.framework.intro}</p>
          </div>
        </header>
        <div className="framework-sequence" role="list">
          {copy.framework.steps.map((step) => (
            <article key={step.id} role="listitem">
              <span className="framework-id">{step.id}</span>
              <h3>{step.name}</h3>
              <div className="framework-copy">
                <p>{step.lead}</p>
                <p>{step.description}</p>
              </div>
              <span className="framework-signal" aria-hidden="true">{step.signal}</span>
            </article>
          ))}
        </div>
        <div className="framework-axis" role="list" aria-label={copy.framework.axisLabel}>
          {copy.framework.axis.map((label, index) => <span key={label} role="listitem">{label}{index < copy.framework.axis.length - 1 && <i aria-hidden="true"/>}</span>)}
        </div>
      </div>
    </section>
  );
}
