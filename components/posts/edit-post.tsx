'use client'

import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { Post } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'

import { useMount } from '@/hooks/use-mount'
import { updatePost as updatePostSchema } from '@/lib/schemas'
import { updatePost } from '@/actions/post'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Error } from '../error'
import { AspectRatio } from '../ui/aspect-ratio'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type EditPostProps = {
  id: string
  post: Post
}

export const EditPost = ({ id, post }: EditPostProps) => {
  const pathname = usePathname()
  const mount = useMount()
  const router = useRouter()

  const isEditPage = pathname === `/dashboard/p/${id}/edit`

  const form = useForm<z.infer<typeof updatePostSchema>>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      id: post.id,
      caption: post.caption || '',
      fileUrl: post.fileUrl,
    },
  })

  const fileUrl = form.watch('fileUrl')

  const onSubmit = async (values: z.infer<typeof updatePostSchema>) => {
    const res = await updatePost(values)

    if (res) {
      return toast.error(<Error res={res} />)
    }
  }

  if (!mount) {
    return null
  }

  return (
    <Dialog open={isEditPage} onOpenChange={(open) => !open && router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Info</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="h-96 overflow-hidden rounded-md md:h-[450px]">
              <AspectRatio ratio={1 / 1} className="relative h-full">
                <Image src={fileUrl} alt="post image" fill className="rounded-md object-cover" />
              </AspectRatio>
            </div>

            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="caption">Caption</FormLabel>

                  <FormControl>
                    <Input id="caption" placeholder="write a caption..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              Done
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
