'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Loader2, SendHorizonal } from 'lucide-react'

import { createComment as createCommentSchema } from '@/lib/schemas'
import { cn } from '@/lib/utils'
import { createComment } from '@/actions/comment'

import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'

type CommentFormProps = {
  postId: string
  className?: string
  inputRef?: React.RefObject<HTMLInputElement>
}

export const CommentForm = ({ postId, className, inputRef }: CommentFormProps) => {
  const form = useForm<z.infer<typeof createCommentSchema>>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      body: '',
      postId,
    },
  })

  const body = form.watch('body')
  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof createCommentSchema>) => {
    await createComment(values)
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'relative flex w-full items-center space-x-2 border-b border-gray-200 px-3 py-3 dark:border-neutral-800',
          className,
        )}
      >
        {isSubmitting && (
          <div className="absolute flex w-full items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="flex w-full">
              <FormControl>
                <input
                  type="text"
                  disabled={isSubmitting}
                  placeholder="Add a comment..."
                  className="flex-1 border-none bg-transparent text-sm font-medium placeholder-neutral-400 focus:outline-none disabled:opacity-30 dark:text-neutral-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          disabled={!body.trim().length || isSubmitting}
          type="submit"
          className="text-sm font-semibold text-sky-500 hover:text-sky-700 disabled:cursor-not-allowed disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:hover:text-white dark:disabled:text-slate-500 dark:disabled:hover:text-slate-500"
        >
          <SendHorizonal className="h-5 w-5" />
        </button>
      </form>
    </Form>
  )
}
