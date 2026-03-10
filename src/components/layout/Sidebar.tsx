import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Film, 
  Users, 
  Layers, 
  Globe, 
  Image as ImageIcon, 
  CreditCard, 
  Megaphone, 
  Bell, 
  BarChart3, 
  Settings,
  Ticket,
  ChevronRight,
  Clapperboard
} from 'lucide-react';
import { cn } from '../../lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Layers, label: 'Categories', path: '/categories' },
  { icon: Globe, label: 'Languages', path: '/languages' },
  { icon: Film, label: 'Movies', path: '/movies' },
  { icon: ImageIcon, label: 'Banners', path: '/banners' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Ticket, label: 'Subscriptions', path: '/subscriptions' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: Megaphone, label: 'Advertisements', path: '/advertisements' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-slate-900 text-slate-300 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-3 px-6 py-8 border-b border-slate-800">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Clapperboard className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">CineAdmin</h1>
        </div>

        <nav className="mt-6 px-4 space-y-1 overflow-y-auto h-[calc(100%-100px)] no-scrollbar pb-12.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) => cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  "group-hover:text-white"
                )} />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className={cn(
                "w-4 h-4 opacity-0 transition-all",
                "group-hover:opacity-100 group-hover:translate-x-1"
              )} />
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
