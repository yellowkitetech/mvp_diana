
import { Button } from '@/components/ui/button';

interface SelectedItemsBarProps {
  selectedItemCount: number;
  onClearSelection: () => void;
  onOpenBulkActionDialog: () => void;
}

const SelectedItemsBar = ({
  selectedItemCount,
  onClearSelection,
  onOpenBulkActionDialog
}: SelectedItemsBarProps) => {
  if (selectedItemCount === 0) return null;

  return (
    <div className="bg-muted/50 p-2 mb-4 rounded-md flex justify-between items-center">
      <span className="text-sm">{selectedItemCount} plano(s) selecionado(s)</span>
      <div className="space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClearSelection}
        >
          Cancelar
        </Button>
        <Button 
          size="sm" 
          onClick={onOpenBulkActionDialog}
        >
          Alterar Status
        </Button>
      </div>
    </div>
  );
};

export default SelectedItemsBar;
