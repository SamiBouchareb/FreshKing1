import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { Check } from "lucide-react";

interface TaskCardProps {
  title: string;
  description: string;
  points: number;
  icon: React.ReactNode;
  completed?: boolean;
  progress?: number;
  className?: string;
  onClick?: () => void;
}

export const TaskCard = ({
  title,
  description,
  points,
  icon,
  completed = false,
  progress = 0,
  className,
  onClick,
}: TaskCardProps) => {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl transition-all duration-500",
        "border border-white/10 backdrop-blur-lg cursor-pointer",
        completed
          ? "bg-gradient-to-br from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30"
          : "bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10",
        className
      )}
      whileHover={{ scale: 1.02 }}
      layout
    >
      {/* Animated border */}
      <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />

      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 blur-xl" />
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            {/* Icon with animated background */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl blur-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-black/30 text-green-400">
                {icon}
              </div>
            </div>

            {/* Title and Description */}
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <span>{title}</span>
                {completed && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20 text-green-400"
                  >
                    <Check className="w-3 h-3" />
                  </motion.span>
                )}
              </h3>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
          </div>

          {/* Points badge */}
          <div className="flex items-center space-x-1 bg-black/30 px-3 py-1 rounded-full text-sm">
            <span className="text-yellow-400">✦</span>
            <span className="text-white font-medium">{points}</span>
          </div>
        </div>

        {/* Progress bar (if not completed) */}
        {!completed && progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-white font-medium">{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-black/30 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
    </motion.div>
  );
};
