
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarToggleButtonProps {
  sidebarMinimized: boolean;
  toggleMinimize: () => void;
}

export const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({
  sidebarMinimized,
  toggleMinimize
}) => {
  return (
    <button 
      onClick={toggleMinimize}
      className="absolute -right-3 top-2 bg-sidebar-accent hover:bg-sidebar text-white p-1 rounded-full shadow-md hidden md:flex"
    >
      {sidebarMinimized ? 
        <ChevronRight className="h-4 w-4" /> : 
        <ChevronLeft className="h-4 w-4" />
      }
    </button>
  );
};
