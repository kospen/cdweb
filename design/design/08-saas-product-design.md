# SaaS Product Design — Dashboards, Forms, Onboarding, and UI Patterns

SaaS product design is fundamentally different from marketing or presentation design. Users return to your product daily or multiple times per day. They are not impressed by beautiful animations — they are frustrated by confusing navigation, slow-loading dashboards, and forms that lose their data. This file covers the design principles and patterns that make SaaS products genuinely useful.

---

## Core SaaS Design Philosophy

### The hierarchy of needs (from base to apex)
1. **Functional** — It works reliably
2. **Usable** — Users can accomplish their task without confusion
3. **Efficient** — Users can accomplish their task fast
4. **Satisfying** — The experience feels good
5. **Delightful** — Moments of unexpected pleasure

Most design teams skip to step 5 before nailing step 1–3. Fix functional and usable problems before investing in delight.

### Reduce cognitive load at every step
- Show only what is needed for the current task
- Group related information; separate unrelated information
- Use progressive disclosure — hide complexity until it is needed
- Every UI element must earn its place

---

## Dashboard Design

Dashboards are high-frequency interfaces. Design them for **scanning, not reading**.

### Dashboard hierarchy (top to bottom)
```
Level 1 — Summary KPIs (3–5 numbers, top of page)
Level 2 — Trend charts (is it going up or down?)
Level 3 — Detail tables or breakdown charts (why is it what it is?)
```

### KPI card design
```
┌─────────────────────────────┐
│  Total Revenue              │ ← Label: 12px, medium gray, uppercase
│  $127,430                   │ ← Value: 28–32px, bold, dark
│  ↑ 12.3% vs last month      │ ← Delta: 14px, green/red, with icon
└─────────────────────────────┘
```

**Rules:**
- Label always above the value (not beside it)
- Delta comparison always present — absolute numbers without context are meaningless
- Color-code delta: green for positive, red for negative (check for accessibility exceptions)
- Tooltip shows exact calculation method on hover

### Dashboard grid layout
| Layout | Columns | Use Case |
|---|---|---|
| Executive summary | 2–3 KPI cards full width | High-level overview |
| Operations | 4 KPI cards + 1 wide chart | Daily monitoring |
| Analytics | 2-column charts + table below | Deep analysis |
| Mobile | Single column, stacked | Mobile dashboards |

### Chart selection for dashboards
- **Line charts** for trends over time
- **Bar charts** for category comparison
- **Donut charts** for a single percentage metric (2–3 segments max)
- **Big numbers** for single critical KPIs — no chart needed
- Avoid scatter plots on dashboards — too much cognitive effort for frequent checking

### Empty states on dashboards
Every chart and table must have a designed empty state:
- Illustrative placeholder (not just a blank area)
- Clear explanation: "No data yet — your first orders will appear here"
- Actionable prompt: "Import data" / "Connect account" / "Create first record"

---

## Form Design

Forms are the most undervalued part of SaaS design. A confusing form loses conversions, creates support tickets, and damages trust.

### Form layout principles

**Single column is almost always better than two columns**
- Two-column forms cause users to skip fields
- Exception: logically paired fields (First Name / Last Name, Start Date / End Date)

**Label positioning — always above the field (not beside it)**
```
CORRECT:
Full Name       ← label
[___________]   ← input

WRONG:
Full Name [___________]  ← harder on mobile, harder for labels that wrap
```

**Placeholder text is not a label**
- Placeholder disappears when typing begins — users forget what the field requires
- Use placeholder only for format hints: "e.g., john@example.com" or "YYYY-MM-DD"

### Field design specifications
| State | Visual Treatment |
|---|---|
| Default | Light gray border (#D1D5DB), white background |
| Focused | Brand primary border (2px), subtle focus ring |
| Filled / Valid | Check icon (optional), green border (optional) |
| Error | Red border (#EF4444), red error message below |
| Disabled | Gray background (#F3F4F6), reduced opacity |

### Error messages — rules
- Display **below the field** immediately, not at the top of the form
- Be specific: "Password must be at least 8 characters" not "Invalid password"
- Show errors **on blur** (when user leaves the field), not on every keystroke
- Clear error **as soon as** the user fixes it — do not make them submit again to see it resolved
- Never: just a red border with no explanation

### Button hierarchy in forms
```
[Primary CTA — large, brand color, bold]     "Save" / "Continue" / "Create Account"
[Secondary action — ghost or text button]     "Cancel" / "Go Back"
[Destructive action — red, requires confirm]  "Delete" / "Remove"
```

### Form validation strategy
1. **Required fields:** Mark with asterisk (*) — explain meaning ("* required") at top
2. **Real-time validation:** On blur for format (email, phone); Never on keypress for password
3. **Inline suggestions:** Show password strength indicator as user types
4. **Submit prevention:** Disable submit button if required fields empty (with tooltip explaining why)
5. **Success feedback:** Clear success message — "Account created!" with next step

### Long forms — progressive disclosure
- Break into steps (wizard/stepper) if form has more than 6–8 fields
- Show a progress indicator: "Step 2 of 4" or a visual stepper
- Never lose user data between steps — persist in state
- Allow backwards navigation without clearing completed fields

See also [[web-dev/05-forms-validation-ux]] for technical implementation.

---

## Onboarding — First-Time User Experience

Onboarding is not a tour — it is a transformation from "new user" to "activated user." The goal is to deliver the first moment of value as fast as possible.

### The onboarding funnel
```
Sign up → Account setup → First action → First value → Habit formation
```

### Onboarding design patterns

**1. Blank slate with prompt**
When the user's workspace is empty, show a designed empty state with a clear first action:
```
[Illustration — relevant to the product]
"You haven't created any projects yet"
[Create your first project →]  ← primary CTA
```

**2. Setup checklist**
A progress-tracked list of setup tasks. Works well for complex products:
```
✓ Create your account
✓ Invite your first team member
○ Connect your first integration
○ Create your first report
```
- Keep to 4–6 items maximum
- Auto-check completed items
- Show % complete or progress bar
- Make it dismissible after completion

**3. Guided tour / Tooltips**
- Use for features that are non-obvious
- Maximum 5 steps in a linear tour
- Make each step skippable
- Never trigger on first login — let user orient first, then offer the tour
- Tooltip style: small, non-blocking, with skip and progress indicator

**4. Sample data / Templates**
Pre-populate the product with sample data so it doesn't look empty:
- Clearly labeled as "Sample Data" 
- Include a "Remove sample data" option
- Makes the product feel alive before the user has real data

### The "aha moment" — critical design goal
Identify the exact action that correlates with long-term retention and design the entire onboarding to reach it as fast as possible.

Examples:
- Slack: Send your first message to a channel → feel connected
- Figma: Share a design link → feel the collaboration
- Notion: Create a page → feel ownership

Every onboarding step that doesn't move toward the aha moment is friction — remove it.

---

## Navigation Design

### Navigation patterns for SaaS

**Left sidebar (most common for complex tools)**
- Shows all main sections always visible
- Active state: highlighted background or left accent border
- Groups: use headers or visual separators for major groups
- Width: 220–280px (collapsed: 56–64px icon-only mode)

**Top navigation bar (simpler products or marketing sites)**
- Maximum 6–7 top-level items
- Active state: underline or bold
- Logo: always left, links back to home/dashboard

**Bottom navigation bar (mobile-first apps)**
- Maximum 5 items
- Always visible — users rely on it like muscle memory
- Active tab: filled icon + label (not just color)

### Navigation hierarchy rules
- Maximum 2 levels (main nav + sub-nav)
- 3-level navigation = product architecture problem, not a design problem
- Current section always visually active
- Back button available whenever drilling into detail views

---

## Component Design — Cards, Tables, and Lists

### Cards
Cards are containers for a discrete piece of information (a project, a contact, a task).
```
┌──────────────────────────────┐
│ [Thumbnail or icon]          │ ← optional visual
│ Title                        │ ← bold, primary text color
│ Description — 2 lines max    │ ← regular, secondary text color
│ Tag / Status    → Action     │ ← footer with badge + cta
└──────────────────────────────┘
```
- Card border: 1px solid #E5E7EB (light gray) or subtle shadow
- Hover state: elevated shadow, slight border color shift
- Click target: entire card (not just a "View" link within it)

### Data tables
For large datasets with many attributes:
- **Fixed header:** stays visible when scrolling vertically
- **Frozen columns:** first column stays visible when scrolling horizontally
- **Pagination vs. infinite scroll:** Pagination for accurate navigation; infinite scroll for feed-like content
- **Row actions:** Show on hover (not always — clutters the view)
- **Bulk actions:** Appear in a sticky bar when rows are selected
- **Sorting:** Click column header; chevron icon shows active sort

### Lists (simple, one attribute per row)
- Clean, minimal — less chrome than a full table
- Ideal for tasks, notifications, recent activity
- Use dividers or spacing to separate groups
- Hover: subtle background highlight

---

## State Design — All the States You Must Design

For every interactive component, design all states:

| State | Description |
|---|---|
| **Default** | Normal, uninteracted state |
| **Hover** | Mouse over — preview of interactivity |
| **Focus** | Keyboard navigation active — always visible ring |
| **Active / Pressed** | During click or tap |
| **Filled / Completed** | Form field has value; toggle is on |
| **Selected** | Row in table selected; item in list chosen |
| **Disabled** | Cannot interact — gray out, cursor not-allowed |
| **Loading** | Waiting for data — spinner or skeleton |
| **Error** | Something went wrong — red, clear message |
| **Success** | Action completed — green, checkmark, confirmation |
| **Empty** | No data yet — illustration + prompt |

Missing states are the #1 source of "broken" looking software. If a developer implements a component and the empty state looks wrong, it's because the designer didn't design it.

---

## Feedback and Micro-interactions

Good SaaS software gives constant, immediate feedback:

| Action | Expected Feedback |
|---|---|
| Button click (fast action) | Immediate visual change (pressed state) + result |
| Form submission | Loading spinner on button, then success/error message |
| Save action | Autosave indicator ("Saving...") → ("Saved ✓") |
| Delete action | Confirmation dialog → undo option for 5 seconds |
| File upload | Progress bar with percentage |
| Long operation (>2s) | Progress indicator with estimated time |
| Error from API | Clear error message + suggested fix |

**The undo pattern:** Never use a confirmation dialog for reversible actions. Instead, perform the action immediately and offer an undo toast ("Item deleted. Undo → "). This is faster and feels more trustworthy.

---

## SaaS Design Checklist

### Dashboards
- [ ] KPI cards show value + label + delta comparison
- [ ] Empty states designed for every chart and table
- [ ] Charts selected for the data relationship (not just what looks good)
- [ ] Dashboard loads in under 2 seconds (skeleton states while loading)

### Forms
- [ ] All labels above fields (not inside, not beside)
- [ ] Errors displayed below the relevant field with specific messages
- [ ] Required fields marked consistently
- [ ] All form states designed (default, focus, error, disabled, success)
- [ ] Long forms broken into steps with progress indicator

### Onboarding
- [ ] Empty state designed for all blank workspaces
- [ ] Setup checklist or guided tour implemented
- [ ] "Aha moment" clearly identified; onboarding routes toward it
- [ ] Sample data or templates available

### Navigation
- [ ] Active state clearly visible
- [ ] Maximum 2 navigation levels
- [ ] Mobile navigation designed separately

---

## Related Notes

- [[01-typography]] — UI text hierarchy, minimum font sizes
- [[02-layout-spacing-canvas]] — 8pt grid system for component spacing
- [[03-color-and-branding]] — Color for UI states (success/error/warning)
- [[06-data-visualization]] — Dashboard chart types and patterns
- [[10-design-tokens-systems]] — Systematizing component styles as tokens
- [[11-responsive-mobile-design]] — Adapting SaaS UI to mobile screens
- [[12-accessibility-design]] — Accessible forms, keyboard navigation, screen readers
- [[web-dev/04-user-onboarding-flows]] — Technical implementation of onboarding
- [[web-dev/05-forms-validation-ux]] — Form validation implementation
- [[qa-testing/UX_AUDIT_GUIDELINES]] — UX review process for product screens
