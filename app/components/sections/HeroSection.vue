<template>
  <section class="hero section section--dark" aria-labelledby="hero-heading">
    <AppContainer wide>
      <div class="hero__inner">
        <div class="hero__content">
          <AppBadge variant="eyebrow" class="reveal-up">{{ t('hero.eyebrow') }}</AppBadge>
          <h1 id="hero-heading" class="hero__title reveal-up">
            {{ t('hero.title') }}
            <span class="hero__accent">{{ t('hero.accent') }}</span>
          </h1>
          <p class="hero__subtitle reveal-up">{{ t('hero.subtitle') }}</p>
          <div class="hero__actions reveal-up">
            <AppButton to="/request-demo" variant="primary" size="lg">{{ t('hero.ctaPrimary') }}</AppButton>
            <AppButton to="/track" variant="secondary" size="lg">{{ t('hero.ctaSecondary') }}</AppButton>
          </div>
        </div>
        <div class="hero__visual reveal-scale" aria-hidden="true">
          <div class="hero__dashboard">
            <div class="hero__dashboard-header">
              <span class="hero__dashboard-dot"></span>
              <span class="hero__dashboard-dot"></span>
              <span class="hero__dashboard-dot"></span>
            </div>
            <div class="hero__dashboard-body">
              <div class="hero__stat-row">
                <div class="hero__stat-card hero__stat-card--primary">
                  <span class="hero__stat-value">١,٢٤٧</span>
                  <span class="hero__stat-label">{{ locale === 'ar' ? 'شحنة نشطة' : 'Active Shipments' }}</span>
                </div>
                <div class="hero__stat-card hero__stat-card--accent">
                  <span class="hero__stat-value">٣٤٨K</span>
                  <span class="hero__stat-label">{{ locale === 'ar' ? 'تحصيلات الشهر' : 'COD This Month' }}</span>
                </div>
              </div>
              <div class="hero__stat-row">
                <div class="hero__stat-card hero__stat-card--success">
                  <span class="hero__stat-value">٩٧٪</span>
                  <span class="hero__stat-label">{{ locale === 'ar' ? 'نسبة التوصيل' : 'Delivery Rate' }}</span>
                </div>
                <div class="hero__stat-card hero__stat-card--info">
                  <span class="hero__stat-value">٨٢</span>
                  <span class="hero__stat-label">{{ locale === 'ar' ? 'ساعٍ نشط' : 'Active Couriers' }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="hero__cards">
            <div class="hero__card">
              <AppIcon3D name="shipment" :alt="locale === 'ar' ? 'أيقونة شحنة ثلاثية الأبعاد' : 'Shipment 3D icon'" size="sm" variant="compact" />
              <div class="hero__card-text">
                <span class="hero__card-title">{{ locale === 'ar' ? 'شحنة جديدة' : 'New Shipment' }}</span>
                <span class="hero__card-detail">TRK-240502-A1</span>
              </div>
            </div>
            <div class="hero__card">
              <AppIcon3D name="cod-wallet" :alt="locale === 'ar' ? 'أيقونة محفظة نقدي ثلاثية الأبعاد' : 'COD wallet 3D icon'" size="sm" variant="compact" />
              <div class="hero__card-text">
                <span class="hero__card-title">{{ locale === 'ar' ? 'تحصيل نقدي' : 'COD Collected' }}</span>
                <span class="hero__card-detail">{{ locale === 'ar' ? 'ر.س ١,٨٥٠' : 'SAR 1,850' }}</span>
              </div>
            </div>
            <div class="hero__card">
              <AppIcon3D name="courier-app" :alt="locale === 'ar' ? 'أيقونة تطبيق الساعي ثلاثية الأبعاد' : 'Courier app 3D icon'" size="sm" variant="compact" />
              <div class="hero__card-text">
                <span class="hero__card-title">{{ locale === 'ar' ? 'ساعٍ في الطريق' : 'Courier En Route' }}</span>
                <span class="hero__card-detail">{{ locale === 'ar' ? 'خارج للتوصيل' : 'Out for Delivery' }}</span>
              </div>
            </div>
            <div class="hero__card">
              <AppIcon3D name="public-tracking" :alt="locale === 'ar' ? 'أيقونة تتبع عام ثلاثية الأبعاد' : 'Public tracking 3D icon'" size="sm" variant="compact" />
              <div class="hero__card-text">
                <span class="hero__card-title">{{ locale === 'ar' ? 'تم التوصيل' : 'Delivered' }}</span>
                <span class="hero__card-detail">{{ locale === 'ar' ? 'الرياض — جدة' : 'Riyadh — Jeddah' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
useScrollReveal()
</script>

<style scoped>
.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-16);
  align-items: center;
  min-height: 90vh;
  padding-block: var(--spacing-20) var(--spacing-16);
  overflow: hidden;
}

.hero__content {
  position: relative;
  z-index: 2;
  min-width: 0;
}

.hero__content .app-badge {
  margin-block-end: var(--spacing-6);
}

.hero__title {
  font-family: var(--font-heading);
  font-size: var(--text-display);
  font-weight: 900;
  color: var(--color-text-light);
  line-height: 1.05;
  letter-spacing: -0.04em;
  margin-block-end: var(--spacing-8);
}

.hero__accent {
  background: linear-gradient(135deg, var(--color-accent), #FF8E53, #FFB347);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__subtitle {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.9;
  max-width: 34rem;
  margin-block-end: var(--spacing-12);
  font-weight: 400;
}

.hero__actions {
  display: flex;
  gap: var(--spacing-4);
  flex-wrap: wrap;
}

.hero__visual {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
  width: 100%;
  min-width: 0;
}

.hero__dashboard {
  background: var(--glass-bg-dark);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-8);
  backdrop-filter: blur(24px);
  box-shadow: var(--shadow-glow), 0 0 120px rgba(59, 89, 152, 0.15);
  min-width: 0;
}

.hero__dashboard-header {
  display: flex;
  gap: var(--spacing-2);
  margin-block-end: var(--spacing-6);
}

.hero__dashboard-dot {
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
}

.hero__dashboard-body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.hero__stat-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4);
}

.hero__stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-5) var(--spacing-6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-width: 0;
}

.hero__stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.hero__stat-value {
  display: block;
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 800;
  color: var(--color-text-light);
  margin-block-end: var(--spacing-1);
}

.hero__stat-label {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.02em;
}

.hero__stat-card--primary .hero__stat-value {
  color: var(--color-primary-light);
}

.hero__stat-card--accent .hero__stat-value {
  background: linear-gradient(135deg, var(--color-accent), #FF8E53);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__stat-card--success .hero__stat-value {
  color: var(--color-success);
}

.hero__stat-card--info .hero__stat-value {
  color: var(--color-info);
}

.hero__cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3);
  min-width: 0;
}

.hero__card {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  background: var(--glass-bg);
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-3) var(--spacing-4);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-card);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-width: 0;
}

.hero__card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.hero__card-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.hero__card-title {
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hero__card-detail {
  font-size: 0.6875rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 75rem) {
  .hero__inner {
    grid-template-columns: 5fr 4fr;
    gap: var(--spacing-10);
  }
}

@media (max-width: 64rem) {
  .hero__inner {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-block: var(--spacing-16) var(--spacing-12);
    text-align: center;
  }

  .hero__subtitle {
    margin-inline: auto;
  }

  .hero__actions {
    justify-content: center;
  }

  .hero__visual {
    max-width: 28rem;
    width: 100%;
    margin-inline: auto;
  }
}

@media (max-width: 36rem) {
  .hero__title {
    font-size: clamp(2.25rem, 8vw, 3rem);
  }

  .hero__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero__cards {
    display: none;
  }

  .hero__stat-row {
    grid-template-columns: 1fr;
  }

  .hero__dashboard {
    padding: var(--spacing-5);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__stat-card:hover {
    transform: none;
  }

  .hero__card:hover {
    transform: none;
  }
}
</style>
