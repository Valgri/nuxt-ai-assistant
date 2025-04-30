import { PrismaClient } from '@prisma/client'
import { H3Event } from 'h3'
import { ResumeData } from '~/types/resume'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  const method = event.method

  switch (method) {
    case 'POST':
      return handleSaveResume(event)
    case 'GET':
      return handleGetResumes(event)
    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method not allowed'
      })
  }
})

async function handleSaveResume(event: H3Event) {
  const body = await readBody(event) as ResumeData

  try {
    // For now, we're not handling user authentication
    // In a real app, we'd get the userId from the session
    const userId = 'demo-user'

    const resume = await prisma.resume.create({
      data: {
        title: body.title,
        content: body,
        userId,
      }
    })

    return resume
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
}

async function handleGetResumes(event: H3Event) {
  try {
    // For now, we're not handling user authentication
    const userId = 'demo-user'

    const resumes = await prisma.resume.findMany({
      where: {
        userId
      },
      include: {
        recommendations: true
      }
    })

    return resumes
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
}
