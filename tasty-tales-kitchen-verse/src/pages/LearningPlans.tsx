import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LearningPlanCard from '@/components/LearningPlanCard';
import { toast } from 'sonner';
import api from '@/api/axios';
import { LearningPlan } from '@/types';

const LearningPlans = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [learningPlans, setLearningPlans] = useState<LearningPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLearningPlans();
  }, []);

  const fetchLearningPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/learning-plans');
      setLearningPlans(response.data);
    } catch (error: any) {
      console.error('Error fetching learning plans:', error);
      setError('Failed to load learning plans');
      toast.error('Failed to load learning plans');
    } finally {
      setLoading(false);
    }
  };


  // Filter learning plans based on search query
  const filteredPlans = learningPlans.filter(plan => 
    plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading learning plans...</p>
            </div>
          )}
          

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <Button 
                onClick={fetchLearningPlans}
                variant="outline"
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredPlans.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No learning plans found.</p>
              <Button 
                asChild
                className="mt-4 bg-tasty-primary hover:bg-tasty-dark"
              >
                <Link to="/add-learning-plan">Create Your First Learning Plan</Link>
              </Button>
            </div>
          )}
          
          {/* Learning Plans List */}
          {!loading && !error && filteredPlans.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPlans.map((plan) => (
                <LearningPlanCard key={plan.id} learningPlan={plan} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LearningPlans;
