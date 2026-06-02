# Feature Specification: Public Plans Pricing Integration

**Feature Branch**: `feature/website-public-plans-pricing`
**Created**: 2026-06-02
**Status**: Draft
**Input**: Integrate Trackora Website pricing page with backend public plans endpoint.

## Overview

The Trackora Website pricing page must display active public plans managed by the System Owner dashboard. The System Owner Plans module is the source of truth. The website must not rely on permanent hardcoded pricing plans.

The website must fetch public plans from `GET /public/plans` using the public runtime API base URL. It must not call protected System Owner endpoints. Local mock plans are allowed only as development fallback when the API fails, and production must show visible error or empty states.

## User Scenarios & Testing

### User Story 1 - Visitor Views Live Public Plans (Priority: P1)

A visitor opens `/pricing` and sees active plans returned by the backend public plans endpoint.

**Why this priority**: This is the core purpose of the phase and ensures website pricing reflects System Owner-managed plans.

**Independent Test**: Configure `NUXT_PUBLIC_API_BASE_URL`, open `/pricing`, and verify pricing cards render from `GET /public/plans` in the backend-returned order.

**Acceptance Scenarios**:

1. **Given** the backend returns active public plans, **When** `/pricing` loads, **Then** the page displays those plans in the exact order returned by the backend.
2. **Given** a plan has `isPopular: true`, **When** pricing cards render, **Then** that plan is visually highlighted.
3. **Given** a plan has a `features` list, **When** its card renders, **Then** all features are visible and readable.
4. **Given** a visitor clicks a plan CTA, **When** navigation occurs, **Then** they go to `/request-demo?plan=<slug>`.

### User Story 2 - Visitor Understands Loading, Error, And Empty States (Priority: P1)

A visitor receives clear feedback while pricing data is loading or unavailable.

**Why this priority**: API-driven pricing must not appear broken or silently fail.

**Independent Test**: Simulate loading, API failure, and empty response states on `/pricing`.

**Acceptance Scenarios**:

1. **Given** `/pricing` is waiting for the API, **When** plans are pending, **Then** a polished loading state is visible.
2. **Given** the API fails in production, **When** `/pricing` loads, **Then** a polished error state is shown and the failure is not silently hidden.
3. **Given** the API returns no plans, **When** `/pricing` loads, **Then** a polished empty state is shown.
4. **Given** the API fails in development, **When** fallback mock plans are available, **Then** fallback plans render with a clear development-only fallback indication.

### User Story 3 - Pricing Remains Arabic-First And Locale-Ready (Priority: P2)

Arabic visitors see RTL-safe pricing cards, and English readiness is preserved.

**Why this priority**: Trackora Website is Arabic-first, and pricing data must remain usable across locales.

**Independent Test**: Open `/pricing` in Arabic and English, inspect layout direction, currency formatting, CTA behavior, and card readability.

**Acceptance Scenarios**:

1. **Given** Arabic is active, **When** pricing cards render, **Then** layout remains RTL and Arabic-first.
2. **Given** English is active, **When** pricing cards render, **Then** layout remains LTR-ready.
3. **Given** currency is `EGP`, **When** prices render, **Then** monthly and yearly prices are formatted clearly for the active locale.
4. **Given** mixed Arabic/English plan content from the backend, **When** features render, **Then** text wraps safely without horizontal overflow.

## Edge Cases

- API base URL is missing.
- API returns an empty array.
- API returns malformed plan objects.
- API returns plans without features.
- API returns `priceMonthly` or `priceYearly` as null or zero.
- API returns more or fewer plans than current static UI expects.
- API fails in development and fallback mock plans are shown.
- API fails in production and no fallback is shown.
- Multiple plans are marked popular.
- No plans are marked popular.
- CTA fields from the backend are missing or point away from the required request-demo route.

## Requirements

### Functional Requirements

- **FR-001**: `/pricing` MUST fetch pricing plans from `GET /public/plans`.
- **FR-002**: The API request MUST use `runtimeConfig.public.apiBaseUrl`.
- **FR-003**: The website MUST NOT call protected System Owner endpoints.
- **FR-004**: The website MUST treat System Owner-managed public plans as the source of truth.
- **FR-005**: The website MUST NOT use permanent hardcoded pricing plans for `/pricing`.
- **FR-006**: Local mock plans MAY be used only as development fallback when the public API fails.
- **FR-007**: Production MUST show a visible error or empty state instead of mock plans when the API fails or returns no plans.
- **FR-008**: Public plan data MUST support `id`, `slug`, `name`, `description`, `priceMonthly`, `priceYearly`, `currency`, `shipmentLimit`, `features`, `isPopular`, `ctaLabel`, and `ctaHref`.
- **FR-009**: `/pricing` MUST display loading state while plans are being fetched.
- **FR-010**: `/pricing` MUST display error state when public plans cannot be loaded.
- **FR-011**: `/pricing` MUST display empty state when no public plans are returned.
- **FR-012**: `/pricing` MUST display pricing cards for returned plans.
- **FR-013**: Popular plans MUST be visually highlighted.
- **FR-014**: Plan features MUST render correctly.
- **FR-015**: Plan CTAs MUST navigate to `/request-demo?plan=<slug>`.
- **FR-016**: Public plans MUST render in the sort order returned by the backend.
- **FR-017**: Currency formatting MUST support EGP.
- **FR-018**: Arabic MUST remain default and RTL-safe.
- **FR-019**: English/i18n readiness MUST be preserved.
- **FR-020**: No packages MUST be installed for this phase unless later explicitly approved.

### Key Entities

- **PublicPlan**: Public active pricing plan returned by the backend. Fields: `id`, `slug`, `name`, `description`, `priceMonthly`, `priceYearly`, `currency`, `shipmentLimit`, `features`, `isPopular`, `ctaLabel`, `ctaHref`.
- **PricingState**: UI state for public plans loading, success, empty, error, and development fallback.
- **DevelopmentFallbackPlans**: Mock plans used only in development when the API fails.

## Success Criteria

- **SC-001**: `/pricing` loads plans from `GET /public/plans`.
- **SC-002**: Plans appear in the order returned by the backend.
- **SC-003**: Popular plan highlighting is visible.
- **SC-004**: Plan features render correctly.
- **SC-005**: CTA navigation includes the selected plan slug as `/request-demo?plan=<slug>`.
- **SC-006**: Loading, error, and empty states are visible and polished.
- **SC-007**: No protected backend endpoint is called.
- **SC-008**: No permanent hardcoded pricing data remains for `/pricing`.
- **SC-009**: Development fallback is only active in development and does not hide failures silently.
- **SC-010**: Arabic RTL and English LTR pricing layouts remain responsive.

## Assumptions

- Backend response is either an array of public plans or a wrapper that can be normalized without changing the public plan fields.
- Backend controls plan ordering.
- Backend exposes only active public plans through `GET /public/plans`.
- `ctaHref` from the backend is informational, but website CTA behavior must normalize to `/request-demo?plan=<slug>`.
- Existing `runtimeConfig.public.apiBaseUrl` remains the API base URL source.
