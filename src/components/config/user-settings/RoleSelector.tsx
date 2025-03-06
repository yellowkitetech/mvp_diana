
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RoleSelectorProps {
  defaultRole: string;
  onRoleChange: (value: string) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ 
  defaultRole, 
  onRoleChange 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="defaultRole">Perfil Padrão para Novos Usuários</Label>
      <Select 
        value={defaultRole} 
        onValueChange={onRoleChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione o perfil padrão" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Administrador</SelectItem>
          <SelectItem value="agency">Agência</SelectItem>
          <SelectItem value="analyst">Analista</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
