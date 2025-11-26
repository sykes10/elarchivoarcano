<template>
  <div>
    <header class="mb-8">
      <h1 class="font-cinzel text-4xl text-arcano mb-2">Panel de administración</h1>
      <p class="font-lora text-carbon/70">
        Gestiona descripciones y categorías
      </p>
    </header>

    <div class="bg-oro/10 border border-oro rounded-lg p-6 mb-8">
      <p class="font-lora text-carbon">
        Esta sección estará disponible próximamente. Aquí podrás crear, editar y eliminar descripciones.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-papiro border border-oro rounded-lg p-6 shadow-md">
        <h3 class="font-cinzel text-xl text-arcano mb-3">Descripciones</h3>
        <p class="font-mono text-4xl text-oro mb-2">{{ descriptions.length }}</p>
        <p class="font-lora text-sm text-carbon/70">Total de descripciones</p>
      </div>

      <div class="bg-papiro border border-oro rounded-lg p-6 shadow-md">
        <h3 class="font-cinzel text-xl text-arcano mb-3">Categorías</h3>
        <p class="font-mono text-4xl text-oro mb-2">{{ categories.length }}</p>
        <p class="font-lora text-sm text-carbon/70">Total de categorías</p>
      </div>

      <div class="bg-papiro border border-oro rounded-lg p-6 shadow-md">
        <h3 class="font-cinzel text-xl text-arcano mb-3">Estado</h3>
        <p class="font-mono text-2xl text-arcano mb-2">✓ Activo</p>
        <p class="font-lora text-sm text-carbon/70">Sistema funcionando</p>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="font-cinzel text-2xl text-arcano mb-4">Acciones rápidas</h2>

      <div class="flex gap-4">
        <button
          class="bg-arcano text-white px-6 py-3 rounded-lg hover:bg-oro hover:text-carbon transition-colors font-inter"
          disabled
        >
          + Nueva descripción
        </button>

        <button
          class="bg-gris text-carbon px-6 py-3 rounded-lg hover:bg-gris-oscuro hover:text-white transition-colors font-inter"
          disabled
        >
          Gestionar categorías
        </button>
      </div>

      <p class="font-lora text-sm text-carbon/50 mt-4">
        Funcionalidad próximamente disponible
      </p>
    </div>
  </div>
</template>

<script setup>
import { useDescriptions } from '~/composables/useDescriptions'
import { useCategories } from '~/composables/useCategories'

definePageMeta({
  middleware: 'admin'
})

const { descriptions, fetchDescriptions } = useDescriptions()
const { categories, fetchCategories } = useCategories()

onMounted(async () => {
  await fetchDescriptions()
  await fetchCategories()
})
</script>
