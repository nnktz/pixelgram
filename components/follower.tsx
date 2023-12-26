'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { FollowerWithExtras } from '@/lib/definitions'

import { UserAvatar } from './user-avatar'
import { FollowButton } from './follow-button'

export const Follower = ({ follower }: { follower: FollowerWithExtras }) => {
  const { data: session } = useSession()

  const isFollowing = follower.follower.followedBy.some(
    (user) => user.followerId === session?.user.id,
  )

  const isCurrentUser = session?.user.id === follower.followerId

  if (!session) {
    return null
  }

  return (
    <div className="flex items-center justify-between gap-x-3 p-4">
      <Link href={`/dashboard/${follower.follower.username}`} className="flex items-center gap-x-3">
        <UserAvatar user={follower.follower} className="h-10 w-10" />
        <p className="text-sm font-bold">{follower.follower.username}</p>
      </Link>

      {!isCurrentUser && (
        <FollowButton
          profileId={follower.followerId}
          isFollowing={isFollowing}
          buttonClassName={isFollowing ? 'bg-neutral-700 dark:bg-neutral-700/40' : undefined}
        />
      )}
    </div>
  )
}
