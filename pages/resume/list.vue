<template>
  <div class="container mx-auto py-8 px-4">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">My Resumes</h1>
      <NuxtLink
        to="/resume/create"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Create New Resume
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading your resumes...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 p-4 rounded-lg">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="resumes.length === 0" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-xl font-medium text-gray-900 mb-2">No resumes yet</h3>
      <p class="text-gray-600 mb-4">Create your first resume to get started</p>
      <NuxtLink
        to="/resume/create"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Create Resume
      </NuxtLink>
    </div>

    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="resume in resumes"
        :key="resume.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-900">{{ resume.title }}</h3>
            <p class="text-sm text-gray-500">Created {{ formatDate(resume.createdAt) }}</p>
          </div>
          <div class="flex space-x-2">
            <button
              @click="editResume(resume)"
              class="text-gray-600 hover:text-blue-600 transition-colors"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              @click="deleteResume(resume.id)"
              class="text-gray-600 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-sm">
            <span class="font-medium text-gray-700">Experience:</span>
            <span class="text-gray-600">{{ resume.content.experience.length }} positions</span>
          </div>
          <div class="text-sm">
            <span class="font-medium text-gray-700">Skills:</span>
            <span class="text-gray-600">{{ formatSkills(resume.content.skills) }}</span>
          </div>
        </div>

        <div class="mt-4 flex space-x-2">
          <NuxtLink
            :to="`/resume/${resume.id}`"
            class="flex-1 inline-flex justify-center items-center px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            View Details
          </NuxtLink>
          <button
            @click="analyzeResume(resume)"
            class="flex-1 inline-flex justify-center items-center px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
          >
            Analyze
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResumeStore } from '~/stores/resume'

const store = useResumeStore()
const router = useRouter()

const loading = ref(true)
const error = ref<string | null>(null)
const resumes = ref<any[]>([])

onMounted(async () => {
  try {
    resumes.value = await store.loadResumes()
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}

function formatSkills(skills: string[]) {
  return skills.slice(0, 3).join(', ') + (skills.length > 3 ? ` +${skills.length - 3} more` : '')
}

function editResume(resume: any) {
  router.push(`/resume/edit/${resume.id}`)
}

async function deleteResume(id: string) {
  if (!confirm('Are you sure you want to delete this resume?')) return

  try {
    await store.deleteResume(id)
    resumes.value = resumes.value.filter(r => r.id !== id)
  } catch (e: any) {
    error.value = e.message
  }
}

async function analyzeResume(resume: any) {
  store.currentResume = resume
  await store.analyzeResume()
  router.push(`/resume/${resume.id}`)
}

definePageMeta({
  layout: 'default'
})
</script>
