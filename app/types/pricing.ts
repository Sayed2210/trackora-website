export interface PublicPlan {
  id: string
  slug: string
  name: string
  description: string
  priceMonthly: number | null
  priceYearly: number | null
  currency: string
  shipmentLimit: number | null
  features: string[]
  isPopular: boolean
  ctaLabel: string
  ctaHref: string
}