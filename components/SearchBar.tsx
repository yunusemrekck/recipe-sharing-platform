"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className = "" }: SearchBarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/recipes?search=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
        searchFocused
          ? "border-terracotta-400 bg-white shadow-sm w-64"
          : "border-cream-300 bg-cream-100/50 w-48"
      } ${className}`}
    >
      <Search className="w-4 h-4 text-charcoal-700/50" />
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent text-sm text-charcoal-800 placeholder:text-charcoal-700/40 outline-none w-full"
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
      />
    </form>
  );
}