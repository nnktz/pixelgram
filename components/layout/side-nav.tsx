import { auth } from '@/configs/auth'
import { Logo } from './logo'
import { MoreDropdown } from './more-dropdown'
import { NavLinks } from './nav-links'
import { Profile } from './profile'

export const SideNav = async () => {
  const session = await auth()
  const user = session?.user

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="fixed bottom-0 z-50 -ml-3 flex h-16 w-full flex-1 flex-row justify-evenly space-x-2 border-t bg-white p-2 md:relative md:ml-0 md:h-full md:flex-col md:justify-between md:space-x-0 md:space-y-2 md:border-none dark:bg-neutral-950">
        <Logo />
        <NavLinks />
        {user && <Profile user={user} />}
        <div className="relative hidden w-full flex-1 items-end md:mt-auto md:flex">
          <MoreDropdown />
        </div>
      </div>
    </div>
  )
}
