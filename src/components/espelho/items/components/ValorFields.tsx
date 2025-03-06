
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { EspelhoItemFormValues } from '../EspelhoItemSchema';

interface ValorFieldsProps {
  form: UseFormReturn<EspelhoItemFormValues>;
}

export const ValorFields: React.FC<ValorFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="quantidade"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantidade</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="1" 
                step="1" 
                {...field} 
                onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="valorUnitario"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Valor Unitário</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="0" 
                step="0.01" 
                {...field} 
                onChange={e => field.onChange(parseFloat(e.target.value) || 0)} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="valorLiquido"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Valor Líquido</FormLabel>
            <FormControl>
              <Input 
                type="text" 
                value={field.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="valorBruto"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Valor Bruto</FormLabel>
            <FormControl>
              <Input 
                type="text" 
                value={field.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
