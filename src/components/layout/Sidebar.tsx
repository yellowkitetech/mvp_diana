
import React from 'react';
import { SidebarToggleButton } from './SidebarToggleButton';
import { SidebarNavigation } from './SidebarNavigation';
import { SidebarUserInfo } from './SidebarUserInfo';

interface SidebarProps {
  sidebarOpen: boolean;
  sidebarMinimized: boolean;
  toggleMinimize: () => void;
  handleLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  sidebarMinimized,
  toggleMinimize,
  handleLogout
}) => {
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-40 bg-sidebar transform transition-all duration-300 ease-in-out pt-16 border-r border-border ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 ${
        sidebarMinimized ? 'md:w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full p-4 relative">
        <SidebarToggleButton 
          sidebarMinimized={sidebarMinimized} 
          toggleMinimize={toggleMinimize} 
        />
        
        {/* Main navigation */}
        <SidebarNavigation 
          sidebarMinimized={sidebarMinimized} 
          handleLogout={handleLogout} 
        />
        
        {/* User info at the bottom */}
        <div className="mt-auto space-y-1">
          <SidebarUserInfo sidebarMinimized={sidebarMinimized} />
        </div>
      </div>
    </aside>
  );
};
