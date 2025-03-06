
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BulkActionDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  bulkStatus: string;
  setBulkStatus: (status: string) => void;
  selectedItems: number[];
  activeTab: string;
  handleBulkStatusChange: () => void;
}

export const BulkActionDialog: React.FC<BulkActionDialogProps> = ({
  isOpen,
  setIsOpen,
  bulkStatus,
  setBulkStatus,
  selectedItems,
  activeTab,
  handleBulkStatusChange
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar Status</DialogTitle>
          <DialogDescription>
            Altere o status de {selectedItems.length} item(s) selecionado(s).
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Novo Status</label>
            <Select value={bulkStatus} onValueChange={setBulkStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Em Elaboração</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="approved">Aprovado</SelectItem>
                <SelectItem value="rejected">Reprovado</SelectItem>
                {activeTab === 'empenhos' && (
                  <SelectItem value="committed">Empenhado</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleBulkStatusChange}>
            Aplicar Alteração
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
