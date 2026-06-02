<template>
  <div class="pricing-loading" aria-live="polite" aria-busy="true">
    <div class="pricing-loading__grid">
      <div v-for="i in 3" :key="i" class="pricing-loading__card">
        <div class="pricing-loading__shimmer pricing-loading__shimmer--badge"></div>
        <div class="pricing-loading__shimmer pricing-loading__shimmer--title"></div>
        <div class="pricing-loading__shimmer pricing-loading__shimmer--price"></div>
        <div class="pricing-loading__shimmer pricing-loading__shimmer--desc"></div>
        <div class="pricing-loading__shimmer pricing-loading__shimmer--line"></div>
        <div class="pricing-loading__shimmer pricing-loading__shimmer--line"></div>
        <div class="pricing-loading__shimmer pricing-loading__shimmer--line"></div>
        <div class="pricing-loading__shimmer pricing-loading__shimmer--cta"></div>
      </div>
    </div>
    <p class="pricing-loading__text">{{ t('pricing.loading') }}</p>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped>
.pricing-loading {
  text-align: center;
  padding-block: var(--spacing-16);
}

.pricing-loading__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-8);
  align-items: stretch;
}

.pricing-loading__card {
  border: 1px solid rgba(26, 59, 102, 0.06);
  border-radius: var(--radius-4xl);
  padding: var(--spacing-12) var(--spacing-8) var(--spacing-8);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  background: var(--glass-bg);
}

.pricing-loading__shimmer {
  border-radius: var(--radius-md);
  background: linear-gradient(90deg, rgba(26, 59, 102, 0.06) 25%, rgba(26, 59, 102, 0.12) 50%, rgba(26, 59, 102, 0.06) 75%);
  background-size: 200% 100%;
  animation: pricing-shimmer 1.5s infinite;
}

.pricing-loading__shimmer--badge {
  width: 6rem;
  height: 1.5rem;
}

.pricing-loading__shimmer--title {
  width: 60%;
  height: 1.5rem;
}

.pricing-loading__shimmer--price {
  width: 40%;
  height: 2.5rem;
  margin-block-start: var(--spacing-2);
}

.pricing-loading__shimmer--desc {
  width: 80%;
  height: 1rem;
}

.pricing-loading__shimmer--line {
  width: 90%;
  height: 0.75rem;
}

.pricing-loading__shimmer--cta {
  width: 100%;
  height: 3rem;
  margin-block-start: auto;
  border-radius: var(--radius-2xl);
}

.pricing-loading__text {
  margin-block-start: var(--spacing-6);
  color: var(--color-text-secondary);
  font-size: var(--text-base);
}

@keyframes pricing-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 64rem) {
  .pricing-loading__grid {
    grid-template-columns: 1fr;
    max-width: 28rem;
    margin-inline: auto;
  }
}
</style>