import { notFound } from 'next/navigation'

import { fetchPostById } from '@/lib/post-service'

import { PostView } from '@/components/posts/post-view'

const PostModal = async ({ params }: { params: { id: string } }) => {
  const post = await fetchPostById(params.id)

  if (!post) {
    notFound()
  }

  return <PostView id={params.id} post={post} />
}

export default PostModal
