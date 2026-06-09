<template>
  <main :class="['solution-page', `solution-page--${solution.key}`]">
    <section class="solution-hero" aria-labelledby="solution-heading">
      <AppContainer wide>
        <div class="solution-hero__layout reveal-up">
          <div class="solution-hero__copy">
            <p class="solution-pill">{{ l(solution.eyebrow) }}</p>
            <h1 id="solution-heading">{{ l(solution.title) }}</h1>
            <p class="solution-hero__lead">{{ l(solution.summary) }}</p>
            <p class="solution-hero__note">{{ l(solution.heroNote) }}</p>
            <div class="solution-actions" :aria-label="locale === 'ar' ? 'إجراءات الحل' : 'Solution actions'">
              <NuxtLink class="solution-button solution-button--primary" :to="localePath('/request-demo')">
                {{ l(solution.cta) }}
              </NuxtLink>
              <NuxtLink class="solution-button solution-button--ghost" :to="localePath('/features')">
                {{ locale === 'ar' ? 'راجع المزايا المرتبطة' : 'Review related features' }}
              </NuxtLink>
            </div>
          </div>

          <SolutionArtifactPreview :solution="solution" :locale="locale" class="solution-hero__artifact" />
        </div>
      </AppContainer>
    </section>

    <section class="solution-section solution-section--pain" aria-labelledby="pain-heading">
      <AppContainer wide>
        <div class="solution-split">
          <div class="solution-section__intro reveal-up">
            <span class="solution-label">{{ locale === 'ar' ? 'نقاط الضغط' : 'Pain points' }}</span>
            <h2 id="pain-heading">{{ l(solution.painTitle) }}</h2>
            <p>{{ l(solution.painLead) }}</p>
          </div>
          <ul class="pain-stack" role="list">
            <li v-for="point in solution.painPoints" :key="point.en" class="pain-stack__item reveal-stagger">
              <span aria-hidden="true"></span>
              <p>{{ l(point) }}</p>
            </li>
          </ul>
        </div>
      </AppContainer>
    </section>

    <section class="solution-section solution-section--fit" aria-labelledby="fit-heading">
      <AppContainer wide>
        <div class="solution-fit reveal-up">
          <div>
            <span class="solution-label">Trackora</span>
            <h2 id="fit-heading">{{ l(solution.solutionTitle) }}</h2>
            <p>{{ l(solution.solutionLead) }}</p>
          </div>
          <ul role="list">
            <li v-for="point in solution.solutionPoints" :key="point.en">
              {{ l(point) }}
            </li>
          </ul>
        </div>
      </AppContainer>
    </section>

    <section class="solution-section solution-section--artifact" aria-labelledby="artifact-heading">
      <AppContainer wide>
        <div class="artifact-stage reveal-up">
          <div class="artifact-stage__heading">
            <span class="solution-label">{{ locale === 'ar' ? 'لقطة المنتج' : 'Product artifact' }}</span>
            <h2 id="artifact-heading">{{ l(solution.artifact.title) }}</h2>
            <p>{{ l(solution.artifact.text) }}</p>
          </div>

          <SolutionArtifactPreview :solution="solution" :locale="locale" expanded />
        </div>
      </AppContainer>
    </section>

    <section class="solution-section solution-section--workflow" aria-labelledby="workflow-heading">
      <AppContainer wide>
        <div class="workflow-layout">
          <div class="solution-section__intro reveal-up">
            <span class="solution-label">{{ locale === 'ar' ? 'سير العمل' : 'Workflow' }}</span>
            <h2 id="workflow-heading">{{ l(solution.workflowTitle) }}</h2>
            <p>{{ l(solution.workflowLead) }}</p>
          </div>
          <ol class="workflow-steps">
            <li v-for="(step, index) in solution.workflow" :key="step.title.en" class="workflow-step reveal-stagger">
              <span class="workflow-step__number">{{ locale === 'ar' ? formatArabic(index + 1) : index + 1 }}</span>
              <div>
                <h3>{{ l(step.title) }}</h3>
                <p>{{ l(step.text) }}</p>
              </div>
            </li>
          </ol>
        </div>
      </AppContainer>
    </section>

    <section class="solution-section solution-section--benefits" aria-labelledby="benefits-heading">
      <AppContainer wide>
        <div class="benefits-panel reveal-up">
          <div class="benefits-panel__copy">
            <span class="solution-label">{{ locale === 'ar' ? 'الفائدة العملية' : 'Operating benefits' }}</span>
            <h2 id="benefits-heading">{{ l(solution.benefitsTitle) }}</h2>
            <p>{{ l(solution.benefitsLead) }}</p>
          </div>
          <div class="benefits-list" role="list">
            <div v-for="benefit in solution.benefits" :key="benefit.en" class="benefits-list__item reveal-stagger" role="listitem">
              <span aria-hidden="true"></span>
              <p>{{ l(benefit) }}</p>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="solution-section solution-section--features" aria-labelledby="features-heading">
      <AppContainer wide>
        <div class="solution-section__intro solution-section__intro--wide reveal-up">
          <span class="solution-label">{{ locale === 'ar' ? 'مزايا مرتبطة' : 'Related features' }}</span>
          <h2 id="features-heading">{{ locale === 'ar' ? 'القدرات التي تجعل هذا الحل يعمل' : 'Capabilities that make this solution work' }}</h2>
        </div>
        <div class="related-feature-list">
          <NuxtLink v-for="feature in relatedFeatures" :key="feature.key" class="related-feature reveal-stagger" :to="localePath(feature.path)">
            <span>{{ locale === 'ar' ? feature.titleAr : feature.titleEn }}</span>
            <p>{{ locale === 'ar' ? feature.summaryAr : feature.summaryEn }}</p>
            <strong>{{ locale === 'ar' ? 'افتح الميزة' : 'Open feature' }}</strong>
          </NuxtLink>
        </div>
      </AppContainer>
    </section>

    <section class="solution-section solution-section--faq" aria-labelledby="faq-heading">
      <AppContainer wide>
        <div class="faq-layout">
          <div class="solution-section__intro reveal-up">
            <span class="solution-label">{{ locale === 'ar' ? 'أسئلة الفريق' : 'Team questions' }}</span>
            <h2 id="faq-heading">{{ locale === 'ar' ? 'أسئلة قبل العرض' : 'Questions before the demo' }}</h2>
          </div>
          <div class="faq-list">
            <details v-for="item in solution.faq" :key="item.question.en" class="faq-item reveal-stagger">
              <summary>{{ l(item.question) }}</summary>
              <p>{{ l(item.answer) }}</p>
            </details>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="solution-section solution-section--related" aria-labelledby="related-heading">
      <AppContainer wide>
        <div class="related-solutions reveal-up">
          <div>
            <span class="solution-label">{{ locale === 'ar' ? 'حلول أخرى' : 'Other solutions' }}</span>
            <h2 id="related-heading">{{ locale === 'ar' ? 'قارن حسب نوع الفريق' : 'Compare by team type' }}</h2>
          </div>
          <div class="related-solutions__links">
            <NuxtLink v-for="item in relatedSolutions" :key="item.key" :to="localePath(item.path)">
              <span>{{ l(item.eyebrow) }}</span>
              <strong>{{ l(item.title) }}</strong>
            </NuxtLink>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="solution-final" aria-labelledby="final-heading">
      <AppContainer narrow>
        <div class="solution-final__inner reveal-up">
          <span class="solution-label">{{ locale === 'ar' ? 'الخطوة التالية' : 'Next step' }}</span>
          <h2 id="final-heading">{{ l(solution.finalTitle) }}</h2>
          <p>{{ l(solution.finalText) }}</p>
          <NuxtLink class="solution-button solution-button--primary" :to="localePath('/request-demo')">
            {{ l(solution.cta) }}
          </NuxtLink>
        </div>
      </AppContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
import { features } from '~/data/features'
import { getLocalized, getSolutionDetail, solutions, type SolutionDetail } from '~/data/solutions'

const props = defineProps<{
  solutionKey: string
}>()

const { locale } = useI18n()
const localePath = useLocalePath()

const solution = computed(() => {
  const found = getSolutionDetail(props.solutionKey)

  if (!found) {
    throw createError({ statusCode: 404, statusMessage: 'Solution not found' })
  }

  return found
})

const relatedFeatures = computed(() => solution.value.relatedFeatureKeys
  .map(key => features.find(feature => feature.key === key))
  .filter(Boolean))

const relatedSolutions = computed(() => solution.value.relatedSolutionKeys
  .map(key => solutions.find(item => item.key === key))
  .filter(Boolean) as SolutionDetail[])

function l(text: { ar: string, en: string }) {
  return getLocalized(text, locale.value)
}

function formatArabic(value: number) {
  return new Intl.NumberFormat('ar-EG').format(value)
}

useScrollReveal()

useHead(() => ({
  title: l(solution.value.seoTitle),
  htmlAttrs: { lang: locale.value, dir: locale.value === 'ar' ? 'rtl' : 'ltr' },
  meta: [
    { name: 'description', content: l(solution.value.seoDescription) },
    { property: 'og:title', content: l(solution.value.seoTitle) },
    { property: 'og:description', content: l(solution.value.seoDescription) },
  ],
}))
</script>

<style scoped>
.solution-page {
    --trackora-primary: #1A3B66;

  --solution-accent: var(--color-accent);
  --solution-accent-soft: var(--color-accent-light);
  --solution-hero-start: #0b2933;
  --solution-hero-mid: var(--color-primary-dark);
  --solution-hero-end: var(--color-primary);
  color: var(--color-text);
  background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-alt) 48%, var(--color-bg) 100%);
  overflow: hidden;
}

.solution-hero,
.solution-final {
  position: relative;
  color: var(--color-text-light);
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 107, 107, 0.18), transparent 19rem),
    linear-gradient(145deg, #0A1D34 0%, var(--trackora-primary) 48%, #254C80 100%);}

.solution-hero {
  isolation: isolate;
  padding-block: clamp(5rem, 10vw, 8.5rem);
}

.solution-hero::after {
  content: '';
  position: absolute;
  inset: auto -10rem -12rem -10rem;
  z-index: -1;
  height: 18rem;
  border-radius: 50% 50% 0 0;
  background: var(--color-bg);
}

.solution-hero__layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(22rem, 1.1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.solution-hero__copy {
  display: grid;
  gap: var(--spacing-5);
}

.solution-pill,
.solution-label {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  border-radius: var(--radius-full);
  padding: 0.42rem 0.85rem;
  font-size: var(--text-sm);
  font-weight: 900;
  line-height: 1.35;
}

.solution-pill {
  color: rgba(255, 255, 255, 0.84);
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.08);
}

.solution-label {
  color: var(--color-primary);
  background: rgba(45, 110, 125, 0.08);
}

.solution-hero h1,
.solution-section h2,
.solution-final h2 {
  text-wrap: balance;
}

.solution-hero h1 {
  max-width: 13ch;
  color: var(--color-text-light);
  font-size: clamp(2.7rem, 7vw, 5.8rem);
  line-height: 1.08;
  letter-spacing: -0.035em;
}

html[lang='ar'] .solution-hero h1 {
  letter-spacing: -0.012em;
}

.solution-hero__lead,
.solution-hero__note {
  max-width: 70ch;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.9;
  text-wrap: pretty;
}

.solution-hero__lead {
  font-size: clamp(1.08rem, 1.7vw, 1.32rem);
}

.solution-hero__note {
  border-radius: var(--radius-2xl);
  padding: var(--spacing-5);
  color: rgba(255, 255, 255, 0.76);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.solution-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
}

.solution-button {
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  padding: 0.85rem 1.3rem;
  font-weight: 900;
  line-height: 1.35;
  text-align: center;
  transition: transform 220ms var(--reveal-easing), box-shadow 220ms var(--reveal-easing), background-color 220ms var(--reveal-easing), border-color 220ms var(--reveal-easing);
}

.solution-button--primary {
  color: var(--color-accent-contrast);
  background: var(--color-accent);
  box-shadow: 0 18px 38px rgba(232, 168, 56, 0.28);
}

.solution-button--ghost {
  color: var(--color-text-light);
  border-color: rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.08);
}

.solution-button:focus-visible,
.related-feature:focus-visible,
.related-solutions a:focus-visible,
.faq-item summary:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}

.solution-section {
  padding-block: clamp(4.5rem, 9vw, 8rem);
}

.solution-section--fit,
.solution-section--workflow,
.solution-section--faq {
  background: var(--color-bg-alt);
}

.solution-split,
.workflow-layout,
.faq-layout {
  display: grid;
  grid-template-columns: minmax(16rem, 0.45fr) minmax(0, 1fr);
  gap: clamp(var(--spacing-8), 6vw, var(--spacing-16));
  align-items: start;
}

.solution-section__intro {
  position: sticky;
  top: 6rem;
  display: grid;
  gap: var(--spacing-4);
}

.solution-section__intro--wide {
  position: static;
  max-width: 62rem;
  margin-block-end: clamp(var(--spacing-8), 5vw, var(--spacing-12));
}

.solution-section__intro h2,
.solution-fit h2,
.artifact-stage__heading h2,
.benefits-panel h2,
.related-solutions h2,
.solution-final h2 {
  color: var(--color-primary-dark);
  font-size: clamp(2.1rem, 5vw, 4.2rem);
  line-height: 1.12;
  letter-spacing: -0.035em;
}

html[lang='ar'] .solution-section__intro h2,
html[lang='ar'] .solution-fit h2,
html[lang='ar'] .artifact-stage__heading h2,
html[lang='ar'] .benefits-panel h2,
html[lang='ar'] .related-solutions h2,
html[lang='ar'] .solution-final h2 {
  letter-spacing: -0.012em;
}

.solution-section__intro p,
.solution-fit p,
.artifact-stage__heading p,
.benefits-panel__copy p,
.solution-final p {
  max-width: 72ch;
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
  line-height: 1.85;
  text-wrap: pretty;
}

.pain-stack,
.workflow-steps,
.faq-list {
  display: grid;
  gap: var(--spacing-4);
}

.pain-stack__item,
.workflow-step {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-5);
  align-items: start;
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-3xl);
  padding: clamp(var(--spacing-5), 3vw, var(--spacing-7, 1.75rem));
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.pain-stack__item > span,
.benefits-list__item > span {
  width: 0.85rem;
  height: 0.85rem;
  margin-block-start: 0.55rem;
  border-radius: var(--radius-full);
  background: var(--solution-accent);
  box-shadow: 0 0 0 0.35rem var(--solution-accent-soft);
}

.pain-stack__item p,
.workflow-step p,
.benefits-list__item p {
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
  line-height: 1.75;
}

.solution-fit,
.artifact-stage,
.benefits-panel,
.related-solutions {
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-4xl);
  padding: clamp(var(--spacing-6), 5vw, var(--spacing-12));
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.solution-fit {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(18rem, 0.75fr);
  gap: clamp(var(--spacing-8), 5vw, var(--spacing-12));
  align-items: start;
}

.solution-fit div,
.artifact-stage__heading,
.benefits-panel__copy,
.related-solutions > div:first-child {
  display: grid;
  gap: var(--spacing-4);
}

.solution-fit ul {
  display: grid;
  gap: var(--spacing-3);
}

.solution-fit li {
  border-radius: var(--radius-2xl);
  padding: var(--spacing-4) var(--spacing-5);
  color: var(--color-primary-dark);
  background: rgba(45, 110, 125, 0.07);
  font-weight: 800;
  line-height: 1.65;
}

.artifact-stage {
  display: grid;
  gap: clamp(var(--spacing-8), 5vw, var(--spacing-12));
  background:
    radial-gradient(circle at 0% 8%, rgba(232, 168, 56, 0.1), transparent 22rem),
    var(--color-surface);
}

.workflow-step__number {
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border-radius: var(--radius-full);
  color: var(--color-text-on-primary);
  background: var(--color-primary);
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}

.workflow-step h3 {
  margin-block-end: var(--spacing-2);
  color: var(--color-primary-dark);
  font-size: var(--text-xl);
}

.benefits-panel {
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(0, 1fr);
  gap: clamp(var(--spacing-8), 5vw, var(--spacing-12));
  align-items: start;
}

.benefits-list {
  display: grid;
  gap: 1px;
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-3xl);
  background: rgba(27, 77, 92, 0.1);
  overflow: hidden;
}

.benefits-list__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-4);
  padding: var(--spacing-5);
  background: var(--color-surface);
}

.related-feature-list {
  display: grid;
  gap: var(--spacing-3);
}

.related-feature {
  display: grid;
  grid-template-columns: minmax(12rem, 0.3fr) minmax(0, 1fr) auto;
  gap: var(--spacing-5);
  align-items: center;
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-5);
  color: inherit;
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition: transform 220ms var(--reveal-easing), border-color 220ms var(--reveal-easing), box-shadow 220ms var(--reveal-easing);
}

.related-feature span,
.related-feature strong {
  color: var(--color-primary);
  font-weight: 900;
}

.related-feature p {
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.faq-item {
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.faq-item summary {
  min-height: 3.25rem;
  cursor: pointer;
  padding: var(--spacing-5);
  color: var(--color-primary-dark);
  font-weight: 900;
}

.faq-item p {
  padding: 0 var(--spacing-5) var(--spacing-5);
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.related-solutions {
  display: grid;
  grid-template-columns: minmax(0, 0.62fr) minmax(0, 1fr);
  gap: clamp(var(--spacing-8), 5vw, var(--spacing-12));
}

.related-solutions__links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-4);
}

.related-solutions a {
  display: grid;
  gap: var(--spacing-3);
  min-height: 12rem;
  align-content: space-between;
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-5);
  color: inherit;
  background: rgba(45, 110, 125, 0.05);
  transition: transform 220ms var(--reveal-easing), background-color 220ms var(--reveal-easing);
}

.related-solutions a span {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 800;
}

.related-solutions a strong {
  color: var(--color-primary-dark);
  font-size: var(--text-xl);
  line-height: 1.35;
}

.solution-final {
  padding-block: clamp(4.5rem, 9vw, 8rem);
}

.solution-final__inner {
  display: grid;
  justify-items: center;
  gap: var(--spacing-5);
  text-align: center;
}

.solution-final .solution-label {
  color: var(--color-accent-light);
  background: rgba(255, 255, 255, 0.1);
}

.solution-final h2 {
  max-width: 13ch;
  color: var(--color-text-light);
}

.solution-final p {
  color: rgba(255, 255, 255, 0.82);
}

@media (hover: hover) {
  .solution-button:hover,
  .related-feature:hover,
  .related-solutions a:hover {
    transform: translateY(-3px);
  }

  .related-feature:hover {
    border-color: rgba(27, 77, 92, 0.22);
    box-shadow: var(--shadow-md);
  }

  .related-solutions a:hover {
    background: rgba(45, 110, 125, 0.09);
  }
}

@media (max-width: 72rem) {
  .solution-hero__layout,
  .solution-split,
  .solution-fit,
  .workflow-layout,
  .benefits-panel,
  .faq-layout,
  .related-solutions {
    grid-template-columns: 1fr;
  }

  .solution-section__intro {
    position: static;
  }
}

@media (max-width: 52rem) {
  .solution-hero h1,
  .solution-section__intro h2,
  .solution-fit h2,
  .artifact-stage__heading h2,
  .benefits-panel h2,
  .solution-final h2 {
    max-width: 100%;
  }

  .solution-actions,
  .solution-actions .solution-button,
  .solution-final .solution-button {
    width: 100%;
  }

  .related-feature,
  .pain-stack__item,
  .workflow-step,
  .benefits-list__item,
  .related-solutions__links {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .solution-button,
  .related-feature,
  .related-solutions a {
    transition-duration: 0.01ms;
  }
}
</style>
