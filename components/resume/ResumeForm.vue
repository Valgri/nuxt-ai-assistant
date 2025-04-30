<template>
  <div class="max-w-2xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6">Resume Builder</h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label class="block text-sm font-medium mb-2">Title</label>
        <input
          v-model="form.title"
          type="text"
          class="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Work Experience</label>
        <div v-for="(exp, index) in form.experience" :key="index" class="space-y-4 mb-4 p-4 border rounded">
          <div>
            <label class="block text-sm">Company</label>
            <input
              v-model="exp.company"
              type="text"
              class="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label class="block text-sm">Position</label>
            <input
              v-model="exp.position"
              type="text"
              class="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label class="block text-sm">Description</label>
            <textarea
              v-model="exp.description"
              class="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
          <button
            @click="removeExperience(index)"
            type="button"
            class="text-red-600 text-sm"
          >
            Remove
          </button>
        </div>
        <button
          @click="addExperience"
          type="button"
          class="text-blue-600 text-sm"
        >
          + Add Experience
        </button>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Skills</label>
        <textarea
          v-model="form.skills"
          class="w-full p-2 border rounded"
          rows="3"
          placeholder="Enter your skills, separated by commas"
        ></textarea>
      </div>

      <div class="flex justify-between">
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Saving...' : 'Save Resume' }}
        </button>
        <button
          type="button"
          @click="analyze"
          class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          :disabled="!canAnalyze || isAnalyzing"
        >
          {{ isAnalyzing ? 'Analyzing...' : 'Analyze Resume' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useResumeStore } from '~/stores/resume'

const store = useResumeStore()

const form = ref({
  title: '',
  experience: [
    { company: '', position: '', description: '' }
  ],
  skills: ''
})

const isSubmitting = ref(false)
const isAnalyzing = computed(() => store.isAnalyzing)

const canAnalyze = computed(() => {
  return form.value.experience.some(exp => exp.company && exp.position) &&
         form.value.skills.length > 0
})

function addExperience() {
  form.value.experience.push({ company: '', position: '', description: '' })
}

function removeExperience(index: number) {
  form.value.experience.splice(index, 1)
}

async function handleSubmit() {
  isSubmitting.value = true
  try {
    await store.saveResume({
      title: form.value.title,
      experience: form.value.experience,
      skills: form.value.skills.split(',').map(s => s.trim())
    })
  } finally {
    isSubmitting.value = false
  }
}

async function analyze() {
  await store.analyzeResume()
}
</script>
