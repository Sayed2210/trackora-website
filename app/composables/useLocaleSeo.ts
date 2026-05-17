export function useLocaleSeo() {
  const { locale, t } = useI18n()

  function setSeo(title: string, description: string, path: string = '/') {
    const dir = locale.value === 'ar' ? 'rtl' : 'ltr'
    const fullTitle = locale.value === 'ar' ? `${title} | تراكورا` : `${title} | Trackora`

    useHead({
      title: fullTitle,
      htmlAttrs: { lang: locale.value, dir },
      meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: fullTitle },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: locale.value === 'ar' ? 'ar_SA' : 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: fullTitle },
        { name: 'twitter:description', content: description },
      ],
    })
  }

  return { setSeo }
}