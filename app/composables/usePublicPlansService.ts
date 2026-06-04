import type { PublicPlan } from '~/types/pricing'

interface PublicPlansApiResponse {
  success?: boolean
  data?: PublicPlan[]
  message?: string
}

const FALLBACK_PLANS: PublicPlan[] = [
  {
    id: 'fallback-starter',
    slug: 'starter',
    name: 'المبتدئة',
    description: 'للأفراد والشركات الصغيرة التي تبدأ رحلتها.',
    priceMonthly: 0,
    priceYearly: 0,
    currency: 'EGP',
    shipmentLimit: 100,
    features: [
      'حتى ١٠٠ شحنة شهرياً',
      'تتبّع الشحنات',
      'بوابة التاجر الأساسية',
      'دعم بالبريد الإلكتروني',
    ],
    isPopular: false,
    ctaLabel: 'ابدأ مجاناً',
    ctaHref: '/request-demo',
  },
  {
    id: 'fallback-professional',
    slug: 'professional',
    name: 'الاحترافية',
    description: 'للشركات المتنامية التي تحتاج إدارة متقدمة.',
    priceMonthly: null,
    priceYearly: null,
    currency: 'EGP',
    shipmentLimit: null,
    features: [
      'شحنات غير محدودة',
      'الإرسال الذكي',
      'محفظة النقدي',
      'تقارير متقدمة',
      'دعم أولوي',
    ],
    isPopular: true,
    ctaLabel: 'اطلب عرضاً توضيحياً',
    ctaHref: '/request-demo',
  },
  {
    id: 'fallback-enterprise',
    slug: 'enterprise',
    name: 'المؤسسية',
    description: 'حلول مخصصة للمؤسسات الكبيرة وأصحاب الحجم العالي.',
    priceMonthly: null,
    priceYearly: null,
    currency: 'EGP',
    shipmentLimit: null,
    features: [
      'كل مزايا الاحترافية',
      'تكامل API كامل',
      'مدير حساب مخصص',
      'اتفاقية مستوى خدمة',
      'تدريب وفريق مخصص',
    ],
    isPopular: false,
    ctaLabel: 'تواصل معنا',
    ctaHref: '/contact',
  },
]

function normalizePlans(raw: unknown[]): PublicPlan[] {
  return raw.map((item: unknown) => {
    const plan = item as Record<string, unknown>
    return {
      id: String(plan.id ?? ''),
      slug: String(plan.slug ?? ''),
      name: String(plan.name ?? ''),
      description: String(plan.description ?? ''),
      priceMonthly: plan.priceMonthly != null ? Number(plan.priceMonthly) : null,
      priceYearly: plan.priceYearly != null ? Number(plan.priceYearly) : null,
      currency: String(plan.currency ?? 'EGP'),
      shipmentLimit: plan.shipmentLimit != null ? Number(plan.shipmentLimit) : null,
      features: Array.isArray(plan.features) ? plan.features.map(String) : [],
      isPopular: Boolean(plan.isPopular),
      ctaLabel: String(plan.ctaLabel ?? ''),
      ctaHref: String(plan.ctaHref ?? ''),
    }
  })
}

export function usePublicPlansService() {
  const config = useRuntimeConfig()
  const loading = ref(false)
  const data = ref<PublicPlan[] | null>(null)
  const error = ref<string | null>(null)
  const usedFallback = ref(false)

  const isEmpty = computed(() => !loading.value && data.value !== null && data.value.length === 0)

  async function fetchPlans() {
    loading.value = true
    error.value = null
    usedFallback.value = false
    data.value = null

    const baseUrl = config.public.apiBaseUrl as string

    if (!baseUrl) {
      if (import.meta.dev) {
        data.value = FALLBACK_PLANS
        usedFallback.value = true
        loading.value = false
        return
      }
      error.value = 'API configuration is missing.'
      loading.value = false
      return
    }

    const endpoint = `${baseUrl.replace(/\/+$/, '')}/public/plans`

    try {
      const response = await $fetch<PublicPlansApiResponse>(endpoint)

      const plans = Array.isArray(response)
        ? normalizePlans(response)
        : response.data && Array.isArray(response.data)
          ? normalizePlans(response.data)
          : null

      if (plans && plans.length > 0) {
        data.value = plans
      } else if (plans && plans.length === 0) {
        data.value = []
      } else {
        data.value = []
      }
    } catch (err: unknown) {
      if (import.meta.dev) {
        data.value = FALLBACK_PLANS
        usedFallback.value = true
      } else {
        error.value = err instanceof Error ? err.message : 'Failed to load pricing plans.'
      }
    } finally {
      loading.value = false
    }
  }

  function reset() {
    loading.value = false
    data.value = null
    error.value = null
    usedFallback.value = false
  }

  return { loading, data, error, isEmpty, usedFallback, fetchPlans, reset }
}