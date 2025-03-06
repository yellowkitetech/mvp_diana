
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AbapTableItem } from "@/lib/types";
import { Edit, Trash2 } from "lucide-react";

interface AbapTableListProps {
  filteredItems: AbapTableItem[];
  formatCurrency: (value: number) => string;
  setCurrentItem: (item: AbapTableItem) => void;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
}

export const AbapTableList: React.FC<AbapTableListProps> = ({
  filteredItems,
  formatCurrency,
  setCurrentItem,
  setIsEditDialogOpen,
  setIsDeleteDialogOpen
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>{filteredItems.length} itens encontrados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Nº</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="w-[150px] text-right">Valor</TableHead>
            <TableHead className="w-[120px] text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.number}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell className="max-w-sm truncate" title={item.name}>
                {item.name}
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-1 truncate" title={item.description}>
                    {item.description}
                  </p>
                )}
              </TableCell>
              <TableCell className="text-right">{formatCurrency(item.value)}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      setCurrentItem(item);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      setCurrentItem(item);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Excluir</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {filteredItems.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Nenhum item encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
