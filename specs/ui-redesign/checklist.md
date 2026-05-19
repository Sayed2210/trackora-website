# Quality Checklist: Trackora Premium UI/UX Redesign

**Purpose**: Validate premium UI/UX redesign quality without functional regressions.
**Feature**: `specs/ui-redesign/spec.md`

## Scope Safety

- [ ] CHK001 No routes changed.
- [ ] CHK002 No routes removed.
- [ ] CHK003 No API logic changed.
- [ ] CHK004 No i18n logic changed.
- [ ] CHK005 No existing pages removed.
- [ ] CHK006 No authenticated dashboard/product app UI introduced.
- [ ] CHK007 Implementation starts with Homepage only after design system polish.

## Build And Runtime

- [ ] CHK008 `npm run build` passes.
- [ ] CHK009 `npm run generate` passes if static output is required.
- [ ] CHK010 No route is broken.
- [ ] CHK011 No console/runtime errors appear on required pages.
- [ ] CHK012 Navigation still reaches all existing public routes.

## Visual Quality

- [ ] CHK013 Homepage feels premium.
- [ ] CHK014 Homepage does not feel like a generic SaaS template.
- [ ] CHK015 Hero feels cinematic and product-led.
- [ ] CHK016 Typography scale feels confident and readable.
- [ ] CHK017 Section spacing feels calm and luxurious.
- [ ] CHK018 Cards feel refined and intentional.
- [ ] CHK019 Glass effects remain readable.
- [ ] CHK020 Shadows are soft and token-derived.
- [ ] CHK021 Borders are subtle and token-derived.
- [ ] CHK022 No random colors are introduced.
- [ ] CHK023 All extra visual colors are derived from Trackora tokens.
- [ ] CHK024 Accent color is used sparingly and intentionally.

## Storytelling

- [ ] CHK025 Homepage shows before-Trackora chaos.
- [ ] CHK026 Homepage includes Excel chaos.
- [ ] CHK027 Homepage includes manual dispatch pain.
- [ ] CHK028 Homepage includes COD reconciliation pain.
- [ ] CHK029 Homepage includes fake order risk.
- [ ] CHK030 Homepage includes customer call pressure.
- [ ] CHK031 Homepage reveals Trackora as the logistics operating system.
- [ ] CHK032 Homepage explains merchant upload -> risk validation -> smart dispatch -> courier delivery -> COD reconciliation -> public tracking.
- [ ] CHK033 Homepage communicates visibility.
- [ ] CHK034 Homepage communicates speed.
- [ ] CHK035 Homepage communicates cash control.
- [ ] CHK036 Homepage communicates fraud reduction.
- [ ] CHK037 Homepage has a clear request demo CTA.
- [ ] CHK038 Homepage has a clear track shipment CTA where appropriate.

## Components

- [ ] CHK039 `AppButton` premium states work.
- [ ] CHK040 `AppCard` premium/glass treatments work.
- [ ] CHK041 `AppBadge` is refined and readable.
- [ ] CHK042 `AppSectionHeader` supports cinematic headings.
- [ ] CHK043 `AppContainer` supports responsive premium spacing.
- [ ] CHK044 `AppInput` remains accessible.
- [ ] CHK045 `AppTextarea` remains accessible.
- [ ] CHK046 `WebsiteNavbar` works on desktop and mobile.
- [ ] CHK047 `WebsiteFooter` preserves all important navigation.
- [ ] CHK048 `LanguageSwitcher` works.
- [ ] CHK049 `LoginDropdown` remains external-link only.
- [ ] CHK050 `MobileMenu` is keyboard accessible.
- [ ] CHK051 `TrackingSummary` remains data-compatible.
- [ ] CHK052 `TrackingTimeline` remains data-compatible.
- [ ] CHK053 `TrackingEmptyState` remains clear and localized.
- [ ] CHK054 `TrackingErrorState` remains clear and localized.

## Pages

- [ ] CHK055 Homepage redesigned first.
- [ ] CHK056 Feature overview page remains intact.
- [ ] CHK057 All feature detail pages remain intact.
- [ ] CHK058 All solution pages remain intact.
- [ ] CHK059 Pricing page remains intact.
- [ ] CHK060 Request demo page forms still work.
- [ ] CHK061 Contact page forms still work.
- [ ] CHK062 Public tracking input still works.
- [ ] CHK063 Public tracking result still works.
- [ ] CHK064 Blog index still works.
- [ ] CHK065 Blog article page still works.

## Forms And API Safety

- [ ] CHK066 Request demo validation still works.
- [ ] CHK067 Request demo loading state still works.
- [ ] CHK068 Request demo success state still works.
- [ ] CHK069 Request demo error state still works.
- [ ] CHK070 Contact validation still works.
- [ ] CHK071 Contact loading state still works.
- [ ] CHK072 Contact success state still works.
- [ ] CHK073 Contact error state still works.
- [ ] CHK074 Tracking API call behavior is unchanged.
- [ ] CHK075 Tracking mock fallback behavior is unchanged.
- [ ] CHK076 Tracking empty state behavior is unchanged.
- [ ] CHK077 Tracking error state behavior is unchanged.

## Localization

- [ ] CHK078 Arabic works.
- [ ] CHK079 Arabic RTL layout is polished.
- [ ] CHK080 English works.
- [ ] CHK081 English LTR layout is polished.
- [ ] CHK082 Mixed Arabic/English product terms render safely.
- [ ] CHK083 Direction switching does not break layout.
- [ ] CHK084 Flow diagrams mirror correctly.
- [ ] CHK085 Timelines mirror correctly.
- [ ] CHK086 Forms align correctly in RTL and LTR.

## Responsive

- [ ] CHK087 Desktop layout works.
- [ ] CHK088 Tablet layout works.
- [ ] CHK089 Mobile layout works.
- [ ] CHK090 No horizontal overflow.
- [ ] CHK091 Touch targets are usable.
- [ ] CHK092 Product mockups simplify gracefully on small screens.
- [ ] CHK093 Floating cards do not obstruct content on mobile.
- [ ] CHK094 Long Arabic text wraps safely.

## Motion And Accessibility

- [ ] CHK095 Hover effects are subtle.
- [ ] CHK096 Reveal effects are soft.
- [ ] CHK097 Transitions are smooth.
- [ ] CHK098 No annoying movement.
- [ ] CHK099 No heavy animation library is added unless already installed and justified.
- [ ] CHK100 `prefers-reduced-motion` is respected.
- [ ] CHK101 Color contrast meets WCAG AA.
- [ ] CHK102 Keyboard navigation works.
- [ ] CHK103 Focus states are visible.
- [ ] CHK104 Forms expose validation accessibly.
- [ ] CHK105 Semantic landmarks are preserved.
- [ ] CHK106 Heading hierarchy remains valid.

## Final Acceptance

- [ ] CHK107 Website still feels Arabic-first.
- [ ] CHK108 Website feels premium, cinematic, clean, and trustworthy.
- [ ] CHK109 Website remains conversion-focused.
- [ ] CHK110 Website does not look like a generic template.
- [ ] CHK111 Tracking still works.
- [ ] CHK112 Forms still work.
- [ ] CHK113 Blog still works.
- [ ] CHK114 Accessibility is maintained.
