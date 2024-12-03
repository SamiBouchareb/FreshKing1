import { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    highlight: "Waterfront Views"
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
    highlight: "Creative District"
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
    highlight: "Elegant Quarter"
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
    highlight: "Neighborhood Gem"
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
    highlight: "Trendy Location"
  }
];

export function Locations({ id }: LocationsProps) {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);

  return (
    <section id={id} className="relative py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#22c55e15_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Our Locations
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find your nearest FreshKing restaurant in Hamburg. Each location offers the same 
            exceptional quality and service in uniquely designed spaces.
          </p>
        </motion.div>

        {/* Opening Hours Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekdays</h3>
              <p className="text-gray-600">{OPENING_HOURS.weekdays}</p>
            </div>
            <div className="text-center border-t md:border-t-0 md:border-l md:border-r border-green-100 py-4 md:py-0 px-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Saturday</h3>
              <p className="text-gray-600">{OPENING_HOURS.saturday}</p>
            </div>
            <div className="text-center md:text-right border-t md:border-t-0 pt-4 md:pt-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sunday</h3>
              <p className="text-gray-600">{OPENING_HOURS.sunday}</p>
            </div>
          </div>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
              onClick={() => setSelectedLocation(selectedLocation === location.id ? null : location.id)}
              className="group cursor-pointer"
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                {/* Location Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 z-10" />
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Highlight Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full">
                    <p className="text-sm font-medium text-green-600">{location.highlight}</p>
                  </div>
                  {/* Location Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-20">
                    <h3 className="text-2xl font-bold text-white mb-1">{location.name}</h3>
                    <p className="text-white/90">{location.area}</p>
                  </div>
                </div>

                {/* Expandable Content */}
                <AnimatePresence>
                  {selectedLocation === location.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-green-100"
                    >
                      <div className="p-6 space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                          {location.description}
                        </p>
                        
                        {/* Address */}
                        <div className="flex items-start gap-3 text-gray-600">
                          <MapPin className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <p>{location.address}</p>
                            <p>{location.postal}</p>
                          </div>
                        </div>

                        {/* View More Button */}
                        <button className="w-full mt-4 group/button flex items-center justify-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors">
                          View Details
                          <ArrowRight className="w-4 h-4 transform transition-transform group-hover/button:translate-x-1" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover Indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-green-400 transform origin-left transition-transform duration-500 ${hoveredLocation === location.id ? 'scale-x-100' : 'scale-x-0'}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
