# Quality Checklist: Public Plans Pricing Integration

**Purpose**: Validate planning and future implementation for backend-driven public pricing plans.
**Created**: 2026-06-02
**Feature**: `specs/002-public-plans-pricing-integration/spec.md`

## Scope

- [ ] CHK001 Feature branch is planned as `feature/website-public-plans-pricing`.
- [ ] CHK002 Scope is limited to public website pricing integration.
- [ ] CHK003 No Vue/Nuxt implementation is included in planning-only phase.
- [ ] CHK004 No package installation is required.
- [ ] CHK005 No authenticated dashboard or System Owner UI is introduced.

## API Integration

- [ ] CHK006 `/pricing` calls `GET /public/plans`.
- [ ] CHK007 API URL uses `runtimeConfig.public.apiBaseUrl`.
- [ ] CHK008 No System Owner protected endpoint is called.
- [ ] CHK009 Backend public plans are the source of truth.
- [ ] CHK010 Plan order matches backend response order.
- [ ] CHK011 API failure is not hidden silently.

## Public Plan Shape

- [ ] CHK012 `id` is supported.
- [ ] CHK013 `slug` is supported.
- [ ] CHK014 `name` is supported.
- [ ] CHK015 `description` is supported.
- [ ] CHK016 `priceMonthly` is supported.
- [ ] CHK017 `priceYearly` is supported.
- [ ] CHK018 `currency` is supported.
- [ ] CHK019 `shipmentLimit` is supported.
- [ ] CHK020 `features` is supported.
- [ ] CHK021 `isPopular` is supported.
- [ ] CHK022 `ctaLabel` is supported.
- [ ] CHK023 `ctaHref` is supported or safely normalized.

## Pricing UI

- [ ] CHK024 Loading state is visible and polished.
- [ ] CHK025 Error state is visible and polished.
- [ ] CHK026 Empty state is visible and polished.
- [ ] CHK027 Pricing cards render public plans.
- [ ] CHK028 Popular plan is visually highlighted.
- [ ] CHK029 Features render correctly.
- [ ] CHK030 CTA navigates to `/request-demo?plan=<slug>`.
- [ ] CHK031 More or fewer plans than the current static layout render safely.
- [ ] CHK032 Long feature text wraps without layout break.

## Development Fallback

- [ ] CHK033 Mock plans are allowed only in development.
- [ ] CHK034 Mock plans appear only when API fails in development.
- [ ] CHK035 Development fallback is disclosed through UI or state.
- [ ] CHK036 Production never displays fallback mock plans.
- [ ] CHK037 Production API failure displays error state.

## Arabic, RTL, And i18n

- [ ] CHK038 Arabic remains default locale.
- [ ] CHK039 Arabic pricing layout is RTL-safe.
- [ ] CHK040 English pricing layout is LTR-ready.
- [ ] CHK041 Pricing state labels are localized.
- [ ] CHK042 Currency formatting supports EGP.
- [ ] CHK043 Monthly and yearly prices display clearly.
- [ ] CHK044 Shipment limits display clearly.

## Static Data Cleanup

- [ ] CHK045 `/pricing` no longer imports permanent static plans.
- [ ] CHK046 No permanent hardcoded pricing data remains as `/pricing` source of truth.
- [ ] CHK047 Any retained mock plans are clearly development fallback only.
- [ ] CHK048 Existing `PricingPreviewSection` static usage is reviewed and documented.

## Verification

- [ ] CHK049 `npm run build` passes.
- [ ] CHK050 `/pricing` works with successful API response.
- [ ] CHK051 `/pricing` works with empty API response.
- [ ] CHK052 `/pricing` works with API failure in development.
- [ ] CHK053 `/pricing` works with API failure in production expectation.
- [ ] CHK054 CTA query string includes selected plan slug.
- [ ] CHK055 No protected endpoint strings are introduced.
- [ ] CHK056 Desktop responsive layout is valid.
- [ ] CHK057 Tablet responsive layout is valid.
- [ ] CHK058 Mobile 375px layout has no horizontal overflow.
