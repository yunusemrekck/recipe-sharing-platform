import { ChefHat } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          {/* Spinning circle */}
          <div className="absolute inset-0 rounded-full border-4 border-cream-200" />
          <div className="absolute inset-0 rounded-full border-4 border-terracotta-500 border-t-transparent animate-spin" />
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ChefHat className="w-8 h-8 text-terracotta-500" />
          </div>
        </div>
        <p className="text-charcoal-700/60 font-medium">Yükleniyor...</p>
      </div>
    </div>
  );
}
