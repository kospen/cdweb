# Phase B — Independent UX, visual and technical audit

## 1. Executive assessment

The current Creative Destruction website has a strong and unusually specific visual identity. It does not look like a generic SaaS template. The approved Hero is memorable, the dark graphite/off-white/cyan system is disciplined, and the editorial sequence supports the brand idea of moving from fragmentation to structure.

The strongest achievement is the visual system. The largest remaining gap is not visual polish but depth and system maturity: the homepage already communicates almost the complete site, while most interior pages repeat the same material with little additional evidence. Technical implementation is functional and relatively lean, but the image strategy, breakpoint logic, CSS history, missing automated quality gates and 320 px edge cases keep it below a finished production standard.

### Summary scorecard

| Area | Assessment | Score / 10 |
|---|---|---:|
| Brand distinctiveness | Highly specific and memorable | 9.0 |
| Hero composition | Cinematic and coherent; raster-dependent | 8.5 |
| Typography | Strong character and hierarchy; small-text and delivery risks | 7.8 |
| Color/cyan system | Controlled, consistent and accessible | 9.0 |
| Spacing/composition | Premium editorial rhythm; long homepage | 8.3 |
| Responsive design | Good at common widths; specific 320 px defects | 7.0 |
| Navigation/functionality | Clear and working; breakpoint and active-state inconsistencies | 7.2 |
| Content and credibility | Clear positioning; limited evidence and route depth | 6.2 |
| News | Functional static foundation; editorially thin | 5.8 |
| Accessibility | Good semantic baseline; several correctable gaps | 7.5 |
| Performance readiness | Static architecture is strong; Hero delivery is weak | 6.5 |
| Technical maintainability | Typed and componentised; CSS/dependency debt remains | 6.7 |
| SEO/discoverability | Titles and descriptions exist; advanced signals absent | 6.5 |
| Overall current state | Strong design foundation, not yet fully production-complete | **7.6** |

Scores are diagnostic, not implementation instructions. No changes were made during this audit.

## 2. What is already working especially well

### 2.1 A real brand system, not a template

The combination of monospaced type, technical grids, numbered records, fine rules, restrained cyan and large editorial statements produces a recognisable Creative Destruction language. It carries across the Hero, framework, section intros, content indexes, article pages and footer.

The website avoids the most common generic-AI patterns:

- no glowing orb as the main concept;
- no stack of rounded feature cards;
- no purple/blue gradient overload;
- no dashboard mockup masquerading as product proof;
- no decorative icons without purpose;
- no excessive glassmorphism.

### 2.2 The Hero tells the transformation story visually

The left-to-right movement from fragments, through a clear transition point, into a structured technical network is legible without explanation. The large cyan `Transforms.` gives the eye one decisive focal point. The supporting CTA cluster sits in the structure/emergence half, which reinforces the narrative rather than competing with it.

The visual has good tonal separation: fragments, transition lines and structured nodes remain visible without turning the page into a neon-cyan AI aesthetic.

### 2.3 RETHINK / REPLACE / REIMAGINE is correctly treated as a core framework

This is one of the strongest non-Hero sections. It is presented as an editorial operating sequence, not three SaaS cards. The hierarchy is clear:

- large brand word;
- short operational lead;
- explanatory sentence;
- compact transformation signal;
- full legacy-to-emergence axis.

The section reads as a proprietary Creative Destruction framework rather than a generic innovation diagram.

### 2.4 The color system is disciplined

The cyan is prominent where it matters and secondary elsewhere. The dominant surfaces remain graphite and off-white. All measured core text pairs meet WCAG AA, including the darker cyan introduced for light sections.

The dark/light alternation also performs an important compositional function: it resets the eye during a very long page and helps distinguish editorial/philosophical material from technical/company indexes.

### 2.5 Semantic and keyboard fundamentals are better than average

The site has a real skip link, a correct single H1 per page, semantic landmarks, native interactive elements, decorative image alt handling, visible focus styles and reduced-motion support. The mobile menu is keyboard operable and closes with Escape.

These are substantive accessibility foundations, not cosmetic additions.

### 2.6 Static architecture matches the current content model

For a public brochure/editorial site whose data is currently stored locally, static export is appropriate. It gives deterministic pages, simple hosting, no runtime database dependency and strong caching potential.

The content is typed, route metadata is centralised, and the News article routes are statically generated from the content records.

## 3. Visual design audit

### 3.1 Hero

**Strengths**

- Excellent integration of headline and system visual.
- Strong top-left entry point and clear left-to-right reading path.
- Cyan word and transition core produce one primary emphasis.
- Header and bottom technical labels feel native to the composition.
- The dark background has enough graphite/blue-charcoal depth.

**Limitations**

- Desktop visual fidelity depends on a single full-canvas raster. Text, network and technical labels cannot adapt independently.
- The visible desktop title, copy and CTA graphics are image pixels. HTML equivalents exist for accessibility and links, but visual text cannot respond to font preferences, contrast modes or selection.
- The navigation is a real overlay placed over navigation text already baked into the image. It works, but creates two layers that must remain perfectly aligned.
- The 1.95 MB PNG is the likely LCP asset.

**Assessment**

Keep the composition. Future work should improve delivery and structural resilience without redesigning the approved image direction.

### 3.2 Macro composition and page rhythm

The homepage has a confident editorial rhythm and generous whitespace. Large statements typically occupy one side while explanatory text occupies the other. Thin rules, grid lines and record indexes create continuity.

The page is also very long: approximately 9,390 px at the audited desktop viewport, or nearly fourteen viewport heights. This is acceptable for a deliberate corporate narrative, but it increases the importance of clear wayfinding and unique value in every section.

Two transitions are less distinct than the rest:

- Projects and R&D are consecutive light sections, so they can read as one extended paper surface.
- About and Contact are consecutive dark sections; the raised Contact surface helps, but the transition is quieter than the rest of the page.

Neither is broken, but both reduce the otherwise strong alternating cadence.

### 3.3 Typography

**Strengths**

- One consistent type character supports the technical/typewriter identity.
- Statement headings have decisive scale and controlled leading.
- Body copy uses comfortable desktop line height.
- Uppercase tracked labels and technical identifiers are consistently applied.
- The framework successfully creates hierarchy using scale rather than multiple font families.

**Risks**

- Courier Prime is not delivered by the website. It happened to be available in the audit Chrome installation, but visitors without it will see Courier New/Courier. That can change line breaks, texture and width.
- Monospaced type is effective for brand language but less efficient for longer reading. It increases page height and makes News/article copy feel more like system documentation than editorial journalism.
- Desktop technical labels render at approximately 11.63 px. This is slightly below the design reference's 12 px absolute minimum.
- The short-height mobile Hero intentionally drops body copy to 12.48 px and technical narrative labels to 8.48 px. Those sizes are too small for normal functional reading.
- Large monospaced words have a high minimum width. This directly causes the observed 320 px overflow for `collaboration.` and `architecture`.

### 3.4 Cyan accent distribution

The cyan system is one of the site's best-resolved areas. On most sections it remains a signal, not a fill color. It identifies section labels, numbers, transition lines and active technical endpoints.

The Hero makes a deliberate exception by coloring the entire word `Transforms.`. Because the rest of the page is restrained, this reads as the brand's primary transformation signal rather than overuse.

Measured contrast is strong on both dark and light surfaces. No recommendation is needed to increase cyan quantity or glow.

## 4. UX and navigation audit

### 4.1 Navigation strengths

- All primary destinations are visible and named plainly.
- News correctly appears before About.
- R&D maps consistently to `/research/`.
- All route links worked in Chrome.
- Mobile menu rows are generously sized and numbered.
- The Contact destination has clear separation in the desktop navigation.
- Footer navigation repeats the primary route set.

### 4.2 Navigation gaps

**No current-page state.** Header and footer receive a route value, but it is unused. Users get no visual or semantic indication of the active route, and no `aria-current="page"` is present.

**Breakpoint inconsistency.** At widths from 1025 to 1343 px:

- the homepage uses the desktop image Hero and its horizontal overlay navigation;
- interior pages use the standard Header with a hamburger menu.

This means the navigation model changes when moving from Home to an interior page at the same viewport width. It is functional, but not behaviourally consistent.

**Focus order mismatch in the desktop Hero.** Keyboard focus reaches Products through Contact before the top-left Creative Destruction/Home hotspot, although Home is visually first. The order remains usable but does not exactly match the visual reading order.

**Native anchors cause document navigation.** The app uses `<a>` rather than Next `<Link>`. This is reliable for static export but gives up automatic client navigation and prefetch benefits.

### 4.3 Homepage versus interior routes

The homepage already contains nearly the complete content of every primary route. The interior pages add:

- two Product detail notes;
- one Project verification state;
- five R&D working environments;
- three additional Capabilities;
- full News index behaviour;
- expanded Contact mailto routes.

That is not enough differentiation for every route to feel independently necessary. The current architecture behaves as both a full one-page site and a multi-page site, producing substantial repetition.

The site should eventually choose a clearer relationship:

- homepage as curated overview, interior pages as substantive depth; or
- homepage as the primary long-form experience, with fewer but richer dedicated destinations.

## 5. Section-by-section content audit

### 5.1 Products

The section is visually strong and the two records fit the technical index pattern. AI Governance is correctly positioned as one product/initiative rather than the company identity.

The content remains portfolio architecture rather than product proof. There are no screenshots, outcomes, product status indicators, user groups, technical differentiators, deployment context or individual product pages. Both homepage Details links go to the same general Products index.

### 5.2 Projects

The verified-fields-only policy is responsible and avoids invented claims. The limitation is that the sole project entry mostly explains what will be published later. The section currently signals readiness for evidence more than evidence itself.

For a European R&D-oriented company, this is the most credibility-sensitive area. Future verified programme, consortium, role, timeline, work package and output information would materially strengthen the whole site.

### 5.3 R&D

This is the clearest content model after the framework. Investigate → Prototype → Validate → Transfer is understandable and operational. The full page's working environments extend it logically.

The main gap is proof: no named methods, facilities, publications, prototypes, technology-readiness progression, evaluation results or transfer examples are present.

### 5.4 Capabilities

The eight-item continuum is broad without becoming a generic icon grid. Short signals such as MODEL → SYSTEM and HYPOTHESIS → PROOF support the technical tone.

The content is still descriptive rather than decision-supporting. A buyer or research partner cannot yet determine typical engagement shape, inputs, outputs, maturity level, constraints or evidence for each capability.

### 5.5 News

The routing and article template work. Titles, descriptions, dates, categories and static generation are all present.

The editorial layer is minimal:

- only two records;
- both share the same date;
- each article contains three short paragraphs;
- no author, reading time, images, related articles, previous/next navigation, share metadata image or Article JSON-LD;
- no pagination, categories, filtering, feed or CMS workflow.

The current News area is a valid skeleton, not yet a mature publication system.

### 5.6 About

The four principles are clear and consistent with the rest of the site. They explain how the company wants to work.

They do not yet establish who the company is in verifiable terms. Missing information includes team/leadership, legal entity context, location, history, domain track record, partnerships, publications or concrete operating evidence.

### 5.7 Contact

The contact proposition is concise and the four enquiry types reduce ambiguity. The note about no submission/storage is transparent and privacy-friendly.

The experience depends on the visitor having a configured email client. There is no copy-email control, web form, scheduling option, expected response time, postal/legal address or alternate channel. The footer also lacks privacy/legal/imprint links.

## 6. Bilingual audit

There is no bilingual implementation to evaluate in the current site. The architecture is explicitly English-only.

This is not a hidden defect: the type system, locale list, routes, metadata and content all agree on `en`. However, any requirement for a bilingual EN/BG site remains unfulfilled in the current snapshot. The two dormant `[lang="bg"]` CSS selectors do not provide language support.

If bilingual delivery returns as a requirement, it will need a real content, route, metadata, language-switch and alternate-link architecture rather than a visual toggle alone.

## 7. Responsive audit

### 7.1 What passes

- No page-level overflow at 1536, 1024, 768 or 375 px.
- All ten public routes passed the 375 px overflow check.
- The Hero switches to a mobile-specific HTML composition at 1024 px.
- Section grids collapse progressively.
- R&D becomes two columns at tablet width and one column on small phones.
- The mobile menu trigger is 45 × 45 px and the main CTA is 48 px high.
- Menu rows are 60 px high.
- Mobile body base remains 16 px outside the compact Hero exception.
- The mobile menu closes on Escape and preserves native link behaviour.

### 7.2 Confirmed 320 px failures

At the 320 × 568 audit viewport, Chrome had a 305 px document client width after the scrollbar.

Three routes overflowed:

1. **Home** — 326 px scroll width. The About section's long monospaced heading word `collaboration.` forces a wider grid track.
2. **About** — the same 326 px overflow from the same heading.
3. **First News article** — 317 px scroll width because `architecture` cannot wrap at the 44.8 px article headline size.

The compact Hero also reduces body text to 12.48 px and narrative labels to 8.48 px, and removes the secondary CTA.

### 7.3 Responsive image issue

The mobile Hero downloads and reuses the full 1672 × 941 desktop PNG, then renders it at 306% width and offsets it far to the left. This creates the desired visual crop but is not bandwidth-efficient for a 320–375 px device.

## 8. Accessibility audit

### 8.1 Passes and strengths

- Correct `lang="en"`.
- One H1 per page.
- Logical heading sequence on the homepage.
- Main landmark and skip link.
- Visible high-contrast focus ring.
- Native links and buttons.
- No unnamed homepage links.
- Decorative Hero images correctly use empty alt.
- Accessible text equivalents exist for desktop raster content.
- Mobile menu has name, role and state.
- Reduced-motion preference is respected.
- Core token contrast pairs pass AA.
- No duplicate IDs found.

### 8.2 Gaps

**Small text.** Some desktop labels are 11.63 px. Compact mobile Hero labels fall to 8.48 px and supporting copy to 12.48 px.

**320 px reflow.** Confirmed horizontal scrolling conflicts with the expected 320 px reflow target.

**No active navigation semantics.** `aria-current` is absent.

**Visual/keyboard order mismatch in Hero.** Home is visually first but follows the overlay navigation in DOM focus order.

**Generic labelled axis.** The framework axis has an `aria-label` on a generic `<div>` but no explicit semantic role; support can vary.

**Target size outside mobile menu.** Desktop and footer text links do not consistently expose 44 px physical targets. WCAG 2.2 AA permits smaller targets in some spaced/inline contexts, but larger targets would improve usability.

**No automated or assistive-technology coverage.** No axe, Lighthouse CI, screen-reader test record or accessibility regression suite is present.

## 9. Performance-relevant audit

### 9.1 Positive factors

- Static export is appropriate and cache-friendly.
- Content is delivered as static HTML.
- Only the Header/menu requires client state.
- Images have explicit intrinsic dimensions, reducing layout shift risk.
- No analytics, trackers, form libraries, dashboards or heavy data-fetching runtime is present.
- Existing current build output previously reported approximately 102 kB First Load JS per route.
- Chrome produced no console warnings or errors during route traversal.

### 9.2 Main performance risks

**Hero PNG.** The above-the-fold asset is 1.95 MB. It is not delivered in WebP/AVIF and has no responsive source variants.

**No Next image optimisation.** Static export explicitly disables image optimisation, and the component uses `<img>` rather than a responsive image strategy.

**Mobile over-delivery.** Mobile receives the same large asset as desktop.

**Unused public assets.** Three unreferenced PNGs add 4.76 MB to the exported artifact, bringing public images to 6.62 MiB. They do not affect first-view transfer unless requested, but they increase deployment footprint and maintenance ambiguity.

**Font delivery is environment-dependent.** The intended font is not self-hosted or loaded through Next.

**Full document navigations.** Native anchors work but miss Next client-navigation/prefetch benefits.

**CSS history.** The 37.2 KB global stylesheet includes older unused Hero systems, duplicate selector definitions and late corrective overrides. This is not a severe transfer problem, but it increases cascade complexity.

No Lighthouse or lab Core Web Vitals score is claimed in this audit. Chrome's extension-controlled performance entries were unavailable, so performance conclusions are based on rendered behaviour, source and exact asset/export sizes.

## 10. Technical and maintainability audit

### 10.1 Strengths

- Strict TypeScript passes.
- Content types are explicit.
- Route metadata is centralised.
- Reusable sections serve home and full routes.
- News route uses static params correctly.
- Most components remain server components.
- No `any` types were found in the inspected public components.
- Content and presentation are separated.

### 10.2 Maintainability risks

**Global CSS layering.** The stylesheet contains original rules, later redesign rules and precision overrides. Effective styles are correct, but future changes require understanding the entire cascade.

**Dead implementation paths.** Selectors for an older generated Hero system remain although the rendered Hero is image-based. Several old hotspot classes are also unused.

**Dormant dependencies and files.** Tailwind is configured but not used by rendered components. Framer Motion is installed and an unused SectionReveal component imports it. Three public images are unreferenced.

**Unused route props.** Header and Footer accept `route` but do not use it.

**No tests or quality gates.** No unit, integration, E2E, responsive, accessibility or visual-regression tests exist. No ESLint/Prettier configuration was found.

**No content publishing layer.** News and portfolio records require code edits and rebuilds.

## 11. SEO and sharing audit

### Present

- descriptive titles;
- route descriptions;
- Open Graph title/description/type/locale/site name;
- Twitter summary-card title and description;
- SVG icon;
- semantic headings;
- static readable URLs.

### Missing

- canonical URLs;
- absolute Open Graph/Twitter images;
- sitemap;
- robots metadata/route;
- Organization schema;
- Article schema for News;
- author/date-modified structured signals;
- language alternates;
- breadcrumb structure on interior pages;
- News feed.

## 12. Prioritised recommendations

These recommendations are deliberately separate from the as-is snapshot. They are not permission to implement.

### Priority 1 — Production blockers and high-impact corrections

1. **Eliminate the confirmed 320 px overflow** on Home, About and the first News article. Address min-content grid behaviour and long-word wrapping without changing the editorial visual language.
2. **Restore readable compact-mobile typography.** Keep meaningful copy at or above 16 px where possible and functional labels at or above 12 px. Do not solve short-height layouts by shrinking to 8.48 px.
3. **Create a responsive Hero delivery strategy.** Preserve the exact approved composition while providing appropriately sized modern formats for desktop and mobile.
4. **Unify navigation behaviour between Home and interior pages** across the 1025–1343 px range.
5. **Decide the homepage/interior-page content contract.** Interior routes need substantially more value than the homepage overview if the multi-page architecture remains.

### Priority 2 — Accessibility, content credibility and conversion

6. Add visible and semantic active-route state using the already-passed route information.
7. Align Hero keyboard order with the visual order, beginning with Home/brand before the main nav.
8. Deliver the intended font predictably through a licensed/self-hosted or Next-supported font strategy.
9. Add verified evidence to Products, Projects, R&D and Capabilities: outcomes, roles, methods, status, artefacts and links.
10. Expand About with verifiable company identity and credibility information.
11. Improve Contact resilience with a copy-email action or carefully designed form while retaining the privacy note and direct email route.
12. Add privacy/legal/imprint information appropriate to the operating jurisdiction and actual data practices.

### Priority 3 — Editorial, SEO and maintainability

13. Mature News with richer article structure, article metadata, related content and a publishing workflow.
14. Add canonical URLs, OG images, sitemap, robots and Organization/Article structured data.
15. Consolidate global CSS into a current source of truth and remove dead design paths only after regression coverage exists.
16. Remove or archive unreferenced assets and confirm whether Tailwind/Framer Motion are truly required.
17. Use framework-native navigation/image capabilities where they provide measurable benefits and remain compatible with static export.
18. Add automated checks for TypeScript, linting, route integrity, 320/375 responsive overflow, keyboard navigation, axe accessibility and visual regression.

## 13. Recommended acceptance criteria for a future improvement pass

A later implementation pass should be considered complete only when:

- all public routes have `scrollWidth <= clientWidth` at 320, 375, 768, 1024 and 1536 px;
- compact mobile copy remains readable and no primary information is hidden merely to fit height;
- the approved Hero composition remains visually unchanged while transfer size is materially reduced;
- navigation model and current-page state are consistent;
- interior routes contain unique, decision-relevant content;
- all core text and focus states continue to meet WCAG AA contrast;
- keyboard order matches visual order;
- the intended font renders consistently on a clean device;
- no console errors or warnings appear;
- automated accessibility and responsive tests pass;
- metadata includes canonical, share-image and structured-data essentials;
- production performance is measured with Lighthouse/Core Web Vitals rather than inferred only from source.

## 14. Final independent conclusion

The current site has already achieved the difficult part: a distinctive Creative Destruction visual identity with a coherent operating narrative. It feels technical, premium and brand-specific. The approved Hero, framework section and dark/light editorial system should be treated as assets to protect.

The next level of quality will come from engineering and evidence rather than another visual redesign: responsive edge-case correction, efficient asset delivery, consistent navigation, richer route content, stronger company proof, mature News/SEO infrastructure and automated quality assurance.

No redesign is recommended as the first response. The recommended direction is to preserve the visual system and make the implementation, content depth and production readiness match it.
