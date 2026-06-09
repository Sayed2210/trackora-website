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
            </div>
          </div>

          <SolutionArtifactPreview :solution="solution" :locale="locale" class="solution-hero__artifact" />
        </div>
      </AppContainer>
    </section>

    <section class="solution-skim" aria-labelledby="skim-heading">
      <AppContainer wide>
        <div class="solution-skim__inner reveal-up">
          <h2 id="skim-heading">{{ locale === 'ar' ? 'اقرأ الصفحة في ٣٠ ثانية' : 'Read the page in 30 seconds' }}</h2>
          <ul role="list" class="skim-list">
            <li v-for="point in solution.skimPoints" :key="point.en">
              <span aria-hidden="true"></span>
              <p>{{ l(point) }}</p>
            </li>
          </ul>
        </div>
      </AppContainer>
    </section>

    <section class="solution-section solution-section--proof" aria-labelledby="proof-heading">
      <AppContainer wide>
        <div class="proof-stage reveal-up">
          <div class="proof-stage__copy">
            <h2 id="proof-heading">{{ l(solution.solutionTitle) }}</h2>
            <p>{{ l(solution.solutionLead) }}</p>
            <ul role="list" class="proof-list">
              <li v-for="point in solution.solutionPoints" :key="point.en">{{ l(point) }}</li>
            </ul>
          </div>

          <SolutionArtifactPreview :solution="solution" :locale="locale" expanded />
        </div>
      </AppContainer>
    </section>

    <section class="solution-section solution-section--operating" aria-labelledby="workflow-heading">
      <AppContainer wide>
        <div class="operating-panel reveal-up">
          <div class="operating-panel__heading">
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
          <div class="benefits-strip" role="list" :aria-label="l(solution.benefitsTitle)">
            <div v-for="benefit in solution.benefits" :key="benefit.en" class="benefits-strip__item reveal-stagger" role="listitem">
              <span aria-hidden="true"></span>
              <p>{{ l(benefit) }}</p>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="solution-final" aria-labelledby="final-heading">
      <AppContainer wide>
        <div class="solution-final__inner reveal-up">
          <div class="solution-final__copy">
            <h2 id="final-heading">{{ l(solution.finalTitle) }}</h2>
            <p>{{ l(solution.finalText) }}</p>
            <NuxtLink class="solution-button solution-button--primary" :to="localePath('/request-demo')">
              {{ l(solution.cta) }}
            </NuxtLink>
          </div>
          <div class="solution-final__adoption">
            <h3>{{ locale === 'ar' ? 'ما نحسمه في العرض' : 'What the demo resolves' }}</h3>
            <div class="adoption-list" :aria-label="locale === 'ar' ? 'أسئلة التطبيق' : 'Adoption questions'">
              <details v-for="item in solution.adoptionFaq" :key="item.question.en" class="faq-item reveal-stagger">
                <summary>{{ l(item.question) }}</summary>
                <p>{{ l(item.answer) }}</p>
              </details>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
import { getLocalized, getSolutionDetail } from '~/data/solutions'

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
  padding-block: clamp(4.75rem, 9vw, 7.75rem) clamp(4rem, 7vw, 6.5rem);
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

.solution-hero__layout,
.proof-stage,
.operating-panel,
.solution-final__inner {
  display: grid;
  gap: clamp(var(--spacing-8), 5vw, var(--spacing-14, 3.5rem));
}

.solution-hero__layout {
  position: relative;
  z-index: 1;
  grid-template-columns: minmax(0, 0.86fr) minmax(22rem, 1.14fr);
  align-items: center;
}

.solution-hero__copy,
.proof-stage__copy,
.operating-panel__heading,
.solution-final__copy {
  display: grid;
  gap: var(--spacing-5);
}

.solution-pill {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-full);
  padding: 0.42rem 0.85rem;
  color: rgba(255, 255, 255, 0.88);
  background: rgba(255, 255, 255, 0.08);
  font-size: var(--text-sm);
  font-weight: 900;
  line-height: 1.35;
}

.solution-hero h1,
.solution-skim h2,
.solution-section h2,
.solution-final h2 {
  text-wrap: balance;
}

.solution-hero h1 {
  max-width: 13ch;
  color: var(--color-text-light);
  font-size: clamp(2.65rem, 7vw, 5.65rem);
  line-height: 1.08;
  letter-spacing: -0.035em;
}

html[lang='ar'] .solution-hero h1,
html[lang='ar'] .solution-skim h2,
html[lang='ar'] .solution-section h2,
html[lang='ar'] .solution-final h2 {
  letter-spacing: -0.012em;
}

.solution-hero__lead,
.solution-hero__note,
.proof-stage__copy p,
.operating-panel__heading p,
.solution-final__copy p {
  max-width: 72ch;
  line-height: 1.85;
  text-wrap: pretty;
}

.solution-hero__lead {
  color: rgba(255, 255, 255, 0.86);
  font-size: clamp(1.08rem, 1.7vw, 1.32rem);
}

.solution-hero__note {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-5);
  color: rgba(255, 255, 255, 0.82);
  background: rgba(255, 255, 255, 0.08);
}

.solution-button {
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  padding: 0.85rem 1.45rem;
  color: var(--solution-accent-contrast);
  background: var(--solution-accent);
  box-shadow: 0 18px 38px rgba(232, 168, 56, 0.28);
  font-weight: 900;
  line-height: 1.35;
  text-align: center;
  transition: transform 220ms var(--reveal-easing), box-shadow 220ms var(--reveal-easing), background-color 220ms var(--reveal-easing);
}

.solution-button:focus-visible,
.faq-item summary:focus-visible {
  outline: 3px solid var(--solution-accent);
  outline-offset: 3px;
}

.solution-skim {
  position: relative;
  z-index: 2;
  margin-block-start: calc(var(--spacing-12) * -1);
}

.solution-skim__inner {
  display: grid;
  grid-template-columns: minmax(12rem, 0.32fr) 1fr;
  gap: clamp(var(--spacing-5), 4vw, var(--spacing-8));
  align-items: stretch;
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-4xl);
  padding: clamp(var(--spacing-5), 4vw, var(--spacing-8));
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
}

.solution-skim h2,
.proof-stage h2,
.operating-panel h2,
.solution-final h2 {
  color: var(--trackora-primary-strong);
  font-size: clamp(2rem, 4.5vw, 3.7rem);
  line-height: 1.12;
}

.skim-list,
.proof-list,
.workflow-steps,
.benefits-strip,
.adoption-list {
  display: grid;
  gap: var(--spacing-3);
}

.skim-list {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.skim-list li,
.benefits-strip__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-3);
  align-items: start;
}

.skim-list li {
  border-radius: var(--radius-2xl);
  padding: var(--spacing-4);
  background: var(--trackora-primary-soft);
}

.skim-list span,
.benefits-strip__item span {
  width: 0.75rem;
  height: 0.75rem;
  margin-block-start: 0.55rem;
  border-radius: var(--radius-full);
  background: var(--solution-accent);
  box-shadow: 0 0 0 0.28rem var(--solution-accent-soft);
}

.skim-list p,
.benefits-strip__item p,
.workflow-step p,
.proof-stage__copy p,
.operating-panel__heading p {
  color: var(--color-text-secondary);
  line-height: 1.75;
}

.solution-section {
  padding-block: clamp(4rem, 8vw, 7rem);
}

.solution-section--operating {
  background: var(--color-bg-alt);
}

.proof-stage,
.operating-panel {
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-4xl);
  padding: clamp(var(--spacing-6), 5vw, var(--spacing-12));
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.proof-stage {
  grid-template-columns: minmax(0, 0.46fr) minmax(0, 1fr);
  align-items: start;
  background:
    radial-gradient(circle at 0% 8%, rgba(232, 168, 56, 0.12), transparent 22rem),
    var(--color-surface);
}

.proof-list {
  margin-block-start: var(--spacing-2);
}

.proof-list li {
  border-block-start: 1px solid rgba(27, 77, 92, 0.12);
  padding-block: var(--spacing-4);
  color: var(--trackora-primary-strong);
  font-weight: 800;
  line-height: 1.65;
}

.operating-panel {
  grid-template-columns: minmax(0, 0.36fr) minmax(0, 0.64fr);
}

.workflow-step {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-4);
  align-items: start;
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-5);
  background: var(--color-surface);
}

.workflow-step__number {
  display: grid;
  width: 2.8rem;
  height: 2.8rem;
  place-items: center;
  border-radius: var(--radius-full);
  color: var(--color-text-on-primary);
  background: var(--trackora-primary);
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}

.workflow-step h3 {
  margin-block-end: var(--spacing-2);
  color: var(--trackora-primary-strong);
  font-size: var(--text-xl);
}

.benefits-strip {
  grid-column: 1 / -1;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-block-start: 1px solid rgba(27, 77, 92, 0.1);
  padding-block-start: var(--spacing-6);
}

.benefits-strip__item {
  min-height: 100%;
}

.solution-final {
  padding-block: clamp(4.5rem, 9vw, 7.5rem);
}

.solution-final__inner {
  grid-template-columns: minmax(0, 0.43fr) minmax(0, 0.57fr);
  align-items: start;
}

.solution-final h2 {
  color: var(--color-text-light);
}

.solution-final__copy p {
  color: rgba(255, 255, 255, 0.84);
}

.solution-final__adoption {
  display: grid;
  gap: var(--spacing-4);
}

.solution-final__adoption h3 {
  color: var(--solution-accent-soft);
  font-size: var(--text-2xl);
  line-height: 1.25;
}

.adoption-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.faq-item {
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-2xl);
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.faq-item summary {
  min-height: 3.25rem;
  cursor: pointer;
  padding: var(--spacing-4) var(--spacing-5);
  color: var(--color-text-light);
  font-weight: 900;
}

.faq-item p {
  padding: 0 var(--spacing-5) var(--spacing-5);
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.75;
}

@media (hover: hover) {
  .solution-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 22px 44px rgba(232, 168, 56, 0.34);
  }
}

@media (max-width: 72rem) {
  .solution-hero__layout,
  .solution-skim__inner,
  .proof-stage,
  .operating-panel,
  .solution-final__inner,
  .skim-list,
  .benefits-strip,
  .adoption-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 52rem) {
  .solution-hero h1,
  .solution-skim h2,
  .solution-section h2,
  .solution-final h2 {
    max-width: 100%;
  }

  .solution-actions,
  .solution-actions .solution-button,
  .solution-final .solution-button {
    width: 100%;
  }

  .solution-hero {
    padding-block-start: var(--spacing-20);
  }

  .solution-skim {
    margin-block-start: calc(var(--spacing-8) * -1);
  }

  .workflow-step,
  .skim-list li,
  .benefits-strip__item {
    grid-template-columns: 1fr;
  }

  .skim-list span,
  .benefits-strip__item span {
    margin-block-start: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .solution-button {
    transition-duration: 0.01ms;
  }
}
</style>
