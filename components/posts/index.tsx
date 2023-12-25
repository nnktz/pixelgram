import { fetchPosts } from '@/lib/post-service'
import { Post } from './post'

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
