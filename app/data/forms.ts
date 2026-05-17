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
  { questionAr: 'هل يمكنني البدء مجاناً؟', answerAr: 'نعم، خطة المبتدئة مجانية بالكامل وتشمل حتى ١٠٠ شحنة شهرياً مع تتبّع شحنات وبوابة تاجر أساسية.', questionEn: 'Can I start for free?', answerEn: 'Yes, the Starter plan is completely free and includes up to 100 shipments per month with tracking and a basic merchant portal.' },
  { questionAr: 'كيف يتم احتساب سعر الخطة الاحترافية؟', answerAr: 'الخطة الاحترافية تعتمد على حجم الاستخدام — كلما شحنت أكثر، كلما كان السعر أنسب. تواصل معنا للحصول على عرض مخصص.', questionEn: 'How is the Professional plan priced?', answerEn: 'The Professional plan is usage-based — the more you ship, the better the value. Contact us for a customized quote.' },
  { questionAr: 'هل يمكنني الترقية أو التخفيض في أي وقت؟', answerAr: 'نعم، يمكنك تغيير خطتك في أي وقت بدون رسوم إضافية.', questionEn: 'Can I upgrade or downgrade at any time?', answerEn: 'Yes, you can change your plan at any time without additional fees.' },
  { questionAr: 'هل هناك رسوم مخفية؟', answerAr: 'لا. كل ما هو مذكور في الخطة هو ما تدفعه — لا رسوم مخفية أو مفاجآت.', questionEn: 'Are there hidden fees?', answerEn: 'No. What you see in the plan is what you pay — no hidden fees or surprises.' },
  { questionAr: 'هل تشمل الخطة المؤسسية دعماً مخصصاً؟', answerAr: 'نعم. الخطة المؤسسية تشمل مدير حساب مخصص، اتفاقية مستوى خدمة، وفريق مخصص لتنفيذ الحل حسب احتياجاتك.', questionEn: 'Does the Enterprise plan include dedicated support?', answerEn: 'Yes. The Enterprise plan includes a dedicated account manager, SLA agreement, and a team to implement the solution according to your needs.' },
]