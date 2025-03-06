
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ItemsTable } from '../ItemsTable';
import { EspelhoItemForm } from '../items/EspelhoItemForm';
import { Card, CardContent } from '@/components/ui/card';
import { EspelhoItem } from '../types';
import { FormMessage } from '@/components/ui/form';

interface ItemsSectionProps {
  items: EspelhoItem[];
  isAddingItem: boolean;
  setIsAddingItem: (value: boolean) => void;
  handleAddItem: (item: EspelhoItem) => void;
  handleRemoveItem: (index: number) => void;
  selectedCampaignId: string;
}

export const ItemsSection: React.FC<ItemsSectionProps> = ({
  items,
  isAddingItem,
  setIsAddingItem,
  handleAddItem,
  handleRemoveItem,
  selectedCampaignId
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Itens <span className="text-destructive">*</span></h3>
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
              onAddItem={handleAddItem} 
              onCancel={() => setIsAddingItem(false)}
              campaignId={selectedCampaignId}
            />
          </CardContent>
        </Card>
      ) : null}

      <ItemsTable items={items} onRemoveItem={handleRemoveItem} />
      
      {items.length === 0 && (
        <div className="mt-2 text-destructive text-sm">
          Adicione pelo menos um item ao espelho
        </div>
      )}
    </div>
  );
};
