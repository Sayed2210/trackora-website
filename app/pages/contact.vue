<template>
  <div class="contact-page" :dir="isArabic ? 'rtl' : 'ltr'">
    <section class="contact-hero" aria-labelledby="contact-heading">
      <AppContainer>
        <div class="contact-hero__grid">
          <div class="contact-hero__copy">
            <p class="contact-note">{{ copy.hero.note }}</p>
            <h1 id="contact-heading">{{ copy.hero.title }}</h1>
            <p class="contact-hero__lead">{{ copy.hero.lead }}</p>
            <div class="contact-hero__actions" :aria-label="copy.hero.actionsLabel">
              <NuxtLink class="contact-btn contact-btn--primary" :to="localePath('/request-demo')">
                {{ copy.hero.primaryCta }}
              </NuxtLink>
              <a class="contact-btn contact-btn--secondary" href="#contact-form" @click="focusForm">
                {{ copy.hero.secondaryCta }}
              </a>
            </div>
          </div>

          <aside class="routing-ledger" :aria-label="copy.hero.panelLabel">
            <div class="routing-ledger__top">
              <span>{{ copy.hero.panelTitle }}</span>
              <strong>{{ copy.hero.panelStatus }}</strong>
            </div>
            <ol class="routing-ledger__steps">
              <li v-for="step in copy.hero.steps" :key="step.title">
                <span aria-hidden="true">{{ step.marker }}</span>
                <div>
                  <strong>{{ step.title }}</strong>
                  <p>{{ step.text }}</p>
                </div>
              </li>
            </ol>
          </aside>
        </div>
      </AppContainer>
    </section>

    <section class="contact-options" aria-labelledby="options-heading">
      <AppContainer>
        <div class="section-heading section-heading--split">
          <div>
            <h2 id="options-heading">{{ copy.options.title }}</h2>
            <p>{{ copy.options.lead }}</p>
          </div>
          <span>{{ copy.options.signal }}</span>
        </div>
        <div class="option-board">
          <article v-for="option in copy.options.items" :key="option.title" class="option-card">
            <div class="option-card__marker" aria-hidden="true">{{ option.marker }}</div>
            <div>
              <h3>{{ option.title }}</h3>
              <p>{{ option.description }}</p>
            </div>
            <button type="button" @click="selectInquiry(option.value)">
              {{ option.cta }}
            </button>
          </article>
        </div>
      </AppContainer>
    </section>

    <section class="contact-form-section" aria-labelledby="form-heading">
      <AppContainer>
        <div class="form-shell">
          <aside class="contact-details" aria-labelledby="details-heading">
            <h2 id="details-heading">{{ copy.details.title }}</h2>
            <p>{{ copy.details.lead }}</p>
            <dl>
              <div v-for="item in copy.details.items" :key="item.label">
                <dt>{{ item.label }}</dt>
                <dd>
                  <a v-if="item.href" :href="item.href">{{ item.value }}</a>
                  <span v-else>{{ item.value }}</span>
                </dd>
              </div>
            </dl>
            <p class="details-note">{{ copy.details.note }}</p>
          </aside>

          <form id="contact-form" ref="formEl" class="contact-form" novalidate @submit.prevent="handleSubmit">
            <div class="contact-form__header">
              <h2 id="form-heading">{{ copy.form.title }}</h2>
              <p>{{ copy.form.requiredNote }}</p>
            </div>

            <div v-if="success" ref="successEl" class="form-alert form-alert--success" role="status" tabindex="-1">
              <strong>{{ copy.states.successTitle }}</strong>
              <span>{{ copy.states.successText }}</span>
              <button type="button" @click="resetForm">{{ copy.states.sendAnother }}</button>
            </div>

            <div v-if="submitError" class="form-alert form-alert--error" role="alert">
              <strong>{{ copy.states.errorTitle }}</strong>
              <span>{{ submitError }}</span>
            </div>

            <div v-if="!success" class="contact-form__body">
              <div class="field-grid">
                <div class="field">
                  <label for="contact-name">{{ copy.fields.name.label }} <span>{{ copy.form.required }}</span></label>
                  <input
                    id="contact-name"
                    v-model.trim="form.name"
                    name="name"
                    type="text"
                    autocomplete="name"
                    :placeholder="copy.fields.name.placeholder"
                    :aria-invalid="!!errors.name"
                    :aria-describedby="errors.name ? 'contact-name-error' : undefined"
                    :class="{ 'is-invalid': errors.name }"
                    @blur="validateField('name')"
                  />
                  <p v-if="errors.name" id="contact-name-error" class="field-error">{{ errors.name }}</p>
                </div>

                <div class="field">
                  <label for="contact-company">{{ copy.fields.company.label }} <small>{{ copy.form.optional }}</small></label>
                  <input
                    id="contact-company"
                    v-model.trim="form.company"
                    name="company"
                    type="text"
                    autocomplete="organization"
                    :placeholder="copy.fields.company.placeholder"
                  />
                </div>

                <div class="field">
                  <label for="contact-phone">{{ copy.fields.phone.label }} <span>{{ copy.form.required }}</span></label>
                  <input
                    id="contact-phone"
                    v-model.trim="form.phone"
                    name="phone"
                    type="tel"
                    autocomplete="tel"
                    inputmode="tel"
                    :placeholder="copy.fields.phone.placeholder"
                    :aria-invalid="!!errors.phone"
                    :aria-describedby="errors.phone ? 'contact-phone-error' : 'contact-phone-help'"
                    :class="{ 'is-invalid': errors.phone }"
                    @blur="validateField('phone')"
                  />
                  <p id="contact-phone-help" class="field-help">{{ copy.fields.phone.help }}</p>
                  <p v-if="errors.phone" id="contact-phone-error" class="field-error">{{ errors.phone }}</p>
                </div>

                <div class="field">
                  <label for="contact-email">{{ copy.fields.email.label }} <small>{{ copy.form.optional }}</small></label>
                  <input
                    id="contact-email"
                    v-model.trim="form.email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    :placeholder="copy.fields.email.placeholder"
                    :aria-invalid="!!errors.email"
                    :aria-describedby="errors.email ? 'contact-email-error' : undefined"
                    :class="{ 'is-invalid': errors.email }"
                    @blur="validateField('email')"
                  />
                  <p v-if="errors.email" id="contact-email-error" class="field-error">{{ errors.email }}</p>
                </div>
              </div>

              <div class="field">
                <label for="contact-inquiry">{{ copy.fields.inquiryType.label }} <span>{{ copy.form.required }}</span></label>
                <select
                  id="contact-inquiry"
                  v-model="form.inquiryType"
                  name="inquiryType"
                  :aria-invalid="!!errors.inquiryType"
                  :aria-describedby="errors.inquiryType ? 'contact-inquiry-error' : undefined"
                  :class="{ 'is-invalid': errors.inquiryType }"
                  @blur="validateField('inquiryType')"
                >
                  <option value="">{{ copy.fields.inquiryType.placeholder }}</option>
                  <option v-for="option in copy.inquiryTypes" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
                <p v-if="errors.inquiryType" id="contact-inquiry-error" class="field-error">{{ errors.inquiryType }}</p>
              </div>

              <div class="field">
                <label for="contact-message">{{ copy.fields.message.label }} <span>{{ copy.form.required }}</span></label>
                <textarea
                  id="contact-message"
                  v-model.trim="form.message"
                  name="message"
                  rows="6"
                  :placeholder="copy.fields.message.placeholder"
                  :aria-invalid="!!errors.message"
                  :aria-describedby="errors.message ? 'contact-message-error' : 'contact-message-help'"
                  :class="{ 'is-invalid': errors.message }"
                  @blur="validateField('message')"
                />
                <p id="contact-message-help" class="field-help">{{ copy.fields.message.help }}</p>
                <p v-if="errors.message" id="contact-message-error" class="field-error">{{ errors.message }}</p>
              </div>

              <div class="contact-form__footer">
                <button class="contact-btn contact-btn--submit" type="submit" :disabled="loading">
                  <span v-if="loading" class="spinner" aria-hidden="true"></span>
                  {{ loading ? copy.states.loading : copy.form.submit }}
                </button>
                <p>{{ copy.form.safeSubmit }}</p>
              </div>
            </div>
          </form>
        </div>
      </AppContainer>
    </section>

    <section class="reassurance-section" aria-labelledby="reassurance-heading">
      <AppContainer>
        <div class="reassurance-grid">
          <div class="section-heading">
            <h2 id="reassurance-heading">{{ copy.reassurance.title }}</h2>
            <p>{{ copy.reassurance.lead }}</p>
          </div>
          <ul class="reassurance-list">
            <li v-for="item in copy.reassurance.items" :key="item">
              <span aria-hidden="true"></span>
              {{ item }}
            </li>
          </ul>
        </div>
      </AppContainer>
    </section>

    <section class="faq-section" aria-labelledby="faq-heading">
      <AppContainer narrow>
        <div class="section-heading section-heading--center">
          <h2 id="faq-heading">{{ copy.faq.title }}</h2>
          <p>{{ copy.faq.lead }}</p>
        </div>
        <div class="faq-list">
          <details v-for="item in copy.faq.items" :key="item.question">
            <summary>{{ item.question }}</summary>
            <p>{{ item.answer }}</p>
          </details>
        </div>
      </AppContainer>
    </section>

    <section class="final-contact-cta" aria-labelledby="final-contact-heading">
      <AppContainer>
        <div class="final-contact-cta__inner">
          <div>
            <h2 id="final-contact-heading">{{ copy.finalCta.title }}</h2>
            <p>{{ copy.finalCta.lead }}</p>
          </div>
          <NuxtLink class="contact-btn contact-btn--primary" :to="localePath('/request-demo')">
            {{ copy.finalCta.cta }}
          </NuxtLink>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
type InquiryValue = 'sales' | 'support' | 'partnerships' | 'custom-pricing' | 'careers' | 'other'
type FormKey = 'name' | 'phone' | 'email' | 'inquiryType' | 'message'

const { locale } = useI18n()
const localePath = useLocalePath()
const { setSeo } = useLocaleSeo()

const isArabic = computed(() => locale.value === 'ar')
const formEl = ref<HTMLFormElement | null>(null)
const successEl = ref<HTMLElement | null>(null)
const loading = ref(false)
const success = ref(false)
const submitError = ref('')

const form = reactive({
  name: '',
  company: '',
  phone: '',
  email: '',
  inquiryType: '' as InquiryValue | '',
  message: '',
})

const errors = reactive<Record<FormKey, string>>({
  name: '',
  phone: '',
  email: '',
  inquiryType: '',
  message: '',
})

const pageCopy = {
  ar: {
    seoTitle: 'تواصل مع Trackora | إدارة الشحنات والتحصيل',
    seoDescription: 'تواصل مع فريق Trackora للمبيعات، الدعم، الشراكات، والتسعير المخصص لشركات الشحن والمتاجر وفرق المناديب.',
    hero: {
      note: 'مركز تواصل للتشغيل، التسعير، والدعم',
      title: 'تواصل مع فريق Trackora',
      lead: 'لو عندك شركة شحن، متجر إلكتروني، أو فريق مناديب وتحتاج تنظيم الشحنات والتحصيل، ابعتلنا وسنساعدك تختار المسار المناسب.',
      primaryCta: 'احجز عرضًا توضيحيًا',
      secondaryCta: 'اكتب لنا رسالة',
      actionsLabel: 'إجراءات التواصل الرئيسية',
      panelLabel: 'طريقة توجيه رسالة التواصل داخل Trackora',
      panelTitle: 'مسار الرسالة',
      panelStatus: 'توجيه حسب نوع الاستفسار',
      steps: [
        { marker: '1', title: 'تحديد الاحتياج', text: 'مبيعات، دعم، شراكات، أو تسعير مخصص.' },
        { marker: '2', title: 'مراجعة التشغيل', text: 'حجم الشحنات، المناديب، COD، وطريقة التوزيع.' },
        { marker: '3', title: 'اقتراح الخطوة التالية', text: 'عرض توضيحي، خطة جاهزة، أو محادثة تسعير.' },
      ],
    },
    options: {
      title: 'اختر الباب الأقرب لاحتياجك',
      lead: 'كل رسالة تصل كمدخل تشغيل واضح، حتى يعرف الفريق هل المطلوب سعر، مساعدة، شراكة، أو متابعة عامة.',
      signal: 'لا يوجد اتصال بخادم حاليا',
      items: [
        { marker: 'بيع', value: 'sales', title: 'المبيعات', description: 'للتسعير والعروض التوضيحية وربط Trackora بحجم الشحنات الحالي.', cta: 'اختيار المبيعات' },
        { marker: 'دعم', value: 'support', title: 'الدعم', description: 'للمساعدة في التشغيل أو الاستفسارات الخاصة بالديسباتش، التتبع، وCOD.', cta: 'اختيار الدعم' },
        { marker: 'ربط', value: 'partnerships', title: 'الشراكات', description: 'لشركات الشحن والتكاملات وفرص العمل المشتركة حول التوصيل والتحصيل.', cta: 'اختيار الشراكات' },
        { marker: 'عام', value: 'careers', title: 'الوظائف / التعاون', description: 'للتواصل العام أو فرص التعاون أو أي رسالة لا تدخل في مسار محدد.', cta: 'اختيار التعاون' },
      ],
    },
    details: {
      title: 'بيانات التواصل',
      lead: 'هذه بيانات مؤقتة قابلة للتخصيص لاحقا حسب قناة التواصل الرسمية.',
      note: 'يمكن تخصيص البيانات later عند اعتماد البريد، رقم الهاتف، أو قنوات الدعم الرسمية.',
      items: [
        { label: 'البريد الإلكتروني', value: 'hello@trackora.com', href: 'mailto:hello@trackora.com' },
        { label: 'ساعات العمل', value: 'من الأحد إلى الخميس' },
        { label: 'السوق المستهدف', value: 'مصر والمنطقة العربية' },
      ],
    },
    form: {
      title: 'اكتب الرسالة التي تساعدنا نفهم تشغيلك',
      requiredNote: 'الحقول المطلوبة موضحة بعلامة *، والنموذج يعمل كإرسال آمن تجريبي بدون ربط خلفي.',
      required: '*',
      optional: 'اختياري',
      submit: 'إرسال رسالة التواصل',
      safeSubmit: 'إرسال تجريبي فقط. لن يتم الاتصال بواجهة خلفية في هذه المرحلة.',
    },
    fields: {
      name: { label: 'الاسم', placeholder: 'مثال: أحمد حسن' },
      company: { label: 'اسم الشركة / المتجر', placeholder: 'مثال: شركة القاهرة للشحن' },
      phone: { label: 'رقم الهاتف', placeholder: '01012345678', help: 'استخدم رقم موبايل مصري مثل 01012345678 أو +201012345678.' },
      email: { label: 'البريد الإلكتروني', placeholder: 'name@company.com' },
      inquiryType: { label: 'نوع الاستفسار', placeholder: 'اختر نوع الاستفسار' },
      message: { label: 'الرسالة', placeholder: 'اكتب ملخصا عن الشحنات، المناديب، التحصيل، أو نوع المساعدة المطلوبة.', help: 'اذكر حجم الشحنات أو عدد المناديب إذا كان ذلك يساعد في توجيه الرسالة.' },
    },
    inquiryTypes: [
      { value: 'sales', label: 'مبيعات' },
      { value: 'support', label: 'دعم' },
      { value: 'partnerships', label: 'شراكات' },
      { value: 'custom-pricing', label: 'تسعير مخصص' },
      { value: 'other', label: 'أخرى' },
    ],
    validation: {
      name: 'اكتب اسمك حتى نعرف من سنخاطب.',
      phone: 'اكتب رقم موبايل مصري صحيح. مثال: 01012345678.',
      email: 'اكتب بريد إلكتروني صحيح أو اتركه فارغا.',
      inquiryType: 'اختر نوع الاستفسار.',
      message: 'اكتب رسالة قصيرة توضح المطلوب.',
      general: 'راجع الحقول الموضحة قبل إرسال الرسالة.',
      placeholderError: 'لم يكتمل الإرسال التجريبي. حاول مرة أخرى أو استخدم البريد الإلكتروني.',
    },
    states: {
      loading: 'جار تسجيل الرسالة...',
      successTitle: 'تم تسجيل الرسالة',
      successText: 'حفظنا بيانات التواصل محليا كتجربة آمنة، وسيكون الربط الفعلي ممكنا عند إضافة نقطة استقبال رسمية.',
      sendAnother: 'إرسال رسالة أخرى',
      errorTitle: 'لم تكتمل الرسالة',
    },
    reassurance: {
      title: 'نساعدك تبدأ من طريقة تشغيلك الحالية',
      lead: 'المحادثة ليست عرضا عاما. نربط الإجابة بحجم الشحنات، المناديب، COD، وطريقة التسوية التي يعمل بها الفريق اليوم.',
      items: [
        'نساعدك تفهم أنسب طريقة لتشغيل Trackora.',
        'نراجع حجم الشحنات والمناديب والتحصيل.',
        'نوضح لك هل تحتاج خطة جاهزة أو تسعير مخصص.',
        'نساعدك تبدأ بأقل تغيير ممكن في التشغيل الحالي.',
      ],
    },
    faq: {
      title: 'أسئلة قبل التواصل',
      lead: 'إجابات مختصرة عن الرد، التسعير، شركات الشحن، التجربة، والربط لاحقا.',
      items: [
        { question: 'متى سيرد فريق Trackora؟', answer: 'نراجع الرسائل خلال ساعات العمل من الأحد إلى الخميس، ونوجهها للفريق الأقرب حسب نوع الاستفسار.' },
        { question: 'هل يمكن التواصل بخصوص تسعير مخصص؟', answer: 'نعم. اختر تسعير مخصص أو المبيعات، واذكر حجم الشحنات والمناديب حتى تكون المحادثة أدق.' },
        { question: 'هل Trackora مناسب لشركات الشحن؟', answer: 'نعم. Trackora مصمم لإدارة الشحنات، الديسباتش، المناديب، التتبع، ومحفظة COD لشركات الشحن.' },
        { question: 'هل يمكن تجربة النظام قبل الاشتراك؟', answer: 'يمكن ترتيب عرض أو تشغيل أولي محدود حسب حجم العملية والبيانات المتاحة.' },
        { question: 'هل يمكن ربط Trackora مع موقعي أو متجري لاحقًا؟', answer: 'يمكن مناقشة التكامل لاحقا حسب النظام الحالي، نوع البيانات، وأولوية التشغيل.' },
      ],
    },
    finalCta: { title: 'جاهز تبدأ تنظيم الشحنات والتحصيل؟', lead: 'احجز عرضا توضيحيا مبنيا على حجم الشحنات، الديسباتش، المناديب، وطريقة تحصيل COD لديك.', cta: 'احجز عرضًا توضيحيًا' },
  },
  en: {
    seoTitle: 'Contact Trackora | Shipment and COD Management',
    seoDescription: 'Contact the Trackora team for sales, support, partnerships, and custom pricing for shipping companies, stores, and courier teams.',
    hero: {
      note: 'Contact hub for operations, pricing, and support',
      title: 'Contact the Trackora team',
      lead: 'If you run a shipping company, online store, or courier team and need better shipment and COD control, send us a message and we will help you choose the right path.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Write us a message',
      actionsLabel: 'Primary contact actions',
      panelLabel: 'How Trackora routes contact messages',
      panelTitle: 'Message route',
      panelStatus: 'Routed by inquiry type',
      steps: [
        { marker: '1', title: 'Define the need', text: 'Sales, support, partnerships, or custom pricing.' },
        { marker: '2', title: 'Review operations', text: 'Shipment volume, couriers, COD, and dispatch flow.' },
        { marker: '3', title: 'Suggest the next step', text: 'Demo, ready plan, or pricing conversation.' },
      ],
    },
    options: {
      title: 'Choose the closest path',
      lead: 'Each message starts as a clear operating request so the team knows whether it needs sales, help, partnership review, or general follow-up.',
      signal: 'No backend call yet',
      items: [
        { marker: 'Sale', value: 'sales', title: 'Sales', description: 'For pricing, demos, and matching Trackora to your current shipment volume.', cta: 'Choose sales' },
        { marker: 'Help', value: 'support', title: 'Support', description: 'For operational help or questions about dispatch, tracking, and COD workflows.', cta: 'Choose support' },
        { marker: 'Link', value: 'partnerships', title: 'Partnerships', description: 'For shipping companies, integrations, and shared delivery or collection opportunities.', cta: 'Choose partnerships' },
        { marker: 'Work', value: 'careers', title: 'Jobs / collaboration', description: 'For general contact, collaboration, or messages that do not fit a defined route.', cta: 'Choose collaboration' },
      ],
    },
    details: {
      title: 'Contact details',
      lead: 'These are temporary details that can be customized later when official support channels are approved.',
      note: 'The email, phone number, or support channels can be customized later.',
      items: [
        { label: 'Email', value: 'hello@trackora.com', href: 'mailto:hello@trackora.com' },
        { label: 'Working hours', value: 'Sunday to Thursday' },
        { label: 'Target market', value: 'Egypt and the Arab region' },
      ],
    },
    form: { title: 'Write the message that helps us understand your operation', requiredNote: 'Required fields are marked with *. This is a safe placeholder submit with no backend connection.', required: '*', optional: 'Optional', submit: 'Send contact message', safeSubmit: 'Placeholder submit only. No backend endpoint is called right now.' },
    fields: {
      name: { label: 'Name', placeholder: 'Example: Ahmed Hassan' },
      company: { label: 'Company / store name', placeholder: 'Example: Cairo Shipping Co.' },
      phone: { label: 'Phone number', placeholder: '01012345678', help: 'Use an Egyptian mobile number such as 01012345678 or +201012345678.' },
      email: { label: 'Email address', placeholder: 'name@company.com' },
      inquiryType: { label: 'Inquiry type', placeholder: 'Select inquiry type' },
      message: { label: 'Message', placeholder: 'Share a short summary about shipments, couriers, COD, or the help you need.', help: 'Mention shipment volume or courier count if that helps route the message.' },
    },
    inquiryTypes: [
      { value: 'sales', label: 'Sales' },
      { value: 'support', label: 'Support' },
      { value: 'partnerships', label: 'Partnerships' },
      { value: 'custom-pricing', label: 'Custom pricing' },
      { value: 'other', label: 'Other' },
    ],
    validation: { name: 'Enter your name so we know who to contact.', phone: 'Enter a valid Egyptian mobile number. Example: 01012345678.', email: 'Enter a valid email address or leave this field empty.', inquiryType: 'Select an inquiry type.', message: 'Write a short message describing what you need.', general: 'Review the highlighted fields before sending the message.', placeholderError: 'The placeholder submit did not complete. Try again or use the email address.' },
    states: { loading: 'Recording message...', successTitle: 'Message recorded', successText: 'We recorded the contact details locally as a safe placeholder. A real submission endpoint can be added later.', sendAnother: 'Send another message', errorTitle: 'Message was not completed' },
    reassurance: { title: 'We help you start from your current operation', lead: 'This is not a generic sales route. We connect the answer to shipment volume, couriers, COD, and the settlement process your team uses today.', items: ['We help you understand the best way to run Trackora.', 'We review shipment volume, couriers, and COD collection.', 'We explain whether you need a ready plan or custom pricing.', 'We help you start with the least possible change to current operations.'] },
    faq: {
      title: 'Questions before contacting us',
      lead: 'Short answers about replies, custom pricing, shipping companies, trials, and integrations.',
      items: [
        { question: 'When will the Trackora team reply?', answer: 'We review messages during Sunday to Thursday working hours and route them to the closest team by inquiry type.' },
        { question: 'Can I contact you about custom pricing?', answer: 'Yes. Choose custom pricing or sales, and include shipment volume and courier count for a more accurate conversation.' },
        { question: 'Is Trackora suitable for shipping companies?', answer: 'Yes. Trackora is built for shipment management, dispatch, couriers, tracking, and COD wallets for shipping companies.' },
        { question: 'Can we try the system before subscribing?', answer: 'A demo or limited first launch can be arranged based on operation size and available data.' },
        { question: 'Can Trackora connect with my website or store later?', answer: 'Integrations can be discussed later based on your current system, data needs, and operating priority.' },
      ],
    },
    finalCta: { title: 'Ready to organize shipments and COD?', lead: 'Book a demo based on shipment volume, dispatch, couriers, and your COD collection process.', cta: 'Book a demo' },
  },
} as const

const copy = computed(() => (isArabic.value ? pageCopy.ar : pageCopy.en))

watchEffect(() => {
  setSeo(copy.value.seoTitle, copy.value.seoDescription)
})

function isValidEgyptianPhone(value: string) {
  const normalized = value.replace(/[\s()-]/g, '')
  return /^(?:\+?20|0)?1[0125]\d{8}$/.test(normalized)
}

function isValidEmail(value: string) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function validateField(key: FormKey) {
  errors[key] = ''
  if (key === 'name' && !form.name) errors.name = copy.value.validation.name
  if (key === 'phone' && (!form.phone || !isValidEgyptianPhone(form.phone))) errors.phone = copy.value.validation.phone
  if (key === 'email' && !isValidEmail(form.email)) errors.email = copy.value.validation.email
  if (key === 'inquiryType' && !form.inquiryType) errors.inquiryType = copy.value.validation.inquiryType
  if (key === 'message' && form.message.length < 8) errors.message = copy.value.validation.message
  return !errors[key]
}

function validateForm() {
  const fields: FormKey[] = ['name', 'phone', 'email', 'inquiryType', 'message']
  return fields.reduce((isValid, field) => validateField(field) && isValid, true)
}

async function handleSubmit() {
  submitError.value = ''
  success.value = false

  if (!validateForm()) {
    submitError.value = copy.value.validation.general
    await nextTick()
    formEl.value?.querySelector<HTMLElement>('.is-invalid')?.focus()
    return
  }

  loading.value = true
  try {
    const payload = { ...form, locale: locale.value, submittedAt: new Date().toISOString() }
    if (import.meta.dev) console.info('Trackora contact placeholder payload:', payload)
    await new Promise((resolve) => window.setTimeout(resolve, 850))
    success.value = true
    await nextTick()
    successEl.value?.focus({ preventScroll: true })
    successEl.value?.scrollIntoView({ behavior: getScrollBehavior(), block: 'center' })
  } catch {
    submitError.value = copy.value.validation.placeholderError
  } finally {
    loading.value = false
  }
}

function resetForm() {
  form.name = ''
  form.company = ''
  form.phone = ''
  form.email = ''
  form.inquiryType = ''
  form.message = ''
  success.value = false
  submitError.value = ''
  ;(Object.keys(errors) as FormKey[]).forEach((key) => {
    errors[key] = ''
  })
}

async function selectInquiry(value: string) {
  form.inquiryType = value as InquiryValue
  errors.inquiryType = ''
  await focusForm()
}

async function focusForm(event?: Event) {
  event?.preventDefault()
  formEl.value?.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' })
  await nextTick()
  formEl.value?.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea')?.focus({ preventScroll: true })
}

function getScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'auto'
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}
</script>

<style scoped>
.contact-page {
  --contact-primary: #1a3b66;
  --contact-primary-light: #3b5998;
  --contact-accent: #ff6b6b;
  --contact-accent-dark: #9f2433;
  --contact-surface: #f5f5f5;
  --contact-text: #333333;
  --contact-ink: #0b1d33;
  --contact-muted: #586274;
  --contact-line: rgba(26, 59, 102, 0.14);
  --contact-shadow: 0 24px 80px rgba(26, 59, 102, 0.14);
  --contact-ease: cubic-bezier(0.22, 1, 0.36, 1);
  color: var(--contact-text);
  background:
    radial-gradient(circle at 7% 4%, rgba(255, 107, 107, 0.12), transparent 27rem),
    linear-gradient(180deg, #ffffff 0%, #f7f9fc 44%, #ffffff 100%);
  overflow: hidden;
}

.contact-hero {
  padding-block: clamp(5rem, 8vw, 8.5rem) clamp(4rem, 7vw, 6.5rem);
  color: #ffffff;
  background:
    radial-gradient(circle at 16% 18%, rgba(255, 107, 107, 0.2), transparent 18rem),
    radial-gradient(circle at 86% 12%, rgba(255, 255, 255, 0.12), transparent 21rem),
    linear-gradient(145deg, #0a1d34 0%, var(--contact-primary) 54%, var(--contact-primary-light) 100%);
}

.contact-hero__grid,
.form-shell,
.reassurance-grid,
.final-contact-cta__inner {
  display: grid;
  gap: clamp(2rem, 5vw, 5rem);
}

.contact-hero__grid {
  grid-template-columns: minmax(0, 0.95fr) minmax(24rem, 1.05fr);
  align-items: center;
}

.contact-hero__copy,
.section-heading,
.contact-form__header,
.contact-form__body,
.contact-details,
.reassurance-list,
.faq-list {
  display: grid;
  gap: 1rem;
}

.contact-note {
  width: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  padding: 0.42rem 0.88rem;
  color: rgba(255, 255, 255, 0.86);
  background: rgba(255, 255, 255, 0.08);
  font-size: 0.88rem;
  font-weight: 900;
}

.contact-hero h1 {
  max-width: 12ch;
  color: #ffffff;
  font-size: clamp(3rem, 7vw, 5.7rem);
  line-height: 1.06;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.contact-hero__lead {
  max-width: 62ch;
  color: rgba(255, 255, 255, 0.86);
  font-size: clamp(1.05rem, 1.5vw, 1.24rem);
  line-height: 1.9;
  text-wrap: pretty;
}

.contact-hero__actions,
.contact-form__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.9rem;
}

.contact-btn,
.option-card button,
.form-alert button {
  min-height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0.88rem 1.35rem;
  font-family: var(--font-heading);
  font-weight: 900;
  line-height: 1.3;
  text-align: center;
  cursor: pointer;
  transition: transform 220ms var(--contact-ease), box-shadow 220ms var(--contact-ease), background 220ms var(--contact-ease), border-color 220ms var(--contact-ease);
}

.contact-btn:focus-visible,
.option-card button:focus-visible,
.form-alert button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
summary:focus-visible {
  outline: 3px solid var(--contact-accent);
  outline-offset: 3px;
}

.contact-btn--primary,
.contact-btn--submit {
  color: #210f16;
  background: var(--contact-accent);
  box-shadow: 0 16px 36px rgba(255, 107, 107, 0.3);
}

.contact-btn--secondary {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.1);
}

.contact-btn:hover,
.option-card button:hover,
.form-alert button:hover {
  transform: translateY(-2px);
}

.contact-btn:disabled {
  cursor: wait;
  opacity: 0.72;
}

.routing-ledger {
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 2rem;
  overflow: hidden;
  background: rgba(7, 20, 36, 0.72);
  box-shadow: 0 32px 100px rgba(0, 0, 0, 0.28);
}

.routing-ledger__top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.15rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.76);
}

.routing-ledger__top strong {
  border-radius: 999px;
  padding: 0.28rem 0.75rem;
  color: #ffd8d8;
  background: rgba(255, 107, 107, 0.18);
}

.routing-ledger__steps {
  display: grid;
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.routing-ledger__steps li {
  display: grid;
  grid-template-columns: 2.8rem 1fr;
  gap: 1rem;
  padding: clamp(1rem, 2vw, 1.35rem);
  background: rgba(255, 255, 255, 0.07);
}

.routing-ledger__steps li > span {
  display: grid;
  place-items: center;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
  color: #210f16;
  background: var(--contact-accent);
  font-weight: 900;
}

.routing-ledger strong,
.routing-ledger p {
  color: #ffffff;
}

.routing-ledger p {
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.75;
}

.contact-options,
.contact-form-section,
.reassurance-section,
.faq-section {
  padding-block: clamp(4.5rem, 8vw, 8rem);
}

.section-heading {
  max-width: 62rem;
  margin-bottom: clamp(2rem, 4vw, 3.5rem);
}

.section-heading--split {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
}

.section-heading--center {
  margin-inline: auto;
  text-align: center;
  justify-items: center;
}

.section-heading h2,
.contact-form h2,
.contact-details h2,
.final-contact-cta h2 {
  color: var(--contact-ink);
  font-size: clamp(2.1rem, 4.6vw, 4rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.section-heading p,
.contact-form p,
.contact-details p,
.final-contact-cta p,
.option-card p,
.faq-list p {
  color: var(--contact-muted);
  line-height: 1.85;
  text-wrap: pretty;
}

.section-heading--split > span {
  border-radius: 999px;
  padding: 0.48rem 0.9rem;
  color: var(--contact-primary);
  background: rgba(26, 59, 102, 0.06);
  font-weight: 900;
}

.option-board {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 1rem;
}

.option-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: 1.7rem;
  padding: clamp(1.1rem, 2.3vw, 1.6rem);
  background: #ffffff;
  box-shadow: 0 14px 42px rgba(26, 59, 102, 0.07);
  transition: transform 220ms var(--contact-ease), box-shadow 220ms var(--contact-ease);
}

.option-card:nth-child(2) {
  margin-block-start: 1.5rem;
}

.option-card:nth-child(3) {
  margin-block-start: -1.5rem;
}

.option-card__marker {
  display: grid;
  place-items: center;
  min-width: 3.3rem;
  height: 3.3rem;
  border-radius: 1rem;
  color: var(--contact-primary);
  background: rgba(26, 59, 102, 0.07);
  font-weight: 900;
}

.option-card h3 {
  color: var(--contact-ink);
  font-size: clamp(1.25rem, 2vw, 1.55rem);
}

.option-card button {
  grid-column: 2;
  width: fit-content;
  color: var(--contact-primary);
  border-color: rgba(26, 59, 102, 0.18);
  background: #ffffff;
}

.contact-form-section {
  background: var(--contact-surface);
}

.form-shell {
  grid-template-columns: minmax(18rem, 0.72fr) minmax(0, 1.28fr);
  align-items: start;
}

.contact-details,
.contact-form {
  border: 1px solid var(--contact-line);
  border-radius: 2rem;
  background: #ffffff;
  box-shadow: var(--contact-shadow);
}

.contact-details {
  position: sticky;
  top: 6rem;
  padding: clamp(1.3rem, 3vw, 2rem);
}

.contact-details dl {
  display: grid;
  gap: 0.85rem;
  margin-block-start: 0.5rem;
}

.contact-details dl div {
  padding: 1rem;
  border: 1px solid rgba(26, 59, 102, 0.1);
  border-radius: 1.2rem;
  background: rgba(26, 59, 102, 0.04);
}

.contact-details dt {
  color: var(--contact-muted);
  font-weight: 800;
}

.contact-details dd,
.contact-details a {
  color: var(--contact-ink);
  font-weight: 900;
}

.details-note {
  border-radius: 1.2rem;
  padding: 1rem;
  background: rgba(255, 107, 107, 0.1);
  color: #742034 !important;
  font-weight: 800;
}

.contact-form {
  display: grid;
  gap: 1.5rem;
  padding: clamp(1.25rem, 4vw, 2.5rem);
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.field {
  display: grid;
  gap: 0.45rem;
}

label {
  color: var(--contact-ink);
  font-weight: 900;
}

label span,
label small {
  color: var(--contact-accent-dark);
  font-weight: 900;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid rgba(26, 59, 102, 0.18);
  border-radius: 1rem;
  padding: 0.9rem 1rem;
  color: var(--contact-text);
  background: #ffffff;
  font: inherit;
  transition: border-color 180ms var(--contact-ease), box-shadow 180ms var(--contact-ease);
}

textarea {
  resize: vertical;
  min-height: 10rem;
}

input::placeholder,
textarea::placeholder {
  color: #5c6572;
  opacity: 1;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--contact-primary);
  box-shadow: 0 0 0 4px rgba(26, 59, 102, 0.1);
}

.is-invalid {
  border-color: #dc2626;
  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.08);
}

.field-help,
.field-error {
  font-size: 0.92rem;
  line-height: 1.6;
}

.field-error {
  color: #b4232f !important;
  font-weight: 800;
}

.form-alert {
  display: grid;
  gap: 0.6rem;
  border-radius: 1.25rem;
  padding: 1rem;
}

.form-alert--success {
  border: 1px solid rgba(34, 197, 94, 0.22);
  background: rgba(34, 197, 94, 0.09);
}

.form-alert--error {
  border: 1px solid rgba(239, 68, 68, 0.22);
  background: rgba(239, 68, 68, 0.08);
}

.form-alert strong {
  color: var(--contact-ink);
}

.form-alert button {
  width: fit-content;
  color: var(--contact-primary);
  border-color: rgba(26, 59, 102, 0.18);
  background: #ffffff;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(33, 15, 22, 0.28);
  border-top-color: #210f16;
  border-radius: 50%;
  animation: spin 800ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(1turn); }
}

.reassurance-grid {
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  align-items: start;
}

.reassurance-list li {
  display: grid;
  grid-template-columns: 1rem 1fr;
  gap: 0.8rem;
  align-items: start;
  padding: 1rem;
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: 1.2rem;
  color: var(--contact-muted);
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(26, 59, 102, 0.06);
  font-weight: 800;
}

.reassurance-list li span {
  width: 0.55rem;
  height: 0.55rem;
  margin-block-start: 0.62rem;
  border-radius: 50%;
  background: var(--contact-accent);
  box-shadow: 0 0 0 5px rgba(255, 107, 107, 0.14);
}

.faq-section {
  background: linear-gradient(180deg, #ffffff, var(--contact-surface));
}

details {
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: 1.25rem;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(26, 59, 102, 0.06);
}

summary {
  min-height: 3.2rem;
  cursor: pointer;
  padding: 1rem 1.2rem;
  color: var(--contact-ink);
  font-weight: 900;
}

details p {
  max-width: 74ch;
  padding: 0 1.2rem 1.2rem;
}

.final-contact-cta {
  padding-block: clamp(3rem, 6vw, 5.5rem);
}

.final-contact-cta__inner {
  grid-template-columns: 1fr auto;
  align-items: center;
  border-radius: 2rem;
  padding: clamp(1.5rem, 4vw, 3.25rem);
  color: #ffffff;
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 107, 107, 0.22), transparent 18rem),
    linear-gradient(145deg, #0b1d33, var(--contact-primary));
  box-shadow: var(--contact-shadow);
}

.final-contact-cta h2,
.final-contact-cta p {
  color: #ffffff;
}

.final-contact-cta p {
  color: rgba(255, 255, 255, 0.82);
}

@media (hover: hover) {
  .option-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 22px 58px rgba(26, 59, 102, 0.13);
  }
}

@media (max-width: 68rem) {
  .contact-hero__grid,
  .form-shell,
  .reassurance-grid,
  .final-contact-cta__inner,
  .section-heading--split {
    grid-template-columns: 1fr;
  }

  .contact-details {
    position: static;
  }
}

@media (max-width: 50rem) {
  .contact-hero h1 {
    max-width: 100%;
    font-size: clamp(2.45rem, 13vw, 3.8rem);
  }

  .option-board,
  .field-grid {
    grid-template-columns: 1fr;
  }

  .option-card,
  .routing-ledger__steps li {
    grid-template-columns: 1fr;
  }

  .option-card:nth-child(2),
  .option-card:nth-child(3) {
    margin-block-start: 0;
  }

  .option-card button,
  .contact-hero__actions .contact-btn,
  .contact-form__footer .contact-btn,
  .final-contact-cta .contact-btn {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-btn,
  .option-card,
  .option-card button,
  .form-alert button,
  input,
  select,
  textarea {
    transition-duration: 0.01ms;
  }

  .spinner {
    animation-duration: 1ms;
  }
}
</style>
