<template>
  <div>
    <section class="blog-index section" aria-labelledby="blog-heading">
      <AppContainer>
        <AppSectionHeader
          :eyebrow="locale === 'ar' ? 'المدوّنة' : 'Blog'"
          :title="t('blog.heading')"
          :description="t('blog.subtitle')"
        />

        <div v-if="articles && articles.length" class="blog-index__grid">
          <BlogArticleCard
            v-for="article in articles"
            :key="article.path"
            :title="article.title || ''"
            :excerpt="article.excerpt || ''"
            :date="article.date || ''"
            :tags="article.tags || []"
            :to="articlePath(article)"
          />
        </div>

        <div v-else class="blog-index__empty">
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
.blog-index__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: var(--spacing-8);
}

.blog-index__empty {
  text-align: center;
  padding: var(--spacing-16) var(--spacing-6);
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
}
</style>