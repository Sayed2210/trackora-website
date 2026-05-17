<template>
  <div class="tracking-timeline">
    <h3 class="tracking-timeline__title">{{ t('track.timeline') }}</h3>
    <ol class="tracking-timeline__list">
      <li
        v-for="(entry, i) in shipment.timeline"
        :key="i"
        :class="['tracking-timeline__step', { 'tracking-timeline__step--active': entry.completed && !nextPendingIndex, 'tracking-timeline__step--completed': entry.completed, 'tracking-timeline__step--pending': !entry.completed }]"
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

const { t } = useI18n()

const nextPendingIndex = computed(() => {
  const idx = props.shipment.timeline.findIndex((e) => !e.completed)
  return idx === -1 ? null : idx
})

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
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-8);
}

.tracking-timeline__title {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-block-end: var(--spacing-8);
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
  gap: var(--spacing-4);
  padding-block-end: var(--spacing-6);
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
  width: 2rem;
}

.tracking-timeline__dot {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
  font-weight: 700;
  flex-shrink: 0;
  z-index: 1;
}

.tracking-timeline__dot--completed {
  background-color: var(--color-primary);
  color: var(--color-text-light);
}

.tracking-timeline__dot--pending {
  background-color: var(--color-bg-alt);
  border: 2px solid var(--color-border);
}

.tracking-timeline__line {
  position: absolute;
  top: 2rem;
  bottom: 0;
  inset-inline-start: calc(50% - 1px);
  width: 2px;
  background-color: var(--color-border);
}

.tracking-timeline__line--completed {
  background-color: var(--color-primary);
}

.tracking-timeline__content {
  padding-block-start: var(--spacing-1);
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
}

.tracking-timeline__time {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}
</style>