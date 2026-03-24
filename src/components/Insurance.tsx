import React from 'react';
import { Shield, ShieldCheck, Check } from 'lucide-react';
import { clsx } from 'clsx';

interface InsuranceProps {
  selected: 'basic' | 'premium';
  onSelect: (type: 'basic' | 'premium') => void;
}

export const Insurance: React.FC<InsuranceProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Basic */}
      <div
        onClick={() => onSelect('basic')}
        className={clsx(
          "p-5 border cursor-pointer transition-all duration-200 relative",
          selected === 'basic' 
            ? "border-accent bg-accent-dim" 
            : "border-accent-border hover:bg-bg-elevated"
        )}
      >
        {selected === 'basic' && (
          <div className="absolute top-3 right-3">
            <Check size={16} className="text-accent" />
          </div>
        )}
        
        <div className="flex items-start gap-4">
          <Shield className="text-text-muted flex-shrink-0" size={24} />
          <div className="flex-grow">
            <div className="flex items-baseline justify-between mb-2">
              <h4 className="font-sans font-medium text-text-primary">Basic Coverage</h4>
              <span className="text-accent font-serif text-lg">FREE</span>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed mb-3">
              Standard premises liability coverage included with every booking.
            </p>
            <ul className="space-y-1 text-[11px] text-text-muted">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-text-muted" />
                Up to 5,000 MAD coverage
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-text-muted" />
                Theft & damage protection
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Premium */}
      <div
        onClick={() => onSelect('premium')}
        className={clsx(
          "p-5 border cursor-pointer transition-all duration-200 relative",
          selected === 'premium' 
            ? "border-accent bg-accent-dim" 
            : "border-accent-border hover:bg-bg-elevated"
        )}
      >
        {selected === 'premium' && (
          <div className="absolute top-3 right-3">
            <Check size={16} className="text-accent" />
          </div>
        )}

        {/* Recommended badge */}
        <div className="absolute -top-2.5 left-4 bg-accent px-2 py-0.5 text-[9px] text-bg-base uppercase tracking-widest">
          Recommended
        </div>
        
        <div className="flex items-start gap-4 pt-1">
          <ShieldCheck className="text-accent flex-shrink-0" size={24} />
          <div className="flex-grow">
            <div className="flex items-baseline justify-between mb-2">
              <h4 className="font-sans font-medium text-text-primary">Premium Insurance</h4>
              <span className="text-accent font-serif text-lg">+25 <span className="text-xs">MAD</span></span>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed mb-3">
              Extended protection for high-value items and electronics.
            </p>
            <ul className="space-y-1 text-[11px] text-text-muted">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-accent" />
                Up to 20,000 MAD coverage
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-accent" />
                Electronics & valuables included
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-accent" />
                24-hour claim processing
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

