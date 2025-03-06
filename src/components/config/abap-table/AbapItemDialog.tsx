
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AbapTableItem } from "@/lib/types";

interface AbapItemDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
  item: Partial<AbapTableItem> | null;
  setItem: React.Dispatch<React.SetStateAction<any>>;
  handleAction: () => void;
  actionButtonText: string;
  types: string[];
}

export const AbapItemDialog: React.FC<AbapItemDialogProps> = ({
  isOpen,
  setIsOpen,
  title,
  description,
  item,
  setItem,
  handleAction,
  actionButtonText,
  types
}) => {
  if (!item) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="item-number">Número</Label>
              <Input 
                id="item-number" 
                type="number" 
                value={item.number}
                onChange={(e) => setItem({...item, number: Number(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-type">Tipo</Label>
              <Input 
                id="item-type" 
                value={item.type}
                onChange={(e) => setItem({...item, type: e.target.value})}
                list="types-list"
              />
              <datalist id="types-list">
                {types.map((type) => (
                  <option key={type} value={type} />
                ))}
              </datalist>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-name">Nome</Label>
            <Input 
              id="item-name" 
              value={item.name}
              onChange={(e) => setItem({...item, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-description">Descrição</Label>
            <Textarea 
              id="item-description" 
              value={item.description}
              onChange={(e) => setItem({...item, description: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-value">Valor (R$)</Label>
            <Input 
              id="item-value" 
              type="number" 
              step="0.01"
              value={item.value}
              onChange={(e) => setItem({...item, value: Number(e.target.value)})}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button onClick={handleAction}>{actionButtonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
