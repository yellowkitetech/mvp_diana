
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { EspelhoFormData } from '../utils/espelhoFormSchema';

interface EspelhoObservationProps {
  form: UseFormReturn<EspelhoFormData>;
}

export const EspelhoObservation: React.FC<EspelhoObservationProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="observacao"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Observação</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Digite observações adicionais" 
              className="h-24"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
