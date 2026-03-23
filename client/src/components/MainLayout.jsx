import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LayoutDashboard, Users, User, LogOut } from 'lucide-react';
import { logout, reset } from '../store/authSlice';

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const navClasses = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
      isActive ? 'bg-accent/10 text-accent border-l-2 border-accent' : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <div className="flex bg-bg min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 glass fixed inset-y-0 left-0 flex flex-col border-r border-white/10 z-50">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-black font-bold text-xl">L</div>
          <span className="text-xl font-bold tracking-tight text-white">LeadFlow</span>
        </div>

        <nav className="flex-1 px-4 mt-6 flex flex-col gap-2">
          <NavLink to="/" className={navClasses}>
            <LayoutDashboard className="w-5 h-5" /> Pipeline
          </NavLink>
          <NavLink to="/leads" className={navClasses}>
            <Users className="w-5 h-5" /> All Leads
          </NavLink>
        </nav>

        <div className="p-4 border-t border-white/10">
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" /> Logout
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-[72px] glass border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-40">
           <h1 className="text-xl font-bold text-white">CRM Workspace</h1>
           <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-surface border border-white/20 flex items-center justify-center">
                 <User className="w-4 h-4 text-gray-400" />
              </div>
           </div>
        </header>
        
        <div className="p-8 max-w-7xl mx-auto w-full flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
