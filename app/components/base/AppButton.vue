<template>
  <component
    :is="to ? 'NuxtLink' : 'button'"
    :to="to || undefined"
    :type="to ? undefined : type"
    :class="['app-button', `app-button--${variant}`, { 'app-button--loading': loading, 'app-button--block': block }]"
    :disabled="disabled || loading"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  to?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  type?: 'button' | 'submit'
  loading?: boolean
  disabled?: boolean
  block?: boolean
}>(), {
  variant: 'primary',
  type: 'button',
  loading: false,
  disabled: false,
  block: false,
})
</script>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-8);
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 600;
  line-height: 1.4;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s, opacity 0.2s;
}

.app-button:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

.app-button:disabled,
.app-button--loading {
  opacity: 0.6;
  cursor: not-allowed;
}

.app-button--primary {
  background-color: var(--color-accent);
  color: var(--color-text-on-accent);
}

.app-button--primary:hover:not(:disabled) {
  background-color: var(--color-accent-hover);
}

.app-button--secondary {
  background-color: transparent;
  color: var(--color-text-light);
  border: 2px solid var(--color-text-light);
}

.app-button--secondary:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.1);
}

.app-button--outline {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.app-button--outline:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: var(--color-text-light);
}

.app-button--ghost {
  background-color: transparent;
  color: var(--color-primary);
}

.app-button--ghost:hover:not(:disabled) {
  background-color: var(--color-bg-alt);
}

.app-button--block {
  display: flex;
  width: 100%;
}
</style>