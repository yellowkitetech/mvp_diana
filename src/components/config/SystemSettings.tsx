
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface SystemSettingsProps {
  systemSettings: {
    maxFileSize: string;
    allowedFileTypes: string;
    sessionTimeout: string;
    theme: string;
  };
  handleSystemSettingsChange: (field: string, value: string) => void;
}

const SystemSettings = ({ systemSettings, handleSystemSettingsChange }: SystemSettingsProps) => {
  const handleSaveSettings = () => {
    toast.success("Configurações de sistema salvas com sucesso!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Sistema</CardTitle>
        <CardDescription>
          Configure parâmetros gerais do sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="maxFileSize">Tamanho Máximo de Arquivo (MB)</Label>
            <Input 
              id="maxFileSize" 
              type="number" 
              value={systemSettings.maxFileSize}
              onChange={(e) => handleSystemSettingsChange('maxFileSize', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Tempo de Sessão (minutos)</Label>
            <Input 
              id="sessionTimeout" 
              type="number" 
              value={systemSettings.sessionTimeout}
              onChange={(e) => handleSystemSettingsChange('sessionTimeout', e.target.value)}
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="allowedFileTypes">Tipos de Arquivos Permitidos</Label>
            <Input 
              id="allowedFileTypes" 
              value={systemSettings.allowedFileTypes}
              onChange={(e) => handleSystemSettingsChange('allowedFileTypes', e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Separados por vírgula (ex: .pdf,.jpg,.png)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="theme">Tema da Interface</Label>
            <Select 
              value={systemSettings.theme} 
              onValueChange={(value) => handleSystemSettingsChange('theme', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Escuro</SelectItem>
                <SelectItem value="system">Seguir Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

export default SystemSettings;
