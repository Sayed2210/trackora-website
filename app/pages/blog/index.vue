<template>
  <main class="blog-page" dir="rtl">
    <section class="blog-hero" aria-labelledby="blog-heading">
      <AppContainer wide>
        <div class="blog-hero__content">
          <p class="blog-label">مدونة Trackora</p>
          <h1 id="blog-heading">أدلة تشغيل للشحن والتحصيل</h1>
          <p>
            اقرأ ما يساعد فريقك على تقليل التأخير، ضبط COD، تنظيم المناديب، وتوضيح حالة الشحنة للتاجر والعميل.
          </p>
          <div class="blog-actions">
            <NuxtLink class="blog-link blog-link--primary" to="/request-demo">اطلب عرضا على عملية شحنك</NuxtLink>
            <a class="blog-link blog-link--secondary" href="#articles">استعرض المقالات</a>
          </div>
        </div>
      </AppContainer>
    </section>

    <section id="articles" class="blog-section blog-section--filters" aria-labelledby="filter-heading">
      <AppContainer wide>
        <div class="blog-section__header">
          <h2 id="filter-heading">اختر مساحة التشغيل</h2>
          <p>صف المقالات حسب المشكلة التي تريد حلها الآن.</p>
        </div>
        <div class="category-filter" role="list" aria-label="تصنيفات المقالات">
          <button
            v-for="category in blogCategories"
            :key="category"
            type="button"
            :class="['category-filter__button', { 'category-filter__button--active': selectedCategory === category }]"
            :aria-pressed="selectedCategory === category"
            @click="selectedCategory = category"
          >
            <span>{{ category }}</span>
            <small>{{ getCategoryCount(category) }}</small>
          </button>
        </div>
      </AppContainer>
    </section>

    <section v-if="visibleFeaturedArticle" class="blog-section blog-section--featured" aria-labelledby="featured-heading">
      <AppContainer wide>
        <article class="featured-article">
          <div class="article-meta">
            <span>{{ visibleFeaturedArticle.category }}</span>
            <time :datetime="visibleFeaturedArticle.publishedAt">{{ formatDate(visibleFeaturedArticle.publishedAt) }}</time>
            <span>{{ visibleFeaturedArticle.readTime }}</span>
          </div>
          <h2 id="featured-heading">{{ visibleFeaturedArticle.title }}</h2>
          <p>{{ visibleFeaturedArticle.summary }}</p>
          <ul class="featured-article__takeaways" aria-label="أهم ما ستتعلمه">
            <li v-for="takeaway in visibleFeaturedArticle.keyTakeaways" :key="takeaway">{{ takeaway }}</li>
          </ul>
          <NuxtLink class="blog-link blog-link--primary" :to="`/blog/${visibleFeaturedArticle.slug}`">اقرأ المقال المميز</NuxtLink>
        </article>
      </AppContainer>
    </section>

    <section v-if="listedArticles.length || !visibleFeaturedArticle" class="blog-section blog-section--grid" aria-labelledby="articles-heading">
      <AppContainer wide>
        <div class="blog-section__header">
          <h2 id="articles-heading">{{ listedArticles.length }} مقالات متاحة</h2>
          <p>كل مقال يركز على قرار تشغيلي واحد يمكن اختباره في يوم العمل.</p>
        </div>

        <div v-if="listedArticles.length" class="article-grid">
          <NuxtLink
            v-for="article in listedArticles"
            :key="article.slug"
            class="article-card"
            :to="`/blog/${article.slug}`"
          >
            <div class="article-meta">
              <span>{{ article.category }}</span>
              <span>{{ article.readTime }}</span>
            </div>
            <h3>{{ article.title }}</h3>
            <p>{{ article.excerpt }}</p>
            <span class="article-card__date">{{ formatDate(article.publishedAt) }}</span>
            <span class="article-card__read">اقرأ الدليل</span>
          </NuxtLink>
        </div>

        <div v-else class="blog-empty" role="status">
          <h3>لا توجد مقالات في هذا التصنيف الآن</h3>
          <p>اختر تصنيفا آخر أو عد إلى كل المقالات.</p>
          <button type="button" class="blog-link blog-link--primary" @click="selectedCategory = 'كل المقالات'">عرض كل المقالات</button>
        </div>
      </AppContainer>
    </section>

    <section class="blog-final-cta" aria-labelledby="blog-final-heading">
      <AppContainer wide>
        <div class="blog-final-cta__content">
          <h2 id="blog-final-heading">طبّق الأدلة على دورة شحن حقيقية</h2>
          <p>شاهد Trackora على بياناتك إذا كانت هذه المقالات تصف مشاكل موجودة في الديسباتش، المناديب، التحصيل، أو التسوية.</p>
          <NuxtLink class="blog-link blog-link--primary" to="/request-demo">اطلب عرض Trackora</NuxtLink>
        </div>
      </AppContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
import { blogArticles, blogCategories } from '~/data/blog'

const { setSeo } = useLocaleSeo()

setSeo(
  'المدونة | أدلة تشغيل للشحن والتحصيل',
  'مدونة Trackora العربية لشركات الشحن والمتاجر: أدلة عملية عن الشحنات، المناديب، تحصيل COD، التسوية، التتبع، المرتجعات، والمخاطر.',
  '/blog',
)

const selectedCategory = ref<(typeof blogCategories)[number]>('كل المقالات')

const featuredArticle = computed(() => blogArticles.find(article => article.featured) || blogArticles[0])

const filteredArticles = computed(() => {
  if (selectedCategory.value === 'كل المقالات') return blogArticles
  return blogArticles.filter(article => article.category === selectedCategory.value)
})

const visibleFeaturedArticle = computed(() => {
  const article = featuredArticle.value
  if (!article) return undefined
  if (selectedCategory.value === 'كل المقالات' || selectedCategory.value === article.category) return article
  return undefined
})

const listedArticles = computed(() => {
  if (!visibleFeaturedArticle.value) return filteredArticles.value
  return filteredArticles.value.filter(article => article.slug !== visibleFeaturedArticle.value?.slug)
})

function getCategoryCount(category: (typeof blogCategories)[number]) {
  if (category === 'كل المقالات') return blogArticles.length
  return blogArticles.filter(article => article.category === category).length
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}
</script>

<style scoped>
.blog-page {
    --trackora-primary: #1A3B66;

  --blog-ink: oklch(19% 0.035 224);
  --blog-muted: oklch(36% 0.035 220);
  --blog-line: oklch(84% 0.024 210);
  --blog-soft: oklch(96% 0.019 205);
  --blog-command: oklch(25% 0.055 210);
  --blog-teal: oklch(42% 0.09 210);
  --blog-accent: #FF6B6B;
  --blog-accent-ink: oklch(20% 0.052 72);
  color: var(--blog-ink);
  background: linear-gradient(180deg, #ffffff 0%, var(--blog-soft) 42%, #ffffff 100%);
}

.blog-hero {
  padding-block: clamp(5rem, 9vw, 8rem);
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 107, 107, 0.18), transparent 19rem),
    linear-gradient(145deg, #0A1D34 0%, var(--trackora-primary) 48%, #254C80 100%);
  color: #ffffff;
}

.blog-hero__content {
  display: grid;
  gap: 1.35rem;
  max-width: 62rem;
}

.blog-label {
  width: fit-content;
  border-radius: 999px;
  padding: 0.44rem 0.9rem;
  background: oklch(72% 0.14 72 / 0.16);
  color: oklch(91% 0.08 78);
  font-weight: 900;
}

.blog-hero h1 {
  max-width: 12ch;
  color: #ffffff;
  font-size: clamp(3rem, 8vw, 5.8rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.blog-hero p:not(.blog-label) {
  max-width: 64ch;
  color: oklch(100% 0 0 / 0.88);
  font-size: clamp(1.08rem, 1.45vw, 1.25rem);
  line-height: 1.9;
  text-wrap: pretty;
}

.blog-actions,
.category-filter,
.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.blog-link {
  min-height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0.85rem 1.35rem;
  color: inherit;
  font-weight: 900;
  line-height: 1.35;
  text-decoration: none;
  transition: transform 220ms var(--reveal-easing), box-shadow 220ms var(--reveal-easing), background 220ms ease, border-color 220ms ease;
}

.blog-link:hover {
  transform: translateY(-2px);
}

.blog-link:focus-visible,
.category-filter__button:focus-visible,
.article-card:focus-visible {
  outline: 3px solid var(--blog-accent);
  outline-offset: 3px;
}

.blog-link--primary {
  background: var(--blog-accent);
  color: var(--blog-accent-ink);
  box-shadow: 0 16px 38px oklch(72% 0.14 72 / 0.28);
  text-wrap: nowrap;
}

.blog-link--primary:hover {
  box-shadow: 0 20px 46px oklch(72% 0.14 72 / 0.36);
}

.blog-link--secondary {
  border-color: oklch(100% 0 0 / 0.3);
  background: oklch(100% 0 0 / 0.1);
  color: #ffffff;
}

.blog-link--secondary:hover {
  border-color: oklch(100% 0 0 / 0.42);
  background: oklch(100% 0 0 / 0.16);
  color: #ffffff;
}

.blog-section {
  padding-block: clamp(4rem, 7vw, 6.5rem);
}

.blog-section--filters,
.blog-section--featured,
.blog-section--grid {
  padding-block-end: 2rem;
}

.blog-section--featured,
.blog-section--grid {
  padding-block-start: 2rem;
}

.blog-section__header {
  display: grid;
  gap: 0.7rem;
  max-width: 54rem;
  margin-block-end: clamp(1.5rem, 3vw, 2.5rem);
}

.blog-section__header h2,
.featured-article h2,
.blog-final-cta h2 {
  color: var(--blog-ink);
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 1.12;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.blog-section__header p,
.featured-article p,
.article-card p,
.blog-empty p,
.blog-final-cta p {
  max-width: 68ch;
  color: var(--blog-muted);
  line-height: 1.85;
  text-wrap: pretty;
}

.category-filter__button {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 3rem;
  border: 1px solid var(--blog-line);
  border-radius: 999px;
  padding: 0.65rem 0.9rem;
  background: #ffffff;
  color: var(--blog-command);
  cursor: pointer;
  font: inherit;
  font-weight: 800;
  transition: background 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms var(--reveal-easing);
}

.category-filter__button small {
  min-width: 1.8rem;
  border-radius: 999px;
  padding: 0.1rem 0.45rem;
  background: var(--blog-soft);
  color: var(--blog-command);
  font-size: 0.78rem;
  text-align: center;
}

.category-filter__button:hover,
.category-filter__button--active {
  border-color: var(--blog-teal);
  background: var(--blog-command);
  color: #ffffff;
  transform: translateY(-1px);
}

.category-filter__button:hover small,
.category-filter__button--active small {
  background: oklch(100% 0 0 / 0.16);
  color: #ffffff;
}

.featured-article {
  display: grid;
  gap: 1.1rem;
  border: 1px solid color-mix(in oklch, var(--blog-accent) 26%, var(--blog-line));
  border-radius: 2rem;
  padding: clamp(1.4rem, 4vw, 3rem);
  background:
    radial-gradient(circle at 8% 8%, oklch(72% 0.14 72 / 0.16), transparent 18rem),
    #ffffff;
  box-shadow: 0 20px 60px oklch(25% 0.055 210 / 0.1);
}

.article-meta {
  color: var(--blog-muted);
  font-size: 0.92rem;
  font-weight: 800;
}

.article-meta span,
.article-meta time {
  border-radius: 999px;
  padding: 0.32rem 0.7rem;
  background: var(--blog-soft);
  color: var(--blog-command);
}

.featured-article__takeaways {
  display: grid;
  gap: 0.6rem;
  margin-block: 0.2rem 0.5rem;
}

.featured-article__takeaways li {
  position: relative;
  padding-inline-start: 1.35rem;
  color: oklch(29% 0.04 220);
  line-height: 1.75;
  font-weight: 700;
}

.featured-article__takeaways li::before {
  content: '';
  position: absolute;
  inset-block-start: 0.8rem;
  inset-inline-start: 0;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: var(--blog-accent);
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.article-card {
  display: grid;
  min-height: 22rem;
  align-content: start;
  gap: 0.95rem;
  border: 1px solid var(--blog-line);
  border-radius: 1.5rem;
  padding: 1.25rem;
  background: #ffffff;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 10px 32px oklch(25% 0.055 210 / 0.07);
  transition: transform 220ms var(--reveal-easing), box-shadow 220ms ease, border-color 220ms ease;
}

.article-card:focus-visible {
  border-color: var(--blog-teal);
}

.article-card:hover {
  border-color: color-mix(in oklch, var(--blog-teal) 45%, var(--blog-line));
  box-shadow: 0 18px 46px oklch(25% 0.055 210 / 0.12);
  transform: translateY(-4px);
}

.blog-link:active,
.category-filter__button:active,
.article-card:active {
  transform: translateY(0);
}

.article-card h3 {
  color: var(--blog-ink);
  font-size: clamp(1.25rem, 2vw, 1.65rem);
  line-height: 1.28;
  text-wrap: balance;
}

.article-card__date {
  color: var(--blog-muted);
  font-size: 0.92rem;
  font-weight: 800;
}

.article-card__read {
  align-self: end;
  margin-block-start: auto;
  color: var(--blog-command);
  font-weight: 900;
}

.article-card__read::after {
  content: ' ←';
}

.blog-empty {
  display: grid;
  justify-items: center;
  gap: 1rem;
  max-width: 42rem;
  margin-inline: auto;
  border: 1px solid var(--blog-line);
  border-radius: 2rem;
  padding: 3rem 1.5rem;
  background: #ffffff;
  text-align: center;
}

.blog-empty button {
  cursor: pointer;
  font: inherit;
}

.blog-final-cta {
  padding-block: 2rem clamp(5rem, 8vw, 8rem);
}

.blog-final-cta__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  border-radius: 2rem;
  padding: clamp(1.5rem, 4vw, 3rem);
  background: var(--blog-command);
  color: #ffffff;
}

.blog-final-cta h2,
.blog-final-cta p {
  color: #ffffff;
}

.blog-final-cta p {
  color: oklch(100% 0 0 / 0.82);
}

@media (max-width: 64rem) {
  .blog-final-cta__content {
    display: grid;
    justify-items: start;
  }
}

@media (max-width: 42rem) {
  .blog-hero h1 {
    max-width: 100%;
    font-size: clamp(2.4rem, 12vw, 3.5rem);
    letter-spacing: -0.02em;
  }

  .blog-section__header h2,
  .featured-article h2,
  .blog-final-cta h2 {
    font-size: clamp(1.85rem, 9vw, 2.7rem);
  }

  .blog-link,
  .category-filter__button {
    width: 100%;
  }

  .category-filter__button {
    justify-content: space-between;
  }

  .article-card {
    min-height: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .blog-link:hover,
  .article-card:hover,
  .category-filter__button:hover,
  .category-filter__button--active {
    transform: none;
  }
}
</style>
