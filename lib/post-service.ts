import { unstable_noStore as noStore } from 'next/cache'

import prisma from './prisma'

export const fetchPosts = async () => {
  noStore()

  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return posts
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch posts')
  }
}
