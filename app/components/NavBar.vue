<template>
  <nav class="bg-carbon text-white shadow-lg">
    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3">
        <div class="text-3xl">📖</div>
        <div>
          <h1 class="font-cinzel text-2xl text-oro">El Archivo Arcano</h1>
          <p class="text-gris text-xs font-lora">Narración lista para jugar</p>
        </div>
      </NuxtLink>

      <div class="flex items-center gap-6">
        <NuxtLink
          to="/"
          class="font-inter text-sm hover:text-oro transition-colors"
        >
          Inicio
        </NuxtLink>
        <NuxtLink
          to="/buscar"
          class="font-inter text-sm hover:text-oro transition-colors"
        >
          Explorar
        </NuxtLink>

        <NuxtLink
          v-if="isAdmin"
          to="/admin"
          class="font-inter text-sm hover:text-oro transition-colors"
        >
          Admin
        </NuxtLink>

        <div v-if="user" class="flex items-center gap-4">
          <span class="font-lora text-sm text-gris">
            {{ user.user_metadata?.name || user.email }}
          </span>
          <button
            @click="handleSignOut"
            class="font-inter text-sm bg-oro text-carbon px-4 py-2 rounded hover:bg-oro/80 transition-colors"
          >
            Salir
          </button>
        </div>

        <div v-else class="flex items-center gap-4">
          <NuxtLink
            to="/login"
            class="font-inter text-sm hover:text-oro transition-colors"
          >
            Iniciar sesión
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="font-inter text-sm bg-oro text-carbon px-4 py-2 rounded hover:bg-oro/80 transition-colors"
          >
            Registrarse
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

const { user, isAdmin, signOut, fetchUser } = useAuth()

onMounted(async () => {
  await fetchUser()
})

const handleSignOut = async () => {
  await signOut()
}
</script>
