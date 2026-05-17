<template>
  <section class="problems section section--alt" aria-labelledby="problems-heading">
    <AppContainer>
      <AppSectionHeader
        :eyebrow="locale === 'ar' ? 'تحديات' : 'Challenges'"
        :title="t('problems.heading')"
      />
      <div class="problems__grid">
        <AppCard v-for="item in items" :key="item.titleAr" variant="default">
          <div class="problems__icon" aria-hidden="true">{{ item.icon }}</div>
          <h3 class="problems__title">{{ locale === 'ar' ? item.titleAr : item.titleEn }}</h3>
          <p class="problems__text">{{ locale === 'ar' ? item.textAr : item.textEn }}</p>
        </AppCard>
      </div>
    </AppContainer>
  </section>
</template>

<script setup lang="ts">
import { problems } from '~/data/home'

const { t, locale } = useI18n()
const items = problems
</script>

<style scoped>
.problems__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--spacing-8);
}

.problems__icon {
  font-size: var(--text-4xl);
  margin-block-end: var(--spacing-4);
  text-align: center;
}

.problems__title {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-block-end: var(--spacing-3);
  text-align: center;
}

.problems__text {
  color: var(--color-text-secondary);
  text-align: center;
  line-height: 1.7;
}
</style>