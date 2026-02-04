"use client";

import { useState, useTransition } from "react";
import { Heart, Loader2 } from "lucide-react";
import { toggleLike } from "@/app/recipes/interactions";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  recipeId: string;
  initialLiked: boolean;
  initialCount: number;
  isAuthenticated: boolean;
}

export function LikeButton({ recipeId, initialLiked, initialCount, isAuthenticated }: LikeButtonProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push("/login?redirect=" + encodeURIComponent(`/recipes/${recipeId}`));
      return;
    }

    // Optimistic update
    const newLiked = !liked;
    setLiked(newLiked);
    setCount(prev => newLiked ? prev + 1 : prev - 1);

    startTransition(async () => {
      const result = await toggleLike(recipeId);
      
      if (!result.success) {
        // Revert on error
        setLiked(!newLiked);
        setCount(prev => newLiked ? prev - 1 : prev + 1);
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        liked
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-cream-100 text-charcoal-700 hover:bg-cream-200"
      } disabled:opacity-50`}
    >
      {isPending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Heart
          className={`w-5 h-5 transition-all duration-200 ${
            liked ? "fill-red-500 text-red-500 scale-110" : ""
          }`}
        />
      )}
      <span>{count}</span>
    </button>
  );
}
