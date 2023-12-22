import type { AvatarProps } from '@radix-ui/react-avatar'
import type { User } from 'next-auth'
import { Avatar, AvatarImage } from './ui/avatar'

type Props = Partial<AvatarProps> & {
  user: User | undefined
}

export const UserAvatar = ({ user, ...avatarProps }: Props) => {
  const srcUndefined = '/placeholder.jpg'
  const src = user && user.image ? user.image : srcUndefined

  return (
    <Avatar className="relative h-8 w-8" {...avatarProps}>
      <AvatarImage src={src} alt={`${user?.name}'s profile picture`} />
    </Avatar>
  )
}
