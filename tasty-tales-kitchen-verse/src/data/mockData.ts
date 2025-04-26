
import { Recipe, User, Category, LearningPlan } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'chef_sophia',
    name: 'Sophia Martinez',
    bio: 'Professional chef specializing in Italian cuisine',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.1',
    followers: 1280,
    following: 354,
    recipes: 47,
    learningPlans: 5
  },
  {
    id: '2',
    username: 'baking_master',
    name: 'Daniel Johnson',
    bio: 'Pastry chef with 10+ years of experience',
    profileImageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.1',
    followers: 876,
    following: 230,
    recipes: 32,
    learningPlans: 3
  },
  {
    id: '3',
    username: 'vegan_cook',
    name: 'Emily Wilson',
    bio: 'Plant-based cooking enthusiast',
    profileImageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2861&auto=format&fit=crop&ixlib=rb-4.0.1',
    followers: 590,
    following: 280,
    recipes: 21,
    learningPlans: 2
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Italian',
    description: 'Authentic Italian recipes',
    imageUrl: 'https://images.unsplash.com/photo-1627042633145-b780d842ba25?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.1'
  },
  {
    id: '2',
    name: 'Desserts',
    description: 'Sweet treats for any occasion',
    imageUrl: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.1'
  },
  {
    id: '3',
    name: 'Vegan',
    description: 'Plant-based recipes',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.1'
  },
  {
    id: '4',
    name: 'Quick Meals',
    description: 'Recipes ready in 30 minutes or less',
    imageUrl: 'https://images.unsplash.com/photo-1596560548464-f010549e45d8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.1'
  },
  {
    id: '5',
    name: 'Asian',
    description: 'Recipes from across Asia',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.1'
  },
  {
    id: '6',
    name: 'Baking',
    description: 'Bread, pastries, and more',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.1'
  }
];

// Mock Recipes
export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Margherita Pizza',
    description: 'A traditional Italian pizza topped with tomato sauce, fresh mozzarella, basil, and olive oil.',
    imageUrls: [
      'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=2857&auto=format&fit=crop&ixlib=rb-4.0.1',
      'https://images.unsplash.com/photo-1595854341625-f33e596b9a3c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.1'
    ],
    preparationTime: 30,
    cookingTime: 15,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { id: '1-1', name: 'Pizza dough', quantity: '500', unit: 'g' },
      { id: '1-2', name: 'Tomato sauce', quantity: '200', unit: 'ml' },
      { id: '1-3', name: 'Fresh mozzarella', quantity: '250', unit: 'g' },
      { id: '1-4', name: 'Fresh basil leaves', quantity: '10', unit: '' },
      { id: '1-5', name: 'Olive oil', quantity: '2', unit: 'tbsp' },
      { id: '1-6', name: 'Salt', quantity: '1', unit: 'tsp' }
    ],
    steps: [
      { id: '1-1', order: 1, instruction: 'Preheat oven to 475°F (245°C).' },
      { id: '1-2', order: 2, instruction: 'Roll out the pizza dough on a floured surface to your desired thickness.' },
      { id: '1-3', order: 3, instruction: 'Spread tomato sauce evenly over the dough, leaving a small border for the crust.' },
      { id: '1-4', order: 4, instruction: 'Tear mozzarella into pieces and distribute over the sauce.' },
      { id: '1-5', order: 5, instruction: 'Bake for 12-15 minutes until the crust is golden and the cheese is bubbly.' },
      { id: '1-6', order: 6, instruction: 'Remove from oven, top with fresh basil leaves and a drizzle of olive oil. Season with salt to taste.' }
    ],
    categories: ['Italian'],
    tags: ['Pizza', 'Vegetarian', 'Dinner'],
    author: mockUsers[0],
    likes: 256,
    createdAt: '2023-04-12T15:30:00Z',
    updatedAt: '2023-04-12T15:30:00Z'
  },
  {
    id: '2',
    title: 'Chocolate Lava Cake',
    description: 'Decadent chocolate dessert with a molten center that flows like lava when cut into.',
    imageUrls: [
      'https://images.unsplash.com/photo-1617305855058-336d24456869?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.1',
      'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.1'
    ],
    preparationTime: 15,
    cookingTime: 12,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { id: '2-1', name: 'Dark chocolate', quantity: '200', unit: 'g' },
      { id: '2-2', name: 'Unsalted butter', quantity: '100', unit: 'g' },
      { id: '2-3', name: 'Eggs', quantity: '4', unit: '' },
      { id: '2-4', name: 'Sugar', quantity: '100', unit: 'g' },
      { id: '2-5', name: 'All-purpose flour', quantity: '50', unit: 'g' },
      { id: '2-6', name: 'Vanilla extract', quantity: '1', unit: 'tsp' }
    ],
    steps: [
      { id: '2-1', order: 1, instruction: 'Preheat oven to 425°F (220°C). Butter and lightly flour four 6-ounce ramekins.' },
      { id: '2-2', order: 2, instruction: 'Melt the chocolate and butter together in a double boiler or microwave.' },
      { id: '2-3', order: 3, instruction: 'In a separate bowl, whisk together eggs and sugar until light and frothy.' },
      { id: '2-4', order: 4, instruction: 'Slowly add the melted chocolate mixture to the egg mixture, then fold in the flour and vanilla.' },
      { id: '2-5', order: 5, instruction: 'Divide the batter among the ramekins and place on a baking sheet.' },
      { id: '2-6', order: 6, instruction: 'Bake for 10-12 minutes until the edges are firm but the center is still soft.' },
      { id: '2-7', order: 7, instruction: 'Let stand for 1 minute, then invert onto dessert plates and serve immediately.' }
    ],
    categories: ['Desserts'],
    tags: ['Chocolate', 'Dessert', 'Baking'],
    author: mockUsers[1],
    likes: 342,
    createdAt: '2023-05-20T10:15:00Z',
    updatedAt: '2023-05-20T10:15:00Z'
  },
  {
    id: '3',
    title: 'Vegan Buddha Bowl',
    description: 'A nourishing bowl filled with colorful vegetables, grains, and plant-based protein.',
    imageUrls: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.1',
      'https://images.unsplash.com/photo-1540914124281-342587941389?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.1'
    ],
    preparationTime: 20,
    cookingTime: 25,
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      { id: '3-1', name: 'Quinoa', quantity: '100', unit: 'g' },
      { id: '3-2', name: 'Sweet potato', quantity: '1', unit: 'medium' },
      { id: '3-3', name: 'Chickpeas', quantity: '400', unit: 'g' },
      { id: '3-4', name: 'Avocado', quantity: '1', unit: '' },
      { id: '3-5', name: 'Kale', quantity: '100', unit: 'g' },
      { id: '3-6', name: 'Cherry tomatoes', quantity: '10', unit: '' },
      { id: '3-7', name: 'Tahini', quantity: '2', unit: 'tbsp' },
      { id: '3-8', name: 'Lemon juice', quantity: '1', unit: 'tbsp' },
      { id: '3-9', name: 'Olive oil', quantity: '1', unit: 'tbsp' },
      { id: '3-10', name: 'Paprika', quantity: '1', unit: 'tsp' },
      { id: '3-11', name: 'Salt and pepper', quantity: '', unit: 'to taste' }
    ],
    steps: [
      { id: '3-1', order: 1, instruction: 'Preheat oven to 400°F (200°C).' },
      { id: '3-2', order: 2, instruction: 'Cook quinoa according to package instructions.' },
      { id: '3-3', order: 3, instruction: 'Cube sweet potato, toss with olive oil, salt, and paprika. Roast for 20-25 minutes until tender.' },
      { id: '3-4', order: 4, instruction: 'Drain and rinse chickpeas, pat dry, then roast with sweet potatoes for the last 15 minutes.' },
      { id: '3-5', order: 5, instruction: 'Wash and chop kale, massage with a bit of olive oil and salt.' },
      { id: '3-6', order: 6, instruction: 'Make dressing by mixing tahini, lemon juice, and water until smooth.' },
      { id: '3-7', order: 7, instruction: 'Assemble bowls with quinoa, roasted vegetables, chickpeas, sliced avocado, kale, and cherry tomatoes.' },
      { id: '3-8', order: 8, instruction: 'Drizzle with tahini dressing and serve.' }
    ],
    categories: ['Vegan', 'Quick Meals'],
    tags: ['Healthy', 'Bowl', 'Lunch'],
    author: mockUsers[2],
    likes: 187,
    createdAt: '2023-06-08T14:45:00Z',
    updatedAt: '2023-06-08T14:45:00Z'
  },
  {
    id: '4',
    title: 'Homemade Sourdough Bread',
    description: 'Artisanal sourdough bread with a crispy crust and chewy interior, made from a fermented starter.',
    imageUrls: [
      'https://images.unsplash.com/photo-1586444248879-9a23465e5fe0?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.1',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.1'
    ],
    preparationTime: 60,
    cookingTime: 45,
    servings: 8,
    difficulty: 'Hard',
    ingredients: [
      { id: '4-1', name: 'Active sourdough starter', quantity: '100', unit: 'g' },
      { id: '4-2', name: 'Bread flour', quantity: '500', unit: 'g' },
      { id: '4-3', name: 'Water', quantity: '350', unit: 'ml' },
      { id: '4-4', name: 'Salt', quantity: '10', unit: 'g' }
    ],
    steps: [
      { id: '4-1', order: 1, instruction: 'Mix starter, flour, and water in a large bowl. Let rest for 30 minutes (autolyse).' },
      { id: '4-2', order: 2, instruction: 'Add salt and incorporate through a series of stretches and folds.' },
      { id: '4-3', order: 3, instruction: 'Perform stretches and folds every 30 minutes for 2-3 hours until dough becomes elastic.' },
      { id: '4-4', order: 4, instruction: 'Shape the dough and place in a floured proofing basket. Refrigerate overnight (12-15 hours).' },
      { id: '4-5', order: 5, instruction: 'Preheat oven with a dutch oven inside to 475°F (245°C).' },
      { id: '4-6', order: 6, instruction: 'Turn out dough onto parchment, score the top, and place in the dutch oven.' },
      { id: '4-7', order: 7, instruction: 'Bake covered for 30 minutes, then uncovered for 15 minutes until deep golden brown.' },
      { id: '4-8', order: 8, instruction: 'Cool completely on a wire rack before slicing (at least 2 hours).' }
    ],
    categories: ['Baking'],
    tags: ['Bread', 'Artisanal', 'Fermented'],
    author: mockUsers[1],
    likes: 210,
    createdAt: '2023-07-15T08:20:00Z',
    updatedAt: '2023-07-15T08:20:00Z'
  },
  {
    id: '5',
    title: 'Thai Green Curry',
    description: 'Aromatic and spicy Thai curry with coconut milk, vegetables, and your choice of protein.',
    imageUrls: [
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.1',
      'https://images.unsplash.com/photo-1577859623802-b5e3dfa64aa2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.1'
    ],
    preparationTime: 20,
    cookingTime: 25,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { id: '5-1', name: 'Green curry paste', quantity: '3', unit: 'tbsp' },
      { id: '5-2', name: 'Coconut milk', quantity: '400', unit: 'ml' },
      { id: '5-3', name: 'Chicken breast', quantity: '500', unit: 'g' },
      { id: '5-4', name: 'Eggplant', quantity: '1', unit: 'medium' },
      { id: '5-5', name: 'Bell peppers', quantity: '2', unit: '' },
      { id: '5-6', name: 'Bamboo shoots', quantity: '1', unit: 'can' },
      { id: '5-7', name: 'Thai basil leaves', quantity: '1', unit: 'handful' },
      { id: '5-8', name: 'Fish sauce', quantity: '2', unit: 'tbsp' },
      { id: '5-9', name: 'Palm sugar', quantity: '1', unit: 'tbsp' },
      { id: '5-10', name: 'Lime leaves', quantity: '4', unit: '' }
    ],
    steps: [
      { id: '5-1', order: 1, instruction: 'Heat a tablespoon of oil in a large pot over medium heat.' },
      { id: '5-2', order: 2, instruction: 'Add curry paste and cook until fragrant, about 1-2 minutes.' },
      { id: '5-3', order: 3, instruction: 'Add half the coconut milk and bring to a simmer.' },
      { id: '5-4', order: 4, instruction: 'Add chicken and cook for 5 minutes.' },
      { id: '5-5', order: 5, instruction: 'Add vegetables, remaining coconut milk, fish sauce, sugar, and lime leaves.' },
      { id: '5-6', order: 6, instruction: 'Simmer for 15 minutes until chicken is cooked and vegetables are tender.' },
      { id: '5-7', order: 7, instruction: 'Stir in Thai basil leaves just before serving.' },
      { id: '5-8', order: 8, instruction: 'Serve with steamed jasmine rice.' }
    ],
    categories: ['Asian'],
    tags: ['Curry', 'Spicy', 'Dinner'],
    author: mockUsers[0],
    likes: 165,
    createdAt: '2023-08-03T19:10:00Z',
    updatedAt: '2023-08-03T19:10:00Z'
  },
  {
    id: '6',
    title: '30-Minute Pasta Primavera',
    description: 'Light and colorful pasta dish filled with seasonal vegetables.',
    imageUrls: [
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.1',
      'https://images.unsplash.com/photo-1555949366-2e5639e3aabc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.1'
    ],
    preparationTime: 10,
    cookingTime: 20,
    servings: 4,
    difficulty: 'Easy',
    ingredients: [
      { id: '6-1', name: 'Penne pasta', quantity: '300', unit: 'g' },
      { id: '6-2', name: 'Cherry tomatoes', quantity: '200', unit: 'g' },
      { id: '6-3', name: 'Zucchini', quantity: '1', unit: 'medium' },
      { id: '6-4', name: 'Yellow squash', quantity: '1', unit: 'medium' },
      { id: '6-5', name: 'Broccoli florets', quantity: '1', unit: 'cup' },
      { id: '6-6', name: 'Bell pepper', quantity: '1', unit: '' },
      { id: '6-7', name: 'Garlic', quantity: '3', unit: 'cloves' },
      { id: '6-8', name: 'Olive oil', quantity: '3', unit: 'tbsp' },
      { id: '6-9', name: 'Parmesan cheese', quantity: '50', unit: 'g' },
      { id: '6-10', name: 'Fresh basil', quantity: '1/4', unit: 'cup' },
      { id: '6-11', name: 'Salt and pepper', quantity: '', unit: 'to taste' }
    ],
    steps: [
      { id: '6-1', order: 1, instruction: 'Cook pasta according to package instructions until al dente.' },
      { id: '6-2', order: 2, instruction: 'While pasta cooks, chop all vegetables into bite-sized pieces.' },
      { id: '6-3', order: 3, instruction: 'Heat olive oil in a large skillet over medium-high heat.' },
      { id: '6-4', order: 4, instruction: 'Add garlic and sauté for 30 seconds until fragrant.' },
      { id: '6-5', order: 5, instruction: 'Add broccoli and cook for 2 minutes, then add remaining vegetables.' },
      { id: '6-6', order: 6, instruction: 'Cook for 5-7 minutes until vegetables are tender-crisp.' },
      { id: '6-7', order: 7, instruction: 'Drain pasta and add to the skillet with vegetables.' },
      { id: '6-8', order: 8, instruction: 'Toss everything together with extra olive oil, parmesan, and fresh basil.' },
      { id: '6-9', order: 9, instruction: 'Season with salt and pepper to taste and serve immediately.' }
    ],
    categories: ['Italian', 'Quick Meals'],
    tags: ['Pasta', 'Vegetarian', 'Dinner'],
    author: mockUsers[0],
    likes: 132,
    createdAt: '2023-09-11T12:30:00Z',
    updatedAt: '2023-09-11T12:30:00Z'
  }
];

// Mock Learning Plans
export const mockLearningPlans: LearningPlan[] = [
  {
    id: '1',
    title: 'Master Baking in 6 Weeks',
    description: 'A comprehensive plan to learn the fundamentals of baking, from simple cookies to complex pastries.',
    imageUrl: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.1',
    author: mockUsers[1],
    steps: [
      {
        id: '1-1',
        order: 1,
        title: 'Week 1: Basic Techniques',
        description: 'Learn about measuring ingredients, mixing methods, and basic baking equipment.',
        resources: [
          { id: '1-1-1', title: 'Baking Basics Video', type: 'Video', url: 'https://example.com/baking-basics' },
          { id: '1-1-2', title: 'Equipment Guide', type: 'Blog', url: 'https://example.com/equipment-guide' }
        ],
        completed: false
      },
      {
        id: '1-2',
        order: 2,
        title: 'Week 2: Cookies & Quick Breads',
        description: 'Practice with simple recipes that introduce fundamental techniques.',
        resources: [
          { id: '1-2-1', title: 'Cookie Science', type: 'Video', url: 'https://example.com/cookie-science' },
          { id: '1-2-2', title: 'Quick Bread Recipes', type: 'Blog', url: 'https://example.com/quick-bread-recipes' }
        ],
        completed: false
      },
      {
        id: '1-3',
        order: 3,
        title: 'Week 3: Cakes & Frostings',
        description: 'Learn about different cake types and techniques for perfect frostings.',
        resources: [
          { id: '1-3-1', title: 'Cake Mixing Methods', type: 'Video', url: 'https://example.com/cake-methods' },
          { id: '1-3-2', title: 'Frosting Masterclass', type: 'Video', url: 'https://example.com/frosting-masterclass' }
        ],
        completed: false
      },
      {
        id: '1-4',
        order: 4,
        title: 'Week 4: Yeasted Breads',
        description: 'Introduction to working with yeast and fermentation.',
        resources: [
          { id: '1-4-1', title: 'Bread Basics', type: 'Video', url: 'https://example.com/bread-basics' },
          { id: '1-4-2', title: 'The Science of Gluten', type: 'Blog', url: 'https://example.com/gluten-science' }
        ],
        completed: false
      },
      {
        id: '1-5',
        order: 5,
        title: 'Week 5: Pies & Tarts',
        description: 'Master the art of perfect pastry and fillings.',
        resources: [
          { id: '1-5-1', title: 'Perfect Pie Crust', type: 'Video', url: 'https://example.com/pie-crust' },
          { id: '1-5-2', title: 'Filling Formulas', type: 'Blog', url: 'https://example.com/filling-formulas' }
        ],
        completed: false
      },
      {
        id: '1-6',
        order: 6,
        title: 'Week 6: Advanced Pastries',
        description: 'Take on challenging recipes like croissants and puff pastry.',
        resources: [
          { id: '1-6-1', title: 'Laminated Dough Masterclass', type: 'Video', url: 'https://example.com/laminated-dough' },
          { id: '1-6-2', title: 'Advanced Baking Book', type: 'Book', url: 'https://example.com/advanced-baking-book' }
        ],
        completed: false
      }
    ],
    categories: ['Baking', 'Desserts'],
    difficulty: 'Intermediate',
    estimatedDuration: '6 weeks',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Italian Cooking Fundamentals',
    description: 'Learn the core techniques and recipes that form the foundation of Italian cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.1',
    author: mockUsers[0],
    steps: [
      {
        id: '2-1',
        order: 1,
        title: 'Italian Pantry Essentials',
        description: 'Learn about key ingredients and how to source authentic Italian products.',
        resources: [
          { id: '2-1-1', title: 'Italian Ingredients Guide', type: 'Blog', url: 'https://example.com/italian-ingredients' },
          { id: '2-1-2', title: 'Olive Oil Tasting', type: 'Video', url: 'https://example.com/olive-oil-tasting' }
        ],
        completed: false
      },
      {
        id: '2-2',
        order: 2,
        title: 'Fresh Pasta Making',
        description: 'Learn to make pasta dough from scratch and shape it into various forms.',
        resources: [
          { id: '2-2-1', title: 'Pasta Dough Basics', type: 'Video', url: 'https://example.com/pasta-dough' },
          { id: '2-2-2', title: 'Hand-Shaped Pasta Guide', type: 'Blog', url: 'https://example.com/hand-shaped-pasta' }
        ],
        completed: false
      },
      {
        id: '2-3',
        order: 3,
        title: 'Classic Sauces',
        description: 'Master the foundation sauces of Italian cuisine from simple tomato to complex ragùs.',
        resources: [
          { id: '2-3-1', title: 'The Five Mother Sauces', type: 'Video', url: 'https://example.com/mother-sauces' },
          { id: '2-3-2', title: 'Regional Sauce Variations', type: 'Blog', url: 'https://example.com/regional-sauces' }
        ],
        completed: false
      },
      {
        id: '2-4',
        order: 4,
        title: 'Risotto Techniques',
        description: 'Learn the art of making perfect creamy risotto with various flavor combinations.',
        resources: [
          { id: '2-4-1', title: 'Risotto Masterclass', type: 'Video', url: 'https://example.com/risotto-masterclass' },
          { id: '2-4-2', title: 'Rice Varieties Guide', type: 'Blog', url: 'https://example.com/rice-varieties' }
        ],
        completed: false
      },
      {
        id: '2-5',
        order: 5,
        title: 'Italian Breads & Pizza',
        description: 'Explore the world of Italian bread making from focaccia to pizza.',
        resources: [
          { id: '2-5-1', title: 'Pizza Dough Workshop', type: 'Video', url: 'https://example.com/pizza-workshop' },
          { id: '2-5-2', title: 'Regional Italian Breads', type: 'Blog', url: 'https://example.com/italian-breads' }
        ],
        completed: false
      }
    ],
    categories: ['Italian'],
    difficulty: 'Beginner',
    estimatedDuration: '4 weeks',
    createdAt: '2023-03-10T14:30:00Z',
    updatedAt: '2023-03-10T14:30:00Z'
  }
];
