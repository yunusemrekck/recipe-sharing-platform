import { Metadata } from "next";
import Link from "next/link";
import { ChefHat } from "lucide-react";
import { LoginForm } from "@/app/login/login-form";

export const metadata: Metadata = {
  title: "Sign In | Savora",
  description: "Sign in to your Savora account",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; redirect?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-terracotta-500 flex items-center justify-center group-hover:bg-terracotta-600 transition-colors">
            <ChefHat className="w-5 h-5 text-cream-50" />
          </div>
          <span className="font-display text-2xl font-semibold text-charcoal-800">
            Savora
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-charcoal-900/5 border border-cream-200 p-8">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-charcoal-800 mb-2">
                Welcome Back
              </h1>
              <p className="text-charcoal-700/60">
                Sign in to continue to your account
              </p>
            </div>

            {/* Message */}
            {params.message && (
              <div className="mb-6 p-4 rounded-lg bg-sage-300/20 border border-sage-400/30 text-sage-600 text-sm text-center">
                {params.message}
              </div>
            )}

            {/* Form */}
            <LoginForm redirectTo={params.redirect} />

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-cream-200" />
              <span className="text-sm text-charcoal-700/40">or</span>
              <div className="flex-1 h-px bg-cream-200" />
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-charcoal-700/70">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}