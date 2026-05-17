<template>
  <button class="lang-switch" :aria-label="locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'" @click="switchLocale">
    {{ locale === 'ar' ? 'EN' : 'عربي' }}
  </button>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

async function switchLocale() {
  const path = switchLocalePath(locale.value === 'ar' ? 'en' : 'ar')
  await router.push(path)
}
</script>

<style scoped>
.lang-switch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: var(--color-text-light);
  font-size: var(--text-xs);
  font-weight: 700;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.lang-switch:hover,
.lang-switch:focus-visible {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: var(--color-accent);
}
</style>