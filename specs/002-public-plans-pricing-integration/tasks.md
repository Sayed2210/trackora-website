# Tasks: Public Plans Pricing Integration

**Input**: `spec.md`, `plan.md`
**Scope**: Planning for replacing static `/pricing` plans with public backend plans.

## Phase 1: Git And Planning Setup

- [ ] T001 Create or switch to branch `feature/website-public-plans-pricing`.
- [ ] T002 Create feature folder `specs/002-public-plans-pricing-integration/`.
- [ ] T003 Add `spec.md`, `plan.md`, `tasks.md`, and `checklist.md` for this phase.

## Phase 2: Public Plan Model And Service

- [ ] T004 Create `PublicPlan` type in `app/types/pricing.ts`.
- [ ] T005 Create `usePublicPlansService` in `app/composables/usePublicPlansService.ts`.
- [ ] T006 Implement `GET /public/plans` using `runtimeConfig.public.apiBaseUrl`.
- [ ] T007 Normalize the public plans response into `PublicPlan[]`.
- [ ] T008 Preserve backend-returned plan order without client-side sorting.
- [ ] T009 Expose `plans`, `loading`, `error`, `isEmpty`, `usedFallback`, `fetchPlans`, and `reset`.
- [ ] T010 Ensure no protected System Owner endpoint is referenced or called.

## Phase 3: Development Fallback

- [ ] T011 Add mock fallback plans for local development only.
- [ ] T012 Use fallback only when `import.meta.dev` is true and `GET /public/plans` fails.
- [ ] T013 Set `usedFallback` when mock plans are displayed.
- [ ] T014 Ensure production failures show error state and never fallback data.
- [ ] T015 Ensure fallback does not hide the failed API state silently.

## Phase 4: Pricing Components

- [ ] T016 Create `app/components/pricing/PricingCard.vue`.
- [ ] T017 Create `app/components/pricing/PricingLoadingState.vue`.
- [ ] T018 Create `app/components/pricing/PricingEmptyState.vue`.
- [ ] T019 Create `app/components/pricing/PricingErrorState.vue`.
- [ ] T020 Ensure `PricingCard` highlights `isPopular` plans.
- [ ] T021 Ensure `PricingCard` renders plan features safely.
- [ ] T022 Ensure `PricingCard` CTA navigates to `/request-demo?plan=<slug>`.
- [ ] T023 Ensure state components are polished, accessible, and RTL-safe.

## Phase 5: Pricing Page Integration

- [ ] T024 Update `app/pages/pricing.vue` to use `usePublicPlansService`.
- [ ] T025 Remove `/pricing` dependency on permanent `pricingPlans` static data.
- [ ] T026 Render loading state while plans are being fetched.
- [ ] T027 Render error state when plans fail in production.
- [ ] T028 Render empty state when no public plans are returned.
- [ ] T029 Render pricing cards when public plans exist.
- [ ] T030 Keep existing pricing hero, FAQ, and final CTA unless they conflict with public plan behavior.
- [ ] T031 Add development fallback disclosure when `usedFallback` is true.

## Phase 6: Formatting And Localization

- [ ] T032 Add Arabic pricing state labels to `i18n/locales/ar.json`.
- [ ] T033 Add English pricing state labels to `i18n/locales/en.json`.
- [ ] T034 Format monthly and yearly prices using active locale.
- [ ] T035 Ensure `EGP` currency displays correctly.
- [ ] T036 Ensure `shipmentLimit` displays clearly, including unlimited or null values.
- [ ] T037 Verify Arabic RTL card layout.
- [ ] T038 Verify English LTR card layout.

## Phase 7: Static Pricing Cleanup

- [ ] T039 Decide whether `app/data/pricing.ts` remains only for homepage preview or is removed.
- [ ] T040 If retained, ensure it is not used as permanent `/pricing` source of truth.
- [ ] T041 If pricing preview should also reflect backend plans, update `PricingPreviewSection` in a follow-up or include it in this phase.
- [ ] T042 Search repository for `pricingPlans` and remove any invalid permanent pricing usage.

## Phase 8: Verification

- [ ] T043 Run `npm run build`.
- [ ] T044 Verify `/pricing` with successful `GET /public/plans`.
- [ ] T045 Verify `/pricing` with empty plan response.
- [ ] T046 Verify `/pricing` with failed API in development and fallback visible.
- [ ] T047 Verify production failure shows error state and no fallback.
- [ ] T048 Verify popular plan visual highlight.
- [ ] T049 Verify feature lists render correctly.
- [ ] T050 Verify CTA route includes selected plan slug.
- [ ] T051 Verify no protected backend endpoint is called.
- [ ] T052 Verify no permanent hardcoded pricing data remains for `/pricing`.
- [ ] T053 Verify responsive layout at desktop, tablet, and 375px mobile.
- [ ] T054 Verify Arabic RTL and English LTR behavior.
