import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '../../types/menu';

interface ItemBreakdownProps {
  item: MenuItem;
  quantity: number;
}

const ItemBreakdown: React.FC<ItemBreakdownProps> = ({ item, quantity }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  const nutritionItems = [
    { label: 'Calories', value: item.nutritionalInfo.calories, unit: '' },
    { label: 'Protein', value: item.nutritionalInfo.protein, unit: 'g' },
    { label: 'Carbs', value: item.nutritionalInfo.carbs, unit: 'g' },
    { label: 'Fat', value: item.nutritionalInfo.fat, unit: 'g' },
    { label: 'Fiber', value: item.nutritionalInfo.fiber, unit: 'g' },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
    >
      <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3 flex-grow min-w-0">
          <h4 className="text-base font-semibold text-gray-900 truncate">{item.name}</h4>
          <p className="text-sm text-gray-500 truncate">{item.description}</p>
        </div>
        <div className="ml-3 flex-shrink-0">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
            ×{quantity}
          </span>
        </div>
      </div>

      <div className="p-3">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {nutritionItems.map((nutrition, index) => (
            <motion.div
              key={nutrition.label}
              variants={listItem}
              className="relative"
            >
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">{nutrition.label}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {(nutrition.value * quantity).toFixed(1)}
                  {nutrition.unit}
                </span>
                <div className="mt-1 h-1 rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(nutrition.value * quantity) / 10}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full rounded-full bg-green-500"
                    style={{ maxWidth: '100%' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {item.dietaryFilters.length > 0 && (
        <div className="px-3 pb-3">
          <div className="flex flex-wrap gap-1">
            {item.dietaryFilters.map((filter) => (
              <span
                key={filter}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700"
              >
                {filter}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ItemBreakdown;
