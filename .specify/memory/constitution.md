# Trackora Website Constitution

## Core Principles

### I. Arabic-First RTL Experience
Trackora Website MUST treat Arabic as the primary language and RTL as the default layout direction. Every page, component, spacing decision, animation direction, navigation pattern, and content hierarchy MUST be verified in RTL first. LTR support MAY be added later, but MUST NOT compromise Arabic readability or layout quality.

### II. Trackora Design System Fidelity
The website MUST use Trackora design system colors, typography rules, spacing rhythm, radius, shadows, and interaction states. Design tokens MUST be centralized before UI implementation begins. If exact Trackora color tokens are unavailable, implementation MUST pause for clarification rather than inventing a new brand palette.

### III. Marketing Clarity Over App Complexity
The website is a separate Nuxt marketing website, not the Trackora product application. It MUST focus on public marketing pages, conversion, trust, product explanation, SEO, and call-to-action flows. It MUST NOT introduce authenticated product features, dashboards, business logic, or backend application concerns unless explicitly specified.

### IV. Performance, SEO, And Accessibility By Default
Every implemented page MUST be server-renderable or statically generatable through Nuxt where appropriate, include page-level metadata, use semantic HTML, support keyboard navigation, and maintain accessible contrast. The site SHOULD target fast first load, optimized assets, and crawlable Arabic content.

### V. Minimal, Maintainable Nuxt Structure
Implementation MUST prefer the smallest Nuxt 4 structure that satisfies the website needs. New dependencies MUST be justified by clear user value. Shared styles, content, and design tokens MUST be organized predictably without premature abstraction.

## Technical Constraints

The project uses Nuxt 4, Vue 3, TypeScript-capable configuration, and the existing `app/` directory structure.

The website MUST remain a standalone marketing site for Trackora.

The site MUST use Arabic content as the primary authored content.

The root HTML direction MUST default to `rtl`.

The root HTML language MUST default to `ar`.

Design tokens MUST be defined before page UI work begins.

## Development Workflow

Development MUST follow Spec Kit phases: Constitution, Specification, Plan, Tasks, Checklist, then Implementation only after approval.

Each user story MUST be independently deliverable and testable.

Implementation SHOULD proceed in MVP slices: Arabic homepage and global foundation first, product value and feature explanation next, trust/conversion/SEO polish last.

Quality gates MUST include: Nuxt build succeeds, Arabic RTL layout verified on desktop and mobile, no placeholder Nuxt starter UI remains, metadata and semantic structure exist for public pages, Trackora design tokens are used consistently.

## Governance

This constitution supersedes ad hoc implementation choices for Trackora Website.

Any deviation from Arabic-first RTL, Trackora design system tokens, marketing-only scope, or Nuxt minimalism MUST be documented in `plan.md` with justification.

**Version**: 1.0.0 | **Ratified**: 2026-05-16 | **Last Amended**: 2026-05-16