<template>
  <div class="feature-detail" :class="`feature-detail--${feature.accent}`">
    <section class="feature-detail__hero" aria-labelledby="feature-heading">
      <AppContainer wide>
        <div class="feature-detail__hero-grid reveal-up">
          <div class="feature-detail__hero-copy">
            <NuxtLink class="feature-detail__back" :to="localePath('/features')">
              {{ locale === 'ar' ? 'كل المزايا' : 'All features' }}
            </NuxtLink>
            <p class="feature-detail__kicker">{{ l(feature.kicker) }}</p>
            <h1 id="feature-heading">{{ l(feature.title) }}</h1>
            <p class="feature-detail__lead">{{ l(feature.summary) }}</p>
            <div class="feature-detail__actions">
              <NuxtLink class="feature-action feature-action--primary" :to="localePath('/request-demo')">
                {{ locale === 'ar' ? 'اطلب عرضا لهذه الميزة' : 'Request a feature walkthrough' }}
              </NuxtLink>
              <NuxtLink class="feature-action feature-action--quiet" :to="localePath('/features')">
                {{ locale === 'ar' ? 'قارن كل الأدوات' : 'Compare all tools' }}
              </NuxtLink>
            </div>
          </div>

          <div class="feature-console" :aria-label="locale === 'ar' ? 'معاينة تشغيلية للميزة' : 'Operational feature preview'">
            <div class="feature-console__top">
              <span>Trackora</span>
              <strong>{{ l(feature.title) }}</strong>
            </div>
            <div class="feature-console__note">{{ l(feature.heroNote) }}</div>
            <dl class="feature-console__signals">
              <div v-for="signal in feature.signals" :key="signal.label.en">
                <dt>{{ l(signal.label) }}</dt>
                <dd>{{ l(signal.value) }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="feature-artifact" aria-labelledby="feature-artifact-heading">
      <AppContainer wide>
        <div class="feature-artifact__layout reveal-up" :class="`feature-artifact__layout--${feature.artifact.type}`">
          <div class="feature-artifact__copy">
            <h2 id="feature-artifact-heading">{{ l(feature.artifact.title) }}</h2>
            <p>{{ l(feature.artifact.description) }}</p>
          </div>

          <div class="product-artifact" :class="`product-artifact--${feature.artifact.type}`">
            <div class="product-artifact__header">
              <span>{{ locale === 'ar' ? 'مثال Trackora' : 'Trackora example' }}</span>
              <strong>{{ l(feature.title) }}</strong>
            </div>

            <div class="product-artifact__table" role="table" :aria-label="l(feature.artifact.title)">
              <div class="product-artifact__row product-artifact__row--head" role="row">
                <span v-for="column in feature.artifact.columns" :key="column.en" role="columnheader">
                  {{ l(column) }}
                </span>
              </div>
              <div v-for="(row, rowIndex) in feature.artifact.rows" :key="rowIndex" class="product-artifact__row" role="row">
                <span v-for="(cell, cellIndex) in row" :key="`${rowIndex}-${cellIndex}`" role="cell" :data-label="l(feature.artifact.columns[cellIndex])">
                  {{ l(cell) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="feature-story" aria-labelledby="feature-problem-heading">
      <AppContainer wide>
        <div class="feature-story__layout">
          <div class="feature-story__index reveal-up" aria-hidden="true">
            <span>{{ locale === 'ar' ? 'المشكلة' : 'Problem' }}</span>
            <strong>01</strong>
          </div>
          <div class="feature-story__copy reveal-up">
            <h2 id="feature-problem-heading">{{ l(feature.problemTitle) }}</h2>
            <p>{{ l(feature.problem) }}</p>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="feature-solution" aria-labelledby="feature-solution-heading">
      <AppContainer wide>
        <div class="feature-solution__layout reveal-up">
          <div class="feature-solution__panel" aria-hidden="true">
            <span>{{ locale === 'ar' ? 'قرار تشغيلي' : 'Operating decision' }}</span>
            <strong>{{ l(feature.signalsTitle) }}</strong>
            <ul>
              <li v-for="signal in feature.signals.slice(0, 3)" :key="signal.value.en">
                <span>{{ l(signal.label) }}</span>
                <b>{{ l(signal.value) }}</b>
              </li>
            </ul>
          </div>
          <div class="feature-solution__copy">
            <h2 id="feature-solution-heading">{{ l(feature.solutionTitle) }}</h2>
            <p>{{ l(feature.solution) }}</p>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="feature-capabilities" aria-labelledby="feature-capabilities-heading">
      <AppContainer wide>
        <div class="feature-capabilities__heading reveal-up">
          <h2 id="feature-capabilities-heading">{{ l(feature.capabilitiesTitle) }}</h2>
          <p>{{ locale === 'ar' ? 'تفاصيل المنتج هنا مكتوبة بلسان فريق التشغيل: ماذا يرى، ماذا يقرر، وما الذي ينتقل للخطوة التالية.' : 'Product details are written in operations language: what the team sees, what it decides, and what moves to the next step.' }}</p>
        </div>

        <ul class="capability-list" role="list">
          <li v-for="(capability, index) in feature.capabilities" :key="capability.en" class="reveal-stagger">
            <span>{{ locale === 'ar' ? arabicStep(index + 1) : index + 1 }}</span>
            <p>{{ l(capability) }}</p>
          </li>
        </ul>
      </AppContainer>
    </section>

    <section class="feature-workflow" aria-labelledby="feature-workflow-heading">
      <AppContainer wide>
        <div class="feature-workflow__layout">
          <div class="feature-workflow__header reveal-up">
            <h2 id="feature-workflow-heading">{{ l(feature.workflowTitle) }}</h2>
          </div>

          <ol class="workflow-board">
            <li v-for="(step, index) in feature.workflow" :key="step.title.en" class="reveal-stagger">
              <div class="workflow-board__number">{{ locale === 'ar' ? arabicStep(index + 1) : index + 1 }}</div>
              <div>
                <h3>{{ l(step.title) }}</h3>
                <p>{{ l(step.text) }}</p>
              </div>
            </li>
          </ol>
        </div>
      </AppContainer>
    </section>

    <section class="feature-review" aria-labelledby="feature-review-heading">
      <AppContainer wide>
        <div class="feature-review__layout reveal-up">
          <div>
            <h2 id="feature-review-heading">{{ l(feature.reviewTitle) }}</h2>
          </div>
          <ul role="list">
            <li v-for="item in feature.review" :key="item.en">{{ l(item) }}</li>
          </ul>
        </div>
      </AppContainer>
    </section>

    <section v-if="relatedFeatures.length" class="feature-related" aria-labelledby="feature-related-heading">
      <AppContainer wide>
        <div class="feature-related__heading reveal-up">
          <h2 id="feature-related-heading">{{ locale === 'ar' ? 'مزايا تعمل مع هذه الصفحة' : 'Features that work with this page' }}</h2>
        </div>
        <div class="feature-related__grid">
          <NuxtLink v-for="related in relatedFeatures" :key="related.key" class="related-card reveal-stagger" :to="localePath(related.path)">
            <span>{{ l(related.kicker) }}</span>
            <h3>{{ l(related.title) }}</h3>
            <p>{{ l(related.summary) }}</p>
          </NuxtLink>
        </div>
      </AppContainer>
    </section>

    <section class="feature-final" aria-labelledby="feature-final-heading">
      <AppContainer wide>
        <div class="feature-final__inner reveal-up">
          <div>
            <h2 id="feature-final-heading">{{ locale === 'ar' ? `شاهد ${l(feature.title)} داخل دورة الشحنة عندك` : `See ${l(feature.title)} inside your shipment cycle` }}</h2>
            <p>{{ locale === 'ar' ? 'سنربط الميزة بباقي النظام: الديسباتش، المندوب، التاجر، محفظة COD، والتقارير حسب طريقة تشغيلك.' : 'We will connect the feature to the rest of the system: dispatch, courier, merchant, COD wallet, and reports based on your operation.' }}</p>
          </div>
          <NuxtLink class="feature-action feature-action--accent" :to="localePath('/request-demo')">
            {{ locale === 'ar' ? 'احجز عرض تشغيل' : 'Book an operations demo' }}
          </NuxtLink>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  featureDetails,
  getFeatureDetail,
  getLocalized,
  type LocalizedText,
} from '~/data/features'

const props = defineProps<{
  featureKey: string
}>()

const { locale } = useI18n()
const localePath = useLocalePath()
const foundFeature = getFeatureDetail(props.featureKey)

if (!foundFeature) {
  throw createError({ statusCode: 404, statusMessage: 'Feature not found' })
}

const feature = foundFeature
const relatedFeatures = computed(() => feature.relatedKeys
  .map(key => featureDetails.find(item => item.key === key))
  .filter(Boolean) as typeof featureDetails)

function l(text: LocalizedText) {
  return getLocalized(text, locale.value)
}

function arabicStep(value: number) {
  return new Intl.NumberFormat('ar-EG').format(value)
}

useScrollReveal()

useHead(() => ({
  title: l(feature.seoTitle),
  htmlAttrs: { lang: locale.value, dir: locale.value === 'ar' ? 'rtl' : 'ltr' },
  meta: [
    { name: 'description', content: l(feature.seoDescription) },
    { property: 'og:title', content: l(feature.seoTitle) },
    { property: 'og:description', content: l(feature.seoDescription) },
  ],
}))
</script>

<style scoped>
.feature-detail {
  --feature-primary: #1a3b66;
  --feature-primary-light: #3b5998;
  --feature-primary-dark: #0a1d34;
  --feature-coral: #ff6b6b;
  --feature-coral-soft: #ffd8d8;
  --feature-coral-ink: #210f16;
  --feature-accent: var(--feature-coral);
  --feature-accent-soft: rgba(255, 107, 107, 0.12);
  --feature-shadow: 0 24px 80px rgba(26, 59, 102, 0.16);
  color: var(--color-text);
  background: var(--color-bg);
  overflow: hidden;
}

.feature-detail--courier,
.feature-detail--wallet {
  --feature-accent: var(--feature-coral);
  --feature-accent-soft: rgba(255, 107, 107, 0.14);
}

.feature-detail--risk {
  --feature-accent: var(--color-danger);
  --feature-accent-soft: rgba(239, 68, 68, 0.09);
}

.feature-detail__hero {
  position: relative;
  padding-block: clamp(5rem, 10vw, 8.5rem);
  color: var(--color-text-light);
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 107, 107, 0.18), transparent 19rem),
    linear-gradient(145deg, var(--feature-primary-dark) 0%, var(--feature-primary) 48%, #254c80 100%);
  isolation: isolate;
}

.feature-detail__hero::after {
  content: '';
  position: absolute;
  inset: auto -8rem -12rem -8rem;
  height: 18rem;
  border-radius: 50% 50% 0 0;
  background: var(--color-bg);
  z-index: -1;
}

.feature-detail__hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(22rem, 0.9fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.feature-detail__hero-copy {
  display: grid;
  gap: var(--spacing-5);
  max-width: 55rem;
}

.feature-detail__back,
.feature-detail__kicker,
.feature-solution__copy span,
.feature-workflow__header span,
.feature-review__layout span,
.feature-related__heading span,
.feature-final__inner span {
  display: inline-flex;
  width: fit-content;
  border-radius: var(--radius-full);
  padding: 0.42rem 0.85rem;
  font-size: var(--text-sm);
  font-weight: 900;
}

.feature-detail__back {
  color: var(--color-accent-light);
  background: rgba(255, 255, 255, 0.1);
}

.feature-detail__kicker {
  color: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feature-detail__hero h1 {
  max-width: 12ch;
  color: var(--color-text-light);
  font-size: clamp(3rem, 8vw, 5.9rem);
  line-height: 1.04;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

html[lang='ar'] .feature-detail__hero h1 {
  letter-spacing: -0.015em;
}

.feature-detail__lead {
  max-width: 70ch;
  color: rgba(255, 255, 255, 0.82);
  font-size: clamp(1.05rem, 1.6vw, 1.28rem);
  line-height: 1.9;
  text-wrap: pretty;
}

.feature-detail__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
}

.feature-action {
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  padding: 0.85rem 1.35rem;
  font-weight: 900;
  line-height: 1.35;
  text-align: center;
  transition: transform 220ms var(--reveal-easing), box-shadow 220ms var(--reveal-easing), background-color 220ms var(--reveal-easing), border-color 220ms var(--reveal-easing);
}

.feature-action:focus-visible,
.feature-detail__back:focus-visible,
.related-card:focus-visible {
  outline: 3px solid var(--feature-coral);
  outline-offset: 3px;
}

.feature-action--primary {
  color: var(--feature-coral-ink);
  background: var(--feature-coral);
  box-shadow: 0 16px 36px rgba(255, 107, 107, 0.3);
}

.feature-action--quiet {
  color: var(--color-text-light);
  border-color: rgba(255, 255, 255, 0.26);
  background: rgba(255, 255, 255, 0.09);
}

.feature-action--accent {
  color: var(--feature-coral-ink);
  background: var(--feature-coral);
  box-shadow: 0 18px 38px rgba(255, 107, 107, 0.3);
}

.feature-console {
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-4xl);
  background: rgba(7, 20, 36, 0.72);
  box-shadow: 0 32px 100px rgba(0, 0, 0, 0.28);
  overflow: hidden;
}

.feature-console__top {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-4);
  padding: var(--spacing-5) var(--spacing-6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.68);
}

.feature-console__top strong {
  color: var(--color-text-light);
}

.feature-console__note {
  margin: clamp(var(--spacing-5), 3vw, var(--spacing-8));
  border-radius: var(--radius-2xl);
  padding: var(--spacing-6);
  color: var(--color-text-light);
  background:
    radial-gradient(circle at 12% 12%, rgba(255, 107, 107, 0.18), transparent 13rem),
    rgba(255, 255, 255, 0.09);
  font-size: var(--text-lg);
  font-weight: 800;
  line-height: 1.65;
}

.feature-console__signals {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  margin: clamp(var(--spacing-5), 3vw, var(--spacing-8));
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-2xl);
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
}

.feature-console__signals div {
  display: grid;
  gap: var(--spacing-2);
  padding: var(--spacing-5);
  background: rgba(255, 255, 255, 0.07);
}

.feature-console__signals dt {
  color: rgba(255, 255, 255, 0.64);
  font-size: var(--text-sm);
}

.feature-console__signals dd {
  color: var(--color-text-light);
  font-size: var(--text-xl);
  font-weight: 900;
}

.feature-story,
.feature-artifact,
.feature-capabilities,
.feature-related,
.feature-final {
  padding-block: clamp(4.5rem, 9vw, 8rem);
}

.feature-artifact {
  background:
    radial-gradient(circle at 12% 18%, var(--feature-accent-soft), transparent 24rem),
    var(--color-bg);
}

.feature-artifact__layout {
  display: grid;
  grid-template-columns: minmax(18rem, 0.42fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
}

.feature-artifact__layout--task-strip,
.feature-artifact__layout--risk-queue {
  grid-template-columns: minmax(0, 1fr);
}

.feature-artifact__layout--operations-board {
  grid-template-columns: minmax(0, 0.62fr) minmax(0, 1fr);
}

.feature-artifact__copy {
  display: grid;
  gap: var(--spacing-4);
  position: sticky;
  top: 6rem;
}

.feature-artifact__copy h2 {
  color: var(--color-primary-dark);
  font-size: clamp(2.15rem, 5vw, 4.25rem);
  line-height: 1.12;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

html[lang='ar'] .feature-artifact__copy h2 {
  letter-spacing: -0.012em;
}

.feature-artifact__copy p {
  max-width: 58ch;
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
  line-height: 1.85;
  text-wrap: pretty;
}

.product-artifact {
  border: 1px solid rgba(27, 77, 92, 0.12);
  border-radius: var(--radius-4xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.product-artifact__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-4);
  padding: var(--spacing-5) var(--spacing-6);
  color: rgba(255, 255, 255, 0.74);
  background: linear-gradient(145deg, var(--feature-primary-dark), var(--feature-primary));
}

.product-artifact__header strong {
  color: var(--color-text-light);
}

.product-artifact__table {
  display: grid;
  min-width: 100%;
  overflow-x: auto;
}

.product-artifact__row {
  display: grid;
  grid-template-columns: repeat(var(--artifact-columns, 6), minmax(8.5rem, 1fr));
  min-width: 48rem;
  border-bottom: 1px solid rgba(27, 77, 92, 0.08);
}

.product-artifact__row:last-child {
  border-bottom: none;
}

.product-artifact__row span {
  display: grid;
  align-items: center;
  min-height: 4.25rem;
  padding: var(--spacing-4);
  color: var(--color-primary-dark);
  font-weight: 800;
  line-height: 1.55;
}

.product-artifact__row span + span {
  border-inline-start: 1px solid rgba(27, 77, 92, 0.08);
}

.product-artifact__row--head span {
  min-height: 3.25rem;
  color: var(--color-text-secondary);
  background: rgba(45, 110, 125, 0.07);
  font-size: var(--text-sm);
}

.product-artifact--task-strip .product-artifact__row,
.product-artifact--transaction-ledger .product-artifact__row,
.product-artifact--validation-table .product-artifact__row,
.product-artifact--risk-queue .product-artifact__row {
  --artifact-columns: 5;
}

.product-artifact--operations-board .product-artifact__row {
  --artifact-columns: 4;
}

.product-artifact--task-strip .product-artifact__row:not(.product-artifact__row--head) {
  margin: var(--spacing-4);
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-2xl);
  background: linear-gradient(90deg, var(--feature-accent-soft), var(--color-surface));
  overflow: hidden;
}

.product-artifact--operations-board .product-artifact__row:not(.product-artifact__row--head) span,
.product-artifact--transaction-ledger .product-artifact__row:not(.product-artifact__row--head) span:nth-child(4),
.product-artifact--risk-queue .product-artifact__row:not(.product-artifact__row--head) span:last-child {
  background: var(--color-accent-light);
}

.product-artifact--validation-table .product-artifact__row:not(.product-artifact__row--head) span:last-child,
.product-artifact--risk-queue .product-artifact__row:not(.product-artifact__row--head) span:nth-child(2) {
  color: #7a271a;
}

.feature-story__layout {
  display: grid;
  grid-template-columns: minmax(10rem, 0.32fr) minmax(0, 1fr);
  gap: clamp(2rem, 6vw, 6rem);
  align-items: start;
}

.feature-story__index {
  position: sticky;
  top: 6rem;
  display: grid;
  gap: var(--spacing-3);
}

.feature-story__index span {
  color: var(--color-primary);
  font-weight: 900;
}

.feature-story__index strong {
  color: rgba(27, 77, 92, 0.12);
  font-size: clamp(5rem, 12vw, 9rem);
  line-height: 0.9;
}

.feature-story__copy h2,
.feature-artifact__copy h2,
.feature-solution__copy h2,
.feature-capabilities__heading h2,
.feature-workflow__header h2,
.feature-review__layout h2,
.feature-related__heading h2,
.feature-final__inner h2 {
  color: var(--color-primary-dark);
  font-size: clamp(2.15rem, 5vw, 4.25rem);
  line-height: 1.12;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

html[lang='ar'] .feature-story__copy h2,
html[lang='ar'] .feature-artifact__copy h2,
html[lang='ar'] .feature-solution__copy h2,
html[lang='ar'] .feature-capabilities__heading h2,
html[lang='ar'] .feature-workflow__header h2,
html[lang='ar'] .feature-review__layout h2,
html[lang='ar'] .feature-related__heading h2,
html[lang='ar'] .feature-final__inner h2 {
  letter-spacing: -0.012em;
}

.feature-story__copy p,
.feature-artifact__copy p,
.feature-solution__copy p,
.feature-capabilities__heading p,
.feature-final__inner p {
  max-width: 72ch;
  margin-block-start: var(--spacing-5);
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
  line-height: 1.9;
  text-wrap: pretty;
}

.feature-solution,
.feature-workflow {
  padding-block: clamp(4.5rem, 9vw, 8rem);
  background:
    radial-gradient(circle at 85% 10%, var(--feature-accent-soft), transparent 22rem),
    var(--color-bg-alt);
}

.feature-solution__layout {
  display: grid;
  grid-template-columns: minmax(20rem, 0.85fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.feature-solution__panel {
  display: grid;
  gap: var(--spacing-6);
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-4xl);
  padding: clamp(var(--spacing-6), 4vw, var(--spacing-10));
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.feature-solution__panel > span,
.feature-solution__copy span,
.feature-workflow__header span,
.feature-review__layout span,
.feature-related__heading span,
.feature-final__inner span {
  color: var(--color-primary);
  background: rgba(45, 110, 125, 0.08);
}

.feature-solution__panel strong {
  color: var(--color-primary-dark);
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  line-height: 1.12;
}

.feature-solution__panel ul {
  display: grid;
  gap: var(--spacing-3);
}

.feature-solution__panel li {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-4);
  border-radius: var(--radius-xl);
  padding: var(--spacing-4);
  background: rgba(45, 110, 125, 0.06);
}

.feature-solution__panel li span {
  color: var(--color-text-secondary);
}

.feature-solution__panel li b {
  color: var(--color-primary-dark);
}

.feature-capabilities__heading {
  display: grid;
  gap: var(--spacing-4);
  max-width: 62rem;
  margin-block-end: clamp(2rem, 5vw, 4rem);
}

.capability-list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--spacing-4);
}

.capability-list li {
  position: relative;
  display: grid;
  gap: var(--spacing-8);
  min-height: 16rem;
  align-content: space-between;
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-6);
  background: linear-gradient(180deg, var(--feature-accent-soft), var(--color-surface));
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.capability-list li > span {
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: var(--radius-full);
  color: var(--color-text-on-primary);
  background: var(--color-primary);
  font-weight: 900;
}

.capability-list p {
  color: var(--color-primary-dark);
  font-size: var(--text-lg);
  font-weight: 800;
  line-height: 1.65;
}

.feature-workflow__layout {
  display: grid;
  grid-template-columns: minmax(16rem, 0.45fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
}

.feature-workflow__header {
  position: sticky;
  top: 6rem;
  display: grid;
  gap: var(--spacing-4);
}

.workflow-board {
  display: grid;
  gap: var(--spacing-4);
}

.workflow-board li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-5);
  align-items: start;
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-6);
  background: rgba(255, 255, 255, 0.86);
  box-shadow: var(--shadow-card);
}

.workflow-board__number {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  color: var(--color-text-on-accent);
  background: var(--color-accent);
  font-weight: 900;
}

.workflow-board h3 {
  color: var(--color-primary-dark);
  font-size: var(--text-xl);
  margin-block-end: var(--spacing-2);
}

.workflow-board p {
  color: var(--color-text-secondary);
  line-height: 1.78;
}

.feature-review {
  padding-block: clamp(4rem, 8vw, 7rem);
}

.feature-review__layout {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(20rem, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
  border-radius: var(--radius-4xl);
  padding: clamp(var(--spacing-6), 5vw, var(--spacing-12));
  background:
    radial-gradient(circle at 12% 18%, rgba(255, 107, 107, 0.18), transparent 18rem),
    linear-gradient(145deg, var(--feature-primary-dark) 0%, var(--feature-primary) 58%, #254c80 100%);
  box-shadow: var(--feature-shadow);
}

.feature-review__layout h2,
.feature-review__layout li {
  color: var(--color-text-light);
}

.feature-review__layout span {
  color: var(--feature-coral-soft);
  background: rgba(255, 255, 255, 0.1);
  margin-block-end: var(--spacing-4);
}

.feature-review__layout ul {
  display: grid;
  gap: var(--spacing-3);
}

.feature-review__layout li {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-5);
  background: rgba(255, 255, 255, 0.08);
  font-size: var(--text-lg);
  font-weight: 800;
  line-height: 1.65;
}

.feature-related__heading {
  display: grid;
  gap: var(--spacing-4);
  max-width: 54rem;
  margin-block-end: clamp(2rem, 4vw, 3rem);
}

.feature-related__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-4);
}

.related-card {
  display: grid;
  gap: var(--spacing-4);
  min-height: 21rem;
  align-content: start;
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-6);
  color: inherit;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  transition: transform 220ms var(--reveal-easing), box-shadow 220ms var(--reveal-easing), border-color 220ms var(--reveal-easing);
}

.related-card span {
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 900;
}

.related-card h3 {
  color: var(--color-primary-dark);
  font-size: var(--text-2xl);
}

.related-card p {
  color: var(--color-text-secondary);
  line-height: 1.78;
}

.feature-final {
  padding-block-start: 0;
}

.feature-final__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--spacing-8);
  align-items: center;
  border-radius: var(--radius-4xl);
  padding: clamp(var(--spacing-8), 5vw, var(--spacing-16));
  color: var(--color-text-light);
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 107, 107, 0.18), transparent 19rem),
    linear-gradient(145deg, var(--feature-primary-dark) 0%, var(--feature-primary) 58%, #254c80 100%);
  box-shadow: var(--feature-shadow);
}

.feature-final__inner h2,
.feature-final__inner p {
  color: var(--color-text-light);
}

.feature-final__inner p {
  color: rgba(255, 255, 255, 0.84);
}

.feature-final__inner p {
  max-width: 68ch;
}

@media (hover: hover) {
  .feature-action:hover,
  .related-card:hover {
    transform: translateY(-4px);
  }

  .related-card:hover {
    border-color: rgba(27, 77, 92, 0.22);
    box-shadow: var(--shadow-lg);
  }
}

@media (max-width: 72rem) {
  .feature-detail__hero-grid,
  .feature-artifact__layout,
  .feature-story__layout,
  .feature-solution__layout,
  .feature-workflow__layout,
  .feature-review__layout,
  .feature-final__inner {
    grid-template-columns: 1fr;
  }

  .feature-story__index,
  .feature-artifact__copy,
  .feature-workflow__header {
    position: static;
  }

  .capability-list,
  .feature-related__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 48rem) {
  .feature-detail__hero h1,
  .feature-artifact__copy h2,
  .feature-story__copy h2,
  .feature-solution__copy h2,
  .feature-capabilities__heading h2,
  .feature-workflow__header h2,
  .feature-review__layout h2,
  .feature-related__heading h2,
  .feature-final__inner h2 {
    max-width: 100%;
  }

  .feature-detail__actions,
  .feature-detail__actions .feature-action,
  .feature-final__inner .feature-action {
    width: 100%;
  }

  .feature-console__signals,
  .capability-list,
  .feature-related__grid {
    grid-template-columns: 1fr;
  }

  .capability-list li,
  .related-card {
    min-height: 0;
  }

  .workflow-board li {
    grid-template-columns: 1fr;
  }

  .feature-solution__panel li {
    display: grid;
  }

  .product-artifact__table {
    gap: var(--spacing-3);
    padding: var(--spacing-4);
    overflow-x: visible;
  }

  .product-artifact__row {
    display: grid;
    grid-template-columns: 1fr;
    min-width: 0;
    border: 1px solid rgba(27, 77, 92, 0.1);
    border-radius: var(--radius-2xl);
    overflow: hidden;
  }

  .product-artifact__row--head {
    display: none;
  }

  .product-artifact__row span {
    grid-template-columns: minmax(7.5rem, 0.42fr) 1fr;
    gap: var(--spacing-3);
    min-height: 0;
    padding: var(--spacing-3) var(--spacing-4);
  }

  .product-artifact__row span::before {
    content: attr(data-label);
    color: var(--color-text-secondary);
    font-size: var(--text-sm);
    font-weight: 800;
  }

  .product-artifact__row span + span {
    border-block-start: 1px solid rgba(27, 77, 92, 0.08);
    border-inline-start: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .feature-action,
  .related-card {
    transition-duration: 0.01ms;
  }
}
</style>
