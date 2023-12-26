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

export const fetchPostById = async (id: string) => {
  noStore()

  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
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
    })

    return post
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch post')
  }
}

export const fetchPostsByUsername = async (username: string, postId?: string) => {
  noStore()

  try {
    const posts = await prisma.post.findMany({
      where: {
        user: {
          username,
        },
        NOT: {
          id: postId,
        },
      },
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

export const fetchSavedPostsByUsername = async (username: string) => {
  noStore()

  try {
    const data = await prisma.savedPost.findMany({
      where: {
        user: {
          username,
        },
      },
      include: {
        post: {
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
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch saved posts')
  }
}
