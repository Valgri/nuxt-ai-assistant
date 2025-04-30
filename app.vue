<template>
  <div>
    <header class="bg-white shadow-sm">
      <nav class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-xl font-bold text-blue-600">CareerGPT</NuxtLink>
          <div class="space-x-4">
            <NuxtLink
              to="/resume"
              class="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Resume Builder
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <NuxtPage />
    </main>

    <footer class="bg-white mt-12 py-6">
      <div class="container mx-auto px-4 text-center text-gray-500">
        <p>&copy; 2025 CareerGPT. AI-powered career assistance.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - CareerGPT` : 'CareerGPT'
  }
})
</script>
