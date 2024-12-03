import { Button } from '../ui/Button';

interface HeroProps {
  id: string;
}

export function Hero({ id }: HeroProps) {
  return (
    <div id={id} className="relative min-h-screen flex items-center bg-fixed bg-cover bg-center" style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
    }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Fresh. Healthy. <span className="text-green-400">Fast.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Discover a new way of fast food. Healthy, sustainable, and delicious meals
          prepared with care for you and our planet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Order Now</Button>
          <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
            View Menu
          </Button>
        </div>
      </div>
    </div>
  );
}