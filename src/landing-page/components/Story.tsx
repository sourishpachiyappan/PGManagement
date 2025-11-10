import { useEffect, useRef, useState } from 'react';

export default function Story() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="story" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-shell-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/6373296/pexels-photo-6373296.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          transform: `translateY(${scrollProgress * 100}px)`,
        }}
      />

      <div className="absolute inset-0 paper-grain opacity-30" />

      <div className="relative max-w-6xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            className="space-y-8"
            style={{
              transform: `translateX(${-50 + scrollProgress * 50}px)`,
              opacity: scrollProgress,
            }}
          >
            <div className="space-y-4">
              <div className="h-px w-24 bg-antique-gold" />
              <h2 className="font-playfair text-5xl md:text-6xl text-deep-indigo tracking-wide">
                CASA SOUZA
              </h2>
              <p className="text-clay-coral text-sm tracking-widest uppercase font-manrope">
                A Story Written in Sunlight
              </p>
            </div>

            <div className="space-y-6 text-ink-charcoal font-manrope leading-relaxed handwritten-accent">
              <p className="text-lg">
                In 1881, João Souza built this villa on the coast of Goa, where the sea met the sky and time moved slowly under the shade of palm trees.
              </p>
              <p>
                For generations, Casa Souza stood as a sanctuary—a place where families gathered, stories were shared over long meals, and the rhythm of life followed the tides.
              </p>
              <p>
                Today, we honor that legacy at PG management. Our kitchen breathes life into recipes passed down through time, our walls echo with laughter, and our courtyard still catches the same golden afternoon light that João first saw.
              </p>
              <p className="italic text-palm-driftwood border-l-2 border-antique-gold pl-6">
                "PG management" means peace, calm, contentment. It's not just what we serve—it's how we live.
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <div className="h-px flex-1 bg-gradient-to-r from-antique-gold to-transparent" />
              <span className="text-xs text-palm-driftwood tracking-widest font-manrope">EST. 1881</span>
            </div>
          </div>

          <div
            className="relative"
            style={{
              transform: `translateY(${50 - scrollProgress * 50}px)`,
              opacity: scrollProgress,
            }}
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Casa Souza Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-indigo/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-antique-gold rounded-lg -z-10" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-palm-driftwood to-transparent" />
    </section>
  );
}
