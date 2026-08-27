# Implementation Pass 1 — Visual and Responsive Correction

Date: 2026-08-26  
Scope: visual correction, responsive behaviour and navigation clarity. Existing English content and the approved hero composition were preserved.

## Source audit

Implementation was checked against `01-CURRENT-WEBSITE-AS-IS.md` and `02-INDEPENDENT-UX-VISUAL-TECHNICAL-AUDIT.md`. The prompt also named `FULL_VISUAL_AUDIT.md` and `02_CONTENT_INVENTORY.md`, but those files are not present in the repository. The numbered audit's content inventory was therefore used as the reference.

## Major corrections

### 1. Narrow-screen overflow

**Before:** At a 320px browser width (305px content viewport), the home and About pages extended to 326px and article content to 317px.

**Problem:** Intrinsic grid children, large article headings and unbroken technical strings exceeded their containers.

**Change:** Added `min-width: 0` to affected grid children, narrow-screen wrapping safeguards, and a fluid 36–44px article H1 range.

**Result:** All ten public routes now match the viewport width at 320px. The complete 80-case route/viewport matrix produced zero horizontal-overflow failures.

### 2. Mobile hierarchy and readability

**Before:** Hero body copy rendered at about 12.5px and technical labels at about 8.5px.

**Problem:** Important copy and system labels were below a comfortable mobile reading size.

**Change:** Restored hero body copy to 16px, technical labels to 12px, primary controls to at least 48px high, and kept compact line lengths and spacing.

**Result:** The mobile hero remains compositionally faithful while its supporting copy and actions are legible and operable.

### 3. RETHINK / REPLACE / REIMAGINE sequence

**Before:** The framework axis compressed into a weak horizontal strip and supporting signals disappeared on narrow screens.

**Problem:** The transformation sequence lost hierarchy and narrative continuity.

**Change:** Converted the narrow axis into a vertical sequence, retained 12px labels, restored the supporting signals, and exposed the sequence as a semantic list.

**Result:** The framework reads as an intentional progression from legacy to emergence without overlap.

### 4. Navigation consistency and focus order

**Before:** Header modes changed at inconsistent breakpoints and the desktop hero brand hotspot followed the primary navigation in keyboard order despite appearing first visually.

**Problem:** Navigation behaviour and keyboard sequence did not consistently match the visual interface.

**Change:** Unified the mobile/desktop switch at 1024/1025px, added restrained current-page indicators and `aria-current`, moved the brand hotspot before the primary navigation in the DOM, and retained a visible skip link.

**Result:** At 1024px the compact menu is used; at 1280px the full primary navigation is used. Desktop keyboard order is skip link → brand/home → Products → Projects. The mobile menu opens with Enter and closes with Escape.

## Chrome verification

Public routes checked: Home, Products, Projects, Research, Capabilities, News, both news articles, About and Contact.

Widths checked: 1920, 1440, 1280, 1024, 768, 390, 375 and 320px.

- 80/80 route and viewport combinations: no horizontal overflow
- 80/80: exactly one `main` and one H1
- Current-page state present on representative Home, About and Contact checks
- Desktop and mobile hero inspected visually after implementation
- No browser console errors in the final run

## Content integrity

No marketing copy, article text, dates, email address or English route content was changed during this pass. The work is limited to layout, styling, semantics and responsive behaviour.
