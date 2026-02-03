"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Clock, 
  TrendingUp, 
  Sparkles, 
  BookOpen,
  ChefHat,
  Heart,
  Plus,
  ArrowRight
} from "lucide-react";
import type { RecipeWithAuthor } from "@/lib/types";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { RecipeCardDb } from "@/components/RecipeCardDb";

interface DashboardContentProps {
  user: User;
}

export function DashboardContent({ user }: DashboardContentProps) {
  const [recentRecipes, setRecentRecipes] = useState<RecipeWithAuthor[]>([]);
  const [trendingRecipes, setTrendingRecipes] = useState<RecipeWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    myRecipes: 0,
    favorites: 0,
    cooked: 0,
    totalLikes: 0,
  });

  useEffect(() => {
    const loadRecipes = async () => {
      const supabase = createClient();
      
      try {
        // Fetch recent recipes with author profiles
        const { data: recent } = await supabase
          .from("recipes")
          .select(`
            *,
            profiles:user_id (
              username,
              full_name
            )
          `)
          .order("created_at", { ascending: false })
          .limit(4);

        // Fetch trending recipes (for now, same as recent - you can add a likes system later)
        const { data: trending } = await supabase
          .from("recipes")
          .select(`
            *,
            profiles:user_id (
              username,
              full_name
            )
          `)
          .order("created_at", { ascending: false })
          .range(4, 7);

        // Fetch user's recipe count
        const { count: myRecipesCount } = await supabase
          .from("recipes")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        setRecentRecipes(recent || []);
        setTrendingRecipes(trending || []);
        setStats({
          myRecipes: myRecipesCount || 0,
          favorites: 0, // TODO: Implement favorites system
          cooked: 0,    // TODO: Implement cooked system
          totalLikes: 0, // TODO: Implement likes system
        });
      } catch (error) {
        console.error("Error loading recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, [user.id]);

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Chef';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Welcome Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-800 mb-2">
              Hoş geldin, {displayName}! 👋
            </h1>
            <p className="text-charcoal-700/60">
              Mutfağın seni bekliyor. Bugün ne pişiriyoruz?
            </p>
          </div>
          <Link
            href="/recipes/new"
            className="hidden sm:flex items-center gap-2 px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 rounded-full font-medium transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Tarif Ekle
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-xl bg-white border border-cream-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-terracotta-500/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-terracotta-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-charcoal-800">{stats.myRecipes}</p>
              </div>
            </div>
            <p className="text-sm text-charcoal-700/60">Tariflerim</p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-cream-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-charcoal-800">{stats.favorites}</p>
              </div>
            </div>
            <p className="text-sm text-charcoal-700/60">Favoriler</p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-cream-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-charcoal-800">{stats.cooked}</p>
              </div>
            </div>
            <p className="text-sm text-charcoal-700/60">Pişirdim</p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-cream-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-sage-500/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sage-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-charcoal-800">{stats.totalLikes}</p>
              </div>
            </div>
            <p className="text-sm text-charcoal-700/60">Toplam Beğeni</p>
          </div>
        </div>

        {/* Mobile Add Recipe Button */}
        <Link
          href="/recipes/new"
          className="sm:hidden mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 rounded-full font-medium transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Tarif Ekle
        </Link>
      </div>

      {/* Trending Recipes Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-terracotta-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-terracotta-500" />
            </div>
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal-800">
                Trend Tarifler
              </h2>
              <p className="text-sm text-charcoal-700/60">
                Bu hafta en çok beğenilenler
              </p>
            </div>
          </div>
          <Link
            href="/recipes?sort=popular"
            className="hidden sm:flex items-center gap-2 text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors group"
          >
            Tümünü Gör
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-cream-200 rounded-xl mb-4" />
                <div className="h-4 bg-cream-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-cream-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : trendingRecipes.length === 0 ? (
          <div className="text-center py-12 text-charcoal-700/60">
            Henüz tarif yok. İlk tarifi sen ekle!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <RecipeCardDb recipe={recipe} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/recipes?sort=popular"
            className="inline-flex items-center gap-2 text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors"
          >
            Tümünü Gör
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Recent Recipes Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sage-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-sage-500" />
            </div>
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal-800">
                Yeni Tarifler
              </h2>
              <p className="text-sm text-charcoal-700/60">
                Topluluktan yeni eklenenler
              </p>
            </div>
          </div>
          <Link
            href="/recipes?sort=newest"
            className="hidden sm:flex items-center gap-2 text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors group"
          >
            Tümünü Gör
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-cream-200 rounded-xl mb-4" />
                <div className="h-4 bg-cream-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-cream-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : recentRecipes.length === 0 ? (
          <div className="text-center py-12 text-charcoal-700/60">
            Henüz tarif yok. İlk tarifi sen ekle!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <RecipeCardDb recipe={recipe} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/recipes?sort=newest"
            className="inline-flex items-center gap-2 text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors"
          >
            Tümünü Gör
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}