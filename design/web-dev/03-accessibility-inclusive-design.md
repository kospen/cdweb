# Accessibility & Inclusive Design

> Accessibility is not a compliance checkbox — it is good UX for everyone. Keyboard navigation, screen readers, colour contrast, and focus management done right make the product better for all users.

---

## Table of Contents

1. [The Accessibility Mindset](#1-the-accessibility-mindset)
2. [WCAG 2.1 AA — Practical Rules](#2-wcag-21-aa--practical-rules)
3. [Semantic HTML](#3-semantic-html)
4. [Keyboard Navigation](#4-keyboard-navigation)
5. [ARIA — Use Only When Necessary](#5-aria--use-only-when-necessary)
6. [Focus Management](#6-focus-management)
7. [Colour & Contrast](#7-colour--contrast)
8. [Screen Reader Testing](#8-screen-reader-testing)
9. [Component Accessibility Patterns](#9-component-accessibility-patterns)
10. [Accessibility Testing Automation](#10-accessibility-testing-automation)
11. [Accessibility Checklist](#11-accessibility-checklist)

---

## 1. The Accessibility Mindset

```
Who benefits from accessible design:
  - 1.3 billion people worldwide have a disability (WHO)
  - Permanent: blind, deaf, motor impairment, cognitive disability
  - Temporary: broken arm, eye surgery recovery, noisy environment
  - Situational: bright sunlight, driving, using a phone with one hand

The curb-cut effect:
  Features built for accessibility improve UX for everyone.
  Captions: built for deaf users → used by millions watching without sound
  Keyboard shortcuts: built for motor-impaired users → loved by power users
  High contrast mode: built for low vision → preferred by many in dark rooms
  Clear error messages: accessibility best practice → better UX for all

WCAG compliance levels:
  A   — minimum; no serious barriers
  AA  — standard; required by most accessibility laws (ADA, EN 301 549, AODA)
  AAA — enhanced; not required but aspirational

Target: WCAG 2.1 AA for all SaaS products.
```

---

## 2. WCAG 2.1 AA — Practical Rules

### The Four POUR Principles

```
PERCEIVABLE   — Users can perceive all information (not just visual)
OPERABLE      — Users can operate the interface (not just with a mouse)
UNDERSTANDABLE — Users can understand the content and UI
ROBUST        — Works with current and future assistive technologies
```

### Critical AA Requirements

| Rule | Requirement | Common Violation |
|------|-------------|-----------------|
| 1.1.1 Text Alternatives | All images need `alt` text | `<img src="logo.png" />` with no alt |
| 1.3.1 Info & Relationships | Structure conveyed via markup | Fake headings using bold text |
| 1.4.3 Contrast (min) | Text ≥ 4.5:1, large text ≥ 3:1 | Light grey text on white |
| 1.4.11 Non-text Contrast | UI components ≥ 3:1 | Input border too light |
| 2.1.1 Keyboard | All functionality via keyboard | Drag-only interactions |
| 2.4.3 Focus Order | Focus follows logical order | Tab order jumps unpredictably |
| 2.4.7 Focus Visible | Keyboard focus always visible | Removed with `outline: none` |
| 3.3.1 Error Identification | Errors described in text | Red border only, no message |
| 3.3.2 Labels or Instructions | All form inputs have labels | Placeholder-only inputs |
| 4.1.2 Name, Role, Value | All components have ARIA name+role | Custom widget without ARIA |

---

## 3. Semantic HTML

Semantic HTML is the foundation of accessibility. It communicates meaning to browsers, assistive technologies, and search engines with zero extra code.

```tsx
// ✗ Div soup — no meaning, no keyboard access, no screen reader support
<div class="header">
  <div class="nav">
    <div class="nav-link" onclick="go('/home')">Home</div>
  </div>
</div>
<div class="main">
  <div class="article">
    <div class="h1">Welcome</div>
    <div class="p">Some content here.</div>
  </div>
</div>

// ✓ Semantic HTML — free accessibility, SEO, and keyboard support
<header>
  <nav aria-label="Main navigation">
    <a href="/home">Home</a>
  </nav>
</header>
<main>
  <article>
    <h1>Welcome</h1>
    <p>Some content here.</p>
  </article>
</main>

// Page structure required for screen readers:
// <header> — site header (landmark)
// <nav>    — navigation (landmark)
// <main>   — main content (landmark; only one per page)
// <aside>  — complementary content (landmark)
// <footer> — site footer (landmark)
// <h1>–<h6> — heading hierarchy (never skip levels)
// <button> — clickable action (gets keyboard focus, Enter/Space triggers)
// <a href> — navigation link (gets keyboard focus, Enter triggers)
// <form>, <label>, <input> — form structure
```

### Heading Hierarchy

```tsx
// ✗ Headings chosen for visual size, not structure
<h1>Dashboard</h1>
<h3>Recent Activity</h3>   // skipped h2!
<h5>Today</h5>             // skipped h4!

// ✓ Headings convey document outline
<h1>Dashboard</h1>         // page title — one per page
  <h2>Recent Activity</h2>
    <h3>Today</h3>
    <h3>Yesterday</h3>
  <h2>Usage Stats</h2>
  <h2>Team Members</h2>

// Use CSS to control visual size separately from semantic level
<h2 className="text-sm font-medium text-muted-foreground">Team Members</h2>
```

---

## 4. Keyboard Navigation

Every feature must be fully operable with keyboard alone.

```
Tab key rules:
  - Tab moves focus forward through interactive elements
  - Shift+Tab moves focus backward
  - Enter activates links and buttons
  - Space activates buttons and checkboxes
  - Arrow keys navigate within components (menus, tabs, radio groups)
  - Escape closes modals, popovers, and dropdowns

Focus ring:
  NEVER remove focus indicators with outline: none or outline: 0
  without providing an alternative.

  // ✗ Destroys keyboard accessibility for all users
  * { outline: none; }
  button:focus { outline: none; }

  // ✓ Style it to match your design — but keep it visible
  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: 4px;
  }
  // :focus-visible only shows for keyboard users, not mouse clicks
```

### Keyboard Trap Pattern (Modals)

When a modal is open, focus must be trapped inside it.

```tsx
// Using Radix UI or Headless UI handles this correctly out of the box
// If building custom:

import { useEffect, useRef } from 'react'

function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const modal = modalRef.current
    if (!modal) return

    // Save previously focused element
    const previouslyFocused = document.activeElement as HTMLElement

    // Focus the modal
    modal.focus()

    // Trap focus inside modal
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return

      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()  // restore focus when modal closes
    }
  }, [isOpen, onClose])

  return isOpen ? (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      aria-labelledby="modal-title"
    >
      {children}
    </div>
  ) : null
}
```

---

## 5. ARIA — Use Only When Necessary

> First rule of ARIA: if a native HTML element can do the job, use it.

```tsx
// ✗ Unnecessary ARIA on semantic HTML
<button role="button" aria-label="Click me">Click me</button>
// 'button' already has role="button" implicitly

// ✗ Missing ARIA on custom interactive components
<div onClick={handleToggle}>Show more</div>
// A div is not focusable or keyboard-operable

// ✓ Use button; ARIA only when unavoidable
<button onClick={handleToggle} aria-expanded={isExpanded} aria-controls="more-content">
  {isExpanded ? 'Show less' : 'Show more'}
</button>
<div id="more-content" hidden={!isExpanded}>...</div>

// ✓ Custom widget — tabs example
<div role="tablist" aria-label="Project sections">
  <button
    role="tab"
    aria-selected={activeTab === 'overview'}
    aria-controls="panel-overview"
    id="tab-overview"
    tabIndex={activeTab === 'overview' ? 0 : -1}
    onClick={() => setActiveTab('overview')}
  >
    Overview
  </button>
  <button role="tab" aria-selected={activeTab === 'tasks'} ...>Tasks</button>
</div>
<div
  role="tabpanel"
  id="panel-overview"
  aria-labelledby="tab-overview"
  hidden={activeTab !== 'overview'}
  tabIndex={0}
>
  Overview content
</div>
```

### Essential ARIA Attributes

```
aria-label="Description"       — names an element when no visible label exists
aria-labelledby="element-id"   — names an element by pointing to another element
aria-describedby="element-id"  — adds description (read after the label)
aria-expanded={boolean}        — state of accordion, dropdown, details
aria-selected={boolean}        — selected state in tabs, listbox, grid
aria-checked={boolean|'mixed'} — checkbox/radio state
aria-disabled={boolean}        — disabled state (use sparingly; keep focusable)
aria-hidden={true}             — hides from assistive tech (decorative icons)
aria-live="polite"             — announces dynamic content changes
aria-live="assertive"          — announces urgent changes (error alerts)
aria-busy={boolean}            — element is loading (e.g., button while submitting)
role="alert"                   — short but important message; auto announced
role="status"                  — polite status message
```

---

## 6. Focus Management

### After Page Navigation (SPA)

```tsx
// In Next.js App Router, focus is managed automatically on navigation.
// For custom transitions or programmatic navigation:

'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function FocusManager() {
  const pathname = usePathname()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Move focus to page heading after navigation
    headingRef.current?.focus()
  }, [pathname])

  return <h1 ref={headingRef} tabIndex={-1} className="sr-only">
    {/* visually hidden; just receives focus for screen readers */}
  </h1>
}
```

### After Dynamic Content Changes

```tsx
// Opening a toast — focus stays where it is (polite announcement)
function useToast() {
  function showToast(message: string) {
    // aria-live="polite" region announces this without stealing focus
    setToast({ message, visible: true })
  }
}

// After form submission error — focus the first error field
function ContactForm() {
  const firstErrorRef = useRef<HTMLInputElement>(null)
  const { errors, handleSubmit } = useForm()

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      firstErrorRef.current?.focus()  // move focus to first error
    }
  }, [errors])
}

// After modal close — return focus to trigger
function useModal() {
  const triggerRef = useRef<HTMLButtonElement>(null)

  function open() { /* store document.activeElement */ }
  function close() {
    triggerRef.current?.focus()  // return focus to what opened the modal
  }
}
```

---

## 7. Colour & Contrast

```
Contrast ratios (WCAG AA):
  Normal text (<18px):   ≥ 4.5:1
  Large text (≥18px or ≥14px bold): ≥ 3:1
  UI components (borders, icons): ≥ 3:1
  Decorative elements:   No requirement

Tools:
  Browser: Chrome DevTools colour picker shows contrast ratio
  VS Code: axe Accessibility Linter extension
  Design:  Figma plugin "Contrast" or "Stark"
  Online:  webaim.org/resources/contrastchecker/

Common failures:
  Grey text (#999 on white): 2.85:1 — FAIL
  Medium grey (#777 on white): 4.48:1 — barely passes
  Recommended safe grey: #767676 on white = exactly 4.54:1
```

```tsx
// Tailwind: use text-muted-foreground carefully
// Check its contrast ratio in your design system
// Commonly "text-gray-500" fails on white backgrounds

// Color alone must not convey meaning:
// ✗ Red border = error (colour-blind users can't distinguish)
// ✓ Red border + error icon + error text message

// Error state:
<div>
  <Input
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? 'email-error' : undefined}
    className={errors.email ? 'border-destructive' : ''}
  />
  {errors.email && (
    <p id="email-error" role="alert" className="flex items-center gap-1 text-destructive text-sm">
      <AlertCircleIcon className="h-4 w-4" aria-hidden />
      {errors.email.message}
    </p>
  )}
</div>
```

---

## 8. Screen Reader Testing

### Quick Test Setup

```
Windows:
  NVDA (free): nvaccess.org — most common screen reader globally
  JAWS (paid): common in enterprise

Mac / iOS:
  VoiceOver (built-in): System Prefs → Accessibility → VoiceOver
  Toggle: Cmd+F5

Android:
  TalkBack (built-in): Settings → Accessibility → TalkBack

Minimal screen reader test:
  1. Close your eyes (or look away from screen)
  2. Navigate page with Tab, Shift+Tab, Enter, Space, Escape
  3. Can you understand every interactive element by its announced name?
  4. Can you complete the core user flow (sign up, create, save, delete)?
```

### Common Screen Reader Bugs

```tsx
// BUG: Icon buttons without accessible name
<button onClick={onClose}>
  <XIcon />  {/* screen reader announces "button" — no information */}
</button>
// FIX:
<button onClick={onClose} aria-label="Close dialog">
  <XIcon aria-hidden />
</button>

// BUG: Form field without label
<input type="email" placeholder="Email address" />
// FIX:
<label htmlFor="email">Email address</label>
<input id="email" type="email" placeholder="you@example.com" />
// OR: visually hidden label
<label htmlFor="email" className="sr-only">Email address</label>
<input id="email" type="email" placeholder="Email address" />

// BUG: Loading state not announced
function SaveButton({ isSaving }: { isSaving: boolean }) {
  return <button disabled={isSaving}>{isSaving ? '...' : 'Save'}</button>
  // Screen reader just says "Save, dimmed" — no indication it's loading
}
// FIX:
<button disabled={isSaving} aria-busy={isSaving}>
  {isSaving ? 'Saving…' : 'Save'}
</button>

// BUG: Error message appears but isn't announced
// FIX: role="alert" or aria-live="polite" on error container
<div role="alert" className="text-destructive text-sm">
  {errorMessage}
</div>
```

---

## 9. Component Accessibility Patterns

### Accessible Dropdown Menu

```tsx
// Use Radix UI DropdownMenu — handles all ARIA automatically
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

function UserMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label="User menu">
          <Avatar src={user.avatar} alt={user.name} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Item onSelect={() => router.push('/settings')}>
            Settings
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onSelect={signOut} className="text-destructive">
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
```

### Visually Hidden (sr-only) Pattern

```tsx
// Tailwind's sr-only utility — visible to screen readers, not visible on screen
// Use for: labels that are obvious visually but need to be in the DOM

<button>
  <TrashIcon aria-hidden className="h-4 w-4" />
  <span className="sr-only">Delete {project.name}</span>
</button>

// Table with visually hidden column headers
<th className="sr-only">Actions</th>
```

---

## 10. Accessibility Testing Automation

```tsx
// Playwright + axe — automated a11y checks in E2E tests
import { checkA11y, injectAxe } from 'axe-playwright'

test.describe('Dashboard accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await injectAxe(page)
  })

  test('dashboard page has no accessibility violations', async ({ page }) => {
    await page.goto('/dashboard')
    await checkA11y(page, '#main-content', {
      detailedReport: true,
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
    })
  })

  test('create project modal is accessible', async ({ page }) => {
    await page.click('button:has-text("New project")')
    await checkA11y(page, '[role="dialog"]')
  })
})
```

```bash
# Lighthouse CI — block deploys with a11y regressions
npx lighthouse-ci autorun
# .lighthouserc.js
module.exports = {
  assert: {
    assertions: {
      'categories:accessibility': ['error', { minScore: 0.95 }],
    },
  },
}
```

---

## 11. Accessibility Checklist

### Component Review (Before PR)

- [ ] All images have meaningful `alt` text (or `alt=""` if decorative)
- [ ] All form inputs have associated `<label>` elements
- [ ] All interactive elements are focusable (not just `div` with `onClick`)
- [ ] Focus ring visible on all focusable elements
- [ ] Icon-only buttons have `aria-label`
- [ ] Colour is not the only means of conveying information
- [ ] Contrast ratio checked: text ≥ 4.5:1, UI components ≥ 3:1
- [ ] Error messages use `role="alert"` or `aria-live`
- [ ] Dynamic content changes are announced (status messages)
- [ ] Heading hierarchy is sequential (no skipped levels)
- [ ] Modals trap focus and restore it on close
- [ ] Tested with keyboard-only navigation (Tab, Enter, Space, Escape)
- [ ] `aria-hidden` on decorative icons
- [ ] No `outline: none` without equivalent focus indicator

### Page Review

- [ ] `<html lang="en">` (or appropriate language code)
- [ ] One `<h1>` per page
- [ ] `<main>` landmark present
- [ ] Skip navigation link ("Skip to main content") at top
- [ ] Page title is descriptive (`<title>Projects | AppName</title>`)
- [ ] No keyboard trap except intentional modal traps

---

*Related notes: [[01-nextjs-react-best-practices]] | [[05-forms-validation-ux]] | [[06-loading-states-feedback]] | [[09-error-handling-empty-states]] | [[qa-ui-ux-guide]]*

*Last updated: 2026-04-15*
