# Visual Redesign Implementation

## Approved Hero

The desktop homepage uses the user-approved visualization byte-for-byte from `public/images/hero-approved-reference.png`. The 1672 × 941 artwork remains the visual source for its header, headline, fragmentation, transition, network, supporting copy, CTAs and technical labels. Transparent accessible links align with the navigation and CTA areas without altering the artwork.

On narrow screens, the same artwork is cropped toward the transition and network field and used as an atmospheric backdrop. A semantic English headline, supporting copy and touch-sized CTAs remain readable above it. The mobile header provides an accessible menu.

## Language and Routes

The website is English-only. Public routes are rooted directly at `/`, `/products/`, `/projects/`, `/research/`, `/capabilities/`, `/news/`, `/about/` and `/contact/`. News article pages use `/news/[slug]/`. There are no `/en/` or `/bg/` route trees and no language selector.

## Visual System

- Dark blue-charcoal and graphite surfaces.
- Off-white technical typography with restrained cyan signals.
- Local typewriter/terminal font stack with no external font request.
- Editorial rows, fine rules and system axes rather than generic SaaS cards.
- Subtle section reveals with reduced-motion support.


## Rethink / Replace / Reimagine

The core Creative Destruction operating framework is restored on the homepage immediately after the short Philosophy section and before Products & Initiatives. It is an English-only editorial/technical sequence rather than a set of cards:

`LEGACY → RETHINK → REPLACE → REIMAGINE → EMERGENCE`

The three exact brand terms remain prominent:

- `01 / RETHINK.` questions inherited assumptions, processes, technologies and operating models.
- `02 / REPLACE.` replaces obsolete structures with better technology, software, AI and redesigned systems.
- `03 / REIMAGINE.` creates products, capabilities, services and value that legacy models could not support.

The section uses large monospaced typography, thin engineering rules, graphite surfaces, off-white text, restrained cyan signals and responsive editorial rows. The approved Hero artwork is unchanged.

## Content Architecture

English content lives in `content/en.ts`. Shared presentation components render Products, Projects, R&D, Capabilities, News, About and Contact pages. AI Governance is one initiative within the broader research, AI and software portfolio.

News records support `slug`, `date`, `category`, `title`, `summary`, `paragraphs` and optional related context. Static article paths are generated at build time.

## Static Export

`next.config.mjs` uses static export, trailing slashes and unoptimized local images. Build and preview with:

```powershell
cd "D:\CD site"
npm run build
python -m http.server 3008 --directory out
```

Open `http://localhost:3008/`. The deployable site is generated in `D:\CD site\out`.

## Accessibility

- one H1 per route;
- English document language;
- semantic navigation and content landmarks;
- skip link and visible focus states;
- accessible mobile menu with Escape handling;
- descriptive accessible links over the desktop artwork;
- reduced-motion support;
- no placeholder navigation links.

## Validation

Validated locally with TypeScript, the Next.js 15 production build, static export, desktop and mobile browser inspection, route checks, overflow checks and mobile-menu interaction. The production build makes no Google Fonts request.

## Missing Content

Remaining factual inputs are listed in `project-analysis/CONTENT_TODO.md`. No unverified partners, programmes, clients, results, dates or legal facts were invented.


## Hero-derived System Refinement

The approved 1672 × 941 Hero artwork remains unchanged. Its navigation is rendered as one consistent semantic layer so Products, Projects, R&D, Capabilities, News, About and Contact share the same scale, spacing, focus behaviour and links. Desktop Hero height now follows the artwork ratio instead of forcing unused viewport space; the adaptive Hero is used through 1024px.

The rest of the site now uses a unified Hero-derived scale:

- section statements: 52–64px desktop;
- concept/product titles: 44–68px according to context;
- supporting headlines: 20–24px;
- body copy: 16–18px;
- technical labels: 11–13px.

Light sections use cold technical off-white (`#ECECE7`) and deep graphite text. Dark sections retain blue-charcoal surfaces. Cyan remains scarce and semantic; light surfaces use a darker accessible cyan for labels and numbers.

The transformation framework uses a constrained editorial grid at desktop and a two-column stacked sequence on mobile. `RETHINK.`, `REPLACE.` and `REIMAGINE.` no longer overlap at any validated width. Section spacing, research-stage height and oversized statements were reduced so content determines height instead of creating secondary Hero screens.

Validation covered 1920, 1440, 1280, 1024, 768 and 375 pixels, with no horizontal overflow and one H1. Production build and static export succeed.
