
import { Link } from 'react-router-dom';
import { Clock, Award, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LearningPlan } from '@/types';

interface LearningPlanCardProps {
  learningPlan: LearningPlan;
}

const LearningPlanCard = ({ learningPlan }: LearningPlanCardProps) => {
  const {
    id,
    title,
    description,
    imageUrl,
    author,
    estimatedDuration, // Changed from 'duration' to match the type
    difficulty,
    steps
  } = learningPlan;

  // Add a progress calculation since it's not in the type
  // This simulates progress based on completed steps
  const completedSteps = steps.filter(step => step.completed).length;
  const progress = steps.length > 0 ? Math.round((completedSteps / steps.length) * 100) : 0;

  return (
    <div className="tasty-card overflow-hidden group relative flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={imageUrl || 'https://via.placeholder.com/400x300?text=Learning+Plan'}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800">
            {difficulty}
          </span>
        </div>
      </div>

      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">{estimatedDuration}</span>
          </div>
          <div className="flex items-center">
            <Award className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">{steps.length} steps</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 w-full" />
        </div>

        <p className="text-sm text-gray-600 mb-4">
          By <span className="font-medium">{author.name}</span>
        </p>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <Button asChild className="w-full bg-tasty-primary hover:bg-tasty-dark flex items-center justify-center">
          <Link to={`/learning-plans/${id}`}>
            View Plan <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default LearningPlanCard;
