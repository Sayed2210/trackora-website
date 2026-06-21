# Feature Specification: Phase 9 SEO + i18n Finalization

**Feature Branch**: `phase-9-seo-i18n`  
**Created**: 2026-06-09  
**Status**: Draft  
**Input**: Production-ready SEO metadata, Arabic-first i18n, English secondary content, RTL/LTR consistency, language switching, robots/sitemap handling, and accessibility metadata for the Trackora marketing website.

## User Scenarios & Testing

### User Story 1 - Search Engines Receive Complete Route Metadata (Priority: P1)

Arabic and English versions of every public marketing route expose route-specific titles, descriptions, canonical URLs, Open Graph metadata, and Twitter metadata.

**Why this priority**: Production SEO depends on crawlable, specific metadata per route and locale.

**Independent Test**: Inspect rendered HTML for every scoped route in Arabic and English and verify metadata is specific, localized, canonicalized, and free of placeholder language.

**Acceptance Scenarios**:

1. **Given** an Arabic public route, **When** the route is rendered, **Then** title, description, canonical, Open Graph, Twitter, `html[lang="ar"]`, and `dir="rtl"` are present.
2. **Given** an English public route, **When** the localized route is rendered, **Then** title, description, canonical, Open Graph, Twitter, `html[lang="en"]`, and `dir="ltr"` are present.
3. **Given** `/track/[trackingNumber]`, **When** the route is rendered, **Then** it includes `noindex, nofollow` or equivalent privacy-safe robots metadata.

---

### User Story 2 - Bilingual Visitors Can Switch Language Without Losing Context (Priority: P1)

A visitor can switch between Arabic and English while staying on the equivalent route and preserving query parameters used by forms, pricing plan selection, and tracking flows.

**Why this priority**: Arabic-first with English secondary content requires bilingual parity and predictable navigation.

**Independent Test**: Switch locale on routes with and without query parameters and confirm the equivalent localized path and query are preserved.

**Acceptance Scenarios**:

1. **Given** `/pricing?plan=growth`, **When** the user switches to English, **Then** the user lands on the English pricing route with `?plan=growth` preserved.
2. **Given** an English feature detail page, **When** the user switches to Arabic, **Then** the user lands on the Arabic equivalent route.
3. **Given** `/track?ref=merchant`, **When** the user switches language, **Then** the query string is preserved.

---

### User Story 3 - Assistive Technology Receives Localized Labels And Direction (Priority: P2)

Navigation, forms, filters, tracking controls, article sections, language switcher, and interactive regions expose translated `aria-label`s and correct reading direction.

**Why this priority**: Accessibility and bilingual direction are part of Trackora's product quality and WCAG AA target.

**Independent Test**: Review rendered accessibility labels and keyboard behavior in both locales for scoped routes.

**Acceptance Scenarios**:

1. **Given** Arabic pages, **When** assistive technology reads page landmarks and controls, **Then** labels are Arabic and layout direction is RTL.
2. **Given** English pages, **When** assistive technology reads page landmarks and controls, **Then** labels are English and layout direction is LTR.
3. **Given** language switcher controls, **When** focused by keyboard, **Then** labels describe the target language and focus state is visible.

---

### User Story 4 - Crawlers Receive Correct Sitemap And Robots Rules (Priority: P2)

Search crawlers can discover indexable public pages through sitemap output and receive privacy-safe rules for dynamic tracking result pages.

**Why this priority**: Production readiness requires crawl discovery while preventing sensitive or infinitely variable pages from being indexed.

**Independent Test**: Generate or inspect sitemap and robots output and confirm route inclusion/exclusion rules.

**Acceptance Scenarios**:

1. **Given** public marketing routes, **When** sitemap output is generated, **Then** indexable Arabic and English localized URLs are included.
2. **Given** `/track`, **When** sitemap and robots strategy is reviewed, **Then** `/track` is indexable.
3. **Given** `/track/[trackingNumber]`, **When** robots strategy is reviewed, **Then** dynamic tracking result URLs are noindexed or excluded as appropriate.

## Scope Routes

| Route | Indexing Requirement | Metadata Requirement |
|-------|----------------------|----------------------|
| `/` | Index | Arabic and English homepage metadata |
| `/pricing` | Index | Pricing-specific metadata |
| `/request-demo` | Index | Demo conversion metadata |
| `/contact` | Index | Contact metadata |
| `/track` | Index | Public tracking lookup metadata |
| `/track/[trackingNumber]` | Noindex | Privacy-safe dynamic tracking metadata |
| `/features` | Index | Feature overview metadata |
| `/features/smart-dispatch` | Index | Smart dispatch metadata |
| `/features/courier-app` | Index | Courier app metadata |
| `/features/merchant-portal` | Index | Merchant portal metadata |
| `/features/cod-wallet` | Index | COD wallet metadata |
| `/features/bulk-upload` | Index | Bulk upload metadata |
| `/features/fraud-detection` | Index | Fraud detection metadata |
| `/solutions/shipping-companies` | Index | Shipping company solution metadata |
| `/solutions/ecommerce-stores` | Index | Ecommerce store solution metadata |
| `/solutions/social-sellers` | Index | Social seller solution metadata |
| `/blog` | Index | Blog index metadata |
| `/blog/[slug]` | Index | Article metadata with published date and author |

## Requirements

### Functional Requirements

- **FR-001**: Every scoped route MUST define a localized title and meta description for Arabic and English.
- **FR-002**: Arabic pages MUST render Arabic metadata, `html lang="ar"`, and `dir="rtl"`.
- **FR-003**: English pages MUST render English metadata, `html lang="en"`, and `dir="ltr"`.
- **FR-004**: Every indexable route MUST define a canonical URL matching the active locale route.
- **FR-005**: Every indexable route MUST define Open Graph title, description, URL, locale, type, and site name.
- **FR-006**: Every indexable route MUST define Twitter card, title, and description metadata.
- **FR-007**: Blog article routes MUST define article metadata including `og:type=article`, published time, author, section/category when available, canonical URL, and localized title/description.
- **FR-008**: `/track/[trackingNumber]` MUST be noindexed to avoid exposing private, dynamic, or unbounded tracking result URLs.
- **FR-009**: `/track` MUST remain indexable as the public tracking lookup page.
- **FR-010**: Sitemap strategy MUST include all indexable scoped routes for Arabic and English locale variants.
- **FR-011**: Robots strategy MUST allow public marketing routes and prevent indexing of dynamic tracking result URLs.
- **FR-012**: Language switcher MUST switch to the equivalent localized route and preserve query parameters.
- **FR-013**: Language switcher MUST expose localized accessible labels describing the target language.
- **FR-014**: Page-level and component-level hardcoded `dir="rtl"` usage MUST be replaced or guarded where it breaks English layout.
- **FR-015**: Route landmarks, forms, filters, article navigation, tracking states, mobile navigation, and interactive regions MUST use translated accessible labels.
- **FR-016**: Metadata MUST not include placeholder, dev-only, no-backend, mock-only, or temporary text.
- **FR-017**: SEO implementation MUST avoid regressions to existing reveal/scroll behavior and must not reintroduce reveal-hidden content issues.
- **FR-018**: Implementation MUST pass `npm run build`.

### Key Entities

- **Route SEO Definition**: Localized title, description, path, indexing rule, Open Graph type, Twitter card type, canonical URL, and optional article fields.
- **Locale Route Variant**: Arabic default route and English prefixed route under the configured i18n strategy.
- **Blog Article Metadata**: Slug, localized title, localized description, author, published date, category, canonical URL, and article body summary.
- **Robots Rule**: Indexing instruction for static and dynamic routes.
- **Language Switch Target**: Equivalent localized route with current query parameters preserved.

### Edge Cases

- Language switching from routes with query parameters must preserve all query keys and values.
- Language switching from a dynamic tracking result must preserve the encoded tracking number path segment.
- Missing blog article routes must use not-found-safe metadata and avoid article metadata.
- Tracking numbers must not appear in indexable sitemap output.
- Arabic text inside English pages that is operational data must preserve local `dir="rtl"` only where semantically needed.
- LTR identifiers such as tracking numbers, emails, URLs, and phone-like examples must keep local `dir="ltr"` where needed.
- Canonical URLs must not create duplicate Arabic default and English prefixed canonical conflicts.
- Open Graph locale alternates should not conflict with Nuxt i18n route strategy.
- Metadata must remain SSR-rendered and not rely on client-only updates.

## Success Criteria

### Measurable Outcomes

- **SC-001**: All 18 scoped routes have route-specific Arabic and English title and description metadata.
- **SC-002**: All indexable scoped routes expose canonical, Open Graph, and Twitter metadata in rendered HTML.
- **SC-003**: `/track/[trackingNumber]` rendered HTML contains noindex metadata.
- **SC-004**: `/track` is indexable and appears in sitemap strategy.
- **SC-005**: Blog article pages expose article Open Graph metadata when an article exists.
- **SC-006**: Arabic pages render with Arabic metadata and RTL direction.
- **SC-007**: English pages render with English metadata and LTR direction.
- **SC-008**: Language switching preserves query parameters on tested routes.
- **SC-009**: No scoped route includes placeholder/dev/no-backend text in visible or metadata copy.
- **SC-010**: `npm run build` completes successfully.

## Assumptions

- Arabic remains the default locale and English remains secondary.
- Existing Nuxt i18n strategy remains `prefix_except_default`.
- Production base URL will be supplied through implementation or runtime configuration before final deployment.
- Blog content currently exists as local data and may later move to Nuxt Content.
- No backend integration is required for this phase beyond tracking route privacy metadata.
