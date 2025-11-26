export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const user = useState('user', () => null)
  const loading = useState('auth-loading', () => true)

  const fetchUser = async () => {
    loading.value = true
    try {
      const { data: { user: currentUser } } = await $supabase.auth.getUser()
      user.value = currentUser
    } catch (error) {
      console.error('Error fetching user:', error)
      user.value = null
    } finally {
      loading.value = false
    }
  }

  const signUp = async (email, password, metadata = {}) => {
    loading.value = true
    try {
      const { data, error } = await $supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      })

      if (error) throw error

      user.value = data.user
      return { data, error: null }
    } catch (error) {
      console.error('Error signing up:', error)
      return { data: null, error }
    } finally {
      loading.value = false
    }
  }

  const signIn = async (email, password) => {
    loading.value = true
    try {
      const { data, error } = await $supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      user.value = data.user
      return { data, error: null }
    } catch (error) {
      console.error('Error signing in:', error)
      return { data: null, error }
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    loading.value = true
    try {
      const { error } = await $supabase.auth.signOut()
      if (error) throw error

      user.value = null
      navigateTo('/')
      return { error: null }
    } catch (error) {
      console.error('Error signing out:', error)
      return { error }
    } finally {
      loading.value = false
    }
  }

  const isAdmin = computed(() => {
    return user.value?.user_metadata?.role === 'admin' || user.value?.app_metadata?.role === 'admin'
  })

  return {
    user,
    loading,
    isAdmin,
    fetchUser,
    signUp,
    signIn,
    signOut
  }
}
