import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
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

// Form values 
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

const EditRecipe = () => {
  const { id } = useParams<{ id: string }>(); // Get recipe ID from URL
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize form with default values
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
  });

  
  // Fetch recipe data on mount
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/recipes/${id}`);
        const recipe: Recipe = response.data;
        form.reset({
          title: recipe.title,
          description: recipe.description,
          preparationTime: recipe.preparationTime.toString(),
          cookingTime: recipe.cookingTime.toString(),
          servings: recipe.servings.toString(),
          difficulty: recipe.difficulty,
          categories: recipe.categories.join(', '),
          tags: recipe.tags.join(', '),
        });
        setImageUrls(recipe.imageUrls || []);
        setIngredients(recipe.ingredients || []);
        setSteps(recipe.steps || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        toast.error('Failed to load recipe');
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id, form]);

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
      id,
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
      console.log('Updating recipe:', JSON.stringify(recipe, null, 2));
      const response = await axios.put(`http://localhost:8081/api/recipes/${id}`, recipe, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response.data);
      toast.success('Recipe updated successfully!');
      navigate(`/recipes/${id}`);
    } catch (error: any) {
      const errorMessage = error.response?.data || error.message;
      console.error('Error updating recipe:', errorMessage);
      toast.error(`Failed to update recipe: ${errorMessage}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b pb-2">Recipe Details</h2>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Chocolate Cake" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your recipe..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preparationTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preparation Time (minutes)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 15" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cookingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cooking Time (minutes)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="servings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Servings</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 4" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Easy, Medium, Hard" {...field} />
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
                        <FormLabel>Categories</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Dessert, Dinner (comma separated)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Quick, Healthy (comma separated)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b pb-2">Images</h2>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Recipe Images (up to 3)
                    </label>
                    <div className="flex flex-wrap gap-4 mb-4">
                      {imageUrls.map((img, index) => (
                        <div key={index} className="relative w-32 h-32">
                          <img
                            src={img}
                            alt={`Recipe ${index + 1}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      {imageUrls.length < 3 && (
                        <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400">
                          <div className="flex flex-col items-center">
                            <Upload className="h-8 w-8 text-gray-400" />
                            <span className="text-sm text-gray-500">Add Image</span>
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
                  <h2 className="text-xl font-semibold border-b pb-2">Ingredients</h2>
                  {ingredients.length === 0 && (
                    <p className="text-gray-500">No ingredients added yet.</p>
                  )}
                  {ingredients.map((ingredient, index) => (
                    <div key={ingredient.id} className="flex gap-4 items-end">
                      <div className="flex-1">
                        <FormLabel>Name</FormLabel>
                        <Input
                          placeholder="e.g., Flour"
                          value={ingredient.name}
                          onChange={e => updateIngredient(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="w-28">
                        <FormLabel>Quantity</FormLabel>
                        <Input
                          placeholder="e.g., 2"
                          value={ingredient.quantity}
                          onChange={e => updateIngredient(index, 'quantity', e.target.value)}
                        />
                      </div>
                      <div className="w-28">
                        <FormLabel>Unit</FormLabel>
                        <Input
                          placeholder="e.g., cups"
                          value={ingredient.unit}
                          onChange={e => updateIngredient(index, 'unit', e.target.value)}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeIngredient(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addIngredient}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Ingredient
                  </Button>
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b pb-2">Steps</h2>
                  {steps.length === 0 && (
                    <p className="text-gray-500">No steps added yet.</p>
                  )}
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex gap-4 items-end">
                      <div className="w-16">
                        <FormLabel>Step {step.order}</FormLabel>
                        <Input
                          type="number"
                          value={step.order}
                          disabled
                          readOnly
                        />
                      </div>
                      <div className="flex-1">
                        <FormLabel>Instruction</FormLabel>
                        <Textarea
                          placeholder="e.g., Mix all ingredients in a bowl"
                          value={step.instruction}
                          onChange={e => updateStep(index, 'instruction', e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeStep(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addStep}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Step
                  </Button>
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/recipes/${id}`)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Update Recipe
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

export default EditRecipe;