import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Upload, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import api from '@/api/axios';
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
import { LearningPlan } from '@/types';

type LearningPlanFormValues = {
  title: string;
  description: string;
  courseType: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration: string;
  categories: string;
};

const AddLearningPlan = () => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([
    { 
      id: uuidv4(), 
      order: 1, 
      title: '', 
      completed: false
    }
  ]);
  const [imageUrl, setImageUrl] = useState('');

  const form = useForm<LearningPlanFormValues>({
    defaultValues: {
      title: '',
      description: '',
      courseType: 'Beginner',
      estimatedDuration: '2 weeks',
      categories: '',
    },
  });

  const addStep = () => {
    const newOrder = steps.length + 1;
    setSteps([
      ...steps, 
      { 
        id: uuidv4(), 
        order: newOrder, 
        title: '', 
        completed: false
      }
    ]);
  };

  const removeStep = (id: string) => {
    if (steps.length > 1) {
      const updatedSteps = steps.filter(step => step.id !== id);
      const reorderedSteps = updatedSteps.map((step, index) => ({
        ...step,
        order: index + 1,
      }));
      setSteps(reorderedSteps);
    }
  };

  const updateStep = (stepId: string, field: string, value: string) => {
    // Validate step title: only letters and spaces allowed
    if (field === 'title' && value && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }
    setSteps(
      steps.map(step => 
        step.id === stepId ? { ...step, [field]: value } : step
      )
    );
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageUrl('');
  };

  const onSubmit = async (data: LearningPlanFormValues) => {
    try {
      if (steps.some(step => !step.title)) {
        toast.error('Please fill in all step titles');
        return;
      }

      const categoriesArray = data.categories.split(',').map(c => c.trim()).filter(Boolean);

      const learningPlan = {
        title: data.title,
        description: data.description,
        imageUrl: imageUrl || undefined,
        author: {
          id: 'current-user-id',
          username: 'current-user',
          name: 'Current User',
          followers: 0,
          following: 0,
          recipes: 0,
          learningPlans: 0
        },
        steps: steps.map(step => ({
          ...step,
          order: Number(step.order)
        })),
        categories: categoriesArray,
        courseType: data.courseType,
        estimatedDuration: data.estimatedDuration
      };
      

      console.log('Sending request to:', '/api/learning-plans');
      console.log('Request data:', JSON.stringify(learningPlan, null, 2));

      const response = await api.post('/api/learning-plans', learningPlan);
      
      console.log('Response:', response.data);

      toast.success('Learning plan created successfully!');
      
      navigate(`/learning-plans/${response.data.id}`);
    } catch (error: any) {
      console.error('Error creating learning plan:', error);
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
        }
      });
      
      if (error.response) {
        toast.error(`Server error: ${error.response.data?.message || error.response.statusText || 'Failed to create learning plan'}`);
      } else if (error.request) {
        toast.error('No response from server. Please check if the backend is running.');
      } else {
        toast.error('Failed to create learning plan. Please try again.');
      }
    }
  };

  
return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Create a Learning Plan</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b pb-2">Basic Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="title"
                    rules={{
                      required: 'Plan title is早required',
                      pattern: {
                        value: /^[a-zA-Z\s]*$/,
                        message: 'Only letters and spaces are allowed'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter learning plan title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    rules={{
                      required: 'Description is required',
                      validate: {
                        minWords: (value) =>
                          value.trim().split(/\s+/).length >= 10 ||
                          'Description must contain at least 10 words',
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your learning plan" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="courseType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Type</FormLabel>
                          <FormControl>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="estimatedDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Duration</FormLabel>
                          <FormControl>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="1 week">1 week</option>
                              <option value="2 weeks">2 weeks</option>
                              <option value="3 weeks">3 weeks</option>
                              <option value="1 month">1 month</option>
                              <option value="2 months">2 months</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="categories"
                    rules={{
                      required: 'Categories are required',
                      pattern: {
                        value: /^[a-zA-Z\s,]*$/,
                        message: 'Only letters, spaces, and commas are allowed'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categories</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Baking, Knife Skills, World Cuisines (comma separated)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b pb-2">Cover Image</h2>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Learning Plan Image</label>
                    {imageUrl ? (
                      <div className="relative w-full max-w-sm">
                        <img
                          src={imageUrl}
                          alt="Learning Plan Cover"
                          className="w-full h-auto rounded-md"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400">
                        <div className="flex flex-col items-center">
                          <Upload className="h-8 w-8 text-gray-400" />
                          <span className="text-sm text-gray-500">Upload Cover Image</span>
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
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-xl font-semibold">Learning Steps</h2>
                    <Button 
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addStep}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" /> Add Step
                    </Button>
                  </div>
                  
                  {steps.map((step) => (
                    <div key={step.id} className="space-y-4 border p-4 rounded-md">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Step {step.order}</h3>
                        <Button 
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeStep(step.id)}
                          disabled={steps.length === 1}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Step Title</label>
                          <Input
                            value={step.title}
                            onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                            placeholder="Enter step title"
                          />
                          {step.title && !/^[a-zA-Z\s]*$/.test(step.title) && (
                            <p className="text-sm text-red-500 mt-1">Only letters and spaces are allowed</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-tasty-primary hover:bg-tasty-dark"
                  >
                    Create Learning Plan
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

export default AddLearningPlan;