import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, BookOpen, ArrowLeft, ChefHat } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RecipeCardDb } from "@/components/RecipeCardDb";
import { getProfileByUsername, getUserRecipes, getProfileStats, type PublicProfile } from "@/app/profile/actions";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const profile: PublicProfile | null = await getProfileByUsername(username);
  
  if (!profile) {
    return { title: "Profil Bulunamadı | Savora" };
  }

  const displayName = profile.full_name || profile.username || "Kullanıcı";
  
  return {
    title: `${displayName} | Savora`,
    description: profile.bio || `${displayName} profilini görüntüle`,
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  const profile: PublicProfile | null = await getProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const [recipes, stats] = await Promise.all([
    getUserRecipes(profile.id, 12),
    getProfileStats(profile.id),
  ]);

  const displayName = profile.full_name || profile.username || "Kullanıcı";
  const initials = displayName.slice(0, 2).toUpperCase();
  const memberSince = new Date(profile.created_at).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back Link */}
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 text-charcoal-700/60 hover:text-charcoal-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tariflere Dön</span>
          </Link>

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

          {/* Recipes Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-terracotta-500/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-terracotta-500" />
              </div>
              <h2 className="font-display text-2xl font-bold text-charcoal-800">
                {displayName} Tarifleri
              </h2>
            </div>

            {recipes.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cream-100 flex items-center justify-center">
                  <ChefHat className="w-10 h-10 text-charcoal-700/30" />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal-800 mb-2">
                  Henüz tarif yok
                </h3>
                <p className="text-charcoal-700/60">
                  Bu kullanıcı henüz tarif paylaşmamış.
                </p>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
