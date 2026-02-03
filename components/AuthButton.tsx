import Link from "next/link";
import { BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "./UserMenu";

export async function AuthButton() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="hidden lg:block text-charcoal-700 hover:text-terracotta-500 transition-colors font-medium"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="btn-primary hidden sm:flex items-center gap-2 px-5 py-2.5 bg-terracotta-500 text-cream-50 rounded-full font-medium hover:bg-terracotta-600"
        >
          <BookOpen className="w-4 h-4" />
          <span>Share Recipe</span>
        </Link>
      </div>
    );
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, username")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/recipes/new"
        className="btn-primary hidden sm:flex items-center gap-2 px-5 py-2.5 bg-terracotta-500 text-cream-50 rounded-full font-medium hover:bg-terracotta-600"
      >
        <BookOpen className="w-4 h-4" />
        <span>New Recipe</span>
      </Link>
      <UserMenu user={user} profile={profile} />
    </div>
  );
}