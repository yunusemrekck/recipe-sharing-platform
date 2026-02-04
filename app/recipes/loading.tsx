import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function RecipesLoading() {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Page Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="h-10 w-48 bg-cream-200 rounded-lg animate-pulse mb-2" />
              <div className="h-5 w-72 bg-cream-200 rounded animate-pulse" />
            </div>
            <div className="h-12 w-36 bg-cream-200 rounded-full animate-pulse" />
          </div>

          {/* Filters Skeleton */}
          <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-4 sm:p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 h-12 bg-cream-100 rounded-xl animate-pulse" />
              <div className="h-12 w-40 bg-cream-100 rounded-xl animate-pulse" />
              <div className="h-12 w-40 bg-cream-100 rounded-xl animate-pulse" />
              <div className="h-12 w-32 bg-cream-100 rounded-xl animate-pulse" />
              <div className="h-12 w-28 bg-charcoal-200 rounded-xl animate-pulse" />
            </div>
          </div>

          {/* Results Info Skeleton */}
          <div className="h-5 w-32 bg-cream-200 rounded animate-pulse mb-6" />

          {/* Recipe Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-cream-200 overflow-hidden">
                <div className="aspect-[4/3] bg-cream-200 animate-pulse" />
                <div className="p-4">
                  <div className="h-6 bg-cream-200 rounded w-3/4 animate-pulse mb-3" />
                  <div className="h-5 bg-cream-100 rounded-full w-20 animate-pulse mb-3" />
                  <div className="h-4 bg-cream-100 rounded w-16 animate-pulse mb-3 pb-3 border-b border-cream-100" />
                  <div className="flex items-center gap-2 pt-1">
                    <div className="w-6 h-6 rounded-full bg-cream-200 animate-pulse" />
                    <div className="h-3 bg-cream-200 rounded w-24 animate-pulse" />
                  </div>
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
