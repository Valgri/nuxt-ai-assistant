import OpenAI from 'openai'
import type { ResumeData } from '~/types/resume'

export class AIServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly userMessage: string
  ) {
    super(message)
    this.name = 'AIServiceError'
  }
}

export function useAIService() {
  const config = useRuntimeConfig()
  const openai = new OpenAI({
    apiKey: config.openaiApiKey,
  })

  async function analyzeResume(resumeData: ResumeData) {
    try {
      const prompt = `Analyze this resume and provide recommendations in three categories:
      1. Resume improvements (specific phrases and content improvements)
      2. Career path suggestions based on experience and skills
      3. Learning recommendations to enhance career prospects

      Resume:
      Title: ${resumeData.title}

      Experience:
      ${resumeData.experience.map(exp => `
      Company: ${exp.company}
      Position: ${exp.position}
      Description: ${exp.description}
      `).join('\n')}

      Skills: ${resumeData.skills}
      `

      const response = await openai.chat.completions.create({
        model: config.openaiModel,
        messages: [
          {
            role: 'system',
            content: 'You are a professional career advisor and resume expert. Provide specific, actionable recommendations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })

      const content = response.choices[0].message.content
      if (!content) throw new Error('No recommendations generated')

      // Parse the response into structured recommendations
      const sections = content.split('\n\n')
      const recommendations = []

      for (const section of sections) {
        if (section.toLowerCase().includes('resume improvement')) {
          recommendations.push({
            type: 'resume_improvement',
            content: section.replace(/resume improvements?:/i, '').trim()
          })
        } else if (section.toLowerCase().includes('career path')) {
          recommendations.push({
            type: 'career_path',
            content: section.replace(/career path suggestions?:/i, '').trim()
          })
        } else if (section.toLowerCase().includes('learning')) {
          recommendations.push({
            type: 'learning',
            content: section.replace(/learning recommendations?:/i, '').trim()
          })
        }
      }

      return recommendations
    } catch (error: any) {
      if (error?.status === 429) {
        throw new AIServiceError(
          'OpenAI API rate limit exceeded',
          'RATE_LIMIT_EXCEEDED',
          'You have exceeded the AI service quota. Please try again later or contact support for assistance.'
        )
      } else if (error?.status === 500) {
        throw new AIServiceError(
          'OpenAI API server error',
          'SERVER_ERROR',
          'The AI service is currently experiencing issues. Please try again later.'
        )
      } else {
        throw new AIServiceError(
          error.message || 'Unknown error occurred',
          'UNKNOWN_ERROR',
          'An unexpected error occurred. Please try again later.'
        )
      }
    }
  }

  return {
    analyzeResume
  }
}
