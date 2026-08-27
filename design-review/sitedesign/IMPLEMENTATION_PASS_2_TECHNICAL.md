# Implementation Pass 2 — Technical and Performance Cleanup

Date: 2026-08-26  
Scope: asset delivery, fonts, CSS cleanup, dependency review and production build health.

## Hero delivery

The approved `hero-approved-reference-cyan.png` remains the canonical visual fallback. Responsive WebP derivatives were generated from it and selected through `<picture>` sources without changing the composition.

| Asset | Bytes | Reduction from original |
|---|---:|---:|
| Original PNG fallback | 1,951,580 | — |
| 768px WebP | 42,642 | 97.8% |
| 1280px WebP | 104,104 | 94.7% |
| 1672px WebP | 170,084 | 91.3% |

Chrome selected the 768px WebP at 320px, the 1280px WebP at 1024px, and the 1672px WebP at 1280/1440px. The duplicate desktop/mobile presentation elements resolve to the same URL at each viewport, allowing request deduplication.

## Typography

Courier Prime is self-hosted with `font-display: swap`:

- `CourierPrime-Regular.ttf` — 71,188 bytes
- `CourierPrime-Bold.ttf` — 72,856 bytes
- OFL licence stored with the font files

The regular face is preloaded in the root layout. Chrome confirmed the family loaded successfully. Sora and Inter remain the established heading/body families.

## CSS and unused implementation cleanup

Removed confirmed-unused generated-hero selectors, animations, obsolete hotspot selectors and their obsolete media-rule references. The current stylesheet is 40,751 bytes. It is slightly larger than the 37,234-byte audited baseline because the responsive and accessibility correction layer added production rules; dead code was nevertheless removed rather than carried forward.

Recoverably archived confirmed-unused files:

- old PNG variants → `project-analysis/unused-assets/`
- `SectionReveal.tsx` → `project-analysis/unused-code/SectionReveal.tsx.archived.txt`
- unused Tailwind config → `project-analysis/unused-config/tailwind.config.ts.archived.txt`

These files were moved, not permanently deleted.

## Dependencies and security

- Removed unused `framer-motion` and `tailwindcss`
- Removed the unused Tailwind PostCSS plugin
- Updated Next.js from 15.3.0 to 15.5.23
- Updated direct PostCSS to 8.5.23
- Critical audit finding eliminated in the successful post-update audit
- Three high-severity findings remain in nested Next.js build dependencies (`postcss` and `sharp`); npm's automatic remedy requires the breaking Next.js 16 major update, which was intentionally deferred for a controlled migration

The final online audit retry was unavailable because the registry endpoint could not be reached; the finding counts above come from the successful audit immediately after the dependency update.

## Build and technical verification

- TypeScript check: PASS
- Next.js production build and static export: PASS on Next.js 15.5.23
- Static pages generated: 15
- Shared first-load JavaScript reported by build: 103 kB
- Authored/exported route check: PASS
- ESLint: NOT CONFIGURED; the existing `next lint` command opens the interactive setup flow and no ESLint configuration is present

## Known technical limits

- The approved hero remains raster-based; older browsers may use the 1.95MB PNG fallback.
- Courier Prime is served as TTF rather than WOFF2 (144,044 bytes across two faces).
- The remaining audit findings require evaluation alongside a Next.js 16 migration.
- No real-device, assistive-technology or automated pixel-diff suite is included in this pass.
