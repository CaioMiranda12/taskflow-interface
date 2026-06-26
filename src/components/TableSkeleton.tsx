import { Skeleton } from "@/components/Skeleton";

export function TableSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex gap-4 px-6 py-3 border-b border-slate-200 bg-slate-50">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex gap-4 px-6 py-4 border-b border-slate-100">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>
      ))}
    </div>
  );
}