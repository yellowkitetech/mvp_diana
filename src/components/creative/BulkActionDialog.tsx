
import { ApprovalStatus } from '@/lib/types/common';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface BulkActionDialogProps {
  bulkActionOpen: boolean;
  setBulkActionOpen: (open: boolean) => void;
  bulkStatus: ApprovalStatus;
  setBulkStatus: (status: ApprovalStatus) => void;
  handleBulkStatusChange: () => void;
  selectedItemsCount: number;
}

const BulkActionDialog = ({
  bulkActionOpen,
  setBulkActionOpen,
  bulkStatus,
  setBulkStatus,
  handleBulkStatusChange,
  selectedItemsCount
}: BulkActionDialogProps) => {
  return (
    <Dialog open={bulkActionOpen} onOpenChange={setBulkActionOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" /> Alterar Status
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Alterar Status em Massa</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bulkStatus">Novo Status</Label>
            <Select value={bulkStatus} onValueChange={(value: ApprovalStatus) => setBulkStatus(value)}>
              <SelectTrigger id="bulkStatus">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approved">Aprovado</SelectItem>
                <SelectItem value="rejected">Rejeitado</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-muted p-3 rounded-md flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <p className="text-sm">Esta ação irá alterar o status de {selectedItemsCount} {selectedItemsCount === 1 ? 'item' : 'itens'}.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setBulkActionOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleBulkStatusChange}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkActionDialog;
