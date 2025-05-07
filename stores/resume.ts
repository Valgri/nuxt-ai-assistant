import { defineStore } from 'pinia'
import type { ResumeData, Recommendation } from '~/types/resume'

interface StoredResume extends ResumeData {
  id: string
}

export const useResumeStore = defineStore('resume', {
  state: () => ({
    currentResume: null as StoredResume | null,
    recommendations: [] as Recommendation[],
    isAnalyzing: false,
    error: null as string | null,
  }),

  actions: {
    async saveResume(resumeData: ResumeData) {
      try {
        const response = await $fetch<StoredResume>('/api/resume', {
          method: 'POST',
          body: resumeData
        })
        this.currentResume = response
        this.error = null
        return response
      } catch (error: any) {
        this.error = error.message
        throw error
      }
    },

    async analyzeResume() {
      if (!this.currentResume) {
        throw new Error('No resume to analyze')
      }

      this.isAnalyzing = true
      this.error = null

      try {
        const recommendations = await $fetch<Recommendation[]>('/api/resume/analyze', {
          method: 'POST',
          body: {
            resumeId: this.currentResume.id
          }
        })
        this.recommendations = recommendations
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.isAnalyzing = false
      }
    },

    async loadResumes() {
      try {
        const resumes = await $fetch<StoredResume[]>('/api/resume')
        return resumes
      } catch (error: any) {
        this.error = error.message
        throw error
      }
    },

    async deleteResume(id: string) {
      try {
        await $fetch(`/api/resume/${id}`, {
          method: 'DELETE'
        })
        if (this.currentResume?.id === id) {
          this.currentResume = null
          this.recommendations = []
        }
      } catch (error: any) {
        this.error = error.message
        throw error
      }
    }
  },
})
