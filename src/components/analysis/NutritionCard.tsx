import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface NutritionCardProps {
  title: string;
  value: number;
  unit: string;
  color: string;
  icon: React.ReactNode;
  percentage?: number;
}

const NutritionCard: React.FC<NutritionCardProps> = ({
  title,
  value,
  unit,
  color,
  icon,
  percentage
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`${color} rounded-2xl p-4 flex-shrink-0 w-[180px] md:w-auto`}
    >
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-20 w-20 rounded-full opacity-20 bg-white" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-white/10">
              {icon}
            </div>
            <h3 className="text-sm font-medium text-white/90">{title}</h3>
          </div>
          
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white">
              <CountUp end={value} decimals={1} duration={2} />
            </span>
            <span className="text-sm text-white/80">{unit}</span>
          </div>

          {percentage !== undefined && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-white/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full bg-white"
                />
              </div>
              <span className="text-xs text-white/80">{Math.round(percentage)}%</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NutritionCard;
