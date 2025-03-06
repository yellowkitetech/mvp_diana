
import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  Settings, 
  LayoutDashboard,
  BarChart3,
  FileImage,
  MonitorPlay,
  Factory,
  Receipt,
  LineChart,
  CalendarDays,
  LogOut
} from 'lucide-react';
import { SidebarNavItem } from './SidebarNavItem';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

interface SidebarNavigationProps {
  sidebarMinimized: boolean;
  handleLogout: () => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  sidebarMinimized,
  handleLogout
}) => {
  const location = useLocation();
  const { hasPermission } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="space-y-1">
      <SidebarNavItem 
        to="/" 
        icon={LayoutDashboard} 
        label="Dashboard" 
        isActive={isActive('/')} 
        sidebarMinimized={sidebarMinimized} 
      />
      
      {hasPermission('planejamento') && (
        <SidebarNavItem 
          to="/planejamento" 
          icon={CalendarDays} 
          label="Planejamento" 
          isActive={isActive('/planejamento')} 
          sidebarMinimized={sidebarMinimized} 
        />
      )}
      
      {hasPermission('empenho') && (
        <SidebarNavItem 
          to="/espelho-empenho" 
          icon={BarChart3} 
          label="Espelho e empenho" 
          isActive={isActive('/espelho-empenho')} 
          sidebarMinimized={sidebarMinimized} 
        />
      )}
      
      {hasPermission('criacao') && (
        <SidebarNavItem 
          to="/criacao" 
          icon={FileImage} 
          label="Criação" 
          isActive={isActive('/criacao')} 
          sidebarMinimized={sidebarMinimized} 
        />
      )}
      
      {hasPermission('veiculacao') && (
        <SidebarNavItem 
          to="/media-plans" 
          icon={MonitorPlay} 
          label="PIs (Veiculação)" 
          isActive={isActive('/media-plans')} 
          sidebarMinimized={sidebarMinimized} 
        />
      )}
      
      {hasPermission('producao') && (
        <SidebarNavItem 
          to="/producao" 
          icon={Factory} 
          label="PPs (Produção)" 
          isActive={isActive('/producao')} 
          sidebarMinimized={sidebarMinimized} 
        />
      )}
      
      {hasPermission('financeiro') && (
        <SidebarNavItem 
          to="/faturamento" 
          icon={Receipt} 
          label="Faturamento" 
          isActive={isActive('/faturamento')} 
          sidebarMinimized={sidebarMinimized} 
        />
      )}
      
      {hasPermission('relatorios') && (
        <SidebarNavItem 
          to="/relatorios" 
          icon={LineChart} 
          label="Relatórios" 
          isActive={isActive('/relatorios')} 
          sidebarMinimized={sidebarMinimized} 
        />
      )}
      
      {hasPermission('comunicacoes') && (
        <SidebarNavItem 
          to="/comunicacoes" 
          icon={MessageSquare} 
          label="Comunicações" 
          isActive={isActive('/comunicacoes')} 
          sidebarMinimized={sidebarMinimized} 
        />
      )}
      
      <SidebarNavItem 
        to="/configuracoes" 
        icon={Settings} 
        label="Configurações" 
        isActive={isActive('/configuracoes')} 
        sidebarMinimized={sidebarMinimized} 
      />
      
      <Button 
        variant="ghost" 
        className="w-full justify-start text-white hover:bg-sidebar-accent" 
        size="sm"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        {!sidebarMinimized && <span>Sair</span>}
      </Button>
    </div>
  );
};
