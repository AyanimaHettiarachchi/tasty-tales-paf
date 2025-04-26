
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Hero = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.1" 
          alt="Food background" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Share Your <span className="text-tasty-primary">Culinary</span> Journey
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Discover recipes, create learning plans, and connect with food enthusiasts from around the world.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Input 
              type="text" 
              placeholder="Search for recipes, ingredients, or cuisines..." 
              className="py-6 pl-12 pr-4 rounded-full text-gray-900 w-full"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-tasty-primary hover:bg-tasty-dark text-white py-6 px-8 rounded-full text-lg">
              <Link to="/recipes">Explore Recipes</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 py-6 px-8 rounded-full text-lg">
              <Link to="/signup">Join Community</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
