import React from 'react';
import { Calendar, Building2, User } from 'lucide-react';
import { motion } from 'framer-motion';

const FollowUpCard = ({ note, onClick }) => {
  const isOverdue = new Date(note.followUpDate) < new Date(new Date().setHours(0,0,0,0));
  const isToday = new Date(note.followUpDate).toDateString() === new Date().toDateString();

  let borderColor = 'border-primary border-l-4';
  if (isOverdue) borderColor = 'border-danger border-l-4';
  if (isToday) borderColor = 'border-warning border-l-4';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, x: 2, boxShadow: '0 0 20px rgba(79, 110, 247, 0.15)' }}
      onClick={onClick}
      className={`glass-card p-4 hover:bg-bgSurface transition-colors cursor-pointer flex flex-col gap-3 ${borderColor}`}
    >
      <div className='flex justify-between items-start'>
        <div className='flex flex-col'>
          <h4 className='font-medium text-textPrimary flex items-center gap-2'>
            <User className='w-3 h-3 text-textMuted' />
            {note.leadId?.name}
          </h4>
          <span className='text-xs text-textMuted flex items-center gap-2 mt-1'>
            <Building2 className='w-3 h-3' />
            {note.leadId?.company || '--'}
          </span>
        </div>
      </div>
      
      <p className='text-sm text-textSecondary line-clamp-2'>
        {note.noteText}
      </p>

      <div className='flex items-center justify-between pt-2 border-t border-borderDim mt-auto'>
        <span className={`text-xs font-mono font-medium flex items-center gap-1 ${
          isOverdue ? 'text-danger' : isToday ? 'text-warning' : 'text-primary'
        }`}>
          <Calendar className='w-3 h-3' />
          {new Date(note.followUpDate).toLocaleDateString()} {note.followUpTime}
        </span>
      </div>
    </motion.div>
  );
};

export default FollowUpCard;
