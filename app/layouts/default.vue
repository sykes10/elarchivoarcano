<template>
  <div class="min-h-screen flex flex-col bg-papiro">
    <NavBar />

    <main class="flex-1 container mx-auto px-6 py-8">
      <slot />
    </main>

    <FooterBar />
  </div>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue'
import FooterBar from '~/components/FooterBar.vue'
</script>
