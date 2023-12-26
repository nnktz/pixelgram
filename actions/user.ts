'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

import { getUserId } from '@/lib/auth-service'
import { updateUser } from '@/lib/schemas'
import prisma from '@/lib/prisma'

export const updateProfile = async (values: z.infer<typeof updateUser>) => {
  const userId = await getUserId()

  const validateFields = updateUser.safeParse(values)

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to update profile',
    }
  }

  const { bio, gender, image, name, username, websiteUrl } = validateFields.data

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        name,
        image,
        bio,
        gender,
        websiteUrl,
      },
    })

    revalidatePath('/dashboard')

    return { message: 'Updated profile successfully' }
  } catch (error) {
    return { message: 'Error. Failed to update profile' }
  }
}
