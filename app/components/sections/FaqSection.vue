<template>
  <section class="faq section" aria-labelledby="faq-heading">
    <AppContainer narrow>
      <AppSectionHeader :title="t('faq.heading')" />
      <dl class="faq__list">
        <div v-for="(item, i) in items" :key="i" class="faq__item">
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
</script>

<style scoped>
.faq__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.faq__item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  background: var(--color-bg);
}

.faq__question {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-block-end: var(--spacing-3);
}

.faq__answer {
  color: var(--color-text-secondary);
  line-height: 1.7;
}
</style>