# Creative Destruction website audit — index

Audit date: 2026-08-25 (Europe/Sofia)  
Project root: `D:\CD site`  
Audited URL: `http://localhost:3000/`  
Audit mode: read-only

This directory is a durable snapshot of the Creative Destruction website exactly as it existed during the audit. The work is deliberately separated into two phases:

1. [`01-CURRENT-WEBSITE-AS-IS.md`](01-CURRENT-WEBSITE-AS-IS.md) — objective documentation of the current website. It describes what exists without recommending changes.
2. [`02-INDEPENDENT-UX-VISUAL-TECHNICAL-AUDIT.md`](02-INDEPENDENT-UX-VISUAL-TECHNICAL-AUDIT.md) — independent visual, UX, accessibility, content, responsive and technical assessment, followed by prioritised recommendations.

## Audit method

The snapshot combines four evidence sources:

- the actual rendered website in the user's open Google Chrome window;
- rendered/computed CSS and responsive measurements in Chrome;
- read-only inspection of the Next.js, React, CSS, content and configuration source;
- the design and web-development guidance stored under `D:\CD site\design`.

Chrome checks covered the homepage, all interior routes, both News articles, keyboard focus order, mobile navigation, console output and viewports at 1536, 1024, 768, 375 and 320 CSS pixels. Source checks covered the route tree, content model, assets, metadata, accessibility structure, existing static-export artifacts and TypeScript.

## Scope boundary

No website, source, content, package, configuration, asset, route, deployment or hosting setting was changed. No package was installed. The only files created by this audit are the Markdown documents in this directory.

The black circular `N` badge visible in some Chrome screenshots is the Next.js development indicator. It is not part of the Creative Destruction interface and is excluded from the visual assessment.
