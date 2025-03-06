
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AbapTableItem } from "@/lib/types";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentItem: AbapTableItem | null;
  handleDeleteItem: () => void;
  formatCurrency: (value: number) => string;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  setIsOpen,
  currentItem,
  handleDeleteItem,
  formatCurrency
}) => {
  if (!currentItem) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Excluir Item</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir este item?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p><strong>Número:</strong> {currentItem.number}</p>
          <p><strong>Tipo:</strong> {currentItem.type}</p>
          <p><strong>Nome:</strong> {currentItem.name}</p>
          <p><strong>Valor:</strong> {formatCurrency(currentItem.value)}</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={handleDeleteItem}>Excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
