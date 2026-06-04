<template>
  <div>
    <section class="solution-hero section section--dark" aria-labelledby="solution-heading">
      <AppContainer wide>
        <div class="solution-hero__layout reveal-up">
          <div class="solution-hero__content">
            <p class="solution-hero__audience">{{ activeCopy.audience }}</p>
            <h1 id="solution-heading" class="solution-hero__title">{{ activeCopy.title }}</h1>
            <p class="solution-hero__subtitle">{{ activeCopy.summary }}</p>
            <div class="solution-hero__actions">
              <AppButton :to="localePath('/request-demo')" variant="primary" size="lg">{{ t('nav.requestDemo') }}</AppButton>
              <AppButton :to="localePath('/features')" variant="secondary" size="lg">{{ t('common.learnMore') }}</AppButton>
            </div>
          </div>

          <div class="solution-hero__visual" aria-hidden="true">
            <div class="solution-stage">
              <div class="solution-stage__core">
                <AppIcon3D
                  :name="primaryIcon"
                  alt=""
                  size="xl"
                  variant="hero"
                />
                <span>{{ locale === 'ar' ? 'مسار واضح' : 'Clear flow' }}</span>
              </div>
              <AppIcon3D
                v-for="(icon, index) in audienceIcons"
                :key="`${icon}-${index}`"
                :name="icon"
                alt=""
                size="lg"
                variant="dark"
                :class="['solution-stage__icon', `solution-stage__icon--${index + 1}`]"
              />
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="solution-pain section" aria-labelledby="solution-pain-heading">
      <AppContainer wide>
        <div class="solution-split reveal-up">
          <div class="solution-split__intro">
            <p class="solution-kicker">{{ locale === 'ar' ? '01 / الاحتكاك' : '01 / Friction' }}</p>
            <h2 id="solution-pain-heading">{{ audienceStory.painTitle }}</h2>
            <p>{{ audienceStory.painLead }}</p>
          </div>
          <ul class="solution-pain__list" role="list">
            <li v-for="(point, i) in activeCopy.painPoints" :key="i" class="solution-pain__item reveal-stagger">
              <span class="solution-pain__number" aria-hidden="true">{{ i + 1 }}</span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>
      </AppContainer>
    </section>

    <section class="solution-fit section section--alt" aria-labelledby="solution-fit-heading">
      <AppContainer wide>
        <div class="solution-fit__layout reveal-up">
          <div class="solution-product" aria-hidden="true">
            <div class="solution-product__bar">
              <span />
              <span />
              <span />
            </div>
            <div class="solution-product__body">
              <AppIcon3D :name="primaryIcon" alt="" size="xl" class="solution-product__icon" />
              <div class="solution-product__copy">
                <span>Trackora</span>
                <strong>{{ audienceStory.productLabel }}</strong>
              </div>
              <div class="solution-product__rows">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div class="solution-fit__content">
            <p class="solution-kicker">{{ locale === 'ar' ? '02 / الملاءمة' : '02 / Fit' }}</p>
            <h2 id="solution-fit-heading">{{ audienceStory.fitTitle }}</h2>
            <p>{{ activeCopy.solution }}</p>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="solution-outcomes section" aria-labelledby="solution-outcomes-heading">
      <AppContainer wide>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? '03 / النتائج' : '03 / Outcomes'"
          :title="audienceStory.outcomesTitle"
          :description="audienceStory.outcomesLead"
          class="reveal-up"
        />
        <ul class="solution-outcomes__grid" role="list">
          <li v-for="(benefit, i) in activeCopy.benefits" :key="i" class="solution-outcomes__card reveal-stagger">
            <AppIcon3D
              :name="audienceIcons[i % audienceIcons.length]"
              alt=""
              size="md"
              class="solution-outcomes__icon"
            />
            <span class="solution-outcomes__count">{{ `0${i + 1}` }}</span>
            <p>{{ benefit }}</p>
          </li>
        </ul>
      </AppContainer>
    </section>

    <section class="solution-workflow section section--alt" aria-labelledby="solution-workflow-heading">
      <AppContainer wide>
        <div class="solution-workflow__layout">
          <AppSectionHeader
            :eyebrow="locale === 'ar' ? '04 / سير العمل' : '04 / Workflow'"
            :title="audienceStory.workflowTitle"
            :description="audienceStory.workflowLead"
            align="left"
            class="solution-workflow__header reveal-up"
          />
          <ol class="solution-workflow__steps">
            <li v-for="(step, i) in activeCopy.workflow" :key="i" class="solution-workflow__step reveal-stagger">
              <span class="solution-workflow__number">{{ i + 1 }}</span>
              <span class="solution-workflow__text">{{ step }}</span>
            </li>
          </ol>
        </div>
      </AppContainer>
    </section>

    <section v-if="relatedFeatures.length" class="solution-features section" aria-labelledby="solution-features-heading">
      <AppContainer wide>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? '05 / قدرات مرتبطة' : '05 / Relevant features'"
          :title="audienceStory.featuresTitle"
          :description="audienceStory.featuresLead"
          class="reveal-up"
        />
        <div class="solution-features__grid">
          <NuxtLink v-for="feature in relatedFeatures" :key="feature.key" :to="localePath(feature.path)" class="solution-features__card reveal-stagger">
            <AppIcon3D
              :name="featureIconMap[feature.key] || 'analytics'"
              :alt="locale === 'ar' ? `${feature.titleAr} ثلاثي الأبعاد` : `${feature.titleEn} 3D icon`"
              size="lg"
              class="solution-features__icon"
            />
            <h3 class="solution-features__title">{{ locale === 'ar' ? feature.titleAr : feature.titleEn }}</h3>
            <p class="solution-features__text">{{ locale === 'ar' ? feature.summaryAr : feature.summaryEn }}</p>
            <span class="solution-features__link">{{ t('common.learnMore') }}</span>
          </NuxtLink>
        </div>
      </AppContainer>
    </section>

    <section v-if="relatedSolutions.length" class="solution-related section section--alt" aria-labelledby="solution-related-heading">
      <AppContainer wide>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'حلول أخرى' : 'Other solutions'"
          :title="locale === 'ar' ? 'صفحات قد تناسب فريقك أيضاً.' : 'Pages that may also fit your team.'"
          class="reveal-up"
        />
        <div class="solution-related__grid">
          <NuxtLink v-for="sol in relatedSolutions" :key="sol.key" :to="localePath(sol.path)" class="solution-related__card reveal-stagger">
            <AppIcon3D
              :name="solutionPrimaryIconMap[sol.key] || 'shipment'"
              :alt="locale === 'ar' ? `${sol.titleAr} ثلاثي الأبعاد` : `${sol.titleEn} 3D icon`"
              size="lg"
              class="solution-related__icon"
            />
            <h3 class="solution-related__title">{{ locale === 'ar' ? sol.titleAr : sol.titleEn }}</h3>
            <p class="solution-related__text">{{ locale === 'ar' ? sol.summaryAr : sol.summaryEn }}</p>
            <span class="solution-related__link">{{ locale === 'ar' ? 'استكشف الحل' : 'Explore solution' }}</span>
          </NuxtLink>
        </div>
      </AppContainer>
    </section>

    <section class="solution-cta section section--dark" aria-labelledby="solution-cta-heading">
      <AppContainer narrow>
        <div class="solution-cta__inner reveal-up">
          <p class="solution-cta__eyebrow">{{ locale === 'ar' ? 'الخطوة التالية' : 'Next step' }}</p>
          <h2 id="solution-cta-heading" class="solution-cta__title">{{ audienceStory.ctaTitle }}</h2>
          <p class="solution-cta__text">{{ audienceStory.ctaLead }}</p>
          <AppButton :to="localePath('/request-demo')" variant="primary" size="lg">{{ t('nav.requestDemo') }}</AppButton>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { solutions, type SolutionDetail } from '~/data/solutions'
import { features, type FeatureDetail } from '~/data/features'

const props = defineProps<{
  solutionKey: string
}>()

const { t } = useI18n()
const locale = useI18n().locale
const localePath = useLocalePath()

const solution = computed(() => solutions.find(s => s.key === props.solutionKey) as SolutionDetail)

const activeCopy = computed(() => ({
  audience: locale.value === 'ar' ? solution.value.audienceAr : solution.value.audienceEn,
  title: locale.value === 'ar' ? solution.value.titleAr : solution.value.titleEn,
  summary: locale.value === 'ar' ? solution.value.summaryAr : solution.value.summaryEn,
  painPoints: locale.value === 'ar' ? solution.value.painPointsAr : solution.value.painPointsEn,
  solution: locale.value === 'ar' ? solution.value.solutionAr : solution.value.solutionEn,
  benefits: locale.value === 'ar' ? solution.value.benefitsAr : solution.value.benefitsEn,
  workflow: locale.value === 'ar' ? solution.value.workflowAr : solution.value.workflowEn,
}))

const relatedFeatures = computed(() =>
  solution.value.relatedFeatureKeys
    .map(key => features.find(f => f.key === key))
    .filter(Boolean) as FeatureDetail[]
)

const relatedSolutions = computed(() =>
  solution.value.relatedSolutionKeys
    .map(key => solutions.find(s => s.key === key))
    .filter(Boolean) as SolutionDetail[]
)

const solutionIconMap: Record<string, string[]> = {
  'shipping-companies': ['smart-dispatch', 'courier-app', 'cod-wallet', 'analytics', 'fraud-detection'],
  'ecommerce-stores': ['shipment', 'public-tracking', 'cod-wallet', 'analytics'],
  'social-sellers': ['bulk-upload', 'public-tracking', 'fraud-detection', 'cod-wallet'],
}

const solutionPrimaryIconMap: Record<string, string> = {
  'shipping-companies': 'smart-dispatch',
  'ecommerce-stores': 'shipment',
  'social-sellers': 'bulk-upload',
}

const featureIconMap: Record<string, string> = {
  'smart-dispatch': 'smart-dispatch',
  'courier-app': 'courier-app',
  'merchant-portal': 'analytics',
  'cod-wallet': 'cod-wallet',
  'bulk-upload': 'bulk-upload',
  'fraud-detection': 'fraud-detection',
}

const audienceIcons = computed(() => solutionIconMap[solution.value.key] || ['shipment', 'analytics'])
const primaryIcon = computed(() => solutionPrimaryIconMap[solution.value.key] || audienceIcons.value[0])

const storyMap = computed(() => {
  const ar = locale.value === 'ar'

  const copy = {
    'shipping-companies': {
      painTitle: ar ? 'عندما تتكدس الشحنات، يصبح كل قرار ضغطاً.' : 'When shipments pile up, every decision becomes pressure.',
      painLead: ar ? 'الإرسال، السعاة، النقدي، التتبع، والاحتيال تتحرك معاً. أي فجوة صغيرة تظهر فوراً في الأداء.' : 'Dispatch, couriers, COD, tracking, and fraud all move together. One small gap shows up immediately in performance.',
      fitTitle: ar ? 'تراكورا يعمل كغرفة عمليات هادئة لشركة الشحن.' : 'Trackora works like a calm command room for shipping companies.',
      productLabel: ar ? 'تشغيل الشحن من مركز واحد' : 'Shipping operations in one center',
      outcomesTitle: ar ? 'سيطرة أكبر على اليوم التشغيلي.' : 'More control over the operating day.',
      outcomesLead: ar ? 'من قرار التوزيع إلى تحصيل النقدي، تصبح التفاصيل واضحة أمام الفريق.' : 'From dispatch decisions to COD collection, the details become clear to the team.',
      workflowTitle: ar ? 'سير شحن متصل من المستودع حتى التسوية.' : 'A connected delivery flow from warehouse to settlement.',
      workflowLead: ar ? 'كل خطوة تترك أثراً واضحاً للفريق بدل الاعتماد على المكالمات والجداول.' : 'Every step leaves a clear trail for the team instead of relying on calls and sheets.',
      featuresTitle: ar ? 'قدرات مصممة لتقليل فوضى التشغيل.' : 'Capabilities designed to reduce operational chaos.',
      featuresLead: ar ? 'ابدأ بالإرسال والسعاة والتحصيل، ثم وسّع الرؤية مع التقارير وكشف الاحتيال.' : 'Start with dispatch, couriers, and COD, then expand visibility with reports and fraud detection.',
      ctaTitle: ar ? 'حوّل عمليات الشحن إلى نظام واضح.' : 'Turn shipping operations into a clear system.',
      ctaLead: ar ? 'شاهد كيف يدعم تراكورا فريق التشغيل والسعاة والإدارة من لوحة واحدة.' : 'See how Trackora supports operations, couriers, and management from one view.',
    },
    'ecommerce-stores': {
      painTitle: ar ? 'كل سؤال عن الشحنة يسرق وقتاً من فريقك.' : 'Every shipment question steals time from your team.',
      painLead: ar ? 'العميل يريد معرفة مكان الطلب، والفريق يريد رؤية التحصيل والمرتجعات بدون مطاردة شركات الشحن.' : 'Customers want to know where orders are, while the team needs COD and returns visibility without chasing carriers.',
      fitTitle: ar ? 'تراكورا يعطي متجرك طبقة رؤية فوق التوصيل.' : 'Trackora gives your store a visibility layer over delivery.',
      productLabel: ar ? 'بوابة للتاجر والعميل' : 'Portal for merchant and customer',
      outcomesTitle: ar ? 'تجربة توصيل أهدأ لعملائك وفريقك.' : 'A calmer delivery experience for customers and your team.',
      outcomesLead: ar ? 'طلبات واضحة، تتبع واضح، وتحصيل نقدي يمكن مراجعته بدون فوضى.' : 'Clear orders, clear tracking, and COD that can be reviewed without chaos.',
      workflowTitle: ar ? 'من رفع الطلب إلى متابعة العميل.' : 'From order upload to customer follow-up.',
      workflowLead: ar ? 'التاجر يرى الحالة، والعميل يحصل على تتبع، والفريق يقلل المكالمات المتكررة.' : 'The merchant sees status, the customer gets tracking, and the team reduces repeated calls.',
      featuresTitle: ar ? 'القدرات الأقرب لتجربة المتجر.' : 'Capabilities closest to the store experience.',
      featuresLead: ar ? 'بوابة، رفع، تحصيل، ورؤية أداء تساعدك على تحسين تجربة التوصيل.' : 'Portal, upload, COD, and performance visibility help improve delivery experience.',
      ctaTitle: ar ? 'امنح عملاء متجرك وضوحاً من أول شحنة.' : 'Give your customers clarity from the first shipment.',
      ctaLead: ar ? 'سنريك كيف يقل ضغط الدعم عندما تصبح حالة الشحنة واضحة للجميع.' : 'We will show how support pressure drops when shipment status is clear to everyone.',
    },
    'social-sellers': {
      painTitle: ar ? 'البيع من واتساب وإنستغرام لا يحتاج نظاماً معقداً.' : 'Selling from WhatsApp and Instagram should not need a complex system.',
      painLead: ar ? 'تحتاج رفع الطلب بسرعة، متابعة التحصيل، وتقليل الطلبات الوهمية بدون تدريب طويل.' : 'You need fast order upload, COD follow-up, and fewer fake orders without long training.',
      fitTitle: ar ? 'تراكورا يبقي العمل بسيطاً، لكن منظماً.' : 'Trackora keeps the work simple, but organized.',
      productLabel: ar ? 'تشغيل خفيف للبائعين' : 'Lightweight operations for sellers',
      outcomesTitle: ar ? 'أقل فوضى بين الرسائل والطلبات.' : 'Less chaos between messages and orders.',
      outcomesLead: ar ? 'طلباتك تدخل النظام بسرعة، والتحصيل والتتبع يصبحان أوضح بدون تعقيد.' : 'Orders enter the system quickly, while COD and tracking become clearer without complexity.',
      workflowTitle: ar ? 'مسار بسيط يناسب البائع اليومي.' : 'A simple flow for daily sellers.',
      workflowLead: ar ? 'من رسالة العميل إلى التوصيل والتحصيل، يبقى كل شيء قابلاً للمتابعة.' : 'From customer message to delivery and COD, everything stays trackable.',
      featuresTitle: ar ? 'قدرات خفيفة لكنها مؤثرة.' : 'Lightweight capabilities with real impact.',
      featuresLead: ar ? 'رفع سريع، تتبع، كشف طلبات مشبوهة، ومحفظة نقدي واضحة.' : 'Fast upload, tracking, suspicious order detection, and a clear COD wallet.',
      ctaTitle: ar ? 'ابدأ بدون تعقيد أنظمة كبيرة.' : 'Start without the complexity of big systems.',
      ctaLead: ar ? 'شاهد كيف يمكن لتراكورا تنظيم طلباتك اليومية من أول أسبوع.' : 'See how Trackora can organize your daily orders from the first week.',
    },
  }

  return copy[solution.value.key as keyof typeof copy]
})

const audienceStory = computed(() => storyMap.value)

useScrollReveal()

useHead({
  title: locale.value === 'ar' ? solution.value.seoTitleAr : solution.value.seoTitleEn,
  meta: [
    { name: 'description', content: locale.value === 'ar' ? solution.value.seoDescriptionAr : solution.value.seoDescriptionEn },
    { property: 'og:title', content: locale.value === 'ar' ? solution.value.seoTitleAr : solution.value.seoTitleEn },
    { property: 'og:description', content: locale.value === 'ar' ? solution.value.seoDescriptionAr : solution.value.seoDescriptionEn },
  ],
  htmlAttrs: { lang: locale.value, dir: locale.value === 'ar' ? 'rtl' : 'ltr' },
})
</script>

<style scoped>
.solution-hero,
.solution-cta {
  position: relative;
  overflow: hidden;
}

.solution-hero::before,
.solution-hero::after,
.solution-cta::before {
  content: '';
  position: absolute;
  pointer-events: none;
  border-radius: var(--radius-full);
}

.solution-hero::before {
  width: 34rem;
  height: 34rem;
  inset-block-start: -15rem;
  inset-inline-start: -12rem;
  background: rgba(255, 255, 255, 0.08);
}

.solution-hero::after {
  width: 24rem;
  height: 24rem;
  inset-block-end: -11rem;
  inset-inline-end: 10%;
  background: rgba(232, 168, 56, 0.12);
  filter: blur(12px);
}

.solution-hero__layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(20rem, 0.92fr);
  gap: var(--spacing-16);
  align-items: center;
}

.solution-hero__content {
  max-width: 46rem;
}

.solution-hero__audience,
.solution-kicker,
.solution-cta__eyebrow {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-block-end: var(--spacing-4);
}

.solution-hero__audience,
.solution-cta__eyebrow {
  color: rgba(255, 255, 255, 0.72);
}

.solution-kicker {
  color: var(--color-primary-light);
}

.solution-hero__title {
  font-size: clamp(3rem, 8vw, 6.25rem);
  color: var(--color-text-light);
  letter-spacing: -0.05em;
  line-height: 1.02;
  margin-block-end: var(--spacing-6);
}

html[lang='ar'] .solution-hero__title {
  letter-spacing: -0.02em;
}

.solution-hero__subtitle {
  max-width: 42rem;
  font-size: clamp(1.125rem, 2vw, 1.35rem);
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.9;
  margin-block-end: var(--spacing-8);
}

.solution-hero__actions {
  display: flex;
  gap: var(--spacing-4);
  flex-wrap: wrap;
}

.solution-stage {
  position: relative;
  min-height: clamp(24rem, 44vw, 35rem);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-4xl);
  background:
    radial-gradient(circle at 50% 44%, rgba(255, 255, 255, 0.16), transparent 28%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04));
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.18);
  overflow: hidden;
}

.solution-stage::before,
.solution-stage::after {
  content: '';
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 48%;
}

.solution-stage::before { inset: 12%; }
.solution-stage::after { inset: 25%; transform: rotate(26deg); }

.solution-stage__core {
  position: absolute;
  inset: 50% auto auto 50%;
  z-index: 2;
  display: grid;
  gap: var(--spacing-3);
  place-items: center;
  width: clamp(10rem, 18vw, 13rem);
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 34%;
  background: rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 24px 60px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  color: rgba(255, 255, 255, 0.76);
  font-weight: 800;
}

.solution-stage__icon {
  position: absolute;
  z-index: 1;
}

.solution-stage__icon--1 { inset-block-start: 9%; inset-inline-start: 12%; }
.solution-stage__icon--2 { inset-block-start: 13%; inset-inline-end: 10%; }
.solution-stage__icon--3 { inset-block-end: 11%; inset-inline-start: 18%; }
.solution-stage__icon--4 { inset-block-end: 12%; inset-inline-end: 16%; }
.solution-stage__icon--5 { inset-block-start: 42%; inset-inline-end: 5%; }

.solution-split,
.solution-fit__layout,
.solution-workflow__layout {
  display: grid;
  grid-template-columns: minmax(15rem, 0.55fr) minmax(0, 1fr);
  gap: var(--spacing-16);
  align-items: start;
}

.solution-split__intro {
  position: sticky;
  inset-block-start: var(--spacing-8);
}

.solution-split__intro h2,
.solution-fit__content h2 {
  font-size: clamp(2.25rem, 5vw, 4.25rem);
  letter-spacing: -0.04em;
  margin-block-end: var(--spacing-6);
}

html[lang='ar'] .solution-split__intro h2,
html[lang='ar'] .solution-fit__content h2 {
  letter-spacing: -0.015em;
}

.solution-split__intro p:not(.solution-kicker),
.solution-fit__content p:not(.solution-kicker) {
  font-size: clamp(1.125rem, 2vw, 1.35rem);
  color: var(--color-text-secondary);
  line-height: 1.95;
}

.solution-pain__list {
  display: grid;
  gap: var(--spacing-4);
}

.solution-pain__item,
.solution-workflow__step {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-5);
  padding: var(--spacing-6);
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-3xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.solution-pain__number,
.solution-workflow__number {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: var(--color-text-light);
  font-family: var(--font-heading);
  font-weight: 800;
  box-shadow: 0 10px 24px rgba(27, 77, 92, 0.18);
}

.solution-pain__item span:last-child,
.solution-workflow__text {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.solution-fit__layout {
  align-items: center;
}

.solution-product {
  position: relative;
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-4xl);
  background:
    radial-gradient(circle at 30% 18%, rgba(255, 255, 255, 0.95), transparent 34%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.94), rgba(245, 245, 245, 0.72));
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.solution-product::before {
  content: '';
  position: absolute;
  width: 18rem;
  height: 18rem;
  inset-block-start: -8rem;
  inset-inline-end: -7rem;
  border-radius: var(--radius-full);
  background: rgba(45, 110, 125, 0.08);
}

.solution-product__bar {
  display: flex;
  gap: var(--spacing-2);
  padding: var(--spacing-5) var(--spacing-6);
  border-block-end: 1px solid rgba(27, 77, 92, 0.08);
}

.solution-product__bar span {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: var(--radius-full);
  background: rgba(27, 77, 92, 0.22);
}

.solution-product__body {
  position: relative;
  z-index: 1;
  display: grid;
  gap: var(--spacing-8);
  min-height: 28rem;
  padding: clamp(var(--spacing-8), 5vw, var(--spacing-12));
  align-content: center;
}

.solution-product__copy {
  display: grid;
  gap: var(--spacing-2);
}

.solution-product__copy span {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-weight: 800;
}

.solution-product__copy strong {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  color: var(--color-text);
  line-height: 1.15;
}

.solution-product__rows {
  display: grid;
  gap: var(--spacing-3);
}

.solution-product__rows span {
  height: 0.65rem;
  border-radius: var(--radius-full);
  background: rgba(27, 77, 92, 0.1);
}

.solution-product__rows span:nth-child(2) { width: 78%; }
.solution-product__rows span:nth-child(3) { width: 58%; }

.solution-outcomes__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-5);
}

.solution-outcomes__card {
  position: relative;
  display: flex;
  min-height: 16rem;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--spacing-8);
  padding: var(--spacing-6);
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-3xl);
  background: linear-gradient(180deg, rgba(45, 110, 125, 0.05), var(--color-surface));
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.solution-outcomes__card::before {
  content: '';
  position: absolute;
  width: 10rem;
  height: 10rem;
  inset-block-start: -5rem;
  inset-inline-end: -4rem;
  border-radius: var(--radius-full);
  background: rgba(45, 110, 125, 0.08);
}

.solution-outcomes__icon,
.solution-outcomes__count,
.solution-outcomes__card p {
  position: relative;
  z-index: 1;
}

.solution-outcomes__count {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 800;
  color: var(--color-primary-light);
}

.solution-outcomes__card p {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.7;
}

.solution-workflow__header {
  margin-block-end: 0;
}

.solution-workflow__steps {
  display: grid;
  gap: var(--spacing-4);
}

.solution-features__grid,
.solution-related__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: var(--spacing-6);
}

.solution-features__card,
.solution-related__card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 24rem;
  padding: var(--spacing-8);
  color: inherit;
  text-decoration: none;
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-4xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: transform 0.3s var(--reveal-easing), box-shadow 0.3s ease, border-color 0.3s ease;
}

.solution-features__card::before,
.solution-related__card::before {
  content: '';
  position: absolute;
  width: 14rem;
  height: 14rem;
  inset-block-start: -7rem;
  inset-inline-end: -6rem;
  border-radius: var(--radius-full);
  background: rgba(45, 110, 125, 0.08);
}

.solution-features__card:hover,
.solution-related__card:hover {
  transform: translateY(-6px);
  border-color: rgba(27, 77, 92, 0.16);
  box-shadow: var(--shadow-lg);
}

.solution-features__icon,
.solution-related__icon,
.solution-features__title,
.solution-related__title,
.solution-features__text,
.solution-related__text,
.solution-features__link,
.solution-related__link {
  position: relative;
  z-index: 1;
}

.solution-features__icon,
.solution-related__icon {
  margin-block-end: var(--spacing-8);
}

.solution-features__title,
.solution-related__title {
  font-size: var(--text-xl);
  margin-block-end: var(--spacing-3);
}

.solution-features__text,
.solution-related__text {
  flex-grow: 1;
  color: var(--color-text-secondary);
  line-height: 1.75;
  margin-block-end: var(--spacing-8);
}

.solution-features__link,
.solution-related__link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 800;
  color: var(--color-primary);
}

.solution-features__link::after,
.solution-related__link::after {
  content: '←';
}

html[lang='en'] .solution-features__link::after,
html[lang='en'] .solution-related__link::after {
  content: '→';
}

.solution-cta::before {
  width: 28rem;
  height: 28rem;
  inset-block-start: -15rem;
  inset-inline-start: 50%;
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(-50%);
}

.solution-cta__inner {
  position: relative;
  z-index: 1;
  text-align: center;
}

.solution-cta__title {
  font-size: clamp(2rem, 5vw, 4rem);
  color: var(--color-text-light);
  letter-spacing: -0.035em;
  margin-block-end: var(--spacing-4);
}

.solution-cta__text {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.85;
  margin-block-end: var(--spacing-8);
}

@media (max-width: 70rem) {
  .solution-outcomes__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 64rem) {
  .solution-hero__layout,
  .solution-split,
  .solution-fit__layout,
  .solution-workflow__layout {
    grid-template-columns: 1fr;
  }

  .solution-split__intro {
    position: static;
  }
}

@media (max-width: 48rem) {
  .solution-hero__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .solution-stage {
    min-height: 28rem;
  }

  .solution-stage__icon {
    transform: scale(0.82);
  }

  .solution-product__body {
    min-height: 22rem;
  }

  .solution-outcomes__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 36rem) {
  .solution-stage__core {
    width: 8.5rem;
  }

  .solution-stage__icon--5 {
    inset-inline-end: -4%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .solution-features__card:hover,
  .solution-related__card:hover {
    transform: none;
  }
}
</style>
