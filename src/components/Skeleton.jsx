export function SkeletonBox({ className = '' }) {
  return <div className={`bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse ${className}`} />
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 space-y-3">
      <SkeletonBox className="h-4 w-1/3" />
      <SkeletonBox className="h-3 w-full" />
      <SkeletonBox className="h-3 w-4/5" />
      <SkeletonBox className="h-10 w-full rounded-2xl mt-2" />
    </div>
  )
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <SkeletonBox className="w-11 h-11 rounded-2xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonBox className="h-3 w-3/4" />
            <SkeletonBox className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
