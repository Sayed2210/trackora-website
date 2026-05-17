<template>
  <div class="tracking-summary">
    <div class="tracking-summary__header">
      <AppBadge :variant="statusVariant">
        {{ localizedStatus }}
      </AppBadge>
    </div>

    <dl class="tracking-summary__details">
      <div class="tracking-summary__row">
        <dt class="tracking-summary__label">{{ t('track.trackingNumber') }}</dt>
        <dd class="tracking-summary__value" dir="ltr">{{ shipment.trackingNumber }}</dd>
      </div>
      <div class="tracking-summary__row">
        <dt class="tracking-summary__label">{{ t('track.merchant') }}</dt>
        <dd class="tracking-summary__value">{{ shipment.merchantName }}</dd>
      </div>
      <div v-if="shipment.estimatedDelivery" class="tracking-summary__row">
        <dt class="tracking-summary__label">{{ t('track.estimatedDelivery') }}</dt>
        <dd class="tracking-summary__value">{{ shipment.estimatedDelivery }}</dd>
      </div>
      <div class="tracking-summary__row">
        <dt class="tracking-summary__label">{{ t('track.customer') }}</dt>
        <dd class="tracking-summary__value">{{ shipment.customerName }}</dd>
      </div>
      <div v-if="shipment.customerPhoneMasked" class="tracking-summary__row">
        <dt class="tracking-summary__label">{{ t('track.phone') }}</dt>
        <dd class="tracking-summary__value" dir="ltr">{{ shipment.customerPhoneMasked }}</dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import type { TrackingData } from '~/composables/useTrackingService'

const props = defineProps<{
  shipment: TrackingData
}>()

const { t } = useI18n()

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
</script>

<style scoped>
.tracking-summary {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-8);
}

.tracking-summary__header {
  margin-block-end: var(--spacing-6);
}

.tracking-summary__details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4) var(--spacing-8);
}

.tracking-summary__row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.tracking-summary__label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
}

.tracking-summary__value {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text);
}

@media (max-width: 36rem) {
  .tracking-summary__details {
    grid-template-columns: 1fr;
  }
}
</style>