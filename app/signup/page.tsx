import { Metadata } from "next";
import Link from "next/link";
import { ChefHat } from "lucide-react";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Create Account | Savora",
  description: "Create your Savora account and start sharing recipes",
};

export default function SignupPage() {
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
                Create Account
              </h1>
              <p className="text-charcoal-700/60">
                Join our community of home cooks
              </p>
            </div>

            {/* Form */}
            <SignupForm />

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-cream-200" />
              <span className="text-sm text-charcoal-700/40">or</span>
              <div className="flex-1 h-px bg-cream-200" />
            </div>

            {/* Sign In Link */}
            <p className="text-center text-charcoal-700/70">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-terracotta-500 hover:text-terracotta-600 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-sm text-charcoal-700/50">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-charcoal-700">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-charcoal-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}