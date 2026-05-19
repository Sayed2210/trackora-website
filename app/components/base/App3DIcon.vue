<template>
  <span :class="['app-3d-icon', `app-3d-icon--${type}`]" :style="typeStyle" aria-hidden="true">
    <span class="app-3d-icon__inner">
      <span class="app-3d-icon__content"><slot /></span>
    </span>
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'primary' | 'accent' | 'success' | 'info' | 'warning' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
}>(), {
  type: 'primary',
  size: 'md',
})

const gradients: Record<string, string> = {
  primary: 'linear-gradient(145deg, #3B5998 0%, #1A3B66 100%)',
  accent: 'linear-gradient(145deg, #FF8E53 0%, #FF6B6B 100%)',
  success: 'linear-gradient(145deg, #34D399 0%, #16A34A 100%)',
  info: 'linear-gradient(145deg, #60A5FA 0%, #3B82F6 100%)',
  warning: 'linear-gradient(145deg, #FBBF24 0%, #F59E0B 100%)',
  neutral: 'linear-gradient(145deg, #E2E8F0 0%, #CBD5E1 100%)',
}

const shadows: Record<string, string> = {
  primary: '0 6px 20px rgba(26, 59, 102, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
  accent: '0 6px 20px rgba(255, 107, 107, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
  success: '0 6px 20px rgba(22, 163, 74, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
  info: '0 6px 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
  warning: '0 6px 20px rgba(245, 158, 11, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
  neutral: '0 6px 20px rgba(100, 116, 139, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
}

const typeStyle = {
  '--icon-gradient': gradients[props.type],
  '--icon-shadow': shadows[props.type],
}
</script>

<style scoped>
.app-3d-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: var(--icon-gradient);
  box-shadow: var(--icon-shadow);
  position: relative;
  flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.app-3d-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 50%);
  pointer-events: none;
}

.app-3d-icon::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: calc(1rem - 1px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  pointer-events: none;
}

.app-3d-icon:hover {
  transform: translateY(-3px) scale(1.04);
}

.app-3d-icon__inner {
  position: relative;
  z-index: 1;
}

.app-3d-icon--sm {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
}

.app-3d-icon--sm::after {
  border-radius: calc(0.75rem - 1px);
}

.app-3d-icon--sm .app-3d-icon__content {
  font-size: 1.125rem;
}

.app-3d-icon--md {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1rem;
}

.app-3d-icon--md .app-3d-icon__content {
  font-size: 1.5rem;
}

.app-3d-icon--lg {
  width: 5rem;
  height: 5rem;
  border-radius: 1.5rem;
}

.app-3d-icon--lg .app-3d-icon__content {
  font-size: 2.25rem;
}

.app-3d-icon__content {
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15));
  line-height: 1;
}

@media (prefers-reduced-motion: reduce) {
  .app-3d-icon:hover {
    transform: none;
  }
}
</style>