# Color, Branding, and Visual Identity

Color is the most emotionally powerful design element. It communicates personality before a single word is read, signals hierarchy, guides attention, and creates brand recognition. This file covers color theory, palette construction, contrast requirements, brand identity, and dark mode.

---

## Color Theory Fundamentals

### The color wheel
- **Primary colors:** Red, Yellow, Blue — cannot be created by mixing
- **Secondary colors:** Orange, Green, Violet — two primaries mixed
- **Tertiary colors:** Red-orange, yellow-green, etc. — primary + secondary

### Key color properties
- **Hue** — the color itself (red, blue, green)
- **Saturation** — intensity/purity (vivid vs. muted/grayed)
- **Lightness/Value** — how light or dark (near-white to near-black)
- **Temperature** — warm (reds, oranges, yellows) vs. cool (blues, greens, purples)

### Color harmony schemes
| Scheme | Description | Use Case |
|---|---|---|
| Monochromatic | One hue, varied lightness/saturation | Minimal, elegant, safe |
| Analogous | Adjacent hues (e.g., blue + teal + cyan) | Harmonious, calming, cohesive |
| Complementary | Opposite hues (e.g., blue + orange) | High contrast, energetic |
| Split-complementary | One hue + two adjacent to its complement | Balanced tension |
| Triadic | Three equally spaced hues | Vibrant, playful, complex |

**For SaaS and corporate work:** Monochromatic or analogous with one accent color from a complementary hue. Avoid triadic — it requires expert control to not look chaotic.

---

## Color Palette Architecture

### The 4 mandatory color roles

| Role | Count | Usage |
|---|---|---|
| **Primary** | 1 color | Brand color, headings, CTAs, key accents |
| **Secondary** | 1–2 colors | Supporting elements, icons, dividers |
| **Neutral** | 3–5 shades | Backgrounds, body text, borders, surfaces |
| **Accent / Semantic** | 1–2 colors | Alerts, highlights, success/error states |

### The 60-30-10 rule
- **60%** Neutral (background, white space, body surfaces)
- **30%** Primary or Secondary (headings, UI elements, section backgrounds)
- **10%** Accent (CTAs, critical highlights, badges, indicators)

**The #1 beginner mistake:** Using the brand color everywhere. The brand color should be reserved — when everything is blue, nothing is blue.

### Palette construction workflow
1. Start with your primary brand hue
2. Generate a complete shade scale (50–950) using tools like Radix Colors or Tailwind palette
3. Define neutral grays (ideally slightly warm or cool-tinted — not pure gray)
4. Choose one accent for alerts/success/error states (typically green/red/amber)
5. Test all combinations for contrast before locking in

**Tools for palette building:**
- **Coolors.co** — quick palette generation
- **Oklch.com** — perceptually uniform color selection
- **Radix Colors** — production-ready UI color scales with dark mode built in
- **Realtime Colors** — test palette on a real page mockup

---

## Brand Color Shades — Building a Full Scale

A professional brand doesn't use just one hex value — it has a full shade scale:

```
Primary Blue scale example:
50:  #EFF6FF  ← backgrounds, subtle tints
100: #DBEAFE  ← hover states, badges
200: #BFDBFE  ← borders, rings
300: #93C5FD  ← icons on light backgrounds
400: #60A5FA  ← secondary interactive elements
500: #3B82F6  ← main brand color (the one in the logo)
600: #2563EB  ← hover states for primary
700: #1D4ED8  ← pressed/active states
800: #1E40AF  ← text on light backgrounds
900: #1E3A8A  ← dark headings on white backgrounds
950: #172554  ← deep dark mode backgrounds
```

---

## Contrast — Readability Standards

Insufficient contrast is the most common accessibility failure in design. Text that fails contrast requirements is not just inaccessible to users with visual impairments — it is also hard to read for everyone in bright light or on low-quality screens.

### WCAG 2.1 contrast requirements

| Context | Minimum (AA) | Enhanced (AAA) |
|---|---|---|
| Normal body text (< 18pt / < 14pt bold) | **4.5:1** | 7:1 |
| Large text (≥ 18pt or ≥ 14pt bold) | **3:1** | 4.5:1 |
| UI components and icons | **3:1** | — |
| Decorative elements | No requirement | — |

### Quick reference examples
| Combination | Ratio | Status |
|---|---|---|
| Black #000000 on white #FFFFFF | 21:1 | ✅ Perfect |
| Dark gray #333333 on white | 12.6:1 | ✅ Excellent |
| Medium gray #767676 on white | 4.54:1 | ✅ AA pass |
| Light gray #999999 on white | 2.85:1 | ❌ Fail — don't use |
| White text on yellow #FFD700 | 1.07:1 | ❌ Catastrophic |
| White text on mid-blue #3B82F6 | 3.0:1 | ✅ AA for large text only |
| White text on dark blue #1D4ED8 | 5.73:1 | ✅ AA for all text |

**Tools:**
- **coolors.co/contrast-checker** — quick hex pair check
- **WebAIM Contrast Checker** — webaim.org/resources/contrastchecker
- **Colour Contrast Analyser** (desktop app) — check any color on screen
- **Chrome DevTools** — built-in contrast checker in Elements panel

---

## Text on Backgrounds

### Dark text on light backgrounds (recommended default)
```
Heading text:     #111827  (near-black, not pure black — softer)
Body text:        #374151  (dark gray — comfortable for long reading)
Secondary text:   #6B7280  (medium gray — captions, labels)
Disabled text:    #9CA3AF  (light gray — must not carry critical info)
```
**Why not pure black (#000000)?** It creates harsh vibration on white backgrounds and looks heavy. #111827 or #1A1A2E provides the same visual weight with a softer feel.

### Light text on dark backgrounds (dark mode / hero sections)
```
Primary text:     #F9FAFB  (near-white — softer than pure white)
Body text:        #E5E7EB  (light gray — for long-form text on dark)
Secondary text:   #9CA3AF  (medium gray)
Subtle/disabled:  #6B7280  (darker gray)
```

### Text on images — mandatory overlay rules
Never place text directly on a photograph without an overlay. Complex backgrounds make text impossible to read reliably.

| Method | Use Case | Implementation |
|---|---|---|
| Dark overlay | Dark text on photo background | `rgba(0, 0, 0, 0.50–0.65)` |
| Frosted glass | Light UI on photo | `rgba(255, 255, 255, 0.85)` + `backdrop-filter: blur(12px)` |
| Gradient overlay | Hero sections | `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)` |
| Solid color block | Maximum legibility | Opaque background behind text |

---

## Gradients

### When gradients are appropriate
- Hero backgrounds on title slides or PDF covers
- Background fills for accent cards or callout boxes
- Progress bars and chart fills
- Decorative dividers

### When to avoid gradients
- Body text backgrounds (never)
- Buttons (a solid color communicates affordance better)
- Small or complex UI elements
- Anywhere the gradient color creates a contrast problem with overlaid text

### Rules for beautiful gradients
- Maximum **2 colors** in a gradient
- Hue difference: maximum 30–60° on the color wheel (don't mix opposites)
- Angle: 135° or 150° looks more dynamic than 0°/90°
- Avoid highly saturated neon gradients — they look cheap and unstable
- Use easing (ease-in, ease-out gradient) instead of linear for smoother transition
- Test: place white and dark text on each end — both should pass contrast

### Mesh gradients
Modern trend: multiple color points creating a fluid blended background. Tools: Mesher.io, Figma plugins. Use sparingly — only as full-page background decorations.

---

## Color Semantics (Status Colors)

In any UI or data visualization, these color associations are universal and must be respected:

| Meaning | Color | Hex Example |
|---|---|---|
| Success / Positive | Green | #16A34A |
| Warning / Caution | Amber/Orange | #D97706 |
| Error / Danger | Red | #DC2626 |
| Info / Neutral | Blue | #2563EB |
| Disabled / Inactive | Gray | #9CA3AF |

**Critical:** Never use red for positive values or green for negative — this causes immediate misreading, especially in financial contexts.

---

## Color for Different Brand Personalities

| Brand Type | Palette Direction | Examples |
|---|---|---|
| Corporate / Enterprise SaaS | Desaturated blues, grays, 1 blue accent | Salesforce, Linear, Notion |
| Startup / Innovation | Medium saturation, teal/indigo accent | Vercel, Railway, Framer |
| Academic / Research | Dark blue, burgundy, neutral | University brands, journals |
| Healthcare / Trust | Soft blue, white, mint green | Healthcare apps, insurance |
| Finance / Banking | Deep blue/navy, gold accent | Bloomberg, traditional banks |
| Consumer / Playful | Vibrant, warm, multiple colors | Duolingo, Headspace |
| Luxury / Premium | Black, white, gold or silver accent | High-end fashion, jewelry |
| Marketing / Sales | Energetic, high saturation, warm | HubSpot, advertising agencies |

---

## Brand Identity System

A brand is more than a logo. A complete brand identity includes:

### 1. Logo system
- **Primary logo** — full lockup (icon + wordmark)
- **Icon-only** — for small sizes, favicons, app icons
- **Wordmark-only** — when icon would be too small
- **Light and dark variants** — for each background type

### 2. Color palette
- Primary, secondary, neutral, semantic colors (documented with hex, RGB, CMYK)
- Usage rules for each color

### 3. Typography system
- Brand fonts (heading + body)
- Sizes and weights for each use case
- Web font fallbacks

### 4. Logo clear space
- Minimum clear space around logo = 1× the height of the "X" in the wordmark
- No other elements within this zone

### 5. Brand don'ts
Document what must never happen with the brand:
- Don't stretch or distort the logo
- Don't use off-brand colors
- Don't place logo on busy backgrounds without contrast
- Don't use drop shadows on flat logo

### 6. Brand voice + visual personality
Color and typography must align with tone of voice. A playful, conversational brand should not use heavy corporate navy. A serious fintech should not use bright cartoon colors.

---

## Dark Mode Color Design

Dark mode is not just inverting colors — it requires a completely separate color strategy.

### Background levels (dark mode layering)
```
Base surface:      #0F172A  (not pure black — harsh)
Elevated surface:  #1E293B  (cards, panels — slightly lighter)
High surface:      #334155  (modals, dropdowns — most elevated)
Border:            #475569  (subtle separation)
```

### Text hierarchy (dark mode)
```
Primary text:    #F1F5F9
Secondary text:  #94A3B8
Disabled text:   #475569
```

### Colors that work differently in dark mode
- **Shadows** become less visible — use subtle glow/border instead
- **Saturated colors appear brighter** — desaturate brand color slightly
- **Images** should have dark/transparent backgrounds (PNG preferred)
- **Charts** need adjusted colors — test all chart colors on dark background

---

## Checklist — Color Quality Control

- [ ] Primary color assigned and documented with hex codes
- [ ] 60-30-10 rule followed throughout the design
- [ ] Maximum 3 colors used on any single slide/page
- [ ] All text/background combinations checked for contrast (minimum 4.5:1 for body)
- [ ] No text placed directly on complex images without overlay
- [ ] Color not used as the only way to convey information (for accessibility)
- [ ] Semantic colors (red=error, green=success) used correctly and consistently
- [ ] Brand colors match the brand guidelines document
- [ ] Dark mode colors tested separately (not just inverted)
- [ ] Gradient tested for text contrast at both ends

---

## Do's and Don'ts

| Do | Don't |
|---|---|
| Reserve your brand color for key actions | Use brand color everywhere |
| Use a full shade scale (50–950) | Work with only 1 hex value per color |
| Test every text/background pair for contrast | Assume "it looks fine" |
| Use dark overlays on images with text | Place text on photos without overlay |
| Define semantic colors (success/error) | Use red/green inconsistently |
| Document all colors with hex codes | Use "eyeball" color matching |
| Use color to support hierarchy | Use color as the only hierarchy signal |

---

## Related Notes

- [[01-typography]] — Text color and contrast on various backgrounds
- [[07-visual-hierarchy-and-composition]] — Color as a hierarchy tool
- [[06-data-visualization]] — Color in charts and graphs
- [[08-saas-product-design]] — Color in UI components and states
- [[10-design-tokens-systems]] — Color tokens and theme variables
- [[12-accessibility-design]] — Color blindness, contrast, WCAG requirements
- [[marketing/08-brand-building]] — Brand identity strategy and positioning
