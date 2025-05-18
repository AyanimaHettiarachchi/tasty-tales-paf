import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Recipe, Ingredient, Step } from '@/types';

interface RecipeFormValues {
  title: string;
  description: string;
  preparationTime: string;
  cookingTime: string;
  servings: string;
  difficulty: string;
  categories: string;
  tags: string;
}

const AddRecipe = () => {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);

  const form = useForm<RecipeFormValues>({
    defaultValues: {
      title: '',
      description: '',
      preparationTime: '',
      cookingTime: '',
      servings: '',
      difficulty: 'Easy',
      categories: '',
      tags: '',
    },
    mode: 'onChange',
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (imageUrls.length + files.length > 3) {
      toast.error('You can only upload up to 3 images.');
      return;
    }

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setImageUrls(prev => [...prev, ev.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const addIngredient = () => {
    setIngredients(prev => [
      ...prev,
      { id: uuidv4(), name: '', quantity: '', unit: '' },
    ]);
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    setIngredients(prev =>
      prev.map((ing, i) =>
        i === index ? { ...ing, [field]: value } : ing
      )
    );
  };

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const addStep = () => {
    setSteps(prev => [
      ...prev,
      { id: uuidv4(), order: prev.length + 1, instruction: '', imageUrl: '' },
    ]);
  };

  const updateStep = (index: number, field: keyof Step, value: string) => {
    setSteps(prev =>
      prev.map((step, i) =>
        i === index ? { ...step, [field]: value } : step
      )
    );
  };

  const removeStep = (index: number) => {
    setSteps(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: RecipeFormValues) => {
    if (!data.title || !data.description) {
      toast.error('Please fill in title and description.');
      return;
    }

    if (ingredients.length === 0) {
      toast.error('Please add at least one ingredient.');
      return;
    }

    if (steps.length === 0) {
      toast.error('Please add at least one step.');
      return;
    }

    const validIngredients = ingredients.map(ing => ({
      id: ing.id,
      name: ing.name || '',
      quantity: ing.quantity || '',
      unit: ing.unit || '',
    }));

    const validSteps = steps.map(step => ({
      id: step.id,
      order: step.order,
      instruction: step.instruction || '',
      imageUrl: step.imageUrl || '',
    }));

    const recipe: Partial<Recipe> = {
      title: data.title,
      description: data.description,
      imageUrls: imageUrls.length > 0 ? imageUrls : [],
      videoUrl: '',
      preparationTime: parseInt(data.preparationTime) || 0,
      cookingTime: parseInt(data.cookingTime) || 0,
      servings: parseInt(data.servings) || 1,
      difficulty: (data.difficulty || 'Easy') as 'Easy' | 'Medium' | 'Hard',
      ingredients: validIngredients,
      steps: validSteps,
      categories: data.categories
        .split(',')
        .map(c => c.trim())
        .filter(Boolean),
      tags: data.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      author: {
        id: 'current-user-id',
        username: 'current-user',
        name: 'Current User',
        bio: '',
        profileImageUrl: '',
        followers: 0,
        following: 0,
        recipes: 0,
        learningPlans: 0,
      },
      likes: 0,
    };

    try {
      const response = await axios.post(`http://localhost:8081/api/recipes`, recipe, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Recipe created successfully!');
      navigate(`/recipes/${response.data.id}`);
    } catch (error: any) {
      const errorMessage = error.response?.data || error.message;
      console.error('Error creating recipe:', errorMessage);
      toast.error(`Failed to create recipe: ${errorMessage}`);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-[#FFF9F0]"
      style={{
        backgroundImage: 'linear-gradient(to bottom, #FFF9F0, #FFEED8)',
      }}
    >
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-3xl mx-auto rounded-lg shadow-md p-6 md:p-8"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #E8D8B8',
              boxShadow: '0 4px 15px rgba(139, 69, 19, 0.1)'
            }}
          >
            <h1 
              className="text-3xl font-bold mb-8 text-center"
              style={{ color: '#8B4513' }}
            >
              Add New Recipe
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <h2 
                    className="text-xl font-semibold border-b pb-2"
                    style={{ color: '#A0522D', borderColor: '#E8D8B8' }}
                  >
                    Recipe Details
                  </h2>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#5A4A3A]">Title:</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Chocolate Cake" 
                            {...field}
                            className="border-[#E8D8B8] focus:border-[#D4A76A] focus:ring-[#D4A76A] bg-[#FFFDFA]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: 'Title is required',
                      minLength: {
                        value: 2,
                        message: 'Title must be at least 2 characters',
                      },
                      maxLength: {
                        value: 100,
                        message: 'Title cannot exceed 100 characters',
                      },
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#5A4A3A]">Description:</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your recipe..."
                            className="min-h-[100px] border-[#E8D8B8] focus:border-[#D4A76A] focus:ring-[#D4A76A] bg-[#FFFDFA]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    rules={{
                      required: 'Description is required',
                      validate: {
                        minWords: value => {
                          const wordCount = value.trim().split(/\s+/).length;
                          return wordCount >= 10 || 'Description must have at least 10 words';
                        },
                      },
                    }}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="preparationTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#5A4A3A]">Preparation Time (minutes):</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="e.g., 15" 
                              {...field}
                              className="border-[#E8D8B8] focus:border-[#D4A76A] focus:ring-[#D4A76A] bg-[#FFFDFA]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      rules={{
                        required: 'Preparation time is required',
                        min: {
                          value: 1,
                          message: 'Preparation time must be at least 1 minute'
                        },
                        max: {
                          value: 1440,
                          message: 'Preparation time cannot exceed 24 hours (1440 minutes)'
                        }
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="cookingTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#5A4A3A]">Cooking Time (minutes):</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="e.g., 30" 
                              {...field}
                              className="border-[#E8D8B8] focus:border-[#D4A76A] focus:ring-[#D4A76A] bg-[#FFFDFA]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      rules={{
                        required: 'Cooking time is required',
                        min: {
                          value: 0,
                          message: 'Cooking time cannot be negative'
                        },
                        max: {
                          value: 1440,
                          message: 'Cooking time cannot exceed 24 hours (1440 minutes)'
                        }
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="servings"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#5A4A3A]">Servings:</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="e.g., 4" 
                              {...field}
                              className="border-[#E8D8B8] focus:border-[#D4A76A] focus:ring-[#D4A76A] bg-[#FFFDFA]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      rules={{
                        required: 'Servings is required',
                        min: {
                          value: 1,
                          message: 'Must serve at least 1 person'
                        },
                        max: {
                          value: 100,
                          message: 'Cannot serve more than 100 people'
                        }
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#5A4A3A]">Difficulty:</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full border-[#E8D8B8] rounded-md shadow-sm focus:border-[#D4A76A] focus:ring focus:ring-[#D4A76A] focus:ring-opacity-50 bg-[#FFFDFA] py-2 px-3"
                            >
                              <option value="Easy">Easy</option>
                              <option value="Medium">Medium</option>
                              <option value="Hard">Hard</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="categories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#5A4A3A]">Categories:</FormLabel>
                          <FormControl>
                            <select
                              multiple
                              {...field}
                              value={field.value ? field.value.split(',').map(c => c.trim()) : []}
                              onChange={(e) => {
                                const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                                field.onChange(selectedOptions.join(','));
                              }}
                              className="w-full border-[#E8D8B8] rounded-md shadow-sm focus:border-[#D4A76A] focus:ring focus:ring-[#D4A76A] focus:ring-opacity-50 min-h-[100px] bg-[#FFFDFA] py-2 px-3"
                            >
                              <option value="Breakfast">Breakfast</option>
                              <option value="Lunch">Lunch</option>
                              <option value="Dinner">Dinner</option>
                              <option value="Dessert">Dessert</option>
                              <option value="Snack">Snack</option>
                              <option value="Appetizer">Appetizer</option>
                              <option value="Main Course">Main Course</option>
                              <option value="Side Dish">Side Dish</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#5A4A3A]">Tags (optional):</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Quick, Healthy (comma separated)"
                            {...field}
                            className="border-[#E8D8B8] focus:border-[#D4A76A] focus:ring-[#D4A76A] bg-[#FFFDFA]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h2 
                    className="text-xl font-semibold border-b pb-2"
                    style={{ color: '#A0522D', borderColor: '#E8D8B8' }}
                  >
                    Images:
                  </h2>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#5A4A3A]">
                      Recipe Images (up to 3)
                    </label>
                    <div className="flex flex-wrap gap-4 mb-4">
                      {imageUrls.map((img, index) => (
                        <div key={index} className="relative w-32 h-32">
                          <img
                            src={img}
                            alt={`Recipe ${index + 1}`}
                            className="w-full h-full object-cover rounded-md border border-[#E8D8B8]"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      {imageUrls.length < 3 && (
                        <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-[#D4A76A] rounded-md cursor-pointer hover:border-[#B38B5B] transition-colors bg-[#FFFDFA]">
                          <div className="flex flex-col items-center text-[#8B4513]">
                            <Upload className="h-8 w-8" />
                            <span className="text-sm mt-1">Add Image</span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 
                    className="text-xl font-semibold border-b pb-2"
                    style={{ color: '#A0522D', borderColor: '#E8D8B8' }}
                  >
                    Ingredients:
                  </h2>
                  {ingredients.length === 0 && (
                    <p className="text-[#8B4513]">No ingredients added yet.</p>
                  )}
                  {ingredients.map((ingredient, index) => (
                    <div key={ingredient.id} className="flex gap-4 items-end">
                      <div className="flex-1">
                        <FormLabel className="text-[#5A4A3A]">Name</FormLabel>
                        <Input
                          placeholder="e.g., Flour"
                          value={ingredient.name}
                          onChange={e => updateIngredient(index, 'name', e.target.value)}
                          className="border-[#E8D8B8] focus:border-[#D4A76A] focus:ring-[#D4A76A] bg-[#FFFDFA]"
                        />
                      </div>
                      <div className="w-28">
                        <FormLabel className="text-[#5A4A3A]">Quantity</FormLabel>
                        <Input
                          placeholder="e.g., 2"
                          value={ingredient.quantity}
                          onChange={e => updateIngredient(index, 'quantity', e.target.value)}
                          className="border-[#E8D8B8] focus:border-[#D4A76A] focus:ring-[#D4A76A] bg-[#FFFDFA]"
                        />
                      </div>
                      <div className="w-28">
                        <FormLabel className="text-[#5A4A3A]">Unit</FormLabel>
                        <Input
                          placeholder="e.g., cups"
                          value={ingredient.unit}
                          onChange={e => updateIngredient(index, 'unit', e.target.value)}
                          className="border-[#E8D8B8] focus:border-[#D4A76A] focus:ring-[#D4A76A] bg-[#FFFDFA]"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeIngredient(index)}
                        className="h-10"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={addIngredient}
                    className="bg-[#D4A76A] hover:bg-[#B38B5B] text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Ingredient
                  </Button>
                </div>

                <div className="space-y-4">
                  <h2 
                    className="text-xl font-semibold border-b pb-2"
                    style={{ color: '#A0522D', borderColor: '#E8D8B8' }}
                  >
                    Steps:
                  </h2>
                  {steps.length === 0 && (
                    <p className="text-[#8B4513]">No steps added yet.</p>
                  )}
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex gap-4 items-end">
                      <div className="w-16">
                        <FormLabel className="text-[#5A4A3A]">Step {step.order}</FormLabel>
                        <Input
                          type="number"
                          value={step.order}
                          disabled
                          readOnly
                          className="border-[#E8D8B8] bg-[#FFFDFA]"
                        />
                      </div>
                      <div className="flex-1">
                        <FormLabel className="text-[#5A4A3A]">Instruction</FormLabel>
                        <Textarea
                          placeholder="e.g., Mix all ingredients in a bowl"
                          value={step.instruction}
                          onChange={e => updateStep(index, 'instruction', e.target.value)}
                          className="min-h-[80px] border-[#E8D8B8] focus:border-[#D4A76A] focus:ring-[#D4A76A] bg-[#FFFDFA]"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeStep(index)}
                        className="h-10"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={addStep}
                    className="bg-[#D4A76A] hover:bg-[#B38B5B] text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Step
                  </Button>
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/recipes')}
                    className="border-[#D4A76A] text-[#8B4513] hover:bg-[#FFF0D9]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#8B4513] hover:bg-[#6B3410] text-white"
                    disabled={!form.formState.isValid}
                  >
                    Create Recipe
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddRecipe;