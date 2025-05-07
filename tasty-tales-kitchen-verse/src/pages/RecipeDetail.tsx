import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Users, ChefHat, Timer, Heart, MessageCircle, Share2, Bookmark, ArrowLeft, Star, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';
import { toast } from 'sonner';
import { Recipe } from '@/types';

// TODO: Replace this with actual user ID from authentication system

const getCurrentUserId = () => {

  // Example: Fetch user ID from localStorage, context, or auth service

  // For now, using a placeholder; replace with your auth logic
  return localStorage.getItem('userId') || 'current-user-id';
};

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [similarRecipes, setSimilarRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    console.log('Recipe ID:', id);
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8081/api/recipes/${id}`);
        setRecipe(response.data);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching recipe:', error.response?.data || error.message);
        if (error.response?.status === 404) {
          setError('Recipe not found. It may have been deleted or the ID is incorrect.');
          toast.error('Recipe not found');
        } else {
          const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'An unexpected error occurred';
          setError(`Failed to load recipe: ${errorMessage}`);
          toast.error(`Failed to load recipe: ${errorMessage}`);
        }
        setLoading(false);
      }
    };

    const fetchSimilarRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/recipes');
        setSimilarRecipes(response.data.filter((r: Recipe) => r.id !== id).slice(0, 3));
      } catch (error) {
        console.error('Error fetching similar recipes:', error);
        toast.error('Failed to load similar recipes');
      }
    };

    fetchRecipe();
    fetchSimilarRecipes();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await axios.delete(`http://localhost:8081/api/recipes/${id}`);
        toast.success('Recipe deleted successfully!');
        navigate('/recipes');
      } catch (error: any) {
        console.error('Error deleting recipe:', error.response?.data || error.message);
        const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'An unexpected error occurred';
        toast.error(`Failed to delete recipe: ${errorMessage}`);
      }
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

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{error || 'Recipe not found'}</h1>
            <Button asChild>
              <Link to="/recipes">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Recipes
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-tasty-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/recipes" className="hover:text-tasty-primary">Recipes</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{recipe.title}</span>
          </div>
          
          {/* Recipe Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{recipe.title}</h1>
              <p className="text-gray-600 mb-4">{recipe.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.categories.map((category) => (
                  <Link key={category} to={`/categories/${category}`}>
                    <Badge className="bg-tasty-light hover:bg-tasty-primary">{category}</Badge>
                  </Link>
                ))}
                {recipe.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-gray-600">{tag}</Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Prep: {recipe.preparationTime} min</span>
                </div>
                <div className="flex items-center">
                  <Timer className="h-4 w-4 mr-1" />
                  <span>Cook: {recipe.cookingTime} min</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Serves: {recipe.servings}</span>
                </div>
                <div className="flex items-center">
                  <ChefHat className="h-4 w-4 mr-1" />
                  <span>Difficulty: {recipe.difficulty}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Link to={`/profile/${recipe.author.id}`} className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-2">
                  <AvatarImage src={recipe.author.profileImageUrl} alt={recipe.author.name || recipe.author.username} />
                  <AvatarFallback>{recipe.author.name?.charAt(0) || recipe.author.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{recipe.author.name || recipe.author.username}</p>
                  <p className="text-sm text-gray-500">@{recipe.author.username}</p>
                </div>
              </Link>
              <div className="flex flex-wrap gap-2">
                {recipe.author.id === currentUserId && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                    >
                      <Link to={`/edit-recipe/${recipe.id}`}>
                        <Edit2 className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={handleDelete}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={isLiked ? "text-tasty-primary border-tasty-primary" : ""}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-tasty-primary" : ""}`} />
                  {isLiked ? recipe.likes + 1 : recipe.likes}
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Comment
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={isSaved ? "text-tasty-primary border-tasty-primary" : ""}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Bookmark className={`h-4 w-4 mr-1 ${isSaved ? "fill-tasty-primary" : ""}`} />
                  Save
                </Button>
              </div>
            </div>
          </div>
          
          {/* Recipe Images */}
          
          <div className="mb-8">
            <AspectRatio ratio={16 / 9} className="bg-gray-100 rounded-lg overflow-hidden mb-2">
              <img 
                src={recipe.imageUrls[activeImage]} 
                alt={`${recipe.title} - image ${activeImage + 1}`}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            {recipe.imageUrls.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2">
                {recipe.imageUrls.map((imageUrl, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${index === activeImage ? 'ring-2 ring-tasty-primary' : ''}`}
                  >
                    <img 
                      src={imageUrl} 
                      alt={`${recipe.title} - thumbnail ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          
          {/* Recipes Content */}
          <Tabs defaultValue="ingredients" className="mb-12">
            <TabsList className="mb-4">
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <p className="text-gray-500 mb-6">For {recipe.servings} servings</p>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-tasty-light/20 text-tasty-primary flex items-center justify-center mr-3 mt-0.5">
                      <Star className="h-3.5 w-3.5" />
                    </div>
                    <span>
                      <strong>{ingredient.quantity} {ingredient.unit}</strong> {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button className="bg-tasty-primary hover:bg-tasty-dark">
                  Add to Shopping List
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="instructions" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Instructions</h2>
              <ol className="space-y-6">
                {recipe.steps.map((step) => (
                  <li key={step.id} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-8 w-8 rounded-full bg-tasty-primary text-white flex items-center justify-center font-bold">
                        {step.order}
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="text-gray-800">{step.instruction}</p>
                      {step.imageUrl && (
                        <img 
                          src={step.imageUrl} 
                          alt={`Step ${step.order}`}
                          className="mt-3 rounded-md w-full max-w-md"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </TabsContent>
            <TabsContent value="nutrition" className="bg-white rounded-lg p-6 shadow-sm text-center">
              <h2 className="text-2xl font-bold mb-4">Nutrition Information</h2>
              <p className="text-gray-500 mb-8">Coming soon!</p>
              <div className="max-w-md mx-auto">
                <p className="text-gray-600">
                  We're currently working on adding nutritional information to all our recipes.
                  Please check back later!
                </p>
              </div>
            </TabsContent>
            <TabsContent value="comments" className="bg-white rounded-lg p-6 shadow-sm text-center">
              <h2 className="text-2xl font-bold mb-4">Comments</h2>
              <p className="text-gray-500 mb-8">Be the first to comment on this recipe!</p>
              <div className="max-w-md mx-auto">
                <Button className="bg-tasty-primary hover:bg-tasty-dark">
                  Add a Comment
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Similar Recipes */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarRecipes.map((similarRecipe) => (
                <div key={similarRecipe.id} className="tasty-card">
                  <Link to={`/recipes/${similarRecipe.id}`}>
                    <AspectRatio ratio={16 / 9}>
                      <img 
                        src={similarRecipe.imageUrls[0]} 
                        alt={similarRecipe.title} 
                        className="object-cover w-full h-full rounded-t-lg"
                      />
                    </AspectRatio>
                  </Link>
                  <div className="p-4">
                    <Link to={`/recipes/${similarRecipe.id}`}>
                      <h3 className="font-bold text-lg hover:text-tasty-primary transition-colors">
                        {similarRecipe.title}
                      </h3>
                    </Link>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{similarRecipe.preparationTime + similarRecipe.cookingTime} min</span>
                      <span className="mx-2">•</span>
                      <Badge variant="outline" className="text-xs">
                        {similarRecipe.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecipeDetail;