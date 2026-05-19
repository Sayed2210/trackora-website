<template>
  <section class="metrics section section--dark" aria-labelledby="metrics-heading">
    <AppContainer>
      <AppSectionHeader
        :eyebrow="t('metrics.eyebrow')"
        :title="t('metrics.heading')"
        class="reveal-up"
      />
      <div class="metrics__grid">
        <div v-for="item in items" :key="item.labelEn" class="metrics__card reveal-stagger">
          <AppIcon3D :name="item.iconName" :alt="locale === 'ar' ? `${item.labelAr} ثلاثي الأبعاد` : `${item.labelEn} 3D icon`" size="lg" variant="dark" />
          <span class="metrics__value">{{ locale === 'ar' ? item.valueAr : item.valueEn }}</span>
          <span class="metrics__label">{{ locale === 'ar' ? item.labelAr : item.labelEn }}</span>
        </div>
      </div>
    </AppContainer>
  </section>

  <section class="pricing-preview section" aria-labelledby="pricing-preview-heading">
    <AppContainer>
      <AppSectionHeader
        :eyebrow="locale === 'ar' ? 'الأسعار' : 'Pricing'"
        :title="t('pricingPreview.heading')"
        :description="t('pricingPreview.text')"
        class="reveal-up"
      />
      <div class="pricing-preview__cards">
        <div v-for="plan in pricingPlans" :key="plan.key" :class="['pricing-preview__card', 'reveal-stagger', { 'pricing-preview__card--highlighted': plan.highlighted }]">
          <div v-if="plan.highlighted" class="pricing-preview__badge">
            {{ locale === 'ar' ? 'الأكثر شعبية' : 'Most popular' }}
          </div>
          <div class="pricing-preview__topline">
            <AppIcon3D :name="planIconMap[plan.key] || 'shipment'" :alt="locale === 'ar' ? `${plan.nameAr} ثلاثي الأبعاد` : `${plan.nameEn} plan 3D icon`" size="md" />
            <h3 class="pricing-preview__name">{{ locale === 'ar' ? plan.nameAr : plan.nameEn }}</h3>
          </div>
          <p class="pricing-preview__price">{{ locale === 'ar' ? plan.priceAr : plan.priceEn }}</p>
          <p class="pricing-preview__desc">{{ locale === 'ar' ? plan.descriptionAr : plan.descriptionEn }}</p>
          <ul class="pricing-preview__features">
            <li v-for="(f, i) in (locale === 'ar' ? plan.featuresAr : plan.featuresEn)" :key="i" class="pricing-preview__feature">
              <span class="pricing-preview__check" aria-hidden="true">&#10003;</span>
              <span>{{ f }}</span>
            </li>
          </ul>
          <div class="pricing-preview__cta">
            <AppButton :to="plan.highlighted ? '/request-demo' : '/pricing'" :variant="plan.highlighted ? 'primary' : 'outline'" block>
              {{ locale === 'ar' ? plan.ctaAr : plan.ctaEn }}
            </AppButton>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<script setup lang="ts">
import { metrics } from '~/data/home'
import { pricingPlans } from '~/data/pricing'

const { t, locale } = useI18n()

const metricIcons = ['bulk-upload', 'smart-dispatch', 'cod-wallet', 'analytics']
const metricsWithType = metrics.map((m, i) => ({
  ...m,
  iconName: metricIcons[i] || 'analytics',
}))
const items = metricsWithType
const planIconMap: Record<string, string> = {
  starter: 'shipment',
  professional: 'smart-dispatch',
  enterprise: 'analytics',
}
useScrollReveal()
</script>

<style scoped>
.metrics__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-6);
  margin-block-end: var(--spacing-16);
}

.metrics__card {
  text-align: center;
  padding: var(--spacing-10) var(--spacing-6);
  background: var(--glass-bg-dark);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-3xl);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-3);
  transition: transform 0.3s var(--reveal-easing), box-shadow 0.3s ease;
}

.metrics__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.metrics__value {
  display: block;
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 900;
  color: var(--color-text-light);
}

.metrics__label {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.02em;
}

.pricing-preview__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-8);
  align-items: stretch;
}

.pricing-preview__card {
  position: relative;
  min-height: 100%;
  background:
    radial-gradient(circle at 18% 0%, rgba(59, 89, 152, 0.08), transparent 34%),
    var(--glass-bg);
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-10) var(--spacing-8) var(--spacing-8);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  box-shadow: var(--shadow-card), inset 0 1px 0 rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(18px);
  transition: transform 0.3s var(--reveal-easing), box-shadow 0.3s ease, border-color 0.3s ease;
}

.pricing-preview__card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(26, 59, 102, 0.12);
}

.pricing-preview__card--highlighted {
  border-color: var(--color-primary);
  box-shadow: 0 18px 58px rgba(26, 59, 102, 0.2), 0 0 0 1px rgba(26, 59, 102, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  background:
    radial-gradient(circle at 20% 0%, rgba(255, 107, 107, 0.12), transparent 34%),
    linear-gradient(180deg, rgba(26, 59, 102, 0.05), rgba(255, 255, 255, 0.9));
  transform: translateY(-0.5rem);
}

.pricing-preview__card--highlighted:hover {
  box-shadow: 0 16px 60px rgba(26, 59, 102, 0.25), 0 0 0 1px var(--color-primary);
  border-color: var(--color-primary);
}

.pricing-preview__topline {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  text-align: center;
}

.pricing-preview__badge {
  position: absolute;
  top: calc(-1 * var(--spacing-3));
  inset-inline-start: var(--spacing-8);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: var(--color-text-light);
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: 700;
  padding: var(--spacing-1) var(--spacing-4);
  border-radius: var(--radius-full);
  letter-spacing: 0.04em;
  box-shadow: 0 4px 16px rgba(26, 59, 102, 0.3);
}

.pricing-preview__name {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 800;
  text-align: center;
  color: var(--color-text);
  margin: 0;
}

.pricing-preview__price {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 900;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-block-end: var(--spacing-1);
}

.pricing-preview__desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  text-align: center;
  line-height: 1.6;
  margin-block-end: var(--spacing-4);
  min-height: 3.2em;
}

.pricing-preview__features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  flex-grow: 1;
  margin-block-end: var(--spacing-6);
}

.pricing-preview__feature {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-2);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.pricing-preview__check {
  color: var(--color-success);
  font-weight: 700;
  flex-shrink: 0;
  font-size: var(--text-sm);
  margin-block-start: 0.1em;
}

.pricing-preview__cta {
  margin-block-start: auto;
}

@media (max-width: 64rem) {
  .metrics__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 48rem) {
  .pricing-preview__cards {
    grid-template-columns: 1fr;
    max-width: 28rem;
    margin-inline: auto;
  }

  .pricing-preview__card--highlighted {
    transform: none;
  }
}

@media (max-width: 36rem) {
  .metrics__grid {
    grid-template-columns: 1fr;
  }

  .pricing-preview__card {
    padding: var(--spacing-8) var(--spacing-6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .metrics__card:hover {
    transform: none;
  }

  .pricing-preview__card:hover {
    transform: none;
  }
}
</style>
