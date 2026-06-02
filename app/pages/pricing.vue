<template>
  <div>
    <section class="pricing-hero section" aria-labelledby="pricing-heading">
      <AppContainer>
        <div class="pricing-hero__grid">
          <div class="pricing-hero__content reveal-up">
            <p class="pricing-hero__eyebrow">{{ locale === 'ar' ? 'أسعار واضحة للنمو' : 'Clear pricing for growth' }}</p>
            <h1 id="pricing-heading" class="pricing-hero__title">{{ t('pricing.heading') }}</h1>
            <p class="pricing-hero__text">{{ t('pricing.subtitle') }}</p>
            <div class="pricing-hero__actions">
              <AppButton :to="localePath('/request-demo')" variant="primary">
                {{ locale === 'ar' ? 'اطلب عرضاً توضيحياً' : 'Request a demo' }}
              </AppButton>
              <AppButton :to="localePath('/contact')" variant="outline">
                {{ locale === 'ar' ? 'تحدث مع المبيعات' : 'Talk to sales' }}
              </AppButton>
            </div>
          </div>

          <div class="pricing-hero__visual reveal-scale" aria-hidden="true">
            <div class="pricing-hero__orb pricing-hero__orb--one"></div>
            <div class="pricing-hero__orb pricing-hero__orb--two"></div>
            <div class="pricing-hero__icon-stack">
              <AppIcon3D name="shipment" alt="" size="lg" variant="hero" />
              <AppIcon3D name="cod-wallet" alt="" size="lg" variant="hero" />
              <AppIcon3D name="smart-dispatch" alt="" size="lg" variant="hero" />
              <AppIcon3D name="analytics" alt="" size="lg" variant="hero" />
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="pricing-plans section" aria-label="Pricing plans">
      <AppContainer>
        <PricingLoadingState v-if="plansService.loading.value" />
        <PricingErrorState v-else-if="plansService.error.value" @retry="plansService.fetchPlans" />
        <PricingEmptyState v-else-if="plansService.isEmpty.value" />
        <template v-else-if="plansService.data.value && plansService.data.value.length > 0">
          <div v-if="plansService.usedFallback.value" class="pricing__dev-notice">
            {{ locale === 'ar' ? '⚠ البيانات المعروضة بيانات تجريبية للتطوير فقط' : '⚠ Displayed plans are development fallback data only' }}
          </div>
          <div class="pricing__grid">
            <PricingCard v-for="plan in plansService.data.value" :key="plan.id" :plan="plan" />
          </div>
        </template>
      </AppContainer>
    </section>

    <section class="pricing section section--alt" aria-labelledby="pricing-faq-heading">
      <AppContainer narrow>
        <AppSectionHeader :title="t('pricing.faqHeading')" class="reveal-up" />
        <dl class="pricing-faq__list">
          <div v-for="(item, i) in pricingFaqItems" :key="i" class="pricing-faq__item reveal-stagger">
            <dt class="pricing-faq__question">{{ locale === 'ar' ? item.questionAr : item.questionEn }}</dt>
            <dd class="pricing-faq__answer">{{ locale === 'ar' ? item.answerAr : item.answerEn }}</dd>
          </div>
        </dl>
      </AppContainer>
    </section>

    <section class="pricing-cta section section--dark" aria-labelledby="pricing-cta-heading">
      <AppContainer narrow>
        <div class="pricing-cta__inner reveal-scale">
          <h2 id="pricing-cta-heading" class="pricing-cta__title">{{ locale === 'ar' ? 'جاهز لتبدأ؟' : 'Ready to start?' }}</h2>
          <p class="pricing-cta__text">{{ locale === 'ar' ? 'اطلب عرضاً توضيحياً واكتشف كيف يمكن لتراكورا تحسين عمليات الشحن لديك.' : 'Request a demo and discover how Trackora can improve your shipping operations.' }}</p>
          <AppButton :to="localePath('/request-demo')" variant="primary">{{ t('pricing.cta') }}</AppButton>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { pricingFaqItems } from '~/data/forms'
import PricingCard from '~/components/pricing/PricingCard.vue'
import PricingLoadingState from '~/components/pricing/PricingLoadingState.vue'
import PricingEmptyState from '~/components/pricing/PricingEmptyState.vue'
import PricingErrorState from '~/components/pricing/PricingErrorState.vue'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { setSeo } = useLocaleSeo()
const plansService = usePublicPlansService()

useScrollReveal()

setSeo(
  locale.value === 'ar' ? 'خطط وأسعار تراكورا' : 'Trackora Plans & Pricing',
  locale.value === 'ar'
    ? 'اختر الخطة المناسبة لعملك — من المبتدئة المجانية إلى المؤسسية المخصصة. ترقية وتخفيض في أي وقت.'
    : 'Choose the plan that fits your business — from free Starter to custom Enterprise. Upgrade or downgrade anytime.'
)

await plansService.fetchPlans()
</script>

<style scoped>
.pricing-hero {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 14% 12%, rgba(59, 89, 152, 0.18), transparent 32%),
    radial-gradient(circle at 86% 16%, rgba(255, 107, 107, 0.1), transparent 28%),
    linear-gradient(180deg, rgba(245, 245, 245, 0.88), rgba(255, 255, 255, 0));
}

.pricing-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(20rem, 0.95fr);
  gap: var(--spacing-16);
  align-items: center;
}

.pricing-hero__content {
  max-width: 43rem;
}

.pricing-hero__eyebrow {
  display: inline-flex;
  margin-block-end: var(--spacing-4);
  border: 1px solid rgba(26, 59, 102, 0.1);
  border-radius: var(--radius-full);
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(255, 255, 255, 0.72);
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 800;
  box-shadow: var(--shadow-sm);
}

.pricing-hero__title {
  font-size: var(--text-6xl);
  max-width: 12ch;
  margin-block-end: var(--spacing-6);
  letter-spacing: -0.04em;
}

.pricing-hero__text {
  max-width: 42rem;
  color: var(--color-text-secondary);
  font-size: var(--text-xl);
  line-height: 1.8;
}

.pricing-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
  margin-block-start: var(--spacing-8);
}

.pricing-hero__visual {
  position: relative;
  min-height: 27rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-4xl);
  background: var(--gradient-hero);
  box-shadow: var(--shadow-glow);
  overflow: hidden;
}

.pricing-hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(2px);
  opacity: 0.7;
}

.pricing-hero__orb--one {
  width: 14rem;
  height: 14rem;
  inset-block-start: -4rem;
  inset-inline-end: -4rem;
  background: rgba(255, 255, 255, 0.16);
}

.pricing-hero__orb--two {
  width: 12rem;
  height: 12rem;
  inset-block-end: -4rem;
  inset-inline-start: -3rem;
  background: rgba(255, 107, 107, 0.16);
}

.pricing-hero__icon-stack {
  position: absolute;
  inset: var(--spacing-10);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-6);
  place-items: center;
}

.pricing-plans {
  padding-block-start: 0;
}

.pricing__dev-notice {
  text-align: center;
  padding: var(--spacing-3) var(--spacing-6);
  margin-block-end: var(--spacing-6);
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: var(--radius-xl);
  color: var(--color-warning);
  font-size: var(--text-sm);
  font-weight: 600;
}

.pricing__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-8);
  align-items: stretch;
}

.pricing-faq__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.pricing-faq__item {
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-8);
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
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-4xl);
  padding: var(--spacing-12);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px);
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
  .pricing-hero__grid {
    grid-template-columns: 1fr;
  }

  .pricing-hero__visual {
    min-height: 22rem;
  }

  .pricing__grid {
    grid-template-columns: 1fr;
    max-width: 28rem;
    margin-inline: auto;
  }
}

@media (max-width: 36rem) {
  .pricing-hero__title {
    font-size: var(--text-4xl);
  }

  .pricing-hero__actions,
  .pricing-hero__actions :deep(.btn) {
    width: 100%;
  }

  .pricing-hero__visual {
    min-height: 18rem;
  }

  .pricing-hero__icon-stack {
    inset: var(--spacing-6);
    gap: var(--spacing-4);
  }

  .pricing-faq__item,
  .pricing-cta__inner {
    padding: var(--spacing-6);
  }
}
</style>