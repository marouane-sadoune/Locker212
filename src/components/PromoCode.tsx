import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, X, Loader2 } from 'lucide-react';

interface PromoCodeProps {
  onApply: (discount: number, code: string) => void;
  onRemove: () => void;
  appliedCode?: string;
}

const validCodes: Record<string, { discount: number; description: string }> = {
  'WELCOME10': { discount: 10, description: '10% off your first booking' },
  'MEDINA20': { discount: 20, description: '20% off - Medina special' },
  'SUMMER15': { discount: 15, description: '15% summer discount' },
};

export const PromoCode: React.FC<PromoCodeProps> = ({ onApply, onRemove, appliedCode }) => {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    if (!code.trim()) return;
    
    setIsValidating(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const promo = validCodes[code.toUpperCase()];
    if (promo) {
      onApply(promo.discount, code.toUpperCase());
      setCode('');
    } else {
      setError('Invalid promo code');
    }
    
    setIsValidating(false);
  };

  if (appliedCode) {
    const promo = validCodes[appliedCode];
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-4 bg-success/10 border border-success/30"
      >
        <div className="flex items-center gap-3">
          <Tag size={16} className="text-success" />
          <div>
            <span className="text-success font-mono text-sm">{appliedCode}</span>
            <span className="text-text-secondary text-xs ml-2">-{promo.discount}% applied</span>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="text-text-muted hover:text-danger transition-colors p-1"
        >
          <X size={16} />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={code}
            onChange={e => {
              setCode(e.target.value.toUpperCase());
              setError('');
            }}
            placeholder="Enter promo code"
            className="input-standard w-full pl-10 text-xs uppercase tracking-widest"
          />
        </div>
        <button
          onClick={handleApply}
          disabled={isValidating || !code.trim()}
          className="btn-ghost px-4 py-3 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isValidating ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            'Apply'
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-danger text-xs flex items-center gap-1"
          >
            <X size={12} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Hint for demo */}
      <p className="text-[10px] text-text-muted italic">
        Try: WELCOME10, MEDINA20, or SUMMER15
      </p>
    </div>
  );
};
