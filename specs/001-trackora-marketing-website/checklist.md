# Quality Checklist: Trackora Marketing Website

**Purpose**: Validate full Trackora marketing website readiness.
**Feature**: `specs/001-trackora-marketing-website/spec.md`

## Phase Scope

- [x] CHK001 Current `/` homepage remains Phase 0 / MVP Landing Page
- [x] CHK002 Expanded website scope includes all required routes
- [x] CHK003 Scope remains marketing/public website only
- [x] CHK004 No authenticated dashboard UI is introduced

## Required Routes

- [x] CHK005 `/` route exists and meets homepage acceptance criteria
- [x] CHK006 `/features` route exists and lists all features
- [x] CHK007 `/features/smart-dispatch` route exists
- [x] CHK008 `/features/courier-app` route exists
- [x] CHK009 `/features/merchant-portal` route exists
- [x] CHK010 `/features/cod-wallet` route exists
- [x] CHK011 `/features/bulk-upload` route exists
- [x] CHK012 `/features/fraud-detection` route exists
- [x] CHK013 `/solutions/shipping-companies` route exists
- [x] CHK014 `/solutions/ecommerce-stores` route exists
- [x] CHK015 `/solutions/social-sellers` route exists
- [x] CHK016 `/pricing` route exists
- [x] CHK017 `/request-demo` route exists
- [x] CHK018 `/contact` route exists
- [x] CHK019 `/blog` route exists
- [x] CHK020 `/blog/[slug]` route exists
- [x] CHK021 `/track` route exists
- [x] CHK022 `/track/[trackingNumber]` route exists

## Layout Components

- [x] CHK023 `WebsiteNavbar` is implemented
- [x] CHK024 `WebsiteFooter` is implemented
- [x] CHK025 `LanguageSwitcher` is implemented
- [x] CHK026 `LoginDropdown` is implemented
- [x] CHK027 `MobileMenu` is implemented
- [x] CHK028 Mobile menu is keyboard accessible
- [x] CHK029 Login dropdown links externally and does not implement auth

## Base Components

- [x] CHK030 `AppButton` is reusable and accessible
- [x] CHK031 `AppCard` uses design tokens
- [x] CHK032 `AppBadge` supports status/label variants
- [x] CHK033 `AppSectionHeader` supports localized headings
- [x] CHK034 `AppContainer` standardizes page width and padding
- [x] CHK035 `AppInput` supports label, hint, error, disabled
- [x] CHK036 `AppTextarea` supports label, hint, error, disabled

## Homepage Sections

- [x] CHK037 `HeroSection` exists
- [x] CHK038 `ProblemsSection` exists
- [x] CHK039 `FeaturesSection` exists
- [x] CHK040 `HowItWorksSection` exists
- [x] CHK041 `PricingPreviewSection` exists
- [x] CHK042 `DemoCtaSection` exists
- [x] CHK043 `FaqSection` exists

## API Integration

- [x] CHK044 Runtime config includes public API base URL
- [x] CHK045 Runtime config includes mock tracking flag
- [x] CHK046 `useTrackingService` is implemented
- [x] CHK047 `useTrackingService` calls `GET /tracking/:trackingNumber`
- [x] CHK048 Tracking service exposes loading state
- [x] CHK049 Tracking service exposes empty state
- [x] CHK050 Tracking service exposes error state
- [x] CHK051 Tracking service supports local mock fallback
- [x] CHK052 `useRequestDemoService` placeholder is implemented
- [x] CHK053 Request demo form supports loading, success, and error states
- [x] CHK054 Contact form supports loading, success, and error states

## Public Tracking

- [x] CHK055 `/track` includes tracking input
- [x] CHK056 `/track` validates empty tracking numbers
- [x] CHK057 `/track` navigates to `/track/[trackingNumber]`
- [x] CHK058 `/track/[trackingNumber]` displays shipment summary
- [x] CHK059 `/track/[trackingNumber]` displays timeline UI
- [x] CHK060 Timeline events show status, timestamp, and location
- [x] CHK061 Unknown tracking number shows empty state
- [x] CHK062 API failure shows error state
- [x] CHK063 Local development can show mock tracking data

## i18n

- [x] CHK064 Arabic is default locale
- [x] CHK065 English is secondary locale
- [x] CHK066 Arabic renders RTL
- [x] CHK067 English renders LTR
- [x] CHK068 Language switcher updates locale
- [x] CHK069 Language switcher updates direction
- [x] CHK070 Translation files exist for Arabic and English
- [x] CHK071 Navigation labels are translated
- [x] CHK072 Form labels and validation messages are translated
- [x] CHK073 SEO metadata is localized per route

## Blog

- [x] CHK074 Nuxt Content is configured for blog
- [x] CHK075 `/blog` renders article index
- [x] CHK076 `/blog` renders empty state if no articles exist
- [x] CHK077 `/blog/[slug]` renders article detail
- [x] CHK078 Invalid blog slug renders not-found state
- [x] CHK079 Initial Arabic articles exist
- [x] CHK080 Articles include title, excerpt, date, tags, locale, and body
- [x] CHK081 Articles include SEO metadata

## Route Acceptance Criteria

- [x] CHK082 Every required route has explicit acceptance criteria in spec
- [x] CHK083 Every route has localized page title
- [x] CHK084 Every route has localized page description
- [x] CHK085 Every route renders without console/runtime error
- [x] CHK086 Every route works on desktop
- [x] CHK087 Every route works on tablet
- [x] CHK088 Every route works on mobile

## Accessibility And UX

- [x] CHK089 Semantic landmarks are used
- [x] CHK090 Heading hierarchy is valid
- [x] CHK091 Interactive controls have accessible names
- [x] CHK092 Keyboard navigation works
- [x] CHK093 Focus states are visible
- [x] CHK094 Color contrast meets WCAG AA
- [x] CHK095 Forms expose validation messages accessibly
- [x] CHK096 Mobile layouts have no horizontal overflow

## Build And Delivery

- [x] CHK097 `npm run build` passes
- [x] CHK098 `npm run generate` passes if static output is required
- [x] CHK099 No Nuxt starter content remains
- [x] CHK100 No unused placeholder route remains
- [x] CHK101 All CTAs point to approved internal or external destinations
- [x] CHK102 All visible Arabic content is RTL-safe
- [x] CHK103 English content is LTR-safe
- [x] CHK104 Design tokens are used consistently across pages and components