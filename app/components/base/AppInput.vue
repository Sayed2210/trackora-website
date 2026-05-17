<template>
  <div class="app-input" :class="{ 'app-input--error': error }">
    <label v-if="label" :for="inputId" class="app-input__label">{{ label }}</label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="app-input__field"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="hint && !error" class="app-input__hint">{{ hint }}</p>
    <p v-if="error" class="app-input__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const inputId = useId()

withDefaults(defineProps<{
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
</script>

<style scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.app-input__label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
}

.app-input__field {
  padding: var(--spacing-3) var(--spacing-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-text);
  background-color: var(--color-surface);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.app-input__field:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(27, 77, 92, 0.15);
}

.app-input__field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.app-input--error .app-input__field {
  border-color: var(--color-error);
}

.app-input__hint {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.app-input__error {
  font-size: var(--text-sm);
  color: var(--color-error);
}
</style>