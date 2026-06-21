export interface SubscribePayload {
  company: {
    name: string
    slug: string
    businessType: string
  }
  owner: {
    name: string
    phone: string
    password: string
    email?: string
  }
  planSlug: string
}

export interface SubscribeResponse {
  tenant?: unknown
  subscription?: unknown
  plan?: unknown
  user?: unknown
  accessToken: string
  refreshToken: string
  expiresIn?: number
}

export type SubscribeErrorCode = 'conflict' | 'validation' | 'network' | 'generic'

export interface SubscribeFieldErrors {
  companyName?: string
  companySlug?: string
  businessType?: string
  ownerName?: string
  ownerPhone?: string
  ownerPassword?: string
  ownerEmail?: string
  planSlug?: string
  [key: string]: string | undefined
}

function buildEndpoint(baseUrl: string): string {
  return `${baseUrl.replace(/\/+$/, '')}/public/subscribe`
}

function extractStatus(err: unknown): number | undefined {
  if (err && typeof err === 'object') {
    const e = err as { statusCode?: number; status?: number; response?: { status?: number } }
    return e.statusCode ?? e.status ?? e.response?.status
  }
  return undefined
}

function extractData(err: unknown): Record<string, unknown> | undefined {
  if (err && typeof err === 'object') {
    const e = err as { data?: Record<string, unknown> }
    const data = e.data
    if (data && typeof data === 'object') {
      if ('data' in data && data.data && typeof data.data === 'object') {
        return data.data as Record<string, unknown>
      }
      return data
    }
  }
  return undefined
}

function normalizeFieldErrors(raw: unknown): SubscribeFieldErrors {
  const out: SubscribeFieldErrors = {}
  if (!raw || typeof raw !== 'object') return out
  const src = raw as Record<string, unknown>
  const map: Record<string, keyof SubscribeFieldErrors> = {
    'company.name': 'companyName',
    'companyName': 'companyName',
    'company.slug': 'companySlug',
    'companySlug': 'companySlug',
    'company.businessType': 'businessType',
    'businessType': 'businessType',
    'owner.name': 'ownerName',
    'ownerName': 'ownerName',
    'owner.phone': 'ownerPhone',
    'ownerPhone': 'ownerPhone',
    'owner.password': 'ownerPassword',
    'ownerPassword': 'ownerPassword',
    'owner.email': 'ownerEmail',
    'ownerEmail': 'ownerEmail',
    'planSlug': 'planSlug',
  }
  for (const key of Object.keys(src)) {
    const target = map[key]
    if (!target) continue
    const value = src[key]
    if (typeof value === 'string') {
      out[target] = value
    } else if (Array.isArray(value) && value.length > 0) {
      out[target] = String(value[0])
    }
  }
  return out
}

export function useSubscribeService() {
  const config = useRuntimeConfig()
  const loading = ref(false)
  const success = ref(false)
  const data = ref<SubscribeResponse | null>(null)
  const error = ref<string | null>(null)
  const errorCode = ref<SubscribeErrorCode | null>(null)
  const fieldErrors = ref<SubscribeFieldErrors>({})

  function reset() {
    loading.value = false
    success.value = false
    data.value = null
    error.value = null
    errorCode.value = null
    fieldErrors.value = {}
  }

  async function submit(payload: SubscribePayload): Promise<SubscribeResponse | null> {
    const baseUrl = config.public.apiBaseUrl as string

    loading.value = true
    success.value = false
    data.value = null
    error.value = null
    errorCode.value = null
    fieldErrors.value = {}

    if (!baseUrl) {
      error.value = 'API configuration is missing.'
      errorCode.value = 'generic'
      loading.value = false
      return null
    }

    const endpoint = buildEndpoint(baseUrl)

    try {
      const response = await $fetch<SubscribeResponse>(endpoint, {
        method: 'POST',
        body: payload,
        timeout: 15000,
      })

      data.value = response
      success.value = true
      return response
    } catch (err: unknown) {
      const status = extractStatus(err)
      const body = extractData(err)

      if (status === 409) {
        errorCode.value = 'conflict'
        error.value =
          (body && typeof body.message === 'string' && body.message) ||
          (body && typeof body.error === 'string' && body.error) ||
          'conflict'
      } else if (status === 400 || status === 422) {
        errorCode.value = 'validation'
        fieldErrors.value = normalizeFieldErrors(body?.fieldErrors ?? body?.errors ?? body)
        error.value =
          (body && typeof body.message === 'string' && body.message) ||
          (body && typeof body.error === 'string' && body.error) ||
          'validation'
      } else if (status === undefined) {
        errorCode.value = 'network'
        error.value = err instanceof Error ? err.message : 'network'
      } else {
        errorCode.value = 'generic'
        error.value =
          (body && typeof body.message === 'string' && body.message) ||
          (body && typeof body.error === 'string' && body.error) ||
          (err instanceof Error ? err.message : 'generic')
      }

      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, success, data, error, errorCode, fieldErrors, submit, reset }
}
