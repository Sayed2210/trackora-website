<template>
  <div class="contact-page" :dir="isArabic ? 'rtl' : 'ltr'">
    <section class="contact-hero" aria-labelledby="contact-heading">
      <AppContainer>
        <div class="contact-hero__grid">
          <div class="contact-hero__copy">
            <p class="contact-note">{{ copy.hero.note }}</p>
            <h1 id="contact-heading">{{ copy.hero.title }}</h1>
            <p class="contact-hero__lead">{{ copy.hero.lead }}</p>
            <div
              class="contact-hero__actions"
              :aria-label="copy.hero.actionsLabel"
            >
              <a
                class="contact-btn contact-btn--primary"
                href="#contact-form"
                @click="focusForm"
              >
                {{ copy.hero.primaryCta }}
              </a>
              <NuxtLink
                class="contact-btn contact-btn--secondary"
                :to="localePath('/request-demo')"
              >
                {{ copy.hero.secondaryCta }}
              </NuxtLink>
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

    <section class="contact-form-section" aria-labelledby="form-heading">
      <AppContainer>
        <div class="form-shell">
          <form
            id="contact-form"
            ref="formEl"
            class="contact-form"
            :class="{ 'contact-form--success': success }"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <div class="contact-form__header">
              <h2 id="form-heading">{{ copy.form.title }}</h2>
              <p>{{ copy.form.requiredNote }}</p>
            </div>

            <div
              v-if="success"
              ref="successEl"
              class="form-alert form-alert--success"
              role="status"
              tabindex="-1"
            >
              <strong>{{ copy.states.successTitle }}</strong>
              <span>{{ copy.states.successText }}</span>
              <ol class="success-steps">
                <li v-for="step in copy.states.successSteps" :key="step">
                  {{ step }}
                </li>
              </ol>
              <button type="button" @click="resetForm">
                {{ copy.states.sendAnother }}
              </button>
            </div>

            <div
              v-if="submitError"
              class="form-alert form-alert--error"
              role="alert"
            >
              <strong>{{ copy.states.errorTitle }}</strong>
              <span>{{ submitError }}</span>
              <a class="form-alert__link" :href="mailtoHref">
                {{ copy.states.emailFallbackCta }}
              </a>
            </div>

            <div v-if="!success" class="contact-form__body">
              <div class="field-grid">
                <div class="field">
                  <label for="contact-name"
                    >{{ copy.fields.name.label }}
                    <span>{{ copy.form.required }}</span></label
                  >
                  <input
                    id="contact-name"
                    v-model.trim="form.name"
                    name="name"
                    type="text"
                    autocomplete="name"
                    maxlength="120"
                    :placeholder="copy.fields.name.placeholder"
                    :aria-invalid="!!errors.name"
                    :aria-describedby="
                      errors.name ? 'contact-name-error' : undefined
                    "
                    :class="{ 'is-invalid': errors.name }"
                    @blur="validateField('name')"
                  />
                  <p
                    v-if="errors.name"
                    id="contact-name-error"
                    class="field-error"
                  >
                    {{ errors.name }}
                  </p>
                </div>

                <div class="field">
                  <label for="contact-company"
                    >{{ copy.fields.company.label }}
                    <small>{{ copy.form.optional }}</small></label
                  >
                  <input
                    id="contact-company"
                    v-model.trim="form.company"
                    name="company"
                    type="text"
                    autocomplete="organization"
                    maxlength="160"
                    :placeholder="copy.fields.company.placeholder"
                  />
                </div>

                <div class="field">
                  <label for="contact-phone"
                    >{{ copy.fields.phone.label }}
                    <span>{{ copy.form.required }}</span></label
                  >
                  <input
                    id="contact-phone"
                    v-model.trim="form.phone"
                    name="phone"
                    type="tel"
                    autocomplete="tel"
                    inputmode="tel"
                    maxlength="40"
                    :placeholder="copy.fields.phone.placeholder"
                    :aria-invalid="!!errors.phone"
                    :aria-describedby="
                      errors.phone
                        ? 'contact-phone-error'
                        : 'contact-phone-help'
                    "
                    :class="{ 'is-invalid': errors.phone }"
                    @blur="validateField('phone')"
                  />
                  <p id="contact-phone-help" class="field-help">
                    {{ copy.fields.phone.help }}
                  </p>
                  <p
                    v-if="errors.phone"
                    id="contact-phone-error"
                    class="field-error"
                  >
                    {{ errors.phone }}
                  </p>
                </div>

                <div class="field">
                  <label for="contact-email"
                    >{{ copy.fields.email.label }}
                    <small>{{ copy.form.optional }}</small></label
                  >
                  <input
                    id="contact-email"
                    v-model.trim="form.email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    maxlength="160"
                    :placeholder="copy.fields.email.placeholder"
                    :aria-invalid="!!errors.email"
                    :aria-describedby="
                      errors.email ? 'contact-email-error' : undefined
                    "
                    :class="{ 'is-invalid': errors.email }"
                    @blur="validateField('email')"
                  />
                  <p
                    v-if="errors.email"
                    id="contact-email-error"
                    class="field-error"
                  >
                    {{ errors.email }}
                  </p>
                </div>
              </div>

              <div class="field">
                <label for="contact-inquiry"
                  >{{ copy.fields.inquiryType.label }}
                  <span>{{ copy.form.required }}</span></label
                >
                <select
                  id="contact-inquiry"
                  v-model="form.inquiryType"
                  name="inquiryType"
                  :aria-invalid="!!errors.inquiryType"
                  :aria-describedby="
                    errors.inquiryType ? 'contact-inquiry-error' : undefined
                  "
                  :class="{ 'is-invalid': errors.inquiryType }"
                  @blur="validateField('inquiryType')"
                >
                  <option value="">
                    {{ copy.fields.inquiryType.placeholder }}
                  </option>
                  <option
                    v-for="option in copy.inquiryTypes"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
                <p
                  v-if="errors.inquiryType"
                  id="contact-inquiry-error"
                  class="field-error"
                >
                  {{ errors.inquiryType }}
                </p>
              </div>

              <div class="field">
                <label for="contact-message"
                  >{{ copy.fields.message.label }}
                  <span>{{ copy.form.required }}</span></label
                >
                <textarea
                  id="contact-message"
                  v-model.trim="form.message"
                  name="message"
                  rows="6"
                  maxlength="2000"
                  :placeholder="copy.fields.message.placeholder"
                  :aria-invalid="!!errors.message"
                  :aria-describedby="
                    errors.message
                      ? 'contact-message-error'
                      : 'contact-message-help'
                  "
                  :class="{ 'is-invalid': errors.message }"
                  @blur="validateField('message')"
                />
                <p id="contact-message-help" class="field-help">
                  {{ copy.fields.message.help }}
                </p>
                <p
                  v-if="errors.message"
                  id="contact-message-error"
                  class="field-error"
                >
                  {{ errors.message }}
                </p>
              </div>

              <div class="field field--trap" aria-hidden="true">
                <label for="contact-website">Website</label>
                <input
                  id="contact-website"
                  v-model="form.website"
                  name="website"
                  type="text"
                  tabindex="-1"
                  autocomplete="off"
                />
              </div>

              <div class="contact-form__footer">
                <button
                  class="contact-btn contact-btn--submit"
                  type="submit"
                  :disabled="loading"
                >
                  <span
                    v-if="loading"
                    class="spinner"
                    aria-hidden="true"
                  ></span>
                  {{ loading ? copy.states.loading : copy.form.submit }}
                </button>
                <p>{{ copy.form.submitNote }}</p>
              </div>
            </div>
          </form>

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
        <div class="routing-strip" :aria-label="copy.options.routesLabel">
          <article v-for="lane in copy.options.lanes" :key="lane.title">
            <span aria-hidden="true">{{ lane.marker }}</span>
            <div>
              <h3>{{ lane.title }}</h3>
              <p>{{ lane.description }}</p>
            </div>
          </article>
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
          <NuxtLink
            class="contact-btn contact-btn--primary"
            :to="localePath('/request-demo')"
          >
            {{ copy.finalCta.cta }}
          </NuxtLink>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
type InquiryValue =
  | "sales"
  | "support"
  | "partnerships"
  | "custom-pricing"
  | "integrations"
  | "general";
type FormKey = "name" | "phone" | "email" | "inquiryType" | "message";

const { locale } = useI18n();
const localePath = useLocalePath();
const { setSeo } = useLocaleSeo();

const isArabic = computed(() => locale.value === "ar");
const formEl = ref<HTMLFormElement | null>(null);
const successEl = ref<HTMLElement | null>(null);
const loading = ref(false);
const success = ref(false);
const submitError = ref("");

const form = reactive({
  name: "",
  company: "",
  phone: "",
  email: "",
  inquiryType: "" as InquiryValue | "",
  message: "",
  website: "",
});

const errors = reactive<Record<FormKey, string>>({
  name: "",
  phone: "",
  email: "",
  inquiryType: "",
  message: "",
});

const pageCopy = {
  ar: {
    seoTitle: "تواصل مع Trackora | إدارة الشحنات والتحصيل",
    seoDescription:
      "تواصل مع فريق Trackora للمبيعات، الدعم، الشراكات، والتسعير المخصص لشركات الشحن والمتاجر وفرق المناديب.",
    hero: {
      note: "مركز تواصل للتشغيل، التسعير، والدعم",
      title: "تواصل مع فريق Trackora",
      lead: "لو عندك شركة شحن، متجر إلكتروني، أو فريق مناديب وتحتاج تنظيم الشحنات والتحصيل، ابعتلنا وسنساعدك تختار المسار المناسب.",
      primaryCta: "اكتب لنا رسالة",
      secondaryCta: "احجز عرضًا توضيحيًا",
      actionsLabel: "إجراءات التواصل الرئيسية",
      panelLabel: "طريقة توجيه رسالة التواصل داخل Trackora",
      panelTitle: "مسار الرسالة",
      panelStatus: "توجيه حسب نوع الاستفسار",
      steps: [
        {
          marker: "1",
          title: "تحديد الاحتياج",
          text: "مبيعات، دعم، شراكات، أو تسعير مخصص.",
        },
        {
          marker: "2",
          title: "مراجعة التشغيل",
          text: "حجم الشحنات، المناديب، COD، وطريقة التوزيع.",
        },
        {
          marker: "3",
          title: "اقتراح الخطوة التالية",
          text: "عرض توضيحي، خطة جاهزة، أو محادثة تسعير.",
        },
      ],
    },
    options: {
      title: "كيف نوجه الرسالة بعد الإرسال",
      lead: "نوع الاستفسار داخل النموذج يكفي لتوجيه الرسالة للفريق الأقرب دون خطوة إضافية.",
      signal: "اختيار واحد فقط",
      routesLabel: "مسارات توجيه رسائل التواصل",
      lanes: [
        {
          marker: "سعر",
          title: "المبيعات والتسعير",
          description:
            "للعروض التوضيحية، التسعير المخصص، وربط Trackora بحجم الشحنات الحالي.",
        },
        {
          marker: "دعم",
          title: "الدعم التشغيلي",
          description:
            "للمساعدة في التشغيل أو الاستفسارات الخاصة بالديسباتش، التتبع، وCOD.",
        },
        {
          marker: "ربط",
          title: "الشراكات والتكاملات",
          description:
            "لشركات الشحن، مصادر البيانات، وفرص العمل المشتركة حول التوصيل والتحصيل.",
        },
      ],
    },
    details: {
      title: "بيانات التواصل",
      lead: "قناة تواصل رسمية لفِرق التشغيل، المبيعات، الدعم، الشراكات، والتكاملات في Trackora.",
      note: "للاستفسارات العاجلة، احجز عرضا توضيحيا حتى نراجع التشغيل معك مباشرة.",
      items: [
        {
          label: "البريد الإلكتروني",
          value: "hello@trackora.com",
          href: "mailto:hello@trackora.com",
        },
        { label: "أيام العمل", value: "الأحد إلى الخميس" },
        { label: "السوق", value: "مصر والمنطقة العربية" },
        {
          label: "نوع المساعدة",
          value: "المبيعات، الدعم، الشراكات، التكاملات",
        },
      ],
    },
    form: {
      title: "اكتب الرسالة التي تساعدنا نفهم تشغيلك",
      requiredNote:
        "الحقول المطلوبة موضحة بعلامة * حتى نوجه رسالتك للفريق المناسب.",
      required: "*",
      optional: "اختياري",
      submit: "إرسال رسالة التواصل",
      submitNote:
        "سنستخدم هذه البيانات للرد على استفسارك فقط. إذا لم يكتمل الإرسال، يمكنك إرسال نفس التفاصيل عبر البريد.",
    },
    fields: {
      name: { label: "الاسم", placeholder: "مثال: أحمد حسن" },
      company: {
        label: "اسم الشركة / المتجر",
        placeholder: "مثال: شركة القاهرة للشحن",
      },
      phone: {
        label: "رقم الهاتف",
        placeholder: "01012345678 أو +201012345678",
        help: "نقبل الأرقام المصرية المحلية أو الأرقام الدولية بصيغة + مع 8 إلى 15 رقما.",
      },
      email: { label: "البريد الإلكتروني", placeholder: "name@company.com" },
      inquiryType: {
        label: "نوع الاستفسار",
        placeholder: "اختر نوع الاستفسار",
      },
      message: {
        label: "الرسالة",
        placeholder:
          "اكتب ملخصا عن الشحنات، المناديب، التحصيل، أو نوع المساعدة المطلوبة.",
        help: "اذكر حجم الشحنات أو عدد المناديب إذا كان ذلك يساعد في توجيه الرسالة.",
      },
    },
    inquiryTypes: [
      { value: "sales", label: "مبيعات" },
      { value: "support", label: "دعم" },
      { value: "partnerships", label: "شراكات" },
      { value: "custom-pricing", label: "تسعير مخصص" },
      { value: "integrations", label: "التكاملات" },
      { value: "general", label: "عام" },
    ],
    validation: {
      name: "اكتب اسمك حتى نعرف من سنخاطب.",
      phone: "اكتب رقم هاتف صحيحا. مثال: 01012345678 أو +201012345678.",
      email: "اكتب بريد إلكتروني صحيح أو اتركه فارغا.",
      inquiryType: "اختر نوع الاستفسار.",
      message: "اكتب رسالة قصيرة توضح المطلوب.",
      general: "راجع الحقول الموضحة قبل إرسال الرسالة.",
      submitError:
        "لم تكتمل الرسالة الآن. حاول مرة أخرى أو راسلنا عبر hello@trackora.com.",
    },
    states: {
      loading: "جار إرسال الرسالة...",
      successTitle: "استلمنا رسالتك",
      successText:
        "تم تسليم الرسالة لقناة Trackora الرسمية، وسيراجعها الفريق المناسب خلال أيام العمل.",
      successSteps: [
        "تم استلام رسالتك.",
        "نراجع نوع الاستفسار.",
        "يتواصل معك الفريق المناسب.",
        "نرشح لك المسار الأنسب: دعم، مبيعات، تسعير، أو تكاملات.",
      ],
      sendAnother: "إرسال رسالة أخرى",
      errorTitle: "لم تكتمل الرسالة",
      deliveryNotConfigured:
        "إرسال النموذج غير مفعّل الآن. استخدم رابط البريد أدناه لإرسال نفس التفاصيل إلى hello@trackora.com.",
      deliveryFailed:
        "لم نستطع تسليم الرسالة الآن. لم نفقد بياناتك، ويمكنك المحاولة مرة أخرى أو إرسالها عبر البريد.",
      validationFailed: "راجع الحقول الموضحة قبل إرسال الرسالة.",
      emailFallbackCta: "إرسال التفاصيل عبر البريد",
    },
    reassurance: {
      title: "نساعدك تبدأ من طريقة تشغيلك الحالية",
      lead: "المحادثة ليست عرضا عاما. نربط الإجابة بحجم الشحنات، المناديب، COD، وطريقة التسوية التي يعمل بها الفريق اليوم.",
      items: [
        "نساعدك تفهم أنسب طريقة لتشغيل Trackora.",
        "نراجع حجم الشحنات والمناديب والتحصيل.",
        "نوضح لك هل تحتاج خطة جاهزة أو تسعير مخصص.",
        "نساعدك تبدأ بأقل تغيير ممكن في التشغيل الحالي.",
      ],
    },
    faq: {
      title: "أسئلة قبل التواصل",
      lead: "إجابات مختصرة عن الرد، التسعير، شركات الشحن، التجربة، والربط لاحقا.",
      items: [
        {
          question: "متى سيرد فريق Trackora؟",
          answer:
            "نراجع الرسائل خلال ساعات العمل من الأحد إلى الخميس، ونوجهها للفريق الأقرب حسب نوع الاستفسار.",
        },
        {
          question: "هل يمكن التواصل بخصوص تسعير مخصص؟",
          answer:
            "نعم. اختر تسعير مخصص أو المبيعات، واذكر حجم الشحنات والمناديب حتى تكون المحادثة أدق.",
        },
        {
          question: "هل Trackora مناسب لشركات الشحن؟",
          answer:
            "نعم. Trackora مصمم لإدارة الشحنات، الديسباتش، المناديب، التتبع، ومحفظة COD لشركات الشحن.",
        },
        {
          question: "هل يمكن تجربة النظام قبل الاشتراك؟",
          answer:
            "يمكن ترتيب عرض أو تشغيل أولي محدود حسب حجم العملية والبيانات المتاحة.",
        },
        {
          question: "هل يمكن ربط Trackora مع موقعي أو متجري؟",
          answer:
            "يمكن مناقشة التكامل حسب النظام الحالي، نوع البيانات، وأولوية التشغيل.",
        },
      ],
    },
    finalCta: {
      title: "جاهز تبدأ تنظيم الشحنات والتحصيل؟",
      lead: "احجز عرضا توضيحيا مبنيا على حجم الشحنات، الديسباتش، المناديب، وطريقة تحصيل COD لديك.",
      cta: "احجز عرضًا توضيحيًا",
    },
  },
  en: {
    seoTitle: "Contact Trackora | Shipment and COD Management",
    seoDescription:
      "Contact the Trackora team for sales, support, partnerships, and custom pricing for shipping companies, stores, and courier teams.",
    hero: {
      note: "Contact hub for operations, pricing, and support",
      title: "Contact the Trackora team",
      lead: "If you run a shipping company, online store, or courier team and need better shipment and COD control, send us a message and we will help you choose the right path.",
      primaryCta: "Write us a message",
      secondaryCta: "Book a demo",
      actionsLabel: "Primary contact actions",
      panelLabel: "How Trackora routes contact messages",
      panelTitle: "Message route",
      panelStatus: "Routed by inquiry type",
      steps: [
        {
          marker: "1",
          title: "Define the need",
          text: "Sales, support, partnerships, or custom pricing.",
        },
        {
          marker: "2",
          title: "Review operations",
          text: "Shipment volume, couriers, COD, and dispatch flow.",
        },
        {
          marker: "3",
          title: "Suggest the next step",
          text: "Demo, ready plan, or pricing conversation.",
        },
      ],
    },
    options: {
      title: "How we route the message after submission",
      lead: "The inquiry type inside the form is enough to route the message without an extra step.",
      signal: "One choice only",
      routesLabel: "Contact message routing paths",
      lanes: [
        {
          marker: "Price",
          title: "Sales and pricing",
          description:
            "For demos, custom pricing, and matching Trackora to current shipment volume.",
        },
        {
          marker: "Help",
          title: "Operations support",
          description:
            "For operational help or questions about dispatch, tracking, and COD workflows.",
        },
        {
          marker: "Link",
          title: "Partnerships and integrations",
          description:
            "For shipping companies, data sources, and shared delivery or collection opportunities.",
        },
      ],
    },
    details: {
      title: "Contact details",
      lead: "An official Trackora channel for operations, sales, support, partnerships, and integrations.",
      note: "For urgent inquiries, book a demo so we can review your operation directly.",
      items: [
        {
          label: "Email",
          value: "hello@trackora.com",
          href: "mailto:hello@trackora.com",
        },
        { label: "Working days", value: "Sunday to Thursday" },
        { label: "Market", value: "Egypt and the Arab region" },
        {
          label: "Help type",
          value: "Sales, support, partnerships, integrations",
        },
      ],
    },
    form: {
      title: "Write the message that helps us understand your operation",
      requiredNote:
        "Required fields are marked with * so we can route your message to the right team.",
      required: "*",
      optional: "Optional",
      submit: "Send contact message",
      submitNote:
        "We use these details only to respond to your inquiry. If submission fails, you can send the same details by email.",
    },
    fields: {
      name: { label: "Name", placeholder: "Example: Ahmed Hassan" },
      company: {
        label: "Company / store name",
        placeholder: "Example: Cairo Shipping Co.",
      },
      phone: {
        label: "Phone number",
        placeholder: "01012345678 or +201012345678",
        help: "We accept Egyptian local numbers or international numbers starting with + and 8 to 15 digits.",
      },
      email: { label: "Email address", placeholder: "name@company.com" },
      inquiryType: {
        label: "Inquiry type",
        placeholder: "Select inquiry type",
      },
      message: {
        label: "Message",
        placeholder:
          "Share a short summary about shipments, couriers, COD, or the help you need.",
        help: "Mention shipment volume or courier count if that helps route the message.",
      },
    },
    inquiryTypes: [
      { value: "sales", label: "Sales" },
      { value: "support", label: "Support" },
      { value: "partnerships", label: "Partnerships" },
      { value: "custom-pricing", label: "Custom Pricing" },
      { value: "integrations", label: "Integrations" },
      { value: "general", label: "General" },
    ],
    validation: {
      name: "Enter your name so we know who to contact.",
      phone:
        "Enter a valid phone number. Example: 01012345678 or +201012345678.",
      email: "Enter a valid email address or leave this field empty.",
      inquiryType: "Select an inquiry type.",
      message: "Write a short message describing what you need.",
      general: "Review the highlighted fields before sending the message.",
      submitError:
        "The message was not completed. Try again or email hello@trackora.com.",
    },
    states: {
      loading: "Sending message...",
      successTitle: "We received your message",
      successText:
        "The message was delivered to Trackora's official channel, and the right team will review it during working days.",
      successSteps: [
        "We received your message.",
        "We review the inquiry type.",
        "The right team follows up.",
        "We recommend the best path: support, sales, pricing, or integrations.",
      ],
      sendAnother: "Send another message",
      errorTitle: "Message was not completed",
      deliveryNotConfigured:
        "Online form delivery is not enabled yet. Use the email link below to send the same details to hello@trackora.com.",
      deliveryFailed:
        "We could not deliver the message right now. Your details are still here, so you can retry or send them by email.",
      validationFailed: "Review the highlighted fields before sending the message.",
      emailFallbackCta: "Send details by email",
    },
    reassurance: {
      title: "We help you start from your current operation",
      lead: "This is not a generic sales route. We connect the answer to shipment volume, couriers, COD, and the settlement process your team uses today.",
      items: [
        "We help you understand the best way to run Trackora.",
        "We review shipment volume, couriers, and COD collection.",
        "We explain whether you need a ready plan or custom pricing.",
        "We help you start with the least possible change to current operations.",
      ],
    },
    faq: {
      title: "Questions before contacting us",
      lead: "Short answers about replies, custom pricing, shipping companies, trials, and integrations.",
      items: [
        {
          question: "When will the Trackora team reply?",
          answer:
            "We review messages during Sunday to Thursday working hours and route them to the closest team by inquiry type.",
        },
        {
          question: "Can I contact you about custom pricing?",
          answer:
            "Yes. Choose custom pricing or sales, and include shipment volume and courier count for a more accurate conversation.",
        },
        {
          question: "Is Trackora suitable for shipping companies?",
          answer:
            "Yes. Trackora is built for shipment management, dispatch, couriers, tracking, and COD wallets for shipping companies.",
        },
        {
          question: "Can we try the system before subscribing?",
          answer:
            "A demo or limited first launch can be arranged based on operation size and available data.",
        },
        {
          question: "Can Trackora connect with my website or store?",
          answer:
            "Integrations can be discussed based on your current system, data needs, and operating priority.",
        },
      ],
    },
    finalCta: {
      title: "Ready to organize shipments and COD?",
      lead: "Book a demo based on shipment volume, dispatch, couriers, and your COD collection process.",
      cta: "Book a demo",
    },
  },
} as const;

const copy = computed(() => (isArabic.value ? pageCopy.ar : pageCopy.en));

const mailtoHref = computed(() => {
  const subject = encodeURIComponent(
    isArabic.value
      ? `استفسار Trackora: ${getInquiryLabel()}`
      : `Trackora inquiry: ${getInquiryLabel()}`,
  );
  const body = encodeURIComponent(
    [
      `${copy.value.fields.name.label}: ${form.name}`,
      `${copy.value.fields.company.label}: ${form.company || "-"}`,
      `${copy.value.fields.phone.label}: ${form.phone}`,
      `${copy.value.fields.email.label}: ${form.email || "-"}`,
      `${copy.value.fields.inquiryType.label}: ${getInquiryLabel()}`,
      `${copy.value.fields.message.label}: ${form.message}`,
    ].join("\n"),
  );
  return `mailto:hello@trackora.com?subject=${subject}&body=${body}`;
});

watchEffect(() => {
  setSeo(copy.value.seoTitle, copy.value.seoDescription, '/contact');
});

function isValidRegionalPhone(value: string) {
  const normalized = value.replace(/[\s()-]/g, "");
  return /^(?:0?1[0125]\d{8}|\+201[0125]\d{8}|\+\d{8,15})$/.test(normalized);
}

function isValidEmail(value: string) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateField(key: FormKey) {
  errors[key] = "";
  if (key === "name" && !form.name) errors.name = copy.value.validation.name;
  if (key === "phone" && (!form.phone || !isValidRegionalPhone(form.phone)))
    errors.phone = copy.value.validation.phone;
  if (key === "email" && !isValidEmail(form.email))
    errors.email = copy.value.validation.email;
  if (key === "inquiryType" && !form.inquiryType)
    errors.inquiryType = copy.value.validation.inquiryType;
  if (key === "message" && form.message.length < 8)
    errors.message = copy.value.validation.message;
  return !errors[key];
}

function validateForm() {
  const fields: FormKey[] = [
    "name",
    "phone",
    "email",
    "inquiryType",
    "message",
  ];
  return fields.reduce(
    (isValid, field) => validateField(field) && isValid,
    true,
  );
}

function getInquiryLabel() {
  return (
    copy.value.inquiryTypes.find((option) => option.value === form.inquiryType)
      ?.label || copy.value.fields.inquiryType.placeholder
  );
}

function applyServerFieldErrors(fieldErrors: Record<string, string> | undefined) {
  if (!fieldErrors) return;
  (Object.keys(fieldErrors) as FormKey[]).forEach((field) => {
    if (field in errors) validateField(field);
  });
}

async function handleSubmit() {
  submitError.value = "";
  success.value = false;

  if (!validateForm()) {
    submitError.value = copy.value.states.validationFailed;
    await nextTick();
    formEl.value?.querySelector<HTMLElement>(".is-invalid")?.focus();
    return;
  }

  loading.value = true;
  try {
    const payload = {
      ...form,
      locale: locale.value,
    };
    await $fetch("/api/contact", {
      method: "POST",
      body: payload,
      timeout: 10000,
    });
    success.value = true;
    await nextTick();
    successEl.value?.focus({ preventScroll: true });
    successEl.value?.scrollIntoView({
      behavior: getScrollBehavior(),
      block: "center",
    });
  } catch (error) {
    const fetchError = error as {
      statusCode?: number;
      status?: number;
      data?: {
        fieldErrors?: Record<string, string>;
        data?: { fieldErrors?: Record<string, string> };
      };
    };
    const statusCode = fetchError.statusCode || fetchError.status;
    applyServerFieldErrors(
      fetchError.data?.fieldErrors || fetchError.data?.data?.fieldErrors,
    );
    if (statusCode === 400) {
      submitError.value = copy.value.states.validationFailed;
    } else if (statusCode === 503) {
      submitError.value = copy.value.states.deliveryNotConfigured;
    } else {
      submitError.value = copy.value.states.deliveryFailed;
    }
    await nextTick();
    formEl.value?.querySelector<HTMLElement>(".is-invalid")?.focus();
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  form.name = "";
  form.company = "";
  form.phone = "";
  form.email = "";
  form.inquiryType = "";
  form.message = "";
  form.website = "";
  success.value = false;
  submitError.value = "";
  (Object.keys(errors) as FormKey[]).forEach((key) => {
    errors[key] = "";
  });
  nextTick(() => {
    formEl.value?.querySelector<HTMLElement>("input, select, textarea")?.focus();
  });
}

async function focusForm(target?: Event | "select") {
  if (target instanceof Event) target.preventDefault();
  formEl.value?.scrollIntoView({
    behavior: getScrollBehavior(),
    block: "start",
  });
  await nextTick();
  const selector = target === "select" ? "select" : "input, select, textarea";
  formEl.value
    ?.querySelector<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >(selector)
    ?.focus({ preventScroll: true });
}

function getScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}
</script>

<style scoped>
.contact-page {
  --contact-primary: var(--color-primary);
  --contact-primary-light: var(--color-primary-light);
  --contact-primary-dark: var(--color-primary-dark);
  --contact-accent: var(--color-accent);
  --contact-surface: var(--color-bg-alt);
  --contact-text: var(--color-text);
  --contact-ink: var(--color-primary-dark);
  --contact-muted: var(--color-text-secondary);
  --contact-line: rgba(27, 77, 92, 0.14);
  --contact-shadow: var(--shadow-lg);
  --contact-ease: cubic-bezier(0.22, 1, 0.36, 1);
  color: var(--contact-text);
  background:
    radial-gradient(
      circle at 7% 4%,
      rgba(232, 168, 56, 0.12),
      transparent 27rem
    ),
    linear-gradient(
      180deg,
      var(--color-bg) 0%,
      var(--color-bg-alt) 44%,
      var(--color-bg) 100%
    );
  overflow: hidden;
}

.contact-hero {
  padding-block: clamp(5rem, 8vw, 8.5rem) clamp(4rem, 7vw, 6.5rem);
  color: #ffffff;
  background:
    radial-gradient(
      circle at 16% 18%,
      rgba(232, 168, 56, 0.18),
      transparent 18rem
    ),
    radial-gradient(
      circle at 86% 12%,
      rgba(255, 255, 255, 0.12),
      transparent 21rem
    ),
    var(--gradient-hero);
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
  transition:
    transform 220ms var(--contact-ease),
    box-shadow 220ms var(--contact-ease),
    background 220ms var(--contact-ease),
    border-color 220ms var(--contact-ease);
}

.contact-btn:focus-visible,
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
  color: var(--color-text-on-accent);
  background: var(--contact-accent);
  box-shadow: 0 16px 36px rgba(232, 168, 56, 0.3);
}

.contact-btn--secondary {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.1);
}

.contact-btn:hover,
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
  color: var(--color-accent-light);
  background: rgba(232, 168, 56, 0.18);
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
  color: var(--color-text-on-accent);
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
.routing-strip p,
.faq-list p {
  color: var(--contact-muted);
  line-height: 1.85;
  text-wrap: pretty;
}

.section-heading--split > span {
  border-radius: 999px;
  padding: 0.48rem 0.9rem;
  color: var(--contact-primary);
  background: rgba(27, 77, 92, 0.06);
  font-weight: 900;
}

.routing-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1px solid rgba(27, 77, 92, 0.12);
  border-radius: 1.7rem;
  overflow: hidden;
  background: #ffffff;
  box-shadow: var(--shadow-card);
}

.routing-strip article {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: start;
  padding: clamp(1rem, 2.2vw, 1.45rem);
}

.routing-strip article + article {
  border-inline-start: 1px solid rgba(27, 77, 92, 0.1);
}

.routing-strip span {
  display: grid;
  place-items: center;
  min-width: 3rem;
  min-height: 2.55rem;
  border-radius: 999px;
  color: var(--contact-primary);
  background: rgba(27, 77, 92, 0.07);
  font-weight: 900;
}

.routing-strip h3 {
  color: var(--contact-ink);
  font-size: clamp(1.1rem, 1.6vw, 1.35rem);
}

.contact-form-section {
  background: var(--contact-surface);
}

.form-shell {
  grid-template-columns: minmax(0, 1.28fr) minmax(18rem, 0.72fr);
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
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: 1.2rem;
  background: rgba(27, 77, 92, 0.04);
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
  background: var(--color-accent-light);
  color: var(--color-accent-contrast) !important;
  font-weight: 800;
}

.contact-form--success {
  background: linear-gradient(180deg, #ffffff, var(--color-bg-alt));
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
  color: var(--color-accent-contrast);
  font-weight: 900;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid rgba(27, 77, 92, 0.18);
  border-radius: 1rem;
  padding: 0.9rem 1rem;
  color: var(--contact-text);
  background: #ffffff;
  font: inherit;
  transition:
    border-color 180ms var(--contact-ease),
    box-shadow 180ms var(--contact-ease);
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
  box-shadow: 0 0 0 4px rgba(27, 77, 92, 0.1);
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
  border: 1px solid rgba(34, 197, 94, 0.24);
  background: linear-gradient(
    180deg,
    rgba(34, 197, 94, 0.12),
    rgba(34, 197, 94, 0.06)
  );
}

.success-steps {
  display: grid;
  gap: 0.55rem;
  margin-block: 0.35rem;
  padding: 0;
  list-style: none;
  counter-reset: success-step;
}

.success-steps li {
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 0.7rem;
  align-items: start;
  color: var(--contact-ink);
  font-weight: 800;
}

.success-steps li::before {
  counter-increment: success-step;
  content: counter(success-step);
  display: grid;
  place-items: center;
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 50%;
  color: var(--color-text-on-accent);
  background: var(--contact-accent);
  font-size: 0.85rem;
  font-weight: 900;
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
  border-color: rgba(27, 77, 92, 0.18);
  background: #ffffff;
}

.form-alert__link {
  width: fit-content;
  min-height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(180, 35, 47, 0.22);
  border-radius: 999px;
  padding: 0.72rem 1rem;
  color: #8f1d2a;
  background: #ffffff;
  font-weight: 900;
}

.form-alert__link:focus-visible {
  outline: 3px solid var(--contact-accent);
  outline-offset: 3px;
}

.field--trap {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(15, 51, 64, 0.28);
  border-top-color: var(--color-primary-dark);
  border-radius: 50%;
  animation: spin 800ms linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
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
  border: 1px solid rgba(27, 77, 92, 0.12);
  border-radius: 1.2rem;
  color: var(--contact-muted);
  background: #ffffff;
  box-shadow: var(--shadow-sm);
  font-weight: 800;
}

.reassurance-list li span {
  width: 0.55rem;
  height: 0.55rem;
  margin-block-start: 0.62rem;
  border-radius: 50%;
  background: var(--contact-accent);
  box-shadow: 0 0 0 5px rgba(232, 168, 56, 0.18);
}

.faq-section {
  background: linear-gradient(180deg, #ffffff, var(--contact-surface));
}

details {
  border: 1px solid rgba(27, 77, 92, 0.12);
  border-radius: 1.25rem;
  background: #ffffff;
  box-shadow: var(--shadow-sm);
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
    radial-gradient(
      circle at 18% 18%,
      rgba(232, 168, 56, 0.2),
      transparent 18rem
    ),
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

  .routing-strip {
    grid-template-columns: 1fr;
  }

  .routing-strip article + article {
    border-inline-start: 0;
    border-block-start: 1px solid rgba(27, 77, 92, 0.1);
  }
}

@media (max-width: 50rem) {
  .contact-hero {
    padding-block: clamp(3.6rem, 12vw, 5rem) clamp(2.6rem, 9vw, 4rem);
  }

  .contact-hero h1 {
    max-width: 100%;
    font-size: clamp(2.45rem, 13vw, 3.8rem);
  }

  .contact-hero__lead {
    line-height: 1.75;
  }

  .routing-ledger {
    display: none;
  }

  .contact-options,
  .contact-form-section,
  .reassurance-section,
  .faq-section {
    padding-block: clamp(3rem, 12vw, 4.5rem);
  }

  .field-grid {
    grid-template-columns: 1fr;
  }

  .routing-ledger__steps li {
    grid-template-columns: 1fr;
  }

  .contact-hero__actions .contact-btn,
  .contact-form__footer .contact-btn,
  .final-contact-cta .contact-btn {
    grid-column: auto;
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-btn,
  .form-alert button,
  input,
  select,
  textarea {
    transition-duration: 0.01ms;
  }

  .spinner {
    animation: none;
  }
}
</style>
