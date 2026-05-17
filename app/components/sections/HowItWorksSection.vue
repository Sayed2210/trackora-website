<template>
  <section class="how-it-works section section--alt" aria-labelledby="how-it-works-heading">
    <AppContainer narrow>
      <AppSectionHeader
        :eyebrow="locale === 'ar' ? 'آلية العمل' : 'How it works'"
        :title="t('howItWorks.heading')"
      />
      <ol class="how-it-works__steps">
        <li v-for="(step, i) in steps" :key="i" class="how-it-works__step">
          <span class="how-it-works__number">{{ locale === 'ar' ? step.stepAr : step.stepEn }}</span>
          <div>
            <h3 class="how-it-works__title">{{ locale === 'ar' ? step.titleAr : step.titleEn }}</h3>
            <p class="how-it-works__text">{{ locale === 'ar' ? step.textAr : step.textEn }}</p>
          </div>
        </li>
      </ol>
    </AppContainer>
  </section>
</template>

<script setup lang="ts">
import { howItWorksSteps } from '~/data/home'

const { t, locale } = useI18n()
const steps = howItWorksSteps
</script>

<style scoped>
.how-it-works__steps {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.how-it-works__step {
  display: flex;
  gap: var(--spacing-6);
  align-items: flex-start;
}

.how-it-works__number {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  color: var(--color-text-light);
  font-size: var(--text-xl);
  font-weight: 800;
}

.how-it-works__title {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-block-end: var(--spacing-2);
}

.how-it-works__text {
  color: var(--color-text-secondary);
  line-height: 1.7;
}

@media (max-width: 36rem) {
  .how-it-works__step {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>