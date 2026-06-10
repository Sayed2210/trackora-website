<template>
  <div :class="['app-card', `app-card--${variant}`]">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'bordered' | 'elevated' | 'glass' | 'metric'
}>(), {
  variant: 'default',
})
</script>

<style scoped>
.app-card {
  background: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8) var(--spacing-7);
  transition: transform 0.3s var(--reveal-easing), box-shadow 0.3s ease, border-color 0.3s ease;
}

.app-card:hover {
  transform: translateY(-4px);
}

.app-card--default {
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
}

.app-card--bordered {
  border: 2px solid var(--color-border);
  box-shadow: var(--shadow-card);
}

.app-card--bordered:hover {
  border-color: var(--color-primary-light);
  box-shadow: var(--shadow-md);
}

.app-card--elevated {
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
}

.app-card--elevated:hover {
  box-shadow: var(--shadow-glow);
}

.app-card--glass {
  background: var(--glass-bg);
  border: 1px solid rgba(27, 77, 92, 0.08);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(20px);
}

.app-card--glass:hover {
  box-shadow: var(--shadow-lg);
}

.app-card--metric {
  background: linear-gradient(180deg, rgba(45, 110, 125, 0.06), var(--color-surface));
  border: 1px solid rgba(27, 77, 92, 0.08);
  box-shadow: var(--shadow-card);
}

.app-card--metric:hover {
  box-shadow: var(--shadow-md);
}

@media (prefers-reduced-motion: reduce) {
  .app-card:hover {
    transform: none;
  }
}
</style>