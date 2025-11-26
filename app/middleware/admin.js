export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $supabase } = useNuxtApp()

  const { data: { user } } = await $supabase.auth.getUser()

  if (!user) {
    return navigateTo('/login')
  }

  const isAdmin = user?.user_metadata?.role === 'admin' || user?.app_metadata?.role === 'admin'

  if (!isAdmin) {
    return navigateTo('/')
  }
})
