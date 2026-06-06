<template>
  <div class="mobile-menu">
    <button
      class="mobile-menu__toggle"
      type="button"
      :aria-label="open ? (locale === 'ar' ? 'إغلاق القائمة' : 'Close menu') : (locale === 'ar' ? 'فتح القائمة' : 'Open menu')"
      :aria-expanded="open"
      aria-controls="mobile-menu-panel"
      @click="$emit('toggle')"
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>

    <Teleport to="body">
      <Transition name="mobile-overlay">
        <div v-if="open" class="mobile-menu__overlay" @click="$emit('close')">
          <Transition name="mobile-panel" appear>
            <nav
              id="mobile-menu-panel"
              class="mobile-menu__panel"
              role="navigation"
              :aria-label="locale === 'ar' ? 'القائمة الرئيسية للجوال' : 'Mobile navigation'"
              @click.stop
            >
              <div class="mobile-menu__header">
                <img src="/logos/trackora_logo_full.png" alt="Trackora" />
                <button type="button" class="mobile-menu__close" :aria-label="locale === 'ar' ? 'إغلاق القائمة' : 'Close menu'" @click="$emit('close')">×</button>
              </div>

              <ul class="mobile-menu__list">
                <li v-for="item in navItems" :key="item.key">
                  <NuxtLink :to="localePath(item.pathAr)" class="mobile-menu__link" @click="$emit('close')">
                    {{ t(`nav.${item.key}`) }}
                  </NuxtLink>
                </li>
              </ul>

              <div class="mobile-menu__login" aria-label="روابط تسجيل الدخول">
                <strong>{{ t('nav.login') }}</strong>
                <a v-for="item in loginLinks" :key="item.key" :href="item.href" class="mobile-menu__login-link" @click="$emit('close')">
                  {{ t(`nav.${item.key}`) }}
                </a>
              </div>

              <div class="mobile-menu__actions">
                <NuxtLink :to="localePath('/request-demo')" class="mobile-menu__cta" @click="$emit('close')">
                  {{ t('nav.requestDemo') }}
                </NuxtLink>
                <LanguageSwitcher tone="light" />
              </div>
            </nav>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { loginItems, navigationItems } from '~/data/navigation'

const props = defineProps<{ open: boolean }>()
defineEmits<{ toggle: [], close: [] }>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const navItems = navigationItems
const loginLinks = loginItems

watch(() => props.open, (isOpen) => {
  if (import.meta.client) {
    document.documentElement.classList.toggle('mobile-menu-open', isOpen)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.documentElement.classList.remove('mobile-menu-open')
  }
})
</script>

<style scoped>
.mobile-menu__toggle {
  width: 2.75rem;
  height: 2.75rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.28rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: background-color 180ms ease, border-color 180ms ease;
}

.mobile-menu__toggle span {
  width: 1.05rem;
  height: 2px;
  border-radius: 999px;
  background: #FFFFFF;
}

.mobile-menu__toggle:hover,
.mobile-menu__toggle:focus-visible {
  border-color: rgba(255, 107, 107, 0.75);
  background: rgba(255, 255, 255, 0.14);
}

.mobile-menu__toggle:focus-visible,
.mobile-menu__close:focus-visible,
.mobile-menu__link:focus-visible,
.mobile-menu__login-link:focus-visible,
.mobile-menu__cta:focus-visible {
  outline: 3px solid #FF6B6B;
  outline-offset: 3px;
}

.mobile-menu__overlay {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  justify-content: flex-start;
  background: rgba(7, 18, 32, 0.62);
}

html[dir="ltr"] .mobile-menu__overlay {
  justify-content: flex-end;
}

.mobile-menu__panel {
  width: min(24rem, calc(100vw - 1.25rem));
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow-y: auto;
  padding: 1.15rem;
  background:
    radial-gradient(circle at 10% 0%, rgba(255, 107, 107, 0.12), transparent 14rem),
    #FFFFFF;
  box-shadow: -24px 0 70px rgba(7, 18, 32, 0.24);
}

html[dir="ltr"] .mobile-menu__panel {
  box-shadow: 24px 0 70px rgba(7, 18, 32, 0.24);
}

.mobile-menu__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.mobile-menu__header img {
  width: 7.5rem;
  height: auto;
}

.mobile-menu__close {
  width: 2.75rem;
  height: 2.75rem;
  display: inline-grid;
  place-items: center;
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: 999px;
  background: #F5F5F5;
  color: #1A3B66;
  cursor: pointer;
  font-size: 1.45rem;
  line-height: 1;
}

.mobile-menu__list,
.mobile-menu__login {
  display: grid;
  gap: 0.35rem;
}

.mobile-menu__link,
.mobile-menu__login-link {
  display: flex;
  align-items: center;
  min-height: 3.15rem;
  border-radius: 1rem;
  padding: 0.8rem 0.95rem;
  color: #24344B;
  font-weight: 900;
  transition: background-color 160ms ease, color 160ms ease, transform 160ms ease;
}

.mobile-menu__link:hover,
.mobile-menu__login-link:hover,
.mobile-menu__link.router-link-active {
  background: rgba(26, 59, 102, 0.07);
  color: #1A3B66;
}

.mobile-menu__login {
  margin-top: 0.25rem;
  border: 1px solid rgba(26, 59, 102, 0.1);
  border-radius: 1.25rem;
  padding: 0.8rem;
  background: rgba(245, 245, 245, 0.82);
}

.mobile-menu__login strong {
  padding-inline: 0.4rem;
  color: #1A3B66;
}

.mobile-menu__login-link {
  min-height: 2.85rem;
  font-size: var(--text-sm);
}

.mobile-menu__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
}

.mobile-menu__cta {
  flex: 1;
  min-height: 3.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0.8rem 1rem;
  background: #FF6B6B;
  color: #210F16;
  font-weight: 900;
  box-shadow: 0 12px 28px rgba(255, 107, 107, 0.22);
}

.mobile-menu__cta:hover {
  color: #210F16;
}

.mobile-overlay-enter-active,
.mobile-overlay-leave-active {
  transition: opacity 220ms ease;
}

.mobile-overlay-enter-from,
.mobile-overlay-leave-to {
  opacity: 0;
}

.mobile-panel-enter-active,
.mobile-panel-leave-active {
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.mobile-panel-enter-from,
.mobile-panel-leave-to {
  transform: translateX(-100%);
}

html[dir="ltr"] .mobile-panel-enter-from,
html[dir="ltr"] .mobile-panel-leave-to {
  transform: translateX(100%);
}

@media (min-width: 68rem) {
  .mobile-menu__toggle {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu__toggle,
  .mobile-menu__link,
  .mobile-menu__login-link,
  .mobile-overlay-enter-active,
  .mobile-overlay-leave-active,
  .mobile-panel-enter-active,
  .mobile-panel-leave-active {
    transition-duration: 0.01ms;
  }
}
</style>

<style>
html.mobile-menu-open {
  overflow: hidden;
}
</style>
