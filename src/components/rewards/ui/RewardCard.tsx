import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

interface RewardCardProps {
  title: string;
  description: string;
  points: number;
  progress: number;
  totalPoints: number;
  imageSrc: string;
  className?: string;
}

export const RewardCard = ({
  title,
  description,
  points,
  progress,
  totalPoints,
  imageSrc,
  className,
}: RewardCardProps) => {
  const percentageEarned = Math.round((progress / totalPoints) * 100);
  const remainingPoints = totalPoints - progress;

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/10",
        "border border-white/10 backdrop-blur-sm transition-all duration-300",
        "hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10",
        className
      )}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 space-y-4">
        {/* Points Badge */}
        <div className="inline-flex items-center rounded-full bg-black/30 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          <span className="mr-1.5">⭐</span>
          {points} points
        </div>

        {/* Title and Description */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-white font-medium">{percentageEarned}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 overflow-hidden rounded-full bg-black/30 backdrop-blur-sm">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600"
              style={{ width: `${percentageEarned}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${percentageEarned}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          {/* Points Remaining */}
          <p className="text-sm text-gray-400">
            Earn {remainingPoints} more points
          </p>
        </div>
      </div>
    </motion.div>
  );
};
