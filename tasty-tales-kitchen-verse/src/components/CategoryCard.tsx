
import { Link } from 'react-router-dom';
import { Category } from '@/types';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      to={`/categories/${category.id}`}
      className="tasty-card overflow-hidden group relative"
    >
      <AspectRatio ratio={1 / 1}>
        <img 
          src={category.imageUrl} 
          alt={category.name} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="font-bold text-xl">{category.name}</h3>
            <p className="text-sm text-gray-200 mt-1">{category.description}</p>
          </div>
        </div>
      </AspectRatio>
    </Link>
  );
};

export default CategoryCard;
