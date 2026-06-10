export interface LocalizedText {
  ar: string
  en: string
}

export interface FeatureOverviewItem {
  key: string
  title: LocalizedText
  label: LocalizedText
  summary: LocalizedText
  path: string
  available: boolean
  category: 'operations' | 'merchant-cod' | 'trust-followup'
  supporting?: boolean
  note?: LocalizedText
  cta: LocalizedText
  accent: 'teal' | 'gold' | 'risk'
}

export interface FeatureArtifact {
  type: 'assignment-matrix' | 'task-strip' | 'operations-board' | 'transaction-ledger' | 'validation-table' | 'risk-queue'
  title: LocalizedText
  description: LocalizedText
  columns: LocalizedText[]
  rows: LocalizedText[][]
}

export interface FeatureSignal {
  label: LocalizedText
  value: LocalizedText
}

export interface FeatureWorkflowStep {
  title: LocalizedText
  text: LocalizedText
}

export interface FeatureDetail {
  key: string
  icon?: string
  path: string
  accent: 'dispatch' | 'courier' | 'merchant' | 'wallet' | 'upload' | 'risk'
  titleAr?: string
  titleEn?: string
  summaryAr?: string
  summaryEn?: string
  title: LocalizedText
  kicker: LocalizedText
  summary: LocalizedText
  heroNote: LocalizedText
  problemTitle: LocalizedText
  problem: LocalizedText
  solutionTitle: LocalizedText
  solution: LocalizedText
  capabilitiesTitle: LocalizedText
  capabilities: LocalizedText[]
  workflowTitle: LocalizedText
  workflow: FeatureWorkflowStep[]
  signalsTitle: LocalizedText
  signals: FeatureSignal[]
  artifact: FeatureArtifact
  reviewTitle: LocalizedText
  review: LocalizedText[]
  relatedKeys: string[]
  seoTitle: LocalizedText
  seoDescription: LocalizedText
}

export const featureOverviewItems: FeatureOverviewItem[] = [
  {
    key: 'smart-dispatch',
    title: { ar: 'Smart Dispatch', en: 'Smart Dispatch' },
    label: { ar: 'الديسباتش', en: 'Dispatch' },
    summary: {
      ar: 'إسناد الشحنات للمناديب حسب المناطق، السعة، الأولوية، ومبلغ COD قبل خروج الشحنة للطريق.',
      en: 'Assign shipments to couriers by zone, capacity, priority, and COD value before they leave for the route.',
    },
    path: '/features/smart-dispatch',
    available: true,
    category: 'operations',
    cta: { ar: 'افتح صفحة Smart Dispatch', en: 'Open Smart Dispatch' },
    accent: 'teal',
  },
  {
    key: 'courier-app',
    title: { ar: 'Courier App', en: 'Courier App' },
    label: { ar: 'المندوب', en: 'Courier' },
    summary: {
      ar: 'قائمة مهام يومية، تحديث حالات، تحصيل COD، وإثبات تسليم يربط الميدان بلوحة التشغيل.',
      en: 'Daily task lists, status updates, COD collection, and delivery proof connecting field work to operations.',
    },
    path: '/features/courier-app',
    available: true,
    category: 'operations',
    cta: { ar: 'افتح صفحة Courier App', en: 'Open Courier App' },
    accent: 'gold',
  },
  {
    key: 'merchant-portal',
    title: { ar: 'Merchant Portal', en: 'Merchant Portal' },
    label: { ar: 'التاجر', en: 'Merchant' },
    summary: {
      ar: 'إنشاء شحنات، رفع ملفات، متابعة الحالات، ورؤية المحفظة والتقارير بدون رسائل متابعة متكررة.',
      en: 'Create shipments, upload files, follow statuses, and view wallet and reports without repeated status messages.',
    },
    path: '/features/merchant-portal',
    available: true,
    category: 'merchant-cod',
    cta: { ar: 'افتح صفحة Merchant Portal', en: 'Open Merchant Portal' },
    accent: 'teal',
  },
  {
    key: 'cod-wallet',
    title: { ar: 'COD Wallet', en: 'COD Wallet' },
    label: { ar: 'التحصيل', en: 'COD' },
    summary: {
      ar: 'رصيد التحصيل، النقد مع المناديب، سجل المعاملات، ومسار التسوية بين الشركة والتاجر.',
      en: 'COD balance, cash held by couriers, transaction history, and settlement flow between operator and merchant.',
    },
    path: '/features/cod-wallet',
    available: true,
    category: 'merchant-cod',
    cta: { ar: 'افتح صفحة COD Wallet', en: 'Open COD Wallet' },
    accent: 'gold',
  },
  {
    key: 'bulk-upload',
    title: { ar: 'Bulk Upload', en: 'Bulk Upload' },
    label: { ar: 'الدفعات', en: 'Bulk intake' },
    summary: {
      ar: 'رفع شحنات كثيرة مع تحقق من الصفوف، أخطاء واضحة، وتصحيح أسرع قبل بدء التوزيع.',
      en: 'Upload many shipments with row validation, clear errors, and faster correction before dispatch starts.',
    },
    path: '/features/bulk-upload',
    available: true,
    category: 'merchant-cod',
    cta: { ar: 'افتح صفحة Bulk Upload', en: 'Open Bulk Upload' },
    accent: 'teal',
  },
  {
    key: 'fraud-detection',
    title: { ar: 'Fraud Detection', en: 'Fraud Detection' },
    label: { ar: 'المخاطر', en: 'Risk' },
    summary: {
      ar: 'إشارات للطلبات الوهمية، الأرقام المتكررة، جودة العنوان، ومخاطر COD قبل الإرسال.',
      en: 'Flags for fake orders, repeated phone numbers, address quality, and COD risk before dispatch.',
    },
    path: '/features/fraud-detection',
    available: true,
    category: 'trust-followup',
    cta: { ar: 'افتح صفحة Fraud Detection', en: 'Open Fraud Detection' },
    accent: 'risk',
  },
  {
    key: 'public-tracking',
    title: { ar: 'تتبع عام للشحنات', en: 'Public Shipment Tracking' },
    label: { ar: 'العميل', en: 'Customer' },
    summary: {
      ar: 'رابط تتبع عام يعرض الحالة الحالية وآخر تحديث بدون كشف بيانات العميل الحساسة.',
      en: 'A public tracking link showing current status and latest update without exposing sensitive customer data.',
    },
    path: '/track',
    available: true,
    category: 'trust-followup',
    supporting: true,
    note: { ar: 'قدرة مساندة وليست صفحة ميزة تفصيلية.', en: 'Supporting capability, not a feature detail page.' },
    cta: { ar: 'جرّب صفحة التتبع', en: 'Try the tracking page' },
    accent: 'teal',
  },
  {
    key: 'reports-analytics',
    title: { ar: 'Reports & Analytics', en: 'Reports & Analytics' },
    label: { ar: 'التقارير', en: 'Reports' },
    summary: {
      ar: 'تقارير للتسليم، الفشل، التحصيل، أداء المناديب، والمناطق التي تحتاج مراجعة تشغيلية.',
      en: 'Reports for delivery, failure, COD, courier performance, and zones that need operational review.',
    },
    path: '/request-demo',
    available: false,
    category: 'trust-followup',
    supporting: true,
    note: { ar: 'ضمن لوحة التحكم والتقارير', en: 'Included in the dashboard and reports' },
    cta: { ar: 'ضمن العرض التوضيحي', en: 'Included in the demo' },
    accent: 'gold',
  },
]

export const featureDetails: FeatureDetail[] = [
  {
    key: 'smart-dispatch',
    path: '/features/smart-dispatch',
    accent: 'dispatch',
    title: { ar: 'Smart Dispatch', en: 'Smart Dispatch' },
    kicker: { ar: 'إسناد الشحنات قبل ازدحام اليوم', en: 'Assignment before the day gets crowded' },
    summary: {
      ar: 'Trackora يحول قرار التوزيع من مكالمة ومراجعة جدول إلى سجل واضح: الشحنة، المنطقة، المندوب، السعة، الأولوية، ومبلغ التحصيل تظهر في نفس اللحظة.',
      en: 'Trackora turns dispatch from calls and spreadsheet checks into a clear record: shipment, zone, courier, capacity, priority, and COD value appear together.',
    },
    heroNote: { ar: 'مناسب لفريق ديسباتش يوزع مئات الشحنات على مناطق ومناديب متغيرة.', en: 'Built for dispatch teams assigning hundreds of shipments across changing zones and courier capacity.' },
    problemTitle: { ar: 'التوزيع اليدوي يكسر اليوم من أوله', en: 'Manual dispatch breaks the day early' },
    problem: {
      ar: 'عندما يعتمد الفريق على معرفة شخصية بالمناطق أو مجموعات واتساب، تخرج شحنات COD عالية القيمة مع مندوب مزدحم، أو تبقى شحنات عاجلة في المستودع لأن الأولوية غير ظاهرة.',
      en: 'When teams rely on personal zone knowledge or messaging groups, high-value COD shipments can go with overloaded couriers while urgent shipments stay in the warehouse because priority is not visible.',
    },
    solutionTitle: { ar: 'قرار توزيع يرى المنطقة والسعة والتحصيل معا', en: 'Dispatch decisions that see zone, capacity, and COD together' },
    solution: {
      ar: 'يعرض Trackora الشحنات حسب المنطقة والحالة والأولوية، ويقترح المندوب المناسب بناء على السعة ومسار اليوم. يستطيع المشرف قبول الإسناد أو تعديله يدويا مع بقاء سبب القرار مسجلا.',
      en: 'Trackora shows shipments by zone, status, and priority, then suggests the right courier based on capacity and the day route. Supervisors can accept the assignment or override it while keeping the decision reason recorded.',
    },
    capabilitiesTitle: { ar: 'ما يراه فريق الديسباتش', en: 'What dispatch teams see' },
    capabilities: [
      { ar: 'مطابقة المناطق مع مناديب لديهم سعة فعلية في نفس اليوم.', en: 'Zone matching against couriers with actual same-day capacity.' },
      { ar: 'أولوية للشحنات العاجلة أو مرتفعة التحصيل قبل الطريق.', en: 'Priority handling for urgent or high-COD shipments before routing.' },
      { ar: 'إسناد COD-aware يقلل بقاء النقد مع مندوب واحد فوق الحد.', en: 'COD-aware assignment that reduces too much cash held by one courier.' },
      { ar: 'تعديل يدوي من المشرف عندما يحتاج القرار معرفة محلية.', en: 'Manual supervisor override when the decision needs local context.' },
      { ar: 'حالة كل شحنة بعد الإسناد: بانتظار الاستلام، خرجت، فشلت، أو تحتاج مراجعة.', en: 'Post-assignment status for every shipment: awaiting pickup, out, failed, or needing review.' },
    ],
    workflowTitle: { ar: 'مسار الإسناد', en: 'Assignment flow' },
    workflow: [
      { title: { ar: 'تجميع الشحنات', en: 'Group shipments' }, text: { ar: 'تظهر الشحنات الجديدة حسب المنطقة، التاجر، حالة الدفع، ومبلغ COD.', en: 'New shipments appear by zone, merchant, payment status, and COD amount.' } },
      { title: { ar: 'قراءة السعة', en: 'Read capacity' }, text: { ar: 'يراجع النظام حمل كل مندوب وما لديه من شحنات مفتوحة ونقد محصل.', en: 'The system checks each courier load, open shipments, and collected cash.' } },
      { title: { ar: 'اقتراح الإسناد', en: 'Suggest assignment' }, text: { ar: 'يقترح Trackora المندوب الأنسب ويعرض سبب الاختيار للمشرف.', en: 'Trackora suggests the best courier and shows the reason to the supervisor.' } },
      { title: { ar: 'قبول أو تعديل', en: 'Accept or override' }, text: { ar: 'يؤكد المشرف القرار أو يغيره، ثم ينتقل للمندوب وتطبيقه.', en: 'The supervisor confirms or changes the decision, then it moves to the courier app.' } },
    ],
    signalsTitle: { ar: 'إشارات القرار', en: 'Decision signals' },
    signals: [
      { label: { ar: 'منطقة', en: 'Zone' }, value: { ar: 'مدينة نصر', en: 'Nasr City' } },
      { label: { ar: 'سعة المندوب', en: 'Courier capacity' }, value: { ar: '18 / 24 شحنة', en: '18 / 24 shipments' } },
      { label: { ar: 'COD', en: 'COD' }, value: { ar: '12,450 ج.م', en: 'EGP 12,450' } },
      { label: { ar: 'الأولوية', en: 'Priority' }, value: { ar: 'تسليم اليوم', en: 'Deliver today' } },
    ],
    artifact: {
      type: 'assignment-matrix',
      title: { ar: 'مصفوفة إسناد الديسباتش', en: 'Dispatch assignment matrix' },
      description: { ar: 'المشرف يرى الشحنة والمنطقة والمندوب والسعة ودرجة الملاءمة قبل اعتماد الإسناد.', en: 'The supervisor sees shipment, zone, courier, capacity, fit score, and assignment status before confirming.' },
      columns: [
        { ar: 'الشحنة', en: 'Shipment' },
        { ar: 'المنطقة', en: 'Zone' },
        { ar: 'المندوب', en: 'Courier' },
        { ar: 'السعة', en: 'Capacity' },
        { ar: 'الدرجة', en: 'Score' },
        { ar: 'حالة الإسناد', en: 'Assignment status' },
      ],
      rows: [
        [{ ar: 'TRK-4821', en: 'TRK-4821' }, { ar: 'مدينة نصر', en: 'Nasr City' }, { ar: 'أحمد صبري', en: 'Ahmed Sabry' }, { ar: '18 / 24', en: '18 / 24' }, { ar: '94%', en: '94%' }, { ar: 'مقترح', en: 'Suggested' }],
        [{ ar: 'TRK-4836', en: 'TRK-4836' }, { ar: 'المعادي', en: 'Maadi' }, { ar: 'منى خالد', en: 'Mona Khaled' }, { ar: '11 / 20', en: '11 / 20' }, { ar: '88%', en: '88%' }, { ar: 'جاهز للاعتماد', en: 'Ready to approve' }],
        [{ ar: 'TRK-4850', en: 'TRK-4850' }, { ar: 'التجمع الخامس', en: 'New Cairo' }, { ar: 'كريم علي', en: 'Karim Ali' }, { ar: '23 / 24', en: '23 / 24' }, { ar: '61%', en: '61%' }, { ar: 'تحتاج مراجعة', en: 'Needs review' }],
      ],
    },
    reviewTitle: { ar: 'قبل خروج الشحنات', en: 'Before shipments leave' },
    review: [
      { ar: 'راجع الشحنات غير المسندة حسب المنطقة.', en: 'Review unassigned shipments by zone.' },
      { ar: 'وازن النقد المتوقع بين المناديب.', en: 'Balance expected cash across couriers.' },
      { ar: 'أوقف أي شحنة عليها خطر قبل الطريق.', en: 'Hold any risk-flagged shipment before route start.' },
    ],
    relatedKeys: ['courier-app', 'cod-wallet', 'fraud-detection'],
    seoTitle: { ar: 'Smart Dispatch لإسناد الشحنات والمناديب', en: 'Smart Dispatch for Shipments and Couriers' },
    seoDescription: { ar: 'إسناد الشحنات حسب المناطق، سعة المناديب، الأولوية، وCOD مع تحكم يدوي عند الحاجة.', en: 'Assign shipments by zones, courier capacity, priority, and COD with manual override when needed.' },
  },
  {
    key: 'courier-app',
    path: '/features/courier-app',
    accent: 'courier',
    title: { ar: 'Courier App', en: 'Courier App' },
    kicker: { ar: 'تطبيق ميداني لا يحتاج شرحا طويلا', en: 'A field app that does not need a long briefing' },
    summary: {
      ar: 'المندوب يرى مهامه، يحدث الحالة، يسجل التحصيل، ويرفع إثبات التسليم من نفس المسار حتى لا تبقى العملية معلقة بين الهاتف ولوحة الإدارة.',
      en: 'The courier sees tasks, updates status, records COD, and captures proof of delivery in one flow so operations do not stay split between phone calls and the admin panel.',
    },
    heroNote: { ar: 'مصمم ليعمل مع يوم طويل في الطريق، إنترنت متقطع، وحالات تسليم كثيرة.', en: 'Designed for long route days, intermittent connectivity, and many delivery outcomes.' },
    problemTitle: { ar: 'كل حالة غير مسجلة تتحول إلى مكالمة', en: 'Every unrecorded status becomes a call' },
    problem: {
      ar: 'إذا لم يسجل المندوب الاستلام، سبب الفشل، أو المبلغ المحصل في وقته، يفقد الدعم والتاجر والعميل نفس المعلومة. النتيجة: مكالمات متابعة وتسوية نقدية متأخرة.',
      en: 'If the courier does not record pickup, failure reason, or collected amount on time, support, the merchant, and the customer all lose the same piece of information. The result is more calls and delayed cash reconciliation.',
    },
    solutionTitle: { ar: 'قائمة مهام واضحة مع تحديثات قابلة للمراجعة', en: 'A clear task list with reviewable updates' },
    solution: {
      ar: 'يرتب التطبيق مهام المندوب حسب المسار والحالة. عند كل شحنة يستطيع تسجيل الاستلام، خارج للتوصيل، تم التسليم، فشل، مؤجل، أو مرتجع، مع مبلغ COD وإثبات التسليم عند الحاجة.',
      en: 'The app organizes courier tasks by route and status. For each shipment, the courier can record pickup, out for delivery, delivered, failed, postponed, or returned, with COD amount and proof of delivery when needed.',
    },
    capabilitiesTitle: { ar: 'ما يحتاجه المندوب في الطريق', en: 'What couriers need on the route' },
    capabilities: [
      { ar: 'قائمة شحنات يومية مرتبة حسب المنطقة والأولوية.', en: 'Daily shipment list ordered by zone and priority.' },
      { ar: 'تحديث حالات سريع من أزرار واضحة لا تعتمد على محادثات جانبية.', en: 'Fast status updates through clear actions, not side conversations.' },
      { ar: 'تسجيل COD المحصل والمعلق والمرتجع من نفس شاشة الشحنة.', en: 'Record collected, pending, and returned COD from the shipment screen.' },
      { ar: 'إثبات تسليم بصور أو توقيع أو ملاحظة تشغيلية حسب الحاجة.', en: 'Proof of delivery with images, signature, or operations note as needed.' },
      { ar: 'مسار يتحمل ضعف الاتصال ثم يرسل التحديثات عند عودة الشبكة.', en: 'Offline-friendly flow that queues updates until the network returns.' },
    ],
    workflowTitle: { ar: 'يوم المندوب', en: 'Courier day' },
    workflow: [
      { title: { ar: 'استلام القائمة', en: 'Receive task list' }, text: { ar: 'تظهر شحنات اليوم مع المنطقة ورقم العميل ومبلغ COD.', en: 'Today shipments appear with zone, customer number, and COD amount.' } },
      { title: { ar: 'تحديث الطريق', en: 'Update route' }, text: { ar: 'كل انتقال في الحالة يظهر مباشرة لفريق التشغيل والتاجر.', en: 'Every status movement appears for operations and the merchant.' } },
      { title: { ar: 'تحصيل أو فشل', en: 'Collect or fail' }, text: { ar: 'يسجل المندوب المبلغ أو سبب الفشل بطريقة قابلة للمراجعة.', en: 'The courier records the amount or failure reason in a reviewable way.' } },
      { title: { ar: 'إغلاق المهمة', en: 'Close task' }, text: { ar: 'تنتقل الشحنة للمحفظة والتقارير بدون إعادة إدخال.', en: 'The shipment moves to wallet and reports without re-entry.' } },
    ],
    signalsTitle: { ar: 'حالة من الطريق', en: 'Field status' },
    signals: [
      { label: { ar: 'المهمة', en: 'Task' }, value: { ar: 'TRK-4821', en: 'TRK-4821' } },
      { label: { ar: 'الحالة', en: 'Status' }, value: { ar: 'خارج للتوصيل', en: 'Out for delivery' } },
      { label: { ar: 'التحصيل', en: 'Collection' }, value: { ar: '850 ج.م', en: 'EGP 850' } },
      { label: { ar: 'الشبكة', en: 'Network' }, value: { ar: 'تحديث محفوظ', en: 'Update queued' } },
    ],
    artifact: {
      type: 'task-strip',
      title: { ar: 'شريط مهام المندوب', en: 'Courier task strip' },
      description: { ar: 'كل مهمة في الطريق تحمل ترتيبها، الحالة، مبلغ COD، الإثبات المطلوب، وحالة المزامنة.', en: 'Each route task carries order, status, COD amount, required proof, and sync state.' },
      columns: [
        { ar: 'ترتيب المسار', en: 'Route order' },
        { ar: 'حالة الشحنة', en: 'Shipment status' },
        { ar: 'مبلغ COD', en: 'COD amount' },
        { ar: 'الإثبات المطلوب', en: 'Proof required' },
        { ar: 'حالة المزامنة', en: 'Sync status' },
      ],
      rows: [
        [{ ar: '01 · TRK-4821', en: '01 · TRK-4821' }, { ar: 'خارج للتوصيل', en: 'Out for delivery' }, { ar: '850 ج.م', en: 'EGP 850' }, { ar: 'صورة استلام', en: 'Delivery photo' }, { ar: 'متزامن', en: 'Synced' }],
        [{ ar: '02 · TRK-4894', en: '02 · TRK-4894' }, { ar: 'تم التسليم', en: 'Delivered' }, { ar: '1,250 ج.م', en: 'EGP 1,250' }, { ar: 'توقيع العميل', en: 'Customer signature' }, { ar: 'ينتظر الشبكة', en: 'Waiting for network' }],
        [{ ar: '03 · TRK-4902', en: '03 · TRK-4902' }, { ar: 'فشل، العميل غير متاح', en: 'Failed, customer unavailable' }, { ar: '0 ج.م', en: 'EGP 0' }, { ar: 'سبب الفشل', en: 'Failure reason' }, { ar: 'محفوظ محليا', en: 'Saved locally' }],
      ],
    },
    reviewTitle: { ar: 'عند نهاية الشفت', en: 'At shift close' },
    review: [
      { ar: 'الشحنات المسلمة لها إثبات واضح.', en: 'Delivered shipments have clear proof.' },
      { ar: 'الشحنات الفاشلة لها سبب محدد.', en: 'Failed shipments have a specific reason.' },
      { ar: 'النقد مع المندوب مطابق لما تم تسجيله.', en: 'Courier cash matches recorded collections.' },
    ],
    relatedKeys: ['smart-dispatch', 'cod-wallet', 'merchant-portal'],
    seoTitle: { ar: 'Courier App لتحديث الحالات وتحصيل COD', en: 'Courier App for Status Updates and COD Collection' },
    seoDescription: { ar: 'تطبيق مندوب لإدارة المهام، تحديث الشحنات، تحصيل COD، وإثبات التسليم مع دعم ضعف الاتصال.', en: 'Courier app for tasks, shipment updates, COD collection, and proof of delivery with offline-friendly handling.' },
  },
  {
    key: 'merchant-portal',
    path: '/features/merchant-portal',
    accent: 'merchant',
    title: { ar: 'Merchant Portal', en: 'Merchant Portal' },
    kicker: { ar: 'بوابة تجعل التاجر يرى ما يحدث بدون سؤال متكرر', en: 'A portal that lets merchants see what is happening without repeated questions' },
    summary: {
      ar: 'بوابة التاجر تجمع إنشاء الشحنات، الرفع المجمع، التتبع، المحفظة، والتقارير في واجهة واحدة حتى لا يتحول كل طلب إلى رسالة دعم.',
      en: 'The merchant portal brings shipment creation, bulk upload, tracking, wallet visibility, and reports into one interface so every order does not become a support message.',
    },
    heroNote: { ar: 'مناسبة للتجار الذين يرسلون طلبات يومية ويحتاجون رؤية مالية وتشغيلية.', en: 'For merchants sending daily orders who need operational and wallet visibility.' },
    problemTitle: { ar: 'غياب الرؤية يضغط على شركة الشحن والتاجر', en: 'Lack of visibility pressures both operator and merchant' },
    problem: {
      ar: 'عندما لا يرى التاجر حالة الطلب أو مستحقات COD بنفسه، يطلب تحديثات من الدعم. ومع زيادة الطلبات، تتحول الأسئلة الصغيرة إلى عبء على فريق التشغيل.',
      en: 'When merchants cannot see order status or COD receivables themselves, they ask support for updates. As order volume grows, small questions become load on the operations team.',
    },
    solutionTitle: { ar: 'كل طلب وتحصيله وتقريره في مكان واحد', en: 'Every order, collection, and report in one place' },
    solution: {
      ar: 'يعطي Trackora التاجر شاشة لإنشاء شحنة، رفع ملف، متابعة حالة الشحنات، رؤية المحفظة، وتنزيل تقارير تساعده على مراجعة الطلبات والتحصيل بدون انتظار رد يدوي.',
      en: 'Trackora gives merchants a screen to create a shipment, upload a file, follow shipment statuses, view wallet balances, and download reports without waiting for a manual response.',
    },
    capabilitiesTitle: { ar: 'عمليات التاجر اليومية', en: 'Daily merchant operations' },
    capabilities: [
      { ar: 'إنشاء شحنة واحدة ببيانات العميل ومبلغ COD والمنطقة.', en: 'Create one shipment with customer details, COD amount, and zone.' },
      { ar: 'رفع دفعة طلبات ومراجعة الأخطاء قبل تسليمها للتشغيل.', en: 'Upload order batches and review errors before handing them to operations.' },
      { ar: 'متابعة كل حالة: قيد الانتظار، خرجت للتوصيل، سلمت، فشلت، أو مرتجعة.', en: 'Follow every status: pending, out for delivery, delivered, failed, or returned.' },
      { ar: 'رؤية المحفظة: محصل، معلق، جاهز للتسوية، ومسوى.', en: 'Wallet visibility: collected, pending, ready for settlement, and settled.' },
      { ar: 'تقارير للشحنات والتحصيل تساعد المحاسبة وخدمة العملاء.', en: 'Shipment and COD reports for finance and customer service.' },
    ],
    workflowTitle: { ar: 'مسار التاجر', en: 'Merchant flow' },
    workflow: [
      { title: { ar: 'إنشاء أو رفع', en: 'Create or upload' }, text: { ar: 'يدخل التاجر شحنة واحدة أو يرفع ملف طلبات كامل.', en: 'Merchant creates one shipment or uploads a full order file.' } },
      { title: { ar: 'تحقق قبل التشغيل', en: 'Validate before operations' }, text: { ar: 'تظهر الصفوف الناقصة أو الأرقام المكررة قبل تسليمها للديسباتش.', en: 'Missing rows and repeated numbers appear before handoff to dispatch.' } },
      { title: { ar: 'متابعة الحالات', en: 'Follow statuses' }, text: { ar: 'يرى التاجر التحديثات التي يسجلها المندوب وفريق التشغيل.', en: 'Merchant sees updates recorded by couriers and operations.' } },
      { title: { ar: 'مراجعة المحفظة', en: 'Review wallet' }, text: { ar: 'تظهر مبالغ COD حسب الشحنة وحالة التسوية.', en: 'COD amounts appear by shipment and settlement status.' } },
    ],
    signalsTitle: { ar: 'لقطة من بوابة التاجر', en: 'Portal snapshot' },
    signals: [
      { label: { ar: 'طلبات اليوم', en: 'Today orders' }, value: { ar: '146 شحنة', en: '146 shipments' } },
      { label: { ar: 'أخطاء الملف', en: 'File errors' }, value: { ar: '7 صفوف', en: '7 rows' } },
      { label: { ar: 'قيد التوصيل', en: 'In delivery' }, value: { ar: '82 شحنة', en: '82 shipments' } },
      { label: { ar: 'جاهز للتسوية', en: 'Ready to settle' }, value: { ar: '43,100 ج.م', en: 'EGP 43,100' } },
    ],
    artifact: {
      type: 'operations-board',
      title: { ar: 'لوحة عمليات التاجر', en: 'Merchant operations board' },
      description: { ar: 'بوابة واحدة تجمع إنشاء الشحنات، الرفع المجمع، آخر الشحنات، ورؤية المحفظة.', en: 'One portal view combines shipment creation, bulk upload, recent shipments, and wallet visibility.' },
      columns: [
        { ar: 'إنشاء شحنة', en: 'Shipment creation' },
        { ar: 'رفع مجمع', en: 'Bulk upload' },
        { ar: 'آخر الشحنات', en: 'Recent shipments' },
        { ar: 'رؤية المحفظة', en: 'Wallet visibility' },
      ],
      rows: [
        [{ ar: 'TRK-5120 محفوظة كمسودة', en: 'TRK-5120 saved as draft' }, { ar: 'merchant-june.csv', en: 'merchant-june.csv' }, { ar: 'TRK-5091 تم التسليم', en: 'TRK-5091 delivered' }, { ar: '18,450 ج.م جاهزة', en: 'EGP 18,450 ready' }],
        [{ ar: 'عميل جديد، COD 620 ج.م', en: 'New customer, EGP 620 COD' }, { ar: '342 صف، 9 تحتاج تصحيح', en: '342 rows, 9 need fixes' }, { ar: 'TRK-5098 خارج للتوصيل', en: 'TRK-5098 out for delivery' }, { ar: '3,200 ج.م معلقة', en: 'EGP 3,200 pending' }],
      ],
    },
    reviewTitle: { ar: 'ما يقل على الدعم', en: 'What support no longer repeats' },
    review: [
      { ar: 'أين وصلت الشحنة؟', en: 'Where is the shipment?' },
      { ar: 'ما مستحقات التاجر اليوم؟', en: 'What is the merchant owed today?' },
      { ar: 'أي صفوف في الملف تحتاج تصحيحا؟', en: 'Which file rows need correction?' },
    ],
    relatedKeys: ['bulk-upload', 'cod-wallet', 'smart-dispatch'],
    seoTitle: { ar: 'Merchant Portal لإنشاء وتتبع الشحنات', en: 'Merchant Portal for Shipment Creation and Tracking' },
    seoDescription: { ar: 'بوابة للتاجر لإنشاء الشحنات، رفع الطلبات، متابعة التتبع، رؤية محفظة COD، وتنزيل التقارير.', en: 'Merchant portal for creating shipments, uploading orders, tracking statuses, viewing COD wallet, and downloading reports.' },
  },
  {
    key: 'cod-wallet',
    path: '/features/cod-wallet',
    accent: 'wallet',
    title: { ar: 'COD Wallet', en: 'COD Wallet' },
    kicker: { ar: 'رؤية مالية من الشحنة حتى التسوية', en: 'Financial visibility from shipment to settlement' },
    summary: {
      ar: 'محفظة COD تعرض ما تم تحصيله، ما بقي مع المناديب، ما ينتظر التسوية، وسجل المعاملات الذي تحتاجه المحاسبة لتغلق اليوم بثقة.',
      en: 'COD Wallet shows what was collected, what is still held by couriers, what awaits settlement, and the transaction history finance needs to close the day confidently.',
    },
    heroNote: { ar: 'مبنية للفرق التي تراجع نقد المناديب ومستحقات التجار يوميا.', en: 'Built for teams reviewing courier cash and merchant receivables every day.' },
    problemTitle: { ar: 'COD يتعقد عندما يعيش خارج سجل الشحنة', en: 'COD gets messy when it lives outside the shipment record' },
    problem: {
      ar: 'عندما يسجل التحصيل في دفتر منفصل أو ملف Excel، يصعب معرفة النقد الموجود مع كل مندوب، المرتجع، المعلق، والمبلغ الجاهز للتسوية مع التاجر.',
      en: 'When collection is recorded in a separate book or spreadsheet, it becomes hard to know cash held by each courier, returned amounts, pending items, and what is ready to settle with the merchant.',
    },
    solutionTitle: { ar: 'كل حركة نقد مرتبطة بسببها وشحنتها', en: 'Every cash movement tied to its shipment and reason' },
    solution: {
      ar: 'يربط Trackora كل مبلغ COD بالشحنة والمندوب والتاجر. تظهر التحصيلات، الخصومات، المرتجعات، والتسويات كتاريخ معاملات واضح يمكن مراجعته قبل اعتماد أي دفع.',
      en: 'Trackora links every COD amount to the shipment, courier, and merchant. Collections, deductions, returns, and settlements appear as a clear transaction history before any payment is approved.',
    },
    capabilitiesTitle: { ar: 'ماذا تحتوي المحفظة', en: 'What the wallet contains' },
    capabilities: [
      { ar: 'رصيد لكل تاجر: محصل، معلق، مرتجع، وجاهز للتسوية.', en: 'Balance per merchant: collected, pending, returned, and ready to settle.' },
      { ar: 'نقد مع كل مندوب وحركة تسليمه للخزنة.', en: 'Cash held by each courier and handoff to treasury.' },
      { ar: 'سجل معاملات يوضح الشحنة، التاريخ، الحالة، والمبلغ.', en: 'Transaction history with shipment, date, status, and amount.' },
      { ar: 'مسار تسوية يفرق بين ما تم دفعه وما يحتاج مراجعة.', en: 'Settlement flow separating paid amounts from items needing review.' },
      { ar: 'مطابقة يومية بين تطبيق المندوب ولوحة المحاسبة.', en: 'Daily reconciliation between courier app and finance panel.' },
    ],
    workflowTitle: { ar: 'دورة التسوية', en: 'Settlement cycle' },
    workflow: [
      { title: { ar: 'تحصيل المندوب', en: 'Courier collects' }, text: { ar: 'يسجل المندوب المبلغ عند التسليم أو سبب عدم التحصيل.', en: 'Courier records the amount at delivery or the reason collection did not happen.' } },
      { title: { ar: 'حجز في المحفظة', en: 'Wallet hold' }, text: { ar: 'ينتقل المبلغ إلى رصيد التاجر مع إشارة إلى النقد الموجود مع المندوب.', en: 'The amount moves to merchant balance with a marker for cash held by the courier.' } },
      { title: { ar: 'مطابقة', en: 'Reconcile' }, text: { ar: 'يراجع فريق التحصيل النقد الفعلي مقابل سجل الشحنات.', en: 'Collection team reviews physical cash against shipment records.' } },
      { title: { ar: 'تسوية', en: 'Settle' }, text: { ar: 'تعتمد المحاسبة المبلغ الجاهز للتاجر مع سجل قابل للتصدير.', en: 'Finance approves the amount ready for merchant settlement with exportable records.' } },
    ],
    signalsTitle: { ar: 'مؤشرات المحفظة', en: 'Wallet signals' },
    signals: [
      { label: { ar: 'محصل اليوم', en: 'Collected today' }, value: { ar: '74,250 ج.م', en: 'EGP 74,250' } },
      { label: { ar: 'مع المناديب', en: 'With couriers' }, value: { ar: '18,700 ج.م', en: 'EGP 18,700' } },
      { label: { ar: 'جاهز للتسوية', en: 'Ready to settle' }, value: { ar: '55,550 ج.م', en: 'EGP 55,550' } },
      { label: { ar: 'معلق', en: 'Pending' }, value: { ar: '12 شحنة', en: '12 shipments' } },
    ],
    artifact: {
      type: 'transaction-ledger',
      title: { ar: 'سجل معاملات COD', en: 'COD transaction ledger' },
      description: { ar: 'كل ائتمان وخصم ورسوم تغير الرصيد الجاري وتوضح حالة التسوية.', en: 'Each credit, debit, and fee changes the running balance and shows settlement status.' },
      columns: [
        { ar: 'ائتمان COD', en: 'COD credit' },
        { ar: 'خصم عمولة', en: 'Commission debit' },
        { ar: 'خصم رسوم', en: 'Fee debit' },
        { ar: 'الرصيد الجاري', en: 'Running balance' },
        { ar: 'حالة التسوية', en: 'Settlement status' },
      ],
      rows: [
        [{ ar: 'TRK-4821 · 850 ج.م', en: 'TRK-4821 · EGP 850' }, { ar: '42.50 ج.م', en: 'EGP 42.50' }, { ar: '0 ج.م', en: 'EGP 0' }, { ar: '18,407.50 ج.م', en: 'EGP 18,407.50' }, { ar: 'جاهز للتسوية', en: 'Ready to settle' }],
        [{ ar: 'TRK-4894 · 1,250 ج.م', en: 'TRK-4894 · EGP 1,250' }, { ar: '62.50 ج.م', en: 'EGP 62.50' }, { ar: '15 ج.م', en: 'EGP 15' }, { ar: '19,580 ج.م', en: 'EGP 19,580' }, { ar: 'قيد المراجعة', en: 'Under review' }],
        [{ ar: 'TRK-4902 · مرتجع', en: 'TRK-4902 · Returned' }, { ar: '0 ج.م', en: 'EGP 0' }, { ar: '25 ج.م', en: 'EGP 25' }, { ar: '19,555 ج.م', en: 'EGP 19,555' }, { ar: 'معلق', en: 'Pending' }],
      ],
    },
    reviewTitle: { ar: 'أسئلة يغلقها سجل COD', en: 'Questions COD records close' },
    review: [
      { ar: 'من يحمل النقد الآن؟', en: 'Who currently holds the cash?' },
      { ar: 'أي شحنة سببت فرق التسوية؟', en: 'Which shipment caused the settlement difference?' },
      { ar: 'ما الجاهز للدفع للتاجر؟', en: 'What is ready to pay the merchant?' },
    ],
    relatedKeys: ['courier-app', 'merchant-portal', 'smart-dispatch'],
    seoTitle: { ar: 'COD Wallet لإدارة التحصيل والتسوية', en: 'COD Wallet for Collection and Settlement' },
    seoDescription: { ar: 'رؤية رصيد COD، سجل المعاملات، النقد مع المناديب، ومسار التسوية بين شركة الشحن والتجار.', en: 'Visibility into COD balance, transaction history, courier-held cash, and settlement flow between operator and merchants.' },
  },
  {
    key: 'bulk-upload',
    path: '/features/bulk-upload',
    accent: 'upload',
    title: { ar: 'Bulk Upload', en: 'Bulk Upload' },
    kicker: { ar: 'إدخال دفعات الطلبات بدون فوضى صفوف', en: 'Batch order intake without row chaos' },
    summary: {
      ar: 'Bulk Upload يساعد المتاجر وفريق التشغيل على رفع شحنات كثيرة دفعة واحدة، ثم يوضح الصفوف الناقصة أو الخاطئة قبل أن تتحول إلى شحنات ضائعة.',
      en: 'Bulk Upload helps merchants and operations teams upload many shipments at once, then shows missing or wrong rows before they become lost shipments.',
    },
    heroNote: { ar: 'مهم عند إدخال طلبات متاجر كثيرة أو بدء تاجر جديد على النظام.', en: 'Useful when onboarding merchants or importing large order batches.' },
    problemTitle: { ar: 'أخطاء الملف تظهر غالبا بعد فوات الوقت', en: 'File errors usually appear too late' },
    problem: {
      ar: 'رقم ناقص، عنوان غير واضح، منطقة غير مطابقة، أو قيمة COD خاطئة تكفي لتعطيل شحنة. إذا دخلت الأخطاء التشغيل، تبدأ الاتصالات والتعديل اليدوي.',
      en: 'A missing phone number, unclear address, unmatched zone, or wrong COD value can block a shipment. If errors enter operations, calls and manual correction start.',
    },
    solutionTitle: { ar: 'تحقق قبل قبول الدفعة', en: 'Validation before the batch is accepted' },
    solution: {
      ar: 'يقرأ Trackora ملف الشحنات، يطابق الأعمدة، ويعرض الصفوف التي تحتاج تصحيحا برسائل واضحة. بعد التصحيح، تنتقل الشحنات الجاهزة إلى الديسباتش بدون إعادة إدخال.',
      en: 'Trackora reads the shipment file, maps columns, and shows rows needing correction with clear messages. After correction, ready shipments move to dispatch without re-entry.',
    },
    capabilitiesTitle: { ar: 'أدوات رفع الدفعات', en: 'Batch upload tools' },
    capabilities: [
      { ar: 'رفع ملف يحتوي شحنات كثيرة من قوالب المتاجر.', en: 'Upload files with many shipments from merchant templates.' },
      { ar: 'مطابقة أعمدة العميل، الهاتف، العنوان، المنطقة، ومبلغ COD.', en: 'Map customer, phone, address, zone, and COD columns.' },
      { ar: 'رسائل خطأ حسب الصف حتى يعرف الفريق ما يصحح.', en: 'Row-level error messages so teams know what to fix.' },
      { ar: 'قبول الشحنات الصحيحة وإيقاف الصفوف غير الجاهزة.', en: 'Accept valid shipments and hold rows that are not ready.' },
      { ar: 'تجربة onboarding أوضح للتاجر الجديد.', en: 'Clearer onboarding for new merchants.' },
    ],
    workflowTitle: { ar: 'من الملف إلى الشحنات الجاهزة', en: 'From file to ready shipments' },
    workflow: [
      { title: { ar: 'رفع الملف', en: 'Upload file' }, text: { ar: 'يرفع التاجر أو الفريق ملف الطلبات اليومي.', en: 'Merchant or operations uploads the daily order file.' } },
      { title: { ar: 'مطابقة الحقول', en: 'Map fields' }, text: { ar: 'يتم ربط أعمدة الملف بحقول Trackora المطلوبة.', en: 'File columns are matched to required Trackora fields.' } },
      { title: { ar: 'إصلاح الأخطاء', en: 'Fix errors' }, text: { ar: 'تظهر الصفوف الناقصة أو المكررة أو غير المطابقة.', en: 'Missing, duplicate, or unmatched rows are displayed.' } },
      { title: { ar: 'تسليم للتوزيع', en: 'Hand off to dispatch' }, text: { ar: 'تدخل الشحنات الصحيحة إلى الديسباتش والتتبع والمحفظة.', en: 'Valid shipments enter dispatch, tracking, and wallet flows.' } },
    ],
    signalsTitle: { ar: 'نتيجة رفع ملف', en: 'Upload result' },
    signals: [
      { label: { ar: 'إجمالي الصفوف', en: 'Total rows' }, value: { ar: '1,240', en: '1,240' } },
      { label: { ar: 'جاهزة', en: 'Ready' }, value: { ar: '1,188', en: '1,188' } },
      { label: { ar: 'تحتاج تصحيح', en: 'Needs correction' }, value: { ar: '52', en: '52' } },
      { label: { ar: 'أكثر خطأ', en: 'Top error' }, value: { ar: 'منطقة ناقصة', en: 'Missing zone' } },
    ],
    artifact: {
      type: 'validation-table',
      title: { ar: 'جدول تحقق الرفع', en: 'Upload validation table' },
      description: { ar: 'الصفوف الخاطئة تظهر بأرقامها وسببها قبل أن تدخل إلى الديسباتش.', en: 'Invalid rows show their row number and reason before they enter dispatch.' },
      columns: [
        { ar: 'رقم الصف', en: 'Row number' },
        { ar: 'هاتف العميل', en: 'Customer phone' },
        { ar: 'العنوان', en: 'Address' },
        { ar: 'COD', en: 'COD' },
        { ar: 'نتيجة التحقق', en: 'Validation result' },
      ],
      rows: [
        [{ ar: '18', en: '18' }, { ar: '01011223344', en: '01011223344' }, { ar: 'شارع الطيران، مدينة نصر', en: 'El Tayaran St, Nasr City' }, { ar: '850 ج.م', en: 'EGP 850' }, { ar: 'جاهز', en: 'Valid' }],
        [{ ar: '47', en: '47' }, { ar: '01011223344', en: '01011223344' }, { ar: 'مدينة نصر', en: 'Nasr City' }, { ar: '620 ج.م', en: 'EGP 620' }, { ar: 'هاتف مكرر', en: 'Repeated phone' }],
        [{ ar: '52', en: '52' }, { ar: '01199887766', en: '01199887766' }, { ar: 'عنوان غير كاف', en: 'Insufficient address' }, { ar: '1,100 ج.م', en: 'EGP 1,100' }, { ar: 'تحتاج تصحيح العنوان', en: 'Fix address' }],
        [{ ar: '63', en: '63' }, { ar: '01200014567', en: '01200014567' }, { ar: 'المعادي، دجلة', en: 'Degla, Maadi' }, { ar: 'COD?', en: 'COD?' }, { ar: 'قيمة غير رقمية', en: 'Non-numeric value' }],
      ],
    },
    reviewTitle: { ar: 'أخطاء توقف قبل الطريق', en: 'Errors stopped before routing' },
    review: [
      { ar: 'رقم هاتف مكرر أو ناقص.', en: 'Repeated or missing phone number.' },
      { ar: 'عنوان لا يكفي لتحديد المنطقة.', en: 'Address not enough to identify the zone.' },
      { ar: 'قيمة COD غير رقمية أو غير متطابقة.', en: 'COD value is non-numeric or inconsistent.' },
    ],
    relatedKeys: ['merchant-portal', 'smart-dispatch', 'fraud-detection'],
    seoTitle: { ar: 'Bulk Upload لرفع شحنات كثيرة مع تحقق', en: 'Bulk Upload for Validated Shipment Batches' },
    seoDescription: { ar: 'ارفع شحنات كثيرة، راجع الصفوف الخاطئة، وصحح بيانات الطلبات قبل بدء التوزيع.', en: 'Upload many shipments, review error rows, and correct order data before dispatch starts.' },
  },
  {
    key: 'fraud-detection',
    path: '/features/fraud-detection',
    accent: 'risk',
    title: { ar: 'Fraud Detection', en: 'Fraud Detection' },
    kicker: { ar: 'مراجعة المخاطر قبل أن يدفع المندوب تكلفة الطريق', en: 'Risk review before the courier pays for the trip' },
    summary: {
      ar: 'Fraud Detection يرفع إشارات عن الطلبات الوهمية، الأرقام المتكررة، مخاطر COD، وجودة العنوان حتى يراجعها التشغيل قبل الإسناد.',
      en: 'Fraud Detection flags fake orders, repeated phone numbers, COD risk, and address quality so operations can review before dispatch.',
    },
    heroNote: { ar: 'مفيد للطلبات عالية COD أو الحملات التي تأتي من قنوات اجتماعية سريعة.', en: 'Useful for high-COD orders or fast social-selling campaigns.' },
    problemTitle: { ar: 'الطلب الوهمي لا يظهر دائما كطلب وهمي', en: 'A fake order does not always look fake' },
    problem: {
      ar: 'رقم متكرر، عنوان عام جدا، اسم غير مكتمل، أو قيمة COD عالية على عميل جديد قد يخرج للطريق قبل أن يراجعه أحد. كل رحلة غير لازمة تستهلك وقت مندوب وتضغط على التحصيل.',
      en: 'A repeated number, vague address, incomplete name, or high COD value for a new customer can leave for the route before anyone reviews it. Every unnecessary trip consumes courier time and pressures collection.',
    },
    solutionTitle: { ar: 'إشارات مراجعة لا توقف التشغيل كله', en: 'Review flags without stopping all operations' },
    solution: {
      ar: 'يعطي Trackora لكل طلب إشارات واضحة: رقم مكرر، عنوان ضعيف، COD مرتفع، أو نمط طلبات غير معتاد. يستطيع الفريق مراجعة الشحنة، الاتصال بالعميل، أو إيقافها قبل الإسناد.',
      en: 'Trackora gives each order clear flags: repeated number, weak address, high COD, or unusual order pattern. Teams can review the shipment, call the customer, or hold it before assignment.',
    },
    capabilitiesTitle: { ar: 'أنواع المخاطر', en: 'Risk types' },
    capabilities: [
      { ar: 'كشف أرقام هاتف مكررة عبر طلبات أو تجار مختلفين.', en: 'Detect repeated phone numbers across orders or merchants.' },
      { ar: 'إشارات لجودة العنوان عندما لا يكفي للتوصيل.', en: 'Address quality flags when location details are not enough for delivery.' },
      { ar: 'مخاطر COD عندما تكون القيمة عالية مقارنة بالنمط المعتاد.', en: 'COD risk when value is high compared with usual pattern.' },
      { ar: 'مراجعة تشغيلية قبل خروج الشحنة للديسباتش.', en: 'Operational review before shipment leaves to dispatch.' },
      { ar: 'حفظ نتيجة المراجعة حتى يعرف الفريق سبب السماح أو الإيقاف.', en: 'Review outcome saved so the team knows why it was allowed or held.' },
    ],
    workflowTitle: { ar: 'مسار المراجعة', en: 'Review flow' },
    workflow: [
      { title: { ar: 'استقبال الطلب', en: 'Receive order' }, text: { ar: 'يدخل الطلب من البوابة أو ملف الرفع المجمع.', en: 'Order arrives from portal or bulk upload.' } },
      { title: { ar: 'رفع الإشارة', en: 'Raise flag' }, text: { ar: 'يظهر سبب الخطر بجانب الشحنة قبل الإسناد.', en: 'Risk reason appears beside the shipment before assignment.' } },
      { title: { ar: 'مراجعة الفريق', en: 'Team review' }, text: { ar: 'يتحقق التشغيل من الرقم أو العنوان أو قيمة COD.', en: 'Operations checks phone, address, or COD value.' } },
      { title: { ar: 'سماح أو إيقاف', en: 'Allow or hold' }, text: { ar: 'تعود الشحنة للتوزيع أو تبقى موقوفة بسجل سبب واضح.', en: 'Shipment returns to dispatch or stays held with a clear reason.' } },
    ],
    signalsTitle: { ar: 'إشارات خطر', en: 'Risk flags' },
    signals: [
      { label: { ar: 'أرقام مكررة', en: 'Repeated phones' }, value: { ar: '12', en: '12' } },
      { label: { ar: 'عناوين ضعيفة', en: 'Weak addresses' }, value: { ar: '19', en: '19' } },
      { label: { ar: 'COD مرتفع', en: 'High COD' }, value: { ar: '8', en: '8' } },
      { label: { ar: 'موقوف قبل الطريق', en: 'Held before route' }, value: { ar: '23 شحنة', en: '23 shipments' } },
    ],
    artifact: {
      type: 'risk-queue',
      title: { ar: 'طابور مراجعة المخاطر', en: 'Risk review queue' },
      description: { ar: 'كل شحنة مشكوك فيها تظهر بإشارات الهاتف وCOD وجودة العنوان والتصرف المقترح.', en: 'Each suspicious shipment shows phone signal, COD risk, address quality, and recommended action.' },
      columns: [
        { ar: 'رقم التتبع', en: 'Tracking number' },
        { ar: 'إشارة الهاتف', en: 'Phone signal' },
        { ar: 'خطر COD', en: 'COD risk' },
        { ar: 'جودة العنوان', en: 'Address quality' },
        { ar: 'الإجراء المقترح', en: 'Recommended action' },
      ],
      rows: [
        [{ ar: 'TRK-6018', en: 'TRK-6018' }, { ar: 'ظهر في 4 طلبات فاشلة', en: 'Seen in 4 failed orders' }, { ar: '2,800 ج.م، مرتفع', en: 'EGP 2,800, high' }, { ar: 'عام جدا', en: 'Too vague' }, { ar: 'اتصل قبل الإسناد', en: 'Call before assignment' }],
        [{ ar: 'TRK-6042', en: 'TRK-6042' }, { ar: 'رقم جديد', en: 'New phone' }, { ar: '740 ج.م، طبيعي', en: 'EGP 740, normal' }, { ar: 'واضح', en: 'Clear' }, { ar: 'السماح للديسباتش', en: 'Allow dispatch' }],
        [{ ar: 'TRK-6081', en: 'TRK-6081' }, { ar: 'رقم مكرر مع تاجر آخر', en: 'Repeated with another merchant' }, { ar: '1,950 ج.م، متوسط', en: 'EGP 1,950, medium' }, { ar: 'ناقص علامة مميزة', en: 'Missing landmark' }, { ar: 'تعليق للمراجعة', en: 'Hold for review' }],
      ],
    },
    reviewTitle: { ar: 'ما يراجعه الفريق', en: 'What teams review' },
    review: [
      { ar: 'هل رقم العميل ظهر مع طلبات فاشلة سابقا؟', en: 'Did the customer number appear on previous failed orders?' },
      { ar: 'هل العنوان يكفي لتحديد المنطقة والمندوب؟', en: 'Is the address enough to identify zone and courier?' },
      { ar: 'هل مبلغ COD يحتاج تأكيد قبل الطريق؟', en: 'Does the COD amount need confirmation before routing?' },
    ],
    relatedKeys: ['bulk-upload', 'smart-dispatch', 'merchant-portal'],
    seoTitle: { ar: 'Fraud Detection لمراجعة مخاطر الطلبات وCOD', en: 'Fraud Detection for Order and COD Risk Review' },
    seoDescription: { ar: 'اكشف الطلبات الوهمية، الأرقام المتكررة، مخاطر COD، وجودة العنوان قبل إسناد الشحنات.', en: 'Flag fake orders, repeated phone numbers, COD risk, and address quality before shipment assignment.' },
  },
]

export const featureWorkflowPreview: FeatureWorkflowStep[] = [
  {
    title: { ar: 'يدخل الطلب', en: 'Order enters' },
    text: { ar: 'من بوابة التاجر أو الرفع المجمع مع بيانات العميل وCOD.', en: 'From merchant portal or bulk upload with customer and COD data.' },
  },
  {
    title: { ar: 'تظهر المخاطر', en: 'Risks appear' },
    text: { ar: 'الأرقام المكررة والعناوين الضعيفة تقف قبل الطريق.', en: 'Repeated phones and weak addresses stop before the route.' },
  },
  {
    title: { ar: 'يتم الإسناد', en: 'Dispatch assigns' },
    text: { ar: 'الشحنة تذهب لمندوب مناسب حسب المنطقة والسعة والتحصيل.', en: 'Shipment goes to the right courier by zone, capacity, and COD.' },
  },
  {
    title: { ar: 'تغلق الحالة', en: 'Status closes' },
    text: { ar: 'التسليم والتحصيل والتسوية تظهر في سجل واحد.', en: 'Delivery, collection, and settlement appear in one record.' },
  },
]

export const featureAudiences = [
  {
    title: { ar: 'شركات الشحن', en: 'Shipping companies' },
    text: { ar: 'سيطرة على الديسباتش، المناديب، التحصيل، والفشل اليومي بدون جداول متفرقة.', en: 'Control dispatch, couriers, COD, and daily failures without scattered spreadsheets.' },
    to: '/solutions/shipping-companies',
  },
  {
    title: { ar: 'المتاجر الإلكترونية', en: 'E-commerce stores' },
    text: { ar: 'رفع طلبات، متابعة حالات، ورؤية مستحقات COD من بوابة واحدة.', en: 'Upload orders, follow statuses, and view COD receivables from one portal.' },
    to: '/solutions/ecommerce-stores',
  },
  {
    title: { ar: 'السوشيال سيلرز', en: 'Social sellers' },
    text: { ar: 'تنظيم طلبات كثيرة وسريعة مع تتبع واضح للعميل ومراجعة للبيانات الناقصة.', en: 'Organize fast-moving orders with clear customer tracking and missing-data review.' },
    to: '/solutions/social-sellers',
  },
]

export function getFeatureDetail(key: string) {
  return featureDetails.find(feature => feature.key === key)
}

export function getLocalized(text: LocalizedText, locale: string) {
  return locale === 'ar' ? text.ar : text.en
}

export const features = featureDetails.map(feature => ({
  key: feature.key,
  icon: feature.accent,
  path: feature.path,
  titleAr: feature.title.ar,
  titleEn: feature.title.en,
  summaryAr: feature.summary.ar,
  summaryEn: feature.summary.en,
  relatedKeys: feature.relatedKeys,
}))
