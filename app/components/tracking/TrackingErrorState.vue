<template>
  <div class="tracking-error">
    <span class="tracking-error__icon" aria-hidden="true">⚠</span>
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
  text-align: center;
  padding: var(--spacing-16) var(--spacing-6);
}

.tracking-error__icon {
  font-size: var(--text-5xl);
  display: block;
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
  justify-content: center;
  gap: var(--spacing-4);
}
</style>