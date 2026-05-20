<template>
  <div class="app-input" :class="{ 'app-input--error': error }">
    <label v-if="label" :for="inputId" class="app-input__label">{{ label }}</label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="!!error"
      :aria-describedby="describedBy"
      class="app-input__field"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="hint && !error" :id="hintId" class="app-input__hint">{{ hint }}</p>
    <p v-if="error" :id="errorId" class="app-input__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const inputId = useId()
const hintId = `${inputId}-hint`
const errorId = `${inputId}-error`

const props = withDefaults(defineProps<{
  label?: string
  type?: string
  modelValue?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
}>(), {
  type: 'text',
  modelValue: '',
  placeholder: '',
  hint: '',
  error: '',
  disabled: false,
})

defineEmits<{ 'update:modelValue': [value: string] }>()

const describedBy = computed(() => {
  if (props.error) return errorId
  if (props.hint) return hintId
  return undefined
})
</script>

<style scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.app-input__label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
}

.app-input__field {
  padding: 0.85rem var(--spacing-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-text);
  background-color: var(--color-surface);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.app-input__field::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.6;
}

.app-input__field:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(26, 59, 102, 0.12);
}

.app-input__field:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--color-bg-alt);
}

.app-input--error .app-input__field {
  border-color: var(--color-danger);
}

.app-input--error .app-input__field:focus-visible {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.12);
}

.app-input__hint {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.app-input__error {
  font-size: var(--text-sm);
  color: var(--color-danger);
  font-weight: 500;
}
</style>
