import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthModal } from '../components/rewards/AuthModal';
import { RewardsDashboard } from '../components/rewards/RewardsDashboard';
import { Award, Gift, Star, Ticket, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GlassCard } from '../components/rewards/ui/GlassCard';
import { useNavigate } from 'react-router-dom';

const rewardsFeatures = [
  {
    icon: Star,
    title: 'Earn Points',
    description: 'Get 10 points for every $1 spent. Points add up fast with every healthy choice you make.'
  },
  {
    icon: Gift,
    title: 'Exclusive Rewards',
    description: 'Redeem points for free meals, exclusive offers, and special member-only items.'
  },
  {
    icon: Award,
    title: 'Member Tiers',
    description: 'Progress through Green, Gold, and Platinum tiers for enhanced benefits and rewards.'
  },
  {
    icon: Ticket,
    title: 'Special Events',
    description: 'Get early access to new menu items and exclusive member-only events.'
  }
];

export function RewardsPage() {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(!isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      setIsAuthModalOpen(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
      {isAuthenticated ? (
        <RewardsDashboard />
      ) : (
        <div className="relative">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-transparent" />
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Hero Section */}
          <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    FreshKing Rewards
                  </h1>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Join our rewards program and earn points with every order.
                    Unlock exclusive benefits and free meals as you level up.
                  </p>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                >
                  Join Now
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-8 flex justify-center space-x-8 text-gray-400"
                >
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    <span>10 points per $1</span>
                  </div>
                  <div className="flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    <span>Free welcome bonus</span>
                  </div>
                  <div className="flex items-center">
                    <Ticket className="w-5 h-5 mr-2" />
                    <span>Exclusive offers</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {rewardsFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="h-full p-6 hover:scale-105 transition-transform duration-300">
                    <div className="flex flex-col h-full">
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 flex-grow">
                        {feature.description}
                      </p>
                      <div className="mt-4 flex items-center text-green-400 text-sm font-medium">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <GlassCard className="p-12 text-center space-y-8">
              <h2 className="text-3xl font-bold">Ready to Start Earning?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Join FreshKing Rewards today and start earning points with your very first order.
                Plus, get 100 bonus points just for signing up!
              </p>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
              >
                Get Started Now
              </button>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
}
