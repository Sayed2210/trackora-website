<template>
  <span :class="['app-icon-3d', `app-icon-3d--${resolvedSize}`, `app-icon-3d--${variant}`]">
    <img
      class="app-icon-3d__image"
      :src="iconSrc"
      :alt="alt"
      loading="lazy"
      decoding="async"
    >
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'compact' | 'hero' | 'dark'
}>(), {
  size: 'md',
  variant: 'default',
})

const iconMap: Record<string, string> = {
  'smart-dispatch': 'smart-dispatch',
  'courier-app': 'courier-app',
  'cod-wallet': 'cod-wallet',
  'bulk-upload': 'bulk-upload',
  'fraud-detection': 'fraud-detection',
  'public-tracking': 'public-tracking',
  shipment: 'shipment',
  analytics: 'analytics',
}

const resolvedName = computed(() => iconMap[props.name] || 'shipment')
const resolvedSize = computed(() => props.size)
const iconSrc = computed(() => `/icons/trackora-3d/${resolvedName.value}.svg`)
</script>

<style scoped>
.app-icon-3d {
  --icon-box-size: 4.25rem;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-box-size);
  height: var(--icon-box-size);
  flex-shrink: 0;
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: 30%;
  background:
    radial-gradient(circle at 26% 18%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0) 36%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(245, 245, 245, 0.78));
  box-shadow: var(--shadow-card), inset 0 1px 0 rgba(255, 255, 255, 0.84);
  overflow: hidden;
  transition: transform 0.3s var(--reveal-easing), box-shadow 0.3s ease, border-color 0.3s ease;
}

.app-icon-3d::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(59, 89, 152, 0.08), rgba(255, 107, 107, 0.08));
  pointer-events: none;
}

.app-icon-3d::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  border: 1px solid rgba(255, 255, 255, 0.62);
  pointer-events: none;
}

.app-icon-3d:hover {
  transform: translateY(-4px);
  border-color: rgba(59, 89, 152, 0.18);
  box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.app-icon-3d__image {
  position: relative;
  z-index: 1;
  width: 112%;
  height: 112%;
  object-fit: contain;
  pointer-events: none;
  filter: drop-shadow(0 0.45rem 0.8rem rgba(26, 59, 102, 0.12));
}

.app-icon-3d--sm {
  --icon-box-size: 3rem;
  border-radius: 28%;
}

.app-icon-3d--md {
  --icon-box-size: 4.25rem;
}

.app-icon-3d--lg {
  --icon-box-size: 6.25rem;
}

.app-icon-3d--xl {
  --icon-box-size: clamp(7rem, 12vw, 9rem);
}

.app-icon-3d--compact {
  background: rgba(255, 255, 255, 0.9);
}

.app-icon-3d--hero,
.app-icon-3d--dark {
  border-color: rgba(255, 255, 255, 0.16);
  background:
    radial-gradient(circle at 24% 18%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0) 36%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.08));
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
}

.app-icon-3d--hero:hover,
.app-icon-3d--dark:hover {
  border-color: rgba(255, 255, 255, 0.24);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

@media (max-width: 36rem) {
  .app-icon-3d--lg {
    --icon-box-size: 5.5rem;
  }

  .app-icon-3d--xl {
    --icon-box-size: 6.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-icon-3d:hover {
    transform: none;
  }
}
</style>
