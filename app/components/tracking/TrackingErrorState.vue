<template>
  <div class="tracking-error">
    <div class="tracking-error__icon" aria-hidden="true">
      <AppIcon3D name="fraud-detection" alt="" size="xl" />
    </div>
    <h3 class="tracking-error__title">{{ t('track.errorTitle') }}</h3>
    <p class="tracking-error__text">{{ t('track.errorDescription') }}</p>
    <div class="tracking-error__guidance" aria-labelledby="tracking-error-guidance">
      <h4 id="tracking-error-guidance">{{ t('track.recoveryTitle') }}</h4>
      <ul>
        <li>{{ t('track.recoveryCheckNumber') }}</li>
        <li>{{ t('track.recoveryCheckFormat') }}</li>
        <li>{{ t('track.recoveryNewShipment') }}</li>
        <li>{{ t('track.recoveryContact') }}</li>
      </ul>
    </div>
    <div class="tracking-error__actions">
      <AppButton variant="primary" @click="$emit('retry')">{{ t('track.retry') }}</AppButton>
      <AppButton variant="outline" :to="localePath('/track')">{{ t('track.backToTrack') }}</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ retry: [] }>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<style scoped>
.tracking-error {
  max-width: 42rem;
  margin-inline: auto;
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-3xl);
  text-align: center;
  padding: var(--spacing-12) var(--spacing-6);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.tracking-error__icon {
  display: inline-flex;
  margin-block-end: var(--spacing-6);
}

.tracking-error__title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text);
  margin-block-end: var(--spacing-3);
}

.tracking-error__text {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  max-width: 28rem;
  margin-inline: auto;
  line-height: 1.7;
  margin-block-end: var(--spacing-6);
}

.tracking-error__guidance {
  max-width: 32rem;
  margin: 0 auto var(--spacing-8);
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-5);
  background: var(--color-bg-alt);
  text-align: start;
}

.tracking-error__guidance h4 {
  margin-block-end: var(--spacing-3);
  color: var(--color-text);
  font-size: var(--text-base);
}

.tracking-error__guidance ul {
  display: grid;
  gap: var(--spacing-2);
  list-style: disc;
  padding-inline-start: var(--spacing-5);
}

.tracking-error__guidance li {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.7;
}

.tracking-error__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-4);
}

@media (max-width: 36rem) {
  .tracking-error {
    padding: var(--spacing-10) var(--spacing-5);
  }

  .tracking-error__actions,
  .tracking-error__actions :deep(.btn) {
    width: 100%;
  }
}
</style>
