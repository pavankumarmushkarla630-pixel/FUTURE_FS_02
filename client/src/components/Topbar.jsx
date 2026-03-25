import React from 'react';
import { Search, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Topbar = ({ onAddLead }) => {
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname === '/') return 'Dashboard';
    if (location.pathname.startsWith('/leads/')) return 'Lead Details';
    if (location.pathname === '/leads') return 'All Leads';
    if (location.pathname === '/followups') return 'Follow-ups';
    if (location.pathname === '/analytics') return 'Analytics';
    if (location.pathname === '/profile') return 'My Profile';
    return 'Corelo';
  };

  return (
    <header className='h-16 border-b border-borderDim flex items-center justify-between px-6 bg-bgBase z-10 sticky top-0 backdrop-blur-md bg-opacity-80'>
      <div className='flex items-center gap-4'>
        <h2 className='text-2xl font-serif italic text-textPrimary tracking-wide'>
          {getPageTitle()}
        </h2>
      </div>

      <div className='flex items-center gap-6'>
        <div className='relative w-64 hidden sm:block'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted' />
          <input 
            type="text" 
            placeholder="Search leads..." 
            className='input-field pl-9 h-9 text-sm'
          />
        </div>
        
        {location.pathname !== '/' && !location.pathname.startsWith('/leads/') && (
          <button 
            onClick={onAddLead}
            className='btn-primary flex items-center gap-2 h-9 text-sm'
          >
            <Plus className='w-4 h-4' />
            <span>New Lead</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Topbar;
