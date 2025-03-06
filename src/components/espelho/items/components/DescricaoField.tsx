
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { EspelhoItemFormValues } from '../EspelhoItemSchema';

interface DescricaoFieldProps {
  form: UseFormReturn<EspelhoItemFormValues>;
}

export const DescricaoField: React.FC<DescricaoFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="descricao"
      render={({ field }) => (
        <FormItem className="col-span-2">
          <FormLabel>Descrição</FormLabel>
          <FormControl>
            <Input placeholder="Descrição do item" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
