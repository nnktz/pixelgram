import Link from 'next/link'
import { Heart, Search } from 'lucide-react'

import { calSans } from '@/lib/font'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-zinc-300 bg-white px-3 py-2 sm:-ml-6 md:hidden dark:border-neutral-700 dark:bg-neutral-950">
      <Link href={'/dashboard'}>
        <p className={cn('text-xl font-semibold', calSans.className)}>Pixelgram</p>
      </Link>

      <div className="flex items-center space-x-2">
        <div className="flex items-center gap-x-2 rounded-md bg-zinc-100 px-3.5 py-1.5 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
          <Search className="h-4 w-4" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className="flex-1 bg-transparent outline-none placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
          />
        </div>

        <Button size={'icon'} variant={'ghost'}>
          <Heart />
        </Button>
      </div>
    </header>
  )
}
