<template>
  <div class="demo-page" :dir="isArabic ? 'rtl' : 'ltr'">
    <section class="demo-hero" aria-labelledby="demo-heading">
      <AppContainer wide>
        <div class="demo-hero__grid">
          <div class="demo-hero__copy">
            <div class="plan-context plan-context--inline" aria-live="polite">
              <span>{{ planContext.badge }}</span>
              <p>{{ planContext.text }}</p>
            </div>
            <h1 id="demo-heading">{{ copy.hero.title }}</h1>
            <p class="demo-hero__lead">{{ copy.hero.lead }}</p>
            <ul class="audience-list" :aria-label="copy.hero.audienceLabel">
              <li v-for="audience in copy.hero.audiences" :key="audience">
                {{ audience }}
              </li>
            </ul>
            <button
              class="demo-btn demo-btn--accent"
              type="button"
              @click="focusForm"
            >
              {{ copy.hero.cta }}
            </button>
          </div>

          <aside
            class="operations-panel ledger-preview"
            :aria-label="copy.hero.panelLabel"
          >
            <div class="ledger-preview__header">
              <span>{{ copy.hero.panelTitle }}</span>
              <strong>{{ copy.hero.panelStatus }}</strong>
            </div>
            <div class="ledger-card">
              <div class="ledger-card__topline">
                <span>{{ copy.hero.ledger.idLabel }}</span>
                <strong>{{ copy.hero.ledger.id }}</strong>
              </div>
              <dl class="ledger-fields">
                <div
                  v-for="item in copy.hero.ledger.fields"
                  :key="item.label"
                  :class="['ledger-field', `ledger-field--${item.tone}`]"
                >
                  <dt>{{ item.label }}</dt>
                  <dd>
                    <span aria-hidden="true"></span>
                    {{ item.value }}
                  </dd>
                </div>
              </dl>
              <div
                class="ledger-timeline"
                :aria-label="copy.hero.ledger.timelineLabel"
              >
                <span
                  v-for="step in copy.hero.ledger.timeline"
                  :key="step"
                  class="ledger-timeline__step"
                  >{{ step }}</span
                >
              </div>
            </div>
          </aside>
        </div>
      </AppContainer>
    </section>

    <section
      class="demo-section demo-section--form"
      aria-labelledby="form-heading"
    >
      <AppContainer wide>
        <div class="form-layout">
          <form
            ref="formEl"
            class="demo-form"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <div class="demo-form__header">
              <p>{{ copy.form.kicker }}</p>
              <h2 id="form-heading">{{ copy.form.title }}</h2>
              <span>{{ copy.form.requiredNote }}</span>
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
            </div>

            <div v-if="!success" class="demo-form__body">
              <fieldset class="form-group">
                <legend>{{ copy.groups.contact }}</legend>
                <div class="field-grid">
                  <div class="field">
                    <label for="demo-name"
                      >{{ copy.fields.name.label }}
                      <span>{{ copy.form.required }}</span></label
                    >
                    <input
                      id="demo-name"
                      v-model.trim="form.name"
                      :aria-describedby="
                        errors.name ? 'demo-name-error' : undefined
                      "
                      :aria-invalid="!!errors.name"
                      :class="{ 'is-invalid': errors.name }"
                      name="name"
                      type="text"
                      autocomplete="name"
                      :placeholder="copy.fields.name.placeholder"
                      @blur="validateField('name')"
                    />
                    <p
                      v-if="errors.name"
                      id="demo-name-error"
                      class="field-error"
                    >
                      {{ errors.name }}
                    </p>
                  </div>

                  <div class="field">
                    <label for="demo-company"
                      >{{ copy.fields.company.label }}
                      <span>{{ copy.form.required }}</span></label
                    >
                    <input
                      id="demo-company"
                      v-model.trim="form.company"
                      :aria-describedby="
                        errors.company ? 'demo-company-error' : undefined
                      "
                      :aria-invalid="!!errors.company"
                      :class="{ 'is-invalid': errors.company }"
                      name="company"
                      type="text"
                      autocomplete="organization"
                      :placeholder="copy.fields.company.placeholder"
                      @blur="validateField('company')"
                    />
                    <p
                      v-if="errors.company"
                      id="demo-company-error"
                      class="field-error"
                    >
                      {{ errors.company }}
                    </p>
                  </div>

                  <div class="field">
                    <label for="demo-phone"
                      >{{ copy.fields.phone.label }}
                      <span>{{ copy.form.required }}</span></label
                    >
                    <input
                      id="demo-phone"
                      v-model.trim="form.phone"
                      :aria-describedby="
                        errors.phone ? 'demo-phone-error' : 'demo-phone-help'
                      "
                      :aria-invalid="!!errors.phone"
                      :class="{ 'is-invalid': errors.phone }"
                      name="phone"
                      type="tel"
                      autocomplete="tel"
                      inputmode="tel"
                      :placeholder="copy.fields.phone.placeholder"
                      @blur="validateField('phone')"
                    />
                    <p id="demo-phone-help" class="field-help">
                      {{ copy.fields.phone.help }}
                    </p>
                    <p
                      v-if="errors.phone"
                      id="demo-phone-error"
                      class="field-error"
                    >
                      {{ errors.phone }}
                    </p>
                  </div>

                  <div class="field">
                    <label for="demo-email"
                      >{{ copy.fields.email.label }}
                      <small>{{ copy.form.optional }}</small></label
                    >
                    <input
                      id="demo-email"
                      v-model.trim="form.email"
                      :aria-describedby="
                        errors.email ? 'demo-email-error' : undefined
                      "
                      :aria-invalid="!!errors.email"
                      :class="{ 'is-invalid': errors.email }"
                      name="email"
                      type="email"
                      autocomplete="email"
                      :placeholder="copy.fields.email.placeholder"
                      @blur="validateField('email')"
                    />
                    <p
                      v-if="errors.email"
                      id="demo-email-error"
                      class="field-error"
                    >
                      {{ errors.email }}
                    </p>
                  </div>
                </div>
              </fieldset>

              <fieldset class="form-group">
                <legend>{{ copy.groups.operation }}</legend>
                <div class="field-grid">
                  <div class="field">
                    <label for="demo-business-type"
                      >{{ copy.fields.businessType.label }}
                      <span>{{ copy.form.required }}</span></label
                    >
                    <select
                      id="demo-business-type"
                      v-model="form.businessType"
                      :aria-describedby="
                        errors.businessType
                          ? 'demo-business-type-error'
                          : undefined
                      "
                      :aria-invalid="!!errors.businessType"
                      :class="{ 'is-invalid': errors.businessType }"
                      name="businessType"
                      @blur="validateField('businessType')"
                    >
                      <option value="">
                        {{ copy.fields.businessType.placeholder }}
                      </option>
                      <option
                        v-for="option in copy.options.businessTypes"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                    <p
                      v-if="errors.businessType"
                      id="demo-business-type-error"
                      class="field-error"
                    >
                      {{ errors.businessType }}
                    </p>
                  </div>

                  <div class="field">
                    <label for="demo-volume"
                      >{{ copy.fields.monthlyVolume.label }}
                      <span>{{ copy.form.required }}</span></label
                    >
                    <select
                      id="demo-volume"
                      v-model="form.monthlyVolume"
                      :aria-describedby="
                        errors.monthlyVolume ? 'demo-volume-error' : undefined
                      "
                      :aria-invalid="!!errors.monthlyVolume"
                      :class="{ 'is-invalid': errors.monthlyVolume }"
                      name="monthlyVolume"
                      @blur="validateField('monthlyVolume')"
                    >
                      <option value="">
                        {{ copy.fields.monthlyVolume.placeholder }}
                      </option>
                      <option
                        v-for="option in copy.options.monthlyVolumes"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                    <p
                      v-if="errors.monthlyVolume"
                      id="demo-volume-error"
                      class="field-error"
                    >
                      {{ errors.monthlyVolume }}
                    </p>
                  </div>
                </div>

                <div class="choice-field choice-field--compact">
                  <p id="demo-plan-help" class="field-help">
                    {{ copy.fields.plan.help }}
                  </p>
                  <div
                    class="plan-switch"
                    role="radiogroup"
                    :aria-labelledby="'demo-plan-label'"
                    aria-describedby="demo-plan-help"
                  >
                    <span id="demo-plan-label" class="choice-label"
                      >{{ copy.fields.plan.label }}
                      <small>{{ copy.form.optional }}</small></span
                    >
                    <label
                      v-for="option in copy.options.plans"
                      :key="option.value"
                      :class="[
                        'choice-card choice-card--compact',
                        { 'is-selected': form.plan === option.value },
                      ]"
                    >
                      <input
                        v-model="form.plan"
                        type="radio"
                        name="plan"
                        :value="option.value"
                      />
                      <span>{{ option.label }}</span>
                    </label>
                  </div>
                </div>
              </fieldset>

              <fieldset class="form-group form-group--problem">
                <legend>{{ copy.groups.problem }}</legend>
                <p class="field-help">{{ copy.fields.problem.help }}</p>
                <div class="problem-grid">
                  <label
                    v-for="option in copy.options.problems"
                    :key="option.value"
                    :class="[
                      'problem-chip',
                      { 'is-selected': form.problems.includes(option.value) },
                    ]"
                  >
                    <input
                      v-model="form.problems"
                      type="checkbox"
                      name="problem"
                      :value="option.value"
                    />
                    <span>{{ option.label }}</span>
                  </label>
                </div>
              </fieldset>

              <fieldset class="form-group form-group--message">
                <legend>{{ copy.groups.message }}</legend>
                <div class="field field--full">
                  <label for="demo-message"
                    >{{ copy.fields.message.label }}
                    <small>{{ copy.form.optional }}</small></label
                  >
                  <textarea
                    id="demo-message"
                    v-model.trim="form.message"
                    name="message"
                    rows="4"
                    :placeholder="copy.fields.message.placeholder"
                  />
                </div>
              </fieldset>

              <div class="demo-form__footer">
                <div class="demo-form__actions">
                  <button
                    class="demo-btn demo-btn--primary"
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
                  <NuxtLink
                    class="demo-btn demo-btn--ghost"
                    :to="localePath('/pricing')"
                  >
                    {{ copy.form.backToPricing }}
                  </NuxtLink>
                </div>
                <p>{{ copy.form.privacy }}</p>
              </div>
            </div>
          </form>

          <aside class="next-panel" aria-labelledby="next-heading">
            <div class="plan-context plan-context--panel">
              <span>{{ planContext.badge }}</span>
              <p>{{ planContext.text }}</p>
            </div>
            <h2 id="next-heading">{{ copy.next.title }}</h2>
            <ol class="next-steps">
              <li v-for="step in copy.next.steps" :key="step">
                <span aria-hidden="true"></span>
                <p>{{ step }}</p>
              </li>
            </ol>
          </aside>
        </div>
      </AppContainer>
    </section>

    <section class="demo-section trust-section" aria-labelledby="trust-heading">
      <AppContainer wide>
        <div class="trust-layout">
          <div>
            <h2 id="trust-heading">{{ copy.trust.title }}</h2>
            <p>{{ copy.trust.lead }}</p>
          </div>
          <ul class="trust-list">
            <li v-for="item in copy.trust.items" :key="item.title">
              <strong>{{ item.title }}</strong>
              <span>{{ item.text }}</span>
            </li>
          </ul>
        </div>
      </AppContainer>
    </section>

    <section
      class="demo-section faq-section"
      aria-labelledby="demo-faq-heading"
    >
      <AppContainer wide>
        <div class="faq-heading">
          <h2 id="demo-faq-heading">{{ copy.faq.title }}</h2>
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

    <section class="final-demo-cta" aria-labelledby="final-demo-heading">
      <AppContainer wide>
        <div class="final-demo-cta__inner">
          <div>
            <h2 id="final-demo-heading">{{ copy.finalCta.title }}</h2>
            <p>{{ copy.finalCta.lead }}</p>
          </div>
          <button
            class="demo-btn demo-btn--accent"
            type="button"
            @click="focusForm"
          >
            {{ copy.finalCta.cta }}
          </button>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
type PlanValue = "starter" | "growth" | "scale";
type FormKey =
  | "name"
  | "company"
  | "phone"
  | "email"
  | "businessType"
  | "monthlyVolume";

const { locale } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const { setSeo } = useLocaleSeo();

const isArabic = computed(() => locale.value === "ar");
const formEl = ref<HTMLFormElement | null>(null);
const successEl = ref<HTMLElement | null>(null);
const loading = ref(false);
const success = ref(false);
const submitError = ref("");
const errors = reactive<Record<FormKey, string>>({
  name: "",
  company: "",
  phone: "",
  email: "",
  businessType: "",
  monthlyVolume: "",
});

const form = reactive({
  name: "",
  company: "",
  phone: "",
  email: "",
  businessType: "",
  monthlyVolume: "",
  plan: "scale" as PlanValue,
  problems: [] as string[],
  message: "",
});

const pageCopy = {
  ar: {
    seoTitle: "احجز عرض Trackora | إدارة الشحنات وCOD",
    seoDescription:
      "احجز عرضا توضيحيا عربيا لمنصة Trackora لإدارة الشحنات، الديسباتش، تطبيق المناديب، محفظة COD، التتبع، والتقارير.",
    hero: {
      title: "احجز عرض توضيحي يناسب تشغيلك",
      lead: "Trackora يساعد فريقك على تنظيم الشحنات، توزيع المناديب، متابعة محفظة COD، تتبع العملاء، إدارة الديسباتش، وقراءة التقارير من سجل تشغيل واحد.",
      audienceLabel: "الفئات المناسبة للعرض التوضيحي",
      audiences: ["شركات الشحن", "المتاجر الإلكترونية", "السوشيال سيلرز"],
      cta: "انتقل إلى نموذج العرض",
      panelLabel: "مثال تدفق تشغيل Trackora",
      panelTitle: "سجل شحنة مباشر",
      panelStatus: "قيد المراجعة",
      ledger: {
        idLabel: "Shipment ID",
        id: "TRK-240607-A12",
        timelineLabel: "مراحل الشحنة",
        timeline: ["استلام", "توزيع", "توصيل", "تسوية"],
        fields: [
          { label: "المندوب", value: "أحمد", tone: "teal" },
          { label: "COD", value: "1,250 جنيه", tone: "gold" },
          { label: "الحالة", value: "خارج للتوصيل", tone: "teal" },
          { label: "المخاطر", value: "رقم متكرر / يحتاج مراجعة", tone: "red" },
        ],
      },
    },
    planContext: {
      starter: {
        badge: "مهتم بخطة البداية",
        text: "مناسبة للتجار والفرق الصغيرة التي تبدأ تنظيم الشحنات والتتبع بعيدا عن الجداول.",
      },
      growth: {
        badge: "مهتم بخطة النمو",
        text: "مناسبة لعمليات نشطة تحتاج مناديب، ديسباتش، محفظة COD، وتقارير يومية واضحة.",
      },
      generic: {
        badge: "سنساعدك في اختيار الخطة المناسبة",
        text: "شارك حجم التشغيل الحالي وسنقترح نقطة بداية تناسب الشحنات، المناديب، والتحصيل.",
      },
    },
    form: {
      kicker: "بيانات التشغيل",
      title: "املأ البيانات الأساسية، وسنرتب عرضا على سيناريو قريب من يومك",
      requiredNote:
        "الحقول المطلوبة موضحة بعلامة *، ولا يوجد إرسال فعلي لخادم في هذه المرحلة.",
      required: "*",
      optional: "اختياري",
      submit: "إرسال طلب العرض",
      backToPricing: "العودة للأسعار",
      privacy:
        "سنستخدم البيانات لترتيب العرض فقط. لن يتم الاتصال بواجهة خلفية حاليا.",
    },
    groups: {
      contact: "بيانات التواصل",
      operation: "طبيعة التشغيل",
      problem: "المشكلة الأساسية",
      message: "الرسالة",
    },
    fields: {
      name: { label: "الاسم", placeholder: "مثال: أحمد حسن" },
      company: {
        label: "اسم الشركة / المتجر",
        placeholder: "مثال: شركة القاهرة للشحن",
      },
      phone: {
        label: "رقم الهاتف",
        placeholder: "01012345678",
        help: "استخدم رقم موبايل مصري مثل 01012345678 أو +201012345678.",
      },
      email: { label: "البريد الإلكتروني", placeholder: "name@company.com" },
      businessType: { label: "نوع النشاط", placeholder: "اختر نوع النشاط" },
      monthlyVolume: {
        label: "حجم الشحنات الشهري",
        placeholder: "اختر حجم الشحنات",
      },
      plan: {
        label: "الخطة المهتم بها",
        help: "يمكنك تغيير الخطة، وسنراجع الاختيار مع حجم التشغيل.",
      },
      problem: {
        label: "أهم مشكلة تريد حلها",
        help: "اختر ما يشرح احتياجك بسرعة. يمكنك اختيار أكثر من مشكلة.",
      },
      message: {
        label: "رسالة إضافية",
        placeholder:
          "اكتب أي تفاصيل عن المناطق، المناديب، COD، أو طريقة التشغيل الحالية.",
      },
    },
    options: {
      businessTypes: [
        { value: "shipping-company", label: "شركة شحن" },
        { value: "ecommerce-store", label: "متجر إلكتروني" },
        { value: "social-seller", label: "سوشيال سيلر" },
        { value: "other", label: "أخرى" },
      ],
      monthlyVolumes: [
        { value: "lt-500", label: "أقل من 500" },
        { value: "500-2000", label: "500 - 2,000" },
        { value: "2000-10000", label: "2,000 - 10,000" },
        { value: "gt-10000", label: "أكثر من 10,000" },
      ],
      plans: [
        {
          value: "starter",
          label: "البداية",
          help: "تنظيم الشحنات والتتبع لفريق صغير",
        },
        {
          value: "growth",
          label: "النمو",
          help: "ديسباتش، مناديب، COD، وتقارير",
        },
        {
          value: "scale",
          label: "التوسع / تسعير مخصص",
          help: "فروع، صلاحيات، وتدفقات أكبر",
        },
      ],
      problems: [
        { value: "shipment-organization", label: "تنظيم الشحنات" },
        { value: "dispatch", label: "توزيع المناديب" },
        { value: "cod", label: "تحصيل COD" },
        { value: "tracking", label: "تتبع الشحنات" },
        { value: "returns", label: "المرتجعات" },
        { value: "reports", label: "التقارير" },
        { value: "fraud", label: "تقليل الطلبات الوهمية" },
      ],
    },
    validation: {
      name: "اكتب اسمك حتى نعرف من سنخاطب.",
      company: "اكتب اسم الشركة أو المتجر.",
      phone: "اكتب رقم موبايل مصري صحيح. مثال: 01012345678.",
      email: "اكتب بريد إلكتروني صحيح أو اتركه فارغا.",
      businessType: "اختر نوع النشاط.",
      monthlyVolume: "اختر حجم الشحنات الشهري.",
      general: "راجع الحقول الموضحة قبل إرسال الطلب.",
    },
    states: {
      loading: "جار إرسال الطلب...",
      successTitle: "تم تسجيل طلب العرض",
      successText:
        "سنراجع حجم التشغيل والخطة المهتم بها، ثم نتواصل معك بخطوات العرض المناسبة.",
      successSteps: [
        "استلمنا طلبك",
        "سنراجع حجم التشغيل",
        "سنتواصل معك لتحديد العرض المناسب",
        "سنعرض لك تدفق الشحن والتحصيل على Trackora",
      ],
      sendAnother: "إرسال طلب آخر",
      errorTitle: "لم يكتمل الإرسال",
    },
    next: {
      title: "ماذا يحدث بعد إرسال الطلب؟",
      steps: [
        "نراجع حجم التشغيل الحالي",
        "نحدد أنسب خطة أو تسعير",
        "نعرض لك تدفق الشحنات والتحصيل",
        "نوضح خطوات التشغيل الأولى",
      ],
    },
    trust: {
      title: "ابدأ العرض من الواقع الحالي، لا من نظام مثالي على الورق",
      lead: "نرتب العرض حول طريقة عمل فريقك اليوم حتى ترى أين يدخل Trackora في دورة الشحنة بدون تعطيل التشغيل.",
      items: [
        {
          title: "لا تحتاج تغيير نظامك الحالي من أول يوم",
          text: "يمكن البدء بجزء واضح من التشغيل ثم نقل الباقي تدريجيا.",
        },
        {
          title: "مناسب للتجربة مع فريق تشغيل صغير",
          text: "ابدأ مع مسؤول ديسباتش، بضعة مناديب، أو تاجر واحد.",
        },
        {
          title: "قابل للتوسع مع الفروع والمناديب",
          text: "أضف فروع، مناطق، صلاحيات، ومناديب حسب نمو العملية.",
        },
        {
          title: "يدعم تتبع الشحنات وتحسين تحصيل COD",
          text: "حالة الشحنة ومحفظة التحصيل تظهران في سجل قابل للمراجعة.",
        },
      ],
    },
    faq: {
      title: "أسئلة قبل حجز العرض",
      lead: "إجابات مختصرة تساعدك تعرف ما تحتاجه قبل الاجتماع.",
      items: [
        {
          question: "هل العرض التوضيحي مجاني؟",
          answer:
            "نعم. العرض مجاني ومخصص لفهم حجم التشغيل، المشاكل الحالية، والخطة الأقرب لاحتياجك.",
        },
        {
          question: "هل أحتاج تجهيز بيانات قبل الاجتماع؟",
          answer:
            "ليس ضروريا. إذا كان لديك مثال لشحنة، ملف طلبات، أو طريقة تسوية COD الحالية فسيجعل العرض أدق.",
        },
        {
          question: "هل يمكن تجربة Trackora على جزء من التشغيل فقط؟",
          answer:
            "نعم. يمكن البدء بفريق صغير، منطقة محددة، أو تاجر واحد قبل توسيع الاستخدام.",
        },
        {
          question: "هل يناسب شركات الشحن متعددة الفروع؟",
          answer:
            "نعم. الخطة المخصصة تدعم الفروع، المناطق، الصلاحيات، والمناديب حسب الاتفاق.",
        },
        {
          question: "هل يمكن ربطه لاحقا مع موقعي أو نظامي؟",
          answer:
            "يمكن مناقشة الربط لاحقا حسب النظام الحالي، البيانات المطلوبة، وأولوية التشغيل.",
        },
        {
          question: "ماذا يحدث بعد إرسال الطلب؟",
          answer:
            "نراجع البيانات، نحدد الخطة أو التسعير المناسب، ثم نتواصل لترتيب موعد العرض.",
        },
      ],
    },
    finalCta: {
      title: "جاهز تشوف Trackora على تشغيل حقيقي؟",
      lead: "ابدأ بطلب عرض مبني على حجم الشحنات، الديسباتش، المناديب، وطريقة تحصيل COD لديك.",
      cta: "احجز عرضًا توضيحيًا",
    },
  },
  en: {
    seoTitle: "Book a Trackora Demo | Shipment and COD Management",
    seoDescription:
      "Book a Trackora demo for shipment management, dispatch, courier workflows, COD wallets, tracking, and operations reports.",
    hero: {
      title: "Book a demo shaped around your operation",
      lead: "Trackora helps your team organize shipments, assign couriers, manage the COD wallet, track customers, run dispatch, and read reports from one operating record.",
      audienceLabel: "Audiences this demo supports",
      audiences: ["Shipping companies", "E-commerce stores", "Social sellers"],
      cta: "Go to demo form",
      panelLabel: "Trackora workflow example",
      panelTitle: "Live shipment ledger",
      panelStatus: "Needs review",
      ledger: {
        idLabel: "Shipment ID",
        id: "TRK-240607-A12",
        timelineLabel: "Shipment stages",
        timeline: ["Intake", "Dispatch", "Delivery", "Settlement"],
        fields: [
          { label: "Courier", value: "Ahmed", tone: "teal" },
          { label: "Cash on delivery (COD)", value: "EGP 1,250", tone: "gold" },
          { label: "Tracking status", value: "Out for delivery", tone: "teal" },
          {
            label: "Risk note",
            value: "Repeated phone / review needed",
            tone: "red",
          },
        ],
      },
    },
    planContext: {
      starter: {
        badge: "Interested in Starter",
        text: "Best for merchants and small teams starting shipment organization outside spreadsheets.",
      },
      growth: {
        badge: "Interested in Growth",
        text: "Best for active operations that need couriers, dispatch, COD wallet, and daily reports.",
      },
      generic: {
        badge: "We will help you choose the right plan",
        text: "Share your current volume and we will suggest a starting point for shipments, couriers, and COD.",
      },
    },
    form: {
      kicker: "Operations details",
      title:
        "Share the basics, and we will shape the demo around a real day in your operation",
      requiredNote:
        "Required fields are marked with *. This page does not send data to a backend yet.",
      required: "*",
      optional: "Optional",
      submit: "Send demo request",
      backToPricing: "Return to pricing",
      privacy:
        "We will use these details only to prepare the demo. No backend endpoint is called right now.",
    },
    groups: {
      contact: "Contact details",
      operation: "Operating context",
      problem: "Main problem",
      message: "Message",
    },
    fields: {
      name: { label: "Name", placeholder: "Example: Ahmed Hassan" },
      company: {
        label: "Company / store name",
        placeholder: "Example: Cairo Shipping Co.",
      },
      phone: {
        label: "Phone number",
        placeholder: "01012345678",
        help: "Use an Egyptian mobile number such as 01012345678 or +201012345678.",
      },
      email: { label: "Email address", placeholder: "name@company.com" },
      businessType: {
        label: "Business type",
        placeholder: "Select business type",
      },
      monthlyVolume: {
        label: "Monthly shipment volume",
        placeholder: "Select shipment volume",
      },
      plan: {
        label: "Interested plan",
        help: "You can change the plan. We will review it against your operating volume.",
      },
      problem: {
        label: "Main problem you want to solve",
        help: "Pick the problem that explains your need fastest. You can choose more than one.",
      },
      message: {
        label: "Additional message",
        placeholder:
          "Share details about zones, couriers, COD, or your current operating process.",
      },
    },
    options: {
      businessTypes: [
        { value: "shipping-company", label: "Shipping company" },
        { value: "ecommerce-store", label: "E-commerce store" },
        { value: "social-seller", label: "Social seller" },
        { value: "other", label: "Other" },
      ],
      monthlyVolumes: [
        { value: "lt-500", label: "Less than 500" },
        { value: "500-2000", label: "500 - 2,000" },
        { value: "2000-10000", label: "2,000 - 10,000" },
        { value: "gt-10000", label: "More than 10,000" },
      ],
      plans: [
        {
          value: "starter",
          label: "Starter",
          help: "Shipment organization and tracking for a small team",
        },
        {
          value: "growth",
          label: "Growth",
          help: "Dispatch, couriers, COD, and reports",
        },
        {
          value: "scale",
          label: "Scale / custom pricing",
          help: "Branches, roles, and larger workflows",
        },
      ],
      problems: [
        { value: "shipment-organization", label: "Shipment organization" },
        { value: "dispatch", label: "Courier assignment" },
        { value: "cod", label: "COD collection" },
        { value: "tracking", label: "Shipment tracking" },
        { value: "returns", label: "Returns" },
        { value: "reports", label: "Reports" },
        { value: "fraud", label: "Reducing fake orders" },
      ],
    },
    validation: {
      name: "Enter your name so we know who to contact.",
      company: "Enter the company or store name.",
      phone: "Enter a valid Egyptian mobile number. Example: 01012345678.",
      email: "Enter a valid email address or leave this field empty.",
      businessType: "Select a business type.",
      monthlyVolume: "Select monthly shipment volume.",
      general: "Review the highlighted fields before sending the request.",
    },
    states: {
      loading: "Sending request...",
      successTitle: "Demo request recorded",
      successText:
        "We will review your operating volume and selected plan, then follow up with the right demo steps.",
      successSteps: [
        "We received your request",
        "We will review the operating volume",
        "We will contact you to define the right demo path",
        "We will show shipment and collection flow inside Trackora",
      ],
      sendAnother: "Send another request",
      errorTitle: "Request was not sent",
    },
    next: {
      title: "What happens after you send the request?",
      steps: [
        "We review your current operating volume",
        "We identify the right plan or pricing path",
        "We show the shipment and COD workflow",
        "We explain the first operating steps",
      ],
    },
    trust: {
      title: "Start from your current workflow, not a perfect process on paper",
      lead: "We shape the demo around how your team works today so you can see where Trackora fits without interrupting operations.",
      items: [
        {
          title: "No need to change your system on day one",
          text: "Start with one clear part of the operation, then move more work gradually.",
        },
        {
          title: "Works for a small operations team",
          text: "Begin with one dispatcher, a few couriers, or one merchant.",
        },
        {
          title: "Scales with branches and couriers",
          text: "Add branches, zones, roles, and couriers as the operation grows.",
        },
        {
          title: "Supports tracking and COD collection improvement",
          text: "Shipment status and COD wallet activity live in one reviewable record.",
        },
      ],
    },
    faq: {
      title: "Questions before booking the demo",
      lead: "Short answers to help you know what to prepare before the meeting.",
      items: [
        {
          question: "Is the demo free?",
          answer:
            "Yes. The demo is free and tailored to understand your operation size, current problems, and best-fit plan.",
        },
        {
          question: "Do I need to prepare data before the meeting?",
          answer:
            "Not required. A sample shipment, order file, or current COD settlement method can make the demo more specific.",
        },
        {
          question: "Can we try Trackora on only part of the operation?",
          answer:
            "Yes. You can start with a small team, one zone, or one merchant before expanding usage.",
        },
        {
          question: "Does it fit multi-branch shipping companies?",
          answer:
            "Yes. Custom pricing supports branches, zones, permissions, and courier teams based on scope.",
        },
        {
          question: "Can it connect later with my website or system?",
          answer:
            "Integrations can be discussed later based on your current system, required data, and operating priority.",
        },
        {
          question: "What happens after sending the request?",
          answer:
            "We review the details, identify the right plan or pricing path, then contact you to schedule the demo.",
        },
      ],
    },
    finalCta: {
      title: "Ready to see Trackora on real operations?",
      lead: "Start with a demo request based on your shipment volume, dispatch, couriers, and COD collection process.",
      cta: "Book a demo",
    },
  },
} as const;

const copy = computed(() => (isArabic.value ? pageCopy.ar : pageCopy.en));
const selectedPlanFromQuery = computed<PlanValue | null>(() => {
  const plan = Array.isArray(route.query.plan)
    ? route.query.plan[0]
    : route.query.plan;
  return plan === "starter" || plan === "growth" ? plan : null;
});
const planContext = computed(() => {
  const plan = selectedPlanFromQuery.value;
  return plan ? copy.value.planContext[plan] : copy.value.planContext.generic;
});

watchEffect(() => {
  setSeo(copy.value.seoTitle, copy.value.seoDescription, '/request-demo');
});

watch(
  selectedPlanFromQuery,
  (plan) => {
    if (plan) {
      form.plan = plan;
    }
  },
  { immediate: true },
);

function isValidEgyptianPhone(value: string) {
  const normalized = value.replace(/[\s()-]/g, "");
  return /^(?:\+?20|0)?1[0125]\d{8}$/.test(normalized);
}

function isValidEmail(value: string) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateField(key: FormKey) {
  errors[key] = "";

  if (key === "name" && !form.name) errors.name = copy.value.validation.name;
  if (key === "company" && !form.company)
    errors.company = copy.value.validation.company;
  if (key === "phone" && (!form.phone || !isValidEgyptianPhone(form.phone)))
    errors.phone = copy.value.validation.phone;
  if (key === "email" && !isValidEmail(form.email))
    errors.email = copy.value.validation.email;
  if (key === "businessType" && !form.businessType)
    errors.businessType = copy.value.validation.businessType;
  if (key === "monthlyVolume" && !form.monthlyVolume)
    errors.monthlyVolume = copy.value.validation.monthlyVolume;

  return !errors[key];
}

function validateForm() {
  const fields: FormKey[] = [
    "name",
    "company",
    "phone",
    "email",
    "businessType",
    "monthlyVolume",
  ];
  return fields.reduce(
    (isValid, field) => validateField(field) && isValid,
    true,
  );
}

async function handleSubmit() {
  submitError.value = "";
  success.value = false;

  if (!validateForm()) {
    submitError.value = copy.value.validation.general;
    await nextTick();
    formEl.value?.querySelector<HTMLElement>(".is-invalid")?.focus();
    return;
  }

  loading.value = true;

  try {
    const payload = {
      ...form,
      locale: locale.value,
      queryPlan: selectedPlanFromQuery.value,
      submittedAt: new Date().toISOString(),
    };

    if (import.meta.dev) {
      console.info("Trackora demo request placeholder payload:", payload);
    }

    await new Promise((resolve) => window.setTimeout(resolve, 900));
    success.value = true;
    await nextTick();
    successEl.value?.focus({ preventScroll: true });
    successEl.value?.scrollIntoView({
      behavior: getScrollBehavior(),
      block: "center",
    });
  } catch (error) {
    submitError.value =
      error instanceof Error ? error.message : copy.value.validation.general;
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  form.name = "";
  form.company = "";
  form.phone = "";
  form.email = "";
  form.businessType = "";
  form.monthlyVolume = "";
  form.plan = selectedPlanFromQuery.value ?? "scale";
  form.problems = [];
  form.message = "";
  success.value = false;
  submitError.value = "";
  (Object.keys(errors) as FormKey[]).forEach((key) => {
    errors[key] = "";
  });
}

async function focusForm() {
  formEl.value?.scrollIntoView({
    behavior: getScrollBehavior(),
    block: "start",
  });
  await nextTick();
  formEl.value
    ?.querySelector<HTMLInputElement>("input, select, textarea, button")
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
.demo-page {
  --demo-primary: #1a3b66;
  --demo-primary-light: #3b5998;
  --demo-primary-dark: #0a1d34;
  --demo-accent: #ff6b6b;
  --demo-accent-dark: #b83232;
  --demo-surface: #f5f5f5;
  --demo-text: #333333;
  --demo-muted: #515a66;
  --demo-border: rgba(26, 59, 102, 0.16);
  --demo-shadow: 0 24px 80px rgba(26, 59, 102, 0.14);
  --demo-ease: cubic-bezier(0.22, 1, 0.36, 1);
  color: var(--demo-text);
  background:
    radial-gradient(
      circle at 6% 2%,
      rgba(255, 107, 107, 0.14),
      transparent 30rem
    ),
    linear-gradient(180deg, #ffffff 0%, #f7f9fc 42%, #ffffff 100%);
  overflow: hidden;
}

.demo-hero {
  position: relative;
  padding-block: clamp(5.5rem, 9vw, 9rem) clamp(4rem, 7vw, 7rem);
  background:
    radial-gradient(
      circle at 16% 12%,
      rgba(255, 107, 107, 0.2),
      transparent 20rem
    ),
    radial-gradient(
      circle at 82% 20%,
      rgba(59, 89, 152, 0.34),
      transparent 24rem
    ),
    linear-gradient(145deg, #0a1d34 0%, var(--demo-primary) 54%, #254c80 100%);
  color: #ffffff;
}

.demo-hero::after {
  content: "";
  position: absolute;
  inset: auto -12rem -12rem -12rem;
  height: 17rem;
  border-radius: 50% 50% 0 0;
  background: #ffffff;
}

.demo-hero__grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(24rem, 0.86fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
}

.demo-hero__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-6);
}

.demo-hero__copy h1 {
  max-width: 13ch;
  color: #ffffff;
  font-size: clamp(2.8rem, 7vw, 5.5rem);
  line-height: 1.08;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.demo-hero__lead {
  max-width: 58ch;
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  line-height: 1.9;
  text-wrap: pretty;
}

.plan-context {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  /* border: 1px solid rgba(255, 255, 255, 0.2); */
  border-radius: var(--radius-2xl);
  padding: var(--spacing-4) var(--spacing-5);
}

.plan-context span {
  width: fit-content;
  border-radius: var(--radius-full);
  padding: 0.32rem 0.85rem;
  background: #ffffff;
  color: var(--demo-primary);
  font-size: var(--text-sm);
  font-weight: 800;
}

.plan-context p {
  max-width: 52ch;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.75;
}

.plan-context--panel {
  border-color: rgba(26, 59, 102, 0.14);
  background: rgba(26, 59, 102, 0.05);
}

.plan-context--panel span {
  background: var(--demo-primary);
  color: #ffffff;
}

.plan-context--panel p {
  color: var(--demo-muted);
}

.audience-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
}

.audience-list li {
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: var(--radius-full);
  padding: 0.7rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-weight: 800;
}

.demo-btn {
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  border: 0;
  border-radius: var(--radius-full);
  padding: 0.85rem 1.5rem;
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 220ms var(--demo-ease),
    box-shadow 220ms var(--demo-ease),
    background 220ms var(--demo-ease);
}

.demo-btn:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
summary:focus-visible,
.demo-btn--ghost:focus-visible,
.form-alert button:focus-visible {
  outline: 3px solid var(--demo-accent);
  outline-offset: 3px;
}

.demo-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.demo-btn:disabled {
  cursor: wait;
  opacity: 0.76;
}

.demo-btn--accent {
  background: var(--demo-accent);
  color: #1a1111;
  box-shadow: 0 16px 38px rgba(255, 107, 107, 0.28);
}

.demo-btn--accent:hover:not(:disabled) {
  background: #ff7c7c;
}

.demo-btn--primary {
  background: linear-gradient(
    135deg,
    var(--demo-primary),
    var(--demo-primary-light)
  );
  color: #ffffff;
  box-shadow: 0 14px 32px rgba(26, 59, 102, 0.28);
}

.demo-btn--ghost {
  border: 1px solid rgba(26, 59, 102, 0.18);
  background: #ffffff;
  color: var(--demo-primary);
}

.demo-btn--ghost:hover {
  border-color: rgba(26, 59, 102, 0.32);
  background: rgba(26, 59, 102, 0.05);
}

.operations-panel {
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-4xl);
  padding: clamp(1.25rem, 3vw, 2rem);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 34px 90px rgba(0, 0, 0, 0.24);
}

.ledger-preview {
  display: grid;
  gap: var(--spacing-5);
}

.ledger-preview__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  padding-block-end: var(--spacing-4);
}

.ledger-preview__header span {
  color: rgba(255, 255, 255, 0.78);
  font-weight: 700;
}

.ledger-preview__header strong {
  border-radius: var(--radius-full);
  padding: 0.4rem 0.8rem;
  background: rgba(232, 168, 56, 0.18);
  color: #ffe5a3;
}

.ledger-card {
  display: grid;
  gap: var(--spacing-5);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-3xl);
  padding: clamp(1rem, 3vw, 1.5rem);
  background: rgba(10, 29, 52, 0.46);
}

.ledger-card__topline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
}

.ledger-card__topline span {
  color: rgba(255, 255, 255, 0.76);
  font-weight: 700;
}

.ledger-card__topline strong {
  color: #ffffff;
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  letter-spacing: 0.02em;
  direction: ltr;
  unicode-bidi: isolate;
}

.ledger-fields {
  display: grid;
  gap: var(--spacing-3);
}

.ledger-field {
  display: grid;
  grid-template-columns: minmax(6.5rem, 0.42fr) minmax(0, 1fr);
  gap: var(--spacing-3);
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-4);
  background: rgba(255, 255, 255, 0.08);
}

.ledger-field dt {
  color: rgba(255, 255, 255, 0.68);
  font-weight: 700;
}

.ledger-field dd {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  color: #ffffff;
  font-weight: 800;
  line-height: 1.6;
}

.ledger-field dd span {
  width: 0.6rem;
  height: 0.6rem;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #2d6e7d;
  box-shadow: 0 0 0 5px rgba(45, 110, 125, 0.22);
}

.ledger-field--gold dd span {
  background: #e8a838;
  box-shadow: 0 0 0 5px rgba(232, 168, 56, 0.24);
}

.ledger-field--red dd span {
  background: var(--demo-accent);
  box-shadow: 0 0 0 5px rgba(255, 107, 107, 0.22);
}

.ledger-timeline {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--spacing-2);
}

.ledger-timeline__step {
  position: relative;
  min-height: 2.6rem;
  border-radius: var(--radius-full);
  padding: 0.56rem 0.7rem;
  background: rgba(232, 168, 56, 0.14);
  color: #ffe5a3;
  text-align: center;
  font-size: var(--text-sm);
  font-weight: 800;
}

.demo-section {
  padding-block: clamp(4.5rem, 8vw, 7rem);
}

.demo-section--form {
  position: relative;
  z-index: 2;
}

.form-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 24rem);
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: start;
}

.demo-form,
.next-panel {
  border: 1px solid var(--demo-border);
  border-radius: var(--radius-4xl);
  background: #ffffff;
  box-shadow: var(--demo-shadow);
}

.demo-form {
  display: grid;
  gap: var(--spacing-8);
  padding: clamp(1.25rem, 4vw, 2.5rem);
}

.demo-form__body {
  display: grid;
  gap: clamp(1.5rem, 4vw, 2.25rem);
}

.demo-form__header {
  display: grid;
  gap: var(--spacing-3);
}

.demo-form__header p {
  width: fit-content;
  border-radius: var(--radius-full);
  padding: 0.4rem 0.9rem;
  background: rgba(255, 107, 107, 0.12);
  color: var(--demo-accent-dark);
  font-weight: 800;
}

.demo-form__header h2,
.trust-layout h2,
.faq-heading h2,
.final-demo-cta h2 {
  color: var(--demo-primary-dark);
  font-size: clamp(2rem, 4vw, 3.2rem);
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.demo-form__header span,
.demo-form__footer p,
.field-help,
.trust-layout > div p,
.faq-heading p,
.final-demo-cta p {
  color: var(--demo-muted);
  line-height: 1.8;
}

.form-group {
  display: grid;
  gap: var(--spacing-5);
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: var(--radius-3xl);
  padding: clamp(1rem, 3vw, 1.5rem);
  background: linear-gradient(
    180deg,
    rgba(247, 249, 252, 0.72),
    rgba(255, 255, 255, 0)
  );
}

.form-group legend {
  padding-inline: var(--spacing-2);
  font-size: var(--text-xl);
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-5);
}

.field,
.choice-field {
  display: grid;
  gap: var(--spacing-2);
}

.field--full {
  grid-column: 1 / -1;
}

label,
legend {
  color: var(--demo-primary-dark);
  font-weight: 800;
}

label span,
label small,
.choice-label small {
  color: var(--demo-accent-dark);
}

label small,
.choice-label small {
  margin-inline-start: var(--spacing-2);
  font-size: var(--text-sm);
  font-weight: 800;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid rgba(26, 59, 102, 0.2);
  border-radius: var(--radius-xl);
  padding: 0.9rem 1rem;
  background: #ffffff;
  color: var(--demo-text);
  font: inherit;
  transition:
    border-color 180ms var(--demo-ease),
    box-shadow 180ms var(--demo-ease),
    background 180ms var(--demo-ease);
}

textarea {
  resize: vertical;
}

input::placeholder,
textarea::placeholder {
  color: #616a76;
  opacity: 1;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--demo-primary-light);
  box-shadow: 0 0 0 4px rgba(59, 89, 152, 0.14);
}

.is-invalid {
  border-color: #c62828;
  background: #fff8f8;
}

.field-error {
  color: #b42318;
  font-weight: 700;
  line-height: 1.6;
}

.choice-field {
  border: 0;
  padding: 0;
}

.choice-label {
  color: var(--demo-primary-dark);
  font-weight: 800;
}

.choice-field--compact {
  gap: var(--spacing-3);
}

.plan-switch {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-2);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-2);
  background: rgba(26, 59, 102, 0.06);
}

.choice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  gap: var(--spacing-3);
}

.choice-card,
.problem-chip {
  position: relative;
  cursor: pointer;
}

.choice-card {
  display: grid;
  gap: var(--spacing-2);
  border: 1px solid rgba(26, 59, 102, 0.16);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-4);
  background: var(--demo-surface);
  transition:
    border-color 180ms var(--demo-ease),
    transform 180ms var(--demo-ease),
    background 180ms var(--demo-ease);
}

.choice-card--compact {
  min-height: 2.75rem;
  align-items: center;
  border-radius: var(--radius-full);
  padding: 0.62rem 1rem;
  background: #ffffff;
}

.choice-card:hover,
.problem-chip:hover {
  transform: translateY(-1px);
}

.choice-card:focus-within,
.problem-chip:focus-within {
  outline: 3px solid var(--demo-accent);
  outline-offset: 3px;
}

.choice-card input,
.problem-chip input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.choice-card span,
.problem-chip span {
  color: var(--demo-primary-dark);
  font-weight: 800;
}

.choice-card small {
  color: var(--demo-muted);
  line-height: 1.6;
}

.choice-card.is-selected,
.problem-chip.is-selected {
  border-color: var(--demo-primary-light);
  background: rgba(59, 89, 152, 0.09);
  box-shadow: 0 10px 28px rgba(26, 59, 102, 0.1);
}

.problem-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
}

.problem-chip {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  border: 1px solid rgba(26, 59, 102, 0.16);
  border-radius: var(--radius-full);
  padding: 0.62rem 1rem;
  background: #ffffff;
  transition:
    border-color 180ms var(--demo-ease),
    transform 180ms var(--demo-ease),
    background 180ms var(--demo-ease);
}

.demo-form__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-4);
  border-top: 1px solid rgba(26, 59, 102, 0.12);
  padding-block-start: var(--spacing-6);
}

.demo-form__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
}

.demo-form__footer p {
  max-width: 44ch;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.38);
  border-block-start-color: #ffffff;
  border-radius: 50%;
  animation: spin 700ms linear infinite;
}

.form-alert {
  display: grid;
  gap: var(--spacing-2);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-5);
}

.form-alert strong {
  font-size: var(--text-xl);
}

.form-alert--success {
  border: 1px solid rgba(45, 110, 125, 0.26);
  background: linear-gradient(
    135deg,
    rgba(45, 110, 125, 0.12),
    rgba(232, 168, 56, 0.14)
  );
  color: #123e31;
}

.form-alert--error {
  border: 1px solid rgba(198, 40, 40, 0.24);
  background: #fff4f4;
  color: #8a1f1f;
}

.form-alert button {
  width: fit-content;
  border: 0;
  border-radius: var(--radius-full);
  padding: 0.6rem 1rem;
  background: #14532d;
  color: #ffffff;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
}

.success-steps {
  display: grid;
  gap: var(--spacing-2);
  margin-block: var(--spacing-2);
  list-style: decimal;
  padding-inline-start: 1.4rem;
}

.success-steps li {
  color: #123e31;
  font-weight: 700;
  line-height: 1.7;
}

.next-panel {
  position: sticky;
  top: 6rem;
  display: grid;
  gap: var(--spacing-6);
  padding: clamp(1.25rem, 3vw, 2rem);
}

.next-panel h2 {
  color: var(--demo-primary-dark);
  font-size: clamp(1.6rem, 3vw, 2.25rem);
}

.next-steps {
  display: grid;
  gap: var(--spacing-4);
  list-style: none;
}

.next-steps li {
  display: grid;
  grid-template-columns: 1.2rem minmax(0, 1fr);
  gap: var(--spacing-3);
  align-items: start;
}

.next-steps li span {
  width: 0.9rem;
  height: 0.9rem;
  margin-block-start: 0.55rem;
  border-radius: 50%;
  background: var(--demo-accent);
  box-shadow: 0 0 0 6px rgba(255, 107, 107, 0.14);
}

.next-steps p {
  color: var(--demo-text);
  font-weight: 700;
  line-height: 1.75;
}

.trust-section {
  background: var(--demo-surface);
}

.trust-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: start;
}

.trust-layout > div {
  display: grid;
  gap: var(--spacing-4);
}

.trust-list {
  display: grid;
  gap: var(--spacing-4);
}

.trust-list li {
  display: grid;
  gap: var(--spacing-2);
  border: 1px solid rgba(26, 59, 102, 0.14);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-5);
  background: #ffffff;
}

.trust-list strong {
  color: var(--demo-primary-dark);
  font-size: var(--text-lg);
}

.trust-list span {
  color: var(--demo-muted);
  line-height: 1.75;
}

.faq-heading {
  display: grid;
  gap: var(--spacing-3);
  margin-block-end: var(--spacing-8);
  text-align: center;
}

.faq-heading p {
  max-width: 56ch;
  margin-inline: auto;
}

.faq-list {
  display: grid;
  gap: var(--spacing-3);
}

.faq-list details {
  border: 1px solid rgba(26, 59, 102, 0.14);
  border-radius: var(--radius-2xl);
  background: #ffffff;
  box-shadow: var(--shadow-sm);
}

.faq-list summary {
  min-height: 3.25rem;
  padding: var(--spacing-5);
  color: var(--demo-primary-dark);
  font-weight: 800;
  cursor: pointer;
}

.faq-list p {
  padding: 0 var(--spacing-5) var(--spacing-5);
  color: var(--demo-muted);
  line-height: 1.85;
}

.final-demo-cta {
  padding-block: clamp(4rem, 7vw, 6rem);
  background: linear-gradient(
    145deg,
    #0a1d34 0%,
    var(--demo-primary) 58%,
    #254c80 100%
  );
  color: #ffffff;
}

.final-demo-cta__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-8);
}

.final-demo-cta h2 {
  color: #ffffff;
}

.final-demo-cta p {
  max-width: 62ch;
  margin-block-start: var(--spacing-3);
  color: rgba(255, 255, 255, 0.84);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 68rem) {
  .demo-hero__grid,
  .form-layout,
  .trust-layout {
    grid-template-columns: 1fr;
  }

  .next-panel {
    position: static;
  }
}

@media (max-width: 44rem) {
  .demo-hero {
    padding-block-start: 4.75rem;
  }

  .demo-hero__copy h1 {
    max-width: 12ch;
    font-size: clamp(2.35rem, 12vw, 3.4rem);
  }

  .field-grid,
  .choice-grid {
    grid-template-columns: 1fr;
  }

  .demo-form,
  .next-panel {
    border-radius: var(--radius-3xl);
  }

  .demo-form__footer,
  .final-demo-cta__inner {
    align-items: stretch;
    flex-direction: column;
  }

  .demo-form__footer .demo-btn,
  .final-demo-cta .demo-btn {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
  }

  .demo-btn,
  .choice-card,
  .problem-chip,
  input,
  select,
  textarea {
    transition: none;
  }
}
</style>
