'use client'

import { usePathname, useRouter } from 'next/navigation'

import { useMount } from '@/hooks/use-mount'
import { FollowingWithExtras } from '@/lib/definitions'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import { Following } from './following'

type FollowingModalProps = {
  following: FollowingWithExtras[] | undefined
  username: string
}

export const FollowingModal = ({ following, username }: FollowingModalProps) => {
  const mount = useMount()
  const pathname = usePathname()
  const router = useRouter()

  const isFollowingPage = pathname === `/dashboard/${username}/following`

  if (!mount) {
    return null
  }

  return (
    <Dialog open={isFollowingPage} onOpenChange={(isOpen) => !isOpen && router.back()}>
      <DialogContent className="dialogContent">
        <DialogHeader className="w-full border-b border-zinc-300 py-2 dark:border-neutral-700">
          <DialogTitle className="mx-auto text-base font-bold">Followers</DialogTitle>
        </DialogHeader>

        {following?.length === 0 && (
          <p className="p-4 text-center text-sm font-medium">This user has no following.</p>
        )}

        <ScrollArea className="max-h-[350px] min-h-fit">
          {following?.map((following) => (
            <Following key={following.followerId} following={following} />
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
