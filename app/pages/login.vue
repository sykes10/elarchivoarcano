<template>
  <div class="min-h-[70vh] flex items-center justify-center">
    <div class="bg-papiro border-2 border-oro rounded-lg shadow-xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="font-cinzel text-3xl text-arcano mb-2">Iniciar sesión</h1>
        <p class="font-lora text-carbon/70">Accede a tu cuenta</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block font-inter text-sm font-medium text-carbon mb-2">
            Correo electrónico
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gris rounded-lg focus:outline-none focus:ring-2 focus:ring-oro focus:border-transparent font-lora"
            placeholder="tu@email.com"
          >
        </div>

        <div>
          <label for="password" class="block font-inter text-sm font-medium text-carbon mb-2">
            Contraseña
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gris rounded-lg focus:outline-none focus:ring-2 focus:ring-oro focus:border-transparent font-lora"
            placeholder="••••••••"
          >
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg font-lora text-sm">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-arcano text-white py-3 rounded-lg hover:bg-oro hover:text-carbon transition-colors font-inter font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="font-lora text-sm text-carbon/70">
          ¿No tienes cuenta?
          <NuxtLink to="/register" class="text-oro hover:text-arcano font-medium">
            Regístrate aquí
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

const { signIn, loading } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Por favor completa todos los campos'
    return
  }

  const { data, error: signInError } = await signIn(email.value, password.value)

  if (signInError) {
    error.value = signInError.message || 'Error al iniciar sesión. Verifica tus credenciales.'
  } else if (data) {
    navigateTo('/')
  }
}
</script>
