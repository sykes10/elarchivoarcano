<template>
  <div class="min-h-[70vh] flex items-center justify-center">
    <div class="bg-papiro border-2 border-oro rounded-lg shadow-xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="font-cinzel text-3xl text-arcano mb-2">Crear cuenta</h1>
        <p class="font-lora text-carbon/70">Únete a El Archivo Arcano</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="name" class="block font-inter text-sm font-medium text-carbon mb-2">
            Nombre
          </label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            class="w-full px-4 py-3 border border-gris rounded-lg focus:outline-none focus:ring-2 focus:ring-oro focus:border-transparent font-lora"
            placeholder="Tu nombre"
          >
        </div>

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
            minlength="6"
            class="w-full px-4 py-3 border border-gris rounded-lg focus:outline-none focus:ring-2 focus:ring-oro focus:border-transparent font-lora"
            placeholder="Mínimo 6 caracteres"
          >
        </div>

        <div>
          <label for="confirmPassword" class="block font-inter text-sm font-medium text-carbon mb-2">
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="w-full px-4 py-3 border border-gris rounded-lg focus:outline-none focus:ring-2 focus:ring-oro focus:border-transparent font-lora"
            placeholder="Repite tu contraseña"
          >
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg font-lora text-sm">
          {{ error }}
        </div>

        <div v-if="success" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg font-lora text-sm">
          {{ success }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-arcano text-white py-3 rounded-lg hover:bg-oro hover:text-carbon transition-colors font-inter font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="font-lora text-sm text-carbon/70">
          ¿Ya tienes cuenta?
          <NuxtLink to="/login" class="text-oro hover:text-arcano font-medium">
            Inicia sesión aquí
          </NuxtLink>
        </p>
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
