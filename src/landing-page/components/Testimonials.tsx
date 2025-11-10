import { useEffect, useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Maria Santos',
    location: 'Lisbon, Portugal',
    text: 'Stepping into Casa Souza felt like coming home to a place I had never been. The food, the atmosphere, the warmth—everything speaks of heritage and love.',
    rotation: 2,
  },
  {
    id: 2,
    name: 'Raj Patel',
    location: 'Mumbai, India',
    text: 'The most authentic Goan food I have had outside Goa. Every dish tells a story, and the villa itself is a living museum.',
    rotation: -1,
  },
  {
    id: 3,
    name: 'Emma Wilson',
    location: 'London, UK',
    text: 'I came for lunch and stayed until sunset. Time truly stands still here. The bebinca was heaven on a plate.',
    rotation: 1,
  },
  {
    id: 4,
    name: 'Carlos Fernandes',
    location: 'Goa, India',
    text: 'As a local, I am proud to see our heritage preserved so beautifully. PG Management captures the soul of old Goa.',
    rotation: -2,
  },
  {
    id: 5,
    name: 'Sophie Chen',
    location: 'Singapore',
    text: 'A hidden gem that exceeded all expectations. The architecture, the history, the cuisine—an unforgettable experience.',
    rotation: 1.5,
  },
  {
    id: 6,
    name: 'Thomas Anderson',
    location: 'New York, USA',
    text: 'I have traveled the world, but few places have moved me like Casa Souza. It is more than a restaurant—it is a journey through time.',
    rotation: -1.5,
  },
];

export default function Testimonials() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id') || '0');
            setVisibleCards((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.testimonial-card');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="relative py-32 bg-gradient-to-b from-shell-white to-palm-driftwood overflow-hidden">
      <div className="absolute inset-0 cork-board opacity-40" />
      <div className="absolute inset-0 palm-shadows animate-palm-shadow" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="h-px w-24 bg-antique-gold mx-auto mb-6" />
          <h2 className="font-playfair text-5xl md:text-6xl text-deep-indigo tracking-wide mb-4">
            GUEST STORIES
          </h2>
          <p className="text-ink-charcoal font-manrope tracking-wide">
            Words from those who have found peace at our table
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              data-id={testimonial.id}
              className={`testimonial-card transition-all duration-700 ${
                visibleCards.includes(testimonial.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
              style={{
                transform: visibleCards.includes(testimonial.id)
                  ? `rotate(${testimonial.rotation}deg)`
                  : `rotate(0deg)`,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="postcard group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-0">
                <div className="p-8 space-y-4">
                  <div className="text-4xl text-clay-coral opacity-50">"</div>
                  <p className="text-ink-charcoal font-handwritten text-lg leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="pt-4 border-t border-antique-gold/30">
                    <p className="font-playfair text-deep-indigo text-lg tracking-wide">
                      {testimonial.name}
                    </p>
                    <p className="text-palm-driftwood text-sm font-manrope tracking-wide">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8">
                  <div className="w-full h-full rounded-full bg-clay-coral/30 border-2 border-clay-coral/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-6 bg-clay-coral/50 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
