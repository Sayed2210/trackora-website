export function useContactService() {
  const loading = ref(false)
  const success = ref(false)
  const error = ref<string | null>(null)

  async function submit(payload: Record<string, string>) {
    loading.value = true
    success.value = false
    error.value = null

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Contact form submitted:', payload)
      success.value = true
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  function reset() {
    loading.value = false
    success.value = false
    error.value = null
  }

  return { loading, success, error, submit, reset }
}