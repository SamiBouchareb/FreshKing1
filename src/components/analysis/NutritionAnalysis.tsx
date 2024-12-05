import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { MenuItem, NutritionalInfo } from '../../types/menu';
import NutritionCard from './NutritionCard';
import NutritionChart from './NutritionChart';
import ItemBreakdown from './ItemBreakdown';
import {
  Flame,
  Beef,
  Wheat,
  Droplet,
  Salad,
} from 'lucide-react';

interface CartItem {
  item: MenuItem;
  quantity: number;
}

const NutritionAnalysis: React.FC = () => {
  const { items, cartItems } = useCart();
  
  const cartItemsArray: CartItem[] = items.map(item => ({
    item,
    quantity: cartItems[item.id] || 0
  }));

  const totalNutrition = cartItemsArray.reduce<NutritionalInfo>(
    (acc, { item, quantity }) => ({
      calories: acc.calories + (item.nutritionalInfo.calories * quantity),
      protein: acc.protein + (item.nutritionalInfo.protein * quantity),
      carbs: acc.carbs + (item.nutritionalInfo.carbs * quantity),
      fat: acc.fat + (item.nutritionalInfo.fat * quantity),
      fiber: acc.fiber + (item.nutritionalInfo.fiber * quantity),
    }),
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
    }
  );

  const dailyValues = {
    calories: (totalNutrition.calories / 2000) * 100,
    protein: (totalNutrition.protein / 50) * 100,
    carbs: (totalNutrition.carbs / 275) * 100,
    fat: (totalNutrition.fat / 78) * 100,
    fiber: (totalNutrition.fiber / 28) * 100,
  };

  const macroData = [
    { name: 'Protein', value: totalNutrition.protein, unit: 'g' },
    { name: 'Carbs', value: totalNutrition.carbs, unit: 'g' },
    { name: 'Fat', value: totalNutrition.fat, unit: 'g' },
    { name: 'Fiber', value: totalNutrition.fiber, unit: 'g' },
  ];

  const caloriesData = cartItemsArray.map(({ item, quantity }) => ({
    name: item.name,
    value: item.nutritionalInfo.calories * quantity,
    unit: 'cal'
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-3xl p-4 lg:p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-6"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Nutrition Analysis</h2>
          <p className="text-gray-600">Order nutritional breakdown</p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 md:mt-0 text-sm text-amber-700 bg-amber-50 px-4 py-2 rounded-full inline-flex items-center"
        >
          <span>Based on 2,000 cal daily diet</span>
        </motion.div>
      </motion.div>

      <div className="relative -mx-4 px-4 md:mx-0 md:px-0 mb-6">
        <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-4 pb-4 md:pb-0 hide-scrollbar">
          <NutritionCard
            title="Calories"
            value={totalNutrition.calories}
            unit="cal"
            color="bg-gradient-to-br from-green-500 to-emerald-600"
            icon={<Flame className="w-5 h-5 text-white" />}
            percentage={dailyValues.calories}
          />
          <NutritionCard
            title="Protein"
            value={totalNutrition.protein}
            unit="g"
            color="bg-gradient-to-br from-blue-500 to-indigo-600"
            icon={<Beef className="w-5 h-5 text-white" />}
            percentage={dailyValues.protein}
          />
          <NutritionCard
            title="Carbs"
            value={totalNutrition.carbs}
            unit="g"
            color="bg-gradient-to-br from-amber-500 to-orange-600"
            icon={<Wheat className="w-5 h-5 text-white" />}
            percentage={dailyValues.carbs}
          />
          <NutritionCard
            title="Fat"
            value={totalNutrition.fat}
            unit="g"
            color="bg-gradient-to-br from-pink-500 to-rose-600"
            icon={<Droplet className="w-5 h-5 text-white" />}
            percentage={dailyValues.fat}
          />
          <NutritionCard
            title="Fiber"
            value={totalNutrition.fiber}
            unit="g"
            color="bg-gradient-to-br from-teal-500 to-cyan-600"
            icon={<Salad className="w-5 h-5 text-white" />}
            percentage={dailyValues.fiber}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <NutritionChart
            data={caloriesData}
            type="bar"
            title="Calories per Item"
          />
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <NutritionChart
            data={macroData}
            type="pie"
            title="Macro Distribution"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Detailed Breakdown
        </h3>
        {cartItemsArray.map(({ item, quantity }) => (
          <ItemBreakdown
            key={item.id}
            item={item}
            quantity={quantity}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default NutritionAnalysis;
