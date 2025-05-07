<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-sm">
      <nav class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-xl font-bold text-blue-600">CareerGPT</NuxtLink>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-4">
              <NuxtLink
                v-for="link in navigationLinks"
                :key="link.to"
                :to="link.to"
                class="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {{ link.text }}
              </NuxtLink>
            </div>
            <div v-if="user" class="flex items-center space-x-3">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-blue-600 font-medium">{{ userInitials }}</span>
                </div>
                <span class="text-gray-700">{{ user.email }}</span>
              </div>
              <button
                @click="handleLogout"
                class="text-gray-600 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-grow">
      <NuxtPage />
    </main>

    <footer class="bg-white py-6 mt-auto">
      <div class="container mx-auto px-4 text-center text-gray-500">
        <p>&copy; 2025 CareerGPT. AI-powered career assistance.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth'

const user = useSupabaseUser()
const router = useRouter()
const { logout } = useAuth()

const navigationLinks = [
  { to: '/resume/list', text: 'My Resumes' },
  { to: '/resume/create', text: 'Create Resume' }
]

const userInitials = computed(() => {
  if (!user.value?.email) return ''
  return user.value.email.charAt(0).toUpperCase()
})

const handleLogout = async () => {
  try {
    await logout()
    await router.push('/auth')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - CareerGPT` : 'CareerGPT'
  }
})
</script>
