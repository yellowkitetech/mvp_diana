
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileType } from 'lucide-react';
import { Fornecedor } from '../../types';
import { UseFormReturn } from 'react-hook-form';
import { EspelhoItemFormValues } from '../EspelhoItemSchema';
import { translateServiceType } from '../../utils/serviceTranslations';

interface ServicoTypeSelectorProps {
  form: UseFormReturn<EspelhoItemFormValues>;
  selectedFornecedor: Fornecedor | null;
}

export const ServicoTypeSelector: React.FC<ServicoTypeSelectorProps> = ({ form, selectedFornecedor }) => {
  if (!selectedFornecedor) return null;

  return (
    <FormField
      control={form.control}
      name="tipoServico"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <FileType className="h-4 w-4" /> Tipo de Serviço
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de serviço" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {selectedFornecedor.serviceTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {translateServiceType(type)}
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
