import { PostsGrid } from '@/components/posts/posts-grid'
import { fetchPostsByUsername } from '@/lib/post-service'

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const posts = await fetchPostsByUsername(params.username)

  return <PostsGrid posts={posts} />
}

export default ProfilePage
