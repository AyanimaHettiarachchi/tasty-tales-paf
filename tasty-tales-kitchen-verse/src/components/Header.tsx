
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Search, Menu, X, User, Heart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-tasty-primary" />
            <span className="text-2xl font-bold text-gray-800">Tasty<span className="text-tasty-primary">Tales</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/recipes" className="text-gray-700 hover:text-tasty-primary transition-colors">Recipes</Link>
            <Link to="/categories" className="text-gray-700 hover:text-tasty-primary transition-colors">Categories</Link>
            <Link to="/learning-plans" className="text-gray-700 hover:text-tasty-primary transition-colors">Learning Plans</Link>
            <Link to="/community" className="text-gray-700 hover:text-tasty-primary transition-colors">Community</Link>
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center relative w-64">
            <Input
              type="text"
              placeholder="Search recipes..."
              className="pl-10 pr-3 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {/* User Controls - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-gray-700">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-700">
              <BookOpen className="h-5 w-5" />
            </Button>
            <Button asChild variant="ghost" size="icon" className="text-gray-700">
              <Link to="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild className="bg-tasty-primary hover:bg-tasty-dark">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex items-center relative mb-4">
              <Input
                type="text"
                placeholder="Search recipes..."
                className="pl-10 pr-3 py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link to="/recipes" className="text-gray-700 hover:text-tasty-primary transition-colors" onClick={toggleMenu}>Recipes</Link>
              <Link to="/categories" className="text-gray-700 hover:text-tasty-primary transition-colors" onClick={toggleMenu}>Categories</Link>
              <Link to="/learning-plans" className="text-gray-700 hover:text-tasty-primary transition-colors" onClick={toggleMenu}>Learning Plans</Link>
              <Link to="/community" className="text-gray-700 hover:text-tasty-primary transition-colors" onClick={toggleMenu}>Community</Link>
              <div className="flex space-x-4 pt-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link to="/login" onClick={toggleMenu}>Sign In</Link>
                </Button>
                <Button asChild size="sm" className="flex-1 bg-tasty-primary hover:bg-tasty-dark">
                  <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
