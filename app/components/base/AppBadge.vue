<template>
  <span :class="['app-badge', `app-badge--${variant}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'error' | 'warning' | 'info' | 'eyebrow'
}>(), {
  variant: 'default',
})
</script>

<style scoped>
.app-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-1) var(--spacing-4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 700;
  line-height: 1.5;
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.app-badge--default {
  background-color: var(--color-bg-alt);
  color: var(--color-text-secondary);
}

.app-badge--primary {
  background-color: rgba(27, 77, 92, 0.12);
  color: var(--color-primary);
}

.app-badge--accent {
  background-color: var(--color-accent-light);
  color: var(--color-accent-contrast);
}

.app-badge--success {
  background-color: rgba(34, 197, 94, 0.12);
  color: #16a34a;
}

.app-badge--error {
  background-color: rgba(239, 68, 68, 0.12);
  color: var(--color-danger);
}

.app-badge--warning {
  background-color: rgba(245, 158, 11, 0.12);
  color: var(--color-warning);
}

.app-badge--info {
  background-color: rgba(59, 130, 246, 0.12);
  color: var(--color-info);
}

.app-badge--eyebrow {
  background: none;
  padding: 0;
  color: var(--color-primary-light);
  font-size: var(--text-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 0;
}
</style>
