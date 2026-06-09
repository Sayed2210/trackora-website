<template>
  <div :class="['solution-artifact', `solution-artifact--${solution.artifact.kind}`, { 'solution-artifact--expanded': expanded }]">
    <div class="solution-artifact__top">
      <span>{{ l(solution.artifact.title) }}</span>
      <strong>{{ locale === 'ar' ? 'Trackora Live' : 'Trackora Live' }}</strong>
    </div>

    <div v-if="solution.artifact.kind === 'command-board' && solution.artifact.table" class="command-board" role="table" :aria-label="l(solution.artifact.title)">
      <div class="command-board__row command-board__row--head" role="row">
        <span v-for="column in solution.artifact.table.columns" :key="column.en" role="columnheader">{{ l(column) }}</span>
      </div>
      <div v-for="(row, rowIndex) in solution.artifact.table.rows" :key="rowIndex" class="command-board__row" role="row">
        <span v-for="(cell, cellIndex) in row" :key="`${rowIndex}-${cellIndex}`" role="cell">
          {{ l(cell) }}
        </span>
      </div>
    </div>

    <div v-else-if="solution.artifact.kind === 'merchant-dashboard'" class="merchant-dashboard">
      <div class="merchant-dashboard__metrics">
        <div v-for="metric in solution.artifact.metrics" :key="metric.label.en" :class="['merchant-metric', metric.tone && `merchant-metric--${metric.tone}`]">
          <span>{{ l(metric.label) }}</span>
          <strong>{{ l(metric.value) }}</strong>
        </div>
      </div>
      <div class="tracking-strip" aria-label="Recent tracking numbers">
        <span>{{ locale === 'ar' ? 'أرقام تتبع حديثة' : 'Recent tracking numbers' }}</span>
        <div>
          <b v-for="number in solution.artifact.trackingNumbers" :key="number">{{ number }}</b>
        </div>
      </div>
    </div>

    <ol v-else-if="solution.artifact.kind === 'seller-flow'" class="seller-flow">
      <li v-for="(step, index) in solution.artifact.flow" :key="step.title.en">
        <span class="seller-flow__index">{{ locale === 'ar' ? formatArabic(index + 1) : index + 1 }}</span>
        <div>
          <h3>{{ l(step.title) }}</h3>
          <p>{{ l(step.text) }}</p>
        </div>
        <strong>{{ l(step.status) }}</strong>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { getLocalized, type SolutionDetail } from '~/data/solutions'

const props = withDefaults(defineProps<{
  solution: SolutionDetail
  locale: string
  expanded?: boolean
}>(), {
  expanded: false,
})

function l(text: { ar: string, en: string }) {
  return getLocalized(text, props.locale)
}

function formatArabic(value: number) {
  return new Intl.NumberFormat('ar-EG').format(value)
}
</script>

<style scoped>
.solution-artifact {
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-4xl);
  background:
    radial-gradient(circle at 20% 12%, rgba(232, 168, 56, 0.16), transparent 16rem),
    rgba(7, 26, 32, 0.76);
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.22);
  overflow: hidden;
}

.solution-artifact--expanded {
  border-color: rgba(27, 77, 92, 0.1);
  background:
    radial-gradient(circle at 12% 14%, rgba(45, 110, 125, 0.12), transparent 20rem),
    linear-gradient(180deg, #FFFFFF, #F7F9FA);
  box-shadow: var(--shadow-lg);
}

.solution-artifact__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding: var(--spacing-5) var(--spacing-6);
  color: rgba(255, 255, 255, 0.78);
  font-weight: 900;
}

.solution-artifact--expanded .solution-artifact__top {
  border-color: rgba(27, 77, 92, 0.1);
  color: var(--color-primary-dark);
}

.solution-artifact__top strong {
  border-radius: var(--radius-full);
  padding: 0.3rem 0.7rem;
  color: var(--color-accent-contrast);
  background: var(--color-accent-light);
  font-size: var(--text-sm);
}

.command-board {
  display: grid;
  min-width: 0;
  padding: clamp(var(--spacing-4), 3vw, var(--spacing-6));
  overflow-x: auto;
}

.command-board__row {
  display: grid;
  grid-template-columns: minmax(8rem, 1.2fr) repeat(6, minmax(7.5rem, 1fr));
  min-width: 58rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.solution-artifact--expanded .command-board__row {
  border-color: rgba(27, 77, 92, 0.09);
}

.command-board__row:last-child {
  border-bottom: none;
}

.command-board__row span {
  padding: var(--spacing-4);
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.55;
}

.solution-artifact--expanded .command-board__row span {
  color: var(--color-text-secondary);
}

.command-board__row span + span {
  border-inline-start: 1px solid rgba(255, 255, 255, 0.1);
}

.solution-artifact--expanded .command-board__row span + span {
  border-color: rgba(27, 77, 92, 0.09);
}

.command-board__row--head span,
.command-board__row span:first-child {
  color: #FFFFFF;
  font-weight: 900;
}

.solution-artifact--expanded .command-board__row--head span,
.solution-artifact--expanded .command-board__row span:first-child {
  color: var(--color-primary-dark);
}

.merchant-dashboard {
  display: grid;
  gap: var(--spacing-5);
  padding: clamp(var(--spacing-5), 4vw, var(--spacing-8));
}

.merchant-dashboard__metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-3);
}

.merchant-metric,
.tracking-strip {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-2xl);
  background: rgba(255, 255, 255, 0.08);
}

.solution-artifact--expanded .merchant-metric,
.solution-artifact--expanded .tracking-strip {
  border-color: rgba(27, 77, 92, 0.1);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.merchant-metric {
  display: grid;
  gap: var(--spacing-2);
  min-height: 8rem;
  align-content: space-between;
  padding: var(--spacing-4);
}

.merchant-metric span,
.tracking-strip > span {
  color: rgba(255, 255, 255, 0.68);
  font-size: var(--text-sm);
  font-weight: 800;
}

.solution-artifact--expanded .merchant-metric span,
.solution-artifact--expanded .tracking-strip > span {
  color: var(--color-text-secondary);
}

.merchant-metric strong {
  color: #FFFFFF;
  font-size: clamp(1.35rem, 3vw, 2rem);
  line-height: 1.1;
}

.solution-artifact--expanded .merchant-metric strong {
  color: var(--color-primary-dark);
}

.merchant-metric--gold strong { color: var(--color-accent-light); }
.merchant-metric--success strong { color: #C8F7D8; }
.merchant-metric--danger strong { color: #FFD0D0; }
.solution-artifact--expanded .merchant-metric--gold strong { color: var(--color-accent-contrast); }
.solution-artifact--expanded .merchant-metric--success strong { color: #166534; }
.solution-artifact--expanded .merchant-metric--danger strong { color: #991B1B; }

.tracking-strip {
  display: grid;
  gap: var(--spacing-4);
  padding: var(--spacing-5);
}

.tracking-strip div {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
}

.tracking-strip b {
  border-radius: var(--radius-full);
  padding: 0.45rem 0.75rem;
  color: var(--color-accent-contrast);
  background: var(--color-accent-light);
  font-size: var(--text-sm);
}

.seller-flow {
  display: grid;
  gap: var(--spacing-3);
  padding: clamp(var(--spacing-5), 4vw, var(--spacing-8));
}

.seller-flow li {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: var(--spacing-4);
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-4);
  background: rgba(255, 255, 255, 0.08);
}

.solution-artifact--expanded .seller-flow li {
  border-color: rgba(27, 77, 92, 0.1);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.seller-flow__index {
  display: grid;
  width: 2.6rem;
  height: 2.6rem;
  place-items: center;
  border-radius: var(--radius-full);
  color: var(--color-accent-contrast);
  background: var(--color-accent);
  font-weight: 900;
}

.seller-flow h3 {
  color: #FFFFFF;
  font-size: var(--text-lg);
  margin-block-end: 0.15rem;
}

.seller-flow p {
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--text-sm);
  line-height: 1.6;
}

.solution-artifact--expanded .seller-flow h3 {
  color: var(--color-primary-dark);
}

.solution-artifact--expanded .seller-flow p {
  color: var(--color-text-secondary);
}

.seller-flow strong {
  border-radius: var(--radius-full);
  padding: 0.35rem 0.7rem;
  color: var(--color-accent-light);
  background: rgba(232, 168, 56, 0.16);
  font-size: var(--text-sm);
  white-space: nowrap;
}

.solution-artifact--expanded .seller-flow strong {
  color: var(--color-accent-contrast);
  background: var(--color-accent-light);
}

@media (max-width: 52rem) {
  .solution-artifact__top,
  .seller-flow li {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .solution-artifact__top {
    display: grid;
  }

  .merchant-dashboard__metrics {
    grid-template-columns: 1fr;
  }
}
</style>
