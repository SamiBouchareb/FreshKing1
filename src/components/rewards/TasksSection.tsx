import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TaskCard } from "./ui/TaskCard";
import { categories, dailyTasks, weeklyTasks, specialTasks, achievements } from "../../data/tasks";
import { cn } from "../../utils/cn";

export const TasksSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("daily");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const getTasks = () => {
    switch (selectedCategory) {
      case "daily":
        return dailyTasks;
      case "weekly":
        return weeklyTasks;
      case "special":
        return specialTasks;
      case "achievement":
        return achievements;
      default:
        return dailyTasks;
    }
  };

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);
  const CategoryIcon = currentCategory?.icon;

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900 to-gray-900" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent"
          >
            Ways to Earn Points
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Complete tasks, earn points, and unlock exclusive rewards. The more you engage, the more you earn!
          </motion.p>
        </div>

        {/* Category Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = category.id === selectedCategory;
              const isHovered = category.id === hoveredCategory;

              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  onHoverStart={() => setHoveredCategory(category.id)}
                  onHoverEnd={() => setHoveredCategory(null)}
                  className={cn(
                    "relative group px-6 py-4 rounded-xl transition-all duration-300",
                    "backdrop-blur-lg border",
                    isSelected
                      ? "border-green-500/30 bg-green-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Glow Effect */}
                  <AnimatePresence>
                    {(isSelected || isHovered) && (
                      <motion.div
                        className="absolute inset-0 -z-10 bg-green-500/20 blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="flex items-center space-x-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        isSelected ? "text-green-400" : "text-gray-400 group-hover:text-white"
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p
                        className={cn(
                          "font-medium transition-colors",
                          isSelected ? "text-green-400" : "text-white"
                        )}
                      >
                        {category.title}
                      </p>
                      <p className="text-sm text-gray-400">{category.description}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Tasks Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="wait">
            {getTasks().map((task) => {
              const Icon = task.icon;
              return (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  points={task.points}
                  icon={<Icon className="w-6 h-6" />}
                  progress={task.progress}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Category Info */}
        <motion.div
          layout
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-lg">
            {CategoryIcon && <CategoryIcon className="w-4 h-4 text-green-400" />}
            <span className="text-sm text-gray-400">
              {selectedCategory === "daily" && "Complete daily tasks to build your streak"}
              {selectedCategory === "weekly" && "Weekly challenges refresh every Monday"}
              {selectedCategory === "special" && "Don't miss out on limited-time opportunities"}
              {selectedCategory === "achievement" && "Track your long-term progress"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
