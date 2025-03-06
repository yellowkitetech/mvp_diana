
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

interface ItemDescriptionFieldProps {
  form: UseFormReturn<ItemFormValues>;
}

export const ItemDescriptionField: React.FC<ItemDescriptionFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="descricao"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Descrição <span className="text-red-500">*</span></FormLabel>
          <FormControl>
            <Input placeholder="Digite a descrição do item" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
