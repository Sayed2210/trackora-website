<template>
  <div>
    <section class="features-hero section section--dark" aria-labelledby="features-heading">
      <AppContainer wide>
        <div class="features-hero__layout reveal-up">
          <div class="features-hero__content">
            <p class="features-hero__eyebrow">{{ locale === 'ar' ? 'منظومة القدرات' : 'Product capabilities' }}</p>
            <h1 id="features-heading" class="features-hero__title">
              {{ locale === 'ar' ? 'كل قدرة تحتاجها لتشغيل الشحن بثقة.' : 'Every capability you need to run delivery with confidence.' }}
            </h1>
            <p class="features-hero__text">
              {{ locale === 'ar' ? 'تراكورا يجمع الإرسال، السعاة، التجار، التحصيل، الرفع المجمّع، وكشف الاحتيال في تجربة واحدة هادئة وواضحة.' : 'Trackora brings dispatch, couriers, merchants, COD, bulk upload, and fraud detection into one calm, clear operating experience.' }}
            </p>
            <div class="features-hero__actions">
              <AppButton :to="localePath('/request-demo')" size="lg">{{ locale === 'ar' ? 'اطلب عرضاً توضيحياً' : 'Request a demo' }}</AppButton>
              <AppButton :to="localePath('/features/smart-dispatch')" variant="secondary" size="lg">{{ locale === 'ar' ? 'ابدأ بالإرسال الذكي' : 'Start with Smart Dispatch' }}</AppButton>
            </div>
          </div>

          <div class="features-hero__visual" aria-hidden="true">
            <div class="features-orbit">
              <AppIcon3D
                v-for="feature in featureList"
                :key="feature.key"
                :name="featureIconMap[feature.key] || 'analytics'"
                alt=""
                size="lg"
                variant="dark"
                :class="['features-orbit__icon', `features-orbit__icon--${feature.key}`]"
              />
              <div class="features-orbit__core">
                <span class="features-orbit__label">Trackora</span>
                <span class="features-orbit__sub">{{ locale === 'ar' ? 'نظام تشغيل الشحن' : 'Delivery OS' }}</span>
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="features-index section section--alt" aria-labelledby="features-stories-heading">
      <AppContainer wide>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'المزايا الأساسية' : 'Core features'"
          :title="locale === 'ar' ? 'قدرات كبيرة، مصممة كسير عمل واحد.' : 'Big capabilities, designed as one workflow.'"
          :description="locale === 'ar' ? 'كل ميزة تقف وحدها كمنتج قوي، وتعمل مع بقية المنظومة لتقليل العمل اليدوي وزيادة وضوح العمليات.' : 'Each feature stands alone as a strong product, and works with the rest of the system to reduce manual work and improve operational clarity.'"
          class="reveal-up"
        />
        <div class="features-index__stories">
          <NuxtLink
            v-for="(feature, index) in featureList"
            :key="feature.key"
            :to="localePath(feature.path)"
            :class="['features-index__card reveal-stagger', { 'features-index__card--wide': index === 0 || index === 3 }]"
          >
            <div class="features-index__icon-shell">
              <AppIcon3D
                :name="featureIconMap[feature.key] || 'analytics'"
                :alt="locale === 'ar' ? `${feature.titleAr} ثلاثي الأبعاد` : `${feature.titleEn} 3D icon`"
                size="xl"
                class="features-index__icon"
              />
            </div>
            <div class="features-index__content">
              <span class="features-index__kicker">{{ locale === 'ar' ? `0${index + 1}` : `0${index + 1}` }}</span>
              <h2 class="features-index__title">{{ locale === 'ar' ? feature.titleAr : feature.titleEn }}</h2>
              <p class="features-index__text">{{ locale === 'ar' ? feature.summaryAr : feature.summaryEn }}</p>
              <span class="features-index__link">{{ locale === 'ar' ? 'استكشف الميزة' : 'Explore feature' }}</span>
            </div>
          </NuxtLink>
        </div>
      </AppContainer>
    </section>

    <section class="features-cta section section--dark" aria-labelledby="features-cta-heading">
      <AppContainer narrow>
        <div class="features-cta__inner reveal-up">
          <p class="features-cta__eyebrow">{{ locale === 'ar' ? 'الخطوة التالية' : 'Next step' }}</p>
          <h2 id="features-cta-heading" class="features-cta__title">{{ locale === 'ar' ? 'شاهد كيف تتصل هذه القدرات داخل عملياتك.' : 'See how these capabilities connect inside your operation.' }}</h2>
          <p class="features-cta__text">{{ locale === 'ar' ? 'احصل على جولة مخصّصة توضح أين يقل العمل اليدوي، وأين تتحسن الرؤية، وكيف تتسارع دورة الشحن.' : 'Get a tailored walkthrough showing where manual work drops, visibility improves, and the delivery cycle moves faster.' }}</p>
          <AppButton :to="localePath('/request-demo')" variant="primary" size="lg">{{ locale === 'ar' ? 'اطلب عرضاً توضيحياً' : 'Request a demo' }}</AppButton>
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

useScrollReveal()

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
.features-hero {
  position: relative;
  overflow: hidden;
}

.features-hero::before,
.features-hero::after,
.features-cta::before {
  content: '';
  position: absolute;
  pointer-events: none;
  border-radius: var(--radius-full);
}

.features-hero::before {
  width: 32rem;
  height: 32rem;
  inset-block-start: -14rem;
  inset-inline-start: -10rem;
  background: rgba(255, 255, 255, 0.08);
  filter: blur(6px);
}

.features-hero::after {
  width: 22rem;
  height: 22rem;
  inset-block-end: -10rem;
  inset-inline-end: 10%;
  background: rgba(232, 168, 56, 0.12);
  filter: blur(14px);
}

.features-hero__layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(20rem, 0.95fr);
  gap: var(--spacing-16);
  align-items: center;
}

.features-hero__content {
  max-width: 44rem;
}

.features-hero__eyebrow,
.features-cta__eyebrow {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 800;
  color: rgba(255, 255, 255, 0.72);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-block-end: var(--spacing-4);
}

.features-hero__title {
  font-size: clamp(2.75rem, 7vw, 5.75rem);
  color: var(--color-text-light);
  letter-spacing: -0.045em;
  line-height: 1.05;
  margin-block-end: var(--spacing-6);
}

html[lang='ar'] .features-hero__title {
  letter-spacing: -0.02em;
}

.features-hero__text {
  max-width: 42rem;
  font-size: clamp(1.125rem, 2vw, 1.35rem);
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.78);
  margin-block-end: var(--spacing-8);
}

.features-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

.features-hero__visual {
  min-width: 0;
}

.features-orbit {
  position: relative;
  min-height: clamp(22rem, 42vw, 34rem);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-4xl);
  background:
    radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.16), transparent 28%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04));
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.18);
  overflow: hidden;
}

.features-orbit::before,
.features-orbit::after {
  content: '';
  position: absolute;
  inset: 12%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 48%;
}

.features-orbit::after {
  inset: 24%;
  transform: rotate(28deg);
}

.features-orbit__core {
  position: absolute;
  inset: 50% auto auto 50%;
  display: grid;
  place-items: center;
  width: clamp(9rem, 17vw, 12rem);
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 34%;
  background: rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 24px 60px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  text-align: center;
}

.features-orbit__label {
  align-self: end;
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--color-text-light);
}

.features-orbit__sub {
  align-self: start;
  color: rgba(255, 255, 255, 0.66);
  font-size: var(--text-sm);
}

.features-orbit__icon {
  position: absolute;
  z-index: 1;
}

.features-orbit__icon--smart-dispatch { inset-block-start: 8%; inset-inline-start: 12%; }
.features-orbit__icon--courier-app { inset-block-start: 13%; inset-inline-end: 10%; }
.features-orbit__icon--merchant-portal { inset-block-start: 41%; inset-inline-start: 4%; }
.features-orbit__icon--cod-wallet { inset-block-end: 10%; inset-inline-start: 20%; }
.features-orbit__icon--bulk-upload { inset-block-end: 12%; inset-inline-end: 16%; }
.features-orbit__icon--fraud-detection { inset-block-start: 43%; inset-inline-end: 5%; }

.features-index {
  overflow: hidden;
}

.features-index__stories {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--spacing-6);
}

.features-index__card {
  position: relative;
  grid-column: span 6;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-8);
  min-height: 22rem;
  padding: clamp(var(--spacing-6), 4vw, var(--spacing-10));
  align-items: end;
  color: inherit;
  text-decoration: none;
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-4xl);
  background:
    radial-gradient(circle at 18% 12%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0) 36%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.94), rgba(245, 245, 245, 0.72));
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: transform 0.3s var(--reveal-easing), box-shadow 0.3s ease, border-color 0.3s ease;
}

.features-index__card::before {
  content: '';
  position: absolute;
  width: 18rem;
  height: 18rem;
  inset-block-start: -8rem;
  inset-inline-end: -7rem;
  border-radius: var(--radius-full);
  background: rgba(45, 110, 125, 0.08);
  pointer-events: none;
}

.features-index__card--wide {
  grid-column: span 12;
  min-height: 26rem;
  grid-template-columns: minmax(12rem, 0.8fr) minmax(0, 1fr);
}

.features-index__card:hover {
  transform: translateY(-6px);
  border-color: rgba(27, 77, 92, 0.16);
  box-shadow: var(--shadow-lg);
}

.features-index__icon-shell {
  position: relative;
  z-index: 1;
  align-self: center;
}

.features-index__icon {
  display: inline-flex;
}

.features-index__content {
  position: relative;
  z-index: 1;
  max-width: 34rem;
}

.features-index__kicker {
  display: inline-flex;
  margin-block-end: var(--spacing-3);
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 800;
  color: var(--color-primary-light);
}

.features-index__title {
  font-size: clamp(1.75rem, 4vw, 3.25rem);
  letter-spacing: -0.035em;
  margin-block-end: var(--spacing-4);
}

.features-index__text {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.85;
  margin-block-end: var(--spacing-8);
}

.features-index__link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 800;
  color: var(--color-primary);
}

.features-index__link::after {
  content: '←';
}

html[lang='en'] .features-index__link::after {
  content: '→';
}

.features-cta {
  position: relative;
  overflow: hidden;
}

.features-cta::before {
  width: 28rem;
  height: 28rem;
  inset-block-start: -16rem;
  inset-inline-start: 50%;
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(-50%);
}

.features-cta__inner {
  position: relative;
  z-index: 1;
  text-align: center;
}

.features-cta__title {
  font-size: clamp(2rem, 5vw, 4rem);
  color: var(--color-text-light);
  margin-block-end: var(--spacing-4);
  letter-spacing: -0.035em;
}

.features-cta__text {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  margin-block-end: var(--spacing-8);
  line-height: 1.85;
}

@media (max-width: 64rem) {
  .features-hero__layout {
    grid-template-columns: 1fr;
  }

  .features-hero__content {
    max-width: 48rem;
  }

  .features-index__card,
  .features-index__card--wide {
    grid-column: span 12;
  }
}

@media (max-width: 48rem) {
  .features-index__card,
  .features-index__card--wide {
    grid-template-columns: 1fr;
    min-height: 0;
  }

  .features-hero__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .features-orbit {
    min-height: 26rem;
  }

  .features-orbit__icon {
    transform: scale(0.82);
  }
}

@media (max-width: 36rem) {
  .features-orbit__core {
    width: 8rem;
  }

  .features-orbit__icon--merchant-portal { inset-inline-start: -3%; }
  .features-orbit__icon--fraud-detection { inset-inline-end: -3%; }
}

@media (prefers-reduced-motion: reduce) {
  .features-index__card:hover {
    transform: none;
  }
}
</style>
