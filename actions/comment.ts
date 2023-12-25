'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

import {
  createComment as createCommentSchema,
  deleteComment as deleteCommentSchema,
} from '@/lib/schemas'
import { getUserId } from '@/lib/user-service'
import prisma from '@/lib/prisma'

export const createComment = async (values: z.infer<typeof createCommentSchema>) => {
  const userId = await getUserId()

  const validatedFields = createCommentSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create comment',
    }
  }

  const { postId, body } = validatedFields.data

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!post) {
    throw new Error('Post not found')
  }

  try {
    await prisma.comment.create({
      data: {
        body,
        postId,
        userId,
      },
    })

    revalidatePath('/dashboard')

    return { message: 'Created comment successfully' }
  } catch (error) {
    return { message: 'Error. Failed to create comment' }
  }
}

export const deleteComment = async (formData: FormData) => {
  const userId = await getUserId()

  const { id } = deleteCommentSchema.parse({
    id: formData.get('id'),
  })

  const comment = await prisma.comment.findUnique({
    where: {
      id,
      userId,
    },
  })

  if (!comment) {
    throw new Error('Comment not found')
  }

  try {
    await prisma.comment.delete({
      where: {
        id,
      },
    })

    revalidatePath('/dashboard')

    return { message: 'Deleted comment successfully' }
  } catch (error) {
    return { message: 'Error. Failed to delete comment' }
  }
}
