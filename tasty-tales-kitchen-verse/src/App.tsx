import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Recipes from "./pages/Recipes";
import Categories from "./pages/Categories";
import LearningPlans from "./pages/LearningPlans";
import Community from "./pages/Community";
import RecipeDetail from "./pages/RecipeDetail";
import NotFound from "./pages/NotFound";
import AddRecipe from "./pages/AddRecipe";
import AddLearningPlan from "./pages/AddLearningPlan";
import LearningPlanDetail from "./pages/LearningPlanDetail";
import EditLearningPlan from "./pages/EditLearningPlan";
import AddDiscussion from "./pages/AddDiscussion";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import EditRecipe from "./pages/EditRecipe";  

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/learning-plans" element={<LearningPlans />} />
          <Route path="/community" element={<Community />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/add-learning-plan" element={<AddLearningPlan />} />
          <Route path="/learning-plans/:id" element={<LearningPlanDetail />} />
          <Route path="/learning-plans/:id/edit" element={<EditLearningPlan />} />
          <Route path="/add-discussion" element={<AddDiscussion />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
