<template>
  <div class="pricing-empty" aria-live="polite">
    <div class="pricing-empty__icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
      </svg>
    </div>
    <h3 class="pricing-empty__title">{{ t('pricing.emptyTitle') }}</h3>
    <p class="pricing-empty__text">{{ t('pricing.emptyText') }}</p>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped>
.pricing-empty {
  text-align: center;
  padding-block: var(--spacing-16);
}

.pricing-empty__icon {
  color: var(--color-text-secondary);
  margin-inline: auto;
  margin-block-end: var(--spacing-6);
  opacity: 0.5;
}

.pricing-empty__title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text);
  margin-block-end: var(--spacing-2);
}

.pricing-empty__text {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  max-width: 30rem;
  margin-inline: auto;
  line-height: 1.7;
}
</style>