<template>
  <div class="tracking-empty">
    <span class="tracking-empty__icon" aria-hidden="true">📭</span>
    <h3 class="tracking-empty__title">{{ t('track.notFound') }}</h3>
    <p class="tracking-empty__text">{{ t('track.notFoundDescription') }}</p>
    <div class="tracking-empty__actions">
      <AppButton variant="primary" :to="localePath('/track')">{{ t('track.backToTrack') }}</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<style scoped>
.tracking-empty {
  text-align: center;
  padding: var(--spacing-16) var(--spacing-6);
}

.tracking-empty__icon {
  font-size: var(--text-5xl);
  display: block;
  margin-block-end: var(--spacing-6);
}

.tracking-empty__title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text);
  margin-block-end: var(--spacing-3);
}

.tracking-empty__text {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  max-width: 28rem;
  margin-inline: auto;
  line-height: 1.7;
  margin-block-end: var(--spacing-8);
}

.tracking-empty__actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
}
</style>