import { notFound } from 'next/navigation'

import { fetchPostById } from '@/lib/post-service'

import { EditPost } from '@/components/posts/edit-post'

const EditPostPage = async ({ params }: { params: { id: string } }) => {
  const post = await fetchPostById(params.id)

  if (!post) {
    notFound()
  }

  return <EditPost id={params.id} post={post} />
}

export default EditPostPage
