# Design Knowledge — Index

A complete design system and reference for presentations, documents, SaaS products, and brand identity. Every file is practical and production-ready.

---

## Files in This Vault

| File | Topic | What it covers |
|---|---|---|
| [01-typography.md](01-typography.md) | Typography | Type scales, font pairings, weights, line height, letter spacing, do's and don'ts |
| [02-layout-spacing-canvas.md](02-layout-spacing-canvas.md) | Layout & Spacing | Canvas setup, safe zones, grid systems, 8pt grid, white space, overflow prevention |
| [03-color-and-branding.md](03-color-and-branding.md) | Color & Brand Identity | Color theory, palette architecture, contrast (WCAG), gradients, dark mode, brand system |
| [04-powerpoint-design.md](04-powerpoint-design.md) | Presentation Design | Master slides, storytelling structure, animations, chart slides, pre-publication checklist |
| [05-pdf-document-design.md](05-pdf-document-design.md) | PDF & Documents | Reports, proposals, dissertations — margins, typography scale, TOC, headers/footers, export |
| [06-data-visualization.md](06-data-visualization.md) | Data Visualization | Chart selection, axes, data labels, tables, infographics, big numbers, dashboard design |
| [07-visual-hierarchy-and-composition.md](07-visual-hierarchy-and-composition.md) | Visual Hierarchy | Focal point, F/Z patterns, rule of thirds, Gestalt, balance, shape psychology |
| [08-saas-product-design.md](08-saas-product-design.md) | SaaS Product Design | Dashboards, KPI cards, forms, onboarding, navigation, component states, micro-interactions |
| [09-figma-workflow.md](09-figma-workflow.md) | Figma Workflow | File organization, components, Auto Layout, styles, prototyping, plugins, shortcuts |
| [10-design-tokens-systems.md](10-design-tokens-systems.md) | Design Tokens & Systems | Token taxonomy, complete token categories, dark mode, CSS variables, Tailwind, Style Dictionary |
| [11-responsive-mobile-design.md](11-responsive-mobile-design.md) | Responsive & Mobile | Mobile-first, breakpoints, layout strategies, touch targets, mobile navigation, typography |
| [12-accessibility-design.md](12-accessibility-design.md) | Accessibility | WCAG 2.1 AA, contrast ratios, color blindness, focus states, screen readers, ARIA, testing |
| [13-iconography-illustration.md](13-iconography-illustration.md) | Icons & Illustration | Icon styles, sizing, accessibility, illustration styles, empty states, photo guidelines |
| [14-design-handoff.md](14-design-handoff.md) | Design Handoff | Figma Dev Mode, what to prepare, annotations, asset export, design QA, handoff meeting |

---

## Quick Reference — Top 15 Rules

1. **One slide = one idea** — if content doesn't fit, make two slides
2. **Safe zone:** Minimum 1.5 cm margin from every edge
3. **60-30-10 color rule** — 60% neutral, 30% primary, 10% accent
4. **Contrast minimum 4.5:1** for body text (WCAG AA)
5. **Never use color as the only signal** — always add icon or label
6. **Max 2 font families** in one document; max 3 sizes per slide
7. **White space is design** — leave at least 30% of the slide empty
8. **Lock aspect ratio** on every image — never stretch or squash
9. **8pt grid** for all UI spacing — every value is a multiple of 4 or 8
10. **One focal point** per composition — one element the eye goes to first
11. **Minimum 44×44px touch targets** on mobile
12. **Design all states** — default, hover, focus, error, loading, empty, disabled
13. **Tokens, not hex codes** — use semantic token names to communicate with developers
14. **Auto Layout in Figma** — never manually space components
15. **Start chart titles with the insight** — "Revenue grew 23%" not "Revenue chart"

---

## By Use Case

### Presentations (pitch decks, reports, investor updates)
→ [[04-powerpoint-design]] → [[07-visual-hierarchy-and-composition]] → [[06-data-visualization]] → [[01-typography]] → [[03-color-and-branding]]

### Professional PDFs (proposals, whitepapers, dissertations)
→ [[05-pdf-document-design]] → [[01-typography]] → [[02-layout-spacing-canvas]] → [[06-data-visualization]]

### SaaS product UI
→ [[08-saas-product-design]] → [[10-design-tokens-systems]] → [[09-figma-workflow]] → [[12-accessibility-design]] → [[11-responsive-mobile-design]]

### Brand identity
→ [[03-color-and-branding]] → [[01-typography]] → [[13-iconography-illustration]] → [[10-design-tokens-systems]]

### Figma / Design system work
→ [[09-figma-workflow]] → [[10-design-tokens-systems]] → [[14-design-handoff]]

### Accessibility audit
→ [[12-accessibility-design]] → [[03-color-and-branding]] → [[01-typography]] → [[08-saas-product-design]]

---

## Shortcut

Add to CLAUDE.md: `When I say @design - read all files in knowledge/design/`
