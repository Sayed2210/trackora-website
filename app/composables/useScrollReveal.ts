export function useScrollReveal() {
  onMounted(() => {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const elements = document.querySelectorAll(
      '.reveal, .reveal-up, .reveal-scale, .reveal-stagger'
    )

    if (!elements.length) return

    if (prefersReducedMotion) {
      root.classList.remove('reveal-enabled')
      elements.forEach((el) => {
        el.classList.add('is-visible')
      })
      return
    }

    let observerReady = false

    const observer = new IntersectionObserver(
      (entries) => {
        if (!observerReady) {
          observerReady = true
          root.classList.add('reveal-enabled')
        }

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            if (el.classList.contains('reveal-stagger')) {
              const parent = el.parentElement
              if (parent) {
                const siblings = Array.from(parent.querySelectorAll(':scope > .reveal-stagger'))
                siblings.forEach((sibling, index) => {
                  ;(sibling as HTMLElement).style.transitionDelay = `${index * 100}ms`
                })
              }
            }
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach((el) => observer.observe(el))
  })
}