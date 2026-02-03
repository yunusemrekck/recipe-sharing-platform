import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/app/auth/actions";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardContent } from "@/components/DashboardContent";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";

export const metadata = {
  title: "Dashboard | Savora",
  description: "Your personal recipe dashboard",
};

export default async function DashboardPage() {
  const user = await getUser();

  // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
  if (!user) {
    redirect("/login?redirect=/dashboard");
  }

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent user={user} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}