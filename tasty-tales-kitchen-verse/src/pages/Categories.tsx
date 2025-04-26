
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import { mockCategories } from '@/data/mockData';

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Page Header */}
        <div className="bg-tasty-primary py-12">
          <div className="container mx-auto px-4 text-white">
            <h1 className="text-4xl font-bold mb-2">Recipe Categories</h1>
            <p className="text-xl">Browse recipes by category to find your next culinary adventure</p>
          </div>
        </div>
        
        {/* Categories */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
