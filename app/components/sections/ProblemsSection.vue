<template>
  <section class="problems section section--alt" aria-labelledby="problems-heading">
    <AppContainer>
      <AppSectionHeader
        :eyebrow="t('problems.eyebrow')"
        :title="t('problems.heading')"
        class="reveal-up"
      />
      <div class="problems__grid">
        <div v-for="(item, i) in items" :key="item.titleAr" class="problems__card reveal-stagger" :style="{ '--i': i }">
          <AppIcon3D
            :name="problemIconMap[i] || 'shipment'"
            :alt="locale === 'ar' ? item.titleAr : item.titleEn"
            size="md"
          />
          <h3 class="problems__title">{{ locale === 'ar' ? item.titleAr : item.titleEn }}</h3>
          <p class="problems__text">{{ locale === 'ar' ? item.textAr : item.textEn }}</p>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<script setup lang="ts">
import { problems } from '~/data/home'

const { t, locale } = useI18n()
const items = problems

const problemIconMap: Record<number, string> = {
  0: 'bulk-upload',
  1: 'smart-dispatch',
  2: 'cod-wallet',
  3: 'fraud-detection',
  4: 'public-tracking',
}

useScrollReveal()
</script>

<style scoped>
.problems__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-6);
}

.problems__card:nth-child(4),
.problems__card:nth-child(5) {
  grid-column: span 1;
}

.problems__card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-10) var(--spacing-8);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  box-shadow: var(--shadow-card);
  transition: transform 0.3s var(--reveal-easing), box-shadow 0.3s ease, border-color 0.3s ease;
}

.problems__card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(26, 59, 102, 0.15);
}

.problems__title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 800;
  color: var(--color-text);
  margin-block-end: var(--spacing-1);
}

.problems__text {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.8;
}

@media (max-width: 64rem) {
  .problems__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 36rem) {
  .problems__grid {
    grid-template-columns: 1fr;
  }

  .problems__card {
    padding: var(--spacing-8) var(--spacing-6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .problems__card:hover {
    transform: none;
  }
}
</style>
