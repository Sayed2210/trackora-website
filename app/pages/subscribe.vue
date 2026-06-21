<template>
  <div class="subscribe-page" :dir="isArabic ? 'rtl' : 'ltr'">
    <section class="subscribe-hero" aria-labelledby="subscribe-heading">
      <AppContainer>
        <div class="subscribe-hero__grid">
          <div class="subscribe-hero__copy">
            <div class="plan-context" aria-live="polite">
              <span>{{ planContext.badge }}</span>
              <p>{{ planContext.text }}</p>
            </div>
            <h1 id="subscribe-heading">{{ copy.hero.title }}</h1>
            <p class="subscribe-hero__lead">{{ copy.hero.lead }}</p>
            <div class="subscribe-hero__actions">
              <a
                class="subscribe-btn subscribe-btn--primary"
                href="#subscribe-form"
                @click="focusForm"
              >
                {{ copy.hero.primaryCta }}
              </a>
              <NuxtLink
                class="subscribe-btn subscribe-btn--secondary"
                :to="localePath('/pricing')"
              >
                {{ copy.hero.secondaryCta }}
              </NuxtLink>
            </div>
          </div>

          <aside class="onboarding-ledger" :aria-label="copy.hero.panelLabel">
            <div class="onboarding-ledger__top">
              <span>{{ copy.hero.panelTitle }}</span>
              <strong>{{ copy.hero.panelStatus }}</strong>
            </div>
            <ol class="onboarding-ledger__steps">
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

    <section class="subscribe-form-section" aria-labelledby="form-heading">
      <AppContainer>
        <div class="form-shell">
          <form
            id="subscribe-form"
            ref="formEl"
            class="subscribe-form"
            :class="{ 'subscribe-form--success': success }"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <div class="subscribe-form__header">
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
              <div class="success-redirect">
                <a
                  v-if="dashboardTarget"
                  class="form-alert__link form-alert__link--solid"
                  :href="dashboardTarget"
                >
                  {{ copy.states.goToDashboard }}
                </a>
                <p v-else class="success-redirect__note">
                  {{ copy.states.dashboardNotConfigured }}
                </p>
                <span class="success-redirect__hint">
                  {{ copy.states.redirectingNow }}
                </span>
              </div>
            </div>

            <div
              v-if="!success && submitError"
              class="form-alert form-alert--error"
              role="alert"
            >
              <strong>{{ errorTitle }}</strong>
              <span>{{ submitError }}</span>
              <p v-if="errorCode === 'conflict'" class="form-alert__hint">
                {{ copy.states.conflictHint }}
              </p>
            </div>

            <div v-if="!success" class="subscribe-form__body">
              <fieldset class="form-group">
                <legend>{{ copy.groups.plan }}</legend>
                <div class="field">
                  <label for="subscribe-plan">
                    {{ copy.fields.plan.label }}
                    <span>{{ copy.form.required }}</span>
                  </label>
                  <select
                    v-if="plansData && plansData.length > 0"
                    id="subscribe-plan"
                    v-model="form.planSlug"
                    :aria-invalid="!!errors.planSlug"
                    :aria-describedby="errors.planSlug ? 'subscribe-plan-error' : 'subscribe-plan-help'"
                    :class="{ 'is-invalid': errors.planSlug }"
                    @blur="validateField('planSlug')"
                  >
                    <option value="">{{ copy.fields.plan.placeholder }}</option>
                    <option v-for="plan in plansData" :key="plan.id" :value="plan.slug">
                      {{ plan.name }}
                    </option>
                  </select>
                  <input
                    v-else-if="!plansLoading"
                    id="subscribe-plan"
                    v-model.trim="form.planSlug"
                    type="text"
                    :placeholder="copy.fields.plan.placeholder"
                    :aria-invalid="!!errors.planSlug"
                    :aria-describedby="errors.planSlug ? 'subscribe-plan-error' : 'subscribe-plan-help'"
                    :class="{ 'is-invalid': errors.planSlug }"
                    @blur="validateField('planSlug')"
                  />
                  <p v-else class="field-help">{{ copy.states.plansLoading }}</p>
                  <p id="subscribe-plan-help" class="field-help">{{ copy.fields.plan.help }}</p>
                  <p v-if="errors.planSlug" id="subscribe-plan-error" class="field-error">
                    {{ errors.planSlug }}
                  </p>
                </div>
              </fieldset>

              <fieldset class="form-group">
                <legend>{{ copy.groups.company }}</legend>
                <div class="field-grid">
                  <div class="field">
                    <label for="subscribe-company-name">
                      {{ copy.fields.companyName.label }}
                      <span>{{ copy.form.required }}</span>
                    </label>
                    <input
                      id="subscribe-company-name"
                      v-model.trim="form.companyName"
                      type="text"
                      autocomplete="organization"
                      maxlength="160"
                      :placeholder="copy.fields.companyName.placeholder"
                      :aria-invalid="!!errors.companyName"
                      :aria-describedby="errors.companyName ? 'subscribe-company-name-error' : undefined"
                      :class="{ 'is-invalid': errors.companyName }"
                      @blur="validateField('companyName')"
                    />
                    <p v-if="errors.companyName" id="subscribe-company-name-error" class="field-error">
                      {{ errors.companyName }}
                    </p>
                  </div>

                  <div class="field">
                    <label for="subscribe-company-slug">
                      {{ copy.fields.companySlug.label }}
                      <span>{{ copy.form.required }}</span>
                    </label>
                    <div class="slug-control">
                      <input
                        id="subscribe-company-slug"
                        v-model.trim="form.companySlug"
                        type="text"
                        dir="ltr"
                        autocomplete="off"
                        maxlength="80"
                        :placeholder="copy.fields.companySlug.placeholder"
                        :aria-invalid="!!errors.companySlug"
                        :aria-describedby="errors.companySlug ? 'subscribe-company-slug-error' : 'subscribe-company-slug-help'"
                        :class="{ 'is-invalid': errors.companySlug }"
                        @input="onSlugInput"
                        @blur="validateField('companySlug')"
                      />
                      <button
                        v-if="slugTouched"
                        type="button"
                        class="slug-reset"
                        :title="copy.fields.companySlug.reset"
                        :aria-label="copy.fields.companySlug.reset"
                        @click="resetSlugAuto"
                      >
                        {{ copy.fields.companySlug.resetLabel }}
                      </button>
                    </div>
                    <p id="subscribe-company-slug-help" class="field-help">
                      {{ copy.fields.companySlug.help }}
                    </p>
                    <p v-if="errors.companySlug" id="subscribe-company-slug-error" class="field-error">
                      {{ errors.companySlug }}
                    </p>
                  </div>

                  <div class="field field--full">
                    <label for="subscribe-business-type">
                      {{ copy.fields.businessType.label }}
                      <span>{{ copy.form.required }}</span>
                    </label>
                    <select
                      id="subscribe-business-type"
                      v-model="form.businessType"
                      :aria-invalid="!!errors.businessType"
                      :aria-describedby="errors.businessType ? 'subscribe-business-type-error' : undefined"
                      :class="{ 'is-invalid': errors.businessType }"
                      @blur="validateField('businessType')"
                    >
                      <option value="">{{ copy.fields.businessType.placeholder }}</option>
                      <option
                        v-for="option in copy.options.businessTypes"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                    <p v-if="errors.businessType" id="subscribe-business-type-error" class="field-error">
                      {{ errors.businessType }}
                    </p>
                  </div>
                </div>
              </fieldset>

              <fieldset class="form-group">
                <legend>{{ copy.groups.owner }}</legend>
                <div class="field-grid">
                  <div class="field">
                    <label for="subscribe-owner-name">
                      {{ copy.fields.ownerName.label }}
                      <span>{{ copy.form.required }}</span>
                    </label>
                    <input
                      id="subscribe-owner-name"
                      v-model.trim="form.ownerName"
                      type="text"
                      autocomplete="name"
                      maxlength="120"
                      :placeholder="copy.fields.ownerName.placeholder"
                      :aria-invalid="!!errors.ownerName"
                      :aria-describedby="errors.ownerName ? 'subscribe-owner-name-error' : undefined"
                      :class="{ 'is-invalid': errors.ownerName }"
                      @blur="validateField('ownerName')"
                    />
                    <p v-if="errors.ownerName" id="subscribe-owner-name-error" class="field-error">
                      {{ errors.ownerName }}
                    </p>
                  </div>

                  <div class="field">
                    <label for="subscribe-owner-phone">
                      {{ copy.fields.ownerPhone.label }}
                      <span>{{ copy.form.required }}</span>
                    </label>
                    <input
                      id="subscribe-owner-phone"
                      v-model.trim="form.ownerPhone"
                      type="tel"
                      inputmode="tel"
                      autocomplete="tel"
                      maxlength="20"
                      :placeholder="copy.fields.ownerPhone.placeholder"
                      :aria-invalid="!!errors.ownerPhone"
                      :aria-describedby="errors.ownerPhone ? 'subscribe-owner-phone-error' : 'subscribe-owner-phone-help'"
                      :class="{ 'is-invalid': errors.ownerPhone }"
                      @blur="validateField('ownerPhone')"
                    />
                    <p id="subscribe-owner-phone-help" class="field-help">
                      {{ copy.fields.ownerPhone.help }}
                    </p>
                    <p v-if="errors.ownerPhone" id="subscribe-owner-phone-error" class="field-error">
                      {{ errors.ownerPhone }}
                    </p>
                  </div>

                  <div class="field">
                    <label for="subscribe-owner-email">
                      {{ copy.fields.ownerEmail.label }}
                      <small>{{ copy.form.optional }}</small>
                    </label>
                    <input
                      id="subscribe-owner-email"
                      v-model.trim="form.ownerEmail"
                      type="email"
                      autocomplete="email"
                      maxlength="160"
                      :placeholder="copy.fields.ownerEmail.placeholder"
                      :aria-invalid="!!errors.ownerEmail"
                      :aria-describedby="errors.ownerEmail ? 'subscribe-owner-email-error' : undefined"
                      :class="{ 'is-invalid': errors.ownerEmail }"
                      @blur="validateField('ownerEmail')"
                    />
                    <p v-if="errors.ownerEmail" id="subscribe-owner-email-error" class="field-error">
                      {{ errors.ownerEmail }}
                    </p>
                  </div>

                  <div class="field">
                    <label for="subscribe-owner-password">
                      {{ copy.fields.ownerPassword.label }}
                      <span>{{ copy.form.required }}</span>
                    </label>
                    <div class="password-control">
                      <input
                        id="subscribe-owner-password"
                        v-model.trim="form.ownerPassword"
                        :type="showPassword ? 'text' : 'password'"
                        autocomplete="new-password"
                        maxlength="100"
                        :placeholder="copy.fields.ownerPassword.placeholder"
                        :aria-invalid="!!errors.ownerPassword"
                        :aria-describedby="errors.ownerPassword ? 'subscribe-owner-password-error' : 'subscribe-owner-password-help'"
                        :class="{ 'is-invalid': errors.ownerPassword }"
                        @blur="validateField('ownerPassword')"
                      />
                      <button
                        type="button"
                        class="password-toggle"
                        :aria-label="showPassword ? copy.fields.ownerPassword.hide : copy.fields.ownerPassword.show"
                        :aria-pressed="showPassword"
                        @click="showPassword = !showPassword"
                      >
                        {{ showPassword ? copy.fields.ownerPassword.hide : copy.fields.ownerPassword.show }}
                      </button>
                    </div>
                    <p id="subscribe-owner-password-help" class="field-help">
                      {{ copy.fields.ownerPassword.help }}
                    </p>
                    <p v-if="errors.ownerPassword" id="subscribe-owner-password-error" class="field-error">
                      {{ errors.ownerPassword }}
                    </p>
                  </div>
                </div>
              </fieldset>

              <div class="field field--trap" aria-hidden="true">
                <label for="subscribe-website">Website</label>
                <input
                  id="subscribe-website"
                  v-model="form.website"
                  name="website"
                  type="text"
                  tabindex="-1"
                  autocomplete="off"
                />
              </div>

              <div class="subscribe-form__footer">
                <button
                  class="subscribe-btn subscribe-btn--submit"
                  type="submit"
                  :disabled="loading"
                >
                  <span v-if="loading" class="spinner" aria-hidden="true"></span>
                  {{ loading ? copy.states.loading : copy.form.submit }}
                </button>
                <NuxtLink class="subscribe-btn subscribe-btn--ghost" :to="localePath('/pricing')">
                  {{ copy.form.backToPricing }}
                </NuxtLink>
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
  </div>
</template>

<script setup lang="ts">
import type { SubscribeFieldErrors, SubscribePayload } from '~/composables/useSubscribeService'

type FormKey = keyof SubscribeFieldErrors

const { locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { setSeo } = useLocaleSeo()
const config = useRuntimeConfig()

const {
  loading,
  success,
  error: subscribeError,
  errorCode,
  fieldErrors: serverFieldErrors,
  submit: submitSubscribe,
} = useSubscribeService()

const { saveSession } = useAuthStorage()

const {
  loading: plansLoading,
  data: plansData,
  fetchPlans,
} = usePublicPlansService()

const isArabic = computed(() => locale.value === 'ar')
const formEl = ref<HTMLFormElement | null>(null)
const successEl = ref<HTMLElement | null>(null)
const submitError = ref('')
const showPassword = ref(false)
const slugTouched = ref(false)
let redirectTimeout: ReturnType<typeof setTimeout> | null = null

const form = reactive({
  planSlug: '',
  companyName: '',
  companySlug: '',
  businessType: '',
  ownerName: '',
  ownerPhone: '',
  ownerEmail: '',
  ownerPassword: '',
  website: '',
})

const errors = reactive<SubscribeFieldErrors>({
  companyName: '',
  companySlug: '',
  businessType: '',
  ownerName: '',
  ownerPhone: '',
  ownerPassword: '',
  ownerEmail: '',
  planSlug: '',
})

const pageCopy = {
  ar: {
    seoTitle: 'اشترك في Trackora | ابدأ تجربتك',
    seoDescription:
      'أنشئ حساب شركة على Trackora وابدأ إدارة الشحنات، الديسباتش، المناديب، التتبع، ومحفظة COD خلال دقائق.',
    hero: {
      title: 'ابدأ تشغيل Trackora لشركتك',
      lead: 'أنشئ حساب المالك والشركة، اختر الخطة، وادخل مباشرة إلى لوحة التشغيل لبدء تنظيم الشحنات والتحصيل.',
      primaryCta: 'انتقل إلى نموذج الاشتراك',
      secondaryCta: 'العودة للأسعار',
      panelLabel: 'خطوات تفعيل حساب Trackora',
      panelTitle: 'مسار الاشتراك',
      panelStatus: 'تفعيل فوري',
      steps: [
        { marker: '1', title: 'بيانات الشركة', text: 'اسم الشركة، المعرّف الفريد، ونوع النشاط.' },
        { marker: '2', title: 'بيانات المالك', text: 'اسم المسؤول، رقم الموبايل، وكلمة المرور.' },
        { marker: '3', title: 'اختيار الخطة', text: 'اربط الاشتراك بالخطة المناسبة لحجم التشغيل.' },
        { marker: '4', title: 'دخول اللوحة', text: 'تصدر بيانات الدخول وتنتقل مباشرة إلى لوحة التشغيل.' },
      ],
    },
    planContext: {
      badge: 'جارٍ الاشتراك',
      text: 'املأ بيانات الشركة والمالك، وسنفعّل الحساب وأنتقل بك إلى لوحة Trackora.',
    },
    form: {
      title: 'بيانات إنشاء حساب الشركة',
      requiredNote: 'الحقول المطلوبة موضحة بعلامة *. سنستخدم هذه البيانات لإنشاء حسابك فقط.',
      required: '*',
      optional: 'اختياري',
      submit: 'إنشاء الحساب وبدء التشغيل',
      backToPricing: 'العودة للأسعار',
      privacy: 'تُرسل بيانات الاشتراك إلى خادم Trackora الرسمي عبر اتصال آمن لإنشاء حسابك.',
    },
    groups: {
      plan: 'الخطة',
      company: 'بيانات الشركة',
      owner: 'بيانات المالك',
    },
    fields: {
      plan: {
        label: 'الخطة',
        placeholder: 'اختر الخطة',
        help: 'يمكنك تغيير الخطة لاحقاً مع نمو حجم التشغيل.',
      },
      companyName: {
        label: 'اسم الشركة / المتجر',
        placeholder: 'مثال: شركة القاهرة للشحن',
      },
      companySlug: {
        label: 'معرّف الشركة',
        placeholder: 'cairo-express',
        help: 'يُولّد تلقائياً من اسم الشركة ويمكنك تعديله. يُستخدم في رابط لوحتك.',
        reset: 'إعادة التوليد التلقائي',
        resetLabel: 'تلقائي',
      },
      businessType: {
        label: 'نوع النشاط',
        placeholder: 'اختر نوع النشاط',
      },
      ownerName: { label: 'اسم المسؤول', placeholder: 'مثال: أحمد حسن' },
      ownerPhone: {
        label: 'رقم موبايل المسؤول',
        placeholder: '01012345678',
        help: 'استخدم رقم موبايل مصري مثل 01012345678 أو +201012345678.',
      },
      ownerEmail: { label: 'البريد الإلكتروني', placeholder: 'name@company.com' },
      ownerPassword: {
        label: 'كلمة المرور',
        placeholder: '٨ أحرف على الأقل',
        help: '٨ أحرف على الأقل. احفظها في مكان آمن، ستحتاجها لتسجيل الدخول.',
        show: 'إظهار',
        hide: 'إخفاء',
      },
    },
    options: {
      businessTypes: [
        { value: 'E-commerce', label: 'متجر إلكتروني' },
        { value: 'Shipping Company', label: 'شركة شحن' },
        { value: 'Social Seller', label: 'سوشيال سيلر' },
        { value: 'Other', label: 'أخرى' },
      ],
    },
    validation: {
      planSlug: 'اختر الخطة.',
      companyName: 'اكتب اسم الشركة أو المتجر.',
      companySlug: 'اكتب معرّف الشركة بأحرف لاتينية وأرقام وشرطات فقط.',
      businessType: 'اختر نوع النشاط.',
      ownerName: 'اكتب اسم المسؤول.',
      ownerPhone: 'اكتب رقم موبايل مصري صحيح. مثال: 01012345678.',
      ownerPassword: 'كلمة المرور يجب أن تكون ٨ أحرف على الأقل.',
      ownerEmail: 'اكتب بريد إلكتروني صحيح أو اتركه فارغاً.',
      general: 'راجع الحقول الموضحة قبل إنشاء الحساب.',
    },
    states: {
      loading: 'جارٍ إنشاء الحساب...',
      plansLoading: 'جارٍ تحميل الخطط...',
      successTitle: 'تم إنشاء حسابك على Trackora',
      successText: 'تم تفعيل الاشتراك وستنتقل تلقائياً إلى لوحة التشغيل.',
      goToDashboard: 'ادخل إلى لوحة التحكم الآن',
      dashboardNotConfigured:
        'تم إنشاء الحساب بنجاح. يرجى تسجيل الدخول من رابط لوحة التحكم المخصص لشركتك.',
      redirectingNow: 'جارٍ التحويل إلى لوحة التحكم...',
      conflictHint:
        'قد يكون معرّف الشركة أو رقم الموبايل مستخدماً بالفعل. جرّب تغيير المعرّف أو رقم الموبايل.',
      errorTitle: 'تعذّر إنشاء الحساب',
      validationFailed: 'راجع الحقول الموضحة قبل إرسال الطلب.',
      conflict: 'هذه البيانات مسجّلة بالفعل. جرّب معرّف شركة أو رقم موبايل مختلف.',
      generic: 'حدث خطأ غير متوقع أثناء إنشاء الحساب. حاول مرة أخرى.',
      network: 'تعذّر الاتصال بالخادم. تأكد من الإنترنت ثم حاول مرة أخرى.',
      apiMissing: 'إعداد الخادم غير متوفر حالياً. حاول لاحقاً.',
    },
    next: {
      title: 'ماذا يحدث بعد الاشتراك؟',
      steps: [
        'ننشئ شركة وحساب مالك مرتبط بالخطة المختارة.',
        'نصدر بيانات الدخول للمسؤول.',
        'تنتقل مباشرة إلى لوحة تشغيل Trackora.',
        'تبدأ برفع الشحنات وتوزيع المناديب ومتابعة التحصيل.',
      ],
    },
    reassurance: {
      title: 'ابدأ من نقطة تشغيلك الحالية',
      lead: 'لن نطلب بيانات أكثر مما يلزم لتفعيل الحساب. بقية الإعدادات تتم داخل اللوحة بعد الدخول.',
      items: [
        'تفعيل فوري للحساب بمجرد إتمام الاشتراك.',
        'بيانات الدخول تُخزّن بأمان على جهازك.',
        'يمكنك تغيير الخطة لاحقاً مع نمو التشغيل.',
        'دعم تشغيل أولي داخل اللوحة بعد الدخول.',
      ],
    },
  },
  en: {
    seoTitle: 'Subscribe to Trackora | Start your trial',
    seoDescription:
      'Create your Trackora company and owner account and start managing shipments, dispatch, couriers, tracking, and COD within minutes.',
    hero: {
      title: 'Start running Trackora for your company',
      lead: 'Create the owner and company account, pick a plan, and go straight into the operating console to organize shipments and COD.',
      primaryCta: 'Go to subscribe form',
      secondaryCta: 'Back to pricing',
      panelLabel: 'Trackora account activation steps',
      panelTitle: 'Subscribe path',
      panelStatus: 'Instant activation',
      steps: [
        { marker: '1', title: 'Company details', text: 'Company name, unique slug, and business type.' },
        { marker: '2', title: 'Owner details', text: 'Owner name, mobile number, and password.' },
        { marker: '3', title: 'Plan selection', text: 'Link the subscription to the plan that fits your volume.' },
        { marker: '4', title: 'Console access', text: 'Credentials are issued and you go straight to the console.' },
      ],
    },
    planContext: {
      badge: 'Subscribing',
      text: 'Fill in the company and owner details, we will activate the account and take you to the Trackora console.',
    },
    form: {
      title: 'Company account creation details',
      requiredNote: 'Required fields are marked with *. We use these details only to create your account.',
      required: '*',
      optional: 'Optional',
      submit: 'Create account and start',
      backToPricing: 'Back to pricing',
      privacy: 'Subscribe details are sent to the official Trackora server over a secure connection to create your account.',
    },
    groups: {
      plan: 'Plan',
      company: 'Company details',
      owner: 'Owner details',
    },
    fields: {
      plan: {
        label: 'Plan',
        placeholder: 'Select a plan',
        help: 'You can change the plan later as your operation grows.',
      },
      companyName: {
        label: 'Company / store name',
        placeholder: 'Example: Cairo Express',
      },
      companySlug: {
        label: 'Company slug',
        placeholder: 'cairo-express',
        help: 'Auto-generated from the company name and editable. Used in your console URL.',
        reset: 'Resume auto-generation',
        resetLabel: 'Auto',
      },
      businessType: {
        label: 'Business type',
        placeholder: 'Select business type',
      },
      ownerName: { label: 'Owner name', placeholder: 'Example: Ahmed Ali' },
      ownerPhone: {
        label: 'Owner mobile number',
        placeholder: '01012345678',
        help: 'Use an Egyptian mobile number such as 01012345678 or +201012345678.',
      },
      ownerEmail: { label: 'Email address', placeholder: 'name@company.com' },
      ownerPassword: {
        label: 'Password',
        placeholder: 'At least 8 characters',
        help: 'At least 8 characters. Store it safely, you will need it to sign in.',
        show: 'Show',
        hide: 'Hide',
      },
    },
    options: {
      businessTypes: [
        { value: 'E-commerce', label: 'E-commerce store' },
        { value: 'Shipping Company', label: 'Shipping company' },
        { value: 'Social Seller', label: 'Social seller' },
        { value: 'Other', label: 'Other' },
      ],
    },
    validation: {
      planSlug: 'Select a plan.',
      companyName: 'Enter the company or store name.',
      companySlug: 'Use only latin letters, numbers, and hyphens for the company slug.',
      businessType: 'Select a business type.',
      ownerName: 'Enter the owner name.',
      ownerPhone: 'Enter a valid Egyptian mobile number. Example: 01012345678.',
      ownerPassword: 'Password must be at least 8 characters.',
      ownerEmail: 'Enter a valid email address or leave this field empty.',
      general: 'Review the highlighted fields before creating the account.',
    },
    states: {
      loading: 'Creating account...',
      plansLoading: 'Loading plans...',
      successTitle: 'Your Trackora account is ready',
      successText: 'The subscription is active and you will be redirected to the operating console.',
      goToDashboard: 'Go to the console now',
      dashboardNotConfigured:
        'Your account was created successfully. Please sign in from your dedicated console URL.',
      redirectingNow: 'Redirecting to the console...',
      conflictHint:
        'The company slug or mobile number may already be in use. Try changing the slug or phone number.',
      errorTitle: 'Account was not created',
      validationFailed: 'Review the highlighted fields before sending the request.',
      conflict: 'These details are already registered. Try a different company slug or phone number.',
      generic: 'An unexpected error occurred while creating the account. Try again.',
      network: 'Could not reach the server. Check your connection and try again.',
      apiMissing: 'Server configuration is unavailable right now. Try again later.',
    },
    next: {
      title: 'What happens after subscribing?',
      steps: [
        'We create a company and owner account linked to the selected plan.',
        'Owner credentials are issued.',
        'You go straight into the Trackora operating console.',
        'You start uploading shipments, assigning couriers, and reviewing COD.',
      ],
    },
    reassurance: {
      title: 'Start from your current operating point',
      lead: 'We only ask for what is needed to activate the account. The rest is configured inside the console after you sign in.',
      items: [
        'Instant account activation once you subscribe.',
        'Credentials are stored securely on your device.',
        'You can change the plan later as the operation grows.',
        'First-launch support is available inside the console.',
      ],
    },
  },
} as const

const copy = computed(() => (isArabic.value ? pageCopy.ar : pageCopy.en))
const planContext = computed(() => copy.value.planContext)

const selectedPlanFromQuery = computed<string | null>(() => {
  const plan = Array.isArray(route.query.plan) ? route.query.plan[0] : route.query.plan
  return typeof plan === 'string' && plan.trim() ? plan.trim() : null
})

const dashboardTarget = computed(() => {
  const explicit = (config.public.dashboardUrl as string) || ''
  if (explicit) return explicit
  const api = (config.public.apiBaseUrl as string) || ''
  if (api) {
    try {
      return new URL(api).origin
    } catch {
      return ''
    }
  }
  return ''
})

const errorTitle = computed(() => {
  const c = copy.value.states
  if (errorCode.value === 'conflict') return c.errorTitle
  if (errorCode.value === 'validation') return c.errorTitle
  if (errorCode.value === 'network') return c.errorTitle
  if (errorCode.value === 'generic') return c.errorTitle
  return c.errorTitle
})

watchEffect(() => {
  setSeo(copy.value.seoTitle, copy.value.seoDescription, '/subscribe')
})

watch(
  selectedPlanFromQuery,
  (plan) => {
    if (plan && !form.planSlug) {
      form.planSlug = plan
    }
  },
  { immediate: true },
)

watch(
  () => form.companyName,
  (name) => {
    if (!slugTouched.value) {
      form.companySlug = slugify(name)
    }
  },
)

onMounted(() => {
  fetchPlans()
  if (!form.planSlug && selectedPlanFromQuery.value) {
    form.planSlug = selectedPlanFromQuery.value
  }
})

onBeforeUnmount(() => {
  clearRedirectTimer()
})

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
}

function onSlugInput() {
  slugTouched.value = true
}

function resetSlugAuto() {
  slugTouched.value = false
  form.companySlug = slugify(form.companyName)
}

function isValidEgyptianPhone(value: string): boolean {
  const normalized = value.replace(/[\s()-]/g, '')
  return /^(?:\+?20|0)?1[0125]\d{8}$/.test(normalized)
}

function isValidEmail(value: string): boolean {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isValidSlug(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
}

function validateField(key: FormKey): boolean {
  errors[key] = ''
  const c = copy.value.validation
  if (key === 'planSlug' && !form.planSlug) errors.planSlug = c.planSlug
  if (key === 'companyName' && !form.companyName) errors.companyName = c.companyName
  if (key === 'companySlug' && (!form.companySlug || !isValidSlug(form.companySlug)))
    errors.companySlug = c.companySlug
  if (key === 'businessType' && !form.businessType) errors.businessType = c.businessType
  if (key === 'ownerName' && !form.ownerName) errors.ownerName = c.ownerName
  if (key === 'ownerPhone' && (!form.ownerPhone || !isValidEgyptianPhone(form.ownerPhone)))
    errors.ownerPhone = c.ownerPhone
  if (key === 'ownerPassword' && form.ownerPassword.length < 8) errors.ownerPassword = c.ownerPassword
  if (key === 'ownerEmail' && !isValidEmail(form.ownerEmail)) errors.ownerEmail = c.ownerEmail
  return !errors[key]
}

function validateForm(): boolean {
  const fields: FormKey[] = [
    'planSlug',
    'companyName',
    'companySlug',
    'businessType',
    'ownerName',
    'ownerPhone',
    'ownerPassword',
    'ownerEmail',
  ]
  return fields.reduce((isValid, field) => validateField(field) && isValid, true)
}

function applyServerFieldErrors() {
  const server = serverFieldErrors.value
  if (!server) return
  (Object.keys(server) as FormKey[]).forEach((key) => {
    if (server[key]) {
      errors[key] = server[key] as string
    }
  })
}

function buildPayload(): SubscribePayload {
  return {
    company: {
      name: form.companyName.trim(),
      slug: form.companySlug.trim(),
      businessType: form.businessType,
    },
    owner: {
      name: form.ownerName.trim(),
      phone: form.ownerPhone.trim(),
      password: form.ownerPassword,
      ...(form.ownerEmail.trim() ? { email: form.ownerEmail.trim() } : {}),
    },
    planSlug: form.planSlug,
  }
}

async function handleSubmit() {
  submitError.value = ''
  if (success.value) success.value = false

  if (!validateForm()) {
    submitError.value = copy.value.states.validationFailed
    await nextTick()
    formEl.value?.querySelector<HTMLElement>('.is-invalid')?.focus()
    return
  }

  const result = await submitSubscribe(buildPayload())

  if (!result) {
    const c = copy.value.states
    if (errorCode.value === 'conflict') {
      submitError.value = c.conflict
    } else if (errorCode.value === 'validation') {
      applyServerFieldErrors()
      submitError.value = subscribeError.value || c.validationFailed
    } else if (errorCode.value === 'network') {
      submitError.value = c.network
    } else if (errorCode.value === 'generic' && subscribeError.value === 'API configuration is missing.') {
      submitError.value = c.apiMissing
    } else {
      submitError.value = subscribeError.value || c.generic
    }
    await nextTick()
    formEl.value?.querySelector<HTMLElement>('.is-invalid')?.focus()
    return
  }

  saveSession({
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    expiresIn: typeof result.expiresIn === 'number' ? result.expiresIn : undefined,
    tenant: result.tenant,
    subscription: result.subscription,
    plan: result.plan,
    user: result.user,
  })

  await nextTick()
  successEl.value?.focus({ preventScroll: true })
  successEl.value?.scrollIntoView({ behavior: getScrollBehavior(), block: 'center' })

  startRedirect()
}

function startRedirect() {
  const target = dashboardTarget.value
  if (!target || typeof window === 'undefined') return

  redirectTimeout = setTimeout(() => {
    redirectTimeout = null
    window.location.href = target
  }, 1500)
}

function clearRedirectTimer() {
  if (redirectTimeout) {
    clearTimeout(redirectTimeout)
    redirectTimeout = null
  }
}

function getScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'auto'
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

async function focusForm(event?: Event) {
  if (event instanceof Event) event.preventDefault()
  formEl.value?.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' })
  await nextTick()
  formEl.value
    ?.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea, button')
    ?.focus({ preventScroll: true })
}
</script>

<style scoped>
.subscribe-page {
  --sub-primary: var(--color-primary);
  --sub-primary-light: var(--color-primary-light);
  --sub-primary-dark: var(--color-primary-dark);
  --sub-accent: var(--color-accent);
  --sub-surface: var(--color-bg-alt);
  --sub-text: var(--color-text);
  --sub-ink: var(--color-primary-dark);
  --sub-muted: var(--color-text-secondary);
  --sub-line: rgba(27, 77, 92, 0.14);
  --sub-shadow: var(--shadow-lg);
  --sub-ease: cubic-bezier(0.22, 1, 0.36, 1);
  color: var(--sub-text);
  background:
    radial-gradient(circle at 7% 4%, rgba(232, 168, 56, 0.12), transparent 27rem),
    linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-alt) 44%, var(--color-bg) 100%);
  overflow: hidden;
}

.subscribe-hero {
  padding-block: clamp(5rem, 8vw, 8.5rem) clamp(4rem, 7vw, 6.5rem);
  color: #ffffff;
  background:
    radial-gradient(circle at 16% 18%, rgba(232, 168, 56, 0.18), transparent 18rem),
    radial-gradient(circle at 86% 12%, rgba(255, 255, 255, 0.12), transparent 21rem),
    var(--gradient-hero);
}

.subscribe-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(24rem, 1.05fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.subscribe-hero__copy {
  display: grid;
  gap: 1.35rem;
  align-content: start;
}

.plan-context {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-4) var(--spacing-5);
  background: rgba(255, 255, 255, 0.1);
}

.plan-context span {
  width: fit-content;
  border-radius: var(--radius-full);
  padding: 0.32rem 0.85rem;
  background: var(--sub-accent);
  color: var(--color-text-on-accent);
  font-size: var(--text-sm);
  font-weight: 900;
}

.plan-context p {
  max-width: 52ch;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.75;
}

.plan-context--panel {
  border-color: rgba(26, 59, 102, 0.14);
  background: rgba(27, 77, 92, 0.05);
}

.plan-context--panel span {
  background: var(--sub-primary);
  color: #ffffff;
}

.plan-context--panel p {
  color: var(--sub-muted);
}

.subscribe-hero h1 {
  max-width: 14ch;
  color: #ffffff;
  font-size: clamp(2.6rem, 6vw, 4.8rem);
  line-height: 1.08;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.subscribe-hero__lead {
  max-width: 60ch;
  color: rgba(255, 255, 255, 0.86);
  font-size: clamp(1.05rem, 1.5vw, 1.22rem);
  line-height: 1.9;
  text-wrap: pretty;
}

.subscribe-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  align-items: center;
}

.subscribe-btn,
.form-alert button {
  min-height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  padding: 0.85rem 1.35rem;
  font-family: var(--font-heading);
  font-weight: 900;
  line-height: 1.3;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  transition:
    transform 220ms var(--sub-ease),
    box-shadow 220ms var(--sub-ease),
    background 220ms var(--sub-ease),
    border-color 220ms var(--sub-ease);
}

.subscribe-btn:focus-visible,
.form-alert button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
.slug-reset:focus-visible,
.password-toggle:focus-visible {
  outline: 3px solid var(--sub-accent);
  outline-offset: 3px;
}

.subscribe-btn--primary,
.subscribe-btn--submit {
  color: var(--color-text-on-accent);
  background: var(--sub-accent);
  box-shadow: 0 16px 36px rgba(232, 168, 56, 0.3);
}

.subscribe-btn--secondary {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.1);
}

.subscribe-btn--ghost {
  background: #ffffff;
  color: var(--sub-primary);
  border-color: rgba(27, 77, 92, 0.18);
}

.subscribe-btn:hover:not(:disabled),
.form-alert button:hover {
  transform: translateY(-2px);
}

.subscribe-btn:disabled {
  cursor: wait;
  opacity: 0.72;
}

.onboarding-ledger {
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 2rem;
  overflow: hidden;
  background: rgba(7, 20, 36, 0.72);
  box-shadow: 0 32px 100px rgba(0, 0, 0, 0.28);
}

.onboarding-ledger__top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.15rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.76);
}

.onboarding-ledger__top strong {
  border-radius: var(--radius-full);
  padding: 0.28rem 0.75rem;
  color: var(--color-accent-light);
  background: rgba(232, 168, 56, 0.18);
}

.onboarding-ledger__steps {
  display: grid;
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0;
  list-style: none;
}

.onboarding-ledger__steps li {
  display: grid;
  grid-template-columns: 2.8rem 1fr;
  gap: 1rem;
  padding: clamp(1rem, 2vw, 1.35rem);
  background: rgba(255, 255, 255, 0.07);
}

.onboarding-ledger__steps li > span {
  display: grid;
  place-items: center;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
  color: var(--color-text-on-accent);
  background: var(--sub-accent);
  font-weight: 900;
}

.onboarding-ledger strong {
  color: #ffffff;
}

.onboarding-ledger p {
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.75;
}

.subscribe-form-section,
.reassurance-section {
  padding-block: clamp(4.5rem, 8vw, 8rem);
}

.subscribe-form-section {
  background: var(--sub-surface);
}

.form-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.28fr) minmax(18rem, 0.72fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
}

.subscribe-form,
.next-panel {
  border: 1px solid var(--sub-line);
  border-radius: 2rem;
  background: #ffffff;
  box-shadow: var(--sub-shadow);
}

.subscribe-form {
  display: grid;
  gap: 1.5rem;
  padding: clamp(1.25rem, 4vw, 2.5rem);
}

.subscribe-form__header {
  display: grid;
  gap: var(--spacing-3);
}

.subscribe-form__header h2,
.next-panel h2,
.reassurance-section h2 {
  color: var(--sub-ink);
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.subscribe-form__header p,
.subscribe-form__footer p,
.field-help,
.reassurance-section p,
.reassurance-list li {
  color: var(--sub-muted);
  line-height: 1.8;
}

.subscribe-form__body {
  display: grid;
  gap: clamp(1.5rem, 4vw, 2.25rem);
}

.form-group {
  display: grid;
  gap: var(--spacing-5);
  border: 1px solid rgba(27, 77, 92, 0.12);
  border-radius: var(--radius-3xl);
  padding: clamp(1rem, 3vw, 1.5rem);
  background: linear-gradient(180deg, rgba(247, 249, 252, 0.72), rgba(255, 255, 255, 0));
}

.form-group legend {
  padding-inline: var(--spacing-2);
  color: var(--sub-ink);
  font-size: var(--text-xl);
  font-weight: 900;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-5);
}

.field {
  display: grid;
  gap: 0.45rem;
}

.field--full {
  grid-column: 1 / -1;
}

label {
  color: var(--sub-ink);
  font-weight: 900;
}

label span,
label small {
  color: var(--color-accent-contrast);
  font-weight: 900;
}

label small {
  margin-inline-start: var(--spacing-2);
  font-size: var(--text-sm);
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid rgba(27, 77, 92, 0.2);
  border-radius: var(--radius-xl);
  padding: 0.9rem 1rem;
  background: #ffffff;
  color: var(--sub-text);
  font: inherit;
  transition:
    border-color 180ms var(--sub-ease),
    box-shadow 180ms var(--sub-ease);
}

input::placeholder,
textarea::placeholder {
  color: #5c6572;
  opacity: 1;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--sub-primary);
  box-shadow: 0 0 0 4px rgba(27, 77, 92, 0.12);
}

.is-invalid {
  border-color: var(--color-danger);
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.08);
}

.field-help,
.field-error {
  font-size: 0.92rem;
  line-height: 1.6;
}

.field-error {
  color: #b4232f;
  font-weight: 800;
}

.slug-control,
.password-control {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
}

.slug-control input,
.password-control input {
  flex: 1 1 auto;
  min-width: 0;
}

.slug-reset,
.password-toggle {
  flex: 0 0 auto;
  border: 1px solid rgba(27, 77, 92, 0.2);
  border-radius: var(--radius-xl);
  padding: 0.5rem 0.85rem;
  background: rgba(27, 77, 92, 0.05);
  color: var(--sub-primary);
  font: inherit;
  font-weight: 800;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 180ms var(--sub-ease), border-color 180ms var(--sub-ease);
}

.slug-reset:hover,
.password-toggle:hover {
  background: rgba(27, 77, 92, 0.1);
  border-color: rgba(27, 77, 92, 0.35);
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

.subscribe-form__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-4);
  border-top: 1px solid rgba(27, 77, 92, 0.12);
  padding-block-start: var(--spacing-6);
}

.subscribe-form__footer .subscribe-btn {
  width: auto;
}

.subscribe-form__footer p {
  max-width: 44ch;
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

.form-alert {
  display: grid;
  gap: 0.6rem;
  border-radius: 1.25rem;
  padding: 1rem;
}

.form-alert strong {
  font-size: var(--text-xl);
  color: var(--sub-ink);
}

.form-alert--success {
  border: 1px solid rgba(34, 197, 94, 0.24);
  background: linear-gradient(180deg, rgba(34, 197, 94, 0.12), rgba(34, 197, 94, 0.06));
}

.form-alert--error {
  border: 1px solid rgba(239, 68, 68, 0.22);
  background: rgba(239, 68, 68, 0.08);
}

.form-alert__hint {
  color: #8a1f1f;
  font-weight: 700;
  line-height: 1.7;
}

.success-redirect {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-3);
  margin-block-start: 0.35rem;
}

.form-alert__link {
  min-height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  padding: 0.72rem 1.2rem;
  font-weight: 900;
  text-decoration: none;
}

.form-alert__link--solid {
  color: var(--color-text-on-accent);
  background: var(--sub-accent);
  box-shadow: 0 12px 28px rgba(232, 168, 56, 0.28);
}

.success-redirect__note {
  color: var(--sub-muted);
  font-weight: 700;
}

.success-redirect__hint {
  color: var(--sub-muted);
  font-weight: 700;
}

.next-panel {
  position: sticky;
  top: 6rem;
  display: grid;
  gap: var(--spacing-6);
  padding: clamp(1.25rem, 3vw, 2rem);
}

.next-steps {
  display: grid;
  gap: var(--spacing-4);
  list-style: none;
  margin: 0;
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
  background: var(--sub-accent);
  box-shadow: 0 0 0 6px rgba(232, 168, 56, 0.18);
}

.next-steps p {
  color: var(--sub-text);
  font-weight: 700;
  line-height: 1.75;
}

.reassurance-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
}

.section-heading {
  display: grid;
  gap: 1rem;
  max-width: 62rem;
}

.reassurance-list {
  display: grid;
  gap: var(--spacing-4);
  list-style: none;
  margin: 0;
}

.reassurance-list li {
  display: grid;
  grid-template-columns: 1rem 1fr;
  gap: 0.8rem;
  align-items: start;
  padding: 1rem;
  border: 1px solid rgba(27, 77, 92, 0.12);
  border-radius: 1.2rem;
  background: #ffffff;
  box-shadow: var(--shadow-sm);
  font-weight: 800;
}

.reassurance-list li span {
  width: 0.55rem;
  height: 0.55rem;
  margin-block-start: 0.62rem;
  border-radius: 50%;
  background: var(--sub-accent);
  box-shadow: 0 0 0 5px rgba(232, 168, 56, 0.18);
}

@media (max-width: 68rem) {
  .subscribe-hero__grid,
  .form-shell,
  .reassurance-grid {
    grid-template-columns: 1fr;
  }

  .next-panel {
    position: static;
  }
}

@media (max-width: 44rem) {
  .field-grid {
    grid-template-columns: 1fr;
  }

  .subscribe-form,
  .next-panel {
    border-radius: var(--radius-3xl);
  }

  .subscribe-form__footer {
    flex-direction: column;
    align-items: stretch;
  }

  .subscribe-form__footer .subscribe-btn {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
  }

  .subscribe-btn,
  .slug-reset,
  .password-toggle,
  input,
  select,
  textarea {
    transition: none;
  }
}
</style>
