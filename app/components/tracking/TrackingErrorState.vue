<template>
  <div class="tracking-error">
    <div class="tracking-error__icon" aria-hidden="true">
      <AppIcon3D name="fraud-detection" alt="" size="xl" />
    </div>
    <h3 class="tracking-error__title">{{ t('track.errorTitle') }}</h3>
    <p class="tracking-error__text">{{ t('track.errorDescription') }}</p>
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
  border-radius: var(--radius-4xl);
  text-align: center;
  padding: var(--spacing-12) var(--spacing-6);
  background:
    radial-gradient(circle at 50% 0%, rgba(232, 168, 56, 0.08), transparent 34%),
    var(--glass-bg);
  box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(18px);
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
  margin-block-end: var(--spacing-8);
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
