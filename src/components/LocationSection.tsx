import React from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export const LocationSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-bg-surface border-y border-gold-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Map / Visual */}
          <div className="relative">
            <div className="aspect-[4/3] bg-bg-base border border-gold-border relative overflow-hidden">
              {/* Stylized map background */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  {/* Grid lines */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <React.Fragment key={i}>
                      <line x1={i * 20} y1="0" x2={i * 20} y2="300" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" />
                      <line x1="0" y1={i * 15} x2="400" y2={i * 15} stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" />
                    </React.Fragment>
                  ))}
                  {/* Stylized streets */}
                  <path d="M0 150 L400 150" stroke="#C9A84C" strokeWidth="2" opacity="0.5" />
                  <path d="M200 0 L200 300" stroke="#C9A84C" strokeWidth="2" opacity="0.5" />
                  <path d="M50 100 L350 100" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
                  <path d="M50 200 L350 200" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
                  <path d="M100 50 L100 250" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
                  <path d="M300 50 L300 250" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
                </svg>
              </div>
              
              {/* Location marker */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative">
                  <div className="w-20 h-20 border-2 border-gold flex items-center justify-center bg-bg-base">
                    <MapPin className="text-gold w-8 h-8" />
                  </div>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 border-2 border-gold animate-ping opacity-30" />
                </div>
              </motion.div>

              {/* Landmark labels */}
              <div className="absolute top-8 left-8 text-[10px] text-gold/60 uppercase tracking-widest">
                Jemaa el-Fnaa
              </div>
              <div className="absolute bottom-8 right-8 text-[10px] text-gold/60 uppercase tracking-widest">
                Medina
              </div>
            </div>

            {/* Coordinates */}
            <div className="absolute -bottom-4 -right-4 bg-gold px-4 py-2">
              <span className="font-mono text-bg-base text-xs">31.6258° N, 7.9892° W</span>
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="section-title block mb-6">FIND US</span>
            <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-8 leading-tight">
              In the heart of<br />
              <span className="text-gold">Marrakech Medina</span>
            </h2>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-5 p-5 bg-bg-base border border-gold-border group hover:border-gold transition-colors">
                <MapPin className="text-gold flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-sans font-medium text-text-primary mb-1">Address</h4>
                  <p className="font-sans font-light text-text-secondary text-sm leading-relaxed">
                    42 Derb Sidi Bouloukat<br />
                    Near Café de France, Jemaa el-Fnaa<br />
                    Marrakech 40000, Morocco
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-5 bg-bg-base border border-gold-border group hover:border-gold transition-colors">
                <Clock className="text-gold flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-sans font-medium text-text-primary mb-1">Opening Hours</h4>
                  <p className="font-sans font-light text-text-secondary text-sm">
                    Every day: 8:00 AM – 10:00 PM<br />
                    <span className="text-gold">Including weekends & holidays</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 p-5 bg-bg-base border border-gold-border group hover:border-gold transition-colors">
                <Phone className="text-gold flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-sans font-medium text-text-primary mb-1">Contact</h4>
                  <p className="font-sans font-light text-text-secondary text-sm">
                    WhatsApp: +212 600 000 000<br />
                    Email: hello@dropvault.ma
                  </p>
                </div>
              </div>
            </div>

            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-3"
            >
              <Navigation size={16} />
              GET DIRECTIONS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
