<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <NuxtLink to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
            create a new account
          </NuxtLink>
        </p>
      </div>

      <div class="bg-white p-8 shadow rounded-lg">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <UFormGroup label="Email address" name="email">
              <UInput
                v-model="email"
                type="email"
                required
                placeholder="Enter your email"
                autocomplete="email"
              />
            </UFormGroup>
          </div>

          <div>
            <UFormGroup label="Password" name="password">
              <UInput
                v-model="password"
                type="password"
                required
                placeholder="Enter your password"
                autocomplete="current-password"
              />
            </UFormGroup>
          </div>

          <UButton
            type="submit"
            block
            :loading="loading"
            :disabled="loading || !email || !password"
          >
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </UButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth'

const { login, loading } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await login(email.value, password.value)
    const toast = useNuxtApp().$toast as { add: (options: { title: string; description: string; color: string }) => void }
    toast.add({
      title: 'Welcome back!',
      description: 'Successfully signed in',
      color: 'green'
    })
    await router.push('/')
  } catch (error) {
    const toast = useNuxtApp().$toast as { add: (options: { title: string; description: string; color: string }) => void }
    toast.add({
      title: 'Sign in Failed',
      description: error.message,
      color: 'red'
    })
  }
}

definePageMeta({
  auth: false
})
</script>
