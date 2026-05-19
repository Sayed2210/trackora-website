<template>
  <div class="tracking-empty">
    <div class="tracking-empty__icon" aria-hidden="true">
      <AppIcon3D name="public-tracking" alt="" size="xl" />
    </div>
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
  max-width: 42rem;
  margin-inline: auto;
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-4xl);
  text-align: center;
  padding: var(--spacing-12) var(--spacing-6);
  background:
    radial-gradient(circle at 50% 0%, rgba(59, 89, 152, 0.08), transparent 34%),
    var(--glass-bg);
  box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(18px);
}

.tracking-empty__icon {
  display: inline-flex;
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

@media (max-width: 36rem) {
  .tracking-empty {
    padding: var(--spacing-10) var(--spacing-5);
  }
}
</style>
