'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'

import { UserWithExtras } from '@/lib/definitions'
import { userSchema } from '@/lib/schemas'
import { updateProfile } from '@/actions/user'

import { ProfileAvatar } from './profile-avatar'
import { UserAvatar } from '../user-avatar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'

export const ProfileForm = ({ profile }: { profile: UserWithExtras }) => {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: profile.id,
      image: profile.image || '',
      name: profile.name || '',
      username: profile.username || '',
      bio: profile.bio || '',
      gender: profile.gender || '',
      websiteUrl: profile.websiteUrl || '',
    },
  })

  const { isDirty, isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    const { message } = await updateProfile(values)
    toast(message)
  }

  return (
    <div className="max-w-xl space-y-8 py-10 lg:p-10">
      <div className="flex items-center gap-x-2 md:gap-x-5">
        <ProfileAvatar user={profile}>
          <div className="flex md:w-20 md:justify-end">
            <UserAvatar user={profile} className="h-11 w-11 cursor-pointer" />
          </div>
        </ProfileAvatar>

        <div>
          <p className="font-medium">{profile.username}</p>
          <ProfileAvatar user={profile}>
            <p className="cursor-pointer text-sm font-bold text-blue-500 hover:text-white">
              Change profile photo
            </p>
          </ProfileAvatar>
        </div>
      </div>

      <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-x-8 gap-y-2 md:flex-row md:items-center">
                  <FormLabel className="w-20 font-bold md:text-right">Website</FormLabel>

                  <FormControl>
                    <Input placeholder="Website..." {...field} />
                  </FormControl>
                </div>

                <FormDescription className="text-xs md:ml-24">
                  Editing your links is only available on mobile. Visit the Pixelgram app and edit
                  you profile to change websites in your bio
                </FormDescription>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-x-8 gap-y-2 md:flex-row md:items-center">
                  <FormLabel className="w-20 font-bold md:text-right">Bio</FormLabel>

                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                </div>

                <FormDescription className="text-xs md:ml-24">
                  {field.value?.length}/150
                </FormDescription>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-x-8 gap-y-2 md:flex-row md:items-center">
                  <FormLabel className="w-20 font-bold md:text-right">Gender</FormLabel>

                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Prefer not to say" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="1">Female</SelectItem>
                      <SelectItem value="2">Male</SelectItem>
                      <SelectItem value="3">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <FormDescription className="text-xs md:ml-24">
                  This wont be part of your public profile.
                </FormDescription>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="md:ml-24"
            disabled={!isDirty || !isValid || isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
