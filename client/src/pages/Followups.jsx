import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowups } from '../store/leadsSlice';
import FollowUpCard from '../components/FollowUpCard';
import { useNavigate } from 'react-router-dom';

const Followups = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { followups, isLoading } = useSelector(state => state.leads);
  const [range, setRange] = useState('week'); // overdue | today | week

  useEffect(() => {
    dispatch(getFollowups(range));
  }, [dispatch, range]);

  return (
    <div className='space-y-6 flex flex-col h-full'>
      <div className='flex items-center gap-2 mb-4'>
        <button 
          onClick={() => setRange('overdue')}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            range === 'overdue' ? 'bg-danger/20 text-danger border-danger/40' : 'bg-bgSurface text-textSecondary border-borderDim hover:text-textPrimary'
          }`}
        >
          Overdue
        </button>
        <button 
          onClick={() => setRange('today')}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            range === 'today' ? 'bg-warning/20 text-warning border-warning/40' : 'bg-bgSurface text-textSecondary border-borderDim hover:text-textPrimary'
          }`}
        >
          Today
        </button>
        <button 
          onClick={() => setRange('week')}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            range === 'week' ? 'bg-primary/20 text-primary border-primary/40' : 'bg-bgSurface text-textSecondary border-borderDim hover:text-textPrimary'
          }`}
        >
          Upcoming (Week)
        </button>
      </div>

      <div className='flex-1 glass-card p-6 overflow-y-auto'>
        {isLoading ? (
          <div className='text-center text-textMuted py-10'>Loading follow-ups...</div>
        ) : followups.length === 0 ? (
          <div className='text-center text-textMuted py-10'>No follow-ups found for this range.</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
            {followups.map(f => (
              <FollowUpCard key={f._id} note={f} onClick={() => navigate(`/leads/${f.leadId?._id}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Followups;
