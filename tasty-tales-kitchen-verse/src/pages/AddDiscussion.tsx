import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
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
import { Discussion } from '@/types';

interface DiscussionFormValues {
  title: string;
  content: string;
  tags: string;
}

const AddDiscussion = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<DiscussionFormValues>({
    defaultValues: {
      title: '',
      content: '',
      tags: '',
    },
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > 3) {
      toast.error('You can only upload up to 3 images');
      return;
    }

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages(prev => [...prev, e.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: DiscussionFormValues) => {
    if (!data.title || !data.content) {
      toast.error('Please fill in title and content');
      return;
    }

    const tagsArray = data.tags.split(',').map(t => t.trim()).filter(Boolean);

    const discussion: Partial<Discussion> = {
      title: data.title,
      content: data.content,
      images,
      tags: tagsArray,
      author: {
        id: 'current-user-id', // Replace with actual user ID
        username: 'current-user', // Replace with actual username
        name: 'Current User',
        followers: 0,
        following: 0,
        recipes: 0,
        learningPlans: 0,
      },
      likes: 0,
      comments: [],
    };

    try {
      await axios.post('http://localhost:8081/api/discussions', discussion);
      toast.success('Discussion created successfully!');
      navigate('/discussions');
    } catch (error) {
      console.error('Error creating discussion:', error);
      toast.error('Failed to create discussion. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Create a Discussion</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b pb-2">Discussion Details</h2>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter discussion title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your thoughts"
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
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., cooking, baking, tips (comma separated)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b pb-2">Images</h2>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Discussion Images (up to 3)</label>
                    <div className="flex flex-wrap gap-4 mb-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative w-32 h-32">
                          <img src={img} alt={`Discussion ${index}`} className="w-full h-full object-cover rounded-md" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      {images.length < 3 && (
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
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Create Discussion
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

export default AddDiscussion;