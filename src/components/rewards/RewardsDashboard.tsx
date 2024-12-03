import { motion } from 'framer-motion';
import { Award, Gift, Star, TrendingUp, ChevronRight, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from './ui/GlassCard';
import { ProgressRing } from './ui/ProgressRing';
import { RewardCard } from './ui/RewardCard';
import { TasksSection } from "./TasksSection";
import { rewards } from "../../data/rewards";
import { useNavigate } from 'react-router-dom';

// Enhanced rewards data with descriptions and tier info
const membershipTiers = [
  { name: 'Green', minPoints: 0, color: 'from-green-400 to-green-600' },
  { name: 'Gold', minPoints: 1000, color: 'from-yellow-400 to-yellow-600' },
  { name: 'Platinum', minPoints: 5000, color: 'from-purple-400 to-purple-600' }
];

export function RewardsDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/', { replace: true });
  };

  if (!user) return null;

  const currentTier = membershipTiers
    .slice()
    .reverse()
    .find(tier => user.points >= tier.minPoints);

  const nextTier = membershipTiers
    .find(tier => user.points < tier.minPoints);

  const pointsToNextTier = nextTier ? nextTier.minPoints - user.points : 0;
  const progressToNextTier = nextTier 
    ? (user.points / nextTier.minPoints) * 100
    : 100;

  return (
    <div className="min-h-screen bg-gray-900 pb-12">
      {/* Hero Section with Current Status */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-transparent" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          {/* Navigation Buttons */}
          <div className="mb-8 flex justify-between items-center">
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </motion.button>

            <motion.button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 5 }}
            >
              <span className="text-sm font-medium">Sign Out</span>
              <LogOut className="w-5 h-5 transform transition-transform group-hover:rotate-12" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Welcome Message */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <h1 className="text-4xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-xl text-gray-300">
                  You're a {currentTier?.name} member
                </p>
              </motion.div>

              {nextTier && (
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Next Tier: {nextTier.name}</h3>
                      <p className="text-sm text-gray-300">
                        {pointsToNextTier} points until {nextTier.name}
                      </p>
                    </div>
                    <div className="w-16 h-16">
                      <ProgressRing progress={progressToNextTier} size={64}>
                        <span className="text-sm font-medium">{Math.round(progressToNextTier)}%</span>
                      </ProgressRing>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${nextTier.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressToNextTier}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </GlassCard>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <GlassCard className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <Star className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{user.points}</div>
                      <div className="text-sm text-gray-300">Available Points</div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {user.rewardHistory.filter(h => h.type === 'earn').length}
                      </div>
                      <div className="text-sm text-gray-300">Total Activities</div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Membership Card */}
            <div className="lg:pl-12">
              <GlassCard className="aspect-[16/10] p-8 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />

                {/* Card content */}
                <div className="relative h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-medium mb-1">FreshKing Rewards</h3>
                      <p className="text-sm text-gray-300">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${currentTier?.color} font-medium`}>
                      {currentTier?.name}
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-300">Card Member</p>
                      <p className="text-lg font-medium">{user.name}</p>
                    </div>
                    <Award className="w-12 h-12 text-white/50" />
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Available Rewards
          </h2>
          <button 
            className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors group"
            onClick={() => window.location.href = '/rewards/all'}
          >
            <span>View all rewards</span>
            <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              title={reward.title}
              description={reward.description}
              points={reward.points}
              progress={user.points}
              totalPoints={reward.points}
              imageSrc={reward.imageSrc}
            />
          ))}
        </div>
      </section>

      {/* Ways to Earn Points */}
      <TasksSection />

      {/* Recent Activity */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-8">
          Recent Activity
        </h2>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden">
          <div className="divide-y divide-gray-800">
            {user.rewardHistory.slice(0, 5).map((history) => (
              <motion.div
                key={history.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    history.type === 'earn' 
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {history.type === 'earn' ? <Star className="w-6 h-6" /> : <Gift className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="font-medium">{history.description}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(history.date).toLocaleDateString()} at {new Date(history.date).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className={`font-medium ${
                  history.type === 'earn' ? 'text-green-400' : 'text-blue-400'
                }`}>
                  {history.type === 'earn' ? '+' : ''}{history.points} points
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
