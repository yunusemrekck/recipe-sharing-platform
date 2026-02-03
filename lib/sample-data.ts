import type { Recipe } from "@/components/RecipeCard";

export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    title: "Creamy Tuscan Chicken Pasta",
    description:
      "Sun-dried tomatoes, spinach, and a rich parmesan cream sauce make this weeknight pasta feel like a restaurant meal.",
    coverImage:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    author: {
      name: "Maria Santos",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    tags: ["Pasta", "Italian", "Comfort Food"],
    likes: 342,
  },
  {
    id: "2",
    title: "Classic Lemon Blueberry Scones",
    description:
      "Tender, buttery scones with fresh blueberries and a bright lemon glaze. Perfect with your morning coffee.",
    coverImage:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&h=600&fit=crop",
    prepTime: 20,
    cookTime: 18,
    servings: 8,
    author: {
      name: "James Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    tags: ["Baking", "Breakfast", "British"],
    likes: 218,
  },
  {
    id: "3",
    title: "Spicy Thai Basil Stir-Fry",
    description:
      "A quick and fiery stir-fry with crispy tofu, Thai basil, and a savory-sweet sauce that comes together in minutes.",
    coverImage:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=600&fit=crop",
    prepTime: 10,
    cookTime: 12,
    servings: 2,
    author: {
      name: "Lisa Nguyen",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    tags: ["Thai", "Vegetarian", "Quick"],
    likes: 456,
  },
  {
    id: "4",
    title: "Homemade Sourdough Bread",
    description:
      "A beautifully crusty loaf with a soft, airy crumb. This traditional recipe is worth every hour of rising time.",
    coverImage:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop",
    prepTime: 30,
    cookTime: 45,
    servings: 12,
    author: {
      name: "David Miller",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    tags: ["Baking", "Bread", "Artisan"],
    likes: 891,
  },
  {
    id: "5",
    title: "Mediterranean Grilled Salmon",
    description:
      "Herb-crusted salmon with a zesty lemon-caper sauce, served over a bed of quinoa with roasted vegetables.",
    coverImage:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    author: {
      name: "Sofia Rossi",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    tags: ["Seafood", "Mediterranean", "Healthy"],
    likes: 567,
  },
  {
    id: "6",
    title: "Decadent Chocolate Lava Cakes",
    description:
      "Individual molten chocolate cakes with a gooey center. Surprisingly easy and endlessly impressive.",
    coverImage:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&h=600&fit=crop",
    prepTime: 20,
    cookTime: 12,
    servings: 4,
    author: {
      name: "Emma Laurent",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    },
    tags: ["Dessert", "Chocolate", "French"],
    likes: 723,
  },
  {
    id: "7",
    title: "Korean Bibimbap Bowl",
    description:
      "A colorful rice bowl topped with seasoned vegetables, a fried egg, and spicy gochujang sauce.",
    coverImage:
      "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800&h=600&fit=crop",
    prepTime: 25,
    cookTime: 20,
    servings: 2,
    author: {
      name: "Min-Ji Park",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
    tags: ["Korean", "Rice Bowl", "Healthy"],
    likes: 445,
  },
  {
    id: "8",
    title: "Fresh Summer Gazpacho",
    description:
      "A refreshing cold Spanish soup made with ripe tomatoes, cucumber, and peppers. Perfect for hot days.",
    coverImage:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop",
    prepTime: 20,
    cookTime: 0,
    servings: 6,
    author: {
      name: "Carlos Mendez",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    tags: ["Spanish", "Soup", "No-Cook"],
    likes: 189,
  },
];
