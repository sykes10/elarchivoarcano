<template>
  <div class="flex items-center shadow-md rounded-lg overflow-hidden">
    <input
      type="text"
      v-model="query"
      placeholder="Busca una descripción..."
      class="flex-1 p-3 bg-papiro border border-oro border-r-0 focus:outline-none focus:ring-2 focus:ring-arcano font-lora text-carbon"
      @keyup.enter="search"
    />
    <button
      @click="search"
      class="bg-arcano text-white px-6 py-3 hover:bg-oro hover:text-carbon transition-colors font-inter"
    >
      🔍 Buscar
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['search'])
const query = ref('')

const search = () => {
  emit('search', query.value)
}
</script>
