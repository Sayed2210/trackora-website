# Implementation Plan: Trackora Premium UI/UX Redesign

**Branch**: `ui-redesign` | **Date**: 2026-05-17 | **Spec**: `specs/ui-redesign/spec.md`
**Input**: Premium UI/UX redesign planning artifacts only.

## Summary

Plan a premium redesign of the existing Trackora marketing website without changing functionality. The target experience is a calm, cinematic, Apple-inspired product storytelling website for a B2B logistics SaaS brand, while keeping all existing routes, APIs, i18n behavior, forms, blog behavior, and tracking behavior intact.

Implementation must later begin with the Homepage only.

## Technical Context

**Project Type**: Nuxt 4 / Vue 3 marketing website
**Primary Locale**: Arabic RTL
**Secondary Locale**: English LTR
**Implementation Constraint**: Redesign surfaces only; do not change routes, API logic, or i18n logic
**Verification**: `npm run build`, route smoke tests, responsive QA, RTL/LTR QA, accessibility QA
**Visual Constraint**: All visual color additions must be derived from Trackora tokens

## Constitution Check

- Arabic-first RTL: PASS. Arabic remains the primary design direction.
- Route safety: PASS. No routes are added, removed, or renamed.
- API safety: PASS. Tracking and form service logic remains unchanged.
- i18n safety: PASS. Locale mechanics and direction switching remain unchanged.
- Premium visual quality: PASS. The plan prioritizes cinematic storytelling and premium spacing.
- Accessibility: PASS. Motion, contrast, focus, and keyboard requirements are included.

## Design Principles

- **Premium**: reduce density, increase confidence, and make each section feel intentional.
- **Clean**: use fewer competing elements and clearer hierarchy.
- **Cinematic**: use large type, reveal pacing, layered product visuals, and deep spacing.
- **Trustworthy**: make operations, COD, fraud control, and delivery visibility feel reliable.
- **Arabic-first**: write and design for Arabic first, not as an afterthought.
- **RTL-perfect**: mirror layout, visual flow, timelines, and interaction states naturally.
- **Conversion-focused**: guide visitors toward requesting a demo or tracking a shipment.
- **No template look**: avoid generic SaaS grids, common icon-card sections, and stock compositions.

## UX Storytelling Strategy

The Homepage should tell a single product launch story:

1. **Before Trackora**: operations feel chaotic because teams rely on Excel, manual dispatch, disconnected courier updates, missing COD reconciliation, fake orders, and customer calls.
2. **Product Reveal**: Trackora appears as the operating system for shipping companies.
3. **Workflow**: merchant upload -> risk validation -> smart dispatch -> courier delivery -> COD reconciliation -> public tracking.
4. **Trust**: Trackora gives teams visibility, speed, cash control, and fraud reduction.
5. **CTA**: the page ends with a confident request demo conversion moment.

## Visual System Plan

### Typography Scale

- Display headline: `52px-88px` desktop, `40px-52px` tablet, `34px-42px` mobile.
- Page H1: `44px-64px` desktop, `34px-44px` mobile.
- Section H2: `34px-48px` desktop, `28px-36px` mobile.
- Card H3: `22px-30px`.
- Body: `16px-18px` with generous line height.
- Small/meta: `13px-15px`.
- Arabic should use relaxed line-height and avoid overly tight tracking.
- English should remain polished without overriding Arabic-first rhythm.

### Spacing Scale

- Hero vertical rhythm: `120px-180px` desktop and `72px-112px` mobile.
- Standard sections: `96px-160px` desktop and `64px-96px` mobile.
- Card padding: `24px-40px` desktop and `20px-28px` mobile.
- Grid gaps: `20px-40px` depending on density.
- Use empty space as a premium design tool, not as unused space.

### Card Style

- Use large radii from `24px-32px` for premium panels.
- Use soft token-derived borders.
- Provide variants for flat, elevated, glass, feature-story, and status cards.
- Prefer fewer, larger story cards over many small generic cards.
- Preserve text contrast inside glass cards.

### Button Style

- Primary buttons use `#1B4D5C` with high-contrast text.
- Secondary buttons use glass, outline, or white/surface treatments.
- Accent `#E8A838` is used sparingly for focus, COD/value emphasis, and conversion accents.
- Buttons should feel large, tactile, and calm.
- Focus, loading, disabled, active, and hover states must remain accessible.

### Section Rhythm

- Alternate cinematic full-width sections with focused content panels.
- Use strong section openers and minimal body copy.
- Avoid repetitive card-grid pacing.
- Create a clear scroll narrative from chaos to product to trust to CTA.

### Gradients

- Use soft gradients derived from Primary, Primary Light, Accent, Background, and Surface.
- Use accent as a soft glow or highlight only.
- Avoid unrelated decorative colors.
- Gradients must never reduce text contrast.

### Glass Effects

- Use translucent white/surface/primary-derived overlays.
- Use blur carefully, mostly for navbar, floating cards, and dashboard panels.
- Pair glass with subtle borders and soft shadows.
- Avoid glass on dense text blocks where readability suffers.

### Shadows

- Use large, soft, low-opacity shadows derived from Primary.
- Avoid harsh dark shadows.
- Use shadow to create depth around hero mockups and floating cards.

### Borders

- Default borders derive from `#E0E0E0`.
- Premium borders may use low-opacity Primary or Primary Light.
- Active/status borders use Success, Warning, Danger, or Info only where semantically relevant.

### Motion Rules

- Use subtle hover elevation, soft reveal, opacity, and transform transitions.
- Use CSS transitions and native capabilities before adding dependencies.
- Do not use annoying loops, aggressive parallax, or constant movement.
- Respect `prefers-reduced-motion`.
- Motion should clarify hierarchy, not decorate randomly.

### Responsive Rules

- Desktop: layered cinematic composition with product mockups and floating cards.
- Tablet: reduce overlap and preserve visual hierarchy.
- Mobile: single-column storytelling, simplified mockups, and no horizontal overflow.
- Touch targets must be at least `44px`.
- Long Arabic text must wrap safely.

### RTL/LTR Rules

- Arabic RTL is the primary design target.
- English LTR must remain equally polished.
- Use logical properties where possible.
- Flow diagrams, timelines, arrows, form alignment, nav grouping, and floating card placement must mirror correctly.
- Avoid hardcoded left/right unless intentionally directional and mirrored.

## Component Redesign Plan

### Base Components

- `AppButton`: add premium sizing, strong primary, glass secondary, subtle hover, visible focus, loading, and disabled states.
- `AppCard`: support elevated, flat, glass, feature-story, metric, and status treatments.
- `AppBadge`: refine as eyebrow labels, status pills, and compact trust markers.
- `AppSectionHeader`: support cinematic display headings, minimal descriptions, centered or side-aligned variants.
- `AppContainer`: support standard, narrow editorial, and wide cinematic containers.
- `AppInput`: premium form surface, clear labels, strong focus state, accessible error state.
- `AppTextarea`: match `AppInput` behavior and spacing with comfortable writing area.

### Layout Components

- `WebsiteNavbar`: floating glass navbar, restrained link hierarchy, strong request demo CTA, no route changes.
- `WebsiteFooter`: spacious editorial footer with grouped links, brand summary, and trust-oriented presentation.
- `LanguageSwitcher`: compact premium control with clear active locale and RTL/LTR-safe placement.
- `LoginDropdown`: polished external login grouping without authentication logic.
- `MobileMenu`: premium full-screen or sheet-style menu with keyboard accessibility and preserved links.

### Homepage Sections

- `HeroSection`: cinematic launch hero with large headline, concise copy, two CTAs, dashboard mockup, and floating logistics cards.
- `ProblemsSection`: story-led operational pain section instead of generic problem cards.
- `FeaturesSection`: product story blocks and product reveal, not a flat feature grid.
- `HowItWorksSection`: six-step Trackora operating flow.
- `PricingPreviewSection`: premium pricing teaser with concise plan direction and CTA.
- `DemoCtaSection`: final cinematic conversion section.
- `FaqSection`: compact, refined answers to conversion objections.

### Tracking Components

- `TrackingSummary`: premium shipment status card with clear status hierarchy and privacy-safe details.
- `TrackingTimeline`: polished timeline that mirrors correctly in RTL/LTR.
- `TrackingEmptyState`: calm unknown-shipment state with useful next action.
- `TrackingErrorState`: trustworthy recovery state with retry/return action.

### Blog Components

- `BlogArticleCard`: editorial article card with refined metadata and readable excerpts.
- `BlogLayout`: calm blog frame with generous spacing and narrow reading width.
- `ArticleContent`: improved prose rhythm, heading hierarchy, lists, quotes, and RTL/LTR readability.

## Homepage Redesign Plan

### Section 1: Cinematic Hero

- Big headline.
- Short subheadline.
- Request Demo CTA.
- Track Shipment CTA.
- Premium dashboard/mockup visual.
- Floating shipment, COD, courier, and tracking cards.

Acceptance criteria:

- Visitor understands Trackora in under 5 seconds.
- Hero feels premium and product-led.
- CTA hierarchy is clear.
- Desktop composition feels cinematic.
- Mobile composition remains readable and stable.

### Section 2: Problem Story

- Excel chaos.
- Manual dispatch.
- COD reconciliation.
- Fake orders.
- Customer calls.

Acceptance criteria:

- Problems feel operational and specific.
- Section creates emotional contrast before the product reveal.
- Copy remains concise and powerful.

### Section 3: Product Reveal

- Position Trackora as the logistics operating system for shipping companies.
- Use a large product panel, dashboard reveal, or system map.

Acceptance criteria:

- Product value becomes clear before listing features.
- Visual treatment feels like a reveal moment.
- No template-style feature grid dominates this section.

### Section 4: How It Works

Six-step flow:

1. Merchant upload.
2. Risk validation.
3. Smart dispatch.
4. Courier delivery.
5. COD reconciliation.
6. Public tracking.

Acceptance criteria:

- Flow mirrors correctly in RTL/LTR.
- Steps remain clear on mobile.
- Each step uses minimal copy and strong hierarchy.

### Section 5: Feature Story Blocks

- Smart Dispatch.
- Courier App.
- COD Wallet.
- Fraud Detection.
- Public Tracking.

Acceptance criteria:

- Each block links to the relevant deeper page.
- Blocks feel like product capabilities, not generic cards.
- Visual rhythm varies between blocks.

### Section 6: Metrics / Trust

- Less manual work.
- Faster dispatch.
- Better COD control.
- Better visibility.

Acceptance criteria:

- Metrics are framed as outcomes.
- Avoid unsupported hard numerical claims unless already approved in content.
- Section feels credible and calm.

### Section 7: Pricing Preview

- Premium pricing teaser.
- Link to pricing.
- Request demo option.

Acceptance criteria:

- Pricing feels transparent without overloading the homepage.
- CTA path is clear.

### Section 8: Final Cinematic CTA

- Strong final request demo moment.
- Calm, confident copy.
- Premium visual composition.

Acceptance criteria:

- Section is visually distinct.
- Conversion path is obvious.
- Mobile CTA remains easy to act on.

## Page-by-Page Redesign Plan

### Homepage

- **Visual direction**: cinematic product launch with layered hero, product reveal, and premium flow.
- **Layout changes**: restructure into the eight planned homepage sections.
- **Component usage**: `HeroSection`, `ProblemsSection`, `FeaturesSection`, `HowItWorksSection`, `PricingPreviewSection`, `DemoCtaSection`, `FaqSection`, base components.
- **Copy improvements**: shorter, stronger, more operational, less generic.
- **Acceptance criteria**: premium story is clear, CTAs are obvious, RTL/LTR and mobile work.

### Navbar

- **Visual direction**: floating glass, calm, premium.
- **Layout changes**: simplify hierarchy and emphasize request demo without changing links.
- **Component usage**: `WebsiteNavbar`, `LanguageSwitcher`, `LoginDropdown`, `MobileMenu`.
- **Copy improvements**: shorten labels only if translation files are updated safely.
- **Acceptance criteria**: all routes preserved, keyboard accessible, mobile menu works.

### Footer

- **Visual direction**: editorial, spacious, trustworthy.
- **Layout changes**: grouped links, stronger brand block, calmer spacing.
- **Component usage**: `WebsiteFooter`.
- **Copy improvements**: concise brand statement and clearer link groups.
- **Acceptance criteria**: all important links preserved and RTL/LTR safe.

### Base Components

- **Visual direction**: reusable premium primitives.
- **Layout changes**: introduce consistent size, radius, shadow, glass, and motion variants.
- **Component usage**: `AppButton`, `AppCard`, `AppBadge`, `AppSectionHeader`, `AppContainer`, `AppInput`, `AppTextarea`.
- **Copy improvements**: not applicable except labels/hints already passed through props.
- **Acceptance criteria**: accessible states preserved and all colors token-derived.

### Feature Pages

- **Visual direction**: premium capability launch pages.
- **Layout changes**: hero, problem, capability reveal, workflow, benefits, CTA.
- **Component usage**: `FeatureDetailPage`, `AppCard`, `AppBadge`, `AppButton`, `DemoCtaSection`.
- **Copy improvements**: more outcome-focused and less generic.
- **Acceptance criteria**: every feature route remains intact and links still work.

### Solution Pages

- **Visual direction**: audience-specific premium landing pages.
- **Layout changes**: audience pain, operational context, Trackora fit, outcomes, CTA.
- **Component usage**: `SolutionDetailPage`, base components, `DemoCtaSection`.
- **Copy improvements**: speak directly to shipping companies, ecommerce stores, and social sellers.
- **Acceptance criteria**: each audience recognizes itself quickly.

### Pricing Page

- **Visual direction**: calm buying confidence.
- **Layout changes**: premium pricing cards, comparison, FAQ, CTA.
- **Component usage**: `AppCard`, `AppButton`, `AppBadge`, `FaqSection`, `DemoCtaSection`.
- **Copy improvements**: clarify value, qualification, and next step.
- **Acceptance criteria**: no pricing route or CTA regression.

### Request Demo Page

- **Visual direction**: focused conversion page.
- **Layout changes**: split layout with product promise and premium form card.
- **Component usage**: `AppInput`, `AppTextarea`, `AppButton`, `AppCard`, `AppContactForm` if reused.
- **Copy improvements**: reduce friction and explain what happens after submission.
- **Acceptance criteria**: existing service, validation, loading, success, and error behavior unchanged.

### Contact Page

- **Visual direction**: calm contact hub.
- **Layout changes**: clear contact options plus refined form.
- **Component usage**: `AppContactForm`, base components.
- **Copy improvements**: clearer intent-based contact labels.
- **Acceptance criteria**: existing contact behavior unchanged.

### Public Tracking Page

- **Visual direction**: trustworthy customer-facing shipment experience.
- **Layout changes**: focused tracking input, premium result card, clear timeline.
- **Component usage**: `TrackingSummary`, `TrackingTimeline`, `TrackingEmptyState`, `TrackingErrorState`.
- **Copy improvements**: privacy-safe reassurance and clearer status language.
- **Acceptance criteria**: tracking API behavior, mock fallback, loading, empty, and error states unchanged.

### Blog Index

- **Visual direction**: premium editorial knowledge hub.
- **Layout changes**: featured article area and refined article cards/list.
- **Component usage**: `BlogArticleCard`, optional blog layout wrappers if already present or later added.
- **Copy improvements**: stronger excerpts and article metadata presentation.
- **Acceptance criteria**: Nuxt Content behavior unchanged and empty state remains handled.

### Blog Article Page

- **Visual direction**: calm long-form reading.
- **Layout changes**: readable max width, improved prose rhythm, related CTA.
- **Component usage**: article content/prose components where existing.
- **Copy improvements**: improve headings and scanning where content is updated.
- **Acceptance criteria**: slugs, content loading, localized metadata, and not-found behavior unchanged.

## Motion Plan

- Use subtle hover elevation on cards and buttons.
- Use soft reveal on section entry with opacity and small translate only.
- Use smooth transitions for menus, dropdowns, accordions, and hover states.
- Avoid aggressive parallax, constant looping movement, or distracting decorative animation.
- Do not add a heavy animation library unless already installed and justified.
- Respect `prefers-reduced-motion` by disabling reveal transforms and long transitions.
- Ensure motion does not communicate meaning without a non-motion equivalent.
- Keep animations short, generally `150ms-400ms`.

## Implementation Phases

### Phase 1: Design System Polish

Refine tokens, typography, spacing, radii, cards, buttons, glass effects, shadows, forms, and motion rules.

### Phase 2: Homepage Redesign Only

Implement the cinematic homepage narrative and verify mobile, RTL/LTR, CTAs, and premium feel.

### Phase 3: Feature Pages Redesign

Apply premium feature detail structure to feature overview and detail pages.

### Phase 4: Solution Pages Redesign

Apply audience-specific premium storytelling to solution pages.

### Phase 5: Conversion Pages Redesign

Polish pricing, request demo, and contact pages without changing form/service logic.

### Phase 6: Tracking Page Polish

Polish public tracking input, summary, timeline, empty, and error states without changing tracking logic.

### Phase 7: Blog Polish

Polish blog index and article reading experience without changing Nuxt Content behavior.

### Phase 8: Final QA

Run build, route, RTL/LTR, mobile, accessibility, visual token, forms, blog, and tracking verification.

## Project Structure Impact

Planning artifacts live in:

```text
specs/ui-redesign/
├── spec.md
├── plan.md
├── tasks.md
└── checklist.md
```

Likely later implementation surfaces:

```text
app/assets/css/main.css
app/components/base/
app/components/layout/
app/components/sections/
app/components/tracking/
app/pages/
i18n/locales/
```

No implementation files are changed by this planning phase.
