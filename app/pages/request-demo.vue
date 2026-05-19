<template>
  <div>
    <section class="demo section" aria-labelledby="demo-heading">
      <AppContainer>
        <div class="demo__grid">
          <div class="demo__story reveal-up">
            <p class="demo__eyebrow">{{ locale === 'ar' ? 'عرض توضيحي عالي الثقة' : 'High-trust product demo' }}</p>
            <h1 id="demo-heading" class="demo__title">{{ t('requestDemo.heading') }}</h1>
            <p class="demo__text">{{ t('requestDemo.subtitle') }}</p>

            <div class="demo__visual" aria-hidden="true">
              <div class="demo__visual-glow"></div>
              <AppIcon3D name="analytics" alt="" size="xl" variant="hero" />
              <div class="demo__visual-card demo__visual-card--top">
                <span>{{ locale === 'ar' ? 'تدفق تشغيل أوضح' : 'Clearer operations' }}</span>
              </div>
              <div class="demo__visual-card demo__visual-card--bottom">
                <span>{{ locale === 'ar' ? 'قرارات أسرع' : 'Faster decisions' }}</span>
              </div>
            </div>

            <ul class="demo__reassurance" aria-label="Demo reassurance">
              <li v-for="item in reassuranceItems" :key="item.labelEn" class="demo__reassurance-item reveal-stagger">
                <span class="demo__check" aria-hidden="true">✓</span>
                <span>{{ locale === 'ar' ? item.labelAr : item.labelEn }}</span>
              </li>
            </ul>
          </div>

          <div class="demo__form-card reveal-scale">
            <div class="demo__form-head">
              <p class="demo__form-kicker">{{ locale === 'ar' ? 'ابدأ المحادثة' : 'Start the conversation' }}</p>
              <h2 class="demo__form-title">{{ locale === 'ar' ? 'احجز عرض تراكورا' : 'Book your Trackora demo' }}</h2>
              <p class="demo__form-note">{{ locale === 'ar' ? 'املأ البيانات وسيتواصل معك فريقنا بخطوات واضحة.' : 'Share a few details and our team will follow up with clear next steps.' }}</p>
            </div>

            <AppContactForm
              :fields="requestDemoFields"
              :submit-label="t('requestDemo.submit')"
              :success-message="t('requestDemo.success')"
              :error-message="t('requestDemo.error')"
              :loading-state="loading"
              :success-state="success"
              :error-state="!!error"
              @submit="handleSubmit"
              @reset="reset"
            />
          </div>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { requestDemoFields } from '~/data/forms'

const { t, locale } = useI18n()
const { loading, success, error, submit, reset } = useRequestDemoService()
const { setSeo } = useLocaleSeo()

const reassuranceItems = [
  { labelAr: 'demo سريع', labelEn: 'Fast demo' },
  { labelAr: 'مناسب لشركات الشحن والتجار', labelEn: 'Built for shipping teams and merchants' },
  { labelAr: 'بدون التزام', labelEn: 'No commitment' },
]

useScrollReveal()

setSeo(
  locale.value === 'ar' ? 'طلب عرض توضيحي' : 'Request a Demo',
  locale.value === 'ar'
    ? 'أخبرنا عن عملك وسنتواصل معك خلال ٢٤ ساعة لعرض تراكورا التوضيحي.'
    : 'Tell us about your business and we will contact you within 24 hours for a Trackora demo.'
)

function handleSubmit(payload: Record<string, string>) {
  submit(payload)
}
</script>

<style scoped>
.demo {
  position: relative;
  overflow: hidden;
  min-height: 70vh;
  background:
    radial-gradient(circle at 10% 14%, rgba(59, 89, 152, 0.16), transparent 32%),
    radial-gradient(circle at 86% 12%, rgba(255, 107, 107, 0.1), transparent 30%),
    linear-gradient(180deg, rgba(245, 245, 245, 0.9), rgba(255, 255, 255, 0));
}

.demo__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(24rem, 1.08fr);
  gap: var(--spacing-16);
  align-items: center;
}

.demo__story {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.demo__eyebrow,
.demo__form-kicker {
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 800;
}

.demo__eyebrow {
  display: inline-flex;
  width: fit-content;
  border: 1px solid rgba(26, 59, 102, 0.1);
  border-radius: var(--radius-full);
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(255, 255, 255, 0.76);
  box-shadow: var(--shadow-sm);
}

.demo__title {
  max-width: 11ch;
  font-size: var(--text-6xl);
  letter-spacing: -0.04em;
}

.demo__text {
  max-width: 42rem;
  color: var(--color-text-secondary);
  font-size: var(--text-xl);
  line-height: 1.85;
}

.demo__visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 18rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-4xl);
  background: var(--gradient-hero);
  box-shadow: var(--shadow-glow);
  overflow: hidden;
}

.demo__visual-glow {
  position: absolute;
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  filter: blur(1px);
}

.demo__visual-card {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-3) var(--spacing-4);
  background: rgba(255, 255, 255, 0.12);
  color: var(--color-text-light);
  font-size: var(--text-sm);
  font-weight: 800;
  backdrop-filter: blur(16px);
}

.demo__visual-card--top {
  inset-block-start: var(--spacing-8);
  inset-inline-end: var(--spacing-8);
}

.demo__visual-card--bottom {
  inset-block-end: var(--spacing-8);
  inset-inline-start: var(--spacing-8);
}

.demo__reassurance {
  display: grid;
  gap: var(--spacing-3);
}

.demo__reassurance-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-4);
  background: rgba(255, 255, 255, 0.78);
  color: var(--color-text);
  font-weight: 700;
  box-shadow: var(--shadow-sm);
}

.demo__check {
  display: inline-grid;
  width: 1.6rem;
  height: 1.6rem;
  place-items: center;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.12);
  color: var(--color-success);
  font-weight: 900;
  flex: 0 0 auto;
}

.demo__form-card {
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-4xl);
  padding: var(--spacing-10);
  background:
    radial-gradient(circle at 14% 0%, rgba(59, 89, 152, 0.08), transparent 36%),
    var(--glass-bg);
  box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(18px);
}

.demo__form-head {
  margin-block-end: var(--spacing-8);
}

.demo__form-title {
  margin-block: var(--spacing-2) var(--spacing-3);
  font-size: var(--text-3xl);
}

.demo__form-note {
  color: var(--color-text-secondary);
  line-height: 1.8;
}

@media (max-width: 64rem) {
  .demo__grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-10);
  }

  .demo__title {
    max-width: 14ch;
  }
}

@media (max-width: 36rem) {
  .demo__title {
    font-size: var(--text-4xl);
  }

  .demo__form-card {
    padding: var(--spacing-6);
  }

  .demo__visual {
    min-height: 15rem;
  }

  .demo__visual-card {
    position: static;
    margin: var(--spacing-2);
  }
}
</style>
