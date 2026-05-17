<template>
  <div>
    <section class="contact section" aria-labelledby="contact-heading">
      <AppContainer>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'تواصل' : 'Contact'"
          :title="t('contact.heading')"
          :description="t('contact.subtitle')"
        />

        <div class="contact__grid">
          <div class="contact__channels">
            <h3 class="contact__channels-title">{{ locale === 'ar' ? 'قنوات التواصل' : 'Contact channels' }}</h3>

            <div class="contact__channel">
              <span class="contact__channel-icon" aria-hidden="true">✉</span>
              <div>
                <p class="contact__channel-label">{{ locale === 'ar' ? 'البريد الإلكتروني' : 'Email' }}</p>
                <a href="mailto:hello@trackora.app" class="contact__channel-value">hello@trackora.app</a>
              </div>
            </div>

            <div class="contact__channel">
              <span class="contact__channel-icon" aria-hidden="true">☎</span>
              <div>
                <p class="contact__channel-label">{{ locale === 'ar' ? 'الهاتف' : 'Phone' }}</p>
                <a href="tel:+966500000000" dir="ltr" class="contact__channel-value">+966 50 000 0000</a>
              </div>
            </div>

            <div class="contact__channel">
              <span class="contact__channel-icon" aria-hidden="true">⏰</span>
              <div>
                <p class="contact__channel-label">{{ locale === 'ar' ? 'ساعات العمل' : 'Working hours' }}</p>
                <p class="contact__channel-value">{{ locale === 'ar' ? 'الأحد - الخميس، ٩ صباحاً - ٦ مساءً' : 'Sun - Thu, 9 AM - 6 PM' }}</p>
              </div>
            </div>
          </div>

          <div class="contact__form-wrapper">
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
.contact__grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-12);
  align-items: start;
}

.contact__channels {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.contact__channels-title {
  font-size: var(--text-xl);
  font-weight: 700;
}

.contact__channel {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-4);
}

.contact__channel-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-lg);
  background: var(--color-bg-alt);
  font-size: var(--text-lg);
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

@media (max-width: 48rem) {
  .contact__grid {
    grid-template-columns: 1fr;
  }
}
</style>