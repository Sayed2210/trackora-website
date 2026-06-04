<template>
  <div class="pricing-error" aria-live="polite">
    <div class="pricing-error__icon" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
    <h3 class="pricing-error__title">{{ t('pricing.errorTitle') }}</h3>
    <p class="pricing-error__text">{{ t('pricing.errorText') }}</p>
    <button class="pricing-error__retry" @click="$emit('retry')">
      {{ t('common.retry') }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  retry: []
}>()
</script>

<style scoped>
.pricing-error {
  text-align: center;
  padding-block: var(--spacing-16);
}

.pricing-error__icon {
  color: var(--color-danger);
  margin-inline: auto;
  margin-block-end: var(--spacing-6);
}

.pricing-error__title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text);
  margin-block-end: var(--spacing-2);
}

.pricing-error__text {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  max-width: 30rem;
  margin-inline: auto;
  line-height: 1.7;
  margin-block-end: var(--spacing-6);
}

.pricing-error__retry {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: var(--text-base);
  padding: var(--spacing-3) var(--spacing-8);
  border-radius: var(--radius-2xl);
  border: 2px solid var(--color-primary);
  background: transparent;
  color: var(--color-primary);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.pricing-error__retry:hover {
  background: var(--color-primary);
  color: var(--color-text-on-primary);
}
</style>