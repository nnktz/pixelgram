import { Skeleton } from '../ui/skeleton'

export const PostSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[050px]" />
        </div>
      </div>

      <Skeleton className="h-[450px]" />
    </div>
  )
}
