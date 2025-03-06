
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DepartmentTable from './DepartmentTable';
import DepartmentForm from './DepartmentForm';
import { useDepartments } from './useDepartments';

const DepartmentManager = () => {
  const {
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
  } = useDepartments();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerenciamento de Secretarias</CardTitle>
        <CardDescription>
          Configure as secretarias do estado para uso no sistema
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <DepartmentTable 
          departments={departments}
          handleToggleActive={handleToggleActive}
          handleStartEdit={handleStartEdit}
          handleDeleteDepartment={handleDeleteDepartment}
        />
      </CardContent>
      
      <CardHeader className="border-t pt-6">
        <CardTitle>
          {editingId ? "Editar Secretaria" : "Adicionar Nova Secretaria"}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <DepartmentForm 
          newDepartment={newDepartment}
          setNewDepartment={setNewDepartment}
          handleAddDepartment={handleAddDepartment}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
          editingId={editingId}
        />
      </CardContent>
    </Card>
  );
};

export default DepartmentManager;
