import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Menu, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInitials, getAvatarColor } from '../../utils/helpers';

export default function AdminNavbar({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-dark-900 border-b border-white/[0.05] flex items-center px-8 gap-6 flex-shrink-0 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <button className="hidden lg:flex p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Brand Logo inside Navbar */}
      <div className="flex items-center gap-2 lg:ml-4">
        <h1 className="text-2xl font-black tracking-tight text-white">
          <span className="text-brand-primary">Eden</span>Soft<span className="text-brand-primary">X</span>
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-6 flex-1 justify-end">
        {/* Global Search */}
        <div className="relative max-w-sm w-full hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-dark-950/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-dark-950 focus:ring-1 focus:ring-brand-primary sm:text-sm transition-all"
            placeholder="Search"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-dark-900"></span>
        </button>
        
        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer pl-4 border-l border-white/[0.05]">
          <div className={`w-8 h-8 rounded-full ${getAvatarColor(user?.name)} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
            {getInitials(user?.name || 'A')}
          </div>
        </div>
      </div>
    </header>
  );
}
