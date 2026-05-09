import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  // By default minimized as requested
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(true);
  
  // Also we might want to handle mobile sidebar (drawer)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close mobile sidebar when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth >= 1024) {
      setIsSidebarMinimized(!isSidebarMinimized);
    } else {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] text-gray-800 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar isMinimized={isSidebarMinimized} closeMobile={() => setIsMobileSidebarOpen(false)} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full h-screen overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 w-full relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
