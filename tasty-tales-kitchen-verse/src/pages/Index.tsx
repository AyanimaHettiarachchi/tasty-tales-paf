
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Award, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import RecipeCard from '@/components/RecipeCard';
import CategoryCard from '@/components/CategoryCard';
import LearningPlanCard from '@/components/LearningPlanCard';
import { mockRecipes, mockCategories, mockLearningPlans } from '@/data/mockData';

const Index = () => {
  const featuredRecipes = mockRecipes.slice(0, 3);
  const popularCategories = mockCategories.slice(0, 6);
  const featuredLearningPlans = mockLearningPlans.slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Recipes */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">Featured Recipes</h2>
                <p className="text-gray-600 mt-2">Discover our most popular recipes this week</p>
              </div>
              <Button asChild variant="ghost" className="hidden md:flex items-center text-tasty-primary">
                <Link to="/recipes">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Button asChild variant="outline">
                <Link to="/recipes">View All Recipes</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">How Tasty Tales Works</h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                Join our community to share recipes, create learning plans, and connect with other food enthusiasts
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-tasty-light text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Share Your Recipes</h3>
                <p className="text-gray-600">
                  Upload your favorite recipes with photos, instructions, and tips for others to enjoy.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-tasty-light text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Create Learning Plans</h3>
                <p className="text-gray-600">
                  Design step-by-step learning paths to help others master cooking skills and techniques.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-tasty-light text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Track Your Progress</h3>
                <p className="text-gray-600">
                  Follow learning plans, mark your progress, and celebrate your culinary achievements.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild className="bg-tasty-primary hover:bg-tasty-dark">
                <Link to="/signup">Join Our Community</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Browse Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">Browse Categories</h2>
                <p className="text-gray-600 mt-2">Explore recipes by category</p>
              </div>
              <Button asChild variant="ghost" className="hidden md:flex items-center text-tasty-primary">
                <Link to="/categories">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Button asChild variant="outline">
                <Link to="/categories">View All Categories</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Learning Plans */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">Featured Learning Plans</h2>
                <p className="text-gray-600 mt-2">Master new cooking skills step by step</p>
              </div>
              <Button asChild variant="ghost" className="hidden md:flex items-center text-tasty-primary">
                <Link to="/learning-plans">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredLearningPlans.map((plan) => (
                <LearningPlanCard key={plan.id} learningPlan={plan} />
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Button asChild variant="outline">
                <Link to="/learning-plans">View All Learning Plans</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-tasty-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Culinary Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join Tasty Tales today and connect with food enthusiasts from around the world.
              Share recipes, learn new skills, and track your progress!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-tasty-primary hover:bg-gray-100">
                <Link to="/signup">Sign Up Now</Link>
              </Button>
              <Button asChild variant="outline" className="border-white hover:bg-white/10">
                <Link to="/recipes">Explore Recipes</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
