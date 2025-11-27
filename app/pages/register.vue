<template>
  <div class="bg-papiro flex flex-col">
    <div class="flex-1 flex items-center justify-center px-4 pt-10">
      <div class="rounded-lg shadow-2xl p-8 w-full max-w-md border-2 border-oro">
        <div class="text-center mb-6">
          <h1 class="text-4xl font-bold mb-2 font-cinzel text-arcano">
            Crear cuenta
          </h1>
          <p class="text-gray-600 font-lora">
            Únete a El Archivo Arcano
          </p>
        </div>

        <form class="space-y-4" @submit.prevent="handleRegister">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-900 mb-2 font-inter">
              Nombre
            </label>
            <input
              id="name"
              v-model="name"
              type="text"
              required
              class="w-full px-4 py-3 border-2 border-gris rounded-lg focus:outline-none focus:ring-2 bg-white text-gray-900 font-lora"
              placeholder="Tu nombre"
            >
          </div>

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
              minlength="6"
              class="w-full px-4 py-3 border-2 border-gris rounded-lg focus:outline-none focus:ring-2 bg-white text-gray-900 font-lora"
              placeholder="Mínimo 6 caracteres"
            >
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-900 mb-2 font-inter">
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              class="w-full px-4 py-3 border-2 border-gris rounded-lg focus:outline-none focus:ring-2 bg-white text-gray-900 font-lora"
              placeholder="Repite tu contraseña"
            >
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-lora">
            {{ error }}
          </div>

          <div v-if="success" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm font-lora">
            {{ success }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full text-white py-3 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-arcano hover:bg-oro font-inter"
          >
            {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
          </button>
        </form>

        <div class="mt-4 text-center">
          <p class="text-sm text-gray-600 font-lora">
            ¿Ya tienes cuenta?
            <NuxtLink to="/login" class="font-medium text-oro">
              Inicia sesión aquí
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

const { signUp, loading } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')

const handleRegister = async () => {
  error.value = ''
  success.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Por favor completa todos los campos'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  const { data, error: signUpError } = await signUp(
    email.value,
    password.value,
    { name: name.value }
  )

  if (signUpError) {
    error.value = signUpError.message || 'Error al crear la cuenta. Intenta nuevamente.'
  } else if (data) {
    success.value = 'Cuenta creada exitosamente. Revisa tu correo para confirmar tu cuenta.'
    setTimeout(() => {
      navigateTo('/login')
    }, 2000)
  }
}
</script>
