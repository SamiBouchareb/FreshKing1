import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedGrid = () => {
  // Create a 10x10 grid of dots
  const gridSize = 10;
  const dots = Array.from({ length: gridSize * gridSize });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/90 to-green-600/90 z-10"></div>
      
      {/* Animated grid */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 grid grid-cols-10 gap-8 transform -rotate-12 scale-150">
            {dots.map((_, index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-white/20 rounded-full"
                initial={{ opacity: 0.1, scale: 1 }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: (index % gridSize) * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: 0,
            }}
            animate={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Light beams */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={`beam-${index}`}
            className="absolute h-[200%] w-16 bg-gradient-to-b from-white/0 via-white/5 to-white/0"
            initial={{
              rotate: index * 45,
              x: "-100%",
              y: "-50%",
            }}
            animate={{
              x: "200%",
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: index * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};
