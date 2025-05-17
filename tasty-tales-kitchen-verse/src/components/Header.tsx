import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Search, Menu, X, User, Heart, BookOpen, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Extend the Window interface to include SpeechRecognition types
interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: () => void;
  start: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
// Extend Window interface for SpeechRecognition compatibility
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

// Header component for navigation and search functionality
const Header = () => {
  // State for managing menu, search, and voice navigation
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Initialize and start voice recognition
  const startVoiceRecognition = () => {
    // Check for browser support for SpeechRecognition
    // Check if SpeechRecognition API is supported
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      alert('Speech Recognition API is not supported in this browser.');
      return;
    }

    setIsVoiceModalOpen(true);
    setIsListening(true);
    setVoiceCommand('');

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setVoiceCommand(command);
      handleVoiceCommand(command);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setIsVoiceModalOpen(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTimeout(() => setIsVoiceModalOpen(false), 8000);
    };

    recognition.start();
  };

  // Process voice commands for navigation
  const handleVoiceCommand = (command: string) => {
    if (command.includes('navigate')) {
      if (command.includes('home')) navigate('/');
      else if (command.includes('recipes') || command.includes('recipe')) navigate('/recipes');
      else if (command.includes('categories')) navigate('/categories');
      else if (command.includes('learning plans') || command.includes('learning plan')) navigate('/learning-plans');
      else if (command.includes('community')) navigate('/community');
      else if (command.includes('add recipe')) navigate('/add-recipe');
      else if (command.includes('add learning plan')) navigate('/add-learning-plan');
      else if (command.includes('add discussion')) navigate('/add-discussion');
      else if (command.includes('login') || command.includes('sign in')) navigate('/login');
      else if (command.includes('signup') || command.includes('sign up')) navigate('/signup');
      else if (command.includes('profile')) navigate('/profile');
    }
  };

  // Close voice navigation modal
  const closeVoiceModal = () => {
    setIsVoiceModalOpen(false);
    setIsListening(false);
  };

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
            <Button variant="ghost" size="icon" className="text-gray-700" onClick={startVoiceRecognition}>
              <Mic className="h-5 w-5" />
            </Button>
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
              <Button variant="ghost" size="sm" onClick={startVoiceRecognition} className="flex justify-start">
                <Mic className="h-5 w-5 mr-2" /> Voice Navigation
              </Button>
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

        {/* Voice Navigation Modal */}
        {isVoiceModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Voice Navigation</h2>
                <Button variant="ghost" size="icon" onClick={closeVoiceModal}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-gray-600 mb-4">
                {voiceCommand ? voiceCommand : 'I want to navigate to [page name] page'}
              </p>
              <p className="text-gray-600 mb-4">Try saying commands like:</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Button variant="outline" size="sm">Home</Button>
                <Button variant="outline" size="sm">Create Post</Button>
                <Button variant="outline" size="sm">Recipes</Button>
                <Button variant="outline" size="sm">Create Recipe</Button>
                <Button variant="outline" size="sm">Food Tips</Button>
                <Button variant="outline" size="sm">Create Food Tips</Button>
                <Button variant="outline" size="sm">Foods For Events</Button>
                <Button variant="outline" size="sm">Create Foods For Event</Button>
              </div>
              <div className="flex justify-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-6 w-2 rounded-full ${isListening ? 'bg-blue-900 animate-pulse' : 'bg-gray-300'}`}></div>
                  ))}
                </div>
              </div>
              <p className="text-center text-gray-600">
                {isListening ? 'Listening...' : 'The popup will close automatically after 8 seconds or click the X to close now.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;