'use client'

import { cn } from '@/lib/utils'

import { SubmitButton } from './submit-button'
import { buttonVariants } from './ui/button'
import { followUser } from '@/actions/follow'

type FollowButtonProps = {
  profileId: string
  isFollowing?: boolean
  className?: string
  buttonClassName?: string
}

export const FollowButton = ({
  profileId,
  isFollowing,
  className,
  buttonClassName,
}: FollowButtonProps) => {
  return (
    <form
      action={async (formData) => {
        await followUser(formData)
      }}
      className={className}
    >
      <input type="hidden" name="id" id="" value={profileId} readOnly />

      <SubmitButton
        className={buttonVariants({
          variant: isFollowing ? 'secondary' : 'default',
          size: 'sm',
          className: cn('w-full !font-bold', buttonClassName),
        })}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </SubmitButton>
    </form>
  )
}
