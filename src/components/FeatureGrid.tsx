import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Clock, MapPin, MessageCircle, 
  CreditCard, Lock, Users, Smartphone 
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Insured Storage',
    description: 'All items covered up to 5,000 MAD with optional premium insurance'
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Open 8AM to 10PM daily, including weekends and holidays'
  },
  {
    icon: MapPin,
    title: 'Prime Location',
    description: '2 minutes from Jemaa el-Fnaa in the heart of the Medina'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    description: 'Instant booking confirmation and real-time support via WhatsApp'
  },
  {
    icon: CreditCard,
    title: 'Pay on Arrival',
    description: 'Cash, card, or mobile payment accepted — no prepayment required'
  },
  {
    icon: Lock,
    title: 'Secure Code',
    description: 'Unique booking code for contactless drop-off and collection'
  },
  {
    icon: Users,
    title: 'Friendly Staff',
    description: 'Multilingual team ready to assist with anything you need'
  },
  {
    icon: Smartphone,
    title: 'Access Anytime',
    description: 'Re-access your belongings during storage at no extra cost'
  }
];

export const FeatureGrid: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-bg-base">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-title block mb-6">WHY CHOOSE DROPVAULT</span>
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary">
            Everything you need for worry-free travel
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gold-border">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`p-8 hover:bg-bg-elevated transition-colors group ${
                i % 4 !== 3 ? 'lg:border-r lg:border-gold-border' : ''
              } ${
                i < 4 ? 'border-b border-gold-border' : ''
              }`}
            >
              <feature.icon 
                className="text-gold mb-4 group-hover:scale-110 transition-transform" 
                size={28} 
              />
              <h3 className="font-serif text-lg text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="font-sans font-light text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
