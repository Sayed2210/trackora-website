# Tasks: Phase 9 SEO + i18n Finalization

**Input**: `.specify/phase-9-seo-i18n/spec.md`, `.specify/phase-9-seo-i18n/plan.md`  
**Prerequisites**: plan.md, spec.md  
**Tests**: Build and manual rendered HTML validation are required.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel when touching different files.
- **[Story]**: Maps to user story in spec.md.
- Include exact file paths in descriptions.

## Phase 1: Audit

**Purpose**: Confirm current SEO, i18n, direction, accessibility, robots, and sitemap state before implementation.

- [ ] T001 [US1] Audit `app/pages/**/*.vue` for `useLocaleSeo`, `useHead`, missing metadata, hardcoded titles, and missing canonical support.
- [ ] T002 [US2] Audit `app/components/layout/LanguageSwitcher.vue` for route, params, hash, and query preservation.
- [ ] T003 [US3] Audit scoped pages and layout components for hardcoded `dir="rtl"` and Arabic-only `aria-label` values.
- [ ] T004 [US4] Audit `nuxt.config.ts` for production site URL, robots handling, sitemap handling, and i18n route strategy.
- [ ] T005 [US1] Audit `app/data/blog.ts`, `app/data/features.ts`, and `app/data/solutions.ts` for metadata fields and bilingual parity.

## Phase 2: SEO Foundation

**Purpose**: Create consistent localized SEO behavior before updating individual routes.

- [ ] T006 [US1] Extend `app/composables/useLocaleSeo.ts` or create a focused SEO helper for localized title, description, canonical URL, Open Graph, Twitter, robots, and article metadata.
- [ ] T007 [US1] Add production base URL handling needed for canonical and Open Graph URLs in `nuxt.config.ts` or runtime config.
- [ ] T008 [US1] Add support for locale-aware canonical paths under `prefix_except_default`.
- [ ] T009 [US1] Add support for optional `og:type`, `og:url`, `og:site_name`, `og:locale`, `og:locale:alternate`, and Twitter fields.
- [ ] T010 [US1] Add support for robots metadata with a noindex option for privacy-sensitive routes.

## Phase 3: Static Route Metadata

**Purpose**: Ensure all indexable static routes have localized route-specific metadata.

- [ ] T011 [US1] Update `app/pages/index.vue` with Arabic and English homepage metadata.
- [ ] T012 [US1] Update `app/pages/pricing.vue` with Arabic and English pricing metadata.
- [ ] T013 [US1] Update `app/pages/request-demo.vue` with Arabic and English demo request metadata.
- [ ] T014 [US1] Update `app/pages/contact.vue` with Arabic and English contact metadata.
- [ ] T015 [US1] Update `app/pages/track/index.vue` with Arabic and English indexable tracking lookup metadata.
- [ ] T016 [US1] Update `app/pages/features/index.vue` with Arabic and English feature overview metadata.

## Phase 4: Feature And Solution Metadata

**Purpose**: Ensure product detail pages expose precise localized metadata.

- [ ] T017 [P] [US1] Update `app/pages/features/smart-dispatch.vue` metadata.
- [ ] T018 [P] [US1] Update `app/pages/features/courier-app.vue` metadata.
- [ ] T019 [P] [US1] Update `app/pages/features/merchant-portal.vue` metadata.
- [ ] T020 [P] [US1] Update `app/pages/features/cod-wallet.vue` metadata.
- [ ] T021 [P] [US1] Update `app/pages/features/bulk-upload.vue` metadata.
- [ ] T022 [P] [US1] Update `app/pages/features/fraud-detection.vue` metadata.
- [ ] T023 [US1] Update `app/components/sections/SolutionDetailPage.vue` or solution route wrappers to output canonical, Open Graph, and Twitter metadata consistently.
- [ ] T024 [P] [US1] Verify `app/pages/solutions/shipping-companies.vue` uses shipping-company-specific metadata.
- [ ] T025 [P] [US1] Verify `app/pages/solutions/ecommerce-stores.vue` uses ecommerce-store-specific metadata.
- [ ] T026 [P] [US1] Verify `app/pages/solutions/social-sellers.vue` uses social-seller-specific metadata.

## Phase 5: Blog And Tracking Dynamic Routes

**Purpose**: Finalize dynamic route metadata and privacy behavior.

- [ ] T027 [US1] Update `app/pages/blog/index.vue` with localized blog index metadata.
- [ ] T028 [US1] Update `app/pages/blog/[slug].vue` to emit article metadata for existing articles.
- [ ] T029 [US1] Add article fields for published time, author, section/category, canonical URL, Open Graph article type, and localized descriptions where data supports it.
- [ ] T030 [US1] Add not-found-safe metadata for missing blog slugs.
- [ ] T031 [US1] Update `app/pages/track/[trackingNumber].vue` with `noindex` robots metadata.
- [ ] T032 [US1] Ensure tracking numbers are not emitted into sitemap URLs.

## Phase 6: Locale Copy And Accessibility Labels

**Purpose**: Ensure metadata copy and accessibility labels are translated and production-safe.

- [ ] T033 [US3] Add missing SEO metadata strings to `i18n/locales/ar.json`.
- [ ] T034 [US3] Add matching SEO metadata strings to `i18n/locales/en.json`.
- [ ] T035 [US3] Add missing accessibility labels to `i18n/locales/ar.json`.
- [ ] T036 [US3] Add matching accessibility labels to `i18n/locales/en.json`.
- [ ] T037 [US3] Replace Arabic-only `aria-label` values in `app/pages/index.vue`.
- [ ] T038 [US3] Replace Arabic-only `aria-label` values in `app/pages/blog/index.vue`.
- [ ] T039 [US3] Replace Arabic-only `aria-label` values in `app/pages/blog/[slug].vue`.
- [ ] T040 [US3] Replace remaining hardcoded labels in scoped route components and layout components.
- [ ] T041 [US3] Remove placeholder/dev/no-backend text from user-facing and metadata copy where present.

## Phase 7: Language Switching And Direction

**Purpose**: Enforce bilingual route continuity and correct reading direction.

- [ ] T042 [US2] Update `app/components/layout/LanguageSwitcher.vue` to preserve query parameters when switching locale.
- [ ] T043 [US2] Verify language switching preserves params and encoded dynamic segments.
- [ ] T044 [US2] Verify language switching preserves hash fragments where applicable.
- [ ] T045 [US3] Replace route-level hardcoded `dir="rtl"` with locale-driven direction where English pages are affected.
- [ ] T046 [US3] Preserve local `dir="ltr"` for tracking numbers, emails, phone examples, and identifiers.
- [ ] T047 [US3] Preserve local `dir="rtl"` only for Arabic text embedded in English context where needed.
- [ ] T048 [US3] Verify navbar, footer, mobile menu, forms, tables, filters, and article content behave correctly in RTL and LTR.

## Phase 8: Sitemap And Robots

**Purpose**: Ensure crawler discovery and privacy rules are production-ready.

- [ ] T049 [US4] Decide whether current Nuxt capabilities are sufficient or whether sitemap/robots modules are required.
- [ ] T050 [US4] Configure sitemap strategy for all indexable scoped Arabic routes.
- [ ] T051 [US4] Configure sitemap strategy for all indexable scoped English routes.
- [ ] T052 [US4] Exclude `/track/[trackingNumber]` dynamic URLs from sitemap output.
- [ ] T053 [US4] Configure robots strategy to allow public marketing pages.
- [ ] T054 [US4] Configure robots strategy or route metadata to prevent indexing dynamic tracking result URLs.
- [ ] T055 [US4] Verify `/track` remains indexable.

## Phase 9: QA And Build

**Purpose**: Validate production readiness.

- [ ] T056 [US1] Run `npm run build`.
- [ ] T057 [US4] Run `npm run generate` if sitemap or static output must be inspected.
- [ ] T058 [US1] Inspect rendered metadata for all Arabic scoped routes.
- [ ] T059 [US1] Inspect rendered metadata for all English scoped routes.
- [ ] T060 [US2] Test language switching on `/pricing?plan=growth`, `/request-demo?plan=growth`, `/contact?topic=support`, and `/track?ref=merchant`.
- [ ] T061 [US3] Test keyboard focus and accessible names for language switcher, navigation, forms, filters, and tracking states.
- [ ] T062 [US3] Check for reveal-hidden regressions on route load and after reduced-motion conditions.
- [ ] T063 [US4] Inspect robots and sitemap output or documented generation behavior.
- [ ] T064 [US1] Confirm no placeholder/dev/no-backend text remains in scoped route metadata or visible content.

## Dependencies & Execution Order

- Phase 1 must complete before implementation decisions.
- Phase 2 must complete before route metadata updates.
- Static route metadata can proceed before dynamic blog/tracking metadata.
- Locale copy and accessibility labels can proceed after metadata keys are identified.
- Language switching and direction fixes can proceed after locale behavior is audited.
- Sitemap and robots decisions should wait until canonical URL strategy is clear.
- QA and build must be last.

## Parallel Opportunities

- Feature detail route metadata tasks T017 through T022 can run in parallel.
- Solution verification tasks T024 through T026 can run in parallel.
- Locale copy tasks T033 through T036 can run in parallel with route metadata if keys are agreed.
- Arabic and English rendered metadata checks can be split by locale after build.
