
import React from 'react';
import DianaLogo from '../DianaLogo';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderLogoProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ toggleSidebar, sidebarOpen }) => {
  return (
    <div className="flex items-center">
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden mr-2" 
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      <div className="flex items-center space-x-2">
        <DianaLogo className="h-8" />
        <div className="hidden md:block text-xs text-muted-foreground ml-2">
          (Dados e Informações Analisadas)
        </div>
      </div>
    </div>
  );
};
