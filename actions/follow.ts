'use server'

import { revalidatePath } from 'next/cache'

import { getUserId } from '@/lib/auth-service'
import { followUser as followUserSchema } from '@/lib/schemas'
import prisma from '@/lib/prisma'

export const followUser = async (formData: FormData) => {
  const userId = await getUserId()

  const { id } = followUserSchema.parse({
    id: formData.get('id'),
  })

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const follows = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: id,
      },
    },
  })

  if (follows) {
    try {
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: id,
          },
        },
      })

      revalidatePath('/dashboard')

      return { message: 'Unfollowed user successfully' }
    } catch (error) {
      return { message: 'Error. Failed to unfollow user' }
    }
  }

  try {
    await prisma.follows.create({
      data: {
        followerId: userId,
        followingId: id,
      },
    })

    revalidatePath('/dashboard')

    return { message: 'Followed user successfully' }
  } catch (error) {
    return { message: 'Error. Failed to follow user' }
  }
}
