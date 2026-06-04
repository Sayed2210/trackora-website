# Implementation Plan: Public Plans Pricing Integration

**Branch**: `feature/website-public-plans-pricing` | **Date**: 2026-06-02 | **Spec**: `specs/002-public-plans-pricing-integration/spec.md`
**Input**: Feature specification from `specs/002-public-plans-pricing-integration/spec.md`

## Summary

Replace permanent static pricing plans on `/pricing` with backend-driven public plans from `GET /public/plans`. Use Nuxt runtime config for the API base URL, keep the integration public-only, add a typed plan model and composable/service, render robust loading/error/empty states, and allow mock fallback only in local development when the public API fails.

## Technical Context

**Language/Version**: Vue 3.5, Nuxt 4.4, TypeScript-capable Nuxt app
**Primary Dependencies**: `nuxt`, `vue`, `@nuxtjs/i18n`, `@nuxt/content`
**Storage**: None in website
**API Integration**: `GET /public/plans` via `runtimeConfig.public.apiBaseUrl`
**Testing**: `npm run build`, manual `/pricing` API state checks, RTL/LTR responsive QA
**Target Platform**: Public SSR/static-capable Nuxt website
**Project Type**: Frontend marketing website
**Performance Goals**: Lightweight pricing fetch, no new dependency, no protected calls
**Constraints**: Arabic default RTL, English LTR readiness, no permanent hardcoded plans, development fallback only
**Scale/Scope**: `/pricing`, pricing card UI, public plans service/composable, pricing states, optional pricing preview decision

## Constitution Check

- Arabic-first RTL: PASS. Arabic remains default and pricing must be RTL-safe.
- Public website scope: PASS. No authenticated dashboard or System Owner UI is introduced.
- API safety: PASS. Only `GET /public/plans` is allowed.
- Source of truth: PASS. System Owner-managed public plans replace permanent website static plans.
- Maintainability: PASS. Use a typed composable/service and existing Nuxt runtime config.
- Accessibility/UX: PASS. Loading, empty, and error states are explicit and polished.

## Current State

- `app/pages/pricing.vue` currently imports `pricingPlans` from `~/data/pricing`.
- `app/data/pricing.ts` contains permanent static plans.
- `app/components/sections/PricingPreviewSection.vue` also imports `pricingPlans`.
- `nuxt.config.ts` already exposes `runtimeConfig.public.apiBaseUrl`.
- Existing service pattern lives in `app/composables/useTrackingService.ts`.
- i18n locale files exist at `i18n/locales/ar.json` and `i18n/locales/en.json`.

## Project Structure

### Documentation

```text
specs/002-public-plans-pricing-integration/
├── spec.md
├── plan.md
├── tasks.md
└── checklist.md
```

### Source Code Plan

```text
app/
├── components/
│   └── pricing/
│       ├── PricingCard.vue
│       ├── PricingLoadingState.vue
│       ├── PricingEmptyState.vue
│       └── PricingErrorState.vue
├── composables/
│   └── usePublicPlansService.ts
├── pages/
│   └── pricing.vue
└── types/
    └── pricing.ts
```

**Structure Decision**: Use a new pricing component folder because pricing is page-specific but has multiple states. Use `app/composables/usePublicPlansService.ts` to match the existing composable service style. Use `app/types/pricing.ts` for `PublicPlan`.

## API Contract

Endpoint:

```text
GET /public/plans
```

Allowed endpoint only:

```text
/public/plans
```

Forbidden endpoint classes:

```text
/system-owner/*
/admin/*
/plans/*
/protected/*
```

Expected public plan shape:

```ts
export interface PublicPlan {
  id: string
  slug: string
  name: string
  description: string
  priceMonthly: number | null
  priceYearly: number | null
  currency: string
  shipmentLimit: number | null
  features: string[]
  isPopular: boolean
  ctaLabel: string
  ctaHref: string
}
```

## Service Plan

`usePublicPlansService` should expose:

```ts
{
  plans,
  loading,
  error,
  isEmpty,
  usedFallback,
  fetchPlans,
  reset
}
```

Behavior:

- Build URL from `runtimeConfig.public.apiBaseUrl`.
- Request `GET /public/plans`.
- Normalize response into `PublicPlan[]`.
- Preserve backend order.
- Treat missing or empty plans as empty state.
- In development only, if API fails, populate fallback mock plans and set `usedFallback`.
- In production, do not use fallback and show error.
- Do not hide API failure silently.

## Pricing Page Plan

`/pricing` should:

- Fetch public plans on page load.
- Show loading state while pending.
- Show error state when production API request fails.
- Show empty state when no plans are returned.
- Show pricing cards when plans exist.
- Highlight plans where `isPopular` is true.
- Render `features`.
- Format `priceMonthly`, `priceYearly`, `currency`, and `shipmentLimit`.
- Force CTA destination to `/request-demo?plan=<slug>`.
- Preserve existing hero, FAQ, and final CTA where still appropriate.
- Remove permanent dependency on `app/data/pricing.ts` for page plans.

## Local Development Fallback Plan

Fallback mock plans:

- Live near the public plans service or a clearly named dev-only mock file.
- Are used only when `import.meta.dev` is true and API fetch fails.
- Must set `usedFallback` so UI can disclose local fallback.
- Must not be used in production.
- Must not replace API success data.

## i18n And RTL Plan

- Arabic remains default locale and RTL.
- English remains secondary LTR.
- State messages should use `i18n/locales/ar.json` and `i18n/locales/en.json`.
- Currency formatting should use `Intl.NumberFormat` with active locale and support `EGP`.
- CSS should use logical properties where possible.
- Cards must wrap long Arabic feature text without horizontal overflow.

## Verification Plan

- Run `npm run build`.
- Manually open `/pricing` with API success.
- Manually simulate API loading.
- Manually simulate API failure in development and verify fallback disclosure.
- Manually simulate API failure in production mode expectation and verify error state.
- Manually simulate empty plans response.
- Verify CTA URLs include `?plan=<slug>`.
- Verify no protected endpoint strings are introduced.
- Verify `/pricing` no longer imports permanent static plans.
