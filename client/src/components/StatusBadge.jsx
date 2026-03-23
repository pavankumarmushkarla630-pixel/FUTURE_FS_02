import React from 'react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    'New': 'bg-primary/10 text-primary border-primary/30',
    'Contacted': 'bg-warning/10 text-warning border-warning/30',
    'Negotiating': 'bg-primary/10 text-primary border-primary/30',
    'Converted': 'bg-success/10 text-success border-success/30',
    'Lost': 'bg-danger/10 text-danger border-danger/30'
  };

  const currentStatus = statusConfig[status] || 'bg-textMuted/10 text-textMuted border-textMuted/30';

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${currentStatus}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
