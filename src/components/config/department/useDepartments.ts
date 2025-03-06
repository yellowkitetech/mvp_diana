
import { useState } from 'react';
import { Department } from "@/lib/types";
import { toast } from "sonner";
import { initialDepartments, emptyDepartment } from './initialData';

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [newDepartment, setNewDepartment] = useState<Omit<Department, 'id' | 'active'>>(emptyDepartment);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddDepartment = () => {
    if (!newDepartment.name) {
      toast.error("Nome da secretaria é obrigatório");
      return;
    }

    if (!newDepartment.contactEmail || !newDepartment.contactPhone) {
      toast.error("Email e telefone de contato são obrigatórios");
      return;
    }

    const id = Date.now().toString();
    setDepartments([...departments, { ...newDepartment, id, active: true }]);
    
    // Reset form
    setNewDepartment(emptyDepartment);
    
    toast.success("Secretaria adicionada com sucesso");
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    toast.success("Secretaria removida com sucesso");
  };

  const handleToggleActive = (id: string, active: boolean) => {
    setDepartments(departments.map(dept => 
      dept.id === id ? { ...dept, active } : dept
    ));
    toast.success(`Secretaria ${active ? 'ativada' : 'desativada'} com sucesso`);
  };

  const handleStartEdit = (department: Department) => {
    setEditingId(department.id);
    setNewDepartment({
      name: department.name,
      description: department.description || "",
      contactEmail: department.contactEmail,
      contactPhone: department.contactPhone
    });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;

    setDepartments(departments.map(dept => 
      dept.id === editingId ? 
      { 
        ...dept, 
        name: newDepartment.name, 
        description: newDepartment.description, 
        contactEmail: newDepartment.contactEmail,
        contactPhone: newDepartment.contactPhone
      } : dept
    ));
    
    setEditingId(null);
    setNewDepartment(emptyDepartment);
    
    toast.success("Secretaria atualizada com sucesso");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewDepartment(emptyDepartment);
  };

  return {
    departments,
    newDepartment,
    editingId,
    setNewDepartment,
    handleAddDepartment,
    handleDeleteDepartment,
    handleToggleActive,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit
  };
};
