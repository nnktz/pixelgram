'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { createPost as createPostSchema } from '@/lib/schemas'
import { UploadButton } from '@/lib/uploadthing'
import { useMount } from '@/hooks/use-mount'
import { createPost } from '@/actions/post'

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Error } from '@/components/error'

const CreatePage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const mount = useMount()

  const isCreatePage = pathname === '/dashboard/create'

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      caption: '',
      fileUrl: undefined,
    },
  })

  const fileUrl = form.watch('fileUrl')

  const onSubmit = async (values: z.infer<typeof createPostSchema>) => {
    const res = await createPost(values)

    if (res) {
      return toast.error(<Error res={res} />)
    }
  }

  if (!mount) {
    return null
  }

  return (
    <div>
      <Dialog open={isCreatePage} onOpenChange={(open) => !open && router.back()}>
        <DialogContent>
          <DialogHeader>Create a new post</DialogHeader>

          <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {!!fileUrl ? (
                <div className="h-96 overflow-hidden rounded-md md:h-[450px]">
                  <AspectRatio ratio={1 / 1} className="relative h-full">
                    <Image
                      src={fileUrl}
                      alt="post preview"
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel htmlFor="picture">Picture</FormLabel>
                      <FormControl>
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            form.setValue('fileUrl', res[0].url)
                            toast.success('Upload completed successfully')
                          }}
                          onUploadError={(error: Error) => {
                            console.error(error)
                            toast.error('Upload failed')
                          }}
                        />
                      </FormControl>
                      <FormDescription>Upload a picture to post.</FormDescription>
                    </FormItem>
                  )}
                />
              )}

              {!!fileUrl && (
                <FormField
                  control={form.control}
                  name="caption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="caption">Caption</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="caption"
                          placeholder="Write a caption..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit" disabled={form.formState.isSubmitting}>
                Create Post
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreatePage
