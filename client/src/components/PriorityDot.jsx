import React from 'react';

const PriorityDot = ({ priority }) => {
  const colors = {
    'Hot': 'bg-danger shadow-[0_0_8px_rgba(247,86,86,0.6)]',
    'Warm': 'bg-warning shadow-[0_0_8px_rgba(245,166,35,0.6)]',
    'Cold': 'bg-primary shadow-[0_0_8px_rgba(79,110,247,0.6)]',
  };

  const bgClass = colors[priority] || 'bg-textMuted';

  return (
    <div className={`w-[7px] h-[7px] rounded-full inline-block ${bgClass}`} title={priority} />
  );
};

export default PriorityDot;
