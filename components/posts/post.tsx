import Image from 'next/image'
import Link from 'next/link'

import { auth } from '@/configs/auth'
import { PostWithExtras } from '@/lib/definitions'

import { UserAvatar } from '../user-avatar'
import { Timestamp } from '../timestamp'
import { PostOptions } from './post-options'
import { Card } from '../ui/card'
import { PostActions } from './post-actions'

export const Post = async ({ post }: { post: PostWithExtras }) => {
  const session = await auth()
  const userId = session?.user.id
  const username = post.user.username

  if (!session?.user || !userId) {
    return null
  }

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex items-center space-x-3">
          <UserAvatar user={post.user} />

          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold">{username}</span>
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">•</span>
              <Timestamp createdAt={post.createdAt} />
            </p>

            <p className="text-xs font-medium text-black dark:text-white">Vietnam, Ho Chi Minh</p>
          </div>
        </div>

        <PostOptions post={post} userId={userId} />
      </div>

      <Card className="relative h-[450px] w-full overflow-hidden rounded-none">
        <Image src={post.fileUrl} alt="post image" fill className="object-cover sm:rounded-md" />
      </Card>

      <PostActions post={post} userId={userId} className="px-3 sm:px-0" />

      {post.caption && (
        <div className="flex items-center space-x-2 px-3 text-sm font-medium leading-none sm:px-0">
          <Link href={`/dashboard/${username}`} className="font-bold">
            {username}
          </Link>

          <p>{post.caption}</p>
        </div>

        // <Comments postId={post.id} comments={post.comments} user={session.user}/>
      )}
    </div>
  )
}
