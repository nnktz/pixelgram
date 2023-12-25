import { fetchPosts } from '@/lib/post-service'
import { Post } from './post'
import { PostSkeleton } from './post-skeleton'

export const Posts = async () => {
  const posts = await fetchPosts()

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  )
}

export const PostsSkeleton = () => {
  return (
    <>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </>
  )
}
