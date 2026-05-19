<template>
  <div>
    <section class="track-result section" aria-labelledby="track-result-heading">
      <AppContainer>
        <div class="track-result__hero reveal-up">
          <p class="track-result__eyebrow">{{ locale === 'ar' ? 'تحديث آمن للشحنة' : 'Secure shipment update' }}</p>
          <h1 id="track-result-heading" class="track-result__title">{{ t('track.resultTitle') }}</h1>
          <p class="track-result__number" dir="ltr">{{ trackingNumber }}</p>
        </div>

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
            <TrackingSummary :shipment="data" />
            <TrackingTimeline :shipment="data" />
            <div class="track-result__back">
              <AppButton variant="outline" :to="localePath('/track')">{{ t('track.backToTrack') }}</AppButton>
            </div>
          </div>

          <div v-if="config.public.enableMockTracking" class="track-result__mock-notice">
            <AppBadge variant="accent">{{ t('track.mockNotice') }}</AppBadge>
          </div>
        </template>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()

const trackingNumber = computed(() => {
  const param = route.params.trackingNumber as string
  return param ? decodeURIComponent(param) : ''
})

const { loading, data, notFound, error, fetchTracking, reset } = useTrackingService()

const { setSeo } = useLocaleSeo()
setSeo(
  locale.value === 'ar' ? `تتبّع ${trackingNumber.value}` : `Track ${trackingNumber.value}`,
  locale.value === 'ar'
    ? `تتبّع حالة الشحنة ${trackingNumber.value} عبر تراكورا.`
    : `Track shipment status for ${trackingNumber.value} via Trackora.`
)

onMounted(() => {
  if (trackingNumber.value) {
    fetchTracking(trackingNumber.value)
  }
})

watch(trackingNumber, (newVal) => {
  if (newVal) {
    reset()
    fetchTracking(newVal)
  }
})

function retry() {
  if (trackingNumber.value) {
    reset()
    fetchTracking(trackingNumber.value)
  }
}
</script>

<style scoped>
.track-result {
  overflow: hidden;
  background:
    radial-gradient(circle at 14% 8%, rgba(59, 89, 152, 0.14), transparent 30%),
    radial-gradient(circle at 86% 10%, rgba(255, 107, 107, 0.08), transparent 28%),
    linear-gradient(180deg, rgba(245, 245, 245, 0.9), rgba(255, 255, 255, 0));
}

.track-result__hero {
  max-width: 52rem;
  margin-inline: auto;
  margin-block-end: var(--spacing-12);
  text-align: center;
}

.track-result__eyebrow {
  display: inline-flex;
  margin-block-end: var(--spacing-4);
  border: 1px solid rgba(26, 59, 102, 0.1);
  border-radius: var(--radius-full);
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(255, 255, 255, 0.76);
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 800;
  box-shadow: var(--shadow-sm);
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
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-full);
  padding: var(--spacing-2) var(--spacing-5);
  background: rgba(255, 255, 255, 0.78);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 800;
  box-shadow: var(--shadow-sm);
}

.track-result__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
  max-width: 56rem;
  margin-inline: auto;
}

.track-result__loading {
  text-align: center;
  max-width: 34rem;
  margin-inline: auto;
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-4xl);
  padding: var(--spacing-12) var(--spacing-6);
  background: var(--glass-bg);
  box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.82);
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

.track-result__back {
  display: flex;
  justify-content: center;
  margin-block-start: var(--spacing-4);
}

.track-result__mock-notice {
  text-align: center;
  margin-block-start: var(--spacing-8);
}

@media (max-width: 36rem) {
  .track-result__title {
    font-size: var(--text-4xl);
  }
}

@media (prefers-reduced-motion: reduce) {
  .track-result__spinner {
    animation: none;
  }
}
</style>
