<template>
  <div>
    <section class="contact-hero section" aria-labelledby="contact-heading">
      <AppContainer>
        <div class="contact-hero__inner reveal-up">
          <p class="contact-hero__eyebrow">{{ locale === 'ar' ? 'مركز تواصل هادئ وواضح' : 'A calm contact hub' }}</p>
          <h1 id="contact-heading" class="contact-hero__title">{{ t('contact.heading') }}</h1>
          <p class="contact-hero__text">{{ t('contact.subtitle') }}</p>
        </div>
      </AppContainer>
    </section>

    <section class="contact section" aria-label="Contact options and form">
      <AppContainer>
        <div class="contact__grid">
          <div class="contact__channels">
            <div class="contact__channels-head reveal-up">
              <AppIcon3D name="shipment" alt="" size="lg" />
              <div>
                <p class="contact__channels-kicker">{{ locale === 'ar' ? 'اختر المسار الأنسب' : 'Choose the right path' }}</p>
                <h2 class="contact__channels-title">{{ locale === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help?' }}</h2>
              </div>
            </div>

            <div class="contact__intent-grid">
              <div v-for="intent in contactIntents" :key="intent.labelEn" class="contact__intent-card reveal-stagger">
                <AppIcon3D :name="intent.icon" alt="" size="sm" />
                <div>
                  <h3 class="contact__intent-title">{{ locale === 'ar' ? intent.labelAr : intent.labelEn }}</h3>
                  <p class="contact__intent-text">{{ locale === 'ar' ? intent.textAr : intent.textEn }}</p>
                </div>
              </div>
            </div>

            <div class="contact__channel reveal-stagger">
              <span class="contact__channel-icon" aria-hidden="true">@</span>
              <div>
                <p class="contact__channel-label">{{ locale === 'ar' ? 'البريد الإلكتروني' : 'Email' }}</p>
                <a href="mailto:hello@trackora.app" class="contact__channel-value">hello@trackora.app</a>
              </div>
            </div>

            <div class="contact__channel reveal-stagger">
              <span class="contact__channel-icon" aria-hidden="true">☎</span>
              <div>
                <p class="contact__channel-label">{{ locale === 'ar' ? 'الهاتف' : 'Phone' }}</p>
                <a href="tel:+966500000000" dir="ltr" class="contact__channel-value">+966 50 000 0000</a>
              </div>
            </div>

            <div class="contact__channel reveal-stagger">
              <span class="contact__channel-icon" aria-hidden="true">9-6</span>
              <div>
                <p class="contact__channel-label">{{ locale === 'ar' ? 'ساعات العمل' : 'Working hours' }}</p>
                <p class="contact__channel-value">{{ locale === 'ar' ? 'الأحد - الخميس، ٩ صباحاً - ٦ مساءً' : 'Sun - Thu, 9 AM - 6 PM' }}</p>
              </div>
            </div>
          </div>

          <div class="contact__form-wrapper reveal-scale">
            <div class="contact__form-head">
              <p class="contact__form-kicker">{{ locale === 'ar' ? 'راسل فريق تراكورا' : 'Message Trackora' }}</p>
              <h2 class="contact__form-title">{{ locale === 'ar' ? 'اكتب لنا وسنوجهك للفريق المناسب' : 'Write to us and we will route it to the right team' }}</h2>
            </div>
            <AppContactForm
              :fields="contactFields"
              :submit-label="t('contact.submit')"
              :success-message="t('contact.success')"
              :error-message="t('contact.error')"
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
import { contactFields } from '~/data/forms'

const { t, locale } = useI18n()
const { loading, success, error, submit, reset } = useContactService()
const { setSeo } = useLocaleSeo()

const contactIntents = [
  {
    icon: 'analytics',
    labelAr: 'المبيعات',
    labelEn: 'Sales',
    textAr: 'ناقش الخطة المناسبة وحجم الشحنات والتكاملات.',
    textEn: 'Discuss plans, shipment volume, and integrations.',
  },
  {
    icon: 'smart-dispatch',
    labelAr: 'الدعم',
    labelEn: 'Support',
    textAr: 'احصل على مساعدة واضحة بخصوص التشغيل أو الحساب.',
    textEn: 'Get clear help with operations or account questions.',
  },
  {
    icon: 'cod-wallet',
    labelAr: 'الشراكات',
    labelEn: 'Partnerships',
    textAr: 'تواصل معنا للتكاملات والشراكات التجارية.',
    textEn: 'Reach out for integrations and business partnerships.',
  },
]

useScrollReveal()

setSeo(
  locale.value === 'ar' ? 'تواصل معنا' : 'Contact Us',
  locale.value === 'ar'
    ? 'تواصل مع فريق تراكورا — نرد خلال ساعات عملنا.'
    : 'Get in touch with the Trackora team — we reply during working hours.'
)

function handleSubmit(payload: Record<string, string>) {
  submit(payload)
}
</script>

<style scoped>
.contact-hero {
  overflow: hidden;
  background:
    radial-gradient(circle at 16% 12%, rgba(45, 110, 125, 0.16), transparent 32%),
    radial-gradient(circle at 84% 8%, rgba(232, 168, 56, 0.1), transparent 30%),
    linear-gradient(180deg, rgba(245, 245, 245, 0.9), rgba(255, 255, 255, 0));
}

.contact-hero__inner {
  max-width: 52rem;
  margin-inline: auto;
  text-align: center;
}

.contact-hero__eyebrow {
  display: inline-flex;
  margin-block-end: var(--spacing-4);
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-full);
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(255, 255, 255, 0.76);
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 800;
  box-shadow: var(--shadow-sm);
}

.contact-hero__title {
  font-size: var(--text-6xl);
  margin-block-end: var(--spacing-6);
  letter-spacing: -0.04em;
}

.contact-hero__text {
  color: var(--color-text-secondary);
  font-size: var(--text-xl);
  line-height: 1.85;
}

.contact {
  padding-block-start: 0;
}

.contact__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(24rem, 1.05fr);
  gap: var(--spacing-12);
  align-items: start;
}

.contact__channels {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-5);
}

.contact__channels-head {
  display: flex;
  align-items: center;
  gap: var(--spacing-5);
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-4xl);
  padding: var(--spacing-6);
  background: var(--glass-bg);
  box-shadow: var(--shadow-card);
}

.contact__channels-kicker,
.contact__form-kicker {
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 800;
}

.contact__channels-title {
  margin-block-start: var(--spacing-1);
  font-size: var(--text-2xl);
}

.contact__intent-grid {
  display: grid;
  gap: var(--spacing-4);
}

.contact__intent-card {
  display: flex;
  gap: var(--spacing-4);
  align-items: flex-start;
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-5);
  background: rgba(255, 255, 255, 0.78);
  box-shadow: var(--shadow-sm);
}

.contact__intent-title {
  margin-block-end: var(--spacing-2);
  font-size: var(--text-lg);
}

.contact__intent-text {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.7;
}

.contact__channel {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-4);
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-5);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.contact__channel-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-xl);
  background: linear-gradient(145deg, rgba(45, 110, 125, 0.08), rgba(255, 255, 255, 0.8));
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 900;
  flex-shrink: 0;
}

.contact__channel-label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 600;
}

.contact__channel-value {
  font-size: var(--text-base);
  color: var(--color-text);
  font-weight: 600;
}

a.contact__channel-value:hover {
  color: var(--color-primary-light);
}

.contact__form-wrapper {
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-4xl);
  padding: var(--spacing-10);
  background:
    radial-gradient(circle at 14% 0%, rgba(45, 110, 125, 0.08), transparent 36%),
    var(--glass-bg);
  box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(18px);
}

.contact__form-head {
  margin-block-end: var(--spacing-8);
}

.contact__form-title {
  margin-block-start: var(--spacing-2);
  font-size: var(--text-3xl);
}

@media (max-width: 64rem) {
  .contact__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 36rem) {
  .contact-hero__title {
    font-size: var(--text-4xl);
  }

  .contact__channels-head,
  .contact__intent-card {
    align-items: flex-start;
  }

  .contact__form-wrapper,
  .contact__channels-head,
  .contact__intent-card,
  .contact__channel {
    padding: var(--spacing-5);
  }
}
</style>
