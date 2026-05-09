import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-10 sticky top-0">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 mr-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="flex items-center space-x-4 md:space-x-6 ml-auto">
        <button className="hidden sm:flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900">
          <span>English</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
        <button className="relative p-1 text-gray-400 hover:text-gray-500">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200 shrink-0">
          D
        </div>
      </div>
    </header>
  );
};

export default Navbar;
