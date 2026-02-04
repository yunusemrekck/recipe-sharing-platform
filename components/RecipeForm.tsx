"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Minus,
  Clock,
  Users,
  ChefHat,
  Loader2,
  Check,
  X,
  GripVertical,
  Trash2,
} from "lucide-react";
import { createRecipe, updateRecipe } from "@/app/recipes/actions";
import { RECIPE_CATEGORIES, DIFFICULTY_LEVELS } from "@/lib/types";
import type { Recipe } from "@/lib/types";

interface RecipeFormProps {
  recipe?: Recipe;
  mode: "create" | "edit";
}

export function RecipeForm({ recipe, mode }: RecipeFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState(recipe?.title || "");
  const [description, setDescription] = useState(recipe?.description || "");
  const [ingredients, setIngredients] = useState<string[]>(
    recipe?.ingredients_list?.length ? recipe.ingredients_list : [""]
  );
  const [instructions, setInstructions] = useState<string[]>(
    recipe?.instructions_list?.length ? recipe.instructions_list : [""]
  );
  const [cookingTime, setCookingTime] = useState(recipe?.cooking_time?.toString() || "");
  const [servings, setServings] = useState(recipe?.servings?.toString() || "4");
  const [difficulty, setDifficulty] = useState(recipe?.difficulty || "");
  const [category, setCategory] = useState(recipe?.category || "");
  const [isPublished, setIsPublished] = useState(recipe?.is_published ?? true);

  // Ingredient handlers
  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };
  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  // Instruction handlers
  const addInstruction = () => setInstructions([...instructions, ""]);
  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, i) => i !== index));
    }
  };
  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Filter out empty items
    const filteredIngredients = ingredients.filter((i) => i.trim() !== "");
    const filteredInstructions = instructions.filter((i) => i.trim() !== "");

    if (filteredIngredients.length === 0) {
      setError("En az bir malzeme eklemelisiniz");
      return;
    }

    if (filteredInstructions.length === 0) {
      setError("En az bir yapılış adımı eklemelisiniz");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients_list", JSON.stringify(filteredIngredients));
    formData.append("instructions_list", JSON.stringify(filteredInstructions));
    formData.append("cooking_time", cookingTime);
    formData.append("servings", servings);
    formData.append("difficulty", difficulty);
    formData.append("category", category);
    formData.append("is_published", isPublished.toString());

    startTransition(async () => {
      const result = mode === "create" 
        ? await createRecipe(formData)
        : await updateRecipe(recipe!.id, formData);

      if (result.success && result.data?.id) {
        router.push(`/recipes/${result.data.id}`);
      } else {
        setError(result.error || "Bir hata oluştu");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600">
          <X className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Basic Info Section */}
      <section className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6">
        <h2 className="font-display text-xl font-semibold text-charcoal-800 mb-6">
          Temel Bilgiler
        </h2>

        <div className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-charcoal-700 mb-2">
              Tarif Başlığı *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Fırında Sebzeli Tavuk"
              required
              minLength={3}
              maxLength={100}
              className="w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-charcoal-700 mb-2">
              Kısa Açıklama
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tarifinizi kısaca tanıtın..."
              rows={3}
              maxLength={500}
              className="w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors resize-none"
            />
            <p className="mt-1.5 text-xs text-charcoal-700/50 text-right">
              {description.length}/500
            </p>
          </div>

          {/* Category & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-charcoal-700 mb-2">
                Kategori
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors"
              >
                <option value="">Kategori seçin</option>
                {RECIPE_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-charcoal-700 mb-2">
                Zorluk Seviyesi
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors"
              >
                <option value="">Zorluk seçin</option>
                {DIFFICULTY_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time & Servings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="cookingTime" className="block text-sm font-medium text-charcoal-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1.5" />
                Pişirme Süresi (dakika)
              </label>
              <input
                id="cookingTime"
                type="number"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                placeholder="45"
                min={1}
                max={1440}
                className="w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="servings" className="block text-sm font-medium text-charcoal-700 mb-2">
                <Users className="w-4 h-4 inline mr-1.5" />
                Porsiyon Sayısı
              </label>
              <input
                id="servings"
                type="number"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                placeholder="4"
                min={1}
                max={100}
                className="w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold text-charcoal-800">
            Malzemeler *
          </h2>
          <button
            type="button"
            onClick={addIngredient}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-terracotta-500 hover:bg-terracotta-50 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Malzeme Ekle
          </button>
        </div>

        <div className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="text-charcoal-700/30">
                <GripVertical className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
                placeholder={`Malzeme ${index + 1} (örn: 2 adet domates)`}
                className="flex-1 px-4 py-3 bg-white border border-cream-200 rounded-xl text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                disabled={ingredients.length === 1}
                className="p-2 text-charcoal-700/40 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Instructions Section */}
      <section className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold text-charcoal-800">
            Yapılış Adımları *
          </h2>
          <button
            type="button"
            onClick={addInstruction}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-terracotta-500 hover:bg-terracotta-50 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adım Ekle
          </button>
        </div>

        <div className="space-y-4">
          {instructions.map((instruction, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-terracotta-500 text-cream-50 flex items-center justify-center font-medium text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <textarea
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  placeholder={`${index + 1}. adımı yazın...`}
                  rows={2}
                  className="w-full px-4 py-3 bg-white border border-cream-200 rounded-xl text-charcoal-800 placeholder:text-charcoal-700/40 focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-colors resize-none"
                />
              </div>
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                disabled={instructions.length === 1}
                className="p-2 text-charcoal-700/40 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors self-start mt-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Publish Settings */}
      <section className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6">
        <h2 className="font-display text-xl font-semibold text-charcoal-800 mb-4">
          Yayın Ayarları
        </h2>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-5 h-5 rounded border-cream-300 text-terracotta-500 focus:ring-terracotta-500/20"
          />
          <div>
            <p className="font-medium text-charcoal-800">Hemen yayınla</p>
            <p className="text-sm text-charcoal-700/60">
              İşareti kaldırırsanız tarif taslak olarak kaydedilir
            </p>
          </div>
        </label>
      </section>

      {/* Submit Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-terracotta-500 hover:bg-terracotta-600 disabled:bg-terracotta-500/50 text-cream-50 rounded-xl font-medium transition-colors"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {mode === "create" ? "Oluşturuluyor..." : "Güncelleniyor..."}
            </>
          ) : (
            <>
              <ChefHat className="w-5 h-5" />
              {mode === "create" ? "Tarifi Oluştur" : "Değişiklikleri Kaydet"}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          disabled={isPending}
          className="px-6 py-4 bg-cream-100 hover:bg-cream-200 text-charcoal-700 rounded-xl font-medium transition-colors"
        >
          İptal
        </button>
      </div>
    </form>
  );
}
