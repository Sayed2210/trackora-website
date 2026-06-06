<template>
  <div class="app-textarea" :class="{ 'app-textarea--error': error }">
    <label v-if="label" :for="inputId" class="app-textarea__label">{{ label }}</label>
    <textarea
      :id="inputId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :aria-invalid="!!error"
      :aria-describedby="describedBy"
      class="app-textarea__field"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <p v-if="hint && !error" :id="hintId" class="app-textarea__hint">{{ hint }}</p>
    <p v-if="error" :id="errorId" class="app-textarea__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const inputId = useId()
const hintId = `${inputId}-hint`
const errorId = `${inputId}-error`

const props = withDefaults(defineProps<{
  label?: string
  modelValue?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  rows?: number
}>(), {
  modelValue: '',
  placeholder: '',
  hint: '',
  error: '',
  disabled: false,
  rows: 4,
})

defineEmits<{ 'update:modelValue': [value: string] }>()

const describedBy = computed(() => {
  if (props.error) return errorId
  if (props.hint) return hintId
  return undefined
})
</script>

<style scoped>
.app-textarea {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.app-textarea__label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
}

.app-textarea__field {
  padding: 0.85rem var(--spacing-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-text);
  background-color: var(--color-surface);
  resize: vertical;
  line-height: 1.7;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.app-textarea__field::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.6;
}

.app-textarea__field:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(27, 77, 92, 0.12);
}

.app-textarea__field:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--color-bg-alt);
}

.app-textarea--error .app-textarea__field {
  border-color: var(--color-danger);
}

.app-textarea--error .app-textarea__field:focus-visible {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.12);
}

.app-textarea__hint {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.app-textarea__error {
  font-size: var(--text-sm);
  color: var(--color-danger);
  font-weight: 500;
}
</style>
