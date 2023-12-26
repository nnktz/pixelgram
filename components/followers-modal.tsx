'use client'

import { usePathname, useRouter } from 'next/navigation'

import { useMount } from '@/hooks/use-mount'
import { FollowerWithExtras } from '@/lib/definitions'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import { Follower } from './follower'

type FollowersModalProps = {
  followers: FollowerWithExtras[] | undefined
  username: string
}

export const FollowersModal = ({ followers, username }: FollowersModalProps) => {
  const mount = useMount()
  const pathname = usePathname()
  const router = useRouter()

  const isFollowersPage = pathname === `/dashboard/${username}/followers`

  if (!mount) {
    return null
  }

  return (
    <Dialog open={isFollowersPage} onOpenChange={(isOpen) => !isOpen && router.back()}>
      <DialogContent className="dialogContent">
        <DialogHeader className="w-full border-b border-zinc-300 py-2 dark:border-neutral-700">
          <DialogTitle className="mx-auto text-base font-bold">Followers</DialogTitle>
        </DialogHeader>

        {followers?.length === 0 && (
          <p className="p-4 text-center text-sm font-medium">This user has no followers.</p>
        )}

        <ScrollArea className="max-h-[350px] min-h-fit">
          {followers?.map((follower) => <Follower key={follower.followerId} follower={follower} />)}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
