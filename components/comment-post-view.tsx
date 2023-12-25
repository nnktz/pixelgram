'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { CommentWithExtras } from '@/lib/definitions'

import { UserAvatar } from './user-avatar'
import { Timestamp } from './timestamp'
import { CommentOptions } from './comment-options'

type CommentPostViewProps = {
  comment: CommentWithExtras
  inputRef?: React.RefObject<HTMLInputElement>
}

export const CommentPostView = ({ comment, inputRef }: CommentPostViewProps) => {
  const { data: session } = useSession()
  const username = comment.user.username
  const href = `/dashboard/${username}`

  return (
    <div className="group flex items-start space-x-2.5 p-3 px-3.5">
      <Link href={href}>
        <UserAvatar user={comment.user} />
      </Link>

      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 text-sm leading-none">
          <Link href={href} className="font-semibold">
            {username}
          </Link>

          <p className="font-medium">{comment.body}</p>
        </div>

        <div className="flex h-5 items-center space-x-2.5">
          <Timestamp createdAt={comment.createdAt} />

          <button
            className="text-xs font-semibold text-neutral-500"
            onClick={() => inputRef?.current?.focus()}
          >
            Reply
          </button>

          {comment.userId === session?.user.id && <CommentOptions comment={comment} />}
        </div>
      </div>
    </div>
  )
}
