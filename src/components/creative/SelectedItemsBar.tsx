
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import BulkActionDialog from "./BulkActionDialog";
import { ApprovalStatus } from "@/lib/types/common";

interface SelectedItemsBarProps {
  selectedItems: string[];
  bulkActionOpen: boolean;
  setBulkActionOpen: (open: boolean) => void;
  bulkStatus: ApprovalStatus;
  setBulkStatus: (status: ApprovalStatus) => void;
  handleBulkStatusChange: () => void;
  clearSelection: () => void;
}

const SelectedItemsBar = ({
  selectedItems,
  bulkActionOpen,
  setBulkActionOpen,
  bulkStatus,
  setBulkStatus,
  handleBulkStatusChange,
  clearSelection
}: SelectedItemsBarProps) => {
  const selectedItemsCount = selectedItems.length;

  if (selectedItemsCount === 0) return null;

  return (
    <div className="flex items-center justify-between bg-muted p-2 rounded-md">
      <div className="text-sm">
        {selectedItemsCount} {selectedItemsCount === 1 ? 'item selecionado' : 'itens selecionados'}
      </div>
      <div className="flex gap-2">
        <BulkActionDialog
          bulkActionOpen={bulkActionOpen}
          setBulkActionOpen={setBulkActionOpen}
          bulkStatus={bulkStatus}
          setBulkStatus={setBulkStatus}
          handleBulkStatusChange={handleBulkStatusChange}
          selectedItemsCount={selectedItemsCount}
        />
        
        <Button size="sm" variant="destructive" onClick={clearSelection}>
          <Trash className="h-4 w-4 mr-2" /> Limpar Seleção
        </Button>
      </div>
    </div>
  );
};

export default SelectedItemsBar;
