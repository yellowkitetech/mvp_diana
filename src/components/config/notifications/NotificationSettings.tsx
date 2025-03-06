
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save, Bell } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const NotificationSettings = () => {
  const [emailSettings, setEmailSettings] = useState<NotificationSetting[]>([
    {
      id: 'new-process',
      title: 'Novos processos',
      description: 'Receba notificações quando novos processos forem criados',
      enabled: true,
    },
    {
      id: 'process-updates',
      title: 'Atualizações de processos',
      description: 'Receba notificações quando processos forem atualizados',
      enabled: true,
    },
    {
      id: 'comments',
      title: 'Comentários',
      description: 'Receba notificações quando houver novos comentários em processos que você participa',
      enabled: true,
    },
    {
      id: 'deadlines',
      title: 'Prazos',
      description: 'Receba notificações sobre prazos próximos de vencimento',
      enabled: true,
    },
  ]);

  const [systemSettings, setSystemSettings] = useState<NotificationSetting[]>([
    {
      id: 'system-updates',
      title: 'Atualizações do sistema',
      description: 'Receba notificações sobre atualizações e manutenções do sistema',
      enabled: false,
    },
    {
      id: 'new-users',
      title: 'Novos usuários',
      description: 'Receba notificações quando novos usuários forem adicionados (apenas para administradores)',
      enabled: false,
    },
    {
      id: 'security',
      title: 'Alertas de segurança',
      description: 'Receba notificações sobre atividades de segurança na sua conta',
      enabled: true,
    },
  ]);

  const toggleNotification = (id: string, type: 'email' | 'system') => {
    if (type === 'email') {
      setEmailSettings(prev => 
        prev.map(setting => 
          setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
        )
      );
    } else {
      setSystemSettings(prev => 
        prev.map(setting => 
          setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
        )
      );
    }
  };

  const handleSave = () => {
    toast.success("Configurações de notificações salvas com sucesso!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Notificações</CardTitle>
        <CardDescription>
          Personalize como e quando você recebe notificações do sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Notificações por E-mail</h3>
          <div className="space-y-4">
            {emailSettings.map((setting) => (
              <div key={setting.id} className="flex items-start justify-between space-x-4">
                <div>
                  <Label htmlFor={`email-${setting.id}`} className="font-medium">
                    {setting.title}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {setting.description}
                  </p>
                </div>
                <Switch 
                  id={`email-${setting.id}`}
                  checked={setting.enabled}
                  onCheckedChange={() => toggleNotification(setting.id, 'email')}
                />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-4">Notificações do Sistema</h3>
          <div className="space-y-4">
            {systemSettings.map((setting) => (
              <div key={setting.id} className="flex items-start justify-between space-x-4">
                <div>
                  <Label htmlFor={`system-${setting.id}`} className="font-medium">
                    {setting.title}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {setting.description}
                  </p>
                </div>
                <Switch 
                  id={`system-${setting.id}`}
                  checked={setting.enabled}
                  onCheckedChange={() => toggleNotification(setting.id, 'system')}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Bell className="mr-2 h-4 w-4" />
            Salvar preferências
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
