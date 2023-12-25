'use client'

import { toast } from 'sonner'
import { Link, Send } from 'lucide-react'

import { ActionIcon } from './action-icon'

export const ShareButton = ({ postId }: { postId: string }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/dashboard/p/${postId}`)
    toast('Link copied', {
      icon: <Link className="h-5 w-5" />,
    })
  }

  return (
    <ActionIcon onClick={onCopy}>
      <Send className="h-6 w-6" />
    </ActionIcon>
  )
}
