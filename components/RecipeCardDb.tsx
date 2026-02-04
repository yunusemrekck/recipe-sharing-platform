"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, Users, ChefHat } from "lucide-react";
import type { RecipeWithAuthor } from "@/lib/types";
import { RECIPE_CATEGORIES } from "@/lib/types";

interface RecipeCardDbProps {
  recipe: RecipeWithAuthor;
  showAuthor?: boolean;
}

export function RecipeCardDb({ recipe, showAuthor = true }: RecipeCardDbProps) {
  const router = useRouter();
  const authorName = recipe.profiles?.full_name || recipe.profiles?.username || "Anonim Chef";
  const authorUsername = recipe.profiles?.username;
  
  // Get category label from RECIPE_CATEGORIES
  const categoryLabel = RECIPE_CATEGORIES.find(c => c.value === recipe.category)?.label || recipe.category;
  
  const difficultyColors = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (authorUsername) {
      router.push(`/profile/${authorUsername}`);
    }
  };

  return (
    <Link href={`/recipes/${recipe.id}`} className="group block">
      <article className="recipe-card h-full overflow-hidden rounded-xl bg-white border border-cream-200 shadow-sm hover:shadow-md transition-all duration-300">
        {/* Placeholder Image Area */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-terracotta-100 to-sage-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <ChefHat className="w-16 h-16 text-terracotta-300" />
          </div>
          
          {/* Difficulty Badge */}
          {recipe.difficulty && (
            <div className="absolute top-3 right-3">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${difficultyColors[recipe.difficulty]}`}>
                {recipe.difficulty === "easy" ? "Kolay" : recipe.difficulty === "medium" ? "Orta" : "Zor"}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display text-lg font-semibold text-charcoal-800 mb-2 group-hover:text-terracotta-500 transition-colors line-clamp-2">
            {recipe.title}
          </h3>

          {/* Category Badge */}
          {recipe.category && (
            <div className="mb-3">
              <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-sage-100 text-sage-700">
                {categoryLabel}
              </span>
            </div>
          )}

          {/* Meta */}
          <div className={`flex items-center gap-3 text-xs text-charcoal-700/50 ${showAuthor ? "mb-3 pb-3 border-b border-cream-100" : ""}`}>
            {recipe.cooking_time && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {recipe.cooking_time} dk
              </span>
            )}
          </div>

          {/* Author */}
          {showAuthor && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-terracotta-100 flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-terracotta-600" />
              </div>
              {authorUsername ? (
                <span
                  onClick={handleAuthorClick}
                  className="text-xs text-charcoal-700/70 hover:text-terracotta-500 truncate transition-colors cursor-pointer"
                >
                  {authorName}
                </span>
              ) : (
                <span className="text-xs text-charcoal-700/70 truncate">
                  {authorName}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
