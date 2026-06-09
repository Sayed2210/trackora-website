<template>
  <div class="features-page">
    <section class="features-hero" aria-labelledby="features-heading">
      <AppContainer wide>
        <div class="features-hero__layout reveal-up">
          <div class="features-hero__content">
            <p class="features-pill">{{ l(hero.kicker) }}</p>
            <h1 id="features-heading">{{ l(hero.title) }}</h1>
            <p class="features-hero__lead">{{ l(hero.text) }}</p>
            <div class="features-hero__actions" :aria-label="locale === 'ar' ? 'إجراءات صفحة المزايا' : 'Feature page actions'">
              <NuxtLink class="feature-button feature-button--primary" :to="localePath('/request-demo')">
                {{ locale === 'ar' ? 'اطلب عرضا على عملية شحنك' : 'Request a demo for your operation' }}
              </NuxtLink>
              <NuxtLink class="feature-button feature-button--ghost" :to="localePath('/features/smart-dispatch')">
                {{ locale === 'ar' ? 'راجع Smart Dispatch' : 'Review Smart Dispatch' }}
              </NuxtLink>
            </div>
          </div>

          <div class="operations-ledger" :aria-label="locale === 'ar' ? 'معاينة سجل تشغيل Trackora' : 'Trackora operating ledger preview'">
            <div class="operations-ledger__bar">
              <span>{{ locale === 'ar' ? 'سجل الشحنة' : 'Shipment ledger' }}</span>
              <strong>{{ locale === 'ar' ? 'حي' : 'Live' }}</strong>
            </div>
            <div class="operations-ledger__body">
              <div class="dispatch-ticket dispatch-ticket--active">
                <span>{{ locale === 'ar' ? 'قيد الإسناد' : 'Being assigned' }}</span>
                <strong>TRK-4821</strong>
                <small>{{ locale === 'ar' ? 'مدينة نصر، COD 850 ج.م، أولوية اليوم' : 'Nasr City, EGP 850 COD, today priority' }}</small>
              </div>
              <div class="dispatch-ticket">
                <span>{{ locale === 'ar' ? 'إشارة خطر' : 'Risk flag' }}</span>
                <strong>{{ locale === 'ar' ? 'رقم مكرر' : 'Repeated phone' }}</strong>
                <small>{{ locale === 'ar' ? 'مراجعة قبل الديسباتش' : 'Review before dispatch' }}</small>
              </div>
              <div class="ledger-columns">
                <span>{{ locale === 'ar' ? 'المندوب' : 'Courier' }}<b>{{ locale === 'ar' ? 'أحمد' : 'Ahmed' }}</b></span>
                <span>{{ locale === 'ar' ? 'السعة' : 'Capacity' }}<b>18 / 24</b></span>
                <span>{{ locale === 'ar' ? 'المحفظة' : 'Wallet' }}<b>{{ locale === 'ar' ? 'جاهزة' : 'Ready' }}</b></span>
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="feature-grid-section" aria-labelledby="feature-grid-heading">
      <AppContainer wide>
        <div class="section-heading reveal-up">
          <h2 id="feature-grid-heading">{{ locale === 'ar' ? 'اختر حسب منطقة العمل، لا حسب قائمة طويلة' : 'Choose by operating area, not a long list' }}</h2>
          <p>{{ locale === 'ar' ? 'المزايا الأساسية لها صفحات تفصيلية. التتبع العام والتقارير قدرات مساندة موضحة حتى لا تختلط مع صفحات المنتج التفصيلية.' : 'Main product features have detail pages. Public tracking and reports are marked as supporting capabilities so they do not pretend to be feature detail routes.' }}</p>
        </div>

        <div class="feature-groups">
          <section v-for="group in featureGroups" :key="group.key" class="feature-group reveal-stagger" :aria-labelledby="`${group.key}-heading`">
            <div class="feature-group__heading">
              <h3 :id="`${group.key}-heading`">{{ l(group.title) }}</h3>
              <p>{{ l(group.text) }}</p>
            </div>

            <div class="feature-group__cards">
              <NuxtLink
                v-for="feature in group.items"
                :key="feature.key"
                :to="localePath(feature.path)"
                :class="['feature-tile', `feature-tile--${feature.accent}`, { 'feature-tile--supporting': feature.supporting }]"
              >
                <span class="feature-tile__label">{{ l(feature.label) }}</span>
                <h4>{{ l(feature.title) }}</h4>
                <p>{{ l(feature.summary) }}</p>
                <small v-if="feature.note">{{ l(feature.note) }}</small>
                <span class="feature-tile__link">{{ l(feature.cta) }}</span>
              </NuxtLink>
            </div>
          </section>
        </div>
      </AppContainer>
    </section>

    <section class="comparison-section" aria-labelledby="comparison-heading">
      <AppContainer wide>
        <div class="comparison-shell reveal-up">
          <div class="comparison-shell__heading">
            <h2 id="comparison-heading">{{ locale === 'ar' ? 'أي ميزة تحل أي مشكلة؟' : 'Which feature solves what?' }}</h2>
            <p>{{ locale === 'ar' ? 'جدول سريع يربط الحاجة اليومية بالميزة المناسبة والنتيجة التشغيلية.' : 'A quick map from daily need to the right feature and operating result.' }}</p>
          </div>

          <div class="comparison-table" role="table" :aria-label="locale === 'ar' ? 'مقارنة المزايا حسب الحاجة' : 'Feature comparison by need'">
            <div class="comparison-table__row comparison-table__row--head" role="row">
              <span role="columnheader">{{ locale === 'ar' ? 'الحاجة' : 'Need' }}</span>
              <span role="columnheader">{{ locale === 'ar' ? 'الميزة المناسبة' : 'Best feature' }}</span>
              <span role="columnheader">{{ locale === 'ar' ? 'من يستفيد' : 'Who benefits' }}</span>
              <span role="columnheader">{{ locale === 'ar' ? 'النتيجة التشغيلية' : 'Operating result' }}</span>
            </div>
            <div v-for="row in comparisonRows" :key="row.need.en" class="comparison-table__row" role="row">
              <span role="cell" :data-label="locale === 'ar' ? 'الحاجة' : 'Need'">{{ l(row.need) }}</span>
              <span role="cell" :data-label="locale === 'ar' ? 'الميزة المناسبة' : 'Best feature'">{{ l(row.feature) }}</span>
              <span role="cell" :data-label="locale === 'ar' ? 'من يستفيد' : 'Who benefits'">{{ l(row.audience) }}</span>
              <span role="cell" :data-label="locale === 'ar' ? 'النتيجة التشغيلية' : 'Operating result'">{{ l(row.result) }}</span>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="workflow-preview" aria-labelledby="workflow-heading">
      <AppContainer wide>
        <div class="workflow-preview__layout">
          <div class="workflow-preview__copy reveal-up">
            <span>{{ locale === 'ar' ? 'معاينة تشغيلية' : 'Operational preview' }}</span>
            <h2 id="workflow-heading">{{ locale === 'ar' ? 'الشحنة تتحرك بين الأدوات بدون فقدان السياق' : 'The shipment moves between tools without losing context' }}</h2>
            <p>{{ locale === 'ar' ? 'Trackora لا يعرض مزايا منفصلة فقط. كل خطوة تضيف معلومة على نفس السجل: مصدر الطلب، نتيجة المراجعة، قرار الإسناد، تحديث المندوب، ثم حركة COD.' : 'Trackora does not present isolated features only. Each step adds context to the same record: order source, review result, assignment decision, courier update, then COD movement.' }}</p>
          </div>

          <ol class="workflow-preview__steps">
            <li v-for="(step, index) in workflowPreview" :key="step.title.en" class="reveal-stagger">
              <span>{{ locale === 'ar' ? arabicStep(index + 1) : index + 1 }}</span>
              <div>
                <h3>{{ l(step.title) }}</h3>
                <p>{{ l(step.text) }}</p>
              </div>
            </li>
          </ol>
        </div>
      </AppContainer>
    </section>

    <section class="audiences-section" aria-labelledby="audiences-heading">
      <AppContainer wide>
        <div class="section-heading section-heading--compact reveal-up">
          <span>{{ locale === 'ar' ? 'من يستفيد' : 'Who benefits' }}</span>
          <h2 id="audiences-heading">{{ locale === 'ar' ? 'نفس النظام، زوايا تشغيل مختلفة' : 'One system, different operating angles' }}</h2>
        </div>

        <div class="audiences-list">
          <NuxtLink v-for="audience in audiences" :key="audience.to" class="audience-row reveal-stagger" :to="localePath(audience.to)">
            <h3>{{ l(audience.title) }}</h3>
            <p>{{ l(audience.text) }}</p>
            <span>{{ locale === 'ar' ? 'راجع الحل' : 'View solution' }}</span>
          </NuxtLink>
        </div>
      </AppContainer>
    </section>

    <section class="features-cta" aria-labelledby="features-cta-heading">
      <AppContainer wide>
        <div class="features-cta__inner reveal-up">
          <div>
            <span>{{ locale === 'ar' ? 'الخطوة التالية' : 'Next step' }}</span>
            <h2 id="features-cta-heading">{{ locale === 'ar' ? 'شاهد الأدوات على يوم شحن حقيقي من عمليتك' : 'See the tools on a real shipment day from your operation' }}</h2>
            <p>{{ locale === 'ar' ? 'شاركنا عدد الشحنات، المناطق، المناديب، وطريقة تسوية COD. سنعرض مسارا يوضح أين يدخل Trackora في يومك الحالي.' : 'Share shipment volume, zones, couriers, and COD settlement flow. We will show where Trackora fits into your current day.' }}</p>
          </div>
          <NuxtLink class="feature-button feature-button--accent" :to="localePath('/request-demo')">
            {{ locale === 'ar' ? 'اطلب عرض Trackora' : 'Request a Trackora demo' }}
          </NuxtLink>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  featureAudiences,
  featureOverviewItems,
  featureWorkflowPreview,
  getLocalized,
  type LocalizedText,
} from '~/data/features'

const { locale } = useI18n()
const localePath = useLocalePath()
const { setSeo } = useLocaleSeo()

const overviewItems = featureOverviewItems
const workflowPreview = featureWorkflowPreview
const audiences = featureAudiences

const featureGroups = [
  {
    key: 'operations',
    title: { ar: 'التشغيل والتوزيع', en: 'Operations and dispatch' },
    text: { ar: 'قرارات الديسباتش وحركة المندوب في الطريق.', en: 'Dispatch decisions and courier movement on the route.' },
    items: overviewItems.filter(item => item.category === 'operations'),
  },
  {
    key: 'merchant-cod',
    title: { ar: 'التجار والتحصيل', en: 'Merchants and COD' },
    text: { ar: 'إدخال الطلبات، رؤية التاجر، وفلوس COD من الشحنة حتى التسوية.', en: 'Order intake, merchant visibility, and COD money from shipment to settlement.' },
    items: overviewItems.filter(item => item.category === 'merchant-cod'),
  },
  {
    key: 'trust-followup',
    title: { ar: 'الثقة والمتابعة', en: 'Trust and follow-up' },
    text: { ar: 'مراجعة المخاطر، تتبع العميل، والتقارير التي تكمل لوحة التشغيل.', en: 'Risk review, customer tracking, and reports that complete the operating dashboard.' },
    items: overviewItems.filter(item => item.category === 'trust-followup'),
  },
]

const comparisonRows = [
  {
    need: { ar: 'توزيع المناديب', en: 'Courier assignment' },
    feature: { ar: 'Smart Dispatch', en: 'Smart Dispatch' },
    audience: { ar: 'مشرف الديسباتش ومدير التشغيل', en: 'Dispatch supervisor and operations manager' },
    result: { ar: 'إسناد حسب المنطقة والسعة وCOD قبل خروج الطريق.', en: 'Assignment by zone, capacity, and COD before route start.' },
  },
  {
    need: { ar: 'متابعة الشحنات', en: 'Shipment follow-up' },
    feature: { ar: 'Courier App + تتبع عام للشحنات', en: 'Courier App + Public Shipment Tracking' },
    audience: { ar: 'المندوب، الدعم، والعميل', en: 'Courier, support, and customer' },
    result: { ar: 'حالة محدثة بدون مكالمات متكررة.', en: 'Updated status without repeated calls.' },
  },
  {
    need: { ar: 'تحصيل COD', en: 'COD collection' },
    feature: { ar: 'COD Wallet', en: 'COD Wallet' },
    audience: { ar: 'التحصيل والمحاسبة والتاجر', en: 'Collections, finance, and merchant' },
    result: { ar: 'رصيد ومعاملات وتسوية قابلة للمراجعة.', en: 'Reviewable balance, transactions, and settlement.' },
  },
  {
    need: { ar: 'رفع شحنات كثيرة', en: 'Large shipment upload' },
    feature: { ar: 'Bulk Upload', en: 'Bulk Upload' },
    audience: { ar: 'التاجر وفريق إدخال الطلبات', en: 'Merchant and order intake team' },
    result: { ar: 'قبول الصفوف الصحيحة وإيقاف الأخطاء قبل التشغيل.', en: 'Accept valid rows and stop errors before operations.' },
  },
  {
    need: { ar: 'تقليل الطلبات الوهمية', en: 'Reduce fake orders' },
    feature: { ar: 'Fraud Detection', en: 'Fraud Detection' },
    audience: { ar: 'فريق المراجعة والديسباتش', en: 'Review and dispatch teams' },
    result: { ar: 'إيقاف أو تأكيد الشحنات عالية الخطر قبل الطريق.', en: 'Hold or confirm high-risk shipments before the route.' },
  },
  {
    need: { ar: 'تقارير التشغيل', en: 'Operations reporting' },
    feature: { ar: 'ضمن لوحة التحكم والتقارير', en: 'Included in dashboard and reports' },
    audience: { ar: 'مدير التشغيل والإدارة المالية', en: 'Operations leader and finance management' },
    result: { ar: 'قراءة أداء التسليم والفشل والتحصيل من نفس السجل.', en: 'Read delivery, failure, and COD performance from the same record.' },
  },
]

const hero = {
  kicker: { ar: 'مزايا Trackora', en: 'Trackora features' },
  title: { ar: 'كل أدوات تشغيل الشحنات والتحصيل في مكان واحد', en: 'Every shipment and COD operations tool in one place' },
  text: {
    ar: 'صفحات المزايا تشرح كيف يعمل Trackora حول سجل شحنة واحد: إدخال الطلب، فحص المخاطر، الإسناد، تطبيق المندوب، التتبع، محفظة COD، والتقارير.',
    en: 'The feature pages explain how Trackora works around one shipment record: order intake, risk review, dispatch, courier app, tracking, COD wallet, and reports.',
  },
}

function l(text: LocalizedText) {
  return getLocalized(text, locale.value)
}

function arabicStep(value: number) {
  return new Intl.NumberFormat('ar-EG').format(value)
}

useScrollReveal()

setSeo(
  locale.value === 'ar' ? 'مزايا Trackora | أدوات الشحن والتحصيل' : 'Trackora Features | Shipment and COD Tools',
  locale.value === 'ar'
    ? 'كل مزايا Trackora لإدارة الشحنات، الديسباتش، تطبيق المناديب، بوابة التاجر، COD، الرفع المجمع، كشف المخاطر، والتتبع.'
    : 'All Trackora features for shipments, dispatch, courier app, merchant portal, COD, bulk upload, risk detection, and tracking.',
  '/features',
)
</script>

<style scoped>
.features-page {
  --features-primary: #1a3b66;
  --features-primary-light: #3b5998;
  --features-primary-dark: #0a1d34;
  --features-accent: #ff6b6b;
  --features-accent-soft: #ffd8d8;
  --features-accent-ink: #210f16;
  --features-shadow: 0 24px 80px rgba(26, 59, 102, 0.16);
  color: var(--color-text);
  background:
    radial-gradient(circle at 8% 12%, rgba(255, 107, 107, 0.12), transparent 24rem),
    linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-alt) 42%, var(--color-bg) 100%);
  overflow: hidden;
}

.features-hero {
  position: relative;
  padding-block: clamp(5rem, 10vw, 8.5rem);
  color: var(--color-text-light);
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 107, 107, 0.18), transparent 19rem),
    linear-gradient(145deg, var(--features-primary-dark) 0%, var(--features-primary) 48%, #254c80 100%);
  isolation: isolate;
}

.features-hero::before {
  content: '';
  position: absolute;
  inset: 8% auto auto 8%;
  width: 18rem;
  height: 18rem;
  border-radius: var(--radius-full);
  background: rgba(255, 107, 107, 0.14);
  filter: blur(12px);
  z-index: -1;
}

.features-hero::after {
  content: '';
  position: absolute;
  inset: auto -8rem -12rem -8rem;
  height: 18rem;
  border-radius: 50% 50% 0 0;
  background: var(--color-bg);
  z-index: -1;
}

.features-hero__layout {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(22rem, 1.05fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.features-hero__content {
  display: grid;
  gap: var(--spacing-6);
  max-width: 52rem;
}

.features-pill,
.section-heading span,
.workflow-preview__copy span,
.features-cta__inner span {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  border-radius: var(--radius-full);
  padding: 0.45rem 0.9rem;
  font-size: var(--text-sm);
  font-weight: 800;
  line-height: 1.4;
}

.features-pill {
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.84);
  background: rgba(255, 255, 255, 0.08);
}

.features-hero h1 {
  max-width: 13ch;
  color: var(--color-text-light);
  font-size: clamp(2.9rem, 7vw, 5.8rem);
  line-height: 1.06;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

html[lang='ar'] .features-hero h1 {
  letter-spacing: -0.015em;
}

.features-hero__lead {
  max-width: 68ch;
  color: rgba(255, 255, 255, 0.82);
  font-size: clamp(1.05rem, 1.6vw, 1.3rem);
  line-height: 1.9;
  text-wrap: pretty;
}

.features-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
}

.feature-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  padding: 0.85rem 1.35rem;
  font-weight: 900;
  line-height: 1.35;
  text-align: center;
  transition: transform 220ms var(--reveal-easing), box-shadow 220ms var(--reveal-easing), background-color 220ms var(--reveal-easing), border-color 220ms var(--reveal-easing);
}

.feature-button:focus-visible,
.feature-tile:focus-visible,
.audience-row:focus-visible {
  outline: 3px solid var(--features-accent);
  outline-offset: 3px;
}

.feature-button--primary {
  color: var(--features-accent-ink);
  background: var(--features-accent);
  box-shadow: 0 16px 36px rgba(255, 107, 107, 0.3);
}

.feature-button--accent {
  color: var(--features-accent-ink);
  background: var(--features-accent);
  box-shadow: 0 16px 36px rgba(255, 107, 107, 0.3);
}

.feature-button--ghost {
  color: var(--color-text-light);
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.09);
}

.operations-ledger {
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-4xl);
  background: rgba(7, 20, 36, 0.72);
  box-shadow: 0 32px 100px rgba(0, 0, 0, 0.28);
  overflow: hidden;
  animation: ledger-enter 720ms var(--reveal-easing) both;
}

.operations-ledger__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-4);
  padding: var(--spacing-5) var(--spacing-6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.72);
}

.operations-ledger__bar strong {
  border-radius: var(--radius-full);
  padding: 0.25rem 0.7rem;
  color: var(--features-accent-soft);
  background: rgba(255, 107, 107, 0.18);
}

.operations-ledger__body {
  display: grid;
  gap: var(--spacing-4);
  padding: clamp(var(--spacing-5), 3vw, var(--spacing-8));
}

.dispatch-ticket,
.ledger-columns span {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-2xl);
  background: rgba(255, 255, 255, 0.08);
  padding: var(--spacing-5);
}

.dispatch-ticket--active {
  background:
    radial-gradient(circle at 8% 10%, rgba(255, 107, 107, 0.18), transparent 12rem),
    rgba(255, 255, 255, 0.1);
}

.dispatch-ticket span,
.dispatch-ticket small,
.ledger-columns span {
  color: rgba(255, 255, 255, 0.72);
}

.dispatch-ticket strong {
  display: block;
  margin-block: 0.4rem;
  color: var(--color-text-light);
  font-size: clamp(1.7rem, 4vw, 3.2rem);
  line-height: 1;
}

.ledger-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-3);
}

.ledger-columns span {
  display: grid;
  gap: var(--spacing-2);
  padding: var(--spacing-4);
}

.ledger-columns b {
  color: var(--color-text-light);
  font-size: var(--text-lg);
}

.feature-grid-section,
.comparison-section,
.workflow-preview,
.audiences-section {
  padding-block: clamp(4.5rem, 9vw, 8rem);
}

.section-heading {
  display: grid;
  gap: var(--spacing-4);
  max-width: 64rem;
  margin-block-end: clamp(2rem, 5vw, 4rem);
}

.section-heading--compact {
  max-width: 48rem;
}

.section-heading span,
.workflow-preview__copy span,
.features-cta__inner span {
  color: var(--color-primary);
  background: rgba(45, 110, 125, 0.08);
}

.section-heading h2,
.workflow-preview__copy h2,
.features-cta__inner h2 {
  max-width: 15ch;
  color: var(--color-primary-dark);
  font-size: clamp(2.2rem, 5.2vw, 4.5rem);
  line-height: 1.12;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

html[lang='ar'] .section-heading h2,
html[lang='ar'] .workflow-preview__copy h2,
html[lang='ar'] .features-cta__inner h2 {
  letter-spacing: -0.012em;
}

.section-heading p,
.workflow-preview__copy p,
.features-cta__inner p {
  max-width: 72ch;
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
  line-height: 1.85;
  text-wrap: pretty;
}

.feature-groups {
  display: grid;
  gap: clamp(var(--spacing-8), 5vw, var(--spacing-12));
}

.feature-group {
  display: grid;
  grid-template-columns: minmax(14rem, 0.32fr) minmax(0, 1fr);
  gap: clamp(var(--spacing-5), 4vw, var(--spacing-8));
  align-items: start;
}

.feature-group__heading {
  position: sticky;
  top: 6rem;
  display: grid;
  gap: var(--spacing-3);
}

.feature-group__heading h3 {
  color: var(--color-primary-dark);
  font-size: clamp(1.55rem, 3vw, 2.35rem);
  line-height: 1.15;
  text-wrap: balance;
}

.feature-group__heading p {
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.feature-group__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  gap: var(--spacing-4);
}

.feature-tile {
  position: relative;
  display: grid;
  gap: var(--spacing-4);
  min-height: 19rem;
  align-content: start;
  padding: clamp(var(--spacing-5), 2.4vw, var(--spacing-8));
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-3xl);
  color: inherit;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: transform 220ms var(--reveal-easing), box-shadow 220ms var(--reveal-easing), border-color 220ms var(--reveal-easing);
}

.feature-tile::before {
  content: '';
  position: absolute;
  inset: auto -4rem -6rem auto;
  width: 13rem;
  height: 13rem;
  border-radius: var(--radius-full);
  background: rgba(45, 110, 125, 0.08);
}

.feature-tile--large {
  grid-column: span 2;
  grid-row: span 2;
  min-height: 37rem;
  color: var(--color-text-light);
  background:
    radial-gradient(circle at 18% 16%, rgba(232, 168, 56, 0.2), transparent 14rem),
    linear-gradient(145deg, var(--color-primary-dark), var(--color-primary));
  box-shadow: var(--shadow-lg);
}

.feature-tile--tall {
  grid-row: span 2;
  min-height: 37rem;
}

.feature-tile--gold::before {
  background: rgba(232, 168, 56, 0.16);
}

.feature-tile--risk::before {
  background: rgba(239, 68, 68, 0.1);
}

.feature-tile--supporting {
  border-style: dashed;
  background: linear-gradient(180deg, rgba(45, 110, 125, 0.04), var(--color-surface));
}

.feature-tile__label,
.feature-tile__link,
.audience-row span {
  position: relative;
  z-index: 1;
  width: fit-content;
  font-weight: 900;
}

.feature-tile__label {
  border-radius: var(--radius-full);
  padding: 0.32rem 0.7rem;
  color: var(--color-primary);
  background: rgba(45, 110, 125, 0.08);
  font-size: var(--text-sm);
}

.feature-tile--large .feature-tile__label {
  color: var(--color-accent-light);
  background: rgba(255, 255, 255, 0.1);
}

.feature-tile h4,
.feature-tile p,
.feature-tile small {
  position: relative;
  z-index: 1;
}

.feature-tile h4 {
  color: var(--color-primary-dark);
  font-size: clamp(1.35rem, 2.4vw, 2.2rem);
  line-height: 1.14;
  text-wrap: balance;
}

.feature-tile--large h4 {
  max-width: 10ch;
  color: var(--color-text-light);
  font-size: clamp(2.2rem, 5vw, 4.2rem);
}

.feature-tile p {
  color: var(--color-text-secondary);
  line-height: 1.78;
  text-wrap: pretty;
}

.feature-tile small {
  display: block;
  color: var(--color-primary);
  font-weight: 800;
  line-height: 1.6;
}

.feature-tile--large p {
  max-width: 42ch;
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--text-lg);
}

.feature-tile__link {
  margin-top: auto;
  color: var(--color-primary);
}

.comparison-section {
  padding-block-start: 0;
}

.comparison-shell {
  display: grid;
  gap: clamp(var(--spacing-6), 4vw, var(--spacing-10));
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-4xl);
  padding: clamp(var(--spacing-6), 4vw, var(--spacing-10));
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.comparison-shell__heading {
  display: grid;
  gap: var(--spacing-3);
  max-width: 62rem;
}

.comparison-shell__heading h2 {
  color: var(--color-primary-dark);
  font-size: clamp(2rem, 4.5vw, 3.8rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

html[lang='ar'] .comparison-shell__heading h2 {
  letter-spacing: -0.012em;
}

.comparison-shell__heading p {
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
  line-height: 1.8;
}

.comparison-table {
  display: grid;
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-3xl);
  overflow: hidden;
}

.comparison-table__row {
  display: grid;
  grid-template-columns: minmax(9rem, 0.65fr) minmax(10rem, 0.7fr) minmax(12rem, 0.85fr) minmax(0, 1fr);
  border-bottom: 1px solid rgba(27, 77, 92, 0.08);
}

.comparison-table__row:last-child {
  border-bottom: none;
}

.comparison-table__row span {
  padding: var(--spacing-4);
  color: var(--color-text-secondary);
  line-height: 1.65;
}

.comparison-table__row span + span {
  border-inline-start: 1px solid rgba(27, 77, 92, 0.08);
}

.comparison-table__row span:first-child,
.comparison-table__row span:nth-child(2) {
  color: var(--color-primary-dark);
  font-weight: 900;
}

.comparison-table__row--head span {
  color: var(--color-primary);
  background: rgba(45, 110, 125, 0.07);
  font-size: var(--text-sm);
  font-weight: 900;
}

.feature-tile--large .feature-tile__link {
  color: var(--color-accent-light);
}

.workflow-preview {
  background:
    radial-gradient(circle at 85% 20%, rgba(45, 110, 125, 0.1), transparent 20rem),
    var(--color-bg-alt);
}

.workflow-preview__layout {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
}

.workflow-preview__copy {
  display: grid;
  gap: var(--spacing-4);
  position: sticky;
  top: 6rem;
}

.workflow-preview__steps {
  display: grid;
  gap: var(--spacing-4);
}

.workflow-preview__steps li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-5);
  padding: var(--spacing-6);
  border: 1px solid rgba(27, 77, 92, 0.1);
  border-radius: var(--radius-3xl);
  background: rgba(255, 255, 255, 0.86);
  box-shadow: var(--shadow-card);
}

.workflow-preview__steps li > span {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  color: var(--color-text-on-primary);
  background: var(--color-primary);
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}

.workflow-preview__steps h3,
.audience-row h3 {
  color: var(--color-primary-dark);
  font-size: var(--text-xl);
  margin-block-end: var(--spacing-2);
}

.workflow-preview__steps p,
.audience-row p {
  color: var(--color-text-secondary);
  line-height: 1.75;
}

.audiences-list {
  display: grid;
  gap: 1px;
  border: 1px solid rgba(27, 77, 92, 0.12);
  border-radius: var(--radius-3xl);
  background: rgba(27, 77, 92, 0.12);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.audience-row {
  display: grid;
  grid-template-columns: minmax(12rem, 0.55fr) minmax(0, 1fr) auto;
  gap: var(--spacing-6);
  align-items: center;
  padding: clamp(var(--spacing-5), 3vw, var(--spacing-8));
  color: inherit;
  background: var(--color-surface);
  transition: background-color 220ms var(--reveal-easing), color 220ms var(--reveal-easing);
}

.audience-row span {
  color: var(--color-primary);
}

.features-cta {
  padding-block: clamp(4rem, 8vw, 7rem);
}

.features-cta__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--spacing-8);
  align-items: center;
  border-radius: var(--radius-4xl);
  padding: clamp(var(--spacing-8), 5vw, var(--spacing-16));
  color: var(--color-text-light);
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 107, 107, 0.18), transparent 19rem),
    linear-gradient(145deg, var(--features-primary-dark) 0%, var(--features-primary) 58%, #254c80 100%);
  box-shadow: var(--features-shadow);
}

.features-cta__inner span {
  color: var(--features-accent-soft);
  background: rgba(255, 255, 255, 0.1);
  margin-block-end: var(--spacing-4);
}

.features-cta__inner h2,
.features-cta__inner p {
  color: var(--color-text-light);
}

.features-cta__inner p {
  margin-block-start: var(--spacing-4);
  color: rgba(255, 255, 255, 0.8);
}

@media (hover: hover) {
  .feature-button:hover,
  .feature-tile:hover {
    transform: translateY(-4px);
  }

  .feature-tile:hover {
    border-color: rgba(27, 77, 92, 0.22);
    box-shadow: var(--shadow-lg);
  }

  .audience-row:hover {
    background: rgba(45, 110, 125, 0.06);
  }
}

@keyframes ledger-enter {
  from {
    opacity: 0;
    transform: translateY(22px) scale(0.98);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@media (max-width: 72rem) {
  .features-hero__layout,
  .feature-group,
  .workflow-preview__layout,
  .features-cta__inner {
    grid-template-columns: 1fr;
  }

  .feature-group__heading,
  .workflow-preview__copy {
    position: static;
  }

  .feature-group__cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .feature-tile--large,
  .feature-tile--tall {
    grid-column: span 1;
    grid-row: span 1;
    min-height: 20rem;
  }

  .audience-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 48rem) {
  .features-hero h1,
  .section-heading h2,
  .workflow-preview__copy h2,
  .features-cta__inner h2 {
    max-width: 100%;
  }

  .features-hero__actions,
  .features-hero__actions .feature-button,
  .features-cta__inner .feature-button {
    width: 100%;
  }

  .feature-group__cards,
  .ledger-columns {
    grid-template-columns: 1fr;
  }

  .comparison-shell {
    padding: var(--spacing-4);
  }

  .comparison-table {
    gap: var(--spacing-3);
    border: none;
    border-radius: 0;
    overflow: visible;
  }

  .comparison-table__row {
    grid-template-columns: 1fr;
    border: 1px solid rgba(27, 77, 92, 0.1);
    border-radius: var(--radius-2xl);
    overflow: hidden;
  }

  .comparison-table__row--head {
    display: none;
  }

  .comparison-table__row span {
    display: grid;
    grid-template-columns: minmax(7.5rem, 0.42fr) 1fr;
    gap: var(--spacing-3);
    padding: var(--spacing-3) var(--spacing-4);
  }

  .comparison-table__row span::before {
    content: attr(data-label);
    color: var(--color-text-secondary);
    font-size: var(--text-sm);
    font-weight: 800;
  }

  .comparison-table__row span + span {
    border-block-start: 1px solid rgba(27, 77, 92, 0.08);
    border-inline-start: none;
  }

  .feature-tile,
  .feature-tile--large,
  .feature-tile--tall {
    min-height: 0;
  }

  .workflow-preview__steps li {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .operations-ledger {
    animation: none;
  }

  .feature-button,
  .feature-tile,
  .audience-row {
    transition-duration: 0.01ms;
  }
}
</style>
