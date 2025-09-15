export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="h-10 bg-secondary-200 rounded mb-4 w-1/3"></div>
        <div className="h-4 bg-secondary-200 rounded mb-8 w-2/3"></div>
        
        {/* Stats grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-secondary-200 rounded mb-2 w-16"></div>
                  <div className="h-8 bg-secondary-200 rounded w-12"></div>
                </div>
                <div className="w-12 h-12 bg-secondary-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Content grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="card p-6">
              <div className="h-6 bg-secondary-200 rounded mb-4 w-1/2"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
                    <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}