<template>
  <div>
    <section class="pricing section" aria-labelledby="pricing-heading">
      <AppContainer>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'الأسعار' : 'Pricing'"
          :title="t('pricing.heading')"
          :description="t('pricing.subtitle')"
        />

        <div class="pricing__grid">
          <div v-for="plan in pricingPlans" :key="plan.key" :class="['pricing__card', { 'pricing__card--highlighted': plan.highlighted }]">
            <AppBadge v-if="plan.highlighted" variant="accent" class="pricing__badge">{{ locale === 'ar' ? 'الأكثر شعبية' : 'Most popular' }}</AppBadge>
            <h3 class="pricing__plan-name">{{ locale === 'ar' ? plan.nameAr : plan.nameEn }}</h3>
            <p class="pricing__plan-price">{{ locale === 'ar' ? plan.priceAr : plan.priceEn }}</p>
            <p class="pricing__plan-desc">{{ locale === 'ar' ? plan.descriptionAr : plan.descriptionEn }}</p>
            <ul class="pricing__features">
              <li v-for="(feat, i) in plan.featuresAr" :key="i" class="pricing__feature">
                <span class="pricing__check" aria-hidden="true">✓</span>
                {{ locale === 'ar' ? feat : plan.featuresEn[i] }}
              </li>
            </ul>
            <AppButton :to="plan.key === 'enterprise' ? localePath('/contact') : localePath('/request-demo')" :variant="plan.highlighted ? 'primary' : 'outline'" block>
              {{ locale === 'ar' ? plan.ctaAr : plan.ctaEn }}
            </AppButton>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="pricing section section--alt" aria-labelledby="pricing-faq-heading">
      <AppContainer narrow>
        <AppSectionHeader :title="t('pricing.faqHeading')" />
        <dl class="pricing-faq__list">
          <div v-for="(item, i) in pricingFaqItems" :key="i" class="pricing-faq__item">
            <dt class="pricing-faq__question">{{ locale === 'ar' ? item.questionAr : item.questionEn }}</dt>
            <dd class="pricing-faq__answer">{{ locale === 'ar' ? item.answerAr : item.answerEn }}</dd>
          </div>
        </dl>
      </AppContainer>
    </section>

    <section class="pricing-cta section section--dark" aria-labelledby="pricing-cta-heading">
      <AppContainer narrow>
        <div class="pricing-cta__inner">
          <h2 id="pricing-cta-heading" class="pricing-cta__title">{{ locale === 'ar' ? 'جاهز لتبدأ؟' : 'Ready to start?' }}</h2>
          <p class="pricing-cta__text">{{ locale === 'ar' ? 'اطلب عرضاً توضيحياً واكتشف كيف يمكن لتراكورا تحسين عمليات الشحن لديك.' : 'Request a demo and discover how Trackora can improve your shipping operations.' }}</p>
          <AppButton to="/request-demo" variant="primary">{{ t('pricing.cta') }}</AppButton>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { pricingPlans } from '~/data/pricing'
import { pricingFaqItems } from '~/data/forms'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { setSeo } = useLocaleSeo()

setSeo(
  locale.value === 'ar' ? 'خطط وأسعار تراكورا' : 'Trackora Plans & Pricing',
  locale.value === 'ar'
    ? 'اختر الخطة المناسبة لعملك — من المبتدئة المجانية إلى المؤسسية المخصصة. ترقية وتخفيض في أي وقت.'
    : 'Choose the plan that fits your business — from free Starter to custom Enterprise. Upgrade or downgrade anytime.'
)
</script>

<style scoped>
.pricing__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-8);
  align-items: start;
}

.pricing__card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-10);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.pricing__card--highlighted {
  border: 2px solid var(--color-accent);
  box-shadow: 0 0 0 1px var(--color-accent), var(--shadow-lg);
}

.pricing__badge {
  position: absolute;
  top: calc(-1 * var(--spacing-3));
  inset-inline-start: var(--spacing-6);
}

.pricing__plan-name {
  font-size: var(--text-xl);
  font-weight: 700;
}

.pricing__plan-price {
  font-size: var(--text-3xl);
  font-weight: 800;
  color: var(--color-primary);
}

.pricing__plan-desc {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  line-height: 1.7;
}

.pricing__features {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  flex-grow: 1;
  margin-block: var(--spacing-2);
}

.pricing__feature {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-2);
  font-size: var(--text-base);
  line-height: 1.6;
}

.pricing__check {
  color: var(--color-success);
  font-weight: 700;
  flex-shrink: 0;
}

.pricing-faq__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.pricing-faq__item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  background: var(--color-bg);
}

.pricing-faq__question {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-block-end: var(--spacing-3);
}

.pricing-faq__answer {
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.pricing-cta__inner {
  text-align: center;
}

.pricing-cta__title {
  font-size: var(--text-4xl);
  font-weight: 800;
  color: var(--color-text-light);
  margin-block-end: var(--spacing-4);
}

.pricing-cta__text {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  margin-block-end: var(--spacing-8);
  line-height: 1.7;
}

@media (max-width: 64rem) {
  .pricing__grid {
    grid-template-columns: 1fr;
    max-width: 28rem;
    margin-inline: auto;
  }
}
</style>