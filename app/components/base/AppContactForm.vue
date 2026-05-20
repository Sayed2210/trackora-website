<template>
  <div class="app-contact-form">
    <div v-if="successState" class="app-contact-form__success">
      <span class="app-contact-form__success-icon" aria-hidden="true">✓</span>
      <p class="app-contact-form__success-text">{{ successMessage }}</p>
      <AppButton variant="outline" @click="$emit('reset')">{{ locale === 'ar' ? 'إرسال طلب آخر' : 'Send another' }}</AppButton>
    </div>

    <div v-else>
      <div v-if="errorState" class="app-contact-form__error-banner">
        {{ errorMessage }}
      </div>

      <form class="app-contact-form__form" @submit.prevent="handleSubmit">
        <div v-for="field in fields" :key="field.key" :class="['app-contact-form__field', { 'app-contact-form__field--full': field.type === 'textarea' }]">
          <AppInput
            v-if="field.type !== 'select' && field.type !== 'textarea'"
            :label="locale === 'ar' ? field.labelAr : field.labelEn"
            :type="field.type"
            :placeholder="locale === 'ar' ? field.placeholderAr : field.placeholderEn"
            :model-value="formValues[field.key]"
            :error="errors[field.key]"
            :disabled="loadingState"
            @update:model-value="formValues[field.key] = $event"
          />
          <div v-else-if="field.type === 'select'" class="app-input">
            <label :for="field.key" class="app-input__label">{{ locale === 'ar' ? field.labelAr : field.labelEn }}</label>
            <select
              :id="field.key"
              v-model="formValues[field.key]"
              :disabled="loadingState"
              :aria-invalid="!!errors[field.key]"
              :aria-describedby="errors[field.key] ? fieldErrorId(field.key) : undefined"
              :class="['app-input__field', { 'app-input__field--error': errors[field.key] }]"
            >
              <option value="" disabled>{{ locale === 'ar' ? field.placeholderAr : field.placeholderEn }}</option>
              <option v-for="opt in field.options" :key="opt.value" :value="opt.value">{{ locale === 'ar' ? opt.labelAr : opt.labelEn }}</option>
            </select>
            <p v-if="errors[field.key]" :id="fieldErrorId(field.key)" class="app-input__error">{{ errors[field.key] }}</p>
          </div>
          <AppTextarea
            v-else-if="field.type === 'textarea'"
            :label="locale === 'ar' ? field.labelAr : field.labelEn"
            :placeholder="locale === 'ar' ? field.placeholderAr : field.placeholderEn"
            :model-value="formValues[field.key]"
            :error="errors[field.key]"
            :disabled="loadingState"
            :rows="4"
            @update:model-value="formValues[field.key] = $event"
          />
        </div>

        <AppButton type="submit" variant="primary" :loading="loadingState" block>
          {{ submitLabel }}
        </AppButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContactFormField } from '~/data/forms'

const props = defineProps<{
  fields: ContactFormField[]
  submitLabel: string
  successMessage: string
  errorMessage: string
  loadingState: boolean
  successState: boolean
  errorState: boolean
}>()

const emit = defineEmits<{ submit: [payload: Record<string, string>]; reset: [] }>()

const { locale } = useI18n()

const formValues = reactive<Record<string, string>>({})
const errors = reactive<Record<string, string>>({})

for (const field of props.fields) {
  formValues[field.key] = ''
  errors[field.key] = ''
}

function validate() {
  let valid = true
  for (const field of props.fields) {
    if (field.required && !formValues[field.key].trim()) {
      errors[field.key] = locale.value === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required'
      valid = false
    } else if (field.type === 'email' && formValues[field.key] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues[field.key])) {
      errors[field.key] = locale.value === 'ar' ? 'بريد إلكتروني غير صالح' : 'Invalid email address'
      valid = false
    } else {
      errors[field.key] = ''
    }
  }
  return valid
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', { ...formValues })
}

function fieldErrorId(key: string) {
  return `${key}-error`
}
</script>

<style scoped>
.app-contact-form__form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-6) var(--spacing-5);
}

.app-contact-form__field--full {
  grid-column: 1 / -1;
}

.app-contact-form__success {
  text-align: center;
  border: 1px solid rgba(34, 197, 94, 0.16);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-12) var(--spacing-6);
  background: rgba(34, 197, 94, 0.06);
}

.app-contact-form__success-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--color-success);
  color: white;
  font-size: var(--text-3xl);
  font-weight: 700;
  margin-block-end: var(--spacing-6);
}

.app-contact-form__success-text {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text);
  margin-block-end: var(--spacing-6);
}

.app-contact-form__error-banner {
  border: 1px solid rgba(239, 68, 68, 0.18);
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-danger);
  padding: var(--spacing-4) var(--spacing-5);
  border-radius: var(--radius-2xl);
  margin-block-end: var(--spacing-6);
  font-weight: 600;
}

.app-contact-form__field select.app-input__field {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235A6270' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left var(--spacing-4) center;
  padding-inline-start: var(--spacing-4);
  padding-inline-end: var(--spacing-10);
}

.app-contact-form :deep(.app-input__label),
.app-contact-form :deep(.app-textarea__label) {
  font-weight: 800;
}

.app-contact-form :deep(.app-input__field),
.app-contact-form :deep(.app-textarea__field) {
  min-height: 3.35rem;
  border-color: rgba(26, 59, 102, 0.1);
  background: rgba(255, 255, 255, 0.88);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.app-contact-form :deep(.app-textarea__field) {
  min-height: 8.5rem;
}

[dir="ltr"] .app-contact-form__field select.app-input__field {
  background-position: right var(--spacing-4) center;
}

.app-contact-form__field select.app-input__field--error {
  border-color: var(--color-error);
}

@media (max-width: 36rem) {
  .app-contact-form__form {
    grid-template-columns: 1fr;
  }
}
</style>
