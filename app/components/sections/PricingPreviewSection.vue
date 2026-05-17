<template>
  <section class="pricing-preview section" aria-labelledby="pricing-preview-heading">
    <AppContainer>
      <AppSectionHeader
        :eyebrow="locale === 'ar' ? 'الأسعار' : 'Pricing'"
        :title="t('pricingPreview.heading')"
        :description="t('pricingPreview.text')"
      />
      <div class="pricing-preview__cards">
        <AppCard v-for="plan in pricingPlans" :key="plan.key" :variant="plan.highlighted ? 'bordered' : 'default'" :class="{ 'pricing-preview__card--highlighted': plan.highlighted }">
          <h3 class="pricing-preview__name">{{ locale === 'ar' ? plan.nameAr : plan.nameEn }}</h3>
          <p class="pricing-preview__price">{{ locale === 'ar' ? plan.priceAr : plan.priceEn }}</p>
          <p class="pricing-preview__desc">{{ locale === 'ar' ? plan.descriptionAr : plan.descriptionEn }}</p>
          <ul class="pricing-preview__features">
            <li v-for="(f, i) in (locale === 'ar' ? plan.featuresAr : plan.featuresEn)" :key="i">{{ f }}</li>
          </ul>
          <AppButton :to="plan.highlighted ? '/request-demo' : '/pricing'" :variant="plan.highlighted ? 'primary' : 'outline'" block>
            {{ locale === 'ar' ? plan.ctaAr : plan.ctaEn }}
          </AppButton>
        </AppCard>
      </div>
    </AppContainer>
  </section>
</template>

<script setup lang="ts">
import { pricingPlans } from '~/data/pricing'

const { t, locale } = useI18n()
const localePath = useLocalePath()
</script>

<style scoped>
.pricing-preview__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: var(--spacing-8);
}

.pricing-preview__name {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-block-end: var(--spacing-2);
  text-align: center;
}

.pricing-preview__price {
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--color-primary);
  text-align: center;
  margin-block-end: var(--spacing-2);
}

.pricing-preview__desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  text-align: center;
  margin-block-end: var(--spacing-6);
}

.pricing-preview__features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  margin-block-end: var(--spacing-6);
}

.pricing-preview__features li {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  padding-inline-start: var(--spacing-4);
  position: relative;
}

.pricing-preview__features li::before {
  content: '✓';
  position: absolute;
  inset-inline-start: 0;
  color: var(--color-success);
  font-weight: 700;
}

.pricing-preview__card--highlighted {
  border-color: var(--color-accent);
  position: relative;
}

.pricing-preview__card--highlighted::before {
  content: attr(data-popular);
}
</style>