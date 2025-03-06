
import React from 'react';
import { useAuth } from '@/context/AuthContext';

interface SidebarUserInfoProps {
  sidebarMinimized: boolean;
}

export const SidebarUserInfo: React.FC<SidebarUserInfoProps> = ({ sidebarMinimized }) => {
  const { user } = useAuth();
  
  if (sidebarMinimized || !user) return null;
  
  return (
    <div className="px-3 py-2 rounded-md bg-sidebar-accent mb-2">
      <p className="text-sm font-medium text-white">{user.name}</p>
      <p className="text-xs text-white/70">
        {user.role === 'admin' ? 'SECOM Administrador' : 
         user.role === 'analyst' ? 'SECOM Analista' : 'Agência'}
      </p>
    </div>
  );
};
