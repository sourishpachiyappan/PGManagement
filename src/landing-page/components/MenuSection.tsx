import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Goan Fish Curry',
    description: 'Fresh catch simmered in coconut, kokum, and spices. Served with steamed rice.',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Mains',
  },
  {
    id: 2,
    name: 'Prawn Balchão',
    description: 'Tangy-spicy prawn pickle with vinegar and Kashmiri chilies. A true Goan classic.',
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Mains',
  },
  {
    id: 3,
    name: 'Chicken Cafreal',
    description: 'Grilled chicken marinated in green masala with coriander, mint, and lime.',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Mains',
  },
  {
    id: 4,
    name: 'Pork Vindaloo',
    description: 'Slow-cooked pork in a fiery, tangy sauce with garlic and vinegar.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Mains',
  },
  {
    id: 5,
    name: 'Bebinca',
    description: 'Seven-layer Goan dessert made with coconut milk, eggs, and ghee.',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Desserts',
  },
  {
    id: 6,
    name: 'Sol Kadhi',
    description: 'Refreshing kokum and coconut drink, perfect for hot afternoons.',
    image: 'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Drinks',
  },
];

export default function MenuSection() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id') || '0');
            setVisibleItems((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.menu-polaroid');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="menu" className="relative py-32 bg-palm-driftwood overflow-hidden">
      <div className="absolute inset-0 paper-grain opacity-40" />
      <div className="absolute inset-0 cane-weave opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="h-px w-24 bg-antique-gold mx-auto mb-6" />
          <h2 className="font-playfair text-5xl md:text-6xl text-deep-indigo tracking-wide mb-4">
            OUR MENU
          </h2>
          <p className="text-ink-charcoal font-manrope tracking-wide">
            Recipes from the heart of Goa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              data-id={item.id}
              className={`menu-polaroid group cursor-pointer transition-all duration-700 ${
                visibleItems.includes(item.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="bg-white p-4 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rotate-1 hover:rotate-0">
                <div className="relative aspect-square overflow-hidden mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:blur-sm group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-deep-indigo/0 group-hover:bg-deep-indigo/30 transition-all duration-500 flex items-center justify-center">
                    <p className="font-playfair text-2xl text-antique-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center px-4">
                      {item.name}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-clay-coral tracking-widest uppercase font-manrope">
                    {item.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 bg-deep-indigo/90 backdrop-blur-lg z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-shell-white max-w-2xl w-full rounded-lg overflow-hidden shadow-2xl relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-deep-indigo hover:text-clay-coral transition-colors z-10 bg-shell-white rounded-full p-2"
            >
              <X size={24} />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="aspect-square">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center vintage-border">
                <p className="text-xs text-clay-coral tracking-widest uppercase font-manrope mb-2">
                  {selectedItem.category}
                </p>
                <h3 className="font-playfair text-3xl text-deep-indigo mb-4 tracking-wide">
                  {selectedItem.name}
                </h3>
                <p className="text-ink-charcoal font-manrope leading-relaxed">
                  {selectedItem.description}
                </p>
                <div className="mt-6 pt-6 border-t border-antique-gold/30">
                  <p className="text-xs text-palm-driftwood italic font-manrope">
                    Made fresh daily with locally sourced ingredients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
