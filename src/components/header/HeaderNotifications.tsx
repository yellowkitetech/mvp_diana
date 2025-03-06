
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeaderNotifications: React.FC = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
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
  );
};
