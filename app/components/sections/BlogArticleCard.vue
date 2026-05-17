<template>
  <NuxtLink :to="to" class="blog-card">
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
    <span class="blog-card__link">{{ locale === 'ar' ? 'اقرأ المزيد ←' : 'Read more →' }}</span>
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
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-8);
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.blog-card:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-light);
}

.blog-card__body {
  flex-grow: 1;
}

.blog-card__meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  margin-block-end: var(--spacing-3);
  flex-wrap: wrap;
}

.blog-card__date {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
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
  font-size: var(--text-xl);
  font-weight: 700;
  margin-block-end: var(--spacing-3);
  line-height: 1.4;
}

.blog-card__excerpt {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-block-end: var(--spacing-4);
}

.blog-card__link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  margin-block-start: auto;
}
</style>