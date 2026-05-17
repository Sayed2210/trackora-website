# Implementation Plan: Trackora Marketing Website

**Branch**: `001-trackora-marketing-website` | **Date**: 2026-05-16 | **Spec**: `specs/001-trackora-marketing-website/spec.md`
**Input**: Expanded full Trackora marketing website scope.

## Summary

Keep the current single-page homepage as Phase 0 / MVP Landing Page, then expand into a full Arabic-first, English-secondary Nuxt website with product feature pages, solution pages, pricing, request demo, contact, blog via Nuxt Content, and public shipment tracking via API integration.

## Technical Context

**Language/Version**: Vue 3.5, Nuxt 4.4, TypeScript-capable Nuxt config
**Primary Dependencies**: `nuxt`, `vue`, `vue-router`
**Planned Additional Dependencies**: `@nuxt/content` for blog content, `@nuxtjs/i18n` for locale/RTL management
**Storage**: Local content files for blog; no database in website
**API Integration**: Public runtime config API base URL, `GET /tracking/:trackingNumber`, placeholder demo/contact services
**Testing**: `npm run build`, `npm run generate`, manual route/accessibility/responsive checks
**Target Platform**: Public web, SSR/static-capable Nuxt deployment
**Project Type**: Frontend marketing website
**Performance Goals**: Crawlable HTML, optimized static content, low client-side state, fast public route rendering
**Constraints**: Arabic default, RTL/LTR switching, Trackora design tokens, marketing-only scope, no authenticated app implementation
**Scale/Scope**: 18 required routes, shared layout/components, API state handling, localized SEO, blog content

## Constitution Check

- Arabic-first RTL: PASS. Arabic remains default, English secondary, direction switches by locale.
- Trackora design fidelity: PASS. All pages/components use centralized tokens.
- Marketing-only scope: PASS. Login links may exist, but auth/product dashboard is out of scope.
- Performance/SEO/accessibility: PASS. Each route has metadata and semantic layout requirements.
- Minimal maintainability: PASS with justified additions for i18n and Nuxt Content.

## Current Phase

Phase 0 / MVP Landing Page exists as the current `/` route. It should be refactored into reusable sections and expanded to link into full-site routes.

## Project Structure

### Documentation (this feature)

```text
specs/001-trackora-marketing-website/
├── spec.md
├── plan.md
├── tasks.md
└── checklist.md
```

### Source Code (repository root)

```text
app/
├── app.vue
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── base/
│   │   ├── AppBadge.vue
│   │   ├── AppButton.vue
│   │   ├── AppCard.vue
│   │   ├── AppContainer.vue
│   │   ├── AppInput.vue
│   │   ├── AppSectionHeader.vue
│   │   └── AppTextarea.vue
│   ├── layout/
│   │   ├── LanguageSwitcher.vue
│   │   ├── LoginDropdown.vue
│   │   ├── MobileMenu.vue
│   │   ├── WebsiteFooter.vue
│   │   └── WebsiteNavbar.vue
│   ├── sections/
│   │   ├── DemoCtaSection.vue
│   │   ├── FaqSection.vue
│   │   ├── FeaturesSection.vue
│   │   ├── HeroSection.vue
│   │   ├── HowItWorksSection.vue
│   │   ├── PricingPreviewSection.vue
│   │   └── ProblemsSection.vue
│   └── tracking/
│       ├── TrackingEmptyState.vue
│       ├── TrackingErrorState.vue
│       ├── TrackingSummary.vue
│       └── TrackingTimeline.vue
├── composables/
│   ├── useLocaleSeo.ts
│   ├── useRequestDemoService.ts
│   └── useTrackingService.ts
├── content/
│   ├── ar/
│   │   └── blog/
│   └── en/
│       └── blog/
├── data/
│   ├── features.ts
│   ├── navigation.ts
│   ├── pricing.ts
│   └── solutions.ts
├── i18n/
│   ├── ar.ts
│   └── en.ts
├── layouts/
│   └── default.vue
└── pages/
    ├── index.vue
    ├── pricing.vue
    ├── request-demo.vue
    ├── contact.vue
    ├── track/
    │   ├── index.vue
    │   └── [trackingNumber].vue
    ├── blog/
    │   ├── index.vue
    │   └── [slug].vue
    ├── features/
    │   ├── index.vue
    │   ├── smart-dispatch.vue
    │   ├── courier-app.vue
    │   ├── merchant-portal.vue
    │   ├── cod-wallet.vue
    │   ├── bulk-upload.vue
    │   └── fraud-detection.vue
    └── solutions/
        ├── shipping-companies.vue
        ├── ecommerce-stores.vue
        └── social-sellers.vue
```

**Structure Decision**: Nuxt 4 app/ directory structure with co-located components organized by domain (base, layout, sections, tracking). Data files provide structured content for features, solutions, pricing, and navigation. i18n files provide translation dictionaries. Nuxt Content handles blog. Layout wraps all public pages with navbar and footer.

## Routing Plan

| Route | Purpose |
|-------|---------|
| `/` | Phase 0 / MVP Landing Page |
| `/features` | Feature overview |
| `/features/smart-dispatch` | Smart dispatch detail |
| `/features/courier-app` | Courier app detail |
| `/features/merchant-portal` | Merchant portal detail |
| `/features/cod-wallet` | COD wallet detail |
| `/features/bulk-upload` | Bulk upload detail |
| `/features/fraud-detection` | Fraud detection detail |
| `/solutions/shipping-companies` | Shipping company solution |
| `/solutions/ecommerce-stores` | Ecommerce store solution |
| `/solutions/social-sellers` | Social seller solution |
| `/pricing` | Pricing plans |
| `/request-demo` | Demo request form |
| `/contact` | Contact form |
| `/blog` | Blog index |
| `/blog/[slug]` | Blog article detail |
| `/track` | Tracking input |
| `/track/[trackingNumber]` | Tracking result |

## Layout Component Plan

- `WebsiteNavbar`: Desktop navigation, route groups, CTA, login dropdown, language switcher.
- `WebsiteFooter`: Footer navigation, legal links, contact links, locale-aware copy.
- `LanguageSwitcher`: Switch Arabic/English and update direction.
- `LoginDropdown`: Links to external Trackora login destinations.
- `MobileMenu`: Accessible responsive menu with keyboard and escape handling.

## Base Component Plan

- `AppButton`: Link/button variants, loading state, disabled state.
- `AppCard`: Shared card shell with elevation/border variants.
- `AppBadge`: Small label/status/pill component.
- `AppSectionHeader`: Reusable eyebrow/title/description block.
- `AppContainer`: Width and responsive padding wrapper.
- `AppInput`: Accessible text input with label, hint, error.
- `AppTextarea`: Accessible textarea with label, hint, error.

## Homepage Section Plan

- `HeroSection`: Primary value proposition and CTAs.
- `ProblemsSection`: Delivery/logistics pain points.
- `FeaturesSection`: Core feature previews linking to feature pages.
- `HowItWorksSection`: Steps from order upload to delivery/tracking/COD.
- `PricingPreviewSection`: Pricing teaser linked to `/pricing`.
- `DemoCtaSection`: Conversion CTA linked to `/request-demo`.
- `FaqSection`: Common objections and answers.

## API Integration Plan

Runtime config:
```ts
runtimeConfig: {
  public: {
    apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '',
    enableMockTracking: process.env.NUXT_PUBLIC_ENABLE_MOCK_TRACKING === 'true',
  },
}
```

`useTrackingService`:
- Accept tracking number.
- Call `GET /tracking/:trackingNumber`.
- Expose `data`, `pending`, `error`, `isEmpty`, `refresh`.
- Use mock fallback when local development or mock flag is enabled.
- Normalize API response for `TrackingSummary` and `TrackingTimeline`.

`useRequestDemoService`:
- Placeholder submit method.
- Validate payload before submit.
- Expose loading, success, and error state.
- Prepare integration point for future endpoint.

UI state requirements:
- Loading state while awaiting service.
- Empty state for no result or no articles.
- Error state for request failure.
- Success state for valid form submission.

## Public Tracking Plan

`/track`:
- Render tracking input form.
- Validate non-empty tracking number.
- On submit, navigate to `/track/[trackingNumber]`.
- Show example format and privacy-safe messaging.

`/track/[trackingNumber]`:
- Read route param.
- Call `useTrackingService`.
- Display shipment summary.
- Display timeline UI.
- Display loading, empty, and error states.
- Display mock fallback data in local development if configured.

Timeline UI:
- Current status badge.
- Ordered events.
- Event timestamp, location, and description.
- Distinct active/completed/pending visual states.

## i18n Plan

- Arabic is default locale.
- English is secondary locale.
- Arabic routes render RTL.
- English routes render LTR.
- Translation files in `app/i18n/ar.ts` and `app/i18n/en.ts`.
- Navigation labels, form labels, CTAs, validation messages, SEO titles, and SEO descriptions must be translated.
- SEO metadata must be generated per locale with correct `htmlAttrs`.
- Direction switching must apply to document and layout.

## Blog Plan

- Add `@nuxt/content` for blog pages.
- Blog content stored under `app/content/ar/blog/` and `app/content/en/blog/`.
- `/blog` reads article metadata and renders localized index.
- `/blog/[slug]` renders localized article detail.
- Initial Arabic articles covering logistics operations, COD management, courier performance, delivery tracking, and fraud prevention.
- Each article includes title, description/excerpt, date, tags, locale, and SEO metadata.
- Missing slug renders a not-found state.

## Implementation Phases

### Phase 0 - Preserve MVP Landing Page
Keep `/` as the landing page. Refactor into reusable sections later.

### Phase 1 - Foundation
Create shared layout, base components, route skeletons, design tokens, runtime config, and i18n foundation.

### Phase 2 - Homepage Sections
Refactor homepage into required section components and connect primary navigation/CTA routes.

### Phase 3 - Feature Pages
Implement `/features` and all feature detail pages.

### Phase 4 - Solution Pages
Implement all `/solutions/*` pages.

### Phase 5 - Conversion Pages
Implement `/pricing`, `/request-demo`, and `/contact`.

### Phase 6 - Public Tracking
Implement `/track`, `/track/[trackingNumber]`, tracking service, mock fallback, and timeline UI.

### Phase 7 - Blog
Install/configure Nuxt Content, add article content, implement index/detail pages.

### Phase 8 - SEO, Accessibility, Verification
Validate localized metadata, route coverage, build/generate, responsive design, keyboard navigation, loading/empty/error states, and contrast.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Add `@nuxtjs/i18n` | Required for Arabic default, English secondary, RTL/LTR switching, localized SEO per route | Manual string switching would become brittle across 18 routes |
| Add `@nuxt/content` | Required for blog index/detail and content-driven articles | Hardcoding blog pages would not scale or match requested blog plan |