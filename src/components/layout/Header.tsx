import { useState } from 'react';
import { Leaf, ShoppingBag, Menu as MenuIcon, X, Award } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartDropdown } from '../cart/CartDropdown';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu if open
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRewardsClick = () => {
    setIsMobileMenuOpen(false);
    navigate('/rewards');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50">
      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="bg-green-100 p-2.5 rounded-full group-hover:bg-green-200 transition-all duration-300 transform group-hover:scale-105">
              <Leaf className="w-8 h-8 text-green-600 group-hover:text-green-700" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              FreshKing
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {['Home', 'Menu', 'About', 'Sustainability', 'Locations'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="px-4 py-2 text-gray-700 hover:text-green-600 rounded-full hover:bg-green-50 transition-all duration-300 font-medium"
              >
                {item}
              </button>
            ))}
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              className="rewards-button hidden md:flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-green-600 rounded-full hover:bg-green-50 transition-all duration-300 group transform hover:scale-105"
              onClick={handleRewardsClick}
            >
              <Award className="w-5 h-5 text-gray-700 group-hover:text-green-600" />
              <span className="font-medium">Rewards</span>
            </button>
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="shopping-cart-icon p-2 hover:bg-green-50 rounded-full transition-all duration-300 relative group transform hover:scale-105"
            >
              <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:text-green-600" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-in slide-in-from-top-2">
                  {itemCount}
                </span>
              )}
            </button>
            <button className="hidden md:block px-6 py-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 font-medium shadow-lg shadow-green-200 hover:shadow-green-300 transform hover:scale-105">
              Order Now
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-green-50 rounded-full transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <MenuIcon className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cart Dropdown */}
      <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['Home', 'Menu', 'About', 'Sustainability', 'Locations'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
              >
                {item}
              </button>
            ))}
            <button
              onClick={handleRewardsClick}
              className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
            >
              <Award className="w-5 h-5" />
              <span>Rewards</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}