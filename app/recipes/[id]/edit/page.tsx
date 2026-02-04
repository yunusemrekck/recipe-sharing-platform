import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RecipeForm } from "@/components/RecipeForm";
import { getRecipeById } from "@/app/recipes/actions";
import { getUser } from "@/app/auth/actions";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    return { title: "Tarif Bulunamadı | Savora" };
  }

  return {
    title: `${recipe.title} Düzenle | Savora`,
    description: `${recipe.title} tarifini düzenleyin`,
  };
}

export default async function EditRecipePage({ params }: Props) {
  const { id } = await params;
  const [recipe, user] = await Promise.all([
    getRecipeById(id),
    getUser(),
  ]);

  if (!recipe) {
    notFound();
  }

  if (!user) {
    redirect(`/login?redirect=/recipes/${id}/edit`);
  }

  // Check ownership
  if (recipe.user_id !== user.id) {
    redirect(`/recipes/${id}`);
  }

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back Link */}
          <Link
            href={`/recipes/${id}`}
            className="inline-flex items-center gap-2 text-charcoal-700/60 hover:text-charcoal-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tarife Dön</span>
          </Link>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-800 mb-2">
              Tarifi Düzenle
            </h1>
            <p className="text-charcoal-700/60">
              {recipe.title}
            </p>
          </div>

          {/* Recipe Form */}
          <RecipeForm mode="edit" recipe={recipe} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
