
import React from 'react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { EspelhoFormData } from '../utils/espelhoFormSchema';

interface EspelhoFormActionsProps {
  onCancel: () => void;
  form?: UseFormReturn<EspelhoFormData>;
}

export const EspelhoFormActions: React.FC<EspelhoFormActionsProps> = ({ 
  onCancel,
  form
}) => {
  const isSubmitDisabled = form ? !form.formState.isValid || form.formState.isSubmitting : false;
  
  return (
    <div className="flex justify-end gap-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitDisabled}
      >
        Enviar Espelho
      </Button>
    </div>
  );
};
