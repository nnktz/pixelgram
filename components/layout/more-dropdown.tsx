'use client'

import { Activity, Bookmark, ChevronLeft, LogOut, Menu, Moon, Settings, Sun } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { useTheme } from 'next-themes'

export const MoreDropdown = () => {
  const { theme, setTheme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)
  const [showModeToggle, setShowModeToggle] = useState(false)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!e.target) {
        return
      }

      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowModeToggle(false)
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [ref])

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setOpen(!open)}
          variant={'ghost'}
          size={'lg'}
          className="!justify-start space-x-2 !px-3 md:w-full"
        >
          <Menu />
          <span className="hidden lg:block">More</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        ref={ref}
        className={cn(
          'w-64 !rounded-xl !p-0 transition-opacity dark:bg-neutral-800',
          !open && 'opacity-0',
        )}
        align="end"
        alignOffset={-40}
      >
        {!showModeToggle && (
          <>
            <DropdownMenuItem className="menuItem">
              <Settings size={20} />
              <p>Settings</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="menuItem">
              <Activity size={20} />
              <p>Your activity</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="menuItem">
              <Bookmark size={20} />
              <p>Save</p>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setShowModeToggle(true)} className="menuItem">
              <Moon size={20} />
              <p>Switch appearance</p>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => {}} className="menuItem">
              <LogOut size={20} />
              <p>Log out</p>
            </DropdownMenuItem>
          </>
        )}

        {showModeToggle && (
          <>
            <div className="flex items-center border-b border-gray-200 px-2.5 py-3.5 dark:border-neutral-700">
              <ChevronLeft
                size={18}
                onClick={() => setShowModeToggle(false)}
                className="transition hover:cursor-pointer hover:opacity-75"
              />
              <p className="ml-1 font-bold">Switch appearance</p>
              {theme === 'dark' ? (
                <Moon size={20} className="ml-auto" />
              ) : (
                <Sun size={20} className="ml-auto" />
              )}
            </div>

            <DropdownMenuItem className="!p-0">
              <Label htmlFor="dark-mode" className="menuItem w-full justify-between">
                Dark Mode
                <Switch
                  id="dark-mode"
                  className="ml-auto"
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </Label>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
