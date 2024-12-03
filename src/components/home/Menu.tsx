import { useState } from 'react';
import { Category, DietaryFilter } from '../../types/menu';
import { menuItems } from '../../data/menuItems';
import { ScrollingMenuItems } from './ScrollingMenuItems';
import { useCart } from '../../context/CartContext';

interface MenuProps {
  id: string;
}

const categories: Category[] = ['Bowls', 'Sandwiches', 'Soups', 'Main Meals', 'Salads', 'Smoothies', 'Snacks'];
const filters: DietaryFilter[] = ['Vegan', 'Gluten-Free'];

export function Menu({ id }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [activeFilters, setActiveFilters] = useState<DietaryFilter[]>([]);
  const { cartItems, addToCart, removeFromCart } = useCart();

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesFilters = activeFilters.length === 0 || 
      activeFilters.every(filter => item.dietaryFilters.includes(filter));
    return matchesCategory && matchesFilters;
  });

  const toggleFilter = (filter: DietaryFilter) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleAddToCart = (dish: any) => {
    // Create a clone of the dish card
    const card = document.querySelector(`[data-dish-id="${dish.id}"]`);
    const cart = document.querySelector('.shopping-cart-icon');
    
    if (card && cart) {
      const clone = card.cloneNode(true) as HTMLElement;
      const cardRect = card.getBoundingClientRect();
      const cartRect = cart.getBoundingClientRect();

      // Style the clone
      clone.classList.add('cart-item-clone');
      clone.style.position = 'fixed';
      clone.style.top = `${cardRect.top}px`;
      clone.style.left = `${cardRect.left}px`;
      clone.style.width = `${cardRect.width}px`;
      clone.style.height = `${cardRect.height}px`;
      clone.style.animation = 'none';
      
      document.body.appendChild(clone);

      // Force a reflow
      clone.offsetHeight;

      // Start the animation
      requestAnimationFrame(() => {
        clone.style.animation = 'addToCartFloat 0.6s cubic-bezier(0.2, 0.6, 0.2, 1.5) forwards';
        clone.style.top = `${cartRect.top}px`;
        clone.style.left = `${cartRect.left}px`;
      });

      // Remove clone after animation
      clone.addEventListener('animationend', () => {
        document.body.removeChild(clone);
      });

      // Add visual feedback to the cart icon
      cart.classList.add('cart-bump');
      setTimeout(() => cart.classList.remove('cart-bump'), 300);
    }

    // Add to cart logic
    addToCart(dish);
  };

  return (
    <section id={id} className="relative min-h-screen" style={{
      background: `
        linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(243, 244, 246, 0.8)),
        repeating-linear-gradient(45deg, #22c55e99 0px, #22c55e99 2px, transparent 2px, transparent 15px),
        repeating-linear-gradient(-45deg, #22c55e99 0px, #22c55e99 2px, transparent 2px, transparent 15px),
        linear-gradient(90deg, #ffffff, #f3f4f6)
      `,
      backgroundSize: '100% 100%, 30px 30px, 30px 30px, 100% 100%'
    }}>
      <div className="relative pt-20 pb-20">
        <div className="px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent relative">
                Our Fresh Menu
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg">
              Discover our selection of fresh, nutritious meals prepared with high-quality ingredients.
              From energizing bowls to refreshing smoothies, we have something for everyone.
            </p>
          </div>
          
          {/* Categories */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 font-medium ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105'
                    : 'bg-white hover:bg-gray-50 hover:scale-105 shadow-md'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full transition-all duration-300 font-medium ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105'
                      : 'bg-white hover:bg-gray-50 hover:scale-105 shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Filters */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-6 py-2.5 rounded-full transition-all duration-300 font-medium ${
                    activeFilters.includes(filter)
                      ? 'bg-gradient-to-r from-green-600 to-green-400 text-white shadow-lg scale-105'
                      : 'bg-white hover:bg-gray-50 hover:scale-105 shadow-md'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items - Now full width */}
        <div className="w-full">
          <ScrollingMenuItems 
            items={filteredItems}
            addToCart={handleAddToCart}
            removeFromCart={removeFromCart}
            cartItems={cartItems}
          />
        </div>
      </div>
    </section>
  );
};
