<template>
  <footer class="footer" role="contentinfo">
    <div class="footer__inner">
      <section class="footer__brand" :aria-label="t('footer.brand')">
        <NuxtLink :to="localePath('/')" class="footer__logo" :aria-label="locale === 'ar' ? 'Trackora الرئيسية' : 'Trackora home'">
          <img src="/logos/trackora_logo_full_white.png" alt="Trackora" />
        </NuxtLink>
        <p>{{ t('footer.description') }}</p>
        <NuxtLink :to="localePath('/request-demo')" class="footer__cta">
          {{ t('footer.requestDemo') }}
        </NuxtLink>
      </section>

      <nav class="footer__groups" :aria-label="locale === 'ar' ? 'روابط التذييل' : 'Footer navigation'">
        <section v-for="group in groups" :key="group.key" class="footer__group">
          <h2>{{ t(`footer.${group.key}`) }}</h2>
          <ul>
            <li v-for="link in group.links" :key="link.key">
              <NuxtLink :to="localePath(link.pathAr)" class="footer__link">
                {{ t(`footer.${link.key}`) }}
              </NuxtLink>
            </li>
          </ul>
        </section>
      </nav>

      <section class="footer__demo" :aria-label="locale === 'ar' ? 'دعوة للتواصل' : 'Contact invitation'">
        <h2>{{ t('footer.ctaTitle') }}</h2>
        <p>{{ t('footer.ctaText') }}</p>
        <NuxtLink :to="localePath('/contact')" class="footer__contact-link">
          {{ t('footer.contact') }}
        </NuxtLink>
      </section>
    </div>

    <div class="footer__bottom">
      <p>&copy; {{ year }} {{ t('footer.brand') }}. {{ t('footer.copyright') }}.</p>
      <NuxtLink :to="localePath('/track')" class="footer__utility-link">
        {{ t('footer.trackShipment') }}
      </NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { footerGroups } from '~/data/navigation'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const year = new Date().getFullYear()
const groups = footerGroups
</script>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 0%, rgba(255, 107, 107, 0.18), transparent 20rem),
    linear-gradient(145deg, #081A2F 0%, #1A3B66 55%, #244B7C 100%);
  color: #FFFFFF;
  padding: clamp(3.5rem, 7vw, 6rem) clamp(1rem, 3vw, 2rem) 1.5rem;
}

.footer__inner,
.footer__bottom {
  width: min(100%, var(--container-wide, 88rem));
  margin-inline: auto;
}

.footer__inner {
  display: grid;
  grid-template-columns: minmax(16rem, 1.15fr) minmax(24rem, 1.7fr) minmax(16rem, 0.9fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
}

.footer__brand,
.footer__demo,
.footer__group,
.footer__group ul {
  display: grid;
  gap: 0.85rem;
}

.footer__logo {
  width: fit-content;
  border-radius: var(--radius-lg);
}

.footer__logo img {
  width: 8rem;
  height: auto;
}

.footer p {
  max-width: 36rem;
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.85;
}

.footer__groups {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1.25rem, 3vw, 2.5rem);
}

.footer__group h2,
.footer__demo h2 {
  color: #FFFFFF;
  font-size: var(--text-base);
  font-weight: 900;
}

.footer__link,
.footer__utility-link,
.footer__contact-link,
.footer__cta {
  width: fit-content;
  color: rgba(255, 255, 255, 0.72);
  font-size: var(--text-sm);
  font-weight: 800;
  transition: color 180ms ease, background-color 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.footer__link:hover,
.footer__utility-link:hover,
.footer__contact-link:hover {
  color: #FFFFFF;
}

.footer__cta,
.footer__contact-link {
  min-height: 2.85rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0.72rem 1rem;
}

.footer__cta {
  margin-top: 0.25rem;
  background: #FF6B6B;
  color: #210F16;
  box-shadow: 0 14px 32px rgba(255, 107, 107, 0.24);
}

.footer__cta:hover {
  color: #210F16;
  transform: translateY(-1px);
}

.footer__contact-link {
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #FFFFFF;
}

.footer__contact-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: clamp(2rem, 5vw, 4rem);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 1.25rem;
}

.footer__bottom p {
  margin: 0;
  font-size: var(--text-sm);
}

.footer__logo:focus-visible,
.footer__link:focus-visible,
.footer__utility-link:focus-visible,
.footer__contact-link:focus-visible,
.footer__cta:focus-visible {
  outline: 3px solid #FF6B6B;
  outline-offset: 3px;
}

@media (max-width: 62rem) {
  .footer__inner {
    grid-template-columns: 1fr;
  }

  .footer__groups {
    grid-template-columns: repeat(3, minmax(10rem, 1fr));
  }
}

@media (max-width: 42rem) {
  .footer__groups,
  .footer__bottom {
    grid-template-columns: 1fr;
  }

  .footer__groups {
    display: grid;
  }

  .footer__bottom {
    display: grid;
    justify-items: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .footer__link,
  .footer__utility-link,
  .footer__contact-link,
  .footer__cta {
    transition-duration: 0.01ms;
  }
}
</style>
