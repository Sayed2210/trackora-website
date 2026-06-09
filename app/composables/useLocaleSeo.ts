export interface SeoOptions {
  path?: string
  robots?: { index?: boolean; follow?: boolean }
  article?: {
    publishedTime?: string
    author?: string
    section?: string
  }
  ogType?: string
}

export function useLocaleSeo() {
  const { locale } = useI18n()
  const config = useRuntimeConfig()

  function getSiteUrl(): string {
    return config.public.siteUrl || 'https://trackora.com'
  }

  function buildCanonicalUrl(localeCode: string, path: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    const prefix = localeCode === 'ar' ? '' : `/${localeCode}`
    return `${getSiteUrl()}${prefix}${cleanPath}`
  }

  function setSeo(title: string, description: string, path: string = '/', options?: SeoOptions) {
    const dir = locale.value === 'ar' ? 'rtl' : 'ltr'
    const fullTitle = locale.value === 'ar' ? `${title} | تراكورا` : `${title} | Trackora`
    const canonicalUrl = buildCanonicalUrl(locale.value, path)
    const alternateLocale = locale.value === 'ar' ? 'en' : 'ar'
    const alternateUrl = buildCanonicalUrl(alternateLocale, path)

    const isNoIndex = options?.robots?.index === false
    const isNoFollow = options?.robots?.follow === false
    const ogType = options?.ogType || 'website'

    const meta: Array<Record<string, string>> = [
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:locale', content: locale.value === 'ar' ? 'ar_SA' : 'en_US' },
      { property: 'og:locale:alternate', content: locale.value === 'ar' ? 'en_US' : 'ar_SA' },
      { property: 'og:site_name', content: 'Trackora' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
    ]

    if (isNoIndex || isNoFollow) {
      meta.push({
        name: 'robots',
        content: [isNoIndex ? 'noindex' : 'index', isNoFollow ? 'nofollow' : 'follow'].join(', '),
      })
    }

    if (options?.article) {
      if (options.article.publishedTime) {
        meta.push({ property: 'article:published_time', content: options.article.publishedTime })
      }
      if (options.article.author) {
        meta.push({ property: 'article:author', content: options.article.author })
      }
      if (options.article.section) {
        meta.push({ property: 'article:section', content: options.article.section })
      }
    }

    const link: Array<Record<string, string>> = [
      { rel: 'canonical', href: canonicalUrl },
      { rel: 'alternate', hreflang: alternateLocale, href: alternateUrl },
      { rel: 'alternate', hreflang: locale.value, href: canonicalUrl },
      { rel: 'alternate', hreflang: 'x-default', href: buildCanonicalUrl('ar', path) },
    ]

    useHead({
      title: fullTitle,
      htmlAttrs: { lang: locale.value, dir },
      meta,
      link,
    })
  }

  return { setSeo, getSiteUrl, buildCanonicalUrl }
}