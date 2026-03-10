import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white border-b border-slate-200 lg:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        
       
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>
        
        <button className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-none">Admin User</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Super Admin</p>
          </div>
          {/* <User className="w-4 h-4 text-slate-400 ml-1" /> */}
        </button>
      </div>
    </header>
  );
};
