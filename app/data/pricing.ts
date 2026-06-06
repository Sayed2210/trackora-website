export interface LocalizedPricingPlan {
  key: 'starter' | 'growth' | 'scale'
  slug: string
  nameAr: string
  nameEn: string
  audienceAr: string
  audienceEn: string
  priceAr: string
  priceEn: string
  descriptionAr: string
  descriptionEn: string
  featuresAr: string[]
  featuresEn: string[]
  ctaAr: string
  ctaEn: string
  ctaHref: string
  shipmentLimit: number | null
  priceMonthly: number | null
  priceYearly: number | null
  currency: string
  highlighted: boolean
  overageAr: string
  overageEn: string
}

export interface PricingComparisonRow {
  featureAr: string
  featureEn: string
  starterAr: string
  starterEn: string
  growthAr: string
  growthEn: string
  scaleAr: string
  scaleEn: string
}

export interface PricingObjection {
  titleAr: string
  titleEn: string
  textAr: string
  textEn: string
}

export const pricingPlans: LocalizedPricingPlan[] = [
  {
    key: 'starter',
    slug: 'starter',
    nameAr: 'المبتدئة',
    nameEn: 'Starter',
    priceAr: 'مجاني',
    priceEn: 'Free',
    audienceAr: 'للمتاجر الصغيرة',
    audienceEn: 'For small stores',
    descriptionAr: 'للمتاجر الصغيرة التي تبدأ تنظيم الشحنات والتحصيل بدل الجداول والمكالمات.',
    descriptionEn: 'For small stores starting to organize shipments and COD collection without spreadsheets and calls.',
    featuresAr: ['حتى ١٠٠ شحنة شهرياً', 'مستخدمان لفريق المتجر', 'بوابة تاجر أساسية', 'تتبّع عام للشحنات', 'دعم عبر البريد'],
    featuresEn: ['Up to 100 shipments/month', '2 store team users', 'Basic merchant portal', 'Public shipment tracking', 'Email support'],
    ctaAr: 'ابدأ بخطة البداية',
    ctaEn: 'Start with Starter',
    ctaHref: '/request-demo?plan=starter',
    shipmentLimit: 100,
    priceMonthly: 0,
    priceYearly: 0,
    currency: 'EGP',
    highlighted: false,
    overageAr: 'عند تجاوز ١٠٠ شحنة، نساعدك على الانتقال لخطة النمو دون فقد بياناتك.',
    overageEn: 'If you pass 100 shipments, we help you move to Growth without losing your data.',
  },
  {
    key: 'growth',
    slug: 'growth',
    nameAr: 'النمو',
    nameEn: 'Growth',
    priceAr: 'حسب الاستخدام',
    priceEn: 'Usage-based',
    audienceAr: 'لفرق التشغيل النشطة',
    audienceEn: 'For active operations teams',
    descriptionAr: 'لفرق التشغيل التي تحتاج dispatch، مناديب، محفظة COD، وتقارير يومية.',
    descriptionEn: 'For operations teams that need dispatch, couriers, COD wallet, and daily reports.',
    featuresAr: ['حتى ٥٬٠٠٠ شحنة شهرياً', '١٠ مستخدمين لفريق التشغيل', 'حتى ٥٠ مندوب', 'Smart Dispatch و Bulk Upload', 'محفظة COD وتسوية التحصيل'],
    featuresEn: ['Up to 5,000 shipments/month', '10 operations users', 'Up to 50 couriers', 'Smart Dispatch and Bulk Upload', 'COD wallet and collection settlement'],
    ctaAr: 'اطلب عرض لخطة النمو',
    ctaEn: 'Request a Growth demo',
    ctaHref: '/request-demo?plan=growth',
    shipmentLimit: 5000,
    priceMonthly: null,
    priceYearly: null,
    currency: 'EGP',
    highlighted: true,
    overageAr: 'إذا زاد الاستخدام، نراجع حجم الشحنات والمناديب ونقترح تسعيراً يحافظ على الهامش.',
    overageEn: 'If usage grows, we review shipment and courier volume and propose pricing that protects margin.',
  },
  {
    key: 'scale',
    slug: 'scale',
    nameAr: 'التوسع',
    nameEn: 'Scale',
    priceAr: 'مخصص',
    priceEn: 'Custom',
    audienceAr: 'لشركات الشحن والفروع',
    audienceEn: 'For shipping companies and branches',
    descriptionAr: 'لشركات الشحن أو العمليات متعددة الفروع التي تحتاج تخصيصاً ودعماً متقدماً.',
    descriptionEn: 'For shipping companies or multi-branch operations that need customization and advanced support.',
    featuresAr: ['حجم شحنات مخصص', 'مستخدمون ومناديب حسب التشغيل', 'فروع ومناطق متعددة', 'Fraud Detection وتقارير مخصصة', 'دعم إعداد وتدريب متقدم'],
    featuresEn: ['Custom shipment volume', 'Users and couriers by operation size', 'Multiple branches and zones', 'Fraud Detection and custom reports', 'Advanced setup and training support'],
    ctaAr: 'احصل على تسعير مخصص',
    ctaEn: 'Get custom pricing',
    ctaHref: '/contact?topic=scale-pricing',
    shipmentLimit: null,
    priceMonthly: null,
    priceYearly: null,
    currency: 'EGP',
    highlighted: false,
    overageAr: 'يتم تحديد السعة، SLA، وتكلفة الفروع حسب طريقة التشغيل وحجم التحصيل.',
    overageEn: 'Capacity, SLA, and branch pricing are set around your operation model and COD volume.',
  },
]

export const pricingObjections: PricingObjection[] = [
  {
    titleAr: 'السعة ليست رقماً واحداً',
    titleEn: 'Capacity is not one number',
    textAr: 'نقيس عدد الشحنات شهرياً مع المستخدمين والمناديب حتى لا تدفع لخطة لا تناسب فريق التشغيل.',
    textEn: 'We read monthly shipments alongside users and couriers, so you do not pay for a plan that misses your operations shape.',
  },
  {
    titleAr: 'COD يحتاج تسوية واضحة',
    titleEn: 'COD needs clear settlement',
    textAr: 'خطة النمو وما بعدها تضيف محفظة COD، متابعة التحصيل، وتسوية المحافظ مع تقارير قابلة للمراجعة.',
    textEn: 'Growth and Scale add COD wallet, collection follow-up, and wallet settlement with auditable reports.',
  },
  {
    titleAr: 'ماذا يحدث عند تجاوز الاستخدام؟',
    titleEn: 'What happens when usage grows?',
    textAr: 'لا نوقف التتبع أو المناديب فجأة. يراجع فريق Trackora حجمك ويقترح ترقية أو تسعيراً مخصصاً.',
    textEn: 'We do not suddenly stop tracking or couriers. The Trackora team reviews usage and suggests an upgrade or custom pricing.',
  },
]

export const pricingComparisonRows: PricingComparisonRow[] = [
  { featureAr: 'عدد الشحنات شهرياً', featureEn: 'Monthly shipments', starterAr: 'حتى ١٠٠', starterEn: 'Up to 100', growthAr: 'حتى ٥٬٠٠٠', growthEn: 'Up to 5,000', scaleAr: 'مخصص', scaleEn: 'Custom' },
  { featureAr: 'عدد المستخدمين', featureEn: 'Users', starterAr: '٢', starterEn: '2', growthAr: '١٠', growthEn: '10', scaleAr: 'حسب الفروع', scaleEn: 'By branch needs' },
  { featureAr: 'عدد المناديب', featureEn: 'Couriers', starterAr: 'غير مشمول', starterEn: 'Not included', growthAr: 'حتى ٥٠', growthEn: 'Up to 50', scaleAr: 'مخصص', scaleEn: 'Custom' },
  { featureAr: 'بوابة التاجر', featureEn: 'Merchant portal', starterAr: 'أساسية', starterEn: 'Basic', growthAr: 'متقدمة', growthEn: 'Advanced', scaleAr: 'متعددة الفروع', scaleEn: 'Multi-branch' },
  { featureAr: 'تطبيق المندوب', featureEn: 'Courier app', starterAr: 'غير مشمول', starterEn: 'Not included', growthAr: 'مشمول', growthEn: 'Included', scaleAr: 'مشمول مع إعداد', scaleEn: 'Included with setup' },
  { featureAr: 'محفظة COD', featureEn: 'COD wallet', starterAr: 'عرض رصيد أساسي', starterEn: 'Basic balance view', growthAr: 'تحصيل وتسوية', growthEn: 'Collection and settlement', scaleAr: 'قواعد وتسويات مخصصة', scaleEn: 'Custom rules and settlements' },
  { featureAr: 'Smart Dispatch', featureEn: 'Smart Dispatch', starterAr: 'غير مشمول', starterEn: 'Not included', growthAr: 'مشمول', growthEn: 'Included', scaleAr: 'مشمول ومخصص', scaleEn: 'Included and customized' },
  { featureAr: 'Bulk Upload', featureEn: 'Bulk Upload', starterAr: 'ملفات صغيرة', starterEn: 'Small files', growthAr: 'مشمول', growthEn: 'Included', scaleAr: 'قوالب مخصصة', scaleEn: 'Custom templates' },
  { featureAr: 'Fraud Detection', featureEn: 'Fraud Detection', starterAr: 'غير مشمول', starterEn: 'Not included', growthAr: 'تنبيهات أساسية', growthEn: 'Basic alerts', scaleAr: 'قواعد متقدمة', scaleEn: 'Advanced rules' },
  { featureAr: 'Reports & Analytics', featureEn: 'Reports & Analytics', starterAr: 'ملخصات أساسية', starterEn: 'Basic summaries', growthAr: 'تقارير تشغيل و COD', growthEn: 'Operations and COD reports', scaleAr: 'لوحات وتقارير مخصصة', scaleEn: 'Custom dashboards and reports' },
  { featureAr: 'مستوى الدعم', featureEn: 'Support level', starterAr: 'بريد إلكتروني', starterEn: 'Email', growthAr: 'دعم أولوي', growthEn: 'Priority support', scaleAr: 'مدير حساب', scaleEn: 'Account manager' },
  { featureAr: 'دعم الإعداد', featureEn: 'Setup support', starterAr: 'دليل بدء', starterEn: 'Starter guide', growthAr: 'جلسة إعداد', growthEn: 'Setup session', scaleAr: 'إعداد وتدريب للفريق', scaleEn: 'Team setup and training' },
]
