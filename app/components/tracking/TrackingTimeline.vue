<template>
  <div class="tracking-timeline">
    <div class="tracking-timeline__header">
      <AppIcon3D name="courier-app" alt="" size="md" />
      <div>
        <p class="tracking-timeline__kicker">{{ locale === 'ar' ? 'خطوات التوصيل' : 'Delivery steps' }}</p>
        <h3 class="tracking-timeline__title">{{ t('track.timeline') }}</h3>
      </div>
    </div>
    <ol class="tracking-timeline__list">
      <li
        v-for="(entry, i) in shipment.timeline"
        :key="i"
        :class="[
          'tracking-timeline__step',
          'reveal-stagger',
          {
            'tracking-timeline__step--active': i === latestCompletedIndex,
            'tracking-timeline__step--completed': entry.completed,
            'tracking-timeline__step--pending': !entry.completed,
          },
        ]"
      >
        <div class="tracking-timeline__marker">
          <span v-if="entry.completed" class="tracking-timeline__dot tracking-timeline__dot--completed" aria-hidden="true">✓</span>
          <span v-else class="tracking-timeline__dot tracking-timeline__dot--pending" aria-hidden="true" />
        </div>
        <div v-if="i < shipment.timeline.length - 1" class="tracking-timeline__line" :class="{ 'tracking-timeline__line--completed': entry.completed }" />
        <div class="tracking-timeline__content">
          <p class="tracking-timeline__status">{{ localizeStatus(entry.status) }}</p>
          <p class="tracking-timeline__description">{{ entry.description }}</p>
          <p v-if="entry.timestamp" class="tracking-timeline__time" dir="ltr">{{ formatDate(entry.timestamp) }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import type { TrackingData } from '~/composables/useTrackingService'

const props = defineProps<{
  shipment: TrackingData
}>()

const { t, locale } = useI18n()

const latestCompletedIndex = computed(() => {
  for (let i = props.shipment.timeline.length - 1; i >= 0; i -= 1) {
    if (props.shipment.timeline[i]?.completed) return i
  }
  return -1
})

useScrollReveal()

function localizeStatus(status: string) {
  const key = `trackingStatus.${status}` as string
  const translated = t(key)
  return translated === key ? status : translated
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  } catch {
    return iso
  }
}
</script>

<style scoped>
.tracking-timeline {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-4xl);
  padding: var(--spacing-8);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.tracking-timeline::before {
  content: '';
  position: absolute;
  width: 14rem;
  height: 14rem;
  inset-block-start: -8rem;
  inset-inline-start: -6rem;
  border-radius: 50%;
  background: rgba(45, 110, 125, 0.07);
  pointer-events: none;
}

.tracking-timeline__header,
.tracking-timeline__list {
  position: relative;
  z-index: 1;
}

.tracking-timeline__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin-block-end: var(--spacing-8);
}

.tracking-timeline__kicker {
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 800;
}

.tracking-timeline__title {
  margin-block-start: var(--spacing-1);
  font-size: var(--text-xl);
}

.tracking-timeline__list {
  display: flex;
  flex-direction: column;
  gap: 0;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tracking-timeline__step {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-5);
  padding-block-end: var(--spacing-5);
}

.tracking-timeline__step:last-child {
  padding-block-end: 0;
}

.tracking-timeline__marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 2.75rem;
}

.tracking-timeline__dot {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
  font-weight: 900;
  flex-shrink: 0;
  z-index: 1;
  box-shadow: var(--shadow-sm);
}

.tracking-timeline__dot--completed {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: var(--color-text-light);
}

.tracking-timeline__dot--pending {
  background: var(--color-bg-alt);
  border: 2px solid rgba(27, 77, 92, 0.12);
}

.tracking-timeline__line {
  position: absolute;
  top: 2.75rem;
  bottom: 0;
  inset-inline-start: calc(1.375rem - 1px);
  width: 2px;
  background-color: rgba(27, 77, 92, 0.1);
}

.tracking-timeline__line--completed {
  background: linear-gradient(180deg, var(--color-primary), rgba(45, 110, 125, 0.16));
}

.tracking-timeline__content {
  min-width: 0;
  width: 100%;
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-5);
  background: rgba(255, 255, 255, 0.74);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.tracking-timeline__step--active .tracking-timeline__content {
  border-color: rgba(27, 77, 92, 0.16);
  box-shadow: var(--shadow-md);
  background: linear-gradient(145deg, rgba(45, 110, 125, 0.07), rgba(255, 255, 255, 0.86));
}

.tracking-timeline__step--pending .tracking-timeline__content {
  background: rgba(245, 245, 245, 0.68);
}

.tracking-timeline__content {
  min-width: 0;
}

.tracking-timeline__status {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text);
}

.tracking-timeline__step--pending .tracking-timeline__status {
  color: var(--color-text-secondary);
}

.tracking-timeline__description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-block-end: var(--spacing-1);
  line-height: 1.75;
}

.tracking-timeline__time {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

@media (max-width: 36rem) {
  .tracking-timeline {
    padding: var(--spacing-6);
  }

  .tracking-timeline__header {
    align-items: flex-start;
  }

  .tracking-timeline__step {
    gap: var(--spacing-3);
  }

  .tracking-timeline__marker {
    width: 2.25rem;
  }

  .tracking-timeline__dot {
    width: 2.25rem;
    height: 2.25rem;
  }

  .tracking-timeline__line {
    top: 2.25rem;
    inset-inline-start: calc(1.125rem - 1px);
  }

  .tracking-timeline__content {
    padding: var(--spacing-4);
  }
}

@media (prefers-reduced-motion: reduce) {
  .tracking-timeline__content {
    transition: none;
  }
}
</style>
