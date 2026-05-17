<template>
  <div>
    <section class="track-result section" aria-labelledby="track-result-heading">
      <AppContainer narrow>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'تتبّع' : 'Track'"
          :title="t('track.resultTitle')"
        />

        <template v-if="loading">
          <div class="track-result__loading">
            <span class="track-result__spinner" aria-hidden="true" />
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
.track-result__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.track-result__loading {
  text-align: center;
  padding: var(--spacing-16) var(--spacing-6);
}

.track-result__spinner {
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-block-end: var(--spacing-4);
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
</style>