export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@nuxt/content', '@nuxtjs/sitemap'],

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  
  runtimeConfig: {
    contactWebhookUrl: process.env.NUXT_CONTACT_WEBHOOK_URL || '',
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '',
      dashboardUrl: process.env.NUXT_PUBLIC_DASHBOARD_URL || '',
      enableMockTracking: process.env.NUXT_PUBLIC_ENABLE_MOCK_TRACKING === 'true',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://trackora.com',
    },
  },

  i18n: {
    locales: [
      { code: 'ar', name: 'العربية', dir: 'rtl', file: 'ar.json' },
      { code: 'en', name: 'English', dir: 'ltr', file: 'en.json' },
    ],
    defaultLocale: 'ar',
    langDir: 'locales',
    strategy: 'prefix_except_default',
  },

  sitemap: {
    autoI18n: true,
  },

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  content: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
  },
})
