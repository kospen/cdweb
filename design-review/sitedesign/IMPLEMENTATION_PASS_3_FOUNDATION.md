# Implementation Pass 3 — Quality and Production Foundation

Date: 2026-08-26  
Scope: lightweight repeatable checks, metadata foundation, indexing controls and future-readiness without invented production data.

## Repeatable checks

Added package scripts:

- `npm run typecheck` — strict TypeScript validation without incremental cache output
- `npm run check:routes` — verifies the static export and authored route integrity
- `npm run check` — runs typecheck, production build and route verification in sequence

The route checker verifies:

- all ten authored public routes are exported
- every exported document has `lang="en"`
- exactly one `main` and one H1 exist per route
- local links resolve to exported files

Final results: typecheck PASS, build/export PASS and route check PASS.

## Search and indexing foundation

- Added a statically exported `robots.txt` route that permits crawling.
- Added environment-gated canonical support through `NEXT_PUBLIC_SITE_URL`.
- Canonical and Open Graph URLs are emitted only when the environment value is a valid absolute URL.
- Article metadata now supplies its actual route path to the shared metadata helper.

A sitemap was deliberately not invented because the repository does not contain a verified production base URL. Set `NEXT_PUBLIC_SITE_URL` to the confirmed production origin before generating canonical absolute sitemap URLs.

## Content and localisation readiness

The existing typed local content architecture remains intact and English-only. No Bulgarian copy, translation keys, fake partner data, unverified programme details, canonical domain or sitemap URL was introduced. The structure can accept future locale layers after content approval.

## Final browser acceptance

Chrome was used on all ten public routes at 1920, 1440, 1280, 1024, 768, 390, 375 and 320px.

- 80 responsive route checks completed
- zero horizontal-overflow failures
- one `main` and one H1 on every checked route
- no console errors in the final browser session
- responsive hero sources selected as designed
- self-hosted Courier Prime loaded
- keyboard order matched the visible desktop header
- mobile navigation opened from the keyboard and closed with Escape

## Production readiness and deferred work

The foundation is suitable for a controlled deployment process, but this implementation does not deploy or publish the site.

Known follow-up work:

- confirm the production origin and set `NEXT_PUBLIC_SITE_URL`
- add a sitemap only after that origin is verified
- plan and test a Next.js 16 migration to address remaining nested audit findings
- configure a non-interactive ESLint setup
- add real-device, screen-reader and automated accessibility regression coverage
- consider WOFF2 Courier Prime files and AVIF hero variants if further transfer reduction is required

Content recommendations intentionally deferred:

- verified programme, consortium, partner, role, date and outcome details
- approved bilingual content and locale routing
- additional verified products, projects, research outputs and company news
