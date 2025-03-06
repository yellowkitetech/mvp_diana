
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';

interface ObservationFieldProps {
  form: UseFormReturn<any>;
}

export const ObservationField: React.FC<ObservationFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="observacao"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Observação</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Informações adicionais sobre o espelho" 
              {...field} 
              rows={4}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
