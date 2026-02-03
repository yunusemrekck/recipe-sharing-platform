export function DashboardSkeleton() {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Welcome Section Skeleton */}
        <div className="mb-12">
          <div className="mb-8">
            <div className="h-10 bg-cream-200 rounded-lg w-64 mb-2 animate-pulse" />
            <div className="h-6 bg-cream-200 rounded-lg w-48 animate-pulse" />
          </div>
  
          {/* Quick Stats Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-6 rounded-xl bg-white border border-cream-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-cream-200 animate-pulse" />
                  <div className="h-8 w-12 bg-cream-200 rounded animate-pulse" />
                </div>
                <div className="h-4 bg-cream-200 rounded w-20 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
  
        {/* Trending Recipes Skeleton */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-cream-200 animate-pulse" />
            <div>
              <div className="h-8 bg-cream-200 rounded w-40 mb-2 animate-pulse" />
              <div className="h-4 bg-cream-200 rounded w-32 animate-pulse" />
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-cream-200 rounded-xl mb-4" />
                <div className="h-4 bg-cream-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-cream-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </section>
  
        {/* Recent Recipes Skeleton */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-cream-200 animate-pulse" />
            <div>
              <div className="h-8 bg-cream-200 rounded w-40 mb-2 animate-pulse" />
              <div className="h-4 bg-cream-200 rounded w-32 animate-pulse" />
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-cream-200 rounded-xl mb-4" />
                <div className="h-4 bg-cream-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-cream-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }