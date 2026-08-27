# Iconography and Illustration Guidelines

Icons and illustrations are not decoration. Used correctly, they communicate meaning faster than text, reduce cognitive load, and give a product visual personality. Used incorrectly, they add visual noise, confuse users, and signal inconsistency.

---

## Icons — Function First

An icon's primary job is to communicate meaning instantly. Secondary job: reinforce brand personality. Never primary job: look interesting.

### When to use icons
- Navigation items (especially mobile — where labels compete for space)
- Action buttons (when the icon is widely understood: trash = delete, pencil = edit, x = close)
- Status indicators (check = success, warning triangle, info circle)
- Feature highlights in marketing materials
- Alongside text labels in UI (icon + label is always safer than icon alone)

### When NOT to use icons
- As the only label for non-universal actions (you must test whether users understand it)
- When a word communicates faster (in complex UIs, labels beat icons)
- As decoration to fill whitespace
- When you cannot find a coherent icon for every item in a set (mismatched is worse than no icons)

---

## Icon Sets — Choosing and Using

### The cardinal rule: one style, one set
Never mix icon styles. Mixing a flat icon with an outlined icon with a filled icon on the same interface looks broken — even if the individual icons are beautiful.

### Icon style categories

| Style | Description | Personality | Example Libraries |
|---|---|---|---|
| **Outline** | Stroked, no fill | Clean, modern, technical | Heroicons, Lucide, Phosphor |
| **Filled** | Solid fill, no stroke | Bold, friendly, clear at small sizes | Heroicons Solid, Phosphor Fill |
| **Duotone** | Two-color fill | Premium, expressive | Phosphor Duotone, Remix Icons |
| **Rounded** | Soft corners on strokes | Friendly, approachable | Rounded Material Icons |
| **Sharp** | Geometric, precise angles | Technical, precise | Material Icons Sharp |
| **Hand-drawn** | Sketch-like | Playful, human, quirky | Doodle icons |

### Recommended icon libraries (free and production-ready)

| Library | Style | License | Best For |
|---|---|---|---|
| **Heroicons** | Outline + Solid | MIT | SaaS products, clean UIs |
| **Lucide** | Outline | ISC | Developer-friendly, consistent |
| **Phosphor Icons** | 6 styles | MIT | Maximum flexibility |
| **Remix Icon** | Line + Fill | Apache 2.0 | Large variety |
| **Tabler Icons** | Outline | MIT | 4,000+ icons, very consistent |
| **Material Icons** | Multiple | Apache 2.0 | Google ecosystem |
| **Feather** | Outline | MIT | Minimal, elegant |

**For Figma:** Use the Iconify plugin to access all major icon libraries directly in Figma.

---

## Icon Sizing

### Standard size scale
Icons should align to your spacing scale (8pt grid):

| Context | Size |
|---|---|
| Navigation tab bar (mobile) | 24px |
| Side navigation items | 20px |
| Inline with text (button, label) | 16px |
| Small inline indicator | 12px |
| Large feature icon (marketing) | 48–64px |
| Hero icon (empty state) | 80–96px |

### Icon-to-text alignment
When placing an icon next to text, align the icon to the **optical center** of the text — visually centered, not mathematically centered. Many icons appear to sit too high when math-centered because the visual weight is not at the geometric center.

### Touch targets
On mobile, icons used as buttons must have a touch target of at least 44×44px — even if the icon itself is 20px. Use padding to expand the interactive area:
```css
.icon-button {
  padding: 12px;  /* 20px icon + 24px padding = 44px total */
}
```

---

## Icon Color and Accessibility

### Color rules
- **Monochromatic icons:** Use one color per icon (matching the text color they accompany)
- **Semantic color:** Use green/red/amber only for status icons — not for general decoration
- **Brand color:** Use sparingly for featured or CTA-adjacent icons
- **Avoid multicolor icons** in UI components — they compete with content and are hard to theme

### Contrast requirements
Icons that convey information (not purely decorative) must meet **3:1 contrast ratio** against their background (WCAG 2.1 AA non-text contrast).

### Accessibility for icon-only buttons
```html
<!-- Always provide an accessible label -->
<button aria-label="Delete item">
  <svg><!-- trash icon --></svg>
</button>

<!-- Or use sr-only text -->
<button>
  <svg aria-hidden="true"><!-- trash icon --></svg>
  <span class="sr-only">Delete item</span>
</button>
```

---

## Creating Custom Icons

When the standard libraries don't have what you need, create custom icons. Rules for consistency with your existing set:

### Technical specifications
- **Canvas size:** 24×24px (standard) or 16×16px and 32×32px variants
- **Stroke weight:** Match your existing set (typically 1.5px or 2px at 24px)
- **Corner radius on strokes:** Match the set (0 = sharp, 1–2px = slightly rounded, 3–4px = rounded)
- **Export format:** SVG (infinitely scalable, file size tiny)
- **Viewbox:** Always `viewBox="0 0 24 24"` — standardizes the coordinate system

### Design principles for legible icons
1. **Simple:** Maximum 3–4 visual elements. Complexity disappears at 16px.
2. **Metaphor:** Match the mental model — "trash" for delete is universal; "wrench" for settings is universal; "puzzle" for extensions is universal
3. **Consistent style:** Same stroke weight, same corner radius as the set
4. **Test at small size:** Always preview at 16px — if it's unrecognizable, simplify
5. **Optical adjustments:** A triangle that's mathematically centered may look offset — adjust by eye
6. **Negative space:** The icon reads as much through its negative space as its positive forms

---

## Illustration — Personality and Depth

Illustrations communicate emotional tone and brand personality that photography and icons cannot. They are especially powerful for:
- Empty states (no data, no search results, errors)
- Onboarding welcomes and confirmations
- Marketing hero sections and feature explanations
- Error pages (404, 500)
- Complex concept explanations

### Illustration styles

| Style | Description | Brand Personality |
|---|---|---|
| **Flat** | Simple geometric shapes, flat color | Modern, clean, friendly |
| **Isometric** | 3D perspective, flat colors | Technical, structured, precise |
| **Line art** | Minimal strokes, no fill | Elegant, premium, editorial |
| **3D rendered** | Realistic 3D objects | High-end, polished, innovative |
| **Hand-drawn** | Sketchy, organic | Approachable, human, creative |
| **Character-based** | People/creatures as characters | Warm, story-driven, community |
| **Abstract** | Shapes, patterns, non-representational | Sophisticated, modern, flexible |

### Choosing an illustration style
- Must align with brand personality (a serious fintech should not use playful cartoon characters)
- Must be sustainable — can you consistently produce new illustrations in this style?
- Prefer styles that have good open-source or affordable stock sources if you cannot afford custom

### Illustration consistency rules
- One style throughout the entire product — never mix flat and 3D
- Consistent color palette (illustrations must use brand colors)
- Consistent line weight if using line art
- Consistent character design if using people (same face style, same body proportions)
- Same level of detail across all illustrations

### Sources for illustrations

| Source | Type | Cost |
|---|---|---|
| **Undraw.co** | Flat, customizable color | Free, MIT |
| **Storyset** | Character-based, animated | Free with credit, paid for commercial |
| **Humaaans** | Mix-and-match characters | Free |
| **Open Peeps** | Hand-drawn characters | Free |
| **Blush Design** | Multiple styles | Free tier + paid |
| **Icons8 Illustrations** | Many styles | Subscription |
| **Woobro** | 3D blobs | Free |

---

## Empty States — The Most Important Illustrations

Empty states appear when there is no content to show. Poorly designed empty states feel broken and abandoning. Well-designed empty states feel intentional and guiding.

### The three types of empty states
1. **First use:** User hasn't done anything yet — guide them to start
2. **User-cleared:** User deleted all items — confirm it's intentional, offer to add new
3. **No results:** Search or filter produced nothing — help user broaden their search

### Empty state anatomy
```
[Illustration — 80–120px height]
[Primary message — short, 3–8 words, friendly tone]
[Supporting text — 1–2 sentences max]
[CTA button — primary action to resolve the emptiness]
```

### Empty state copy tone
- **First use:** Welcoming, forward-looking. "Your projects will appear here" → "Create your first project"
- **User-cleared:** Neutral, non-judgmental. "No items yet" → "Add item"
- **No results:** Helpful, not apologetic. "No results for 'xyz'" → "Try a different search or clear filters"

**Never:** Leave a blank white area with no empty state design. It looks broken.

---

## Photography Guidelines

When using photos in design (presentations, marketing, documents):

### Photo selection criteria
- **Authenticity:** Real-looking situations over stock clichés (people smiling at computers)
- **Relevance:** Directly related to the content alongside it
- **Diversity:** Represent a range of people — skin tones, ages, backgrounds
- **Quality:** High resolution, professional lighting, clear subject

### Photo styling
- **Consistent color tone:** If you desaturate one photo, desaturate them all
- **Consistent crop:** All portraits cropped at the same level (shoulders up, waist up, etc.)
- **Consistent framing:** All landscape photos with similar aspect ratios
- **Overlay for text:** Any photo with text must have a dark or light overlay for contrast

### Sources
| Source | Cost |
|---|---|
| **Unsplash** | Free, high quality |
| **Pexels** | Free, varied quality |
| **Burst by Shopify** | Free, e-commerce focus |
| **Adobe Stock** | Paid, highest quality |
| **Getty Images** | Paid, premium commercial use |

---

## Icon and Illustration File Formats

| Format | Use Case | Why |
|---|---|---|
| **SVG** | All icons, simple illustrations | Infinitely scalable, tiny file size, styleable with CSS |
| **PNG** | Raster illustrations, photos with transparency | Good quality, transparent backgrounds |
| **WebP** | Web-optimized photos and illustrations | 30% smaller than PNG/JPG, modern browser support |
| **Lottie (JSON)** | Animated icons and illustrations | Smooth, lightweight, interactive animations |
| **GIF** | Avoid — use Lottie or video instead | Large file, limited colors, no transparency support |

---

## Icon and Illustration Checklist

### Icons
- [ ] All icons from the same family and style (no mixing)
- [ ] Consistent size across similar contexts (all nav icons 20px, all button icons 16px)
- [ ] Icon-only buttons have accessible labels (aria-label or sr-only text)
- [ ] All icons meet 3:1 contrast against their background
- [ ] Icons used in SVG format (not PNG)
- [ ] Custom icons tested at 16px — still recognizable?

### Illustrations
- [ ] One consistent illustration style throughout the product
- [ ] Illustrations use brand colors
- [ ] All empty states have designed illustrations + copy + CTA
- [ ] Illustrations are not purely decorative — they serve a function
- [ ] Illustrations are accessible (decorative = `alt=""`, meaningful = descriptive alt text)

---

## Do's and Don'ts

| Do | Don't |
|---|---|
| Use one icon style consistently | Mix outline and filled icons |
| Label icon-only buttons with aria-label | Use icon-only buttons without accessible labels |
| Test icons at 16px size | Assume complex icons work at small sizes |
| Design all empty states with illustration + copy + CTA | Leave blank white areas |
| Choose illustrations that match brand personality | Use mismatched styles across the product |
| Export icons as SVG | Export icons as PNG |
| Use consistent stroke weights across custom icons | Mix 1px and 2.5px strokes in the same set |

---

## Related Notes

- [[07-visual-hierarchy-and-composition]] — Icons as visual hierarchy elements
- [[03-color-and-branding]] — Brand color for icon and illustration palettes
- [[08-saas-product-design]] — Empty states, icon usage in UI components
- [[12-accessibility-design]] — Accessible alt text for icons and illustrations
- [[09-figma-workflow]] — Managing icon libraries in Figma with Iconify
- [[10-design-tokens-systems]] — Icon size tokens
- [[11-responsive-mobile-design]] — Touch target sizes for icons
