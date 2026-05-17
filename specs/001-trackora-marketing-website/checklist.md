# Quality Checklist: Trackora Marketing Website

**Purpose**: Validate full Trackora marketing website readiness.
**Feature**: `specs/001-trackora-marketing-website/spec.md`

## Phase Scope

- [ ] CHK001 Current `/` homepage remains Phase 0 / MVP Landing Page
- [ ] CHK002 Expanded website scope includes all required routes
- [ ] CHK003 Scope remains marketing/public website only
- [ ] CHK004 No authenticated dashboard UI is introduced

## Required Routes

- [ ] CHK005 `/` route exists and meets homepage acceptance criteria
- [ ] CHK006 `/features` route exists and lists all features
- [ ] CHK007 `/features/smart-dispatch` route exists
- [ ] CHK008 `/features/courier-app` route exists
- [ ] CHK009 `/features/merchant-portal` route exists
- [ ] CHK010 `/features/cod-wallet` route exists
- [ ] CHK011 `/features/bulk-upload` route exists
- [ ] CHK012 `/features/fraud-detection` route exists
- [ ] CHK013 `/solutions/shipping-companies` route exists
- [ ] CHK014 `/solutions/ecommerce-stores` route exists
- [ ] CHK015 `/solutions/social-sellers` route exists
- [ ] CHK016 `/pricing` route exists
- [ ] CHK017 `/request-demo` route exists
- [ ] CHK018 `/contact` route exists
- [ ] CHK019 `/blog` route exists
- [ ] CHK020 `/blog/[slug]` route exists
- [ ] CHK021 `/track` route exists
- [ ] CHK022 `/track/[trackingNumber]` route exists

## Layout Components

- [ ] CHK023 `WebsiteNavbar` is implemented
- [ ] CHK024 `WebsiteFooter` is implemented
- [ ] CHK025 `LanguageSwitcher` is implemented
- [ ] CHK026 `LoginDropdown` is implemented
- [ ] CHK027 `MobileMenu` is implemented
- [ ] CHK028 Mobile menu is keyboard accessible
- [ ] CHK029 Login dropdown links externally and does not implement auth

## Base Components

- [ ] CHK030 `AppButton` is reusable and accessible
- [ ] CHK031 `AppCard` uses design tokens
- [ ] CHK032 `AppBadge` supports status/label variants
- [ ] CHK033 `AppSectionHeader` supports localized headings
- [ ] CHK034 `AppContainer` standardizes page width and padding
- [ ] CHK035 `AppInput` supports label, hint, error, disabled
- [ ] CHK036 `AppTextarea` supports label, hint, error, disabled

## Homepage Sections

- [ ] CHK037 `HeroSection` exists
- [ ] CHK038 `ProblemsSection` exists
- [ ] CHK039 `FeaturesSection` exists
- [ ] CHK040 `HowItWorksSection` exists
- [ ] CHK041 `PricingPreviewSection` exists
- [ ] CHK042 `DemoCtaSection` exists
- [ ] CHK043 `FaqSection` exists

## API Integration

- [ ] CHK044 Runtime config includes public API base URL
- [ ] CHK045 Runtime config includes mock tracking flag
- [ ] CHK046 `useTrackingService` is implemented
- [ ] CHK047 `useTrackingService` calls `GET /tracking/:trackingNumber`
- [ ] CHK048 Tracking service exposes loading state
- [ ] CHK049 Tracking service exposes empty state
- [ ] CHK050 Tracking service exposes error state
- [ ] CHK051 Tracking service supports local mock fallback
- [ ] CHK052 `useRequestDemoService` placeholder is implemented
- [ ] CHK053 Request demo form supports loading, success, and error states
- [ ] CHK054 Contact form supports loading, success, and error states

## Public Tracking

- [ ] CHK055 `/track` includes tracking input
- [ ] CHK056 `/track` validates empty tracking numbers
- [ ] CHK057 `/track` navigates to `/track/[trackingNumber]`
- [ ] CHK058 `/track/[trackingNumber]` displays shipment summary
- [ ] CHK059 `/track/[trackingNumber]` displays timeline UI
- [ ] CHK060 Timeline events show status, timestamp, and location
- [ ] CHK061 Unknown tracking number shows empty state
- [ ] CHK062 API failure shows error state
- [ ] CHK063 Local development can show mock tracking data

## i18n

- [ ] CHK064 Arabic is default locale
- [ ] CHK065 English is secondary locale
- [ ] CHK066 Arabic renders RTL
- [ ] CHK067 English renders LTR
- [ ] CHK068 Language switcher updates locale
- [ ] CHK069 Language switcher updates direction
- [ ] CHK070 Translation files exist for Arabic and English
- [ ] CHK071 Navigation labels are translated
- [ ] CHK072 Form labels and validation messages are translated
- [ ] CHK073 SEO metadata is localized per route

## Blog

- [ ] CHK074 Nuxt Content is configured for blog
- [ ] CHK075 `/blog` renders article index
- [ ] CHK076 `/blog` renders empty state if no articles exist
- [ ] CHK077 `/blog/[slug]` renders article detail
- [ ] CHK078 Invalid blog slug renders not-found state
- [ ] CHK079 Initial Arabic articles exist
- [ ] CHK080 Articles include title, excerpt, date, tags, locale, and body
- [ ] CHK081 Articles include SEO metadata

## Route Acceptance Criteria

- [ ] CHK082 Every required route has explicit acceptance criteria in spec
- [ ] CHK083 Every route has localized page title
- [ ] CHK084 Every route has localized page description
- [ ] CHK085 Every route renders without console/runtime error
- [ ] CHK086 Every route works on desktop
- [ ] CHK087 Every route works on tablet
- [ ] CHK088 Every route works on mobile

## Accessibility And UX

- [ ] CHK089 Semantic landmarks are used
- [ ] CHK090 Heading hierarchy is valid
- [ ] CHK091 Interactive controls have accessible names
- [ ] CHK092 Keyboard navigation works
- [ ] CHK093 Focus states are visible
- [ ] CHK094 Color contrast meets WCAG AA
- [ ] CHK095 Forms expose validation messages accessibly
- [ ] CHK096 Mobile layouts have no horizontal overflow

## Build And Delivery

- [ ] CHK097 `npm run build` passes
- [ ] CHK098 `npm run generate` passes if static output is required
- [ ] CHK099 No Nuxt starter content remains
- [ ] CHK100 No unused placeholder route remains
- [ ] CHK101 All CTAs point to approved internal or external destinations
- [ ] CHK102 All visible Arabic content is RTL-safe
- [ ] CHK103 English content is LTR-safe
- [ ] CHK104 Design tokens are used consistently across pages and components