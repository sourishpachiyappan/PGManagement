import { useState } from 'react';
import { Calendar, Clock, Users, Mail, Phone, User, CheckCircle } from 'lucide-react';

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="reserve" className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1449791/pexels-photo-1449791.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
        }}
      />
      <div className="absolute inset-0 bg-deep-indigo/60 backdrop-blur-sm" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="h-px w-24 bg-antique-gold mx-auto mb-6" />
          <h2 className="font-playfair text-5xl md:text-6xl text-shell-white tracking-wide mb-4">
            RESERVE YOUR TABLE
          </h2>
          <p className="text-sea-mist font-manrope tracking-wide">
            Join us for an unforgettable dining experience
          </p>
        </div>

        <div className="glass-frosted rounded-2xl p-8 md:p-12 shadow-2xl">
          {isSubmitted ? (
            <div className="text-center py-12 animate-fade-in">
              <CheckCircle size={64} className="text-sea-mist mx-auto mb-6" />
              <h3 className="font-playfair text-3xl text-shell-white mb-4">
                Reservation Confirmed
              </h3>
              <p className="text-sea-mist font-manrope">
                Thank you! We look forward to welcoming you to Casa Souza.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-shell-white text-sm font-manrope tracking-wide flex items-center space-x-2">
                    <User size={16} className="text-antique-gold" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-shell-white text-sm font-manrope tracking-wide flex items-center space-x-2">
                    <Mail size={16} className="text-antique-gold" />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-shell-white text-sm font-manrope tracking-wide flex items-center space-x-2">
                    <Phone size={16} className="text-antique-gold" />
                    <span>Phone</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-shell-white text-sm font-manrope tracking-wide flex items-center space-x-2">
                    <Users size={16} className="text-antique-gold" />
                    <span>Number of Guests</span>
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-shell-white text-sm font-manrope tracking-wide flex items-center space-x-2">
                    <Calendar size={16} className="text-antique-gold" />
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-shell-white text-sm font-manrope tracking-wide flex items-center space-x-2">
                    <Clock size={16} className="text-antique-gold" />
                    <span>Time</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-shell-white text-sm font-manrope tracking-wide">
                  Special Requests
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="form-input resize-none"
                  placeholder="Any dietary restrictions or special occasions?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-deep-indigo border-2 border-antique-gold text-antique-gold py-4 rounded-full font-manrope tracking-widest uppercase hover:bg-antique-gold hover:text-deep-indigo transition-all duration-500 shimmer-border"
              >
                Confirm Reservation
              </button>

              <p className="text-sea-mist text-xs text-center font-manrope">
                For same-day reservations, please call us directly
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
