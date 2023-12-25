import { Button, ButtonProps } from './ui/button'

type ActionIconProps = Partial<ButtonProps> & {
  children: React.ReactNode
}

export const ActionIcon = ({ children, ...buttonProps }: ActionIconProps) => {
  return (
    <Button type="submit" variant={'ghost'} size={'icon'} className="h-9 w-9" {...buttonProps}>
      {children}
    </Button>
  )
}
