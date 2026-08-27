# Responsive and Mobile Design Principles

Responsive design is not an afterthought — it is the starting point. More than 60% of web traffic is mobile. SaaS products are accessed from laptops, tablets, monitors, and phones. Designing only for desktop and then "making it work on mobile" produces broken experiences. This file covers responsive principles, breakpoints, mobile-first thinking, and touch interaction design.

---

## The Mobile-First Mindset

**Mobile-first** does not mean "design the mobile version first and then add features for desktop." It means designing under constraints first — small screen, touch input, slower connection, single task focus — and then expanding for larger screens.

Mobile forces clarity:
- Limited space → forces you to prioritize ruthlessly
- Touch interface → forces you to consider interaction design
- Slower connections → forces you to consider performance

Desktop benefits from mobile-first design because the content hierarchy has been validated at the smallest size.

### Three questions for every design element
1. Does this need to exist on mobile?
2. If yes, how does it adapt (hide, collapse, reorder, resize)?
3. Where does the user's thumb reach? (interaction zone)

---

## Breakpoints — The Standard System

Breakpoints are the screen widths at which the layout changes. Using standard breakpoints ensures compatibility with CSS frameworks and design tokens.

### Standard breakpoint scale

| Name | Width | Typical Device |
|---|---|---|
| `xs` | < 480px | Small phones (iPhone SE) |
| `sm` | 480px – 639px | Large phones (iPhone 14 Pro Max) |
| `md` | 640px – 767px | Small tablets in portrait |
| `lg` | 768px – 1023px | Tablets in landscape, large phones |
| `xl` | 1024px – 1279px | Laptops, small desktops |
| `2xl` | 1280px – 1535px | Standard desktop monitors |
| `3xl` | ≥ 1536px | Large monitors, wide displays |

**Tailwind CSS breakpoints** (industry standard baseline):
```css
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### When to add breakpoints
Do not add breakpoints at arbitrary widths. Add a breakpoint **only when the content breaks** at a specific size — when the design looks wrong, not when you think a device "needs" one.

### Content breakpoints vs. device breakpoints
A more modern approach: define breakpoints based on when the content looks bad, regardless of device size. "The sidebar needs to collapse when the viewport is narrower than 960px" is a content breakpoint, not a device assumption.

---

## Responsive Layout Strategies

### Strategy 1: Fluid grid
The layout always fills the available width, with columns stretching proportionally.
- Text columns get too wide on large screens (readability suffers above 75 characters per line)
- Works well for: full-bleed images, hero sections, dashboards that benefit from space

### Strategy 2: Fixed max-width with centered content
Content has a maximum width; beyond that width, it centers with padding on sides.
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px; /* side padding on small screens */
}
```
Best for: text-heavy content, articles, most application layouts.

### Strategy 3: Column collapse
Multi-column layouts collapse to single column on smaller screens.
```
Desktop: [Left 4 col] [Center 6 col] [Right 2 col]
Tablet:  [Left 5 col] [Right 7 col]
Mobile:  [Single column — full width]
```

### Strategy 4: Priority+ navigation
Navigation hides low-priority items under a "More" dropdown on smaller screens. The most important items always stay visible.

---

## The 4 Responsive Layout Patterns

| Pattern | Description | Use Case |
|---|---|---|
| **Mostly Fluid** | Multi-column on wide; stacks on narrow | General content pages |
| **Column Drop** | Columns drop below each other as viewport shrinks | Dashboard panels, sidebar layouts |
| **Layout Shifter** | Elements reorder completely between sizes | Complex content rearrangement |
| **Off Canvas** | Panels slide in from off-screen on mobile | Sidebar navigation on mobile |

---

## Mobile Navigation Patterns

### The hamburger menu (collapsible navigation)
- Reveal on tap: full-screen or side-panel overlay
- Always include a clear close affordance (X button or back gesture)
- List all navigation items vertically
- Group sub-items under expandable sections (accordion)

### Bottom navigation bar (mobile apps)
- Best for: primary navigation with 3–5 top-level destinations
- Always visible (unlike hamburger — no hunting)
- Active tab: filled icon + colored label
- Never use bottom nav on desktop — it looks wrong

### Tab bar patterns
```
Mobile:
[Dashboard] [Projects] [Team] [Settings]
↑ 48–56px tall, icons + labels visible

Desktop:
[Left sidebar with full menu]
```

### Breadcrumbs on mobile
- Show only current page and one level up: `← Projects`
- Not the full path — too much horizontal space

---

## Touch Interaction Design

Desktop uses a precise pointer (cursor). Mobile uses imprecise touch (finger). This completely changes interaction design rules.

### Touch target sizes

| Standard | Minimum Size |
|---|---|
| Apple HIG | 44 × 44 pt |
| Google Material | 48 × 48 dp |
| WCAG 2.5.5 (AAA) | 44 × 44 CSS px |
| WCAG 2.5.8 (AA, 2.2+) | 24 × 24 CSS px (with spacing) |

**Practical minimum:** 44×44px for anything interactive. Increase to 48–56px for primary actions.

### Tap target spacing
Adjacent targets need **8px minimum** spacing between them to prevent accidental taps. This is especially critical for:
- List items in tight lists
- Icon buttons in toolbars
- Tags/badges that are interactive

### Hover states on touch
Touch devices have no hover — any UI that relies on hover to reveal controls is broken on mobile:
- Instead of "show actions on hover" → show 3-dot menu or swipe to reveal
- Instead of "tooltip on hover" → tap to reveal tooltip or inline explanation
- Instead of "dropdown on hover" → tap to open dropdown

### Swipe gestures
Common patterns users expect:
| Gesture | Common Action |
|---|---|
| Swipe right on list item | Secondary action (e.g., mark as done) |
| Swipe left on list item | Destructive action (e.g., delete) |
| Pull down | Refresh |
| Swipe from left edge | Back navigation (iOS) |

**Always** provide a visible alternative for swipe actions — not all users discover gestures.

---

## Typography on Mobile

| Context | Mobile Size | Desktop Size |
|---|---|---|
| Page title (H1) | 24–28px | 36–48px |
| Section heading (H2) | 20–22px | 24–30px |
| Subsection (H3) | 17–19px | 20–24px |
| Body text | 16px (minimum) | 16–18px |
| Labels / captions | 13–14px | 12–14px |

**Minimum body text: 16px on mobile.** Smaller triggers auto-zoom on iOS when user taps a text field — which breaks the layout.

**Line length:** On mobile (320–390px wide), text naturally stays short. On tablets, constrain to 640px max for single-column text blocks.

---

## Spacing on Mobile

Mobile spacing is generally tighter than desktop — but not too tight. Thumb targets and breathing room must be maintained.

### Content padding (horizontal)
- Small phones (320px): 16px side padding
- Standard phones (375–428px): 16–20px side padding
- Tablets (768px): 24–32px side padding

### Vertical rhythm on mobile
- Section gap: 24–32px (desktop: 48–64px)
- Component gap: 12–16px (desktop: 16–24px)
- List item gap: 4–8px

### Stack order on mobile
When a multi-column layout collapses to single column, the order of elements matters:
1. **Primary content first** — the main thing the user is here to see
2. **Primary CTA second** — what they should do with it
3. **Supporting content third** — context, secondary info
4. **Navigation last** (if inline — fixed nav is separate)

---

## Images and Media on Mobile

### Responsive images
Never serve a 2000×1400px image to a mobile device with a 375px screen:
```html
<img 
  src="image-large.jpg"
  srcset="image-small.jpg 480w, image-medium.jpg 800w, image-large.jpg 1200w"
  sizes="(max-width: 480px) 100vw, (max-width: 800px) 80vw, 60vw"
  alt="Description"
/>
```

### Aspect ratios
- Define aspect ratios explicitly — prevents layout shift (CLS) when images load
- Common ratios: 16:9 (landscape), 4:3 (photo), 1:1 (square), 3:4 (portrait/mobile-first)
- Cards: often 3:2 or 16:9 for thumbnails

### Video
- Never autoplay video with sound on mobile
- Provide captions (not just for accessibility — many users watch without sound)
- Consider: does this video even make sense on a small screen?

---

## Forms on Mobile

Forms require extra care on mobile — keyboards cover content, fields are harder to tap, autocomplete behaviors vary.

### Mobile form rules
- **Single column only** — never two columns on mobile forms
- **Large input height:** 44–48px minimum for comfortable tapping
- **`autocomplete` attribute:** Always set for common fields (email, name, tel, address)
- **`inputmode` attribute:** Numeric fields → `inputmode="numeric"` (shows number pad, not full keyboard)
- **Avoid date pickers** that require multiple taps — use native `<input type="date">` on mobile
- **Keyboard type:**
  - Email → `type="email"` (shows @ key)
  - Phone → `type="tel"` (shows number pad)
  - Number → `type="number"` or `inputmode="numeric"`

### Scroll behavior with keyboards
When the keyboard appears, it covers the bottom portion of the screen. Ensure:
- Active input field scrolls into view above the keyboard
- Primary CTA button is not hidden behind keyboard
- Use `visualViewport` JavaScript API for advanced keyboard handling

---

## Performance — The Mobile Reality

Mobile devices are often on slower connections and have less processing power. Performance is a mobile design concern.

### Design decisions that affect performance
- **Image count and size** — more images = slower
- **Animation complexity** — complex CSS animations can cause jank on older phones
- **Web fonts** — each font weight is a separate file download; limit to 2 weights per family
- **Heavy JavaScript** — complex interactive components load slower on mobile

### Design principles for performance
- Design for **skeleton screens** (loading placeholders) rather than spinners
- Prefer **CSS animations** over JavaScript animations
- Use **system fonts** when performance is critical: `-apple-system, BlinkMacSystemFont, 'Segoe UI'`
- Optimize critical path: the content visible above the fold loads first

---

## Testing on Real Devices

Never assume the desktop browser responsive view is accurate. Always test on real devices or high-fidelity emulators.

### Testing checklist
- [ ] Test on actual phone hardware (not just browser resize)
- [ ] Test on both iOS Safari and Android Chrome
- [ ] Test with keyboard open (forms) — does layout adapt?
- [ ] Test tap target sizes with a physical thumb
- [ ] Test with slow network (Chrome DevTools → Network throttle → Slow 3G)
- [ ] Test in landscape orientation — does layout still work?
- [ ] Test with browser zoom at 150% (accessibility requirement)

---

## Checklist — Responsive Design Quality

- [ ] Mobile layout designed first (or tested early)
- [ ] All breakpoints explicitly defined in design
- [ ] Navigation collapses gracefully on mobile
- [ ] Touch targets minimum 44×44px for all interactive elements
- [ ] Adjacent targets have 8px+ spacing
- [ ] No interactions rely exclusively on hover
- [ ] Body text minimum 16px on mobile
- [ ] Single-column form layout on mobile
- [ ] Responsive image sizes defined
- [ ] Tested on real iOS and Android devices

---

## Do's and Don'ts

| Do | Don't |
|---|---|
| Design mobile layout explicitly | Assume desktop layout will "just scale down" |
| Use 44px minimum touch targets | Use 24px icon buttons without padding |
| Provide visible alternatives to swipe gestures | Rely on undiscoverable gestures |
| Test on real devices | Only test with browser resize |
| Use semantic input types (email, tel) | Use generic `type="text"` for all inputs |
| Hide secondary navigation in a hamburger | Show 8 nav items on a 375px screen |
| Define images with srcset | Serve desktop images to mobile |

---

## Related Notes

- [[02-layout-spacing-canvas]] — Grid systems and spacing that adapt responsively
- [[01-typography]] — Font sizes that scale across breakpoints
- [[08-saas-product-design]] — Mobile patterns for SaaS dashboards and forms
- [[12-accessibility-design]] — Mobile accessibility (touch targets, zoom)
- [[10-design-tokens-systems]] — Responsive spacing tokens
- [[web-dev/01-nextjs-react-best-practices]] — Responsive CSS implementation
- [[web-dev/02-performance-core-web-vitals]] — Mobile performance and Core Web Vitals
- [[web-dev/03-accessibility-inclusive-design]] — Mobile accessibility standards
