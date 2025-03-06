
import { useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { currentUser } from '@/lib/data';
import DianaLogo from './DianaLogo';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header = ({ toggleSidebar, sidebarOpen }: HeaderProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="w-full h-16 border-b border-border bg-card/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6">
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
      
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </Button>
          
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-card rounded-md shadow-lg border border-border p-2 scale-in">
              <div className="p-2 text-sm font-medium">Notificações</div>
              <div className="border-t border-border my-1"></div>
              <div className="p-2 text-sm">
                <div className="mb-2 hover:bg-secondary p-2 rounded-md transition-colors">
                  <div className="font-medium">Nova mensagem recebida</div>
                  <div className="text-xs text-muted-foreground">Agência Comunicação Total - 15 minutos atrás</div>
                </div>
                <div className="mb-2 hover:bg-secondary p-2 rounded-md transition-colors">
                  <div className="font-medium">Prazo próximo de vencer</div>
                  <div className="text-xs text-muted-foreground">Campanha Nacional de Vacinação - 2 dias restantes</div>
                </div>
                <div className="hover:bg-secondary p-2 rounded-md transition-colors">
                  <div className="font-medium">Processo concluído</div>
                  <div className="text-xs text-muted-foreground">Relatório Anual de Atividades - 5 horas atrás</div>
                </div>
              </div>
              <div className="border-t border-border my-1"></div>
              <Button variant="ghost" size="sm" className="w-full text-xs">Ver todas as notificações</Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="hidden md:block text-right">
            <div className="text-sm font-medium">{currentUser.name}</div>
            <div className="text-xs text-muted-foreground">{currentUser.role}</div>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
