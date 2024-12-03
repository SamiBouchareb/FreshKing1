import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
    const { items, cartItems, addToCart, removeFromCart, getTotalPrice } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onClose();
        navigate('/checkout');
    };

    const dropdownVariants = {
        hidden: { 
            opacity: 0,
            y: -20,
            scale: 0.95,
        },
        visible: { 
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        exit: { 
            opacity: 0,
            y: -20,
            scale: 0.95,
            transition: {
                duration: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        exit: { 
            opacity: 0, 
            x: -20,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Cart Dropdown */}
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-20 right-4 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 bg-gradient-to-r from-green-600 to-green-500">
                            <div className="flex items-center justify-between text-white mb-4">
                                <div className="flex items-center gap-3">
                                    <ShoppingBag className="w-6 h-6" />
                                    <h2 className="text-xl font-semibold">Your Cart</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-green-50">
                                {items.length === 0 
                                    ? "Your cart is empty"
                                    : `${Object.values(cartItems).reduce((a, b) => a + b, 0)} items in your cart`
                                }
                            </p>
                        </div>

                        {/* Cart Items */}
                        <div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex gap-4">
                                            {/* Item Image */}
                                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Item Details */}
                                            <div className="flex-grow">
                                                <h3 className="font-medium text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-semibold text-green-600">
                                                        ${item.price.toFixed(2)}
                                                    </span>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => removeFromCart(item.id.toString())}
                                                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4 text-gray-600" />
                                                        </button>
                                                        <span className="font-medium text-gray-900">
                                                            {cartItems[item.id]}
                                                        </span>
                                                        <button
                                                            onClick={() => addToCart(item)}
                                                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4 text-gray-600" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {items.length === 0 && (
                                <div className="py-12 px-4 text-center">
                                    <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">Your cart is empty</p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Add some delicious items to get started
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 bg-gray-50 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-600">Total</span>
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${getTotalPrice().toFixed(2)}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 group"
                                >
                                    Checkout
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
