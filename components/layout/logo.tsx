import Link from 'next/link'
import { SwitchCamera } from 'lucide-react'

import { cn } from '@/lib/utils'
import { calSans } from '@/lib/font'

import { buttonVariants } from '../ui/button'

export const Logo = () => {
  return (
    <Link
      href={'/dashboard'}
      className={buttonVariants({
        className: 'navLink lg:!p-0, !mb-10 hidden select-none md:flex lg:hover:bg-transparent',
        variant: 'ghost',
        size: 'lg',
      })}
    >
      <SwitchCamera className="h-6 w-6 shrink-0 lg:hidden" />
      <p className={cn('hidden text-xl font-semibold lg:block', calSans.className)}>Pixelgram</p>
    </Link>
  )
}
