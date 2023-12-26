'use client'

import Link from 'next/link'
import { Bookmark, Clapperboard, Grid3X3 } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { UserWithExtras } from '@/lib/definitions'
import { cn } from '@/lib/utils'

import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { Separator } from '../ui/separator'

const profileTabs = [
  {
    title: 'Posts',
    href: '',
    icon: Grid3X3,
  },
  {
    title: 'Reels',
    href: 'reels',
    icon: Clapperboard,
  },
  {
    title: 'Saved',
    href: 'saved',
    icon: Bookmark,
  },
]

type ProfileTabsProps = {
  profile: UserWithExtras
  isCurrentUser: boolean
}

export const ProfileTabs = ({ profile, isCurrentUser }: ProfileTabsProps) => {
  const pathname = usePathname()

  return (
    <Tabs defaultValue="posts" className="px-4 pb-16 pt-14 md:px-0 md:pt-32">
      <TabsList className="h-px w-full gap-x-10 bg-zinc-300 p-px dark:bg-neutral-800">
        {profileTabs
          .filter((tab) => isCurrentUser || tab.href !== 'saved')
          .map((tab) => {
            const profilePage = `/dashboard/${profile.username}`
            const isActive =
              tab.href === '' ? pathname === profilePage : pathname === `${profilePage}/${tab.href}`
            const Icon = tab.icon

            return (
              <TabsTrigger
                key={`tabs-` + tab.href}
                value={tab.href}
                className={cn(
                  'mt-8 flex-col gap-4 !p-0 data-[state=active]:text-neutral-400',
                  isActive ? '!text-neutral-700 dark:!text-white' : 'text-neutral-400',
                )}
                asChild
              >
                <Link href={`/dashboard/${profile.username}/${tab.href}`}>
                  <Separator
                    className={cn(
                      '!h-px w-16',
                      isActive
                        ? '!bg-neutral-700 dark:!bg-white'
                        : 'bg-zinc-300 dark:!bg-neutral-800',
                    )}
                  />

                  <div className="flex items-center gap-x-1">
                    <Icon className="h-3 w-3" />
                    <p className="text-xs font-bold uppercase tracking-widest">{tab.title}</p>
                  </div>
                </Link>
              </TabsTrigger>
            )
          })}
      </TabsList>
    </Tabs>
  )
}
