<template>
  <section class="demo-cta section section--dark" aria-labelledby="demo-cta-heading">
    <AppContainer narrow>
      <div class="demo-cta__inner">
        <h2 id="demo-cta-heading" class="demo-cta__title">{{ t('demoCta.heading') }}</h2>
        <p class="demo-cta__text">{{ t('demoCta.text') }}</p>
        <AppButton to="/request-demo" variant="primary">{{ t('demoCta.cta') }}</AppButton>
      </div>
    </AppContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped>
.demo-cta {
  display: flex;
  align-items: center;
}

.demo-cta__inner {
  text-align: center;
}

.demo-cta__title {
  font-size: var(--text-4xl);
  font-weight: 800;
  color: var(--color-text-light);
  margin-block-end: var(--spacing-4);
}

.demo-cta__text {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  margin-block-end: var(--spacing-8);
  line-height: 1.7;
}

@media (max-width: 36rem) {
  .demo-cta__title { font-size: var(--text-3xl); }
}
</style>