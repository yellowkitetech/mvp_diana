
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PasswordPolicySelectorProps {
  passwordPolicy: string;
  onPolicyChange: (value: string) => void;
}

export const PasswordPolicySelector: React.FC<PasswordPolicySelectorProps> = ({
  passwordPolicy,
  onPolicyChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="passwordPolicy">Política de Senha</Label>
      <Select 
        value={passwordPolicy} 
        onValueChange={onPolicyChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione a política de senha" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Básica (mínimo 6 caracteres)</SelectItem>
          <SelectItem value="medium">Média (8 caracteres, números e letras)</SelectItem>
          <SelectItem value="high">Alta (12 caracteres, números, letras e símbolos)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
