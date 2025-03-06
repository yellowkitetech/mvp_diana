
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoleSelector } from './user-settings/RoleSelector';
import { PasswordPolicySelector } from './user-settings/PasswordPolicySelector';
import { useUserSettings, UserSettingsData } from './user-settings/useUserSettings';

interface UserSettingsProps {
  userSettings: UserSettingsData;
  setUserSettings: React.Dispatch<React.SetStateAction<UserSettingsData>>;
}

const UserSettings = ({ userSettings, setUserSettings }: UserSettingsProps) => {
  const { handleSaveSettings } = useUserSettings(userSettings, setUserSettings);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Usuários</CardTitle>
        <CardDescription>
          Configure os usuários do sistema e suas permissões
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <RoleSelector 
            defaultRole={userSettings.defaultRole} 
            onRoleChange={(value) => setUserSettings(prev => ({ ...prev, defaultRole: value }))}
          />
          
          <PasswordPolicySelector 
            passwordPolicy={userSettings.passwordPolicy}
            onPolicyChange={(value) => setUserSettings(prev => ({ ...prev, passwordPolicy: value }))}
          />
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings}>
            Salvar Configurações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSettings;
