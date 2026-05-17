<template>
  <div class="app-textarea" :class="{ 'app-textarea--error': error }">
    <label v-if="label" :for="inputId" class="app-textarea__label">{{ label }}</label>
    <textarea
      :id="inputId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      class="app-textarea__field"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <p v-if="hint && !error" class="app-textarea__hint">{{ hint }}</p>
    <p v-if="error" class="app-textarea__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const inputId = useId()

withDefaults(defineProps<{
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
</script>

<style scoped>
.app-textarea {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.app-textarea__label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text);
}

.app-textarea__field {
  padding: var(--spacing-3) var(--spacing-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-text);
  background-color: var(--color-surface);
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.app-textarea__field:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(27, 77, 92, 0.15);
}

.app-textarea__field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.app-textarea--error .app-textarea__field {
  border-color: var(--color-error);
}

.app-textarea__hint {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.app-textarea__error {
  font-size: var(--text-sm);
  color: var(--color-error);
}
</style>