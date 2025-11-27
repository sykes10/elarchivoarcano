<template>
  <div class="bg-papiro flex flex-col">
    <div class="flex-1 flex items-center justify-center pt-10 px-4">
      <div class="rounded-lg shadow-2xl p-8 w-full max-w-md border-2 border-oro">
        <div class="text-center mb-6">
          <h1 class="text-4xl font-bold mb-2 font-cinzel text-arcano">
            Iniciar sesión
          </h1>
          <p class="text-gray-600 font-lora">
            Accede a tu cuenta
          </p>
        </div>

        <form class="space-y-4" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-900 mb-2 font-inter">
              Correo electrónico
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 border-2 border-gris rounded-lg focus:outline-none focus:ring-2 bg-white text-gray-900 font-lora"
              placeholder="tu@email.com"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-900 mb-2 font-inter">
              Contraseña
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 border-2 border-gris rounded-lg focus:outline-none focus:ring-2 bg-white text-gray-900 font-lora"
              placeholder="••••••••"
            >
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-lora">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full text-white py-3 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-arcano hover:bg-oro font-inter"
          >
            {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
          </button>
        </form>

        <div class="mt-4 text-center">
          <p class="text-sm text-gray-600 font-lora">
            ¿No tienes cuenta?
            <NuxtLink to="/register" class="font-medium text-oro">
              Regístrate aquí
            </NuxtLink>
          </p>
        </div>
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
