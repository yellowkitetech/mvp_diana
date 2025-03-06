
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Department } from "@/lib/types";

interface DepartmentFormProps {
  newDepartment: Omit<Department, 'id' | 'active'>;
  setNewDepartment: React.Dispatch<React.SetStateAction<Omit<Department, 'id' | 'active'>>>;
  handleAddDepartment: () => void;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
  editingId: string | null;
}

const DepartmentForm = ({
  newDepartment,
  setNewDepartment,
  handleAddDepartment,
  handleSaveEdit,
  handleCancelEdit,
  editingId
}: DepartmentFormProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="name">Nome da Secretaria</Label>
        <Input 
          id="name"
          value={newDepartment.name}
          onChange={(e) => setNewDepartment({
            ...newDepartment,
            name: e.target.value
          })}
          placeholder="Ex: Secretaria de Educação"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição (opcional)</Label>
        <Input 
          id="description"
          value={newDepartment.description}
          onChange={(e) => setNewDepartment({
            ...newDepartment,
            description: e.target.value
          })}
          placeholder="Breve descrição da secretaria"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contactEmail">Email de Contato</Label>
        <Input 
          id="contactEmail"
          type="email"
          value={newDepartment.contactEmail}
          onChange={(e) => setNewDepartment({
            ...newDepartment,
            contactEmail: e.target.value
          })}
          placeholder="contato@secretaria.gov.br"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contactPhone">Telefone de Contato</Label>
        <Input 
          id="contactPhone"
          value={newDepartment.contactPhone}
          onChange={(e) => setNewDepartment({
            ...newDepartment,
            contactPhone: e.target.value
          })}
          placeholder="(00) 0000-0000"
        />
      </div>

      <div className="md:col-span-2 mt-6 flex justify-end gap-2">
        {editingId ? (
          <>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>
              Salvar Alterações
            </Button>
          </>
        ) : (
          <Button onClick={handleAddDepartment}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Secretaria
          </Button>
        )}
      </div>
    </div>
  );
};

export default DepartmentForm;
