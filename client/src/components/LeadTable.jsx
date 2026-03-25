import React, { useState } from 'react';
import { Trash2, Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PriorityDot from './PriorityDot';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { deleteLead, getLeads } from '../store/leadsSlice';

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
};
const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
};

const LeadTable = ({ leads = [], onSort, sortField, sortOrder, showDelete = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const handleSort = (field) => { if (onSort) onSort(field); };
  const getSortIcon = (field) => {
    if (sortField !== field) return <span className='text-borderDim ml-1'>↕</span>;
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (confirmId !== id) { setConfirmId(id); return; }
    setDeletingId(id);
    setConfirmId(null);
    await dispatch(deleteLead(id));
    dispatch(getLeads());
    setDeletingId(null);
  };

  return (
    <div className='w-full overflow-x-auto rounded-lg border border-borderDim'>
      <table className='w-full text-left text-sm text-textSecondary'>
        <thead className='text-xs uppercase bg-bgSurface text-textMuted'>
          <tr>
            <th onClick={() => handleSort('name')} className='px-5 py-4 cursor-pointer hover:bg-bgCard/50'>Lead {getSortIcon('name')}</th>
            <th onClick={() => handleSort('source')} className='px-5 py-4 cursor-pointer hover:bg-bgCard/50 hidden md:table-cell'>Source {getSortIcon('source')}</th>
            <th onClick={() => handleSort('status')} className='px-5 py-4 cursor-pointer hover:bg-bgCard/50'>Status {getSortIcon('status')}</th>
            <th onClick={() => handleSort('priority')} className='px-5 py-4 cursor-pointer hover:bg-bgCard/50 hidden lg:table-cell'>Priority {getSortIcon('priority')}</th>
            <th className='px-5 py-4 hidden lg:table-cell'>Added</th>
            <th className='px-5 py-4 text-right'>Actions</th>
          </tr>
        </thead>
        <motion.tbody variants={tableVariants} initial="hidden" animate="visible">
          {leads.length === 0 ? (
            <tr>
              <td colSpan='6' className='px-6 py-12 text-center text-textMuted'>
                <div className='flex flex-col items-center gap-2'>
                  <span className='text-3xl'>📋</span>
                  <span>No leads found. Add your first lead!</span>
                </div>
              </td>
            </tr>
          ) : (
            <AnimatePresence>
              {leads.map((lead) => (
                <motion.tr
                  variants={rowVariants}
                  exit="exit"
                  layout
                  key={lead._id}
                  onClick={() => navigate(`/leads/${lead._id}`)}
                  className='border-b border-borderDim cursor-pointer hover:bg-bgSurface/40 transition-colors duration-150'
                >
                  <td className='px-5 py-3.5 font-medium text-textPrimary'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0'>
                        {lead.name.charAt(0).toUpperCase()}
                      </div>
                      <div className='flex flex-col min-w-0'>
                        <span className='truncate'>{lead.name}</span>
                        <span className='text-xs text-textMuted font-mono truncate'>{lead.company || lead.email || '--'}</span>
                      </div>
                    </div>
                  </td>
                  <td className='px-5 py-3.5 hidden md:table-cell'>{lead.source}</td>
                  <td className='px-5 py-3.5'><StatusBadge status={lead.status} /></td>
                  <td className='px-5 py-3.5 hidden lg:table-cell'>
                    <div className='flex items-center gap-2'>
                      <PriorityDot priority={lead.priority} />
                      <span>{lead.priority}</span>
                    </div>
                  </td>
                  <td className='px-5 py-3.5 font-mono text-xs hidden lg:table-cell'>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className='px-5 py-3.5'>
                    <div className='flex items-center justify-end gap-1'>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/leads/${lead._id}`); }}
                        className='p-1.5 rounded-md text-textMuted hover:text-primary hover:bg-primary/10 transition-colors'
                        title='View details'
                      >
                        <Eye className='w-3.5 h-3.5' />
                      </button>
                      {showDelete && (
                        <button
                          onClick={(e) => handleDelete(e, lead._id)}
                          disabled={deletingId === lead._id}
                          className={`p-1.5 rounded-md transition-colors text-xs ${
                            confirmId === lead._id
                              ? 'bg-danger text-white px-2 rounded-md'
                              : 'text-textMuted hover:text-danger hover:bg-danger/10'
                          }`}
                          title={confirmId === lead._id ? 'Click again to confirm delete' : 'Delete lead'}
                        >
                          {confirmId === lead._id ? 'Confirm?' : <Trash2 className='w-3.5 h-3.5' />}
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          )}
        </motion.tbody>
      </table>
    </div>
  );
};

export default LeadTable;
