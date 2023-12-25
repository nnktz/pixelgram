import { Suspense } from 'react'

import { SinglePost } from '@/components/posts/single-post'
import { SinglePostSkeleton } from '@/components/posts/single-post-skeleton'
import { Separator } from '@/components/ui/separator'
import { MorePosts } from '@/components/posts/more-posts'

const PostPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Suspense fallback={<SinglePostSkeleton />}>
        <SinglePost id={params.id} />

        <Separator className="mx-auto my-12 max-w-3xl lg:max-w-4xl" />
      </Suspense>

      <Suspense>
        <MorePosts postId={params.id} />
      </Suspense>
    </div>
  )
}

export default PostPage
