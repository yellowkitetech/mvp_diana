
import React from 'react';
import { HeaderLogo } from './HeaderLogo';
import { HeaderNotifications } from './HeaderNotifications';
import { HeaderAvatar } from './HeaderAvatar';
import { currentUser } from '@/lib/data';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen }) => {
  return (
    <header className="w-full h-16 border-b border-border bg-card/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6">
      <HeaderLogo toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex items-center space-x-2">
        <HeaderNotifications />
        <HeaderAvatar user={currentUser} />
      </div>
    </header>
  );
};

export default Header;
