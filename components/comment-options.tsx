'use client'

import { Comment } from '@prisma/client'
import { MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'

import { deleteComment } from '@/actions/comment'

import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog'
import { SubmitButton } from './submit-button'

export const CommentOptions = ({ comment }: { comment: Comment }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal className="hidden h-5 w-5 cursor-pointer group-hover:inline dark:text-neutral-400" />
      </DialogTrigger>

      <DialogContent className="dialogContent">
        <form
          action={async (formData) => {
            const { message } = await deleteComment(formData)
            toast(message)
          }}
          className="postOption"
        >
          <input type="hidden" name="id" value={comment.id} readOnly />

          <SubmitButton className="w-full p-3 font-bold text-red-500 disabled:cursor-not-allowed">
            Delete
          </SubmitButton>
        </form>

        <DialogClose className="postOption w-full border-0 p-3">Cancel</DialogClose>
      </DialogContent>
    </Dialog>
  )
}
