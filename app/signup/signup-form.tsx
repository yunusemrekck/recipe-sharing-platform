"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock, User } from "lucide-react";
import { signup } from "@/app/auth/actions";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    // Client-side validation
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    const result = await signup(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Full Name Field */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-charcoal-700 mb-2"
        >
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-700/40" />
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="John Doe"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-cream-300 bg-cream-50/50 text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-400/20 transition-all"
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-charcoal-700 mb-2"
        >
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-700/40" />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-cream-300 bg-cream-50/50 text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-400/20 transition-all"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-charcoal-700 mb-2"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-700/40" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            placeholder="••••••••"
            minLength={6}
            className="w-full pl-12 pr-12 py-3 rounded-xl border border-cream-300 bg-cream-50/50 text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-400/20 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-700/40 hover:text-charcoal-700 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="mt-1.5 text-xs text-charcoal-700/50">
          Must be at least 6 characters
        </p>
      </div>

      {/* Confirm Password Field */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-charcoal-700 mb-2"
        >
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-700/40" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-cream-300 bg-cream-50/50 text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-400/20 transition-all"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-terracotta-500 hover:bg-terracotta-600 disabled:bg-terracotta-400 text-cream-50 font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}