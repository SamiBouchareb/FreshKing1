import { useRef } from 'react';
import React from 'react';
import { Heart, Clock, MapPin, Star } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import '../../styles/storyAnimations.css';
import { Founders } from './Founders'; // Assuming Founders component is in the same directory
import CustomerReviews from './CustomerReviews';

interface OurStoryProps {
  id: string;
}

export function OurStory({ id }: OurStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useScrollProgress(sectionRef);

  return (
    <section 
      id={id}
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-white"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/20 via-transparent to-white/30" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-50/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-green-50/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left column - Story text */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-7xl font-bold text-green-600 leading-tight">
                Our Story
              </h2>
              <div className="relative h-1.5 w-[400px] overflow-hidden">
                <div 
                  className="absolute h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-transform duration-300"
                  style={{
                    width: '100%',
                    transform: `translateX(${-100 + (scrollProgress * 100)}%)`
                  }}
                />
              </div>
            </div>
            
            <div className="space-y-8">
              <p className="text-xl text-gray-900 leading-relaxed">
                Born in the vibrant heart of Hamburg, Dago emerged from a shared 
                vision of five passionate individuals who believed that fast food could 
                be both nutritious and delicious.
              </p>
              <p className="text-xl text-gray-900 leading-relaxed">
                In 2024, what started as late-night conversations about 
                revolutionizing the food industry has transformed into Hamburg's 
                most promising healthy fast food chain.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="relative bg-white/90 rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 border-2 border-gray-200 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-[rgba(17,_17,_26,_0.2)_0px_8px_24px,_rgba(17,_17,_26,_0.1)_0px_16px_56px]">
                <p className="text-5xl font-bold text-green-600 mb-2">15+</p>
                <p className="text-lg text-gray-600">Locations</p>
              </div>
              <div className="relative bg-white/90 rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 border-2 border-gray-200 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-[rgba(17,_17,_26,_0.2)_0px_8px_24px,_rgba(17,_17,_26,_0.1)_0px_16px_56px]">
                <p className="text-5xl font-bold text-green-600 mb-2">50k+</p>
                <p className="text-lg text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="relative">
            <div className="story-image-wrapper rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
                alt="Our Story"
                className="w-full h-full object-cover aspect-[4/3]"
              />
              {/* Founded badge */}
              <div className="absolute left-8 bottom-8 bg-green-800/90 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                <p className="text-sm font-medium uppercase tracking-wider">Founded in Hamburg</p>
                <p className="text-3xl font-bold">2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-32">
          <div className="text-center space-y-4 mb-16">
            <h3 className="text-4xl font-bold text-gray-900">
              Our Core Values
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide us in delivering exceptional healthy fast food
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Health First',
                description: 'Nutritious meals that fuel your lifestyle'
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: 'Quality Ingredients',
                description: 'Fresh, locally-sourced produce'
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Fast Service',
                description: 'Quick preparation without compromising quality'
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: 'Local Impact',
                description: "Supporting Hamburg's local community"
              }
            ].map((value, index) => (
              <div
                key={index}
                className="relative bg-white/90 rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 border-2 border-gray-200 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-[rgba(17,_17,_26,_0.2)_0px_8px_24px,_rgba(17,_17,_26,_0.1)_0px_16px_56px]"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-6">
                  {React.cloneElement(value.icon, { className: 'w-8 h-8 text-green-600' })}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-32">
          <CustomerReviews />
        </div>

        {/* Founders Section */}
        <div className="mt-32">
          <Founders />
        </div>
      </div>
    </section>
  );
}
