
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, MessageSquare, User, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock data for community
const mockUsers = [
  { id: 1, name: 'Jamie Oliver', username: 'jamieoliver', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', followers: 15423, recipes: 87 },
  { id: 2, name: 'Sophia Chen', username: 'sophiachen', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', followers: 8932, recipes: 56 },
  { id: 3, name: 'Marcus Rodriguez', username: 'chefmarcus', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', followers: 6254, recipes: 41 },
  { id: 4, name: 'Aisha Johnson', username: 'aishacooks', avatar: 'https://randomuser.me/api/portraits/women/28.jpg', followers: 4587, recipes: 39 },
  { id: 5, name: 'David Park', username: 'davidcooks', avatar: 'https://randomuser.me/api/portraits/men/42.jpg', followers: 3211, recipes: 27 },
  { id: 6, name: 'Emma Watson', username: 'emmacooks', avatar: 'https://randomuser.me/api/portraits/women/24.jpg', followers: 2876, recipes: 19 },
];

const mockDiscussions = [
  { 
    id: 1, 
    title: 'Best substitute for eggs in baking?', 
    author: 'veganfoodie', 
    replies: 24, 
    lastActive: '2 hours ago',
    tags: ['baking', 'vegan', 'substitutes'] 
  },
  { 
    id: 2, 
    title: 'Tips for crispy pizza crust at home?', 
    author: 'pizzalover', 
    replies: 38, 
    lastActive: '5 hours ago',
    tags: ['pizza', 'baking', 'tips'] 
  },
  { 
    id: 3, 
    title: 'How to properly store fresh herbs?', 
    author: 'herbgardener', 
    replies: 15, 
    lastActive: '1 day ago',
    tags: ['herbs', 'storage', 'tips'] 
  },
  { 
    id: 4, 
    title: 'Favorite kitchen gadgets under $30?', 
    author: 'kitchengeek', 
    replies: 42, 
    lastActive: '2 days ago',
    tags: ['gadgets', 'budget', 'recommendations'] 
  },
  { 
    id: 5, 
    title: 'Meal prep ideas for busy professionals', 
    author: 'busycook', 
    replies: 29, 
    lastActive: '3 days ago',
    tags: ['meal prep', 'quick', 'easy'] 
  },
];

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Page Header */}
        <div className="bg-tasty-primary py-12">
          <div className="container mx-auto px-4 text-white">
            <h1 className="text-4xl font-bold mb-2">Community</h1>
            <p className="text-xl">Connect with fellow food enthusiasts and join the conversation</p>
          </div>
        </div>
        
        {/* Community Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search community..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-5 w-5" />
              Filters
            </Button>
          </div>

          <Tabs defaultValue="discussions" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="discussions" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Discussions
              </TabsTrigger>
              <TabsTrigger value="members" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Members
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="discussions" className="space-y-4">
              {filterOpen && (
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Topic</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Recipes</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Techniques</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Equipment</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Ingredients</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Activity</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Today</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>This week</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>This month</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Replies</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>No replies yet</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>1-10 replies</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>10+ replies</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-white rounded-lg shadow-sm divide-y">
                {mockDiscussions.map((discussion) => (
                  <div key={discussion.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium hover:text-tasty-primary transition-colors">
                          <a href={`/discussions/${discussion.id}`}>{discussion.title}</a>
                        </h3>
                        <div className="mt-2 flex items-center text-sm text-gray-600">
                          <span>Started by @{discussion.author}</span>
                          <span className="mx-2">•</span>
                          <span>{discussion.replies} replies</span>
                          <span className="mx-2">•</span>
                          <span>Last active {discussion.lastActive}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {discussion.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button 
                  className="bg-tasty-primary hover:bg-tasty-dark"
                  asChild
                >
                  <Link to="/add-discussion">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Start a New Discussion
                  </Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="members" className="space-y-4">
              {filterOpen && (
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Activity Level</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Very Active</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Active</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>New Members</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Recipe Count</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>50+ recipes</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>20-50 recipes</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>1-20 recipes</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockUsers.map((user) => (
                  <div key={user.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold">{user.name}</h3>
                        <p className="text-gray-600">@{user.username}</p>
                        <div className="mt-2 text-sm text-gray-600">
                          <span>{user.followers.toLocaleString()} followers</span>
                          <span className="mx-2">•</span>
                          <span>{user.recipes} recipes</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        Follow
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
