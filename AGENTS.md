<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
at specs/001-trackora-marketing-website/plan.md

## Key Commands
- `npm run dev` — Start Nuxt dev server
- `npm run build` — Production build
- `npm run generate` — Static site generation
- `npm run preview` — Preview production build

## Project Architecture
- Nuxt 4 with Vue 3, app/ directory structure
- Arabic-first RTL marketing website for Trackora
- i18n: @nuxtjs/i18n with ar (default RTL) and en (LTR)
- Design tokens in app/assets/css/main.css
- Base components in app/components/base/
- Layout components in app/components/layout/
- Section components in app/components/sections/
- Tracking components in app/components/tracking/
- Data files in app/data/
- Composables in app/composables/
- Locales in i18n/locales/ (JSON)
- Default layout in app/layouts/default.vue
- Homepage in app/pages/index.vue (uses section components)

## Dependencies
- nuxt, vue, vue-router (core)
- @nuxtjs/i18n (localization)
- @nuxt/content (installed, not yet configured — for blog later)

## Design System
- Primary: #1B4D5C (deep teal)
- Accent: #E8A838 (warm gold)
- Background: #FFFFFF / #F7F9FA / #0F3340
- Full token definitions in app/assets/css/main.css

## Route Structure (Phase 4 complete)
- / (homepage with sections)
- /features (not yet implemented)
- /features/smart-dispatch (not yet implemented)
- /features/courier-app (not yet implemented)
- /features/merchant-portal (not yet implemented)
- /features/cod-wallet (not yet implemented)
- /features/bulk-upload (not yet implemented)
- /features/fraud-detection (not yet implemented)
- /solutions/shipping-companies (not yet implemented)
- /solutions/ecommerce-stores (not yet implemented)
- /solutions/social-sellers (not yet implemented)
- /pricing (not yet implemented)
- /request-demo (not yet implemented)
- /contact (not yet implemented)
- /blog (not yet implemented)
- /blog/[slug] (not yet implemented)
- /track (not yet implemented)
- /track/[trackingNumber] (not yet implemented)
<!-- SPECKIT END -->

## Design Context
- Read `PRODUCT.md` for Trackora strategy before design work: default register is `brand`, primary audience is logistics operators, voice is confident, clear, and operational.
- Read `DESIGN.md` for the current visual system: the extracted live tokens use teal and gold from `app/assets/css/main.css`, with the creative north star "Shipment Ledger".
- Preserve Arabic-first RTL behavior, WCAG AA contrast/focus/reduced-motion requirements, and avoid generic SaaS patterns called out in `PRODUCT.md` and `DESIGN.md`.
