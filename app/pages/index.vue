<template>
  <div class="home-redesign">
    <section class="hero" aria-labelledby="hero-title">
      
      <div class="hero__grid">
        <div class="hero__content">
          <p class="hero__label">نظام تشغيل الشحنات والتحصيل</p>
          <h1 id="hero-title">شغّل الشحنات وCOD من طلب المتجر حتى تسوية المحفظة</h1>
          <p class="hero__lead">
            Trackora يعطي فريق الديسباتش، المناديب، التحصيل، والتجار سجل تشغيل واحدا: ارفع الطلبات، اكشف المخاطر، وزع الشحنات، تابع العميل، وأغلق COD بدون جداول منفصلة أو اتصالات متكررة.
          </p>
          <div class="hero__actions" :aria-label="locale === 'ar' ? 'إجراءات رئيسية' : 'Key actions'">
            <NuxtLink class="home-btn home-btn--primary" to="/request-demo">اطلب عرضا على عملية شحنك</NuxtLink>
            <NuxtLink class="home-btn home-btn--secondary" to="/track">تتبع شحنة كعميل</NuxtLink>
          </div>
          <div class="hero__proof" :aria-label="locale === 'ar' ? 'ملخص تشغيلي' : 'Operations summary'">
            <span>عرض مبني على مناطقك وحجم شحناتك</span>
            <span>تسوية COD حسب التاجر والمندوب</span>
            <span>تتبع عام يقلل مكالمات أين الشحنة</span>
          </div>
        </div>

        <div class="ops-console" :aria-label="locale === 'ar' ? 'مثال على لوحة Trackora التشغيلية' : 'Trackora operating console example'">
          <div class="ops-console__topbar">
            <span>لوحة التشغيل اليوم</span>
            <strong>حي</strong>
          </div>
          <div class="ops-console__body">
            <div class="ops-console__main">
              <div class="ops-card ops-card--highlight">
                <span class="ops-card__label">شحنات بانتظار التوزيع</span>
                <strong>128</strong>
                <small>32 طلب COD يحتاج مندوب اليوم</small>
              </div>
              <div class="route-board">
                <div v-for="shipment in shipments" :key="shipment.id" class="route-row">
                  <div>
                    <strong>{{ shipment.id }}</strong>
                    <span>{{ shipment.route }}</span>
                  </div>
                  <span :class="['status-pill', `status-pill--${shipment.tone}`]">{{ shipment.status }}</span>
                </div>
              </div>
            </div>

            <div class="ops-console__rail">
              <div class="wallet-meter">
                <span>COD جاهز للمراجعة</span>
                <strong>74,250 ج.م</strong>
                <div class="wallet-meter__bar"><span /></div>
              </div>
              <div class="risk-ticket">
                <span>إشارة مخاطر</span>
                <strong>12 رقم مكرر</strong>
                <small>موقوفة قبل خروج المندوب للطريق</small>
              </div>
              <div class="courier-stack">
                <span>المناديب المتاحون</span>
                <div>
                  <b>أحمد</b>
                  <b>سارة</b>
                  <b>محمود</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="stats-strip" :aria-label="locale === 'ar' ? 'مؤشرات تشغيلية' : 'Operations metrics'">
      <div v-for="metric in metrics" :key="metric.label" class="stat-item">
        <strong>{{ metric.value }}</strong>
        <span>{{ metric.label }}</span>
      </div>
    </section>

    <section class="section section--problems" aria-labelledby="problems-title">
      <div class="section__intro">
        <span class="section-marker">لماذا تتعطل العمليات</span>
        <h2 id="problems-title">كل تأخير صغير يتحول إلى تكلفة عندما تعمل الشحنات خارج نظام واحد</h2>
      </div>
      <div class="problem-ledger">
        <article v-for="problem in problems" :key="problem.title" class="problem-ledger__item">
          <span>{{ problem.code }}</span>
          <div>
            <h3>{{ problem.title }}</h3>
            <p>{{ problem.text }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="section solution" aria-labelledby="solution-title">
      <div class="solution__copy">
        <span class="section-marker">حل Trackora</span>
        <h2 id="solution-title">نظام واحد يربط التاجر، الديسباتش، المندوب، المحفظة، والعميل</h2>
        <p>
          بدل نقل البيانات بين ملفات واتساب وجداول وحسابات نقدية، Trackora يحول الشحنة إلى سجل حي: من إنشاء الطلب إلى إسناده، تحديث حالته، تحصيل قيمته، ثم تسوية المحفظة.
        </p>
        <NuxtLink class="home-btn home-btn--primary" to="/request-demo">شاهد Trackora على بيانات تشغيلك</NuxtLink>
      </div>
      <div class="connection-map" :aria-label="locale === 'ar' ? 'خريطة ربط Trackora التشغيلية' : 'Trackora operations connection map'">
        <div class="connection-map__center">Trackora</div>
        <span v-for="node in solutionNodes" :key="node" class="connection-map__node">{{ node }}</span>
      </div>
    </section>

    <section class="section intent-paths" aria-labelledby="intent-title">
      <div class="intent-paths__header">
        <span class="section-marker">اختر مسارك</span>
        <h2 id="intent-title">كل فريق يرى نفس الشحنة من الزاوية التي تهمه</h2>
        <p>
          Trackora لا يبيع لوحة عامة لكل الناس. كل مسار يركز على قرار يومي واضح: من يوزع الشحنة، من يحصل COD، ومن يحتاج معرفة الحالة الآن.
        </p>
      </div>
      <div class="intent-paths__grid">
        <article v-for="path in intentPaths" :key="path.title" :class="['intent-card', path.featured ? 'intent-card--featured' : '']">
          <span>{{ path.audience }}</span>
          <h3>{{ path.title }}</h3>
          <p>{{ path.text }}</p>
          <ul>
            <li v-for="item in path.points" :key="item">{{ item }}</li>
          </ul>
          <NuxtLink class="intent-card__link" :to="path.to">{{ path.cta }}</NuxtLink>
        </article>
      </div>
    </section>

    <section class="section features" aria-labelledby="features-title">
      <div class="section__intro section__intro--wide">
        <span class="section-marker">قدرات المنصة</span>
        <h2 id="features-title">أدوات مبنية على يوم شركة الشحن، لا على عرض تقديمي عام</h2>
      </div>
      <div class="feature-bento">
        <article v-for="feature in features" :key="feature.title" :class="['feature-tile', feature.featured ? 'feature-tile--featured' : '']">
          <span>{{ feature.tag }}</span>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.text }}</p>
        </article>
      </div>
      <div class="section-cta">
        <p>إذا كان فريقك يعمل بين واتساب، Excel، واتصالات العملاء، ابدأ بعرض يطابق دورة الشحنة عندك.</p>
        <NuxtLink class="home-btn home-btn--primary" to="/request-demo">احجز عرض تشغيل Trackora</NuxtLink>
      </div>
    </section>

    <section class="section workflow" aria-labelledby="workflow-title">
      <div class="section__intro">
        <span class="section-marker">طريقة العمل</span>
        <h2 id="workflow-title">مسار واضح لكل شحنة حتى إغلاق التحصيل</h2>
      </div>
      <ol class="workflow-steps">
        <li v-for="step in workflow" :key="step.title">
          <span>{{ step.number }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>
    </section>

    <section class="section proof-board" aria-labelledby="showcase-title">
      <div class="showcase__header">
        <span class="section-marker">دليل تشغيلي</span>
        <h2 id="showcase-title">تفاصيل من يوم شحن حقيقي، لا رسوم توضيحية عامة</h2>
      </div>
      <div class="proof-ledger">
        <article v-for="column in proofColumns" :key="column.title" class="proof-column">
          <div class="proof-column__header">
            <span>{{ column.kicker }}</span>
            <h3>{{ column.title }}</h3>
          </div>
          <ul>
            <li v-for="row in column.rows" :key="row.label">
              <span>{{ row.label }}</span>
              <strong>{{ row.value }}</strong>
              <small>{{ row.note }}</small>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section pricing" aria-labelledby="pricing-title">
      <div class="pricing__intro">
        <span class="section-marker">باقات قابلة للنمو</span>
        <h2 id="pricing-title">ابدأ بحجم تشغيلك الحالي، ثم وسع النظام مع نمو الشحنات</h2>
      </div>
      <div class="pricing-grid">
        <article v-for="plan in plans" :key="plan.name" :class="['plan-card', plan.recommended ? 'plan-card--recommended' : '']">
          <span v-if="plan.recommended" class="plan-card__badge">الأكثر مناسبة</span>
          <h3>{{ plan.name }}</h3>
          <p>{{ plan.text }}</p>
          <strong>{{ plan.price }}</strong>
          <ul>
            <li v-for="item in plan.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
      <NuxtLink class="home-btn home-btn--outline" to="/pricing">اعرف السعر حسب حجم شحناتك</NuxtLink>
    </section>

    <section class="final-cta" aria-labelledby="final-cta-title">
      <div>
        <span class="section-marker">جاهز للتشغيل</span>
        <h2 id="final-cta-title">حوّل شحناتك وCOD إلى سجل واحد قابل للمتابعة والمحاسبة</h2>
        <p>
          احجز عرضا توضيحيا مبنيا على شكل عمليتك: عدد الشحنات، مناطق التوصيل، طريقة التحصيل، واحتياج المتاجر للتتبع.
        </p>
      </div>
      <NuxtLink class="home-btn home-btn--primary home-btn--accent" to="/request-demo">اطلب عرضا على بيانات تشغيلك</NuxtLink>
    </section>

    <section class="section faq" aria-labelledby="faq-title">
      <div class="section__intro">
        <span class="section-marker">أسئلة شائعة</span>
        <h2 id="faq-title">ما الذي تحتاج معرفته قبل تجربة Trackora؟</h2>
      </div>
      <div class="faq-list">
        <details v-for="item in faqs" :key="item.question">
          <summary>{{ item.question }}</summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { setSeo } = useLocaleSeo()
const { locale } = useI18n()

setSeo(
  'Trackora | إدارة الشحنات وCOD لشركات الشحن',
  'منصة عربية لإدارة الشحنات، التوزيع، تطبيق المناديب، محافظ COD، التتبع العام، وكشف مخاطر الطلبات.',
  '/',
)

const shipments = [
  { id: 'TRK-4821', route: 'مدينة نصر إلى التجمع', status: 'تم الإسناد', tone: 'success' },
  { id: 'TRK-4822', route: 'المنصورة إلى طلخا', status: 'COD معلق', tone: 'warning' },
  { id: 'TRK-4823', route: 'الإسكندرية إلى سموحة', status: 'مراجعة خطر', tone: 'danger' },
]

const metrics = [
  { value: 'Excel', label: 'رفع دفعات الطلبات مع كشف الأخطاء قبل التشغيل' },
  { value: 'COD', label: 'تسوية حسب التاجر والمندوب والمرتجع' },
  { value: 'Risk', label: 'إشارات للأرقام المكررة والعناوين الناقصة' },
  { value: 'Track', label: 'رابط تتبع عام يقلل اتصالات الحالة' },
]

const problems = [
  { code: 'DISPATCH', title: 'توزيع يدوي يستهلك اليوم', text: 'فريق الديسباتش يطارد العناوين وسعة المناديب في ملفات منفصلة، فتزيد إعادة الإسناد والأخطاء.' },
  { code: 'COD', title: 'تحصيل لا يغلق بسرعة', text: 'الأموال تنتقل بين مندوب وتاجر وشركة شحن بدون سجل موحد يوضح المستحق والمعلق والمسوى.' },
  { code: 'COURIER', title: 'تأخير المندوب يظهر متأخرا', text: 'غياب تحديثات الميدان يجعل الإدارة تعرف المشكلة بعد اتصال العميل أو التاجر.' },
  { code: 'RISK', title: 'طلبات وهمية قبل الطريق', text: 'أرقام مكررة وعناوين ناقصة ومحاولات احتيال تدخل التشغيل قبل أن يراها الفريق.' },
  { code: 'TRACKING', title: 'تجربة تتبع ضعيفة', text: 'العميل يسأل التاجر، والتاجر يسأل شركة الشحن، بينما حالة الشحنة غير واضحة للجميع.' },
]

const solutionNodes = ['المتاجر', 'الديسباتش', 'المناديب', 'محفظة COD', 'تتبع العميل']

const intentPaths = [
  {
    audience: 'شركات الشحن',
    title: 'سيطرة يومية على الديسباتش والتحصيل',
    text: 'اعرف ما ينتظر الإسناد، ما خرج للطريق، ما فشل، وما يحتاج تسوية مالية قبل نهاية اليوم.',
    points: ['إسناد حسب المنطقة وسعة المندوب', 'حالات فشل وتسليم قابلة للمراجعة', 'محفظة COD لكل تاجر ومندوب'],
    cta: 'راجع حلول شركات الشحن',
    to: '/solutions/shipping-companies',
    featured: true,
  },
  {
    audience: 'متاجر التجارة الإلكترونية',
    title: 'رؤية واضحة للطلبات والمستحقات',
    text: 'ارفع الطلبات، تابع حالة كل شحنة، واعرف المستحق والمعلق بدون سؤال شركة الشحن كل ساعة.',
    points: ['رفع دفعات من ملفات الطلبات', 'تتبع حالات التسليم والمرتجع', 'تقارير COD جاهزة للمراجعة'],
    cta: 'اطلب بوابة التاجر',
    to: '/request-demo',
  },
  {
    audience: 'السوشيال سيلرز',
    title: 'تتبع أبسط لطلبات كثيرة وسريعة',
    text: 'قلل ضياع الطلبات بين الرسائل، وامنح العميل رابط تتبع واضحا بدلا من متابعة كل محادثة يدويا.',
    points: ['إدخال سريع للطلبات', 'رابط تتبع للعميل', 'تنبيه مبكر للبيانات الناقصة'],
    cta: 'شاهد مسار السوشيال سيلرز',
    to: '/request-demo',
  },
]

const features = [
  { tag: 'تشغيل الشحنات', title: 'Smart Dispatch', text: 'إسناد الشحنات حسب المنطقة، السعة، حالة المندوب، وأولوية التحصيل مع سجل تغيير واضح.', featured: true },
  { tag: 'المندوب', title: 'Courier App', text: 'مهام يومية، تحديثات تسليم، تحصيل COD، وسبب الفشل من الميدان.' },
  { tag: 'التاجر', title: 'Merchant Portal', text: 'بوابة للتاجر لرفع الطلبات ومتابعة الحالات والاطلاع على مستحقات COD.' },
  { tag: 'التحصيل', title: 'COD Wallet', text: 'رصيد للمحصل، المعلق، المرتجع، والمستحق للتسوية حسب كل طرف.' },
  { tag: 'العميل', title: 'Public Tracking', text: 'صفحة تتبع مفهومة تقلل مكالمات أين الشحنة ومتى تصل.' },
  { tag: 'المخاطر', title: 'Fraud Detection', text: 'إشارات مبكرة للأرقام المكررة، العناوين الناقصة، والطلبات المشكوك فيها.' },
  { tag: 'الدفعات', title: 'Bulk Upload', text: 'رفع دفعات الشحنات من ملفات المتاجر مع أخطاء واضحة قابلة للتصحيح.' },
  { tag: 'الإدارة', title: 'Reports & Analytics', text: 'تقارير عن التسليم، الفشل، التحصيل، وأداء المناديب والمناطق.' },
]

const workflow = [
  { number: '01', title: 'إنشاء الشحنة', text: 'أدخل الطلب يدويا أو ارفع ملفا كاملا من المتجر.' },
  { number: '02', title: 'إسناد المندوب', text: 'وزع الشحنات حسب المنطقة والسعة وأولوية التسليم.' },
  { number: '03', title: 'تتبع التسليم', text: 'كل تحديث ميداني يظهر للفريق والعميل في الوقت المناسب.' },
  { number: '04', title: 'تحصيل COD', text: 'سجل المبلغ المحصل والمعلق والمرتجع بدون حسابات جانبية.' },
  { number: '05', title: 'تسوية المحفظة', text: 'أغلق مستحقات التجار والمناديب بتقارير قابلة للمراجعة.' },
]

const proofColumns = [
  {
    kicker: 'حالة الشحنة',
    title: 'من الطلب إلى التسليم',
    rows: [
      { label: 'TRK-4821', value: 'خرجت للتوصيل', note: 'مندوب أحمد، منطقة التجمع، COD 850 ج.م' },
      { label: 'TRK-4822', value: 'محاولة فاشلة', note: 'العميل غير متاح، إعادة جدولة للغد' },
      { label: 'TRK-4823', value: 'مراجعة قبل الإرسال', note: 'رقم مكرر وعنوان ناقص' },
    ],
  },
  {
    kicker: 'محفظة COD',
    title: 'تسوية قابلة للمراجعة',
    rows: [
      { label: 'المحصل اليوم', value: '74,250 ج.م', note: 'مقسم حسب المندوب والتاجر' },
      { label: 'المعلق', value: '12,900 ج.م', note: 'شحنات مرتجعة أو لم تغلق بعد' },
      { label: 'جاهز للتسوية', value: '61,350 ج.م', note: 'قابل للتصدير والمراجعة المالية' },
    ],
  },
  {
    kicker: 'المخاطر والتتبع',
    title: 'أقل مفاجآت قبل الطريق',
    rows: [
      { label: 'Risk Flag', value: '12 رقم مكرر', note: 'موقوفة قبل الإسناد للمندوب' },
      { label: 'Tracking', value: 'رابط عام', note: 'العميل يرى الاستلام، الطريق، التسليم' },
      { label: 'Support', value: 'سبب واضح', note: 'فشل التسليم مسجل بدل مكالمة غير موثقة' },
    ],
  },
]

const plans = [
  { name: 'Starter', text: 'للفرق التي تبدأ تنظيم الشحنات وCOD.', price: 'ابدأ حسب الحجم', items: ['رفع شحنات', 'تتبع أساسي', 'تقارير يومية'] },
  { name: 'Growth', text: 'لشركات شحن تحتاج توزيع ومتابعة مالية أدق.', price: 'الأكثر طلبا', recommended: true, items: ['Smart Dispatch', 'Courier App', 'COD Wallet'] },
  { name: 'Scale', text: 'لعمليات متعددة الفروع والمتاجر والمندوبين.', price: 'تسعير مخصص', items: ['صلاحيات متقدمة', 'تقارير موسعة', 'دعم إعداد التشغيل'] },
]

const faqs = [
  { question: 'هل Trackora مناسب لشركات الشحن أم للمتاجر فقط؟', answer: 'المنصة مصممة أساسا لشركات الشحن، وتوفر بوابات وأدوات تساعد المتاجر والسوشيال سيلرز على رفع الطلبات ومتابعة التحصيل.' },
  { question: 'هل يمكن إدارة COD داخل النظام؟', answer: 'نعم. Trackora يعرض المحصل والمعلق والمرتجع والمستحق للتسوية حتى تقل مراجعات الجداول والحسابات اليدوية.' },
  { question: 'هل يدعم تتبع الشحنة للعميل؟', answer: 'نعم. يمكن للعميل فتح صفحة تتبع عامة لمعرفة حالة الشحنة بدون الرجوع للتاجر أو الدعم في كل مرة.' },
  { question: 'هل يمكن رفع شحنات كثيرة مرة واحدة؟', answer: 'نعم. يدعم Bulk Upload مع تحقق من الأخطاء حتى يعرف الفريق ما يحتاج تصحيحا قبل بدء التوزيع.' },
]
</script>

<style scoped>
.home-redesign {
  --trackora-primary: #1A3B66;
  --trackora-primary-light: #3B5998;
  --trackora-accent: #FF6B6B;
  --trackora-text: #333333;
  --trackora-muted: #5B6472;
  --trackora-surface: #F5F5F5;
  --trackora-bg: #FFFFFF;
  --trackora-ink: #0B1D33;
  --trackora-line: rgba(26, 59, 102, 0.14);
  --trackora-shadow: 0 24px 80px rgba(26, 59, 102, 0.16);
  --trackora-ease: cubic-bezier(0.22, 1, 0.36, 1);
  color: var(--trackora-text);
  background:
    radial-gradient(circle at 8% 4%, rgba(255, 107, 107, 0.12), transparent 28rem),
    linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 46%, #FFFFFF 100%);
  overflow: hidden;
}

.hero {
  position: relative;
  padding: clamp(5rem, 8vw, 8.5rem) clamp(1.25rem, 4vw, 5rem) clamp(4rem, 7vw, 7rem);
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 107, 107, 0.18), transparent 19rem),
    linear-gradient(145deg, #0A1D34 0%, var(--trackora-primary) 48%, #254C80 100%);
  color: #FFFFFF;
  isolation: isolate;
}

.hero::after {
  content: '';
  position: absolute;
  inset: auto -8rem -12rem -8rem;
  height: 18rem;
  background: #FFFFFF;
  border-radius: 50% 50% 0 0;
  z-index: -1;
}

.hero__grid,
.section,
.stats-strip,
.final-cta {
  width: min(100%, var(--container-wide));
  margin-inline: auto;
}

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(24rem, 1.05fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.hero__content {
  display: grid;
  gap: 1.5rem;
}

.hero__label,
.section-marker {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 999px;
  padding: 0.42rem 0.9rem;
  color: rgba(255, 255, 255, 0.86);
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.01em;
}

.hero h1 {
  max-width: 11ch;
  color: #FFFFFF;
  font-size: clamp(3rem, 7.6vw, 5.9rem);
  line-height: 1.04;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.hero__lead {
  max-width: 65ch;
  color: rgba(255, 255, 255, 0.82);
  font-size: clamp(1.05rem, 1.5vw, 1.24rem);
  line-height: 1.9;
  text-wrap: pretty;
}

.hero__actions,
.hero__proof {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  align-items: center;
}

.home-btn {
  min-height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0.88rem 1.35rem;
  color: inherit;
  font-weight: 900;
  line-height: 1.3;
  transition: transform 220ms var(--trackora-ease), box-shadow 220ms var(--trackora-ease), background 220ms var(--trackora-ease), border-color 220ms var(--trackora-ease);
}

.home-btn:hover {
  transform: translateY(-2px);
}

.home-btn:focus-visible,
details:focus-within {
  outline: 3px solid var(--trackora-accent);
  outline-offset: 3px;
}

.home-btn--primary {
  background: var(--trackora-accent);
  color: #210F16;
  box-shadow: 0 16px 36px rgba(255, 107, 107, 0.3);
}

.home-btn--primary:hover {
  color: #210F16;
  box-shadow: 0 20px 48px rgba(255, 107, 107, 0.42);
}

.home-btn--secondary {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.28);
  color: #FFFFFF;
}

.home-btn--secondary:hover {
  background: rgba(255, 255, 255, 0.16);
  color: #FFFFFF;
}

.home-btn--outline {
  color: var(--trackora-primary);
  border-color: rgba(26, 59, 102, 0.22);
  background: #FFFFFF;
  box-shadow: 0 14px 35px rgba(26, 59, 102, 0.09);
}

.home-btn--accent {
  color: #210F16;
  white-space: nowrap;
}

.hero__proof span {
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.95rem;
}

.hero__proof span::before {
  content: '';
  display: inline-block;
  width: 0.45rem;
  height: 0.45rem;
  margin-inline-end: 0.45rem;
  border-radius: 999px;
  background: var(--trackora-accent);
  box-shadow: 0 0 0 0.35rem rgba(255, 107, 107, 0.14);
}

.ops-console {
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 2rem;
  background: rgba(7, 20, 36, 0.72);
  box-shadow: 0 32px 100px rgba(0, 0, 0, 0.28);
  overflow: hidden;
  animation: console-arrive 760ms var(--trackora-ease) both;
}

.ops-console__topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.74);
}

.ops-console__topbar strong {
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
  background: rgba(255, 107, 107, 0.18);
  color: #FFD8D8;
}

.ops-console__body {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1rem;
  padding: 1rem;
}

.ops-console__main,
.ops-console__rail,
.route-board {
  display: grid;
  gap: 1rem;
}

.ops-card,
.wallet-meter,
.risk-ticket,
.courier-stack,
.route-row {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.08);
  padding: 1rem;
}

.ops-card--highlight {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.14), rgba(255, 107, 107, 0.12));
}

.ops-card__label,
.wallet-meter span,
.risk-ticket span,
.courier-stack span {
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.82rem;
}

.ops-card strong,
.wallet-meter strong,
.risk-ticket strong {
  display: block;
  margin-block: 0.35rem;
  color: #FFFFFF;
  font-size: clamp(1.6rem, 3vw, 2.5rem);
}

.ops-card small,
.risk-ticket small {
  color: rgba(255, 255, 255, 0.7);
}

.route-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.06);
}

.route-row strong,
.route-row span {
  display: block;
}

.route-row strong {
  color: #FFFFFF;
}

.route-row div > span {
  color: rgba(255, 255, 255, 0.64);
  font-size: 0.82rem;
}

.status-pill {
  flex: 0 0 auto;
  border-radius: 999px;
  padding: 0.35rem 0.65rem;
  font-size: 0.78rem;
  font-weight: 800;
}

.status-pill--success { background: rgba(79, 222, 146, 0.16); color: #BDF5D5; }
.status-pill--warning { background: rgba(255, 209, 102, 0.17); color: #FFE6A3; }
.status-pill--danger { background: rgba(255, 107, 107, 0.18); color: #FFD0D0; }

.wallet-meter__bar {
  height: 0.48rem;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
}

.wallet-meter__bar span {
  display: block;
  width: 72%;
  height: 100%;
  background: var(--trackora-accent);
}

.courier-stack div {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.75rem;
}

.courier-stack b {
  border-radius: 999px;
  padding: 0.4rem 0.65rem;
  background: rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
  font-size: 0.8rem;
}

.stats-strip {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  margin-top: -2rem;
  border: 1px solid var(--trackora-line);
  border-radius: 1.7rem;
  background: var(--trackora-line);
  box-shadow: var(--trackora-shadow);
  overflow: hidden;
}

.stat-item {
  display: grid;
  gap: 0.2rem;
  min-height: 8rem;
  align-content: center;
  padding: 1.4rem;
  background: #FFFFFF;
}

.stat-item strong {
  color: var(--trackora-primary);
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.stat-item span {
  color: var(--trackora-muted);
  font-weight: 700;
}

.section {
  padding: clamp(4.5rem, 8vw, 8rem) clamp(1.25rem, 3vw, 2rem);
}

.section__intro,
.pricing__intro,
.showcase__header {
  display: grid;
  gap: 1rem;
  max-width: 53rem;
  margin-bottom: clamp(2rem, 4vw, 3.5rem);
}

.section__intro--wide {
  max-width: 68rem;
}

.section-marker {
  border-color: rgba(26, 59, 102, 0.15);
  color: var(--trackora-primary);
  background: rgba(26, 59, 102, 0.05);
}

.section h2,
.final-cta h2 {
  color: var(--trackora-ink);
  font-size: clamp(2.2rem, 5vw, 4.4rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.section p,
.final-cta p {
  color: var(--trackora-muted);
  line-height: 1.85;
  text-wrap: pretty;
}

.section--problems {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
}

.problem-ledger {
  display: grid;
  gap: 0.8rem;
}

.problem-ledger__item {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  gap: 1.2rem;
  padding: 1.15rem;
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: 1.35rem;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 10px 35px rgba(26, 59, 102, 0.06);
}

.problem-ledger__item > span {
  color: var(--trackora-accent);
  font-size: 0.78rem;
  font-weight: 900;
}

.problem-ledger h3,
.feature-tile h3,
.workflow-steps h3,
.screen-card h3,
.plan-card h3 {
  color: var(--trackora-ink);
  font-size: clamp(1.15rem, 1.8vw, 1.55rem);
}

.solution {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(18rem, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.solution__copy {
  display: grid;
  gap: 1.25rem;
}

.intent-paths {
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
}

.intent-paths__header {
  display: grid;
  gap: 1rem;
  max-width: 62rem;
}

.intent-paths__header p {
  max-width: 72ch;
}

.intent-paths__grid {
  display: grid;
  grid-template-columns: 1.18fr 0.91fr 0.91fr;
  gap: 1rem;
  align-items: stretch;
}

.intent-card {
  display: grid;
  gap: 1rem;
  align-content: start;
  min-height: 23rem;
  padding: clamp(1.25rem, 2.5vw, 2rem);
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: 1.7rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(245, 245, 245, 0.72));
  box-shadow: 0 16px 48px rgba(26, 59, 102, 0.08);
}

.intent-card--featured {
  color: #FFFFFF;
  background:
    radial-gradient(circle at 15% 12%, rgba(255, 107, 107, 0.22), transparent 14rem),
    linear-gradient(145deg, var(--trackora-primary), #0B1D33);
  box-shadow: 0 28px 76px rgba(26, 59, 102, 0.2);
}

.intent-card > span {
  width: fit-content;
  border-radius: 999px;
  padding: 0.36rem 0.75rem;
  background: rgba(255, 107, 107, 0.12);
  color: #8F1D2B;
  font-size: 0.84rem;
  font-weight: 900;
}

.intent-card--featured > span {
  background: rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
}

.intent-card h3 {
  color: var(--trackora-ink);
  font-size: clamp(1.35rem, 2.4vw, 2.35rem);
  line-height: 1.16;
  text-wrap: balance;
}

.intent-card--featured h3,
.intent-card--featured p,
.intent-card--featured li {
  color: #FFFFFF;
}

.intent-card--featured p,
.intent-card--featured li {
  color: rgba(255, 255, 255, 0.8);
}

.intent-card ul {
  display: grid;
  gap: 0.55rem;
  margin-block: 0.25rem;
}

.intent-card li {
  position: relative;
  padding-inline-start: 1rem;
  color: var(--trackora-muted);
  line-height: 1.65;
}

.intent-card li::before {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  top: 0.72rem;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--trackora-accent);
}

.intent-card__link {
  align-self: end;
  width: fit-content;
  margin-top: auto;
  color: var(--trackora-primary);
  font-weight: 900;
}

.intent-card--featured .intent-card__link {
  color: #FFD6D6;
}

.connection-map {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 30rem;
  border-radius: 2.2rem;
  background:
    radial-gradient(circle at center, rgba(255, 107, 107, 0.2), transparent 10rem),
    linear-gradient(145deg, #0B1D33, var(--trackora-primary));
  box-shadow: var(--trackora-shadow);
}

.connection-map::before {
  content: '';
  position: absolute;
  inset: 3rem;
  border: 1px dashed rgba(255, 255, 255, 0.22);
  border-radius: 50%;
}

.connection-map__center {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  background: #FFFFFF;
  color: var(--trackora-primary);
  font-size: 1.4rem;
  font-weight: 900;
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.24);
}

.connection-map__node {
  position: absolute;
  border-radius: 999px;
  padding: 0.7rem 0.95rem;
  background: rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
  font-weight: 800;
}

.connection-map__node:nth-of-type(1) { top: 12%; right: 12%; }
.connection-map__node:nth-of-type(2) { top: 20%; left: 12%; }
.connection-map__node:nth-of-type(3) { bottom: 20%; right: 8%; }
.connection-map__node:nth-of-type(4) { bottom: 11%; left: 16%; }
.connection-map__node:nth-of-type(5) { top: 48%; left: 3%; }

.feature-bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.feature-tile {
  display: grid;
  gap: 0.85rem;
  min-height: 14rem;
  align-content: start;
  padding: 1.4rem;
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: 1.45rem;
  background: #FFFFFF;
  box-shadow: 0 12px 35px rgba(26, 59, 102, 0.06);
  transition: transform 220ms var(--trackora-ease), box-shadow 220ms var(--trackora-ease), border-color 220ms var(--trackora-ease);
}

.feature-tile--featured {
  grid-column: span 2;
  grid-row: span 2;
  min-height: 29rem;
  color: #FFFFFF;
  background:
    radial-gradient(circle at 18% 12%, rgba(255, 107, 107, 0.28), transparent 14rem),
    linear-gradient(145deg, var(--trackora-primary), #0B1D33);
}

.feature-tile span {
  color: var(--trackora-accent);
  font-weight: 900;
}

.feature-tile--featured h3,
.feature-tile--featured p {
  color: #FFFFFF;
}

.feature-tile--featured p {
  color: rgba(255, 255, 255, 0.78);
  max-width: 34ch;
}

.section-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-top: clamp(1.5rem, 3vw, 2.5rem);
  padding: clamp(1rem, 2vw, 1.35rem);
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: 1.5rem;
  background: linear-gradient(135deg, rgba(26, 59, 102, 0.06), rgba(255, 107, 107, 0.08));
}

.section-cta p {
  max-width: 58ch;
  color: var(--trackora-ink);
  font-weight: 800;
}

@media (hover: hover) {
  .feature-tile:hover,
  .screen-card:hover,
  .plan-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 55px rgba(26, 59, 102, 0.13);
  }
}

.workflow {
  border-radius: 2.4rem;
  background: var(--trackora-surface);
}

.workflow-steps {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.8rem;
  counter-reset: workflow;
}

.workflow-steps li {
  display: grid;
  gap: 0.8rem;
  padding: 1.2rem;
  border-radius: 1.35rem;
  background: #FFFFFF;
  border: 1px solid rgba(26, 59, 102, 0.1);
}

.workflow-steps span {
  color: var(--trackora-accent);
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.proof-board {
  position: relative;
}

.proof-ledger {
  display: grid;
  grid-template-columns: 1fr 1.08fr 1fr;
  gap: 1px;
  overflow: hidden;
  border: 1px solid rgba(26, 59, 102, 0.14);
  border-radius: 2rem;
  background: rgba(26, 59, 102, 0.14);
  box-shadow: var(--trackora-shadow);
}

.proof-column {
  display: grid;
  gap: 1.2rem;
  padding: clamp(1.25rem, 2.4vw, 2rem);
  background: #FFFFFF;
}

.proof-column:nth-child(2) {
  background:
    radial-gradient(circle at 20% 10%, rgba(255, 107, 107, 0.12), transparent 14rem),
    var(--trackora-surface);
}

.proof-column__header {
  display: grid;
  gap: 0.35rem;
}

.proof-column__header span {
  color: var(--trackora-accent);
  font-size: 0.85rem;
  font-weight: 900;
}

.proof-column__header h3 {
  color: var(--trackora-ink);
  font-size: clamp(1.25rem, 2vw, 1.8rem);
  line-height: 1.2;
}

.proof-column ul {
  display: grid;
  gap: 0.85rem;
}

.proof-column li {
  display: grid;
  gap: 0.28rem;
  padding: 0.9rem 0;
  border-top: 1px solid rgba(26, 59, 102, 0.1);
}

.proof-column li:first-child {
  border-top: 0;
}

.proof-column li > span {
  color: var(--trackora-muted);
  font-size: 0.82rem;
  font-weight: 800;
}

.proof-column strong {
  color: var(--trackora-primary);
  font-size: clamp(1rem, 1.6vw, 1.28rem);
}

.proof-column small {
  color: var(--trackora-muted);
  line-height: 1.65;
}

.screen-card {
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: 1.6rem;
  background: #FFFFFF;
  box-shadow: 0 12px 42px rgba(26, 59, 102, 0.07);
  transition: transform 220ms var(--trackora-ease), box-shadow 220ms var(--trackora-ease);
}

.screen-card__chrome {
  display: flex;
  gap: 0.35rem;
}

.screen-card__chrome span {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: rgba(26, 59, 102, 0.18);
}

.screen-card__mock {
  display: grid;
  gap: 0.55rem;
  margin-top: 0.25rem;
  padding: 1rem;
  border-radius: 1.1rem;
  background: linear-gradient(145deg, rgba(26, 59, 102, 0.06), rgba(255, 107, 107, 0.08));
}

.screen-card__mock span {
  display: flex;
  justify-content: space-between;
  border-radius: 0.8rem;
  padding: 0.7rem;
  background: #FFFFFF;
  color: var(--trackora-primary);
  font-weight: 800;
}

.pricing {
  text-align: center;
}

.pricing__intro {
  margin-inline: auto;
}

.pricing__intro .section-marker {
  margin-inline: auto;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  text-align: right;
}

.plan-card {
  position: relative;
  display: grid;
  gap: 1rem;
  padding: 1.45rem;
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: 1.6rem;
  background: #FFFFFF;
  box-shadow: 0 12px 38px rgba(26, 59, 102, 0.07);
  transition: transform 220ms var(--trackora-ease), box-shadow 220ms var(--trackora-ease);
}

.plan-card--recommended {
  border-color: rgba(255, 107, 107, 0.45);
  box-shadow: 0 20px 60px rgba(255, 107, 107, 0.16);
}

.plan-card__badge {
  width: fit-content;
  border-radius: 999px;
  padding: 0.36rem 0.72rem;
  background: rgba(255, 107, 107, 0.14);
  color: #8F1D2B;
  font-weight: 900;
  font-size: 0.82rem;
}

.plan-card strong {
  color: var(--trackora-primary);
  font-size: 1.35rem;
}

.plan-card li {
  position: relative;
  padding-inline-start: 1.1rem;
  color: var(--trackora-muted);
  line-height: 1.8;
}

.plan-card li::before {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  top: 0.82rem;
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 50%;
  background: var(--trackora-accent);
}

.final-cta {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: center;
  margin-block: clamp(3rem, 6vw, 5rem);
  padding: clamp(2rem, 5vw, 4rem);
  border-radius: 2.2rem;
  color: #FFFFFF;
  background:
    radial-gradient(circle at 18% 25%, rgba(255, 107, 107, 0.24), transparent 18rem),
    linear-gradient(145deg, #0B1D33, var(--trackora-primary));
  box-shadow: var(--trackora-shadow);
}

.final-cta h2,
.final-cta p {
  color: #FFFFFF;
}

.final-cta p {
  max-width: 66ch;
  color: rgba(255, 255, 255, 0.78);
}

.final-cta .section-marker {
  border-color: rgba(255, 255, 255, 0.18);
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.08);
  margin-bottom: 1rem;
}

.faq-list {
  display: grid;
  gap: 0.75rem;
}

details {
  border: 1px solid rgba(26, 59, 102, 0.12);
  border-radius: 1.25rem;
  background: #FFFFFF;
  box-shadow: 0 10px 30px rgba(26, 59, 102, 0.06);
}

summary {
  min-height: 3.2rem;
  cursor: pointer;
  padding: 1rem 1.2rem;
  color: var(--trackora-ink);
  font-weight: 900;
}

details p {
  padding: 0 1.2rem 1.2rem;
  max-width: 78ch;
}

@keyframes console-arrive {
  from {
    opacity: 0;
    transform: translateY(26px) scale(0.98);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@media (max-width: 1040px) {
  .hero__grid,
  .section--problems,
  .solution,
  .final-cta {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    max-width: 13ch;
  }

  .feature-bento,
  .workflow-steps,
  .intent-paths__grid,
  .proof-ledger {
    grid-template-columns: repeat(2, 1fr);
  }

  .intent-card--featured,
  .proof-column:first-child {
    grid-column: span 2;
  }

  .feature-tile--featured {
    grid-column: span 2;
    min-height: 18rem;
  }

  .pricing-grid,
  .stats-strip {
    grid-template-columns: repeat(2, 1fr);
  }

  .final-cta {
    justify-items: start;
  }
}

@media (max-width: 720px) {
  .hero {
    padding-inline: 1rem;
  }

  .hero__grid {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    max-width: 100%;
    font-size: clamp(2.55rem, 14vw, 4rem);
  }

  .hero__actions .home-btn,
  .home-btn--accent {
    width: 100%;
  }

  .ops-console__body,
  .stats-strip,
  .intent-paths__grid,
  .feature-bento,
  .workflow-steps,
  .showcase-grid,
  .pricing-grid,
  .proof-ledger {
    grid-template-columns: 1fr;
  }

  .intent-card--featured,
  .proof-column:first-child {
    grid-column: auto;
  }

  .ops-console,
  .connection-map,
  .workflow,
  .final-cta {
    border-radius: 1.5rem;
  }

  .route-row,
  .problem-ledger__item {
    grid-template-columns: 1fr;
  }

  .route-row {
    display: grid;
  }

  .feature-tile--featured {
    grid-column: auto;
    grid-row: auto;
  }

  .intent-card,
  .feature-tile,
  .proof-column,
  .plan-card {
    min-height: auto;
  }

  .section-cta {
    align-items: stretch;
  }

  .section-cta .home-btn {
    width: 100%;
  }

  .proof-ledger {
    border-radius: 1.5rem;
  }

  .connection-map {
    min-height: 24rem;
  }

  .connection-map__node {
    position: static;
    margin: 0.2rem;
  }

  .connection-map {
    align-content: center;
    gap: 0.55rem;
  }

  .connection-map::before {
    inset: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ops-console {
    animation: none;
  }

  .home-btn,
  .feature-tile,
  .screen-card,
  .plan-card {
    transition-duration: 0.01ms;
  }
}
</style>
