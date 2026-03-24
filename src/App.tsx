import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Search, Plus, Minus, Check, MessageSquare, Download, Trash2,
  Menu, Briefcase, Shield, Star, ArrowRight, Share2, Printer,
  Copy, Calendar, Clock, User, Package, ChevronRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Components
import { ToastProvider, useToast } from './components/Toast';
import { Modal } from './components/Modal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollProgress, BackToTop } from './components/ScrollProgress';
import { MobileNav } from './components/MobileNav';
import { QRCode } from './components/QRCode';
import { CountUp } from './components/CountUp';
import { LockerDetailModal } from './components/LockerDetailModal';
import { FAQ } from './components/FAQ';
import { LocationSection } from './components/LocationSection';
import { Analytics } from './components/Analytics';
import { PromoCode } from './components/PromoCode';
import { Insurance } from './components/Insurance';
import { FeatureGrid } from './components/FeatureGrid';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type LockerStatus = 'FREE' | 'OCCUPIED' | 'RESERVED';
type LockerSize = 'SMALL' | 'STANDARD' | 'LARGE';

interface Booking {
  code: string;
  name: string;
  country: string;
  size: LockerSize;
  locker: string;
  date: string;
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED';
  whatsapp?: string;
}

interface Locker {
  id: string;
  status: LockerStatus;
}

// --- Components ---

const Navbar = ({ activePage, setActivePage }: { activePage: string, setActivePage: (p: string) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-accent-border",
        scrolled ? "bg-bg-base/90 backdrop-blur-md py-4" : "bg-transparent py-6"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="text-gold font-sans font-medium text-[13px] tracking-[4px] cursor-pointer hover:text-accent-light transition-colors"
            onClick={() => setActivePage('home')}
          >
            DROP VAULT
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {['home', 'book', 'dashboard'].map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={cn(
                  "font-sans font-light text-[12px] tracking-[1px] uppercase transition-colors relative",
                  activePage === page ? "text-gold" : "text-text-secondary hover:text-gold"
                )}
              >
                {page}
                {activePage === page && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-gold hover:text-accent-light transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </>
  );
};

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// Stagger animation wrapper
const StaggerContainer = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.1 } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Pages ---

const Home = ({ onBook }: { onBook: (size?: LockerSize) => void }) => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });

  return (
    <PageTransition>
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen pt-32 lg:pt-0 flex items-center relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(var(--color-gold) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="z-10"
          >
            <span className="section-title">LUGGAGE STORAGE · MOROCCO</span>
            <div className="w-10 h-[1px] bg-gold my-4" />
            <h1 className="heading-large mb-6">
              Leave your bags.<br />
              <span className="text-gold/80">Own your day.</span>
            </h1>
            <p className="font-sans font-light text-[16px] text-text-secondary leading-[1.8] max-w-md mb-8">
              Secure, flexible locker storage for travelers who refuse to be slowed down. 
              Drop off, explore, collect — all on your schedule.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary" 
                onClick={() => onBook()}
              >
                RESERVE NOW
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-ghost" 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                VIEW PRICING
              </motion.button>
            </div>

            {/* Quick trust indicators */}
            <div className="flex items-center gap-6 mt-10 pt-10 border-t border-accent-border/30">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-gold" />
                <span className="text-text-secondary text-xs">Insured Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-gold" fill="#F97316" />
                <span className="text-text-secondary text-xs">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-gold" />
                <span className="text-text-secondary text-xs">5000+ Bags Stored</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex flex-col items-end relative"
          >
            <div className="font-serif text-[220px] text-gold/5 leading-none absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none">
              24
            </div>
            <div className="space-y-0 w-full max-w-[300px] border-y border-accent-border bg-bg-surface/30 backdrop-blur-sm px-6">
              {[
                { icon: Briefcase, text: "24 Lockers available" },
                { icon: Package, text: "3 Sizes · S · M · L" },
                { icon: MessageSquare, text: "Instant WhatsApp confirmation" }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={cn("py-5 font-sans font-light text-text-secondary text-sm flex items-center gap-3", i < 2 && "border-b border-accent-border")}
                >
                  <item.icon size={16} className="text-gold" />
                  {item.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-text-muted uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-8 bg-gradient-to-b from-gold to-transparent"
          />
        </motion.div>
      </section>

      {/* Stats Strip */}
      <section className="bg-bg-surface border-y border-accent-border py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: 24, label: "Secure Lockers", suffix: "" },
            { val: 3, label: "Locker Sizes", suffix: "" },
            { val: 7, label: "Days a Week", suffix: "" },
            { val: 100, label: "Satisfaction", suffix: "%" }
          ].map((item, i) => (
            <div key={i} className={cn("text-center px-4", i !== 3 && "md:border-r md:border-accent-border")}>
              <div className="font-serif text-[42px] text-text-primary leading-tight">
                <CountUp end={item.val} suffix={item.suffix} />
              </div>
              <div className="section-title text-[9px] mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 lg:py-32 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-title block text-center mb-16">HOW IT WORKS</span>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-accent-border">
            {[
              { num: "01", title: "Choose your size", desc: "Pick from Small, Medium or Large depending on what you're carrying." },
              { num: "02", title: "Drop your bags", desc: "Hand over your bags and receive your unique locker code instantly." },
              { num: "03", title: "Explore the city", desc: "Come back anytime during opening hours to collect." }
            ].map((step, i) => (
              <StaggerItem key={i} className={cn("p-10 relative group hover:bg-bg-elevated transition-colors", i !== 2 && "md:border-r md:border-accent-border border-b md:border-b-0 border-accent-border")}>
                <div className="font-serif text-6xl text-gold/10 group-hover:text-gold/20 transition-colors mb-6">{step.num}</div>
                <h3 className="font-serif text-2xl text-text-primary mb-4">{step.title}</h3>
                <p className="font-sans font-light text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                {i < 2 && (
                  <ChevronRight className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 text-gold/30" size={24} />
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-32 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-title block text-center mb-4">LOCKER SIZES & PRICING</span>
          <p className="text-center text-text-secondary font-sans font-light mb-16 max-w-md mx-auto">
            Simple, transparent pricing with no hidden fees. Pay on arrival.
          </p>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Small */}
            <StaggerItem>
              <div className="border border-accent-border p-10 flex flex-col h-full bg-bg-base hover:bg-bg-elevated transition-colors group">
                <span className="section-title mb-2">SMALL</span>
                <p className="font-sans font-light text-text-secondary text-sm mb-8">Backpack · Handbag · Day bag</p>
                <div className="mb-8">
                  <span className="font-serif text-5xl text-text-primary">20</span>
                  <span className="font-sans font-light text-text-secondary ml-2 text-sm uppercase tracking-widest">MAD / day</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow font-sans font-light text-xs text-text-secondary">
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-gold" /> Up to 1 small bag</li>
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-gold" /> Max 24 hours</li>
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-gold" /> Secure code lock</li>
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-gold" /> Basic insurance included</li>
                </ul>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-ghost w-full group-hover:border-gold" 
                  onClick={() => onBook('SMALL')}
                >
                  RESERVE SMALL
                </motion.button>
              </div>
            </StaggerItem>

            {/* Standard */}
            <StaggerItem>
              <div className="border-2 border-gold relative p-10 flex flex-col h-full bg-bg-base hover:bg-bg-elevated transition-colors group">
                <div className="absolute top-0 right-0 bg-accent-dim text-gold text-[10px] px-3 py-1 font-sans font-medium uppercase tracking-widest">MOST REQUESTED</div>
                <span className="section-title mb-2">STANDARD</span>
                <p className="font-sans font-light text-text-secondary text-sm mb-8">Carry-on · Cabin luggage · Medium bag</p>
                <div className="mb-8">
                  <span className="font-serif text-5xl text-gold">35</span>
                  <span className="font-sans font-light text-text-secondary ml-2 text-sm uppercase tracking-widest">MAD / day</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow font-sans font-light text-xs text-text-secondary">
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-gold" /> Up to 1 medium suitcase</li>
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-gold" /> Max 24 hours</li>
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-gold" /> Secure code lock</li>
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-gold" /> Basic insurance included</li>
                </ul>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full" 
                  onClick={() => onBook('STANDARD')}
                >
                  RESERVE STANDARD
                </motion.button>
              </div>
            </StaggerItem>

            {/* Large */}
            <StaggerItem>
              <div className="border border-accent-border p-10 flex flex-col h-full bg-bg-base hover:bg-bg-elevated transition-colors group">
                <span className="section-title mb-2">LARGE</span>
                <p className="font-sans font-light text-text-secondary text-sm mb-8">Full-size luggage · Big backpack</p>
                <div className="mb-8">
                  <span className="font-serif text-5xl text-text-primary">50</span>
                  <span className="font-sans font-light text-text-secondary ml-2 text-sm uppercase tracking-widest">MAD / day</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow font-sans font-light text-xs text-text-secondary">
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-gold" /> Up to 1 large suitcase</li>
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-gold" /> Max 24 hours</li>
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-gold" /> Secure code lock</li>
                  <li className="flex items-center gap-3"><div className="w-1 h-1 bg-gold" /> Basic insurance included</li>
                </ul>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-ghost w-full group-hover:border-gold" 
                  onClick={() => onBook('LARGE')}
                >
                  RESERVE LARGE
                </motion.button>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Multi-day pricing note */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-text-secondary font-sans font-light text-sm">
              Need multi-day storage? <span className="text-gold">10% off</span> for 3+ days · <span className="text-gold">20% off</span> for 7+ days
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust / Reviews */}
      <section className="py-20 lg:py-32 bg-bg-base border-y border-accent-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-text-primary mb-4">Trusted by travelers from around the world</h2>
          <p className="text-center text-text-secondary font-sans font-light mb-16">Over 5,000 bags stored safely</p>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Sophie M.", country: "🇫🇷", quote: "Exactly what I needed between checkout and my flight.", rating: 5 },
              { name: "James W.", country: "🇬🇧", quote: "Super easy, the WhatsApp confirmation was instant.", rating: 5 },
              { name: "Carlos G.", country: "🇪🇸", quote: "Spent the whole afternoon in the medina without dragging my suitcase.", rating: 5 },
              { name: "Anna M.", country: "🇩🇪", quote: "Clean lockers, friendly service, great location.", rating: 5 },
              { name: "Tyler B.", country: "🇺🇸", quote: "Would definitely use again on my next trip to Morocco.", rating: 5 }
            ].map((review, i) => (
              <StaggerItem key={i}>
                <div className="border border-accent-border p-6 bg-bg-surface flex flex-col justify-between h-full hover:border-gold transition-colors">
                  <div>
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star key={j} size={12} className="text-gold" fill="#F97316" />
                      ))}
                    </div>
                    <p className="font-sans font-light text-sm text-text-secondary italic leading-relaxed">"{review.quote}"</p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-gold font-sans text-xs tracking-widest uppercase">{review.name}</span>
                    <span className="text-xl">{review.country}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Location Section */}
      <LocationSection />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-bg-surface border-t border-accent-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-title block mb-6">READY TO EXPLORE?</span>
            <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-6">
              Drop your bags.<br />
              <span className="text-gold">Own your adventure.</span>
            </h2>
            <p className="text-text-secondary font-sans font-light mb-10 max-w-md mx-auto">
              Book your secure locker in under 2 minutes. Receive instant WhatsApp confirmation.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-sm tracking-[3px] px-12 py-4"
              onClick={() => onBook()}
            >
              RESERVE YOUR LOCKER NOW
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-bg-base border-t border-accent-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-gold font-sans font-medium text-[13px] tracking-[4px] mb-4">DROP VAULT</div>
              <p className="text-text-secondary font-sans font-light text-sm leading-relaxed">
                Premium luggage storage in the heart of Marrakech. Leave your bags, own your day.
              </p>
            </div>
            <div>
              <h4 className="section-title mb-4">QUICK LINKS</h4>
              <ul className="space-y-2 text-text-secondary text-sm font-sans font-light">
                <li><a href="#" className="hover:text-gold transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Book Now</a></li>
                <li><a href="#pricing" className="hover:text-gold transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="section-title mb-4">CONTACT</h4>
              <ul className="space-y-2 text-text-secondary text-sm font-sans font-light">
                <li>WhatsApp: <span className="text-gold">+212 600 000 000</span></li>
                <li>Email: hello@dropvault.ma</li>
                <li>Marrakech Medina, Morocco</li>
              </ul>
            </div>
            <div>
              <h4 className="section-title mb-4">HOURS</h4>
              <ul className="space-y-2 text-text-secondary text-sm font-sans font-light">
                <li>Every day: 8AM - 10PM</li>
                <li>Including holidays</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-accent-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-text-muted font-sans font-light text-[10px] tracking-widest uppercase">
              © 2025 DropVault · All rights reserved
            </div>
            <div className="flex gap-6 text-text-muted text-xs">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-bg-base/95 backdrop-blur-md border-t border-accent-border z-40">
        <button className="btn-primary w-full" onClick={() => onBook()}>RESERVE NOW</button>
      </div>
    </PageTransition>
  );
};

const Book = ({ initialSize, onSuccess }: { initialSize?: LockerSize; onSuccess?: (booking: Booking) => void }) => {
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    size: initialSize || 'STANDARD' as LockerSize,
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    bags: 1,
    days: 1,
    notes: '',
    insurance: 'basic' as 'basic' | 'premium',
  });
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sizes = [
    { id: 'SMALL', name: 'SMALL', price: 20, desc: 'Backpack · Day bag' },
    { id: 'STANDARD', name: 'STANDARD', price: 35, desc: 'Carry-on · Medium' },
    { id: 'LARGE', name: 'LARGE', price: 50, desc: 'Large suitcase' },
  ];

  const basePrice = sizes.find(s => s.id === formData.size)?.price || 0;
  const daysMultiplier = formData.days >= 7 ? 0.8 : formData.days >= 3 ? 0.9 : 1;
  const insuranceCost = formData.insurance === 'premium' ? 25 : 0;
  const subtotal = (basePrice * formData.days * daysMultiplier) + insuranceCost;
  const discount = subtotal * (promoDiscount / 100);
  const total = Math.round(subtotal - discount);

  const generateCode = () => {
    const chars = '0123456789';
    let code = 'VLT-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const code = generateCode();
    setBookingCode(code);
    
    if (onSuccess) {
      onSuccess({
        code,
        name: formData.name,
        country: '🇲🇦',
        size: formData.size,
        locker: '#' + Math.floor(Math.random() * 24 + 1).toString().padStart(2, '0'),
        date: new Date(formData.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        status: 'PENDING',
        whatsapp: formData.whatsapp
      });
    }
    
    setIsSubmitting(false);
    setSubmitted(true);
    showToast('Booking confirmed successfully!', 'success');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(bookingCode);
    showToast('Code copied to clipboard', 'success');
  };

  const handlePrint = () => {
    window.print();
    showToast('Opening print dialog...', 'info');
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'DropVault Booking',
        text: `My DropVault booking code: ${bookingCode}`,
        url: window.location.href
      });
    } else {
      handleCopyCode();
    }
  };

  if (submitted) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8"
          >
            <div className="relative w-24 h-24 mb-6 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <motion.circle
                  cx="50" cy="50" r="45"
                  stroke="#F97316"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </svg>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold w-10 h-10" />
              </motion.div>
            </div>
            <h2 className="font-serif text-[42px] md:text-[48px] text-text-primary mb-4">Reservation confirmed.</h2>
            <p className="font-sans font-light text-text-secondary max-w-md mx-auto">
              Your locker is being prepared. Show the code below on arrival.
            </p>
          </motion.div>

          {/* Booking code with QR */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="border border-gold p-8 mb-8 bg-accent-dim/5 max-w-md w-full"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <QRCode value={bookingCode} size={100} />
              <div className="text-center md:text-left flex-grow">
                <div className="text-text-muted text-[10px] uppercase tracking-[4px] mb-2">Booking Code</div>
                <div className="font-mono text-[28px] md:text-[32px] text-gold tracking-[6px] uppercase mb-4">{bookingCode}</div>
                <div className="flex gap-2 justify-center md:justify-start">
                  <button onClick={handleCopyCode} className="p-2 border border-accent-border hover:border-gold transition-colors" title="Copy code">
                    <Copy size={16} className="text-gold" />
                  </button>
                  <button onClick={handlePrint} className="p-2 border border-accent-border hover:border-gold transition-colors" title="Print">
                    <Printer size={16} className="text-gold" />
                  </button>
                  <button onClick={handleShare} className="p-2 border border-accent-border hover:border-gold transition-colors" title="Share">
                    <Share2 size={16} className="text-gold" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking details summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="border border-accent-border p-6 mb-8 max-w-md w-full text-left"
          >
            <div className="section-title mb-4">BOOKING DETAILS</div>
            <div className="space-y-3 text-sm font-sans">
              <div className="flex justify-between">
                <span className="text-text-secondary">Guest</span>
                <span className="text-text-primary">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Size</span>
                <span className="text-text-primary">{formData.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Date</span>
                <span className="text-text-primary">{new Date(formData.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Duration</span>
                <span className="text-text-primary">{formData.days} day{formData.days > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-accent-border/30">
                <span className="text-gold">Total</span>
                <span className="text-gold font-serif text-lg">{total} MAD</span>
              </div>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-text-secondary font-sans font-light text-sm mb-10"
          >
            📱 A confirmation has been sent to your WhatsApp.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="btn-ghost" 
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                whatsapp: '',
                size: 'STANDARD',
                date: new Date().toISOString().split('T')[0],
                time: '10:00',
                bags: 1,
                days: 1,
                notes: '',
                insurance: 'basic',
              });
              setPromoDiscount(0);
              setPromoCode('');
            }}
          >
            MAKE ANOTHER RESERVATION
          </motion.button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-32 md:pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="font-sans font-light text-text-muted text-xs tracking-widest mb-4">Home / Book</div>
          <h1 className="font-serif text-4xl md:text-5xl text-text-primary mb-4">Make a Reservation</h1>
          <div className="w-[60px] h-[1px] bg-gold" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Step 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="section-title block mb-8">STEP 1 — YOUR DETAILS</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-text-secondary text-[10px] uppercase tracking-widest flex items-center gap-2">
                      <User size={12} className="text-gold" />
                      Full Name
                    </label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. John Doe" 
                      className="input-standard"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-text-secondary text-[10px] uppercase tracking-widest flex items-center gap-2">
                      <MessageSquare size={12} className="text-gold" />
                      WhatsApp Number
                    </label>
                    <input 
                      required
                      type="tel" 
                      placeholder="+212 6XX XXX XXX" 
                      className="input-standard"
                      value={formData.whatsapp}
                      onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                    />
                    <span className="text-[10px] text-text-muted mt-1 italic">We'll send your confirmation here</span>
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="section-title block mb-8">STEP 2 — CHOOSE YOUR SIZE</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sizes.map((size) => (
                    <motion.div 
                      key={size.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({...formData, size: size.id as LockerSize})}
                      className={cn(
                        "p-6 border cursor-pointer transition-all duration-300 relative group",
                        formData.size === size.id ? "border-gold bg-accent-dim" : "border-accent-border hover:bg-bg-elevated"
                      )}
                    >
                      {formData.size === size.id && <Check className="absolute top-4 right-4 text-gold w-4 h-4" />}
                      <div className="section-title text-[9px] mb-2">{size.name}</div>
                      <div className="font-serif text-2xl text-text-primary mb-1">{size.price} MAD</div>
                      <div className="font-sans font-light text-text-secondary text-[11px] leading-snug">{size.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="section-title block mb-8">STEP 3 — DROP-OFF DETAILS</span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-text-secondary text-[10px] uppercase tracking-widest flex items-center gap-2">
                      <Calendar size={12} className="text-gold" />
                      Drop-off date
                    </label>
                    <input 
                      type="date" 
                      className="input-standard" 
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-text-secondary text-[10px] uppercase tracking-widest flex items-center gap-2">
                      <Clock size={12} className="text-gold" />
                      Approx. Time
                    </label>
                    <input 
                      type="time" 
                      className="input-standard" 
                      value={formData.time}
                      onChange={e => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-text-secondary text-[10px] uppercase tracking-widest flex items-center gap-2">
                      <Package size={12} className="text-gold" />
                      Number of Bags
                    </label>
                    <div className="flex items-center border border-accent-border h-[46px]">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, bags: Math.max(1, formData.bags - 1)})}
                        className="w-12 h-full flex items-center justify-center hover:bg-accent-dim text-gold border-r border-accent-border transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <div className="flex-grow text-center font-sans text-sm">{formData.bags}</div>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, bags: Math.min(4, formData.bags + 1)})}
                        className="w-12 h-full flex items-center justify-center hover:bg-accent-dim text-gold border-l border-accent-border transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-text-secondary text-[10px] uppercase tracking-widest">Duration (Days)</label>
                    <div className="flex items-center border border-accent-border h-[46px]">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, days: Math.max(1, formData.days - 1)})}
                        className="w-12 h-full flex items-center justify-center hover:bg-accent-dim text-gold border-r border-accent-border transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <div className="flex-grow text-center font-sans text-sm">{formData.days}</div>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, days: Math.min(30, formData.days + 1)})}
                        className="w-12 h-full flex items-center justify-center hover:bg-accent-dim text-gold border-l border-accent-border transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    {formData.days >= 3 && (
                      <span className="text-[10px] text-success">{formData.days >= 7 ? '20%' : '10%'} multi-day discount applied!</span>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Step 4 - Insurance */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="section-title block mb-8">STEP 4 — INSURANCE</span>
                <Insurance 
                  selected={formData.insurance}
                  onSelect={(type) => setFormData({...formData, insurance: type})}
                />
              </motion.div>

              {/* Step 5 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="section-title block mb-8">STEP 5 — ADDITIONAL NOTES</span>
                <textarea 
                  rows={3}
                  placeholder="e.g. 2 suitcases and 1 backpack, arriving at 10am..."
                  className="input-standard w-full resize-none"
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                />
              </motion.div>

              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full py-5 text-sm tracking-[3px] disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-bg-base border-t-transparent rounded-full"
                    />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    CONFIRM RESERVATION
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="border-l-[3px] border-gold border border-accent-border p-8 bg-bg-surface/50">
              <span className="section-title block mb-6">RESERVATION SUMMARY</span>
              <div className="space-y-4 font-sans text-sm">
                <div className="flex justify-between items-center py-2 border-b border-accent-border/20">
                  <span className="text-text-secondary">Size</span>
                  <span className="text-text-primary uppercase tracking-widest text-[11px] font-medium">{formData.size}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-accent-border/20">
                  <span className="text-text-secondary">Bags</span>
                  <span className="text-text-primary">{formData.bags}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-accent-border/20">
                  <span className="text-text-secondary">Date</span>
                  <span className="text-text-primary">{new Date(formData.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-accent-border/20">
                  <span className="text-text-secondary">Duration</span>
                  <span className="text-text-primary">{formData.days} Day{formData.days > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-accent-border/20">
                  <span className="text-text-secondary">Insurance</span>
                  <span className="text-text-primary capitalize">{formData.insurance}</span>
                </div>
                
                {/* Promo Code */}
                <div className="pt-4">
                  <PromoCode
                    onApply={(discount, code) => {
                      setPromoDiscount(discount);
                      setPromoCode(code);
                      showToast(`Promo code applied: ${discount}% off!`, 'success');
                    }}
                    onRemove={() => {
                      setPromoDiscount(0);
                      setPromoCode('');
                      showToast('Promo code removed', 'info');
                    }}
                    appliedCode={promoCode}
                  />
                </div>

                {/* Pricing Breakdown */}
                <div className="pt-6 border-t border-accent-border/30 space-y-2">
                  <div className="flex justify-between text-text-secondary text-xs">
                    <span>Base ({basePrice} MAD × {formData.days} day{formData.days > 1 ? 's' : ''})</span>
                    <span>{basePrice * formData.days} MAD</span>
                  </div>
                  {daysMultiplier < 1 && (
                    <div className="flex justify-between text-success text-xs">
                      <span>Multi-day discount</span>
                      <span>-{Math.round((1 - daysMultiplier) * 100)}%</span>
                    </div>
                  )}
                  {formData.insurance === 'premium' && (
                    <div className="flex justify-between text-text-secondary text-xs">
                      <span>Premium Insurance</span>
                      <span>+25 MAD</span>
                    </div>
                  )}
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-success text-xs">
                      <span>Promo ({promoCode})</span>
                      <span>-{promoDiscount}%</span>
                    </div>
                  )}
                </div>
                
                <div className="pt-4 flex justify-between items-baseline border-t border-accent-border/30">
                  <span className="text-gold section-title">TOTAL</span>
                  <div className="text-right">
                    <span className="font-serif text-[32px] text-gold">{total}</span>
                    <span className="text-gold text-xs ml-1 font-sans">MAD</span>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-accent-border/30">
                  <p className="text-[11px] text-text-muted leading-relaxed italic">
                    * Payment is made on arrival in cash or via mobile payment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

const Dashboard = () => {
  const { showToast } = useToast();
  
  const [lockers, setLockers] = useState<Locker[]>(
    Array.from({ length: 24 }, (_, i) => ({
      id: (i + 1).toString().padStart(2, '0'),
      status: [3, 4, 7, 9, 15, 18, 21].includes(i + 1) ? 'OCCUPIED' : 
              [12, 16, 22].includes(i + 1) ? 'RESERVED' : 'FREE'
    }))
  );

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'PENDING' | 'COMPLETED'>('ALL');
  const [selectedLocker, setSelectedLocker] = useState<Locker | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([
    { code: 'VLT-8821', name: 'Sophie Martin', country: '🇫🇷', size: 'LARGE', locker: '#03', date: '24 Mar', status: 'ACTIVE' },
    { code: 'VLT-7432', name: 'James Wilson', country: '🇬🇧', size: 'STANDARD', locker: '#07', date: '24 Mar', status: 'ACTIVE' },
    { code: 'VLT-6190', name: 'Carlos García', country: '🇪🇸', size: 'SMALL', locker: '#12', date: '24 Mar', status: 'PENDING' },
    { code: 'VLT-5503', name: 'Anna Müller', country: '🇩🇪', size: 'STANDARD', locker: '#15', date: '23 Mar', status: 'COMPLETED' },
    { code: 'VLT-4871', name: 'Luca Romano', country: '🇮🇹', size: 'LARGE', locker: '#18', date: '23 Mar', status: 'ACTIVE' },
    { code: 'VLT-3349', name: 'Emma de Vries', country: '🇳🇱', size: 'SMALL', locker: '#09', date: '23 Mar', status: 'COMPLETED' },
    { code: 'VLT-2214', name: 'Kenji Tanaka', country: '🇯🇵', size: 'STANDARD', locker: '#21', date: '22 Mar', status: 'COMPLETED' },
    { code: 'VLT-1067', name: 'Tyler Brooks', country: '🇺🇸', size: 'LARGE', locker: '#04', date: '22 Mar', status: 'COMPLETED' },
  ]);

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.code.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'ALL' || b.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Status cycling is now handled via modal

  const handleLockerStatusChange = (newStatus: LockerStatus) => {
    if (selectedLocker) {
      setLockers(prev => prev.map(l => 
        l.id === selectedLocker.id ? { ...l, status: newStatus } : l
      ));
      setSelectedLocker({ ...selectedLocker, status: newStatus });
      showToast(`Locker #${selectedLocker.id} updated to ${newStatus}`, 'success');
    }
  };

  const metrics = {
    FREE: lockers.filter(l => l.status === 'FREE').length,
    OCCUPIED: lockers.filter(l => l.status === 'OCCUPIED').length,
    RESERVED: lockers.filter(l => l.status === 'RESERVED').length,
    TOTAL: 24
  };

  const handleExport = () => {
    const csv = [
      'Code,Guest Name,Size,Locker,Date,Status',
      ...bookings.map(b => `${b.code},${b.name},${b.size},${b.locker},${b.date},${b.status}`)
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dropvault-bookings.csv';
    a.click();
    showToast('Bookings exported successfully!', 'success');
  };

  const handleClearCompleted = () => {
    setBookings(prev => prev.filter(b => b.status !== 'COMPLETED'));
    showToast('Completed bookings cleared', 'success');
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <header className="flex flex-col md:flex-row justify-between items-baseline mb-8 pb-6 border-b border-accent-border gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="section-title">VAULT OVERVIEW</span>
            <h1 className="font-serif text-[36px] md:text-[42px] text-text-primary mt-2">Manager Dashboard</h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary font-sans font-light text-sm"
          >
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.div>
        </header>

        {/* Metrics Row */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {[
            { label: 'AVAILABLE', value: metrics.FREE, color: 'text-success', trend: '+2 since yesterday', icon: '↑' },
            { label: 'OCCUPIED', value: metrics.OCCUPIED, color: 'text-[#C47A7A]', trend: '+1 since yesterday', icon: '↑' },
            { label: 'RESERVED', value: metrics.RESERVED, color: 'text-gold', trend: '-1 since yesterday', icon: '↓' },
            { label: 'TOTAL', value: metrics.TOTAL, color: 'text-text-primary', trend: 'Capacity stable', icon: '—' }
          ].map((m, i) => (
            <StaggerItem key={i}>
              <div className="border border-accent-border p-6 md:p-8 bg-bg-surface/30 hover:bg-bg-elevated transition-colors">
                <div className="section-title text-[10px] text-text-secondary mb-4">{m.label}</div>
                <div className={cn("font-serif text-4xl md:text-5xl mb-2", m.color)}>
                  <CountUp end={m.value} duration={1} />
                </div>
                <div className="text-[10px] text-text-muted font-sans font-light uppercase tracking-wider flex items-center gap-1">
                  <span className={m.icon === '↑' ? 'text-success' : m.icon === '↓' ? 'text-danger' : ''}>{m.icon}</span>
                  {m.trend}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Analytics */}
        <Analytics />

        {/* Locker Map */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <span className="section-title">LOCKER MAP</span>
              <p className="text-text-muted text-[11px] font-sans font-light mt-1">Click any locker to view details and update status</p>
            </div>
            <div className="flex gap-6 font-sans text-[10px] tracking-widest text-text-secondary uppercase">
              <div className="flex items-center gap-2"><div className="w-2 h-2 bg-success" /> FREE</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 bg-danger" /> OCCUPIED</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 bg-gold" /> RESERVED</div>
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2 md:gap-3">
            {lockers.map((locker, i) => (
              <motion.div
                key={locker.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedLocker(locker)}
                className={cn(
                  "aspect-square p-2 md:p-3 border transition-all cursor-pointer flex flex-col justify-between",
                  locker.status === 'FREE' && "bg-success/15 border-success/40 text-success hover:bg-success/25",
                  locker.status === 'OCCUPIED' && "bg-danger/15 border-danger/40 text-[#C47A7A] hover:bg-danger/25",
                  locker.status === 'RESERVED' && "bg-gold/15 border-gold/40 text-gold hover:bg-gold/25",
                )}
              >
                <span className="font-sans font-medium text-[10px] md:text-[11px] opacity-70">{locker.id}</span>
                <span className="text-[8px] md:text-[9px] tracking-widest font-sans font-medium uppercase text-center">
                  {locker.status === 'FREE' ? 'FREE' : locker.status === 'OCCUPIED' ? 'IN USE' : 'HELD'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
            <span className="section-title">RECENT BOOKINGS</span>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="Search by name or code..."
                  className="input-standard pl-10 h-10 text-xs w-full md:w-64"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="flex border border-accent-border h-10 p-0.5">
                {['ALL', 'ACTIVE', 'PENDING', 'COMPLETED'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as typeof filter)}
                    className={cn(
                      "px-3 md:px-4 text-[9px] md:text-[10px] font-sans tracking-widest transition-colors",
                      filter === f ? "bg-gold text-bg-base" : "text-text-secondary hover:text-gold"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-accent-border">
                  <th className="py-4 text-[10px] uppercase tracking-[2px] text-text-muted font-medium">Code</th>
                  <th className="py-4 text-[10px] uppercase tracking-[2px] text-text-muted font-medium">Guest Name</th>
                  <th className="py-4 text-[10px] uppercase tracking-[2px] text-text-muted font-medium">Size</th>
                  <th className="py-4 text-[10px] uppercase tracking-[2px] text-text-muted font-medium">Locker</th>
                  <th className="py-4 text-[10px] uppercase tracking-[2px] text-text-muted font-medium">Date</th>
                  <th className="py-4 text-[10px] uppercase tracking-[2px] text-text-muted font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredBookings.map((b, i) => (
                    <motion.tr 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: i * 0.03 }}
                      key={b.code} 
                      onClick={() => setSelectedBooking(b)}
                      className="border-b border-white/5 hover:bg-bg-elevated transition-colors cursor-pointer"
                    >
                      <td className="py-4 md:py-5 text-[11px] font-mono text-gold/80">{b.code}</td>
                      <td className="py-4 md:py-5 text-[12px] md:text-[13px] font-light text-text-primary">
                        {b.name} <span className="ml-1 opacity-70">{b.country}</span>
                      </td>
                      <td className="py-4 md:py-5 text-[11px] text-text-secondary font-light tracking-widest uppercase">{b.size}</td>
                      <td className="py-4 md:py-5 text-[13px] text-text-primary">{b.locker}</td>
                      <td className="py-4 md:py-5 text-[13px] text-text-secondary font-light">{b.date}</td>
                      <td className={cn(
                        "py-4 md:py-5 text-[10px] font-medium tracking-widest uppercase",
                        b.status === 'ACTIVE' && "text-[#4A9C69]",
                        b.status === 'PENDING' && "text-gold",
                        b.status === 'COMPLETED' && "text-text-muted",
                      )}>
                        {b.status}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12 text-text-muted">
              <p>No bookings found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Download, title: 'EXPORT BOOKINGS', sub: 'Download as CSV', onClick: handleExport },
            { icon: MessageSquare, title: 'SEND WHATSAPP', sub: 'Message all active guests', onClick: () => showToast('WhatsApp integration coming soon', 'info') },
            { icon: Trash2, title: 'CLEAR COMPLETED', sub: 'Remove completed bookings', onClick: handleClearCompleted, danger: true },
          ].map((action, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="border border-accent-border p-6 bg-bg-surface/30 group cursor-pointer hover:bg-bg-elevated transition-all"
              onClick={action.onClick}
            >
              <div className="flex justify-between items-start mb-4">
                <action.icon size={20} className={cn(action.danger ? "text-danger" : "text-gold")} />
                <span className={cn(
                  "section-title border px-3 py-1 transition-colors",
                  action.danger ? "border-danger/30 text-danger group-hover:bg-danger/10" : "border-accent-border text-gold group-hover:bg-accent-dim"
                )}>
                  RUN
                </span>
              </div>
              <div className="section-title text-[10px]">{action.title}</div>
              <div className="text-[11px] text-text-muted mt-1">{action.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Locker Detail Modal */}
      <LockerDetailModal
        isOpen={!!selectedLocker}
        onClose={() => setSelectedLocker(null)}
        locker={selectedLocker}
        onStatusChange={handleLockerStatusChange}
      />

      {/* Booking Detail Modal */}
      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title={`Booking ${selectedBooking?.code}`}
        size="sm"
      >
        {selectedBooking && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-bg-elevated border border-accent-border/30">
              <div className="w-12 h-12 bg-accent-dim flex items-center justify-center text-2xl">
                {selectedBooking.country}
              </div>
              <div>
                <h4 className="font-serif text-xl text-text-primary">{selectedBooking.name}</h4>
                <p className="text-text-secondary text-sm">{selectedBooking.size} Locker · {selectedBooking.locker}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-bg-elevated border border-accent-border/30">
                <div className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Date</div>
                <div className="text-text-primary">{selectedBooking.date}</div>
              </div>
              <div className="p-4 bg-bg-elevated border border-accent-border/30">
                <div className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Status</div>
                <div className={cn(
                  "uppercase text-sm tracking-widest",
                  selectedBooking.status === 'ACTIVE' && "text-success",
                  selectedBooking.status === 'PENDING' && "text-gold",
                  selectedBooking.status === 'COMPLETED' && "text-text-muted",
                )}>
                  {selectedBooking.status}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                className="btn-ghost flex-1 py-3"
                onClick={() => {
                  showToast('WhatsApp message sent!', 'success');
                  setSelectedBooking(null);
                }}
              >
                <MessageSquare size={14} className="inline mr-2" />
                MESSAGE
              </button>
              <button 
                className="btn-primary flex-1 py-3"
                onClick={() => {
                  setBookings(prev => prev.map(b => 
                    b.code === selectedBooking.code ? { ...b, status: 'COMPLETED' } : b
                  ));
                  showToast('Booking marked as completed', 'success');
                  setSelectedBooking(null);
                }}
              >
                <Check size={14} className="inline mr-2" />
                COMPLETE
              </button>
            </div>
          </div>
        )}
      </Modal>
    </PageTransition>
  );
};

// --- App ---

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [selectedSize, setSelectedSize] = useState<LockerSize | undefined>();

  const handleBookingStart = (size?: LockerSize) => {
    setSelectedSize(size);
    setActivePage('book');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen bg-bg-base selection:bg-gold/30 selection:text-white">
      <ScrollProgress />
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main>
        <AnimatePresence mode="wait">
          {activePage === 'home' && <Home key="home" onBook={handleBookingStart} />}
          {activePage === 'book' && <Book key="book" initialSize={selectedSize} />}
          {activePage === 'dashboard' && <Dashboard key="dashboard" />}
        </AnimatePresence>
      </main>

      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
