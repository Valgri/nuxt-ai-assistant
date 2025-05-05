import type { User } from '@supabase/supabase-js'
import { useRouter } from 'vue-router'

const validateEmail = (email: string) => {
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Please enter a valid email address')
  }

  // Проверяем домен (можно настроить под ваши требования)
  const allowedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
  const domain = email.split('@')[1]
  if (!allowedDomains.includes(domain)) {
    throw new Error(`Email domain not allowed. Please use one of: ${allowedDomains.join(', ')}`)
  }
}

export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const router = useRouter()

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
    console.log('Starting signup process...', { email });

    try {
      loading.value = true;
      error.value = null;

      // Validate email first
      validateEmail(email);

      console.log('Calling Supabase auth.signUp...');
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm`
        }
      })

      console.log('Supabase response:', { data, error: authError });

      if (authError) {
        // Преобразуем ошибки Supabase в более понятные сообщения
        if (authError.message.includes('email_address_invalid')) {
          throw new Error('This email address is not allowed. Please use a different email.')
        }
        throw authError;
      }

      if (!data?.user || data.user.identities?.length === 0) {
        throw new Error('This email is already registered');
      }

      await router.push('/confirm')
      return data
    } catch (e: any) {
      console.error('Signup error:', e);
      error.value = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  const logout = async () => {
    try {
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError
      await router.push('/auth')
    } catch (e: any) {
      error.value = e.message
      throw e
    }
  }

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout
  }
}
