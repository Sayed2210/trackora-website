export interface ContactFormField {
  key: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea'
  labelAr: string
  labelEn: string
  placeholderAr: string
  placeholderEn: string
  required: boolean
  options?: { value: string; labelAr: string; labelEn: string }[]
}

export const requestDemoFields: ContactFormField[] = [
  { key: 'name', type: 'text', labelAr: 'الاسم الكامل', labelEn: 'Full name', placeholderAr: 'أدخل اسمك الكامل', placeholderEn: 'Enter your full name', required: true },
  { key: 'company', type: 'text', labelAr: 'اسم الشركة', labelEn: 'Company name', placeholderAr: 'أدخل اسم شركتك', placeholderEn: 'Enter your company name', required: true },
  { key: 'email', type: 'email', labelAr: 'البريد الإلكتروني', labelEn: 'Email', placeholderAr: 'example@company.com', placeholderEn: 'example@company.com', required: true },
  { key: 'phone', type: 'tel', labelAr: 'رقم الهاتف', labelEn: 'Phone number', placeholderAr: '+966 5X XXX XXXX', placeholderEn: '+966 5X XXX XXXX', required: false },
  { key: 'businessType', type: 'select', labelAr: 'نوع النشاط', labelEn: 'Business type', placeholderAr: 'اختر نوع النشاط', placeholderEn: 'Select business type', required: true, options: [
    { value: 'shipping', labelAr: 'شركة شحن', labelEn: 'Shipping company' },
    { value: 'ecommerce', labelAr: 'متجر إلكتروني', labelEn: 'E-commerce store' },
    { value: 'social-seller', labelAr: 'بائع عبر التواصل', labelEn: 'Social seller' },
    { value: 'other', labelAr: 'أخرى', labelEn: 'Other' },
  ] },
  { key: 'shipments', type: 'select', labelAr: 'عدد الشحنات الشهري', labelEn: 'Monthly shipment volume', placeholderAr: 'اختر الحجم التقريبي', placeholderEn: 'Select approximate volume', required: false, options: [
    { value: '0-100', labelAr: 'أقل من ١٠٠', labelEn: 'Less than 100' },
    { value: '100-500', labelAr: '١٠٠ - ٥٠٠', labelEn: '100 - 500' },
    { value: '500-1000', labelAr: '٥٠٠ - ١٬٠٠٠', labelEn: '500 - 1,000' },
    { value: '1000+', labelAr: 'أكثر من ١٬٠٠٠', labelEn: 'More than 1,000' },
  ] },
  { key: 'message', type: 'textarea', labelAr: 'رسالة إضافية', labelEn: 'Additional message', placeholderAr: 'أخبرنا عن احتياجاتك...', placeholderEn: 'Tell us about your needs...', required: false },
]

export const contactFields: ContactFormField[] = [
  { key: 'name', type: 'text', labelAr: 'الاسم', labelEn: 'Name', placeholderAr: 'أدخل اسمك', placeholderEn: 'Enter your name', required: true },
  { key: 'email', type: 'email', labelAr: 'البريد الإلكتروني', labelEn: 'Email', placeholderAr: 'example@company.com', placeholderEn: 'example@company.com', required: true },
  { key: 'phone', type: 'tel', labelAr: 'رقم الهاتف', labelEn: 'Phone number', placeholderAr: '+966 5X XXX XXXX', placeholderEn: '+966 5X XXX XXXX', required: false },
  { key: 'subject', type: 'text', labelAr: 'الموضوع', labelEn: 'Subject', placeholderAr: 'موضوع رسالتك', placeholderEn: 'Subject of your message', required: true },
  { key: 'message', type: 'textarea', labelAr: 'الرسالة', labelEn: 'Message', placeholderAr: 'اكتب رسالتك هنا...', placeholderEn: 'Write your message here...', required: true },
]

export const pricingFaqItems = [
  { questionAr: 'ماذا يحدث عند تجاوز عدد الشحنات الشهري؟', answerAr: 'لا يتم إيقاف التتبع أو المناديب فجأة. نراجع حجم الشحنات والتحصيل ونقترح ترقية أو تسعيراً مخصصاً يناسب التشغيل.', questionEn: 'What happens if we pass the monthly shipment limit?', answerEn: 'Tracking and couriers are not suddenly stopped. We review shipment and collection volume, then suggest an upgrade or custom pricing that fits the operation.' },
  { questionAr: 'هل تشمل الخطط بوابة التاجر وتطبيق المندوب؟', answerAr: 'خطة البداية تشمل بوابة تاجر أساسية. خطة النمو تضيف تطبيق المندوب وSmart Dispatch، وخطة التوسع تدعم الفروع والإعدادات المخصصة.', questionEn: 'Do plans include merchant portal and courier app?', answerEn: 'Starter includes a basic merchant portal. Growth adds the courier app and Smart Dispatch. Scale supports branches and custom setup.' },
  { questionAr: 'كيف يتم التعامل مع تحصيل COD وتسوية المحافظ؟', answerAr: 'خطة النمو وما بعدها تشمل محفظة COD، متابعة التحصيل، وتقارير التسوية. في خطة التوسع يمكن تخصيص قواعد التسوية حسب الفروع أو المناطق.', questionEn: 'How do COD collection and wallet settlement work?', answerEn: 'Growth and above include COD wallet, collection follow-up, and settlement reports. Scale can customize settlement rules by branch or zone.' },
  { questionAr: 'هل يمكن لشركات الشحن الحصول على تسعير مخصص؟', answerAr: 'نعم. خطة التوسع مصممة لشركات الشحن والعمليات متعددة الفروع التي تحتاج سعة مخصصة، دعم إعداد، وتقارير متقدمة.', questionEn: 'Can shipping companies get custom pricing?', answerEn: 'Yes. Scale is designed for shipping companies and multi-branch operations that need custom capacity, setup support, and advanced reports.' },
  { questionAr: 'هل توجد رسوم إعداد أو دعم إضافية؟', answerAr: 'نوضح رسوم الإعداد والدعم قبل التعاقد حسب حجم الفريق، الفروع، وحاجة التدريب. لا نعتمد على بنود غامضة بعد بدء التشغيل.', questionEn: 'Are there extra setup or support fees?', answerEn: 'Setup and support fees are clarified before agreement based on team size, branches, and training needs. We avoid unclear fees after rollout starts.' },
]
