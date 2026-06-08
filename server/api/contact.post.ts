type InquiryValue =
  | 'sales'
  | 'support'
  | 'partnerships'
  | 'custom-pricing'
  | 'integrations'
  | 'general'

type ContactPayload = {
  name?: string
  company?: string
  phone?: string
  email?: string
  inquiryType?: InquiryValue
  message?: string
  locale?: string
  website?: string
}

const inquiryValues = new Set<InquiryValue>([
  'sales',
  'support',
  'partnerships',
  'custom-pricing',
  'integrations',
  'general',
])

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, maxLength)
}

function isValidRegionalPhone(value: string) {
  const normalized = value.replace(/[\s()-]/g, '')
  return /^(?:0?1[0125]\d{8}|\+201[0125]\d{8}|\+\d{8,15})$/.test(normalized)
}

function isValidEmail(value: string) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ContactPayload
  const config = useRuntimeConfig(event)

  if (cleanText(body.website, 120)) {
    return { ok: true }
  }

  const payload = {
    name: cleanText(body.name, 120),
    company: cleanText(body.company, 160),
    phone: cleanText(body.phone, 40),
    email: cleanText(body.email, 160),
    inquiryType: body.inquiryType,
    message: cleanText(body.message, 2000),
    locale: body.locale === 'en' ? 'en' : 'ar',
    submittedAt: new Date().toISOString(),
    source: 'trackora-contact-page',
  }

  const fieldErrors: Record<string, string> = {}
  if (!payload.name) fieldErrors.name = 'name_required'
  if (!payload.phone || !isValidRegionalPhone(payload.phone)) {
    fieldErrors.phone = 'phone_invalid'
  }
  if (!isValidEmail(payload.email)) fieldErrors.email = 'email_invalid'
  if (!payload.inquiryType || !inquiryValues.has(payload.inquiryType)) {
    fieldErrors.inquiryType = 'inquiry_type_required'
  }
  if (payload.message.length < 8) fieldErrors.message = 'message_too_short'

  if (Object.keys(fieldErrors).length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid contact submission',
      data: { fieldErrors },
    })
  }

  if (!config.contactWebhookUrl) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Contact delivery is not configured',
    })
  }

  try {
    await $fetch(config.contactWebhookUrl, {
      method: 'POST',
      body: payload,
      timeout: 8000,
    })
  } catch (error) {
    console.error('Contact webhook delivery failed', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Contact delivery failed',
    })
  }

  return { ok: true }
})
