export interface TrackingTimelineEntry {
  status: string
  description: string
  timestamp: string | null
  completed: boolean
}

export interface TrackingData {
  trackingNumber: string
  status: string
  merchantName: string
  estimatedDelivery: string | null
  customerName: string
  customerPhoneMasked: string
  timeline: TrackingTimelineEntry[]
}

interface TrackingApiResponse {
  success: boolean
  data?: TrackingData
  message?: string
}

const MOCK_DATA: TrackingData = {
  trackingNumber: 'TRK-240502-A1B2',
  status: 'OUT_FOR_DELIVERY',
  merchantName: 'TechStore Egypt',
  estimatedDelivery: '2024-05-03',
  customerName: 'Mohamed Ali',
  customerPhoneMasked: '0100*****01',
  timeline: [
    { status: 'PENDING', description: 'Order received', timestamp: '2024-05-02T08:00:00Z', completed: true },
    { status: 'PICKED_UP', description: 'Picked up by courier', timestamp: '2024-05-02T09:15:00Z', completed: true },
    { status: 'IN_WAREHOUSE', description: 'Arrived at distribution center', timestamp: '2024-05-02T09:45:00Z', completed: true },
    { status: 'OUT_FOR_DELIVERY', description: 'Out for delivery today', timestamp: '2024-05-02T10:30:00Z', completed: true },
    { status: 'DELIVERED', description: 'Delivered to customer', timestamp: null, completed: false },
  ],
}

function normalizeTrackingData(raw: TrackingData): TrackingData {
  return {
    trackingNumber: raw.trackingNumber,
    status: raw.status,
    merchantName: raw.merchantName,
    estimatedDelivery: raw.estimatedDelivery,
    customerName: raw.customerName,
    customerPhoneMasked: raw.customerPhoneMasked,
    timeline: (raw.timeline || []).map((entry: TrackingTimelineEntry) => ({
      status: entry.status,
      description: entry.description,
      timestamp: entry.timestamp,
      completed: entry.completed,
    })),
  }
}

export function useTrackingService() {
  const config = useRuntimeConfig()
  const loading = ref(false)
  const data = ref<TrackingData | null>(null)
  const notFound = ref(false)
  const error = ref<string | null>(null)

  async function fetchTracking(trackingNumber: string) {
    loading.value = true
    notFound.value = false
    data.value = null
    error.value = null

    const isMock = config.public.enableMockTracking as boolean

    if (isMock) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      if (trackingNumber === MOCK_DATA.trackingNumber) {
        data.value = normalizeTrackingData(MOCK_DATA)
      } else {
        notFound.value = true
      }
      loading.value = false
      return
    }

    try {
      const baseUrl = config.public.apiBaseUrl as string
      const response = await $fetch<TrackingApiResponse>(`${baseUrl}/tracking/${trackingNumber}`)
      if (response.success && response.data) {
        data.value = normalizeTrackingData(response.data)
      } else {
        notFound.value = true
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'statusCode' in err && (err as { statusCode: number }).statusCode === 404) {
        notFound.value = true
      } else {
        error.value = err instanceof Error ? err.message : 'An error occurred while fetching tracking data'
      }
    } finally {
      loading.value = false
    }
  }

  function reset() {
    loading.value = false
    data.value = null
    notFound.value = false
    error.value = null
  }

  return { loading, data, notFound, error, fetchTracking, reset }
}