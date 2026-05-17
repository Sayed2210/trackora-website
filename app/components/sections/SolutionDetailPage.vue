<template>
  <div>
    <section class="solution-hero section section--dark" aria-labelledby="solution-heading">
      <AppContainer narrow>
        <div class="solution-hero__inner">
          <span class="solution-hero__icon" aria-hidden="true">{{ solution.icon }}</span>
          <p class="solution-hero__audience">{{ locale === 'ar' ? solution.audienceAr : solution.audienceEn }}</p>
          <h1 id="solution-heading" class="solution-hero__title">{{ locale === 'ar' ? solution.titleAr : solution.titleEn }}</h1>
          <p class="solution-hero__subtitle">{{ locale === 'ar' ? solution.summaryAr : solution.summaryEn }}</p>
          <div class="solution-hero__actions">
            <AppButton to="/request-demo" variant="primary">{{ t('nav.requestDemo') }}</AppButton>
            <AppButton to="/features" variant="secondary">{{ t('common.learnMore') }}</AppButton>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="solution-pain section" aria-labelledby="solution-pain-heading">
      <AppContainer narrow>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'التحديات' : 'Challenges'"
          :title="locale === 'ar' ? 'ما الذي يواجهك؟' : 'What are you facing?'"
        />
        <ul class="solution-pain__list" role="list">
          <li v-for="(point, i) in (locale === 'ar' ? solution.painPointsAr : solution.painPointsEn)" :key="i" class="solution-pain__item">
            <span class="solution-pain__marker" aria-hidden="true">✗</span>
            <span>{{ point }}</span>
          </li>
        </ul>
      </AppContainer>
    </section>

    <section class="solution-solve section section--alt" aria-labelledby="solution-solve-heading">
      <AppContainer narrow>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'الحل' : 'The Solution'"
          :title="locale === 'ar' ? 'كيف يساعدك تراكورا' : 'How Trackora helps'"
        />
        <p class="solution-solve__text">{{ locale === 'ar' ? solution.solutionAr : solution.solutionEn }}</p>
      </AppContainer>
    </section>

    <section class="solution-benefits section" aria-labelledby="solution-benefits-heading">
      <AppContainer>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'الفوائد' : 'Benefits'"
          :title="locale === 'ar' ? 'ماذا تستفيد؟' : 'What you get'"
        />
        <ul class="solution-benefits__list" role="list">
          <li v-for="(benefit, i) in (locale === 'ar' ? solution.benefitsAr : solution.benefitsEn)" :key="i" class="solution-benefits__item">
            <span class="solution-benefits__check" aria-hidden="true">✓</span>
            <span>{{ benefit }}</span>
          </li>
        </ul>
      </AppContainer>
    </section>

    <section class="solution-workflow section section--alt" aria-labelledby="solution-workflow-heading">
      <AppContainer narrow>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'كيف يعمل' : 'How it works'"
          :title="locale === 'ar' ? 'خطوات العمل' : 'Workflow'"
        />
        <ol class="solution-workflow__steps">
          <li v-for="(step, i) in (locale === 'ar' ? solution.workflowAr : solution.workflowEn)" :key="i" class="solution-workflow__step">
            <span class="solution-workflow__number">{{ i + 1 }}</span>
            <span class="solution-workflow__text">{{ step }}</span>
          </li>
        </ol>
      </AppContainer>
    </section>

    <section v-if="relatedFeatures.length" class="solution-features section" aria-labelledby="solution-features-heading">
      <AppContainer>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'مزايا ذات صلة' : 'Related Features'"
          :title="locale === 'ar' ? 'مزايا تساعدك' : 'Features that help'"
        />
        <div class="solution-features__grid">
          <NuxtLink v-for="feature in relatedFeatures" :key="feature.key" :to="localePath(feature.path)" class="solution-features__card">
            <span class="solution-features__icon" aria-hidden="true">{{ feature.icon }}</span>
            <h3 class="solution-features__title">{{ locale === 'ar' ? feature.titleAr : feature.titleEn }}</h3>
            <p class="solution-features__text">{{ locale === 'ar' ? feature.summaryAr : feature.summaryEn }}</p>
            <span class="solution-features__link">{{ locale === 'ar' ? 'تعرّف أكثر ←' : 'Learn more →' }}</span>
          </NuxtLink>
        </div>
      </AppContainer>
    </section>

    <section v-if="relatedSolutions.length" class="solution-related section" aria-labelledby="solution-related-heading">
      <AppContainer>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'حلول أخرى' : 'Other solutions'"
          :title="locale === 'ar' ? 'قد يعجبك أيضاً' : 'You may also like'"
        />
        <div class="solution-related__grid">
          <NuxtLink v-for="sol in relatedSolutions" :key="sol.key" :to="localePath(sol.path)" class="solution-related__card">
            <span class="solution-related__icon" aria-hidden="true">{{ sol.icon }}</span>
            <h3 class="solution-related__title">{{ locale === 'ar' ? sol.titleAr : sol.titleEn }}</h3>
            <p class="solution-related__text">{{ locale === 'ar' ? sol.summaryAr : sol.summaryEn }}</p>
            <span class="solution-related__link">{{ locale === 'ar' ? 'تعرّف أكثر ←' : 'Learn more →' }}</span>
          </NuxtLink>
        </div>
      </AppContainer>
    </section>

    <section class="solution-cta section section--dark" aria-labelledby="solution-cta-heading">
      <AppContainer narrow>
        <div class="solution-cta__inner">
          <h2 id="solution-cta-heading" class="solution-cta__title">{{ locale === 'ar' ? 'ابدأ اليوم' : 'Start today' }}</h2>
          <p class="solution-cta__text">{{ locale === 'ar' ? 'اكتشف كيف يمكن لتراكورا أن يحسّن عملياتك.' : 'Discover how Trackora can improve your operations.' }}</p>
          <AppButton to="/request-demo" variant="primary">{{ t('nav.requestDemo') }}</AppButton>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { solutions, type SolutionDetail } from '~/data/solutions'
import { features, type FeatureDetail } from '~/data/features'

const props = defineProps<{
  solutionKey: string
}>()

const { t } = useI18n()
const locale = useI18n().locale
const localePath = useLocalePath()

const solution = computed(() => solutions.find(s => s.key === props.solutionKey) as SolutionDetail)

const relatedFeatures = computed(() =>
  solution.value.relatedFeatureKeys
    .map(key => features.find(f => f.key === key))
    .filter(Boolean) as FeatureDetail[]
)

const relatedSolutions = computed(() =>
  solution.value.relatedSolutionKeys
    .map(key => solutions.find(s => s.key === key))
    .filter(Boolean) as SolutionDetail[]
)

useHead({
  title: locale.value === 'ar' ? solution.value.seoTitleAr : solution.value.seoTitleEn,
  meta: [
    { name: 'description', content: locale.value === 'ar' ? solution.value.seoDescriptionAr : solution.value.seoDescriptionEn },
    { property: 'og:title', content: locale.value === 'ar' ? solution.value.seoTitleAr : solution.value.seoTitleEn },
    { property: 'og:description', content: locale.value === 'ar' ? solution.value.seoDescriptionAr : solution.value.seoDescriptionEn },
  ],
  htmlAttrs: { lang: locale.value, dir: locale.value === 'ar' ? 'rtl' : 'ltr' },
})
</script>

<style scoped>
.solution-hero__inner {
  text-align: center;
}

.solution-hero__icon {
  font-size: var(--text-5xl);
  display: block;
  margin-block-end: var(--spacing-4);
}

.solution-hero__audience {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-block-end: var(--spacing-2);
}

.solution-hero__title {
  font-size: var(--text-4xl);
  font-weight: 800;
  color: var(--color-text-light);
  margin-block-end: var(--spacing-4);
}

.solution-hero__subtitle {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  max-width: 40rem;
  margin-inline: auto;
  margin-block-end: var(--spacing-8);
}

.solution-hero__actions {
  display: flex;
  gap: var(--spacing-4);
  justify-content: center;
  flex-wrap: wrap;
}

.solution-pain__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  max-width: 40rem;
  margin-inline: auto;
}

.solution-pain__item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.solution-pain__marker {
  flex-shrink: 0;
  color: var(--color-error);
  font-weight: 700;
  font-size: var(--text-lg);
}

.solution-solve__text {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.8;
  text-align: center;
  max-width: 40rem;
  margin-inline: auto;
}

.solution-benefits__list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: var(--spacing-4);
}

.solution-benefits__item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  line-height: 1.7;
}

.solution-benefits__check {
  flex-shrink: 0;
  color: var(--color-success);
  font-weight: 700;
  font-size: var(--text-lg);
}

.solution-workflow__steps {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.solution-workflow__step {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-4);
}

.solution-workflow__number {
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

.solution-workflow__text {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.7;
  padding-block: var(--spacing-1);
}

.solution-features__grid,
.solution-related__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: var(--spacing-8);
}

.solution-features__card,
.solution-related__card {
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

.solution-features__card:hover,
.solution-related__card:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-light);
}

.solution-features__icon,
.solution-related__icon {
  font-size: var(--text-4xl);
  margin-block-end: var(--spacing-4);
}

.solution-features__title,
.solution-related__title {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-block-end: var(--spacing-3);
}

.solution-features__text,
.solution-related__text {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-block-end: var(--spacing-4);
  flex-grow: 1;
}

.solution-features__link,
.solution-related__link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
}

.solution-cta__inner {
  text-align: center;
}

.solution-cta__title {
  font-size: var(--text-4xl);
  font-weight: 800;
  color: var(--color-text-light);
  margin-block-end: var(--spacing-4);
}

.solution-cta__text {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  margin-block-end: var(--spacing-8);
  line-height: 1.7;
}

@media (max-width: 36rem) {
  .solution-hero__title { font-size: var(--text-3xl); }
  .solution-hero__actions { flex-direction: column; align-items: center; }
}
</style>