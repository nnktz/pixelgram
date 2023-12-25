'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { MoreHorizontal } from 'lucide-react'

import { PostWithExtras } from '@/lib/definitions'
import { cn } from '@/lib/utils'
import { deletePost } from '@/actions/post'

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import SubmitButton from '../submit-button'

type PostOptionsProps = {
  post: PostWithExtras
  userId?: string
  className?: string
}

export const PostOptions = ({ post, userId, className }: PostOptionsProps) => {
  const isPostMine = post.userId === userId

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal className={cn('h-5 w-5 cursor-pointer dark:text-neutral-400', className)} />
      </DialogTrigger>

      <DialogContent className="dialogContent">
        {isPostMine && (
          <form
            action={async (formData: FormData) => {
              const { message } = await deletePost(formData)
              toast(message)
            }}
            className="postOption"
          >
            <input type="hidden" name="id" value={post.id} readOnly />
            <SubmitButton className="w-full p-3 font-bold text-red-500 disabled:cursor-not-allowed">
              Delete post
            </SubmitButton>
          </form>
        )}

        {isPostMine && (
          <Link href={`/dashboard/p/${post.id}/edit`} className="postOption p-3" scroll={false}>
            Edit
          </Link>
        )}

        <form action="" className="postOption border-0">
          <button className="w-full p-3">Hide like count</button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
