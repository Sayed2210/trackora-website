<template>
  <main class="article-page" dir="rtl">
    <template v-if="article">
      <section class="article-hero" aria-labelledby="article-heading">
        <AppContainer wide>
          <div class="article-hero__layout">
            <div class="article-hero__content">
              <NuxtLink class="article-back" to="/blog">العودة إلى المدونة</NuxtLink>
              <div class="article-meta">
                <span>{{ article.category }}</span>
                <span>{{ article.readTime }}</span>
                <time :datetime="article.publishedAt">{{ formattedDate }}</time>
                <span>{{ article.author }}</span>
              </div>
              <h1 id="article-heading">{{ article.title }}</h1>
              <p>{{ article.summary }}</p>
            </div>

            <aside class="article-brief" aria-labelledby="brief-heading">
              <h2 id="brief-heading">قبل أن تبدأ</h2>
              <ul>
                <li v-for="takeaway in article.keyTakeaways" :key="takeaway">{{ takeaway }}</li>
              </ul>
            </aside>
          </div>
        </AppContainer>
      </section>

      <section class="article-shell" aria-label="محتوى المقال">
        <AppContainer wide>
          <div class="article-shell__layout">
            <aside v-if="article.body.length > 2" class="article-toc" aria-labelledby="toc-heading">
              <h2 id="toc-heading">داخل المقال</h2>
              <nav aria-label="فهرس المقال">
                <a v-for="section in article.body" :key="section.id" :href="`#${section.id}`">{{ section.title }}</a>
              </nav>
            </aside>

            <article class="article-prose">
              <section v-for="section in article.body" :id="section.id" :key="section.id" class="article-prose__section">
                <h2>{{ section.title }}</h2>
                <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
                <ul v-if="section.points?.length">
                  <li v-for="point in section.points" :key="point">{{ point }}</li>
                </ul>
              </section>
            </article>
          </div>
        </AppContainer>
      </section>

      <section class="related-section" aria-labelledby="related-heading">
        <AppContainer wide>
          <div class="related-section__header">
            <h2 id="related-heading">مقالات مرتبطة بالتشغيل اليومي</h2>
            <p>اقرأ أدلة أخرى تساعد فريقك على ربط الشحنات، المناديب، التحصيل، والتقارير في يوم عمل واحد.</p>
          </div>
          <div class="related-grid">
            <NuxtLink v-for="related in relatedArticles" :key="related.slug" class="related-card" :to="`/blog/${related.slug}`">
              <span>{{ related.category }}</span>
              <h3>{{ related.title }}</h3>
              <p>{{ related.excerpt }}</p>
            </NuxtLink>
          </div>
        </AppContainer>
      </section>

      <section class="article-cta" aria-labelledby="article-cta-heading">
        <AppContainer wide>
          <div class="article-cta__box">
            <div>
              <h2 id="article-cta-heading">طبّق هذا الدليل على عملية شحنك داخل Trackora</h2>
              <p>اعرض لنا طريقة توزيع الشحنات، إدارة المناديب، تحصيل COD، أو التسوية الحالية. سنوضح أين يمكن للنظام أن يقلل التأخير والمراجعات اليدوية.</p>
            </div>
            <NuxtLink class="article-link article-link--primary" to="/request-demo">اطلب عرضا على بيانات تشغيلك</NuxtLink>
          </div>
        </AppContainer>
      </section>
    </template>

    <template v-else>
      <section class="not-found" aria-labelledby="not-found-heading">
        <AppContainer narrow>
          <div class="not-found__box">
            <p>مقال غير متاح</p>
            <h1 id="not-found-heading">لم نجد هذا المقال في العيادة التشغيلية</h1>
            <span>قد يكون الرابط غير صحيح، أو أن المقال لم يعد ضمن مكتبة Trackora الحالية.</span>
            <NuxtLink class="article-link article-link--primary" to="/blog">العودة إلى كل المقالات</NuxtLink>
          </div>
        </AppContainer>
      </section>
    </template>
  </main>
</template>

<script setup lang="ts">
import { getBlogArticle, getRelatedArticles } from '~/data/blog'

const route = useRoute()
const { setSeo } = useLocaleSeo()

const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
const article = computed(() => getBlogArticle(String(slug || '')))
const relatedArticles = computed(() => article.value ? getRelatedArticles(article.value) : [])

if (article.value) {
  setSeo(article.value.seoTitle, article.value.seoDescription, `/blog/${article.value.slug}`)
} else {
  setSeo(
    'المقال غير موجود | مدونة Trackora',
    'لم نتمكن من العثور على مقال Trackora المطلوب. عد إلى المدونة لقراءة أدلة الشحن، COD، المناديب، والتتبع.',
    '/blog',
  )
}

const formattedDate = computed(() => {
  if (!article.value) return ''
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.value.publishedAt))
})
</script>

<style scoped>
.article-page {
  --article-ink: #0b1d33;
  --article-muted: #495b66;
  --article-line: rgba(26, 59, 102, 0.14);
  --article-command: #0f3340;
  --article-accent: #ff6b6b;
  color: var(--article-ink);
  background:
    radial-gradient(circle at 12% 4%, rgba(255, 107, 107, 0.08), transparent 22rem),
    linear-gradient(180deg, #ffffff 0%, #f7f9fa 52%, #ffffff 100%);
}

.article-hero {
  padding-block: clamp(4.8rem, 8vw, 8rem) clamp(3.5rem, 6vw, 5.5rem);
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 107, 107, 0.15), transparent 22rem),
    linear-gradient(145deg, #0a1d34 0%, #1a3b66 52%, #254c80 100%);
  color: #ffffff;
}

.article-hero__layout {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(18rem, 0.62fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: end;
}

.article-hero__content {
  display: grid;
  gap: 1.25rem;
}

.article-back,
.article-link {
  min-height: 3rem;
  display: inline-flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0.82rem 1.25rem;
  font-weight: 900;
  line-height: 1.35;
  text-decoration: none;
  transition: transform 220ms var(--reveal-easing), box-shadow 220ms ease, background 220ms ease, border-color 220ms ease;
}

.article-back {
  border-color: rgba(255, 255, 255, 0.26);
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.article-back::before {
  content: '→';
  margin-inline-end: 0.45rem;
}

.article-link--primary {
  background: var(--article-accent);
  color: #210f16;
  box-shadow: 0 16px 36px rgba(255, 107, 107, 0.28);
}

.article-back:hover,
.article-link:hover,
.related-card:hover {
  transform: translateY(-2px);
}

.article-back:focus-visible,
.article-link:focus-visible,
.article-toc a:focus-visible,
.related-card:focus-visible {
  outline: 3px solid var(--article-accent);
  outline-offset: 3px;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  align-items: center;
}

.article-meta span,
.article-meta time {
  border-radius: 999px;
  padding: 0.36rem 0.75rem;
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.84);
  font-size: 0.92rem;
  font-weight: 800;
}

.article-hero h1 {
  max-width: 14ch;
  color: #ffffff;
  font-size: clamp(2.55rem, 6.4vw, 5.2rem);
  line-height: 1.08;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.article-hero p {
  max-width: 68ch;
  color: rgba(255, 255, 255, 0.84);
  font-size: clamp(1.05rem, 1.4vw, 1.24rem);
  line-height: 1.95;
  text-wrap: pretty;
}

.article-brief {
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 1.8rem;
  padding: clamp(1.2rem, 3vw, 1.6rem);
  background: rgba(7, 20, 36, 0.56);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.22);
}

.article-brief h2 {
  color: #ffffff;
  font-size: 1.35rem;
  margin-block-end: 1rem;
}

.article-brief ul {
  display: grid;
  gap: 0.8rem;
}

.article-brief li {
  position: relative;
  padding-inline-start: 1.3rem;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.8;
}

.article-brief li::before,
.article-prose li::before {
  content: '';
  position: absolute;
  inset-block-start: 0.8rem;
  inset-inline-start: 0;
  width: 0.52rem;
  height: 0.52rem;
  border-radius: 999px;
  background: var(--article-accent);
}

.article-shell {
  padding-block: clamp(3.5rem, 6vw, 6rem);
}

.article-shell__layout {
  display: grid;
  grid-template-columns: minmax(12rem, 0.32fr) minmax(0, 0.78fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: start;
}

.article-toc {
  position: sticky;
  top: 6rem;
  border: 1px solid var(--article-line);
  border-radius: 1.4rem;
  padding: 1.1rem;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 14px 42px rgba(26, 59, 102, 0.08);
}

.article-toc h2 {
  color: var(--article-ink);
  font-size: 1.05rem;
  margin-block-end: 0.8rem;
}

.article-toc nav {
  display: grid;
  gap: 0.35rem;
}

.article-toc a {
  border-radius: 0.9rem;
  padding: 0.58rem 0.7rem;
  color: #315165;
  font-weight: 800;
  line-height: 1.55;
}

.article-toc a:hover {
  background: rgba(26, 59, 102, 0.07);
  color: #1a3b66;
}

.article-prose {
  max-width: 72ch;
  border: 1px solid var(--article-line);
  border-radius: 2rem;
  padding: clamp(1.35rem, 4vw, 3rem);
  background: #ffffff;
  box-shadow: 0 20px 68px rgba(26, 59, 102, 0.09);
}

.article-prose__section {
  scroll-margin-top: 6rem;
}

.article-prose__section + .article-prose__section {
  margin-block-start: clamp(2.5rem, 5vw, 4rem);
  padding-block-start: clamp(2rem, 4vw, 3rem);
  border-top: 1px solid rgba(26, 59, 102, 0.11);
}

.article-prose h2 {
  color: var(--article-ink);
  font-size: clamp(1.7rem, 3.2vw, 2.45rem);
  line-height: 1.22;
  letter-spacing: -0.018em;
  margin-block-end: 1rem;
  text-wrap: balance;
}

.article-prose p {
  color: #2f3f4c;
  font-size: 1.08rem;
  line-height: 2;
  margin-block-end: 1.1rem;
  text-wrap: pretty;
}

.article-prose ul {
  display: grid;
  gap: 0.75rem;
  margin-block-start: 1.2rem;
}

.article-prose li {
  position: relative;
  padding-inline-start: 1.45rem;
  color: #243848;
  font-weight: 750;
  line-height: 1.85;
}

.related-section {
  padding-block: clamp(2rem, 5vw, 5rem);
}

.related-section__header {
  display: grid;
  gap: 0.75rem;
  max-width: 55rem;
  margin-block-end: 1.6rem;
}

.related-section__header h2,
.article-cta h2,
.not-found h1 {
  color: var(--article-ink);
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.15;
  letter-spacing: -0.022em;
  text-wrap: balance;
}

.related-section__header p,
.related-card p,
.article-cta p,
.not-found span {
  color: var(--article-muted);
  line-height: 1.85;
  text-wrap: pretty;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.related-card {
  display: grid;
  gap: 0.85rem;
  min-height: 18rem;
  align-content: start;
  border: 1px solid var(--article-line);
  border-radius: 1.55rem;
  padding: 1.25rem;
  background: #ffffff;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 12px 38px rgba(26, 59, 102, 0.07);
  transition: transform 220ms var(--reveal-easing), box-shadow 220ms ease, border-color 220ms ease;
}

.related-card:hover {
  border-color: rgba(26, 59, 102, 0.24);
  box-shadow: 0 18px 52px rgba(26, 59, 102, 0.13);
}

.related-card span {
  width: fit-content;
  border-radius: 999px;
  padding: 0.32rem 0.7rem;
  background: rgba(26, 59, 102, 0.06);
  color: #315165;
  font-size: 0.9rem;
  font-weight: 800;
}

.related-card h3 {
  color: var(--article-ink);
  font-size: clamp(1.2rem, 2vw, 1.55rem);
  line-height: 1.35;
}

.article-cta {
  padding-block: 1rem clamp(5rem, 8vw, 8rem);
}

.article-cta__box {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  border-radius: 2rem;
  padding: clamp(1.5rem, 4vw, 3rem);
  background:
    radial-gradient(circle at 10% 10%, rgba(255, 107, 107, 0.12), transparent 18rem),
    #ffffff;
  border: 1px solid var(--article-line);
  box-shadow: 0 24px 76px rgba(26, 59, 102, 0.11);
}

.article-cta p {
  max-width: 65ch;
  margin-block-start: 0.8rem;
}

.not-found {
  min-height: 72vh;
  display: grid;
  align-items: center;
  padding-block: clamp(5rem, 10vw, 9rem);
}

.not-found__box {
  display: grid;
  justify-items: center;
  gap: 1rem;
  border: 1px solid var(--article-line);
  border-radius: 2rem;
  padding: clamp(1.5rem, 5vw, 3.5rem);
  background: #ffffff;
  text-align: center;
  box-shadow: 0 24px 76px rgba(26, 59, 102, 0.11);
}

.not-found p {
  width: fit-content;
  border-radius: 999px;
  padding: 0.38rem 0.8rem;
  background: rgba(255, 107, 107, 0.12);
  color: #7a2630;
  font-weight: 900;
}

@media (max-width: 68rem) {
  .article-hero__layout,
  .article-shell__layout,
  .article-cta__box {
    grid-template-columns: 1fr;
  }

  .article-cta__box {
    display: grid;
    justify-items: start;
  }

  .article-toc {
    position: static;
  }
}

@media (max-width: 42rem) {
  .article-hero h1 {
    font-size: clamp(2.2rem, 12vw, 3.3rem);
  }

  .article-link,
  .article-back {
    width: 100%;
  }

  .article-prose {
    border-radius: 1.45rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .article-back:hover,
  .article-link:hover,
  .related-card:hover {
    transform: none;
  }
}
</style>
