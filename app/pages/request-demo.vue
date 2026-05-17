<template>
  <div>
    <section class="demo section" aria-labelledby="demo-heading">
      <AppContainer narrow>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'عرض توضيحي' : 'Demo'"
          :title="t('requestDemo.heading')"
          :description="t('requestDemo.subtitle')"
        />

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
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { requestDemoFields } from '~/data/forms'

const { t, locale } = useI18n()
const { loading, success, error, submit, reset } = useRequestDemoService()
const { setSeo } = useLocaleSeo()

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
  min-height: 60vh;
}
</style>