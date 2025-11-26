<template>
  <div>
    <div class="mb-6">
      <button
        @click="goBack"
        class="font-inter text-sm text-carbon/70 hover:text-arcano transition-colors flex items-center gap-2"
      >
        ← Volver
      </button>
    </div>

    <header class="mb-8">
      <h1 class="font-cinzel text-4xl text-arcano mb-2">{{ categoryName }}</h1>
      <p class="font-lora text-carbon/70">
        {{ filteredDescriptions.length }} descripciones en esta categoría
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <CardDescription
        v-for="desc in filteredDescriptions"
        :key="desc.id"
        :title="desc.title"
        :preview="desc.content_short || desc.content"
        :tags="desc.tags"
        @view="viewDescription(desc.id)"
      />
    </div>

    <div v-if="filteredDescriptions.length === 0" class="text-center py-16">
      <p class="font-lora text-lg text-carbon/50">
        No hay descripciones en esta categoría.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useDescriptions } from '~/composables/useDescriptions'

const route = useRoute()
const router = useRouter()
const { descriptions, fetchDescriptions } = useDescriptions()

const categorySlug = computed(() => route.params.slug)
const categoryName = computed(() => {
  return categorySlug.value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

const filteredDescriptions = computed(() => {
  return descriptions.value.filter(desc => {
    if (!desc.category) return false
    const descSlug = desc.category.toLowerCase().replace(/\s+/g, '-')
    return descSlug === categorySlug.value
  })
})

onMounted(async () => {
  await fetchDescriptions()
})

const viewDescription = (id) => {
  navigateTo(`/descripcion/${id}`)
}

const goBack = () => {
  router.back()
}
</script>
