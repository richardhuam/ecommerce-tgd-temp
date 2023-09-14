interface ProductCardSkeletonProps {
  qty?: 1 | 2 | 3 | 4 | 5;
}

export default function ProductCardSkeleton({ qty = 1 }: ProductCardSkeletonProps) {
  return (
    <div className="flex 2xl:items-center 2xl:justify-center overflow-x-hidden gap-2 xl:gap-3">
      {new Array(qty).fill(null).map((_, key) => {
        return (
          <div key={key} className="min-w-[245px] bg-white rounded-md p-4 border-1 border-[#f1f1f1] mx-auto">
            <div className="animate-pulse flex flex-col">
              <div className="rounded-md bg-slate-100 h-40 w-full"></div>
              <div className="space-y-2 mt-5">
                <div className="h-2 bg-slate-100 rounded"></div>
                <div className="h-2 bg-slate-100 rounded"></div>
                <div className="h-2 bg-slate-100 rounded"></div>
                <div className="grid grid-cols-5 gap-3">
                  <div className="h-2 bg-slate-100 rounded col-span-3"></div>
                  <div className="h-2 bg-slate-100 rounded col-span-2"></div>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <div className="h-2.5 w-24 bg-slate-100 rounded"></div>
              </div>

              <div className="space-y-2 mt-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-2.5 bg-slate-100 rounded col-span-2"></div>
                  <div className="h-2.5 bg-slate-100 rounded col-span-1"></div>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-28 bg-slate-100 rounded"></div>
                  <div className="h-8 w-8 bg-slate-100 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
