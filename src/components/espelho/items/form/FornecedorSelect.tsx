
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../EspelhoItemSchema';
import { Fornecedor } from '../../types';

interface FornecedorSelectProps {
  form: UseFormReturn<ItemFormValues>;
  fornecedores: Fornecedor[];
  onFornecedorChange: (value: string) => void;
}

export const FornecedorSelect: React.FC<FornecedorSelectProps> = ({ 
  form, 
  fornecedores,
  onFornecedorChange
}) => {
  return (
    <FormField
      control={form.control}
      name="fornecedorId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Fornecedor <span className="text-red-500">*</span></FormLabel>
          <Select
            value={field.value}
            onValueChange={onFornecedorChange}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um fornecedor" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {fornecedores.map((fornecedor) => (
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
