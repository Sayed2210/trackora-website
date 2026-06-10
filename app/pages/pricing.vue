<template>
  <div class="pricing-page" :dir="isArabic ? 'rtl' : 'ltr'">
    <section class="pricing-hero" aria-labelledby="pricing-heading">
      <AppContainer wide>
        <div class="pricing-hero__grid">
          <div class="pricing-hero__content reveal-up">
            <p class="pricing-hero__eyebrow">{{ locale === 'ar' ? 'تسعير حسب التشغيل' : 'Pricing by operation size' }}</p>
            <h1 id="pricing-heading" class="pricing-hero__title">{{ t('pricing.heading') }}</h1>
            <p class="pricing-hero__text">{{ t('pricing.subtitle') }}</p>
            <div class="pricing-hero__actions">
              <AppButton :to="localePath('/request-demo?plan=growth')" variant="primary">
                {{ locale === 'ar' ? 'اطلب عرض لخطة النمو' : 'Request a Growth demo' }}
              </AppButton>
              <AppButton :to="localePath('/contact?topic=pricing')" variant="outline">
                {{ locale === 'ar' ? 'تحدث مع فريق Trackora' : 'Talk to Trackora' }}
              </AppButton>
            </div>
          </div>

          <aside class="pricing-hero__panel" :aria-label="copy.hero.panelLabel">
            <div class="pricing-ledger__top">
              <span>{{ copy.hero.panelTitle }}</span>
              <strong>{{ copy.hero.panelStatus }}</strong>
            </div>
            <div class="pricing-ledger__body">
              <div v-for="item in copy.hero.panelItems" :key="item.label" class="pricing-ledger__row">
                <span>{{ item.label }}</span>
                <strong>{{ item.value }}</strong>
                <small>{{ item.note }}</small>
              </div>
            </div>
          </aside>
        </div>
      </AppContainer>
    </section>

    <section class="pricing-section pricing-section--plans" aria-labelledby="plans-heading">
      <AppContainer wide>
        <div class="pricing-section__header pricing-section__header--center">
          <p class="pricing-kicker pricing-kicker--light">{{ copy.plans.kicker }}</p>
          <h2 id="plans-heading">{{ copy.plans.title }}</h2>
          <p>{{ copy.plans.lead }}</p>
        </div>

        <div class="plan-grid">
          <article v-for="plan in copy.plans.items" :key="plan.id" :class="['plan-card', plan.recommended ? 'plan-card--recommended' : '']">
            <div class="plan-card__top">
              <div>
                <h3>{{ plan.name }}</h3>
              </div>
              <span v-if="plan.recommended" class="plan-card__badge">{{ copy.plans.recommended }}</span>
            </div>
            <p class="plan-card__description">{{ plan.description }}</p>
            <div class="plan-card__price">
              <strong>{{ plan.price }}</strong>
              <span>{{ plan.priceNote }}</span>
            </div>
            <p class="plan-card__best">{{ plan.bestFor }}</p>
            <ul class="plan-card__features">
              <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
            </ul>
            <NuxtLink :class="['pricing-btn', plan.recommended ? 'pricing-btn--primary' : 'pricing-btn--outline']" :to="localePath(plan.ctaTo)">
              {{ plan.cta }}
            </NuxtLink>
          </article>
        </div>
      </AppContainer>
    </section>

    <section class="pricing-section comparison-section" aria-labelledby="comparison-heading">
      <AppContainer wide>
        <div class="pricing-section__header">
          <p class="pricing-kicker pricing-kicker--light">{{ copy.comparison.kicker }}</p>
          <h2 id="comparison-heading">{{ copy.comparison.title }}</h2>
          <p>{{ copy.comparison.lead }}</p>
        </div>

        <div class="comparison-table" role="region" :aria-label="copy.comparison.tableLabel" :tabindex="comparisonTabIndex">
          <table>
            <thead>
              <tr>
                <th scope="col">{{ copy.comparison.featureLabel }}</th>
                <th v-for="plan in copy.comparison.plans" :key="plan" scope="col">{{ plan }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in copy.comparison.rows" :key="row.feature">
                <th scope="row">{{ row.feature }}</th>
                <td v-for="(value, index) in row.values" :key="`${row.feature}-${index}`" :data-label="copy.comparison.plans[index]">
                  {{ value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AppContainer>
    </section>

    <section class="pricing-objections section" aria-labelledby="pricing-objections-heading">
      <AppContainer>
        <div class="pricing-section-head reveal-up">
          <h2 id="pricing-objections-heading" class="pricing-section-head__title">
            {{ locale === 'ar' ? 'قبل اختيار الخطة، راجع حدود التشغيل' : 'Before choosing, check operation limits' }}
          </h2>
          <p class="pricing-section-head__text">
            {{ locale === 'ar' ? 'التسعير في Trackora يرتبط بالشحنات، المستخدمين، المناديب، تحصيل COD، والتسوية. هذه هي التفاصيل التي تمنع المفاجآت أثناء النمو.' : 'Trackora pricing follows shipments, users, couriers, COD collection, and settlement. These details prevent surprises as volume grows.' }}
          </p>
        </div>

        <div class="pricing-objections__grid">
          <article v-for="(item, i) in pricingObjections" :key="i" class="pricing-objections__item reveal-stagger">
            <h3 class="pricing-objections__title">{{ locale === 'ar' ? item.titleAr : item.titleEn }}</h3>
            <p class="pricing-objections__text">{{ locale === 'ar' ? item.textAr : item.textEn }}</p>
          </article>
        </div>
      </AppContainer>
    </section>

    <section class="pricing-plans section" :aria-label="plansLabel">
      <AppContainer>
        <div v-if="plansService.loading.value" class="pricing__notice" aria-live="polite">
          {{ locale === 'ar' ? 'نراجع أي تحديثات متاحة للأسعار، والخطط المحلية ظاهرة الآن.' : 'Checking for pricing updates. Local plans are visible now.' }}
        </div>
        <div v-else-if="plansService.error.value || plansService.usedFallback.value" class="pricing__notice pricing__notice--soft" aria-live="polite">
          {{ locale === 'ar' ? 'نعرض خطط Trackora المحلية الآمنة حالياً. يمكنك طلب عرض لتأكيد السعر حسب حجم التشغيل.' : 'Showing safe Trackora local plans. Request a quote to confirm pricing for your operation size.' }}
        </div>

        <div class="pricing__grid">
          <PricingCard v-for="plan in displayedPlans" :key="plan.id" :plan="plan" />
        </div>
      </AppContainer>
    </section>

    <section class="pricing-comparison section section--alt" aria-labelledby="pricing-comparison-heading">
      <AppContainer>
        <div class="pricing-section-head pricing-section-head--compact reveal-up">
          <h2 id="pricing-comparison-heading" class="pricing-section-head__title">
            {{ locale === 'ar' ? 'قارن تفاصيل التشغيل' : 'Compare operation details' }}
          </h2>
          <p class="pricing-section-head__text">
            {{ locale === 'ar' ? 'الجدول يوضح ما يحصل عليه فريقك في الشحن، المناديب، COD، التقارير، والدعم الفني.' : 'This table shows what your team gets across shipments, couriers, COD, reports, and support.' }}
          </p>
        </div>

        <div class="pricing-comparison__scroll" tabindex="0" :aria-label="comparisonLabel">
          <table class="pricing-comparison__table">
            <thead>
              <tr>
                <th scope="col">{{ locale === 'ar' ? 'البند' : 'Item' }}</th>
                <th scope="col">{{ locale === 'ar' ? 'البداية' : 'Starter' }}</th>
                <th scope="col" class="pricing-comparison__recommended">{{ locale === 'ar' ? 'النمو' : 'Growth' }}</th>
                <th scope="col">{{ locale === 'ar' ? 'التوسع' : 'Scale' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in pricingComparisonRows" :key="row.featureEn">
                <th scope="row">{{ locale === 'ar' ? row.featureAr : row.featureEn }}</th>
                <td>{{ locale === 'ar' ? row.starterAr : row.starterEn }}</td>
                <td class="pricing-comparison__recommended">{{ locale === 'ar' ? row.growthAr : row.growthEn }}</td>
                <td>{{ locale === 'ar' ? row.scaleAr : row.scaleEn }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </AppContainer>
    </section>

    <section class="pricing-section enterprise-section" aria-labelledby="enterprise-heading">
      <AppContainer wide>
        <div class="enterprise-card">
          <div>
            <h2 id="enterprise-heading">{{ copy.enterprise.title }}</h2>
            <p>{{ copy.enterprise.lead }}</p>
          </div>
          <ul>
            <li v-for="item in copy.enterprise.items" :key="item">{{ item }}</li>
          </ul>
          <NuxtLink class="pricing-btn pricing-btn--accent" :to="localePath('/contact')">
            {{ copy.enterprise.cta }}
          </NuxtLink>
        </div>
      </AppContainer>
    </section>

    <section class="pricing-cta section section--dark" aria-labelledby="pricing-cta-heading">
      <AppContainer narrow>
        <div class="pricing-cta__inner reveal-scale">
          <h2 id="pricing-cta-heading" class="pricing-cta__title">{{ locale === 'ar' ? 'اختر الخطة حسب حجم التشغيل' : 'Choose by operation size' }}</h2>
          <p class="pricing-cta__text">{{ locale === 'ar' ? 'شاركنا عدد الشحنات، المناديب، وحجم تحصيل COD. فريق Trackora يوضح الخطة المناسبة والتكلفة المتوقعة.' : 'Share shipment volume, couriers, and COD collection size. The Trackora team will explain the right plan and expected cost.' }}</p>
          <AppButton :to="localePath('/contact?topic=pricing')" variant="primary">{{ locale === 'ar' ? 'تحدث مع فريق Trackora' : 'Talk to Trackora' }}</AppButton>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { pricingFaqItems } from '~/data/forms'
import { pricingComparisonRows, pricingObjections, pricingPlans } from '~/data/pricing'
import PricingCard from '~/components/pricing/PricingCard.vue'
import type { PublicPlan } from '~/types/pricing'


<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const { setSeo } = useLocaleSeo()

const isArabic = computed(() => locale.value === 'ar')
const comparisonTabIndex = ref<number | null>(null)
let removeComparisonFocusListener: (() => void) | null = null

const pageCopy = {
  ar: {
    seoTitle: 'أسعار Trackora | خطط إدارة الشحنات والتحصيل',
    seoDescription: 'خطط واضحة لشركات الشحن والمتاجر والسوشيال سيلرز لإدارة الشحنات، الديسباتش، المناديب، التتبع، ومحفظة التحصيل عند التسليم.',
    hero: {
      kicker: 'أسعار مبنية على حجم التشغيل',
      title: 'خطط واضحة لإدارة الشحنات والتحصيل بدون مفاجآت',
      lead: 'اختر نقطة بداية تناسب فريقك اليوم، ثم وسع Trackora مع زيادة الشحنات، المناديب، التجار، واحتياج التسوية المالية.',
      primaryCta: 'اطلب عرض توضيحي',
      secondaryCta: 'تواصل معنا لتسعير مخصص',
      actionsLabel: 'إجراءات التسعير الرئيسية',
      panelLabel: 'مثال على عوامل التسعير في Trackora',
      panelTitle: 'ما الذي يؤثر على السعر؟',
      panelStatus: 'واضح قبل التعاقد',
      panelItems: [
        { label: 'حجم الشحنات', value: 'شهري', note: 'من أول فريق تشغيل حتى عمليات متعددة الفروع' },
        { label: 'محفظة التحصيل', value: 'حسب الاستخدام', note: 'تحصيل، معلق، مرتجع، وتسوية حسب التاجر والمندوب' },
        { label: 'الدعم والإعداد', value: 'ضمن الاتفاق', note: 'مساعدة في التشغيل الأول وتهيئة الفريق' },
      ],
    },
    plans: {
      kicker: 'الباقات',
      title: 'ابدأ بالخطة التي تشبه يوم تشغيلك',
      lead: 'كل خطة تغطي دورة الشحنة الأساسية: إدخال الطلب، التوزيع، تحديث الحالة، التتبع، ومراجعة التحصيل.',
      recommended: 'الأكثر مناسبة',
      items: [
        {
          id: 'starter',
          name: 'البداية',
          description: 'للفرق التي تريد نقل الطلبات والتتبع من الجداول إلى نظام منظم.',
          price: 'حسب حجم الشحنات',
          priceNote: 'فاتورة شهرية واضحة',
          bestFor: 'الأفضل لأول فريق تشغيل أو متجر يبدأ تنظيم الشحن.',
          features: ['حتى ١٬٠٠٠ شحنة شهريا', '٣ مستخدمين إداريين', 'حتى ١٠ مناديب', 'بوابة تاجر واحدة', 'تتبع شحنات عام', 'تقارير أساسية', 'دعم عبر البريد أو واتساب'],
          cta: 'ابدأ بخطة البداية',
          ctaTo: '/request-demo?plan=starter',
        },
        {
          id: 'growth',
          name: 'النمو',
          description: 'لشركات الشحن والمتاجر التي تحتاج ديسباتش، مناديب، تحصيل عند التسليم، وتقارير يومية في مكان واحد.',
          price: 'حسب حجم الشحنات',
          priceNote: 'الخطة الموصى بها',
          bestFor: 'الأفضل لعمليات تحصيل نشطة وفريق ديسباتش يومي.',
          features: ['حتى ١٠٬٠٠٠ شحنة شهريا', '١٠ مستخدمين إداريين', 'حتى ٧٥ مندوبا', 'بوابات تجار متعددة', 'التوزيع الذكي', 'تطبيق المندوب', 'محفظة التحصيل عند التسليم', 'الرفع الجماعي', 'تقارير تشغيلية متقدمة', 'دعم في مرحلة التشغيل الأولى'],
          cta: 'اطلب عرض لخطة النمو',
          ctaTo: '/request-demo?plan=growth',
          recommended: true,
        },
        {
          id: 'scale',
          name: 'التوسع',
          description: 'لشركات الشحن عالية الحجم التي تحتاج صلاحيات، فروع، تقارير، وسير عمل مخصص.',
          price: 'تسعير مخصص',
          priceNote: 'حسب الفروع والتدفقات',
          bestFor: 'الأفضل لعمليات متعددة الفروع وتجار كثيرين.',
          features: ['شحنات شهرية عالية الحجم', 'مستخدمون وصلاحيات متقدمة', 'عدد مناديب قابل للتوسع', 'فروع ومناطق متعددة', 'كشف الاحتيال', 'تقارير إدارة متقدمة', 'سير عمل مخصص', 'دعم مخصص للإطلاق والتشغيل'],
          cta: 'احصل على تسعير مخصص',
          ctaTo: '/contact?topic=scale-pricing',
        },
      ],
    },
    comparison: {
      kicker: 'مقارنة الخطط',
      title: 'قارن القدرات قبل طلب العرض',
      lead: 'استخدم الجدول لتحديد ما تحتاجه الآن وما يمكن إضافته مع توسع الشحنات والتجار والمناديب.',
      tableLabel: 'جدول مقارنة خطط Trackora',
      featureLabel: 'القدرة',
      plans: ['البداية', 'النمو', 'التوسع'],
      rows: [
        { feature: 'عدد الشحنات شهريا', values: ['حتى ١٬٠٠٠', 'حتى ١٠٬٠٠٠', 'حسب الاتفاق'] },
        { feature: 'عدد المستخدمين', values: ['٣ مستخدمين إداريين', '١٠ مستخدمين إداريين', 'حسب الفروع والصلاحيات'] },
        { feature: 'عدد المناديب', values: ['حتى ١٠ مناديب', 'حتى ٧٥ مندوبا', 'قابل للتوسع حسب المناطق'] },
        { feature: 'بوابة التاجر', values: ['تاجر واحد', 'تجار متعددون', 'تجار وفروع متعددة'] },
        { feature: 'تطبيق المندوب', values: ['أساسي', 'كامل', 'كامل مع صلاحيات'] },
        { feature: 'محفظة التحصيل عند التسليم', values: ['مراجعة أساسية', 'تحصيل وتسوية', 'تسوية متقدمة'] },
        { feature: 'التوزيع الذكي', values: ['غير متاح', 'متاح', 'متقدم حسب المناطق'] },
        { feature: 'الرفع الجماعي', values: ['متاح', 'متاح مع تحقق أخطاء', 'تدفقات مخصصة'] },
        { feature: 'التتبع العام', values: ['متاح', 'متاح', 'متاح مع تخصيص'] },
        { feature: 'كشف الاحتيال', values: ['غير متاح', 'إشارات أساسية', 'قواعد متقدمة'] },
        { feature: 'التقارير والتحليلات', values: ['تقارير أساسية', 'تقارير تشغيلية', 'تقارير إدارة متقدمة'] },
        { feature: 'مستوى الدعم', values: ['بريد وواتساب', 'دعم تشغيل أولي', 'دعم مخصص'] },
        { feature: 'دعم الإعداد والتشغيل', values: ['دليل بدء', 'جلسة إعداد وتشغيل أولى', 'إعداد وتدريب مخصص'] },
        { feature: 'ماذا يحدث عند تجاوز الاستخدام؟', values: ['نقترح الانتقال للنمو', 'نراجع الحدود والتكلفة', 'نضبط السعة حسب الاتفاق'] },
      ],
    },
    reassurance: {
      kicker: 'طمأنة قبل القرار',
      title: 'التسعير واضح من أول محادثة',
      lead: 'نربط السعر بحجم التشغيل الفعلي حتى لا تدفع مقابل قدرات لا يستخدمها الفريق، ولا تتفاجأ بتكاليف إعداد مخفية.',
      items: [
        { marker: '01', title: 'لا توجد رسوم إعداد مخفية', text: 'نوضح تكلفة الإعداد والتشغيل قبل التعاقد، بما في ذلك تهيئة البيانات والفريق.' },
        { marker: '02', title: 'مناسب للتجربة مع أول فريق تشغيل', text: 'ابدأ بفريق ديسباتش أو تاجر واحد، ثم وسع الاستخدام بعد ثبات الدورة.' },
        { marker: '03', title: 'قابل للتوسع حسب حجم الشحنات', text: 'أضف مناديب، تجار، مناطق، وتقارير عندما يزيد حجم العملية.' },
        { marker: '04', title: 'دعم في مرحلة التشغيل الأولى', text: 'نساعد الفريق على فهم رفع الطلبات، إسناد المناديب، تتبع الحالات، وتسوية التحصيل.' },
      ],
    },
    enterprise: {
      kicker: 'تسعير مخصص',
      title: 'لشركات الشحن عالية الحجم ومتعددة الفروع',
      lead: 'إذا كانت العملية تشمل مناطق كثيرة، مناديب متعددين، تجار كبار، أو تقارير إدارية خاصة، نبني التسعير حول تدفقك الفعلي.',
      items: ['فروع ومناطق متعددة', 'تقارير متقدمة للإدارة والتحصيل', 'سير عمل مخصص للتوزيع والمرتجعات', 'صلاحيات فرق ومراجعات مالية', 'دعم مخصص في الإطلاق والتوسع'],
      cta: 'احصل على تسعير مخصص',
    },
    faq: {
      kicker: 'أسئلة التسعير',
      title: 'إجابات سريعة قبل طلب العرض',
      items: [
        { question: 'هل الأسعار ثابتة أم حسب عدد الشحنات؟', answer: 'الأسعار ترتبط غالبا بحجم الشحنات، عدد المستخدمين، عدد المناديب، واحتياج التحصيل والتقارير. نوضح التفاصيل في العرض.' },
        { question: 'هل يوجد فترة تجربة؟', answer: 'يمكن ترتيب تجربة أو تشغيل أولي محدود حسب حجم العملية والبيانات المتاحة.' },
        { question: 'هل يمكن تغيير الخطة لاحقا؟', answer: 'نعم. يمكن الانتقال لخطة أعلى أو تعديل الحدود عند زيادة الشحنات أو عدد التجار والمناديب.' },
        { question: 'هل تدعمون شركات الشحن متعددة الفروع؟', answer: 'نعم. خطة التوسع مناسبة للفروع والمناطق المتعددة والصلاحيات المتقدمة.' },
        { question: 'هل محفظة التحصيل ضمن كل الخطط؟', answer: 'توجد مراجعة تحصيل أساسية في البداية، وتصبح المحفظة والتسوية التفصيلية أوضح في النمو والتوسع.' },
        { question: 'هل يوجد رسوم على التتبع أو المناديب؟', answer: 'يعتمد ذلك على الخطة وحجم الاستخدام. نوضح عدد المناديب وحدود التتبع ضمن عرض السعر.' },
      ],
    },
    finalCta: {
      kicker: 'الخطوة التالية',
      title: 'جاهز تنظم الشحنات والتحصيل؟',
      lead: 'احجز عرضا توضيحيا مبنيا على حجم شحناتك، مناطق التوصيل، عدد المناديب، وطريقة تسوية التحصيل.',
      cta: 'اطلب عرض توضيحي الآن',
    },
  },
  en: {
    seoTitle: 'Trackora Pricing | Shipment and COD Management Plans',
    seoDescription: 'Clear plans for shipping companies, ecommerce stores, and social sellers managing shipments, dispatch, couriers, tracking, and COD wallets.',
    hero: {
      kicker: 'Pricing built around operations volume',
      title: 'Clear pricing for shipment and COD operations',
      lead: 'Choose a starting point that fits your team today, then scale Trackora as shipments, couriers, merchants, and reconciliation needs grow.',
      primaryCta: 'Request a demo',
      secondaryCta: 'Contact us for custom pricing',
      actionsLabel: 'Primary pricing actions',
      panelLabel: 'Trackora pricing factors example',
      panelTitle: 'What affects pricing?',
      panelStatus: 'Clear before signup',
      panelItems: [
        { label: 'Shipment volume', value: 'Monthly', note: 'From the first operations team to multi-branch delivery work' },
        { label: 'COD Wallet', value: 'Usage based', note: 'Collected, pending, returned, and settled by merchant and courier' },
        { label: 'Support and setup', value: 'Included in scope', note: 'Help with first launch and team onboarding' },
      ],
    },
    plans: {
      kicker: 'Plans',
      title: 'Start with the plan that matches your operation',
      lead: 'Every plan covers the core shipment cycle: order entry, dispatch, status updates, public tracking, and COD review.',
      recommended: 'Recommended',
      items: [
        {
          id: 'starter',
          name: 'Starter',
          description: 'For teams moving orders and tracking from spreadsheets into a structured system.',
          price: 'Based on shipment volume',
          priceNote: 'Clear monthly invoice',
          bestFor: 'Best for a first operations team or store organizing delivery.',
          features: ['Up to 1,000 shipments per month', '3 admin users', 'Up to 10 couriers', 'One merchant portal', 'Public shipment tracking', 'Basic reports', 'Email or WhatsApp support'],
          cta: 'Request Starter plan',
          ctaTo: '/request-demo?plan=starter',
        },
        {
          id: 'growth',
          name: 'Growth',
          description: 'For shipping companies and stores that need dispatch, couriers, COD, and daily reports in one place.',
          price: 'Based on shipment volume',
          priceNote: 'Recommended plan',
          bestFor: 'Best for active COD operations and daily dispatch teams.',
          features: ['Up to 10,000 shipments per month', '10 admin users', 'Up to 75 couriers', 'Multiple merchant portals', 'Smart Dispatch', 'Courier App', 'COD Wallet', 'Bulk Upload', 'Advanced operations reports', 'First launch support'],
          cta: 'Request Growth demo',
          ctaTo: '/request-demo?plan=growth',
          recommended: true,
        },
        {
          id: 'scale',
          name: 'Scale',
          description: 'For high-volume shipping companies that need permissions, branches, reports, and custom workflows.',
          price: 'Custom pricing',
          priceNote: 'Based on branches and workflows',
          bestFor: 'Best for multi-branch operations and many merchants.',
          features: ['High monthly shipment volume', 'Advanced users and roles', 'Scalable courier count', 'Multiple branches and zones', 'Fraud Detection', 'Advanced management reports', 'Custom workflows', 'Dedicated launch and operations support'],
          cta: 'Get custom pricing',
          ctaTo: '/contact?topic=scale-pricing',
        },
      ],
    },
    comparison: {
      kicker: 'Plan comparison',
      title: 'Compare capabilities before requesting a demo',
      lead: 'Use the table to decide what you need now and what can be added as shipments, merchants, and couriers grow.',
      tableLabel: 'Trackora plan comparison table',
      featureLabel: 'Capability',
      plans: ['Starter', 'Growth', 'Scale'],
      rows: [
        { feature: 'Shipments per month', values: ['Up to 1,000', 'Up to 10,000', 'Custom scope'] },
        { feature: 'Users', values: ['3 admin users', '10 admin users', 'By branches and roles'] },
        { feature: 'Couriers', values: ['Up to 10 couriers', 'Up to 75 couriers', 'Scales by zones'] },
        { feature: 'Merchant portal', values: ['One merchant', 'Multiple merchants', 'Multiple merchants and branches'] },
        { feature: 'Courier app', values: ['Basic', 'Full', 'Full with permissions'] },
        { feature: 'COD wallet', values: ['Basic review', 'Collection and settlement', 'Advanced settlement'] },
        { feature: 'Smart dispatch', values: ['Not included', 'Included', 'Advanced by zones'] },
        { feature: 'Bulk upload', values: ['Included', 'Included with error checks', 'Custom flows'] },
        { feature: 'Public tracking', values: ['Included', 'Included', 'Included with customization'] },
        { feature: 'Fraud detection', values: ['Not included', 'Basic signals', 'Advanced rules'] },
        { feature: 'Reports and analytics', values: ['Basic reports', 'Operations reports', 'Advanced management reports'] },
        { feature: 'Support level', values: ['Email and WhatsApp', 'First launch support', 'Dedicated support'] },
        { feature: 'Setup and launch support', values: ['Starter guide', 'Setup and first launch session', 'Custom setup and team training'] },
        { feature: 'If usage exceeds the plan', values: ['We suggest moving to Growth', 'We review limits and cost', 'Capacity is adjusted by agreement'] },
      ],
    },
    reassurance: {
      kicker: 'Decision reassurance',
      title: 'Pricing is clear from the first conversation',
      lead: 'We connect pricing to real operating volume so your team does not pay for unused capabilities or discover hidden setup costs later.',
      items: [
        { marker: '01', title: 'No hidden setup fees', text: 'We clarify setup and launch cost before signup, including data and team preparation.' },
        { marker: '02', title: 'Works for a first operations team', text: 'Start with one dispatch team or merchant, then expand after the cycle is stable.' },
        { marker: '03', title: 'Scales with shipment volume', text: 'Add couriers, merchants, zones, and reports when the operation grows.' },
        { marker: '04', title: 'Support during first launch', text: 'We help the team understand order upload, courier assignment, status tracking, and COD settlement.' },
      ],
    },
    enterprise: {
      kicker: 'Custom pricing',
      title: 'For high-volume and multi-branch shipping companies',
      lead: 'If your operation includes many zones, couriers, large merchants, or custom management reports, we shape pricing around your real workflow.',
      items: ['Multiple branches and zones', 'Advanced management and COD reports', 'Custom dispatch and returns workflows', 'Team permissions and financial reviews', 'Dedicated launch and scale support'],
      cta: 'Get custom pricing',
    },
    faq: {
      kicker: 'Pricing FAQ',
      title: 'Quick answers before requesting a demo',
      items: [
        { question: 'Are prices fixed or based on shipment count?', answer: 'Pricing is usually connected to shipment volume, users, courier count, and COD or reporting needs. We clarify the details in the proposal.' },
        { question: 'Is there a trial period?', answer: 'A limited trial or first launch phase can be arranged depending on operation size and available data.' },
        { question: 'Can we change plans later?', answer: 'Yes. You can move to a higher plan or adjust limits when shipments, merchants, or couriers increase.' },
        { question: 'Do you support multi-branch shipping companies?', answer: 'Yes. The Scale plan is built for branches, zones, advanced permissions, and higher-volume operations.' },
        { question: 'Is COD Wallet included in every plan?', answer: 'Starter includes basic COD review, while Growth and Scale include more detailed wallet and settlement workflows.' },
        { question: 'Are there fees for tracking or couriers?', answer: 'That depends on the plan and usage volume. We clarify courier limits and tracking scope in the pricing offer.' },
      ],
    },
    finalCta: {
      kicker: 'Next step',
      title: 'Ready to organize shipments and COD?',
      lead: 'Book a demo based on shipment volume, delivery zones, courier count, and COD settlement workflow.',
      cta: 'Request a demo now',
    },
  },
} as const

const plansLabel = computed(() => locale.value === 'ar' ? 'خطط أسعار Trackora' : 'Trackora pricing plans')
const comparisonLabel = computed(() => locale.value === 'ar' ? 'جدول مقارنة خطط Trackora' : 'Trackora plan comparison table')

const displayedPlans = computed<PublicPlan[]>(() => {
  const apiPlans = new Map<string, PublicPlan>()

  if (plansService.data.value && !plansService.usedFallback.value) {
    for (const plan of plansService.data.value) {
      const normalizedSlug = plan.slug === 'professional' ? 'growth' : plan.slug === 'enterprise' ? 'scale' : plan.slug
      apiPlans.set(normalizedSlug, plan)
    }
  }

  return pricingPlans.map((plan) => {
    const apiPlan = apiPlans.get(plan.slug)

    return {
      id: `local-${plan.slug}`,
      slug: plan.slug,
      name: locale.value === 'ar' ? plan.nameAr : plan.nameEn,
      audience: locale.value === 'ar' ? plan.audienceAr : plan.audienceEn,
      description: locale.value === 'ar' ? plan.descriptionAr : plan.descriptionEn,
      priceMonthly: apiPlan?.priceMonthly ?? plan.priceMonthly,
      priceYearly: apiPlan?.priceYearly ?? plan.priceYearly,
      currency: apiPlan?.currency ?? plan.currency,
      shipmentLimit: apiPlan?.shipmentLimit ?? plan.shipmentLimit,
      features: locale.value === 'ar' ? plan.featuresAr : plan.featuresEn,
      isPopular: plan.highlighted,
      ctaLabel: locale.value === 'ar' ? plan.ctaAr : plan.ctaEn,
      ctaHref: plan.ctaHref,
      overageNote: locale.value === 'ar' ? plan.overageAr : plan.overageEn,
      displayPrice: apiPlan?.priceMonthly != null || apiPlan?.priceYearly != null ? undefined : locale.value === 'ar' ? plan.priceAr : plan.priceEn,
    }
  })
})

onMounted(() => {
  plansService.fetchPlans()
})

setSeo(
  locale.value === 'ar' ? 'خطط وأسعار Trackora' : 'Trackora Plans and Pricing',
  locale.value === 'ar'
    ? 'قارن خطط Trackora حسب الشحنات شهرياً، المناديب، بوابة التاجر، محفظة COD، التسوية، والدعم.'
    : 'Compare Trackora plans by monthly shipments, couriers, merchant portal, COD wallet, settlement, and support.'
)
</script>

<style scoped>
.pricing-page {
  --pricing-primary: #1A3B66;
  --pricing-primary-light: #3B5998;
  --pricing-accent: #FF6B6B;
  --pricing-surface: #F5F5F5;
  --pricing-text: #333333;
  --pricing-ink: #0B1D33;
  --pricing-muted: #586274;
  --pricing-line: rgba(26, 59, 102, 0.14);
  --pricing-shadow: 0 24px 70px rgba(26, 59, 102, 0.14);
  --pricing-ease: cubic-bezier(0.22, 1, 0.36, 1);
  color: var(--pricing-text);
  background:
    radial-gradient(circle at 8% 8%, rgba(255, 107, 107, 0.1), transparent 26rem),
    linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 42%, #FFFFFF 100%);
  overflow: hidden;
}

.pricing-hero {
  padding-block: clamp(5rem, 8vw, 8.5rem) clamp(4rem, 7vw, 6.5rem);
  color: #FFFFFF;
  background:
    radial-gradient(circle at 16% 18%, rgba(255, 107, 107, 0.2), transparent 18rem),
    linear-gradient(145deg, #0A1D34 0%, var(--pricing-primary) 52%, var(--pricing-primary-light) 100%);
}

.pricing-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(24rem, 1.08fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.pricing-hero__content {
  max-width: 45rem;
}

.pricing-kicker {
  width: fit-content;
  display: inline-flex;
  margin-block-end: var(--spacing-4);
  border: 1px solid rgba(26, 59, 102, 0.1);
  border-radius: var(--radius-full);
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 800;
  box-shadow: var(--shadow-sm);
}

.pricing-hero__title {
  max-width: 13ch;
  margin-block-end: var(--spacing-6);
  font-size: var(--text-6xl);
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.pricing-hero__text {
  max-width: 43rem;
  color: var(--color-text-secondary);
  font-size: var(--text-xl);
  line-height: 1.8;
  text-wrap: pretty;
}

.pricing-hero__actions,
.final-pricing-cta__inner {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  align-items: center;
}

.pricing-hero__visual {
  position: relative;
  min-height: 27rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius-4xl);
  background: var(--gradient-hero);
  box-shadow: var(--shadow-glow);
}

.pricing-ledger__top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.15rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.76);
}

.pricing-ledger__top strong {
  border-radius: 999px;
  padding: 0.28rem 0.75rem;
  background: rgba(255, 107, 107, 0.18);
  color: #FFD8D8;
}

.pricing-ledger__body {
  display: grid;
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.pricing-ledger__row {
  display: grid;
  gap: 0.35rem;
  padding: clamp(1rem, 2vw, 1.35rem);
  background: rgba(255, 255, 255, 0.07);
}

.pricing-objections {
  padding-block-end: var(--spacing-12);
}

.pricing-section-head {
  max-width: 48rem;
  margin-block-end: var(--spacing-12);
}

.pricing-section-head--compact {
  margin-block-end: var(--spacing-8);
}

.pricing-section-head__title {
  margin-block-end: var(--spacing-4);
  color: var(--color-text);
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.16;
  text-wrap: balance;
}

.pricing-section-head__text {
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
  line-height: 1.8;
  text-wrap: pretty;
}

.pricing-objections__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-6);
}

.pricing-objections__item {
  border: 1px solid rgba(26, 59, 102, 0.1);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-8);
  background: var(--color-surface);
  box-shadow: 0 10px 28px rgba(26, 59, 102, 0.05);
}

.pricing-objections__title {
  margin-block-end: var(--spacing-3);
  color: var(--color-primary);
  font-size: var(--text-xl);
}

.pricing-objections__text {
  color: var(--color-text-secondary);
  line-height: 1.75;
}

.pricing-plans {
  padding-block-start: var(--spacing-8);
}

.pricing__notice {
  margin-block-end: var(--spacing-6);
  border: 1px solid rgba(59, 89, 152, 0.18);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-4) var(--spacing-6);
  background: rgba(59, 89, 152, 0.06);
  color: var(--color-primary-dark);
  font-size: var(--text-sm);
  font-weight: 700;
}

.pricing__notice--soft {
  border-color: rgba(245, 158, 11, 0.24);
  background: rgba(245, 158, 11, 0.08);
}

.pricing-section h2,
.final-pricing-cta h2 {
  color: var(--pricing-ink);
  font-size: clamp(2.15rem, 4.8vw, 4.2rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.pricing-section p,
.final-pricing-cta p {
  color: var(--pricing-muted);
  line-height: 1.85;
  text-wrap: pretty;
}

.plan-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  align-items: stretch;
}

.pricing-comparison__scroll {
  overflow-x: auto;
  border: 1px solid rgba(26, 59, 102, 0.1);
  border-radius: var(--radius-3xl);
  background: var(--color-surface);
  box-shadow: 0 12px 34px rgba(26, 59, 102, 0.06);
}

.pricing-comparison__scroll:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}

.pricing-comparison__table {
  width: 100%;
  min-width: 58rem;
  border-collapse: collapse;
  text-align: start;
}

.pricing-comparison__table th,
.pricing-comparison__table td {
  border-block-end: 1px solid rgba(26, 59, 102, 0.08);
  padding: var(--spacing-4) var(--spacing-5);
  vertical-align: top;
}

.pricing-comparison__table thead th {
  position: sticky;
  inset-block-start: 0;
  background: var(--color-bg-alt);
  color: var(--color-primary-dark);
  font-weight: 900;
}

.pricing-comparison__table tbody th {
  color: var(--color-text);
  font-weight: 800;
}

.pricing-comparison__table td {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.pricing-comparison__recommended {
  background: rgba(26, 59, 102, 0.045);
}

.pricing-faq__list {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  justify-content: space-between;
}

.plan-card__name-en {
  color: var(--pricing-accent);
  font-weight: 900;
}

.pricing-faq__question {
  margin-block-end: var(--spacing-3);
  font-size: var(--text-lg);
  font-weight: 700;
}

.plan-card__badge {
  flex: 0 0 auto;
  border-radius: 999px;
  padding: 0.34rem 0.72rem;
  color: #8F1D2B;
  background: rgba(255, 107, 107, 0.14);
  font-size: 0.82rem;
  font-weight: 900;
}

.pricing-cta__inner {
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-4xl);
  padding: var(--spacing-12);
  background: rgba(255, 255, 255, 0.08);
  text-align: center;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.pricing-cta__title {
  margin-block-end: var(--spacing-4);
  color: var(--color-text-light);
  font-size: var(--text-4xl);
  font-weight: 800;
}

.pricing-cta__text {
  margin-block-end: var(--spacing-8);
  color: rgba(255, 255, 255, 0.86);
  font-size: var(--text-lg);
  line-height: 1.7;
}

@media (max-width: 64rem) {
  .pricing-hero__grid,
  .pricing-objections__grid {
    grid-template-columns: 1fr;
  }

  .pricing-hero h1 {
    max-width: 14ch;
  }

  .plan-grid {
    grid-template-columns: 1fr;
    max-width: 30rem;
    margin-inline: auto;
  }

  .plan-card--recommended {
    transform: none;
  }
}

@media (max-width: 46rem) {
  .pricing-hero {
    padding-block-start: 4rem;
  }

  .pricing-hero__actions,
  .pricing-hero__actions :deep(.app-button) {
    width: 100%;
  }

  .plan-card__top {
    display: grid;
  }

  .comparison-table {
    overflow: visible;
    border: 0;
    box-shadow: none;
    background: transparent;
  }

  .comparison-table table,
  .comparison-table thead,
  .comparison-table tbody,
  .comparison-table tr,
  .comparison-table th,
  .comparison-table td {
    display: block;
    min-width: 0;
    width: 100%;
  }

  .comparison-table thead {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  .pricing-objections__item,
  .pricing-faq__item,
  .pricing-cta__inner {
    padding: var(--spacing-6);
  }

  .pricing-comparison__scroll {
    margin-inline: calc(-1 * var(--spacing-4));
    border-radius: var(--radius-2xl);
  }
}
</style>
