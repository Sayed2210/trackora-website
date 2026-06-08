<template>
  <div>
    <section class="track-input section" aria-labelledby="track-heading">
      <AppContainer>
        <div class="track-input__layout">
          <div class="track-input__story reveal-up">
            <p class="track-input__eyebrow">{{ t('track.lookupKicker') }}</p>
            <h1 id="track-heading" class="track-input__title">{{ t('track.heading') }}</h1>
            <p class="track-input__text">{{ t('track.subtitle') }}</p>

            <div class="tracking-ledger" aria-hidden="true">
              <div class="tracking-ledger__route">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="tracking-ledger__receipt">
                <div class="tracking-ledger__receipt-head">
                  <span dir="ltr">TRK-240502-A1B2</span>
                  <strong>{{ locale === 'ar' ? 'خارج للتوصيل' : 'Out for delivery' }}</strong>
                </div>
                <div class="tracking-ledger__row">
                  <span>{{ t('track.lookupProofStatus') }}</span>
                  <b>{{ locale === 'ar' ? 'اليوم 10:30' : 'Today 10:30' }}</b>
                </div>
                <div class="tracking-ledger__row">
                  <span>{{ t('track.lookupProofPrivacy') }}</span>
                  <b dir="ltr">0100*****01</b>
                </div>
                <div class="tracking-ledger__row tracking-ledger__row--accent">
                  <span>{{ t('track.lookupProofSupport') }}</span>
                  <b>{{ locale === 'ar' ? 'المندوب في الطريق' : 'Courier on route' }}</b>
                </div>
              </div>
            </div>
          </div>

          <div class="track-input__card reveal-scale">
            <div class="track-input__card-head">
              <AppIcon3D name="shipment" alt="" size="md" />
              <div>
                <p class="track-input__card-kicker">{{ t('track.trackingNumber') }}</p>
                <h2 class="track-input__card-title">{{ t('track.lookupCardTitle') }}</h2>
              </div>
            </div>

            <form class="track-input__form" novalidate @submit.prevent="handleTrack">
              <div class="track-input__field-wrapper">
                <AppInput
                  :label="locale === 'ar' ? 'رقم الشحنة' : 'Tracking number'"
                  :placeholder="t('track.inputPlaceholder')"
                  :model-value="trackingNumber"
                  :hint="t('track.exampleFormat')"
                  :error="inputError"
                  type="text"
                  inputmode="text"
                  autocomplete="off"
                  @update:model-value="trackingNumber = $event; inputError = ''"
                />
              </div>
              <AppButton type="submit" variant="primary" :loading="submitting" :disabled="submitting">
                {{ submitting ? t('track.loading') : t('track.submitButton') }}
              </AppButton>
            </form>

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
const submitting = ref(false)

const { setSeo } = useLocaleSeo()
useScrollReveal()

setSeo(
  locale.value === 'ar' ? 'تتبّع شحنتك' : 'Track Your Shipment',
  locale.value === 'ar'
    ? 'أدخل رقم الشحنة لمعرفة حالة التوصيل عبر تراكورا.'
    : 'Enter your tracking number to check delivery status via Trackora.'
)

async function handleTrack() {
  const trimmed = trackingNumber.value.trim()
  if (!trimmed) {
    inputError.value = t('track.emptyInputError')
    return
  }
  if (!/[\p{L}\p{N}]{5,}/u.test(trimmed.replace(/[\s-]/g, ''))) {
    inputError.value = t('track.formatError')
    return
  }

  submitting.value = true
  await router.push(localePath(`/track/${encodeURIComponent(trimmed)}`))
}
</script>

<style scoped>
.track-input {
  position: relative;
  overflow: hidden;
  min-height: 70vh;
  background:
    radial-gradient(circle at 14% 10%, rgba(45, 110, 125, 0.1), transparent 30%),
    linear-gradient(180deg, rgba(247, 249, 250, 0.82), rgba(255, 255, 255, 0));
}

.track-input__layout {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(24rem, 1.05fr);
  gap: clamp(var(--spacing-10), 7vw, var(--spacing-20));
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
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-full);
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--color-surface);
}

.track-input__title {
  max-width: 13ch;
  font-size: var(--text-6xl);
  letter-spacing: -0.04em;
  text-wrap: balance;
}

html[lang='ar'] .track-input__title {
  letter-spacing: -0.015em;
}

.track-input__text {
  max-width: 42rem;
  color: var(--color-text-secondary);
  font-size: var(--text-xl);
  line-height: 1.85;
  text-wrap: pretty;
}

.tracking-ledger {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 18rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-3xl);
  background:
    radial-gradient(circle at 24% 20%, rgba(232, 168, 56, 0.1), transparent 12rem),
    linear-gradient(145deg, #0b2933 0%, var(--color-primary) 62%, #123d4c 100%);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  isolation: isolate;
}

.tracking-ledger__route {
  position: absolute;
  inset-inline: 12%;
  top: 35%;
  height: 2px;
  background: linear-gradient(90deg, rgba(232, 168, 56, 0), rgba(232, 168, 56, 0.58), rgba(232, 168, 56, 0));
  transform: rotate(-8deg);
}

.tracking-ledger__route span {
  position: absolute;
  top: -0.45rem;
  width: 0.9rem;
  height: 0.9rem;
  border: 2px solid rgba(255, 255, 255, 0.74);
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 0.35rem rgba(232, 168, 56, 0.1);
}

.tracking-ledger__route span:nth-child(1) { inset-inline-start: 0; }
.tracking-ledger__route span:nth-child(2) { inset-inline-start: 48%; }
.tracking-ledger__route span:nth-child(3) { inset-inline-end: 0; }

.tracking-ledger__receipt {
  position: relative;
  z-index: 1;
  width: min(82%, 24rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-5);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 22px 54px rgba(0, 0, 0, 0.24);
}

.tracking-ledger__receipt-head,
.tracking-ledger__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-4);
}

.tracking-ledger__receipt-head {
  margin-block-end: var(--spacing-4);
  padding-block-end: var(--spacing-4);
  border-bottom: 1px solid rgba(27, 77, 92, 0.1);
}

.tracking-ledger__receipt-head span {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 800;
}

.tracking-ledger__receipt-head strong {
  border-radius: var(--radius-full);
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--color-accent-light);
  color: var(--color-accent-contrast);
  font-size: var(--text-sm);
}

.tracking-ledger__row {
  border-radius: var(--radius-xl);
  padding: var(--spacing-3);
}

.tracking-ledger__row span {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

.tracking-ledger__row b {
  color: var(--color-text);
  font-size: var(--text-sm);
}

.tracking-ledger__row--accent {
  background: rgba(45, 110, 125, 0.08);
}

.track-input__card {
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-10);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
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
  align-items: flex-start;
  margin-block-end: var(--spacing-4);
}

.track-input__field-wrapper {
  flex: 1;
}

.track-input__privacy-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  border-radius: var(--radius-xl);
  padding-block: var(--spacing-2);
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
    max-width: 17ch;
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

  .tracking-ledger {
    min-height: 15rem;
  }

  .tracking-ledger__receipt {
    width: calc(100% - var(--spacing-8));
    padding: var(--spacing-4);
  }

  .tracking-ledger__receipt-head,
  .tracking-ledger__row {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--spacing-2);
  }
}
</style>
