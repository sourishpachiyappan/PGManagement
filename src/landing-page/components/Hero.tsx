import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeroProps {
  onCTAClick: () => void;
}

export default function Hero({ onCTAClick }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.1)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-deep-indigo/60 via-transparent to-deep-indigo/80" />

      <div className="absolute inset-0 sunlight-gradient" />

      <div className="absolute inset-0 paper-grain opacity-20" />

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
        <div className="space-y-6 animate-fade-in-up">
          <div className="overflow-hidden">
            <h1 className="font-playfair text-6xl md:text-8xl text-shell-white tracking-widest mb-4 animate-slide-down">
              WELCOME TO
            </h1>
          </div>
          <div className="overflow-hidden">
            <h2 className="font-playfair text-7xl md:text-9xl text-antique-gold tracking-wider animate-slide-down animation-delay-200">
              PG Management
            </h2>
          </div>

          <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-antique-gold to-transparent my-8" />

          <p className="text-shell-white text-xl md:text-2xl tracking-widest font-manrope animate-fade-in animation-delay-400">
            Eat • Drink • Relax
          </p>
          <p className="text-sea-mist text-lg md:text-xl tracking-wider font-manrope animate-fade-in animation-delay-600">
            at Casa Souza
          </p>
          <p className="text-palm-driftwood text-sm md:text-base tracking-widest uppercase font-manrope animate-fade-in animation-delay-800">
            Built 1881 • Where time stands still
          </p>

          <button
            onClick={onCTAClick}
            className="group relative mt-12 px-10 py-4 border-2 border-antique-gold text-antique-gold rounded-full overflow-hidden transition-all duration-500 hover:text-deep-indigo animate-fade-in animation-delay-1000"
          >
            <span className="absolute inset-0 bg-antique-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ripple-effect" />
            <span className="relative flex items-center space-x-2 font-manrope tracking-widest uppercase text-sm">
              <span>View Our Menu</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="w-px h-16 bg-gradient-to-b from-antique-gold to-transparent" />
      </div>
    </section>
  );
}
