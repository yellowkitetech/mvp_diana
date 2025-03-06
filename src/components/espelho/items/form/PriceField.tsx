
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../EspelhoItemSchema';

interface PriceFieldProps {
  form: UseFormReturn<ItemFormValues>;
}

export const PriceField: React.FC<PriceFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="valorUnitario"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Valor Unitário <span className="text-red-500">*</span></FormLabel>
          <FormControl>
            <Input 
              type="number" 
              min="0" 
              step="0.01" 
              placeholder="Digite o valor unitário" 
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
