<template>
  <header class="navbar" role="banner">
    <nav class="app-container navbar__inner" aria-label="التنقل الرئيسي">
      <NuxtLink :to="localePath('/')" class="navbar__logo" aria-label="تراكورا - الصفحة الرئيسية">
        <span class="navbar__logo-text">تراكورا</span>
      </NuxtLink>

      <ul class="navbar__links" :class="{ 'navbar__links--open': mobileOpen }">
        <li v-for="item in navItems" :key="item.key">
          <NuxtLink v-if="!item.children" :to="localePath(item.pathAr)" class="navbar__link" @click="closeMobile">
            {{ t(`nav.${item.key}`) }}
          </NuxtLink>
          <div v-else class="navbar__dropdown">
            <button class="navbar__link navbar__dropdown-toggle" @click="toggleDropdown(item.key)">
              {{ t(`nav.${item.key}`) }}
              <span class="navbar__chevron" aria-hidden="true">▾</span>
            </button>
            <ul v-if="openDropdown === item.key" class="navbar__dropdown-menu">
              <li v-for="child in item.children" :key="child.key">
                <NuxtLink :to="localePath(child.pathAr)" class="navbar__dropdown-link" @click="closeMobile">
                  {{ t(`nav.${child.key}`) }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <div class="navbar__actions">
        <LanguageSwitcher />
        <LoginDropdown />
        <NuxtLink :to="localePath('/track')" class="btn btn--secondary btn--sm navbar__track-link">
          {{ t('nav.trackShipment') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/request-demo')" class="btn btn--primary btn--sm">
          {{ t('nav.requestDemo') }}
        </NuxtLink>
        <MobileMenu :open="mobileOpen" @toggle="mobileOpen = !mobileOpen" @close="closeMobile" />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { navigationItems } from '~/data/navigation'

const { t } = useI18n()
const localePath = useLocalePath()
const mobileOpen = ref(false)
const openDropdown = ref<string | null>(null)

const navItems = navigationItems

function toggleDropdown(key: string) {
  openDropdown.value = openDropdown.value === key ? null : key
}

function closeMobile() {
  mobileOpen.value = false
  openDropdown.value = null
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: var(--color-bg-dark);
  border-block-end: 1px solid rgba(255, 255, 255, 0.08);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-4);
  padding-block: var(--spacing-4);
}

.navbar__logo {
  text-decoration: none;
  flex-shrink: 0;
}

.navbar__logo-text {
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--color-text-light);
  letter-spacing: -0.02em;
}

.navbar__links {
  display: none;
  list-style: none;
  gap: var(--spacing-6);
  align-items: center;
}

.navbar__link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: 500;
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: var(--font-sans);
}

.navbar__link:hover,
.navbar__link:focus-visible {
  color: var(--color-accent);
}

.navbar__dropdown {
  position: relative;
}

.navbar__dropdown-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
}

.navbar__chevron {
  font-size: var(--text-xs);
}

.navbar__dropdown-menu {
  position: absolute;
  top: 100%;
  inset-inline-start: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  list-style: none;
  min-width: 14rem;
  padding: var(--spacing-2) 0;
  z-index: 60;
}

.navbar__dropdown-link {
  display: block;
  padding: var(--spacing-2) var(--spacing-4);
  color: var(--color-text);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: background-color 0.15s;
}

.navbar__dropdown-link:hover,
.navbar__dropdown-link:focus-visible {
  background-color: var(--color-bg-alt);
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  flex-shrink: 0;
}

.btn--sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--text-sm);
}

.navbar__track-link {
  display: none;
}

@media (min-width: 64rem) {
  .navbar__links {
    display: flex;
  }

  .navbar__track-link {
    display: inline-flex;
  }
}
</style>