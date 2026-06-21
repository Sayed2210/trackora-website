export interface SubscribeSession {
  accessToken: string
  refreshToken: string
  expiresAt: number | null
  tenant?: unknown
  subscription?: unknown
  plan?: unknown
  user?: unknown
  storedAt: number
}

const STORAGE_KEY = 'trackora:auth'

function readStorage(): SubscribeSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as SubscribeSession
    if (!parsed || typeof parsed.accessToken !== 'string' || !parsed.accessToken) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function writeStorage(session: SubscribeSession) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Storage may be unavailable (private mode / quota). Fail silently.
  }
}

function removeStorage() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export function useAuthStorage() {
  const session = ref<SubscribeSession | null>(null)
  const isAuthenticated = computed(() => !!session.value?.accessToken)

  if (typeof window !== 'undefined') {
    session.value = readStorage()
  }

  function saveSession(input: {
    accessToken: string
    refreshToken: string
    expiresIn?: number
    tenant?: unknown
    subscription?: unknown
    plan?: unknown
    user?: unknown
  }) {
    const next: SubscribeSession = {
      accessToken: input.accessToken,
      refreshToken: input.refreshToken,
      expiresAt:
        typeof input.expiresIn === 'number' && input.expiresIn > 0
          ? Date.now() + input.expiresIn * 1000
          : null,
      tenant: input.tenant,
      subscription: input.subscription,
      plan: input.plan,
      user: input.user,
      storedAt: Date.now(),
    }
    session.value = next
    writeStorage(next)
  }

  function clearSession() {
    session.value = null
    removeStorage()
  }

  function refresh() {
    session.value = readStorage()
    return session.value
  }

  return { session, isAuthenticated, saveSession, clearSession, refresh }
}
