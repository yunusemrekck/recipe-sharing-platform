import Link from "next/link";
import Image from "next/image";
import { Clock, Users, Heart, Bookmark } from "lucide-react";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  likes: number;
}

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
}

export function RecipeCard({ recipe, featured = false }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  if (featured) {
    return (
      <Link href={`/recipes/${recipe.id}`} className="group block">
        <article className="recipe-card relative overflow-hidden rounded-2xl bg-white border border-cream-200 shadow-sm">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
              <Image
                src={recipe.coverImage}
                alt={recipe.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:hidden" />
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8 flex flex-col justify-center">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {recipe.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="tag-chip px-3 py-1 text-xs font-medium rounded-full bg-sage-300/40 text-sage-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-display text-2xl lg:text-3xl font-semibold text-charcoal-800 mb-3 group-hover:text-terracotta-500 transition-colors">
                {recipe.title}
              </h3>

              <p className="text-charcoal-700/70 mb-4 line-clamp-2 leading-relaxed">
                {recipe.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-charcoal-700/60 mb-5">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {totalTime} min
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {recipe.servings} servings
                </span>
              </div>

              {/* Author & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-cream-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-cream-200">
                    <Image
                      src={recipe.author.avatar}
                      alt={recipe.author.name}
                      width={36}
                      height={36}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-charcoal-700">
                    {recipe.author.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="p-2 text-charcoal-700/50 hover:text-terracotta-500 transition-colors"
                    aria-label="Like recipe"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-charcoal-700/50 hover:text-terracotta-500 transition-colors"
                    aria-label="Bookmark recipe"
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/recipes/${recipe.id}`} className="group block">
      <article className="recipe-card h-full overflow-hidden rounded-xl bg-white border border-cream-200 shadow-sm">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={recipe.coverImage}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-charcoal-700/70 hover:text-terracotta-500 hover:bg-white transition-all"
              aria-label="Bookmark recipe"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          {/* Tags Overlay */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {recipe.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/90 backdrop-blur-sm text-charcoal-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display text-lg font-semibold text-charcoal-800 mb-1.5 group-hover:text-terracotta-500 transition-colors line-clamp-1">
            {recipe.title}
          </h3>

          <p className="text-sm text-charcoal-700/60 mb-3 line-clamp-2">
            {recipe.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-charcoal-700/50 mb-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {totalTime} min
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {recipe.servings}
            </span>
            <span className="flex items-center gap-1 ml-auto">
              <Heart className="w-3.5 h-3.5" />
              {recipe.likes}
            </span>
          </div>

          {/* Author */}
          <div className="flex items-center gap-2 pt-3 border-t border-cream-100">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-cream-200">
              <Image
                src={recipe.author.avatar}
                alt={recipe.author.name}
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
            <span className="text-xs text-charcoal-700/70">
              {recipe.author.name}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
