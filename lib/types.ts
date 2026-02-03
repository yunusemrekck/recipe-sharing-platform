export type Profile = {
    id: string;
    username: string | null;
    full_name: string | null;
    created_at: string;
    updated_at: string;
    email: string | null;
    bio: string | null;
  };
  
  export type Recipe = {
    id: string;
    created_at: string;
    user_id: string;
    title: string;
    ingredients: string;
    instructions: string;
    cooking_time: number | null;
    difficulty: "easy" | "medium" | "hard" | null;
    category: string | null;
  };
  
  // Recipe with author profile joined
  export type RecipeWithAuthor = Recipe & {
    profiles: Pick<Profile, "username" | "full_name"> | null;
  };
  
  // Form types for creating/updating
  export type RecipeInsert = Omit<Recipe, "id" | "created_at">;
  export type RecipeUpdate = Partial<Omit<Recipe, "id" | "created_at" | "user_id">>;
  
  export type ProfileUpdate = Partial<Omit<Profile, "id" | "created_at">>;
  
  // Database schema type for Supabase client
  export type Database = {
    public: {
      Tables: {
        profiles: {
          Row: Profile;
          Insert: Omit<Profile, "created_at" | "updated_at">;
          Update: ProfileUpdate;
        };
        recipes: {
          Row: Recipe;
          Insert: RecipeInsert;
          Update: RecipeUpdate;
        };
      };
    };
  };