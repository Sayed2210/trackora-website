<template>
  <footer class="footer" role="contentinfo">
    <div class="app-container footer__inner">
      <div class="footer__brand">
        <NuxtLink :to="localePath('/')" class="footer__logo">
          <span class="footer__logo-img">
            <img src="/logos/trackora_logo_full.png" class="object-cover" alt="تراكورا" />
          </span>
        </NuxtLink>
        <p class="footer__copy">&copy; {{ year }} {{ t('footer.brand') }}. {{ t('footer.copyright') }}.</p>
      </div>
      <nav class="footer__nav" aria-label="روابط التذييل">
        <NuxtLink :to="localePath('/features')" class="footer__link">{{ t('footer.features') }}</NuxtLink>
        <NuxtLink :to="localePath('/solutions/shipping-companies')" class="footer__link">{{ t('footer.solutions') }}</NuxtLink>
        <NuxtLink :to="localePath('/pricing')" class="footer__link">{{ t('footer.pricing') }}</NuxtLink>
        <NuxtLink :to="localePath('/blog')" class="footer__link">{{ t('footer.blog') }}</NuxtLink>
        <NuxtLink :to="localePath('/track')" class="footer__link">{{ t('footer.trackShipment') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')" class="footer__link">{{ t('footer.contact') }}</NuxtLink>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const year = new Date().getFullYear()
</script>

<style scoped>


.app-container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--spacing-6);
}



@media (max-width: 36rem) {
  .app-container {
    padding-inline: var(--spacing-4);
  }
}
.footer {
  border-block-start: 1px solid var(--color-border);
  background-color: var(--color-bg-dark);
  padding-block: var(--spacing-12);
}

.footer__inner {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.footer__logo {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-light);
  text-decoration: none;
}

.footer__logo:hover {
  color: var(--color-accent);
}

.footer__logo-img {
  display: inline-block;
  width: 120px;
  height: auto;
}

.footer__copy {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.6);
}

.footer__nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4) var(--spacing-6);
}

.footer__link {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s;
}

.footer__link:hover,
.footer__link:focus-visible {
  color: var(--color-accent);
}

@media (min-width: 48rem) {
  .footer__inner {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .footer__nav {
    justify-content: flex-end;
  }
}
</style>