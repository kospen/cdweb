# PDF and Document Design — Reports, Proposals, Whitepapers, Dissertations

A professional PDF is not a printed PowerPoint. It is a self-contained reading experience that must work without a presenter, hold attention across many pages, and represent your brand or institution with authority. This file covers design setup, page architecture, typography, content structure, and export settings for business and academic documents.

---

## Tools and Workflow

### Recommended software by document type

| Document Type | Primary Tool | Alternative |
|---|---|---|
| Academic dissertation | Word (with proper Styles) / LaTeX | Google Docs with styles |
| Business report / Whitepaper | Affinity Publisher / InDesign | Canva Pro (for simpler layouts) |
| Pitch deck → PDF | PowerPoint → Export as PDF | Keynote → PDF |
| Marketing brochure | Affinity Publisher / Adobe InDesign | Canva Pro |
| Proposal / Offer document | Word with custom styles | Affinity Publisher |

### The "Word with Styles" approach
Most business documents are written in Word. The critical difference between amateur and professional Word documents:
- **Never** apply formatting directly (bold, font size, color) to individual paragraphs
- **Always** use Styles (Home → Styles) — Heading 1, Heading 2, Body Text, etc.
- This enables automatic Table of Contents, consistent formatting, and easy global updates

### Export quality settings
- **PDF quality:** Press Quality or High Quality Print (never "Screen" — lossy)
- **Color space:** RGB for digital distribution; CMYK for physical print
- **Embed fonts:** Always (otherwise readers without your font see substitutions)
- **Compress images:** Only if file exceeds 10MB and print quality is not critical
- **PDF/A:** Use for archival documents (dissertations, compliance filings)

---

## Page Architecture — Margins and Grid

### Margin system by document type

| Document Type | Top | Bottom | Left | Right |
|---|---|---|---|---|
| Academic (with binding) | 2.5 cm | 2.5 cm | 3.0 cm | 2.5 cm |
| Business report | 2.0 cm | 2.0 cm | 2.5 cm | 2.5 cm |
| Marketing brochure | 1.5 cm | 1.5 cm | 2.0 cm | 2.0 cm |
| Heavy visual PDF | 1.0 cm | 1.5 cm | 1.5 cm | 1.5 cm |

### Binding consideration
For documents that will be printed and bound (dissertations, annual reports), the left margin should be 3 cm minimum to prevent text from disappearing into the spine. For double-sided printing, use "mirror margins" — the binding margin alternates between left and right.

### Baseline grid
In professional page layout software (InDesign, Affinity Publisher):
- Set a baseline grid: 12–14pt (matching your body text line height)
- Snap all text frames to baseline
- Images should align to the baseline at their top and bottom edges
- This creates consistent vertical rhythm across all pages

---

## Typography Scale for Documents

### Cover page
| Element | Size | Weight |
|---|---|---|
| Document title | 28–36pt | Bold |
| Subtitle / Description | 16–20pt | Regular |
| Author / Organization | 12–14pt | Regular or Light |
| Date / Version | 11–13pt | Light |

### Internal pages
| Element | Size | Weight | Line Height |
|---|---|---|---|
| H1 — Chapter | 20–24pt | Bold | 1.2 |
| H2 — Section | 16–18pt | SemiBold | 1.3 |
| H3 — Subsection | 13–15pt | SemiBold | 1.3 |
| Body text | 11–12pt | Regular | 1.5–1.6 |
| Figure caption | 9–10pt | Regular / Italic | 1.4 |
| Footnote | 8–9pt | Regular | 1.3 |
| Pull quote | 14–16pt | Italic or SemiBold | 1.4 |
| Sidebar text | 10–11pt | Regular | 1.4 |

---

## Document Structure — Anatomy of a Professional PDF

### 1. Cover page
**Mandatory elements:**
- Document title (large, left or center aligned)
- Subtitle or description
- Logo / branding
- Author name and organization
- Date (month and year)
- Version number (if a working document)
- Confidentiality label (if needed)

**Design approach:**
- Cover has a different layout from internal pages — this signals "this is the entrance"
- Can use full-bleed background image with dark overlay + white text
- Or: bold color block with white text on one half, clean white on the other
- Minimum 2 cm text margin from any image or color edge

### 2. Executive summary (for reports 10+ pages)
- 1 page maximum
- 3–5 key findings or decisions
- Written so a busy executive who reads only this page understands the entire document

### 3. Table of contents
- Generate automatically (Word: References → Table of Contents)
- Include H1 and H2 levels only — H3 is too granular for TOC
- Page numbers right-aligned with dot leaders (........... 12)
- Never create a TOC manually — it breaks when page numbers change

### 4. Body sections
- Each major section starts on a new page (or uses a clear visual divider)
- Chapter openers can have a design treatment: full-width color band, large section number, title in display size

### 5. Appendices
- Supporting data, raw tables, methodology details
- Clearly labeled and referenced from the body text

### 6. Back cover or closing page
- Company/institution name, website, contact
- Copyright notice
- Document version and date
- QR code to related resources (optional)

---

## Cover Page Design Patterns

### Pattern 1: Split layout (corporate, conservative)
```
[Left half: brand color fill]          [Right half: white]
[Large white logo centered in left]    [Document title — black, large]
                                       [Subtitle]
                                       [Author / date]
```

### Pattern 2: Full-bleed photo (premium, visual)
```
[Full page: photograph with 50-60% dark overlay]
[Logo — top left, white]
[Title — bottom left, white, large]
[Subtitle — below title, smaller]
[Date / version — bottom right]
```

### Pattern 3: Minimal (startup, modern)
```
[White background]
[Thin accent line across top — brand color]
[Logo — top left]
[Title — center-left, very large, dark]
[Subtitle — below]
[Bottom: author / date / version in small gray text]
```

---

## Multi-Column Layouts

### When to use multiple columns
- Newsletters and briefings
- Marketing brochures
- Technical data sheets
- Long-form articles with sidebars

### When NOT to use multiple columns
- Academic dissertations (single column is standard)
- Long-form narrative reports (harder to read across column breaks)
- Documents with many large images

### Column rules
| Columns | Gutter Width | Typical Use |
|---|---|---|
| 2 columns | Minimum 0.8 cm | Newsletters, brochures |
| 3 columns | Minimum 0.6 cm | Trifold brochures, catalogs |
| 4+ columns | Avoid on A4 | Too narrow for comfortable reading |

Text must flow correctly from column to column — link text boxes in InDesign/Publisher, or use section layouts in Word.

---

## Images and Figures in Documents

### Positioning options
| Position | Usage |
|---|---|
| **Inline** | Inside the text flow — shifts with text edits |
| **Floating (text wrap)** | Text wraps around the image — more layout control |
| **Full-column width** | Spans the entire text column width |
| **Full-bleed** | Extends to page edge (no margins) — only for impact pages |

### Captions — mandatory for academic and formal documents
- Required for every image, table, chart, and diagram
- Format: "Figure 1. Description of what is shown, including key insight."
- Position: immediately below the figure, left-aligned
- Font: 1–2pt smaller than body text, either italic or light weight
- Academic style: "Table 1" for tables, "Figure 1" for images/charts

### Image quality requirements
- Minimum 300 DPI for print
- Minimum 150 DPI for digital-only PDF
- PNG for screenshots, diagrams with text, logos
- JPG for photographs (maximum quality setting)
- Never scale images above 100% of original size (pixelation)

---

## Headers and Footers

### Header (appears on every page except cover)
| Element | Position |
|---|---|
| Logo | Left |
| Document title (shortened) | Right or Center |
| Separating line | 1pt, neutral gray, below header |

### Footer (appears on every page except cover)
| Element | Position |
|---|---|
| Page number | Center or Right |
| Document version / Date | Left (optional) |
| Copyright / Confidentiality | Center, smallest font |
| Separating line | 1pt, neutral gray, above footer |

**Rule:** Do not put critical information only in headers/footers — readers often print without them, and PDFs can be displayed without header area visible.

---

## Page Break and Typography Quality

### Orphans and widows
- **Orphan:** First line of a paragraph stranded alone at the bottom of a page
- **Widow:** Last line of a paragraph stranded alone at the top of a page
- **Fix in Word:** Paragraph settings → Line and Page Breaks → "Widow/Orphan control" ✓
- **Fix in InDesign:** Use Keep Options to control paragraph breaks

### Heading rules
- A heading must have at least 2 lines of following text on the same page
- If a heading falls at the bottom of a page, insert a manual page break before it
- Never: heading at bottom → body text on next page (visually disconnected)

### Page break control
| Rule | How |
|---|---|
| Chapter always starts on new page | "Page break before" in Heading 1 style |
| Table stays together | Table properties → "Keep table together" |
| Image stays with caption | Group image + caption, or use anchoring |

---

## Proposals and Business Documents — Special Considerations

### Proposal structure
1. **Cover page** — Document title, client name, date, your company
2. **Executive summary** — Problem, solution, outcome, investment (1 page)
3. **Understanding of the challenge** — Shows you listened; positions the solution
4. **Proposed solution** — What you'll do, how, and why
5. **Timeline / project plan** — Milestones, deliverables, dates
6. **Pricing / investment** — Clear breakdown, payment terms
7. **Team and credentials** — Who will do the work, why they are qualified
8. **Next steps** — Exactly what the client should do next (sign, call, etc.)

### Pricing presentation
- Present in a clean table with clear line items
- Group into logical categories (Setup, Monthly, Optional)
- Highlight the recommended option if multiple tiers
- Include a "What's included" checklist for each tier

---

## Pre-Publication Checklist

### Typographic quality
- [ ] No orphans or widows (single lines stranded at top/bottom of pages)
- [ ] No headings at the bottom of a page without following text
- [ ] No images cut by a page break
- [ ] Consistent body text size and line height throughout

### Technical quality
- [ ] Table of Contents accurate and auto-generated
- [ ] All hyperlinks tested after PDF export (not just in the source file)
- [ ] Fonts embedded in the PDF
- [ ] Spelling and grammar checked
- [ ] Print preview tested (especially margins near binding edge)
- [ ] Alt text added to all images (Accessibility)
- [ ] File size acceptable (compress if needed)

### Design quality
- [ ] Cover page is distinct and branded
- [ ] Headers and footers consistent on every internal page
- [ ] Section headings visually distinct from body text
- [ ] Images have captions
- [ ] Color use consistent with brand palette

---

## Do's and Don'ts

| Do | Don't |
|---|---|
| Use paragraph Styles — never direct formatting | Apply bold/font/size directly to text |
| Auto-generate Table of Contents | Type page numbers manually |
| Test all hyperlinks after PDF export | Assume links carry over correctly |
| Include captions for all figures | Leave figures without explanation |
| Embed fonts in PDF export | Share without font embedding |
| Set binding margin wider on the left | Use equal margins regardless of binding |
| Design the cover separately from body | Make cover look like a regular page |

---

## Related Notes

- [[01-typography]] — Font scale and hierarchy for long documents
- [[02-layout-spacing-canvas]] — Margin systems and baseline grids
- [[03-color-and-branding]] — Brand color use in document covers and accents
- [[06-data-visualization]] — Charts and tables within documents
- [[04-powerpoint-design]] — When to use PDF vs. presentation format
- [[12-accessibility-design]] — Accessible PDF structure, alt text, reading order
- [[marketing/07-copywriting]] — Writing compelling executive summaries and proposals
