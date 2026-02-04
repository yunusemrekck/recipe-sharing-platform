"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Profile, ProfileUpdate, RecipeWithAuthor } from "@/lib/types";

export type ProfileActionResult = {
  success: boolean;
  error?: string;
  data?: unknown;
};

// Public profile type (subset of Profile for public viewing)
export type PublicProfile = Pick<Profile, "id" | "username" | "full_name" | "bio" | "created_at">;

/**
 * Get the current user's profile - creates one if it doesn't exist
 */
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  // Try to get existing profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // If profile exists, return it
  if (profile) {
    return profile;
  }

  // If profile doesn't exist (not just an error), create one
  if (error?.code === "PGRST116") { // "Row not found" error code
    // Generate username from email
    const emailPrefix = user.email?.split('@')[0] || 'user';
    const baseUsername = emailPrefix.toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 15);
    const uniqueSuffix = user.id.replace(/-/g, '').slice(0, 5);
    const generatedUsername = baseUsername.length >= 3 
      ? `${baseUsername}_${uniqueSuffix}` 
      : `user_${uniqueSuffix}`;

    const newProfile = {
      id: user.id,
      email: user.email || null,
      full_name: user.user_metadata?.full_name || null,
      username: generatedUsername,
      bio: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: createdProfile, error: createError } = await supabase
      .from("profiles")
      .insert(newProfile as never)
      .select()
      .single();

    if (createError) {
      console.error("Error creating profile:", JSON.stringify(createError, null, 2));
      console.error("Error code:", createError.code);
      console.error("Error message:", createError.message);
      console.error("Error details:", createError.details);
      return null;
    }

    return createdProfile;
  }

  // Some other error occurred
  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return null;
}

/**
 * Get a profile by user ID (for public profiles)
 */
export async function getProfileById(userId: string): Promise<PublicProfile | null> {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, full_name, bio, created_at")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return profile;
}

/**
 * Get a profile by username (for public profiles)
 */
export async function getProfileByUsername(username: string): Promise<PublicProfile | null> {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, full_name, bio, created_at")
    .eq("username", username)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return profile;
}

/**
 * Update the current user's profile
 */
export async function updateProfile(formData: FormData): Promise<ProfileActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Oturum açmanız gerekiyor" };
  }

  const username = formData.get("username") as string | null;
  const fullName = formData.get("full_name") as string | null;
  const bio = formData.get("bio") as string | null;

  // Validate username
  if (username) {
    // Username format validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return { 
        success: false, 
        error: "Kullanıcı adı 3-20 karakter arasında olmalı ve sadece harf, rakam ve alt çizgi içerebilir" 
      };
    }

    // Check if username is taken by another user
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username.toLowerCase())
      .neq("id", user.id)
      .single();

    if (existingUser) {
      return { success: false, error: "Bu kullanıcı adı zaten alınmış" };
    }
  }

  // Validate full name
  if (fullName && fullName.length > 100) {
    return { success: false, error: "İsim en fazla 100 karakter olabilir" };
  }

  // Validate bio
  if (bio && bio.length > 500) {
    return { success: false, error: "Biyografi en fazla 500 karakter olabilir" };
  }

  const updateData: ProfileUpdate = {
    username: username?.toLowerCase() || null,
    full_name: fullName || null,
    bio: bio || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("profiles")
    .update(updateData as never)
    .eq("id", user.id);

  if (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Profil güncellenirken bir hata oluştu" };
  }

  // Also update user metadata for full_name
  if (fullName) {
    await supabase.auth.updateUser({
      data: { full_name: fullName }
    });
  }

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  revalidatePath("/", "layout");

  return { success: true };
}

/**
 * Check if a username is available
 */
export async function checkUsernameAvailability(username: string): Promise<ProfileActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Oturum açmanız gerekiyor" };
  }

  // Username format validation
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    return { 
      success: false, 
      error: "Kullanıcı adı 3-20 karakter arasında olmalı ve sadece harf, rakam ve alt çizgi içerebilir" 
    };
  }

  const { data: existingUser } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username.toLowerCase())
    .neq("id", user.id)
    .single();

  if (existingUser) {
    return { success: false, error: "Bu kullanıcı adı zaten alınmış", data: { available: false } };
  }

  return { success: true, data: { available: true } };
}

/**
 * Get user's recipe statistics
 */
export async function getProfileStats(userId: string): Promise<{
  recipeCount: number;
  likesReceived: number;
  followers: number;
  following: number;
}> {
  const supabase = await createClient();

  // Get recipe count
  const { count: recipeCount } = await supabase
    .from("recipes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  // TODO: Add more stats when likes/favorites/followers are implemented
  return {
    recipeCount: recipeCount || 0,
    likesReceived: 0,
    followers: 0,
    following: 0,
  };
}

/**
 * Get user's recipes
 */
export async function getUserRecipes(userId: string, limit = 10): Promise<RecipeWithAuthor[]> {
  const supabase = await createClient();

  const { data: recipes, error } = await supabase
    .from("recipes")
    .select(`
      *,
      profiles:user_id (
        username,
        full_name
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching user recipes:", error);
    return [];
  }

  return (recipes as RecipeWithAuthor[]) || [];
}

/**
 * Ensure profile exists for current user (call on login/signup)
 */
export async function ensureProfileExists(): Promise<Profile | null> {
  return getProfile(); // getProfile now handles creation
}
