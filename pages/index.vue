<template>
  <div class="container mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to CareerGPT</h1>
      <p class="text-xl text-gray-600">Your AI-powered career assistant for resume analysis and career guidance</p>
    </div>

    <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="text-blue-600 text-2xl mb-4">📝</div>
        <h3 class="text-xl font-semibold mb-2">Resume Analysis</h3>
        <p class="text-gray-600 mb-4">Get AI-powered suggestions to improve your resume and highlight your strengths</p>
        <NuxtLink to="/resume" class="text-blue-600 hover:text-blue-700">
          Build Your Resume →
        </NuxtLink>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="text-green-600 text-2xl mb-4">🎯</div>
        <h3 class="text-xl font-semibold mb-2">Career Paths</h3>
        <p class="text-gray-600 mb-4">Discover potential career paths based on your experience and skills</p>
        <NuxtLink to="/resume" class="text-blue-600 hover:text-blue-700">
          Explore Opportunities →
        </NuxtLink>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="text-purple-600 text-2xl mb-4">📚</div>
        <h3 class="text-xl font-semibold mb-2">Learning Resources</h3>
        <p class="text-gray-600 mb-4">Get personalized recommendations for skills development and courses</p>
        <NuxtLink to="/resume" class="text-blue-600 hover:text-blue-700">
          Start Learning →
        </NuxtLink>
      </div>
    </div>

    <div class="mt-16 text-center">
      <h2 class="text-2xl font-bold mb-4">How It Works</h2>
      <div class="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
        <div class="p-4">
          <div class="text-2xl mb-2">1️⃣</div>
          <p>Create or upload your resume</p>
        </div>
        <div class="p-4">
          <div class="text-2xl mb-2">2️⃣</div>
          <p>AI analyzes your experience</p>
        </div>
        <div class="p-4">
          <div class="text-2xl mb-2">3️⃣</div>
          <p>Get personalized recommendations</p>
        </div>
        <div class="p-4">
          <div class="text-2xl mb-2">4️⃣</div>
          <p>Export enhanced resume</p>
        </div>
      </div>
    </div>

    <div class="mt-12 text-center">
      <NuxtLink
        to="/resume"
        class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Get Started
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Home'
})
</script>
