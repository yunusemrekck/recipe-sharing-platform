import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function MyRecipesLoading() {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Page Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="h-10 w-40 bg-cream-200 rounded-lg animate-pulse mb-2" />
              <div className="h-5 w-64 bg-cream-200 rounded animate-pulse" />
            </div>
            <div className="h-12 w-32 bg-cream-200 rounded-full animate-pulse" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 bg-white rounded-xl border border-cream-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cream-200 animate-pulse" />
                  <div>
                    <div className="h-7 w-8 bg-cream-200 rounded animate-pulse mb-1" />
                    <div className="h-4 w-20 bg-cream-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recipe Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-cream-200 overflow-hidden">
                <div className="aspect-[4/3] bg-cream-200 animate-pulse" />
                <div className="p-4">
                  <div className="h-6 bg-cream-200 rounded w-3/4 animate-pulse mb-3" />
                  <div className="h-5 bg-cream-100 rounded-full w-20 animate-pulse mb-3" />
                  <div className="h-4 bg-cream-100 rounded w-16 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
