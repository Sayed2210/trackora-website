<template>
  <header :class="['navbar', { 'navbar--scrolled': isScrolled }]" role="banner">
    <nav class="navbar__inner" :aria-label="locale === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'">
      <NuxtLink :to="localePath('/')" class="navbar__logo" :aria-label="locale === 'ar' ? 'Trackora الرئيسية' : 'Trackora home'" @click="closeMobile">
        <img src="/logos/trackora_logo_full_white.png" alt="Trackora" />
      </NuxtLink>

      <ul class="navbar__links">
        <li v-for="item in navItems" :key="item.key">
          <NuxtLink :to="localePath(item.pathAr)" class="navbar__link">
            {{ t(`nav.${item.key}`) }}
          </NuxtLink>
        </li>
      </ul>

      <div class="navbar__actions">
        <LanguageSwitcher class="navbar__language" />
        <LoginDropdown class="navbar__login" />
        <NuxtLink :to="localePath('/request-demo')" class="navbar__demo-link">
          {{ t('nav.requestDemo') }}
        </NuxtLink>
        <MobileMenu :open="mobileOpen" @toggle="mobileOpen = !mobileOpen" @close="closeMobile" />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { navigationItems } from '~/data/navigation'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const mobileOpen = ref(false)
const isScrolled = ref(false)

const navItems = navigationItems

function closeMobile() {
  mobileOpen.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeMobile()
  }
}

onMounted(() => {
  function handleScroll() {
    isScrolled.value = window.scrollY > 10
  }

  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('keydown', onKeydown)
  })
})
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 80;
  border-block-end: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(90deg, rgba(255, 107, 107, 0.08), transparent 28%),
    rgba(10, 29, 52, 0.94);
  backdrop-filter: blur(18px);
  transition: background 240ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1), border-color 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.navbar--scrolled {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(10, 29, 52, 0.98);
  box-shadow: 0 18px 48px rgba(4, 16, 31, 0.22);
}

.navbar__inner {
  width: min(100%, var(--container-wide, 88rem));
  min-height: 4.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.75rem, 2vw, 1.5rem);
  margin-inline: auto;
  padding-inline: clamp(1rem, 3vw, 2rem);
}

.navbar__logo {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  min-width: 5.5rem;
  border-radius: var(--radius-lg);
}

.navbar__logo img {
  width: 7.2rem;
  height: auto;
}

.navbar__links {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-inline: auto;
}

.navbar__link {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  border-radius: 999px;
  padding: 0.55rem 0.85rem;
  color: rgba(255, 255, 255, 0.78);
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 800;
  line-height: 1.3;
  transition: color 180ms ease, background-color 180ms ease;
}

.navbar__link:hover,
.navbar__link:focus-visible,
.navbar__link.router-link-active {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.09);
}

.navbar__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.55rem;
  flex: 0 0 auto;
}

.navbar__demo-link {
  display: none;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  border-radius: 999px;
  padding: 0.65rem 1rem;
  background: #FF6B6B;
  color: #210F16;
  font-size: var(--text-sm);
  font-weight: 900;
  box-shadow: 0 12px 28px rgba(255, 107, 107, 0.24);
  transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
}

.navbar__demo-link:hover {
  color: #210F16;
  transform: translateY(-1px);
  box-shadow: 0 16px 36px rgba(255, 107, 107, 0.34);
}

.navbar__logo:focus-visible,
.navbar__link:focus-visible,
.navbar__demo-link:focus-visible {
  outline: 3px solid #FF6B6B;
  outline-offset: 3px;
}

.navbar__login {
  display: none;
}

@media (min-width: 48rem) {
  .navbar__demo-link {
    display: inline-flex;
  }
}

@media (min-width: 68rem) {
  .navbar__links,
  .navbar__login {
    display: flex;
  }
}

@media (max-width: 30rem) {
  .navbar__language {
    display: none;
  }

  .navbar__logo img {
    width: 6.2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .navbar,
  .navbar__demo-link,
  .navbar__link {
    transition-duration: 0.01ms;
  }
}
</style>
