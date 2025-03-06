
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface SidebarNavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  sidebarMinimized: boolean;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  to,
  icon: Icon,
  label,
  isActive,
  sidebarMinimized
}) => {
  return (
    <Link to={to} className="w-full">
      <Button 
        variant="ghost" 
        className={`w-full justify-start text-white hover:bg-sidebar-accent ${isActive ? 'bg-sidebar-accent' : ''}`} 
        size="sm"
      >
        <Icon className="mr-2 h-4 w-4" />
        {!sidebarMinimized && <span>{label}</span>}
      </Button>
    </Link>
  );
};
