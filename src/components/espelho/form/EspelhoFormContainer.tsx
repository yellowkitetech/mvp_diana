
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EspelhoItemForm } from '../items/EspelhoItemForm';
import { EspelhoItemsTable } from '../items/EspelhoItemsTable';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { EspelhoItem } from '../types';
import { calculateTotalValue } from '../utils/espelhoFormSchema';

interface EspelhoFormContainerProps {
  items: EspelhoItem[];
  onAddItem: (item: EspelhoItem) => void;
  onRemoveItem: (index: number) => void;
}

export const EspelhoFormContainer: React.FC<EspelhoFormContainerProps> = ({ 
  items, 
  onAddItem, 
  onRemoveItem 
}) => {
  const [isAddingItem, setIsAddingItem] = useState(false);

  // Calculate total values
  const totals = calculateTotalValue(items);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Itens</h3>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setIsAddingItem(true)}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" /> Adicionar Item
        </Button>
      </div>

      {isAddingItem ? (
        <Card className="mb-4">
          <CardContent className="pt-6">
            <EspelhoItemForm 
              onAddItem={onAddItem} 
              onCancel={() => setIsAddingItem(false)}
            />
          </CardContent>
        </Card>
      ) : null}

      <EspelhoItemsTable 
        items={items} 
        onRemoveItem={onRemoveItem} 
        totalValue={totals.liquido}
      />
    </div>
  );
};
