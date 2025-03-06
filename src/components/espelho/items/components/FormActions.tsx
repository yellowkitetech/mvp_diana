
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  onCancel: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({ onCancel }) => {
  return (
    <div className="flex justify-end gap-4 mt-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
      <Button type="submit">
        Adicionar Item
      </Button>
    </div>
  );
};
