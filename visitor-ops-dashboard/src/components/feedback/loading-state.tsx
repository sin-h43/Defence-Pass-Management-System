import { Skeleton } from "@/components/ui/skeleton";

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-sm border border-border bg-card p-4">
          <Skeleton className="h-10 w-10 rounded-sm bg-secondary" />
          <Skeleton className="mt-3 h-4 w-3/4 bg-secondary" />
          <Skeleton className="mt-2 h-3 w-1/2 bg-secondary" />
          <Skeleton className="mt-4 h-8 w-full bg-secondary" />
        </div>
      ))}
    </>
  );
}
