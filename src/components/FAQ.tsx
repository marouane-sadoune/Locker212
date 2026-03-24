import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What are your opening hours?",
    answer: "We're open every day from 8:00 AM to 10:00 PM, including weekends and public holidays. Perfect for early birds catching flights or late explorers returning from a night out in the medina."
  },
  {
    question: "How does the locker code system work?",
    answer: "Once your booking is confirmed, you'll receive a unique 7-character code (e.g., VLT-8821) via WhatsApp. Simply show this code to our staff when dropping off and collecting your bags. Each code is single-use and expires after collection."
  },
  {
    question: "What if I need to store my bags for more than one day?",
    answer: "Multi-day storage is available! Simply select additional days during booking. Each additional day is charged at the same daily rate. For stays longer than 7 days, contact us on WhatsApp for special rates."
  },
  {
    question: "Is my luggage insured?",
    answer: "Yes, all stored items are covered under our premises liability insurance up to 5,000 MAD per bag. For high-value items, we recommend our Premium Insurance add-on which provides coverage up to 20,000 MAD."
  },
  {
    question: "Can I access my bags during storage?",
    answer: "Absolutely! You can access your belongings anytime during our opening hours at no extra charge. Just show your booking code to retrieve your items, and we'll re-store them when you're done."
  },
  {
    question: "What forms of payment do you accept?",
    answer: "We accept cash (MAD, EUR, USD), credit/debit cards, and mobile payments including CMI Pay and local bank apps. Payment is made on arrival when dropping off your bags."
  },
  {
    question: "Where are you located?",
    answer: "We're located in the heart of Marrakech Medina, just 2 minutes walk from Jemaa el-Fnaa square. Look for our gold signage near Café de France. Full directions are sent with your WhatsApp confirmation."
  },
  {
    question: "What if I'm running late for pickup?",
    answer: "No stress! If you can't collect before closing, just WhatsApp us. We offer overnight extensions at a reduced rate, and your bags will be waiting safely for you the next day."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-32 bg-bg-base">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-title block mb-6">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary">
            Everything you need to know
          </h2>
        </div>

        <div className="space-y-0 border border-gold-border">
          {faqs.map((faq, index) => (
            <div key={index} className={index !== faqs.length - 1 ? 'border-b border-gold-border' : ''}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-bg-elevated transition-colors group"
              >
                <span className="font-serif text-lg text-text-primary pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={20} className="text-gold" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="font-sans font-light text-text-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-text-secondary font-sans font-light mb-4">
            Still have questions?
          </p>
          <a 
            href="https://wa.me/212600000000" 
            className="btn-ghost inline-block"
          >
            CHAT WITH US ON WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
};
