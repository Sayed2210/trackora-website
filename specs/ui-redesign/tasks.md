# Tasks: Trackora Premium UI/UX Redesign

**Input**: `spec.md`, `plan.md`
**Scope**: Premium UI/UX redesign planning. Implementation later starts with Homepage only.

## Phase 1: Design System Polish

| ID | Description | Files Likely To Change | Dependency | Acceptance Criteria | Parallelizable |
|----|-------------|------------------------|------------|---------------------|----------------|
| UI001 | Audit current design tokens against required Trackora tokens. | `app/assets/css/main.css` | None | Token gaps are documented before editing and no random colors are planned. | Yes |
| UI002 | Refine premium Arabic-first typography scale. | `app/assets/css/main.css` | UI001 | Display, H1, H2, H3, body, and small text scales are defined and responsive. | No |
| UI003 | Refine spacing, radius, shadow, border, and glass utilities. | `app/assets/css/main.css` | UI001 | Utilities derive only from Trackora tokens and support premium spacing. | No |
| UI004 | Add motion rules with reduced-motion support. | `app/assets/css/main.css` | UI001 | Motion uses subtle CSS transitions and respects `prefers-reduced-motion`. | Yes |
| UI005 | Redesign `AppButton` visual variants. | `app/components/base/AppButton.vue` | UI002, UI003 | Primary, secondary, glass, disabled, loading, hover, and focus states work. | Yes |
| UI006 | Redesign `AppCard` visual variants. | `app/components/base/AppCard.vue` | UI003 | Flat, elevated, glass, feature-story, metric, and status card treatments are available. | Yes |
| UI007 | Redesign form base components. | `app/components/base/AppInput.vue`, `app/components/base/AppTextarea.vue` | UI003 | Focus, error, hint, disabled, and accessible label states remain intact. | Yes |
| UI008 | Refine supporting base components. | `app/components/base/AppBadge.vue`, `app/components/base/AppSectionHeader.vue`, `app/components/base/AppContainer.vue` | UI002, UI003 | Badges, section headers, and containers support premium layout rhythm. | Yes |

## Phase 2: Homepage Redesign Only

| ID | Description | Files Likely To Change | Dependency | Acceptance Criteria | Parallelizable |
|----|-------------|------------------------|------------|---------------------|----------------|
| UI009 | Redesign cinematic hero. | `app/components/sections/HeroSection.vue`, `i18n/locales/ar.json`, `i18n/locales/en.json` | UI005, UI006, UI008 | Hero includes large headline, short subheadline, request demo CTA, track shipment CTA, product mockup, and floating logistics cards. | No |
| UI010 | Redesign problem story section. | `app/components/sections/ProblemsSection.vue`, locale files | UI006, UI008 | Section covers Excel chaos, manual dispatch, COD reconciliation, fake orders, and customer calls. | Yes |
| UI011 | Create product reveal treatment. | `app/components/sections/FeaturesSection.vue` or `app/pages/index.vue`, locale files | UI006, UI008 | Trackora is clearly positioned as the operating system for shipping companies. | No |
| UI012 | Redesign six-step workflow. | `app/components/sections/HowItWorksSection.vue`, locale files | UI008 | Flow shows merchant upload -> risk validation -> smart dispatch -> courier delivery -> COD reconciliation -> public tracking and mirrors in RTL/LTR. | Yes |
| UI013 | Redesign feature story blocks. | `app/components/sections/FeaturesSection.vue`, locale files | UI006, UI008 | Smart Dispatch, Courier App, COD Wallet, Fraud Detection, and Public Tracking blocks feel premium and link correctly. | Yes |
| UI014 | Add metrics and trust treatment. | `app/pages/index.vue`, homepage section components, locale files | UI006, UI008 | Trust section communicates less manual work, faster dispatch, better COD control, and better visibility without unsupported numeric claims. | Yes |
| UI015 | Redesign pricing preview. | `app/components/sections/PricingPreviewSection.vue`, locale files | UI005, UI006 | Pricing teaser feels premium and routes to pricing/request demo correctly. | Yes |
| UI016 | Redesign final CTA and FAQ polish. | `app/components/sections/DemoCtaSection.vue`, `app/components/sections/FaqSection.vue`, locale files | UI005, UI006, UI008 | Final CTA is cinematic and FAQ remains readable, accessible, and conversion-focused. | Yes |
| UI017 | Assemble homepage rhythm and verify homepage. | `app/pages/index.vue` | UI009-UI016 | Homepage tells the complete story, works on mobile, supports RTL/LTR, and feels premium. | No |

## Phase 3: Feature Pages Redesign

| ID | Description | Files Likely To Change | Dependency | Acceptance Criteria | Parallelizable |
|----|-------------|------------------------|------------|---------------------|----------------|
| UI018 | Redesign feature overview page. | `app/pages/features/index.vue`, feature data/locales | UI008 | Overview preserves every feature link and improves premium product presentation. | Yes |
| UI019 | Redesign shared feature detail layout. | `app/components/sections/FeatureDetailPage.vue` | UI006, UI008 | Layout supports problem, capability reveal, workflow, benefits, and CTA. | No |
| UI020 | Polish individual feature pages. | `app/pages/features/*.vue`, `app/data/features.ts`, locale files | UI019 | All feature detail routes remain intact and visually consistent. | Yes |

## Phase 4: Solution Pages Redesign

| ID | Description | Files Likely To Change | Dependency | Acceptance Criteria | Parallelizable |
|----|-------------|------------------------|------------|---------------------|----------------|
| UI021 | Redesign shared solution detail layout. | `app/components/sections/SolutionDetailPage.vue` | UI006, UI008 | Layout supports audience pain, Trackora fit, outcomes, and CTA. | No |
| UI022 | Polish shipping companies solution page. | `app/pages/solutions/shipping-companies.vue`, solution data/locales | UI021 | Page clearly speaks to dispatch, courier management, COD, tracking, and operations. | Yes |
| UI023 | Polish ecommerce stores solution page. | `app/pages/solutions/ecommerce-stores.vue`, solution data/locales | UI021 | Page clearly speaks to delivery visibility, customer tracking, returns, COD, and merchant experience. | Yes |
| UI024 | Polish social sellers solution page. | `app/pages/solutions/social-sellers.vue`, solution data/locales | UI021 | Page clearly speaks to simple upload, COD follow-up, tracking, and fraud prevention. | Yes |

## Phase 5: Conversion Pages Redesign

| ID | Description | Files Likely To Change | Dependency | Acceptance Criteria | Parallelizable |
|----|-------------|------------------------|------------|---------------------|----------------|
| UI025 | Redesign pricing page. | `app/pages/pricing.vue`, `app/data/pricing.ts`, locale files | UI005, UI006, UI008 | Pricing feels calm, clear, premium, and all CTAs remain correct. | Yes |
| UI026 | Redesign request demo page. | `app/pages/request-demo.vue`, form components, locale files | UI007 | Form service, validation, loading, success, and error behavior remain unchanged. | No |
| UI027 | Redesign contact page. | `app/pages/contact.vue`, `app/components/base/AppContactForm.vue`, locale files | UI007 | Contact form behavior remains unchanged and contact options are clearer. | No |

## Phase 6: Tracking Page Polish

| ID | Description | Files Likely To Change | Dependency | Acceptance Criteria | Parallelizable |
|----|-------------|------------------------|------------|---------------------|----------------|
| UI028 | Redesign tracking input page. | `app/pages/track/index.vue`, locale files | UI005, UI007 | Tracking submit behavior remains unchanged and page feels trustworthy. | Yes |
| UI029 | Redesign tracking summary. | `app/components/tracking/TrackingSummary.vue` | UI006 | Shipment status hierarchy is clear and privacy-safe. | Yes |
| UI030 | Redesign tracking timeline. | `app/components/tracking/TrackingTimeline.vue` | UI006 | Timeline is polished, accessible, and mirrors correctly in RTL/LTR. | Yes |
| UI031 | Redesign tracking empty and error states. | `app/components/tracking/TrackingEmptyState.vue`, `app/components/tracking/TrackingErrorState.vue` | UI006 | Empty and error states provide clear recovery paths and do not change logic. | Yes |

## Phase 7: Blog Polish

| ID | Description | Files Likely To Change | Dependency | Acceptance Criteria | Parallelizable |
|----|-------------|------------------------|------------|---------------------|----------------|
| UI032 | Redesign blog index. | `app/pages/blog/index.vue`, `app/components/sections/BlogArticleCard.vue` | UI006, UI008 | Blog index feels editorial and preserves Nuxt Content behavior. | Yes |
| UI033 | Redesign blog article reading experience. | `app/pages/blog/[slug].vue`, article/prose styles | UI002, UI003 | Article page has comfortable Arabic/English reading rhythm and preserves slug behavior. | Yes |

## Phase 8: Final QA

| ID | Description | Files Likely To Change | Dependency | Acceptance Criteria | Parallelizable |
|----|-------------|------------------------|------------|---------------------|----------------|
| UI034 | Run production build verification. | None | All implementation phases | `npm run build` passes. | No |
| UI035 | Run route smoke test. | None | UI034 | Every existing route renders without runtime error. | No |
| UI036 | Run RTL/LTR QA. | None | UI034 | Arabic RTL and English LTR are polished across redesigned surfaces. | No |
| UI037 | Run responsive QA. | None | UI034 | Desktop, tablet, and mobile work with no horizontal overflow. | No |
| UI038 | Run functional regression QA. | None | UI034 | Tracking, forms, blog, navigation, language switcher, login dropdown, and mobile menu still work. | No |
| UI039 | Run visual token audit. | None | UI034 | No random colors are introduced; all added visual colors derive from Trackora tokens. | No |
| UI040 | Run accessibility QA. | None | UI034 | Focus states, keyboard navigation, contrast, labels, reduced motion, and semantic hierarchy are maintained. | No |

## Execution Rule

Implementation MUST start with Phase 1 and Phase 2 only. Later phases should not be implemented until Homepage redesign is reviewed and accepted.
