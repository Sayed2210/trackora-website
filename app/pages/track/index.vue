<template>
  <div>
    <section class="track-input section" aria-labelledby="track-heading">
      <AppContainer>
        <div class="track-input__layout">
          <div class="track-input__story reveal-up">
            <p class="track-input__eyebrow">{{ locale === 'ar' ? 'تتبّع آمن وواضح' : 'Safe, clear tracking' }}</p>
            <h1 id="track-heading" class="track-input__title">{{ t('track.heading') }}</h1>
            <p class="track-input__text">{{ t('track.subtitle') }}</p>

            <div class="track-input__visual" aria-hidden="true">
              <div class="track-input__visual-glow"></div>
              <AppIcon3D name="public-tracking" alt="" size="xl" variant="hero" />
              <div class="track-input__visual-card track-input__visual-card--top">
                {{ locale === 'ar' ? 'حالة الشحنة فقط' : 'Shipment status only' }}
              </div>
              <div class="track-input__visual-card track-input__visual-card--bottom">
                {{ locale === 'ar' ? 'بدون بيانات حساسة' : 'No sensitive data' }}
              </div>
            </div>
          </div>

          <div class="track-input__card reveal-scale">
            <div class="track-input__card-head">
              <AppIcon3D name="shipment" alt="" size="md" />
              <div>
                <p class="track-input__card-kicker">{{ locale === 'ar' ? 'ابحث برقم الشحنة' : 'Look up by tracking number' }}</p>
                <h2 class="track-input__card-title">{{ locale === 'ar' ? 'أدخل الرقم لمعرفة آخر حالة' : 'Enter the number to see the latest status' }}</h2>
              </div>
            </div>

            <form class="track-input__form" @submit.prevent="handleTrack">
              <div class="track-input__field-wrapper">
                <AppInput
                  :label="locale === 'ar' ? 'رقم الشحنة' : 'Tracking number'"
                  :placeholder="t('track.inputPlaceholder')"
                  :model-value="trackingNumber"
                  :error="inputError"
                  type="text"
                  @update:model-value="trackingNumber = $event; inputError = ''"
                />
              </div>
              <AppButton type="submit" variant="primary" :disabled="!trackingNumber.trim()">
                {{ t('track.submitButton') }}
              </AppButton>
            </form>

            <p class="track-input__hint">{{ t('track.exampleFormat') }}</p>

            <div class="track-input__privacy-card">
              <AppIcon3D name="fraud-detection" alt="" size="sm" />
              <p>{{ t('track.privacyNote') }}</p>
            </div>

            <div v-if="config.public.enableMockTracking" class="track-input__mock-notice">
              <AppBadge variant="accent">{{ t('track.mockNotice') }}</AppBadge>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
const config = useRuntimeConfig()

const trackingNumber = ref('')
const inputError = ref('')

const { setSeo } = useLocaleSeo()
useScrollReveal()

setSeo(
  locale.value === 'ar' ? 'تتبّع شحنتك' : 'Track Your Shipment',
  locale.value === 'ar'
    ? 'أدخل رقم الشحنة لمعرفة حالة التوصيل عبر تراكورا.'
    : 'Enter your tracking number to check delivery status via Trackora.'
)

function handleTrack() {
  const trimmed = trackingNumber.value.trim()
  if (!trimmed) {
    inputError.value = t('track.emptyInputError')
    return
  }
  router.push(localePath(`/track/${encodeURIComponent(trimmed)}`))
}
</script>

<style scoped>
.track-input {
  position: relative;
  overflow: hidden;
  min-height: 70vh;
  background:
    radial-gradient(circle at 12% 12%, rgba(59, 89, 152, 0.16), transparent 32%),
    radial-gradient(circle at 86% 10%, rgba(255, 107, 107, 0.1), transparent 30%),
    linear-gradient(180deg, rgba(245, 245, 245, 0.9), rgba(255, 255, 255, 0));
}

.track-input__layout {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(24rem, 1.05fr);
  gap: var(--spacing-16);
  align-items: center;
}

.track-input__story {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.track-input__eyebrow,
.track-input__card-kicker {
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 800;
}

.track-input__eyebrow {
  display: inline-flex;
  width: fit-content;
  border: 1px solid rgba(26, 59, 102, 0.1);
  border-radius: var(--radius-full);
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(255, 255, 255, 0.76);
  box-shadow: var(--shadow-sm);
}

.track-input__title {
  max-width: 11ch;
  font-size: var(--text-6xl);
  letter-spacing: -0.04em;
}

html[lang='ar'] .track-input__title {
  letter-spacing: -0.015em;
}

.track-input__text {
  max-width: 40rem;
  color: var(--color-text-secondary);
  font-size: var(--text-xl);
  line-height: 1.85;
}

.track-input__visual {
  position: relative;
  display: grid;
  min-height: 18rem;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-4xl);
  background: var(--gradient-hero);
  box-shadow: var(--shadow-glow);
  overflow: hidden;
}

.track-input__visual-glow {
  position: absolute;
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
}

.track-input__visual-card {
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

.track-input__visual-card--top {
  inset-block-start: var(--spacing-8);
  inset-inline-end: var(--spacing-8);
}

.track-input__visual-card--bottom {
  inset-block-end: var(--spacing-8);
  inset-inline-start: var(--spacing-8);
}

.track-input__card {
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-4xl);
  padding: var(--spacing-10);
  background:
    radial-gradient(circle at 14% 0%, rgba(59, 89, 152, 0.08), transparent 36%),
    var(--glass-bg);
  box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(18px);
}

.track-input__card-head {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  margin-block-end: var(--spacing-8);
}

.track-input__card-title {
  margin-block-start: var(--spacing-1);
  font-size: var(--text-2xl);
}

.track-input__form {
  display: flex;
  gap: var(--spacing-4);
  align-items: flex-end;
  margin-block-end: var(--spacing-4);
}

.track-input__field-wrapper {
  flex: 1;
}

.track-input__hint {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-block: var(--spacing-4) var(--spacing-5);
}

.track-input__privacy-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-4);
  background: rgba(255, 255, 255, 0.72);
  box-shadow: var(--shadow-sm);
}

.track-input__privacy-card p {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.7;
}

.track-input__mock-notice {
  margin-block-start: var(--spacing-8);
}

@media (max-width: 64rem) {
  .track-input__layout {
    grid-template-columns: 1fr;
    gap: var(--spacing-10);
  }

  .track-input__title {
    max-width: 14ch;
  }
}

@media (max-width: 36rem) {
  .track-input__title {
    font-size: var(--text-4xl);
  }

  .track-input__card {
    padding: var(--spacing-6);
  }

  .track-input__card-head,
  .track-input__privacy-card {
    align-items: flex-start;
  }

  .track-input__form {
    flex-direction: column;
    align-items: stretch;
  }

  .track-input__visual {
    min-height: 15rem;
  }

  .track-input__visual-card {
    position: static;
    margin: var(--spacing-2);
  }
}
</style>
