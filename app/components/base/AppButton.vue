<template>
  <component
    :is="to ? NuxtLinkComponent : 'button'"
    :to="to || undefined"
    :type="to ? undefined : type"
    :class="['app-button', `app-button--${variant}`, { 'app-button--loading': loading, 'app-button--block': block, 'app-button--lg': size === 'lg' }]"
    :disabled="disabled || loading"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
const NuxtLinkComponent = resolveComponent('NuxtLink')

withDefaults(defineProps<{
  to?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass'
  type?: 'button' | 'submit'
  size?: 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  block?: boolean
}>(), {
  variant: 'primary',
  type: 'button',
  size: 'md',
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
  min-height: 3rem;
  padding: 0.85rem var(--spacing-8);
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 700;
  line-height: 1.4;
  cursor: pointer;
  text-decoration: none;
  box-shadow: none;
  letter-spacing: 0.01em;
  transition: transform 0.25s var(--reveal-easing), background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease, border-color 0.2s ease;
}

.app-button--lg {
  min-height: 3.5rem;
  padding: 1rem var(--spacing-10);
  font-size: var(--text-lg);
}

.app-button:hover:not(:disabled) {
  transform: translateY(-2px);
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
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: var(--color-text-on-primary);
  box-shadow: 0 12px 32px rgba(27, 77, 92, 0.3);
}

.app-button--primary:hover:not(:disabled) {
  box-shadow: 0 16px 40px rgba(27, 77, 92, 0.4);
}

.app-button--secondary {
  background-color: rgba(255, 255, 255, 0.08);
  color: var(--color-text-light);
  border-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(16px);
}

.app-button--secondary:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.5);
}

.app-button--outline {
  background-color: transparent;
  color: var(--color-primary);
  border-color: rgba(27, 77, 92, 0.28);
}

.app-button--outline:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: var(--color-text-light);
  box-shadow: 0 8px 24px rgba(27, 77, 92, 0.2);
}

.app-button--ghost {
  background-color: transparent;
  color: var(--color-primary);
}

.app-button--ghost:hover:not(:disabled) {
  background-color: var(--color-bg-alt);
}

.app-button--glass {
  background: var(--glass-bg);
  color: var(--color-primary);
  border-color: rgba(27, 77, 92, 0.1);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(18px);
}

.app-button--glass:hover:not(:disabled) {
  border-color: rgba(27, 77, 92, 0.2);
  box-shadow: var(--shadow-md);
}

.app-button--block {
  display: flex;
  width: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .app-button:hover:not(:disabled) {
    transform: none;
  }
}
</style>