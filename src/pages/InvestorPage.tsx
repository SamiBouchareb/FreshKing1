import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView as useFramerInView } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, ShoppingBag, DollarSign, Leaf, Target, Award, ChevronRight, ArrowRight, Globe2, Rocket, PieChart, Play, ChevronLeft } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { AnimatedGrid } from '../components/common/AnimatedGrid';
import { Link } from 'react-router-dom';

// Enhanced sample data
const revenueData = [
  { month: 'Jan', value: 150000 },
  { month: 'Feb', value: 180000 },
  { month: 'Mar', value: 220000 },
  { month: 'Apr', value: 280000 },
  { month: 'May', value: 350000 },
  { month: 'Jun', value: 450000 },
  { month: 'Jul', value: 580000 },
  { month: 'Aug', value: 720000 },
  { month: 'Sep', value: 900000 },
  { month: 'Oct', value: 1100000 },
  { month: 'Nov', value: 1350000 },
  { month: 'Dec', value: 1650000 },
];

const marketData = [
  { year: '2023', value: 5.2 },
  { year: '2024', value: 7.8 },
  { year: '2025', value: 12.5 },
  { year: '2026', value: 18.9 },
  { year: '2027', value: 28.4 },
];

export function InvestorPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Smooth scroll progress
  const scrollProgress = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoaded(true);
  }, []);

  // Sections refs and animations
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [videoRef1, videoInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [metricsRef, metricsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Parallax effects
  const parallax1 = useTransform(scrollY, [0, 500], [0, -50]);
  const parallax2 = useTransform(scrollY, [0, 500], [0, -30]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Hero Section with Enhanced Animation */}
      <motion.section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Rich Green Background with Patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600">
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                               linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />

          {/* Animated Dots */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.2 + Math.random() * 0.3
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Back to Home Button */}
          <div className="absolute left-0 top-0 mb-8">
            <Link 
              to="/"
              className="group flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-green-600 transform group-hover:-translate-x-1 transition-transform" />
              <span className="text-green-600 font-semibold">Back to Home</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div 
              className="inline-flex items-center space-x-2 px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
              />
              <span>Series A Investment Round Open</span>
            </motion.div>

            <motion.h1 
              className="text-7xl md:text-8xl font-bold text-white mb-8 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Revolutionizing
              <motion.span 
                className="block text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Food Industry
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Join us in building the future of sustainable food technology, 
              where innovation meets responsibility.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <motion.button
                className="group relative overflow-hidden bg-white px-8 py-4 rounded-full text-green-600 font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
                whileHover={{ x: 5 }}
              >
                <span className="relative z-10">View Pitch Deck</span>
                <ArrowRight className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                className="group relative overflow-hidden px-8 py-4 rounded-full text-white font-semibold border-2 border-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                whileHover={{ x: 5 }}
              >
                <span className="relative z-10">Watch Demo</span>
                <Play className="relative z-10 w-5 h-5 transform group-hover:scale-110 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Key Metrics Section */}
      <section className="py-20 bg-white" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Growth Story
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Witness our exponential growth and market impact through key performance indicators
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Globe2,
                value: 5,
                label: 'Locations',
                suffix: '+',
                color: 'text-blue-600',
                bgColor: 'bg-blue-100',
              },
              {
                icon: Users,
                value: 100000,
                label: 'Active Users',
                suffix: '+',
                color: 'text-green-600',
                bgColor: 'bg-green-100',
              },
              {
                icon: Rocket,
                value: 35,
                label: 'Growth Rate',
                suffix: '%',
                color: 'text-purple-600',
                bgColor: 'bg-purple-100',
              },
              {
                icon: TrendingUp,
                value: 2000000,
                label: 'Annual Revenue',
                prefix: '€',
                color: 'text-amber-600',
                bgColor: 'bg-amber-100',
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`${stat.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.prefix}
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    decimal="."
                  />
                  {stat.suffix}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metric Charts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MetricChart
            title="Revenue Growth"
            icon={TrendingUp}
            data={revenueData}
            type="area"
            color={{
              main: '#34C759',
              secondary: '#666',
              light: 'bg-green-100',
              text: 'text-green-600',
              gradient: {
                from: '#34C759',
                to: '#66D37E',
              },
            }}
            description="Our revenue growth over the past year"
          />
          <MetricChart
            title="Customer Acquisition"
            icon={Users}
            data={revenueData}
            type="line"
            color={{
              main: '#8B5CF6',
              secondary: '#666',
              light: 'bg-purple-100',
              text: 'text-purple-600',
              gradient: {
                from: '#8B5CF6',
                to: '#A78BFA',
              },
            }}
            description="Our customer acquisition over the past year"
          />
          <MetricChart
            title="Market Impact"
            icon={Globe2}
            data={marketData}
            type="bar"
            color={{
              main: '#F97316',
              secondary: '#666',
              light: 'bg-amber-100',
              text: 'text-amber-600',
              gradient: {
                from: '#F97316',
                to: '#FFA07A',
              },
            }}
            description="Our market impact over the past year"
          />
        </div>
      </section>

      {/* Market Opportunity Section */}
      <motion.section 
        ref={metricsRef}
        className="relative py-32 bg-white"
      >
        {/* Background Elements */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,150,0.05)_0%,rgba(0,0,0,0)_50%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={metricsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Market Opportunity
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={metricsInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              The sustainable food industry is experiencing unprecedented growth, 
              creating a massive opportunity for early investors.
            </motion.p>
          </motion.div>

          {/* Market Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Revenue Growth Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={metricsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-50"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Revenue Growth</h3>
                    <p className="text-gray-600">Monthly revenue progression</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 font-semibold">+127%</span>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis 
                        stroke="#666"
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                        formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Revenue']}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#22C55E"
                        fill="url(#colorRevenue)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Market Size Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={metricsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Market Size</h3>
                    <p className="text-gray-600">Projected market growth (in billions)</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 font-semibold">5x Growth</span>
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketData}>
                      <defs>
                        <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.4}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" stroke="#666" />
                      <YAxis 
                        stroke="#666"
                        tickFormatter={(value) => `$${value}B`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                        formatter={(value) => [`$${value}B`, 'Market Size']}
                      />
                      <Bar
                        dataKey="value"
                        fill="url(#colorMarket)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Key Market Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Global Reach",
                description: "Access to international markets with established distribution networks",
                icon: Globe2,
                color: "from-blue-400 to-blue-600"
              },
              {
                title: "Sustainable Growth",
                description: "Environmentally conscious practices driving long-term value",
                icon: Leaf,
                color: "from-green-400 to-green-600"
              },
              {
                title: "Innovation Leader",
                description: "Cutting-edge technology and proprietary solutions",
                icon: Rocket,
                color: "from-purple-400 to-purple-600"
              }
            ].map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={metricsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative p-8 flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${insight.color} flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300`}>
                    <insight.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{insight.title}</h3>
                  <p className="text-gray-600">{insight.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Investment Highlights */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Elements */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05)_0%,rgba(0,0,0,0)_50%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span 
              className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Invest Now
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Investment Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us in revolutionizing the food industry with cutting-edge technology 
              and sustainable practices
            </p>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Proprietary Technology",
                description: "Advanced AI-driven food preparation and delivery systems",
                icon: Rocket,
                stats: ["45% Cost Reduction", "99.9% Order Accuracy"],
                color: "blue"
              },
              {
                title: "Market Leadership",
                description: "First-mover advantage in sustainable food service",
                icon: Award,
                stats: ["#1 in Customer Satisfaction", "127% YoY Growth"],
                color: "green"
              },
              {
                title: "Scalable Model",
                description: "Proven business model ready for rapid expansion",
                icon: Target,
                stats: ["15 Cities", "50K+ Monthly Orders"],
                color: "purple"
              },
              {
                title: "Sustainable Impact",
                description: "Leading the charge in eco-friendly food service",
                icon: Leaf,
                stats: ["75% Less Food Waste", "100% Recyclable Packaging"],
                color: "emerald"
              },
              {
                title: "Strong Unit Economics",
                description: "Industry-leading margins and operational efficiency",
                icon: DollarSign,
                stats: ["42% Gross Margin", "18-Month Payback Period"],
                color: "indigo"
              },
              {
                title: "Strategic Partnerships",
                description: "Collaborations with leading brands and suppliers",
                icon: Users,
                stats: ["25+ Partners", "€10M+ in Joint Ventures"],
                color: "pink"
              }
            ].map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${highlight.color}-50 to-white opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Animated Border */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r from-${highlight.color}-400 via-${highlight.color}-500 to-${highlight.color}-600`}
                  style={{
                    height: '2px',
                    top: 'auto',
                    opacity: 0.7,
                  }}
                  animate={{
                    translateX: ['0%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                <div className="relative p-8">
                  <div className={`w-14 h-14 rounded-xl bg-${highlight.color}-100 flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    <highlight.icon className={`w-7 h-7 text-${highlight.color}-600`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {highlight.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {highlight.description}
                  </p>

                  <div className="space-y-3">
                    {highlight.stats.map((stat, statIndex) => (
                      <motion.div
                        key={statIndex}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + statIndex * 0.1 }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-${highlight.color}-400`} />
                        <span className="text-sm font-medium text-gray-700">{stat}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <motion.button
              className="group relative overflow-hidden inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <span className="relative">Download Investor Deck</span>
              <ArrowRight className="relative w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-green-900">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(59,130,246,0.3) 0%, transparent 50%, rgba(16,185,129,0.3) 100%)',
              backgroundSize: '200% 200%',
            }}
          />
          <div className="absolute inset-0 backdrop-blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <motion.span
              className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Shape the Future?
            </h2>
            <p className="text-xl text-white/90">
              Join us in revolutionizing the food industry. Our team is ready to discuss 
              this unique investment opportunity with you.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-10">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label className="block text-white text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                      placeholder="John"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label className="block text-white text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                      placeholder="Doe"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-white text-sm font-medium mb-2">
                    Investment Range
                  </label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300">
                    <option value="" className="bg-gray-900">Select Range</option>
                    <option value="50k-250k" className="bg-gray-900">€50,000 - €250,000</option>
                    <option value="250k-1m" className="bg-gray-900">€250,000 - €1,000,000</option>
                    <option value="1m-5m" className="bg-gray-900">€1,000,000 - €5,000,000</option>
                    <option value="5m+" className="bg-gray-900">€5,000,000+</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label className="block text-white text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                    placeholder="Tell us about your investment interests..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex justify-end"
                >
                  <motion.button
                    type="submit"
                    className="group relative overflow-hidden inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:text-blue-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-100/0 via-blue-100/30 to-blue-100/0"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    <span className="relative">Submit Inquiry</span>
                    <ArrowRight className="relative w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {[
              {
                title: "Email",
                value: "investors@freshking.com",
                description: "Direct line to our investment team"
              },
              {
                title: "Phone",
                value: "+1 (555) 123-4567",
                description: "Available during business hours"
              },
              {
                title: "Location",
                value: "Frankfurt, Germany",
                description: "Global headquarters"
              }
            ].map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-white"
              >
                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                <p className="text-xl font-bold mb-1">{info.value}</p>
                <p className="text-white/70 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/pattern.svg')] bg-repeat opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Shape the Future?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              Join us in revolutionizing the food industry. Connect with our investment relations team to learn more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.a
                href="mailto:investors@freshking.com"
                className="group bg-white px-8 py-4 rounded-full text-green-600 font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
                whileHover={{ x: 5 }}
              >
                <span>Contact IR Team</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#"
                className="group px-8 py-4 rounded-full text-white font-semibold border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                whileHover={{ x: 5 }}
              >
                <span>Download Investor Deck</span>
                <PieChart className="w-5 h-5 transform group-hover:rotate-12 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Create a reusable chart component for better organization
function MetricChart({ title, icon: Icon, data, type, color, description }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 ${color.light} rounded-lg`}>
          <Icon className={`w-6 h-6 ${color.text}`} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' && (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color.gradient.from} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={color.gradient.to} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color.main}
                fill={`url(#color${title})`}
                strokeWidth={2}
              />
            </AreaChart>
          )}
          {type === 'line' && (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color.main}
                strokeWidth={2}
                dot={{ stroke: color.main, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color.main, strokeWidth: 2 }}
              />
            </LineChart>
          )}
          {type === 'bar' && (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar
                dataKey="value"
                fill={color.main}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
