
import { Link } from 'react-router-dom';
import { Clock, User, Heart } from 'lucide-react';
import { Recipe } from '@/types';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const totalTime = recipe.preparationTime + recipe.cookingTime;
  
  return (
    <div className="tasty-card group hover:scale-[1.02] transition-transform duration-300">
      <Link to={`/recipes/${recipe.id}`}>
        <AspectRatio ratio={16 / 9}>
          <img 
            src={recipe.imageUrls[0]} 
            alt={recipe.title} 
            className="object-cover w-full h-full rounded-t-lg"
          />
        </AspectRatio>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/recipes/${recipe.id}`} className="hover:text-tasty-primary">
            <h3 className="font-bold text-lg line-clamp-2">{recipe.title}</h3>
          </Link>
          <button aria-label="Like recipe" className="text-gray-400 hover:text-tasty-primary transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{recipe.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Clock className="h-4 w-4 mr-1" />
          <span>{totalTime} min</span>
          <span className="mx-2">•</span>
          <Badge variant="outline" className="text-xs border-tasty-primary text-tasty-primary">
            {recipe.difficulty}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.categories.map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <Link to={`/profile/${recipe.author.id}`} className="flex items-center group">
            {recipe.author.profileImageUrl ? (
              <img 
                src={recipe.author.profileImageUrl} 
                alt={recipe.author.name} 
                className="w-6 h-6 rounded-full mr-2 object-cover"
              />
            ) : (
              <User className="h-6 w-6 rounded-full mr-2 p-1 bg-gray-200" />
            )}
            <span className="text-sm text-gray-600 group-hover:text-tasty-primary">{recipe.author.name}</span>
          </Link>
          <div className="flex items-center text-sm text-gray-500">
            <Heart className="h-4 w-4 mr-1 fill-tasty-primary text-tasty-primary" />
            <span>{recipe.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
