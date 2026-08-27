# Design Tokens and Design Systems

Design tokens are the single source of truth for all visual design decisions: colors, typography, spacing, shadows, border radii. They connect design tools (Figma) to code (CSS, JavaScript, native apps) so that a change in one place propagates everywhere. A design system built on tokens is the difference between maintaining one brand and maintaining 20 inconsistent implementations.

---

## What Are Design Tokens?

A design token is a named variable that stores a design decision:

```json
{
  "color-brand-primary": "#3B82F6",
  "font-size-body": "16px",
  "spacing-4": "16px",
  "border-radius-md": "8px",
  "shadow-card": "0 1px 3px rgba(0,0,0,0.12)"
}
```

Instead of hardcoding `#3B82F6` in 200 places in your codebase, you reference `color-brand-primary`. When the brand changes its blue, you change one token — and every element updates simultaneously.

### Why tokens matter for product teams
- **Consistency:** The button in the dashboard uses the exact same blue as the button in onboarding
- **Dark mode:** Tokens can have light and dark mode values — swap the entire theme by toggling one context
- **Multi-platform:** One token set generates CSS variables, iOS Swift constants, Android XML values, and Figma styles
- **Speed:** Designers and developers speak the same language ("use `spacing-6`" is unambiguous)

---

## Token Taxonomy — The Three Tiers

### Tier 1: Primitive tokens (raw values)
The complete set of all possible values — the palette. No semantic meaning. These are never used directly in components.

```json
{
  "blue-50": "#EFF6FF",
  "blue-100": "#DBEAFE",
  "blue-500": "#3B82F6",
  "blue-700": "#1D4ED8",
  "blue-900": "#1E3A8A",
  "gray-100": "#F3F4F6",
  "gray-500": "#6B7280",
  "gray-900": "#111827",
  "size-1": "4px",
  "size-2": "8px",
  "size-4": "16px",
  "size-8": "32px"
}
```

### Tier 2: Semantic tokens (decision layer)
Map primitives to their intended use. These are what components and styles reference.

```json
{
  "color-background-primary": "{blue-500}",
  "color-background-page": "{gray-100}",
  "color-text-default": "{gray-900}",
  "color-text-muted": "{gray-500}",
  "color-border-default": "{gray-200}",
  "color-status-success": "{green-600}",
  "color-status-error": "{red-600}",
  "spacing-component-padding": "{size-4}",
  "spacing-section-gap": "{size-8}"
}
```

### Tier 3: Component tokens (specific overrides)
For components that need unique values that deviate from semantic tokens. Use sparingly.

```json
{
  "button-primary-background": "{color-background-primary}",
  "button-primary-text": "{color-text-inverse}",
  "button-border-radius": "{border-radius-md}",
  "card-shadow": "{shadow-sm}",
  "input-border-color": "{color-border-default}",
  "input-focus-ring": "{color-brand-primary}"
}
```

---

## Complete Token Categories

### Color tokens

```json
// Brand
"color-brand-primary":    "#3B82F6"
"color-brand-secondary":  "#8B5CF6"
"color-brand-accent":     "#F59E0B"

// Text
"color-text-primary":     "#111827"
"color-text-secondary":   "#374151"
"color-text-muted":       "#6B7280"
"color-text-disabled":    "#9CA3AF"
"color-text-inverse":     "#FFFFFF"
"color-text-link":        "#2563EB"

// Backgrounds
"color-bg-page":          "#FFFFFF"
"color-bg-subtle":        "#F9FAFB"
"color-bg-muted":         "#F3F4F6"
"color-bg-inverse":       "#111827"

// Borders
"color-border-default":   "#E5E7EB"
"color-border-strong":    "#D1D5DB"
"color-border-focus":     "#3B82F6"

// Semantic / Status
"color-success":          "#16A34A"
"color-success-subtle":   "#DCFCE7"
"color-warning":          "#D97706"
"color-warning-subtle":   "#FEF3C7"
"color-error":            "#DC2626"
"color-error-subtle":     "#FEE2E2"
"color-info":             "#2563EB"
"color-info-subtle":      "#DBEAFE"
```

### Typography tokens

```json
// Font families
"font-family-sans":    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
"font-family-serif":   "Georgia, 'Times New Roman', serif"
"font-family-mono":    "JetBrains Mono, Fira Code, Consolas, monospace"

// Font sizes (use rem for web)
"font-size-xs":   "0.75rem"   // 12px
"font-size-sm":   "0.875rem"  // 14px
"font-size-base": "1rem"      // 16px
"font-size-lg":   "1.125rem"  // 18px
"font-size-xl":   "1.25rem"   // 20px
"font-size-2xl":  "1.5rem"    // 24px
"font-size-3xl":  "1.875rem"  // 30px
"font-size-4xl":  "2.25rem"   // 36px
"font-size-5xl":  "3rem"      // 48px

// Font weights
"font-weight-light":    300
"font-weight-regular":  400
"font-weight-medium":   500
"font-weight-semibold": 600
"font-weight-bold":     700

// Line heights
"line-height-tight":   1.2
"line-height-snug":    1.375
"line-height-normal":  1.5
"line-height-relaxed": 1.625
"line-height-loose":   2.0

// Letter spacing
"letter-spacing-tight":  "-0.025em"
"letter-spacing-normal":  "0em"
"letter-spacing-wide":   "0.025em"
"letter-spacing-wider":  "0.05em"
"letter-spacing-widest": "0.1em"
```

### Spacing tokens (8pt grid)

```json
"spacing-0":   "0px"
"spacing-px":  "1px"
"spacing-0.5": "2px"
"spacing-1":   "4px"
"spacing-2":   "8px"
"spacing-3":   "12px"
"spacing-4":   "16px"
"spacing-5":   "20px"
"spacing-6":   "24px"
"spacing-8":   "32px"
"spacing-10":  "40px"
"spacing-12":  "48px"
"spacing-16":  "64px"
"spacing-20":  "80px"
"spacing-24":  "96px"
```

### Border radius tokens

```json
"radius-none": "0px"
"radius-sm":   "4px"
"radius-md":   "8px"
"radius-lg":   "12px"
"radius-xl":   "16px"
"radius-2xl":  "24px"
"radius-full": "9999px"  // pill / circle
```

### Shadow tokens

```json
"shadow-xs":  "0 1px 2px rgba(0,0,0,0.05)"
"shadow-sm":  "0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)"
"shadow-md":  "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)"
"shadow-lg":  "0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05)"
"shadow-xl":  "0 20px 25px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.04)"
"shadow-inner": "inset 0 2px 4px rgba(0,0,0,0.06)"
"shadow-none":  "none"
```

### Motion / Animation tokens

```json
"duration-instant": "0ms"
"duration-fast":    "100ms"
"duration-normal":  "200ms"
"duration-slow":    "400ms"
"duration-slower":  "600ms"

"easing-linear":      "linear"
"easing-in":          "cubic-bezier(0.4, 0, 1, 1)"
"easing-out":         "cubic-bezier(0, 0, 0.2, 1)"
"easing-in-out":      "cubic-bezier(0.4, 0, 0.2, 1)"
"easing-spring":      "cubic-bezier(0.34, 1.56, 0.64, 1)"
```

---

## Dark Mode Tokens

Dark mode is implemented by redefining semantic tokens for the dark context:

```json
// Light mode (default)
"color-bg-page":       "#FFFFFF"
"color-text-primary":  "#111827"
"color-border-default": "#E5E7EB"

// Dark mode overrides
"color-bg-page":       "#0F172A"
"color-text-primary":  "#F1F5F9"
"color-border-default": "#334155"
```

In CSS:
```css
:root {
  --color-bg-page: #FFFFFF;
  --color-text-primary: #111827;
}

[data-theme="dark"], .dark {
  --color-bg-page: #0F172A;
  --color-text-primary: #F1F5F9;
}
```

Components never hardcode colors — they use `var(--color-bg-page)`. Toggle the theme → everything updates. No component changes needed.

---

## Implementation in CSS

```css
/* In your global stylesheet or :root */
:root {
  /* Colors */
  --color-brand-primary: #3B82F6;
  --color-text-primary: #111827;
  --color-text-muted: #6B7280;
  --color-bg-page: #FFFFFF;
  --color-border-default: #E5E7EB;
  
  /* Typography */
  --font-family-sans: Inter, -apple-system, sans-serif;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --line-height-normal: 1.5;
  
  /* Spacing */
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  
  /* Border radius */
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.10);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
}

/* Usage in component */
.button-primary {
  background-color: var(--color-brand-primary);
  color: var(--color-text-inverse);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
}
```

---

## Tailwind CSS — Tokens as Config

If you use Tailwind CSS, tokens map to `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
          accent: '#F59E0B',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          500: '#6B7280',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '72px',
        '22': '88px',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      }
    }
  }
}
```

---

## Figma Token Setup — Token Studio Plugin

The **Tokens Studio for Figma** plugin (formerly Figma Tokens) is the standard tool for managing tokens in Figma:

### Setup workflow
1. Install "Tokens Studio for Figma" plugin
2. Create your token JSON structure in the plugin
3. **Apply tokens** to Figma styles — styles update automatically when tokens change
4. **Sync to GitHub** — tokens stored in a JSON file in your repository
5. Developers pull the token file; a build process (Style Dictionary) generates CSS/JS/Swift/Android values

### Token Studio → Style Dictionary → Code
```
Figma Tokens (tokens.json)
    ↓ (GitHub sync)
Token JSON in repo
    ↓ (Style Dictionary build process)
dist/
├── css/variables.css
├── js/tokens.js
├── ios/tokens.swift
└── android/tokens.xml
```

---

## What Makes a Design System

A design system is more than tokens. It is the complete infrastructure for consistent design and development:

| Layer | Contents |
|---|---|
| **Foundations** | Tokens: color, typography, spacing, radius, shadow, motion |
| **Components** | Buttons, inputs, cards, navigation, modals, tables, badges |
| **Patterns** | Form layouts, empty states, loading states, error pages |
| **Guidelines** | When and how to use each component; accessibility notes |
| **Documentation site** | Searchable, living reference for designers and developers |

### Design system governance
- **One owner** — someone is responsible for the system's health
- **Contribution process** — clear steps for adding new components
- **Versioning** — semantic versioning (v2.1.0) so teams know what changed
- **Changelog** — what changed in each version and why
- **Review before merge** — new components reviewed by design + engineering

---

## Checklist — Token and Design System Quality

- [ ] All colors defined as tokens (no hardcoded hex in components)
- [ ] Semantic tokens created as aliases to primitive tokens
- [ ] Dark mode tokens defined for all semantic surface and text tokens
- [ ] Typography scale tokenized (sizes, weights, line heights)
- [ ] Spacing follows 8pt grid — all values multiples of 4 or 8
- [ ] Tokens exported and synced to code repository
- [ ] CSS custom properties generated from token source of truth
- [ ] Figma styles linked to token values (not separate)
- [ ] Component library uses tokens (not hardcoded values)
- [ ] Design system has a changelog

---

## Related Notes

- [[09-figma-workflow]] — Managing tokens and styles in Figma
- [[03-color-and-branding]] — Color palette to tokenize
- [[01-typography]] — Typography scale to tokenize
- [[02-layout-spacing-canvas]] — 8pt spacing grid to tokenize
- [[08-saas-product-design]] — Components that consume tokens
- [[14-design-handoff]] — Handing token values to developers
- [[web-dev/01-nextjs-react-best-practices]] — Using CSS variables and Tailwind with tokens
