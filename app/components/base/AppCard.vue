<template>
  <div :class="['app-card', `app-card--${variant}`]">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'bordered' | 'elevated'
}>(), {
  variant: 'default',
})
</script>

<style scoped>
.app-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);
  transition: box-shadow 0.2s;
}

.app-card--default {
  border: 1px solid var(--color-border);
}

.app-card--bordered {
  border: 2px solid var(--color-border);
}

.app-card--bordered:hover {
  border-color: var(--color-primary-light);
}

.app-card--elevated {
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}

.app-card--elevated:hover {
  box-shadow: var(--shadow-lg);
}
</style>