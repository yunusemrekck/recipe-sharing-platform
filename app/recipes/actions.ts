"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { RecipeWithAuthor } from "@/lib/types";

export type RecipeActionResult = {
  success: boolean;
  error?: string;
  data?: { id?: string };
};

/**
 * Create a new recipe
 */
export async function createRecipe(formData: FormData): Promise<RecipeActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Oturum açmanız gerekiyor" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const ingredientsList = JSON.parse(formData.get("ingredients_list") as string || "[]");
  const instructionsList = JSON.parse(formData.get("instructions_list") as string || "[]");
  const cookingTime = formData.get("cooking_time") ? parseInt(formData.get("cooking_time") as string) : null;
  const servings = formData.get("servings") ? parseInt(formData.get("servings") as string) : 4;
  const difficulty = formData.get("difficulty") as "easy" | "medium" | "hard" | null;
  const category = formData.get("category") as string | null;
  const isPublished = formData.get("is_published") === "true";

  // Validation
  if (!title || title.trim().length < 3) {
    return { success: false, error: "Tarif başlığı en az 3 karakter olmalı" };
  }

  if (ingredientsList.length === 0) {
    return { success: false, error: "En az bir malzeme eklemelisiniz" };
  }

  if (instructionsList.length === 0) {
    return { success: false, error: "En az bir yapılış adımı eklemelisiniz" };
  }

  // Convert lists to text for backward compatibility
  const ingredientsText = ingredientsList.join("\n");
  const instructionsText = instructionsList.join("\n");

  const newRecipe = {
    user_id: user.id,
    title: title.trim(),
    description: description?.trim() || null,
    ingredients: ingredientsText,
    instructions: instructionsText,
    ingredients_list: ingredientsList,
    instructions_list: instructionsList,
    cooking_time: cookingTime,
    servings,
    difficulty,
    category,
    is_published: isPublished,
    image_url: null,
  };

  const { data, error } = await supabase
    .from("recipes")
    .insert(newRecipe as never)
    .select("id")
    .single();

  if (error) {
    console.error("Error creating recipe:", error);
    return { success: false, error: "Tarif oluşturulurken bir hata oluştu" };
  }

  revalidatePath("/recipes");
  revalidatePath("/dashboard");
  revalidatePath("/my-recipes");

  const recipeId = (data as { id: string } | null)?.id;
  return { success: true, data: { id: recipeId } };
}

/**
 * Update an existing recipe
 */
export async function updateRecipe(recipeId: string, formData: FormData): Promise<RecipeActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Oturum açmanız gerekiyor" };
  }

  // Check ownership
  const { data: existingRecipe } = await supabase
    .from("recipes")
    .select("user_id")
    .eq("id", recipeId)
    .single();

  const recipeData = existingRecipe as { user_id: string } | null;
  if (!recipeData || recipeData.user_id !== user.id) {
    return { success: false, error: "Bu tarifi düzenleme yetkiniz yok" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const ingredientsList = JSON.parse(formData.get("ingredients_list") as string || "[]");
  const instructionsList = JSON.parse(formData.get("instructions_list") as string || "[]");
  const cookingTime = formData.get("cooking_time") ? parseInt(formData.get("cooking_time") as string) : null;
  const servings = formData.get("servings") ? parseInt(formData.get("servings") as string) : 4;
  const difficulty = formData.get("difficulty") as "easy" | "medium" | "hard" | null;
  const category = formData.get("category") as string | null;
  const isPublished = formData.get("is_published") === "true";

  // Validation
  if (!title || title.trim().length < 3) {
    return { success: false, error: "Tarif başlığı en az 3 karakter olmalı" };
  }

  if (ingredientsList.length === 0) {
    return { success: false, error: "En az bir malzeme eklemelisiniz" };
  }

  if (instructionsList.length === 0) {
    return { success: false, error: "En az bir yapılış adımı eklemelisiniz" };
  }

  const ingredientsText = ingredientsList.join("\n");
  const instructionsText = instructionsList.join("\n");

  const updateData = {
    title: title.trim(),
    description: description?.trim() || null,
    ingredients: ingredientsText,
    instructions: instructionsText,
    ingredients_list: ingredientsList,
    instructions_list: instructionsList,
    cooking_time: cookingTime,
    servings,
    difficulty,
    category,
    is_published: isPublished,
  };

  const { error } = await supabase
    .from("recipes")
    .update(updateData as never)
    .eq("id", recipeId);

  if (error) {
    console.error("Error updating recipe:", error);
    return { success: false, error: "Tarif güncellenirken bir hata oluştu" };
  }

  revalidatePath("/recipes");
  revalidatePath(`/recipes/${recipeId}`);
  revalidatePath("/dashboard");
  revalidatePath("/my-recipes");

  return { success: true, data: { id: recipeId } };
}

/**
 * Delete a recipe
 */
export async function deleteRecipe(recipeId: string): Promise<RecipeActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Oturum açmanız gerekiyor" };
  }

  // Check ownership
  const { data: existingRecipe } = await supabase
    .from("recipes")
    .select("user_id")
    .eq("id", recipeId)
    .single();

  const recipeData = existingRecipe as { user_id: string } | null;
  if (!recipeData || recipeData.user_id !== user.id) {
    return { success: false, error: "Bu tarifi silme yetkiniz yok" };
  }

  const { error } = await supabase
    .from("recipes")
    .delete()
    .eq("id", recipeId);

  if (error) {
    console.error("Error deleting recipe:", error);
    return { success: false, error: "Tarif silinirken bir hata oluştu" };
  }

  revalidatePath("/recipes");
  revalidatePath("/dashboard");
  revalidatePath("/my-recipes");

  return { success: true };
}

/**
 * Get a single recipe by ID
 */
export async function getRecipeById(recipeId: string): Promise<RecipeWithAuthor | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("recipes")
    .select(`
      *,
      profiles:user_id (
        username,
        full_name
      )
    `)
    .eq("id", recipeId)
    .single();

  if (error) {
    // PGRST116 = "Row not found" - this is expected for deleted recipes
    if (error.code !== "PGRST116") {
      console.error("Error fetching recipe:", error);
    }
    return null;
  }

  return data as RecipeWithAuthor;
}

/**
 * Get all published recipes with optional filters
 */
export async function getRecipes(options?: {
  category?: string;
  difficulty?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: "newest" | "oldest" | "popular";
}): Promise<{ recipes: RecipeWithAuthor[]; count: number }> {
  const supabase = await createClient();
  const { category, difficulty, search, limit = 12, offset = 0, sortBy = "newest" } = options || {};

  let query = supabase
    .from("recipes")
    .select(`
      *,
      profiles:user_id (
        username,
        full_name
      )
    `, { count: "exact" })
    .eq("is_published", true);

  // Filters
  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  if (difficulty && difficulty !== "all") {
    query = query.eq("difficulty", difficulty);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,ingredients.ilike.%${search}%`);
  }

  // Sorting
  if (sortBy === "newest") {
    query = query.order("created_at", { ascending: false });
  } else if (sortBy === "oldest") {
    query = query.order("created_at", { ascending: true });
  }
  // TODO: Add "popular" sorting when likes are implemented

  // Pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching recipes:", error);
    return { recipes: [], count: 0 };
  }

  return { 
    recipes: (data as RecipeWithAuthor[]) || [], 
    count: count || 0 
  };
}

/**
 * Get recipes by user ID
 */
export async function getUserRecipes(userId: string, includeUnpublished = false): Promise<RecipeWithAuthor[]> {
  const supabase = await createClient();

  let query = supabase
    .from("recipes")
    .select(`
      *,
      profiles:user_id (
        username,
        full_name
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (!includeUnpublished) {
    query = query.eq("is_published", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching user recipes:", error);
    return [];
  }

  return (data as RecipeWithAuthor[]) || [];
}

/**
 * Get current user's recipes (including drafts)
 */
export async function getMyRecipes(): Promise<RecipeWithAuthor[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  return getUserRecipes(user.id, true);
}
