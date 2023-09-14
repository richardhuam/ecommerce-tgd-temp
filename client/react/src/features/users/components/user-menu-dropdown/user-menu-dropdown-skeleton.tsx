import { Skeleton } from '@nextui-org/react';

export default function UserMenuDropdownSkeleton() {
  return (
    <div className="flex items-center gap-3 md:min-w-[158px]">
      <div>
        <Skeleton className="flex rounded-full w-10 h-10" />
      </div>
      <div className="w-full hidden md:flex flex-col gap-2">
        <Skeleton className="h-2 w-3/5 rounded-lg" />
        <Skeleton className="h-2 w-4/5 rounded-lg" />
      </div>
    </div>
  );
}
