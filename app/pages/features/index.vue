<template>
  <div>
    <section class="features-index section" aria-labelledby="features-heading">
      <AppContainer>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'المزايا' : 'Features'"
          :title="locale === 'ar' ? 'المزايا الأساسية' : 'Core Features'"
          :description="locale === 'ar' ? 'اكتشف كيف يساعدك تراكورا في كل جانب من جوانب عمليات الشحن والتوصيل.' : 'Discover how Trackora helps you in every aspect of shipping and delivery operations.'"
        />
        <div class="features-index__grid">
          <NuxtLink v-for="feature in featureList" :key="feature.key" :to="localePath(feature.path)" class="features-index__card">
            <AppIcon3D
              :name="featureIconMap[feature.key] || 'analytics'"
              :alt="locale === 'ar' ? `${feature.titleAr} ثلاثي الأبعاد` : `${feature.titleEn} 3D icon`"
              size="lg"
              class="features-index__icon"
            />
            <h2 class="features-index__title">{{ locale === 'ar' ? feature.titleAr : feature.titleEn }}</h2>
            <p class="features-index__text">{{ locale === 'ar' ? feature.summaryAr : feature.summaryEn }}</p>
            <span class="features-index__link">{{ locale === 'ar' ? 'تعرّف أكثر ←' : 'Learn more →' }}</span>
          </NuxtLink>
        </div>
      </AppContainer>
    </section>

    <section class="features-cta section section--dark" aria-labelledby="features-cta-heading">
      <AppContainer narrow>
        <div class="features-cta__inner">
          <h2 id="features-cta-heading" class="features-cta__title">{{ locale === 'ar' ? 'جاهز لتبدأ؟' : 'Ready to start?' }}</h2>
          <p class="features-cta__text">{{ locale === 'ar' ? 'اكتشف كل ما يستطيع تراكورا تقديمه لعملك.' : 'Discover everything Trackora can offer your business.' }}</p>
          <AppButton to="/request-demo" variant="primary">{{ locale === 'ar' ? 'اطلب عرضاً توضيحياً' : 'Request a demo' }}</AppButton>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { features } from '~/data/features'

const { locale } = useI18n()
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

useHead({
  title: locale.value === 'ar' ? 'المزايا | تراكورا' : 'Features | Trackora',
  meta: [
    { name: 'description', content: locale.value === 'ar' ? 'اكتشف مزايا تراكورا: الإرسال الذكي، تطبيق السعاة، بوابة التاجر، محفظة النقدي، الرفع المجمّع، وكشف الاحتيال.' : 'Discover Trackora features: Smart Dispatch, Courier App, Merchant Portal, COD Wallet, Bulk Upload, and Fraud Detection.' },
    { property: 'og:title', content: locale.value === 'ar' ? 'المزايا | تراكورا' : 'Features | Trackora' },
    { property: 'og:description', content: locale.value === 'ar' ? 'اكتشف مزايا تراكورا: الإرسال الذكي، تطبيق السعاة، بوابة التاجر، محفظة النقدي، الرفع المجمّع، وكشف الاحتيال.' : 'Discover Trackora features: Smart Dispatch, Courier App, Merchant Portal, COD Wallet, Bulk Upload, and Fraud Detection.' },
  ],
  htmlAttrs: { lang: locale.value, dir: locale.value === 'ar' ? 'rtl' : 'ltr' },
})
</script>

<style scoped>
.features-index__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: var(--spacing-8);
}

.features-index__card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.features-index__card:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-light);
}

.features-index__icon {
  margin-inline: auto;
  margin-block-end: var(--spacing-4);
}

.features-index__title {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-block-end: var(--spacing-3);
}

.features-index__text {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-block-end: var(--spacing-4);
  flex-grow: 1;
}

.features-index__link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
}

.features-cta__inner {
  text-align: center;
}

.features-cta__title {
  font-size: var(--text-4xl);
  font-weight: 800;
  color: var(--color-text-light);
  margin-block-end: var(--spacing-4);
}

.features-cta__text {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  margin-block-end: var(--spacing-8);
  line-height: 1.7;
}
</style>
