<template>
  <div :class="['pricing__card', 'reveal-stagger', { 'pricing__card--highlighted': plan.isPopular }]">
    <div v-if="plan.isPopular" class="pricing__badge">
      {{ locale === 'ar' ? 'موصى بها لفرق التشغيل' : 'Recommended for operations teams' }}
    </div>

    <div class="pricing__plan-head">
      <p v-if="plan.audience" class="pricing__plan-audience">{{ plan.audience }}</p>
      <h3 class="pricing__plan-name">{{ plan.name }}</h3>
    </div>

    <div class="pricing__plan-price">
      <template v-if="plan.displayPrice">
        {{ plan.displayPrice }}
      </template>
      <template v-else-if="plan.priceMonthly === 0 && plan.priceYearly === 0">
        {{ locale === 'ar' ? 'مجاني' : 'Free' }}
      </template>
      <template v-else-if="plan.priceMonthly != null">
        {{ formatPrice(plan.priceMonthly, plan.currency) }}
        <span class="pricing__plan-period">/ {{ locale === 'ar' ? 'شهر' : 'mo' }}</span>
      </template>
      <template v-else-if="plan.priceYearly != null">
        {{ formatPrice(plan.priceYearly, plan.currency) }}
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

    <p v-if="plan.overageNote" class="pricing__overage-note">{{ plan.overageNote }}</p>

    <div class="pricing__cta">
      <AppButton :to="ctaTarget" :variant="plan.isPopular ? 'primary' : 'outline'" block>
        {{ plan.ctaLabel || (locale === 'ar' ? 'ابدأ بخطة مناسبة' : 'Choose this plan') }}
      </AppButton>
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
  if (props.plan.ctaHref) {
    return localePath(props.plan.ctaHref)
  }

  return localePath(`/request-demo?plan=${encodeURIComponent(props.plan.slug)}`)
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
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  height: 100%;
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: var(--radius-4xl);
  padding: var(--spacing-12) var(--spacing-8) var(--spacing-8);
  background: var(--color-surface);
  box-shadow: 0 10px 30px rgba(26, 59, 102, 0.06);
  transition: transform 0.3s var(--reveal-easing), box-shadow 0.3s ease, border-color 0.3s ease;
}

.pricing__card:hover {
  transform: translateY(-4px);
  border-color: rgba(26, 59, 102, 0.2);
  box-shadow: 0 20px 52px rgba(26, 59, 102, 0.12);
}

.pricing__card--highlighted {
  border-color: var(--color-primary);
  background: linear-gradient(180deg, rgba(26, 59, 102, 0.045), var(--color-surface) 38%);
  box-shadow: 0 18px 44px rgba(26, 59, 102, 0.12), 0 0 0 2px rgba(26, 59, 102, 0.12);
  transform: translateY(-0.5rem);
}

.pricing__card--highlighted:hover {
  border-color: var(--color-primary);
  box-shadow: 0 22px 56px rgba(26, 59, 102, 0.18), 0 0 0 2px rgba(26, 59, 102, 0.18);
}

.pricing__badge {
  position: absolute;
  inset-block-start: calc(-1 * var(--spacing-3));
  inset-inline-start: var(--spacing-8);
  border-radius: var(--radius-full);
  padding: var(--spacing-1) var(--spacing-4);
  background: var(--color-primary);
  color: var(--color-text-light);
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: 800;
  box-shadow: 0 8px 18px rgba(26, 59, 102, 0.24);
}

.pricing__plan-audience {
  margin-block-end: var(--spacing-2);
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 800;
}

.pricing__plan-name {
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 800;
}

.pricing__plan-price {
  margin-block-start: var(--spacing-4);
  color: var(--color-primary);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  line-height: 1.1;
}

.pricing__plan-period {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  font-weight: 600;
}

.pricing__plan-desc {
  min-height: 4.9em;
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  line-height: 1.7;
}

.pricing__features {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: var(--spacing-3);
  margin-block: var(--spacing-2);
}

.pricing__feature {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-2);
  border-block-end: 1px solid rgba(26, 59, 102, 0.06);
  padding: var(--spacing-2) 0;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.6;
}

.pricing__check {
  flex-shrink: 0;
  margin-block-start: 0.1em;
  color: var(--color-success);
  font-weight: 800;
}

.pricing__shipment-limit {
  border-radius: var(--radius-xl);
  padding: var(--spacing-3) var(--spacing-4);
  background: rgba(26, 59, 102, 0.06);
  color: var(--color-primary-dark);
  font-size: var(--text-sm);
  font-weight: 800;
}

.pricing__overage-note {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.65;
}

.pricing__cta {
  margin-block-start: auto;
  padding-block-start: var(--spacing-2);
}

@media (max-width: 64rem) {
  .pricing__card--highlighted {
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pricing__card,
  .pricing__card:hover,
  .pricing__card--highlighted {
    transform: none;
  }
}
</style>
