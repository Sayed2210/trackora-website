<template>
  <section class="section" aria-labelledby="reveal-heading">
    <AppContainer>
      <div class="reveal-product reveal-up">
        <p class="reveal-product__eyebrow">{{ t('reveal.eyebrow') }}</p>
        <h2 id="reveal-heading" class="reveal-product__title">{{ t('reveal.heading') }}</h2>
        <p class="reveal-product__subtitle">{{ t('reveal.subtitle') }}</p>
      </div>
    </AppContainer>
  </section>

  <section class="features section section--alt" aria-labelledby="features-heading">
    <AppContainer>
      <AppSectionHeader
        :eyebrow="t('features.eyebrow')"
        :title="t('features.heading')"
        class="reveal-up"
      />
      <div class="features__stories">
        <div v-for="(feature, idx) in featureList" :key="feature.key" :class="['features__story reveal-stagger', { 'features__story--reverse': idx % 2 === 1 }]">
          <div class="features__story-visual">
            <AppIcon3D
              :name="featureIconMap[feature.key] || 'analytics'"
              :alt="locale === 'ar' ? `${feature.titleAr} ثلاثي الأبعاد` : `${feature.titleEn} 3D icon`"
              size="xl"
            />
          </div>
          <div class="features__story-content">
            <h3 class="features__story-title">{{ locale === 'ar' ? feature.titleAr : feature.titleEn }}</h3>
            <p class="features__story-summary">{{ locale === 'ar' ? feature.summaryAr : feature.summaryEn }}</p>
            <NuxtLink :to="localePath(feature.path)" class="features__story-link">
              {{ t('common.learnMore') }} &larr;
            </NuxtLink>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<script setup lang="ts">
import { features } from '~/data/features'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const featureList = features

const featureIconMap: Record<string, string> = {
  'smart-dispatch': 'smart-dispatch',
  'courier-app': 'courier-app',
  'merchant-portal': 'analytics',
  'cod-wallet': 'cod-wallet',
  'bulk-upload': 'bulk-upload',
  'fraud-detection': 'fraud-detection',
}

useScrollReveal()
</script>

<style scoped>
.reveal-product {
  text-align: center;
  max-width: 40rem;
  margin-inline: auto;
}

.reveal-product__eyebrow {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-primary-light);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-block-end: var(--spacing-3);
}

.reveal-product__title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 900;
  color: var(--color-text);
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-block-end: var(--spacing-4);
}

.reveal-product__subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.features__stories {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-20);
}

.features__story {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-12);
  align-items: center;
}

.features__story--reverse {
  direction: ltr;
}

.features__story--reverse .features__story-visual {
  order: 2;
}

[dir="rtl"] .features__story--reverse .features__story-visual {
  order: 2;
}

.features__story-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.features__story-content {
  max-width: 28rem;
}

.features__story-title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--color-text);
  margin-block-end: var(--spacing-3);
}

.features__story-summary {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-block-end: var(--spacing-8);
}

.features__story-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
  padding: var(--spacing-2) 0;
  transition: color 0.2s ease;
  border-bottom: 2px solid transparent;
}

.features__story-link:hover {
  color: var(--color-primary-light);
  border-bottom-color: var(--color-primary-light);
}

@media (max-width: 48rem) {
  .features__story {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .features__story--reverse .features__story-visual {
    order: 0;
  }

  .features__story-content {
    max-width: none;
    margin-inline: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .features__story-icon-wrap:hover {
    transform: none;
  }
}
</style>
