import React from 'react';

const KpiCard = ({ label, value, weeklyDelta, colorClass = 'bg-primary' }) => {
  const isPositive = weeklyDelta >= 0;

  return (
    <div className='glass-card p-5 relative overflow-hidden group cursor-pointer'>
      {/* Background glow hover effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-180 ${colorClass}`} />
      
      <div className='relative z-10'>
        <h3 className='text-sm font-medium text-textSecondary uppercase tracking-wider mb-2'>{label}</h3>
        <div className='flex items-baseline gap-3'>
          <span className='text-4xl font-serif text-textPrimary'>{value}</span>
          {weeklyDelta !== undefined && (
                 <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
              {isPositive ? '+' : ''}{weeklyDelta} this wk
            </span>
          )}
        </div>
      </div>
      
      {/* Bottom Progress Bar */}
      <div className='absolute bottom-0 left-0 right-0 h-1 bg-bgSurface'>
        <div className={`h-full ${colorClass}`} style={{ width: '100%' }} />
      </div>
    </div>
  );
};

export default KpiCard;
