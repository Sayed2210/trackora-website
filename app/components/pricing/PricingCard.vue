<template>
  <div :class="['pricing__card', 'reveal-stagger', { 'pricing__card--highlighted': plan.isPopular }]">
    <div v-if="plan.isPopular" class="pricing__badge">
      {{ locale === 'ar' ? 'الأكثر شعبية' : 'Most popular' }}
    </div>
    <div class="pricing__plan-head">
      <h3 class="pricing__plan-name">{{ plan.name }}</h3>
    </div>
    <div class="pricing__plan-price">
      <template v-if="plan.priceMonthly === 0 && plan.priceYearly === 0">
        {{ locale === 'ar' ? 'مجاني' : 'Free' }}
      </template>
      <template v-else-if="plan.priceMonthly != null">
        {{ formatPrice(plan.priceMonthly!, plan.currency) }}
        <span class="pricing__plan-period">/ {{ locale === 'ar' ? 'شهر' : 'mo' }}</span>
      </template>
      <template v-else-if="plan.priceYearly != null">
        {{ formatPrice(plan.priceYearly!, plan.currency) }}
        <span class="pricing__plan-period">/ {{ locale === 'ar' ? 'سنة' : 'yr' }}</span>
      </template>
      <template v-else>
        {{ locale === 'ar' ? 'حسب الاستخدام' : 'Usage-based' }}
      </template>
    </div>
    <p class="pricing__plan-desc">{{ plan.description }}</p>
    <ul class="pricing__features">
      <li v-for="(feat, i) in plan.features" :key="i" class="pricing__feature">
        <span class="pricing__check" aria-hidden="true">&#10003;</span>
        <span>{{ feat }}</span>
      </li>
    </ul>
    <div v-if="plan.shipmentLimit != null" class="pricing__shipment-limit">
      {{ locale === 'ar' ? `حتى ${plan.shipmentLimit.toLocaleString('ar-EG')} شحنة شهرياً` : `Up to ${plan.shipmentLimit.toLocaleString('en-US')} shipments/mo` }}
    </div>
    <div class="pricing__cta">
      <NuxtLink :to="ctaTarget" :class="['btn', plan.isPopular ? 'btn--primary' : 'btn--outline', 'btn--block']">
        {{ plan.ctaLabel || (locale === 'ar' ? 'ابدأ الآن' : 'Get started') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PublicPlan } from '~/types/pricing'

const props = defineProps<{
  plan: PublicPlan
}>()

const { locale } = useI18n()
const localePath = useLocalePath()

const ctaTarget = computed(() => {
  const base = '/request-demo'
  return localePath(`${base}?plan=${encodeURIComponent(props.plan.slug)}`)
})

function formatPrice(amount: number, currency: string): string {
  try {
    const localeCode = locale.value === 'ar' ? 'ar-EG' : 'en-US'
    return new Intl.NumberFormat(localeCode, {
      style: 'currency',
      currency: currency || 'EGP',
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${currency} ${amount}`
  }
}
</script>

<style scoped>
.pricing__card {
  position: relative;
  height: 100%;
  background:
    radial-gradient(circle at 18% 0%, rgba(45, 110, 125, 0.09), transparent 34%),
    var(--glass-bg);
  border: 1px solid rgba(27, 77, 92, 0.08);
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
  border-color: rgba(27, 77, 92, 0.12);
}

.pricing__card--highlighted {
  border-color: var(--color-primary);
  box-shadow: 0 24px 70px rgba(27, 77, 92, 0.18), 0 0 0 1px rgba(27, 77, 92, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  background:
    radial-gradient(circle at 20% 0%, rgba(232, 168, 56, 0.12), transparent 34%),
    linear-gradient(180deg, rgba(27, 77, 92, 0.05), rgba(255, 255, 255, 0.9));
  transform: translateY(-0.5rem);
}

.pricing__card--highlighted:hover {
  box-shadow: 0 16px 60px rgba(27, 77, 92, 0.25), 0 0 0 1px var(--color-primary);
  border-color: var(--color-primary);
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
  box-shadow: 0 4px 16px rgba(27, 77, 92, 0.3);
}

.pricing__plan-head {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
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

.pricing__plan-period {
  font-size: var(--text-base);
  font-weight: 500;
}

.pricing__plan-desc {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  line-height: 1.7;
  min-height: 3.4em;
}

.pricing__shipment-limit {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 600;
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
  border-block-end: 1px solid rgba(27, 77, 92, 0.06);
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

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: var(--text-base);
  padding: var(--spacing-3) var(--spacing-8);
  border-radius: var(--radius-2xl);
  text-decoration: none;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.btn--primary {
  background: var(--color-primary);
  color: var(--color-text-on-primary);
  border-color: var(--color-primary);
}

.btn--primary:hover {
  background: var(--color-primary-light);
  border-color: var(--color-primary-light);
}

.btn--outline {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.btn--outline:hover {
  background: var(--color-primary);
  color: var(--color-text-on-primary);
}

.btn--block {
  width: 100%;
}

@media (max-width: 64rem) {
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