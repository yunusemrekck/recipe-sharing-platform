import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileSkeleton } from "@/components/ProfileSkeleton";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <ProfileSkeleton />
      </main>
      <Footer />
    </div>
  );
}
