import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "../../../utils/cn";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  className?: string;
}

export const GlassCard = ({ className, children, ...props }: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        "rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
