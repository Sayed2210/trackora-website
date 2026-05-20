<template>
  <div>
    <section class="feature-hero section section--dark" aria-labelledby="feature-heading">
      <AppContainer wide>
        <div class="feature-hero__layout reveal-up">
          <div class="feature-hero__content">
            <p class="feature-hero__eyebrow">{{ locale === 'ar' ? 'إطلاق ميزة' : 'Feature launch' }}</p>
            <h1 id="feature-heading" class="feature-hero__title">{{ locale === 'ar' ? feature.titleAr : feature.titleEn }}</h1>
            <p class="feature-hero__subtitle">{{ locale === 'ar' ? feature.summaryAr : feature.summaryEn }}</p>
            <div class="feature-hero__actions">
              <AppButton :to="localePath('/request-demo')" variant="primary" size="lg">{{ t('nav.requestDemo') }}</AppButton>
              <AppButton :to="localePath('/features')" variant="secondary" size="lg">{{ t('common.viewAll') }}</AppButton>
            </div>
          </div>

          <div class="feature-hero__visual">
            <div class="feature-product-card" aria-hidden="true">
              <div class="feature-product-card__chrome">
                <span />
                <span />
                <span />
              </div>
              <div class="feature-product-card__body">
                <AppIcon3D
                  :name="featureIconMap[feature.key] || 'analytics'"
                  alt=""
                  size="xl"
                  variant="hero"
                  class="feature-hero__icon"
                />
                <div class="feature-product-card__copy">
                  <span>{{ locale === 'ar' ? 'Trackora OS' : 'Trackora OS' }}</span>
                  <strong>{{ locale === 'ar' ? feature.titleAr : feature.titleEn }}</strong>
                </div>
                <div class="feature-product-card__lines">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="feature-problem section" aria-labelledby="feature-problem-heading">
      <AppContainer wide>
        <div class="feature-narrative reveal-up">
          <div class="feature-narrative__label">
            <span>{{ locale === 'ar' ? '01' : '01' }}</span>
            <p>{{ locale === 'ar' ? 'المشكلة' : 'The problem' }}</p>
          </div>
          <div class="feature-narrative__copy">
            <h2 id="feature-problem-heading">{{ locale === 'ar' ? 'الاحتكاك الذي يبطئ العمليات.' : 'The friction slowing operations down.' }}</h2>
            <p>{{ locale === 'ar' ? feature.problemAr : feature.problemEn }}</p>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="feature-solution section section--alt" aria-labelledby="feature-solution-heading">
      <AppContainer wide>
        <div class="feature-reveal reveal-up">
          <div class="feature-reveal__visual" aria-hidden="true">
            <AppIcon3D
              :name="featureIconMap[feature.key] || 'analytics'"
              alt=""
              size="xl"
              class="feature-reveal__icon"
            />
            <div class="feature-reveal__panel">
              <span>{{ locale === 'ar' ? 'قدرة تراكورا' : 'Trackora capability' }}</span>
              <strong>{{ locale === 'ar' ? feature.titleAr : feature.titleEn }}</strong>
            </div>
          </div>

          <div class="feature-reveal__content">
            <p class="feature-reveal__eyebrow">{{ locale === 'ar' ? '02 / الكشف' : '02 / Reveal' }}</p>
            <h2 id="feature-solution-heading">{{ locale === 'ar' ? 'كيف يحوّلها تراكورا إلى سير عمل واضح.' : 'How Trackora turns it into a clear workflow.' }}</h2>
            <p>{{ locale === 'ar' ? feature.solutionAr : feature.solutionEn }}</p>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="feature-benefits section" aria-labelledby="feature-benefits-heading">
      <AppContainer wide>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? '03 / الفوائد' : '03 / Benefits'"
          :title="locale === 'ar' ? 'مكاسب عملية تظهر في اليوميات.' : 'Operational gains you feel every day.'"
          :description="locale === 'ar' ? 'هذه ليست بطاقة ميزة منفصلة، بل قدرة تؤثر على السرعة، الوضوح، والعمل اليدوي في مسار الشحن.' : 'This is not an isolated feature card, but a capability that affects speed, clarity, and manual work across delivery.'"
          class="reveal-up"
        />
        <ul class="feature-benefits__list" role="list">
          <li v-for="(benefit, i) in activeBenefits" :key="i" class="feature-benefits__item reveal-stagger">
            <span class="feature-benefits__number" aria-hidden="true">{{ i + 1 }}</span>
            <span>{{ benefit }}</span>
          </li>
        </ul>
      </AppContainer>
    </section>

    <section class="feature-workflow section section--alt" aria-labelledby="feature-workflow-heading">
      <AppContainer wide>
        <div class="feature-workflow__layout">
          <AppSectionHeader
            :eyebrow="locale === 'ar' ? '04 / كيف يعمل' : '04 / How it works'"
            :title="locale === 'ar' ? 'من لحظة الإدخال إلى قرار واضح.' : 'From input to a clear operational decision.'"
            align="left"
            class="feature-workflow__header reveal-up"
          />
          <ol class="feature-workflow__steps">
            <li v-for="(step, i) in activeWorkflow" :key="i" class="feature-workflow__step reveal-stagger">
              <span class="feature-workflow__number">{{ i + 1 }}</span>
              <span class="feature-workflow__text">{{ step }}</span>
            </li>
          </ol>
        </div>
      </AppContainer>
    </section>

    <section v-if="relatedFeatures.length" class="feature-related section" aria-labelledby="feature-related-heading">
      <AppContainer wide>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? '05 / مزايا ذات صلة' : '05 / Related features'"
          :title="locale === 'ar' ? 'أكمل سير العمل بهذه القدرات.' : 'Complete the workflow with these capabilities.'"
          class="reveal-up"
        />
        <div class="feature-related__grid">
          <NuxtLink v-for="related in relatedFeatures" :key="related.key" :to="localePath(related.path)" class="feature-related__card reveal-stagger">
            <AppIcon3D
              :name="featureIconMap[related.key] || 'analytics'"
              :alt="locale === 'ar' ? `${related.titleAr} ثلاثي الأبعاد` : `${related.titleEn} 3D icon`"
              size="lg"
              class="feature-related__icon"
            />
            <h3 class="feature-related__title">{{ locale === 'ar' ? related.titleAr : related.titleEn }}</h3>
            <p class="feature-related__text">{{ locale === 'ar' ? related.summaryAr : related.summaryEn }}</p>
            <span class="feature-related__link">{{ t('common.learnMore') }}</span>
          </NuxtLink>
        </div>
      </AppContainer>
    </section>

    <section class="feature-cta section section--dark" aria-labelledby="feature-cta-heading">
      <AppContainer narrow>
        <div class="feature-cta__inner reveal-up">
          <p class="feature-cta__eyebrow">{{ locale === 'ar' ? 'جاهز للتجربة؟' : 'Ready to see it?' }}</p>
          <h2 id="feature-cta-heading" class="feature-cta__title">{{ locale === 'ar' ? `شاهد ${feature.titleAr} داخل عملياتك.` : `See ${feature.titleEn} inside your operation.` }}</h2>
          <p class="feature-cta__text">{{ locale === 'ar' ? 'سنريك كيف تتصل هذه الميزة ببقية منظومة تراكورا لتقليل العمل اليدوي وتحسين الرؤية.' : 'We will show how this capability connects with the rest of Trackora to reduce manual work and improve visibility.' }}</p>
          <AppButton :to="localePath('/request-demo')" variant="primary" size="lg">{{ t('nav.requestDemo') }}</AppButton>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { features, type FeatureDetail } from '~/data/features'

const props = defineProps<{
  featureKey: string
}>()

const { t } = useI18n()
const locale = useI18n().locale
const localePath = useLocalePath()

const feature = computed(() => features.find(f => f.key === props.featureKey) as FeatureDetail)

const relatedFeatures = computed(() =>
  feature.value.relatedKeys
    .map(key => features.find(f => f.key === key))
    .filter(Boolean) as FeatureDetail[]
)

const activeBenefits = computed(() => locale.value === 'ar' ? feature.value.benefitsAr : feature.value.benefitsEn)
const activeWorkflow = computed(() => locale.value === 'ar' ? feature.value.workflowAr : feature.value.workflowEn)

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
  title: locale.value === 'ar' ? feature.value.seoTitleAr : feature.value.seoTitleEn,
  meta: [
    { name: 'description', content: locale.value === 'ar' ? feature.value.seoDescriptionAr : feature.value.seoDescriptionEn },
    { property: 'og:title', content: locale.value === 'ar' ? feature.value.seoTitleAr : feature.value.seoTitleEn },
    { property: 'og:description', content: locale.value === 'ar' ? feature.value.seoDescriptionAr : feature.value.seoDescriptionEn },
  ],
})
</script>

<style scoped>
.feature-hero,
.feature-cta {
  position: relative;
  overflow: hidden;
}

.feature-hero::before,
.feature-hero::after,
.feature-cta::before {
  content: '';
  position: absolute;
  pointer-events: none;
  border-radius: var(--radius-full);
}

.feature-hero::before {
  width: 34rem;
  height: 34rem;
  inset-block-start: -16rem;
  inset-inline-start: -12rem;
  background: rgba(255, 255, 255, 0.08);
}

.feature-hero::after {
  width: 24rem;
  height: 24rem;
  inset-block-end: -12rem;
  inset-inline-end: 12%;
  background: rgba(255, 107, 107, 0.12);
  filter: blur(12px);
}

.feature-hero__layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(20rem, 0.9fr);
  gap: var(--spacing-16);
  align-items: center;
}

.feature-hero__content {
  max-width: 44rem;
}

.feature-hero__eyebrow,
.feature-reveal__eyebrow,
.feature-cta__eyebrow {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 800;
  color: var(--color-primary-light);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-block-end: var(--spacing-4);
}

.feature-hero__eyebrow,
.feature-cta__eyebrow {
  color: rgba(255, 255, 255, 0.72);
}

.feature-hero__icon {
  display: inline-flex;
}

.feature-hero__title {
  font-size: clamp(3rem, 8vw, 6.25rem);
  color: var(--color-text-light);
  letter-spacing: -0.05em;
  line-height: 1.02;
  margin-block-end: var(--spacing-6);
}

html[lang='ar'] .feature-hero__title {
  letter-spacing: -0.02em;
}

.feature-hero__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.35rem);
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.9;
  margin-block-end: var(--spacing-8);
  max-width: 42rem;
}

.feature-hero__actions {
  display: flex;
  gap: var(--spacing-4);
  flex-wrap: wrap;
}

.feature-product-card {
  position: relative;
  max-width: 32rem;
  margin-inline: auto;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-4xl);
  background:
    radial-gradient(circle at 30% 18%, rgba(255, 255, 255, 0.2), transparent 34%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.05));
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(22px);
  overflow: hidden;
}

.feature-product-card::before {
  content: '';
  position: absolute;
  width: 18rem;
  height: 18rem;
  inset-block-start: -8rem;
  inset-inline-end: -7rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.08);
}

.feature-product-card__chrome {
  display: flex;
  gap: var(--spacing-2);
  padding: var(--spacing-5) var(--spacing-6);
  border-block-end: 1px solid rgba(255, 255, 255, 0.12);
}

.feature-product-card__chrome span {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.38);
}

.feature-product-card__body {
  position: relative;
  z-index: 1;
  display: grid;
  gap: var(--spacing-8);
  padding: clamp(var(--spacing-8), 5vw, var(--spacing-12));
  min-height: 28rem;
  align-content: center;
}

.feature-product-card__copy {
  display: grid;
  gap: var(--spacing-2);
}

.feature-product-card__copy span {
  color: rgba(255, 255, 255, 0.58);
  font-size: var(--text-sm);
  font-weight: 700;
}

.feature-product-card__copy strong {
  color: var(--color-text-light);
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  line-height: 1.15;
}

.feature-product-card__lines {
  display: grid;
  gap: var(--spacing-3);
}

.feature-product-card__lines span {
  height: 0.65rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.14);
}

.feature-product-card__lines span:nth-child(2) { width: 78%; }
.feature-product-card__lines span:nth-child(3) { width: 58%; }

.feature-narrative,
.feature-reveal,
.feature-workflow__layout {
  display: grid;
  grid-template-columns: minmax(12rem, 0.45fr) minmax(0, 1fr);
  gap: var(--spacing-16);
  align-items: start;
}

.feature-narrative__label {
  position: sticky;
  inset-block-start: var(--spacing-8);
  display: grid;
  gap: var(--spacing-3);
}

.feature-narrative__label span {
  font-family: var(--font-heading);
  font-size: clamp(4rem, 11vw, 8rem);
  font-weight: 800;
  line-height: 0.9;
  color: rgba(26, 59, 102, 0.1);
}

.feature-narrative__label p {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 800;
  color: var(--color-primary-light);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.feature-narrative__copy h2,
.feature-reveal__content h2 {
  font-size: clamp(2.25rem, 5vw, 4.25rem);
  letter-spacing: -0.04em;
  margin-block-end: var(--spacing-6);
}

html[lang='ar'] .feature-narrative__copy h2,
html[lang='ar'] .feature-reveal__content h2 {
  letter-spacing: -0.015em;
}

.feature-narrative__copy p,
.feature-reveal__content p {
  max-width: 48rem;
  font-size: clamp(1.125rem, 2vw, 1.35rem);
  color: var(--color-text-secondary);
  line-height: 1.95;
}

.feature-reveal {
  align-items: center;
}

.feature-reveal__visual {
  position: relative;
  min-height: 26rem;
  display: grid;
  place-items: center;
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-4xl);
  background:
    radial-gradient(circle at 50% 42%, rgba(59, 89, 152, 0.14), transparent 28%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.72));
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.feature-reveal__visual::before,
.feature-reveal__visual::after {
  content: '';
  position: absolute;
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: 48%;
}

.feature-reveal__visual::before { inset: 14%; }
.feature-reveal__visual::after { inset: 28%; transform: rotate(24deg); }

.feature-reveal__icon {
  position: relative;
  z-index: 1;
}

.feature-reveal__panel {
  position: absolute;
  inset-inline: var(--spacing-8);
  inset-block-end: var(--spacing-8);
  z-index: 1;
  display: grid;
  gap: var(--spacing-1);
  padding: var(--spacing-5);
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-2xl);
  background: var(--glass-bg);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(18px);
}

.feature-reveal__panel span {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

.feature-reveal__panel strong {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  color: var(--color-text);
}

.feature-benefits__list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--spacing-5);
}

.feature-benefits__item {
  position: relative;
  display: flex;
  min-height: 14rem;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--spacing-8);
  padding: var(--spacing-6);
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-3xl);
  background: linear-gradient(180deg, rgba(59, 89, 152, 0.05), var(--color-surface));
  box-shadow: var(--shadow-card);
  color: var(--color-text);
  line-height: 1.7;
  overflow: hidden;
}

.feature-benefits__item::before {
  content: '';
  position: absolute;
  width: 9rem;
  height: 9rem;
  inset-block-start: -5rem;
  inset-inline-end: -4rem;
  border-radius: var(--radius-full);
  background: rgba(59, 89, 152, 0.08);
}

.feature-benefits__number {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: var(--color-text-light);
  font-family: var(--font-heading);
  font-weight: 800;
}

.feature-benefits__item > span:last-child {
  position: relative;
  z-index: 1;
  font-size: var(--text-lg);
  font-weight: 700;
}

.feature-workflow__header {
  margin-block-end: 0;
}

.feature-workflow__steps {
  display: grid;
  gap: var(--spacing-4);
}

.feature-workflow__step {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-5);
  padding: var(--spacing-6);
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-3xl);
  background: rgba(255, 255, 255, 0.78);
  box-shadow: var(--shadow-card);
}

.feature-workflow__number {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: var(--color-text-light);
  font-size: var(--text-base);
  font-weight: 800;
  box-shadow: 0 10px 24px rgba(26, 59, 102, 0.18);
}

.feature-workflow__text {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.7;
  padding-block: var(--spacing-1);
}

.feature-related__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: var(--spacing-6);
}

.feature-related__card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 24rem;
  padding: var(--spacing-8);
  color: inherit;
  text-decoration: none;
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-4xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: transform 0.3s var(--reveal-easing), box-shadow 0.3s ease, border-color 0.3s ease;
}

.feature-related__card::before {
  content: '';
  position: absolute;
  width: 14rem;
  height: 14rem;
  inset-block-start: -7rem;
  inset-inline-end: -6rem;
  border-radius: var(--radius-full);
  background: rgba(59, 89, 152, 0.08);
}

.feature-related__card:hover {
  transform: translateY(-6px);
  border-color: rgba(26, 59, 102, 0.16);
  box-shadow: var(--shadow-lg);
}

.feature-related__icon {
  position: relative;
  z-index: 1;
  margin-block-end: var(--spacing-8);
}

.feature-related__title {
  position: relative;
  z-index: 1;
  font-size: var(--text-xl);
  margin-block-end: var(--spacing-3);
}

.feature-related__text {
  position: relative;
  z-index: 1;
  flex-grow: 1;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-block-end: var(--spacing-8);
}

.feature-related__link {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 800;
  color: var(--color-primary);
}

.feature-related__link::after {
  content: '←';
}

html[lang='en'] .feature-related__link::after {
  content: '→';
}

.feature-cta::before {
  width: 28rem;
  height: 28rem;
  inset-block-start: -15rem;
  inset-inline-start: 50%;
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(-50%);
}

.feature-cta__inner {
  position: relative;
  z-index: 1;
  text-align: center;
}

.feature-cta__title {
  font-size: clamp(2rem, 5vw, 4rem);
  color: var(--color-text-light);
  margin-block-end: var(--spacing-4);
  letter-spacing: -0.035em;
}

.feature-cta__text {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  margin-block-end: var(--spacing-8);
  line-height: 1.85;
}

@media (max-width: 70rem) {
  .feature-benefits__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 64rem) {
  .feature-hero__layout,
  .feature-narrative,
  .feature-reveal,
  .feature-workflow__layout {
    grid-template-columns: 1fr;
  }

  .feature-narrative__label {
    position: static;
  }

  .feature-narrative__label span {
    font-size: 4rem;
  }
}

@media (max-width: 48rem) {
  .feature-hero__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .feature-product-card__body {
    min-height: 22rem;
  }

  .feature-benefits__list {
    grid-template-columns: 1fr;
  }

  .feature-benefits__item {
    min-height: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .feature-related__card:hover {
    transform: none;
  }
}
</style>
