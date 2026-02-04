import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChefHat } from "lucide-react";

export default function RecipeDetailLoading() {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back Link Skeleton */}
          <div className="h-5 w-32 bg-cream-200 rounded animate-pulse mb-6" />

          {/* Recipe Header Skeleton */}
          <div className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden mb-8">
            {/* Hero Image */}
            <div className="aspect-video bg-gradient-to-br from-cream-200 to-cream-100 flex items-center justify-center animate-pulse">
              <ChefHat className="w-24 h-24 text-cream-300" />
            </div>

            <div className="p-6 sm:p-8">
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                <div className="h-7 w-24 bg-cream-200 rounded-full animate-pulse" />
                <div className="h-7 w-16 bg-cream-200 rounded-full animate-pulse" />
              </div>

              {/* Title */}
              <div className="h-10 w-3/4 bg-cream-200 rounded-lg animate-pulse mb-4" />

              {/* Description */}
              <div className="space-y-2 mb-6">
                <div className="h-5 w-full bg-cream-100 rounded animate-pulse" />
                <div className="h-5 w-2/3 bg-cream-100 rounded animate-pulse" />
              </div>

              {/* Meta Info */}
              <div className="flex gap-6 mb-6 pb-6 border-b border-cream-100">
                <div className="h-5 w-24 bg-cream-200 rounded animate-pulse" />
                <div className="h-5 w-24 bg-cream-200 rounded animate-pulse" />
                <div className="h-5 w-32 bg-cream-200 rounded animate-pulse" />
              </div>

              {/* Author & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-cream-200 animate-pulse" />
                  <div>
                    <div className="h-3 w-16 bg-cream-200 rounded animate-pulse mb-2" />
                    <div className="h-5 w-28 bg-cream-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-11 h-11 bg-cream-200 rounded-lg animate-pulse" />
                  <div className="w-11 h-11 bg-cream-200 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6">
                <div className="h-7 w-28 bg-cream-200 rounded animate-pulse mb-4" />
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cream-300" />
                      <div className="h-4 bg-cream-100 rounded animate-pulse flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6 sm:p-8">
                <div className="h-7 w-24 bg-cream-200 rounded animate-pulse mb-6" />
                <div className="space-y-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-cream-200 animate-pulse flex-shrink-0" />
                      <div className="flex-1 space-y-2 pt-1">
                        <div className="h-4 bg-cream-100 rounded animate-pulse" />
                        <div className="h-4 bg-cream-100 rounded animate-pulse w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
