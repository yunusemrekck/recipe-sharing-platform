import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 noise-overlay">
        <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-50 to-cream-200/50" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-terracotta-400/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-sage-400/10 blur-3xl" />
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-cream-400/30 blur-2xl animate-float" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-cream-300/50 shadow-sm mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-terracotta-500" />
            <span className="text-sm font-medium text-charcoal-700">
              Join 10,000+ home cooks sharing recipes
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal-800 mb-6 animate-slide-up leading-tight">
            Where Every Recipe{" "}
            <span className="relative">
              <span className="text-terracotta-500">Tells a Story</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8.5C50 2.5 150 2.5 198 8.5"
                  stroke="#D97B4C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="opacity-40"
                />
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-charcoal-700/70 mb-10 max-w-2xl mx-auto animate-slide-up stagger-1 leading-relaxed">
            Discover delicious recipes from home cooks around the world, or share your own culinary creations with a community that celebrates good food.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-2">
            <Link
              href="/signup"
              className="btn-primary w-full sm:w-auto px-8 py-4 bg-terracotta-500 text-cream-50 rounded-full font-semibold hover:bg-terracotta-600 shadow-lg shadow-terracotta-500/20 transition-all flex items-center justify-center gap-2"
            >
              Start Creating
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-white border border-cream-300 text-charcoal-700 rounded-full font-semibold hover:bg-cream-50 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}