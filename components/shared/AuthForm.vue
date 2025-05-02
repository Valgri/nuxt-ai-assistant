<template>
  <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">{{ isLogin ? 'Login' : 'Sign Up' }}</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <UInput
          v-model="email"
          type="email"
          required
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <UInput
          v-model="password"
          type="password"
          required
          placeholder="Enter your password"
        />
      </div>
      <UButton
        type="submit"
        :loading="loading"
        :disabled="loading"
        block
        color="primary"
      >
        {{ loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up' }}
      </UButton>
      <UButton
        type="button"
        @click="isLogin = !isLogin"
        block
        variant="ghost"
        color="gray"
      >
        {{ isLogin ? 'Need an account? Sign up' : 'Already have an account? Login' }}
      </UButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth';

const { login, signup, loading } = useAuth();

const email = ref('')
const password = ref('')
const isLogin = ref(true)

const toast = useNuxtApp().$toast as { add: (options: { title: string; description: string; color: string }) => void };

const handleSubmit = async () => {
  try {
    if (isLogin.value) {
      await login(email.value, password.value)
      toast.add({
        title: 'Success!',
        description: 'You have been successfully logged in',
        color: 'green'
      })
    } else {
      await signup(email.value, password.value)
      toast.add({
        title: 'Welcome!',
        description: 'Registration successful. Please check your email to confirm your account.',
        color: 'green'
      })
    }
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message || 'An error occurred during authentication',
      color: 'red'
    })
  }
}
</script>
