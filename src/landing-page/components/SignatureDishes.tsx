import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const signatureDishes = [
  {
    name: 'Recheado Mackerel',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh mackerel stuffed with spicy red masala',
  },
  {
    name: 'Xacuti',
    image: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Complex curry with roasted spices and coconut',
  },
  {
    name: 'Sorpotel',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Rich pork dish with liver and vinegar',
  },
  {
    name: 'Sanna',
    image: 'https://images.pexels.com/photos/6607226/pexels-photo-6607226.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fluffy rice cakes fermented with toddy',
  },
];

export default function SignatureDishes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % signatureDishes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsTyping(true);
    setDisplayText('');
    const text = signatureDishes[currentIndex].description;
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % signatureDishes.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + signatureDishes.length) % signatureDishes.length);
  };

  return (
    <section className="relative py-32 bg-deep-indigo overflow-hidden">
      <div className="absolute inset-0 tile-pattern opacity-5" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="h-px w-24 bg-antique-gold mx-auto mb-6" />
          <h2 className="font-playfair text-5xl md:text-6xl text-shell-white tracking-wide mb-4">
            SIGNATURE DISHES
          </h2>
          <p className="text-sea-mist font-manrope tracking-wide">
            Crafted with tradition, served with pride
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={goToPrev}
              className="text-antique-gold hover:text-sea-mist transition-colors p-2 hover:bg-shell-white/10 rounded-full"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="relative w-full max-w-4xl">
              <div className="flex overflow-hidden">
                {signatureDishes.map((dish, index) => (
                  <div
                    key={index}
                    className={`w-full flex-shrink-0 transition-all duration-700 ${
                      index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                  >
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-2xl gold-frame group">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-indigo via-transparent to-transparent opacity-60" />
                      <div className="absolute inset-0 coral-flare opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                        <h3 className="font-playfair text-4xl md:text-5xl text-shell-white mb-4 tracking-wide">
                          {dish.name}
                        </h3>
                        <p className="text-sea-mist font-manrope text-lg min-h-[2rem]">
                          {displayText}
                          {isTyping && <span className="animate-pulse">|</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={goToNext}
              className="text-antique-gold hover:text-sea-mist transition-colors p-2 hover:bg-shell-white/10 rounded-full"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          <div className="flex justify-center space-x-3 mt-8">
            {signatureDishes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-antique-gold w-8'
                    : 'bg-sea-mist/50 hover:bg-sea-mist'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
