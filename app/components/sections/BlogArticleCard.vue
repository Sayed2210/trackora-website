<template>
  <NuxtLink :to="to" class="blog-card">
    <div class="blog-card__visual" aria-hidden="true">
      <AppIcon3D :name="iconName" alt="" size="lg" />
    </div>
    <div class="blog-card__body">
      <div class="blog-card__meta">
        <time class="blog-card__date">{{ formattedDate }}</time>
        <span v-if="tags.length" class="blog-card__tags">
          <AppBadge v-for="tag in displayTags" :key="tag" variant="default" class="blog-card__tag">{{ tag }}</AppBadge>
        </span>
      </div>
      <h3 class="blog-card__title">{{ title }}</h3>
      <p class="blog-card__excerpt">{{ excerpt }}</p>
    </div>
    <span class="blog-card__link">{{ locale === 'ar' ? 'اقرأ المزيد' : 'Read more' }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  excerpt: string
  date: string
  tags?: string[]
  to: string
}>()

const { locale } = useI18n()

const displayTags = computed(() => (props.tags || []).slice(0, 3))

const iconName = computed(() => {
  const source = `${props.to} ${props.title} ${(props.tags || []).join(' ')}`.toLowerCase()
  if (source.includes('cod') || source.includes('تحصيل') || source.includes('النقد')) return 'cod-wallet'
  if (source.includes('courier') || source.includes('مندوب') || source.includes('ساعي')) return 'courier-app'
  if (source.includes('fraud') || source.includes('احتيال') || source.includes('وهم')) return 'fraud-detection'
  if (source.includes('tracking') || source.includes('تتبع') || source.includes('تتب')) return 'public-tracking'
  return 'smart-dispatch'
})

const formattedDate = computed(() => {
  try {
    const d = new Date(props.date)
    return d.toLocaleDateString(locale.value === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return props.date
  }
})
</script>

<style scoped>
.blog-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 30rem;
  background:
    radial-gradient(circle at 16% 0%, rgba(45, 110, 125, 0.08), transparent 34%),
    var(--color-surface);
  border: 1px solid rgba(27, 77, 92, 0.08);
  border-radius: var(--radius-4xl);
  padding: var(--spacing-8);
  text-decoration: none;
  color: inherit;
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: transform 0.3s var(--reveal-easing), box-shadow 0.3s ease, border-color 0.3s ease;
}

.blog-card::before {
  content: '';
  position: absolute;
  width: 14rem;
  height: 14rem;
  inset-block-start: -7rem;
  inset-inline-end: -6rem;
  border-radius: 50%;
  background: rgba(45, 110, 125, 0.08);
  pointer-events: none;
}

.blog-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(27, 77, 92, 0.16);
}

.blog-card:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}

.blog-card__visual,
.blog-card__body,
.blog-card__link {
  position: relative;
  z-index: 1;
}

.blog-card__visual {
  display: flex;
  justify-content: flex-start;
  margin-block-end: var(--spacing-8);
}

.blog-card__body {
  flex-grow: 1;
}

.blog-card__meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  margin-block-end: var(--spacing-5);
  flex-wrap: wrap;
}

.blog-card__date {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 800;
}

.blog-card__tags {
  display: flex;
  gap: var(--spacing-2);
  flex-wrap: wrap;
}

.blog-card__tag {
  font-size: var(--text-xs);
}

.blog-card__title {
  font-size: clamp(1.35rem, 2.4vw, 1.8rem);
  margin-block-end: var(--spacing-4);
  line-height: 1.35;
  letter-spacing: -0.02em;
}

.blog-card__excerpt {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.85;
  margin-block-end: var(--spacing-8);
}

.blog-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 800;
  color: var(--color-primary);
  margin-block-start: auto;
}

.blog-card__link::after {
  content: '←';
}

html[lang='en'] .blog-card__link::after {
  content: '→';
}

@media (max-width: 36rem) {
  .blog-card {
    min-height: auto;
    padding: var(--spacing-6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .blog-card:hover {
    transform: none;
  }
}
</style>
