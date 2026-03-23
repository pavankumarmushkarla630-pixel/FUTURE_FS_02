import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out
    }, 2200);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border glass-card transition-all duration-300
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
        ${type === 'success' ? 'border-success/30 bg-success/10' : 'border-danger/30 bg-danger/10'}
      `}
    >
      {type === 'success' ? (
        <CheckCircle2 className='w-5 h-5 text-success' />
      ) : (
        <XCircle className='w-5 h-5 text-danger' />
      )}
      <p className='text-sm font-medium text-textPrimary'>
        {message}
      </p>
    </div>
  );
};

export default Toast;
