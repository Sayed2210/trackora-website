<template>
  <div>
    <HeroSection />
    <ProblemsSection />
    <FeaturesSection />
    <HowItWorksSection />
    <PricingPreviewSection />
    <DemoCtaSection />
    <FaqSection />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { setSeo } = useLocaleSeo()

setSeo(
  t('hero.title') + ' ' + t('hero.accent'),
  t('hero.subtitle')
)
</script>