<template>
  <section class="hero section section--dark" aria-labelledby="hero-heading">
    <AppContainer narrow>
      <div class="hero__inner">
        <h1 id="hero-heading" class="hero__title">
          {{ t('hero.title') }}
          <br>
          <span class="hero__accent">{{ t('hero.accent') }}</span>
        </h1>
        <p class="hero__subtitle">{{ t('hero.subtitle') }}</p>
        <div class="hero__actions">
          <AppButton to="/request-demo" variant="primary">{{ t('hero.ctaPrimary') }}</AppButton>
          <AppButton to="/features" variant="secondary">{{ t('hero.ctaSecondary') }}</AppButton>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  min-height: 80vh;
}

.hero__inner {
  text-align: center;
}

.hero__title {
  font-size: var(--text-5xl);
  font-weight: 800;
  color: var(--color-text-light);
  line-height: 1.15;
  margin-block-end: var(--spacing-6);
}

.hero__accent {
  color: var(--color-accent);
}

.hero__subtitle {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  max-width: 40rem;
  margin-inline: auto;
  margin-block-end: var(--spacing-10);
}

.hero__actions {
  display: flex;
  gap: var(--spacing-4);
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 48rem) {
  .hero { min-height: 70vh; }
}

@media (max-width: 36rem) {
  .hero__title { font-size: var(--text-3xl); }
  .hero__actions { flex-direction: column; align-items: center; }
}
</style>