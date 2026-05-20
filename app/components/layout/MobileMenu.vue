<template>
  <div class="mobile-menu">
    <button
      class="mobile-menu__toggle"
      :aria-label="open ? (locale === 'ar' ? 'إغلاق القائمة' : 'Close menu') : (locale === 'ar' ? 'فتح القائمة' : 'Open menu')"
      :aria-expanded="open"
      aria-controls="mobile-menu-panel"
      @click="$emit('toggle')"
    >
      <span v-if="!open" class="mobile-menu__icon" aria-hidden="true">☰</span>
      <span v-else class="mobile-menu__icon" aria-hidden="true">✕</span>
    </button>

    <Teleport to="body">
      <Transition name="mobile-menu">
        <div v-if="open" class="mobile-menu__overlay" @click="$emit('close')">
          <nav id="mobile-menu-panel" class="mobile-menu__panel" role="navigation" :aria-label="locale === 'ar' ? 'القائمة الجانبية' : 'Mobile navigation'" @click.stop>
            <ul class="mobile-menu__list">
              <li v-for="item in navItems" :key="item.key">
                <NuxtLink v-if="!item.children" :to="localePath(item.pathAr)" class="mobile-menu__link" @click="$emit('close')">
                  {{ t(`nav.${item.key}`) }}
                </NuxtLink>
                <template v-else>
                  <div class="mobile-menu__group">{{ t(`nav.${item.key}`) }}</div>
                  <ul class="mobile-menu__sublist">
                    <li v-for="child in item.children" :key="child.key">
                      <NuxtLink :to="localePath(child.pathAr)" class="mobile-menu__link mobile-menu__link--sub" @click="$emit('close')">
                        {{ t(`nav.${child.key}`) }}
                      </NuxtLink>
                    </li>
                  </ul>
                </template>
              </li>
            </ul>
            <div class="mobile-menu__actions">
              <NuxtLink :to="localePath('/track')" class="btn btn--secondary" @click="$emit('close')">{{ t('nav.trackShipment') }}</NuxtLink>
              <NuxtLink :to="localePath('/request-demo')" class="btn btn--primary" @click="$emit('close')">{{ t('nav.requestDemo') }}</NuxtLink>
            </div>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { navigationItems } from '~/data/navigation'

defineProps<{ open: boolean }>()
defineEmits<{ toggle: [], close: [] }>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const navItems = navigationItems
</script>

<style scoped>
.mobile-menu__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: none;
  border: none;
  color: var(--color-text-light);
  font-size: var(--text-xl);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: background-color 0.2s;
}

.mobile-menu__toggle:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.mobile-menu__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
}

[dir="ltr"] .mobile-menu__overlay {
  justify-content: flex-start;
}

.mobile-menu__panel {
  width: min(20rem, 80vw);
  height: 100%;
  background: var(--color-surface);
  padding: var(--spacing-6);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.mobile-menu__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.mobile-menu__link {
  display: block;
  padding: var(--spacing-3) var(--spacing-4);
  color: var(--color-text);
  text-decoration: none;
  font-size: var(--text-base);
  border-radius: var(--radius-md);
  transition: background-color 0.15s;
}

.mobile-menu__link:hover,
.mobile-menu__link:focus-visible {
  background-color: var(--color-bg-alt);
}

.mobile-menu__link--sub {
  padding-inline-start: var(--spacing-8);
  font-size: var(--text-sm);
}

.mobile-menu__group {
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-secondary);
}

.mobile-menu__sublist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.mobile-menu__actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  margin-block-start: auto;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

@media (min-width: 64rem) {
  .mobile-menu__toggle {
    display: none;
  }
}
</style>
