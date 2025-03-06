
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Agency } from '@/lib/types/user';
import { sampleAgencies } from '@/lib/data';
import { useToast } from "@/components/ui/use-toast";
import AgencyForm from './AgencyForm';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';

const AgencyManager = () => {
  const { toast } = useToast();
  const [agencies, setAgencies] = useState<Agency[]>(sampleAgencies);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleAddAgency = (agency: Omit<Agency, 'id'>) => {
    const newAgency = {
      ...agency,
      id: `agency-${Date.now()}`, // Generate a temporary ID
    };
    
    setAgencies([...agencies, newAgency as Agency]);
    setShowForm(false);
    toast({
      title: "Agência adicionada",
      description: `A agência "${newAgency.name}" foi adicionada com sucesso.`,
    });
  };

  const handleUpdateAgency = (updatedAgency: Omit<Agency, 'id'>) => {
    if (!selectedAgency) return;
    
    const updated = agencies.map(agency => 
      agency.id === selectedAgency.id 
        ? { ...updatedAgency, id: selectedAgency.id } 
        : agency
    );
    
    setAgencies(updated);
    setSelectedAgency(null);
    setShowForm(false);
    setIsEditing(false);
    
    toast({
      title: "Agência atualizada",
      description: `As informações da agência "${updatedAgency.name}" foram atualizadas.`,
    });
  };

  const handleEditAgency = (agency: Agency) => {
    setSelectedAgency(agency);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteAgency = () => {
    if (!selectedAgency) return;
    
    const filtered = agencies.filter(agency => agency.id !== selectedAgency.id);
    setAgencies(filtered);
    setDeleteDialogOpen(false);
    setSelectedAgency(null);
    
    toast({
      title: "Agência removida",
      description: `A agência "${selectedAgency.name}" foi removida com sucesso.`,
    });
  };

  const confirmDelete = (agency: Agency) => {
    setSelectedAgency(agency);
    setDeleteDialogOpen(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setSelectedAgency(null);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gerenciamento de Agências</CardTitle>
          <CardDescription>
            Configure as agências de publicidade para uso no sistema
          </CardDescription>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nova Agência
          </Button>
        )}
      </CardHeader>
      
      <CardContent>
        {showForm ? (
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">
              {isEditing ? 'Editar Agência' : 'Adicionar Nova Agência'}
            </h3>
            <AgencyForm 
              agency={isEditing ? selectedAgency || undefined : undefined}
              onSubmit={isEditing ? handleUpdateAgency : handleAddAgency}
              onCancel={cancelForm}
            />
          </div>
        ) : (
          <div className="space-y-4">
            {agencies.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma agência cadastrada.
              </div>
            ) : (
              <div className="grid gap-4">
                {agencies.map((agency) => (
                  <div
                    key={agency.id}
                    className="border rounded-lg p-4 flex flex-col md:flex-row justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{agency.name}</h3>
                        <Badge variant={agency.active ? "default" : "outline"}>
                          {agency.active ? "Ativa" : "Inativa"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Contato: {agency.contactPerson}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {agency.email} • {agency.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {agency.address}
                      </p>
                    </div>
                    <div className="flex space-x-2 mt-4 md:mt-0 md:self-start">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditAgency(agency)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => confirmDelete(agency)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a agência "{selectedAgency?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAgency} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default AgencyManager;
