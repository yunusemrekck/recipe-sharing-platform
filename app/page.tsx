import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { CategorySection } from "@/components/CategorySection";
import { CTASection } from "@/components/CTASection";
import { RecipeCard } from "@/components/RecipeCard";
import { sampleRecipes } from "@/lib/sample-data";
import Link from "next/link";
import { ArrowRight, TrendingUp, Clock } from "lucide-react";

export default function Home() {
  const featuredRecipe = sampleRecipes[0];
  const trendingRecipes = sampleRecipes.slice(1, 5);
  const recentRecipes = sampleRecipes.slice(4, 8);

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Featured Recipe Section */}
        <section className="py-12 lg:py-16 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-terracotta-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-terracotta-500" />
              </div>
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal-800">
                  Featured Recipe
                </h2>
                <p className="text-charcoal-700/60 text-sm">
                  Our editor&apos;s pick for this week
                </p>
              </div>
            </div>

            <RecipeCard recipe={featuredRecipe} featured />
          </div>
        </section>

        {/* Categories Section */}
        <CategorySection />

        {/* Trending Recipes */}
        <section className="py-12 lg:py-16 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-end justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-sage-600" />
                </div>
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal-800">
                    Trending Now
                  </h2>
                  <p className="text-charcoal-700/60 text-sm">
                    What the community is cooking
                  </p>
                </div>
              </div>
              <Link
                href="/recipes?sort=popular"
                className="hidden sm:flex items-center gap-2 text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors group"
              >
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingRecipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>

            {/* Mobile View All */}
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/recipes?sort=popular"
                className="inline-flex items-center gap-2 text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors"
              >
                View All Trending
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Recipes */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-end justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terracotta-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-terracotta-500" />
                </div>
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal-800">
                    Fresh from the Kitchen
                  </h2>
                  <p className="text-charcoal-700/60 text-sm">
                    Recently shared by our community
                  </p>
                </div>
              </div>
              <Link
                href="/recipes?sort=newest"
                className="hidden sm:flex items-center gap-2 text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors group"
              >
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentRecipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>

            {/* Mobile View All */}
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/recipes?sort=newest"
                className="inline-flex items-center gap-2 text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors"
              >
                View All New Recipes
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
