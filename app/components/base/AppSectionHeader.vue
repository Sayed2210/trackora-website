<template>
  <div class="app-section-header" :class="{ 'app-section-header--left': align === 'left' }">
    <p v-if="eyebrow" class="app-section-header__eyebrow">{{ eyebrow }}</p>
    <h2 class="app-section-header__title">{{ title }}</h2>
    <p v-if="description" class="app-section-header__description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
}>(), {
  eyebrow: '',
  description: '',
  align: 'center',
})
</script>

<style scoped>
.app-section-header {
  text-align: center;
  margin-block-end: var(--spacing-16);
}

.app-section-header--left {
  text-align: start;
}

.app-section-header__eyebrow {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-primary-light);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-block-end: var(--spacing-3);
}

.app-section-header__title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-block-end: var(--spacing-4);
}

.app-section-header--left .app-section-header__title {
  max-width: 32rem;
}

.app-section-header__description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 40rem;
  margin-inline: auto;
  line-height: 1.8;
}

.app-section-header--left .app-section-header__description {
  margin-inline: 0;
}
</style>