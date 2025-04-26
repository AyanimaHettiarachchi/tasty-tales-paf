
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit2, Camera, BookOpen, Heart, Settings, LogOut } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecipeCard from '@/components/RecipeCard';
import LearningPlanCard from '@/components/LearningPlanCard';
import { mockRecipes, mockLearningPlans } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('Jane Smith');
  const [bio, setBio] = useState('Food enthusiast and home cook. I love exploring new recipes and sharing my cooking adventures!');
  const [email, setEmail] = useState('jane.smith@example.com');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  // Filter to show only first 3 recipes for demo purposes
  const userRecipes = mockRecipes.slice(0, 3);
  const savedRecipes = mockRecipes.slice(3, 6);
  const userLearningPlans = mockLearningPlans.slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src="https://i.pravatar.cc/300" alt={name} />
                        <AvatarFallback className="text-2xl">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full bg-white">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className="text-gray-600 text-center text-sm">{bio}</p>
                  </div>
                  
                  <div className="mt-8 space-y-2">
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${activeTab === 'profile' ? 'bg-gray-100' : ''}`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <Settings className="mr-2 h-5 w-5" />
                      Account Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${activeTab === 'myRecipes' ? 'bg-gray-100' : ''}`}
                      onClick={() => setActiveTab('myRecipes')}
                    >
                      <BookOpen className="mr-2 h-5 w-5" />
                      My Recipes
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${activeTab === 'saved' ? 'bg-gray-100' : ''}`}
                      onClick={() => setActiveTab('saved')}
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Saved Recipes
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${activeTab === 'learningPlans' ? 'bg-gray-100' : ''}`}
                      onClick={() => setActiveTab('learningPlans')}
                    >
                      <BookOpen className="mr-2 h-5 w-5" />
                      My Learning Plans
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50">
                      <LogOut className="mr-2 h-5 w-5" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="w-full md:w-3/4">
              {activeTab === 'profile' && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">Profile Information</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit2 className="mr-2 h-4 w-4" />
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </Button>
                    </div>
                    
                    {isEditing ? (
                      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Input 
                            id="bio" 
                            value={bio} 
                            onChange={(e) => setBio(e.target.value)} 
                          />
                        </div>
                        <Button type="submit" className="bg-tasty-primary">Save Changes</Button>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                          <p className="mt-1">{name}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Email</h4>
                          <p className="mt-1">{email}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Bio</h4>
                          <p className="mt-1">{bio}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              
              {activeTab === 'myRecipes' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">My Recipes</h3>
                    <Button asChild className="bg-tasty-primary">
                      <a href="/add-recipe">Create New Recipe</a>
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userRecipes.map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'saved' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Saved Recipes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedRecipes.map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'learningPlans' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">My Learning Plans</h3>
                    <Button asChild className="bg-tasty-primary">
                      <a href="/add-learning-plan">Create New Plan</a>
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {userLearningPlans.map((plan) => (
                      <LearningPlanCard key={plan.id} learningPlan={plan} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
