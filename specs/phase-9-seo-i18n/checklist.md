# Acceptance Checklist: Phase 9 SEO + i18n Finalization

**Purpose**: Validate production readiness for SEO metadata, bilingual i18n, RTL/LTR behavior, language switching, robots/sitemap handling, and accessibility metadata.  
**Created**: 2026-06-09  
**Feature**: `.specify/phase-9-seo-i18n/spec.md`

## Route Metadata

- [ ] CHK001 `/` has specific Arabic and English title and description metadata.
- [ ] CHK002 `/pricing` has specific Arabic and English title and description metadata.
- [ ] CHK003 `/request-demo` has specific Arabic and English title and description metadata.
- [ ] CHK004 `/contact` has specific Arabic and English title and description metadata.
- [ ] CHK005 `/track` has specific Arabic and English title and description metadata.
- [ ] CHK006 `/track/[trackingNumber]` has privacy-safe Arabic and English metadata.
- [ ] CHK007 `/features` has specific Arabic and English title and description metadata.
- [ ] CHK008 `/features/smart-dispatch` has specific Arabic and English title and description metadata.
- [ ] CHK009 `/features/courier-app` has specific Arabic and English title and description metadata.
- [ ] CHK010 `/features/merchant-portal` has specific Arabic and English title and description metadata.
- [ ] CHK011 `/features/cod-wallet` has specific Arabic and English title and description metadata.
- [ ] CHK012 `/features/bulk-upload` has specific Arabic and English title and description metadata.
- [ ] CHK013 `/features/fraud-detection` has specific Arabic and English title and description metadata.
- [ ] CHK014 `/solutions/shipping-companies` has specific Arabic and English title and description metadata.
- [ ] CHK015 `/solutions/ecommerce-stores` has specific Arabic and English title and description metadata.
- [ ] CHK016 `/solutions/social-sellers` has specific Arabic and English title and description metadata.
- [ ] CHK017 `/blog` has specific Arabic and English title and description metadata.
- [ ] CHK018 `/blog/[slug]` has article-specific Arabic and English metadata where localized article data exists.

## Canonical And Social Metadata

- [ ] CHK019 Every indexable route has a canonical URL for the active locale.
- [ ] CHK020 Every indexable route has Open Graph title, description, URL, type, locale, and site name.
- [ ] CHK021 Every indexable route has Twitter card, title, and description metadata.
- [ ] CHK022 Blog article routes use `og:type=article`.
- [ ] CHK023 Blog article routes include published date metadata when an article exists.
- [ ] CHK024 Blog article routes include author metadata when an article exists.
- [ ] CHK025 Missing blog slug pages do not emit misleading article metadata.

## Indexing Rules

- [ ] CHK026 `/track` is indexable.
- [ ] CHK027 `/track/[trackingNumber]` is noindex.
- [ ] CHK028 Tracking numbers are not included in sitemap output.
- [ ] CHK029 Public marketing routes are allowed by robots strategy.
- [ ] CHK030 Sitemap strategy includes indexable Arabic routes.
- [ ] CHK031 Sitemap strategy includes indexable English routes.

## Locale And Direction

- [ ] CHK032 Arabic pages render `html lang="ar"`.
- [ ] CHK033 Arabic pages render `dir="rtl"`.
- [ ] CHK034 Arabic pages use Arabic metadata.
- [ ] CHK035 English pages render `html lang="en"`.
- [ ] CHK036 English pages render `dir="ltr"`.
- [ ] CHK037 English pages use English metadata.
- [ ] CHK038 Hardcoded route-level `dir="rtl"` does not break English pages.
- [ ] CHK039 LTR identifiers such as tracking numbers, emails, URLs, and phone examples keep correct local direction.
- [ ] CHK040 RTL Arabic text embedded in English pages keeps correct local direction only where needed.

## Language Switching

- [ ] CHK041 Language switcher preserves route context.
- [ ] CHK042 Language switcher preserves query parameters.
- [ ] CHK043 Language switcher preserves route params for dynamic routes.
- [ ] CHK044 Language switcher preserves hash fragments where present.
- [ ] CHK045 `/pricing?plan=growth` switches locale without losing `plan=growth`.
- [ ] CHK046 `/request-demo?plan=growth` switches locale without losing `plan=growth`.
- [ ] CHK047 `/contact?topic=support` switches locale without losing `topic=support`.
- [ ] CHK048 `/track?ref=merchant` switches locale without losing `ref=merchant`.

## Accessibility Metadata And Labels

- [ ] CHK049 Language switcher has localized accessible labels.
- [ ] CHK050 Navigation landmarks and menus have localized labels.
- [ ] CHK051 Footer navigation and links have localized labels where labels are required.
- [ ] CHK052 Form controls have localized labels, help text, error text, and status messages.
- [ ] CHK053 Blog filters have localized accessible labels.
- [ ] CHK054 Blog article table of contents and content regions have localized labels.
- [ ] CHK055 Tracking lookup and result states have localized labels and status announcements.
- [ ] CHK056 Keyboard focus remains visible on language switcher, navigation, forms, filters, article links, and tracking controls.

## Content Quality

- [ ] CHK057 No metadata contains placeholder copy.
- [ ] CHK058 No metadata contains dev-only copy.
- [ ] CHK059 No visible scoped route copy contains no-backend or mock-only text unless it is intentionally part of a non-production state.
- [ ] CHK060 Arabic copy remains Arabic-first and operational.
- [ ] CHK061 English copy preserves the same product meaning as Arabic.
- [ ] CHK062 Metadata avoids generic SaaS phrasing and reflects Trackora's logistics operations focus.

## Regression Checks

- [ ] CHK063 No reveal-hidden regression occurs on page load.
- [ ] CHK064 Reduced-motion behavior still avoids hidden content.
- [ ] CHK065 Existing route navigation still works in Arabic.
- [ ] CHK066 Existing route navigation still works in English.
- [ ] CHK067 Existing tracking lookup flow still works.
- [ ] CHK068 Existing request demo form behavior still works.
- [ ] CHK069 Existing contact form behavior still works.
- [ ] CHK070 Existing blog article navigation still works.

## Build

- [ ] CHK071 `npm run build` passes.
- [ ] CHK072 `npm run generate` passes if static output or sitemap output is required.
- [ ] CHK073 Production preview renders scoped routes without console errors related to SEO, i18n, or route switching.
