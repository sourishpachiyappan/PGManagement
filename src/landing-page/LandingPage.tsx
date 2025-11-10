import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, MapPin, Clock, Phone, Mail } from 'lucide-react';
import Hero from './components/Hero';
import Story from './components/Story';
import MenuSection from './components/MenuSection';
import SignatureDishes from './components/SignatureDishes';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Reservation from './components/Reservation';
import Footer from './components/Footer';

interface LandingPageProps {
  onGoToAuth: () => void;
}

function LandingPage({ onGoToAuth }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="relative bg-shell-white">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-deep-indigo/80 backdrop-blur-lg shadow-lg py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-palm-sway"
              >
                <path
                  d="M50 80 Q 45 60, 50 40 Q 48 35, 42 30 M50 40 Q 52 35, 58 30 M50 40 Q 50 30, 50 20"
                  stroke="#C8A45B"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-playfair text-2xl tracking-widest text-antique-gold">
                PG Management
              </h1>
              <p className="text-xs text-sea-mist tracking-wide">CASA SOUZA • 1881</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {['story', 'menu', 'gallery', 'testimonials', 'reserve'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-shell-white uppercase text-sm tracking-widest hover:text-sea-mist transition-colors duration-300 font-manrope"
              >
                {item}
              </button>
            ))}
            <button
              onClick={onGoToAuth}
              className="text-shell-white uppercase text-sm tracking-widest hover:text-sea-mist transition-colors duration-300 font-manrope"
            >
              Login
            </button>
          </div>

          <button
            className="md:hidden text-shell-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-deep-indigo/95 backdrop-blur-lg">
            <div className="flex flex-col space-y-4 p-6">
              {['story', 'menu', 'gallery', 'testimonials', 'reserve'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-shell-white uppercase text-sm tracking-widest hover:text-sea-mist transition-colors duration-300 text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <Hero onCTAClick={() => scrollToSection('menu')} />
      <Story />
      <MenuSection />
      <SignatureDishes />
      <Gallery />
      <Testimonials />
      <Reservation />
      <Footer />
    </div>
  );
}

export default LandingPage;
