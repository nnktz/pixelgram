'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'

import { useMount } from '@/hooks/use-mount'
import { UserWithExtras } from '@/lib/definitions'
import { updateUser as updateUserSchema } from '@/lib/schemas'
import { UploadButton } from '@/lib/uploadthing'
import { updateProfile } from '@/actions/user'

import { UserAvatar } from '../user-avatar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { SubmitButton } from '../submit-button'

type ProfileAvatarProps = {
  user: UserWithExtras
  children: React.ReactNode
}

export const ProfileAvatar = ({ user, children }: ProfileAvatarProps) => {
  const { data: session } = useSession()

  const isCurrenUser = session?.user.id === user.id

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: user.id,
      image: user.image || '',
      name: user.name || '',
      username: user.username || '',
    },
  })

  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const mount = useMount()

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    const { message } = await updateProfile(values)
    toast(message)
    setOpen(false)
  }

  const onButtonClick = () => {
    form.setValue('image', '')

    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  if (!mount || !session) {
    return null
  }

  if (!isCurrenUser) {
    return <UserAvatar user={user} className="h-20 w-20 md:h-36 md:w-36" />
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="dialogContent">
        <DialogHeader>
          <DialogTitle className="mx-auto py-5 text-xl font-medium">
            Change Profile Photo
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="image"
              render={({}) => (
                <FormItem>
                  <FormControl>
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        form.setValue('image', res[0].url)

                        if (inputRef.current) {
                          inputRef.current.click()
                        }
                      }}
                      onUploadError={(error: Error) => {
                        console.error(error)
                        toast.error('Upload failed')
                      }}
                      className="h-11 border-y border-zinc-300 text-sm ut-button:w-full ut-button:bg-transparent ut-button:font-bold ut-button:text-blue-500 ut-button:ring-0 ut-button:ring-offset-0 ut-button:focus-visible:ring-0 ut-allowed-content:hidden dark:border-neutral-700"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {user.image && (
              <SubmitButton
                disabled={form.formState.isSubmitting}
                onClick={onButtonClick}
                className="w-full border-b border-zinc-300 p-3 text-sm font-bold text-red-500 disabled:cursor-not-allowed dark:border-neutral-700"
              >
                Remove current photo
              </SubmitButton>
            )}

            <input type="submit" hidden ref={inputRef} readOnly />
          </form>
        </Form>

        <DialogClose className="postOption w-full border-b p-3">Cancel</DialogClose>
      </DialogContent>
    </Dialog>
  )
}
