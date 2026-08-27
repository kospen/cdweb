# Figma Workflow and Best Practices

Figma is the industry-standard design tool for UI/UX, web design, and collaborative design systems. Used correctly, it dramatically accelerates design work and enables seamless team collaboration. Used poorly, it creates chaos — disorganized files, inconsistent components, and frustrated developers who cannot extract what they need.

This file covers professional Figma workflow, file organization, components, auto layout, and team practices.

---

## File Organization — The Foundation

### Project structure (Figma Workspace level)
```
Team Workspace
├── Design System (1 shared file for the entire company)
├── Marketing
│   ├── Website — Pages (marketing site design)
│   └── Email Templates
├── Product — [App Name]
│   ├── Design — Main product file (active work)
│   ├── Archive — Old designs (don't delete — archive)
│   └── Explorations — Experiments and divergent ideas
└── Brand
    ├── Logo Assets
    └── Brand Guidelines
```

### Page organization within a Figma file
Every Figma file should have consistent page naming:
```
📋 Cover          ← Thumbnail/status (optional but professional)
🔵 Current Sprint ← Active work — what devs are implementing now
🟡 In Progress    ← Work in progress — not ready for dev
🔴 Explorations   ← Ideas, experiments
📦 Archive        ← Shipped or deprecated screens
🧩 Components     ← Local components only (or link to design system)
```

### Frame (artboard) naming — critical for dev handoff
Every frame should have a clear, unique, semantic name:

**Good names:**
- `Dashboard / Overview`
- `Auth / Login — Error State`
- `Settings / Profile — Edit Mode`
- `Onboarding / Step 3 — Connect Integrations`

**Bad names:**
- `Frame 247`
- `Copy of Screen`
- `New Screen 2`
- `Test`

**Convention:** `Section / Screen Name — State` (using `/` creates group hierarchy in the Layers panel)

---

## Layers Panel — Staying Organized

### Naming rules
- Every layer that matters must have a semantic name
- Auto-named layers (Frame 1, Rectangle 3) signal disorganized work
- Group related layers — use Groups for visual grouping, Frames for layout containers
- Name groups after their content: "Card — Active State" not "Group 12"

### Layer organization order (top to bottom in the panel = visually on top)
```
Overlay / Modal (if present)
Navigation (topbar / sidebar)
Main Content
Background
```

### Naming convention for components and variants
- Use `/` to create hierarchy: `Button/Primary/Default`, `Button/Primary/Hover`
- Consistent casing: either `Title Case` or `lowercase` — choose one and stick to it
- Be descriptive: `Input/Text/Filled` not `Input2`

---

## Components — The Right Way

### What should be a component?
Turn any element into a component if:
- It appears in more than one place
- It has multiple states (default, hover, active, error)
- It is part of the design system (buttons, cards, inputs, navigation)
- A developer will need to implement it as a reusable piece of code

### Component anatomy
```
Button [Component] ← the "main component" (in Design System file)
├── Button/Primary/Default
├── Button/Primary/Hover
├── Button/Primary/Disabled
├── Button/Secondary/Default
└── Button/Secondary/Hover
```

### Properties panel (component properties — Figma 2022+)
Use component properties to build flexible, realistic components:
- **Text properties** — editable text in instances without detaching
- **Boolean properties** — show/hide optional elements (icon, badge, divider)
- **Variant properties** — switch between states (type, size, state)
- **Instance swap** — swap nested components (icon inside button)

### Variants
Organize related component variations into a single Variant Group:
- State: Default / Hover / Active / Focus / Disabled
- Type: Primary / Secondary / Ghost / Destructive
- Size: Small / Medium / Large

Variants make it easy to see all states at once and to switch states in instances without hunting for separate frames.

### Component best practices
- **Always edit the main component**, not instances (detaching breaks the system)
- **Keep main components in the Design System file**, not in individual project files
- **Use "Publish" to share components** across the team workspace
- Document each component with a description in the right panel (supports dev handoff)

---

## Auto Layout — Building Responsive Components

Auto Layout is Figma's most powerful feature for production-quality designs. It makes components that resize correctly, behave like real code, and generate cleaner CSS for developers.

### When to use Auto Layout
- **Always** for buttons, tags, badges, labels
- **Always** for lists, menus, and navigation items
- **Always** for cards where content length varies
- For any frame where elements should adapt to content

### Auto Layout properties

**Direction:**
- Horizontal — items stack left to right
- Vertical — items stack top to bottom
- Wrap — items wrap to new lines

**Spacing:**
- Gap between items (like CSS `gap`)
- Padding: Top / Bottom / Left / Right (or symmetric)

**Sizing:**
- Fixed — stays at set pixel size
- Hug — shrinks/grows to fit its contents
- Fill — expands to fill the parent container

### Practical example: Button
```
Button Frame [Auto Layout — Horizontal]
├── Direction: Horizontal
├── Padding: 12px 20px (vertical / horizontal)
├── Gap: 8px (between icon and label)
├── Width: Hug contents (button resizes with label)
└── Height: Fixed 40px
    ├── [Icon — 16×16, optional]
    └── [Label — "Create Project"]
```

### Common Auto Layout mistakes
- **Fixed width instead of Fill** — causes elements to overflow or not stretch correctly
- **Not using padding** — relies on empty spacer frames (breaks with content changes)
- **Nested auto layouts in wrong direction** — confuses the layout hierarchy
- **Forgetting to enable "Clip content"** — child elements overflow visibly

---

## Styles — Typography and Color Consistency

### Text Styles
Create a Text Style for every reusable typographic role:
```
Text Styles library:
├── Heading/H1 — 32px Bold
├── Heading/H2 — 24px SemiBold
├── Heading/H3 — 20px SemiBold
├── Body/Regular — 16px Regular, line-height 1.5
├── Body/Small — 14px Regular, line-height 1.4
├── Label/Uppercase — 12px Medium, letter-spacing 0.05em, uppercase
└── Code/Mono — 14px JetBrains Mono Regular
```

**Never** set font sizes directly on text layers. Always apply a Text Style. This enables global font changes in seconds.

### Color Styles
```
Color Styles library:
├── Brand/Primary — #3B82F6
├── Brand/Primary-Dark — #2563EB
├── Brand/Accent — #F59E0B
├── Neutral/900 — #111827
├── Neutral/700 — #374151
├── Neutral/500 — #6B7280
├── Neutral/100 — #F3F4F6
├── Semantic/Success — #16A34A
├── Semantic/Error — #DC2626
├── Semantic/Warning — #D97706
└── Semantic/Info — #2563EB
```

---

## Prototyping — When and How

### When to prototype
- User testing — prototype the flow before building
- Stakeholder presentations — interactive is more convincing than static
- Complex interaction design — hover menus, modals, multi-step flows
- Developer alignment — show how transitions should feel

### When NOT to prototype
- Every screen in the project — overkill, wastes time
- Instead of writing specs — prototype does not replace written interaction notes

### Prototyping best practices
- Use **Smart Animate** for smooth transitions (elements with the same layer name animate between frames)
- Use **Scroll to** for long pages (simulate scrolling within a fixed viewport frame)
- Use **Overlay** for modals, tooltips, and drawers (not separate frames)
- Add a **Flow start point** so sharing the prototype link starts at the right screen
- Set a **device frame** for mobile prototypes (iPhone 14, Pixel, etc.)

---

## Design System Integration

### Linking to a published Design System
1. **Main Menu → Libraries** — access all published component libraries
2. Enable the shared Design System library for your project file
3. Use **Swap library** when migrating from local components to the system

### Design System file structure (the team's shared file)
```
Design System
├── 📦 Foundations
│   ├── Colors
│   ├── Typography
│   └── Spacing / Grid
├── 🧩 Components
│   ├── Atoms (Button, Input, Badge, Avatar)
│   ├── Molecules (Card, Form Field, Dropdown)
│   └── Organisms (Navigation, Dashboard Header)
├── 📐 Patterns
│   ├── Form Layouts
│   ├── Empty States
│   └── Loading States
└── 📋 Documentation
    └── Usage guidelines per component
```

See [[10-design-tokens-systems]] for how design system values translate to code tokens.

---

## Figma Plugins — Essential Toolkit

| Plugin | Purpose |
|---|---|
| **Unsplash** | Insert free photos directly in Figma |
| **Iconify** | Access 100,000+ icons in any style |
| **Stark** | Accessibility checker — contrast, color blindness simulation |
| **Figma Tokens** | Token Studio — manage and export design tokens |
| **Autoflow** | Draw arrows between frames for user flows |
| **Content Reel** | Realistic placeholder data (names, emails, avatars) |
| **Remove BG** | Auto-remove image backgrounds |
| **Mockuuups Studio** | Device mockups for presentations |
| **Spelll** | Spell checker for Figma text |

---

## Figma Shortcuts — Productivity Essentials

| Action | Shortcut |
|---|---|
| Frame / Artboard | F |
| Scale tool (resize preserving aspect ratio) | K |
| Toggle Show / Hide | Ctrl/⌘ + Shift + H |
| Group | Ctrl/⌘ + G |
| Ungroup | Ctrl/⌘ + Shift + G |
| Create component | Ctrl/⌘ + Alt + K |
| Auto Layout | Shift + A |
| Align left/center/right | Use alignment panel or shortcuts |
| Zoom to fit selection | Shift + 2 |
| Zoom to fit page | Shift + 1 |
| Pixel-perfect view | Ctrl/⌘ + Shift + P |
| Copy as SVG | Right-click → Copy → Copy as SVG |
| Inspect panel (dev mode) | Ctrl/⌘ + Shift + I |

---

## Collaboration and Review Workflow

### Design review process
1. Designer marks frames "Ready for Review" (use a label or page section)
2. Stakeholders review in **Presentation mode** or using **Comment mode** (C)
3. Comments are addressed; designer resolves each comment when fixed
4. "Approved" frames moved to the Handoff page or marked with a green indicator

### Version history
- Figma auto-saves versions continuously
- Add manual versions at key milestones: **Main Menu → File → Save Version**
- Name versions semantically: "v1.0 — Initial concept", "v2.0 — After user testing"

### Branching (Figma Organizations plan)
For larger teams:
- Create a branch for major explorations without affecting the main file
- Merge branches after review (like Git branches)

---

## Figma for Non-Product Design (Presentations, Marketing)

Figma is not only for UI. It is an excellent tool for:
- **Marketing materials** — social posts, email headers, banners
- **Presentations** — more flexible than PowerPoint, native export to PDF
- **One-pagers and documents** — with the Figma Slides feature or as frames exported to PDF
- **Pitch decks** — collaborative editing with teammates in real time

For presentations in Figma:
- Use Figma Slides (built-in presentation mode)
- Or design slides as frames (1920×1080px) and export as PDF
- Master slide elements → use a shared library component

---

## Checklist — Figma File Quality

- [ ] All frames have semantic names (no "Frame 247")
- [ ] All pages follow the standard naming convention
- [ ] Reusable elements are components (not repeated standalone layers)
- [ ] Text and color styles applied from the library (not set directly)
- [ ] Auto Layout used on all buttons, inputs, and variable-size containers
- [ ] Component variants organized for all interactive states
- [ ] Prototype flows have a Start Point defined
- [ ] All images have Alt text descriptions (in the plugin or export settings)
- [ ] Design System library connected and components linked (not local copies)
- [ ] File is shared with correct permissions (Editors vs. Viewers)

---

## Do's and Don'ts

| Do | Don't |
|---|---|
| Name every layer semantically | Leave layers as "Frame 247" |
| Use Auto Layout for all dynamic content | Manually space elements with static frames |
| Build components from the Design System | Recreate components locally |
| Resolve review comments in Figma | Mark comments done in Slack separately |
| Save manual versions at milestones | Rely only on Figma's auto-versioning |
| Use the Inspect panel for dev handoff | Expect devs to guess padding values |
| Archive old designs (don't delete) | Delete screens that might be referenced |

---

## Related Notes

- [[10-design-tokens-systems]] — Exporting Figma tokens to code
- [[14-design-handoff]] — Developer handoff from Figma
- [[08-saas-product-design]] — Component patterns to build in Figma
- [[03-color-and-branding]] — Color styles and brand palette in Figma
- [[01-typography]] — Text styles and font choices
- [[11-responsive-mobile-design]] — Figma breakpoints and mobile frames
- [[12-accessibility-design]] — Accessibility checking in Figma (Stark plugin)
