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
            <div v-if="plan.highlighted" class="pricing__badge">
              {{ locale === 'ar' ? 'الأكثر شعبية' : 'Most popular' }}
            </div>
            <div class="pricing__plan-head">
              <AppIcon3D :name="planIconMap[plan.key] || 'shipment'" :alt="locale === 'ar' ? `${plan.nameAr} ثلاثي الأبعاد` : `${plan.nameEn} plan 3D icon`" size="md" />
              <h3 class="pricing__plan-name">{{ locale === 'ar' ? plan.nameAr : plan.nameEn }}</h3>
            </div>
            <p class="pricing__plan-price">{{ locale === 'ar' ? plan.priceAr : plan.priceEn }}</p>
            <p class="pricing__plan-desc">{{ locale === 'ar' ? plan.descriptionAr : plan.descriptionEn }}</p>
            <ul class="pricing__features">
              <li v-for="(feat, i) in plan.featuresAr" :key="i" class="pricing__feature">
                <span class="pricing__check" aria-hidden="true">&#10003;</span>
                <span>{{ locale === 'ar' ? feat : plan.featuresEn[i] }}</span>
              </li>
            </ul>
            <div class="pricing__cta">
              <AppButton :to="plan.key === 'enterprise' ? localePath('/contact') : localePath('/request-demo')" :variant="plan.highlighted ? 'primary' : 'outline'" block>
                {{ locale === 'ar' ? plan.ctaAr : plan.ctaEn }}
              </AppButton>
            </div>
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

const planIconMap: Record<string, string> = {
  starter: 'shipment',
  professional: 'smart-dispatch',
  enterprise: 'analytics',
}

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
  align-items: stretch;
}

.pricing__card {
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

.pricing__card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(26, 59, 102, 0.12);
}

.pricing__card--highlighted {
  border-color: var(--color-primary);
  box-shadow: 0 18px 58px rgba(26, 59, 102, 0.2), 0 0 0 1px rgba(26, 59, 102, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  background:
    radial-gradient(circle at 20% 0%, rgba(255, 107, 107, 0.12), transparent 34%),
    linear-gradient(180deg, rgba(26, 59, 102, 0.05), rgba(255, 255, 255, 0.9));
  transform: translateY(-0.5rem);
}

.pricing__card--highlighted:hover {
  box-shadow: 0 16px 60px rgba(26, 59, 102, 0.25), 0 0 0 1px var(--color-primary);
  border-color: var(--color-primary);
}

.pricing__plan-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  text-align: center;
}

.pricing__badge {
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

.pricing__plan-name {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 800;
  color: var(--color-text);
  margin: 0;
}

.pricing__plan-price {
  font-size: var(--text-4xl);
  font-weight: 900;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
}

.pricing__plan-desc {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  line-height: 1.7;
  text-align: center;
  min-height: 3.4em;
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
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.pricing__check {
  color: var(--color-success);
  font-weight: 700;
  flex-shrink: 0;
  margin-block-start: 0.1em;
}

.pricing__cta {
  margin-block-start: auto;
  padding-block-start: var(--spacing-2);
}

.pricing-faq__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.pricing-faq__item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8) var(--spacing-6);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
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

  .pricing__card--highlighted {
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pricing__card:hover {
    transform: none;
  }
}
</style>
