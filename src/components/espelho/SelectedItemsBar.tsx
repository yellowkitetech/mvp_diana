
import React from 'react';
import { Button } from '@/components/ui/button';

interface SelectedItemsBarProps {
  count: number;
  onClear: () => void;
  onBulkAction: () => void;
}

export const SelectedItemsBar: React.FC<SelectedItemsBarProps> = ({
  count,
  onClear,
  onBulkAction
}) => {
  if (count === 0) return null;
  
  return (
    <div className="bg-muted/50 p-2 mb-4 rounded-md flex justify-between items-center">
      <span className="text-sm">{count} item(s) selecionado(s)</span>
      <div className="space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClear}
        >
          Cancelar
        </Button>
        <Button 
          size="sm" 
          onClick={onBulkAction}
        >
          Alterar Status
        </Button>
      </div>
    </div>
  );
};
