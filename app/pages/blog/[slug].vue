<template>
  <div>
    <template v-if="article">
      <section class="blog-detail section" aria-labelledby="blog-detail-heading">
        <AppContainer narrow>
          <div class="blog-detail__meta">
            <time class="blog-detail__date">{{ formattedDate }}</time>
            <span v-if="article.tags?.length" class="blog-detail__tags">
              <AppBadge v-for="tag in article.tags" :key="tag" variant="default">{{ tag }}</AppBadge>
            </span>
          </div>

          <h1 id="blog-detail-heading" class="blog-detail__title">{{ article.title }}</h1>

          <div class="blog-detail__prose">
            <ContentRenderer :value="article" />
          </div>

          <div class="blog-detail__back">
            <AppButton variant="outline" :to="localePath('/blog')">
              ← {{ locale === 'ar' ? 'العودة للمدوّنة' : 'Back to blog' }}
            </AppButton>
          </div>
        </AppContainer>
      </section>
    </template>

    <template v-else>
      <section class="blog-detail section" aria-labelledby="blog-notfound-heading">
        <AppContainer narrow>
          <div class="blog-detail__notfound">
            <h2 id="blog-notfound-heading">{{ locale === 'ar' ? 'المقال غير موجود' : 'Article not found' }}</h2>
            <p>{{ locale === 'ar' ? 'لم نتمكن من العثور على المقال المطلوب.' : 'We could not find the requested article.' }}</p>
            <AppButton variant="primary" :to="localePath('/blog')">
              ← {{ locale === 'ar' ? 'العودة للمدوّنة' : 'Back to blog' }}
            </AppButton>
          </div>
        </AppContainer>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const { setSeo } = useLocaleSeo()

const slug = route.params.slug as string
const contentLocale = locale.value

const { data: article } = await useAsyncData(
  `blog-${contentLocale}-${slug}`,
  () => queryCollection('content')
    .path(`/${contentLocale}/blog/${slug}`)
    .first(),
)

if (article.value) {
  const seoTitle = (article.value.seoTitle as string) || (article.value.title as string) || 'Blog'
  const seoDescription = (article.value.seoDescription as string) || (article.value.excerpt as string) || ''
  setSeo(seoTitle, seoDescription)
} else {
  setSeo(
    locale.value === 'ar' ? 'المقال غير موجود | تراكورا' : 'Article Not Found | Trackora',
    locale.value === 'ar' ? 'لم نتمكن من العثور على المقال المطلوب.' : 'We could not find the requested article.',
  )
}

const formattedDate = computed(() => {
  if (!article.value?.date) return ''
  try {
    const d = new Date(article.value.date as string)
    return d.toLocaleDateString(locale.value === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return String(article.value.date)
  }
})
</script>

<style scoped>
.blog-detail__meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  margin-block-end: var(--spacing-4);
  flex-wrap: wrap;
}

.blog-detail__date {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.blog-detail__tags {
  display: flex;
  gap: var(--spacing-2);
  flex-wrap: wrap;
}

.blog-detail__title {
  font-size: var(--text-4xl);
  font-weight: 800;
  margin-block-end: var(--spacing-8);
  line-height: 1.3;
}

.blog-detail__prose {
  font-size: var(--text-base);
  line-height: 1.8;
  color: var(--color-text);
}

.blog-detail__prose :deep(h2) {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-block: var(--spacing-10) var(--spacing-4);
}

.blog-detail__prose :deep(h3) {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-block: var(--spacing-8) var(--spacing-3);
}

.blog-detail__prose :deep(p) {
  margin-block-end: var(--spacing-4);
}

.blog-detail__prose :deep(ul),
.blog-detail__prose :deep(ol) {
  margin-block-end: var(--spacing-4);
  padding-inline-start: var(--spacing-6);
}

.blog-detail__prose :deep(li) {
  margin-block-end: var(--spacing-2);
  line-height: 1.7;
}

.blog-detail__prose :deep(ul) {
  list-style: disc;
}

.blog-detail__prose :deep(ol) {
  list-style: decimal;
}

.blog-detail__prose :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}

.blog-detail__prose :deep(a:hover) {
  color: var(--color-primary-light);
}

.blog-detail__prose :deep(strong) {
  font-weight: 700;
}

.blog-detail__back {
  margin-block-start: var(--spacing-12);
}

.blog-detail__notfound {
  text-align: center;
  padding: var(--spacing-16) var(--spacing-6);
}

.blog-detail__notfound h2 {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-block-end: var(--spacing-3);
}

.blog-detail__notfound p {
  color: var(--color-text-secondary);
  margin-block-end: var(--spacing-8);
}

@media (max-width: 48rem) {
  .blog-detail__title {
    font-size: var(--text-3xl);
  }
}
</style>