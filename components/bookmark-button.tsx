'use client'

import { useOptimistic } from 'react'
import { SavedPost } from '@prisma/client'
import { Bookmark } from 'lucide-react'

import { PostWithExtras } from '@/lib/definitions'
import { cn } from '@/lib/utils'
import { bookmarkPost } from '@/actions/post'

import { ActionIcon } from './action-icon'

type BookmarkButtonProps = {
  post: PostWithExtras
  userId?: string
}

export const BookmarkButton = ({ post, userId }: BookmarkButtonProps) => {
  const predicate = (bookmark: SavedPost) =>
    bookmark.userId === userId && bookmark.postId === post.id

  const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic<SavedPost[]>(
    post.savedBy,
    // @ts-ignore
    (state: SavedPost[], newBookmark: SavedPost) =>
      state.find(predicate)
        ? state.filter((bookmark) => bookmark.userId !== userId)
        : [...state, newBookmark],
  )

  return (
    <form
      action={async (formData: FormData) => {
        const postId = formData.get('postId')
        addOptimisticBookmark({ postId, userId })
        await bookmarkPost(postId)
      }}
      className="ml-auto"
    >
      <input type="hidden" name="postId" value={post.id} readOnly />

      <ActionIcon>
        <Bookmark
          className={cn('h-6 w-6', {
            'fill-black dark:fill-white': optimisticBookmarks.some(predicate),
          })}
        />
      </ActionIcon>
    </form>
  )
}
