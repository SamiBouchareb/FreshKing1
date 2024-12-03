import React from 'react';
import { MenuItem } from '../../types/menu';

interface ScrollingMenuItemsProps {
  items: MenuItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  cartItems: { [key: string]: number };
}

export const ScrollingMenuItems: React.FC<ScrollingMenuItemsProps> = ({
  items,
  addToCart,
  removeFromCart,
  cartItems,
}) => {
  const repeatedItems = [...items, ...items, ...items, ...items, ...items];

  const handleAddToCart = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    
    // Get the clicked button and cart icon elements
    const button = e.currentTarget;
    const cart = document.querySelector('.shopping-cart-icon');
    
    if (button && cart) {
      // Get the card element
      const card = button.closest('.dish-card');
      if (!card) return;

      // Create a clone of the card
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
      clone.style.zIndex = '9999';
      clone.style.pointerEvents = 'none';
      
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

    addToCart(item);
  };

  return (
    <div className="relative w-full">
      {/* Wider fade effects */}
      <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-white to-transparent z-10" />
      
      <div className="overflow-x-hidden">
        <div className="flex animate-infinite-scroll">
          {repeatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              data-dish-id={item.id}
              className="dish-card w-80 flex-shrink-0 mx-4 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="h-48 w-full bg-gray-200 relative overflow-hidden group">
                <img
                  alt={item.name}
                  src={item.imageUrl}
                  className="dish-image w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full shadow-md font-medium text-green-600">
                  ${item.price.toFixed(2)}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Content Section */}
              <div className="flex flex-col h-full p-5">
                {/* Title and Description */}
                <div className="mb-3">
                  <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                </div>

                {/* Dietary Tags */}
                {item.dietaryFilters.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.dietaryFilters.map(filter => (
                      <span
                        key={filter}
                        className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full"
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                )}

                {/* Nutritional Information */}
                <div className="mt-auto">
                  <p className="text-sm font-medium text-gray-600 mb-2">Nutritional Info</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="text-center">
                      <p>{item.nutritionalInfo.calories}</p>
                      <p>Calories</p>
                    </div>
                    <div className="text-center">
                      <p>{item.nutritionalInfo.protein}g</p>
                      <p>Protein</p>
                    </div>
                    <div className="text-center">
                      <p>{item.nutritionalInfo.carbs}g</p>
                      <p>Carbs</p>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Section */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(item.id);
                      }}
                      className="quantity-button w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition-colors"
                      disabled={!cartItems[item.id]}
                    >
                      <span className="text-xl">-</span>
                    </button>
                    <span className="w-8 text-center">{cartItems[item.id] || 0}</span>
                    <button
                      onClick={(e) => handleAddToCart(e, item)}
                      className="quantity-button w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-xl">+</span>
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="cart-button px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
