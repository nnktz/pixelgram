import Link from 'next/link'

import { fetchPostById, fetchPostsByUsername } from '@/lib/post-service'

import { PostsGrid } from './posts-grid'

export const MorePosts = async ({ postId }: { postId: string }) => {
  const post = await fetchPostById(postId)
  const postUsername = post?.user.username
  const posts = await fetchPostsByUsername(postUsername!, postId)

  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-3 pb-20 lg:max-w-4xl">
      <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
        More posts from{' '}
        <Link
          href={`/dashboard/${postUsername}`}
          className="text-black hover:opacity-50 dark:text-white"
        >
          {postUsername}
        </Link>
      </p>

      <PostsGrid posts={posts} />
    </div>
  )
}
