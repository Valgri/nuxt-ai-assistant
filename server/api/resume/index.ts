import { PrismaClient } from '@prisma/client'
import { H3Event } from 'h3'
import { ResumeData } from '~/types/resume'
import { serverSupabaseUser } from '#supabase/server'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const method = event.method

  switch (method) {
    case 'POST':
      return handleSaveResume(event, user.id)
    case 'GET':
      return handleGetResumes(event, user.id)
    default:
      throw createError({
        statusCode: 405,
        statusMessage: 'Method not allowed'
      })
  }
})

async function handleSaveResume(event: H3Event, userId: string) {
  const body = await readBody(event) as ResumeData

  try {
    // Check if user exists in Prisma DB
    let user = await prisma.user.findUnique({
      where: { id: userId }
    })

    // If user doesn't exist in Prisma DB, create them
    if (!user) {
      const supabaseUser = await serverSupabaseUser(event)
      user = await prisma.user.create({
        data: {
          id: userId,
          email: supabaseUser!.email!,
          name: supabaseUser!.user_metadata?.name
        }
      })
    }

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

async function handleGetResumes(event: H3Event, userId: string) {
  try {
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
