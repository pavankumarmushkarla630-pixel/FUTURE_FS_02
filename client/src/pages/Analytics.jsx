import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeads } from '../store/leadsSlice';
import { motion } from 'framer-motion';
import { TrendingUp, Users, CheckCircle, XCircle, Clock } from 'lucide-react';

const STATUSES = ['New', 'Contacted', 'Negotiating', 'Converted', 'Lost'];
const SOURCES = ['Website', 'LinkedIn', 'Referral', 'Ads', 'Cold Call', 'Event', 'Partner'];

const STATUS_COLORS = {
  New: 'bg-blue-500',
  Contacted: 'bg-purple-500',
  Negotiating: 'bg-yellow-500',
  Converted: 'bg-green-500',
  Lost: 'bg-red-500',
};

const STATUS_TEXT = {
  New: 'text-blue-400',
  Contacted: 'text-purple-400',
  Negotiating: 'text-yellow-400',
  Converted: 'text-green-400',
  Lost: 'text-red-400',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } }
};

const Analytics = () => {
  const dispatch = useDispatch();
  const { leads, isLoading } = useSelector(state => state.leads);

  useEffect(() => { dispatch(getLeads('limit=1000')); }, [dispatch]);

  const total = leads.length;
  const conversionRate = total > 0 ? ((leads.filter(l => l.status === 'Converted').length / total) * 100).toFixed(1) : 0;

  // Status counts
  const statusCounts = STATUSES.reduce((acc, s) => {
    acc[s] = leads.filter(l => l.status === s).length;
    return acc;
  }, {});

  // Source counts
  const sourceCounts = SOURCES.map(s => ({
    name: s,
    count: leads.filter(l => l.source === s).length,
  })).filter(s => s.count > 0).sort((a, b) => b.count - a.count);

  // Priority breakdown
  const hotLeads = leads.filter(l => l.priority === 'Hot').length;
  const warmLeads = leads.filter(l => l.priority === 'Warm').length;
  const coldLeads = leads.filter(l => l.priority === 'Cold').length;

  // Monthly trend (last 6 months)
  const now = new Date();
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const monthLeads = leads.filter(l => {
      const ld = new Date(l.createdAt);
      return ld.getMonth() === d.getMonth() && ld.getFullYear() === d.getFullYear();
    });
    return {
      label: d.toLocaleString('default', { month: 'short' }),
      count: monthLeads.length
    };
  });
  const maxMonthly = Math.max(...monthlyData.map(m => m.count), 1);

  if (isLoading && total === 0) {
    return <div className='text-center text-textMuted py-20'>Loading analytics...</div>;
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className='space-y-6'>
      
      {/* KPI Row */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {[
          { label: 'Total Leads', value: total, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Conversion Rate', value: `${conversionRate}%`, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'Converted', value: statusCounts['Converted'], icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'Lost', value: statusCounts['Lost'], icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
        ].map(kpi => (
          <motion.div key={kpi.label} variants={itemVariants} className='glass-card p-5 flex items-center gap-4'>
            <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center shrink-0`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div>
              <p className='text-xs text-textMuted uppercase tracking-wider'>{kpi.label}</p>
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        
        {/* Pipeline Funnel */}
        <motion.div variants={itemVariants} className='glass-card p-6'>
          <h3 className='text-sm uppercase tracking-wider text-textSecondary font-medium mb-6'>Pipeline Funnel</h3>
          <div className='space-y-3'>
            {STATUSES.map(status => {
              const count = statusCounts[status];
              const pct = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={status} className='space-y-1'>
                  <div className='flex justify-between text-xs'>
                    <span className={STATUS_TEXT[status]}>{status}</span>
                    <span className='text-textMuted'>{count} leads ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className='h-2.5 bg-bgSurface rounded-full overflow-hidden'>
                    <motion.div
                      className={`h-full rounded-full ${STATUS_COLORS[status]}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Source Breakdown */}
        <motion.div variants={itemVariants} className='glass-card p-6'>
          <h3 className='text-sm uppercase tracking-wider text-textSecondary font-medium mb-6'>Lead Sources</h3>
          {sourceCounts.length === 0 ? (
            <p className='text-textMuted text-sm text-center py-8'>No lead data yet.</p>
          ) : (
            <div className='space-y-3'>
              {sourceCounts.map((s, i) => {
                const pct = total > 0 ? (s.count / total) * 100 : 0;
                const hue = (i * 55) % 360;
                return (
                  <div key={s.name} className='space-y-1'>
                    <div className='flex justify-between text-xs'>
                      <span className='text-textPrimary'>{s.name}</span>
                      <span className='text-textMuted'>{s.count} ({pct.toFixed(0)}%)</span>
                    </div>
                    <div className='h-2.5 bg-bgSurface rounded-full overflow-hidden'>
                      <motion.div
                        className='h-full rounded-full'
                        style={{ backgroundColor: `hsl(${hue}, 70%, 60%)` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.1 * i }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Monthly Trend */}
        <motion.div variants={itemVariants} className='glass-card p-6'>
          <h3 className='text-sm uppercase tracking-wider text-textSecondary font-medium mb-6'>Leads Added (Last 6 Months)</h3>
          <div className='flex items-end gap-3 h-36'>
            {monthlyData.map((m) => (
              <div key={m.label} className='flex-1 flex flex-col items-center gap-1'>
                <span className='text-xs text-primary font-medium'>{m.count > 0 ? m.count : ''}</span>
                <div className='w-full bg-bgSurface rounded-t-md overflow-hidden' style={{ height: '96px' }}>
                  <motion.div
                    className='w-full bg-gradient-to-t from-primary to-accent rounded-t-md'
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.count / maxMonthly) * 100}%` }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    style={{ marginTop: 'auto' }}
                  />
                </div>
                <span className='text-xs text-textMuted'>{m.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Priority Breakdown */}
        <motion.div variants={itemVariants} className='glass-card p-6'>
          <h3 className='text-sm uppercase tracking-wider text-textSecondary font-medium mb-6'>Priority Breakdown</h3>
          <div className='space-y-4'>
            {[
              { label: 'Hot', count: hotLeads, color: 'bg-red-500', text: 'text-red-400', emoji: '🔥' },
              { label: 'Warm', count: warmLeads, color: 'bg-yellow-500', text: 'text-yellow-400', emoji: '☀️' },
              { label: 'Cold', count: coldLeads, color: 'bg-blue-400', text: 'text-blue-300', emoji: '❄️' },
            ].map(p => (
              <div key={p.label} className='flex items-center gap-4'>
                <div className={`w-10 h-10 rounded-lg ${p.color}/20 flex items-center justify-center text-lg`}>{p.emoji}</div>
                <div className='flex-1'>
                  <div className='flex justify-between text-xs mb-1'>
                    <span className={p.text}>{p.label}</span>
                    <span className='text-textMuted'>{p.count}</span>
                  </div>
                  <div className='h-2 bg-bgSurface rounded-full overflow-hidden'>
                    <motion.div
                      className={`h-full rounded-full ${p.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${total > 0 ? (p.count / total) * 100 : 0}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Analytics;
