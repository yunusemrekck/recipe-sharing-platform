"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { CommentWithAuthor } from "@/lib/types";

// ============================================
// LIKES
// ============================================

/**
 * Toggle like on a recipe (like/unlike)
 */
export async function toggleLike(recipeId: string): Promise<{ success: boolean; liked: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, liked: false, error: "Oturum açmanız gerekiyor" };
  }

  // Check if already liked
  const { data: existingLike } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("recipe_id", recipeId)
    .single();

  if (existingLike) {
    // Unlike
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("id", (existingLike as { id: string }).id);

    if (error) {
      console.error("Error unliking:", error);
      return { success: false, liked: true, error: "Beğeni kaldırılırken hata oluştu" };
    }

    revalidatePath(`/recipes/${recipeId}`);
    return { success: true, liked: false };
  } else {
    // Like
    const { error } = await supabase
      .from("likes")
      .insert({ user_id: user.id, recipe_id: recipeId } as never);

    if (error) {
      console.error("Error liking:", error);
      return { success: false, liked: false, error: "Beğenirken hata oluştu" };
    }

    revalidatePath(`/recipes/${recipeId}`);
    return { success: true, liked: true };
  }
}

/**
 * Check if current user has liked a recipe
 */
export async function hasUserLiked(recipeId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("recipe_id", recipeId)
    .single();

  return !!data;
}

/**
 * Get likes count for a recipe
 */
export async function getLikesCount(recipeId: string): Promise<number> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("recipe_id", recipeId);

  if (error) {
    console.error("Error getting likes count:", error);
    return 0;
  }

  return count || 0;
}

/**
 * Get like info for a recipe (count + user liked status)
 */
export async function getLikeInfo(recipeId: string): Promise<{ count: number; userLiked: boolean }> {
  const [count, userLiked] = await Promise.all([
    getLikesCount(recipeId),
    hasUserLiked(recipeId),
  ]);

  return { count, userLiked };
}

// ============================================
// COMMENTS
// ============================================

/**
 * Add a comment to a recipe
 */
export async function addComment(
  recipeId: string,
  content: string
): Promise<{ success: boolean; error?: string; comment?: CommentWithAuthor }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Oturum açmanız gerekiyor" };
  }

  const trimmedContent = content.trim();

  if (!trimmedContent) {
    return { success: false, error: "Yorum boş olamaz" };
  }

  if (trimmedContent.length > 1000) {
    return { success: false, error: "Yorum en fazla 1000 karakter olabilir" };
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      user_id: user.id,
      recipe_id: recipeId,
      content: trimmedContent,
    } as never)
    .select(`
      *,
      profiles:user_id (
        username,
        full_name
      )
    `)
    .single();

  if (error) {
    console.error("Error adding comment:", error);
    return { success: false, error: "Yorum eklenirken hata oluştu" };
  }

  revalidatePath(`/recipes/${recipeId}`);
  return { success: true, comment: data as CommentWithAuthor };
}

/**
 * Update a comment
 */
export async function updateComment(
  commentId: string,
  content: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Oturum açmanız gerekiyor" };
  }

  const trimmedContent = content.trim();

  if (!trimmedContent) {
    return { success: false, error: "Yorum boş olamaz" };
  }

  if (trimmedContent.length > 1000) {
    return { success: false, error: "Yorum en fazla 1000 karakter olabilir" };
  }

  // Check ownership
  const { data: existingComment } = await supabase
    .from("comments")
    .select("user_id, recipe_id")
    .eq("id", commentId)
    .single();

  const commentData = existingComment as { user_id: string; recipe_id: string } | null;

  if (!commentData || commentData.user_id !== user.id) {
    return { success: false, error: "Bu yorumu düzenleme yetkiniz yok" };
  }

  const { error } = await supabase
    .from("comments")
    .update({ content: trimmedContent, updated_at: new Date().toISOString() } as never)
    .eq("id", commentId);

  if (error) {
    console.error("Error updating comment:", error);
    return { success: false, error: "Yorum güncellenirken hata oluştu" };
  }

  revalidatePath(`/recipes/${commentData.recipe_id}`);
  return { success: true };
}

/**
 * Delete a comment
 */
export async function deleteComment(commentId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Oturum açmanız gerekiyor" };
  }

  // Check ownership
  const { data: existingComment } = await supabase
    .from("comments")
    .select("user_id, recipe_id")
    .eq("id", commentId)
    .single();

  const commentData = existingComment as { user_id: string; recipe_id: string } | null;

  if (!commentData || commentData.user_id !== user.id) {
    return { success: false, error: "Bu yorumu silme yetkiniz yok" };
  }

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    console.error("Error deleting comment:", error);
    return { success: false, error: "Yorum silinirken hata oluştu" };
  }

  revalidatePath(`/recipes/${commentData.recipe_id}`);
  return { success: true };
}

/**
 * Get comments for a recipe
 */
export async function getComments(recipeId: string): Promise<CommentWithAuthor[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      profiles (
        username,
        full_name
      )
    `)
    .eq("recipe_id", recipeId)
    .order("created_at", { ascending: false });

  if (error) {
    // PGRST116 = "Row not found" - expected when no comments
    if (error.code !== "PGRST116") {
      console.error("Error fetching comments:", JSON.stringify(error, null, 2));
    }
    return [];
  }

  return (data as CommentWithAuthor[]) || [];
}

/**
 * Get comments count for a recipe
 */
export async function getCommentsCount(recipeId: string): Promise<number> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("recipe_id", recipeId);

  if (error) {
    console.error("Error getting comments count:", error);
    return 0;
  }

  return count || 0;
}
