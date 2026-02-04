"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calendar, 
  BookOpen, 
  Heart,
  Settings,
  ArrowRight,
  ChefHat
} from "lucide-react";
import type { Profile, RecipeWithAuthor } from "@/lib/types";
import type { User } from "@supabase/supabase-js";
import { ProfileForm } from "@/components/ProfileForm";
import { RecipeCardDb } from "@/components/RecipeCardDb";
import { createClient } from "@/lib/supabase/client";

interface ProfileContentProps {
  user: User;
  profile: Profile;
}

type TabType = "recipes" | "settings";

export function ProfileContent({ user, profile }: ProfileContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>("recipes");
  const [recipes, setRecipes] = useState<RecipeWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    recipeCount: 0,
    likesReceived: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();
      
      try {
        // Fetch user's recipes
        const { data: userRecipes, count } = await supabase
          .from("recipes")
          .select(`
            *,
            profiles:user_id (
              username,
              full_name
            )
          `, { count: "exact" })
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        setRecipes(userRecipes || []);
        setStats({
          recipeCount: count || 0,
          likesReceived: 0, // TODO: Implement likes system
        });
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user.id]);

  const displayName = profile.full_name || profile.username || user.email?.split("@")[0] || "Şef";
  const initials = displayName.slice(0, 2).toUpperCase();
  const memberSince = new Date(profile.created_at).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden mb-8">
        {/* Cover / Banner */}
        <div className="h-32 bg-gradient-to-r from-terracotta-400 via-terracotta-500 to-sage-500" />
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-16">
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-terracotta-500 border-4 border-white shadow-lg flex items-center justify-center text-cream-50 font-display text-3xl sm:text-4xl font-bold">
              {initials}
            </div>
            
            {/* Name & Info */}
            <div className="flex-1 pb-2">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-800">
                {displayName}
              </h1>
              {profile.username && (
                <p className="text-charcoal-700/60">@{profile.username}</p>
              )}
            </div>

            {/* Stats (Desktop) */}
            <div className="hidden sm:flex items-center gap-6 pb-2">
              <div className="text-center">
                <p className="text-2xl font-bold text-charcoal-800">{stats.recipeCount}</p>
                <p className="text-sm text-charcoal-700/60">Tarif</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-charcoal-800">{stats.likesReceived}</p>
                <p className="text-sm text-charcoal-700/60">Beğeni</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="mt-4 text-charcoal-700 max-w-2xl">
              {profile.bio}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-charcoal-700/60">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{memberSince}&apos;dan beri üye</span>
            </div>
          </div>

          {/* Stats (Mobile) */}
          <div className="flex sm:hidden items-center gap-6 mt-4 pt-4 border-t border-cream-100">
            <div className="text-center flex-1">
              <p className="text-xl font-bold text-charcoal-800">{stats.recipeCount}</p>
              <p className="text-sm text-charcoal-700/60">Tarif</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-xl font-bold text-charcoal-800">{stats.likesReceived}</p>
              <p className="text-sm text-charcoal-700/60">Beğeni</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-cream-100 rounded-xl mb-8">
        <button
          onClick={() => setActiveTab("recipes")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
            activeTab === "recipes"
              ? "bg-white text-charcoal-800 shadow-sm"
              : "text-charcoal-700/60 hover:text-charcoal-700"
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Tariflerim</span>
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
            activeTab === "settings"
              ? "bg-white text-charcoal-800 shadow-sm"
              : "text-charcoal-700/60 hover:text-charcoal-700"
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Ayarlar</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "recipes" && (
        <div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-cream-200 rounded-xl mb-4" />
                  <div className="h-4 bg-cream-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-cream-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cream-100 flex items-center justify-center">
                <ChefHat className="w-10 h-10 text-charcoal-700/30" />
              </div>
              <h3 className="font-display text-xl font-semibold text-charcoal-800 mb-2">
                Henüz tarif eklemediniz
              </h3>
              <p className="text-charcoal-700/60 mb-6">
                İlk tarifinizi ekleyerek başlayın!
              </p>
              <Link
                href="/recipes/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 rounded-full font-medium transition-colors"
              >
                <span>Tarif Ekle</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe, index) => (
                  <div
                    key={recipe.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <RecipeCardDb recipe={recipe} showAuthor={false} />
                  </div>
                ))}
              </div>

              {recipes.length >= 6 && (
                <div className="mt-8 text-center">
                  <Link
                    href="/my-recipes"
                    className="inline-flex items-center gap-2 text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors"
                  >
                    Tüm Tariflerimi Gör
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-charcoal-800 mb-2">
              Profil Ayarları
            </h2>
            <p className="text-charcoal-700/60">
              Profil bilgilerinizi güncelleyin
            </p>
          </div>

          <ProfileForm profile={profile} email={user.email || ""} />
        </div>
      )}
    </div>
  );
}
