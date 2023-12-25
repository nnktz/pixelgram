import { auth } from '@/configs/auth'
import { fetchPostById } from '@/lib/post-service'
import { notFound } from 'next/navigation'
import { Card } from '../ui/card'
import Image from 'next/image'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import Link from 'next/link'
import { UserAvatar } from '../user-avatar'
import { PostOptions } from './post-options'
import { ScrollArea } from '../ui/scroll-area'
import { MiniPost } from './mini-post'
import { CommentPostView } from '../comment-post-view'
import { PostActions } from './post-actions'
import { CommentForm } from '../comment-form'
import { Post } from './post'

export const SinglePost = async ({ id }: { id: string }) => {
  const post = await fetchPostById(id)
  const session = await auth()

  const postUsername = post?.user.username
  const userId = session?.user.id

  if (!post) {
    notFound()
  }

  return (
    <>
      <Card className="mx-auto hidden max-w-3xl md:flex lg:max-w-4xl">
        <div className="relative min-h-[450px] w-full max-w-sm overflow-hidden lg:max-w-lg">
          <Image
            src={post.fileUrl}
            alt="post image"
            fill
            className="object-cover md:rounded-l-md"
          />
        </div>

        <div className="flex max-w-sm flex-1 flex-col">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link href={`/dashboard/${postUsername}`} className="text-sm font-semibold">
                  {postUsername}
                </Link>
              </HoverCardTrigger>

              <HoverCardContent>
                <div className="flex items-center space-x-2">
                  <UserAvatar user={post.user} className="h-14 w-14" />

                  <div>
                    <p className="font-bold">{postUsername}</p>
                    <p className="text-sm font-medium dark:text-neutral-400">{post.user.name}</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <PostOptions post={post} userId={userId} />
          </div>

          {post.comments.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-1.5">
              <p className="text-xl font-semibold lg:text-2xl">No comment yet.</p>

              <p className="text-sm font-medium">Start the conversation.</p>
            </div>
          )}

          {post.comments.length > 0 && (
            <ScrollArea className="hidden max-h-[450px] flex-1 py-1.5 md:inline">
              <MiniPost post={post} />
              {post.comments.map((comment) => (
                <CommentPostView key={comment.id} comment={comment} />
              ))}
            </ScrollArea>
          )}

          <div className="hidden border-y p-2.5 px-2 md:block">
            <PostActions post={post} userId={userId} />

            <time className="text-[11px] font-medium uppercase text-zinc-500">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          <CommentForm postId={id} className="hidden md:inline-flex" />
        </div>
      </Card>

      <div className="md:hidden">
        <Post post={post} />
      </div>
    </>
  )
}
