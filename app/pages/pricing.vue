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
        <div class="pricing__grid">
          <div v-for="plan in pricingPlans" :key="plan.key" :class="['pricing__card', 'reveal-stagger', { 'pricing__card--highlighted': plan.highlighted }]">
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

useScrollReveal()

setSeo(
  locale.value === 'ar' ? 'خطط وأسعار تراكورا' : 'Trackora Plans & Pricing',
  locale.value === 'ar'
    ? 'اختر الخطة المناسبة لعملك — من المبتدئة المجانية إلى المؤسسية المخصصة. ترقية وتخفيض في أي وقت.'
    : 'Choose the plan that fits your business — from free Starter to custom Enterprise. Upgrade or downgrade anytime.'
)
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

.pricing__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-8);
  align-items: stretch;
}

.pricing__card {
  position: relative;
  height: 100%;
  background:
    radial-gradient(circle at 18% 0%, rgba(59, 89, 152, 0.09), transparent 34%),
    var(--glass-bg);
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-4xl);
  padding: var(--spacing-12) var(--spacing-8) var(--spacing-8);
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
  box-shadow: 0 24px 70px rgba(26, 59, 102, 0.18), 0 0 0 1px rgba(26, 59, 102, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.8);
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
  align-items: center;
  gap: var(--spacing-4);
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
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-block-start: var(--spacing-4);
}

.pricing__plan-desc {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  line-height: 1.7;
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
  padding: var(--spacing-2) 0;
  border-block-end: 1px solid rgba(26, 59, 102, 0.06);
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

  .pricing__card--highlighted {
    transform: none;
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

  .pricing__card,
  .pricing-faq__item,
  .pricing-cta__inner {
    padding: var(--spacing-6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pricing__card:hover {
    transform: none;
  }
}
</style>
