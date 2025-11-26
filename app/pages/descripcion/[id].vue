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

    <DescriptionViewer
      v-if="description"
      :description="description"
      @close="goBack"
    />

    <div v-else class="text-center py-16">
      <p class="font-lora text-lg text-carbon/50">
        Cargando descripción...
      </p>
    </div>
  </div>
</template>

<script setup>
import { useDescriptions } from '~/composables/useDescriptions'

const route = useRoute()
const router = useRouter()
const { descriptions, fetchDescriptions } = useDescriptions()

const description = ref(null)

onMounted(async () => {
  await fetchDescriptions()
  const id = route.params.id
  description.value = descriptions.value.find(d => d.id === id)

  if (!description.value) {
    console.error('Descripción no encontrada')
  }
})

const goBack = () => {
  router.back()
}
</script>
