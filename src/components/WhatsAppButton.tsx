import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  return (
    <motion.a
      href="https://wa.me/212600000000"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] flex items-center justify-center group"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" fill="white" />
      
      {/* Tooltip */}
      <div className="absolute left-full ml-3 px-3 py-2 bg-bg-surface border border-accent-border text-text-primary text-xs font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </div>
      
      {/* Pulse animation */}
      <div className="absolute inset-0 bg-[#25D366] animate-ping opacity-30" />
    </motion.a>
  );
};

