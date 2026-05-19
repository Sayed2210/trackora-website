# Trackora Website

Arabic-first RTL marketing website for [Trackora](https://trackora.com) — a last-mile delivery management platform. Built with [Nuxt 4](https://nuxt.com), Vue 3, and full bilingual support (Arabic RTL default, English LTR).

## Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com) with Vue 3 & Vue Router 5
- **i18n:** [@nuxtjs/i18n](https://i18n.nuxtjs.org/) — Arabic (default, RTL) & English (LTR)
- **Content:** [@nuxt/content](https://content.nuxt.com/) — for blog (planned)
- **Styling:** Custom design-token CSS (`app/assets/css/main.css`)
- **Package Manager:** npm

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run generate` | Static site generation |
| `npm run preview` | Preview production build |

## Project Structure

```
app/
├── app.vue                    # Root app component
├── assets/css/main.css        # Design tokens & global styles
├── components/
│   ├── base/                  # Reusable UI primitives (AppButton, AppCard, etc.)
│   ├── layout/                # Navbar, Footer, LanguageSwitcher, MobileMenu
│   ├── sections/              # Page sections (Hero, Features, Pricing, etc.)
│   └── tracking/              # Tracking UI (Timeline, Summary, states)
├── composables/               # useTrackingService, useLocaleSeo, etc.
├── data/                      # Static data (features, pricing, navigation, etc.)
├── layouts/default.vue        # Default layout
├── locales/                   # ar.json, en.json translation files
└── pages/                     # File-based routing
    ├── index.vue              # Homepage
    ├── blog/                  # Blog index & [slug]
    ├── contact.vue
    ├── features/              # Feature detail pages
    ├── pricing.vue
    ├── request-demo.vue
    ├── solutions/             # Solution detail pages
    └── track/                 # Tracking pages
i18n/locales/                  # i18n locale JSON files (ar.json, en.json)
specs/                         # Project specifications
public/                        # Static assets
```

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#1B4D5C` | Deep teal — primary brand |
| `--color-accent` | `#E8A838` | Warm gold — CTAs & highlights |
| `--color-bg-dark` | `#0F3340` | Dark backgrounds |
| `--color-bg-alt` | `#F7F9FA` | Alternate section bg |

Full token definitions in `app/assets/css/main.css`.

## i18n

- **Default locale:** Arabic (`ar`) — RTL
- **Second locale:** English (`en`) — LTR
- Strategy: `prefix_except_default` (Arabic at `/`, English at `/en/...`)
- Locale files: `i18n/locales/ar.json` & `i18n/locales/en.json`

## Environment Variables

| Variable | Description |
|---|---|
| `NUXT_PUBLIC_API_BASE_URL` | Trackora API base URL |
| `NUXT_PUBLIC_ENABLE_MOCK_TRACKING` | Set to `true` for mock tracking data |

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Open a pull request

## License

Private — All rights reserved.