import Link from "next/link";
import { ChefHat, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal-800 text-cream-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-terracotta-500 flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-cream-50" />
              </div>
              <span className="font-display text-2xl font-semibold text-cream-50">
                Savora
              </span>
            </Link>
            <p className="text-cream-200/70 text-sm leading-relaxed">
              A place for home cooks to share their culinary creations and
              discover new favorites.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-cream-50 mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/recipes"
                  className="text-cream-200/70 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Browse Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-cream-200/70 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/popular"
                  className="text-cream-200/70 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Popular This Week
                </Link>
              </li>
              <li>
                <Link
                  href="/new"
                  className="text-cream-200/70 hover:text-terracotta-400 transition-colors text-sm"
                >
                  New Recipes
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-display text-lg font-semibold text-cream-50 mb-4">
              Community
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-cream-200/70 hover:text-terracotta-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/guidelines"
                  className="text-cream-200/70 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-cream-200/70 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display text-lg font-semibold text-cream-50 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-cream-200/70 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-cream-200/70 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-cream-200/70 hover:text-terracotta-400 transition-colors text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-charcoal-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream-200/50 text-sm">
            © {new Date().getFullYear()} Savora. All rights reserved.
          </p>
          <p className="text-cream-200/50 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-terracotta-400 fill-terracotta-400" /> for home cooks everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
