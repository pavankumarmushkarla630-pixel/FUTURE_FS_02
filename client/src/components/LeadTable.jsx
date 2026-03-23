import React from 'react';
import { MoreVertical, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PriorityDot from './PriorityDot';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const tableVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const LeadTable = ({ leads = [], onSort, sortField, sortOrder }) => {
  const navigate = useNavigate();

  const handleSort = (field) => {
    if (onSort) onSort(field);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div className='w-full overflow-x-auto rounded-lg border border-borderDim'>
      <table className='w-full text-left text-sm text-textSecondary'>
        <thead className='text-xs uppercase bg-bgSurface text-textMuted'>
          <tr>
            <th onClick={() => handleSort('name')} className='px-6 py-4 cursor-pointer hover:bg-bgCard/50 transition-colors'>
              Lead {getSortIcon('name')}
            </th>
            <th onClick={() => handleSort('source')} className='px-6 py-4 cursor-pointer hover:bg-bgCard/50 transition-colors'>
              Source {getSortIcon('source')}
            </th>
            <th onClick={() => handleSort('status')} className='px-6 py-4 cursor-pointer hover:bg-bgCard/50 transition-colors'>
              Status {getSortIcon('status')}
            </th>
            <th onClick={() => handleSort('priority')} className='px-6 py-4 cursor-pointer hover:bg-bgCard/50 transition-colors'>
              Priority {getSortIcon('priority')}
            </th>
            <th className='px-6 py-4'>Added Date</th>
            <th className='px-6 py-4'>Actions</th>
          </tr>
        </thead>
        <motion.tbody 
          variants={tableVariants}
          initial="hidden"
          animate="visible"
        >
          {leads.length === 0 ? (
            <tr>
              <td colSpan='6' className='px-6 py-8 text-center text-textMuted'>
                No leads found.
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <motion.tr 
                variants={rowVariants}
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(26, 26, 46, 0.8)' }}
                key={lead._id}
                onClick={() => navigate(`/leads/${lead._id}`)}
                className='border-b border-borderDim cursor-pointer transition-colors duration-150'
              >
                <td className='px-6 py-4 font-medium text-textPrimary'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs'>
                      {lead.name.charAt(0)}
                    </div>
                    <div className='flex flex-col'>
                      <span>{lead.name}</span>
                      <span className='text-xs text-textMuted font-mono'>{lead.company || '--'}</span>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4'>{lead.source}</td>
                <td className='px-6 py-4'>
                  <StatusBadge status={lead.status} />
                </td>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-2'>
                    <PriorityDot priority={lead.priority} />
                    <span>{lead.priority}</span>
                  </div>
                </td>
                <td className='px-6 py-4 font-mono text-xs'>
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td className='px-6 py-4'>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Show context menu logic
                    }}
                    className='p-1 rounded-md text-textMuted hover:text-textPrimary hover:bg-bgSurface transition-colors'
                  >
                    <MoreVertical className='w-4 h-4' />
                  </button>
                </td>
              </motion.tr>
            ))
          )}
        </motion.tbody>
      </table>
    </div>
  );
};

export default LeadTable;
