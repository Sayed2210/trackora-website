<template>
  <div ref="dropdownRef" class="login-dropdown">
    <button
      class="login-dropdown__toggle"
      type="button"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="open = !open"
    >
      {{ t('nav.login') }}
      <span class="login-dropdown__chevron" aria-hidden="true">⌄</span>
    </button>

    <Transition name="login-menu">
      <ul v-if="open" class="login-dropdown__menu" role="menu">
        <li v-for="item in loginLinks" :key="item.key" role="none">
          <a :href="item.href" class="login-dropdown__link" role="menuitem" @click="open = false">
            {{ t(`nav.${item.key}`) }}
          </a>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { loginItems } from '~/data/navigation'

const { t } = useI18n()
const open = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const loginLinks = loginItems

function onClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    open.value = false
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.login-dropdown {
  position: relative;
}

.login-dropdown__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  min-height: 2.75rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.88);
  cursor: pointer;
  padding: 0.55rem 0.85rem;
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 800;
  transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease;
}

.login-dropdown__toggle:hover,
.login-dropdown__toggle:focus-visible {
  border-color: rgba(255, 107, 107, 0.7);
  background: rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
}

.login-dropdown__toggle:focus-visible,
.login-dropdown__link:focus-visible {
  outline: 3px solid #FF6B6B;
  outline-offset: 3px;
}

.login-dropdown__chevron {
  font-size: 0.95rem;
  line-height: 1;
}

.login-dropdown__menu {
  position: absolute;
  top: calc(100% + 0.65rem);
  inset-inline-end: 0;
  min-width: 14.5rem;
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: 1.1rem;
  background: #FFFFFF;
  box-shadow: 0 22px 60px rgba(10, 29, 52, 0.18);
  padding: 0.45rem;
  z-index: 95;
}

.login-dropdown__link {
  display: flex;
  align-items: center;
  min-height: 2.65rem;
  border-radius: 0.8rem;
  padding: 0.65rem 0.8rem;
  color: #24344B;
  font-size: var(--text-sm);
  font-weight: 800;
  transition: background-color 160ms ease, color 160ms ease;
}

.login-dropdown__link:hover {
  background: rgba(26, 59, 102, 0.07);
  color: #1A3B66;
}

.login-menu-enter-active,
.login-menu-leave-active {
  transition: opacity 160ms ease, transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
}

.login-menu-enter-from,
.login-menu-leave-to {
  opacity: 0;
  transform: translateY(-0.35rem) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .login-dropdown__toggle,
  .login-dropdown__link,
  .login-menu-enter-active,
  .login-menu-leave-active {
    transition-duration: 0.01ms;
  }
}
</style>
