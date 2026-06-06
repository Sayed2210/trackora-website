<template>
  <div class="home-redesign" dir="rtl">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__grid">
        <div class="hero__content">
          <p class="hero__label">نظام تشغيل الشحنات والتحصيل</p>
          <h1 id="hero-title">إدارة التوصيل وCOD من أول طلب حتى تسوية المحفظة</h1>
          <p class="hero__lead">
            Trackora يجمع شركات الشحن، المتاجر، المناديب، التحصيل، والتتبع في نظام واحد واضح. ارفع الطلبات، وزع الشحنات، راقب المخاطر، وأغلق حسابات COD بدون جداول منفصلة أو اتصالات متكررة.
          </p>
          <div class="hero__actions" aria-label="إجراءات رئيسية">
            <NuxtLink class="home-btn home-btn--primary" to="/request-demo">اطلب عرض توضيحي</NuxtLink>
            <NuxtLink class="home-btn home-btn--secondary" to="/track">تتبع شحنة</NuxtLink>
          </div>
          <div class="hero__proof" aria-label="ملخص تشغيلي">
            <span>جاهز لشركات الشحن</span>
            <span>يدعم المتاجر الإلكترونية</span>
            <span>مصمم لعمليات COD</span>
          </div>
        </div>

        <div class="ops-console" aria-label="مثال على لوحة Trackora التشغيلية">
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
                <span>COD قيد التسوية</span>
                <strong>74,250 ج.م</strong>
                <div class="wallet-meter__bar"><span /></div>
              </div>
              <div class="risk-ticket">
                <span>إشارة مخاطر</span>
                <strong>12 طلب مكرر</strong>
                <small>تم وضعها للمراجعة قبل الإرسال</small>
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

    <section class="stats-strip" aria-label="مؤشرات تشغيلية">
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
        <NuxtLink class="home-btn home-btn--primary" to="/request-demo">شاهد النظام على عمليتك</NuxtLink>
      </div>
      <div class="connection-map" aria-label="خريطة ربط Trackora التشغيلية">
        <div class="connection-map__center">Trackora</div>
        <span v-for="node in solutionNodes" :key="node" class="connection-map__node">{{ node }}</span>
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

    <section class="section showcase" aria-labelledby="showcase-title">
      <div class="showcase__header">
        <span class="section-marker">لقطات من المنتج</span>
        <h2 id="showcase-title">واجهات تعطي كل فريق ما يحتاجه بدون ضوضاء</h2>
      </div>
      <div class="showcase-grid">
        <article v-for="screen in screens" :key="screen.title" class="screen-card">
          <div class="screen-card__chrome"><span /><span /><span /></div>
          <h3>{{ screen.title }}</h3>
          <p>{{ screen.text }}</p>
          <div class="screen-card__mock">
            <span v-for="line in screen.lines" :key="line">{{ line }}</span>
          </div>
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
      <NuxtLink class="home-btn home-btn--outline" to="/pricing">عرض خطط الأسعار</NuxtLink>
    </section>

    <section class="final-cta" aria-labelledby="final-cta-title">
      <div>
        <span class="section-marker">جاهز للتشغيل</span>
        <h2 id="final-cta-title">حوّل شحناتك وCOD إلى سجل واحد قابل للمتابعة والمحاسبة</h2>
        <p>
          احجز عرضا توضيحيا مبنيا على شكل عمليتك: عدد الشحنات، مناطق التوصيل، طريقة التحصيل، واحتياج المتاجر للتتبع.
        </p>
      </div>
      <NuxtLink class="home-btn home-btn--primary home-btn--accent" to="/request-demo">اطلب عرض توضيحي</NuxtLink>
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

setSeo(
  'Trackora | إدارة الشحنات وCOD لشركات الشحن',
  'منصة عربية لإدارة الشحنات، التوزيع، تطبيق المناديب، محافظ COD، التتبع العام، وكشف مخاطر الطلبات.'
)

const shipments = [
  { id: 'TRK-4821', route: 'مدينة نصر إلى التجمع', status: 'تم الإسناد', tone: 'success' },
  { id: 'TRK-4822', route: 'المنصورة إلى طلخا', status: 'COD معلق', tone: 'warning' },
  { id: 'TRK-4823', route: 'الإسكندرية إلى سموحة', status: 'مراجعة خطر', tone: 'danger' },
]

const metrics = [
  { value: '25K+', label: 'شحنة يمكن إدارتها شهريا' },
  { value: '99%', label: 'وضوح لحالة التحصيل' },
  { value: '5 دقائق', label: 'لرفع دفعة طلبات' },
  { value: '24/7', label: 'تتبع متاح للعميل' },
]

const problems = [
  { code: 'DISPATCH', title: 'توزيع يدوي يستهلك اليوم', text: 'فريق الديسباتش يطارد العناوين وسعة المناديب في ملفات منفصلة، فتزيد إعادة الإسناد والأخطاء.' },
  { code: 'COD', title: 'تحصيل لا يغلق بسرعة', text: 'الأموال تنتقل بين مندوب وتاجر وشركة شحن بدون سجل موحد يوضح المستحق والمعلق والمسوى.' },
  { code: 'COURIER', title: 'تأخير المندوب يظهر متأخرا', text: 'غياب تحديثات الميدان يجعل الإدارة تعرف المشكلة بعد اتصال العميل أو التاجر.' },
  { code: 'RISK', title: 'طلبات وهمية قبل الطريق', text: 'أرقام مكررة وعناوين ناقصة ومحاولات احتيال تدخل التشغيل قبل أن يراها الفريق.' },
  { code: 'TRACKING', title: 'تجربة تتبع ضعيفة', text: 'العميل يسأل التاجر، والتاجر يسأل شركة الشحن، بينما حالة الشحنة غير واضحة للجميع.' },
]

const solutionNodes = ['المتاجر', 'الديسباتش', 'المناديب', 'محفظة COD', 'تتبع العميل']

const features = [
  { tag: 'Dispatch', title: 'Smart Dispatch', text: 'إسناد الشحنات حسب المنطقة، السعة، حالة المندوب، وأولوية التحصيل.', featured: true },
  { tag: 'Courier', title: 'Courier App', text: 'مهام يومية، تحديثات تسليم، تحصيل COD، وإثباتات ميدانية للمندوب.' },
  { tag: 'Merchant', title: 'Merchant Portal', text: 'بوابة للتاجر لرفع الطلبات ومتابعة الحالات والاطلاع على مستحقات COD.' },
  { tag: 'Wallet', title: 'COD Wallet', text: 'رصيد واضح للمحصل، المعلق، المرتجع، والمستحق للتسوية.' },
  { tag: 'Tracking', title: 'Public Tracking', text: 'صفحة تتبع مفهومة للعميل تقلل المكالمات المتكررة على الدعم.' },
  { tag: 'Risk', title: 'Fraud Detection', text: 'إشارات مبكرة للطلبات المكررة أو المشكوك فيها قبل خروجها للطريق.' },
  { tag: 'Upload', title: 'Bulk Upload', text: 'رفع دفعات الشحنات من ملفات المتاجر مع تحقق واضح من الأخطاء.' },
  { tag: 'Reports', title: 'Reports & Analytics', text: 'تقارير تشغيلية عن التسليم، الفشل، التحصيل، وأداء المناديب.' },
]

const workflow = [
  { number: '01', title: 'إنشاء الشحنة', text: 'أدخل الطلب يدويا أو ارفع ملفا كاملا من المتجر.' },
  { number: '02', title: 'إسناد المندوب', text: 'وزع الشحنات حسب المنطقة والسعة وأولوية التسليم.' },
  { number: '03', title: 'تتبع التسليم', text: 'كل تحديث ميداني يظهر للفريق والعميل في الوقت المناسب.' },
  { number: '04', title: 'تحصيل COD', text: 'سجل المبلغ المحصل والمعلق والمرتجع بدون حسابات جانبية.' },
  { number: '05', title: 'تسوية المحفظة', text: 'أغلق مستحقات التجار والمناديب بتقارير قابلة للمراجعة.' },
]

const screens = [
  { title: 'لوحة التشغيل', text: 'رؤية يومية للشحنات، المناطق، المناديب، وحالات التأخير.', lines: ['128 بانتظار الإسناد', '43 في الطريق', '9 تحتاج مراجعة'] },
  { title: 'مهمة المندوب', text: 'قائمة تسليم واضحة مع حالة COD وإثباتات التنفيذ.', lines: ['استلام من المخزن', 'تسليم العميل', 'تحصيل 850 ج.م'] },
  { title: 'محفظة COD', text: 'تفصيل المحصل والمعلق والمستحق لكل تاجر أو مندوب.', lines: ['محصل 74,250', 'معلق 12,900', 'جاهز للتسوية'] },
  { title: 'تتبع العميل', text: 'خط زمني بسيط يقلل أسئلة أين الشحنة ومتى تصل.', lines: ['تم الاستلام', 'خرجت للتوصيل', 'تم التسليم'] },
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
  width: min(100%, 1180px);
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
  .workflow-steps {
    grid-template-columns: repeat(2, 1fr);
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
  .feature-bento,
  .workflow-steps,
  .showcase-grid,
  .pricing-grid {
    grid-template-columns: 1fr;
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
