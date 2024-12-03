import React from 'react';
import samiImage from '../../assets/images/founder.jpg';

interface Founder {
  name: string;
  role: string;
  description: string;
  image: string;
}

const founders: Founder[] = [
  {
    name: 'Louis',
    role: 'Co-Founder & CEO',
    description: 'Visionary leader driving FreshKing\'s mission to revolutionize fast food.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
  },
  {
    name: 'Nico',
    role: 'Co-Founder & COO',
    description: 'Operations expert ensuring seamless delivery of quality food.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
  },
  {
    name: 'Seid',
    role: 'Co-Founder & CTO',
    description: 'Tech innovator streamlining our digital ordering experience.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Elzan',
    role: 'Co-Founder & CMO',
    description: 'Creative mind behind our brand and marketing strategies.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop',
  },
  {
    name: 'Sami',
    role: 'Co-Founder & CFO',
    description: 'Financial strategist ensuring sustainable growth.',
    image: samiImage,
  },
];

export function Founders() {
  return (
    <section className="py-32 relative bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 w-40 h-40 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute right-0 bottom-20 w-60 h-60 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/3 w-40 h-40 bg-green-50 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative w-[95%] max-w-[2000px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <span className="text-green-600 font-semibold text-lg mb-4 block">Our Leadership</span>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Meet Our Founders
          </h2>
          <div className="w-24 h-1.5 bg-green-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Five visionaries who came together with a shared dream of transforming fast food into a force for health and sustainability.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center">
          {founders.map((founder) => (
            <div 
              key={founder.name}
              className="group relative w-full bg-white rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            >
              {/* Image Container */}
              <div className="aspect-[4/5] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6 bg-white relative">
                {/* Green accent line */}
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-green-500 transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {founder.name}
                </h3>
                <p className="text-green-600 font-medium text-lg mb-3">{founder.role}</p>
                <p className="text-gray-600 leading-relaxed text-sm">{founder.description}</p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
                <div className="absolute inset-0 bg-green-500/5 rotate-45"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-24 h-24 transform -translate-x-12 translate-y-12">
                <div className="absolute inset-0 bg-green-500/5 rotate-45"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
