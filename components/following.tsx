'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { FollowingWithExtras } from '@/lib/definitions'

import { UserAvatar } from './user-avatar'
import { FollowButton } from './follow-button'

export const Following = ({ following }: { following: FollowingWithExtras }) => {
  const { data: session } = useSession()

  const isFollowing = following.following.followedBy.some(
    (user) => user.followingId === session?.user.id,
  )

  const isCurrentUser = session?.user.id === following.followingId

  if (!session) {
    return null
  }

  return (
    <div className="flex items-center justify-between gap-x-3 p-4">
      <Link
        href={`/dashboard/${following.following.username}`}
        className="flex items-center gap-x-3"
      >
        <UserAvatar user={following.following} className="h-10 w-10" />
        <p className="text-sm font-bold">{following.following.username}</p>
      </Link>
      {!isCurrentUser && (
        <FollowButton
          profileId={following.followingId}
          isFollowing={isFollowing}
          buttonClassName={isFollowing ? 'bg-neutral-700 dark:hover:bg-neutral-700/40' : ''}
        />
      )}
    </div>
  )
}
