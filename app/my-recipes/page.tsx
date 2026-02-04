import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, ChefHat, FileText, Eye, EyeOff } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RecipeCardDb } from "@/components/RecipeCardDb";
import { getMyRecipes } from "@/app/recipes/actions";
import { getUser } from "@/app/auth/actions";

export const metadata = {
  title: "Tariflerim | Savora",
  description: "Oluşturduğunuz ve yönettiğiniz tarifler",
};

export default async function MyRecipesPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login?redirect=/my-recipes");
  }

  const recipes = await getMyRecipes();

  const publishedRecipes = recipes.filter(r => r.is_published);
  const draftRecipes = recipes.filter(r => !r.is_published);

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-800 mb-2">
                Tariflerim
              </h1>
              <p className="text-charcoal-700/60">
                Oluşturduğunuz ve yönettiğiniz tarifler
              </p>
            </div>

            <Link
              href="/recipes/new"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 rounded-full font-medium transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Yeni Tarif
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-white rounded-xl border border-cream-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terracotta-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-terracotta-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-charcoal-800">{recipes.length}</p>
                  <p className="text-sm text-charcoal-700/60">Toplam Tarif</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-cream-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage-500/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-sage-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-charcoal-800">{publishedRecipes.length}</p>
                  <p className="text-sm text-charcoal-700/60">Yayında</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-cream-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <EyeOff className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-charcoal-800">{draftRecipes.length}</p>
                  <p className="text-sm text-charcoal-700/60">Taslak</p>
                </div>
              </div>
            </div>
          </div>

          {recipes.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cream-100 flex items-center justify-center">
                <ChefHat className="w-10 h-10 text-charcoal-700/30" />
              </div>
              <h3 className="font-display text-xl font-semibold text-charcoal-800 mb-2">
                Henüz tarif eklemediniz
              </h3>
              <p className="text-charcoal-700/60 mb-6">
                İlk tarifinizi oluşturarak başlayın!
              </p>
              <Link
                href="/recipes/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 rounded-full font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                İlk Tarifimi Oluştur
              </Link>
            </div>
          ) : (
            <>
              {/* Draft Recipes */}
              {draftRecipes.length > 0 && (
                <section className="mb-12">
                  <h2 className="font-display text-xl font-semibold text-charcoal-800 mb-4 flex items-center gap-2">
                    <EyeOff className="w-5 h-5 text-yellow-600" />
                    Taslaklar
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {draftRecipes.map((recipe) => (
                      <div key={recipe.id} className="relative">
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                            Taslak
                          </span>
                        </div>
                        <RecipeCardDb recipe={recipe} showAuthor={false} />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Published Recipes */}
              {publishedRecipes.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-semibold text-charcoal-800 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-sage-500" />
                    Yayındaki Tarifler
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {publishedRecipes.map((recipe, index) => (
                      <div
                        key={recipe.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <RecipeCardDb recipe={recipe} showAuthor={false} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
