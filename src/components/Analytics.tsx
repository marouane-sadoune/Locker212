import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Calendar } from 'lucide-react';

interface DayData {
  day: string;
  bookings: number;
  revenue: number;
}

const weekData: DayData[] = [
  { day: 'Mon', bookings: 12, revenue: 420 },
  { day: 'Tue', bookings: 18, revenue: 630 },
  { day: 'Wed', bookings: 15, revenue: 525 },
  { day: 'Thu', bookings: 22, revenue: 770 },
  { day: 'Fri', bookings: 28, revenue: 980 },
  { day: 'Sat', bookings: 35, revenue: 1225 },
  { day: 'Sun', bookings: 24, revenue: 840 },
];

const maxBookings = Math.max(...weekData.map(d => d.bookings));
const maxRevenue = Math.max(...weekData.map(d => d.revenue));

export const Analytics: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'bookings' | 'revenue'>('bookings');

  const totalBookings = weekData.reduce((sum, d) => sum + d.bookings, 0);
  const totalRevenue = weekData.reduce((sum, d) => sum + d.revenue, 0);
  const avgBookings = Math.round(totalBookings / 7);
  const avgRevenue = Math.round(totalRevenue / 7);

  return (
    <div className="mb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <span className="section-title">WEEKLY ANALYTICS</span>
          <p className="text-text-muted text-[11px] font-sans font-light mt-1">Last 7 days performance</p>
        </div>
        
        {/* Metric Toggle */}
        <div className="flex border border-gold-border p-0.5">
          <button
            onClick={() => setActiveMetric('bookings')}
            className={`px-4 py-2 text-[10px] tracking-widest uppercase transition-colors ${
              activeMetric === 'bookings' ? 'bg-gold text-bg-base' : 'text-text-secondary hover:text-gold'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveMetric('revenue')}
            className={`px-4 py-2 text-[10px] tracking-widest uppercase transition-colors ${
              activeMetric === 'revenue' ? 'bg-gold text-bg-base' : 'text-text-secondary hover:text-gold'
            }`}
          >
            Revenue
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart */}
        <div className="lg:col-span-3 border border-gold-border p-6 bg-bg-surface/30">
          <div className="flex items-end justify-between h-48 gap-4">
            {weekData.map((data, i) => {
              const value = activeMetric === 'bookings' ? data.bookings : data.revenue;
              const max = activeMetric === 'bookings' ? maxBookings : maxRevenue;
              const heightPercent = (value / max) * 100;
              
              return (
                <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
                    className="w-full bg-gold/20 border border-gold/40 relative group cursor-pointer hover:bg-gold/30 transition-colors"
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-bg-base border border-gold-border text-xs text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {activeMetric === 'bookings' ? `${data.bookings} bookings` : `${data.revenue} MAD`}
                    </div>
                  </motion.div>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider">{data.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="space-y-4">
          <div className="border border-gold-border p-5 bg-bg-surface/30">
            <div className="flex items-center gap-2 mb-3">
              <Users size={14} className="text-gold" />
              <span className="text-[10px] text-text-muted uppercase tracking-widest">Total Bookings</span>
            </div>
            <div className="font-serif text-3xl text-text-primary mb-1">{totalBookings}</div>
            <div className="flex items-center gap-1 text-success text-[10px]">
              <TrendingUp size={12} />
              <span>+12% vs last week</span>
            </div>
          </div>

          <div className="border border-gold-border p-5 bg-bg-surface/30">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={14} className="text-gold" />
              <span className="text-[10px] text-text-muted uppercase tracking-widest">Total Revenue</span>
            </div>
            <div className="font-serif text-3xl text-text-primary mb-1">{totalRevenue.toLocaleString()} <span className="text-lg">MAD</span></div>
            <div className="flex items-center gap-1 text-success text-[10px]">
              <TrendingUp size={12} />
              <span>+8% vs last week</span>
            </div>
          </div>

          <div className="border border-gold-border p-5 bg-bg-surface/30">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={14} className="text-gold" />
              <span className="text-[10px] text-text-muted uppercase tracking-widest">Daily Average</span>
            </div>
            <div className="font-serif text-3xl text-text-primary mb-1">{avgBookings}</div>
            <div className="text-text-muted text-[10px]">
              ~{avgRevenue} MAD/day
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
