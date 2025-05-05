<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold text-center mb-8">CareerGPT Resume Assistant</h1>

    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-white shadow rounded-lg">
        <ResumeForm />
      </div>

      <div class="bg-white shadow rounded-lg">
        <ResumeAnalyzer />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ResumeForm from '~/components/resume/ResumeForm.vue'
import ResumeAnalyzer from '@/components/resume/ResumeAnalyzer.vue'
</script>
