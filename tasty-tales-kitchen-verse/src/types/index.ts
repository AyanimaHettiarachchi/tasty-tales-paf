// DOCUMENT filename="types.ts"

// Interface for Recipe, aligned with Recipe.java
export interface Recipe {
  id?: string; // Optional, set by MongoDB
  title: string;
  description: string;
  imageUrls: string[]; // List of image URLs, initialized as empty array
  videoUrl?: string; // Optional, nullable in Recipe.java
  preparationTime: number; // Integer in backend, defaults to 0
  cookingTime: number; // Integer in backend, defaults to 0
  servings: number; // Integer in backend, defaults to 1
  difficulty: 'Easy' | 'Medium' | 'Hard'; // String in backend, defaults to "Easy"
  ingredients: Ingredient[]; // List of ingredients, initialized as empty array
  steps: Step[]; // List of steps, initialized as empty array
  categories: string[]; // List of categories, initialized as empty array
  tags: string[]; // List of tags, initialized as empty array
  author: Author; // Required in backend
  likes: number; // Integer in backend, defaults to 0
  createdAt?: string; // Set by backend (LocalDateTime serialized as string)
  updatedAt?: string; // Set by backend (LocalDateTime serialized as string)
}

// Interface for Ingredient, aligned with Ingredient.java
export interface Ingredient {
  id: string; // Non-optional, assigned by backend
  name: string;
  quantity: string; // String to support fractional values (e.g., "1/2")
  unit: string; // e.g., "cups", "tbsp"
}

// Interface for Step, aligned with Step.java
export interface Step {
  id: string; // Non-optional, assigned by backend
  order: number; // Required, indicates step sequence
  instruction: string; // Required
  imageUrl?: string; // Optional, nullable in backend
}

// Interface for Author, as provided
export interface Author {
  id: string; // Required, unique identifier
  username: string; // Required
  name?: string; // Optional
  bio?: string; // Optional
  profileImageUrl?: string; // Optional
  followers: number; // Integer, defaults to 0
  following: number; // Integer, defaults to 0
  recipes: number; // Integer, defaults to 0
  learningPlans: number; // Integer, defaults to 0
}

// Interface for Discussion, as provided
export interface Discussion {
  id?: string; // Optional, set by MongoDB
  title: string;
  content: string;
  images: string[]; // List of image URLs
  tags: string[]; // List of tags
  author: Author; // Required
  likes: number; // Integer, defaults to 0
  comments: Comment[]; // List of comments
  createdAt?: string; // Set by backend
  updatedAt?: string; // Set by backend
}

// Interface for Comment, as provided
export interface Comment {
  id?: string; // Optional, set by MongoDB
  content: string;
  author: Author; // Required
  createdAt?: string; // Set by backend
}

// Interface for LearningPlan, as provided
export interface LearningPlan {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  author: Author;
  steps: LearningStep[];
  categories: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for LearningStep, as provided
export interface LearningStep {
  id: string;
  order: number;
  title: string;
  description: string;
  completed: boolean;
}

// Interface for Resource, as provided
export interface Resource {
  id?: string; // Optional, set by MongoDB
  title: string;
  type: 'Video' | 'Blog' | 'Book' | 'Other';
  url: string; // Required, URL to the resource
}