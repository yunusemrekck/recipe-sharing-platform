import Link from "next/link";
import { ArrowRight, Utensils, Cake, Leaf, Timer, Flame, Coffee } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Category {
  name: string;
  slug: string;
  icon: LucideIcon;
  color: string;
  count: number;
}

const categories: Category[] = [
  { name: "Main Dishes", slug: "main-dishes", icon: Utensils, color: "bg-terracotta-500", count: 3240 },
  { name: "Desserts", slug: "desserts", icon: Cake, color: "bg-pink-500", count: 2180 },
  { name: "Vegetarian", slug: "vegetarian", icon: Leaf, color: "bg-sage-500", count: 1850 },
  { name: "Quick & Easy", slug: "quick-easy", icon: Timer, color: "bg-amber-500", count: 2460 },
  { name: "Grilled", slug: "grilled", icon: Flame, color: "bg-orange-500", count: 980 },
  { name: "Breakfast", slug: "breakfast", icon: Coffee, color: "bg-yellow-600", count: 1320 },
];

export function CategorySection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-800 mb-2">
              Browse by Category
            </h2>
            <p className="text-charcoal-700/60 max-w-lg">
              Find exactly what you&apos;re craving from our curated collections
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden sm:flex items-center gap-2 text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group relative p-6 rounded-xl bg-cream-50 border border-cream-200 hover:border-cream-300 hover:shadow-lg hover:shadow-charcoal-900/5 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-charcoal-800 mb-1 group-hover:text-terracotta-500 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-charcoal-700/50">
                  {category.count.toLocaleString()} recipes
                </p>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors"
          >
            View All Categories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
