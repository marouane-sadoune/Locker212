import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Clock } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: string;
  setActivePage: (page: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, activePage, setActivePage }) => {
  const handleNavigate = (page: string) => {
    setActivePage(page);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg-base/95 backdrop-blur-md z-[80]"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-bg-surface border-l border-accent-border z-[85] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-accent-border">
              <span className="text-accent font-sans font-medium text-[13px] tracking-[4px]">MENU</span>
              <button onClick={onClose} className="text-text-muted hover:text-accent transition-colors">
                <X size={24} />
              </button>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex-1 p-6">
              {['home', 'book', 'dashboard'].map((page, i) => (
                <motion.button
                  key={page}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleNavigate(page)}
                  className={`block w-full text-left py-4 font-serif text-3xl border-b border-accent-border/30 transition-colors ${
                    activePage === page ? 'text-accent' : 'text-text-primary hover:text-accent'
                  }`}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </motion.button>
              ))}
            </nav>
            
            {/* Footer Info */}
            <div className="p-6 border-t border-accent-border space-y-4">
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <MapPin size={16} className="text-accent" />
                <span>Marrakech Medina, Morocco</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <Clock size={16} className="text-accent" />
                <span>Open daily: 8AM - 10PM</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <Phone size={16} className="text-accent" />
                <span>+212 600 000 000</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

