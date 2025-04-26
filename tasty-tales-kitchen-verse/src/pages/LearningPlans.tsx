
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LearningPlanCard from '@/components/LearningPlanCard';
import { mockLearningPlans } from '@/data/mockData';

const LearningPlans = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Page Header */}
        <div className="bg-tasty-primary py-12">
          <div className="container mx-auto px-4 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">Learning Plans</h1>
                <p className="text-xl">Master new cooking skills with structured learning plans</p>
              </div>
              <Button asChild className="bg-white text-tasty-primary hover:bg-gray-100">
                <Link to="/add-learning-plan" className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create Learning Plan
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search learning plans..."
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
          
          {filterOpen && (
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-3">Skill Level</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Beginner</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Intermediate</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Advanced</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Duration</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>1-2 weeks</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>3-4 weeks</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>5+ weeks</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Baking</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Knife Skills</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>World Cuisines</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Healthy Cooking</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* Learning Plans List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockLearningPlans.map((plan) => (
              <LearningPlanCard key={plan.id} learningPlan={plan} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LearningPlans;
