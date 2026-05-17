<template>
  <section class="features section" aria-labelledby="features-heading">
    <AppContainer>
      <AppSectionHeader
        :eyebrow="locale === 'ar' ? 'المزايا' : 'Features'"
        :title="t('features.heading')"
      />
      <div class="features__grid">
        <AppCard v-for="feature in featureList" :key="feature.key" variant="bordered">
          <div class="features__icon" aria-hidden="true">{{ feature.icon }}</div>
          <h3 class="features__title">
            {{ locale === 'ar' ? feature.titleAr : feature.titleEn }}
          </h3>
          <p class="features__text">
            {{ locale === 'ar' ? feature.summaryAr : feature.summaryEn }}
          </p>
          <NuxtLink :to="localePath(feature.path)" class="features__link">
            {{ t('common.learnMore') }} ←
          </NuxtLink>
        </AppCard>
      </div>
    </AppContainer>
  </section>
</template>

<script setup lang="ts">
import { features } from '~/data/features'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const featureList = features
</script>

<style scoped>
.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: var(--spacing-8);
}

.features__icon {
  font-size: var(--text-4xl);
  margin-block-end: var(--spacing-4);
  text-align: center;
}

.features__title {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-block-end: var(--spacing-3);
  text-align: center;
}

.features__text {
  color: var(--color-text-secondary);
  text-align: center;
  line-height: 1.7;
  margin-block-end: var(--spacing-4);
}

.features__link {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.2s;
}

.features__link:hover {
  color: var(--color-primary-light);
}
</style>