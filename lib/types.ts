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
  description: string | null;
  ingredients: string;
  instructions: string;
  ingredients_list: string[];
  instructions_list: string[];
  cooking_time: number | null;
  servings: number | null;
  difficulty: "easy" | "medium" | "hard" | null;
  category: string | null;
  image_url: string | null;
  is_published: boolean;
};

// Recipe with author profile joined
export type RecipeWithAuthor = Recipe & {
  profiles: Pick<Profile, "username" | "full_name"> | null;
};

// Form types for creating/updating
export type RecipeInsert = Omit<Recipe, "id" | "created_at">;
export type RecipeUpdate = Partial<Omit<Recipe, "id" | "created_at" | "user_id">>;

export type ProfileUpdate = Partial<Omit<Profile, "id" | "created_at">>;

// Recipe categories
export const RECIPE_CATEGORIES = [
  { value: "soup", label: "Çorbalar" },
  { value: "main", label: "Ana Yemekler" },
  { value: "appetizer", label: "Mezeler & Başlangıçlar" },
  { value: "salad", label: "Salatalar" },
  { value: "dessert", label: "Tatlılar" },
  { value: "breakfast", label: "Kahvaltılıklar" },
  { value: "snack", label: "Atıştırmalıklar" },
  { value: "drink", label: "İçecekler" },
  { value: "bakery", label: "Hamur İşleri" },
  { value: "vegan", label: "Vegan" },
  { value: "other", label: "Diğer" },
] as const;

export type RecipeCategory = typeof RECIPE_CATEGORIES[number]["value"];

// Difficulty levels
export const DIFFICULTY_LEVELS = [
  { value: "easy", label: "Kolay", color: "bg-green-100 text-green-700" },
  { value: "medium", label: "Orta", color: "bg-yellow-100 text-yellow-700" },
  { value: "hard", label: "Zor", color: "bg-red-100 text-red-700" },
] as const;

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
