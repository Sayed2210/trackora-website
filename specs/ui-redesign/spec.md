# Feature Specification: Trackora Premium UI/UX Redesign

**Feature Branch**: `ui-redesign`
**Created**: 2026-05-17
**Status**: Draft
**Input**: Create planning artifacts only for a premium UI/UX redesign pass.

## Overview

Trackora already has the full marketing website functionality. This specification defines a planning-only premium UI/UX redesign pass that transforms the website from a normal SaaS website into a premium Apple-inspired storytelling product launch website.

The redesign MUST NOT copy Apple directly. It SHOULD use Apple-inspired product storytelling qualities: cinematic hero composition, large typography, premium spacing, minimal powerful copy, elegant motion, soft gradients, glass cards, product reveal sections, and a calm luxury SaaS feel.

The redesign MUST preserve all existing public functionality, routes, API behavior, i18n behavior, and pages. Implementation will later start with the Homepage only.

## Non-Goals

- Do not implement code during this planning step.
- Do not change routes.
- Do not change API logic.
- Do not change i18n logic.
- Do not remove existing pages.
- Do not introduce authenticated dashboard/product app UI.
- Do not introduce random visual colors.
- Do not add a heavy animation library unless already installed and explicitly justified in implementation planning.

## Required Brand Tokens

The redesign MUST use these Trackora tokens as the source of truth:

- **Primary**: `#1A3B66`
- **Primary Light**: `#3B5998`
- **Accent**: `#FF6B6B`
- **Text**: `#333333`
- **Text Secondary**: `#666666`
- **Background**: `#FFFFFF`
- **Surface**: `#F5F5F5`
- **Border**: `#E0E0E0`
- **Success**: `#22C55E`
- **Warning**: `#F59E0B`
- **Danger**: `#EF4444`
- **Info**: `#3B82F6`

Any additional visual colors for gradients, glows, overlays, shadows, glass surfaces, and state treatments MUST be derived from these tokens. No unrelated colors are allowed.

## Design Principles

- **Premium**: every page should feel deliberate, high-value, and refined.
- **Clean**: reduce clutter, avoid noisy cards, and create clear hierarchy.
- **Cinematic**: use scale, pacing, product reveals, and spatial composition to create launch-page energy.
- **Trustworthy**: logistics operators must feel the website represents stable, serious operational software.
- **Arabic-first**: Arabic copy and composition must feel native, not translated.
- **RTL-perfect**: layout, alignment, flow, timelines, cards, forms, and motion must work naturally in RTL first.
- **Conversion-focused**: each page should guide the visitor toward `request demo`, `track shipment`, or a relevant next step.
- **No template look**: avoid generic SaaS grids, repetitive icon cards, stock layouts, and interchangeable sections.

## UX Storytelling Strategy

The Homepage MUST tell this story:

1. **Before Trackora**: shipping teams are stuck in chaos with Excel sheets, manual dispatch, missing COD, fake orders, and customer calls.
2. **Product Reveal**: Trackora appears as the operating system for shipping companies.
3. **Workflow**: merchant upload -> risk validation -> smart dispatch -> courier delivery -> COD reconciliation -> public tracking.
4. **Trust**: Trackora improves visibility, speed, cash control, and fraud reduction.
5. **CTA**: the visitor is guided toward requesting a demo.

## Scope

The redesign plan covers:

- Homepage
- Navbar
- Footer
- Base components
- Feature pages
- Solution pages
- Pricing page
- Request demo page
- Contact page
- Public tracking page
- Blog index
- Blog article page

Implementation MUST later start with the Homepage only after design system polish is planned.

## User Scenarios & Testing

### User Story 1 - Visitor Experiences A Premium Homepage (Priority: P1)

An Arabic-first visitor opens the homepage and immediately understands Trackora as a premium logistics operating system, not a generic SaaS landing page.

**Independent Test**: Open `/` in Arabic and English on desktop and mobile. Verify the homepage tells the before/after story, reveals the product, shows workflow, communicates trust, and guides to request demo.

**Acceptance Scenarios**:

1. **Given** a visitor opens `/`, **When** the hero loads, **Then** it shows a cinematic headline, concise subheadline, request demo CTA, track shipment CTA, premium product visual, and floating logistics cards.
2. **Given** a visitor scrolls, **When** they reach the problem section, **Then** the page explains Excel chaos, manual dispatch, COD reconciliation, fake orders, and customer calls.
3. **Given** a visitor reaches the product reveal, **When** they read the section, **Then** Trackora is clearly positioned as the operating system for shipping companies.
4. **Given** a mobile visitor opens `/`, **When** they scroll, **Then** all sections remain readable, premium, RTL/LTR safe, and free of horizontal overflow.

### User Story 2 - Visitor Navigates A Premium Website Shell (Priority: P1)

A visitor uses the navbar, footer, language switcher, login dropdown, and mobile menu without losing access to any current route.

**Independent Test**: Navigate all top-level links on desktop and mobile in both locales.

**Acceptance Scenarios**:

1. **Given** the navbar is visible, **When** a visitor scans it, **Then** it feels premium, simple, and conversion-focused.
2. **Given** a visitor opens the mobile menu, **When** they use keyboard or touch navigation, **Then** the menu remains accessible and all existing destinations are preserved.
3. **Given** a visitor switches languages, **When** direction changes, **Then** the layout remains polished in RTL and LTR.

### User Story 3 - Visitor Explores Premium Feature And Solution Pages (Priority: P2)

A visitor opens any feature or solution page and sees a page that feels product-led, specific, and trustworthy.

**Independent Test**: Open each `/features/*` and `/solutions/*` route and verify the route remains intact with improved visual direction and clearer storytelling acceptance criteria.

**Acceptance Scenarios**:

1. **Given** a visitor opens a feature page, **When** they read it, **Then** it explains the problem, Trackora capability, workflow, benefits, and CTA with premium pacing.
2. **Given** a visitor opens a solution page, **When** they read it, **Then** it speaks directly to that audience and guides toward request demo.

### User Story 4 - Visitor Converts Through Premium Forms (Priority: P2)

A qualified lead can review pricing, request a demo, or contact Trackora through redesigned pages that preserve existing behavior.

**Independent Test**: Open `/pricing`, `/request-demo`, and `/contact`; verify forms and CTAs still work and no validation/service logic changes are introduced.

**Acceptance Scenarios**:

1. **Given** a visitor opens pricing, **When** they compare options, **Then** the page feels calm, clear, and premium.
2. **Given** a visitor submits request demo or contact forms, **When** validation runs, **Then** existing validation, loading, success, and error behavior remains unchanged.

### User Story 5 - Customer Tracks Shipment In A Trustworthy Interface (Priority: P2)

A shipment recipient uses public tracking and sees a polished, privacy-safe tracking experience.

**Independent Test**: Open `/track` and `/track/[trackingNumber]`; verify tracking service behavior, mock fallback, loading, empty, and error states remain intact.

**Acceptance Scenarios**:

1. **Given** a visitor enters a tracking number, **When** they submit it, **Then** navigation behavior remains unchanged.
2. **Given** tracking details load, **When** the summary and timeline render, **Then** they feel clear, trustworthy, and RTL/LTR safe.

### User Story 6 - Visitor Reads A Premium Blog Experience (Priority: P3)

A visitor browses and reads blog content in a more editorial, premium reading experience.

**Independent Test**: Open `/blog` and `/blog/[slug]`; verify Nuxt Content behavior remains unchanged and readability improves.

**Acceptance Scenarios**:

1. **Given** a visitor opens `/blog`, **When** articles exist, **Then** article cards feel editorial and readable.
2. **Given** a visitor opens an article, **When** they read it, **Then** typography, spacing, and RTL/LTR prose rhythm are comfortable.

## Page Scope Acceptance Criteria

- `/`: MUST be the first implementation target and MUST become the primary cinematic storytelling page.
- `/features`: MUST preserve all links while improving premium feature overview presentation.
- `/features/smart-dispatch`: MUST preserve route/content intent while using a premium feature detail structure.
- `/features/courier-app`: MUST preserve route/content intent while using a premium feature detail structure.
- `/features/merchant-portal`: MUST preserve route/content intent while using a premium feature detail structure.
- `/features/cod-wallet`: MUST preserve route/content intent while using a premium feature detail structure.
- `/features/bulk-upload`: MUST preserve route/content intent while using a premium feature detail structure.
- `/features/fraud-detection`: MUST preserve route/content intent while using a premium feature detail structure.
- `/solutions/shipping-companies`: MUST feel specific to shipping operators.
- `/solutions/ecommerce-stores`: MUST feel specific to ecommerce stores.
- `/solutions/social-sellers`: MUST feel specific to social sellers.
- `/pricing`: MUST feel calm, clear, and conversion-focused.
- `/request-demo`: MUST preserve form behavior and improve conversion focus.
- `/contact`: MUST preserve form behavior and improve contact clarity.
- `/blog`: MUST preserve content loading and improve editorial browsing.
- `/blog/[slug]`: MUST preserve content loading and improve reading experience.
- `/track`: MUST preserve tracking input behavior and improve trust.
- `/track/[trackingNumber]`: MUST preserve API/mock behavior and improve tracking summary/timeline clarity.

## Requirements

### Functional Requirements

- **FR-001**: The redesign MUST preserve every existing route.
- **FR-002**: The redesign MUST NOT change API logic.
- **FR-003**: The redesign MUST NOT change i18n logic.
- **FR-004**: The redesign MUST NOT remove existing pages.
- **FR-005**: The redesign MUST preserve Arabic as the default RTL locale.
- **FR-006**: The redesign MUST preserve English as the secondary LTR locale.
- **FR-007**: The redesign MUST use only Trackora brand tokens and token-derived colors.
- **FR-008**: The redesign MUST include a premium visual system plan for typography, spacing, cards, buttons, sections, gradients, glass, shadows, borders, motion, responsive behavior, and RTL/LTR behavior.
- **FR-009**: The redesign MUST include component redesign plans for base, layout, homepage, tracking, and blog components.
- **FR-010**: The redesign MUST include page-by-page visual direction, layout changes, component usage, copy improvements, and acceptance criteria.
- **FR-011**: The redesign MUST include a motion plan that respects accessibility and `prefers-reduced-motion`.
- **FR-012**: The redesign MUST include implementation phases that start with design system polish and homepage redesign only.
- **FR-013**: The redesign MUST include atomic implementation tasks with ID, description, likely files, dependency, acceptance criteria, and parallelization status.
- **FR-014**: The redesign MUST include a checklist covering build, route safety, API safety, i18n safety, RTL/LTR, mobile, colors, premium homepage feel, tracking, forms, blog, and accessibility.

## Success Criteria

- **SC-001**: Planning artifacts exist at `specs/ui-redesign/spec.md`, `plan.md`, `tasks.md`, and `checklist.md`.
- **SC-002**: The plan clearly states that implementation starts with Homepage only.
- **SC-003**: The plan preserves routes, API logic, i18n logic, and existing pages.
- **SC-004**: The plan defines the premium storytelling strategy for the homepage.
- **SC-005**: The plan defines the full visual system and motion rules.
- **SC-006**: The task list is atomic and implementation-ready.
- **SC-007**: The checklist covers functional regression, visual quality, localization, responsive behavior, and accessibility.

## Assumptions

- The current Trackora marketing website functionality is complete.
- The current Nuxt/Vue app structure remains unchanged.
- Existing pages, components, i18n files, data files, services, and routes remain the implementation surfaces.
- Copy improvements may require locale file updates during later implementation, but i18n mechanics must not change.
- Product visuals may be represented with CSS/dashboard mockups unless approved assets are available.
