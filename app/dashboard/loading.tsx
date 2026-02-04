import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Welcome Section Skeleton */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="h-10 w-72 bg-cream-200 rounded-lg animate-pulse mb-2" />
                <div className="h-5 w-56 bg-cream-200 rounded animate-pulse" />
              </div>
              <div className="hidden sm:block h-12 w-36 bg-cream-200 rounded-full animate-pulse" />
            </div>

            {/* Quick Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-6 rounded-xl bg-white border border-cream-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-cream-200 animate-pulse" />
                    <div className="h-8 w-12 bg-cream-200 rounded animate-pulse" />
                  </div>
                  <div className="h-4 w-20 bg-cream-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Trending Section Skeleton */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-cream-200 animate-pulse" />
              <div>
                <div className="h-8 w-40 bg-cream-200 rounded-lg animate-pulse mb-1" />
                <div className="h-4 w-48 bg-cream-200 rounded animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-cream-200 overflow-hidden">
                  <div className="aspect-[4/3] bg-cream-200 animate-pulse" />
                  <div className="p-4">
                    <div className="h-5 bg-cream-200 rounded w-3/4 animate-pulse mb-2" />
                    <div className="h-4 bg-cream-100 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Section Skeleton */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-cream-200 animate-pulse" />
              <div>
                <div className="h-8 w-36 bg-cream-200 rounded-lg animate-pulse mb-1" />
                <div className="h-4 w-52 bg-cream-200 rounded animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-cream-200 overflow-hidden">
                  <div className="aspect-[4/3] bg-cream-200 animate-pulse" />
                  <div className="p-4">
                    <div className="h-5 bg-cream-200 rounded w-3/4 animate-pulse mb-2" />
                    <div className="h-4 bg-cream-100 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
