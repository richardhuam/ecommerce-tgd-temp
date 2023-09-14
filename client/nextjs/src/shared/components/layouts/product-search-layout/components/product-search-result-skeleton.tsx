import Paper from '@/shared/components/ui/paper';

export default function ProductSearchResultSkeleton() {
  return (
    <Paper padding="custom" className="p-4 lg:p-6">
      {new Array(7).fill(null).map((_, key) => {
        return (
          <div key={key} className="">
            <div className="animate-pulse flex pb-4">
              <div className="rounded-md bg-slate-100 h-40 w-40"></div>
              <div className="ml-4 space-y-2 flex-grow">
                <div className="h-3 bg-slate-100 rounded"></div>
                <div className="h-3 bg-slate-100 rounded"></div>
                <div className="h-3 bg-slate-100 rounded"></div>
                <div className="h-3 bg-slate-100 rounded"></div>
                <div className="pt-5 grid grid-cols-5 gap-3">
                  <div className="h-3 bg-slate-100 rounded col-span-3"></div>
                  <div className="h-3 bg-slate-100 rounded col-span-2"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Paper>
  );
}
