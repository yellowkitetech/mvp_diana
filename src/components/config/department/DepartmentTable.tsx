
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Trash, PenLine } from "lucide-react";
import { Department } from "@/lib/types";

interface DepartmentTableProps {
  departments: Department[];
  handleToggleActive: (id: string, active: boolean) => void;
  handleStartEdit: (department: Department) => void;
  handleDeleteDepartment: (id: string) => void;
}

const DepartmentTable = ({
  departments,
  handleToggleActive,
  handleStartEdit,
  handleDeleteDepartment
}: DepartmentTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Email de Contato</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>Ativo</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {departments.map((department) => (
          <TableRow key={department.id}>
            <TableCell className="font-medium">{department.name}</TableCell>
            <TableCell>{department.description}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {department.contactEmail}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {department.contactPhone}
              </div>
            </TableCell>
            <TableCell>
              <Switch 
                checked={department.active}
                onCheckedChange={(checked) => handleToggleActive(department.id, checked)}
              />
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleStartEdit(department)}
                >
                  <PenLine className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteDepartment(department.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DepartmentTable;
