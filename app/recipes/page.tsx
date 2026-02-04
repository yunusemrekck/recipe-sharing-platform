import { Suspense } from "react";
import Link from "next/link";
import { Plus, Search, SlidersHorizontal, ChefHat } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RecipeCardDb } from "@/components/RecipeCardDb";
import { getRecipes } from "@/app/recipes/actions";
import { getUser } from "@/app/auth/actions";
import { RECIPE_CATEGORIES, DIFFICULTY_LEVELS } from "@/lib/types";

export const metadata = {
  title: "Tarifler | Savora",
  description: "Topluluğumuzun paylaştığı lezzetli tarifleri keşfedin",
};

interface RecipesPageProps {
  searchParams: Promise<{
    category?: string;
    difficulty?: string;
    search?: string;
    sort?: string;
    page?: string;
  }>;
}

function RecipesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/3] bg-cream-200 rounded-xl mb-4" />
          <div className="h-5 bg-cream-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-cream-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

async function RecipesContent({ searchParams }: RecipesPageProps) {
  const params = await searchParams;
  const { category, difficulty, search, sort, page } = params;
  
  const currentPage = parseInt(page || "1");
  const limit = 12;
  const offset = (currentPage - 1) * limit;

  const { recipes, count } = await getRecipes({
    category,
    difficulty,
    search,
    sortBy: (sort as "newest" | "oldest" | "popular") || "newest",
    limit,
    offset,
  });

  const totalPages = Math.ceil(count / limit);

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cream-100 flex items-center justify-center">
          <ChefHat className="w-10 h-10 text-charcoal-700/30" />
        </div>
        <h3 className="font-display text-xl font-semibold text-charcoal-800 mb-2">
          Tarif bulunamadı
        </h3>
        <p className="text-charcoal-700/60 mb-6">
          {search 
            ? `"${search}" için sonuç bulunamadı` 
            : "Bu filtrelere uygun tarif yok"}
        </p>
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 rounded-full font-medium transition-colors"
        >
          Tüm Tarifleri Gör
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Results Info */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-charcoal-700/60">
          {count} tarif bulundu
        </p>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe, index) => (
          <div
            key={recipe.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <RecipeCardDb recipe={recipe} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          {currentPage > 1 && (
            <Link
              href={{
                pathname: "/recipes",
                query: { ...params, page: currentPage - 1 },
              }}
              className="px-4 py-2 bg-white border border-cream-200 rounded-lg text-charcoal-700 hover:bg-cream-50 transition-colors"
            >
              Önceki
            </Link>
          )}
          
          <span className="px-4 py-2 text-charcoal-700">
            Sayfa {currentPage} / {totalPages}
          </span>

          {currentPage < totalPages && (
            <Link
              href={{
                pathname: "/recipes",
                query: { ...params, page: currentPage + 1 },
              }}
              className="px-4 py-2 bg-white border border-cream-200 rounded-lg text-charcoal-700 hover:bg-cream-50 transition-colors"
            >
              Sonraki
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const user = await getUser();
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-800 mb-2">
                Tarifler
              </h1>
              <p className="text-charcoal-700/60">
                Topluluğumuzun paylaştığı lezzetli tarifleri keşfedin
              </p>
            </div>

            {user && (
              <Link
                href="/recipes/new"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 rounded-full font-medium transition-colors shadow-sm"
              >
                <Plus className="w-5 h-5" />
                Tarif Ekle
              </Link>
            )}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-4 sm:p-6 mb-8">
            <form className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-700/40" />
                <input
                  type="text"
                  name="search"
                  defaultValue={params.search}
                  placeholder="Tarif veya malzeme ara..."
                  className="w-full pl-12 pr-4 py-3 bg-cream-50 border border-cream-200 rounded-xl text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors"
                />
              </div>

              {/* Category Filter */}
              <select
                name="category"
                defaultValue={params.category || "all"}
                className="px-4 py-3 bg-cream-50 border border-cream-200 rounded-xl text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors"
              >
                <option value="all">Tüm Kategoriler</option>
                {RECIPE_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>

              {/* Difficulty Filter */}
              <select
                name="difficulty"
                defaultValue={params.difficulty || "all"}
                className="px-4 py-3 bg-cream-50 border border-cream-200 rounded-xl text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors"
              >
                <option value="all">Tüm Zorluklar</option>
                {DIFFICULTY_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                name="sort"
                defaultValue={params.sort || "newest"}
                className="px-4 py-3 bg-cream-50 border border-cream-200 rounded-xl text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors"
              >
                <option value="newest">En Yeni</option>
                <option value="oldest">En Eski</option>
              </select>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-charcoal-800 hover:bg-charcoal-900 text-cream-50 rounded-xl font-medium transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filtrele
              </button>
            </form>
          </div>

          {/* Recipes List */}
          <Suspense fallback={<RecipesSkeleton />}>
            <RecipesContent searchParams={searchParams} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
