<template>
  <div>
    <header class="mb-8">
      <h1 class="font-cinzel text-4xl text-arcano mb-6">Explorar descripciones</h1>

      <SearchBar @search="handleSearch" class="max-w-2xl" />
    </header>

    <div v-if="searchQuery" class="mb-6">
      <p class="font-lora text-carbon/70">
        Resultados para: <span class="font-semibold text-arcano">"{{ searchQuery }}"</span>
        <span class="text-sm text-carbon/50 ml-2">({{ filteredDescriptions.length }} encontradas)</span>
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <CardDescription
        v-for="desc in displayedDescriptions"
        :key="desc.id"
        :title="desc.title"
        :preview="desc.content_short || desc.content"
        :tags="desc.tags"
        @view="viewDescription(desc.id)"
      />
    </div>

    <div v-if="displayedDescriptions.length === 0 && !searchQuery" class="text-center py-16">
      <p class="font-lora text-lg text-carbon/50">
        Usa el buscador para encontrar descripciones.
      </p>
    </div>

    <div v-if="displayedDescriptions.length === 0 && searchQuery" class="text-center py-16">
      <p class="font-lora text-lg text-carbon/50">
        No se encontraron resultados para tu búsqueda.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useDescriptions } from '~/composables/useDescriptions'

const route = useRoute()
const { descriptions, fetchDescriptions } = useDescriptions()

const searchQuery = ref('')

const filteredDescriptions = computed(() => {
  if (!searchQuery.value) return descriptions.value

  const query = searchQuery.value.toLowerCase()
  return descriptions.value.filter(desc => {
    const titleMatch = desc.title?.toLowerCase().includes(query)
    const contentMatch = desc.content?.toLowerCase().includes(query) ||
                        desc.content_short?.toLowerCase().includes(query) ||
                        desc.content_long?.toLowerCase().includes(query)
    const tagMatch = desc.tags?.some(tag => tag.toLowerCase().includes(query))
    const categoryMatch = desc.category?.toLowerCase().includes(query)

    return titleMatch || contentMatch || tagMatch || categoryMatch
  })
})

const displayedDescriptions = computed(() => filteredDescriptions.value)

onMounted(async () => {
  await fetchDescriptions()

  if (route.query.q) {
    searchQuery.value = route.query.q
  }
})

const handleSearch = (query) => {
  searchQuery.value = query
  navigateTo(`/buscar?q=${encodeURIComponent(query)}`)
}

const viewDescription = (id) => {
  navigateTo(`/descripcion/${id}`)
}
</script>
