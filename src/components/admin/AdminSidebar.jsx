import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getInitials, getAvatarColor } from '../../utils/helpers';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  BarChart3, 
  Package, 
  MenuSquare, 
  Users, 
  UserCog, 
  Megaphone, 
  Settings, 
  LifeBuoy,
  ChevronDown
} from 'lucide-react';

const adminNavItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { path: '/admin/orders', label: 'Orders', icon: <ShoppingCart className="w-5 h-5" /> },
  { path: '/admin/reports', label: 'Sales Reports', icon: <BarChart3 className="w-5 h-5" /> },
  { path: '/admin/inventory', label: 'Inventory', icon: <Package className="w-5 h-5" /> },
  { path: '/admin/menu', label: 'Menu Management', icon: <MenuSquare className="w-5 h-5" /> },
  { path: '/admin/customers', label: 'Customer Data', icon: <Users className="w-5 h-5" /> },
  { path: '/admin/staff', label: 'Staff Management', icon: <UserCog className="w-5 h-5" /> },
  { path: '/admin/marketing', label: 'Marketing', icon: <Megaphone className="w-5 h-5" /> },
  { path: '/admin/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  { path: '/admin/support', label: 'Support', icon: <LifeBuoy className="w-5 h-5" /> },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const { user } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 w-64 bg-dark-900 border-r border-white/[0.05] flex flex-col text-gray-400
          transition-transform duration-300 ease-in-out shadow-2xl shadow-black/50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* User Profile Area (Top of Sidebar) */}
        <div className="p-6 border-b border-white/[0.05]">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-10 h-10 rounded-full ${getAvatarColor(user?.name)} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
              {getInitials(user?.name || 'Admin')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold truncate leading-tight group-hover:text-brand-primary transition-colors flex items-center justify-between">
                {user?.name || 'Admin'}
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 group
                ${isActive
                  ? 'bg-brand-primary/10 text-white border-l-4 border-brand-primary rounded-l-none'
                  : 'text-gray-400 hover:bg-white/[0.02] hover:text-white'
                }`
              }
            >
              <div className={`transition-colors duration-200 ${location.pathname === item.path ? 'text-brand-primary' : 'text-gray-500 group-hover:text-gray-300'}`}>
                {item.icon}
              </div>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
