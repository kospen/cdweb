# Typography — Rules for Text in Presentations and Documents

Typography is the single most impactful design decision you make. Good typography is invisible — it guides the reader without announcing itself. Bad typography breaks trust, reduces comprehension, and makes your work look amateur regardless of the content quality.

---

## Type Scale — Size Hierarchy

### Standard sizes for 16:9 slides and A4 documents

| Element | Presentation (pt) | PDF/Document (pt) | Web (px) |
|---|---|---|---|
| Hero / Main Title | 40–48 | 24–28 | 48–64 |
| Subtitle | 28–32 | 18–20 | 32–40 |
| Section Heading (H2) | 22–26 | 14–16 | 24–30 |
| Subsection Heading (H3) | 18–20 | 12–14 | 20–24 |
| Body Text | 18–20 | 11–12 | 16–18 |
| Captions / Labels | 14–16 | 9–10 | 13–14 |
| Footnotes / Fine Print | 12–14 | 8–9 | 12 |

**Rule:** Never use more than 3 different font sizes on a single slide or page.

**Rule:** The ratio between heading and body should be at least 1.5× — if body is 18pt, heading should be 27pt+.

---

## Font Selection

### Recommended Pairings

| Context | Heading Font | Body Font | Character |
|---|---|---|---|
| Corporate / Enterprise | Inter | Inter (weight variation) | Clean, neutral, professional |
| Modern SaaS | Plus Jakarta Sans | DM Sans | Contemporary, friendly |
| Academic / PhD | Georgia | Source Sans Pro | Scholarly, readable |
| Minimalist | Helvetica Neue | Helvetica Neue Light | Timeless, authoritative |
| Warm / Startup | Nunito | Open Sans | Approachable, human |
| Editorial / Report | Playfair Display | Lato | Premium, editorial |
| Technical / Dev | JetBrains Mono | Inter | Code-forward, precise |

### How to find good pairings
- **Google Fonts Pairing:** fonts.google.com/knowledge — search by "pairing"
- **Fontpair.co** — curated combinations with preview
- **Typewolf.com** — real-world examples of type in use
- Rule of thumb: pair a geometric sans with a humanist sans, or a serif with a sans-serif

### The rules
- Maximum **2 font families** in one document
- **Sans-serif** for slides and digital materials — better screen rendering
- **Serif** acceptable only for long-form academic PDFs (body text in books/dissertations)
- Never mix two serif fonts or two decorative fonts
- Avoid: Comic Sans, Papyrus, Curlz, Times New Roman in presentations
- Never use system fonts (Arial, Calibri) in designed materials — they signal "default"

---

## Font Weight (Weight Contrast)

| Weight | Value | Usage |
|---|---|---|
| Black / Heavy | 900 | Display headlines, hero numbers only |
| Bold | 700 | Headings, key terms, callouts |
| SemiBold | 600 | Subheadings, labels, navigation |
| Medium | 500 | UI elements, emphasized body text |
| Regular | 400 | All body text |
| Light | 300 | Captions, footnotes — only at ≥14pt |
| Thin | 100 | Decorative only — never for body text |

**Rule:** Never use Light weight below 14pt — illegible on projectors and when printed.

**Rule:** Weight contrast creates hierarchy. If two elements have the same size, use weight to differentiate importance.

---

## Line Height (Leading)

| Context | Line Height |
|---|---|
| Headings (1 line) | 1.0–1.2× |
| Subheadings | 1.2–1.3× |
| Body text (slides) | 1.4–1.5× |
| Body text (documents) | 1.5–1.7× |
| Bullet points | 1.3–1.5× |
| Code blocks | 1.6–1.8× |

**Why it matters:** Tight line height (below 1.2) on body text causes lines to visually merge. Excessive line height (above 2.0) breaks the visual connection between lines. 1.5× is the universal sweet spot for readability.

---

## Letter Spacing (Tracking)

| Context | Value |
|---|---|
| ALL CAPS headings | +0.05 to +0.1em — open up the spacing |
| Uppercase labels / UI | +0.05em |
| Normal headings | 0 to -0.01em |
| Body text | 0 (never adjust) |
| Small captions | +0.01 to +0.02em |

**Do NOT** stretch tracking on body text — it destroys word shape recognition and slows reading speed.

---

## Line Length (Measure)

The optimal line length for comfortable reading is **55–75 characters** per line (including spaces).

| Context | Target |
|---|---|
| Single-column document | 60–75 characters |
| Two-column layout | 45–60 characters |
| Slide body text | 8–10 words per line maximum |
| Bullet points | Maximum 2 lines per bullet |
| Wide web content | Never exceed 80 characters |

**Why:** Eyes fatigue when tracking long lines. Too short = too many line breaks = choppy reading. The eye should return to the left margin at a comfortable rhythm.

---

## Typographic Hierarchy in Practice

### Example: Presentation slide structure
```
SLIDE TITLE (Bold 36pt)                    ← Level 1 — draws eye first
Subtitle or context line (Regular 22pt)    ← Level 2 — orients the reader
• Key point one (Regular 18pt)             ← Level 3 — delivers content
  Supporting detail (Light 16pt)           ← Level 4 — supporting context
```

### Example: Business report page structure
```
Chapter Title (Bold 24pt)                  ← H1 — new section anchor
Section Heading (SemiBold 16pt)            ← H2 — topic grouping
Subsection (SemiBold 13pt)                 ← H3 — detail level
Body copy (Regular 11pt, 1.6 line height)  ← P — reading content
Caption text (Italic 9pt)                  ← Small — figure description
```

---

## Common Typography Mistakes

### The "shrink to fit" trap
Never shrink font size to fit more content into a space. If your text doesn't fit, the content is too dense — rewrite or split across multiple slides/pages.

### Centered body text
Center alignment works only for short headlines (3–5 words). Never center paragraph text — it creates an uneven left edge that forces the eye to search for where each line starts.

### All caps for long strings
ALL CAPS for more than 3–4 words destroys readability. Word recognition relies on the silhouette (ascenders and descenders) of words — caps eliminate this.

### Pseudo-bold / faux styling
Never apply bold via CSS `font-weight: bold` to a font that has no true bold variant. Use the actual bold typeface file. Faux bold and faux italic look visually broken.

### Justified text in slides
Never use justified (full-width) alignment in presentations — it creates unpredictable word spacing that looks machine-generated and awkward.

---

## Typography for SaaS UI

For interface text in web apps and dashboards:
- **Base size:** 14–16px (16px is the browser default — work from this)
- **Minimum size:** 12px (labels and metadata only — never UI critical text)
- **Line height in UI:** 1.4–1.5 for body; 1.2 for compact components
- **Font stack (fallback):** `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Monospace for data:** Use `JetBrains Mono` or `Fira Code` for numbers in tables and code

See: [[08-saas-product-design]] for full UI typography context.

---

## Checklist — Typography Quality Control

- [ ] Maximum 2 font families used in the document
- [ ] No more than 3 font sizes per slide/page
- [ ] Body text is Regular weight, minimum 11pt (docs) / 18pt (slides)
- [ ] Light weight not used below 14pt
- [ ] Line height is 1.5 or above for body text
- [ ] ALL CAPS used only for short labels/headings (never paragraphs)
- [ ] No horizontal stretching or compression of fonts (scale = 100%)
- [ ] No text placed directly on a complex/patterned image without overlay
- [ ] Long paragraphs are left-aligned, not centered or justified
- [ ] No more than 1 decorative font in the entire material
- [ ] Fonts embedded in final PDF/PPTX export

---

## Do's and Don'ts

| Do | Don't |
|---|---|
| Use weight to create hierarchy (Bold vs Regular) | Use color alone to show importance |
| Choose one font and vary weight | Mix 3+ font families |
| Keep body text at 1.5× line height | Squeeze line height to save space |
| Use sentence case for most headings | CAPITALIZE EVERY WORD IN HEADINGS |
| Left-align body text | Center long paragraphs |
| Embed fonts in exports | Save without font embedding |
| Test at 50% zoom to see overall density | Only review at 100% zoom |

---

## Related Notes

- [[02-layout-spacing-canvas]] — How type lives within grid and spacing systems
- [[07-visual-hierarchy-and-composition]] — How type size creates visual hierarchy
- [[03-color-and-branding]] — Text contrast requirements and color on backgrounds
- [[08-saas-product-design]] — Typography in UI components and dashboards
- [[10-design-tokens-systems]] — Typography tokens (font sizes, weights, line heights as variables)
- [[12-accessibility-design]] — Minimum font sizes, contrast ratios for accessibility
- [[web-dev/03-accessibility-inclusive-design]] — WCAG typography requirements
