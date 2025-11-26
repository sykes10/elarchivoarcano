<template>
  <div class="bg-papiro rounded-lg shadow-lg p-8 border border-oro">
    <header class="mb-6 border-b border-oro/30 pb-4">
      <h1 class="font-cinzel text-4xl text-arcano mb-2">{{ description.title }}</h1>

      <div class="flex items-center gap-4 text-sm text-carbon/60 font-lora">
        <span v-if="description.category" class="flex items-center gap-1">
          📁 {{ description.category }}
        </span>
        <span v-if="description.created_at" class="flex items-center gap-1">
          📅 {{ formatDate(description.created_at) }}
        </span>
      </div>
    </header>

    <div class="mb-6" v-if="description.tags && description.tags.length > 0">
      <div class="flex gap-2 flex-wrap">
        <span
          v-for="tag in description.tags"
          :key="tag"
          class="text-xs font-mono bg-oro/20 text-arcano px-3 py-1 rounded"
        >
          #{{ tag }}
        </span>
      </div>
    </div>

    <section class="mb-8">
      <h3 class="font-cinzel text-lg text-arcano mb-3">Descripción corta</h3>
      <p class="font-lora text-base text-carbon leading-relaxed bg-white/50 p-4 rounded-lg">
        {{ description.content_short || description.content }}
      </p>
    </section>

    <section class="mb-8" v-if="description.content_long">
      <h3 class="font-cinzel text-lg text-arcano mb-3">Descripción completa</h3>
      <p class="font-lora text-base text-carbon leading-relaxed whitespace-pre-line bg-white/50 p-4 rounded-lg">
        {{ description.content_long }}
      </p>
    </section>

    <section class="mb-8" v-if="description.variants && description.variants.length > 0">
      <h3 class="font-cinzel text-lg text-arcano mb-3">Variantes</h3>
      <ul class="space-y-3">
        <li
          v-for="(variant, index) in description.variants"
          :key="index"
          class="font-lora text-sm text-carbon bg-white/50 p-4 rounded-lg border-l-4 border-oro"
        >
          {{ variant }}
        </li>
      </ul>
    </section>

    <footer class="flex gap-3 pt-6 border-t border-oro/30">
      <button
        @click="copyText(description.content_long || description.content || description.content_short)"
        class="bg-arcano text-white px-6 py-3 rounded-lg hover:bg-oro hover:text-carbon transition-colors font-inter text-sm shadow-arcano"
      >
        📋 Copiar descripción
      </button>

      <button
        @click="$emit('close')"
        class="bg-gris text-carbon px-6 py-3 rounded-lg hover:bg-gris-oscuro hover:text-white transition-colors font-inter text-sm"
      >
        Cerrar
      </button>
    </footer>
  </div>
</template>

<script setup>
defineProps({
  description: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      content: '',
      content_short: '',
      content_long: '',
      category: '',
      tags: [],
      variants: []
    })
  }
})

defineEmits(['close'])

const copyText = (text) => {
  if (navigator.clipboard && text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Descripción copiada al portapapeles')
    }).catch(err => {
      console.error('Error al copiar:', err)
    })
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
