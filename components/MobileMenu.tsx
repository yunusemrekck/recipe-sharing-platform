"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, User, BookOpen } from "lucide-react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-charcoal-700 hover:text-terracotta-500 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-cream-50 z-40 animate-fade-in">
          <div className="p-4">
            {/* Mobile Search */}
            <div className="flex items-center gap-2 px-4 py-2.5 mb-4 rounded-full border border-cream-300 bg-cream-100/50">
              <Search className="w-4 h-4 text-charcoal-700/50" />
              <input
                type="text"
                placeholder="Search recipes..."
                className="bg-transparent text-sm text-charcoal-800 placeholder:text-charcoal-700/40 outline-none w-full"
              />
            </div>

            <nav className="flex flex-col gap-1">
              <Link
                href="/recipes"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-charcoal-700 hover:text-terracotta-500 hover:bg-cream-100 rounded-lg transition-colors font-medium"
              >
                Browse Recipes
              </Link>
              <Link
                href="/categories"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-charcoal-700 hover:text-terracotta-500 hover:bg-cream-100 rounded-lg transition-colors font-medium"
              >
                Categories
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-charcoal-700 hover:text-terracotta-500 hover:bg-cream-100 rounded-lg transition-colors font-medium"
              >
                About
              </Link>
              <hr className="my-2 border-cream-300/50" />
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-charcoal-700 hover:text-terracotta-500 hover:bg-cream-100 rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="mx-4 mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-terracotta-500 text-cream-50 rounded-full font-medium hover:bg-terracotta-600 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Share Recipe</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}