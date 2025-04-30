<template>
  <div class="max-w-2xl mx-auto p-6">
    <div v-if="isAnalyzing" class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Analyzing your resume...</p>
    </div>

    <div v-else-if="recommendations.length > 0">
      <h3 class="text-xl font-bold mb-4">AI Recommendations</h3>

      <div class="space-y-6">
        <!-- Resume Improvements -->
        <div v-if="resumeImprovements.length" class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-semibold text-blue-800 mb-2">Resume Improvements</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li v-for="(item, index) in resumeImprovements" :key="index" class="text-blue-700">
              {{ item.content }}
            </li>
          </ul>
        </div>

        <!-- Career Path Suggestions -->
        <div v-if="careerPaths.length" class="bg-green-50 p-4 rounded-lg">
          <h4 class="font-semibold text-green-800 mb-2">Career Path Suggestions</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li v-for="(item, index) in careerPaths" :key="index" class="text-green-700">
              {{ item.content }}
            </li>
          </ul>
        </div>

        <!-- Learning Recommendations -->
        <div v-if="learningPaths.length" class="bg-purple-50 p-4 rounded-lg">
          <h4 class="font-semibold text-purple-800 mb-2">Learning Recommendations</h4>
          <ul class="list-disc pl-5 space-y-2">
            <li v-for="(item, index) in learningPaths" :key="index" class="text-purple-700">
              {{ item.content }}
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-6">
        <button
          @click="exportPDF"
          class="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          :disabled="isExporting"
        >
          {{ isExporting ? 'Generating PDF...' : 'Export as PDF' }}
        </button>
      </div>
    </div>

    <div v-else-if="error" class="bg-red-50 p-4 rounded">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <div v-else class="text-center text-gray-500">
      <p>No analysis available yet. Click "Analyze Resume" to get recommendations.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useResumeStore } from '~/stores/resume'
import { usePdfExport } from '~/composables/pdf/usePdfExport'

const store = useResumeStore()
const pdfExport = usePdfExport()
const isExporting = ref(false)

const isAnalyzing = computed(() => store.isAnalyzing)
const error = computed(() => store.error)
const recommendations = computed(() => store.recommendations)

const resumeImprovements = computed(() =>
  recommendations.value.filter(rec => rec.type === 'resume_improvement')
)

const careerPaths = computed(() =>
  recommendations.value.filter(rec => rec.type === 'career_path')
)

const learningPaths = computed(() =>
  recommendations.value.filter(rec => rec.type === 'learning')
)

async function exportPDF() {
  if (!store.currentResume) {
    console.error('No resume data available')
    return
  }

  isExporting.value = true
  try {
    const pdfBytes = await pdfExport.exportRecommendations(
      store.currentResume,
      recommendations.value
    )

    // Create blob and download
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${store.currentResume.title}-analysis.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error generating PDF:', error)
  } finally {
    isExporting.value = false
  }
}
</script>
