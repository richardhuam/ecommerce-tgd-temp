import { Card, Skeleton } from '@nextui-org/react';

type CategoryCardSkeletonProps = {};

export default function CategoryCardSkeleton({}: CategoryCardSkeletonProps) {
  return (
    <div className="flex w-full gap-4">
      <Card className="p-4 w-full" radius="lg">
        <div className="w-full flex items-center gap-6">
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/4 rounded-lg" />
            <Skeleton className="h-3 w-4/4 rounded-lg" />
            <Skeleton className="h-3 w-4/4 rounded-lg" />
          </div>
          <div>
            <Skeleton className="flex rounded-lg w-28 xl:w-32 h-28 xl:h-32" />
          </div>
        </div>
      </Card>
      <Card className="p-4 w-full hidden sm:flex" radius="lg">
        <div className="w-full flex items-center gap-6">
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/4 rounded-lg" />
            <Skeleton className="h-3 w-4/4 rounded-lg" />
            <Skeleton className="h-3 w-4/4 rounded-lg" />
          </div>
          <div>
            <Skeleton className="flex rounded-lg w-28 xl:w-32 h-28 xl:h-32" />
          </div>
        </div>
      </Card>
      <Card className="p-4 w-full hidden lg:flex" radius="lg">
        <div className="w-full flex items-center gap-6">
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/4 rounded-lg" />
            <Skeleton className="h-3 w-4/4 rounded-lg" />
            <Skeleton className="h-3 w-4/4 rounded-lg" />
          </div>
          <div>
            <Skeleton className="flex rounded-lg w-28 xl:w-32 h-28 xl:h-32" />
          </div>
        </div>
      </Card>
    </div>
  );
}
