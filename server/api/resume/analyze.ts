import { PrismaClient } from '@prisma/client'
import { H3Event } from 'h3'
import type { ResumeData, Recommendation } from '~/types/resume'
import { useAIService } from '~/composables/ai/useAIService'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const body = await readBody(event) as { resumeId: string }

  try {
    const resume = await prisma.resume.findUnique({
      where: {
        id: body.resumeId
      }
    })

    if (!resume) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Resume not found'
      })
    }

    const aiService = useAIService()
    const recommendations = await aiService.analyzeResume(resume.content as ResumeData)

    // Save recommendations to database
    await prisma.recommendation.createMany({
      data: recommendations.map((rec) => ({
        type: rec.type,
        content: JSON.stringify(rec.content), // Convert content to string for storage
        resumeId: resume.id
      }))
    })

    return recommendations
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})
