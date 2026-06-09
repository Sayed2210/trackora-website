import type { LocalizedText } from './features'

export type SolutionKey = 'shipping-companies' | 'ecommerce-stores' | 'social-sellers'
export type SolutionArtifactKind = 'command-board' | 'merchant-dashboard' | 'seller-flow'

export interface SolutionMetric {
  label: LocalizedText
  value: LocalizedText
  tone?: 'teal' | 'gold' | 'danger' | 'success'
}

export interface SolutionArtifactTable {
  columns: LocalizedText[]
  rows: LocalizedText[][]
}

export interface SolutionArtifact {
  kind: SolutionArtifactKind
  title: LocalizedText
  text: LocalizedText
  metrics?: SolutionMetric[]
  table?: SolutionArtifactTable
  flow?: Array<{
    title: LocalizedText
    text: LocalizedText
    status: LocalizedText
  }>
  trackingNumbers?: string[]
}

export interface SolutionWorkflowStep {
  title: LocalizedText
  text: LocalizedText
}

export interface SolutionFaqItem {
  question: LocalizedText
  answer: LocalizedText
}

export interface SolutionDetail {
  key: SolutionKey
  path: string
  title: LocalizedText
  eyebrow: LocalizedText
  summary: LocalizedText
  heroNote: LocalizedText
  cta: LocalizedText
  painTitle: LocalizedText
  painLead: LocalizedText
  painPoints: LocalizedText[]
  solutionTitle: LocalizedText
  solutionLead: LocalizedText
  solutionPoints: LocalizedText[]
  artifact: SolutionArtifact
  workflowTitle: LocalizedText
  workflowLead: LocalizedText
  workflow: SolutionWorkflowStep[]
  benefitsTitle: LocalizedText
  benefitsLead: LocalizedText
  benefits: LocalizedText[]
  relatedFeatureKeys: string[]
  relatedSolutionKeys: SolutionKey[]
  faq: SolutionFaqItem[]
  finalTitle: LocalizedText
  finalText: LocalizedText
  seoTitle: LocalizedText
  seoDescription: LocalizedText
}

export const solutions: SolutionDetail[] = [
  {
    key: 'shipping-companies',
    path: '/solutions/shipping-companies',
    eyebrow: { ar: 'لشركات الشحن والتوصيل', en: 'For shipping and delivery operators' },
    title: {
      ar: 'غرفة تشغيل تضبط التجار والمناديب وCOD في يوم واحد',
      en: 'A command room for merchants, couriers, and COD in one operating day',
    },
    summary: {
      ar: 'Trackora يساعد شركة الشحن على إدارة شحنات التجار، توزيع المناديب، متابعة الحالات، تحصيل COD، وتسوية النقدية من سجل تشغيل واحد واضح.',
      en: 'Trackora helps shipping companies manage merchant shipments, courier assignment, shipment states, COD collection, and cash settlement from one clear operating record.',
    },
    heroNote: {
      ar: 'مصمم لمدير تشغيل يراجع الحمولة، النقد مع المناديب، الشحنات المتأخرة، ومخاطر اليوم قبل أن تتسع الفجوة.',
      en: 'Designed for operations leaders reviewing load, courier-held cash, delayed shipments, and daily risk before gaps widen.',
    },
    cta: { ar: 'اطلب عرض لشركة الشحن', en: 'Request a shipping company demo' },
    painTitle: { ar: 'الخطأ اليدوي لا يبقى صغيرا في شركة شحن', en: 'Manual errors do not stay small in a shipping company' },
    painLead: {
      ar: 'عندما تتحرك شحنات التجار والمناديب والتحصيل في ملفات ومكالمات منفصلة، يصبح قرار واحد غير واضح كافيا لتعطيل الطريق أو تأخير التسوية.',
      en: 'When merchant shipments, couriers, and collections move through separate files and calls, one unclear decision can delay a route or settlement.',
    },
    painPoints: [
      { ar: 'شحنات التجار موزعة بين ملفات ورسائل ولا تظهر كحمل تشغيلي واحد.', en: 'Merchant shipments are split across files and messages instead of one operating load.' },
      { ar: 'توزيع المناديب يعتمد على الذاكرة، لا على المنطقة والحمولة والنقد المتوقع.', en: 'Courier assignment relies on memory instead of zone, capacity, and expected cash.' },
      { ar: 'حالات الشحنات تتأخر في الظهور، فيزيد ضغط الدعم والتاجر.', en: 'Shipment states appear late, increasing pressure from support and merchants.' },
      { ar: 'COD يبقى مع مناديب مختلفين بدون رؤية فورية للتسوية المعلقة.', en: 'COD stays with different couriers without immediate visibility into pending settlement.' },
      { ar: 'التقارير تأتي بعد المشكلة، لا أثناء اليوم التشغيلي.', en: 'Reports arrive after the problem, not during the operating day.' },
    ],
    solutionTitle: { ar: 'Trackora يربط قرار التوزيع بحركة النقد والتقرير', en: 'Trackora ties dispatch decisions to cash movement and reporting' },
    solutionLead: {
      ar: 'ترى الشركة التاجر، عدد الشحنات، سعة المندوب، COD المحصل، التسوية المعلقة، التأخير، وإشارات الخطر في نفس اللوحة. كل تغيير في الطريق يترك أثرا يمكن مراجعته.',
      en: 'The operator sees merchant, shipment count, courier capacity, collected COD, pending settlement, delays, and risk flags in one board. Every route change leaves a reviewable trail.',
    },
    solutionPoints: [
      { ar: 'إدارة شحنات التجار من شاشة واحدة بدل متابعة كل تاجر وحده.', en: 'Manage merchant shipments from one screen instead of following each merchant separately.' },
      { ar: 'توزيع المناديب حسب المناطق والحمولة والنقد المتوقع على الطريق.', en: 'Assign couriers by zones, load, and expected cash on the route.' },
      { ar: 'متابعة حالات الشحنات لحظة بلحظة من الديسباتش إلى التسليم أو المرتجع.', en: 'Follow shipment states from dispatch to delivery or return.' },
      { ar: 'ربط تحصيل COD بالمندوب والتاجر والشحنة قبل التسوية.', en: 'Connect COD collection to courier, merchant, and shipment before settlement.' },
    ],
    artifact: {
      kind: 'command-board',
      title: { ar: 'لوحة قيادة العمليات', en: 'Operations command board' },
      text: {
        ar: 'لقطة تجمع الحمل التشغيلي والمالي في صفوف يمكن لفريق التشغيل والمحاسبة قراءتها معا.',
        en: 'A view that combines operating load and cash exposure in rows operations and finance can read together.',
      },
      table: {
        columns: [
          { ar: 'التاجر', en: 'Merchant' },
          { ar: 'عدد الشحنات', en: 'Shipment count' },
          { ar: 'سعة المندوب', en: 'Courier capacity' },
          { ar: 'COD محصل', en: 'COD collected' },
          { ar: 'تسوية معلقة', en: 'Pending settlement' },
          { ar: 'متأخرة', en: 'Delayed' },
          { ar: 'إشارات خطر', en: 'Risk flags' },
        ],
        rows: [
          [{ ar: 'متجر النور', en: 'Nour Store' }, { ar: '١٤٨', en: '148' }, { ar: '18 / 24', en: '18 / 24' }, { ar: '٣٨,٤٥٠ ج.م', en: 'EGP 38,450' }, { ar: '١٢,٢٠٠ ج.م', en: 'EGP 12,200' }, { ar: '٧', en: '7' }, { ar: 'COD مرتفع', en: 'High COD' }],
          [{ ar: 'سوق سريع', en: 'Fast Souq' }, { ar: '٩٣', en: '93' }, { ar: '11 / 18', en: '11 / 18' }, { ar: '٢١,٨٧٠ ج.م', en: 'EGP 21,870' }, { ar: '٤,٣٠٠ ج.م', en: 'EGP 4,300' }, { ar: '٢', en: '2' }, { ar: 'عنوان ضعيف', en: 'Weak address' }],
          [{ ar: 'بيتك ستور', en: 'Baytak Store' }, { ar: '٦٥', en: '65' }, { ar: '20 / 20', en: '20 / 20' }, { ar: '١٧,٦٢٠ ج.م', en: 'EGP 17,620' }, { ar: '٠', en: 'EGP 0' }, { ar: '١١', en: '11' }, { ar: 'حمولة كاملة', en: 'Full load' }],
        ],
      },
    },
    workflowTitle: { ar: 'من استلام شحنات التجار حتى إغلاق التسوية', en: 'From merchant intake to settlement close' },
    workflowLead: { ar: 'المسار مصمم حول سجل واحد، وليس نقل بيانات بين فرق.', en: 'The flow is built around one record, not hand-copying data between teams.' },
    workflow: [
      { title: { ar: 'تجميع شحنات التجار', en: 'Collect merchant shipments' }, text: { ar: 'تدخل الشحنات مفردة أو دفعات مع التاجر والمنطقة وقيمة COD.', en: 'Shipments enter individually or in batches with merchant, zone, and COD value.' } },
      { title: { ar: 'قراءة الحمولة والسعة', en: 'Read load and capacity' }, text: { ar: 'تظهر الشحنات حسب المناطق وسعة المناديب والنقد المتوقع.', en: 'Shipments appear by zone, courier capacity, and expected cash.' } },
      { title: { ar: 'إسناد ومتابعة الحالات', en: 'Assign and follow states' }, text: { ar: 'يتحرك كل تحديث من المندوب إلى لوحة التشغيل والتاجر.', en: 'Each courier update moves to operations and merchant visibility.' } },
      { title: { ar: 'تحصيل ومطابقة وتسوية', en: 'Collect, reconcile, settle' }, text: { ar: 'تغلق المحاسبة النقد حسب الشحنة والمندوب والتاجر.', en: 'Finance closes cash by shipment, courier, and merchant.' } },
    ],
    benefitsTitle: { ar: 'ما يتغير في اليوم التشغيلي', en: 'What changes in the operating day' },
    benefitsLead: { ar: 'النتيجة ليست لوحة أجمل، بل قرارات أقل عشوائية عند الضغط.', en: 'The result is not a prettier dashboard, it is less guesswork under pressure.' },
    benefits: [
      { ar: 'تقليل الأخطاء اليدوية في التوزيع والتسوية.', en: 'Reduce manual errors in assignment and settlement.' },
      { ar: 'رؤية أسرع للشحنات المتأخرة قبل تراكم شكاوى التجار.', en: 'See delayed shipments before merchant complaints pile up.' },
      { ar: 'معرفة النقد الموجود مع كل مندوب وما ينتظر التسوية.', en: 'Know cash held by each courier and what is awaiting settlement.' },
      { ar: 'تقارير تشغيل وتحصيل قابلة للاجتماع اليومي.', en: 'Operations and collection reports ready for the daily review.' },
    ],
    relatedFeatureKeys: ['smart-dispatch', 'courier-app', 'cod-wallet', 'fraud-detection'],
    relatedSolutionKeys: ['ecommerce-stores', 'social-sellers'],
    faq: [
      { question: { ar: 'هل يناسب Trackora أكثر من تاجر في نفس اليوم؟', en: 'Does Trackora handle many merchants in the same day?' }, answer: { ar: 'نعم. اللوحة تعرض الحمل حسب التاجر والمنطقة والمندوب والتحصيل حتى لا تضيع الأولويات بين حسابات مختلفة.', en: 'Yes. The board shows load by merchant, zone, courier, and collection so priorities do not get lost between accounts.' } },
      { question: { ar: 'كيف يساعد في تسوية COD؟', en: 'How does it help COD settlement?' }, answer: { ar: 'كل مبلغ يرتبط بالشحنة والمندوب والتاجر، فتظهر التحصيلات والمبالغ المعلقة قبل اعتماد التسوية.', en: 'Each amount is tied to shipment, courier, and merchant, so collected and pending amounts are visible before settlement approval.' } },
      { question: { ar: 'هل يمكن تعديل الإسناد يدويا؟', en: 'Can assignment be adjusted manually?' }, answer: { ar: 'نعم. يستطيع المشرف تعديل القرار عندما يحتاج معرفة محلية، مع بقاء الشحنة داخل نفس السجل.', en: 'Yes. Supervisors can adjust decisions when local context matters while keeping the shipment in the same record.' } },
    ],
    finalTitle: { ar: 'شاهد Trackora على يوم تشغيل حقيقي لشركتك', en: 'See Trackora on a real operating day for your company' },
    finalText: { ar: 'شاركنا عدد التجار، الشحنات، المناديب، وطريقة تسوية COD. سنعرض المسار كما سيظهر لفريقك.', en: 'Share merchant count, shipment volume, couriers, and COD settlement flow. We will show the path as your team would use it.' },
    seoTitle: { ar: 'حل Trackora لشركات الشحن وإدارة COD والديسباتش', en: 'Trackora for Shipping Companies, COD, and Dispatch' },
    seoDescription: { ar: 'حل عربي لشركات الشحن لإدارة شحنات التجار، توزيع المناديب، متابعة الحالات، تحصيل COD، التسويات، والتقارير.', en: 'Arabic-first solution for shipping operators managing merchant shipments, courier assignment, shipment states, COD, settlements, and reports.' },
  },
  {
    key: 'ecommerce-stores',
    path: '/solutions/ecommerce-stores',
    eyebrow: { ar: 'للمتاجر الإلكترونية', en: 'For e-commerce stores' },
    title: { ar: 'رؤية للشحنة والمحفظة بدون مطاردة شركة الشحن', en: 'Shipment and wallet visibility without chasing the carrier' },
    summary: { ar: 'Trackora يعطي المتجر بوابة لإنشاء الشحنات، رفع دفعات كثيرة، متابعة الحالات، معرفة تحصيل COD، وتقليل المرتجعات والطلبات الوهمية.', en: 'Trackora gives stores a portal to create shipments, upload batches, follow status, see COD collection, and reduce returns and fake orders.' },
    heroNote: { ar: 'مناسب لفريق متجر يريد معرفة ما حدث لكل طلب، وما تم تحصيله، وما يجب إرساله للعميل كرابط تتبع.', en: 'Built for store teams that need to know what happened to each order, what was collected, and what tracking link to send customers.' },
    cta: { ar: 'اطلب عرض لمتجرك', en: 'Request a demo for your store' },
    painTitle: { ar: 'غياب الرؤية يحول التوصيل إلى خدمة دعم مستمرة', en: 'Lack of visibility turns delivery into constant support work' },
    painLead: { ar: 'عندما لا يرى المتجر حالة الطلب أو رصيد COD بنفسه، يعود كل سؤال إلى محادثة مع شركة الشحن أو العميل.', en: 'When a store cannot see order status or COD balance directly, every question becomes a conversation with the carrier or customer.' },
    painPoints: [
      { ar: 'إنشاء الشحنات يدويا يستهلك وقت الفريق مع كل حملة بيع.', en: 'Manual shipment creation drains the team with every sales campaign.' },
      { ar: 'رفع الشحنات الكثيرة بدون تحقق يترك أرقاما وعناوين ناقصة.', en: 'Uploading many shipments without validation leaves missing phones and addresses.' },
      { ar: 'حالة كل شحنة غير واضحة للدعم أو العميل.', en: 'Each shipment state is unclear to support or the customer.' },
      { ar: 'تحصيل COD والرصيد يحتاجان متابعة من أكثر من مصدر.', en: 'COD collection and wallet balance need follow-up from multiple sources.' },
      { ar: 'المرتجعات والطلبات الوهمية تظهر بعد خروج المندوب للطريق.', en: 'Returns and fake orders are discovered after the courier is already on the route.' },
    ],
    solutionTitle: { ar: 'بوابة تاجر تضع الطلب والتتبع والمحفظة في نفس الشاشة', en: 'A merchant portal that puts orders, tracking, and wallet in one screen' },
    solutionLead: { ar: 'يدخل فريق المتجر شحنة واحدة أو ملف طلبات، يراجع الأخطاء، يتابع الحالات، يرى COD المعلق، ويشارك رقم تتبع عام مع العميل بدون كشف بيانات حساسة.', en: 'Store teams create a shipment or upload an order file, review errors, follow states, see pending COD, and share public tracking with customers without exposing sensitive data.' },
    solutionPoints: [
      { ar: 'إنشاء شحنات بسهولة من بيانات العميل والمنطقة ومبلغ COD.', en: 'Create shipments easily from customer data, zone, and COD amount.' },
      { ar: 'رفع شحنات كثيرة مرة واحدة مع مراجعة الصفوف الناقصة.', en: 'Upload many shipments at once while reviewing missing rows.' },
      { ar: 'متابعة الحالة: جديدة، خارج للتوصيل، تم التسليم، مرتجعة.', en: 'Follow status: new, out for delivery, delivered, returned.' },
      { ar: 'رؤية المحفظة والرصيد بدل انتظار تقرير منفصل.', en: 'See wallet and balance instead of waiting for a separate report.' },
    ],
    artifact: {
      kind: 'merchant-dashboard',
      title: { ar: 'لوحة شحنات المتجر', en: 'Merchant shipment dashboard' },
      text: { ar: 'واجهة تركز على ما يسأل عنه فريق المتجر يوميا: الجديد، الخارج للتوصيل، المسلّم، المرتجع، COD، والمحفظة.', en: 'A view focused on what store teams ask daily: new, out for delivery, delivered, returned, COD, and wallet.' },
      metrics: [
        { label: { ar: 'شحنات جديدة', en: 'New shipments' }, value: { ar: '٤٦', en: '46' }, tone: 'teal' },
        { label: { ar: 'خارج للتوصيل', en: 'Out for delivery' }, value: { ar: '٨٢', en: '82' }, tone: 'gold' },
        { label: { ar: 'تم التسليم', en: 'Delivered' }, value: { ar: '١٣٤', en: '134' }, tone: 'success' },
        { label: { ar: 'مرتجع', en: 'Returned' }, value: { ar: '٩', en: '9' }, tone: 'danger' },
        { label: { ar: 'COD معلق', en: 'COD pending' }, value: { ar: '٢٦,٤٠٠ ج.م', en: 'EGP 26,400' }, tone: 'gold' },
        { label: { ar: 'رصيد المحفظة', en: 'Wallet balance' }, value: { ar: '٧٤,٩٥٠ ج.م', en: 'EGP 74,950' }, tone: 'teal' },
      ],
      trackingNumbers: ['TRK-82014', 'TRK-82021', 'TRK-82028', 'TRK-82034'],
    },
    workflowTitle: { ar: 'من طلب المتجر إلى رابط تتبع العميل', en: 'From store order to customer tracking link' },
    workflowLead: { ar: 'كل خطوة تقلل سؤالا متكررا بين المتجر وشركة الشحن والعميل.', en: 'Each step removes a repeated question between store, carrier, and customer.' },
    workflow: [
      { title: { ar: 'إنشاء أو رفع الطلبات', en: 'Create or upload orders' }, text: { ar: 'يدخل الفريق شحنة واحدة أو يرفع ملف طلبات كامل.', en: 'The team enters one shipment or uploads a full order file.' } },
      { title: { ar: 'تحقق من البيانات', en: 'Validate data' }, text: { ar: 'تظهر الأرقام المكررة والعناوين الناقصة قبل الإرسال.', en: 'Repeated phones and missing addresses appear before dispatch.' } },
      { title: { ar: 'متابعة الحالة', en: 'Follow status' }, text: { ar: 'يرى الفريق كل تحديث من شركة الشحن أو المندوب.', en: 'The team sees every update from the carrier or courier.' } },
      { title: { ar: 'مراجعة COD والتتبع', en: 'Review COD and tracking' }, text: { ar: 'تظهر المبالغ المعلقة ورقم التتبع الذي يرسل للعميل.', en: 'Pending amounts and the customer tracking number are visible.' } },
    ],
    benefitsTitle: { ar: 'ما يهم المتجر بعد أول أسبوع', en: 'What matters to the store after week one' },
    benefitsLead: { ar: 'وضوح أقل تكلفة من متابعة كل طلب بالرسائل.', en: 'Visibility costs less than chasing every order through messages.' },
    benefits: [
      { ar: 'تقليل رسائل أين الطلب؟ لأن رقم التتبع جاهز.', en: 'Fewer where-is-my-order messages because tracking is ready.' },
      { ar: 'معرفة COD المعلق والرصيد المتاح للمراجعة.', en: 'Know pending COD and wallet balance for review.' },
      { ar: 'إيقاف أخطاء الملفات قبل أن تصبح شحنات فاشلة.', en: 'Stop file errors before they become failed shipments.' },
      { ar: 'قراءة المرتجعات والطلبات الوهمية من نفس لوحة الشحنات.', en: 'Read returns and fake-order signals from the same shipment view.' },
    ],
    relatedFeatureKeys: ['merchant-portal', 'bulk-upload', 'cod-wallet', 'fraud-detection', 'public-tracking'],
    relatedSolutionKeys: ['shipping-companies', 'social-sellers'],
    faq: [
      { question: { ar: 'هل يستطيع العميل تتبع الشحنة؟', en: 'Can customers track shipments?' }, answer: { ar: 'نعم. يمكن مشاركة رقم أو رابط تتبع عام يعرض الحالة اللازمة بدون إظهار بيانات حساسة.', en: 'Yes. A public tracking number or link can show the needed state without exposing sensitive data.' } },
      { question: { ar: 'هل تدعم الصفحة رفع شحنات كثيرة؟', en: 'Does this support bulk shipment upload?' }, answer: { ar: 'نعم. الرفع المجمع يراجع الصفوف والأخطاء قبل انتقال الطلبات إلى التشغيل.', en: 'Yes. Bulk upload reviews rows and errors before orders move to operations.' } },
      { question: { ar: 'كيف أعرف رصيد COD؟', en: 'How do I know COD balance?' }, answer: { ar: 'تظهر المحفظة المبالغ المعلقة، الجاهزة للتسوية، وما تم تسويته حسب الشحنات.', en: 'The wallet shows pending, ready-to-settle, and settled amounts by shipment.' } },
    ],
    finalTitle: { ar: 'اعرض Trackora على طلبات متجرك الفعلية', en: 'See Trackora using your actual store orders' },
    finalText: { ar: 'أخبرنا بعدد الطلبات اليومي، طريقة الرفع، وشركة الشحن الحالية. سنعرض لك مسارا واضحا من الإنشاء حتى التتبع وCOD.', en: 'Tell us daily order volume, upload method, and current carrier. We will show a clear path from creation to tracking and COD.' },
    seoTitle: { ar: 'حل Trackora للمتاجر الإلكترونية وتتبع COD والشحنات', en: 'Trackora for E-commerce Stores, COD, and Shipment Tracking' },
    seoDescription: { ar: 'بوابة عربية للمتاجر لإنشاء الشحنات، الرفع المجمع، تتبع الحالة، محفظة COD، تقليل المرتجعات، ومشاركة التتبع مع العميل.', en: 'Arabic-first merchant portal for shipment creation, bulk upload, status tracking, COD wallet, return reduction, and customer tracking.' },
  },
  {
    key: 'social-sellers',
    path: '/solutions/social-sellers',
    eyebrow: { ar: 'للبائعين عبر إنستغرام وفيسبوك وتيك توك', en: 'For Instagram, Facebook, and TikTok sellers' },
    title: { ar: 'حوّل رسائل العملاء إلى شحنات منظمة بدون نظام ثقيل', en: 'Turn customer messages into organized shipments without a heavy system' },
    summary: { ar: 'Trackora يعطي البائع الصغير مسارا خفيفا لإدخال الطلبات، متابعة التحصيل والمرتجعات، مشاركة التتبع، وتقليل اللخبطة مع المناديب.', en: 'Trackora gives small sellers a lightweight path to enter orders, follow COD and returns, share tracking, and reduce confusion with couriers.' },
    heroNote: { ar: 'مصمم لمن يبيع من الرسائل ويحتاج بداية بسيطة بدل الشيتات وسكرينشوتات الطلبات.', en: 'Designed for sellers taking orders from messages who need a simple start instead of sheets and order screenshots.' },
    cta: { ar: 'ابدأ تنظيم طلباتك', en: 'Start organizing your orders' },
    painTitle: { ar: 'الشيتات والرسائل تعمل حتى يزداد عدد الطلبات', en: 'Sheets and messages work until order volume rises' },
    painLead: { ar: 'مع كل حملة أو بث مباشر، تتداخل بيانات العملاء والتحصيل والمرتجعات مع محادثات كثيرة ومندوبين ينتظرون عناوين واضحة.', en: 'With every campaign or live sale, customer data, collections, and returns mix with many chats and couriers waiting for clear addresses.' },
    painPoints: [
      { ar: 'الطلبات تعيش بين رسائل واتساب وشيتات وصور محادثات.', en: 'Orders live across WhatsApp messages, sheets, and chat screenshots.' },
      { ar: 'إدخال الشحنة يأخذ وقتا لأن بيانات العميل ليست في نموذج واحد.', en: 'Shipment entry takes time because customer data is not in one form.' },
      { ar: 'التحصيل والمرتجعات يتداخلان مع متابعة المندوبين.', en: 'COD and returns get mixed with courier follow-up.' },
      { ar: 'العميل يسأل عن التتبع ولا يوجد رقم جاهز للمشاركة.', en: 'Customers ask for tracking but there is no ready number to share.' },
      { ar: 'البداية على نظام كبير تبدو معقدة مقارنة بحجم الفريق.', en: 'Starting with a large system feels too complex for a small team.' },
    ],
    solutionTitle: { ar: 'مسار بسيط: رسالة، شحنة، مندوب، تحصيل، تتبع', en: 'A simple path: message, shipment, courier, collection, tracking' },
    solutionLead: { ar: 'يسجل البائع الطلب بسرعة، تتحول البيانات إلى شحنة، يتم إسنادها لمندوب، يظهر COD عند التحصيل، ثم يشارك رقم تتبع مع العميل وتحدث المحفظة.', en: 'The seller records the order quickly, data becomes a shipment, a courier is assigned, COD appears on collection, then tracking is shared and the wallet updates.' },
    solutionPoints: [
      { ar: 'تنظيم الطلبات بدل الشيتات والرسائل المتفرقة.', en: 'Organize orders instead of scattered sheets and messages.' },
      { ar: 'إدخال شحنات بسرعة من بيانات العميل الأساسية.', en: 'Enter shipments quickly from basic customer data.' },
      { ar: 'متابعة التحصيل والمرتجعات بدون سؤال كل مندوب.', en: 'Follow COD and returns without asking every courier.' },
      { ar: 'مشاركة رقم تتبع مع العميل من نفس المسار.', en: 'Share a tracking number with the customer from the same flow.' },
    ],
    artifact: {
      kind: 'seller-flow',
      title: { ar: 'مسار من الطلب إلى الشحنة', en: 'Order-to-shipment flow' },
      text: { ar: 'تمثيل خفيف للعمل اليومي من أول رسالة عميل حتى تحديث المحفظة.', en: 'A lightweight representation of daily work from first customer message to wallet update.' },
      flow: [
        { title: { ar: 'رسالة العميل', en: 'Customer message' }, text: { ar: 'الاسم، الهاتف، العنوان، والمنتج من المحادثة.', en: 'Name, phone, address, and item from the chat.' }, status: { ar: 'تم الالتقاط', en: 'Captured' } },
        { title: { ar: 'إنشاء الشحنة', en: 'Shipment created' }, text: { ar: 'رقم تتبع وقيمة COD جاهزان قبل التسليم للمندوب.', en: 'Tracking number and COD value are ready before courier handoff.' }, status: { ar: 'TRK-90418', en: 'TRK-90418' } },
        { title: { ar: 'إسناد المندوب', en: 'Courier assigned' }, text: { ar: 'المندوب يرى العنوان والمبلغ والحالة المطلوبة.', en: 'Courier sees address, amount, and required state.' }, status: { ar: 'جاهز للطريق', en: 'Ready for route' } },
        { title: { ar: 'تحصيل COD', en: 'COD collected' }, text: { ar: 'المبلغ ينتقل للمحفظة أو يظهر كمرتجع عند الفشل.', en: 'The amount moves to wallet or appears as returned when delivery fails.' }, status: { ar: 'محصل', en: 'Collected' } },
        { title: { ar: 'مشاركة التتبع', en: 'Tracking shared' }, text: { ar: 'العميل يحصل على رقم يتابع منه الحالة.', en: 'Customer receives a number to follow status.' }, status: { ar: 'تم الإرسال', en: 'Shared' } },
        { title: { ar: 'تحديث المحفظة', en: 'Wallet updated' }, text: { ar: 'الرصيد يظهر للبائع بدون تجميع يدوي آخر اليوم.', en: 'Balance appears without manual end-of-day tallying.' }, status: { ar: 'رصيد جديد', en: 'New balance' } },
      ],
    },
    workflowTitle: { ar: 'بداية بسيطة لا تطلب تغيير طريقة البيع', en: 'A simple start that does not change how you sell' },
    workflowLead: { ar: 'Trackora يدخل بعد المحادثة، عندما تحتاج تحويل الطلب إلى شحنة قابلة للمتابعة.', en: 'Trackora enters after the chat, when the order needs to become a trackable shipment.' },
    workflow: [
      { title: { ar: 'انسخ بيانات الطلب', en: 'Copy order details' }, text: { ar: 'ضع بيانات العميل ومبلغ COD والمنتج في نموذج واضح.', en: 'Put customer details, COD amount, and item into a clear form.' } },
      { title: { ar: 'راجع النواقص', en: 'Check missing data' }, text: { ar: 'تظهر البيانات الناقصة أو رقم العميل المتكرر قبل الطريق.', en: 'Missing data or repeated customer numbers appear before routing.' } },
      { title: { ar: 'تابع مع المندوب', en: 'Follow with courier' }, text: { ar: 'تعرف إن كانت الشحنة خرجت أو سلمت أو رجعت.', en: 'Know whether the shipment is out, delivered, or returned.' } },
      { title: { ar: 'أغلق التحصيل', en: 'Close collection' }, text: { ar: 'راجع COD والمرتجعات ورصيد المحفظة في نهاية اليوم.', en: 'Review COD, returns, and wallet balance at day end.' } },
    ],
    benefitsTitle: { ar: 'نظام كاف للفريق الصغير', en: 'Enough system for a small team' },
    benefitsLead: { ar: 'الهدف ليس إضافة تعقيد، بل إزالة اللخبطة من الطلبات المتكررة.', en: 'The goal is not more process, it is removing confusion from repeat orders.' },
    benefits: [
      { ar: 'طلبات منظمة بدل الاعتماد على ذاكرة البائع أو الشيت.', en: 'Organized orders instead of relying on seller memory or sheets.' },
      { ar: 'لخبطة أقل مع المناديب لأن كل شحنة لها رقم وحالة.', en: 'Less confusion with couriers because each shipment has a number and state.' },
      { ar: 'تتبع أسهل للعميل بدون رسائل متابعة طويلة.', en: 'Easier customer tracking without long follow-up messages.' },
      { ar: 'رؤية أوضح للتحصيل والمرتجعات قبل تراكمها.', en: 'Clearer COD and return visibility before they pile up.' },
    ],
    relatedFeatureKeys: ['bulk-upload', 'fraud-detection', 'public-tracking', 'cod-wallet'],
    relatedSolutionKeys: ['shipping-companies', 'ecommerce-stores'],
    faq: [
      { question: { ar: 'هل أحتاج فريق تشغيل كامل لاستخدام Trackora؟', en: 'Do I need a full operations team to use Trackora?' }, answer: { ar: 'لا. هذه الصفحة مصممة كبداية خفيفة للبائع أو الفريق الصغير الذي يريد تنظيم الطلبات والشحنات.', en: 'No. This path is designed as a lightweight start for a seller or small team organizing orders and shipments.' } },
      { question: { ar: 'هل يمكن مشاركة رقم تتبع مع العميل؟', en: 'Can I share a tracking number with the customer?' }, answer: { ar: 'نعم. كل شحنة يمكن أن تحمل رقما يستخدمه العميل لمتابعة الحالة الأساسية.', en: 'Yes. Each shipment can carry a number customers use to follow the basic state.' } },
      { question: { ar: 'هل يساعد في المرتجعات؟', en: 'Does it help with returns?' }, answer: { ar: 'نعم. تظهر الشحنات المرتجعة بجانب التحصيل والمحفظة حتى تعرف ما تم تسليمه وما عاد.', en: 'Yes. Returned shipments appear alongside COD and wallet data so you know what was delivered and what came back.' } },
    ],
    finalTitle: { ar: 'ابدأ من طلباتك الحالية، لا من نظام معقد', en: 'Start from your current orders, not a complex system' },
    finalText: { ar: 'أخبرنا كيف تستقبل الطلبات اليوم وعدد الشحنات الأسبوعي. سنعرض طريقة بسيطة لتحويل الرسائل إلى شحنات منظمة.', en: 'Tell us how you receive orders today and weekly shipment volume. We will show a simple way to turn messages into organized shipments.' },
    seoTitle: { ar: 'حل Trackora للبائعين عبر السوشيال وتنظيم الطلبات', en: 'Trackora for Social Sellers and Order Organization' },
    seoDescription: { ar: 'حل خفيف للبائعين عبر إنستغرام وفيسبوك وتيك توك لتنظيم الطلبات، إنشاء الشحنات، متابعة COD والمرتجعات، ومشاركة التتبع.', en: 'Lightweight solution for Instagram, Facebook, and TikTok sellers to organize orders, create shipments, follow COD and returns, and share tracking.' },
  },
]

export function getSolutionDetail(key: string) {
  return solutions.find(solution => solution.key === key)
}

export function getLocalized(text: LocalizedText, locale: string) {
  return locale === 'ar' ? text.ar : text.en
}
