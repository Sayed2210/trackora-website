<template>
  <span :class="['app-badge', `app-badge--${variant}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'error'
}>(), {
  variant: 'default',
})
</script>

<style scoped>
.app-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
}

.app-badge--default {
  background-color: var(--color-bg-alt);
  color: var(--color-text-secondary);
}

.app-badge--primary {
  background-color: var(--color-primary);
  color: var(--color-text-light);
}

.app-badge--accent {
  background-color: var(--color-accent-light);
  color: var(--color-text-on-accent);
}

.app-badge--success {
  background-color: var(--color-success);
  color: var(--color-text-light);
}

.app-badge--error {
  background-color: var(--color-error);
  color: var(--color-text-light);
}
</style>