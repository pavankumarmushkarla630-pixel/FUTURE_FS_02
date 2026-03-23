import React from 'react';
import { Clock } from 'lucide-react';

const NoteTimeline = ({ notes = [], onDelete }) => {
  return (
    <div className='space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-borderDim before:via-borderDim before:to-transparent'>
      {notes.length === 0 ? (
        <div className='text-sm text-textMuted text-center'>No notes yet. Add one below.</div>
      ) : (
        notes.map((note, index) => (
          <div key={note._id} className='relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active'>
            <div className='flex items-center justify-center w-10 h-10 rounded-full border-4 border-bgCard bg-bgSurface shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10'>
              <div className='w-2 h-2 rounded-full bg-primary'></div>
            </div>
            
            <div className='w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl flex flex-col'>
              <div className='flex items-center justify-between mb-2'>
                <span className='font-medium text-textPrimary text-sm'>{note.createdBy?.name || 'User'}</span>
                <span className='text-xs font-mono text-textMuted'>
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className='text-sm text-textSecondary whitespace-pre-wrap leading-relaxed'>
                {note.noteText}
              </p>
              
              {note.isFollowUp && note.followUpDate && (
                <div className='mt-3 bg-primary/10 border border-primary/20 rounded-md p-2 flex items-center gap-2 text-xs text-primary font-medium'>
                  <Clock className='w-3 h-3' />
                  Follow-up set for: {new Date(note.followUpDate).toLocaleDateString()} {note.followUpTime || ''}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NoteTimeline;
