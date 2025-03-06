
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { RefreshCw, Trash, AlertTriangle } from 'lucide-react';

type InvoiceStatus = 'pending' | 'verified' | 'paid' | 'cancelled';

interface InvoiceBulkActionsProps {
  selectedItems: string[];
  onClearSelection: () => void;
  onBulkStatusChange: (status: InvoiceStatus) => void;
}

const InvoiceBulkActions = ({ 
  selectedItems, 
  onClearSelection, 
  onBulkStatusChange 
}: InvoiceBulkActionsProps) => {
  const { toast } = useToast();
  const [bulkActionOpen, setBulkActionOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<InvoiceStatus>('verified');
  
  const handleBulkStatusChange = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "Nenhum item selecionado",
        description: "Selecione pelo menos um item para realizar esta ação.",
        variant: "destructive"
      });
      return;
    }
    
    onBulkStatusChange(bulkStatus);
    setBulkActionOpen(false);
  };
  
  const getStatusName = (status: InvoiceStatus): string => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'verified': return 'Verificada';
      case 'paid': return 'Paga';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };
  
  if (selectedItems.length === 0) {
    return null;
  }
  
  return (
    <div className="flex items-center justify-between bg-muted p-2 rounded-md mb-4">
      <div className="text-sm">
        {selectedItems.length} {selectedItems.length === 1 ? 'fatura selecionada' : 'faturas selecionadas'}
      </div>
      <div className="flex gap-2">
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
                <Select value={bulkStatus} onValueChange={(value: InvoiceStatus) => setBulkStatus(value)}>
                  <SelectTrigger id="bulkStatus">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="verified">Verificada</SelectItem>
                    <SelectItem value="paid">Paga</SelectItem>
                    <SelectItem value="cancelled">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-muted p-3 rounded-md flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <p className="text-sm">Esta ação irá alterar o status de {selectedItems.length} {selectedItems.length === 1 ? 'fatura' : 'faturas'}.</p>
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
        
        <Button size="sm" variant="destructive" onClick={onClearSelection}>
          <Trash className="h-4 w-4 mr-2" /> Limpar Seleção
        </Button>
      </div>
    </div>
  );
};

export default InvoiceBulkActions;
