<template>
  <div>
    <header class="text-center mb-12">
      <h1 class="font-cinzel text-5xl text-arcano mb-4">El Archivo Arcano</h1>
      <p class="font-lora text-xl text-carbon/70 mb-8">Narración lista para jugar.</p>

      <SearchBar @search="handleSearch" class="max-w-2xl mx-auto" />
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside class="lg:col-span-1">
        <CategoryList :categories="categories" />
      </aside>

      <section class="lg:col-span-3">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="font-cinzel text-2xl text-arcano">
            Descripciones recientes
          </h2>
          <span class="font-mono text-sm text-carbon/50">
            {{ descriptions.length }} descripciones
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <CardDescription
            v-for="desc in descriptions"
            :key="desc.id"
            :title="desc.title"
            :preview="desc.content_short || desc.content"
            :tags="desc.tags"
            @view="viewDescription(desc.id)"
          />
        </div>

        <div v-if="descriptions.length === 0" class="text-center py-16">
          <p class="font-lora text-lg text-carbon/50">
            No hay descripciones disponibles aún.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useDescriptions } from '~/composables/useDescriptions'
import { useCategories } from '~/composables/useCategories'

const { descriptions, fetchDescriptions } = useDescriptions()
const { categories, fetchCategories } = useCategories()

onMounted(async () => {
  await fetchDescriptions()
  await fetchCategories()
})

const handleSearch = (query) => {
  if (query) {
    navigateTo(`/buscar?q=${encodeURIComponent(query)}`)
  }
}

const viewDescription = (id) => {
  navigateTo(`/descripcion/${id}`)
}
</script>
