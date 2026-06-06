<template>
  <div>
    <section class="pricing-hero section" aria-labelledby="pricing-heading">
      <AppContainer>
        <div class="pricing-hero__grid">
          <div class="pricing-hero__content reveal-up">
            <p class="pricing-hero__eyebrow">{{ locale === 'ar' ? 'تسعير حسب التشغيل' : 'Pricing by operation size' }}</p>
            <h1 id="pricing-heading" class="pricing-hero__title">{{ t('pricing.heading') }}</h1>
            <p class="pricing-hero__text">{{ t('pricing.subtitle') }}</p>
            <div class="pricing-hero__actions">
              <AppButton :to="localePath('/request-demo?plan=growth')" variant="primary">
                {{ locale === 'ar' ? 'اطلب عرض لخطة النمو' : 'Request a Growth demo' }}
              </AppButton>
              <AppButton :to="localePath('/contact?topic=pricing')" variant="outline">
                {{ locale === 'ar' ? 'تحدث مع فريق Trackora' : 'Talk to Trackora' }}
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

    <section class="pricing-objections section" aria-labelledby="pricing-objections-heading">
      <AppContainer>
        <div class="pricing-section-head reveal-up">
          <h2 id="pricing-objections-heading" class="pricing-section-head__title">
            {{ locale === 'ar' ? 'قبل اختيار الخطة، راجع حدود التشغيل' : 'Before choosing, check operation limits' }}
          </h2>
          <p class="pricing-section-head__text">
            {{ locale === 'ar' ? 'التسعير في Trackora يرتبط بالشحنات، المستخدمين، المناديب، تحصيل COD، والتسوية. هذه هي التفاصيل التي تمنع المفاجآت أثناء النمو.' : 'Trackora pricing follows shipments, users, couriers, COD collection, and settlement. These details prevent surprises as volume grows.' }}
          </p>
        </div>

        <div class="pricing-objections__grid">
          <article v-for="(item, i) in pricingObjections" :key="i" class="pricing-objections__item reveal-stagger">
            <h3 class="pricing-objections__title">{{ locale === 'ar' ? item.titleAr : item.titleEn }}</h3>
            <p class="pricing-objections__text">{{ locale === 'ar' ? item.textAr : item.textEn }}</p>
          </article>
        </div>
      </AppContainer>
    </section>

    <section class="pricing-plans section" :aria-label="plansLabel">
      <AppContainer>
        <div v-if="plansService.loading.value" class="pricing__notice" aria-live="polite">
          {{ locale === 'ar' ? 'نراجع أي تحديثات متاحة للأسعار، والخطط المحلية ظاهرة الآن.' : 'Checking for pricing updates. Local plans are visible now.' }}
        </div>
        <div v-else-if="plansService.error.value || plansService.usedFallback.value" class="pricing__notice pricing__notice--soft" aria-live="polite">
          {{ locale === 'ar' ? 'نعرض خطط Trackora المحلية الآمنة حالياً. يمكنك طلب عرض لتأكيد السعر حسب حجم التشغيل.' : 'Showing safe Trackora local plans. Request a quote to confirm pricing for your operation size.' }}
        </div>

        <div class="pricing__grid">
          <PricingCard v-for="plan in displayedPlans" :key="plan.id" :plan="plan" />
        </div>
      </AppContainer>
    </section>

    <section class="pricing-comparison section section--alt" aria-labelledby="pricing-comparison-heading">
      <AppContainer>
        <div class="pricing-section-head pricing-section-head--compact reveal-up">
          <h2 id="pricing-comparison-heading" class="pricing-section-head__title">
            {{ locale === 'ar' ? 'قارن تفاصيل التشغيل' : 'Compare operation details' }}
          </h2>
          <p class="pricing-section-head__text">
            {{ locale === 'ar' ? 'الجدول يوضح ما يحصل عليه فريقك في الشحن، المناديب، COD، التقارير، والدعم الفني.' : 'This table shows what your team gets across shipments, couriers, COD, reports, and support.' }}
          </p>
        </div>

        <div class="pricing-comparison__scroll" tabindex="0" :aria-label="comparisonLabel">
          <table class="pricing-comparison__table">
            <thead>
              <tr>
                <th scope="col">{{ locale === 'ar' ? 'البند' : 'Item' }}</th>
                <th scope="col">{{ locale === 'ar' ? 'البداية' : 'Starter' }}</th>
                <th scope="col" class="pricing-comparison__recommended">{{ locale === 'ar' ? 'النمو' : 'Growth' }}</th>
                <th scope="col">{{ locale === 'ar' ? 'التوسع' : 'Scale' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in pricingComparisonRows" :key="row.featureEn">
                <th scope="row">{{ locale === 'ar' ? row.featureAr : row.featureEn }}</th>
                <td>{{ locale === 'ar' ? row.starterAr : row.starterEn }}</td>
                <td class="pricing-comparison__recommended">{{ locale === 'ar' ? row.growthAr : row.growthEn }}</td>
                <td>{{ locale === 'ar' ? row.scaleAr : row.scaleEn }}</td>
              </tr>
            </tbody>
          </table>
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
          <h2 id="pricing-cta-heading" class="pricing-cta__title">{{ locale === 'ar' ? 'اختر الخطة حسب حجم التشغيل' : 'Choose by operation size' }}</h2>
          <p class="pricing-cta__text">{{ locale === 'ar' ? 'شاركنا عدد الشحنات، المناديب، وحجم تحصيل COD. فريق Trackora يوضح الخطة المناسبة والتكلفة المتوقعة.' : 'Share shipment volume, couriers, and COD collection size. The Trackora team will explain the right plan and expected cost.' }}</p>
          <AppButton :to="localePath('/contact?topic=pricing')" variant="primary">{{ locale === 'ar' ? 'تحدث مع فريق Trackora' : 'Talk to Trackora' }}</AppButton>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { pricingFaqItems } from '~/data/forms'
import { pricingComparisonRows, pricingObjections, pricingPlans } from '~/data/pricing'
import PricingCard from '~/components/pricing/PricingCard.vue'
import type { PublicPlan } from '~/types/pricing'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { setSeo } = useLocaleSeo()
const plansService = usePublicPlansService()

useScrollReveal()

const plansLabel = computed(() => locale.value === 'ar' ? 'خطط أسعار Trackora' : 'Trackora pricing plans')
const comparisonLabel = computed(() => locale.value === 'ar' ? 'جدول مقارنة خطط Trackora' : 'Trackora plan comparison table')

const displayedPlans = computed<PublicPlan[]>(() => {
  const apiPlans = new Map<string, PublicPlan>()

  if (plansService.data.value && !plansService.usedFallback.value) {
    for (const plan of plansService.data.value) {
      const normalizedSlug = plan.slug === 'professional' ? 'growth' : plan.slug === 'enterprise' ? 'scale' : plan.slug
      apiPlans.set(normalizedSlug, plan)
    }
  }

  return pricingPlans.map((plan) => {
    const apiPlan = apiPlans.get(plan.slug)

    return {
      id: `local-${plan.slug}`,
      slug: plan.slug,
      name: locale.value === 'ar' ? plan.nameAr : plan.nameEn,
      audience: locale.value === 'ar' ? plan.audienceAr : plan.audienceEn,
      description: locale.value === 'ar' ? plan.descriptionAr : plan.descriptionEn,
      priceMonthly: apiPlan?.priceMonthly ?? plan.priceMonthly,
      priceYearly: apiPlan?.priceYearly ?? plan.priceYearly,
      currency: apiPlan?.currency ?? plan.currency,
      shipmentLimit: apiPlan?.shipmentLimit ?? plan.shipmentLimit,
      features: locale.value === 'ar' ? plan.featuresAr : plan.featuresEn,
      isPopular: plan.highlighted,
      ctaLabel: locale.value === 'ar' ? plan.ctaAr : plan.ctaEn,
      ctaHref: plan.ctaHref,
      overageNote: locale.value === 'ar' ? plan.overageAr : plan.overageEn,
      displayPrice: apiPlan?.priceMonthly != null || apiPlan?.priceYearly != null ? undefined : locale.value === 'ar' ? plan.priceAr : plan.priceEn,
    }
  })
})

onMounted(() => {
  plansService.fetchPlans()
})

setSeo(
  locale.value === 'ar' ? 'خطط وأسعار Trackora' : 'Trackora Plans and Pricing',
  locale.value === 'ar'
    ? 'قارن خطط Trackora حسب الشحنات شهرياً، المناديب، بوابة التاجر، محفظة COD، التسوية، والدعم.'
    : 'Compare Trackora plans by monthly shipments, couriers, merchant portal, COD wallet, settlement, and support.'
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
  max-width: 45rem;
}

.pricing-hero__eyebrow {
  display: inline-flex;
  margin-block-end: var(--spacing-4);
  border: 1px solid rgba(26, 59, 102, 0.1);
  border-radius: var(--radius-full);
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 800;
  box-shadow: var(--shadow-sm);
}

.pricing-hero__title {
  max-width: 13ch;
  margin-block-end: var(--spacing-6);
  font-size: var(--text-6xl);
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.pricing-hero__text {
  max-width: 43rem;
  color: var(--color-text-secondary);
  font-size: var(--text-xl);
  line-height: 1.8;
  text-wrap: pretty;
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
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-4xl);
  background: var(--gradient-hero);
  box-shadow: var(--shadow-glow);
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

.pricing-objections {
  padding-block-end: var(--spacing-12);
}

.pricing-section-head {
  max-width: 48rem;
  margin-block-end: var(--spacing-12);
}

.pricing-section-head--compact {
  margin-block-end: var(--spacing-8);
}

.pricing-section-head__title {
  margin-block-end: var(--spacing-4);
  color: var(--color-text);
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.16;
  text-wrap: balance;
}

.pricing-section-head__text {
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
  line-height: 1.8;
  text-wrap: pretty;
}

.pricing-objections__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-6);
}

.pricing-objections__item {
  border: 1px solid rgba(26, 59, 102, 0.1);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-8);
  background: var(--color-surface);
  box-shadow: 0 10px 28px rgba(26, 59, 102, 0.05);
}

.pricing-objections__title {
  margin-block-end: var(--spacing-3);
  color: var(--color-primary);
  font-size: var(--text-xl);
}

.pricing-objections__text {
  color: var(--color-text-secondary);
  line-height: 1.75;
}

.pricing-plans {
  padding-block-start: var(--spacing-8);
}

.pricing__notice {
  margin-block-end: var(--spacing-6);
  border: 1px solid rgba(59, 89, 152, 0.18);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-4) var(--spacing-6);
  background: rgba(59, 89, 152, 0.06);
  color: var(--color-primary-dark);
  font-size: var(--text-sm);
  font-weight: 700;
}

.pricing__notice--soft {
  border-color: rgba(245, 158, 11, 0.24);
  background: rgba(245, 158, 11, 0.08);
}

.pricing__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-8);
  align-items: stretch;
}

.pricing-comparison__scroll {
  overflow-x: auto;
  border: 1px solid rgba(26, 59, 102, 0.1);
  border-radius: var(--radius-3xl);
  background: var(--color-surface);
  box-shadow: 0 12px 34px rgba(26, 59, 102, 0.06);
}

.pricing-comparison__scroll:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}

.pricing-comparison__table {
  width: 100%;
  min-width: 58rem;
  border-collapse: collapse;
  text-align: start;
}

.pricing-comparison__table th,
.pricing-comparison__table td {
  border-block-end: 1px solid rgba(26, 59, 102, 0.08);
  padding: var(--spacing-4) var(--spacing-5);
  vertical-align: top;
}

.pricing-comparison__table thead th {
  position: sticky;
  inset-block-start: 0;
  background: var(--color-bg-alt);
  color: var(--color-primary-dark);
  font-weight: 900;
}

.pricing-comparison__table tbody th {
  color: var(--color-text);
  font-weight: 800;
}

.pricing-comparison__table td {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.pricing-comparison__recommended {
  background: rgba(26, 59, 102, 0.045);
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
  margin-block-end: var(--spacing-3);
  font-size: var(--text-lg);
  font-weight: 700;
}

.pricing-faq__answer {
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.pricing-cta__inner {
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-4xl);
  padding: var(--spacing-12);
  background: rgba(255, 255, 255, 0.08);
  text-align: center;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.pricing-cta__title {
  margin-block-end: var(--spacing-4);
  color: var(--color-text-light);
  font-size: var(--text-4xl);
  font-weight: 800;
}

.pricing-cta__text {
  margin-block-end: var(--spacing-8);
  color: rgba(255, 255, 255, 0.86);
  font-size: var(--text-lg);
  line-height: 1.7;
}

@media (max-width: 64rem) {
  .pricing-hero__grid,
  .pricing-objections__grid {
    grid-template-columns: 1fr;
  }

  .pricing-hero__visual {
    min-height: 22rem;
  }

  .pricing__grid {
    grid-template-columns: 1fr;
    max-width: 30rem;
    margin-inline: auto;
  }
}

@media (max-width: 36rem) {
  .pricing-hero__title {
    font-size: var(--text-4xl);
  }

  .pricing-hero__actions,
  .pricing-hero__actions :deep(.app-button) {
    width: 100%;
  }

  .pricing-hero__visual {
    min-height: 18rem;
  }

  .pricing-hero__icon-stack {
    inset: var(--spacing-6);
    gap: var(--spacing-4);
  }

  .pricing-objections__item,
  .pricing-faq__item,
  .pricing-cta__inner {
    padding: var(--spacing-6);
  }

  .pricing-comparison__scroll {
    margin-inline: calc(-1 * var(--spacing-4));
    border-radius: var(--radius-2xl);
  }
}
</style>
