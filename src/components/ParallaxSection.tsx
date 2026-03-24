import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  className = '',
  speed = 0.5 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

interface ParallaxTextProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right';
}

export const ParallaxText: React.FC<ParallaxTextProps> = ({ 
  children, 
  className = '',
  direction = 'left' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'left' ? ['0%', '-10%'] : ['0%', '10%']
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ x }}>
        {children}
      </motion.div>
    </div>
  );
};
