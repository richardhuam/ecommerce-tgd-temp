export default function ProductCategoryCardSkeleton() {
  return (
    <>
      {new Array(3).fill(null).map((_, key) => {
        return (
          <div
            key={key}
            className="h-[155px] w-full md:h-[170px] lg:h-[190px] xl:h-[195px] animate-pulse bg-white rounded-md p-3 border-1 border-[#f1f1f1]"
          >
            <div className="flex items-start justify-between h-full gap-4">
              <div className="flex items-start justify-around h-full flex-col w-full">
                <div className="space-y-3 w-full">
                  <div className="h-4 bg-slate-100 rounded"></div>
                  <div className="h-4 bg-slate-100 rounded"></div>
                  <div className="h-4 bg-slate-100 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-10 w-40 bg-slate-100 rounded"></div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-28 w-28 bg-slate-100 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
