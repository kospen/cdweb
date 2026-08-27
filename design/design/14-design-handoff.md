# Design Handoff to Developers

Design handoff is the process of transferring a completed design to the development team for implementation. Done well, it eliminates guesswork, reduces revision cycles, and enables developers to implement designs accurately and efficiently. Done poorly, it produces implementations that "kind of look like the design" with random spacing, wrong fonts, and missing states.

This file covers what to prepare, how to communicate it, and how to use tools like Figma Dev Mode to make handoff precise and frictionless.

---

## The Mindset: Handoff Is a Communication Act

Design handoff is not "dumping files on developers." It is structured communication that answers:
1. What does this look like? (Visual spec)
2. How does it behave? (Interaction spec)
3. What are the exact values? (Technical spec)
4. What happens in edge cases? (State spec)
5. What are all the states? (Complete component spec)

A developer should never have to guess or "assume" anything from a well-prepared handoff.

---

## What Must Be Prepared Before Handoff

### 1. All states designed
Every component and screen must show all states:

| State | Must Be Designed |
|---|---|
| Default | ✅ Always |
| Hover | ✅ For all interactive elements |
| Focus (keyboard) | ✅ Visible focus ring required |
| Active / Pressed | ✅ For buttons and interactive elements |
| Loading | ✅ For anything that fetches data |
| Error | ✅ For forms, API calls, page loads |
| Success | ✅ For forms, confirmations, submissions |
| Empty | ✅ For every list, table, and data view |
| Disabled | ✅ For conditionally inactive controls |

### 2. All breakpoints designed
For responsive designs, show how each screen adapts:
- Desktop (1280–1440px)
- Laptop (1024px)
- Tablet (768px)
- Mobile (375–390px)

If a section only changes at one breakpoint, document that. If it doesn't change, note "same layout as desktop" — this is faster than making the developer check.

### 3. Annotation and specs
- All spacing values labeled (or developer can read from Figma Dev Mode)
- Component boundaries clearly defined (where does a component start and end?)
- Typography: font, size, weight, line height, color for each text element
- Colors specified as token names (not hex codes if tokens are in use)
- Interaction notes for complex behaviors

### 4. Assets ready for export
- Icons: SVG format, named semantically (`icon-trash.svg`, not `vector-47.svg`)
- Images: exported at correct sizes and format (WebP preferred for web)
- Illustrations: SVG where possible; PNG with exact pixel dimensions where not
- Logos: SVG with all variants (light, dark, icon-only)

---

## Figma Dev Mode

Figma Dev Mode (formerly Inspect panel) is the primary tool for design handoff. Developers switch to Dev Mode to see exact values without needing a designer to explain them.

### Enabling Dev Mode
- **Figma desktop/web:** Toggle the Dev Mode switch (top right) or press `Ctrl/⌘ + Option + D`
- Only available to users with Dev Mode access (typically all team members)

### What developers can see in Dev Mode
- **Exact dimensions:** Width, height in px
- **Position:** X/Y coordinates, alignment
- **Spacing:** Padding, gap between elements (if Auto Layout used)
- **Typography:** Font family, size, weight, line height, letter spacing, color
- **Colors:** Hex, RGB, color token name (if tokens are configured)
- **Border radius:** Exact values per corner
- **Shadows:** Full CSS shadow values
- **CSS output:** Dev Mode generates CSS properties for the selected element
- **Code snippets:** Copy as CSS, iOS Swift, Android XML

### Making Dev Mode useful — designer responsibilities
Dev Mode is only as useful as the design file is organized:
- Name all layers semantically (garbage layer names produce garbage inspector output)
- Use Auto Layout (generates `display: flex`, `gap`, `padding` in CSS output)
- Use Text Styles (generates named typography tokens)
- Use Color Styles / Variables (generates named color tokens)
- Group related elements in frames (clearer component structure)

---

## Figma Annotations — Documenting Behavior

Dev Mode shows values. Annotations explain behavior. Both are required.

### When to annotate

| Annotation Type | When Required |
|---|---|
| Interaction notes | Any click, hover, or touch that changes state |
| Animation specs | Transition type, duration, easing |
| Conditional logic | "This button only appears when X" |
| Content rules | "Maximum 2 lines — truncate with ellipsis" |
| Copy rules | Character limits, formatting requirements |
| Measurement callouts | When spacing between elements is not obvious from Dev Mode |

### Annotation tools in Figma
- **Built-in:** Use sticky notes (text boxes with yellow background) near the relevant element
- **Plugin: Figma Annotations** — structured annotation system
- **Plugin: Redline** — auto-generates measurement lines between elements
- **Plugin: Annotation Kit** — professional annotation components

### Interaction annotation format
```
INTERACTION: Button "Create Project"
Trigger: Click
Action: Opens modal overlay "New Project"
Animation: Fade in, 200ms ease-out
Dismiss: Click outside modal, or press Escape
Success: Modal closes, project appears at top of list
Error: Toast error message "Failed to create — try again"
```

---

## Component Documentation

Each component in the design system should have documentation that answers:

### Component spec template
```markdown
## Component: Button — Primary

### Variants
- Size: Small (32px) / Medium (40px) / Large (48px)
- State: Default / Hover / Active / Focus / Loading / Disabled

### Anatomy
- [Icon] Optional, 16px, 8px gap from label
- [Label] Required, Button/Label text style
- [Padding] 12px vertical, 20px horizontal (Medium)

### Behavior
- Loading state: Replace label with spinner, disable interaction
- Disabled state: 40% opacity, cursor: not-allowed, no pointer events
- Focus ring: 3px, brand primary, 2px offset

### Usage rules
- Use Primary for the single most important action per view
- Max 1 Primary button per section
- Never use Primary for destructive actions — use Destructive variant

### Accessibility
- aria-disabled="true" when disabled (not just CSS)
- aria-label required if icon-only variant
- Loading state announces "Loading" to screen readers via aria-live
```

---

## Spacing and Layout Handoff

### The token-first approach
Instead of annotating `padding: 16px`, annotate `padding: spacing-4`. This creates a shared language with developers who implement the same token in their code.

If tokens are not in use yet, use absolute px values but document them consistently.

### Auto Layout → CSS mapping
When Figma Auto Layout is used correctly, Dev Mode generates accurate CSS:

| Figma Auto Layout | CSS Generated |
|---|---|
| Horizontal direction | `display: flex; flex-direction: row;` |
| Vertical direction | `display: flex; flex-direction: column;` |
| Gap: 16px | `gap: 16px;` |
| Padding: 12px 20px | `padding: 12px 20px;` |
| Width: Fill container | `flex: 1;` or `width: 100%;` |
| Width: Hug contents | `width: fit-content;` |
| Min width: 120px | `min-width: 120px;` |

### Grid and layout documentation
For page-level layouts, document:
- Max content width: `max-width: 1280px; margin: 0 auto;`
- Horizontal padding: `padding: 0 24px;` (changes at breakpoints)
- Grid: `display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px;`
- Sidebar width: `260px fixed; content: flex: 1;`

---

## Typography Handoff

For each text element, developers need:
```
Font family:    Inter
Font size:      16px (1rem)
Font weight:    400 (Regular)
Line height:    1.5 (24px)
Letter spacing: 0 (default)
Color:          color-text-primary (#111827)
Text transform: none
```

**Token-first:** If using a text style named "Body/Regular", write: *"Use Body/Regular text style"* — the developer maps this to the equivalent code token.

### Responsive typography
If font sizes change at breakpoints, document all:
```
H1:
  Mobile (< 768px): 24px / Bold / 1.2 line-height
  Desktop (≥ 768px): 36px / Bold / 1.15 line-height
```

---

## Interaction and Motion Specifications

For any animated transition, document:

```
Transition: Modal open
Element:    .modal-overlay + .modal-panel
Trigger:    Click CTA button
Animation:
  - Overlay: opacity 0 → 1, 150ms, ease-out
  - Panel: translateY(20px) + opacity 0 → translateY(0) + opacity 1, 200ms, ease-out, 50ms delay
Dismiss:
  - Reverse animation, 150ms ease-in
Respects: prefers-reduced-motion: reduce → instant, no animation
```

### Standard animation values to document
| Property | Value |
|---|---|
| Fast feedback (hover, button press) | 100–150ms, ease-out |
| Standard transition (modal, drawer) | 200–300ms, ease-out |
| Slow emphasis (page transition, loading) | 400–600ms, ease-in-out |
| Spring animations | cubic-bezier(0.34, 1.56, 0.64, 1) |

---

## Asset Export Guidelines

### Figma export setup
1. Select the element to export
2. In the Design panel → click `+` in the Export section
3. Set format, size multiplier, and suffix
4. Click "Export" to download

### Export specifications

| Asset Type | Format | Settings |
|---|---|---|
| SVG icons | SVG | 1× (vector, infinite scale) |
| Raster illustrations | PNG | 1× and 2× (for retina) |
| Photography | WebP | Optimized quality |
| App icons | PNG | Multiple sizes: 16, 32, 48, 128, 256px |
| Social media images | PNG or JPG | Exact pixel dimensions |
| Favicons | ICO + PNG | 16px, 32px, 48px |

### Naming conventions for exported assets
- Use kebab-case: `icon-trash.svg` not `Icon Trash.svg`
- Include size if exporting multiple: `icon-trash-16.svg`, `icon-trash-24.svg`
- Include variant if relevant: `logo-light.svg`, `logo-dark.svg`
- Use semantic names: `empty-state-no-results.svg` not `illustration-3.svg`

---

## The Handoff Process — Step by Step

### Before handoff
1. **Design review:** Stakeholder sign-off on the designs
2. **QA in Figma:** Check all states, all breakpoints, all edge cases
3. **Clean file:** Rename layers, remove unused components, organize pages
4. **Prepare assets:** Set up all export configurations in Figma
5. **Write annotations:** Document interactions, conditional logic, edge cases
6. **Link tokens:** Ensure Design System tokens are linked and published

### During handoff meeting
1. **Walk through the flow:** Show the entire user journey, not just individual screens
2. **Call out complexity:** Flag non-obvious interactions, animations, edge cases
3. **Answer questions in real-time:** Have the developer open Figma Dev Mode while you walk through
4. **Agree on priority:** Which screens/components get implemented first?
5. **Establish QA criteria:** How will you both verify the implementation matches the design?

### After handoff
1. **Share the Figma link** with view/dev mode access
2. **Create tickets** in Linear/Jira for each screen or component with a link to the specific Figma frame
3. **Be available** for questions during implementation (design is never 100% self-explanatory)
4. **Review implementations** against the design before merge — pixel-by-pixel if needed
5. **Document changes:** If you change the design during implementation, update the Figma file

---

## Design QA (Design Review of Implementation)

After developers implement the design, review it systematically:

### Design QA checklist
- [ ] Typography: font, size, weight, line height matches spec
- [ ] Colors: all colors match token values (use browser color picker)
- [ ] Spacing: padding and margins match the spec (use browser DevTools)
- [ ] Border radius: correct on all elements
- [ ] Shadows: correct values, correct direction
- [ ] Icons: correct icon, correct size, correct color
- [ ] Hover states: all hover styles match design
- [ ] Focus states: visible focus rings present on all interactive elements
- [ ] Loading states: spinner or skeleton present
- [ ] Empty states: correct illustration + copy + CTA
- [ ] Error states: correct error display and messaging
- [ ] Mobile: responsive layout matches mobile design at 375px
- [ ] Tablet: responsive layout matches tablet design at 768px
- [ ] Accessibility: screen reader test, keyboard navigation test

### Efficient QA tools
- **Pixel Perfect** Chrome extension — overlay design screenshot on the live page
- **Figma Mirror** — compare Figma design side-by-side with browser implementation
- **Chrome DevTools:** Inspect spacing, colors, and typography values in real-time

---

## Common Handoff Failures — and How to Prevent Them

| Failure | Root Cause | Prevention |
|---|---|---|
| "The developer used the wrong font" | Font not embedded in design; spec not clear | Use Text Styles + document font family explicitly |
| "Spacing is all wrong" | No grid or spacing system; no annotation | Use 8pt grid + Auto Layout + token annotations |
| "The hover state is missing" | Hover state not designed | Design all states; checklist before handoff |
| "It looks different on mobile" | Mobile design not provided | Always design mobile breakpoint |
| "The animation is wrong" | No motion spec provided | Document animation values explicitly |
| "They implemented it differently" | No walkthrough meeting; only files sent | Always do a handoff meeting, not just file sharing |

---

## Checklist — Complete Handoff Package

### Design file
- [ ] All screens named semantically
- [ ] All states (default, hover, focus, error, loading, empty, disabled) designed
- [ ] All breakpoints (desktop, tablet, mobile) designed
- [ ] All components linked to the Design System
- [ ] Unused layers and components removed

### Specifications
- [ ] Typography: font, size, weight, line height documented for each text element
- [ ] Colors documented as token names (or hex)
- [ ] Spacing documented (or readable from Auto Layout in Dev Mode)
- [ ] Interactions and animations documented
- [ ] Conditional logic annotated ("this appears only when X")

### Assets
- [ ] Icons exported as SVG with semantic names
- [ ] Images exported at 1× and 2×
- [ ] Export configurations set in Figma for all assets

### Process
- [ ] Stakeholder sign-off completed
- [ ] Handoff meeting scheduled
- [ ] Figma link shared with correct permissions
- [ ] Implementation tickets created in project management tool

---

## Related Notes

- [[09-figma-workflow]] — Organizing Figma files for clean handoff
- [[10-design-tokens-systems]] — Token-based handoff (designer → developer shared language)
- [[08-saas-product-design]] — Component states and patterns to hand off
- [[12-accessibility-design]] — Accessibility specs to include in handoff
- [[11-responsive-mobile-design]] — Responsive breakpoints to document
- [[web-dev/01-nextjs-react-best-practices]] — Developer perspective on receiving designs
- [[qa-testing/UI_EVALUATION_GUIDELINES]] — Design QA process after implementation
