import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, Settings, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../store/authSlice';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = async () => {
    await dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Leads', icon: Users, path: '/leads' },
    { name: 'Follow-ups', icon: CalendarCheck, path: '/followups' },
  ];

  return (
    <aside className='w-56 bg-bgCard border-r border-borderDim flex flex-col justify-between hidden md:flex transition-all duration-300'>
      <div>
        <motion.div 
          className='p-6 mb-4'
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <h1 className='text-2xl font-serif italic font-bold tracking-tight text-white flex items-center gap-2'>
            <motion.span 
              className='w-6 h-6 rounded-md bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-sm not-italic shadow-glow'
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >C</motion.span>
            Corelo
          </h1>
        </motion.div>
        <nav className='px-3 space-y-1'>
          {menuItems.map((item) => (
            <motion.div key={item.name} whileHover={{ x: 4, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-primary/15 text-primary border border-borderGlow shadow-glow'
                      : 'text-textSecondary hover:bg-bgSurface/50 hover:text-textPrimary border border-transparent'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </div>

      <div className='p-4 border-t border-borderDim'>
        <div className='flex items-center gap-3 mb-4 px-2'>
          <div className='w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm'>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className='flex flex-col overflow-hidden'>
            <span className='text-sm text-textPrimary font-medium truncate'>{user?.name}</span>
            <span className='text-xs text-textMuted truncate'>{user?.email}</span>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className='w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-textSecondary hover:bg-bgSurface hover:text-danger border border-transparent transition-colors'
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
