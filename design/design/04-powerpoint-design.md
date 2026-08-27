# PowerPoint and Presentation Design — Professional Slide Craft

A great presentation is not a document with slides. It is a visual argument — each slide serves one purpose, advances one idea, and drives the audience toward one conclusion. This file covers technical setup, design execution, storytelling structure, and quality control for PowerPoint and Keynote.

---

## Initial Setup — Before Adding Any Content

Get these settings right before touching a single slide. Fixing them later breaks your layout.

### Slide dimensions
- **File → Design → Slide Size → Custom Slide Size**
- **Widescreen (recommended):** 33.87 cm × 19.05 cm
- **Standard 4:3 (legacy):** 25.4 × 19.05 cm
- Set dimensions as your **absolute first action** in a new file

### Units and measurement
- **File → Options → Advanced → Display** → Show measurements in: **Centimeters**
- **View → Ruler** ✓ — activate the ruler
- **View → Gridlines** ✓ — visual grid reference
- Grid spacing: 0.25 cm (fine-grained placement)

### Smart Guides and custom guides
- **View → Guides → Smart Guides** ✓ — auto-alignment snapping
- Add custom margin guides: **Alt + drag** a guide from ruler
- Set guides at: 1.5–2.0 cm from each edge (your safe zone boundaries)
- Name saved guides in your template so collaborators see them

---

## Master Slides — The Foundation of Consistency

Master Slides are the single most important PowerPoint feature for professional work. Every logo, font setting, placeholder position, background, and page number should live in the Master — never on individual slides.

### How to access
**View → Slide Master**

### What belongs in the Master
- Logo position and size (insert as image in Master — never on individual slides)
- Footer with page number, document title, and date
- Background color or image
- Placeholder positions and styles (title, body, subtitle)
- Font definitions for each placeholder
- Color theme (Home → Design → Colors → Customize)

### Master slide hierarchy
```
Slide Master (top level)
├── Title Slide Layout
├── Content Layout (one column)
├── Two Content Layout (side by side)
├── Section Header Layout
├── Blank Layout
└── Custom Layouts (add as needed)
```

### Why this matters
If your logo needs to move 2px to the right, you change it in the Master → it updates on every slide. Without a Master, you make 40 individual edits and introduce inconsistencies.

---

## Text Boxes — Overflow Prevention

### Text box settings for every box you create
Right-click → Format Shape → Text Box:
- **Vertical alignment:** Top (for titles) / Middle (for short content)
- **Autofit:** "Resize shape to fit text" — lets the box grow downward
- **Never use** "Shrink text on overflow" — it hides the problem silently
- **Word wrap:** Always enabled

### The overflow workflow
1. Type your content
2. Check: is every word visible in the slide panel (not zoomed in)?
3. If not: shorten the content (not the font)
4. Zoom to 150% and verify all text boxes show complete content
5. In Slide Sorter view, scan every slide for layout consistency

### The 1-slide-1-idea rule
If content doesn't fit at the correct font size with proper margins, you have too many ideas on this slide. Split it. A second slide is always better than tiny, crowded text.

---

## Images — Quality and Placement

### Inserting images
- **Insert → Pictures → This Device** — always insert from file
- Never Copy-Paste from a browser — the resolution is lossy and unpredictable
- **Format preference:** SVG > PNG > JPG > never BMP or GIF

### Sizing and positioning
- **Right-click → Size and Position** → enter exact values (do not drag freehand for precision placement)
- **Lock aspect ratio** ✓ — never distort an image
- Minimum resolution: 150 DPI for print; 96 DPI for screen projection only

### Cropping
- Use **Crop to Shape** (Picture Format → Crop → Crop to Shape) for circular/rounded portrait photos
- Use **Remove Background** (Picture Format) for product images on transparent backgrounds
- Crop before sizing — do not scale down a poorly cropped image

### Image quality hierarchy
| Quality Need | Use |
|---|---|
| Charts, icons, logos | SVG (infinitely scalable) |
| Photos with transparency | PNG |
| Photographs | JPG at highest quality |
| Never use | BMP, GIF, TIFF in presentations |

---

## Shapes, Lines, and Visual Elements

### Rounded rectangles
- Corner radius: 0.2–0.4 cm for content cards and containers
- Corner radius: 0.3–0.6 cm for buttons and badges
- **Never** use extreme rounding (pill shapes) for rectangular content blocks

### Lines and dividers
- Weight: 1–2pt for dividers; 2–4pt for accent lines
- Never use dashed lines as decoration — only in diagrams/schemas
- Horizontal divider under slide title: 1pt, brand secondary color or neutral gray

### Shadows
If you use shadows at all (keep them minimal):
- Type: Drop Shadow only (never Outer Glow, Perspective, or Reflection)
- Settings: Blur 10–15pt, Distance 4–6pt, Opacity 20–35%
- **Consistency rule:** All elements with shadows must cast in the same direction

---

## Animations — Disciplined Use

### The rule of restraint
Animations add cognitive load. Every animation must serve the content — if you cannot articulate why an element animates, it should not animate.

### Permitted animations
| Animation | Use Case |
|---|---|
| **Appear** | Revealing bullet points one at a time |
| **Fade In** | Introducing images and charts gracefully |
| **Wipe** (single direction) | Revealing process diagrams step by step |

### Forbidden animations
- Spin, Bounce, Swivel, Flip, Grow/Shrink
- Any sound effects on slide transitions
- Animations slower than 0.6 seconds (boring) or faster than 0.25 seconds (jarring)
- Transitions on every slide — use transitions sparingly for major section breaks only

### Build-up strategy for complex diagrams
Reveal components of a process diagram one by one using **Appear** on a trigger. Set all to "On Click" so you control the pace. Never "On Previous" unless you have timed the presentation precisely.

---

## Presentation Structure — Storytelling Framework

A presentation without structure is a collection of slides. With structure, it becomes an argument.

### The 4-slide mandatory framework
1. **Title slide** — What this is and who you are
2. **Agenda / Overview** — What we will cover (sets expectations)
3. **Section dividers** — Mark clear transitions between major topics
4. **Closing slide** — Key takeaway + CTA + contact information

### SCQA structure (for business presentations)
- **Situation** — The context everyone agrees on
- **Complication** — What changed or what problem emerged
- **Question** — What decision or question does this raise?
- **Answer** — Your recommendation / key finding

Apply SCQA to each major section, not just the overall deck.

### Slide title as a message
Weak: "Q1 Results"  
Strong: "Q1 Revenue Grew 23% — Driven by Enterprise Segment"

The title should be a complete sentence or insight, not a label. The audience reads titles even when they tune out the presenter.

### Data story arc
1. Here is the current state (baseline)
2. Here is the problem or opportunity
3. Here are the options
4. Here is my recommendation and why
5. Here is how we execute it
6. Here is the expected outcome

---

## Slide Types and When to Use Each

| Slide Type | Purpose | Key Design Rule |
|---|---|---|
| **Title** | Open the deck | Full-bleed visual, large title, minimal text |
| **Agenda** | Set expectations | Simple list, icons for each item |
| **Section divider** | Navigate between topics | Brand color background, large section name |
| **Content with bullets** | Deliver structured info | Max 5 bullets, max 2 lines each |
| **Two-column** | Compare two things | Equal columns, clear column headers |
| **Full-image** | Emotional impact | Image fills slide, minimal text overlay |
| **Data/chart** | Present metrics | One chart per slide, clear title insight |
| **Quote** | Add authority | Large font, clear attribution, dark background |
| **Process/timeline** | Show steps or flow | Left-to-right flow, max 6 steps |
| **Closing** | End strong | CTA, contact info, next steps |

---

## Slide Navigation and Numbering

### Page numbers
- **Insert → Header & Footer → Slide Number** ✓
- Position: bottom-right corner
- Size: 12–14pt
- Color: neutral gray (not black — subtle)
- Do not show on Title slide (uncheck "Don't show on title slide")

### Section markers
- **Home → Section → Add Section** — organizes slides in the panel
- Sections make navigation and reordering much easier
- Name each section clearly — they appear in the outline view

---

## Pre-Publication Checklist

### Content review
- [ ] Every slide has exactly one key idea
- [ ] Slide titles are complete statements, not just labels
- [ ] No slide has more than 5 bullet points
- [ ] No bullet point exceeds 2 lines
- [ ] Deck opens with structure and closes with CTA

### Technical review
- [ ] Zoom to 150% — is all text fully visible on every slide?
- [ ] Slide Sorter view — is layout consistent across all slides?
- [ ] Slide Show from Beginning — do animations play correctly?
- [ ] File → Info → Check Accessibility (Office 365 built-in)
- [ ] File → Compress Pictures — reduce file size without visible quality loss
- [ ] File → Options → Save → **Embed fonts in the file** ✓
- [ ] Test on the target display (projector, screen, printed handout)

### Final export settings
- **PDF export:** File → Save As → PDF → Options → **"ISO 19005-1 compliant (PDF/A)"** for archival
- **For screen:** Standard quality
- **For print:** High Quality Print
- Do not export with "Optimize for minimum file size" — it degrades images

---

## Common Presentation Mistakes and Fixes

| Mistake | Fix |
|---|---|
| Reading slides aloud | Write slides for the audience to read; you speak what is not on the slide |
| Too many slides | One idea per slide — but make each slide count |
| Inconsistent formatting | Use Master Slides; lock all brand elements |
| Low-contrast text | Check all text with contrast checker — minimum 4.5:1 |
| Decoration for its own sake | Every element must serve the message |
| Starting with "Today I will..." | Start with the insight or problem — not the agenda |
| Ending with "Questions?" | End with your key takeaway + what you want the audience to do |

---

## Do's and Don'ts

| Do | Don't |
|---|---|
| Set canvas size before any content | Change slide size mid-project |
| Use Master Slides for logo and footer | Place logo on individual slides |
| Use "Resize shape to fit text" | Use "Shrink text on overflow" |
| Insert images from file | Paste images from browser |
| Lock aspect ratio on every image | Drag image corners freely |
| Write slide titles as insights | Use vague single-word titles |
| Embed fonts before sharing | Send PPTX without embedded fonts |
| Test on the actual projection screen | Only review on your laptop |

---

## Related Notes

- [[01-typography]] — Font choices, sizes, and weights for slides
- [[02-layout-spacing-canvas]] — Grid, margins, and overflow prevention
- [[03-color-and-branding]] — Color palette and contrast for presentations
- [[06-data-visualization]] — Charts and graphs in slide context
- [[07-visual-hierarchy-and-composition]] — Visual focus and slide composition
- [[05-pdf-document-design]] — Exporting and finalizing print-ready PDFs
- [[marketing/07-copywriting]] — Writing compelling slide titles and messaging
