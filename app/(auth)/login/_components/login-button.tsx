'use client'

import { signIn } from 'next-auth/react'
import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'

export const LoginButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button
      className="mt-4 w-full"
      variant={'secondary'}
      disabled={pending}
      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
    >
      Continue with Google
    </Button>
  )
}
