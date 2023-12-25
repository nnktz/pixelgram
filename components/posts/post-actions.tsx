import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

import { PostWithExtras } from '@/lib/definitions'
import { cn } from '@/lib/utils'

import { LikeButton } from '../like-button'

type PostActionsProps = {
  post: PostWithExtras
  userId?: string
  className?: string
}

export const PostActions = ({ post, userId, className }: PostActionsProps) => {
  return (
    <div className={cn('relative flex w-full items-center gap-x-2', className)}>
      <LikeButton post={post} userId={userId} />

      {/* <Link href={`/dashboard/p/${post.id}`}>
        <ActionIcon>
          <MessageCircle className="h-6 w-6" />
        </ActionIcon>
      </Link>
      <ShareButton postId={post.id} />
      <BookmarkButton post={post} userId={userId} /> */}
    </div>
  )
}
