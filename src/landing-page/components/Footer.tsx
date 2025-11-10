import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-deep-indigo text-shell-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M50 80 Q 45 60, 50 40 Q 48 35, 42 30 M50 40 Q 52 35, 58 30 M50 40 Q 50 30, 50 20"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-6">
            <div>
              <h3 className="font-playfair text-3xl tracking-widest text-antique-gold mb-2">
                PG Management
              </h3>
              <p className="text-sea-mist text-sm tracking-wide font-manrope">
                Casa Souza, Goa • Built 1881
              </p>
            </div>
            <p className="text-shell-white/80 font-manrope leading-relaxed text-sm">
              Where coastal heritage meets culinary artistry. Experience the timeless charm of a 19th-century Goan villa, preserved with love and served with pride.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="font-playfair text-xl text-antique-gold tracking-wide border-b border-antique-gold/30 pb-2">
              CONTACT
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-antique-gold mt-1 flex-shrink-0" />
                <p className="text-shell-white/80 font-manrope text-sm">
                  Casa Souza, Old Panjim Road<br />
                  Goa 403001, India
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-antique-gold flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-shell-white/80 hover:text-sea-mist transition-colors font-manrope text-sm"
                >
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-antique-gold flex-shrink-0" />
                <a
                  href="mailto:hello@PG Management.com"
                  className="text-shell-white/80 hover:text-sea-mist transition-colors font-manrope text-sm"
                >
                  hello@PG Management.com
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-playfair text-xl text-antique-gold tracking-wide border-b border-antique-gold/30 pb-2">
              HOURS
            </h4>
            <div className="space-y-3 font-manrope text-sm">
              <div className="flex justify-between">
                <span className="text-shell-white/60">Monday - Thursday</span>
                <span className="text-shell-white/80">12:00 - 22:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-shell-white/60">Friday - Sunday</span>
                <span className="text-shell-white/80">11:00 - 23:00</span>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-sea-mist text-xs italic font-manrope">
                Kitchen closes 30 minutes before closing time
              </p>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-antique-gold to-transparent mb-8 glow-divider" />

        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-shell-white/60 hover:text-antique-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="text-shell-white/60 hover:text-antique-gold transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="text-shell-white/60 hover:text-antique-gold transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-shell-white/60 text-sm font-manrope">
              © 2025 PG Management • Casa Souza
            </p>
            <p className="text-shell-white/40 text-xs font-manrope mt-1">
              Preserving heritage since 1881
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
