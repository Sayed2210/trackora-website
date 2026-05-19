<template>
  <section class="how-it-works section" aria-labelledby="how-it-works-heading">
    <AppContainer>
      <AppSectionHeader
        :eyebrow="t('howItWorks.eyebrow')"
        :title="t('howItWorks.heading')"
        class="reveal-up"
      />
      <div class="how-it-works__flow">
        <div v-for="(step, i) in steps" :key="i" class="how-it-works__step reveal-stagger">
          <AppIcon3D
            :name="stepIcons[i]"
            :alt="locale === 'ar' ? `${step.titleAr} ثلاثي الأبعاد` : `${step.titleEn} 3D icon`"
            size="lg"
          />
          <div class="how-it-works__content">
            <!-- <span class="how-it-works__number">{{ locale === 'ar' ? step.stepAr : step.stepEn }}</span> -->
            <h3 class="how-it-works__title">{{ locale === 'ar' ? step.titleAr : step.titleEn }}</h3>
            <p class="how-it-works__text">{{ locale === 'ar' ? step.textAr : step.textEn }}</p>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<script setup lang="ts">
import { howItWorksSteps } from '~/data/home'

const { t, locale } = useI18n()
const steps = howItWorksSteps

const stepIcons = ['bulk-upload', 'fraud-detection', 'smart-dispatch', 'courier-app', 'cod-wallet', 'public-tracking']

useScrollReveal()
</script>

<style scoped>
.how-it-works__flow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-6);
}

.how-it-works__step {
  position: relative;
  text-align: center;
  padding: var(--spacing-10) var(--spacing-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-3xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  box-shadow: var(--shadow-card);
  transition: transform 0.3s var(--reveal-easing), box-shadow 0.3s ease;
}

.how-it-works__step:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.how-it-works__step:nth-child(4),
.how-it-works__step:nth-child(5),
.how-it-works__step:nth-child(6) {
  margin-block-start: var(--spacing-6);
}

.how-it-works__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.how-it-works__number {
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.06em;
  margin-block-end: var(--spacing-1);
}

.how-it-works__title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 800;
  color: var(--color-text);
  margin-block-end: var(--spacing-2);
}

.how-it-works__text {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.8;
}

@media (max-width: 64rem) {
  .how-it-works__flow {
    grid-template-columns: 1fr 1fr;
  }

  .how-it-works__step:nth-child(4),
  .how-it-works__step:nth-child(5),
  .how-it-works__step:nth-child(6) {
    margin-block-start: 0;
  }
}

@media (max-width: 36rem) {
  .how-it-works__flow {
    grid-template-columns: 1fr;
  }

  .how-it-works__step {
    padding: var(--spacing-8) var(--spacing-6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .how-it-works__step:hover {
    transform: none;
  }
}
</style>
