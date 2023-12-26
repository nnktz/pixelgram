'use client'

import { useFormStatus } from 'react-dom'

import { ButtonProps } from './ui/button'

type Props = ButtonProps & {
  children: React.ReactNode
}

export const SubmitButton = ({ children, ...props }: Props) => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending} {...props}>
      {children}
    </button>
  )
}
