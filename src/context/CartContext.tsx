import { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '../types/menu';

interface CartContextType {
  items: MenuItem[];
  cartItems: { [key: string]: number };
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});

  const addToCart = (item: MenuItem) => {
    if (!items.find(i => i.id === item.id)) {
      setItems(currentItems => [...currentItems, item]);
    }
    setCartItems(current => ({
      ...current,
      [item.id]: (current[item.id] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(current => {
      const newCartItems = { ...current };
      if (newCartItems[itemId] > 1) {
        newCartItems[itemId]--;
      } else {
        delete newCartItems[itemId];
        setItems(currentItems => currentItems.filter(item => item.id !== itemId));
      }
      return newCartItems;
    });
  };

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const quantity = cartItems[item.id] || 0;
      return total + item.price * quantity;
    }, 0);
  };

  const clearCart = () => {
    setItems([]);
    setCartItems({});
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalItems,
        getTotalPrice,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
