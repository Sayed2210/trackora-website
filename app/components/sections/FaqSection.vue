<template>
  <section class="faq section" aria-labelledby="faq-heading">
    <AppContainer narrow>
      <AppSectionHeader :title="t('faq.heading')" class="reveal-up" />
      <dl class="faq__list">
        <div v-for="(item, i) in items" :key="i" class="faq__item reveal-stagger">
          <dt class="faq__question">{{ locale === 'ar' ? item.questionAr : item.questionEn }}</dt>
          <dd class="faq__answer">{{ locale === 'ar' ? item.answerAr : item.answerEn }}</dd>
        </div>
      </dl>
    </AppContainer>
  </section>
</template>

<script setup lang="ts">
import { faqItems } from '~/data/home'

const { t, locale } = useI18n()
const items = faqItems
useScrollReveal()
</script>

<style scoped>
.faq__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.faq__item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-6) var(--spacing-8);
  background: var(--color-surface);
  transition: box-shadow 0.3s ease;
}

.faq__item:hover {
  box-shadow: var(--shadow-md);
}

.faq__question {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text);
  margin-block-end: var(--spacing-3);
}

.faq__answer {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.8;
}
</style>