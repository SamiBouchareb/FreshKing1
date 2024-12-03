export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'salads' | 'wraps' | 'smoothies' | 'snacks';
  tags: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}