# Phase A — Current website as-is documentation

## 1. Snapshot identity

This document records the current Creative Destruction website objectively. It describes the rendered site and implementation without judging quality or proposing changes.

| Item | Current state |
|---|---|
| Project | Creative Destruction website |
| Framework | Next.js 15.3.0, React 19.1.0, TypeScript 5.8.3 |
| Rendering model | Next.js App Router with static export (`output: "export"`) |
| Public language | English only |
| Content source | Typed local object in `content/en.ts` |
| Styling | One global CSS file plus CSS custom properties; Tailwind is configured but not used by the rendered components |
| Client-side state | Mobile header/menu only |
| Primary visual asset | `public/images/hero-approved-reference-cyan.png` |
| Contact mechanism | Direct `mailto:` links |
| Analytics/cookies/forms | None present in the inspected source |
| Chrome console | No errors or warnings during the audited route sequence |
| TypeScript | Strict mode enabled; read-only `tsc --noEmit --incremental false` check passed |

The working tree already contained uncommitted redesign work before this audit. The audit treats that exact working tree and its running local site as the current source of truth.

## 2. Public route map

The site exposes ten authored public routes:

| Route | Rendered page title | Primary H1 |
|---|---|---|
| `/` | Creative Destruction — AI, Software, Research & Innovation | Intelligence that Transforms. |
| `/products/` | Products — Creative Destruction | Products |
| `/projects/` | Projects — Creative Destruction | Projects |
| `/research/` | R&D — Creative Destruction | R&D |
| `/capabilities/` | Capabilities — Creative Destruction | Capabilities |
| `/news/` | News — Creative Destruction | News |
| `/news/research-ai-software/` | A broader architecture for research, AI and software — Creative Destruction | A broader architecture for research, AI and software |
| `/news/ai-governance-initiative/` | AI Governance positioned within the wider technology portfolio — Creative Destruction | AI Governance positioned within the wider technology portfolio |
| `/about/` | About — Creative Destruction | About |
| `/contact/` | Contact — Creative Destruction | Contact |

All audited routes rendered a single `<main>` landmark, the expected H1, a footer, and no page-level horizontal overflow at the default 1536 px Chrome viewport.

## 3. Homepage information architecture

The homepage is a long-form, one-page company presentation with ten consecutive sections. At the audited 1536 × 682 viewport it was approximately 9,390 CSS pixels high.

| Order | Section | Visual surface | Rendered height at 1536 px | Purpose |
|---:|---|---|---:|---|
| 1 | Hero | Dark raster-led composition | 856 px | Brand proposition and primary navigation |
| 2 | Operating idea | Cold paper/light | 521 px | Short Creative Destruction philosophy |
| 3 | Operating framework | Dark technical grid | 1,215 px | RETHINK / REPLACE / REIMAGINE sequence |
| 4 | Products & initiatives | Dark | 1,043 px | Product/initiative index |
| 5 | Selected project environments | Cold paper/light | 830 px | Project index |
| 6 | Research & development | Cold paper/light | 939 px | Four-stage R&D path |
| 7 | Capability system | Dark | 1,085 px | Capability continuum |
| 8 | Latest News | Cold paper/light | 1,089 px | Two News records |
| 9 | About | Dark | 879 px | Four operating principles |
| 10 | Contact | Raised graphite/dark | 549 px | Direct contact CTA |

The homepage then ends with a three-column footer.

## 4. Hero implementation

### Desktop Hero

The desktop Hero is an exact-image composition based on a 1672 × 941 PNG. The current cyan version is 1,951,580 bytes. At the default audit viewport it rendered at approximately 1521 × 856 CSS pixels.

The visible PNG contains:

- Creative Destruction wordmark and plus mark;
- navigation labels;
- the eyebrow `AI SYSTEMS / DIGITAL PRODUCTS / R&D`;
- the three-line statement `Intelligence / that / Transforms.`;
- a left-to-right fragmentation → transition → structured-network visual;
- supporting copy and two CTA button visuals;
- the bottom labels `FRAGMENT / LEGACY`, `TRANSITION / 01`, and `STRUCTURE / EMERGENCE`.

`Transforms.` is the dominant cyan text. Other cyan is limited to technical nodes, small signals, connector details and the primary CTA outline.

The image is declared decorative with `alt=""`. Equivalent semantic content is provided through:

- one visually hidden H1: `Intelligence that Transforms.`;
- visually hidden supporting copy;
- a real navigation overlay positioned over the navigation area;
- real link hotspots for Home, Explore our work, and View capabilities.

The Hero navigation overlay contains Products, Projects, R&D, Capabilities, News, About, a divider and Contact.

### Mobile Hero

At 1024 px and below, the desktop image composition is hidden and a mobile composition appears. It uses:

- the standard interactive site header;
- the same PNG as a cropped atmospheric system background;
- live HTML eyebrow, headline, copy, CTAs and three narrative labels;
- a single-column CTA arrangement.

At 375 × 812:

- mobile Hero height was 749 px below the 63 px header;
- the Hero title rendered at 46.4 px;
- the menu trigger was 45 × 45 px;
- the primary CTA was 328 × 48 px;
- there was no horizontal overflow.

For short devices at 576 px wide or less and 704 px high or less, the mobile layout reduces type and spacing and hides the secondary `View capabilities` CTA.

## 5. Navigation and page shell

### Homepage

- Above 1024 px, the Hero itself supplies the visible site navigation through the real overlay.
- At 1024 px and below, the standard sticky Header appears.

### Interior pages

- The standard Header appears on every interior page.
- The full desktop navigation appears at 1344 px and above.
- Below 1344 px, the Header uses a menu button and collapsible menu.
- The mobile menu contains seven numbered rows: Products, Projects, R&D, Capabilities, News, About and Contact.
- Each mobile row rendered 60 px high during the audit.
- The menu exposes `aria-expanded`, changes its accessible label between Open navigation and Close navigation, and closes with Escape.

### Navigation destinations

All header destinations use trailing slashes and were confirmed in Chrome. A semantic navigation click from Contact to Products completed successfully.

The Header does not expose an active-page state or `aria-current`. The `route` prop is passed into Header and Footer but is not used.

## 6. Typography

The site uses a single monospaced/typewriter family throughout:

```css
"Courier Prime", "Courier New", Courier, monospace
```

No `@font-face`, `next/font` or external font import is present in the source. Chrome reported Courier Prime as available on the audit machine. If it is unavailable on another device, the design falls back to Courier New or Courier.

Representative rendered desktop typography at 1536 px:

| Element | Size | Weight | Line height | Notes |
|---|---:|---:|---:|---|
| Hero overlay navigation | 15.67 px | 400 | 24.28 px | Uppercase, tracked |
| Light section kicker | 11.63 px | 700 | 16.28 px | Dark cyan, uppercase |
| Section statement H2 | 61.44 px | 400 | 63.90 px | Tight negative tracking |
| Light section body | 17.66 px | 400 | 29.15 px | 1.65 line height |
| Framework words | 61.44 px | 400 | 60.21 px | RETHINK / REPLACE / REIMAGINE |
| Framework lead | 23.81 px | 400 | 29.76 px | Off-white |
| Framework description | 16 px | 400 | 25.6 px | Secondary gray |
| Product name | 49.15 px | 400 | 50.14 px | Large record label |
| Contact statement | 61.44 px | 400 | 63.90 px | Centered |

The primary scale is fluid and uses CSS `clamp()`. Small technical labels use uppercase, increased tracking and a shared `--system-size`. Body copy is predominantly 16–17.66 px with 1.6–1.65 line height.

## 7. Color and accent system

The site uses a dark blue-charcoal/graphite base, an off-white paper surface, off-white typography, muted steel grays and a cyan signal color.

### Current resolved color tokens

| Role | Value |
|---|---|
| Base dark | `#070b0e` |
| Secondary dark | `#0b1116` |
| Raised dark | `#11181d` |
| Cold paper | `#ecece7` |
| Ink | `#0c161c` |
| Primary dark-surface text | `#f2f0ea` |
| Secondary dark-surface text | `#b2bcc1` |
| Tertiary dark-surface text | `#829097` |
| Primary cyan | `#56d7e5` |
| Light-surface cyan | `#0b6172` |

The cyan is used for:

- the Hero word `Transforms.`;
- primary CTA outlines and text;
- section kickers and record identifiers;
- selected network nodes and technical lines;
- focus rings and hover accents;
- selected technical axis endpoints.

The audited text/background pairs resolve to these contrast ratios:

| Pair | Ratio |
|---|---:|
| Primary off-white on base dark | 17.33:1 |
| Secondary gray on base dark | 10.21:1 |
| Tertiary gray on base dark | 6.01:1 |
| Cyan on base dark | 11.52:1 |
| Ink on paper | 15.45:1 |
| Muted ink on paper | 6.61:1 |
| Light-surface cyan on paper | 5.97:1 |
| Hero navigation off-white on near-black | 15.87:1 |

## 8. Layout and spacing system

The site shell is fluid with a maximum width of 100rem and horizontal margins defined by:

```css
width: min(calc(100% - clamp(2rem, 5vw, 7rem)), 100rem)
```

At 768 px and below it changes to 1rem side margins. Section spacing uses a shared fluid token of 4.5rem–7.25rem on desktop and 3.75rem–5rem on narrow screens.

The design uses:

- editorial two-column section introductions on large screens;
- full-width horizontal record indexes rather than card grids;
- thin horizontal rules and faint 4rem technical grid backgrounds;
- sticky left-side content within the desktop Capabilities section;
- dark/light surface alternation for macro-level rhythm;
- sharp corners and almost no radius or shadow styling.

## 9. Content inventory

### Operating idea

The philosophy statement presents Creative Destruction as an operating principle: challenge inherited systems, engineer a transition, and create new value.

### RETHINK / REPLACE / REIMAGINE

The core brand framework contains three numbered steps and a five-part axis:

`LEGACY → RETHINK → REPLACE → REIMAGINE → EMERGENCE`

Each step has a title, lead sentence, supporting description and short transformation signal.

### Products

Two records exist:

1. PDGA — European R&D initiative / Technology development.
2. AI Governance — Product / initiative / Responsible AI systems.

The full Products route adds a detail paragraph to each record. No individual product routes exist.

### Projects

One record exists: PDGA. The copy explicitly reserves programme, consortium, partner, role, date and output details until they are verified. No individual project route exists.

### R&D

The R&D path contains four stages:

1. Investigate
2. Prototype
3. Validate
4. Transfer

The full R&D page also lists five working environments: applied AI research, experimental software development, European collaborative research, emerging technologies and research-to-product transfer.

### Capabilities

Eight capabilities exist in the full index:

1. Artificial Intelligence
2. Software Engineering
3. AI-powered SaaS
4. Digital Transformation
5. Data & Analytics
6. Research & Development
7. AI Governance
8. Technology Integration

The homepage shows the first five.

### News

Two static News records exist, both dated 2026-08-25:

- `A broader architecture for research, AI and software`
- `AI Governance positioned within the wider technology portfolio`

Each has a dedicated static article route, date, category, optional related label, summary and three body paragraphs.

### About

Four principles are presented: Research-led, Product-oriented, Collaborative and European.

### Contact

The full Contact page provides four mailto-based enquiry paths:

- Product enquiry
- Research collaboration
- Project partnership
- Technology collaboration

Each pre-populates an email subject. The page states that the site does not submit or store messages.

## 10. Language implementation

The current site is not bilingual.

- `Locale` is typed as only `"en"`.
- `locales` contains only `en`.
- all route functions ignore locale and resolve to the English path;
- the document language is `en`;
- no Bulgarian content file, Bulgarian route tree, locale switcher or alternate-language metadata exists.

Some unused CSS selectors mention `[lang="bg"]`, but they do not constitute a Bulgarian implementation.

## 11. Accessibility implementation present

The current implementation includes:

- one H1 per audited page;
- a logical H1 → H2 → H3 outline on the homepage;
- one `<main>` landmark;
- semantic header, nav, section, article and footer elements;
- an English document language;
- a skip link targeting `#main-content`;
- a globally visible 2 px cyan `:focus-visible` outline;
- keyboard-operable native links and buttons;
- an Escape handler for the mobile menu;
- explicit `aria-expanded`, `aria-controls` and accessible menu labels;
- empty alt text for decorative Hero images;
- semantic date elements for News;
- `prefers-reduced-motion` CSS that effectively disables animation and smooth scrolling;
- no duplicate IDs and no unnamed links in the audited homepage DOM.

The first Tab stop on the homepage was the visible-on-focus Skip to content link. The desktop focus order then followed the Hero overlay navigation, Home hotspot, the two Hero CTAs and the page content links.

## 12. Metadata and discoverability

Every route receives a descriptive title and description. Open Graph and Twitter metadata include title, description, type, locale and site name. The root layout supplies an SVG icon.

The inspected source and rendered HTML do not include:

- canonical URLs;
- Open Graph images;
- Twitter images;
- JSON-LD structured data;
- a sitemap route;
- a robots route;
- language alternates.

## 13. Assets and output footprint

The public image directory contains four PNG assets totalling 6.62 MiB:

| Asset | Dimensions | Size | Referenced by current components |
|---|---:|---:|---|
| `hero-approved-reference-cyan.png` | 1672 × 941 | 1,951,580 B | Yes |
| `hero-approved-reference.png` | 1672 × 941 | 2,491,661 B | No |
| `hero-transformation.png` | 1536 × 1024 | 1,979,564 B | No |
| `cd-vcc-logo.png` | 1536 × 1024 | 522,578 B | No |

The current Hero uses a native `<img>` with explicit width and height. It does not use `next/image`, `srcset`, `sizes`, WebP or AVIF. Static export has Next image optimisation disabled.

The existing static export snapshot contains:

- route HTML files of approximately 27.7–57.4 KB each;
- one global CSS file of 37,234 bytes;
- the 1.95 MB Hero PNG in the output;
- the other three public PNGs copied to output even though no current component references them.

## 14. Code architecture

The current source is organised into:

- route pages under `app/(root)`;
- typed content under `content`;
- reusable landing/page components under `components/landing`;
- one global stylesheet;
- a content-driven `ContentPage` switch for the seven interior index pages;
- a dynamic static-generated News article route using `generateStaticParams`.

Only Header and the unused SectionReveal component are client components. The public pages and content sections are otherwise server-rendered/static.

All links are native `<a>` elements. `next/link` is not used. The Hero is a native `<img>`. `next/image` is not used.

The repository includes Tailwind, PostCSS and Framer Motion dependencies. The rendered components use plain class names and global CSS. `SectionReveal` imports Framer Motion but is not imported elsewhere in the current app.

No automated test, Playwright, Cypress, Jest, Vitest, axe or Lighthouse configuration was found. No ESLint or Prettier configuration was found. The package contains a `next lint` script.

## 15. Responsive observations recorded as facts

| Viewport | Homepage mode | Navigation mode | Page-level overflow |
|---|---|---|---|
| 1536 × 682 | Desktop raster Hero | Hero overlay navigation | No |
| 1024 × 768 | Mobile HTML Hero | Sticky Header + menu | No |
| 768 × 1024 | Mobile HTML Hero | Sticky Header + menu | No |
| 375 × 812 | Mobile HTML Hero | Sticky Header + menu | No on all audited routes |
| 320 × 568 | Compact mobile Hero | Sticky Header + menu | Present on Home, About and one News article |

At 320 px, Chrome reported a 305 px document client width due to the browser scrollbar. Observed scroll widths were:

- Home: 326 px;
- About: 326 px;
- first News article: 317 px;
- all other audited routes: 305 px.

On short 320 × 568 devices, the Hero body text rendered at 12.48 px, the bottom narrative labels at 8.48 px, and the secondary CTA was hidden by the compact-height media query.

This completes the objective as-is snapshot. Evaluation and recommendations are intentionally isolated in Phase B.
