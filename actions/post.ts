'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import {
  bookmarkSchema,
  createPost as createPostSchema,
  updatePost as updatePostSchema,
  deletePost as deletePostSchema,
  likeSchema,
} from '@/lib/schemas'
import { getUserId } from '@/lib/auth-service'
import prisma from '@/lib/prisma'

export const createPost = async (values: z.infer<typeof createPostSchema>) => {
  const userId = await getUserId()

  const validatedFields = createPostSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing required fields',
    }
  }

  const { fileUrl, caption } = validatedFields.data

  try {
    await prisma.post.create({
      data: {
        caption,
        fileUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
  } catch (error) {
    return {
      message: 'Error. Failed to create post',
    }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export const deletePost = async (formData: FormData) => {
  const userId = await getUserId()

  const { id } = deletePostSchema.parse({
    id: formData.get('id'),
  })

  const post = await prisma.post.findUnique({
    where: {
      id,
      userId,
    },
  })

  if (!post) {
    throw new Error('Post not found')
  }

  try {
    await prisma.post.delete({
      where: {
        id,
      },
    })

    revalidatePath('/dashboard')

    return { message: 'Delete post successfully' }
  } catch (error) {
    return { message: 'Error. Failed to delete post' }
  }
}

export const likePost = async (value: FormDataEntryValue | null) => {
  const userId = await getUserId()

  const validatedFields = likeSchema.safeParse({ postId: value })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to like post',
    }
  }

  const { postId } = validatedFields.data

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!post) {
    throw new Error('Post not found')
  }

  const like = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  })

  if (like) {
    try {
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      })

      revalidatePath('/dashboard')

      return { message: 'Unliked post successfully' }
    } catch (error) {
      return { message: 'Error. Failed to unlike post' }
    }
  }

  try {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    })

    revalidatePath('/dashboard')

    return { message: 'Liked post successfully' }
  } catch (error) {
    return { message: 'Error. Failed to like post' }
  }
}

export const bookmarkPost = async (value: FormDataEntryValue | null) => {
  const userId = await getUserId()

  const validatedFields = bookmarkSchema.safeParse({ postId: value })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to bookmark post',
    }
  }

  const { postId } = validatedFields.data

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!post) {
    throw new Error('Post not found')
  }

  const bookmark = await prisma.savedPost.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  })

  if (bookmark) {
    try {
      await prisma.savedPost.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      })

      revalidatePath('/dashboard')

      return { message: 'Unbookmarked post successfully' }
    } catch (error) {
      return { message: 'Error. Failed to unbookmark post' }
    }
  }

  try {
    await prisma.savedPost.create({
      data: {
        postId,
        userId,
      },
    })

    revalidatePath('/dashboard')

    return { message: 'Bookmarked post successfully' }
  } catch (error) {
    return { message: 'Error. Failed to bookmark post' }
  }
}

export const updatePost = async (values: z.infer<typeof updatePostSchema>) => {
  const userId = await getUserId()

  const validatedFields = updatePostSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to update post',
    }
  }

  const { id, fileUrl, caption } = validatedFields.data

  const post = await prisma.post.findUnique({
    where: {
      id,
      userId,
    },
  })

  if (!post) {
    throw new Error('Post not found')
  }

  try {
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        fileUrl,
        caption,
      },
    })
  } catch (error) {
    return { message: 'Error. Failed to update post' }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
