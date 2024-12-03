import { Leaf, Award, Heart } from 'lucide-react';

export function Highlights() {
  const highlights = [
    {
      icon: <Leaf className="w-12 h-12 text-green-600" />,
      title: 'Fresh Ingredients',
      description: 'We source local, organic ingredients daily for maximum freshness and flavor.'
    },
    {
      icon: <Award className="w-12 h-12 text-green-600" />,
      title: 'Sustainable Practices',
      description: 'Committed to eco-friendly packaging and zero food waste policies.'
    },
    {
      icon: <Heart className="w-12 h-12 text-green-600" />,
      title: 'Healthy Choice',
      description: 'Nutritious meals that keep you energized throughout the day.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose FreshKing?</h2>
          <p className="mt-4 text-xl text-gray-600">
            We're revolutionizing fast food with health and sustainability in mind.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                {highlight.icon}
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {highlight.title}
                </h3>
                <p className="mt-4 text-gray-600">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}