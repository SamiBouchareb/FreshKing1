import { MenuItem } from '../types/menu';

export const menuItems: MenuItem[] = [
  // Bowls
  {
    id: 'bowl-1',
    name: 'Buddha Bowl',
    description: 'Quinoa, roasted sweet potato, chickpeas, avocado, kale, and tahini dressing',
    category: 'Bowls',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    nutritionalInfo: {
      calories: 450,
      protein: 15,
      carbs: 55,
      fat: 22,
      fiber: 12
    },
    dietaryFilters: ['Vegan', 'Gluten-Free']
  },
  {
    id: 'bowl-2',
    name: 'Poke Bowl',
    description: 'Fresh salmon, sushi rice, edamame, cucumber, carrots, and ponzu sauce',
    category: 'Bowls',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    nutritionalInfo: {
      calories: 520,
      protein: 28,
      carbs: 65,
      fat: 18,
      fiber: 6
    },
    dietaryFilters: ['Gluten-Free']
  },
  // Sandwiches
  {
    id: 'sandwich-1',
    name: 'Grilled Veggie Delight',
    description: 'Grilled zucchini, eggplant, bell peppers, hummus, and fresh herbs on sourdough',
    category: 'Sandwiches',
    price: 10.99,
    imageUrl: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    nutritionalInfo: {
      calories: 380,
      protein: 12,
      carbs: 48,
      fat: 16,
      fiber: 8
    },
    dietaryFilters: ['Vegan']
  },
  {
    id: 'sandwich-2',
    name: 'Turkey Avocado Club',
    description: 'Roasted turkey, avocado, bacon, lettuce, tomato, and herb mayo on multigrain',
    category: 'Sandwiches',
    price: 11.99,
    imageUrl: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    nutritionalInfo: {
      calories: 450,
      protein: 32,
      carbs: 42,
      fat: 22,
      fiber: 6
    },
    dietaryFilters: []
  },
  // Soups
  {
    id: 'soup-1',
    name: 'Butternut Squash Soup',
    description: 'Creamy butternut squash soup with coconut milk and warming spices',
    category: 'Soups',
    price: 6.99,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    nutritionalInfo: {
      calories: 220,
      protein: 5,
      carbs: 32,
      fat: 12,
      fiber: 6
    },
    dietaryFilters: ['Vegan', 'Gluten-Free']
  },
  {
    id: 'soup-2',
    name: 'Chicken Noodle Soup',
    description: 'Classic chicken soup with vegetables and whole grain noodles',
    category: 'Soups',
    price: 7.99,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    nutritionalInfo: {
      calories: 280,
      protein: 18,
      carbs: 38,
      fat: 8,
      fiber: 4
    },
    dietaryFilters: []
  },
  // Main Meals
  {
    id: 'main-1',
    name: 'Grilled Salmon',
    description: 'Wild-caught salmon with quinoa pilaf and roasted vegetables',
    category: 'Main Meals',
    price: 18.99,
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    nutritionalInfo: {
      calories: 580,
      protein: 42,
      carbs: 45,
      fat: 28,
      fiber: 8
    },
    dietaryFilters: ['Gluten-Free']
  },
  {
    id: 'main-2',
    name: 'Mushroom Risotto',
    description: 'Creamy arborio rice with wild mushrooms and truffle oil',
    category: 'Main Meals',
    price: 16.99,
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    nutritionalInfo: {
      calories: 520,
      protein: 12,
      carbs: 68,
      fat: 24,
      fiber: 5
    },
    dietaryFilters: ['Vegan', 'Gluten-Free']
  },
  // Salads
  {
    id: 'salad-1',
    name: 'Mediterranean Salad',
    description: 'Mixed greens, feta, olives, cucumber, tomatoes, and red wine vinaigrette',
    category: 'Salads',
    price: 11.99,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    nutritionalInfo: {
      calories: 320,
      protein: 12,
      carbs: 28,
      fat: 18,
      fiber: 6
    },
    dietaryFilters: ['Gluten-Free']
  },
  {
    id: 'salad-2',
    name: 'Quinoa Power Salad',
    description: 'Quinoa, roasted vegetables, chickpeas, and lemon tahini dressing',
    category: 'Salads',
    price: 12.99,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    nutritionalInfo: {
      calories: 380,
      protein: 14,
      carbs: 52,
      fat: 16,
      fiber: 10
    },
    dietaryFilters: ['Vegan', 'Gluten-Free']
  },
  // Smoothies
  {
    id: 'smoothie-1',
    name: 'Green Goddess',
    description: 'Spinach, banana, mango, coconut water, and chia seeds',
    category: 'Smoothies',
    price: 7.99,
    imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    nutritionalInfo: {
      calories: 240,
      protein: 6,
      carbs: 48,
      fat: 4,
      fiber: 8
    },
    dietaryFilters: ['Vegan', 'Gluten-Free']
  },
  {
    id: 'smoothie-2',
    name: 'Berry Blast',
    description: 'Mixed berries, Greek yogurt, honey, and almond milk',
    category: 'Smoothies',
    price: 7.99,
    imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    nutritionalInfo: {
      calories: 220,
      protein: 12,
      carbs: 42,
      fat: 3,
      fiber: 6
    },
    dietaryFilters: ['Gluten-Free']
  },
  // Snacks
  {
    id: 'snack-1',
    name: 'Energy Balls',
    description: 'Dates, nuts, cacao, and coconut energy balls (3 pieces)',
    category: 'Snacks',
    price: 5.99,
    imageUrl: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    nutritionalInfo: {
      calories: 180,
      protein: 6,
      carbs: 24,
      fat: 10,
      fiber: 4
    },
    dietaryFilters: ['Vegan', 'Gluten-Free']
  },
  {
    id: 'snack-2',
    name: 'Mixed Nuts',
    description: 'Premium roasted nuts and dried fruit mix',
    category: 'Snacks',
    price: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    nutritionalInfo: {
      calories: 160,
      protein: 5,
      carbs: 12,
      fat: 14,
      fiber: 3
    },
    dietaryFilters: ['Vegan', 'Gluten-Free']
  }
];
