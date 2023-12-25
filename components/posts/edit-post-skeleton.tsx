import { AspectRatio } from '../ui/aspect-ratio'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Skeleton } from '../ui/skeleton'

export const EditPostSkeleton = () => {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Info</DialogTitle>
        </DialogHeader>

        <AspectRatio ratio={1 / 1} className="relative h-full">
          <Skeleton className="h-full w-full" />
        </AspectRatio>

        <Skeleton className="h-10 w-full" />
      </DialogContent>
    </Dialog>
  )
}
