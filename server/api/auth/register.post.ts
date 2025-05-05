import { PrismaClient } from '@prisma/client'
import { serverSupabaseServiceRole } from '#supabase/server'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password, name } = body

  try {
    const supabase = serverSupabaseServiceRole(event)
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (authError) {
      throw createError({
        statusCode: 400,
        statusMessage: authError.message
      })
    }

    // Create user in Prisma database
    const user = await prisma.user.create({
      data: {
        id: authData.user.id,
        email: authData.user.email!,
        name
      }
    })

    return { user }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})
