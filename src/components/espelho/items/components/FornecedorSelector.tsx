
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package } from 'lucide-react';
import { Fornecedor } from '../../types';
import { UseFormReturn } from 'react-hook-form';
import { EspelhoItemFormValues } from '../EspelhoItemSchema';

interface FornecedorSelectorProps {
  form: UseFormReturn<EspelhoItemFormValues>;
  fornecedores: Fornecedor[];
}

export const FornecedorSelector: React.FC<FornecedorSelectorProps> = ({ form, fornecedores }) => {
  return (
    <FormField
      control={form.control}
      name="fornecedorId"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Package className="h-4 w-4" /> Fornecedor
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um fornecedor" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {fornecedores.map(fornecedor => (
                <SelectItem key={fornecedor.id} value={fornecedor.id}>
                  {fornecedor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
