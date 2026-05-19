<template>
  <div>
    <section class="blog-hero section" aria-labelledby="blog-heading">
      <AppContainer>
        <div class="blog-hero__layout">
          <div class="blog-hero__content reveal-up">
            <p class="blog-hero__eyebrow">{{ locale === 'ar' ? 'مركز معرفة لوجستي' : 'Logistics knowledge hub' }}</p>
            <h1 id="blog-heading" class="blog-hero__title">{{ t('blog.heading') }}</h1>
            <p class="blog-hero__text">{{ t('blog.subtitle') }}</p>
          </div>

          <div class="blog-hero__visual reveal-scale" aria-hidden="true">
            <div class="blog-hero__orb blog-hero__orb--one"></div>
            <div class="blog-hero__orb blog-hero__orb--two"></div>
            <AppIcon3D name="smart-dispatch" alt="" size="xl" variant="hero" />
            <div class="blog-hero__note blog-hero__note--top">{{ locale === 'ar' ? 'تشغيل' : 'Operations' }}</div>
            <div class="blog-hero__note blog-hero__note--bottom">{{ locale === 'ar' ? 'تحصيل وحماية' : 'COD & safety' }}</div>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="blog-index section" aria-label="Blog articles">
      <AppContainer>
        <div v-if="articles && articles.length" class="blog-index__grid">
          <BlogArticleCard
            v-for="article in articles"
            :key="article.path"
            class="reveal-stagger"
            :title="article.title || ''"
            :excerpt="article.excerpt || ''"
            :date="article.date || ''"
            :tags="article.tags || []"
            :to="articlePath(article)"
          />
        </div>

        <div v-else class="blog-index__empty">
          <AppIcon3D name="public-tracking" alt="" size="xl" />
          <h2>{{ locale === 'ar' ? 'المكتبة قيد التجهيز' : 'The library is being prepared' }}</h2>
          <p>{{ locale === 'ar' ? 'لا توجد مقالات حالياً.' : 'No articles available yet.' }}</p>
        </div>
      </AppContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { setSeo } = useLocaleSeo()

useScrollReveal()

setSeo(
  locale.value === 'ar' ? 'المدوّنة | تراكورا' : 'Blog | Trackora',
  locale.value === 'ar'
    ? 'أفكار ونصائح حول إدارة الشحن والتوصيل والتحصيل.'
    : 'Ideas and tips on shipment management, delivery, and COD collection.'
)

const contentLocale = locale.value

const { data: articles } = await useAsyncData(
  `blog-list-${contentLocale}`,
  () => queryCollection('content')
    .where('path', 'LIKE', `/${contentLocale}/blog/%`)
    .order('date', 'DESC')
    .all(),
)

function articlePath(article: { path?: string }) {
  if (!article.path) return '/'
  const slug = article.path.replace(`/${contentLocale}/blog/`, '')
  return localePath(`/blog/${slug}`)
}
</script>

<style scoped>
.blog-hero {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 14% 12%, rgba(59, 89, 152, 0.16), transparent 32%),
    radial-gradient(circle at 86% 14%, rgba(255, 107, 107, 0.09), transparent 30%),
    linear-gradient(180deg, rgba(245, 245, 245, 0.9), rgba(255, 255, 255, 0));
}

.blog-hero__layout {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(20rem, 0.95fr);
  gap: var(--spacing-16);
  align-items: center;
}

.blog-hero__eyebrow {
  display: inline-flex;
  margin-block-end: var(--spacing-4);
  border: 1px solid rgba(26, 59, 102, 0.1);
  border-radius: var(--radius-full);
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(255, 255, 255, 0.76);
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 800;
  box-shadow: var(--shadow-sm);
}

.blog-hero__title {
  max-width: 12ch;
  font-size: var(--text-6xl);
  letter-spacing: -0.04em;
  margin-block-end: var(--spacing-6);
}

html[lang='ar'] .blog-hero__title {
  letter-spacing: -0.015em;
}

.blog-hero__text {
  max-width: 42rem;
  color: var(--color-text-secondary);
  font-size: var(--text-xl);
  line-height: 1.85;
}

.blog-hero__visual {
  position: relative;
  display: grid;
  min-height: 27rem;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-4xl);
  background: var(--gradient-hero);
  box-shadow: var(--shadow-glow);
  overflow: hidden;
}

.blog-hero__orb {
  position: absolute;
  border-radius: 50%;
  opacity: 0.7;
}

.blog-hero__orb--one {
  width: 14rem;
  height: 14rem;
  inset-block-start: -4rem;
  inset-inline-end: -4rem;
  background: rgba(255, 255, 255, 0.16);
}

.blog-hero__orb--two {
  width: 12rem;
  height: 12rem;
  inset-block-end: -4rem;
  inset-inline-start: -3rem;
  background: rgba(255, 107, 107, 0.14);
}

.blog-hero__note {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-3) var(--spacing-4);
  background: rgba(255, 255, 255, 0.12);
  color: var(--color-text-light);
  font-size: var(--text-sm);
  font-weight: 800;
  backdrop-filter: blur(16px);
}

.blog-hero__note--top {
  inset-block-start: var(--spacing-8);
  inset-inline-end: var(--spacing-8);
}

.blog-hero__note--bottom {
  inset-block-end: var(--spacing-8);
  inset-inline-start: var(--spacing-8);
}

.blog-index {
  padding-block-start: 0;
}

.blog-index__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-8);
}

.blog-index__empty {
  display: grid;
  place-items: center;
  max-width: 42rem;
  margin-inline: auto;
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-4xl);
  text-align: center;
  padding: var(--spacing-12) var(--spacing-6);
  background: var(--glass-bg);
  box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.82);
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
}

.blog-index__empty h2 {
  margin-block: var(--spacing-6) var(--spacing-3);
  color: var(--color-text);
}

@media (max-width: 64rem) {
  .blog-hero__layout,
  .blog-index__grid {
    grid-template-columns: 1fr;
  }

  .blog-hero__visual {
    min-height: 22rem;
  }
}

@media (max-width: 36rem) {
  .blog-hero__title {
    font-size: var(--text-4xl);
  }

  .blog-hero__visual {
    min-height: 17rem;
  }

  .blog-hero__note {
    position: static;
    margin: var(--spacing-2);
  }
}
</style>
