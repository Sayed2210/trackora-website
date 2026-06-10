<template>
  <div>
    <section class="track-result section" aria-labelledby="track-result-heading">
      <AppContainer>
        <div class="track-result__hero reveal-up">
          <p class="track-result__eyebrow">{{ t('track.resultKicker') }}</p>
          <h1 id="track-result-heading" class="track-result__title">{{ t('track.resultTitle') }}</h1>
          <p class="track-result__number" dir="ltr">{{ trackingNumber }}</p>

          <form class="track-result__retry-form" novalidate @submit.prevent="handleRetrySubmit">
            <AppInput
              :label="t('track.editTrackingNumber')"
              :placeholder="t('track.inputPlaceholder')"
              :model-value="retryNumber"
              :hint="t('track.retryHint')"
              :error="retryError"
              type="text"
              inputmode="text"
              autocomplete="off"
              @update:model-value="retryNumber = $event; retryError = ''"
            />
            <div class="track-result__retry-actions">
              <AppButton type="submit" variant="primary" :loading="loading" :disabled="loading">
                {{ t('track.updateTracking') }}
              </AppButton>
              <AppButton variant="ghost" :to="localePath('/track')">{{ t('track.backToTrack') }}</AppButton>
            </div>
          </form>
        </div>

        <div ref="statusRegion" class="track-result__status-region" tabindex="-1">
          <template v-if="loading">
            <div class="track-result__loading reveal-scale" role="status" aria-live="polite">
              <div class="track-result__loading-icon">
                <AppIcon3D name="public-tracking" alt="" size="lg" />
                <span class="track-result__spinner" aria-hidden="true" />
              </div>
              <p>{{ t('track.loading') }}</p>
            </div>
          </template>

          <template v-else-if="notFound">
            <TrackingEmptyState />
          </template>

          <template v-else-if="error">
            <TrackingErrorState @retry="retry" />
          </template>

          <template v-else-if="data">
            <div class="track-result__content">
              <div class="track-result__record reveal-scale">
                <TrackingSummary :shipment="data" />
                <aside class="track-result__next" aria-labelledby="next-step-title">
                  <span>{{ t('track.lastKnownStep') }}</span>
                  <h2 id="next-step-title">{{ localizeStatus(latestEntry?.status || data.status) }}</h2>
                  <p>{{ latestEntry ? localizeDescription(latestEntry.status, latestEntry.description) : t('track.timelineDescription') }}</p>
                  <dl>
                    <div>
                      <dt>{{ t('track.nextStep') }}</dt>
                      <dd>{{ nextEntry ? localizeStatus(nextEntry.status) : localizedFinalState }}</dd>
                    </div>
                    <div v-if="latestEntry?.timestamp">
                      <dt>{{ locale === 'ar' ? 'وقت التحديث' : 'Update time' }}</dt>
                      <dd dir="ltr">{{ formatDate(latestEntry.timestamp) }}</dd>
                    </div>
                  </dl>
                </aside>
              </div>
              <TrackingTimeline :shipment="data" />
            </div>

            <div v-if="config.public.enableMockTracking" class="track-result__mock-notice">
              <AppBadge variant="accent">{{ t('track.mockNotice') }}</AppBadge>
            </div>
          </template>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const router = useRouter()

const trackingNumber = computed(() => {
  const param = route.params.trackingNumber as string
  return param ? decodeURIComponent(param) : ''
})

const { loading, data, notFound, error, fetchTracking, reset } = useTrackingService()
const retryNumber = ref('')
const retryError = ref('')
const statusRegion = ref<HTMLElement | null>(null)

const latestEntry = computed(() => {
  if (!data.value?.timeline?.length) return null
  return [...data.value.timeline].reverse().find((entry) => entry.completed) || null
})

const nextEntry = computed(() => {
  if (!data.value?.timeline?.length || !latestEntry.value) return null
  const latestIndex = data.value.timeline.findIndex((entry) => entry === latestEntry.value)
  return data.value.timeline.slice(latestIndex + 1).find((entry) => !entry.completed) || null
})

const localizedFinalState = computed(() => {
  if (!data.value) return ''
  return data.value.status === 'DELIVERED'
    ? t('trackingStatus.DELIVERED')
    : localizeStatus(data.value.status)
})

const { setSeo } = useLocaleSeo()
setSeo(
  locale.value === 'ar' ? `تتبّع ${trackingNumber.value}` : `Track ${trackingNumber.value}`,
  locale.value === 'ar'
    ? `تتبّع حالة الشحنة ${trackingNumber.value} عبر تراكورا.`
    : `Track shipment status for ${trackingNumber.value} via Trackora.`,
  `/track/${trackingNumber.value}`,
  { robots: { index: false } },
)

onMounted(() => {
  retryNumber.value = trackingNumber.value
  if (trackingNumber.value) {
    fetchTracking(trackingNumber.value)
  }
})

watch(trackingNumber, (newVal) => {
  if (newVal) {
    retryNumber.value = newVal
    reset()
    fetchTracking(newVal)
  }
})

watch([loading, data, notFound, error], async () => {
  if (loading.value) return
  await nextTick()
  statusRegion.value?.focus({ preventScroll: true })
})

function retry() {
  if (trackingNumber.value) {
    reset()
    fetchTracking(trackingNumber.value)
  }
}

async function handleRetrySubmit() {
  const trimmed = retryNumber.value.trim()
  if (!trimmed) {
    retryError.value = t('track.emptyInputError')
    return
  }
  if (!/[\p{L}\p{N}]{5,}/u.test(trimmed.replace(/[\s-]/g, ''))) {
    retryError.value = t('track.formatError')
    return
  }

  if (trimmed === trackingNumber.value) {
    retry()
    return
  }

  await router.push(localePath(`/track/${encodeURIComponent(trimmed)}`))
}

function localizeStatus(status: string) {
  const key = `trackingStatus.${status}`
  const translated = t(key)
  return translated === key ? status : translated
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat(locale.value, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

function localizeDescription(status: string, fallback: string) {
  const mockDescriptions: Record<string, { ar: string; en: string }> = {
    'Order received': { ar: 'استلمت شركة الشحن بيانات الطلب من التاجر.', en: 'The shipping company received the order details from the merchant.' },
    'Picked up by courier': { ar: 'استلم المندوب الشحنة وبدأت تدخل مسار التشغيل.', en: 'The courier picked up the shipment and it entered the delivery workflow.' },
    'Arrived at distribution center': { ar: 'وصلت الشحنة إلى مركز التوزيع للمراجعة والإسناد.', en: 'The shipment reached the distribution center for review and assignment.' },
    'Out for delivery today': { ar: 'الشحنة مع المندوب ومتجهة للعميل اليوم.', en: 'The shipment is with the courier and heading to the customer today.' },
    'Delivered to customer': { ar: 'تم تسليم الشحنة للعميل.', en: 'The shipment was delivered to the customer.' },
  }
  return mockDescriptions[fallback]?.[locale.value as 'ar' | 'en'] || fallback || localizeStatus(status)
}
</script>

<style scoped>
.track-result {
  overflow: hidden;
  background:
    radial-gradient(circle at 14% 8%, rgba(45, 110, 125, 0.14), transparent 30%),
    radial-gradient(circle at 86% 10%, rgba(232, 168, 56, 0.08), transparent 28%),
    linear-gradient(180deg, rgba(245, 245, 245, 0.9), rgba(255, 255, 255, 0));
}

.track-result__hero {
  max-width: 52rem;
  margin-inline: auto;
  margin-block-end: var(--spacing-10);
  text-align: center;
}

.track-result__eyebrow {
  margin-block-end: var(--spacing-3);
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 800;
}

.track-result__title {
  font-size: var(--text-5xl);
  letter-spacing: -0.04em;
  margin-block-end: var(--spacing-4);
}

html[lang='ar'] .track-result__title {
  letter-spacing: -0.015em;
}

.track-result__number {
  display: inline-flex;
  max-width: 100%;
  overflow-wrap: anywhere;
  color: var(--color-primary);
  font-size: var(--text-base);
  font-weight: 900;
}

.track-result__retry-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--spacing-4);
  align-items: end;
  max-width: 48rem;
  margin: var(--spacing-8) auto 0;
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-5);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  text-align: start;
}

.track-result__retry-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
}

.track-result__status-region:focus {
  outline: none;
}

.track-result__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
  max-width: 64rem;
  margin-inline: auto;
}

.track-result__record {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(18rem, 0.72fr);
  gap: var(--spacing-6);
  align-items: stretch;
}

.track-result__next {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--spacing-8);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-8);
  background:
    radial-gradient(circle at 18% 12%, rgba(232, 168, 56, 0.18), transparent 12rem),
    linear-gradient(145deg, #0b2933, var(--color-primary));
  color: var(--color-text-light);
  box-shadow: var(--shadow-lg);
}

.track-result__next > * {
  position: relative;
  z-index: 1;
}

.track-result__next span {
  width: fit-content;
  border-radius: var(--radius-full);
  padding: var(--spacing-2) var(--spacing-3);
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.82);
  font-size: var(--text-sm);
  font-weight: 800;
}

.track-result__next h2 {
  color: var(--color-text-light);
  font-size: clamp(1.75rem, 4vw, 3.25rem);
  line-height: 1.12;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.track-result__next p {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.85;
  text-wrap: pretty;
}

.track-result__next dl {
  display: grid;
  gap: var(--spacing-3);
}

.track-result__next dl div {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-4);
  background: rgba(255, 255, 255, 0.08);
}

.track-result__next dt {
  color: rgba(255, 255, 255, 0.66);
  font-size: var(--text-sm);
  font-weight: 800;
}

.track-result__next dd {
  margin-block-start: var(--spacing-1);
  color: var(--color-text-light);
  font-weight: 800;
}

.track-result__loading {
  text-align: center;
  max-width: 34rem;
  margin-inline: auto;
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-12) var(--spacing-6);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.track-result__loading-icon {
  position: relative;
  display: inline-grid;
  place-items: center;
  margin-block-end: var(--spacing-6);
}

.track-result__spinner {
  position: absolute;
  width: 6.8rem;
  height: 6.8rem;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.track-result__loading p {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
}

.track-result__mock-notice {
  text-align: center;
  margin-block-start: var(--spacing-8);
}

@media (max-width: 36rem) {
  .track-result__title {
    font-size: var(--text-4xl);
  }

  .track-result__retry-form {
    grid-template-columns: 1fr;
  }

  .track-result__retry-actions,
  .track-result__retry-actions :deep(.app-button) {
    width: 100%;
  }

  .track-result__retry-actions {
    flex-direction: column;
  }
}

@media (max-width: 56rem) {
  .track-result__record {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 36rem) {
  .track-result__next {
    padding: var(--spacing-6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .track-result__spinner {
    animation: none;
  }
}
</style>
