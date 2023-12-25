'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'next-auth'
import { useOptimistic, useTransition } from 'react'
import { Comment } from '@prisma/client'
import { SendHorizonal } from 'lucide-react'

import { CommentWithExtras } from '@/lib/definitions'
import { createComment as createCommentSchema } from '@/lib/schemas'
import { createComment } from '@/actions/comment'

import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'

type CommentsProps = {
  postId: string
  comments: CommentWithExtras[]
  user?: User | null
}

export const Comments = ({ postId, comments, user }: CommentsProps) => {
  const [isPending, startTransition] = useTransition()
  const [optimisticComments, addOptimisticComment] = useOptimistic<CommentWithExtras[]>(
    comments,
    // @ts-ignore
    (state: Comment[], newComment: string) => [
      { body: newComment, userId: user?.id, postId, user },
      ...state,
    ],
  )

  const form = useForm<z.infer<typeof createCommentSchema>>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      body: '',
      postId,
    },
  })

  const body = form.watch('body')
  const commentCount = optimisticComments.length

  const onSubmit = async (values: z.infer<typeof createCommentSchema>) => {
    const valueCopy = { ...values }
    form.reset()
    startTransition(() => {
      addOptimisticComment(valueCopy.body)
    })

    await createComment(valueCopy)
  }

  return (
    <div className="space-y-0.5 px-3 sm:px-0">
      {commentCount > 1 && (
        <Link
          href={`/dashboard/p/${postId}`}
          scroll={false}
          className="text-sm font-medium text-neutral-500"
        >
          View all {commentCount} comments
        </Link>
      )}

      {optimisticComments.slice(0, 3).map((comment) => {
        const username = comment.user.username

        return (
          <div key={comment.id} className="flex items-center space-x-2 text-sm font-medium">
            <Link href={`/dashboard/${username}`} className="font-semibold">
              {username}
            </Link>

            <p>{comment.body}</p>
          </div>
        )
      })}

      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center space-x-2 border-b border-gray-300 py-1 pb-3 dark:border-neutral-800"
        >
          <FormField
            control={form.control}
            name="body"
            render={({ field, fieldState }) => (
              <FormItem className="flex w-full">
                <FormControl>
                  <input
                    disabled={isPending}
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 border-none bg-transparent text-sm font-medium placeholder-neutral-500 focus:outline-none dark:text-white dark:placeholder-neutral-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {body.trim().length > 0 && (
            <button
              disabled={isPending}
              type="submit"
              className="text-sm font-semibold text-sky-500 hover:text-white disabled:cursor-not-allowed disabled:hover:text-sky-500"
            >
              <SendHorizonal className="h-5 w-5" />
            </button>
          )}
        </form>
      </Form>
    </div>
  )
}
