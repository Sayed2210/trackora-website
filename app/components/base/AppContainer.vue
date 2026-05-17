<template>
  <div :class="['app-container', { 'app-container--narrow': narrow }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  narrow?: boolean
}>(), {
  narrow: false,
})
</script>

<style scoped>
.app-container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--spacing-6);
}

.app-container--narrow {
  max-width: var(--container-narrow);
}

@media (max-width: 36rem) {
  .app-container {
    padding-inline: var(--spacing-4);
  }
}
</style>