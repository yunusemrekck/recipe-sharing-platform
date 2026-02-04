"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, AlertTriangle, X } from "lucide-react";
import { deleteRecipe } from "@/app/recipes/actions";

interface DeleteRecipeButtonProps {
  recipeId: string;
  recipeTitle: string;
  variant?: "icon" | "button";
}

export function DeleteRecipeButton({ recipeId, recipeTitle, variant = "button" }: DeleteRecipeButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      const result = await deleteRecipe(recipeId);
      
      if (result.success) {
        setIsOpen(false);
        router.push("/my-recipes");
        router.refresh();
      } else {
        setError(result.error || "Tarif silinirken bir hata oluştu");
      }
    });
  };

  return (
    <>
      {/* Trigger Button */}
      {variant === "icon" ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 text-charcoal-700/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Tarifi Sil"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg font-medium transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Tarifi Sil
        </button>
      )}

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm"
            onClick={() => !isPending && setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => !isPending && setIsOpen(false)}
              disabled={isPending}
              className="absolute top-4 right-4 p-2 text-charcoal-700/40 hover:text-charcoal-700 rounded-lg transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>

            {/* Content */}
            <div className="text-center mb-6">
              <h3 className="font-display text-xl font-semibold text-charcoal-800 mb-2">
                Tarifi Sil
              </h3>
              <p className="text-charcoal-700/70">
                <strong className="text-charcoal-800">&quot;{recipeTitle}&quot;</strong> tarifini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="flex-1 px-4 py-3 bg-cream-100 hover:bg-cream-200 text-charcoal-700 rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                İptal
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Siliniyor...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Evet, Sil
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
