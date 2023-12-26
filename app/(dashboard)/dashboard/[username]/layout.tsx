import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { MoreHorizontal, Settings } from 'lucide-react'

import { auth } from '@/configs/auth'
import { fetchProfile } from '@/lib/user-service'

import { ProfileHeader } from '@/components/profile/profile-header'
import { ProfileAvatar } from '@/components/profile/profile-avatar'
import { UserAvatar } from '@/components/user-avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { FollowButton } from '@/components/follow-button'
import { ProfileTabs } from '@/components/profile/profile-tabs'

type Props = {
  children: React.ReactNode
  params: {
    username: string
  }
}

export const generateMetadata = async (
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const username = params.username
  const profile = await fetchProfile(username)

  return {
    title: `${profile?.name} (@${profile?.username})`,
  }
}

const ProfileLayout = async ({ children, params }: Props) => {
  const profile = await fetchProfile(params.username)
  const session = await auth()
  const isCurrentUser = session?.user.id === profile?.id
  const isFollowing = profile?.followedBy.some((user) => user.followerId === session?.user.id)

  if (!profile) {
    notFound()
  }

  return (
    <>
      <ProfileHeader username={profile.username} />
      <div className="mx-auto max-w-4xl">
        <div className="flex gap-x-5 px-4 md:gap-x-10">
          <ProfileAvatar user={profile}>
            <UserAvatar user={profile} className="h-20 w-20 cursor-pointer md:h-36 md:w-36" />
          </ProfileAvatar>

          <div className="w-full space-y-4">
            <div className="grid grid-cols-2 items-center gap-1 md:grid-cols-4 md:gap-3">
              <p className="w-fit text-xl font-semibold">{profile.username}</p>
              {isCurrentUser ? (
                <>
                  <Button size={'icon'} variant={'ghost'} className="md:order-last">
                    <Settings />
                  </Button>
                  <Link
                    href={`/dashboard/edit-profile`}
                    className={buttonVariants({
                      className: '!font-bold',
                      variant: 'secondary',
                      size: 'sm',
                    })}
                  >
                    Edit profile
                  </Link>
                  <Button variant={'secondary'} className="font-bold" size={'sm'}>
                    View archive
                  </Button>
                </>
              ) : (
                <>
                  <Button size={'icon'} variant={'ghost'} className="md:order-last">
                    <MoreHorizontal />
                  </Button>
                  <FollowButton isFollowing={isFollowing} profileId={profile.id} />
                  <Button variant={'secondary'} className="font-bold" size={'sm'}>
                    Message
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-x-2 md:gap-x-7">
              <p className="text-center font-medium">
                <strong>{profile.posts.length}</strong> posts
              </p>

              <Link
                href={`/dashboard/${profile.username}/followers`}
                className="text-center font-medium"
              >
                <strong>{profile.followedBy.length}</strong> followers
              </Link>

              <Link
                href={`/dashboard/${profile.username}/following`}
                className="text-center font-medium"
              >
                <strong>{profile.following.length}</strong> following
              </Link>
            </div>

            <div className="text-sm">
              <div className="font-bold">{profile.name}</div>
              <p>{profile.bio}</p>
            </div>
          </div>
        </div>

        <ProfileTabs profile={profile} isCurrentUser={isCurrentUser} />

        {children}
      </div>
    </>
  )
}

export default ProfileLayout
