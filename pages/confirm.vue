<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <template v-if="loading">
        <ULoader size="lg" />
        <h2 class="text-2xl font-bold mt-4">Confirming your login...</h2>
      </template>
      <template v-else-if="error">
        <div class="text-red-500 mb-4">
          <h2 class="text-2xl font-bold">Error</h2>
          <p>{{ error }}</p>
        </div>
        <NuxtLink to="/auth" color="primary">Back to Login</NuxtLink>
      </template>
      <template v-else>
        <div class="text-green-500 mb-4">
          <h2 class="text-2xl font-bold">Email Confirmed!</h2>
          <p>You can now log in to your account.</p>
        </div>
        <NuxtLink to="/auth" color="primary">Continue to Login</NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth';

const { error, loading } = useAuth()

definePageMeta({
  auth: false
})
</script>
