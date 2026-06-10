<template>
  <button :class="['lang-switch', `lang-switch--${tone}`]" type="button" :aria-label="locale === 'ar' ? t('a11y.switchToEnglish') : t('a11y.switchToArabic')" @click="switchLocale">
    <span aria-hidden="true">{{ locale === 'ar' ? 'EN' : 'عربي' }}</span>
  </button>
</template>

<script setup lang="ts">
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const route = useRoute()

withDefaults(defineProps<{ tone?: 'dark' | 'light' }>(), {
  tone: 'dark',
})

async function switchLocale() {
  const targetLocale = locale.value === 'ar' ? 'en' : 'ar'
  const path = switchLocalePath(targetLocale)
  await router.push({ path, query: route.query })
}
</script>

<style scoped>
.lang-switch {
  width: 2.75rem;
  height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  color: #FFFFFF;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: 900;
  transition: background-color 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.lang-switch:hover,
.lang-switch:focus-visible {
  border-color: rgba(255, 107, 107, 0.75);
  background: rgba(255, 255, 255, 0.14);
  transform: translateY(-1px);
}

.lang-switch:focus-visible {
  outline: 3px solid #FF6B6B;
  outline-offset: 3px;
}

.lang-switch--light {
  border-color: rgba(26, 59, 102, 0.16);
  background: #F5F5F5;
  color: #1A3B66;
}

.lang-switch--light:hover,
.lang-switch--light:focus-visible {
  border-color: rgba(255, 107, 107, 0.75);
  background: rgba(26, 59, 102, 0.08);
}

@media (prefers-reduced-motion: reduce) {
  .lang-switch {
    transition-duration: 0.01ms;
  }
}
</style>
