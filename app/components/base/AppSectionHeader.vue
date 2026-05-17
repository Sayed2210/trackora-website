<template>
  <div class="app-section-header">
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
}>(), {
  eyebrow: '',
  description: '',
})
</script>

<style scoped>
.app-section-header {
  text-align: center;
  margin-block-end: var(--spacing-12);
}

.app-section-header__eyebrow {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-block-end: var(--spacing-2);
}

.app-section-header__title {
  font-size: var(--text-3xl);
  font-weight: 800;
  color: var(--color-text);
  margin-block-end: var(--spacing-4);
}

.app-section-header__description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 40rem;
  margin-inline: auto;
  line-height: 1.7;
}
</style>