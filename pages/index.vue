<template>
  <div class="container mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to CareerGPT</h1>
      <p class="text-xl text-gray-600">Your AI-powered career assistant for resume analysis and career guidance</p>
    </div>

    <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col"
      >
        <div :class="['text-3xl mb-4 transform group-hover:scale-110 transition-transform', feature.iconColor]">
          {{ feature.icon }}
        </div>
        <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
        <p class="text-gray-600 mb-4">{{ feature.description }}</p>
        <NuxtLink
          :to="feature.link.to"
          :class="['inline-flex items-center group-hover:translate-x-1 transition-transform mt-auto', feature.link.color]"
        >
          {{ feature.link.text }}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </NuxtLink>
      </div>
    </div>

    <div class="mt-16 bg-gray-50 py-12 rounded-2xl">
      <h2 class="text-2xl font-bold mb-8 text-center">How It Works</h2>
      <div class="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        <div
          v-for="(step, index) in steps"
          :key="step.title"
          class="relative group"
        >
          <div class="bg-white p-6 rounded-xl shadow-md group-hover:shadow-lg transition-shadow text-center">
            <div :class="['text-3xl mb-4 transform group-hover:scale-110 transition-transform', step.color]">
              {{ `${index + 1}️⃣` }}
            </div>
            <p class="text-gray-800 font-medium">{{ step.title }}</p>
            <p class="text-sm text-gray-600 mt-2">{{ step.description }}</p>
          </div>
          <div
            v-if="index < steps.length - 1"
            class="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 text-gray-400"
          >
            →
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 text-center">
      <NuxtLink
        to="/resume/create"
        class="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group"
      >
        Get Started
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    icon: '📝',
    iconColor: 'text-blue-600',
    title: 'Resume Analysis',
    description: 'Get AI-powered suggestions to improve your resume and highlight your strengths',
    link: {
      to: '/resume/create',
      text: 'Build Your Resume',
      color: 'text-blue-600 hover:text-blue-700'
    }
  },
  {
    icon: '🎯',
    iconColor: 'text-green-600',
    title: 'Career Paths',
    description: 'Discover potential career paths based on your experience and skills',
    link: {
      to: '/resume',
      text: 'Explore Opportunities',
      color: 'text-green-600 hover:text-green-700'
    }
  },
  {
    icon: '📚',
    iconColor: 'text-purple-600',
    title: 'Learning Resources',
    description: 'Get personalized recommendations for skills development and courses',
    link: {
      to: '/resume',
      text: 'Start Learning',
      color: 'text-purple-600 hover:text-purple-700'
    }
  }
]

const steps = [
  {
    title: 'Create Your Resume',
    description: 'Build or upload your professional resume',
    color: 'text-blue-600'
  },
  {
    title: 'AI Analysis',
    description: 'Our AI analyzes your experience',
    color: 'text-green-600'
  },
  {
    title: 'Get Insights',
    description: 'Receive personalized recommendations',
    color: 'text-purple-600'
  },
  {
    title: 'Take Action',
    description: 'Export and implement improvements',
    color: 'text-indigo-600'
  }
]

useHead({
  title: 'Home'
})
</script>
