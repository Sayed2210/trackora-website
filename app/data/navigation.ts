export const navigationItems = [
  { key: 'home', pathAr: '/', pathEn: '/en' },
  { key: 'features', pathAr: '/features', pathEn: '/en/features' },
  { key: 'solutions', pathAr: '/solutions/shipping-companies', pathEn: '/en/solutions/shipping-companies' },
  { key: 'pricing', pathAr: '/pricing', pathEn: '/en/pricing' },
  { key: 'trackShipment', pathAr: '/track', pathEn: '/en/track' },
  { key: 'requestDemo', pathAr: '/request-demo', pathEn: '/en/request-demo' },
]

export const loginItems = [
  { key: 'loginMerchant', href: '#merchant-login' },
  { key: 'loginShippingCompany', href: '#shipping-company-login' },
  { key: 'loginCourier', href: '#courier-login' },
  { key: 'loginAdmin', href: '#admin-login' },
]

export const footerGroups = [
  {
    key: 'product',
    links: [
      { key: 'features', pathAr: '/features', pathEn: '/en/features' },
      { key: 'pricing', pathAr: '/pricing', pathEn: '/en/pricing' },
      { key: 'trackShipment', pathAr: '/track', pathEn: '/en/track' },
      { key: 'requestDemo', pathAr: '/request-demo', pathEn: '/en/request-demo' },
    ],
  },
  {
    key: 'solutions',
    links: [
      { key: 'shippingCompanies', pathAr: '/solutions/shipping-companies', pathEn: '/en/solutions/shipping-companies' },
      { key: 'ecommerceStores', pathAr: '/solutions/ecommerce-stores', pathEn: '/en/solutions/ecommerce-stores' },
      { key: 'socialSellers', pathAr: '/solutions/social-sellers', pathEn: '/en/solutions/social-sellers' },
    ],
  },
  {
    key: 'company',
    links: [
      { key: 'blog', pathAr: '/blog', pathEn: '/en/blog' },
      { key: 'contact', pathAr: '/contact', pathEn: '/en/contact' },
    ],
  },
]
