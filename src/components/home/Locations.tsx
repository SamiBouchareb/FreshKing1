import { useState, useEffect, useRef } from 'react';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface LocationsProps {
  id: string;
}

const OPENING_HOURS = {
  weekdays: "08:00 - 22:00",
  saturday: "09:00 - 22:00",
  sunday: "10:00 - 21:00"
};

const locations = [
  {
    id: 1,
    name: "HafenCity",
    fullName: "FreshKing HafenCity",
    address: "Überseeallee 10",
    area: "HafenCity",
    postal: "20457 Hamburg",
    description: "Our flagship store in Hamburg's modern harbor district, featuring waterfront views and outdoor seating.",
    hours: OPENING_HOURS,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
    highlight: "Waterfront Views",
    color: "#22c55e"
  },
  {
    id: 2,
    name: "Sternschanze",
    fullName: "FreshKing Sternschanze",
    address: "Schulterblatt 73",
    area: "Sternschanze",
    postal: "20357 Hamburg",
    description: "Located in Hamburg's vibrant cultural quarter, our Sternschanze location embraces the neighborhood's creative spirit.",
    hours: OPENING_HOURS,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop",
    highlight: "Creative District",
    color: "#3b82f6"
  },
  {
    id: 3,
    name: "Eppendorf",
    fullName: "FreshKing Eppendorf",
    address: "Eppendorfer Baum 27",
    area: "Eppendorf",
    postal: "20249 Hamburg",
    description: "Nestled in the elegant Eppendorf quarter, offering a refined dining experience in a sophisticated setting.",
    hours: OPENING_HOURS,
    image: "https://images.unsplash.com/photo-1564759298141-cef86f51d4d4?q=80&w=2070&auto=format&fit=crop",
    highlight: "Elegant Quarter",
    color: "#ec4899"
  },
  {
    id: 4,
    name: "Winterhude",
    fullName: "FreshKing Winterhude",
    address: "Mühlenkamp 39",
    area: "Winterhude",
    postal: "22303 Hamburg",
    description: "A cozy spot in the heart of Winterhude, perfect for both quick bites and leisurely meals.",
    hours: OPENING_HOURS,
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1974&auto=format&fit=crop",
    highlight: "Neighborhood Gem",
    color: "#f59e0b"
  },
  {
    id: 5,
    name: "Ottensen",
    fullName: "FreshKing Ottensen",
    address: "Ottenser Hauptstraße 3",
    area: "Ottensen",
    postal: "22765 Hamburg",
    description: "Our latest addition in trendy Ottensen, combining modern design with the area's historic charm.",
    hours: OPENING_HOURS,
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2070&auto=format&fit=crop",
    highlight: "Trendy Location",
    color: "#8b5cf6"
  }
];

const DreamParticle = ({ color }: { color: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  useEffect(() => {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 100;
    const duration = 3 + Math.random() * 2;
    
    const updatePosition = () => {
      const newX = Math.cos(angle) * radius;
      const newY = Math.sin(angle) * radius;
      x.set(newX);
      y.set(newY);
    };

    updatePosition();
    const interval = setInterval(() => {
      updatePosition();
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [x, y]);

  return (
    <motion.div
      style={{ 
        x, 
        y,
        backgroundColor: color 
      }}
      className="absolute w-1 h-1 rounded-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  );
};

const LocationCard = ({ location }: { location: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const scaleSpring = useSpring(scale, springConfig);
  const ySpring = useSpring(y, springConfig);
  const opacitySpring = useSpring(opacity, springConfig);

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale: scaleSpring,
        y: ySpring,
        opacity: opacitySpring
      }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div
        className="relative bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700"
        animate={{
          boxShadow: isHovered 
            ? `0 20px 40px ${location.color}33, 0 0 100px ${location.color}22`
            : "0 10px 30px rgba(0,0,0,0.1)"
        }}
      >
        {/* Dreamweaver Particles */}
        {isHovered && Array.from({ length: 10 }).map((_, i) => (
          <DreamParticle key={i} color={location.color} />
        ))}

        {/* Location Image with Morphing Overlay */}
        <div className="relative h-80 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b"
            style={{
              background: `linear-gradient(45deg, ${location.color}66, transparent)`
            }}
            animate={{
              opacity: isHovered ? 0.8 : 0.4,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.7 }}
          />
          <motion.img
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
              filter: isHovered ? "saturate(1.2)" : "saturate(1)"
            }}
            transition={{ duration: 0.7 }}
          />
          
          {/* Floating Badge */}
          <motion.div
            className="absolute top-6 right-6 backdrop-blur-md bg-white/20 px-4 py-2 rounded-full"
            animate={{
              y: isHovered ? -5 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: location.color }} />
              <span className="text-white font-medium">{location.highlight}</span>
            </div>
          </motion.div>

          {/* Location Info */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
            animate={{
              y: isHovered ? 0 : 10,
              opacity: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.h3
              className="text-3xl font-bold text-white mb-2"
              animate={{
                y: isHovered ? 0 : 10,
                scale: isHovered ? 1.1 : 1
              }}
            >
              {location.name}
            </motion.h3>
            <motion.p
              className="text-white/90 text-lg"
              animate={{
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0.7
              }}
            >
              {location.area}
            </motion.p>
          </motion.div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="border-t border-white/10"
            >
              <div className="p-8 space-y-6">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600 leading-relaxed text-lg"
                >
                  {location.description}
                </motion.p>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <MapPin className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: location.color }} />
                  <div>
                    <p className="text-gray-700 font-medium">{location.address}</p>
                    <p className="text-gray-500">{location.postal}</p>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="group w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${location.color}22, ${location.color}11)`
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span style={{ color: location.color }} className="font-medium">View Details</span>
                  <ArrowRight
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: location.color }}
                  />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export function Locations({ id }: LocationsProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id={id} className="relative py-32 min-h-screen flex items-center" ref={ref}>
      {/* Dreamweaver Background */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05)_0%,rgba(34,197,94,0)_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block"
          >
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Discover Our Locations
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Each FreshKing location is uniquely designed to blend with its neighborhood while
            maintaining our commitment to exceptional quality and service.
          </motion.p>
        </motion.div>

        {/* Opening Hours - Floating Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <motion.div
            className="relative bg-white/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl" />
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {Object.entries(OPENING_HOURS).map(([day, hours]) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-center md:border-x border-gray-200/20"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 capitalize">
                    {day}
                  </h3>
                  <p className="text-gray-600 text-lg">{hours}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map(location => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>

        {/* Survey Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5" />
            <iframe 
              className="w-full h-[600px] rounded-xl relative z-10"
              frameBorder="0"
              id="iframeX6D3A1V8A8F1F9Y6J"
              src="https://www.survio.com/survey/i/R3B9F9M0F3O7S4F7D"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
