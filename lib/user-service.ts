import { unstable_noStore as noStore } from 'next/cache'
import prisma from './prisma'

export const fetchProfile = async (username: string) => {
  noStore()

  try {
    const profile = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        saved: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        followedBy: {
          include: {
            follower: {
              include: {
                followedBy: true,
                following: true,
              },
            },
          },
        },
        following: {
          include: {
            following: {
              include: {
                followedBy: true,
                following: true,
              },
            },
          },
        },
      },
    })

    return profile
  } catch (error) {}
}
