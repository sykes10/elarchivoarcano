<template>
  <div class="bg-papiro rounded-lg shadow-md p-6">
    <h3 class="font-cinzel text-xl text-arcano mb-4">Categorías</h3>

    <ul class="space-y-2">
      <li
        v-for="category in categories"
        :key="category.id"
        class="group"
      >
        <NuxtLink
          :to="`/categoria/${category.slug}`"
          class="flex items-center justify-between p-3 rounded-lg hover:bg-oro/20 transition-colors font-lora text-carbon"
        >
          <span class="group-hover:text-arcano transition-colors">
            {{ category.name }}
          </span>
          <span class="text-xs text-carbon/50 font-mono">
            {{ category.count || 0 }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})
</script>
