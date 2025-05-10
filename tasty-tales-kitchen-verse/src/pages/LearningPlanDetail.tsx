import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Award, BookOpen, Check, Edit, Trash, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/api/axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { LearningPlan, LearningStep } from '@/types';

const LearningPlanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [learningPlan, setLearningPlan] = useState<LearningPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    fetchLearningPlan();
  }, [id]);
  
  const fetchLearningPlan = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/api/learning-plans/${id}`);
      setLearningPlan(response.data);
      
      // Initialize expanded state for all steps
      const initialExpandedState: Record<string, boolean> = {};
      response.data.steps.forEach((step: LearningStep) => {
        initialExpandedState[step.id] = false;
      });
      setExpandedSteps(initialExpandedState);
    } catch (error: any) {
      console.error('Error fetching learning plan:', error);
      setError('Failed to load learning plan. Please try again later.');
      toast.error('Failed to load learning plan');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this learning plan?')) {
      return;
    }

    try {
      await api.delete(`/api/learning-plans/${id}`);
      toast.success('Learning plan deleted successfully');
      navigate('/learning-plans');
    } catch (error: any) {
      console.error('Error deleting learning plan:', error);
      toast.error('Failed to delete learning plan');
    }
  };
  
  const toggleStepExpand = (stepId: string) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  
  const toggleStepCompletion = async (step: LearningStep) => {
    if (!learningPlan) return;
    
    try {
      const updatedSteps = learningPlan.steps.map(s => 
        s.id === step.id ? { ...s, completed: !s.completed } : s
      );
      
      const updatedLearningPlan = {
        ...learningPlan,
        steps: updatedSteps
      };

      await api.put(`/api/learning-plans/${id}`, updatedLearningPlan);
      setLearningPlan(updatedLearningPlan);
      toast.success('Progress updated successfully');
    } catch (error: any) {
      console.error('Error updating step completion:', error);
      toast.error('Failed to update progress');
    }
  };
  
  // Calculate progress
  const calculateProgress = () => {
    if (!learningPlan) return 0;
    
    const completedSteps = learningPlan.steps.filter(step => step.completed).length;
    return learningPlan.steps.length > 0 
      ? Math.round((completedSteps / learningPlan.steps.length) * 100) 
      : 0;
  };
  
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-xl text-gray-500">Loading learning plan...</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !learningPlan) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Learning Plan Not Found'}
          </h1>
          <p className="text-gray-600 mb-6">
            {error ? 'Please try again later.' : 'The learning plan you\'re looking for couldn\'t be found.'}
          </p>
          <Button asChild className="bg-tasty-primary hover:bg-tasty-dark">
            <Link to="/learning-plans">Return to Learning Plans</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  const progress = calculateProgress();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30">
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-6">
              <div className="flex justify-between items-center w-full mb-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild 
                  className="text-white hover:bg-black/20"
                >
                  <Link to="/learning-plans">
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back to Learning Plans
                  </Link>
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-white hover:bg-black/20"
                  >
                    <Link to={`/learning-plans/${id}/edit`}>
                      <Edit className="mr-1 h-4 w-4" /> Edit
                    </Link>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    className="text-white hover:bg-black/20"
                  >
                    <Trash className="mr-1 h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{learningPlan.title}</h1>
              <p className="text-lg text-white/90 mb-4 max-w-2xl">{learningPlan.description}</p>
              
              <div className="flex flex-wrap gap-4 items-center text-white/80 mb-2">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{learningPlan.estimatedDuration}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-1" />
                  <span>{learningPlan.difficulty}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-1" />
                  <span>{learningPlan.steps.length} Steps</span>
                </div>
              </div>
              
              <div className="flex items-center text-white/80">
                <img 
                  src={learningPlan.author?.profileImageUrl || 'https://via.placeholder.com/40'} 
                  alt={learningPlan.author?.name || 'Author'}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>Created by {learningPlan.author?.name || learningPlan.author?.username || 'Unknown Author'}</span>
              </div>
            </div>
          </div>
          <img 
            src={learningPlan.imageUrl || 'https://via.placeholder.com/1200x400?text=Learning+Plan'} 
            alt={learningPlan.title} 
            className="w-full h-72 md:h-96 object-cover"
          />
        </div>
        
        {/* Progress Bar */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium">Your Progress</h2>
              <span className="text-sm font-medium">{progress}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 w-full" />
          </div>
        </div>
        
        {/* Learning Steps */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Learning Path</h2>
          
          <div className="space-y-4">
            {learningPlan.steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`bg-white rounded-lg shadow-sm overflow-hidden ${step.completed ? 'border-l-4 border-green-500' : ''}`}
              >
                <div 
                  className="p-4 flex items-start cursor-pointer"
                  onClick={() => toggleStepExpand(step.id)}
                >
                  <div className="mr-4 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium">
                      {step.completed ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        index + 1
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{step.title}</h3>
                    {!expandedSteps[step.id] && (
                      <p className="text-gray-600 line-clamp-2">{step.description}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <Checkbox 
                      checked={step.completed}
                      onCheckedChange={() => toggleStepCompletion(step)}
                      className="mr-2 data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStepExpand(step.id);
                      }}
                    >
                      {expandedSteps[step.id] ? 'Collapse' : 'Expand'}
                    </Button>
                  </div>
                </div>
                
                {expandedSteps[step.id] && (
                  <div className="px-4 pb-4 pt-2 border-t ml-12">
                    <p className="text-gray-700 mb-4">{step.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LearningPlanDetail;
