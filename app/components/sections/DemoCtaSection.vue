<template>
  <section class="demo-cta section section--dark" aria-labelledby="demo-cta-heading">
    <AppContainer narrow>
      <div class="demo-cta__inner">
        <h2 id="demo-cta-heading" class="demo-cta__title reveal-up">{{ t('demoCta.heading') }}</h2>
        <p class="demo-cta__text reveal-up">{{ t('demoCta.text') }}</p>
        <div class="demo-cta__action reveal-up">
          <AppButton :to="localePath('/request-demo')" variant="primary" size="lg" block>{{ t('demoCta.cta') }}</AppButton>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
useScrollReveal()
</script>

<style scoped>
.demo-cta {
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.demo-cta::before {
  content: '';
  position: absolute;
  width: 50rem;
  height: 50rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(232, 168, 56, 0.06), transparent 70%);
  top: -25rem;
  inset-inline-end: -12rem;
  pointer-events: none;
}

.demo-cta::after {
  content: '';
  position: absolute;
  width: 40rem;
  height: 40rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(45, 110, 125, 0.08), transparent 65%);
  bottom: -20rem;
  inset-inline-start: -8rem;
  pointer-events: none;
}

.demo-cta__inner {
  text-align: center;
  position: relative;
  z-index: 1;
}

.demo-cta__title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 900;
  color: var(--color-text-light);
  letter-spacing: -0.03em;
  margin-block-end: var(--spacing-4);
}

.demo-cta__text {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.6);
  margin-block-end: var(--spacing-12);
  line-height: 1.9;
  max-width: 30rem;
  margin-inline: auto;
}

.demo-cta__action {
  max-width: 20rem;
  margin-inline: auto;
}

@media (max-width: 36rem) {
  .demo-cta__title {
    font-size: var(--text-3xl);
  }

  .demo-cta__action {
    max-width: none;
  }
}
</style>
