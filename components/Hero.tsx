import Link from "next/link";
import { Search, ArrowRight, Sparkles } from "lucide-react";

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
          <p className="text-lg sm:text-xl text-charcoal-700/70 mb-8 max-w-2xl mx-auto animate-slide-up stagger-1 leading-relaxed">
            Discover delicious recipes from home cooks around the world, or share your own culinary creations with a community that celebrates good food.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8 animate-slide-up stagger-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-terracotta-400/20 to-sage-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center bg-white rounded-full border border-cream-300 shadow-lg shadow-charcoal-900/5 overflow-hidden">
                <Search className="w-5 h-5 ml-5 text-charcoal-700/40" />
                <input
                  type="text"
                  placeholder="Search for any recipe..."
                  className="flex-1 px-4 py-4 text-charcoal-800 placeholder:text-charcoal-700/40 outline-none bg-transparent"
                />
                <button className="btn-primary m-1.5 px-6 py-3 bg-terracotta-500 text-cream-50 rounded-full font-medium hover:bg-terracotta-600 flex items-center gap-2">
                  Search
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-slide-up stagger-3">
            <span className="text-sm text-charcoal-700/50">Popular:</span>
            {["Pasta", "Desserts", "Vegetarian", "Quick Meals", "Baking"].map(
              (tag) => (
                <Link
                  key={tag}
                  href={`/recipes?tag=${tag.toLowerCase()}`}
                  className="px-3.5 py-1.5 text-sm font-medium rounded-full bg-white/80 border border-cream-300/50 text-charcoal-700 hover:bg-terracotta-500 hover:text-cream-50 hover:border-terracotta-500 transition-all"
                >
                  {tag}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in stagger-4">
          {[
            { value: "15K+", label: "Recipes" },
            { value: "10K+", label: "Home Cooks" },
            { value: "50K+", label: "Bookmarks" },
            { value: "4.9", label: "Avg Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl lg:text-4xl font-bold text-terracotta-500 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-charcoal-700/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
