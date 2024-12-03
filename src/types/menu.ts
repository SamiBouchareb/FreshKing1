export type Category = 'Bowls' | 'Sandwiches' | 'Soups' | 'Main Meals' | 'Salads' | 'Smoothies' | 'Snacks';

export type DietaryFilter = 'Vegan' | 'Gluten-Free';

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  imageUrl: string;
  nutritionalInfo: NutritionalInfo;
  dietaryFilters: DietaryFilter[];
}
