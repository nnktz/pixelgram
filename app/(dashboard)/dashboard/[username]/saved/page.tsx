import { fetchSavedPostsByUsername } from '@/lib/post-service'

import { PostsGrid } from '@/components/posts/posts-grid'

const SavedPostsPage = async ({ params }: { params: { username: string } }) => {
  const savedPosts = await fetchSavedPostsByUsername(params.username)
  const posts = savedPosts?.map((savedPost) => savedPost.post)

  return <PostsGrid posts={posts} />
}

export default SavedPostsPage
