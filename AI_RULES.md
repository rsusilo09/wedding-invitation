# AI_RULES.md

## Project Overview

This is a digital wedding invitation platform.

The application allows couples to create and share personalized wedding invitations with:

* Event information
* Countdown timer
* RSVP management
* Gallery
* Story timeline
* Gift information
* Guest-specific invitation links
* Background music
* Live streaming links

Primary goals:

* Fast loading
* Mobile-first experience
* Elegant and premium design
* SEO friendly
* Reusable architecture

---

## Tech Stack

* React / Next.js
* TypeScript
* Ant Design
* React Query
* Zustand
* Axios

---

## Architecture Rules

### Separation of Concerns

Business logic must be separated from UI.

Prefer:

* hooks = business logic
* components = presentation
* services = API communication
* store = global state
* pages = composition layer

Do not place API calls directly inside components.

---

## Component Rules

Components must:

* Be reusable
* Have single responsibility
* Be strongly typed
* Use descriptive props

Prefer:

* EventCard
* GallerySection
* CoupleSection

Avoid:

* Big components exceeding 300 lines
* Deep prop drilling

---

## TypeScript Rules

Always:

* Use interfaces for API models
* Avoid any
* Prefer explicit typing

Bad:

const data: any

Good:

interface Guest {
id: string
name: string
}

---

## UI Rules

### Design Style

Theme:

* Elegant
* Modern
* Premium
* Romantic

Avoid:

* Corporate dashboard style
* Overly colorful layouts
* Excessive shadows

Use:

* Consistent spacing
* Consistent typography
* Soft animations

---

## Responsive Rules

Mobile-first approach.

Target screens:

* Mobile
* Tablet
* Desktop

All sections must be responsive.

Avoid horizontal scrolling.

---

## Wedding Invitation Sections

Supported sections:

* Hero
* Couple Profile
* Countdown
* Event Details
* Timeline
* Gallery
* RSVP
* Wedding Gift
* Love Story
* Live Streaming
* Footer

New features should integrate into existing sections before creating new ones.

---

## Performance Rules

Optimize for Core Web Vitals.

Use:

* Lazy loading
* Dynamic import
* Image optimization

Avoid:

* Unnecessary re-renders
* Large bundle sizes

---

## Accessibility Rules

All interactive elements must:

* Have labels
* Be keyboard accessible
* Have sufficient contrast

Images must include alt text.

---

## SEO Rules

Every invitation page should include:

* Title
* Description
* Open Graph tags
* Structured metadata

Prioritize SEO-friendly implementation.

---

## API Rules

API communication belongs in services.

Example:

services/
invitation.service.ts
guest.service.ts
rsvp.service.ts

Do not duplicate API logic.

---

## State Management Rules

Use local state first.

Use global state only when:

* Shared across multiple pages
* Required globally

Avoid unnecessary global state.

---

## Naming Convention

Variables:
camelCase

Components:
PascalCase

Hooks:
useXxx

Services:
xxxService

Files:
kebab-case or feature-based structure

---

## Code Generation Rules

When generating code:

* Preserve existing functionality
* Preserve TypeScript types
* Do not introduce any
* Follow project architecture
* Reuse existing components
* Avoid duplicate logic

When refactoring:

* Keep behavior unchanged
* Improve readability
* Reduce complexity
* Maintain responsiveness

---

## UI Refactor Rules

If redesigning a page:

* Keep business logic untouched
* Keep API integration untouched
* Focus on presentation layer only
* Maintain responsiveness
* Maintain accessibility
