"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, BookOpen, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface UserMenuProps {
  user: SupabaseUser;
  profile: {
    full_name: string | null;
    username: string | null;
  } | null;
}

export function UserMenu({ user, profile }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const displayName = profile?.full_name || profile?.username || user.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-cream-100 transition-colors"
      >
        <div className="w-9 h-9 rounded-full bg-terracotta-500 flex items-center justify-center text-cream-50 font-medium text-sm">
          {initials}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-charcoal-700/60 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg shadow-charcoal-900/10 border border-cream-200 py-2 z-50 animate-fade-in">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-cream-100">
            <p className="font-medium text-charcoal-800 truncate">{displayName}</p>
            <p className="text-sm text-charcoal-700/60 truncate">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-charcoal-700 hover:bg-cream-50 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </Link>
            <Link
              href="/my-recipes"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-charcoal-700 hover:bg-cream-50 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>My Recipes</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-cream-100 pt-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}