<template>
  <div class="login-dropdown" ref="dropdownRef">
    <button class="login-dropdown__toggle" aria-haspopup="true" :aria-expanded="open" @click="open = !open">
      {{ t('nav.login') }}
      <span class="login-dropdown__chevron" aria-hidden="true">▾</span>
    </button>
    <ul v-if="open" class="login-dropdown__menu" role="menu">
      <li><a href="#merchant-login" class="login-dropdown__link" role="menuitem" @click="open = false">{{ t('nav.loginMerchant') }}</a></li>
      <li><a href="#courier-login" class="login-dropdown__link" role="menuitem" @click="open = false">{{ t('nav.loginCourier') }}</a></li>
      <li><a href="#admin-login" class="login-dropdown__link" role="menuitem" @click="open = false">{{ t('nav.loginAdmin') }}</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const open = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function onClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
.login-dropdown {
  position: relative;
}

.login-dropdown__toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.85);
  font-size: var(--text-sm);
  font-weight: 500;
  font-family: var(--font-sans);
  cursor: pointer;
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  transition: background-color 0.2s;
}

.login-dropdown__toggle:hover,
.login-dropdown__toggle:focus-visible {
  background-color: rgba(255, 255, 255, 0.08);
}

.login-dropdown__chevron {
  font-size: var(--text-xs);
}

.login-dropdown__menu {
  position: absolute;
  top: calc(100% + var(--spacing-2));
  inset-inline-end: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  list-style: none;
  min-width: 12rem;
  padding: var(--spacing-2) 0;
  z-index: 60;
}

.login-dropdown__link {
  display: block;
  padding: var(--spacing-2) var(--spacing-4);
  color: var(--color-text);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: background-color 0.15s;
}

.login-dropdown__link:hover,
.login-dropdown__link:focus-visible {
  background-color: var(--color-bg-alt);
}
</style>