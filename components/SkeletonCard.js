export default function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow">
      <div className="skeleton h-56 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
        <div className="flex gap-2 mt-4">
          <div className="skeleton h-8 w-20 rounded-full" />
          <div className="skeleton h-8 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}
