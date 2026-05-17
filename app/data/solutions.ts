export interface SolutionDetail {
  key: string
  icon: string
  titleAr: string
  titleEn: string
  summaryAr: string
  summaryEn: string
  path: string
  audienceAr: string
  audienceEn: string
  painPointsAr: string[]
  painPointsEn: string[]
  solutionAr: string
  solutionEn: string
  benefitsAr: string[]
  benefitsEn: string[]
  workflowAr: string[]
  workflowEn: string[]
  relatedFeatureKeys: string[]
  relatedSolutionKeys: string[]
  seoTitleAr: string
  seoTitleEn: string
  seoDescriptionAr: string
  seoDescriptionEn: string
}

export const solutions: SolutionDetail[] = [
  {
    key: 'shipping-companies',
    icon: '🚚',
    titleAr: 'شركات الشحن',
    titleEn: 'Shipping Companies',
    summaryAr: 'إدارة شاملة لعمليات الشحن من الإرسال إلى التوصيل والتحصيل.',
    summaryEn: 'Complete management of shipping operations from dispatch to delivery and COD collection.',
    path: '/solutions/shipping-companies',
    audienceAr: 'شركات الشحن وشركات النقل والمشغّلين اللوجستيين',
    audienceEn: 'Shipping companies, carriers, and logistics operators',
    painPointsAr: [
      'توزيع يدوي للشحنات يستهلك وقتاً طويلاً ويسبّب أخطاء',
      'صعوبة متابعة السعاة ومواقعهم لحظياً',
      'تحصيل النقدي عند التوصيل معقّد ومعرّض للخسائر',
      'غياب رؤية شاملة على حركة الشحنات والأداء',
      'تأخيرات متكررة في التوصيل تؤثر على رضا العملاء',
    ],
    painPointsEn: [
      'Manual shipment assignment wastes time and causes errors',
      'Difficulty tracking couriers and their real-time locations',
      'COD collection is complex and prone to losses',
      'No comprehensive visibility into shipment flow and performance',
      'Frequent delivery delays impacting customer satisfaction',
    ],
    solutionAr: 'تراكورا يقدّم لشركات الشحن منصة متكاملة: إرسال ذكي يوزّع الشحنات تلقائياً على أفضل ساعٍ، تطبيق جوّال للسعاة بمشاركة موقع لحظي، محفظة نقدي تدير التحصيل والتسويات، وتقارير مفصّلة تعطيك رؤية كاملة على العمليات.',
    solutionEn: 'Trackora provides shipping companies with an integrated platform: smart dispatch that automatically assigns shipments to the best courier, a mobile app for couriers with live location sharing, a COD wallet managing collection and settlements, and detailed reports giving you full operational visibility.',
    benefitsAr: [
      'توزيع آليل للشحنات يوفّر ساعات يومياً',
      'متابعة لحظية لمواقع السعاة وحالة التوصيل',
      'إدارة كاملة لدورة النقدي عند التوصيل',
      'تقارير أداء شاملة لاتّخاذ قرارات أفضل',
      'تحسين رضا العملاء عبر التوصيل الأسرع',
      'تقليل خسائر الاحتيال والأخطاء التشغيلية',
    ],
    benefitsEn: [
      'Automatic dispatch saves hours daily',
      'Real-time tracking of courier locations and delivery status',
      'Full management of the COD collection cycle',
      'Comprehensive performance reports for better decisions',
      'Improved customer satisfaction through faster delivery',
      'Reduced fraud losses and operational errors',
    ],
    workflowAr: [
      'ارفع الشحنات على النظام مفردة أو مجمّعاً',
      'تراكورا يوزّع تلقائياً على أفضل ساعٍ',
      'السعاة يتلقون الإشعارات ويبدأون التوصيل',
      'تتبّع كل شحنة لحظياً من المستودع للعميل',
      'حصّل النقدي وأدر التسويات والتقارير',
    ],
    workflowEn: [
      'Upload shipments individually or in bulk',
      'Trackora automatically assigns to the best courier',
      'Couriers receive notifications and start delivery',
      'Track every shipment in real time from warehouse to customer',
      'Collect COD and manage settlements and reports',
    ],
    relatedFeatureKeys: ['smart-dispatch', 'courier-app', 'cod-wallet'],
    relatedSolutionKeys: ['ecommerce-stores', 'social-sellers'],
    seoTitleAr: 'حلول شركات الشحن — إدارة شاملة للعمليات | تراكورا',
    seoTitleEn: 'Solutions for Shipping Companies — Complete Operations Management | Trackora',
    seoDescriptionAr: 'حل متكامل لشركات الشحن: إرسال ذكي، تطبيق سعاة، محفظة نقدي، وتقارير أداء. حسّن عملياتك مع تراكورا.',
    seoDescriptionEn: 'Integrated solution for shipping companies: smart dispatch, courier app, COD wallet, and performance reports. Improve your operations with Trackora.',
  },
  {
    key: 'ecommerce-stores',
    icon: '🛒',
    titleAr: 'المتاجر الإلكترونية',
    titleEn: 'E-commerce Stores',
    summaryAr: 'تتبّع شحنات متجرك وحقّق تجربة توصيل ممتازة لعملائك.',
    summaryEn: 'Track your store shipments and deliver an excellent delivery experience.',
    path: '/solutions/ecommerce-stores',
    audienceAr: 'أصحاب المتاجر الإلكترونية ومدراء العمليات',
    audienceEn: 'E-commerce store owners and operations managers',
    painPointsAr: [
      'العملاء يسألون باستمرار عن حالة شحناتهم',
      'صعوبة تتبّع شحنات متعددة من منصات مختلفة',
      'تحصيل النقدي عند التوصيل يتطلب متابعة يدوية',
      'لا وجود لوحة تحكم مركزية لكل الشحنات والطلبات',
      'المرتجعات والاستبدالات معقّدة بدون تتبّع واضح',
    ],
    painPointsEn: [
      'Customers constantly asking about their shipment status',
      'Difficulty tracking multiple shipments across different platforms',
      'COD collection requires manual follow-up',
      'No centralized dashboard for all shipments and orders',
      'Returns and exchanges are complex without clear tracking',
    ],
    solutionAr: 'تراكورا يمنح المتاجر الإلكترونية بوابة شاملة: رفع مجمّع للطلبات، تتبّع لحظي لكل شحنة، محفظة نقدي شاملة، وتقارير تساعدك على فهم أداء التوصيل وتحسينه.',
    solutionEn: 'Trackora gives e-commerce stores a comprehensive portal: bulk order upload, real-time tracking for every shipment, a full COD wallet, and reports that help you understand and improve delivery performance.',
    benefitsAr: [
      'رفع آلاف الطلبات دفعة واحدة',
      'تتبّع لحظي لحالة كل شحنة',
      'إدارة كاملة للنقدي عند التوصيل',
      'بوابة واحدة لكل الطلبات والشحنات',
      'تقارير أداء توصيل واضحة ومفصّلة',
      'كشف الطلبات المشبوهة وحماية متجرك',
    ],
    benefitsEn: [
      'Upload thousands of orders at once',
      'Real-time tracking for every shipment',
      'Full COD collection management',
      'One portal for all orders and shipments',
      'Clear and detailed delivery performance reports',
      'Suspicious order detection to protect your store',
    ],
    workflowAr: [
      'ارفع طلباتك مفردة أو عبر ملف Excel',
      'شحناتك تُرسل تلقائياً عبر الإرسال الذكي',
      'تابع حالة كل شحنة لحظياً من البوابة',
      'حصّل النقدي واطّلع على التقارير',
    ],
    workflowEn: [
      'Upload orders individually or via Excel',
      'Shipments are automatically dispatched via smart dispatch',
      'Track every shipment\'s status in real time from the portal',
      'Collect COD and review reports',
    ],
    relatedFeatureKeys: ['merchant-portal', 'bulk-upload', 'cod-wallet'],
    relatedSolutionKeys: ['shipping-companies', 'social-sellers'],
    seoTitleAr: 'حلول المتاجر الإلكترونية — تتبّع وتحصيل ذكي | تراكورا',
    seoTitleEn: 'Solutions for E-commerce Stores — Smart Tracking & Collection | Trackora',
    seoDescriptionAr: 'بوابة شاملة للمتاجر الإلكترونية: رفع مجمّع، تتبّع لحظي، محفظة نقدي، وكشف احتيال. حسّن تجربة التوصيل مع تراكورا.',
    seoDescriptionEn: 'Comprehensive portal for e-commerce stores: bulk upload, real-time tracking, COD wallet, and fraud detection. Improve delivery experience with Trackora.',
  },
  {
    key: 'social-sellers',
    icon: '📱',
    titleAr: 'البائعون عبر الهاتف',
    titleEn: 'Social Sellers',
    summaryAr: 'ارفع طلباتك بسهولة وتابع التوصيل والتحصيل بلا تعقيد.',
    summaryEn: 'Upload orders easily and track delivery and COD collection without complexity.',
    path: '/solutions/social-sellers',
    audienceAr: 'البائعون على إنستغرام وواتساب وتيك توك والمتاجر الصغيرة',
    audienceEn: 'Sellers on Instagram, WhatsApp, TikTok, and small shops',
    painPointsAr: [
      'إدخال الطلبات يدوياً واحداً تلو الآخر يستنزف الوقت',
      'صعوبة تتبّع من دفع ومن لم يدفع',
      'التحصيل النقدي متعب وعرضة للأخطاء',
      'الطلبات المزعجة أو الاحتيالية تسبّب خسائر',
      'لا يوجد نظام بسيط يتناسب مع حجم العمل',
    ],
    painPointsEn: [
      'Manual order entry one by one wastes time',
      'Difficulty tracking who paid and who did not',
      'COD collection is tedious and error-prone',
      'Fraudulent or suspicious orders cause losses',
      'No simple system that fits the scale of operations',
    ],
    solutionAr: 'تراكورا يقدّم للبائعين عبر الهاتف حلاً بسيطاً: رفع سريع للطلبات، تتبّع يسير للشحنات، محفظة نقدي واضحة، وكشف تلقائي للطلبات المشبوهة.',
    solutionEn: 'Trackora provides social sellers with a simple solution: quick order upload, easy shipment tracking, a clear COD wallet, and automatic suspicious order detection.',
    benefitsAr: [
      'رفع الطلبات بسرعة وسهولة',
      'متابعة بسيطة لحالة التوصيل',
      'محفظة نقدي واضحة تعرض الأرصدة والتسويات',
      'كشف تلقائي للطلبات المشبوهة',
      'واجهة عربية بسيطة تناسب البائعين',
      'لا حاجة لأنظمة معقّدة أو تدريب طويل',
    ],
    benefitsEn: [
      'Upload orders quickly and easily',
      'Simple delivery status tracking',
      'Clear COD wallet showing balances and settlements',
      'Automatic suspicious order detection',
      'Simple Arabic interface designed for sellers',
      'No complex systems or long training needed',
    ],
    workflowAr: [
      'ارفع طلباتك بسرعة عبر النموذج أو ملف Excel',
      'تراكورا يتحقّق من البيانات ويكشف الطلبات المشبوهة',
      'تابع حالة التوصيل بسهولة',
      'حصّل النقدي واطّلع على رصيدك بوضوح',
    ],
    workflowEn: [
      'Upload orders quickly via form or Excel file',
      'Trackora verifies data and flags suspicious orders',
      'Track delivery status with ease',
      'Collect COD and view your balance clearly',
    ],
    relatedFeatureKeys: ['bulk-upload', 'cod-wallet', 'fraud-detection'],
    relatedSolutionKeys: ['shipping-companies', 'ecommerce-stores'],
    seoTitleAr: 'حلول البائعين عبر الهاتف — بساطة وقوة | تراكورا',
    seoTitleEn: 'Solutions for Social Sellers — Simple & Powerful | Trackora',
    seoDescriptionAr: 'حل بسيط للبائعين عبر الهاتف: رفع طلبات سريع، تتبّع توصيل، محفظة نقدي، وكشف احتيال. ابدأ مع تراكورا.',
    seoDescriptionEn: 'Simple solution for social sellers: quick order upload, delivery tracking, COD wallet, and fraud detection. Start with Trackora.',
  },
]