# Performance & Core Web Vitals

> Every millisecond of delay costs conversions. This file covers measurable performance optimisation with direct UX and business impact.

---

## Table of Contents

1. [Why Performance Is a UX Problem](#1-why-performance-is-a-ux-problem)
2. [Core Web Vitals](#2-core-web-vitals)
3. [Next.js Image Optimisation](#3-nextjs-image-optimisation)
4. [Font Loading Strategy](#4-font-loading-strategy)
5. [JavaScript Bundle Optimisation](#5-javascript-bundle-optimisation)
6. [Caching Strategy](#6-caching-strategy)
7. [Perceived Performance](#7-perceived-performance)
8. [Performance Measurement](#8-performance-measurement)
9. [Performance Checklist](#9-performance-checklist)

---

## 1. Why Performance Is a UX Problem

```
Business impact of slow load times:
  53%   of mobile users abandon a page that takes >3 seconds to load (Google)
  1s    delay → 7% reduction in conversions (Akamai)
  100ms delay → 1% revenue impact at Amazon's scale
  0.1s  improvement → 8% lift in conversion (Deloitte / Vodafone study)

The user experience impact:
  < 100ms  → Feels instant
  100–300ms → Feels snappy
  300ms–1s  → User notices delay
  1–3s      → User attention begins to drift
  > 3s      → User considers leaving
  > 10s     → Most users have left

SaaS-specific:
  Trial signup funnel: every extra second of load time = fewer trial signups
  Dashboard load: slow dashboards are #1 support complaint for SaaS products
  Mobile users: 50–60% of SaaS traffic on mobile in 2025; desktop-only optimisation misses half your users
```

---

## 2. Core Web Vitals

Google uses these three metrics as ranking signals. They also directly correlate with conversion rate.

### LCP — Largest Contentful Paint (target: ≤ 2.5s)

**What it measures:** When does the largest visible element finish rendering?
**What it usually is:** Hero image, hero heading, or above-the-fold card.

```tsx
// Common LCP killers and fixes:

// ✗ KILLER: Large unoptimised hero image
<img src="/hero.jpg" />

// ✓ FIX: next/image with priority
import Image from 'next/image'
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={630}
  priority            // preloads the image — critical for above-fold
  placeholder="blur"  // shows blurred placeholder while loading
  blurDataURL={blurDataURL}
/>

// ✗ KILLER: Render-blocking fonts delaying text render
<link href="https://fonts.googleapis.com/..." rel="stylesheet" />

// ✓ FIX: next/font with display:swap (see Section 4)

// ✗ KILLER: Server component that fetches slow data blocks entire page
async function HeroSection() {
  const data = await slowDatabaseQuery()  // blocks LCP!
  return <h1>{data.headline}</h1>
}

// ✓ FIX: Use Suspense to stream — hero renders from static data immediately
function HeroSection() {
  return (
    <section>
      <h1>Your hero headline</h1>  {/* renders immediately */}
      <Suspense fallback={<StatsSkeleton />}>
        <HeroStats />              {/* streams in after */}
      </Suspense>
    </section>
  )
}
```

### INP — Interaction to Next Paint (target: ≤ 200ms)

**What it measures:** How quickly does the page respond to user interactions?
**What causes poor INP:** Long JavaScript tasks blocking the main thread.

```tsx
// ✗ KILLER: Synchronous heavy computation on click
function FilterPanel({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState('')

  function handleFilter(value: string) {
    // 10,000 items synchronously filtered → UI freezes
    const results = items.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredItems(results)
    setFilter(value)
  }
  // ...
}

// ✓ FIX 1: useDeferredValue — React defers non-urgent re-renders
function FilterPanel({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState('')
  const deferredFilter = useDeferredValue(filter)  // filter lags but input stays snappy

  const filtered = useMemo(
    () => items.filter(i => i.name.toLowerCase().includes(deferredFilter.toLowerCase())),
    [items, deferredFilter]
  )
  return <input value={filter} onChange={e => setFilter(e.target.value)} />
}

// ✓ FIX 2: Move to web worker for CPU-heavy tasks
// lib/workers/filter.worker.ts
self.onmessage = ({ data: { items, filter } }) => {
  const results = items.filter(i => i.name.includes(filter))
  self.postMessage(results)
}
```

### CLS — Cumulative Layout Shift (target: ≤ 0.1)

**What it measures:** How much does content jump around while loading?
**UX impact:** Clicking the wrong button because the page shifted = rage click.

```tsx
// ✗ KILLER: Image without dimensions causes reflow when it loads
<img src="/avatar.jpg" alt="User" />

// ✓ FIX: Always specify dimensions or use aspect-ratio
<Image src="/avatar.jpg" alt="User" width={40} height={40} className="rounded-full" />

// ✗ KILLER: Dynamic content inserted above existing content
function NotificationBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => { setShow(hasNotification) }, [])
  // Banner appearing pushes everything down!
  return show ? <Banner /> : null
}

// ✓ FIX: Reserve space even when empty
function NotificationBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => { setShow(hasNotification) }, [])
  return (
    <div className="min-h-[48px]">  {/* space always reserved */}
      {show && <Banner />}
    </div>
  )
}

// ✗ KILLER: Web fonts causing FOUT (Flash of Unstyled Text)
// ✓ FIX: font-display: swap + preload (see Section 4)
```

### TTFB — Time to First Byte (target: ≤ 800ms)

```
Improve TTFB:
  1. Use edge runtime for latency-sensitive routes
     export const runtime = 'edge'  // in route.ts or page.tsx

  2. Cache aggressively
     export const revalidate = 3600  // ISR: cache for 1 hour

  3. Database connection pooling (Prisma Accelerate, PgBouncer)
     Cold DB connections add 100–500ms

  4. Move origin closer to users
     Vercel/Cloudflare Workers: deploy at edge PoPs globally

  5. Reduce server-side work on the critical path
     Use Suspense to defer non-critical data to streaming
```

---

## 3. Next.js Image Optimisation

```tsx
import Image from 'next/image'

// Hero image (above fold) — always priority
<Image
  src="/hero-dashboard.png"
  alt="Product dashboard showing project overview"
  width={1200}
  height={720}
  priority
  sizes="100vw"
  className="w-full h-auto"
/>

// Avatar / user photo
<Image
  src={user.avatarUrl ?? '/default-avatar.png'}
  alt={`${user.name}'s avatar`}
  width={40}
  height={40}
  className="rounded-full"
/>

// Responsive image in a grid
<Image
  src={project.coverImage}
  alt={project.name}
  fill                    // fills the parent container
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>

// next.config.js — allow external image domains
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: '*.cloudinary.com' },
    ],
    formats: ['image/avif', 'image/webp'],  // serve modern formats
  },
}
```

---

## 4. Font Loading Strategy

```tsx
// app/layout.tsx — next/font eliminates layout shift from fonts
import { Inter, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',           // show fallback font until Inter loads
  variable: '--font-sans',   // CSS variable for Tailwind
  preload: true,
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],    // only load weights you use
})

// Custom/brand font
const brandFont = localFont({
  src: '../public/fonts/brand.woff2',
  variable: '--font-brand',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${brandFont.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

```css
/* tailwind.config.ts — map CSS vars to Tailwind font families */
fontFamily: {
  sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-mono)', 'monospace'],
  brand: ['var(--font-brand)', 'var(--font-sans)'],
}
```

---

## 5. JavaScript Bundle Optimisation

### Code Splitting

```tsx
// Dynamic import — load heavy components only when needed
import dynamic from 'next/dynamic'

// ✓ Lazy load a rich text editor (usually 100–500KB)
const RichTextEditor = dynamic(() => import('@/components/ui/RichTextEditor'), {
  loading: () => <EditorSkeleton />,  // show skeleton while loading
  ssr: false,                          // editor uses browser APIs
})

// ✓ Lazy load chart library
const AnalyticsChart = dynamic(() => import('@/components/features/AnalyticsChart'), {
  loading: () => <ChartSkeleton />,
})

// ✓ Load modals dynamically — they're often not needed on initial page load
const DeleteConfirmModal = dynamic(() => import('@/components/ui/DeleteConfirmModal'))
```

### Bundle Analysis

```bash
# Identify what's bloating your bundle
npm install --save-dev @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
# Opens treemap showing every dependency and its size
```

### Common Bundle Wins

```
Library substitutions (before → after):
  moment.js (330KB) → date-fns (tree-shakeable, ~20KB used)
  lodash (70KB full) → lodash-es (tree-shakeable) or native array methods
  chart.js (200KB) → recharts (tree-shakeable) for React specifically
  react-icons (full set) → import individual icons only

Barrel file warning:
  // ✗ Barrel imports — imports the entire icons library
  import { FiHome, FiUser } from 'react-icons/fi'  // if not tree-shaken = 500KB+

  // ✓ Direct imports — only loads what you use
  import FiHome from 'react-icons/fi/FiHome'
  import FiUser from 'react-icons/fi/FiUser'
```

---

## 6. Caching Strategy

```tsx
// Next.js fetch caching — granular control per request

// Static: cached indefinitely (CDN edge)
const siteConfig = await fetch('https://api/config', { cache: 'force-cache' })

// ISR: cached, revalidated in background every X seconds
const pricing = await fetch('https://api/pricing', {
  next: { revalidate: 3600 }   // 1 hour
})

// No cache: always fresh (for authenticated/personalised data)
const userDashboard = await fetch('https://api/dashboard', {
  cache: 'no-store'
})

// Tag-based revalidation: precise cache invalidation
const posts = await fetch('https://api/posts', {
  next: { tags: ['posts'] }
})
// Later, when a post is updated:
revalidateTag('posts')  // invalidates all fetches tagged 'posts'

// React Query client-side caching
const { data } = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  staleTime: 30_000,       // fresh for 30s — no refetch during this window
  gcTime: 5 * 60_000,      // keep in memory 5min after last subscriber
  refetchOnWindowFocus: true,  // refresh when user switches back to tab
})
```

---

## 7. Perceived Performance

Performance is not just about raw speed — it's about how fast the user *feels* the experience is.

```
Techniques that improve perceived performance:

1. OPTIMISTIC UI
   Show the result immediately; confirm/revert asynchronously.
   Clicking "Like" should show the like instantly — not after the API call.
   See [[06-loading-states-feedback]] for full patterns.

2. SKELETON SCREENS > SPINNERS
   Skeletons communicate the shape of incoming content.
   A spinner communicates only "something is happening."
   Skeletons reduce perceived wait time by ~15–20%.

3. INSTANT NAVIGATION (prefetch)
   Next.js prefetches <Link> components in the viewport automatically.
   Add prefetch={true} to manually trigger prefetch on hover.
   Result: navigating between pages feels instant.

4. PROGRESSIVE LOADING
   Show critical content first; defer secondary content.
   Dashboard: show key metrics immediately; load activity feed after.

5. LOADING INDICATORS WITHIN 100MS
   If a response takes >100ms, show a loading state.
   The human eye notices delays above 100ms.
   Never leave the UI in an ambiguous state.

6. TRANSITIONS
   Use CSS transitions (100–200ms) for state changes.
   Abrupt changes feel broken; smooth transitions feel polished.
   Framer Motion for complex animations; CSS for simple ones.
```

---

## 8. Performance Measurement

### Tools

```
DEVELOPMENT:
  Chrome DevTools Performance tab  → profile runtime performance
  Lighthouse (DevTools)            → score LCP/INP/CLS locally
  React DevTools Profiler          → find slow components
  Next.js built-in analytics      → useReportWebVitals()

PRODUCTION:
  Vercel Analytics (Speed Insights) → real user Core Web Vitals
  Google Search Console             → CWV data for your site
  PageSpeed Insights                → on-demand CWV + recommendations
  Sentry Performance                → transaction-level tracing
```

### Web Vitals Reporting

```tsx
// app/layout.tsx — report vitals to analytics
'use client'
import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to your analytics
    if (metric.rating === 'poor') {
      console.warn(`Poor ${metric.name}: ${metric.value}ms`)
    }
    // posthog.capture('web_vital', { name: metric.name, value: metric.value, rating: metric.rating })
  })
  return null
}
```

---

## 9. Performance Checklist

### Pre-Launch Performance Audit

**Images:**
- [ ] All images use `next/image`
- [ ] Hero/above-fold images have `priority` prop
- [ ] Images have explicit `width` and `height` (prevents CLS)
- [ ] `sizes` prop matches actual rendered sizes
- [ ] No images >200KB (use WebP/AVIF)

**Fonts:**
- [ ] Using `next/font/google` or `next/font/local`
- [ ] `display: 'swap'` on all fonts
- [ ] Only required subsets and weights loaded

**JavaScript:**
- [ ] `npm run build` output reviewed — page sizes reasonable (<200KB first load JS)
- [ ] Heavy components dynamically imported
- [ ] No `moment.js`; no full lodash; no barrel imports from icon libraries
- [ ] `ANALYZE=true npm run build` run — no unexpected large dependencies

**Caching:**
- [ ] Static pages have `revalidate` set appropriately (not force-dynamic)
- [ ] API routes that return static data use `cache: 'force-cache'`
- [ ] React Query `staleTime` set on all queries (not 0)

**Lighthouse scores (target):**
- [ ] Performance: ≥ 90
- [ ] Accessibility: ≥ 95 (see [[03-accessibility-inclusive-design]])
- [ ] Best Practices: ≥ 95
- [ ] SEO: ≥ 90

---

*Related notes: [[01-nextjs-react-best-practices]] | [[06-loading-states-feedback]] | [[03-accessibility-inclusive-design]] | [[07-mobile-responsive-design]] | [[qa-ui-ux-guide]] | [[02-seo]]*

*Last updated: 2026-04-15*
