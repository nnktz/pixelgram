'use client'

import Link from 'next/link'
import { Clapperboard, Compass, Heart, Home, MessageCircle, PlusSquare, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../ui/button'

const routes = [
  {
    label: 'Home',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Search',
    href: '/dashboard/search',
    icon: Search,
    hideOnMobile: true,
  },
  {
    label: 'Explore',
    href: '/dashboard/explore',
    icon: Compass,
  },
  {
    label: 'Reels',
    href: '/dashboard/reels',
    icon: Clapperboard,
  },
  {
    label: 'Messages',
    href: '/dashboard/messages',
    icon: MessageCircle,
  },
  {
    label: 'Notifications',
    href: '/dashboard/notifications',
    icon: Heart,
    hideOnMobile: true,
  },
  {
    label: 'Create',
    href: '/dashboard/create',
    icon: PlusSquare,
  },
]

export const NavLinks = () => {
  const pathname = usePathname()

  return (
    <>
      {routes.map((route) => {
        const isActive = pathname === route.href
        const Icon = route.icon

        return (
          <Link
            href={route.href}
            key={route.label}
            className={buttonVariants({
              variant: isActive ? 'secondary' : 'ghost',
              size: 'lg',
              className: cn('navLink', { 'hidden md:flex': route.hideOnMobile }),
            })}
          >
            <Icon className="w-6" />
            <p className={cn('hidden lg:block', isActive && 'font-semibold')}>{route.label}</p>
          </Link>
        )
      })}
    </>
  )
}
