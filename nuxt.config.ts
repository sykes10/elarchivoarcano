import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['./app/assets/css/main.css'],
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
