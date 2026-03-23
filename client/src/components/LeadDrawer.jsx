import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const LeadDrawer = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex justify-end'>
      {/* Backdrop */}
      <div 
        className='absolute inset-0 bg-bgBase/80 backdrop-blur-sm transition-opacity opacity-100'
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className='relative w-full max-w-md bg-bgCard border-l border-borderDim h-full flex flex-col shadow-2xl overflow-y-auto animate-slideInRight'
        style={{ animation: 'slideInRight 200ms ease-out forwards' }}
      >
        <div className='flex items-center justify-between p-6 border-b border-borderDim'>
          <h2 className='text-xl font-serif text-textPrimary tracking-wide'>{title}</h2>
          <button 
            onClick={onClose}
            className='p-2 text-textMuted hover:text-textPrimary hover:bg-bgSurface rounded-full transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>
        <div className='p-6 flex-1'>
          {children}
        </div>
      </div>
      
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default LeadDrawer;
