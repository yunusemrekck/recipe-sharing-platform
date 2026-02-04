import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NewRecipeLoading() {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back Link Skeleton */}
          <div className="h-5 w-36 bg-cream-200 rounded animate-pulse mb-6" />

          {/* Page Header Skeleton */}
          <div className="mb-8">
            <div className="h-10 w-64 bg-cream-200 rounded-lg animate-pulse mb-2" />
            <div className="h-5 w-80 bg-cream-200 rounded animate-pulse" />
          </div>

          {/* Form Skeleton */}
          <div className="space-y-8">
            {/* Basic Info Section */}
            <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6">
              <div className="h-7 w-32 bg-cream-200 rounded animate-pulse mb-6" />
              <div className="space-y-5">
                <div>
                  <div className="h-4 w-24 bg-cream-200 rounded animate-pulse mb-2" />
                  <div className="h-12 w-full bg-cream-100 rounded-xl animate-pulse" />
                </div>
                <div>
                  <div className="h-4 w-28 bg-cream-200 rounded animate-pulse mb-2" />
                  <div className="h-24 w-full bg-cream-100 rounded-xl animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <div className="h-4 w-20 bg-cream-200 rounded animate-pulse mb-2" />
                    <div className="h-12 w-full bg-cream-100 rounded-xl animate-pulse" />
                  </div>
                  <div>
                    <div className="h-4 w-28 bg-cream-200 rounded animate-pulse mb-2" />
                    <div className="h-12 w-full bg-cream-100 rounded-xl animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="h-7 w-28 bg-cream-200 rounded animate-pulse" />
                <div className="h-9 w-32 bg-cream-100 rounded-lg animate-pulse" />
              </div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-cream-200 rounded animate-pulse" />
                    <div className="h-12 flex-1 bg-cream-100 rounded-xl animate-pulse" />
                    <div className="w-10 h-10 bg-cream-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions Section */}
            <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="h-7 w-36 bg-cream-200 rounded animate-pulse" />
                <div className="h-9 w-28 bg-cream-100 rounded-lg animate-pulse" />
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-cream-200 animate-pulse flex-shrink-0" />
                    <div className="h-20 flex-1 bg-cream-100 rounded-xl animate-pulse" />
                    <div className="w-10 h-10 bg-cream-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button Skeleton */}
            <div className="flex gap-4">
              <div className="flex-1 h-14 bg-cream-300 rounded-xl animate-pulse" />
              <div className="h-14 w-24 bg-cream-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
