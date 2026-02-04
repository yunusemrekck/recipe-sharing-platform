import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  ChefHat, 
  Pencil, 
  Calendar
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RecipeActions } from "@/components/RecipeActions";
import { DeleteRecipeButton } from "@/components/DeleteRecipeButton";
import { getRecipeById } from "@/app/recipes/actions";
import { getUser } from "@/app/auth/actions";
import { RECIPE_CATEGORIES, DIFFICULTY_LEVELS } from "@/lib/types";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    return { title: "Tarif Bulunamadı | Savora" };
  }

  return {
    title: `${recipe.title} | Savora`,
    description: recipe.description || `${recipe.title} tarifi - Savora'da keşfedin`,
  };
}

export default async function RecipeDetailPage({ params }: Props) {
  const { id } = await params;
  const [recipe, user] = await Promise.all([
    getRecipeById(id),
    getUser(),
  ]);

  if (!recipe) {
    notFound();
  }

  const isOwner = user?.id === recipe.user_id;
  const authorName = recipe.profiles?.full_name || recipe.profiles?.username || "Anonim Şef";
  const authorUsername = recipe.profiles?.username;

  const categoryLabel = RECIPE_CATEGORIES.find(c => c.value === recipe.category)?.label;
  const difficultyInfo = DIFFICULTY_LEVELS.find(d => d.value === recipe.difficulty);

  const createdDate = new Date(recipe.created_at).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Use the new list fields, or fallback to splitting the text
  const ingredients = recipe.ingredients_list?.length 
    ? recipe.ingredients_list 
    : recipe.ingredients.split("\n").filter(Boolean);
  
  const instructions = recipe.instructions_list?.length 
    ? recipe.instructions_list 
    : recipe.instructions.split("\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back Link */}
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 text-charcoal-700/60 hover:text-charcoal-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tariflere Dön</span>
          </Link>

          {/* Recipe Header */}
          <div className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden mb-8">
            {/* Hero Image Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-terracotta-100 to-sage-100 flex items-center justify-center">
              <ChefHat className="w-24 h-24 text-terracotta-300" />
            </div>

            <div className="p-6 sm:p-8">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categoryLabel && (
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-sage-100 text-sage-700">
                    {categoryLabel}
                  </span>
                )}
                {difficultyInfo && (
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${difficultyInfo.color}`}>
                    {difficultyInfo.label}
                  </span>
                )}
                {!recipe.is_published && (
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-700">
                    Taslak
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-800 mb-4">
                {recipe.title}
              </h1>

              {/* Description */}
              {recipe.description && (
                <p className="text-lg text-charcoal-700/80 mb-6">
                  {recipe.description}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-charcoal-700/60 mb-6 pb-6 border-b border-cream-100">
                {recipe.cooking_time && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{recipe.cooking_time} dakika</span>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{recipe.servings} porsiyon</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{createdDate}</span>
                </div>
              </div>

              {/* Author & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-terracotta-500 flex items-center justify-center text-cream-50 font-medium">
                    {authorName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm text-charcoal-700/60">Tarif sahibi</p>
                    {authorUsername ? (
                      <Link 
                        href={`/profile/${authorUsername}`}
                        className="font-medium text-charcoal-800 hover:text-terracotta-500 transition-colors"
                      >
                        {authorName}
                      </Link>
                    ) : (
                      <p className="font-medium text-charcoal-800">{authorName}</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <RecipeActions />
                  {isOwner && (
                    <>
                      <DeleteRecipeButton 
                        recipeId={recipe.id} 
                        recipeTitle={recipe.title}
                        variant="icon"
                      />
                      <Link
                        href={`/recipes/${recipe.id}/edit`}
                        className="flex items-center gap-2 px-4 py-2 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 rounded-lg font-medium transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                        Düzenle
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6 sticky top-24">
                <h2 className="font-display text-xl font-semibold text-charcoal-800 mb-4">
                  Malzemeler
                </h2>
                <ul className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-terracotta-500 mt-2 flex-shrink-0" />
                      <span className="text-charcoal-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-charcoal-800 mb-6">
                  Yapılışı
                </h2>
                <ol className="space-y-6">
                  {instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-terracotta-500 text-cream-50 flex items-center justify-center font-medium text-sm">
                        {index + 1}
                      </div>
                      <p className="text-charcoal-700 pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
