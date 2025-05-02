import type { User } from '@supabase/supabase-js'
import { useSupabase } from '~/composables/auth/useSupabase' // Adjust the path as needed
import { useRouter } from 'vue-router'

export const useAuth = () => {
  const { supabase } = useSupabase()
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const router = useRouter()

  const handleAuthStateChange = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    user.value = session?.user ?? null
  }

  const login = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (authError) throw authError
      if (data?.user) {
        user.value = data.user
        await router.push('/')
      }
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const signup = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password
      })
      if (authError) throw authError
      if (data?.user?.identities?.length === 0) {
        throw new Error('This email is already registered')
      }
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) {
      error.value = signOutError.message
      throw signOutError
    }
    user.value = null
    await router.push('/auth')
  }

  // Initialize auth state
  onMounted(() => {
    handleAuthStateChange()
    supabase.auth.onAuthStateChange(() => {
      handleAuthStateChange()
    })
  })

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout
  }
}
