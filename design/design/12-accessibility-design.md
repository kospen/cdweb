# Accessibility in Design — Contrast, Font Sizes, Color Blindness, and Inclusive Design

Accessibility is not a feature — it is a quality standard. A design that works only for users with perfect vision, full motor control, and no cognitive differences is an incomplete design. In the EU and US, digital accessibility is increasingly a legal requirement. For SaaS products, inaccessible design means losing customers who can't use your product.

The standard: **WCAG 2.1 AA** (Web Content Accessibility Guidelines). This is the globally recognized minimum for professional digital products.

---

## The Four Principles of Accessibility (POUR)

### Perceivable
Users must be able to perceive all information — it cannot rely on a single sense.
- Text alternatives for non-text content (alt text, captions)
- Content works with different color combinations (not color-only signals)
- Text can be resized to 200% without loss of functionality

### Operable
Users must be able to operate all interactive elements.
- Full keyboard navigation — every action possible without a mouse
- No interaction requires specific physical gestures only (shake, pinch)
- Users get enough time (no forced time limits without extensions)
- No content that flashes more than 3 times per second (seizure risk)

### Understandable
Users must be able to understand the content and interface.
- Clear and simple language
- Error messages that explain what went wrong and how to fix it
- Consistent navigation — same controls in the same places

### Robust
Content must be interpreted reliably by assistive technologies.
- Valid, semantic HTML
- ARIA attributes where semantic HTML is insufficient
- Compatible with current and future assistive technologies

---

## Color Contrast — The Non-Negotiable

Contrast is the most commonly violated accessibility requirement and the easiest to fix.

### WCAG 2.1 contrast ratios

| Content Type | AA Minimum | AAA Target |
|---|---|---|
| Normal text (< 18pt or < 14pt bold) | **4.5:1** | 7:1 |
| Large text (≥ 18pt or ≥ 14pt bold) | **3:1** | 4.5:1 |
| UI components (buttons, inputs, icons) | **3:1** | — |
| Decorative elements (background patterns) | No requirement | — |
| Disabled elements | No requirement (cannot be activated) | — |
| Logotypes | No requirement | — |

### Quick contrast reference

| Combination | Ratio | WCAG Status |
|---|---|---|
| #000000 (black) / #FFFFFF (white) | 21:1 | ✅ AAA |
| #111827 / #FFFFFF | 18.1:1 | ✅ AAA |
| #374151 / #FFFFFF | 9.7:1 | ✅ AA + AAA |
| #6B7280 / #FFFFFF | 4.6:1 | ✅ AA (barely) |
| #9CA3AF / #FFFFFF | 2.5:1 | ❌ Fail |
| #FFFFFF / #3B82F6 (blue-500) | 3.0:1 | ✅ AA large text only |
| #FFFFFF / #2563EB (blue-600) | 4.6:1 | ✅ AA all text |
| #FFFFFF / #1D4ED8 (blue-700) | 5.7:1 | ✅ AA + small text |

### Contrast checking tools
- **WebAIM Contrast Checker** — webaim.org/resources/contrastchecker
- **Coolors Contrast Checker** — coolors.co/contrast-checker
- **Figma plugin: Stark** — checks contrast in your designs
- **Chrome DevTools** — Elements panel → click on text → Styles → Contrast ratio shows automatically
- **Colour Contrast Analyser** (free desktop app by TPGi) — check any color on your screen

### Common contrast mistakes
- Light gray text (#999, #aaa) on white — fails for body text sizes
- White text on mid-tone brand colors (typical blue: fails at small sizes)
- Text in form field placeholders — treated as "additional hint," but still needs 4.5:1 to be useful
- Disabled text — no requirement, but make the disabled state clearly visually distinct

---

## Color as the Only Signal — Never Do This

Never use color as the **only** way to convey information. Users who cannot distinguish colors (8% of men have some form of color vision deficiency) will miss the information entirely.

### Red/green problems
The most common color blindness is red-green (protanopia/deuteranopia). Red "error" and green "success" look identical.

**Fix every case where color is the only signal:**

| Bad | Good |
|---|---|
| Red border on error field | Red border + error icon + error text |
| Green "Success" toast | Green toast + checkmark icon + "Saved successfully" text |
| Red vs green chart bars | Chart bars with different patterns + labels + legend |
| "Blue means required" | Asterisk (*) + "(* required)" label |

### Practical tests
- **View your design in grayscale** — does all critical information remain clear?
- **Use Figma Stark plugin** → Color Blind Simulator — see your design as different types of color blindness
- **Chrome DevTools → Rendering → Emulate vision deficiencies** — test in browser

---

## Typography Accessibility

### Minimum font sizes
| Context | Minimum | Why |
|---|---|---|
| Body text (web) | 16px | Below this, iOS auto-zooms on input focus |
| Body text (document/PDF) | 11pt | Standard for print accessibility |
| UI labels and captions | 12px | Absolute minimum for any functional text |
| Footnotes | 9pt / 12px | Absolute minimum — critical info never in footnotes |

**Never** place important content in text below 12px/9pt.

### Text resizing
- All text must reflow correctly when the browser zoom is set to 200%
- Content must not be cut off, overlap, or require horizontal scrolling at 320px wide (the minimum viewport width)
- Avoid fixed pixel heights on text containers — use `min-height` or let containers expand

### Line length and readability
Cognitive accessibility benefit: optimal line length (55–75 characters) helps users with dyslexia, ADHD, and low reading confidence track lines without losing their place.

### Text spacing (WCAG 1.4.12)
Users must be able to override text spacing without loss of content:
- Line height ≥ 1.5× font size
- Letter spacing ≥ 0.12× font size
- Word spacing ≥ 0.16× font size
- No truncation when these are applied

---

## Focus States — Keyboard Navigation

Every interactive element must have a visible focus state — a clear indicator of which element is currently focused during keyboard navigation.

### Requirements
- **Never** use `outline: none` or `outline: 0` without providing an alternative visible focus indicator
- Focus ring must have at least 3:1 contrast against the adjacent colors
- Focus ring must be at least 2px thick (WCAG 2.2 enhanced)

### Design focus states intentionally
```css
/* Bad — removes focus */
button:focus { outline: none; }

/* Good — custom focus ring */
button:focus-visible {
  outline: 3px solid #3B82F6;
  outline-offset: 2px;
  border-radius: 4px;
}
```

In Figma: design the `:focus` state for every interactive component. It is a state that must be explicitly designed, not left to browser defaults (which often look poor) or — worse — removed entirely.

### Keyboard navigation order
- Tab order must follow a logical sequence (usually: left-to-right, top-to-bottom)
- Skip links: provide "Skip to main content" at the top of the page for keyboard users to bypass navigation
- Modals: when a modal opens, focus must move inside it; when closed, return to the element that triggered it
- Dropdowns: Arrow keys navigate inside; Escape closes; Enter selects

---

## Screen Readers — Semantic Structure

Screen readers convert visual design to audio. They rely entirely on semantic HTML and ARIA attributes.

### Semantic heading structure
```html
<h1>Page title — one per page</h1>
  <h2>Major section</h2>
    <h3>Subsection</h3>
    <h3>Another subsection</h3>
  <h2>Another major section</h2>
```

Never choose heading levels for visual size — use CSS for sizing. The heading hierarchy must be semantically logical, not visually driven.

### Alt text for images

| Image Type | Alt Text Approach |
|---|---|
| Meaningful image | Describe the content and context: "Bar chart showing 40% revenue growth in Q1 2026" |
| Decorative image | Empty alt: `alt=""` — screen reader skips it |
| Functional image (button) | Describe the action: `alt="Close dialog"` |
| Logo | Brand name: `alt="Acme Inc."` |
| Complex chart | Short alt + link to data table: `alt="Revenue chart" — see table below` |

### ARIA labels for UI components
When semantic HTML is not sufficient, ARIA provides context:
```html
<!-- Icon button with no visible label -->
<button aria-label="Delete item">
  <icon name="trash" />
</button>

<!-- Live region for dynamic content updates -->
<div aria-live="polite" aria-atomic="true">
  Saved successfully
</div>

<!-- Landmark regions -->
<nav aria-label="Main navigation">...</nav>
<main>...</main>
<aside aria-label="Related articles">...</aside>
```

---

## Forms — Accessible Implementation

### Required labeling
Every form field must have a visible, associated label:
```html
<!-- Correct: label associated with input -->
<label for="email">Email address</label>
<input id="email" type="email" />

<!-- Wrong: placeholder is not a label -->
<input type="email" placeholder="Email address" />
```

### Error messages
```html
<label for="email">Email address</label>
<input id="email" type="email" aria-describedby="email-error" aria-invalid="true" />
<div id="email-error" role="alert">
  Please enter a valid email address (e.g., you@example.com)
</div>
```
- Error message linked to field via `aria-describedby`
- `role="alert"` announces the error to screen readers automatically
- `aria-invalid="true"` signals to assistive tech that the field is in error state

### Fieldsets for related inputs
```html
<fieldset>
  <legend>Notification preferences</legend>
  <label><input type="checkbox" name="email-notif"> Email notifications</label>
  <label><input type="checkbox" name="sms-notif"> SMS notifications</label>
</fieldset>
```

---

## Color Blindness — Types and Design Impact

| Type | Prevalence | What they see differently |
|---|---|---|
| **Deuteranopia** (green-blind) | 5% of men | Red and green appear similar (most common) |
| **Protanopia** (red-blind) | 1% of men | Red appears very dark; red/green similar |
| **Tritanopia** (blue-yellow) | Very rare | Blue/green and yellow/red appear similar |
| **Monochromacy** (total) | Extremely rare | See only in grayscale |

### Color combinations to avoid (without secondary encoding)
- Red + Green (error vs. success states without icons)
- Blue + Purple (similar to many forms of color blindness)
- Yellow + Green (tritanopia issue)
- Orange + Red (protanopia issue)

**The rule:** Every color-based distinction must have at least one additional distinguishing feature: shape, pattern, position, label, or icon.

---

## Motion and Animation Accessibility

Some users experience nausea, dizziness, or seizures from certain animations.

### `prefers-reduced-motion`
```css
/* Default — animations enabled */
.button {
  transition: transform 200ms ease;
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
}
```

Design rule: all animations must be non-essential to understanding. The UI must be fully functional without them. Animations are enhancement, not architecture.

### Seizure risk: the 3-flash rule
Do not design content that flashes more than 3 times per second. This applies to:
- Animated GIFs with rapid color changes
- Video content with strobe effects
- Loading animations with rapid flashes

---

## PDF Accessibility

Accessible PDFs require:
- **Reading order:** Logical order for screen readers (set in InDesign/Acrobat tag structure)
- **Tagged PDF:** Required for screen reader compatibility — every element must be tagged
- **Alt text:** Every image must have alt text in the PDF properties
- **Document title:** Set the document title in PDF properties (not just the filename)
- **Bookmarks:** Long PDFs must have clickable bookmarks matching the TOC
- **Language:** Set document language in properties

---

## Accessibility Testing Checklist

### Automated checks (catch ~30–40% of issues)
- [ ] Run Lighthouse accessibility audit (Chrome DevTools → Lighthouse)
- [ ] Run axe DevTools browser extension
- [ ] Run WAVE (wave.webaim.org) on every page
- [ ] Check Figma designs with Stark plugin

### Manual checks (required — automation cannot catch everything)
- [ ] Navigate entire interface using only keyboard (Tab, Enter, Space, Arrow keys, Escape)
- [ ] All focus states visible and clear
- [ ] Test with screen reader: NVDA (Windows, free), VoiceOver (Mac/iOS, built-in), TalkBack (Android, built-in)
- [ ] All images have meaningful alt text (or empty alt for decorative)
- [ ] All form fields have visible labels
- [ ] All error messages are specific and linked to their fields
- [ ] Color contrast tested for all text/background combinations
- [ ] Test with color blindness simulator
- [ ] Test at 200% browser zoom — no horizontal scrolling, no content cut off
- [ ] Video content has captions
- [ ] No content flashes more than 3 times per second

---

## Do's and Don'ts

| Do | Don't |
|---|---|
| Use color + icon + text for status | Use color alone to signal status |
| Design visible focus states for every interactive element | Remove focus outlines with `outline: none` |
| Associate labels with form inputs using `for`/`id` | Use placeholder as the only label |
| Write specific error messages | Write "Invalid input" |
| Test with real screen readers | Trust only automated checker results |
| Design alt text as part of the content | Add alt text as an afterthought in code |
| Respect `prefers-reduced-motion` | Use animations as structural elements |

---

## Related Notes

- [[03-color-and-branding]] — Contrast ratios and WCAG-compliant color choices
- [[01-typography]] — Minimum font sizes and line height requirements
- [[08-saas-product-design]] — Accessible form and component patterns
- [[11-responsive-mobile-design]] — Mobile accessibility and touch target sizes
- [[09-figma-workflow]] — Accessibility checking with Stark plugin in Figma
- [[web-dev/03-accessibility-inclusive-design]] — Technical implementation of WCAG
- [[qa-testing/qa-ui-ux-guide]] — Accessibility QA testing process
