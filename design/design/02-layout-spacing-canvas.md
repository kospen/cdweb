# Layout, Spacing, and Canvas — Rules Against Overflow and Visual Chaos

Layout is the skeleton of every design. Without a deliberate layout system, even great content and beautiful typography fall apart. This file covers canvas setup, grid systems, spacing principles, and the critical rules that prevent your designs from looking cluttered or broken.

---

## Canvas Setup — Formats and Dimensions

### Standard canvas sizes

| Format | Dimensions | Use Case |
|---|---|---|
| Widescreen 16:9 | 33.87 × 19.05 cm (1920×1080px) | Presentations, slides, screens |
| Standard 4:3 | 25.4 × 19.05 cm | Legacy projectors, printed handouts |
| A4 Portrait | 21 × 29.7 cm | Reports, proposals, dissertations |
| A4 Landscape | 29.7 × 21 cm | Wide tables, dashboards, timelines |
| US Letter | 21.59 × 27.94 cm | International business documents |
| Square | 1080 × 1080px | Social media, thumbnails |
| Stories / Reel | 1080 × 1920px | Instagram/TikTok assets |
| LinkedIn Banner | 1584 × 396px | Profile cover images |

**Critical rule:** Set your canvas format **before** adding any content. Changing it later shifts every element and breaks your layout.

---

## Safe Zone / Working Area

The safe zone is the area where content is guaranteed to be visible across all output methods (screens, projectors, print). Elements outside the safe zone risk being cut off, crowded against edges, or appearing unbalanced.

### Slides (16:9)
- **Minimum margin:** 1.5 cm from every edge
- **Recommended margin:** 2.0–2.5 cm from every edge
- **Title zone:** Upper third of the slide only
- **CTA / key message:** Lower third or center
- **Visual test:** Zoom out to 50% — if text looks "glued" to the edge, increase the margin

### PDF / A4 Documents
| Document Type | Top/Bottom | Left | Right |
|---|---|---|---|
| Academic | 2.5 cm | 3.0 cm (binding) | 2.5 cm |
| Business report | 2.0 cm | 2.5 cm | 2.5 cm |
| Marketing PDF | 1.5 cm | 2.0 cm | 2.0 cm |

**Never** place text within 1 cm of any edge. Even if the printer doesn't cut it off, it looks wrong.

---

## Grid Systems

A grid is an invisible structure that ensures all elements align consistently. Without it, you're placing elements by feel — which produces layouts that look "almost right" but never professional.

### 12-column grid (recommended universal)
The 12-column grid is the industry standard because 12 is divisible by 1, 2, 3, 4, and 6 — giving maximum layout flexibility.

| Element Span | Usage |
|---|---|
| 12 columns | Full-width headers, hero images |
| 8 columns | Main content, single-column text |
| 6 columns | Two-equal-column layout |
| 4 columns | Three cards / three stats in a row |
| 3 columns | Four items in a row |

**Gutter:** 0.3–0.5 cm between columns for presentations; 20–24px for web/screen designs.

### 8-point grid (for UI design)
All spacing values are multiples of 8px (or 4px for micro-adjustments):
- 4px — fine-grained internal padding
- 8px — compact spacing (inside buttons, tight lists)
- 16px — standard element spacing
- 24px — between related groups
- 32px — between major sections
- 48px — between page-level sections
- 64px — large breathing room / hero sections

This creates a mathematically consistent vertical and horizontal rhythm. See [[10-design-tokens-systems]] for tokenizing spacing.

### Baseline grid (for documents)
Set a baseline grid of 12–14pt in InDesign/Affinity. All text blocks snap to this grid, creating consistent vertical rhythm. Images should align to baseline top and bottom.

---

## Alignment Rules

Alignment is not just about aesthetics — it creates implied relationships between elements. Everything that shares an axis appears connected.

### The core rule
Every element on the canvas must align to at least **one other element** on at least **one axis**. Random floating elements signal that design was not intentional.

### Alignment hierarchy
1. **Align to grid first** — the grid defines zones
2. **Align to other elements second** — optical grouping
3. **Never align by eye** — always use alignment tools

### Practical rules
- Body text in columns: always **left-aligned** (never justified in slides)
- Slide title: either left or center — pick one and never mix within a deck
- Numbers in tables: **right-aligned** (decimal points line up)
- Icons next to text: align to the **cap-height** of the text, not the baseline
- Multiple cards in a row: align to top edge (not baseline) for visual consistency

---

## White Space (Negative Space)

White space is not "empty" space — it is an active design element. It creates breathing room, emphasizes important elements, and signals premium quality. Crowded designs feel cheap and anxious. Spacious designs feel confident and authoritative.

### Spacing hierarchy within a slide or page
| Relationship | Spacing |
|---|---|
| Between sections | At least 1.5× the text height |
| Between heading and content | 0.5–0.8 cm |
| Between bullet points | 0.3–0.5 cm additional spacing |
| Around images | Minimum 0.5 cm clearance from text |
| Between grouped elements | Less space (they belong together) |
| Between unrelated groups | More space (they are separate) |

### The 30% rule
At least **30% of any slide or page should be white space**. If you are filling every corner, you have too much content — remove, condense, or split.

### The overcrowding test
Squint your eyes and look at the slide. If it looks like a gray blur with no clear focal point, it is overcrowded. One thing should pop out — if nothing does, you have too much competing for attention.

---

## The Overflow Problem — Text Outside Canvas

This is the most common and most damaging layout error in presentations. Text that extends beyond the canvas edge is invisible in presentation mode, cropped when printed, and signals a broken design to the audience.

### Why it happens
1. Text box has a fixed height with auto-fit disabled
2. Font is too large for the container
3. Too much content for one slide
4. Content was pasted from a different-size template

### Prevention rules
- **PowerPoint:** Format Shape → Text Box → **"Resize shape to fit text"** (not "Shrink text on overflow")
- Never rely on auto-shrink — it hides the problem instead of solving it
- Zoom to 150% and verify every text box shows complete text
- **The real fix:** Rewrite the text to be shorter, or split into two slides

### The 1 slide = 1 idea rule
If your content doesn't fit at the proper font size with proper margins, you have too many ideas on one slide. This is a content problem, not a design problem. Splitting forces clarity.

---

## Z-Order (Layering) — What Goes On Top Of What

When elements overlap, their stacking order determines what is visible. The correct layering order from bottom to top:

1. **Background** — solid color or image fill
2. **Color shapes / blocks** — brand-colored rectangles, overlays
3. **Decorative elements** — texture, pattern overlays
4. **Photos / images** — product shots, portrait photos
5. **Icons and illustrations**
6. **Text blocks** ← text is ALWAYS on top
7. **Highlight elements** — badges, callout boxes, annotations

**Critical rule:** Text must always be above images. Never place an image on top of a text block.

---

## Consistency Across Slides/Pages

Consistency is what transforms a collection of slides into a professional presentation. Every inconsistency forces the audience to re-orient — stealing cognitive bandwidth from your content.

### Non-negotiable consistency rules
- **Title position:** Same X and Y position on every slide — use Master Slides
- **Page numbers:** Same position (bottom-right), same size, same color, every page
- **Logo/branding:** Same position (bottom-left or top-left), same size, every page
- **Margins:** Never deviate from the safe zone margins you set at the start
- **Heading style:** Same font, same size, same color across the entire deck
- **Bullet style:** Same indent, same bullet character, same spacing throughout

### Testing for consistency
View → Slide Sorter (PowerPoint) or the thumbnail panel (Figma/Keynote). At a glance, your deck should look like a unified family — not a patchwork of different layouts.

---

## Layout Patterns for Common Slide Types

### Title slide
```
[Full bleed background image or color block]
[Brand logo — top left]
[Main title — left aligned, lower-center area, large]
[Subtitle — below title, smaller]
[Author / date — bottom left]
```

### Content slide (two-column)
```
[Title — top, full width]
[Left column: 6 col — text/bullets]   [Right column: 6 col — image/chart]
[Footnote / page number — bottom]
```

### Data/chart slide
```
[Title — top]
[Subtitle context: "Q1 2026 vs Q1 2025" — below title]
[Chart — center, 80% of slide width]
[Source / footnote — bottom left, small]
```

### Quote slide
```
[Background — dark or brand color]
[Large opening quotation mark — decorative]
[Quote text — center, large, white]
[Attribution — below quote, smaller, italic]
```

---

## Checklist — Layout and Spacing

- [ ] Canvas format set before any content was added
- [ ] Safe zone margins defined and respected (minimum 1.5 cm)
- [ ] 12-column or 8pt grid applied
- [ ] All elements align to at least one other element
- [ ] At least 30% white space on each slide/page
- [ ] No text extends outside the canvas boundary
- [ ] Z-order correct (text on top, background at bottom)
- [ ] Title position is consistent across all slides
- [ ] Logo and page numbers are consistent across all slides
- [ ] Alignment tools used — no manual pixel-nudging

---

## Do's and Don'ts

| Do | Don't |
|---|---|
| Set canvas format first | Change canvas size after content is added |
| Use grid guides for alignment | Align elements by eye |
| Leave 30%+ white space | Fill every available corner |
| Group related elements (proximity) | Scatter elements randomly |
| Use "Resize to fit" on text boxes | Use "Shrink text on overflow" |
| Maintain consistent margins throughout | Vary margins slide by slide |
| Zoom to 150% to check overflow | Assume content fits without checking |

---

## Related Notes

- [[01-typography]] — How font size interacts with line length and grid
- [[07-visual-hierarchy-and-composition]] — Gestalt principles and visual balance
- [[04-powerpoint-design]] — PowerPoint-specific grid and guide setup
- [[08-saas-product-design]] — 8pt grid and spacing systems for UI design
- [[10-design-tokens-systems]] — Spacing values as design tokens
- [[11-responsive-mobile-design]] — How layout adapts across screen sizes
- [[web-dev/01-nextjs-react-best-practices]] — CSS grid and layout in code
