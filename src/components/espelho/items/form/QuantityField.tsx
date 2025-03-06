
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

interface QuantityFieldProps {
  form: UseFormReturn<ItemFormValues>;
}

export const QuantityField: React.FC<QuantityFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="quantidade"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Quantidade <span className="text-red-500">*</span></FormLabel>
          <FormControl>
            <Input 
              type="number" 
              min="1" 
              placeholder="Digite a quantidade" 
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
