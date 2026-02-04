import Link from "next/link";
import { ChefHat } from "lucide-react";
import { AuthButton } from "@/components/AuthButton";
import { MobileMenu } from "@/components/MobileMenu";
import { SearchBar } from "@/components/SearchBar";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 bg-cream-50/95 backdrop-blur-sm border-b border-cream-300/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-terracotta-500 flex items-center justify-center group-hover:bg-terracotta-600 transition-colors">
              <ChefHat className="w-5 h-5 lg:w-6 lg:h-6 text-cream-50" />
            </div>
            <span className="font-display text-2xl lg:text-3xl font-semibold text-charcoal-800 tracking-tight">
              Savora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/recipes"
              className="text-charcoal-700 hover:text-terracotta-500 transition-colors font-medium"
            >
              Tarifler
            </Link>
            <Link
              href="/recipes?category=main"
              className="text-charcoal-700 hover:text-terracotta-500 transition-colors font-medium"
            >
              Ana Yemekler
            </Link>
            <Link
              href="/recipes?category=dessert"
              className="text-charcoal-700 hover:text-terracotta-500 transition-colors font-medium"
            >
              Tatlılar
            </Link>
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Search Bar */}
            <SearchBar className="hidden sm:flex" />

            {/* Auth Button (Login/Signup or User Menu) */}
            <AuthButton />

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
