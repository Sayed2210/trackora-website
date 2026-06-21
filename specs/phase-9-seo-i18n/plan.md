# Implementation Plan: Phase 9 SEO + i18n Finalization

**Branch**: `phase-9-seo-i18n` | **Date**: 2026-06-09 | **Spec**: `.specify/phase-9-seo-i18n/spec.md`  
**Input**: Feature specification from `.specify/phase-9-seo-i18n/spec.md`

## Summary

Finalize production SEO and bilingual behavior for all Trackora marketing routes. The likely approach is to centralize locale-aware SEO metadata, add route-specific Arabic and English metadata, enforce tracking-result noindex, clean hardcoded RTL and Arabic aria labels, preserve query parameters in language switching, and validate robots/sitemap handling.

## Current Audit Approach

- Inspect existing route files for `useLocaleSeo`, `useHead`, `useSeoMeta`, `definePageMeta`, hardcoded `dir`, hardcoded Arabic `aria-label`, and missing English metadata.
- Inspect `nuxt.config.ts` for current i18n strategy, locale definitions, head defaults, sitemap/robots configuration, and production URL handling.
- Inspect `LanguageSwitcher.vue` for route switching and query preservation behavior.
- Inspect blog data and blog route rendering for article-specific metadata fields.
- Inspect tracking routes for indexable lookup page and noindex dynamic result page behavior.
- Inspect generated HTML after implementation through `npm run build` and production preview where feasible.

## Technical Context

**Language/Version**: Vue 3.5, Nuxt 4.4, TypeScript-capable Nuxt config  
**Primary Dependencies**: `nuxt`, `vue`, `vue-router`, `@nuxtjs/i18n`, `@nuxt/content`  
**Storage**: Local content/data files for current blog and marketing content  
**Testing**: `npm run build`, `npm run generate` if sitemap/static output requires it, manual rendered HTML checks, route-level locale checks  
**Target Platform**: Public SSR/static-capable Nuxt marketing website  
**Project Type**: Frontend marketing website  
**Performance Goals**: SSR-rendered metadata, crawlable HTML, no client-only SEO dependency  
**Constraints**: Arabic default, English secondary, RTL/LTR correctness, WCAG AA target, no placeholder/dev copy, privacy-safe tracking URLs  
**Scale/Scope**: 18 scoped routes, 2 locales, blog article dynamic pages, tracking dynamic pages

## Constitution Check

- Arabic-first RTL: PASS. Arabic remains default and must render RTL metadata/layout.
- English secondary parity: PASS. English pages must receive equivalent metadata and accessible labels.
- Trackora design fidelity: PASS. SEO/i18n changes should preserve existing visual system and not introduce generic SaaS copy.
- Marketing-only scope: PASS. No authenticated app behavior or backend implementation is introduced.
- Performance/SEO/accessibility: PASS. SSR metadata, sitemap/robots, and translated accessibility labels are primary goals.
- Minimal maintainability: PASS if SEO is centralized through a helper or route metadata map rather than duplicated inconsistently.

## Project Structure

### Documentation

```text
.specify/phase-9-seo-i18n/
├── spec.md
├── plan.md
├── tasks.md
└── checklist.md
```

### Source Code Likely Touched Later

```text
nuxt.config.ts
app/composables/useLocaleSeo.ts
app/layouts/default.vue
app/components/layout/LanguageSwitcher.vue
app/components/layout/WebsiteNavbar.vue
app/components/layout/WebsiteFooter.vue
app/pages/index.vue
app/pages/pricing.vue
app/pages/request-demo.vue
app/pages/contact.vue
app/pages/track/index.vue
app/pages/track/[trackingNumber].vue
app/pages/features/index.vue
app/pages/features/smart-dispatch.vue
app/pages/features/courier-app.vue
app/pages/features/merchant-portal.vue
app/pages/features/cod-wallet.vue
app/pages/features/bulk-upload.vue
app/pages/features/fraud-detection.vue
app/pages/solutions/shipping-companies.vue
app/pages/solutions/ecommerce-stores.vue
app/pages/solutions/social-sellers.vue
app/pages/blog/index.vue
app/pages/blog/[slug].vue
app/components/sections/SolutionDetailPage.vue
app/data/blog.ts
app/data/features.ts
app/data/solutions.ts
i18n/locales/ar.json
i18n/locales/en.json
```

**Structure Decision**: Keep implementation inside existing Nuxt app structure. Prefer improving `useLocaleSeo.ts` or adding a small SEO metadata helper if repeated metadata logic becomes hard to maintain. Do not introduce a large SEO framework unless needed for sitemap/robots support.

## Current Findings

- `nuxt.config.ts` defines Arabic and English locales with `prefix_except_default`, but only basic global head tags.
- `useLocaleSeo.ts` exists but currently covers basic title, description, Open Graph, and Twitter fields only.
- `useLocaleSeo.ts` does not currently expose canonical URL, `og:url`, alternates, configurable `robots`, or article metadata.
- Several routes call `setSeo`, but not all route groups appear equally localized.
- Some routes use `useHead` directly, which can lead to inconsistent metadata.
- Several pages include hardcoded `dir="rtl"` and Arabic-only `aria-label` values.
- `LanguageSwitcher.vue` uses `switchLocalePath` and `router.push(path)`, but query parameter preservation needs explicit verification and likely adjustment.
- `/track/[trackingNumber]` currently sets regular tracking metadata and needs explicit noindex handling.
- Blog article data is Arabic-only today and may require English secondary content or a structured localization strategy before metadata parity is complete.
- Sitemap and robots handling does not appear configured in current `nuxt.config.ts`.

## Risks

- English metadata may be incomplete if underlying page content or data remains Arabic-only.
- Canonical URLs can be wrong without a reliable production site URL.
- `prefix_except_default` can produce duplicate canonical or alternate links if not handled carefully.
- Query preservation in language switching can regress form flows such as `/request-demo?plan=growth`.
- Dynamic tracking result pages can leak tracking numbers into indexed pages if noindex is missed.
- Hardcoded `dir="rtl"` can make English layouts and assistive technology output incorrect.
- Robots/sitemap modules may require adding dependencies or Nuxt config changes later.
- Blog article metadata parity may require localized blog content beyond metadata only.

## Implementation Sequence

1. Audit existing SEO and i18n behavior across scoped routes.
2. Decide whether to extend `useLocaleSeo.ts` or create a route SEO metadata helper.
3. Define production base URL handling for canonical and Open Graph URLs.
4. Add or normalize route-specific metadata for static pages.
5. Add feature detail metadata using existing feature data where possible.
6. Add solution detail metadata using existing solution data where possible.
7. Add blog index and blog article metadata, including article Open Graph fields.
8. Add noindex metadata for `/track/[trackingNumber]` and preserve indexability for `/track`.
9. Add or configure sitemap and robots strategy.
10. Clean locale files and route copy needed for metadata and accessible labels.
11. Update language switcher to preserve route, params, hash, and query.
12. Fix hardcoded RTL/LTR issues and retain local direction for identifiers.
13. Replace hardcoded Arabic accessibility labels with localized labels.
14. Run build and route-level QA.

## Validation Strategy

- Run `npm run build`.
- Run `npm run generate` if static output, sitemap output, or prerender output needs verification.
- Run `npm run preview` for manual rendered HTML inspection after build.
- Inspect Arabic and English rendered HTML for every scoped route.
- Confirm `html lang` and `dir` change correctly per locale.
- Confirm each route has localized title, description, canonical, Open Graph, and Twitter metadata.
- Confirm `/track/[trackingNumber]` includes noindex metadata.
- Confirm `/track` remains indexable.
- Confirm blog articles include article metadata when the article exists.
- Confirm language switching preserves query params on `/pricing?plan=growth`, `/request-demo?plan=growth`, `/contact?topic=support`, and `/track?ref=merchant`.
- Confirm no placeholder/dev/no-backend text remains in visible content or metadata.
- Confirm reveal/scroll behavior does not leave content hidden.

## Build And Testing Commands

```bash
npm run build
npm run generate
npm run preview
```

## Out Of Scope

- Implementing backend tracking APIs.
- Implementing authenticated app routes.
- Rewriting page designs.
- Adding new marketing pages outside the scoped route list.
- Publishing or deploying the site.
