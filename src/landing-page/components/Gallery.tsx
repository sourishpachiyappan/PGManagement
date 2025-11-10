import { useState, useEffect } from 'react';

const galleryItems = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'The Grand Entrance',
    year: '1881',
    orientation: 'portrait',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Palm-Shaded Courtyard',
    year: '2020 Restoration',
    orientation: 'landscape',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/6373296/pexels-photo-6373296.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Original Corridor',
    year: 'Preserved Since 1881',
    orientation: 'portrait',
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/2291599/pexels-photo-2291599.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'The Dining Hall',
    year: 'Restored 2019',
    orientation: 'landscape',
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/1449791/pexels-photo-1449791.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Heritage Tiles',
    year: 'Original 1881',
    orientation: 'portrait',
  },
  {
    id: 6,
    image: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Sunset View',
    year: 'Timeless',
    orientation: 'landscape',
  },
];

export default function Gallery() {
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
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.gallery-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" className="relative py-32 bg-shell-white overflow-hidden">
      <div className="absolute inset-0 paper-grain opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="h-px w-24 bg-antique-gold mx-auto mb-6" />
          <h2 className="font-playfair text-5xl md:text-6xl text-deep-indigo tracking-wide mb-4">
            HERITAGE & AMBIENCE
          </h2>
          <p className="text-ink-charcoal font-manrope tracking-wide">
            A glimpse into Casa Souza's storied past
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              data-id={item.id}
              className={`gallery-item relative group cursor-pointer transition-all duration-700 ${
                item.orientation === 'landscape' ? 'md:col-span-2' : ''
              } ${
                visibleItems.includes(item.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 parallax-tilt"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-indigo/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-playfair text-2xl text-shell-white mb-2 tracking-wide">
                    {item.caption}
                  </h3>
                  <p className="text-sea-mist text-sm font-manrope tracking-widest uppercase">
                    {item.year}
                  </p>
                </div>
              </div>

              <div className="absolute -inset-1 border-2 border-antique-gold/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
