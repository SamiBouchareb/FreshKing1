import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GiWheat } from 'react-icons/gi';
import { LuSalad } from 'react-icons/lu';
import { useInView } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string; // Changed from 'image' to 'imageUrl'
    isVegan?: boolean;
    isGlutenFree?: boolean;
}

export function MenuScroll() {
    const ref = useRef(null);
    const { addToCart } = useCart();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Sample menu items data
    const menuItems: MenuItem[] = [
        {
            id: 1,
            name: "Green Goddess Bowl",
            description: "Fresh mixed greens, avocado, quinoa, chickpeas, and our signature tahini dressing",
            price: 12.99,
            category: "bowls",
            imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
            isVegan: true,
            isGlutenFree: true
        },
        {
            id: 2,
            name: "Protein Power Bowl",
            description: "Grilled chicken, sweet potatoes, broccoli, brown rice, and almond sauce",
            price: 14.99,
            category: "bowls",
            imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop",
            isGlutenFree: true
        },
        // Add more menu items as needed
    ];

    const filteredItems = selectedCategory === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === selectedCategory);

    return (
        <div ref={ref} className="w-full py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Category filters */}
                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-6 py-2 rounded-full transition-all ${
                            selectedCategory === 'all'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setSelectedCategory('bowls')}
                        className={`px-6 py-2 rounded-full transition-all ${
                            selectedCategory === 'bowls'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Bowls
                    </button>
                    {/* Add more category buttons as needed */}
                </div>

                {/* Menu items grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                        <motion.div
                            key={item.id}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative h-48">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    {item.isVegan && (
                                        <span className="bg-green-500 text-white p-2 rounded-full">
                                            <LuSalad className="w-4 h-4" />
                                        </span>
                                    )}
                                    {item.isGlutenFree && (
                                        <span className="bg-amber-500 text-white p-2 rounded-full">
                                            <GiWheat className="w-4 h-4" />
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                                <p className="text-gray-600 mb-4">{item.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-green-600">${item.price}</span>
                                    <Button 
                                        onClick={() => addToCart(item)}
                                        variant="default"
                                        size="default"
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
