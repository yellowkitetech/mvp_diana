
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  sampleCommitmentNumberConfigs,
  updateCommitmentNumberConfig,
  addCommitmentNumberConfig,
  deleteCommitmentNumberConfig,
  getNextCommitmentNumber
} from "@/lib/data";
import { CommitmentNumberConfig } from "@/lib/types";

const CommitmentNumberManager = () => {
  const [configs, setConfigs] = useState<CommitmentNumberConfig[]>(sampleCommitmentNumberConfigs);
  const [newConfig, setNewConfig] = useState<Omit<CommitmentNumberConfig, 'id'>>({
    prefix: "NE",
    lastUsedNumber: 0,
    year: new Date().getFullYear(),
    active: true
  });
  
  const [nextCommitmentNumber, setNextCommitmentNumber] = useState<string>(getNextCommitmentNumber());

  const handleAddConfig = () => {
    const addedConfig = addCommitmentNumberConfig(newConfig);
    setConfigs([...configs, addedConfig]);
    
    // Reset form
    setNewConfig({
      prefix: "NE",
      lastUsedNumber: 0,
      year: new Date().getFullYear(),
      active: true
    });
    
    toast.success("Configuração de empenho adicionada com sucesso");
    setNextCommitmentNumber(getNextCommitmentNumber());
  };

  const handleUpdateConfig = (updatedConfig: CommitmentNumberConfig) => {
    updateCommitmentNumberConfig(updatedConfig);
    setConfigs(configs.map(c => c.id === updatedConfig.id ? updatedConfig : c));
    toast.success("Configuração de empenho atualizada com sucesso");
    setNextCommitmentNumber(getNextCommitmentNumber());
  };

  const handleDeleteConfig = (id: string) => {
    const success = deleteCommitmentNumberConfig(id);
    if (success) {
      setConfigs(configs.filter(c => c.id !== id));
      toast.success("Configuração de empenho removida com sucesso");
      setNextCommitmentNumber(getNextCommitmentNumber());
    } else {
      toast.error("Erro ao remover configuração");
    }
  };

  const handleToggleActive = (id: string, active: boolean) => {
    const config = configs.find(c => c.id === id);
    if (config) {
      // If activating this config, deactivate all others
      if (active) {
        const updatedConfigs = configs.map(c => ({
          ...c,
          active: c.id === id
        }));
        
        updatedConfigs.forEach(c => {
          updateCommitmentNumberConfig(c);
        });
        
        setConfigs(updatedConfigs);
      } else {
        // If deactivating, just update this one
        const updatedConfig = { ...config, active };
        handleUpdateConfig(updatedConfig);
      }
      setNextCommitmentNumber(getNextCommitmentNumber());
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerenciamento de Números de Empenho</CardTitle>
        <CardDescription>
          Configure os números de empenho para uso no sistema
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-md">
          <span className="text-sm font-medium">Próximo número de empenho:</span>
          <span className="text-lg font-bold">{nextCommitmentNumber || 'Não configurado'}</span>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ano</TableHead>
              <TableHead>Prefixo</TableHead>
              <TableHead>Último Número</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {configs.map((config) => (
              <TableRow key={config.id}>
                <TableCell>
                  <Input 
                    type="number" 
                    value={config.year}
                    onChange={(e) => handleUpdateConfig({
                      ...config,
                      year: parseInt(e.target.value)
                    })}
                    className="w-24"
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    value={config.prefix} 
                    onChange={(e) => handleUpdateConfig({
                      ...config,
                      prefix: e.target.value
                    })}
                    className="w-20"
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number" 
                    value={config.lastUsedNumber}
                    onChange={(e) => handleUpdateConfig({
                      ...config,
                      lastUsedNumber: parseInt(e.target.value)
                    })}
                    className="w-32"
                  />
                </TableCell>
                <TableCell>
                  <Switch 
                    checked={config.active}
                    onCheckedChange={(checked) => handleToggleActive(config.id, checked)}
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteConfig(config.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      
      <CardHeader className="border-t pt-6">
        <CardTitle>Adicionar Nova Configuração</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="year">Ano</Label>
            <Input 
              id="year"
              type="number"
              value={newConfig.year}
              onChange={(e) => setNewConfig({
                ...newConfig,
                year: parseInt(e.target.value)
              })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prefix">Prefixo</Label>
            <Input 
              id="prefix"
              value={newConfig.prefix}
              onChange={(e) => setNewConfig({
                ...newConfig,
                prefix: e.target.value
              })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastNumber">Último Número Usado</Label>
            <Input 
              id="lastNumber"
              type="number"
              value={newConfig.lastUsedNumber}
              onChange={(e) => setNewConfig({
                ...newConfig,
                lastUsedNumber: parseInt(e.target.value)
              })}
            />
          </div>
          
          <div className="space-y-2 flex items-end">
            <Button 
              onClick={handleAddConfig}
              className="w-full"
            >
              Adicionar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommitmentNumberManager;
