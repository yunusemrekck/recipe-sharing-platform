import Link from "next/link";
import { BookOpen, Users, Heart } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta-500 to-terracotta-600" />
      <div className="absolute inset-0 noise-overlay opacity-10" />
      
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50 mb-6">
            Ready to Share Your Culinary Magic?
          </h2>
          <p className="text-lg text-cream-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join our community of passionate home cooks and share the recipes that bring joy to your table. Your grandmother&apos;s secret sauce deserves to be celebrated.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: BookOpen, title: "Share Recipes", desc: "Upload your favorite dishes" },
              { icon: Users, title: "Build Community", desc: "Connect with food lovers" },
              { icon: Heart, title: "Get Recognition", desc: "Earn likes & bookmarks" },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-cream-50" />
                  </div>
                  <h3 className="font-medium text-cream-50 mb-1">{feature.title}</h3>
                  <p className="text-sm text-cream-100/70">{feature.desc}</p>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="btn-primary w-full sm:w-auto px-8 py-4 bg-white text-terracotta-600 rounded-full font-semibold hover:bg-cream-50 shadow-lg shadow-black/10 transition-all"
            >
              Create Free Account
            </Link>
            <Link
              href="/recipes"
              className="w-full sm:w-auto px-8 py-4 border-2 border-white/30 text-cream-50 rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Browse Recipes First
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
