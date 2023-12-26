import { auth } from '@/configs/auth'

export const getUserId = async () => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw new Error('Unauthenticated')
  }

  return userId
}
