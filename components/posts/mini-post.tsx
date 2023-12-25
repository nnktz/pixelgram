'use client'

import { useSession } from 'next-auth/react'

import { PostWithExtras } from '@/lib/definitions'
import Link from 'next/link'
import { UserAvatar } from '../user-avatar'
import { Timestamp } from '../timestamp'
import { PostOptions } from './post-options'

export const MiniPost = ({ post }: { post: PostWithExtras }) => {
  const { data: session, status } = useSession()

  const user = session?.user
  const username = post.user.username
  const href = `/dashboard/${username}`

  if (!user) {
    return null
  }

  return (
    <div className="group flex items-start space-x-2.5 p-3 px-3.5">
      <Link href={href}>
        <UserAvatar user={post.user} />
      </Link>

      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 text-sm leading-none">
          <Link href={href} className="font-semibold">
            {username}
          </Link>

          <p className="font-medium">{post.caption}</p>
        </div>

        <div className="flex h-5 items-center space-x-2.5">
          <Timestamp createdAt={post.createdAt} />

          <PostOptions post={post} userId={user.id} className="hidden group-hover:inline" />
        </div>
      </div>
    </div>
  )
}
