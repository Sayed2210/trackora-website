<template>
  <div>
    <section class="feature-hero section section--dark" aria-labelledby="feature-heading">
      <AppContainer narrow>
        <div class="feature-hero__inner">
          <span class="feature-hero__icon" aria-hidden="true">{{ feature.icon }}</span>
          <h1 id="feature-heading" class="feature-hero__title">{{ locale === 'ar' ? feature.titleAr : feature.titleEn }}</h1>
          <p class="feature-hero__subtitle">{{ locale === 'ar' ? feature.summaryAr : feature.summaryEn }}</p>
          <div class="feature-hero__actions">
            <AppButton to="/request-demo" variant="primary">{{ t('nav.requestDemo') }}</AppButton>
            <AppButton to="/features" variant="secondary">{{ t('common.viewAll') }}</AppButton>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="feature-problem section" aria-labelledby="feature-problem-heading">
      <AppContainer narrow>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'المشكلة' : 'The Problem'"
          :title="locale === 'ar' ? 'التحدي' : 'The Challenge'"
        />
        <p class="feature-problem__text">{{ locale === 'ar' ? feature.problemAr : feature.problemEn }}</p>
      </AppContainer>
    </section>

    <section class="feature-solution section section--alt" aria-labelledby="feature-solution-heading">
      <AppContainer narrow>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'الحل' : 'The Solution'"
          :title="locale === 'ar' ? 'كيف يحلّ تراكورا المشكلة' : 'How Trackora Solves It'"
        />
        <p class="feature-solution__text">{{ locale === 'ar' ? feature.solutionAr : feature.solutionEn }}</p>
      </AppContainer>
    </section>

    <section class="feature-benefits section" aria-labelledby="feature-benefits-heading">
      <AppContainer>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'الفوائد' : 'Benefits'"
          :title="locale === 'ar' ? 'ماذا تستفيد؟' : 'What You Get'"
        />
        <ul class="feature-benefits__list" id="feature-benefits-heading" aria-hidden="true" style="display:none"></ul>
        <ul class="feature-benefits__list" role="list">
          <li v-for="(benefit, i) in (locale === 'ar' ? feature.benefitsAr : feature.benefitsEn)" :key="i" class="feature-benefits__item">
            <span class="feature-benefits__check" aria-hidden="true">✓</span>
            <span>{{ benefit }}</span>
          </li>
        </ul>
      </AppContainer>
    </section>

    <section class="feature-workflow section section--alt" aria-labelledby="feature-workflow-heading">
      <AppContainer narrow>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'كيف يعمل' : 'How it works'"
          :title="locale === 'ar' ? 'خطوات العمل' : 'Workflow'"
        />
        <ol class="feature-workflow__steps">
          <li v-for="(step, i) in (locale === 'ar' ? feature.workflowAr : feature.workflowEn)" :key="i" class="feature-workflow__step">
            <span class="feature-workflow__number">{{ i + 1 }}</span>
            <span class="feature-workflow__text">{{ step }}</span>
          </li>
        </ol>
      </AppContainer>
    </section>

    <section v-if="relatedFeatures.length" class="feature-related section" aria-labelledby="feature-related-heading">
      <AppContainer>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'مزايا ذات صلة' : 'Related Features'"
          :title="locale === 'ar' ? 'قد يعجبك أيضاً' : 'You May Also Like'"
          id="feature-related-heading"
        />
        <div class="feature-related__grid">
          <AppCard v-for="related in relatedFeatures" :key="related.key" variant="bordered">
            <div class="feature-related__icon" aria-hidden="true">{{ related.icon }}</div>
            <h3 class="feature-related__title">{{ locale === 'ar' ? related.titleAr : related.titleEn }}</h3>
            <p class="feature-related__text">{{ locale === 'ar' ? related.summaryAr : related.summaryEn }}</p>
            <NuxtLink :to="localePath(related.path)" class="feature-related__link">
              {{ t('common.learnMore') }} →
            </NuxtLink>
          </AppCard>
        </div>
      </AppContainer>
    </section>

    <section class="feature-cta section section--dark" aria-labelledby="feature-cta-heading">
      <AppContainer narrow>
        <div class="feature-cta__inner">
          <h2 id="feature-cta-heading" class="feature-cta__title">{{ locale === 'ar' ? 'جاهز لتبدأ؟' : 'Ready to start?' }}</h2>
          <p class="feature-cta__text">{{ locale === 'ar' ? 'جرب تراكورا واكتشف كيف يمكن لهذه الميزة أن تحسّن عملياتك.' : 'Try Trackora and discover how this feature can improve your operations.' }}</p>
          <AppButton to="/request-demo" variant="primary">{{ t('nav.requestDemo') }}</AppButton>
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
.feature-hero__inner {
  text-align: center;
}

.feature-hero__icon {
  font-size: var(--text-5xl);
  display: block;
  margin-block-end: var(--spacing-6);
}

.feature-hero__title {
  font-size: var(--text-4xl);
  font-weight: 800;
  color: var(--color-text-light);
  margin-block-end: var(--spacing-4);
}

.feature-hero__subtitle {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin-block-end: var(--spacing-8);
  max-width: 40rem;
  margin-inline: auto;
}

.feature-hero__actions {
  display: flex;
  gap: var(--spacing-4);
  justify-content: center;
  flex-wrap: wrap;
}

.feature-problem__text {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.8;
  text-align: center;
  max-width: 40rem;
  margin-inline: auto;
}

.feature-solution__text {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.8;
  text-align: center;
  max-width: 40rem;
  margin-inline: auto;
}

.feature-benefits__list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: var(--spacing-4);
}

.feature-benefits__item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.feature-benefits__check {
  flex-shrink: 0;
  color: var(--color-success);
  font-weight: 700;
  font-size: var(--text-lg);
}

.feature-workflow__steps {
  list-style: none;
  counter-reset: workflow;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.feature-workflow__step {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-4);
}

.feature-workflow__number {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  color: var(--color-text-light);
  font-size: var(--text-base);
  font-weight: 700;
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
  gap: var(--spacing-8);
}

.feature-related__icon {
  font-size: var(--text-4xl);
  margin-block-end: var(--spacing-4);
  text-align: center;
}

.feature-related__title {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-block-end: var(--spacing-3);
  text-align: center;
}

.feature-related__text {
  color: var(--color-text-secondary);
  text-align: center;
  line-height: 1.7;
  margin-block-end: var(--spacing-4);
}

.feature-related__link {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.2s;
}

.feature-related__link:hover {
  color: var(--color-primary-light);
}

.feature-cta__inner {
  text-align: center;
}

.feature-cta__title {
  font-size: var(--text-4xl);
  font-weight: 800;
  color: var(--color-text-light);
  margin-block-end: var(--spacing-4);
}

.feature-cta__text {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  margin-block-end: var(--spacing-8);
  line-height: 1.7;
}

@media (max-width: 36rem) {
  .feature-hero__title { font-size: var(--text-3xl); }
  .feature-hero__actions { flex-direction: column; align-items: center; }
}
</style>