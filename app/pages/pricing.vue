<template>
  <div class="pricing-page" :dir="isArabic ? 'rtl' : 'ltr'">
    <section class="pricing-hero" aria-labelledby="pricing-heading">
      <AppContainer wide>
        <div class="pricing-hero__grid">
          <div class="pricing-hero__content">
            <p class="pricing-kicker">{{ copy.hero.kicker }}</p>
            <h1 id="pricing-heading">{{ copy.hero.title }}</h1>
            <p class="pricing-hero__lead">{{ copy.hero.lead }}</p>
            <div
              class="pricing-hero__actions"
              :aria-label="copy.hero.actionsLabel"
            >
              <NuxtLink
                class="pricing-btn pricing-btn--primary"
                :to="localePath('/request-demo')"
              >
                {{ copy.hero.primaryCta }}
              </NuxtLink>
              <NuxtLink
                class="pricing-btn pricing-btn--secondary"
                :to="localePath('/contact')"
              >
                {{ copy.hero.secondaryCta }}
              </NuxtLink>
            </div>
          </div>

          <aside class="pricing-hero__panel" :aria-label="copy.hero.panelLabel">
            <div class="pricing-ledger__top">
              <span>{{ copy.hero.panelTitle }}</span>
              <strong>{{ copy.hero.panelStatus }}</strong>
            </div>
            <div class="pricing-ledger__body">
              <div
                v-for="item in copy.hero.panelItems"
                :key="item.label"
                class="pricing-ledger__row"
              >
                <span>{{ item.label }}</span>
                <strong>{{ item.value }}</strong>
                <small>{{ item.note }}</small>
              </div>
            </div>
          </aside>
        </div>
      </AppContainer>
    </section>

    <section
      class="pricing-section pricing-section--plans"
      aria-labelledby="plans-heading"
    >
      <AppContainer wide>
        <div class="pricing-section__header pricing-section__header--center">
          <p class="pricing-kicker pricing-kicker--light">
            {{ copy.plans.kicker }}
          </p>
          <h2 id="plans-heading">{{ copy.plans.title }}</h2>
          <p>{{ copy.plans.lead }}</p>
        </div>

        <PricingLoadingState v-if="plansLoading" />
        <PricingErrorState v-else-if="plansError" @retry="handleRetry" />
        <PricingEmptyState v-else-if="plansIsEmpty" />
        <div v-else-if="plansData" class="plan-grid">
          <PricingCard
            v-for="plan in plansData"
            :key="plan.id"
            :plan="plan"
          />
        </div>

        <p
          v-if="plansUsedFallback"
          class="pricing-fallback-notice"
          role="status"
        >
          {{ isArabic ? 'عرض تجريبي — البيانات من نسخة محلية' : 'Preview — showing local fallback data' }}
        </p>
      </AppContainer>
    </section>

    <section
      class="pricing-section comparison-section"
      aria-labelledby="comparison-heading"
    >
      <AppContainer wide>
        <div class="pricing-section__header">
          <p class="pricing-kicker pricing-kicker--light">
            {{ copy.comparison.kicker }}
          </p>
          <h2 id="comparison-heading">{{ copy.comparison.title }}</h2>
          <p>{{ copy.comparison.lead }}</p>
        </div>

        <div
          class="comparison-table"
          role="region"
          :aria-label="copy.comparison.tableLabel"
          :tabindex="comparisonTabIndex"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">{{ copy.comparison.featureLabel }}</th>
                <th
                  v-for="plan in copy.comparison.plans"
                  :key="plan"
                  scope="col"
                >
                  {{ plan }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in copy.comparison.rows" :key="row.feature">
                <th scope="row">{{ row.feature }}</th>
                <td
                  v-for="(value, index) in row.values"
                  :key="`${row.feature}-${index}`"
                  :data-label="copy.comparison.plans[index]"
                >
                  {{ value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AppContainer>
    </section>

    <section
      class="pricing-section reassurance-section"
      aria-labelledby="reassurance-heading"
    >
      <AppContainer wide>
        <div class="reassurance-grid">
          <div class="reassurance-copy">
            <h2 id="reassurance-heading">{{ copy.reassurance.title }}</h2>
            <p>{{ copy.reassurance.lead }}</p>
          </div>
          <div class="reassurance-list">
            <article v-for="item in copy.reassurance.items" :key="item.title">
              <span>{{ item.marker }}</span>
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </AppContainer>
    </section>

    <section
      class="pricing-section enterprise-section"
      aria-labelledby="enterprise-heading"
    >
      <AppContainer wide>
        <div class="enterprise-card">
          <div>
            <h2 id="enterprise-heading">{{ copy.enterprise.title }}</h2>
            <p>{{ copy.enterprise.lead }}</p>
          </div>
          <ul>
            <li v-for="item in copy.enterprise.items" :key="item">
              {{ item }}
            </li>
          </ul>
          <NuxtLink
            class="pricing-btn pricing-btn--accent"
            :to="localePath('/contact')"
          >
            {{ copy.enterprise.cta }}
          </NuxtLink>
        </div>
      </AppContainer>
    </section>

    <section class="pricing-section faq-section" aria-labelledby="faq-heading">
      <AppContainer wide>
        <div class="pricing-section__header pricing-section__header--center">
          <h2 id="faq-heading">{{ copy.faq.title }}</h2>
        </div>
        <div class="faq-list">
          <details v-for="item in copy.faq.items" :key="item.question">
            <summary>{{ item.question }}</summary>
            <p>{{ item.answer }}</p>
          </details>
        </div>
      </AppContainer>
    </section>

    <section class="final-pricing-cta" aria-labelledby="final-pricing-heading">
      <AppContainer wide>
        <div class="final-pricing-cta__inner">
          <div>
            <h2 id="final-pricing-heading">{{ copy.finalCta.title }}</h2>
            <p>{{ copy.finalCta.lead }}</p>
          </div>
          <NuxtLink
            class="pricing-btn pricing-btn--accent"
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
const { locale } = useI18n();
const localePath = useLocalePath();
const { setSeo } = useLocaleSeo();

const isArabic = computed(() => locale.value === "ar");
const comparisonTabIndex = ref<number | null>(null);
let removeComparisonFocusListener: (() => void) | null = null;

const {
  loading: plansLoading,
  data: plansData,
  error: plansError,
  isEmpty: plansIsEmpty,
  usedFallback: plansUsedFallback,
  fetchPlans: plansFetchPlans,
} = usePublicPlansService();

function handleRetry() {
  plansFetchPlans();
}

onMounted(() => {
  plansFetchPlans();
});

const pageCopy = {
  ar: {
    seoTitle: "أسعار Trackora | خطط إدارة الشحنات والتحصيل",
    seoDescription:
      "خطط واضحة لشركات الشحن والمتاجر والسوشيال سيلرز لإدارة الشحنات، الديسباتش، المناديب، التتبع، ومحفظة التحصيل عند التسليم.",
    hero: {
      kicker: "أسعار مبنية على حجم التشغيل",
      title: "خطط واضحة لإدارة الشحنات والتحصيل بدون مفاجآت",
      lead: "اختر نقطة بداية تناسب فريقك اليوم، ثم وسع Trackora مع زيادة الشحنات، المناديب، التجار، واحتياج التسوية المالية.",
      primaryCta: "اطلب عرض توضيحي",
      secondaryCta: "تواصل معنا لتسعير مخصص",
      actionsLabel: "إجراءات التسعير الرئيسية",
      panelLabel: "مثال على عوامل التسعير في Trackora",
      panelTitle: "ما الذي يؤثر على السعر؟",
      panelStatus: "واضح قبل التعاقد",
      panelItems: [
        {
          label: "حجم الشحنات",
          value: "شهري",
          note: "من أول فريق تشغيل حتى عمليات متعددة الفروع",
        },
        {
          label: "محفظة التحصيل",
          value: "حسب الاستخدام",
          note: "تحصيل، معلق، مرتجع، وتسوية حسب التاجر والمندوب",
        },
        {
          label: "الدعم والإعداد",
          value: "ضمن الاتفاق",
          note: "مساعدة في التشغيل الأول وتهيئة الفريق",
        },
      ],
    },
    plans: {
      kicker: "الباقات",
      title: "ابدأ بالخطة التي تشبه يوم تشغيلك",
      lead: "كل خطة تغطي دورة الشحنة الأساسية: إدخال الطلب، التوزيع، تحديث الحالة، التتبع، ومراجعة التحصيل.",
      recommended: "الأكثر مناسبة",
      items: [
        {
          id: "starter",
          name: "البداية",
          description:
            "للفرق التي تريد نقل الطلبات والتتبع من الجداول إلى نظام منظم.",
          price: "حسب حجم الشحنات",
          priceNote: "فاتورة شهرية واضحة",
          bestFor: "الأفضل لأول فريق تشغيل أو متجر يبدأ تنظيم الشحن.",
          features: [
            "حتى ١٬٠٠٠ شحنة شهريا",
            "٣ مستخدمين إداريين",
            "حتى ١٠ مناديب",
            "بوابة تاجر واحدة",
            "تتبع شحنات عام",
            "تقارير أساسية",
            "دعم عبر البريد أو واتساب",
          ],
          cta: "ابدأ بخطة البداية",
          ctaTo: "/request-demo?plan=starter",
        },
        {
          id: "growth",
          name: "النمو",
          description:
            "لشركات الشحن والمتاجر التي تحتاج ديسباتش، مناديب، تحصيل عند التسليم، وتقارير يومية في مكان واحد.",
          price: "حسب حجم الشحنات",
          priceNote: "الخطة الموصى بها",
          bestFor: "الأفضل لعمليات تحصيل نشطة وفريق ديسباتش يومي.",
          features: [
            "حتى ١٠٬٠٠٠ شحنة شهريا",
            "١٠ مستخدمين إداريين",
            "حتى ٧٥ مندوبا",
            "بوابات تجار متعددة",
            "التوزيع الذكي",
            "تطبيق المندوب",
            "محفظة التحصيل عند التسليم",
            "الرفع الجماعي",
            "تقارير تشغيلية متقدمة",
            "دعم في مرحلة التشغيل الأولى",
          ],
          cta: "اطلب عرض لخطة النمو",
          ctaTo: "/request-demo?plan=growth",
          recommended: true,
        },
        {
          id: "scale",
          name: "التوسع",
          description:
            "لشركات الشحن عالية الحجم التي تحتاج صلاحيات، فروع، تقارير، وسير عمل مخصص.",
          price: "تسعير مخصص",
          priceNote: "حسب الفروع والتدفقات",
          bestFor: "الأفضل لعمليات متعددة الفروع وتجار كثيرين.",
          features: [
            "شحنات شهرية عالية الحجم",
            "مستخدمون وصلاحيات متقدمة",
            "عدد مناديب قابل للتوسع",
            "فروع ومناطق متعددة",
            "كشف الاحتيال",
            "تقارير إدارة متقدمة",
            "سير عمل مخصص",
            "دعم مخصص للإطلاق والتشغيل",
          ],
          cta: "احصل على تسعير مخصص",
          ctaTo: "/contact?topic=scale-pricing",
        },
      ],
    },
    comparison: {
      kicker: "مقارنة الخطط",
      title: "قارن القدرات قبل طلب العرض",
      lead: "استخدم الجدول لتحديد ما تحتاجه الآن وما يمكن إضافته مع توسع الشحنات والتجار والمناديب.",
      tableLabel: "جدول مقارنة خطط Trackora",
      featureLabel: "القدرة",
      plans: ["البداية", "النمو", "التوسع"],
      rows: [
        {
          feature: "عدد الشحنات شهريا",
          values: ["حتى ١٬٠٠٠", "حتى ١٠٬٠٠٠", "حسب الاتفاق"],
        },
        {
          feature: "عدد المستخدمين",
          values: [
            "٣ مستخدمين إداريين",
            "١٠ مستخدمين إداريين",
            "حسب الفروع والصلاحيات",
          ],
        },
        {
          feature: "عدد المناديب",
          values: ["حتى ١٠ مناديب", "حتى ٧٥ مندوبا", "قابل للتوسع حسب المناطق"],
        },
        {
          feature: "بوابة التاجر",
          values: ["تاجر واحد", "تجار متعددون", "تجار وفروع متعددة"],
        },
        {
          feature: "تطبيق المندوب",
          values: ["أساسي", "كامل", "كامل مع صلاحيات"],
        },
        {
          feature: "محفظة التحصيل عند التسليم",
          values: ["مراجعة أساسية", "تحصيل وتسوية", "تسوية متقدمة"],
        },
        {
          feature: "التوزيع الذكي",
          values: ["غير متاح", "متاح", "متقدم حسب المناطق"],
        },
        {
          feature: "الرفع الجماعي",
          values: ["متاح", "متاح مع تحقق أخطاء", "تدفقات مخصصة"],
        },
        { feature: "التتبع العام", values: ["متاح", "متاح", "متاح مع تخصيص"] },
        {
          feature: "كشف الاحتيال",
          values: ["غير متاح", "إشارات أساسية", "قواعد متقدمة"],
        },
        {
          feature: "التقارير والتحليلات",
          values: ["تقارير أساسية", "تقارير تشغيلية", "تقارير إدارة متقدمة"],
        },
        {
          feature: "مستوى الدعم",
          values: ["بريد وواتساب", "دعم تشغيل أولي", "دعم مخصص"],
        },
        {
          feature: "دعم الإعداد والتشغيل",
          values: ["دليل بدء", "جلسة إعداد وتشغيل أولى", "إعداد وتدريب مخصص"],
        },
        {
          feature: "ماذا يحدث عند تجاوز الاستخدام؟",
          values: [
            "نقترح الانتقال للنمو",
            "نراجع الحدود والتكلفة",
            "نضبط السعة حسب الاتفاق",
          ],
        },
      ],
    },
    reassurance: {
      kicker: "طمأنة قبل القرار",
      title: "التسعير واضح من أول محادثة",
      lead: "نربط السعر بحجم التشغيل الفعلي حتى لا تدفع مقابل قدرات لا يستخدمها الفريق، ولا تتفاجأ بتكاليف إعداد مخفية.",
      items: [
        {
          marker: "01",
          title: "لا توجد رسوم إعداد مخفية",
          text: "نوضح تكلفة الإعداد والتشغيل قبل التعاقد، بما في ذلك تهيئة البيانات والفريق.",
        },
        {
          marker: "02",
          title: "مناسب للتجربة مع أول فريق تشغيل",
          text: "ابدأ بفريق ديسباتش أو تاجر واحد، ثم وسع الاستخدام بعد ثبات الدورة.",
        },
        {
          marker: "03",
          title: "قابل للتوسع حسب حجم الشحنات",
          text: "أضف مناديب، تجار، مناطق، وتقارير عندما يزيد حجم العملية.",
        },
        {
          marker: "04",
          title: "دعم في مرحلة التشغيل الأولى",
          text: "نساعد الفريق على فهم رفع الطلبات، إسناد المناديب، تتبع الحالات، وتسوية التحصيل.",
        },
      ],
    },
    enterprise: {
      kicker: "تسعير مخصص",
      title: "لشركات الشحن عالية الحجم ومتعددة الفروع",
      lead: "إذا كانت العملية تشمل مناطق كثيرة، مناديب متعددين، تجار كبار، أو تقارير إدارية خاصة، نبني التسعير حول تدفقك الفعلي.",
      items: [
        "فروع ومناطق متعددة",
        "تقارير متقدمة للإدارة والتحصيل",
        "سير عمل مخصص للتوزيع والمرتجعات",
        "صلاحيات فرق ومراجعات مالية",
        "دعم مخصص في الإطلاق والتوسع",
      ],
      cta: "احصل على تسعير مخصص",
    },
    faq: {
      kicker: "أسئلة التسعير",
      title: "إجابات سريعة قبل طلب العرض",
      items: [
        {
          question: "هل الأسعار ثابتة أم حسب عدد الشحنات؟",
          answer:
            "الأسعار ترتبط غالبا بحجم الشحنات، عدد المستخدمين، عدد المناديب، واحتياج التحصيل والتقارير. نوضح التفاصيل في العرض.",
        },
        {
          question: "هل يوجد فترة تجربة؟",
          answer:
            "يمكن ترتيب تجربة أو تشغيل أولي محدود حسب حجم العملية والبيانات المتاحة.",
        },
        {
          question: "هل يمكن تغيير الخطة لاحقا؟",
          answer:
            "نعم. يمكن الانتقال لخطة أعلى أو تعديل الحدود عند زيادة الشحنات أو عدد التجار والمناديب.",
        },
        {
          question: "هل تدعمون شركات الشحن متعددة الفروع؟",
          answer:
            "نعم. خطة التوسع مناسبة للفروع والمناطق المتعددة والصلاحيات المتقدمة.",
        },
        {
          question: "هل محفظة التحصيل ضمن كل الخطط؟",
          answer:
            "توجد مراجعة تحصيل أساسية في البداية، وتصبح المحفظة والتسوية التفصيلية أوضح في النمو والتوسع.",
        },
        {
          question: "هل يوجد رسوم على التتبع أو المناديب؟",
          answer:
            "يعتمد ذلك على الخطة وحجم الاستخدام. نوضح عدد المناديب وحدود التتبع ضمن عرض السعر.",
        },
      ],
    },
    finalCta: {
      kicker: "الخطوة التالية",
      title: "جاهز تنظم الشحنات والتحصيل؟",
      lead: "احجز عرضا توضيحيا مبنيا على حجم شحناتك، مناطق التوصيل، عدد المناديب، وطريقة تسوية التحصيل.",
      cta: "اطلب عرض توضيحي الآن",
    },
  },
  en: {
    seoTitle: "Trackora Pricing | Shipment and COD Management Plans",
    seoDescription:
      "Clear plans for shipping companies, ecommerce stores, and social sellers managing shipments, dispatch, couriers, tracking, and COD wallets.",
    hero: {
      kicker: "Pricing built around operations volume",
      title: "Clear pricing for shipment and COD operations",
      lead: "Choose a starting point that fits your team today, then scale Trackora as shipments, couriers, merchants, and reconciliation needs grow.",
      primaryCta: "Request a demo",
      secondaryCta: "Contact us for custom pricing",
      actionsLabel: "Primary pricing actions",
      panelLabel: "Trackora pricing factors example",
      panelTitle: "What affects pricing?",
      panelStatus: "Clear before signup",
      panelItems: [
        {
          label: "Shipment volume",
          value: "Monthly",
          note: "From the first operations team to multi-branch delivery work",
        },
        {
          label: "COD Wallet",
          value: "Usage based",
          note: "Collected, pending, returned, and settled by merchant and courier",
        },
        {
          label: "Support and setup",
          value: "Included in scope",
          note: "Help with first launch and team onboarding",
        },
      ],
    },
    plans: {
      kicker: "Plans",
      title: "Start with the plan that matches your operation",
      lead: "Every plan covers the core shipment cycle: order entry, dispatch, status updates, public tracking, and COD review.",
      recommended: "Recommended",
      items: [
        {
          id: "starter",
          name: "Starter",
          description:
            "For teams moving orders and tracking from spreadsheets into a structured system.",
          price: "Based on shipment volume",
          priceNote: "Clear monthly invoice",
          bestFor:
            "Best for a first operations team or store organizing delivery.",
          features: [
            "Up to 1,000 shipments per month",
            "3 admin users",
            "Up to 10 couriers",
            "One merchant portal",
            "Public shipment tracking",
            "Basic reports",
            "Email or WhatsApp support",
          ],
          cta: "Request Starter plan",
          ctaTo: "/request-demo?plan=starter",
        },
        {
          id: "growth",
          name: "Growth",
          description:
            "For shipping companies and stores that need dispatch, couriers, COD, and daily reports in one place.",
          price: "Based on shipment volume",
          priceNote: "Recommended plan",
          bestFor: "Best for active COD operations and daily dispatch teams.",
          features: [
            "Up to 10,000 shipments per month",
            "10 admin users",
            "Up to 75 couriers",
            "Multiple merchant portals",
            "Smart Dispatch",
            "Courier App",
            "COD Wallet",
            "Bulk Upload",
            "Advanced operations reports",
            "First launch support",
          ],
          cta: "Request Growth demo",
          ctaTo: "/request-demo?plan=growth",
          recommended: true,
        },
        {
          id: "scale",
          name: "Scale",
          description:
            "For high-volume shipping companies that need permissions, branches, reports, and custom workflows.",
          price: "Custom pricing",
          priceNote: "Based on branches and workflows",
          bestFor: "Best for multi-branch operations and many merchants.",
          features: [
            "High monthly shipment volume",
            "Advanced users and roles",
            "Scalable courier count",
            "Multiple branches and zones",
            "Fraud Detection",
            "Advanced management reports",
            "Custom workflows",
            "Dedicated launch and operations support",
          ],
          cta: "Get custom pricing",
          ctaTo: "/contact?topic=scale-pricing",
        },
      ],
    },
    comparison: {
      kicker: "Plan comparison",
      title: "Compare capabilities before requesting a demo",
      lead: "Use the table to decide what you need now and what can be added as shipments, merchants, and couriers grow.",
      tableLabel: "Trackora plan comparison table",
      featureLabel: "Capability",
      plans: ["Starter", "Growth", "Scale"],
      rows: [
        {
          feature: "Shipments per month",
          values: ["Up to 1,000", "Up to 10,000", "Custom scope"],
        },
        {
          feature: "Users",
          values: ["3 admin users", "10 admin users", "By branches and roles"],
        },
        {
          feature: "Couriers",
          values: ["Up to 10 couriers", "Up to 75 couriers", "Scales by zones"],
        },
        {
          feature: "Merchant portal",
          values: [
            "One merchant",
            "Multiple merchants",
            "Multiple merchants and branches",
          ],
        },
        {
          feature: "Courier app",
          values: ["Basic", "Full", "Full with permissions"],
        },
        {
          feature: "COD wallet",
          values: [
            "Basic review",
            "Collection and settlement",
            "Advanced settlement",
          ],
        },
        {
          feature: "Smart dispatch",
          values: ["Not included", "Included", "Advanced by zones"],
        },
        {
          feature: "Bulk upload",
          values: ["Included", "Included with error checks", "Custom flows"],
        },
        {
          feature: "Public tracking",
          values: ["Included", "Included", "Included with customization"],
        },
        {
          feature: "Fraud detection",
          values: ["Not included", "Basic signals", "Advanced rules"],
        },
        {
          feature: "Reports and analytics",
          values: [
            "Basic reports",
            "Operations reports",
            "Advanced management reports",
          ],
        },
        {
          feature: "Support level",
          values: [
            "Email and WhatsApp",
            "First launch support",
            "Dedicated support",
          ],
        },
        {
          feature: "Setup and launch support",
          values: [
            "Starter guide",
            "Setup and first launch session",
            "Custom setup and team training",
          ],
        },
        {
          feature: "If usage exceeds the plan",
          values: [
            "We suggest moving to Growth",
            "We review limits and cost",
            "Capacity is adjusted by agreement",
          ],
        },
      ],
    },
    reassurance: {
      kicker: "Decision reassurance",
      title: "Pricing is clear from the first conversation",
      lead: "We connect pricing to real operating volume so your team does not pay for unused capabilities or discover hidden setup costs later.",
      items: [
        {
          marker: "01",
          title: "No hidden setup fees",
          text: "We clarify setup and launch cost before signup, including data and team preparation.",
        },
        {
          marker: "02",
          title: "Works for a first operations team",
          text: "Start with one dispatch team or merchant, then expand after the cycle is stable.",
        },
        {
          marker: "03",
          title: "Scales with shipment volume",
          text: "Add couriers, merchants, zones, and reports when the operation grows.",
        },
        {
          marker: "04",
          title: "Support during first launch",
          text: "We help the team understand order upload, courier assignment, status tracking, and COD settlement.",
        },
      ],
    },
    enterprise: {
      kicker: "Custom pricing",
      title: "For high-volume and multi-branch shipping companies",
      lead: "If your operation includes many zones, couriers, large merchants, or custom management reports, we shape pricing around your real workflow.",
      items: [
        "Multiple branches and zones",
        "Advanced management and COD reports",
        "Custom dispatch and returns workflows",
        "Team permissions and financial reviews",
        "Dedicated launch and scale support",
      ],
      cta: "Get custom pricing",
    },
    faq: {
      kicker: "Pricing FAQ",
      title: "Quick answers before requesting a demo",
      items: [
        {
          question: "Are prices fixed or based on shipment count?",
          answer:
            "Pricing is usually connected to shipment volume, users, courier count, and COD or reporting needs. We clarify the details in the proposal.",
        },
        {
          question: "Is there a trial period?",
          answer:
            "A limited trial or first launch phase can be arranged depending on operation size and available data.",
        },
        {
          question: "Can we change plans later?",
          answer:
            "Yes. You can move to a higher plan or adjust limits when shipments, merchants, or couriers increase.",
        },
        {
          question: "Do you support multi-branch shipping companies?",
          answer:
            "Yes. The Scale plan is built for branches, zones, advanced permissions, and higher-volume operations.",
        },
        {
          question: "Is COD Wallet included in every plan?",
          answer:
            "Starter includes basic COD review, while Growth and Scale include more detailed wallet and settlement workflows.",
        },
        {
          question: "Are there fees for tracking or couriers?",
          answer:
            "That depends on the plan and usage volume. We clarify courier limits and tracking scope in the pricing offer.",
        },
      ],
    },
    finalCta: {
      kicker: "Next step",
      title: "Ready to organize shipments and COD?",
      lead: "Book a demo based on shipment volume, delivery zones, courier count, and COD settlement workflow.",
      cta: "Request a demo now",
    },
  },
} as const;

const copy = computed(() => (isArabic.value ? pageCopy.ar : pageCopy.en));

watchEffect(() => {
  setSeo(copy.value.seoTitle, copy.value.seoDescription, "/pricing");
});

onMounted(() => {
  const media = window.matchMedia("(min-width: 46.001rem)");
  const updateComparisonFocus = () => {
    comparisonTabIndex.value = media.matches ? 0 : null;
  };

  updateComparisonFocus();
  media.addEventListener("change", updateComparisonFocus);
  removeComparisonFocusListener = () =>
    media.removeEventListener("change", updateComparisonFocus);
});

onBeforeUnmount(() => {
  removeComparisonFocusListener?.();
});
</script>

<style scoped>
.pricing-page {
  --pricing-primary: #1a3b66;
  --pricing-primary-light: #3b5998;
  --pricing-accent: #ff6b6b;
  --pricing-surface: #f5f5f5;
  --pricing-text: #333333;
  --pricing-ink: #0b1d33;
  --pricing-muted: #586274;
  --pricing-line: rgba(26, 59, 102, 0.14);
  --pricing-shadow: 0 24px 70px rgba(26, 59, 102, 0.14);
  --pricing-ease: cubic-bezier(0.22, 1, 0.36, 1);
  color: var(--pricing-text);
  background:
    radial-gradient(
      circle at 8% 8%,
      rgba(255, 107, 107, 0.1),
      transparent 26rem
    ),
    linear-gradient(180deg, #ffffff 0%, #f7f9fc 42%, #ffffff 100%);
  overflow: hidden;
}

.pricing-hero {
  padding-block: clamp(5rem, 8vw, 8.5rem) clamp(4rem, 7vw, 6.5rem);
  color: #ffffff;
  background:
    radial-gradient(
      circle at 16% 18%,
      rgba(255, 107, 107, 0.2),
      transparent 18rem
    ),
    linear-gradient(
      145deg,
      #0a1d34 0%,
      var(--pricing-primary) 52%,
      var(--pricing-primary-light) 100%
    );
}

.pricing-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(24rem, 1.08fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.pricing-hero__content {
  display: grid;
  gap: 1.35rem;
}

.pricing-kicker {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  padding: 0.42rem 0.88rem;
  color: rgba(255, 255, 255, 0.86);
  background: rgba(255, 255, 255, 0.08);
  font-size: 0.88rem;
  font-weight: 900;
}

.pricing-kicker--light {
  border-color: rgba(26, 59, 102, 0.14);
  color: var(--pricing-primary);
  background: rgba(26, 59, 102, 0.05);
}

.pricing-hero h1 {
  max-width: 12ch;
  color: #ffffff;
  font-size: clamp(3rem, 7vw, 5.7rem);
  line-height: 1.05;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.pricing-hero__lead {
  max-width: 62ch;
  color: rgba(255, 255, 255, 0.82);
  font-size: clamp(1.05rem, 1.5vw, 1.24rem);
  line-height: 1.9;
  text-wrap: pretty;
}

.pricing-hero__actions,
.final-pricing-cta__inner {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  align-items: center;
}

.pricing-btn {
  min-height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0.88rem 1.35rem;
  font-weight: 900;
  line-height: 1.3;
  text-align: center;
  transition:
    transform 220ms var(--pricing-ease),
    box-shadow 220ms var(--pricing-ease),
    background 220ms var(--pricing-ease),
    border-color 220ms var(--pricing-ease),
    color 220ms var(--pricing-ease);
}

.pricing-btn:focus-visible,
.comparison-table:focus-visible,
details:focus-within {
  outline: 3px solid var(--pricing-accent);
  outline-offset: 3px;
}

.pricing-btn--primary,
.pricing-btn--accent {
  color: #210f16;
  background: var(--pricing-accent);
  box-shadow: 0 16px 36px rgba(255, 107, 107, 0.3);
}

.pricing-btn--secondary {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.1);
}

.pricing-btn--outline {
  color: var(--pricing-primary);
  border-color: rgba(26, 59, 102, 0.2);
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(26, 59, 102, 0.08);
}

.pricing-btn:hover {
  transform: translateY(-2px);
}

.pricing-hero__panel {
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 2rem;
  overflow: hidden;
  background: rgba(7, 20, 36, 0.72);
  box-shadow: 0 32px 100px rgba(0, 0, 0, 0.28);
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
  color: #ffd8d8;
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

.pricing-ledger__row span,
.pricing-ledger__row small {
  color: rgba(255, 255, 255, 0.68);
}

.pricing-ledger__row strong {
  color: #ffffff;
  font-size: clamp(1.45rem, 3vw, 2.35rem);
  line-height: 1;
}

.pricing-section {
  padding-block: clamp(4.5rem, 8vw, 8rem);
}

.pricing-section__header {
  display: grid;
  gap: 1rem;
  max-width: 62rem;
  margin-bottom: clamp(2rem, 4vw, 3.5rem);
}

.pricing-section__header--center {
  margin-inline: auto;
  text-align: center;
  justify-items: center;
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

.plan-card {
  position: relative;
  display: grid;
  gap: 1.1rem;
  align-content: start;
  padding: clamp(1.25rem, 2.3vw, 1.8rem);
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: 1.7rem;
  background: #ffffff;
  box-shadow: 0 14px 42px rgba(26, 59, 102, 0.07);
  transition:
    transform 220ms var(--pricing-ease),
    box-shadow 220ms var(--pricing-ease),
    border-color 220ms var(--pricing-ease);
}

.plan-card--recommended {
  border-color: rgba(255, 107, 107, 0.42);
  background:
    radial-gradient(
      circle at 12% 8%,
      rgba(255, 107, 107, 0.13),
      transparent 14rem
    ),
    #ffffff;
  box-shadow:
    0 24px 70px rgba(255, 107, 107, 0.17),
    0 18px 50px rgba(26, 59, 102, 0.1);
  transform: translateY(-0.65rem);
}

.plan-card__top {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  justify-content: space-between;
}

.plan-card__name-en {
  color: var(--pricing-accent);
  font-weight: 900;
}

.plan-card h3 {
  color: var(--pricing-ink);
  font-size: clamp(1.45rem, 2.4vw, 2.25rem);
}

.plan-card__badge {
  flex: 0 0 auto;
  border-radius: 999px;
  padding: 0.34rem 0.72rem;
  color: #8f1d2b;
  background: rgba(255, 107, 107, 0.14);
  font-size: 0.82rem;
  font-weight: 900;
}

.plan-card__description,
.plan-card__best {
  color: var(--pricing-muted);
}

.plan-card__price {
  display: grid;
  gap: 0.25rem;
  padding-block: 0.6rem;
  border-block: 1px solid rgba(26, 59, 102, 0.1);
}

.plan-card__price strong {
  color: var(--pricing-primary);
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  line-height: 1.2;
}

.plan-card__price span {
  color: var(--pricing-muted);
  font-weight: 800;
}

.plan-card__best {
  border-radius: 1rem;
  padding: 0.85rem;
  background: rgba(26, 59, 102, 0.05);
  font-weight: 800;
}

.plan-card__features {
  display: grid;
  gap: 0.62rem;
}

.plan-card__features li,
.enterprise-card li {
  position: relative;
  padding-inline-start: 1.15rem;
  color: var(--pricing-muted);
  line-height: 1.65;
}

.plan-card__features li::before,
.enterprise-card li::before {
  content: "";
  position: absolute;
  inset-inline-start: 0;
  top: 0.72rem;
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 50%;
  background: var(--pricing-accent);
}

.pricing-fallback-notice {
  margin-block-start: var(--spacing-4);
  text-align: center;
  color: var(--pricing-muted);
  font-size: 0.85rem;
  font-style: italic;
}

.comparison-section {
  background: var(--pricing-surface);
}

.comparison-table {
  overflow-x: auto;
  border: 1px solid var(--pricing-line);
  border-radius: 1.7rem;
  background: #ffffff;
  box-shadow: var(--pricing-shadow);
}

.comparison-table table {
  width: 100%;
  min-width: 48rem;
  border-collapse: collapse;
}

.comparison-table th,
.comparison-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(26, 59, 102, 0.1);
  text-align: start;
  vertical-align: top;
}

.comparison-table thead th {
  color: #ffffff;
  background: var(--pricing-primary);
  font-size: 0.95rem;
}

.comparison-table tbody th {
  color: var(--pricing-ink);
  font-weight: 900;
}

.comparison-table td {
  color: var(--pricing-muted);
  font-weight: 700;
}

.comparison-table tr:last-child th,
.comparison-table tr:last-child td {
  border-bottom: 0;
}

.reassurance-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
}

.reassurance-copy {
  display: grid;
  gap: 1rem;
}

.reassurance-list {
  display: grid;
  gap: 0.85rem;
}

.reassurance-list article {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem;
  align-items: start;
  padding: 1.1rem;
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: 1.3rem;
  background: #ffffff;
  box-shadow: 0 10px 32px rgba(26, 59, 102, 0.06);
}

.reassurance-list article > span {
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  color: #210f16;
  background: var(--pricing-accent);
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}

.reassurance-list h3 {
  color: var(--pricing-ink);
  font-size: 1.15rem;
}

.enterprise-section {
  padding-block-start: 0;
}

.enterprise-card,
.final-pricing-cta__inner {
  display: grid;
  gap: clamp(1.5rem, 4vw, 3rem);
  border-radius: 2rem;
  color: #ffffff;
  background:
    radial-gradient(
      circle at 18% 18%,
      rgba(255, 107, 107, 0.22),
      transparent 18rem
    ),
    linear-gradient(145deg, #0b1d33, var(--pricing-primary));
  box-shadow: var(--pricing-shadow);
}

.enterprise-card {
  grid-template-columns: 1.05fr 0.95fr auto;
  align-items: center;
  padding: clamp(1.5rem, 4vw, 3rem);
}

.enterprise-card h2,
.enterprise-card p,
.enterprise-card li,
.final-pricing-cta h2,
.final-pricing-cta p {
  color: #ffffff;
}

.enterprise-card p,
.enterprise-card li,
.final-pricing-cta p {
  color: rgba(255, 255, 255, 0.8);
}

.enterprise-card ul {
  display: grid;
  gap: 0.55rem;
}

.faq-section {
  background: linear-gradient(180deg, #ffffff, var(--pricing-surface));
}

.faq-list {
  display: grid;
  gap: 0.75rem;
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
  color: var(--pricing-ink);
  font-weight: 900;
}

details p {
  padding: 0 1.2rem 1.2rem;
  max-width: 74ch;
}

.final-pricing-cta {
  padding-block: clamp(3rem, 6vw, 5.5rem);
}

.final-pricing-cta__inner {
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: clamp(1.5rem, 4vw, 3.25rem);
}

@media (hover: hover) {
  .plan-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 22px 58px rgba(26, 59, 102, 0.13);
  }

  .plan-card--recommended:hover {
    transform: translateY(-0.85rem);
  }
}

@media (max-width: 68rem) {
  .pricing-hero__grid,
  .reassurance-grid,
  .enterprise-card,
  .final-pricing-cta__inner {
    grid-template-columns: 1fr;
  }

  .pricing-hero h1 {
    max-width: 14ch;
  }

  .plan-grid {
    grid-template-columns: 1fr;
    max-width: 34rem;
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

  .pricing-hero h1 {
    max-width: 100%;
    font-size: clamp(2.45rem, 13vw, 3.8rem);
  }

  .pricing-hero__panel,
  .enterprise-card,
  .final-pricing-cta__inner,
  .comparison-table {
    border-radius: 1.45rem;
  }

  .pricing-hero__actions .pricing-btn,
  .final-pricing-cta .pricing-btn,
  .enterprise-card .pricing-btn,
  .plan-card .pricing-btn {
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

  .comparison-table tr {
    margin-bottom: 0.9rem;
    border: 1px solid rgba(26, 59, 102, 0.12);
    border-radius: 1.2rem;
    background: #ffffff;
    box-shadow: 0 10px 30px rgba(26, 59, 102, 0.06);
    overflow: hidden;
  }

  .comparison-table tbody th {
    background: rgba(26, 59, 102, 0.06);
  }

  .comparison-table td {
    display: grid;
    grid-template-columns: minmax(7rem, 0.45fr) 1fr;
    gap: 1rem;
    align-items: start;
  }

  .comparison-table td::before {
    content: attr(data-label);
    color: var(--pricing-primary);
    font-weight: 900;
  }

  .reassurance-list article {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pricing-btn,
  .plan-card {
    transition-duration: 0.01ms;
  }

  .pricing-comparison__scroll {
    margin-inline: calc(-1 * var(--spacing-4));
    border-radius: var(--radius-2xl);
  }
}
</style>
