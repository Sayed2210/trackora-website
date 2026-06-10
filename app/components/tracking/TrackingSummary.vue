<template>
  <div class="tracking-summary">
    <div class="tracking-summary__hero">
      <div class="tracking-summary__icon-wrap" aria-hidden="true">
        <AppIcon3D name="shipment" alt="" size="lg" />
      </div>
      <div class="tracking-summary__headline">
        <p class="tracking-summary__kicker">{{ t('track.trackingNumber') }}</p>
        <p class="tracking-summary__number" dir="ltr">{{ shipment.trackingNumber }}</p>
      </div>
      <AppBadge :variant="statusVariant" class="tracking-summary__badge">
        {{ localizedStatus }}
      </AppBadge>
    </div>

    <dl class="tracking-summary__details">
      <div class="tracking-summary__row tracking-summary__row--status">
        <dt class="tracking-summary__label">{{ t('track.status') }}</dt>
        <dd class="tracking-summary__value">{{ localizedStatus }}</dd>
      </div>
      <div class="tracking-summary__row">
        <dt class="tracking-summary__label">{{ t('track.merchant') }}</dt>
        <dd class="tracking-summary__value">{{ shipment.merchantName }}</dd>
      </div>
      <div v-if="shipment.estimatedDelivery" class="tracking-summary__row">
        <dt class="tracking-summary__label">{{ t('track.estimatedDelivery') }}</dt>
        <dd class="tracking-summary__value">{{ formatDelivery(shipment.estimatedDelivery) }}</dd>
      </div>
      <div v-if="shipment.customerName" class="tracking-summary__row">
        <dt class="tracking-summary__label">{{ t('track.customer') }}</dt>
        <dd class="tracking-summary__value">{{ shipment.customerName }}</dd>
      </div>
      <div v-if="shipment.customerPhoneMasked" class="tracking-summary__row">
        <dt class="tracking-summary__label">{{ t('track.phone') }}</dt>
        <dd class="tracking-summary__value" dir="ltr">{{ shipment.customerPhoneMasked }}</dd>
      </div>
    </dl>

    <div class="tracking-summary__privacy">
      <AppIcon3D name="fraud-detection" alt="" size="sm" />
      <p>{{ t('track.customerPrivacy') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TrackingData } from '~/composables/useTrackingService'

const props = defineProps<{
  shipment: TrackingData
}>()

const { t, locale } = useI18n()

const STATUS_VARIANTS: Record<string, 'primary' | 'accent' | 'success' | 'error' | 'default'> = {
  PENDING: 'default',
  PICKED_UP: 'primary',
  IN_WAREHOUSE: 'primary',
  OUT_FOR_DELIVERY: 'accent',
  DELIVERED: 'success',
  FAILED: 'error',
  POSTPONED: 'default',
  RETURNED: 'error',
  CANCELLED: 'error',
}

const localizedStatus = computed(() => {
  const key = `trackingStatus.${props.shipment.status}` as string
  const translated = t(key)
  return translated === key ? props.shipment.status : translated
})

const statusVariant = computed(() => STATUS_VARIANTS[props.shipment.status] ?? 'default')

function formatDelivery(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(locale.value, { year: 'numeric', month: 'short', day: 'numeric' }).format(date)
}
</script>

<style scoped>
.tracking-summary {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-8);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  height: 100%;
}

.tracking-summary::before {
  content: '';
  position: absolute;
  width: 16rem;
  height: 16rem;
  inset-block-start: -8rem;
  inset-inline-end: -7rem;
  border-radius: 50%;
  background: rgba(45, 110, 125, 0.08);
  pointer-events: none;
}

.tracking-summary__hero,
.tracking-summary__details,
.tracking-summary__privacy {
  position: relative;
  z-index: 1;
}

.tracking-summary__hero {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: var(--spacing-5);
  align-items: center;
  margin-block-end: var(--spacing-8);
}

.tracking-summary__headline {
  min-width: 0;
}

.tracking-summary__kicker {
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 800;
}

.tracking-summary__number {
  margin-block-start: var(--spacing-1);
  color: var(--color-text);
  font-size: clamp(1.25rem, 4vw, 2rem);
  font-weight: 900;
  overflow-wrap: anywhere;
}

.tracking-summary__badge {
  align-self: start;
}

.tracking-summary__details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: var(--spacing-4);
}

.tracking-summary__row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-xl);
  padding: var(--spacing-4);
  background: var(--color-bg-alt);
}

.tracking-summary__row--status {
  background: linear-gradient(145deg, rgba(45, 110, 125, 0.08), rgba(255, 255, 255, 0.82));
}

.tracking-summary__label {
  font-size: var(--text-sm);
  font-weight: 800;
  color: var(--color-text-secondary);
}

.tracking-summary__value {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text);
}

.tracking-summary__privacy {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin-block-start: var(--spacing-6);
  border-top: 1px solid rgba(27, 77, 92, 0.08);
  padding-block-start: var(--spacing-4);
}

.tracking-summary__privacy p {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.7;
}

@media (max-width: 48rem) {
  .tracking-summary__hero {
    grid-template-columns: 1fr;
  }

  .tracking-summary__details {
    grid-template-columns: 1fr;
  }

  .tracking-summary__privacy {
    align-items: flex-start;
  }
}

@media (max-width: 36rem) {
  .tracking-summary {
    padding: var(--spacing-6);
  }
}
</style>
