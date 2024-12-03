import { Leaf, Car, Users, Heart, Globe, Sprout, ShieldCheck, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface OurMissionProps {
  id: string;
}

export function OurMission({ id }: OurMissionProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const scaleIn = {
    initial: { scale: 0.95, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <section id={id} className="relative w-full bg-[#FCFCFC] py-32">
      {/* Subtle Dot Pattern Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30"/>
      </div>

      <div className="relative w-[90%] max-w-[1400px] mx-auto">
        {/* Header Section with Enhanced Typography */}
        <motion.div 
          className="text-center mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="h-px w-8 bg-green-600 rounded-full"/>
            <span className="text-green-600 font-medium tracking-wider uppercase text-sm">Our Purpose</span>
            <span className="h-px w-8 bg-green-600 rounded-full"/>
          </motion.div>
          
          <h2 className="text-6xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">
            Our Mission & <span className="text-green-600">Impact</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Revolutionizing fast food in Hamburg through sustainable practices, community engagement, 
            and unwavering commitment to health and quality.
          </p>
        </motion.div>

        {/* Statistics Cards with Refined Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {[
            { 
              number: '100%', 
              title: 'Eco-Friendly Packaging', 
              desc: 'All our packaging is biodegradable',
              icon: Globe
            },
            { 
              number: '80%', 
              title: 'Local Ingredients', 
              desc: 'Sourced from Hamburg region',
              icon: Sprout
            },
            { 
              number: '2.5T', 
              title: 'Food Saved Monthly', 
              desc: 'Through our zero-waste initiative',
              icon: Leaf
            }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              {...fadeInUp}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative bg-white p-10 rounded-2xl border border-gray-100 hover:border-green-200 transition-all duration-500">
                <div className="absolute -top-5 right-8">
                  <div className="bg-green-600/10 p-4 rounded-2xl group-hover:bg-green-600/20 transition-colors duration-300">
                    <stat.icon className="w-6 h-6 text-green-600"/>
                  </div>
                </div>
                <div>
                  <motion.h3 
                    className="text-5xl font-bold text-gray-900 mb-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {stat.number}
                  </motion.h3>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{stat.title}</h4>
                  <p className="text-gray-600 text-sm">{stat.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Grid with Enhanced Visual Hierarchy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          {/* Environmental Impact */}
          <motion.div 
            className="space-y-8"
            {...scaleIn}
          >
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-3xl font-bold text-gray-900 border-l-4 border-green-600 pl-4">
                Environmental Impact
              </h3>
            </div>
            <div className="space-y-8">
              {[
                { 
                  icon: Leaf, 
                  title: 'Sustainable Sourcing', 
                  desc: 'Direct partnerships with organic farms, reducing transportation emissions and supporting local agriculture.'
                },
                { 
                  icon: Car, 
                  title: 'Green Delivery', 
                  desc: 'Electric vehicle fleet for deliveries, minimizing our carbon footprint in urban areas.'
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="relative flex items-start gap-6 p-8 rounded-2xl bg-white border border-gray-100 hover:border-green-200 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="p-4 bg-green-600/10 rounded-xl group-hover:bg-green-600/20 transition-colors duration-300">
                        <item.icon className="w-6 h-6 text-green-600"/>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Community Impact */}
          <motion.div 
            className="space-y-8"
            {...scaleIn}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-3xl font-bold text-gray-900 border-l-4 border-green-600 pl-4">
                Community Impact
              </h3>
            </div>
            <div className="space-y-8">
              {[
                { 
                  icon: Users, 
                  title: 'Local Employment', 
                  desc: 'Creating over 50 jobs in Hamburg, with focus on youth employment and career development.'
                },
                { 
                  icon: Heart, 
                  title: 'Community Programs', 
                  desc: 'Weekly food education workshops and partnerships with local schools to promote healthy eating habits.'
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="relative flex items-start gap-6 p-8 rounded-2xl bg-white border border-gray-100 hover:border-green-200 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="p-4 bg-green-600/10 rounded-xl group-hover:bg-green-600/20 transition-colors duration-300">
                        <item.icon className="w-6 h-6 text-green-600"/>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 2024 Commitments with Modern Card Design */}
        <motion.div 
          className="relative"
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center space-x-2 mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="h-px w-8 bg-green-600 rounded-full"/>
              <span className="text-green-600 font-medium tracking-wider uppercase text-sm">Looking Forward</span>
              <span className="h-px w-8 bg-green-600 rounded-full"/>
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our 2024 Commitments
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              We're setting ambitious goals for a more sustainable and healthier future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: 'Carbon Neutral',
                desc: 'Achieve complete carbon neutrality in all operations',
                target: '2024 Q2'
              },
              {
                icon: Sprout,
                title: 'Local Sourcing',
                desc: 'Increase local ingredient sourcing to 90%',
                target: '2024 Q3'
              },
              {
                icon: ShieldCheck,
                title: 'Zero Waste',
                desc: 'Implement complete zero-waste program in all locations',
                target: '2024 Q4'
              },
              {
                icon: Heart,
                title: 'Community Impact',
                desc: 'Launch youth culinary education program',
                target: '2024 Q1'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-green-200 transition-all duration-500"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="relative">
                  <div className="mb-6">
                    <div className="inline-block p-4 bg-green-600/10 rounded-xl group-hover:bg-green-600/20 transition-colors duration-300">
                      <item.icon className="w-6 h-6 text-green-600"/>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                  <div className="inline-flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-600"/>
                    <span className="text-sm font-medium text-green-600">
                      Target: {item.target}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
