import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getUser } from "@/app/auth/actions";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RecipeForm } from "@/components/RecipeForm";

export const metadata = {
  title: "Yeni Tarif | Savora",
  description: "Yeni bir tarif oluşturun ve topluluğumuzla paylaşın",
};

export default async function NewRecipePage() {
  const user = await getUser();

  if (!user) {
    redirect("/login?redirect=/recipes/new");
  }

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back Link */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-charcoal-700/60 hover:text-charcoal-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard&apos;a Dön</span>
          </Link>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-charcoal-800 mb-2">
              Yeni Tarif Oluştur
            </h1>
            <p className="text-charcoal-700/60">
              Lezzetli tarifinizi topluluğumuzla paylaşın
            </p>
          </div>

          {/* Recipe Form */}
          <RecipeForm mode="create" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
