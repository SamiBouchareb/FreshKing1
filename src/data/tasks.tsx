import {
  Utensils,
  Share2,
  Users,
  Star,
  Calendar,
  ShoppingBag,
  Heart,
  Trophy,
  Target,
  Smile,
} from "lucide-react";

export const dailyTasks = [
  {
    id: "order",
    title: "Place Your First Order",
    description: "Start your journey by placing your first order with us",
    points: 100,
    icon: ShoppingBag,
    category: "daily",
  },
  {
    id: "share",
    title: "Share on Social Media",
    description: "Share your FreshKing experience with friends",
    points: 50,
    icon: Share2,
    category: "daily",
  },
  {
    id: "review",
    title: "Write a Review",
    description: "Share your thoughts about your recent order",
    points: 75,
    icon: Star,
    category: "daily",
  },
];

export const weeklyTasks = [
  {
    id: "friend",
    title: "Refer a Friend",
    description: "Invite friends to join FreshKing Rewards",
    points: 200,
    icon: Users,
    category: "weekly",
  },
  {
    id: "streak",
    title: "Weekly Streak",
    description: "Order 3 times in a week",
    points: 150,
    icon: Calendar,
    category: "weekly",
    progress: 66,
  },
];

export const specialTasks = [
  {
    id: "birthday",
    title: "Birthday Reward",
    description: "Special bonus points on your birthday",
    points: 500,
    icon: Heart,
    category: "special",
  },
  {
    id: "challenge",
    title: "Monthly Challenge",
    description: "Complete all daily tasks for 30 days",
    points: 1000,
    icon: Trophy,
    category: "special",
    progress: 80,
  },
];

export const achievements = [
  {
    id: "green",
    title: "Green Member",
    description: "Reach Green membership tier",
    points: 300,
    icon: Target,
    category: "achievement",
  },
  {
    id: "gold",
    title: "Gold Member",
    description: "Reach Gold membership tier",
    points: 800,
    icon: Trophy,
    category: "achievement",
  },
  {
    id: "platinum",
    title: "Platinum Elite",
    description: "Reach Platinum membership tier",
    points: 2000,
    icon: Star,
    category: "achievement",
  },
];

export const categories = [
  {
    id: "daily",
    title: "Daily Tasks",
    description: "Complete these tasks daily to earn points",
    icon: Utensils,
  },
  {
    id: "weekly",
    title: "Weekly Challenges",
    description: "Bigger rewards for weekly commitments",
    icon: Calendar,
  },
  {
    id: "special",
    title: "Special Events",
    description: "Limited-time opportunities to earn bonus points",
    icon: Star,
  },
  {
    id: "achievement",
    title: "Achievements",
    description: "Long-term goals with major rewards",
    icon: Trophy,
  },
];
