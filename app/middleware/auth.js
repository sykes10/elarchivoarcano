export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $supabase } = useNuxtApp()

  const { data: { user } } = await $supabase.auth.getUser()

  if (!user) {
    return navigateTo('/login')
  }
})
