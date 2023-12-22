'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { User } from 'next-auth'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../ui/button'
import { UserAvatar } from '../user-avatar'

export const Profile = ({ user }: { user: User }) => {
  const pathname = usePathname()

  const href = `/dashboard/${user.username}`
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: isActive ? 'secondary' : 'ghost',
        className: 'navLink',
        size: 'lg',
      })}
    >
      <UserAvatar user={user} className={cn('h-6 w-6', isActive && 'border-2 border-white')} />

      <p className={cn('hidden lg:block', isActive && 'font-semibold')}>Profile</p>
    </Link>
  )
}
