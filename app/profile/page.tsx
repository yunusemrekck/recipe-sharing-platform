import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/app/auth/actions";
import { getProfile } from "@/app/profile/actions";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileContent } from "@/components/ProfileContent";
import { ProfileSkeleton } from "@/components/ProfileSkeleton";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Profilim | Savora",
  description: "Profil sayfanız - bilgilerinizi görüntüleyin ve düzenleyin",
};

function ProfileError() {
  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h1 className="font-display text-2xl font-bold text-charcoal-800 mb-4">
        Profil yüklenemedi
      </h1>
      <p className="text-charcoal-700/60 mb-6">
        Profiliniz yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin veya tekrar giriş yapın.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/profile"
          className="px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 rounded-xl font-medium transition-colors"
        >
          Sayfayı Yenile
        </Link>
        <Link
          href="/login"
          className="px-6 py-3 bg-cream-100 hover:bg-cream-200 text-charcoal-700 rounded-xl font-medium transition-colors"
        >
          Tekrar Giriş Yap
        </Link>
      </div>
    </div>
  );
}

async function ProfilePageContent() {
  const user = await getUser();

  if (!user) {
    redirect("/login?redirect=/profile");
  }

  // getProfile now auto-creates profile if it doesn't exist
  const profile = await getProfile();

  if (!profile) {
    return <ProfileError />;
  }

  return <ProfileContent user={user} profile={profile} />;
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfilePageContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
