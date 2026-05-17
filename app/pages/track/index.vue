<template>
  <div>
    <section class="track-input section" aria-labelledby="track-heading">
      <AppContainer narrow>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'تتبّع' : 'Track'"
          :title="t('track.heading')"
          :description="t('track.subtitle')"
        />

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
        <p class="track-input__privacy">{{ t('track.privacyNote') }}</p>

        <div v-if="config.public.enableMockTracking" class="track-input__mock-notice">
          <AppBadge variant="accent">{{ t('track.mockNotice') }}</AppBadge>
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
.track-input__form {
  display: flex;
  gap: var(--spacing-4);
  align-items: flex-end;
  max-width: 32rem;
  margin-inline: auto;
  margin-block-end: var(--spacing-4);
}

.track-input__field-wrapper {
  flex: 1;
}

.track-input__hint {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  text-align: center;
  margin-block-end: var(--spacing-2);
}

.track-input__privacy {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  text-align: center;
}

.track-input__mock-notice {
  text-align: center;
  margin-block-start: var(--spacing-8);
}

@media (max-width: 36rem) {
  .track-input__form {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>