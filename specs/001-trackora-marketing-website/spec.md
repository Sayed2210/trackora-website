# Feature Specification: Trackora Marketing Website

**Feature Branch**: `001-trackora-marketing-website`
**Created**: 2026-05-16
**Status**: Draft
**Input**: Expand the current Phase 0 landing page into the full Arabic-first Trackora marketing website.

## Overview

Trackora Website is a standalone Nuxt marketing website for Trackora. The existing single-page homepage remains Phase 0 / MVP Landing Page. The full website expands into product feature pages, solution pages, pricing, demo request, contact, blog, and public shipment tracking.

The website MUST be Arabic-first with English as a secondary locale. It MUST support RTL/LTR switching, localized SEO metadata, reusable website layout components, reusable base UI components, public tracking API integration, blog content, and graceful loading, empty, and error states.

## Phases

- **Phase 0 / MVP Landing Page**: Keep current `/` homepage scope as the initial landing page with hero, problems, features preview, how it works, pricing preview, demo CTA, and FAQ.
- **Phase 1 / Website Foundation**: Add routing structure, layouts, navigation, footer, i18n foundation, design system components, and runtime config.
- **Phase 2 / Feature And Solution Pages**: Add full product feature pages and solution landing pages.
- **Phase 3 / Conversion Pages**: Add pricing, request demo, contact, and form service placeholders.
- **Phase 4 / Public Tracking**: Add `/track` and `/track/[trackingNumber]` with API integration and mock fallback.
- **Phase 5 / Blog And SEO**: Add Nuxt Content blog index/detail pages, initial Arabic articles, localized SEO metadata.
- **Phase 6 / Verification**: Validate routes, responsive layouts, accessibility, SEO, static generation/build, API state handling, and localization.

## User Scenarios & Testing

### User Story 1 - Visitor Understands Trackora From Homepage (Priority: P1)

An Arabic-speaking visitor lands on `/` and quickly understands Trackora's value for delivery, courier, merchant, COD, fraud, and operational tracking.

**Independent Test**: Open `/` in Arabic on desktop and mobile and verify the landing page communicates Trackora's value and links to deeper pages.

**Acceptance Scenarios**:

1. **Given** a visitor opens `/`, **When** the page loads, **Then** the homepage shows a clear Arabic hero, CTA, problems, features preview, how-it-works, pricing preview, demo CTA, and FAQ.
2. **Given** a mobile visitor opens `/`, **When** they scroll, **Then** all sections remain readable, RTL, and free of horizontal overflow.
3. **Given** a visitor wants details, **When** they choose feature or solution links, **Then** navigation routes to the relevant detail page.

### User Story 2 - Visitor Explores Product Features (Priority: P1)

A visitor can browse all Trackora feature pages and understand how each product capability works.

**Independent Test**: Open `/features` and each feature detail route and confirm each page has clear Arabic content, CTA, SEO metadata, and related links.

**Acceptance Scenarios**:

1. **Given** a visitor opens `/features`, **When** the page loads, **Then** it lists all core Trackora features with links to detail pages.
2. **Given** a visitor opens a feature detail page, **When** they read it, **Then** the page explains the problem, Trackora solution, benefits, workflow, and CTA.
3. **Given** a visitor reaches the end of a feature page, **When** they need next steps, **Then** they can request a demo or explore related pages.

### User Story 3 - Visitor Finds Their Business Solution (Priority: P1)

Shipping companies, ecommerce stores, and social sellers can each find a dedicated solution page.

**Independent Test**: Open each `/solutions/*` route and verify audience-specific Arabic content and conversion CTA.

**Acceptance Scenarios**:

1. **Given** a shipping company visitor opens `/solutions/shipping-companies`, **When** they read the page, **Then** the content speaks to dispatch, couriers, COD, operations, and visibility.
2. **Given** an ecommerce store visitor opens `/solutions/ecommerce-stores`, **When** they read the page, **Then** the content speaks to order delivery, tracking, returns, and customer experience.
3. **Given** a social seller opens `/solutions/social-sellers`, **When** they read the page, **Then** the content speaks to simple order upload, delivery follow-up, COD, and fraud protection.

### User Story 4 - Visitor Compares Pricing And Requests Demo (Priority: P1)

A qualified lead can review pricing direction, request a demo, or contact Trackora.

**Independent Test**: Open `/pricing`, `/request-demo`, and `/contact`; verify forms, validation states, and success/error placeholders.

**Acceptance Scenarios**:

1. **Given** a visitor opens `/pricing`, **When** pricing loads, **Then** plan cards or pricing guidance appear with Arabic labels and CTAs.
2. **Given** a visitor submits `/request-demo`, **When** required fields are valid, **Then** the placeholder request demo service handles loading and success state.
3. **Given** a visitor submits `/contact`, **When** required fields are invalid, **Then** validation messages appear in the active locale.

### User Story 5 - User Tracks A Shipment Publicly (Priority: P1)

A customer can enter a tracking number and view public shipment tracking status.

**Independent Test**: Open `/track`, submit a tracking number, and confirm navigation to `/track/[trackingNumber]` with loading, success, empty, error, and local mock fallback behavior.

**Acceptance Scenarios**:

1. **Given** a visitor opens `/track`, **When** they enter a valid tracking number, **Then** they navigate to `/track/[trackingNumber]`.
2. **Given** `/track/[trackingNumber]` loads, **When** the API succeeds, **Then** the page displays shipment summary and timeline.
3. **Given** the API returns not found, **When** tracking data is empty, **Then** the page displays a localized empty state.
4. **Given** local development has no API, **When** mock fallback is enabled, **Then** the page displays mock shipment data.
5. **Given** the API fails, **When** the page cannot load tracking data, **Then** the page shows a localized error state with retry or return action.

### User Story 6 - Visitor Reads Blog Content (Priority: P2)

Visitors can browse Arabic blog articles and open detail pages with SEO metadata.

**Independent Test**: Open `/blog` and `/blog/[slug]`; verify article cards, detail content, localized metadata, and fallback for missing slugs.

**Acceptance Scenarios**:

1. **Given** a visitor opens `/blog`, **When** articles exist, **Then** Arabic article cards appear with title, excerpt, date, and links.
2. **Given** a visitor opens `/blog/[slug]`, **When** the article exists, **Then** the page renders the full article using Nuxt Content.
3. **Given** a visitor opens an invalid slug, **When** content is missing, **Then** a proper not-found state appears.

### User Story 7 - Visitor Switches Language (Priority: P2)

A visitor can switch between Arabic and English with correct direction and SEO metadata.

**Independent Test**: Use the language switcher on multiple routes and verify Arabic uses RTL, English uses LTR, translated labels update, and metadata changes.

**Acceptance Scenarios**:

1. **Given** Arabic is active, **When** a visitor switches to English, **Then** document direction changes to LTR and English content appears.
2. **Given** English is active, **When** a visitor switches to Arabic, **Then** document direction changes to RTL and Arabic content appears.
3. **Given** a localized page is crawled, **When** metadata is inspected, **Then** locale-specific title, description, and alternate links are available where supported.

## Required Routes And Acceptance Criteria

- `/`: MUST show the Phase 0 / MVP landing page with hero, problems, feature preview, how it works, pricing preview, demo CTA, FAQ, localized SEO, and links to primary routes.
- `/features`: MUST list all core features with cards linking to detail pages and a demo CTA.
- `/features/smart-dispatch`: MUST explain dispatch automation, courier assignment, routing visibility, and operational benefits.
- `/features/courier-app`: MUST explain courier mobile workflow, status updates, proof of delivery, and location visibility.
- `/features/merchant-portal`: MUST explain merchant shipment management, order visibility, reports, and customer communication.
- `/features/cod-wallet`: MUST explain COD collection, wallet balances, settlements, reports, and reconciliation.
- `/features/bulk-upload`: MUST explain batch order upload, validation, import feedback, and merchant use cases.
- `/features/fraud-detection`: MUST explain suspicious order detection, risk indicators, prevention benefits, and operational trust.
- `/solutions/shipping-companies`: MUST speak to logistics operators with dispatch, courier, COD, tracking, and performance benefits.
- `/solutions/ecommerce-stores`: MUST speak to online stores with delivery visibility, customer tracking, returns, COD, and merchant portal benefits.
- `/solutions/social-sellers`: MUST speak to Instagram/WhatsApp/TikTok sellers with simple upload, COD follow-up, tracking, and fraud prevention benefits.
- `/pricing`: MUST show pricing plan guidance, feature comparison or package structure, FAQ, and demo CTA.
- `/request-demo`: MUST show a localized demo request form with validation, loading, success, and error states using `useRequestDemoService`.
- `/contact`: MUST show contact channels and a localized contact form with validation, loading, success, and error states.
- `/blog`: MUST show a Nuxt Content-powered article index with localized article metadata, empty state, and SEO metadata.
- `/blog/[slug]`: MUST show an article detail page, article SEO metadata, localized content body, and not-found state for invalid slugs.
- `/track`: MUST show a tracking number input, validation, submit behavior, loading state, and guidance text.
- `/track/[trackingNumber]`: MUST call `GET /tracking/:trackingNumber`, show shipment summary, timeline UI, loading, empty, error states, and local mock fallback.

## Edge Cases

- Small mobile widths must not create horizontal scrolling in RTL or LTR.
- Mixed Arabic and English product terms must render with correct bidirectional behavior.
- Tracking API may be unavailable during development; mock fallback must handle this.
- Blog content directory may be empty; index must show an empty state.
- Invalid tracking numbers must show a clear empty state, not a crash.
- Invalid blog slugs must show a not-found state, not a crash.
- Language switcher must not lose the current route context.
- Login dropdown must link externally and must not implement authentication in the website.
- Forms must validate on submit and show inline errors in the active locale.
- CTA destinations for features, solutions, pricing, demo, and contact must use internal routes.
- Nuxt starter content must be fully removed.
- Decorative graphics must not reduce text contrast or accessibility.

## Requirements

### Functional Requirements

- **FR-001**: The website MUST be a standalone Nuxt marketing website for Trackora.
- **FR-002**: The existing single-page homepage MUST remain Phase 0 / MVP Landing Page scope.
- **FR-003**: The full website MUST include all required routes listed above.
- **FR-004**: Arabic MUST be the default locale.
- **FR-005**: English MUST be supported as a secondary locale.
- **FR-006**: Arabic pages MUST render RTL.
- **FR-007**: English pages MUST render LTR.
- **FR-008**: The site MUST include `WebsiteNavbar`, `WebsiteFooter`, `LanguageSwitcher`, `LoginDropdown`, and `MobileMenu`.
- **FR-009**: The site MUST include `AppButton`, `AppCard`, `AppBadge`, `AppSectionHeader`, `AppContainer`, `AppInput`, and `AppTextarea`.
- **FR-010**: The homepage MUST include `HeroSection`, `ProblemsSection`, `FeaturesSection`, `HowItWorksSection`, `PricingPreviewSection`, `DemoCtaSection`, and `FaqSection`.
- **FR-011**: Runtime config MUST expose a public API base URL.
- **FR-012**: Public tracking MUST use `useTrackingService`.
- **FR-013**: Demo requests MUST use `useRequestDemoService` placeholder until the real endpoint is available.
- **FR-014**: API-driven UI MUST include loading, empty, and error states.
- **FR-015**: `/track/[trackingNumber]` MUST call `GET /tracking/:trackingNumber`.
- **FR-016**: Public tracking MUST support mock fallback for local development.
- **FR-017**: Blog pages MUST use Nuxt Content.
- **FR-018**: Blog content MUST include initial Arabic articles.
- **FR-019**: Every route MUST define localized SEO metadata.
- **FR-020**: Navigation MUST be responsive and include a mobile menu.
- **FR-021**: Login dropdown MUST link to configured app/login destinations without implementing authentication.
- **FR-022**: All pages MUST use Trackora design tokens.
- **FR-023**: All forms MUST include accessible labels, validation messages, and keyboard usability.
- **FR-024**: The website MUST support `npm run build` and SHOULD support `npm run generate`.

### Key Entities

- **Route Page**: Public Nuxt page mapped to a required route.
- **Locale**: Language-direction pair, Arabic/RTL by default and English/LTR secondary.
- **Navigation Item**: Header or mobile menu link with localized label and route target.
- **Feature Page Content**: Problem, solution, benefits, workflow, CTA, SEO metadata.
- **Solution Page Content**: Audience-specific pain points, Trackora fit, benefits, CTA, SEO metadata.
- **Tracking Result**: Public shipment status, summary, timeline events, recipient-safe display fields.
- **Timeline Event**: Shipment status update with label, timestamp, location, and state.
- **Demo Request**: Lead submission payload for company/contact/use case information.
- **Blog Article**: Nuxt Content document with slug, locale, title, excerpt, date, tags, body, and SEO metadata.

## Success Criteria

- **SC-001**: All required routes render without runtime errors.
- **SC-002**: Arabic default routes render RTL and English routes render LTR.
- **SC-003**: Every route has localized title and description metadata.
- **SC-004**: Public tracking shows success, loading, empty, error, and mock fallback behavior.
- **SC-005**: Request demo and contact forms show validation, loading, success, and error states.
- **SC-006**: Blog index and detail pages render from Nuxt Content.
- **SC-007**: Mobile navigation works on 375px viewport without horizontal overflow.
- **SC-008**: `npm run build` succeeds.
- **SC-009**: No authenticated dashboard or product app UI is implemented in the marketing website.
- **SC-010**: All visible UI uses Trackora design tokens and reusable components.

## Assumptions

- Trackora design system color values use the teal/navy primary with warm gold accent palette.
- The website does not require a backend, database, or authentication.
- Login dropdown links point to external Trackora application URLs that will be provided later.
- Tracking API endpoint will be configured via runtime config environment variable.
- Mock tracking data is used during local development.
- Demo request and contact form submissions are placeholder until the real API endpoint is available.
- Existing Nuxt scripts in `package.json` remain the primary development and verification commands.
- The current repository is dedicated to the website and separate from the Trackora product application.