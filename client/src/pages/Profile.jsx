import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { User, Mail, Shield, Key, CheckCircle } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL || '';
const getAuthHeaders = () => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | string message
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', msg: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setStatus({ type: 'error', msg: 'Password must be at least 6 characters.' });
      return;
    }
    setLoading(true);
    try {
      await axios.put(`${BASE_URL}/api/auth/change-password`, { currentPassword, newPassword }, { headers: getAuthHeaders() });
      setStatus({ type: 'success', msg: 'Password updated successfully!' });
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.error?.message || 'Failed to update password.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto space-y-6'>
      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='glass-card p-8'>
        <div className='flex items-center gap-6 mb-8'>
          <div className='w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-3xl shadow-glow'>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className='text-2xl font-serif italic text-textPrimary'>{user?.name}</h2>
            <p className='text-textMuted text-sm mt-1'>{user?.email}</p>
            <span className='inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-xs font-medium border border-primary/30'>
              <Shield className='w-3 h-3' /> {user?.role || 'Member'}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4'>
          <div className='flex items-center gap-4 p-4 bg-bgSurface rounded-xl border border-borderDim'>
            <User className='w-4 h-4 text-textMuted' />
            <div>
              <p className='text-xs text-textMuted uppercase tracking-wider'>Full Name</p>
              <p className='text-textPrimary text-sm mt-0.5'>{user?.name}</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-4 bg-bgSurface rounded-xl border border-borderDim'>
            <Mail className='w-4 h-4 text-textMuted' />
            <div>
              <p className='text-xs text-textMuted uppercase tracking-wider'>Email Address</p>
              <p className='text-textPrimary text-sm mt-0.5'>{user?.email}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Change Password */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }} className='glass-card p-8'>
        <h3 className='text-lg font-serif italic text-textPrimary mb-6 flex items-center gap-2'>
          <Key className='w-5 h-5 text-primary' /> Change Password
        </h3>

        {status && (
          <div className={`flex items-center gap-2 p-3 rounded-lg mb-4 text-sm border ${ status.type === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-danger/10 text-danger border-danger/20' }`}>
            {status.type === 'success' && <CheckCircle className='w-4 h-4' />}
            {status.msg}
          </div>
        )}

        <form onSubmit={handleChangePassword} className='space-y-4'>
          <div>
            <label className='block text-xs font-medium text-textSecondary uppercase tracking-wider mb-1.5'>Current Password</label>
            <input type='password' className='input-field' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
          </div>
          <div>
            <label className='block text-xs font-medium text-textSecondary uppercase tracking-wider mb-1.5'>New Password</label>
            <input type='password' className='input-field' value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6} />
          </div>
          <div>
            <label className='block text-xs font-medium text-textSecondary uppercase tracking-wider mb-1.5'>Confirm New Password</label>
            <input type='password' className='input-field' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required minLength={6} />
          </div>
          <div className='flex justify-end pt-2'>
            <button type='submit' disabled={loading} className='btn-primary px-6'>
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;
