import React from 'react';
import { Modal } from './Modal';
import { Clock, User, Package, Calendar, AlertCircle } from 'lucide-react';

interface LockerData {
  id: string;
  status: 'FREE' | 'OCCUPIED' | 'RESERVED';
  guestName?: string;
  size?: string;
  checkIn?: string;
  checkOut?: string;
  code?: string;
}

interface LockerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  locker: LockerData | null;
  onStatusChange: (newStatus: 'FREE' | 'OCCUPIED' | 'RESERVED') => void;
}

// Mock data for occupied/reserved lockers
const getMockData = (lockerId: string, status: string): Partial<LockerData> => {
  const mockGuests: Record<string, Partial<LockerData>> = {
    '03': { guestName: 'Sophie Martin', size: 'Large', checkIn: '10:30 AM', checkOut: '6:00 PM', code: 'VLT-8821' },
    '04': { guestName: 'Tyler Brooks', size: 'Large', checkIn: '9:00 AM', checkOut: '5:30 PM', code: 'VLT-1067' },
    '07': { guestName: 'James Wilson', size: 'Standard', checkIn: '11:15 AM', checkOut: '7:00 PM', code: 'VLT-7432' },
    '09': { guestName: 'Emma de Vries', size: 'Small', checkIn: '2:00 PM', checkOut: '8:00 PM', code: 'VLT-3349' },
    '12': { guestName: 'Carlos García', size: 'Small', checkIn: '—', checkOut: '—', code: 'VLT-6190' },
    '15': { guestName: 'Anna Müller', size: 'Standard', checkIn: '8:45 AM', checkOut: '4:30 PM', code: 'VLT-5503' },
    '16': { guestName: 'Reserved Guest', size: 'Standard', checkIn: '—', checkOut: '—', code: 'VLT-9912' },
    '18': { guestName: 'Luca Romano', size: 'Large', checkIn: '1:30 PM', checkOut: '9:00 PM', code: 'VLT-4871' },
    '21': { guestName: 'Kenji Tanaka', size: 'Standard', checkIn: '7:30 AM', checkOut: '3:00 PM', code: 'VLT-2214' },
    '22': { guestName: 'Reserved Guest', size: 'Large', checkIn: '—', checkOut: '—', code: 'VLT-8834' },
  };
  
  if (status === 'FREE') return {};
  return mockGuests[lockerId] || { guestName: 'Unknown', size: 'Standard', checkIn: '—', checkOut: '—', code: '—' };
};

export const LockerDetailModal: React.FC<LockerDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  locker,
  onStatusChange 
}) => {
  if (!locker) return null;

  const mockData = getMockData(locker.id, locker.status);
  
  const statusColors = {
    FREE: 'text-success',
    OCCUPIED: 'text-[#C47A7A]',
    RESERVED: 'text-gold'
  };

  const statusBg = {
    FREE: 'bg-success/15 border-success/40',
    OCCUPIED: 'bg-danger/15 border-danger/40',
    RESERVED: 'bg-gold/15 border-gold/40'
  };

  const calculateTimeRemaining = () => {
    if (locker.status === 'FREE' || !mockData.checkOut || mockData.checkOut === '—') return null;
    return `Until ${mockData.checkOut}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Locker #${locker.id}`} size="sm">
      <div className="space-y-6">
        {/* Status Badge */}
        <div className={`p-4 border ${statusBg[locker.status]} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 ${locker.status === 'FREE' ? 'bg-success' : locker.status === 'OCCUPIED' ? 'bg-danger' : 'bg-gold'}`} />
            <span className={`font-sans text-sm uppercase tracking-widest ${statusColors[locker.status]}`}>
              {locker.status === 'FREE' ? 'Available' : locker.status === 'OCCUPIED' ? 'In Use' : 'Reserved'}
            </span>
          </div>
          {calculateTimeRemaining() && (
            <span className="text-text-muted text-xs flex items-center gap-2">
              <Clock size={12} />
              {calculateTimeRemaining()}
            </span>
          )}
        </div>

        {/* Guest Info (if occupied or reserved) */}
        {locker.status !== 'FREE' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-bg-elevated border border-gold-border/30">
              <User size={18} className="text-gold" />
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-widest">Guest</div>
                <div className="text-text-primary font-sans">{mockData.guestName}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-bg-elevated border border-gold-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <Package size={14} className="text-gold" />
                  <span className="text-[10px] text-text-muted uppercase tracking-widest">Size</span>
                </div>
                <div className="text-text-primary font-sans">{mockData.size}</div>
              </div>
              
              <div className="p-4 bg-bg-elevated border border-gold-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={14} className="text-gold" />
                  <span className="text-[10px] text-text-muted uppercase tracking-widest">Code</span>
                </div>
                <div className="text-gold font-mono">{mockData.code}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-bg-elevated border border-gold-border/30">
                <div className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Check-in</div>
                <div className="text-text-primary font-sans">{mockData.checkIn}</div>
              </div>
              <div className="p-4 bg-bg-elevated border border-gold-border/30">
                <div className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Check-out</div>
                <div className="text-text-primary font-sans">{mockData.checkOut}</div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="pt-4 border-t border-gold-border/30">
          <div className="text-[10px] text-text-muted uppercase tracking-widest mb-4">Quick Actions</div>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => onStatusChange('FREE')}
              className={`p-3 border text-center text-[10px] uppercase tracking-widest transition-colors ${
                locker.status === 'FREE' 
                  ? 'border-success bg-success/15 text-success' 
                  : 'border-gold-border text-text-secondary hover:border-success hover:text-success'
              }`}
            >
              Free
            </button>
            <button
              onClick={() => onStatusChange('OCCUPIED')}
              className={`p-3 border text-center text-[10px] uppercase tracking-widest transition-colors ${
                locker.status === 'OCCUPIED' 
                  ? 'border-danger bg-danger/15 text-[#C47A7A]' 
                  : 'border-gold-border text-text-secondary hover:border-danger hover:text-[#C47A7A]'
              }`}
            >
              Occupied
            </button>
            <button
              onClick={() => onStatusChange('RESERVED')}
              className={`p-3 border text-center text-[10px] uppercase tracking-widest transition-colors ${
                locker.status === 'RESERVED' 
                  ? 'border-gold bg-gold/15 text-gold' 
                  : 'border-gold-border text-text-secondary hover:border-gold hover:text-gold'
              }`}
            >
              Reserved
            </button>
          </div>
        </div>

        {/* Warning for occupied lockers */}
        {locker.status === 'OCCUPIED' && (
          <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/30 text-warning text-sm">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
            <span>Guest has active belongings. Verify collection before marking as free.</span>
          </div>
        )}
      </div>
    </Modal>
  );
};
