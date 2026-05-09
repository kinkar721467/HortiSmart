import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { sidebarData, buyerMenuItems, adminMenuItems } from '../data/mockData';

const Sidebar = ({ isMinimized, closeMobile }) => {
  const [role, setRole] = useState('Farmer');

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  let menuItems = sidebarData.menuItems;
  if (role === 'Buyer') menuItems = buyerMenuItems;
  if (role === 'Admin') menuItems = adminMenuItems;

  const { bottomItems } = sidebarData;
  const user = {
    name: role === 'Admin' ? 'System Admin' : role === 'Buyer' ? 'Demo Buyer' : 'Demo Farmer',
    role: role,
    initials: role === 'Admin' ? 'SA' : role === 'Buyer' ? 'DB' : 'DF'
  };

  const sidebarWidth = isMinimized ? 'w-20' : 'w-64';

  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col justify-between h-full transition-all duration-300 ${sidebarWidth}`}>
      <div className="overflow-y-auto overflow-x-hidden flex-1 no-scrollbar">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center lg:justify-start px-6 border-b border-gray-100 shrink-0">
          <Leaf className="h-6 w-6 text-green-600 shrink-0 lg:mr-2" />
          <span className={`text-xl font-bold text-green-600 transition-opacity duration-300 ${isMinimized ? 'opacity-0 hidden lg:hidden' : 'opacity-100 block'}`}>
            HortiSmart
          </span>
        </div>

        {/* User Profile */}
        <div className={`p-4 md:p-6 flex items-center justify-center lg:justify-start ${isMinimized ? 'px-2' : ''}`}>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold shrink-0">
              {user.initials}
            </div>
            <div className={`transition-opacity duration-300 ${isMinimized ? 'opacity-0 hidden lg:hidden' : 'opacity-100 block'}`}>
              <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 space-y-1 mt-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={closeMobile}
              className={({ isActive }) => `
                flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative
                ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}
                ${isMinimized ? 'justify-center' : 'justify-between'}
              `}
              title={isMinimized ? item.name : ''}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center">
                    <item.icon className={`h-5 w-5 shrink-0 ${isMinimized ? '' : 'mr-3'} ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-green-600'}`} />
                    <span className={`transition-opacity duration-300 whitespace-nowrap ${isMinimized ? 'opacity-0 hidden lg:hidden' : 'opacity-100 block'}`}>
                      {item.name}
                    </span>
                  </div>
                  {!isMinimized && item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isActive ? 'bg-white text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isMinimized && item.badge && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500 border-2 border-white"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Menu */}
      <div className="p-3 border-t border-gray-100 space-y-1 shrink-0">
        {bottomItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={closeMobile}
            className={({ isActive }) => `
              w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group
              ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              ${isMinimized ? 'justify-center' : 'justify-start'}
            `}
            title={isMinimized ? item.name : ''}
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-5 w-5 shrink-0 ${isMinimized ? '' : 'mr-3'} ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className={`transition-opacity duration-300 whitespace-nowrap ${isMinimized ? 'opacity-0 hidden lg:hidden' : 'opacity-100 block'}`}>
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
