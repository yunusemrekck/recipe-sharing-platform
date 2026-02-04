import { Loader2 } from "lucide-react";

export function ProfileSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Profile Header Skeleton */}
      <div className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden mb-8 animate-pulse">
        {/* Cover */}
        <div className="h-32 bg-cream-200" />
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-16">
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-cream-300 border-4 border-white" />
            
            {/* Name & Info */}
            <div className="flex-1 pb-2">
              <div className="h-8 bg-cream-200 rounded w-48 mb-2" />
              <div className="h-4 bg-cream-200 rounded w-32" />
            </div>

            {/* Stats */}
            <div className="hidden sm:flex items-center gap-6 pb-2">
              <div className="text-center">
                <div className="h-8 w-12 bg-cream-200 rounded mb-1" />
                <div className="h-3 w-10 bg-cream-200 rounded" />
              </div>
              <div className="text-center">
                <div className="h-8 w-12 bg-cream-200 rounded mb-1" />
                <div className="h-3 w-10 bg-cream-200 rounded" />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-cream-100 rounded w-full max-w-lg" />
            <div className="h-4 bg-cream-100 rounded w-3/4 max-w-md" />
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 mt-4">
            <div className="h-4 bg-cream-100 rounded w-40" />
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-1 p-1 bg-cream-100 rounded-xl mb-8">
        <div className="flex-1 h-12 bg-cream-200 rounded-lg" />
        <div className="flex-1 h-12 bg-cream-200 rounded-lg" />
      </div>

      {/* Content Loading */}
      <div className="flex justify-center py-16">
        <Loader2 className="w-8 h-8 text-terracotta-500 animate-spin" />
      </div>
    </div>
  );
}
