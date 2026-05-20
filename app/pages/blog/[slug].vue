<template>
  <div>
    <template v-if="article">
      <section class="blog-detail-hero section" aria-labelledby="blog-detail-heading">
        <AppContainer>
          <div class="blog-detail-hero__layout">
            <div class="blog-detail-hero__content reveal-up">
              <NuxtLink :to="localePath('/blog')" class="blog-detail__back-link">
                {{ locale === 'ar' ? 'العودة للمدوّنة' : 'Back to blog' }}
              </NuxtLink>

              <div class="blog-detail__meta">
                <time class="blog-detail__date">{{ formattedDate }}</time>
                <span v-if="article.tags?.length" class="blog-detail__tags">
                  <AppBadge v-for="tag in article.tags" :key="tag" variant="default">{{ tag }}</AppBadge>
                </span>
              </div>

              <h1 id="blog-detail-heading" class="blog-detail__title">{{ article.title }}</h1>
              <p v-if="article.excerpt" class="blog-detail__excerpt">{{ article.excerpt }}</p>
            </div>

            <div class="blog-detail-hero__visual reveal-scale" aria-hidden="true">
              <AppIcon3D :name="articleIcon" alt="" size="xl" variant="hero" />
            </div>
          </div>
        </AppContainer>
      </section>

      <section class="blog-detail section" aria-label="Article content">
        <AppContainer narrow>
          <div class="blog-detail__prose">
            <ContentRenderer :value="article" />
          </div>

          <div class="blog-detail__cta reveal-scale">
            <p class="blog-detail__cta-eyebrow">{{ locale === 'ar' ? 'حوّل المعرفة إلى تشغيل أفضل' : 'Turn insight into better operations' }}</p>
            <h2>{{ locale === 'ar' ? 'شاهد كيف يساعدك تراكورا في تطبيق هذه الأفكار.' : 'See how Trackora helps put these ideas into practice.' }}</h2>
            <AppButton variant="primary" :to="localePath('/request-demo')">
              {{ locale === 'ar' ? 'اطلب عرضاً توضيحياً' : 'Request a demo' }}
            </AppButton>
          </div>
        </AppContainer>
      </section>
    </template>

    <template v-else>
      <section class="blog-detail section" aria-labelledby="blog-notfound-heading">
        <AppContainer narrow>
          <div class="blog-detail__notfound">
            <AppIcon3D name="public-tracking" alt="" size="xl" />
            <h2 id="blog-notfound-heading">{{ locale === 'ar' ? 'المقال غير موجود' : 'Article not found' }}</h2>
            <p>{{ locale === 'ar' ? 'لم نتمكن من العثور على المقال المطلوب.' : 'We could not find the requested article.' }}</p>
            <AppButton variant="primary" :to="localePath('/blog')">
              {{ locale === 'ar' ? 'العودة للمدوّنة' : 'Back to blog' }}
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
  const seoDescription =
    (article.value.seoDescription as string)
    || (article.value.description as string)
    || (article.value.excerpt as string)
    || (locale.value === 'ar'
      ? 'مقال من مدوّنة تراكورا حول إدارة الشحن والتوصيل والتحصيل.'
      : 'A Trackora blog article about shipment management, delivery, and COD collection.')
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

const articleIcon = computed(() => {
  const source = `${slug} ${article.value?.title || ''} ${((article.value?.tags as string[]) || []).join(' ')}`.toLowerCase()
  if (source.includes('cod') || source.includes('تحصيل') || source.includes('النقد')) return 'cod-wallet'
  if (source.includes('courier') || source.includes('مندوب') || source.includes('ساعي')) return 'courier-app'
  if (source.includes('fraud') || source.includes('احتيال') || source.includes('وهم')) return 'fraud-detection'
  if (source.includes('tracking') || source.includes('تتبع') || source.includes('تتب')) return 'public-tracking'
  return 'smart-dispatch'
})

useScrollReveal()
</script>

<style scoped>
.blog-detail-hero {
  overflow: hidden;
  background:
    radial-gradient(circle at 14% 12%, rgba(59, 89, 152, 0.16), transparent 32%),
    radial-gradient(circle at 86% 12%, rgba(255, 107, 107, 0.09), transparent 30%),
    linear-gradient(180deg, rgba(245, 245, 245, 0.9), rgba(255, 255, 255, 0));
}

.blog-detail-hero__layout {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(16rem, 0.55fr);
  gap: var(--spacing-16);
  align-items: center;
}

.blog-detail-hero__content {
  max-width: 54rem;
}

.blog-detail-hero__visual {
  display: grid;
  min-height: 22rem;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-4xl);
  background: var(--gradient-hero);
  box-shadow: var(--shadow-glow);
}

.blog-detail {
  padding-block-start: var(--spacing-20);
}

.blog-detail__back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-block-end: var(--spacing-8);
  border: 1px solid rgba(26, 59, 102, 0.1);
  border-radius: var(--radius-full);
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(255, 255, 255, 0.76);
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 800;
  box-shadow: var(--shadow-sm);
}

.blog-detail__back-link::before {
  content: '→';
}

html[lang='en'] .blog-detail__back-link::before {
  content: '←';
}

.blog-detail__back-link:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}

.blog-detail__meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  margin-block-end: var(--spacing-6);
  flex-wrap: wrap;
}

.blog-detail__date {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 800;
}

.blog-detail__tags {
  display: flex;
  gap: var(--spacing-2);
  flex-wrap: wrap;
}

.blog-detail__title {
  max-width: 15ch;
  font-size: clamp(2.5rem, 7vw, 5.25rem);
  margin-block-end: var(--spacing-6);
  line-height: 1.08;
  letter-spacing: -0.05em;
}

html[lang='ar'] .blog-detail__title {
  letter-spacing: -0.015em;
}

.blog-detail__excerpt {
  max-width: 46rem;
  color: var(--color-text-secondary);
  font-size: var(--text-xl);
  line-height: 1.9;
}

.blog-detail__prose {
  font-size: var(--text-lg);
  line-height: 2;
  color: var(--color-text);
}

.blog-detail__prose :deep(*) {
  overflow-wrap: break-word;
}

.blog-detail__prose :deep(h2) {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-block: var(--spacing-16) var(--spacing-5);
  letter-spacing: -0.025em;
}

.blog-detail__prose :deep(h3) {
  font-size: var(--text-2xl);
  margin-block: var(--spacing-12) var(--spacing-4);
}

.blog-detail__prose :deep(p) {
  margin-block-end: var(--spacing-6);
}

.blog-detail__prose :deep(ul),
.blog-detail__prose :deep(ol) {
  margin-block-end: var(--spacing-6);
  padding-inline-start: var(--spacing-6);
}

.blog-detail__prose :deep(li) {
  margin-block-end: var(--spacing-3);
  line-height: 1.9;
  padding-inline-start: var(--spacing-1);
}

.blog-detail__prose :deep(ul) {
  list-style: disc;
}

.blog-detail__prose :deep(ol) {
  list-style: decimal;
}

.blog-detail__prose :deep(a) {
  color: var(--color-primary);
  font-weight: 800;
  text-decoration: underline;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}

.blog-detail__prose :deep(a:hover) {
  color: var(--color-primary-light);
}

.blog-detail__prose :deep(strong) {
  font-weight: 800;
}

.blog-detail__prose :deep(blockquote) {
  margin-block: var(--spacing-10);
  border-inline-start: 4px solid var(--color-primary);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-6);
  background: rgba(59, 89, 152, 0.07);
  color: var(--color-text);
  font-weight: 700;
}

.blog-detail__prose :deep(hr) {
  border: 0;
  height: 1px;
  margin-block: var(--spacing-12);
  background: rgba(26, 59, 102, 0.1);
}

.blog-detail__cta {
  display: grid;
  gap: var(--spacing-5);
  justify-items: center;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-4xl);
  padding: var(--spacing-12);
  background: var(--gradient-hero);
  box-shadow: var(--shadow-glow);
  text-align: center;
  margin-block-start: var(--spacing-12);
}

.blog-detail__cta-eyebrow {
  color: rgba(255, 255, 255, 0.72);
  font-size: var(--text-sm);
  font-weight: 800;
}

.blog-detail__cta h2 {
  max-width: 14ch;
  color: var(--color-text-light);
  font-size: clamp(2rem, 5vw, 3.4rem);
}

.blog-detail__notfound {
  display: grid;
  justify-items: center;
  max-width: 42rem;
  margin-inline: auto;
  border: 1px solid rgba(26, 59, 102, 0.08);
  border-radius: var(--radius-4xl);
  text-align: center;
  padding: var(--spacing-12) var(--spacing-6);
  background: var(--glass-bg);
  box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.82);
}

.blog-detail__notfound h2 {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-block: var(--spacing-6) var(--spacing-3);
}

.blog-detail__notfound p {
  color: var(--color-text-secondary);
  margin-block-end: var(--spacing-8);
}

@media (max-width: 48rem) {
  .blog-detail-hero__layout {
    grid-template-columns: 1fr;
  }

  .blog-detail-hero__visual {
    min-height: 16rem;
  }

  .blog-detail__title {
    font-size: var(--text-4xl);
  }

  .blog-detail__cta {
    padding: var(--spacing-8) var(--spacing-5);
  }
}
</style>
