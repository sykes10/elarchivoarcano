<template>
  <div class="bg-papiro border border-oro rounded-lg p-6 shadow-md hover:shadow-oro transition-shadow cursor-pointer">
    <h3 class="font-cinzel text-2xl text-arcano mb-3">{{ title }}</h3>
    <p class="font-lora text-carbon/80 text-sm leading-relaxed mb-4">{{ preview }}</p>

    <div class="flex gap-2 flex-wrap mb-4" v-if="tags && tags.length > 0">
      <span
        v-for="tag in tags"
        :key="tag"
        class="text-xs font-mono bg-oro/20 text-arcano px-2 py-1 rounded"
      >
        #{{ tag }}
      </span>
    </div>

    <button
      @click="$emit('view')"
      class="bg-arcano text-white px-4 py-2 rounded-lg hover:bg-oro hover:text-carbon transition-colors font-inter text-sm"
    >
      Ver descripción
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    default: () => []
  }
})

defineEmits(['view'])
</script>
