# Tasks: Trackora Marketing Website

**Input**: `spec.md`, `plan.md`
**Scope**: Preserve Phase 0 landing page and expand to full Trackora website.

## Phase 0: Preserve MVP Landing Page

- [ ] T001 Confirm existing `/` remains Phase 0 / MVP Landing Page.
- [ ] T002 Audit current homepage sections against required `HeroSection`, `ProblemsSection`, `FeaturesSection`, `HowItWorksSection`, `PricingPreviewSection`, `DemoCtaSection`, `FaqSection`.
- [ ] T003 Identify homepage content that should be reused versus rewritten for logistics/shipping positioning.

## Phase 1: Foundation

- [ ] T004 [P] Install `@nuxtjs/i18n` and configure Arabic default, English secondary
- [ ] T005 [P] Install `@nuxt/content` and configure for blog
- [ ] T006 Update `nuxt.config.ts` with runtime config, i18n, content, and global CSS
- [ ] T007 Create `app/i18n/ar.ts` Arabic translations
- [ ] T008 [P] Create `app/i18n/en.ts` English translations
- [ ] T009 Create `app/data/navigation.ts` localized navigation links
- [ ] T010 [P] Create `app/data/features.ts` feature content data
- [ ] T011 [P] Create `app/data/solutions.ts` solution content data
- [ ] T012 [P] Create `app/data/pricing.ts` pricing content data
- [ ] T013 Create `app/composables/useLocaleSeo.ts`

## Phase 2: Layout Components

- [ ] T014 Create `app/layouts/default.vue`
- [ ] T015 Create `app/components/layout/WebsiteNavbar.vue`
- [ ] T016 [P] Create `app/components/layout/WebsiteFooter.vue`
- [ ] T017 Create `app/components/layout/LanguageSwitcher.vue`
- [ ] T018 [P] Create `app/components/layout/LoginDropdown.vue`
- [ ] T019 Create `app/components/layout/MobileMenu.vue`
- [ ] T020 Update `app/app.vue` to use default layout
- [ ] T021 Verify desktop navigation links to all top-level routes
- [ ] T022 Verify mobile menu is keyboard accessible
- [ ] T023 Verify language switcher changes locale and direction

## Phase 3: Base Components

- [ ] T024 [P] Create `app/components/base/AppButton.vue`
- [ ] T025 [P] Create `app/components/base/AppCard.vue`
- [ ] T026 [P] Create `app/components/base/AppBadge.vue`
- [ ] T027 [P] Create `app/components/base/AppSectionHeader.vue`
- [ ] T028 [P] Create `app/components/base/AppContainer.vue`
- [ ] T029 [P] Create `app/components/base/AppInput.vue`
- [ ] T030 [P] Create `app/components/base/AppTextarea.vue`
- [ ] T031 Verify all base components use design tokens

## Phase 4: Homepage Sections

- [ ] T032 Create `app/components/sections/HeroSection.vue`
- [ ] T033 [P] Create `app/components/sections/ProblemsSection.vue`
- [ ] T034 [P] Create `app/components/sections/FeaturesSection.vue`
- [ ] T035 [P] Create `app/components/sections/HowItWorksSection.vue`
- [ ] T036 [P] Create `app/components/sections/PricingPreviewSection.vue`
- [ ] T037 [P] Create `app/components/sections/DemoCtaSection.vue`
- [ ] T038 [P] Create `app/components/sections/FaqSection.vue`
- [ ] T039 Refactor `/` to use section components
- [ ] T040 Add localized homepage SEO to `app/pages/index.vue`
- [ ] T041 Verify `/` acceptance criteria

## Phase 5: Feature Routes

- [ ] T042 Create `app/pages/features/index.vue`
- [ ] T043 [P] Create `app/pages/features/smart-dispatch.vue`
- [ ] T044 [P] Create `app/pages/features/courier-app.vue`
- [ ] T045 [P] Create `app/pages/features/merchant-portal.vue`
- [ ] T046 [P] Create `app/pages/features/cod-wallet.vue`
- [ ] T047 [P] Create `app/pages/features/bulk-upload.vue`
- [ ] T048 [P] Create `app/pages/features/fraud-detection.vue`
- [ ] T049 Add localized SEO to every feature route
- [ ] T050 Verify every feature route acceptance criterion

## Phase 6: Solution Routes

- [ ] T051 [P] Create `app/pages/solutions/shipping-companies.vue`
- [ ] T052 [P] Create `app/pages/solutions/ecommerce-stores.vue`
- [ ] T053 [P] Create `app/pages/solutions/social-sellers.vue`
- [ ] T054 Add audience-specific CTAs to each solution page
- [ ] T055 Add localized SEO to every solution route
- [ ] T056 Verify every solution route acceptance criterion

## Phase 7: Conversion Routes

- [ ] T057 Create `app/pages/pricing.vue`
- [ ] T058 Create `app/pages/request-demo.vue`
- [ ] T059 Create `app/pages/contact.vue`
- [ ] T060 Create `app/composables/useRequestDemoService.ts`
- [ ] T061 Add request demo form validation
- [ ] T062 Add request demo loading, success, and error states
- [ ] T063 Add contact form validation
- [ ] T064 Add contact loading, success, and error states
- [ ] T065 Add localized SEO to pricing, request demo, and contact pages
- [ ] T066 Verify conversion route acceptance criteria

## Phase 8: Public Tracking

- [ ] T067 Create `app/pages/track/index.vue`
- [ ] T068 Create `app/pages/track/[trackingNumber].vue`
- [ ] T069 Create `app/composables/useTrackingService.ts`
- [ ] T070 Implement `GET /tracking/:trackingNumber` integration
- [ ] T071 Add mock fallback data for local development
- [ ] T072 [P] Create `app/components/tracking/TrackingSummary.vue`
- [ ] T073 [P] Create `app/components/tracking/TrackingTimeline.vue`
- [ ] T074 [P] Create `app/components/tracking/TrackingEmptyState.vue`
- [ ] T075 [P] Create `app/components/tracking/TrackingErrorState.vue`
- [ ] T076 Add loading state for tracking routes
- [ ] T077 Add empty state for unknown tracking number
- [ ] T078 Add retry/return actions for error state
- [ ] T079 Add localized SEO to tracking routes
- [ ] T080 Verify `/track` and `/track/[trackingNumber]` acceptance criteria

## Phase 9: Blog

- [ ] T081 Verify `@nuxt/content` configuration is active
- [ ] T082 Create Arabic blog content directory under `app/content/ar/blog/`
- [ ] T083 Create English blog content directory under `app/content/en/blog/`
- [ ] T084 [P] Add initial Arabic article about smart dispatch
- [ ] T085 [P] Add initial Arabic article about COD management
- [ ] T086 [P] Add initial Arabic article about courier performance
- [ ] T087 [P] Add initial Arabic article about public shipment tracking
- [ ] T088 [P] Add initial Arabic article about fraud prevention
- [ ] T089 Create `app/pages/blog/index.vue`
- [ ] T090 Create `app/pages/blog/[slug].vue`
- [ ] T091 Add article empty state for `/blog`
- [ ] T092 Add not-found state for invalid article slug
- [ ] T093 Add localized SEO per article
- [ ] T094 Verify blog route acceptance criteria

## Phase 10: i18n And Locale QA

- [ ] T095 Verify Arabic is default locale
- [ ] T096 Verify English locale is available
- [ ] T097 Verify Arabic renders RTL
- [ ] T098 Verify English renders LTR
- [ ] T099 Verify navigation labels are translated
- [ ] T100 Verify form labels and validation messages are translated
- [ ] T101 Verify route SEO metadata changes by locale
- [ ] T102 Verify no layout break occurs when switching direction

## Phase 11: Verification

- [ ] T103 Run `npm run build`
- [ ] T104 Run `npm run generate` if static deployment is desired
- [ ] T105 Check all required routes manually
- [ ] T106 Check desktop responsive layout
- [ ] T107 Check tablet responsive layout at 768px
- [ ] T108 Check mobile responsive layout at 375px
- [ ] T109 Check keyboard navigation
- [ ] T110 Check visible focus states
- [ ] T111 Check color contrast
- [ ] T112 Check all loading, empty, and error states
- [ ] T113 Check localized SEO metadata
- [ ] T114 Confirm no authenticated dashboard/product app UI was implemented